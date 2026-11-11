// Rebuild the static, no-WebGL fallback from the same authored globe geometry.
import { writeFileSync } from 'node:fs';
import { createFormations } from '../src/components/cinematic/formations.ts';
const globe = createFormations(3600)[1];
const circles = [];
for(let i=0;i<globe.length;i+=4) {
  const [x,y,z,light] = globe.subarray(i,i+4);
  if(z < -.3) continue;
  const depth=1-z/11.5;
  circles.push(`<circle cx="${(400+x*83/depth).toFixed(1)}" cy="${(280-y*83/depth).toFixed(1)}" r=".8" opacity="${Math.min(.9,light*(.3+.7*Math.max(0,z/2.2))).toFixed(2)}"/>`);
}
writeFileSync(new URL('../public/media/torall-particle-fallback.svg',import.meta.url),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" fill="#e3e8ef">${circles.join('')}</svg>\n`);
