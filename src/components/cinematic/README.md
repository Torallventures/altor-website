# Torall cinematic hero

One persistent GPU point cloud morphs through five formations in a 40-second loop:
Website Construction → Connected Globe → Business Network → Responsive Transformation → Connected Digital Ecosystem.

## Whole-hero composition

The canvas is absolutely positioned at `inset: 0` inside the hero and is independent of the content grid. `layout.ts` positions the formation from only the canvas dimensions. The former right-column composition reference is gone. The layout spacer preserves the existing text and CTA placement but never controls the renderer.

Ambient points use a stratified distribution over the entire canvas, with perspective compensation so the field reaches all four edges. Continuous signal paths and illuminated nodes also span the hero. A restrained CSS gradient and a shader luminance mask protect the actual copy bounds without removing particles behind the headline, paragraph or buttons. The copy remains above the decorative canvas.

## Formation design

`interfaces.ts` authors browser chrome, navigation, architectural image panels, text, buttons and content cards as 3D particle surfaces. Section-based arrival delays build the website in sequence, with completion pulses. Desktop, tablet and mobile layouts have identical surface order, sampling weights and random seeds: each particle retains its section identity while the website physically reflows.

`formations.ts` retains and refines the geographic globe and tailored professional busts. The globe has Natural Earth continents, coastlines, a faint graticule, geographical nodes and raised connection arcs. The ecosystem includes a website, two dashboards and a mobile application at different depths, connected by illuminated paths with traveling pulses.

Six position buffers support the five chapters (responsive transformation uses both tablet and phone targets). Stable seeds and shader interpolation preserve particle identity through every chapter and the loop boundary. There are no chart, book or vortex targets, manual controls, counters or visible captions. White/silver particles carry subtle light activity; the existing green branding stays intact.

## Performance and accessibility

`config.ts` controls density, timing, size, glow and device quality. Desktop uses 22,000 formation points plus 4,200 ambient points; mobile uses 10,000 plus 1,600; low-core devices use 6,000 plus 900. Four draw calls, no bloom/trails buffers, no per-frame React state or CPU position uploads. Device tiers cap pixel ratio and frame rate. Slow render submission reduces pixel ratio and point count; these are heuristics, not guaranteed frame rates.

The renderer loads dynamically without blocking copy or links. A full-canvas static SVG stays visible if WebGL fails. Reduced-motion visitors see a static globe and ambient field. Visibility/intersection observers suspend rendering while hidden or offscreen. Cleanup disposes listeners, observers, geometries and materials when leaving the homepage.

## Local verification

- `npm run build`
- `npx eslint src/components/CinematicParticles.tsx src/components/cinematic/*.ts src/sections/Hero.tsx`
- `node --test --test-isolation=none tests/particles.test.mjs` (Node 24+)
- `node scripts/particle-fallback.mjs` regenerates the full-canvas static SVG.
- Development-only `/?particleFrame=5`, `13`, `21`, `27.4`, `29.2`, `31.5`, `37` freezes the website, globe, network, responsive desktop/tablet/phone, and ecosystem. Intermediate times inspect actual shader morphing.
- `?particleMotion=reduce` exercises the OS reduced-motion rendering branch; `?particleMode=fallback` skips WebGL for static fallback review. Production ignores these review parameters.
- Inspect desktop, tablet and mobile, including particles behind the copy. A full-sized canvas alone is not proof of visible full-width coverage.

Tests cover chapter order and loop boundaries, finite 3D geometry, deterministic quality tiers, stable responsive particle identities, ambient coverage in all twelve canvas regions, and canvas-centered formation sizing.

Natural Earth 1:110m land coastlines (`land.json`) are public-domain data from https://www.naturalearthdata.com/about/terms-of-use/ and https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson . Only exterior coordinate rings are retained. Other geometry is authored for this project.

Changes are confined to the homepage hero and its tests/documentation/fallback. Navigation, other sections and pages, routing and Vercel configuration are unchanged.
