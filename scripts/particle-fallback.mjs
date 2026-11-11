// The no-WebGL fallback keeps the same full-canvas coverage and authored globe.
import { writeFileSync } from 'node:fs';
import { createFormations, createAmbient } from '../src/components/cinematic/formations.ts';
const globe = createFormations(5200)[1], ambient=createAmbient(1900);
const circles = [];
for(let i=0;i<ambient.length;i+=3) {
  circles.push(`<circle cx="${((ambient[i]+1)*720).toFixed(1)}" cy="${((ambient[i+1]+1)*450).toFixed(1)}" r="${(.55+ambient[i+2]*.5).toFixed(2)}" opacity="${(.25+ambient[i+2]*.3).toFixed(2)}"/>`);
}
for(let i=0;i<globe.length;i+=4) {
  const [x,y,z,light] = globe.subarray(i,i+4);
  if(z < -.3) continue;
  const depth=1-z/11.5;
  circles.push(`<circle cx="${(720+x*137/depth).toFixed(1)}" cy="${(460-y*137/depth).toFixed(1)}" r=".85" opacity="${Math.min(.9,light*(.3+.7*Math.max(0,z/2.2))).toFixed(2)}"/>`);
}
writeFileSync(new URL('../public/media/torall-particle-fallback.svg',import.meta.url),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" fill="#e3e8ef">${circles.join('')}</svg>\n`);
