export const particleVertex = /* glsl */ `
  attribute vec4 aWebsite;
  attribute vec4 aGlobe;
  attribute vec4 aNetwork;
  attribute vec4 aTablet;
  attribute vec4 aMobile;
  attribute vec4 aEcosystem;
  attribute vec2 aWebsiteFeature;
  attribute vec2 aGlobeFeature;
  attribute vec2 aNetworkFeature;
  attribute vec2 aEcosystemFeature;
  attribute vec3 aSeed;
  uniform float uTime, uLocal, uCurrent, uPrevious, uTransition, uConstruction;
  uniform float uGlobeSpeed, uTurbulence, uSize, uPixelRatio, uScale;
  uniform vec2 uCenter;
  uniform vec4 uCopyBounds;
  varying float vLight;
  varying float vAccent;

  mat2 rotation(float a) { return mat2(cos(a),-sin(a),sin(a),cos(a)); }
  float ease(float t) { return t*t*t*(t*(t*6.-15.)+10.); }
  vec4 formation(float id) {
    if(id<.5) return aWebsite;
    if(id<1.5) {
      vec4 p=aGlobe;
      p.xz=rotation(sin(uTime*uGlobeSpeed)*.65-.28)*p.xz;
      p.w*=mix(.16,1.,smoothstep(-.6,.6,p.z));
      p.xyz*=1.48;
      return p;
    }
    if(id<2.5) {
      vec4 p=aNetwork;
      p.xz=rotation(sin(uTime*.18)*.035)*p.xz;
      return p;
    }
    if(id<3.5) {
      // Matching samples retain their identities as the same website reflows.
      // Hold the final mobile pose while transitioning to the next chapter.
      float clock=uCurrent>2.5 && uCurrent<3.5 ? uLocal : 8.+uLocal;
      float tablet=ease(smoothstep(3.65,4.85,clock));
      float phone=ease(smoothstep(5.65,7.15,clock));
      vec4 p=mix(mix(aWebsite,aTablet,tablet),aMobile,phone);
      p.z+=sin(tablet*3.14159)*.24+sin(phone*3.14159)*.24;
      return p;
    }
    vec4 p=aEcosystem;
    p.xz=rotation(sin(uTime*.1)*.035)*p.xz;
    return p;
  }
  vec2 feature(float id) {
    if(id<.5 || (id>2.5 && id<3.5)) return aWebsiteFeature;
    if(id<1.5) return aGlobeFeature;
    if(id<2.5) return aNetworkFeature;
    return aEcosystemFeature;
  }
  float activity(vec2 f,float id) {
    float pulse=0.;
    if(id>.5 && id<2.5) {
      if(f.x>.5 && f.x<1.5) { float d=abs(f.y-fract(uTime*.16)); pulse=exp(-d*d*1800.); }
      else if(f.x>1.5) pulse=pow(.5+.5*sin(uTime*1.8-f.y*6.283),14.);
    } else if(f.x>9.5) {
      float d=abs(f.y-fract(uTime*.21+f.x*.17));
      pulse=exp(-d*d*2400.);
    } else {
      float scan=abs(f.y-fract(uTime*.12-f.x*.13));
      pulse=exp(-scan*scan*2100.)*.45;
      if(id<.5 && uCurrent<.5) {
        float completed=uLocal-(uConstruction-1.8+f.x*.4+.11);
        pulse+=exp(-completed*completed*9.);
      }
    }
    return pulse;
  }
  void main() {
    vec4 from=formation(uPrevious), to=formation(uCurrent);
    vec2 fromFeature=feature(uPrevious), toFeature=feature(uCurrent);
    float delay=aSeed.x*.55, duration=uTransition;
    if(uCurrent<.5) {
      // Browser chrome, navigation, hero, actions and cards settle in sequence.
      delay=toFeature.x*.4+aSeed.x*.22;
      duration=uConstruction-1.8+delay;
    }
    float progress=clamp((uLocal-delay)/(duration-delay),0.,1.);
    float blend=ease(progress), stream=sin(blend*3.14159265);
    vec3 p=mix(from.xyz,to.xyz,blend);
    vec3 flow=vec3(sin(aSeed.x*6.283+p.y*.4),cos(aSeed.y*6.283+p.x*.3),sin(aSeed.z*6.283));
    p+=flow*stream*stream*uTurbulence;
    p+=vec3(sin(uTime*.55+aSeed.x*22.),cos(uTime*.45+aSeed.y*22.),sin(uTime*.4+aSeed.z*22.))*.008;
    p*=uScale;
    p.xy+=uCenter;
    vec4 mv=modelViewMatrix*vec4(p,1.);
    gl_Position=projectionMatrix*mv;
    vec2 uv=gl_Position.xy/gl_Position.w*.5+.5;
    float copy=smoothstep(uCopyBounds.x-.04,uCopyBounds.x+.04,uv.x)*(1.-smoothstep(uCopyBounds.z-.04,uCopyBounds.z+.04,uv.x))*smoothstep(uCopyBounds.y-.04,uCopyBounds.y+.04,uv.y)*(1.-smoothstep(uCopyBounds.w-.04,uCopyBounds.w+.04,uv.y));
    float pulse=mix(activity(fromFeature,uPrevious),activity(toFeature,uCurrent),blend);
    float fromSize=(uPrevious<.5 || uPrevious>2.5) ? 1.45 : 1.;
    float toSize=(uCurrent<.5 || uCurrent>2.5) ? 1.45 : 1.;
    gl_PointSize=clamp(uSize*uPixelRatio*mix(fromSize,toSize,blend)*(.7+aSeed.z*.65)*(11.5/-mv.z)*(1.+pulse*.6),.9,5.*uPixelRatio);
    // Never remove particles behind copy. Ambient lights remain undimmed.
    vLight=mix(from.w,to.w,blend)*(.8+aSeed.y*.4)*(1.+pulse*1.4)*mix(1.,.38,copy);
    vAccent=.08+pulse*.1;
  }
`;

export const particleFragment = /* glsl */ `
  uniform float uGlow;
  varying float vLight;
  varying float vAccent;
  void main() {
    float r=length(gl_PointCoord-.5)*2.;
    if(r>1.) discard;
    float core=1.-smoothstep(.12,.72,r);
    float halo=exp(-r*r*3.5)*uGlow;
    gl_FragColor=vec4(mix(vec3(.91,.95,1.),vec3(.76,.87,.77),vAccent),clamp((core+halo)*vLight,0.,1.));
  }
`;

export const ambientVertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uExtent;
  uniform float uPixelRatio;
  varying float vLight;
  varying float vAccent;
  void main() {
    vec3 p=position;
    p.x+=sin(uTime*.027+position.z*30.)*.025;
    p.y+=cos(uTime*.023+position.x*30.)*.02;
    p.z=-3.+position.z*4.;
    // Perspective compensation keeps ambient samples at all four canvas edges.
    p.xy*=uExtent*(11.5-p.z)/11.5*1.04;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
    float pulse=pow(.5+.5*sin(uTime*.85+position.x*30.+position.y*12.),24.);
    gl_PointSize=(1.1+position.z*.8+pulse*.6)*uPixelRatio;
    vLight=.38+position.z*.34+pulse*.4;
    vAccent=.06;
  }
`;

export const systemVertex = /* glsl */ `
  attribute vec2 aRoute;
  uniform float uTime;
  uniform vec2 uExtent;
  uniform vec4 uCopyBounds;
  uniform float uPixelRatio;
  varying float vLight;
  varying float vAccent;
  void main() {
    vec3 p=position;
    p.y+=sin(uTime*.09+aRoute.y*5.+p.x)*.008;
    p.xy*=uExtent;
    p.z=-.8;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
    vec2 uv=gl_Position.xy/gl_Position.w*.5+.5;
    float copy=smoothstep(uCopyBounds.x-.03,uCopyBounds.x+.03,uv.x)*(1.-smoothstep(uCopyBounds.z-.03,uCopyBounds.z+.03,uv.x))*smoothstep(uCopyBounds.y-.03,uCopyBounds.y+.03,uv.y)*(1.-smoothstep(uCopyBounds.w-.03,uCopyBounds.w+.03,uv.y));
    float d=abs(aRoute.x-fract(uTime*.045+aRoute.y*1.7));
    float pulse=exp(-d*d*5200.);
    vLight=(.025+pulse*.4)*mix(1.,.55,copy);
    vAccent=.12;
    gl_PointSize=(2.4+pulse*3.2)*uPixelRatio;
  }
`;

export const systemFragment = /* glsl */ `
  varying float vLight;
  void main() { gl_FragColor=vec4(.72,.79,.86,vLight*.52); }
`;
