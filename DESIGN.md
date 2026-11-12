# Torall — Digital Architecture preview

This is a review branch, not an approved production release. It starts from `0c3665b` and includes the other developer's subsequent main commit `21806df` through a merge. Main is not rewritten. The new `Home.tsx` and `home.css` showroom source files from that commit remain intact; this branch deliberately renders the requested Digital Architecture composition instead. The shared service content, media, routes, and Lumera proxy remain intact.

## Art direction

One quiet architectural scene replaces the floating brand sculpture and the earlier cycling particle formations. A public website, a forms surface, and an operations interface share a projected 3D space. Delicate routed paths join actual interface anchors. The primary structure occupies the center/right; stratified ambient points cover the full hero, including behind the headline and buttons. A translucent scrim protects text without blanking the left side.

The scene has one entrance: readable content appears within the first second; structure clarifies over 0.4–2.5 seconds; connections appear over 2.5–4 seconds. Thereafter the scene remains composed, with slow drift and small traveling pulses. No controls, counters, rotating formations, or technical captions compete with the content.

Instrument Sans, locally hosted under the SIL Open Font License, replaces D-DIN in the current Torall presentation. The original Torall lockup remains. Desktop heading sizes are capped at 92px, mobile at 46px. The exact headline and supporting paragraph from the brief are used. Charcoal `#0D1114`, surface `#171E20`, warm white `#F2F4F1`, muted text `#A6B3B0`, and subdued mint `#A8D7C5` anchor the shared system. Hover states and thin rules remain quiet.

Home now follows: hero → authentic Lumera work → concise philosophy → all five services → four-step process → contact invitation. Sections change scale and alignment rather than repeating cards. The film remains accessible on Services; useful FAQs remain accessible on Contact. Portfolio, About, Contact, service index, individual service pages, navigation, and footer share the new type/color/spacing system.

## Reference study and applied skills

The installed Frontend Design, UI UX Pro Max, and Vercel Web Design Guidelines SKILL.md instructions were read fully before implementation. The current Web Interface Guidelines reference was also read.

- **Frontend Design:** one memorable visual idea, subject-specific interface geometry, deliberate typography, real product screenshots, varied editorial layouts, and screenshot-led refinement. No invented testimonials, clients, metrics, or project results.
- **UI UX Pro Max:** the broad generated pink/purple design recommendation was rejected as off-brief. A focused minimalism/Swiss-style search informed the grid and hierarchy. UX/React references informed motion preferences, responsive density limits, effect cleanup, and usable target sizes.
- **Vercel Web Design Guidelines:** semantic links and buttons, visible keyboard focus, skip navigation, image dimensions and meaningful alt text, local font preload, native form fields, inline validation, focus after validation, URL-backed portfolio perspectives, and reduced motion. The contact composer clearly states that nothing has been sent.

All four requested references were visually inspected on desktop and mobile:

- [Instrument](https://www.instrument.com/): cohesive identity, clear hierarchy, product imagery as primary content.
- [BASIC/DEPT](https://www.basicagency.com/): restrained navigation and strong spacing around large typography.
- [Work & Co](https://work.co/): credible actual product evidence and concise supporting information.
- [Locomotive](https://locomotive.ca/en): deliberate composition and editorial project presentation.

No reference assets, branding, code, or layouts were copied.

## Before / after assessment

The starting production design used large D-DIN text, a forest palette, and an off-canvas contour sculpture that left the hero visually empty. The earlier approved dark particle version had a stronger full-width environment but multiple competing formations. This preview retains that dark foundation while simplifying it to one persistent software architecture scene.

The featured Lumera work previously used an older single screenshot. The new composition combines fresh captures of the actual public homepage and actual mobile forms library. The desktop image remains honest about the existing demo's `YOUR VIDEO HERE` treatment; the independent application was not edited to improve the screenshot.

During development another contributor published the gray-violet showroom in `21806df`. Its history and new source files are retained in this branch. This preview does not deploy over that production version.

## Implementation and performance

- Existing React/Vite architecture; no new npm dependencies.
- Full-hero Canvas 2D renderer with authored 3D coordinates and perspective projection.
- Responsive SVG fallback renders before canvas and remains if canvas is unavailable.
- Desktop maximum 1,100 ambient points / DPR 2 / 40fps; mobile maximum 260 / DPR 1.5 / 30fps.
- Reduced motion draws the completed static composition without scheduling animation frames.
- Animation stops offscreen and when the document is hidden; observers and listeners are removed on unmount.
- No React state updates per animation frame. Image dimensions reserve layout space; below-fold product images load lazily. Existing films do not load until requested.
- Full-document `/lumeratm` links retain the existing Vercel reverse proxy. `vercel.json` is unchanged.

## Validation

- `npm run build`: passed, including `tsc -b` and Vite build.
- `npm run test`: 17 passed in 4 files. New cases cover full-width/height point coverage at all five requested sizes, density caps, static reduced motion, offscreen stop/resume, cleanup, canvas fallback, mobile navigation, portfolio keyboard interaction, and local contact preparation.
- `node --test tests/particles.test.mjs`: all 6 existing legacy particle tests passed. These test the retained older system, not the new hero.
- ESLint on all changed TS/TSX files: passed.
- Repository lint baseline: 11 errors. This branch fixes the touched navigation effect; 10 pre-existing errors remain in untouched UI/legacy files (seven mixed-export warnings elevated to errors, sidebar render randomness, and two legacy About effects).
- Changed-file Prettier checks and `git diff --check`: passed. No GitHub Actions workflow exists in this repository; the available package checks were run locally.
- Actual Chrome visual review at 1440×900, 1920×1080, 1024×768, 390×844, and 360×800. Captures confirm visible points behind the left headline and canvas coverage from edge to edge. Mobile composition was moved down/inward after review to clear the CTA and retain a recognizable website surface.
- Browser review of Home, Portfolio, About, Services, an individual service page, and Contact. Checked portfolio arrow-key changes, service-prefilled contact selection, invalid-field messages, and the prepared-email state without opening or sending email.
- Motion and cleanup behavior are automated checks; no claim of a full assistive-technology audit or physical-device performance benchmark is made.

## Protected projects

Only the Torall feature branch is intended for a preview deployment in the existing Torall Vercel project. No main merge, production promotion, domain/billing/account changes, or independent Lumera changes are included. BrickellHouse was not accessed. The public Lumera demonstration was viewed solely to capture its actual interface and confirm the existing integration.
