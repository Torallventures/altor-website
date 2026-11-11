export const particleVertex = /* glsl */ `
  attribute vec4 aChart;
  attribute vec4 aGlobe;
  attribute vec4 aNetwork;
  attribute vec4 aHandshake;
  attribute vec4 aVortex;
  attribute vec3 aSeed;
  uniform float uTime;
  uniform float uLocal;
  uniform float uCurrent;
  uniform float uPrevious;
  uniform float uTransition;
  uniform float uChartDuration;
  uniform float uGlobeSpeed;
  uniform float uHandshakeSpeed;
  uniform float uVortexSpeed;
  uniform float uTurbulence;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uScale;
  uniform vec2 uCenter;
  varying float vLight;

  mat2 rotation(float a) { return mat2(cos(a),-sin(a),sin(a),cos(a)); }
  vec4 formation(float id) {
    if(id<.5) return aChart;
    if(id<1.5) return aGlobe;
    if(id<2.5) return aNetwork;
    if(id<3.5) return aHandshake;
    return aVortex;
  }
  vec4 animate(vec4 p, float id) {
    if(id>.5 && id<1.5) {
      p.xz=rotation((uTime-8.)*uGlobeSpeed-.18)*p.xz;
      // Dim the far hemisphere so continents and connection arcs stay legible.
      p.w *= mix(.12,1.,smoothstep(-.8,.9,p.z));
    } else if(id>1.5 && id<2.5) {
      p.xz=rotation(sin(uTime*.18)*.035)*p.xz;
      if(p.w>1.2) p.w*=.55+1.1*pow(max(0.,sin(p.x*2.-uTime*2.3)),16.);
    } else if(id>2.5 && id<3.5) {
      p.xz=rotation(sin((uTime-24.)*uHandshakeSpeed)*.14)*p.xz;
      p.yz=rotation(-.1)*p.yz;
      float pulse=exp(-pow((length(p.xyz)-(uLocal-3.3)*2.5)*2.,2.));
      p.w*=1.+pulse*.25;
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
    gl_PointSize=clamp(uSize*uPixelRatio*(.7+aSeed.z*.65)*(11.5/-mv.z),.85,4.8*uPixelRatio);
    vLight=mix(from.w,to.w,ease)*(.7+aSeed.y*.5);
  }
`;

export const particleFragment = /* glsl */ `
  uniform float uGlow;
  varying float vLight;
  void main() {
    float r=length(gl_PointCoord-.5)*2.;
    if(r>1.) discard;
    float core=1.-smoothstep(.12,.72,r);
    float halo=exp(-r*r*3.5)*uGlow;
    gl_FragColor=vec4(vec3(.91,.95,1.),clamp((core+halo)*vLight,0.,1.));
  }
`;

export const ambientVertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uExtent;
  uniform float uPixelRatio;
  varying float vLight;
  void main() {
    vec3 p=position;
    p.x+=sin(uTime*.027+position.z*30.)*.045;
    p.y+=cos(uTime*.023+position.x*30.)*.035;
    p.xy*=uExtent;
    p.z=-3.+position.z*4.;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
    gl_PointSize=(.65+position.z*.7)*uPixelRatio;
    vLight=.16+position.z*.25;
  }
`;
