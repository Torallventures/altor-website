# Torall studio direction

This redesign starts from main commit `126938f`, preserving the dedicated Services page, all five service descriptions, existing media, and Lumera's independent routing.

## Visual system

- Forest `#141b17`: primary canvas. Deep forest `#202a23`: secondary surfaces.
- Mineral `#e4e9e1`: the featured-product stage. White `#f0f2ec`: main text.
- Torall green `#a4c68a`: action and identity color. Muted `#b2bdb4`: secondary text.
- Existing locally hosted D-DIN regular and bold. Large, tightly set display type; readable paragraphs with limited line lengths.
- The approved open-contour symbol becomes a dimensional brand study. One short entrance replaces unrelated looping effects; reduced motion shows the final composition immediately.
- The Lumera product image is an actual existing screenshot. No fabricated client projects, testimonials, team photographs, or performance statistics.

## Page composition

Home: brand introduction → working product → services → existing film → principles → process → questions → inquiry.

Portfolio: product introduction → large authentic Lumera preview → three accessible perspectives → customization context → inquiry. The full experience still opens with a document navigation to `/lumeratm`.

Services retain their dedicated index and individual routes. About uses factual positioning. Contact prepares an email; it never claims a message was delivered by a nonexistent backend.

## Implementation

Shared components and responsive tokens live in `src/components/studio/`. Existing legacy components remain in source history and are not imported into the new experience. Service content remains in `src/data/services.tsx`.

Native links, focus states, skip navigation, mobile disclosure navigation, URL-backed portfolio perspectives, reduced motion, intrinsic image sizes, and non-autoplay films keep the experience usable without animation.

The locally installed Frontend Design, UI UX Pro Max, and Web Design Guidelines informed this system. The initial UI UX dataset recommendation (pink brutalism) did not fit Torall; a focused minimalism search informed the grid and interaction treatment instead. Instrument and BASIC/DEPT were references for project emphasis and content hierarchy, not sources of copied assets or code.

Production TypeScript/Vite compilation passed. Automated tests, lint, and browser/screenshot checks were skipped at the user's explicit request. Deployment is through the existing Torall Git integration; Vercel configuration, billing, and the independent Lumera application are unchanged.
