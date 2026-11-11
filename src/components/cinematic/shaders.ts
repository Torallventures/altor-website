export const particleVertex = /* glsl */ `
  attribute vec4 aChart;
  attribute vec4 aGlobe;
  attribute vec4 aNetwork;
  attribute vec4 aBook;
  attribute vec4 aVortex;
  attribute vec2 aChartFeature;
  attribute vec2 aGlobeFeature;
  attribute vec2 aNetworkFeature;
  attribute vec2 aBookFeature;
  attribute vec3 aSeed;
  uniform float uTime;
  uniform float uLocal;
  uniform float uCurrent;
  uniform float uPrevious;
  uniform float uTransition;
  uniform float uChartDuration;
  uniform float uGlobeSpeed;
  uniform float uPageSpeed;
  uniform float uVortexSpeed;
  uniform float uTurbulence;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uScale;
  uniform vec2 uCenter;
  varying float vLight;
  varying float vAccent;

  mat2 rotation(float a) { return mat2(cos(a),-sin(a),sin(a),cos(a)); }
  vec4 formation(float id) {
    if(id<.5) return aChart;
    if(id<1.5) return aGlobe;
    if(id<2.5) return aNetwork;
    if(id<3.5) return aBook;
    return aVortex;
  }
  vec2 feature(float id) {
    if(id<.5) return aChartFeature;
    if(id<1.5) return aGlobeFeature;
    if(id<2.5) return aNetworkFeature;
    if(id<3.5) return aBookFeature;
    return vec2(0.);
  }
  float activity(vec2 f) {
    if(f.x<.5) return 0.;
    if(f.x<1.5) { float d=abs(f.y-fract(uTime*.16)); return exp(-d*d*1800.); }
    return pow(.5+.5*sin(uTime*1.8-f.y*6.283),12.);
  }
  vec4 animate(vec4 p, float id) {
    if(id>.5 && id<1.5) {
      p.xz=rotation((uTime-8.)*uGlobeSpeed-.18)*p.xz;
      // Dim the far hemisphere so continents and connection arcs stay legible.
      p.w *= mix(.26,1.,smoothstep(-1.2,.6,p.z));
    } else if(id>1.5 && id<2.5) {
      p.xz=rotation(sin(uTime*.18)*.035)*p.xz;
    } else if(id>2.5 && id<3.5) {
      float leaf=aBookFeature.x;
      if(leaf>.5) {
        float angle=1.55+1.48*sin(uTime*uPageSpeed-leaf*.9);
        float reach=p.x;
        p.x=cos(angle)*reach;
        p.z+=sin(angle)*reach+sin(aBookFeature.y*3.14159)*.26*sin(angle);
        p.w*=.7+.3*sin(angle);
      }
      p.yz=rotation(-.4)*p.yz;
      p.xy=rotation(-.12)*p.xy;
      p.y-=.25;
    } else if(id>3.5) {
      p.xy=rotation(uTime*uVortexSpeed+p.z*.28)*p.xy;
      float inward=smoothstep(2.,6.,uLocal)*.18;
      if(uCurrent<.5) inward=.18;
      p.xy*=1.-inward;
      p.z-=inward*3.;
      float release=uCurrent<.5 ? 1. : smoothstep(6.,8.,uLocal);
      p.xy*=1.+release*.75;
      p.xyz+=vec3(sin(aSeed.x*32.),cos(aSeed.y*26.),sin(aSeed.z*21.))*release*.6;
      p.z+=sin(uTime*.55+aSeed.y*6.283)*.22;
    }
    return p;
  }
  void main() {
    vec4 from=animate(formation(uPrevious),uPrevious);
    vec4 to=animate(formation(uCurrent),uCurrent);
    vec2 fromFeature=feature(uPrevious), toFeature=feature(uCurrent);
    float delay=aSeed.x*.6;
    float duration=uTransition;
    if(uCurrent<.5) { delay=clamp((aChart.x+3.5)/7.,0.,1.)*1.8; duration=uChartDuration; }
    float t=clamp((uLocal-delay)/(duration-delay),0.,1.);
    float ease=t*t*t*(t*(t*6.-15.)+10.);
    float stream=sin(ease*3.14159265);
    vec3 p=mix(from.xyz,to.xyz,ease);
    vec3 flow=vec3(sin(aSeed.x*6.283+p.y*.4),cos(aSeed.y*6.283+p.x*.3),sin(aSeed.z*6.283));
    p+=flow*stream*stream*uTurbulence;
    p+=vec3(sin(uTime*.55+aSeed.x*22.),cos(uTime*.45+aSeed.y*22.),sin(uTime*.4+aSeed.z*22.))*.009;
    p*=uScale;
    p.xy+=uCenter;
    vec4 mv=modelViewMatrix*vec4(p,1.);
    gl_Position=projectionMatrix*mv;
    float fromPulse=uPrevious<2.5 ? activity(fromFeature) : 0.;
    float toPulse=uCurrent<2.5 ? activity(toFeature) : 0.;
    float pulse=mix(fromPulse,toPulse,ease);
    gl_PointSize=clamp(uSize*uPixelRatio*(.7+aSeed.z*.65)*(11.5/-mv.z)*(1.+pulse*.55),.85,5.*uPixelRatio);
    vLight=mix(from.w,to.w,ease)*(.8+aSeed.y*.4)*(1.+pulse*1.4);
    float fromAccent=uPrevious<2.5 ? step(.5,fromFeature.x)*.88 : .15;
    float toAccent=uCurrent<2.5 ? step(.5,toFeature.x)*.88 : .15;
    vAccent=mix(fromAccent,toAccent,ease);
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
    gl_FragColor=vec4(mix(vec3(.89,.94,.92),vec3(.64,.78,.54),vAccent),clamp((core+halo)*vLight,0.,1.));
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
    p.x+=sin(uTime*.027+position.z*30.)*.045;
    p.y+=cos(uTime*.023+position.x*30.)*.035;
    p.xy*=uExtent;
    p.z=-3.+position.z*4.;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
    gl_PointSize=(.65+position.z*.7)*uPixelRatio;
    float pulse=pow(.5+.5*sin(uTime*.85+position.x*30.+position.y*12.),18.);
    vLight=.2+position.z*.25+pulse*.24;
    vAccent=.45;
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
    vLight=(.065+pulse*.48)*mix(1.,.24,copy);
    vAccent=.8;
    gl_PointSize=(2.3+pulse*2.5)*uPixelRatio;
  }
`;

export const systemFragment = /* glsl */ `
  varying float vLight;
  void main() { gl_FragColor=vec4(.52,.68,.47,vLight); }
`;
