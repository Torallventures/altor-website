import coastlines from './land.json' with { type: 'json' };

type Vec3 = [number, number, number];
type Particle = [number, number, number, number, number?, number?];
type Surface = { weight: number; sample: (u: number, v: number, w: number) => Particle };
type Profile = [number, number, number, number?, number?];
const TAU = Math.PI * 2;
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (n: number, a = 0, b = 1) => Math.max(a, Math.min(b, n));

export function randomSource(seed = 73129) {
  return () => { seed = (Math.imul(seed, 1664525) + 1013904223) | 0; return (seed >>> 0) / 4294967296; };
}

function spline(points: Vec3[], t: number): Vec3 {
  const s = clamp(t) * (points.length - 1), i = Math.min(points.length - 2, Math.floor(s)), f = s - i;
  const a = points[Math.max(0, i - 1)], b = points[i], c = points[i + 1], d = points[Math.min(points.length - 1, i + 2)];
  return [0, 1, 2].map(k => .5 * ((2 * b[k]) + (-a[k] + c[k]) * f + (2 * a[k] - 5 * b[k] + 4 * c[k] - d[k]) * f * f + (-a[k] + 3 * b[k] - 3 * c[k] + d[k]) * f * f * f)) as Vec3;
}

function ellipsoid(center: Vec3, radius: Vec3, weight: number, light = .9): Surface {
  return { weight, sample(u, v) {
    const ny = 2 * u - 1, r = Math.sqrt(1 - ny * ny), nx = r * Math.cos(TAU * v), nz = r * Math.sin(TAU * v);
    return [center[0] + nx * radius[0], center[1] + ny * radius[1], center[2] + nz * radius[2], light * (.12 + .88 * clamp(nx * -.32 + ny * .5 + nz * .85))];
  } };
}

/** Tailored oval cross-sections, not primitive cones or stick-figure torsos. */
function loft(profiles: Profile[], weight: number, light = .7): Surface {
  return { weight, sample(u, v) {
    const s = u * (profiles.length - 1), i = Math.min(profiles.length - 2, Math.floor(s)), t = s - i;
    const a = profiles[i], b = profiles[i + 1], angle = TAU * v;
    return [mix(a[3] || 0, b[3] || 0, t) + Math.sin(angle) * mix(a[1], b[1], t), mix(a[0], b[0], t),
      mix(a[4] || 0, b[4] || 0, t) + Math.cos(angle) * mix(a[2], b[2], t), light * (.22 + .78 * clamp(Math.cos(angle) * .8 - Math.sin(angle) * .25 + .15))];
  } };
}

/** Elliptical swept surface for tailored sleeves. */
function tube(points: Vec3[], radius: number, weight: number, light = .85, depth = 1, taper = .6, roundedTip = true): Surface {
  return { weight, sample(u, v) {
    const p = spline(points, u), a = spline(points, Math.max(0, u - .004)), b = spline(points, Math.min(1, u + .004));
    const dx = b[0] - a[0], dy = b[1] - a[1], length = Math.hypot(dx, dy) || 1;
    const tip = roundedTip && u > .88 ? Math.sqrt(Math.max(0, 1 - ((u - .88) / .12) ** 2)) : 1;
    const r = radius * mix(1, taper, u) * tip, co = Math.cos(v * TAU), si = Math.sin(v * TAU);
    return [p[0] - dy / length * co * r, p[1] + dx / length * co * r, p[2] + si * r * depth,
      light * (.28 + .72 * clamp(si * .7 + co * .25 + .25))];
  } };
}

function line(points: Vec3[], weight: number, width = .009, light = 1, feature = 0): Surface {
  return { weight, sample(u, v, w) { const p = spline(points, u); return [p[0] + (v - .5) * width, p[1] + (w - .5) * width, p[2], light, feature, u]; } };
}

function polyline(points:Vec3[],weight:number,light:number):Surface {
  return {weight,sample(u,v,w) {
    const along=u*(points.length-1),i=Math.min(points.length-2,Math.floor(along)),t=along-i;
    return [mix(points[i][0],points[i+1][0],t)+(v-.5)*.004,mix(points[i][1],points[i+1][1],t)+(w-.5)*.004,mix(points[i][2],points[i+1][2],t),light];
  }};
}

function tagged(surface: Surface, feature: number, phase = 0): Surface {
  return { weight:surface.weight, sample(u,v,w) { const p=surface.sample(u,v,w); return [p[0],p[1],p[2],p[3],feature,phase]; } };
}

function patch(a: Vec3, b: Vec3, c: Vec3, weight: number, light = .75): Surface {
  return { weight, sample(u, v) { const r = Math.sqrt(u); return [0, 1, 2].map(k => (1 - r) * a[k] + r * (1 - v) * b[k] + r * v * c[k]).concat(light) as Particle; } };
}

function transform(surface: Surface, x: number, y: number, z: number, scale: number, turn = 0): Surface {
  return { weight: surface.weight, sample(u, v, w) {
    const p = surface.sample(u, v, w), co = Math.cos(turn), si = Math.sin(turn);
    return [x + scale * (p[0] * co + p[2] * si), y + scale * p[1], z + scale * (p[2] * co - p[0] * si), p[3],p[4],p[5]];
  } };
}

function chart(): Surface[] {
  // Uneven plateaus, pullbacks and acceleration: a plotted series, never an arrow.
  const values = [-1.45,-1.39,-1.48,-1.17,-1.06,-1.13,-.88,-.57,-.64,-.34,-.41,-.19,.17,.09,.48,.74,.62,.93,1.29,1.18,1.57,1.92];
  const trend: Vec3[] = values.map((y,i) => [-3.15+i*6.3/(values.length-1),y,.23+i*.013]);
  const surfaces: Surface[] = [line(trend, 24, .019, .9, 1)];
  surfaces.push({ weight: 18, sample(u,v,w) { const p=spline(trend,u); return [p[0],mix(-1.9,p[1],v),-.12-w*.32,.045+.19*v*v,0,u]; } });
  for(let y=-1.9;y<=2.11;y+=.8) surfaces.push(line([[-3.45,y,-.32],[3.45,y,-.32]],3,.004,.3));
  for(let x=-3.45;x<=3.46;x+=1.15) surfaces.push(line([[x,-1.9,-.32],[x,2.1,-.32]],1.8,.004,.2));
  surfaces.push(polyline([[-3.45,2.1,-.3],[-3.45,-1.9,-.3],[3.45,-1.9,-.3]],4,.6));
  for(let y=-1.9;y<=2.11;y+=.8) surfaces.push(line([[-3.58,y,-.3],[-3.45,y,-.3]],.25,.005,.7));
  for(let x=-3.45;x<=3.46;x+=1.15) surfaces.push(line([[x,-1.9,-.3],[x,-2.02,-.3]],.2,.005,.55));
  [3,7,12,15,18,21].forEach((i,k) => {
    const p=trend[i];
    surfaces.push(tagged(ellipsoid(p,[.043,.043,.035],1.1,1.45),2,k*.17));
    const ring: Vec3[]=Array.from({length:49},(_,j) => [p[0]+Math.cos(j/48*TAU)*.105,p[1]+Math.sin(j/48*TAU)*.105,p[2]]);
    surfaces.push(tagged(line(ring,.9,.005,.6),2,k*.17));
    surfaces.push(line([[p[0],-1.9,-.28],[p[0],p[1],-.28]],.7,.004,.19));
  });
  return surfaces;
}

const rad = Math.PI / 180;
function sphere(lon: number, lat: number, radius = 2.18): Vec3 {
  const a = (lon - 12) * rad, b = lat * rad;
  return [radius * Math.cos(b) * Math.sin(a), radius * Math.sin(b), radius * Math.cos(b) * Math.cos(a)];
}

function inRing(lon: number, lat: number, ring: number[][]) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const a = ring[i], b = ring[j];
    if ((a[1] > lat) !== (b[1] > lat) && lon < (b[0] - a[0]) * (lat - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
  }
  return inside;
}

/** Real public-domain Natural Earth coastlines; equal-area Fibonacci land samples. */
function globe(): Surface[] {
  const bounds = coastlines.map(ring => ({ ring, minX: Math.min(...ring.map(p => p[0])), maxX: Math.max(...ring.map(p => p[0])), minY: Math.min(...ring.map(p => p[1])), maxY: Math.max(...ring.map(p => p[1])) }));
  const land: Vec3[] = [];
  for (let i = 0; i < 42000; i++) {
    const lat = Math.asin(1 - 2 * (i + .5) / 42000) / rad, lon = ((i * 137.507764) % 360) - 180;
    if (bounds.some(b => lon >= b.minX && lon <= b.maxX && lat >= b.minY && lat <= b.maxY && inRing(lon, lat, b.ring))) land.push(sphere(lon, lat));
  }
  const surfaces: Surface[] = [{ weight: 55, sample(u, v, w) { const p = land[Math.floor(u * land.length)]; return [p[0] + (v - .5) * .012, p[1] + (w - .5) * .012, p[2], .95,0,u]; } },
    { weight:17,sample(u,v) { const p=sphere(v*360-180,Math.asin(u*2-1)/rad,2.16); return [...p,.24,0,v]; } }];
  coastlines.forEach(ring => {
    if (ring.length < 25) return;
    surfaces.push(line(ring.map(p => sphere(p[0], p[1], 2.195)), ring.length * .0025, .006, .95));
  });
  // A faint graticule makes the whole globe read as an inhabited digital system.
  for(let latitude=-60;latitude<=60;latitude+=30) surfaces.push(line(Array.from({length:97},(_,i) => sphere(i/96*360-180,latitude,2.19)),1.6,.004,.27));
  for(let longitude=-180;longitude<180;longitude+=30) surfaces.push(line(Array.from({length:65},(_,i) => sphere(longitude,-87+i/64*174,2.19)),.85,.004,.22));
  const cities = [[-74,40.7],[-.12,51.5],[55.3,25.2],[103.8,1.35],[139.7,35.7],[-46.6,-23.5],[151.2,-33.8],[18.4,-33.9],[2.35,48.8],[72.9,19.1],[-118.2,34.1],[-80.2,25.8]];
  cities.forEach(([lon,lat],i) => surfaces.push(tagged(ellipsoid(sphere(lon,lat,2.22), [.045,.045,.045], .75, 1.5),2,i*.13)));
  [[0,1],[1,2],[2,3],[3,4],[0,5],[3,6],[1,5],[1,7],[7,9],[2,9],[9,3],[1,8],[0,10],[0,11],[11,5]].forEach(([a,b]) => {
    const start = sphere(...cities[a] as [number,number], 1), end = sphere(...cities[b] as [number,number], 1);
    const points: Vec3[] = [];
    for(let i = 0; i <= 24; i++) { const t = i / 24; const p = start.map((v,k) => mix(v,end[k],t)); const length = Math.hypot(...p); const r = 2.21 + Math.sin(Math.PI*t) * .4; points.push(p.map(v => v / length * r) as Vec3); }
    surfaces.push(line(points, 1.8, .006, .7,1));
  });
  return surfaces;
}

/** Head / neck / tailored jacket, with sculpted shoulders, shirt and notched lapels. */
function executive(feminine: boolean): Surface[] {
  const surfaces: Surface[] = [
    loft([[-1.3,.58,.23],[-.9,.6,.25],[-.3,.7,.29],[.18,.76,.3],[.36,.63,.25],[.52,.27,.18]], 22, .6),
    ellipsoid([0,1.16,0], [feminine ? .26 : .29,.39,.25], 8, .95),
    loft([[.45,.14,.14],[.74,.16,.15],[.85,.17,.16]], 1.7, .6),
    tube([[-.57,.24,0],[-.79,-.12,0],[-.85,-.67,.05],[-.78,-1.25,.09]], .19, 5.5, .6, .9, .85),
    tube([[.57,.24,0],[.79,-.12,0],[.85,-.67,.05],[.78,-1.25,.09]], .19, 5.5, .6, .9, .85),
    patch([-.18,.5,.19],[.18,.5,.19],[0,-.64,.315], 2.4, .9),
    patch([-.23,.5,.23],[-.52,.16,.275],[-.07,-.67,.325], 2.3, .8),
    patch([.23,.5,.23],[.52,.16,.275],[.07,-.67,.325], 2.3, .7),
    line([[-.23,.5,.24],[-.43,.19,.31],[-.29,.09,.325],[-.38,-.02,.325],[0,-.77,.33]], 1.5, .008, 1.15),
    line([[.23,.5,.24],[.43,.19,.31],[.29,.09,.325],[.38,-.02,.325],[0,-.77,.33]], 1.5, .008, 1.15),
    line([[-.56,-.23,.29],[-.31,-.23,.31]], .45, .01, .9),
    line([[0,-.77,.33],[0,-1.28,.24]], .5, .006, .85),
    ellipsoid([.055,-.8,.335], [.022,.022,.01], .15, 1.1),
    ellipsoid([.055,-1.05,.3], [.022,.022,.01], .15, 1.1),
  ];
  if (!feminine) {
    surfaces.push(patch([0,.35,.25],[-.055,.2,.27],[.055,.2,.27], .35, .45), patch([0,.22,.275],[-.055,-.45,.32],[.06,-.45,.32], .7, .45));
    surfaces.push(line([[-.16,.49,.21],[0,.32,.26],[.16,.49,.21]], .4, .008, 1.1));
  } else {
    surfaces.push(loft([[.8,.28,.26],[1.1,.3,.265],[1.42,.24,.22],[1.55,.04,.06]], 2, .35));
  }
  return surfaces;
}

function network(): Surface[] {
  const surfaces: Surface[] = [];
  const people = [{ x: -2.45, y: -.15, z: -.28, s: .8, turn: .17, f: false }, { x: 0, y: .27, z: .4, s: 1, turn: -.06, f: false }, { x: 2.45, y: -.15, z: -.28, s: .8, turn: -.17, f: true }];
  people.forEach(p => executive(p.f).forEach(s => surfaces.push(transform(s, p.x, p.y, p.z, p.s, p.turn))));
  [[-2.45,0],[0,2.45],[-2.45,2.45]].forEach(([a,b], i) => {
    const points: Vec3[] = [[a,-1.34,.0],[(a+b)/2,-1.75-i*.17,.55],[b,-1.34,0]];
    surfaces.push(line(points, 3, .009, .9,1));
    surfaces.push(tagged(ellipsoid([a,-1.34,0],[.045,.045,.045], .5, 1.3),2,i*.25));
  });
  return surfaces;
}

/** An open volume with bound page stacks and three independently turning leaves. */
function book(): Surface[] {
  const surfaces: Surface[]=[];
  const pagePoint=(u:number,v:number,side:number,layer:number):Vec3 => [u*2.65*side,(v-.5)*3.25,-.08+Math.sin(u*Math.PI)*.22+layer*.045];
  for(const side of [-1,1]) {
    surfaces.push({weight:8,sample(u,v) { return [...pagePoint(u,v,side,0),.19,0,u]; }});
    for(let layer=-5;layer<=0;layer++) {
      const border=[pagePoint(0,0,side,layer),pagePoint(1,0,side,layer),pagePoint(1,1,side,layer),pagePoint(0,1,side,layer)];
      surfaces.push(polyline(border,1.3,layer===-5 ? .9 : .37));
    }
    for(let row=0;row<10;row++) {
      const y=.16+row*.069;
      surfaces.push(line([pagePoint(.17,y,side,1),pagePoint(row%3===2 ? .64 : .87,y,side,1)],.7,.007,row===0 ? .9 : .4));
    }
  }
  surfaces.push(line([[0,-1.68,-.22],[0,0,-.23],[0,1.68,-.22]],2,.012,.9));
  for(let leaf=1;leaf<=3;leaf++) {
    surfaces.push({weight:7,sample(u,v) { return [...pagePoint(u,v,1,leaf),.22,leaf,u]; }});
    const border:Vec3[]=[pagePoint(0,0,1,leaf),pagePoint(1,0,1,leaf),pagePoint(1,1,1,leaf),pagePoint(0,1,1,leaf)];
    const edge=polyline(border,3,.85);
    surfaces.push({weight:edge.weight,sample(u,v,w) { const p=edge.sample(u,v,w); return [p[0],p[1],p[2],p[3],leaf,p[0]/2.65]; }});
    for(let row=0;row<9;row++) {
      const y=.2+row*.07;
      const rule=line([pagePoint(.16,y,1,leaf),pagePoint(row%3===2 ? .68 : .86,y,1,leaf)],.65,.006,.48);
      surfaces.push({weight:rule.weight,sample(u,v,w) { const p=rule.sample(u,v,w); return [p[0],p[1],p[2],p[3],leaf,p[0]/2.65]; }});
    }
  }
  return surfaces;
}

function vortex(): Surface[] {
  return [{ weight: 1, sample(u,v,w) {
    const depth = u, strand = Math.floor(v * 5), ribbon = (v * 5) % 1;
    const theta = TAU * (strand / 5 + depth * 1.3) + (ribbon - .5) * .15;
    const radius = .24 + Math.pow(depth,.76)*3.25 + (w-.5)*.1;
    return [Math.cos(theta)*radius, Math.sin(theta)*radius*.82, -4.8+depth*5.6, .3+.6*Math.sin(ribbon*Math.PI)];
  } }];
}

function sample(surfaces: Surface[], count: number, seed: number) {
  const rng = randomSource(seed), sum = surfaces.reduce((n,s) => n+s.weight,0);
  const weights: number[]=[]; surfaces.reduce((n,s,i) => (weights[i]=n+s.weight),0);
  const data = new Float32Array(count*4), features = new Float32Array(count*2);
  for(let i=0;i<count;i++) {
    const select = rng()*sum; let low=0,high=weights.length-1;
    while(low<high) { const mid=(low+high)>>>1; if(select<weights[mid]) high=mid; else low=mid+1; }
    const p = surfaces[low].sample(rng(),rng(),rng());
    data.set(p.slice(0,4) as number[],i*4);
    features.set([p[4] || 0,p[5] || 0],i*2);
  }
  return {positions:data,features};
}

export function createParticleData(count: number) {
  return [chart(),globe(),network(),book(),vortex()].map((s,i) => sample(s,count,731+i*211));
}

export function createFormations(count: number) {
  return createParticleData(count).map(data => data.positions);
}

export function createAmbient(count: number) {
  const rng=randomSource(415), data=new Float32Array(count*3);
  for(let i=0;i<count;i++) { data[i*3]=(rng()-.5)*2; data[i*3+1]=(rng()-.5)*2; data[i*3+2]=rng(); }
  return data;
}
