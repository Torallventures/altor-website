/** Authored interface surfaces. Matching surface order/weights preserve particle
 * identity when the same website reflows from desktop to tablet to phone. */
export type Point = [number,number,number];
export type Sample = [number,number,number,number,number?,number?];
export type InterfaceSurface = {weight:number;sample:(u:number,v:number,w:number)=>Sample};
type Rect = [number,number,number,number];
export type Device = 'desktop' | 'tablet' | 'mobile';

function stroke(points:Point[],weight:number,light=.8,part=0):InterfaceSurface {
  const lengths=points.slice(1).map((p,i)=>Math.hypot(...p.map((v,k)=>v-points[i][k])));
  const total=lengths.reduce((n,v)=>n+v,0);
  return {weight,sample(u,v,w) {
    let distance=u*total,i=0;
    while(i<lengths.length-1 && distance>lengths[i]) distance-=lengths[i++];
    const t=distance/(lengths[i] || 1),a=points[i],b=points[i+1];
    return [a[0]+(b[0]-a[0])*t+(v-.5)*.006,a[1]+(b[1]-a[1])*t+(w-.5)*.006,a[2]+(b[2]-a[2])*t,light,part,u];
  }};
}

function frame([x,y,w,h]:Rect,z:number,weight:number,light=.8,part=0):InterfaceSurface {
  const r=Math.min(.1,w*.1,h*.18);
  return stroke([[x+r,y,z],[x+w-r,y,z],[x+w,y+r,z],[x+w,y+h-r,z],[x+w-r,y+h,z],[x+r,y+h,z],[x,y+h-r,z],[x,y+r,z],[x+r,y,z]],weight,light,part);
}

function plane([x,y,width,height]:Rect,z:number,weight:number,light:number,part:number):InterfaceSurface {
  return {weight,sample(u,v) {return [x+u*width,y+v*height,z,light,part,u];}};
}

function textLine(x:number,y:number,width:number,z:number,weight:number,part:number):InterfaceSurface {
  return stroke([[x,y,z],[x+width,y,z]],weight,.58,part);
}

function image([x,y,w,h]:Rect,z:number,part:number):InterfaceSurface[] {
  return [frame([x,y,w,h],z,2,.6,part),plane([x,y,w,h],z-.035,3,.075,part),{
    weight:13,sample(u,v,seed) {
      // Architectural image: six buildings, roof heights, lit windows and a horizon.
      const column=Math.min(5,Math.floor(u*6)),heights=[.43,.72,.58,.89,.66,.48];
      const localX=(u*6)%1, yy=v*heights[column];
      const window=(localX>.16 && localX<.83 && (v*12)%1>.25) ? .7 : .18;
      return [x+(.07+u*.86)*w,y+(.06+yy)*h,z+.04+seed*.05,window,part,u];
    },
  },stroke([[x+w*.06,y+h*.07,z+.1],[x+w*.94,y+h*.07,z+.1]],1,.75,part)];
}

/** Five-step browser build: chrome → navigation → hero → cards → actions. */
export function website(device:Device='desktop'):InterfaceSurface[] {
  const compact=device!=='desktop', phone=device==='mobile';
  const width=phone ? 3.05 : compact ? 5.65 : 10.4;
  const height=phone ? 6.6 : compact ? 6.35 : 5.9;
  const left=-width/2,bottom=-height/2,top=height/2;
  const content=width-.56;
  const surfaces:InterfaceSurface[]=[
    frame([left,bottom,width,height],-.22,7,.7,0),
    frame([left+.025,bottom+.025,width-.05,height-.05],.16,8,.95,0),
    plane([left+.03,bottom+.03,width-.06,height-.06],-.2,7,.085,0),
    stroke([[left,top-.38,.18],[left+width,top-.38,.18]],2,.6,0),
  ];
  // Browser controls and a small address field, included on all target layouts.
  for(let n=0;n<3;n++) surfaces.push(frame([left+.16+n*.13,top-.25,.055,.055],.21,.24,.9,0));
  surfaces.push(frame([-.18*width,top-.27,.36*width,.15],.2,1,.35,0));
  const navY=top-.79;
  surfaces.push(textLine(left+.32,navY,phone ? .6 : 1.15,.24,2,1));
  for(let n=0;n<3;n++) surfaces.push(textLine(left+width*.59+n*width*.1,navY,phone ? .12 : .48,.24,.7,1));
  surfaces.push(stroke([[left+.28,navY-.25,.19],[left+width-.28,navY-.25,.19]],1,.24,1));
  const picture:Rect=phone ? [left+.28,top-3.55,content,1.65] : compact ? [.15,top-3.5,width/2-.43,2.05] : [.5,-.42,4.25,2.15];
  surfaces.push(...image(picture,.28,2));
  const copyX=left+.34,copyY=phone ? top-1.36 : compact ? top-1.67 : 1.34;
  const copyWidth=phone ? 1.92 : compact ? 2 : 4.2;
  for(let row=0;row<5;row++) surfaces.push(textLine(copyX,copyY-row*(phone ? .14 : .24),copyWidth*[.65,.94,.8,.72,.5][row],.3,row<2 ? 2.1 : .85,2));
  const buttonY=phone ? top-3.92 : compact ? -.13 : -.18;
  const buttonWidth=phone ? 1.1 : 1.3;
  surfaces.push(frame([copyX,buttonY,buttonWidth,.3],.32,2,.95,3),plane([copyX,buttonY,buttonWidth,.3],.31,1,.16,3),textLine(copyX+.14,buttonY+.15,buttonWidth-.28,.34,.6,3));
  for(let n=0;n<3;n++) {
    const card:Rect=phone ? [left+.28,-2.64+n*.49,content,.39] : [left+.3+n*(width-.6)/3,bottom+.34,(width-.9)/3,compact ? 1.55 : 1.62];
    const [x,y,w,h]=card;
    surfaces.push(frame(card,.24,2,.64,4),plane(card,.20,2,.09,4));
    const thumb:Rect=phone ? [x+.08,y+.07,.35,h-.14] : [x+.12,y+h*.43,w-.24,h*.46];
    surfaces.push(...image(thumb,.29,4));
    for(let row=0;row<2;row++) surfaces.push(textLine(phone ? x+.54 : x+.13,phone ? y+.14+row*.12 : y+.2+row*.17,phone ? w*.54 : w*.67,.3,.65,4));
  }
  // Continuous shallow perspective and a visible frame thickness give real depth.
  return surfaces.map(s=>({weight:s.weight,sample(u,v,w) {
    const p=s.sample(u,v,w); return [p[0],p[1],p[2]+p[0]*.055+p[1]*.025,p[3],p[4],p[5]];
  }}));
}

function moved(s:InterfaceSurface,x:number,y:number,z:number,scale:number,turn=0):InterfaceSurface {
  return {weight:s.weight,sample(u,v,w) {const p=s.sample(u,v,w),co=Math.cos(turn),si=Math.sin(turn);return [x+scale*(p[0]*co+p[2]*si),y+scale*p[1],z+scale*(p[2]*co-p[0]*si),p[3],p[4],p[5]];}};
}

function dashboard():InterfaceSurface[] {
  const surfaces:InterfaceSurface[]=[frame([-3,-1.9,6,3.8],0,8,.8,0),plane([-3,-1.9,6,3.8],-.18,7,.09,0),stroke([[-3,1.48,.1],[3,1.48,.1]],2,.6,1),stroke([[-2.2,-1.9,.1],[-2.2,1.48,.1]],2,.6,1)];
  for(let i=0;i<5;i++) surfaces.push(frame([-2.8,1.05-i*.48,.4,.17],.18,.8,.65,1));
  for(let i=0;i<3;i++) surfaces.push(frame([-1.93+i*1.55,.46,1.36,.75],.17,2,.7,2),textLine(-1.78+i*1.55,.93,.55,.2,.8,2),textLine(-1.78+i*1.55,.7,.91,.2,1.2,2));
  for(let i=0;i<11;i++) {const h=.25+((i*7)%11)/11*.82;surfaces.push(frame([-1.8+i*.39,-.88,.18,h],.22,1,.65,3));}
  for(let i=0;i<3;i++) surfaces.push(textLine(-1.83,-1.2-i*.2,4.3-i*.35,.22,1,4));
  return surfaces;
}

export function ecosystem():InterfaceSurface[] {
  const surfaces:InterfaceSurface[]=[];
  website().forEach(s=>surfaces.push(moved(s,-3.1,.65,-.45,.5,.12)));
  dashboard().forEach(s=>surfaces.push(moved(s,2.2,.85,.18,.79,-.12)));
  website('mobile').forEach(s=>surfaces.push(moved(s,4.55,-1.5,.75,.55,-.14)));
  dashboard().forEach(s=>surfaces.push(moved(s,-.45,-2.35,.6,.48,.06)));
  const connections:Point[][]=[
    [[-3.1,-.83,-.1],[-3.1,-2.35,-.1],[-1.89,-2.35,.6]],
    [[-.5,.65,-.3],[.1,.65,-.3],[.1,2.85,-.2],[2.2,2.85,.1],[2.2,2.35,.18]],
    [[2.2,-.65,.18],[2.2,-2.35,.4],[.99,-2.35,.6]],
    [[2.6,-1.45,.4],[3.6,-1.45,.6],[3.6,-1.5,.75]],
  ];
  connections.forEach((path,i)=>{
    surfaces.push(stroke(path,4,.8,10+i));
    for(const p of [path[0],path[path.length-1]]) surfaces.push({weight:.6,sample(u,v) {const a=u*Math.PI*2;return [p[0]+Math.cos(a)*.055,p[1]+Math.sin(a)*.055,p[2]+v*.025,1.1,10+i,u];}});
  });
  return surfaces;
}
