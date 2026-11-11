import { AdditiveBlending, BufferAttribute, BufferGeometry, LineSegments, PerspectiveCamera, Points, Scene, ShaderMaterial, Vector2, Vector4, WebGLRenderer } from 'three';
import { PARTICLE_CONFIG as config, FORMATIONS, sequenceAt } from './config';
import { createAmbient, createParticleData, randomSource } from './formations';
import { ambientVertex, particleFragment, particleVertex, systemFragment, systemVertex } from './shaders';
import { createSystemField } from './systemField';
import { canvasComposition } from './layout';

export type ParticleController = { dispose: () => void };
type Options = { host: HTMLElement; onReady: () => void; onFailure: () => void };

export function mountParticles({ host, onReady, onFailure }: Options): ParticleController {
  const mobile = matchMedia(`(max-width: ${config.mobileBreakpoint - 1}px)`);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const lowPower = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
  const quality = () => lowPower ? config.lowPower : mobile.matches ? config.mobile : config.desktop;
  const renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute('aria-hidden','true');
  renderer.domElement.className = 'cinematic-canvas';
  host.prepend(renderer.domElement);
  const scene = new Scene(), camera = new PerspectiveCamera(config.fieldOfView, 1, .1, 60);
  camera.position.z = config.cameraDistance;
  const uniforms = {
    uTime: { value: 0 }, uLocal: { value: 0 }, uCurrent: { value: 0 }, uPrevious: { value: 4 },
    uTransition: { value: config.transitionDuration }, uConstruction: { value: config.constructionDuration },
    uGlobeSpeed: { value: config.globeRotationSpeed },
    uTurbulence: { value: config.turbulence }, uGlow: { value: config.glowStrength }, uSize: { value: config.particleSize },
    uPixelRatio: { value: 1 }, uScale: { value: 1 }, uCenter: { value: new Vector2() }, uCopyBounds:{ value:new Vector4() },
  };
  const material = new ShaderMaterial({ uniforms, vertexShader: particleVertex, fragmentShader: particleFragment, transparent: true, depthWrite: false, blending: AdditiveBlending });
  const ambientMaterial = new ShaderMaterial({ uniforms: { uTime: uniforms.uTime, uGlow: { value: .1 }, uPixelRatio: uniforms.uPixelRatio, uExtent: { value: new Vector2() } }, vertexShader: ambientVertex, fragmentShader: particleFragment, transparent: true, depthWrite: false, blending: AdditiveBlending });
  const field=createSystemField();
  const fieldUniforms={uTime:uniforms.uTime,uExtent:{value:new Vector2()},uCopyBounds:uniforms.uCopyBounds,uPixelRatio:uniforms.uPixelRatio,uGlow:{value:.32}};
  const fieldMaterial=new ShaderMaterial({uniforms:fieldUniforms,vertexShader:systemVertex,fragmentShader:systemFragment,transparent:true,depthWrite:false,blending:AdditiveBlending});
  const nodeMaterial=new ShaderMaterial({uniforms:fieldUniforms,vertexShader:systemVertex,fragmentShader:particleFragment,transparent:true,depthWrite:false,blending:AdditiveBlending});
  const fieldGeometry=new BufferGeometry(),nodeGeometry=new BufferGeometry();
  fieldGeometry.setAttribute('position',new BufferAttribute(field.lines,3)); fieldGeometry.setAttribute('aRoute',new BufferAttribute(field.routes,2));
  nodeGeometry.setAttribute('position',new BufferAttribute(field.nodes,3)); nodeGeometry.setAttribute('aRoute',new BufferAttribute(field.nodeRoutes,2));
  const systemLines=new LineSegments(fieldGeometry,fieldMaterial),systemNodes=new Points(nodeGeometry,nodeMaterial);
  systemLines.frustumCulled=false; systemNodes.frustumCulled=false;
  const particles = new Points(new BufferGeometry(), material), ambient = new Points(new BufferGeometry(), ambientMaterial);
  particles.frustumCulled = false; ambient.frustumCulled = false;
  scene.add(systemLines,systemNodes,particles,ambient);
  let frame = 0, last = 0, lastPaint = 0, elapsed = 0, count = 0, lastChapter = -1;
  let visible = true, disposed = false, lost = false, ready = false;
  let slowFrames = 0, paintedFrames = 0, adapted = false;
  // A dev-only deterministic frame supports visual review without adding controls to the site.
  const reviewTime = import.meta.env.DEV ? Number(new URLSearchParams(location.search).get('particleFrame') ?? NaN) : NaN;
  const reviewReduced = import.meta.env.DEV && new URLSearchParams(location.search).get('particleMotion') === 'reduce';
  const isReduced = () => reduced.matches || reviewReduced;
  const frozen = () => isReduced() || Number.isFinite(reviewTime);

  function geometry() {
    const q = quality();
    if(count === q.particles) return;
    count = q.particles;
    const data = createParticleData(count), next = new BufferGeometry(), seed = new Float32Array(count * 3), rng = randomSource(911);
    for(let i=0; i<seed.length; i++) seed[i]=rng();
    next.setAttribute('position', new BufferAttribute(new Float32Array(count*3),3));
    ['aWebsite','aGlobe','aNetwork','aTablet','aMobile','aEcosystem'].forEach((name,i) => next.setAttribute(name,new BufferAttribute(data[i].positions,4)));
    [0,1,2,5].forEach((target,i) => next.setAttribute(['aWebsiteFeature','aGlobeFeature','aNetworkFeature','aEcosystemFeature'][i],new BufferAttribute(data[target].features,2)));
    next.setAttribute('aSeed',new BufferAttribute(seed,3));
    particles.geometry.dispose(); particles.geometry=next;
    const dust = new BufferGeometry(); dust.setAttribute('position', new BufferAttribute(createAmbient(q.ambient),3));
    ambient.geometry.dispose(); ambient.geometry=dust;
    host.dataset.particles=String(count);
  }

  function paint() {
    if(disposed || lost) return;
    const time = Number.isFinite(reviewTime) ? reviewTime : isReduced() ? 13 : elapsed;
    const sequence=sequenceAt(time);
    uniforms.uTime.value=time; uniforms.uLocal.value=sequence.localTime;
    uniforms.uCurrent.value=sequence.current; uniforms.uPrevious.value=sequence.previous;
    renderer.render(scene,camera);
    if(lost) return;
    if(lastChapter!==sequence.current) {
      host.dataset.formation=FORMATIONS[sequence.current].name;
      lastChapter=sequence.current;
    }
    host.dataset.playback=isReduced() ? 'reduced-motion' : 'playing';
    if(!ready) { ready=true; onReady(); }
  }

  function stop() { cancelAnimationFrame(frame); frame=0; last=0; lastPaint=0; }
  function tick(now: number) {
    frame=0;
    if(disposed || lost || !visible || document.hidden || frozen()) { last=0; return; }
    if(last) elapsed+=Math.min((now-last)/1000,.1);
    last=now;
    const interval=1000 / (adapted ? 30 : quality().fps);
    if(now-lastPaint>=interval-1) {
      const costStart=performance.now(); paint();
      if(performance.now()-costStart>18) slowFrames++;
      if(++paintedFrames===90 && slowFrames>35 && !adapted) {
        adapted=true;
        renderer.setPixelRatio(Math.min(devicePixelRatio || 1,1));
        uniforms.uPixelRatio.value=renderer.getPixelRatio();
        particles.geometry.setDrawRange(0,Math.floor(count*.7));
      }
      lastPaint=now;
    }
    frame=requestAnimationFrame(tick);
  }
  function resume() {
    stop();
    if(disposed || lost || !visible || document.hidden) { host.dataset.playback='suspended'; return; }
    paint();
    if(!frozen()) frame=requestAnimationFrame(tick);
  }
  function resize() {
    if(disposed || lost) return;
    const bounds=host.getBoundingClientRect();
    if(!bounds.width || !bounds.height) return;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1,adapted ? 1 : quality().pixelRatio));
    renderer.setSize(bounds.width,bounds.height,false);
    camera.aspect=bounds.width/bounds.height; camera.updateProjectionMatrix();
    const height=2*Math.tan(config.fieldOfView*Math.PI/360)*config.cameraDistance;
    const placement=canvasComposition(bounds.width,bounds.height,height);
    uniforms.uCenter.value.set(placement.x,placement.y);
    uniforms.uScale.value=placement.scale;
    uniforms.uPixelRatio.value=renderer.getPixelRatio();
    ambientMaterial.uniforms.uExtent.value.set(height*camera.aspect*.5,height*.5);
    fieldUniforms.uExtent.value.set(height*camera.aspect*.54,height*.54);
    const copy=host.closest('section')?.querySelector('.hero-copy')?.getBoundingClientRect();
    if(copy) fieldUniforms.uCopyBounds.value.set((copy.left-bounds.left)/bounds.width,1-(copy.bottom-bounds.top)/bounds.height,(copy.right-bounds.left)/bounds.width,1-(copy.top-bounds.top)/bounds.height);
    geometry(); resume();
  }
  function contextLost(event: Event) { event.preventDefault(); lost=true; stop(); ready=false; onFailure(); }
  function contextRestored() { lost=false; resize(); }
  const intersection=new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; resume(); }, {threshold: .01});
  const sizing=new ResizeObserver(resize);
  intersection.observe(host); sizing.observe(host);
  document.addEventListener('visibilitychange',resume);
  reduced.addEventListener('change',resume); mobile.addEventListener('change',resize);
  renderer.domElement.addEventListener('webglcontextlost',contextLost);
  renderer.domElement.addEventListener('webglcontextrestored',contextRestored);
  // Surface shader failures instead of silently hiding the fallback behind a blank canvas.
  renderer.debug.onShaderError=() => { lost=true; stop(); onFailure(); };
  resize();

  return {
    dispose() {
      disposed=true; stop(); intersection.disconnect(); sizing.disconnect();
      document.removeEventListener('visibilitychange',resume);
      reduced.removeEventListener('change',resume); mobile.removeEventListener('change',resize);
      renderer.domElement.removeEventListener('webglcontextlost',contextLost);
      renderer.domElement.removeEventListener('webglcontextrestored',contextRestored);
      particles.geometry.dispose(); ambient.geometry.dispose(); material.dispose(); ambientMaterial.dispose();
      fieldGeometry.dispose(); nodeGeometry.dispose(); fieldMaterial.dispose(); nodeMaterial.dispose();
      renderer.dispose(); renderer.domElement.remove();
    },
  };
}
