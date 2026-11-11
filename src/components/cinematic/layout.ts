/** Composition depends ONLY on the hero canvas dimensions, never a content column. */
export function canvasComposition(width:number,height:number,worldHeight:number) {
  const worldWidth=worldHeight*width/height;
  return {
    x:0,
    y:width<768 ? -worldHeight*.235 : -worldHeight*.025,
    scale:Math.min(worldWidth/12.8,worldHeight/8.1),
  };
}
