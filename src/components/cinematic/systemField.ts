/** Quiet, continuous data routes spanning the full hero, including the copy side. */
export function createSystemField() {
  const lines:number[]=[], routes:number[]=[], nodes:number[]=[], nodeRoutes:number[]=[];
  const point=(t:number,row:number) => {
    const x=t*2.7-1.35;
    return [x,-1.06+row*.14+Math.sin(x*2.1+row*.23)*.095+Math.sin(x*.8)*.16,0];
  };
  for(let row=0;row<16;row++) {
    for(let i=0;i<120;i++) {
      const a=point(i/120,row),b=point((i+1)/120,row);
      lines.push(...a,...b); routes.push(i/120,row/16,(i+1)/120,row/16);
      if(i%17===row%17) { nodes.push(...a); nodeRoutes.push(i/120,row/16); }
    }
  }
  return {lines:new Float32Array(lines),routes:new Float32Array(routes),nodes:new Float32Array(nodes),nodeRoutes:new Float32Array(nodeRoutes)};
}
