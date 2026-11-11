import { AdditiveBlending, BufferAttribute, BufferGeometry, PerspectiveCamera, Points, Scene, ShaderMaterial, Vector2, WebGLRenderer } from 'three';
import { PARTICLE_CONFIG as config, FORMATIONS, sequenceAt } from './config';
import { createAmbient, createFormations, randomSource } from './formations';
import { ambientVertex, particleFragment, particleVertex } from './shaders';

export type ParticleController = { setPaused: (paused: boolean) => void; dispose: () => void };
type Options = { host: HTMLElement; composition: HTMLElement; caption: HTMLElement; index: HTMLElement; onReady: () => void; onFailure: () => void };

export function mountParticles({ host, composition, caption, index, onReady, onFailure }: Options): ParticleController {
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
    uTransition: { value: config.transitionDuration }, uChartDuration: { value: config.chartConstructionDuration },
    uGlobeSpeed: { value: config.globeRotationSpeed }, uHandshakeSpeed: { value: config.handshakeRotationSpeed }, uVortexSpeed: { value: config.vortexRotationSpeed },
    uTurbulence: { value: config.turbulence }, uGlow: { value: config.glowStrength }, uSize: { value: config.particleSize },
    uPixelRatio: { value: 1 }, uScale: { value: 1 }, uCenter: { value: new Vector2() },
  };
  const material = new ShaderMaterial({ uniforms, vertexShader: particleVertex, fragmentShader: particleFragment, transparent: true, depthWrite: false, blending: AdditiveBlending });
  const ambientMaterial = new ShaderMaterial({ uniforms: { uTime: uniforms.uTime, uGlow: { value: .1 }, uPixelRatio: uniforms.uPixelRatio, uExtent: { value: new Vector2() } }, vertexShader: ambientVertex, fragmentShader: particleFragment, transparent: true, depthWrite: false, blending: AdditiveBlending });
  const particles = new Points(new BufferGeometry(), material), ambient = new Points(new BufferGeometry(), ambientMaterial);
  particles.frustumCulled = false; ambient.frustumCulled = false;
  scene.add(particles, ambient);
  let frame = 0, last = 0, lastPaint = 0, elapsed = 0, count = 0, lastChapter = -1;
  let visible = true, paused = false, disposed = false, lost = false, ready = false;
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
    const data = createFormations(count), next = new BufferGeometry(), seed = new Float32Array(count * 3), rng = randomSource(911);
    for(let i=0; i<seed.length; i++) seed[i]=rng();
    next.setAttribute('position', new BufferAttribute(new Float32Array(count*3),3));
    ['aChart','aGlobe','aNetwork','aHandshake','aVortex'].forEach((name,i) => next.setAttribute(name,new BufferAttribute(data[i],4)));
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
      caption.textContent=FORMATIONS[sequence.current].caption;
      index.textContent=`0${sequence.current+1} / 05`;
      host.dataset.formation=FORMATIONS[sequence.current].name;
      lastChapter=sequence.current;
    }
    host.dataset.playback=isReduced() ? 'reduced-motion' : paused ? 'paused' : 'playing';
    if(!ready) { ready=true; onReady(); }
  }

  function stop() { cancelAnimationFrame(frame); frame=0; last=0; lastPaint=0; }
  function tick(now: number) {
    frame=0;
    if(disposed || lost || !visible || document.hidden || paused || frozen()) { last=0; return; }
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
    if(!paused && !frozen()) frame=requestAnimationFrame(tick);
  }
  function resize() {
    if(disposed || lost) return;
    const bounds=host.getBoundingClientRect(), art=composition.getBoundingClientRect();
    if(!bounds.width || !bounds.height) return;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1,adapted ? 1 : quality().pixelRatio));
    renderer.setSize(bounds.width,bounds.height,false);
    camera.aspect=bounds.width/bounds.height; camera.updateProjectionMatrix();
    const height=2*Math.tan(config.fieldOfView*Math.PI/360)*config.cameraDistance;
    const units=height/bounds.height;
    uniforms.uCenter.value.set((art.left-bounds.left+art.width/2-bounds.width/2)*units, (bounds.height/2-(art.top-bounds.top+art.height/2))*units);
    uniforms.uScale.value=Math.min(art.width/8.4,art.height/5.8)*units;
    uniforms.uPixelRatio.value=renderer.getPixelRatio();
    ambientMaterial.uniforms.uExtent.value.set(height*camera.aspect*.6,height*.6);
    geometry(); resume();
  }
  function contextLost(event: Event) { event.preventDefault(); lost=true; stop(); ready=false; onFailure(); }
  function contextRestored() { lost=false; resize(); }
  const intersection=new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; resume(); }, {threshold: .01});
  const sizing=new ResizeObserver(resize);
  intersection.observe(host); sizing.observe(host); sizing.observe(composition);
  document.addEventListener('visibilitychange',resume);
  reduced.addEventListener('change',resume); mobile.addEventListener('change',resize);
  renderer.domElement.addEventListener('webglcontextlost',contextLost);
  renderer.domElement.addEventListener('webglcontextrestored',contextRestored);
  // Surface shader failures instead of silently hiding the fallback behind a blank canvas.
  renderer.debug.onShaderError=() => { lost=true; stop(); onFailure(); };
  resize();

  return {
    setPaused(value) { paused=value; resume(); },
    dispose() {
      disposed=true; stop(); intersection.disconnect(); sizing.disconnect();
      document.removeEventListener('visibilitychange',resume);
      reduced.removeEventListener('change',resume); mobile.removeEventListener('change',resize);
      renderer.domElement.removeEventListener('webglcontextlost',contextLost);
      renderer.domElement.removeEventListener('webglcontextrestored',contextRestored);
      particles.geometry.dispose(); ambient.geometry.dispose(); material.dispose(); ambientMaterial.dispose();
      renderer.dispose(); renderer.domElement.remove();
    },
  };
}
