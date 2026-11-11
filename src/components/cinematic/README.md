# Torall cinematic hero

One persistent Three.js point cloud morphs through five sampled 3D surfaces on a 40-second loop. Each particle has five fixed targets and one stable seed. The vertex shader handles movement, staggered chart construction, rotation, turbulence and light pulses. No per-frame React state or CPU position-buffer uploads are used.

## Art direction and controls

`config.ts` controls density, device tiers, formation/transition timing, rotation, particle size and glow. `formations.ts` authors the chart, geographic globe, three executive busts, two-handed clasp with cuffs and articulated digits, and five-stream vortex. Shape construction is deterministic; no model, video, texture, external font or runtime API is needed by the effect.

The chart arrives left to right. Each eight-second chapter starts by moving the previous shape's particles to the next surface, then holds the new shape. The final vortex disperses and becomes the next chart's source; the animation clock never resets particle positions. Ambient particles span the full hero during every chapter.

Desktop uses 18,000 formation particles + 1,100 ambient points. Mobile uses 8,000 + 450 with reduced pixel ratio/frame rate; low-core devices use 5,000 + 300. Slow render submission also reduces pixel ratio/draw count. These are device heuristics, not a guarantee of any particular frame rate. Two draw calls, no bloom framebuffer or trails accumulation buffers. Resizing regenerates geometry only across quality tiers.

The hero reserves composition space before the GPU code loads. Its text and links render immediately. The renderer is dynamically imported; a static point-globe stays visible if import/WebGL initialization fails or the context is lost. Reduced-motion visitors see a static rendered globe. Visibility and intersection observers stop requestAnimationFrame while hidden or offscreen; returning resumes the same clock. Pause/play remains keyboard accessible. All observers, listeners, geometries and materials are disposed on navigation.

## Development and verification

- `npm run build`
- `npx eslint src/components/CinematicParticles.tsx src/components/cinematic/*.ts src/sections/Hero.tsx`
- `node --test --test-isolation=none tests/particles.test.mjs` (Node 24+)
- `node scripts/particle-fallback.mjs` regenerates the static SVG after globe changes.
- In Vite development only, `/?particleFrame=5` / `13` / `21` / `29` / `37` freezes the five completed formations. Intermediate seconds inspect actual shader morphing. Production ignores this parameter.
- Development-only `?particleMotion=reduce` exercises the same static rendering branch as the OS reduced-motion preference; `?particleMode=fallback` skips WebGL to review the static SVG. Neither override is available in production.

Natural Earth 1:110m land coastlines (`land.json`) are public-domain data from https://www.naturalearthdata.com/about/terms-of-use/ and https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson . Only exterior coordinate rings are retained. Geometry other than coastlines is authored for this project.

Changes are confined to the hero. The existing product illustration component is retained in source. Portfolio, the `/lumeratm` reverse proxy, services, navigation, contact routes and Vercel configuration are unchanged.
