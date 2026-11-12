# Torall Ventures — Website

Company website for Torall Ventures. An editorial agency experience with the
established Torall typography, dark background, and green brand palette.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- CSS motion and visibility-aware video; legacy Three.js components remain unused
- Lucide icons

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs static site to dist/
```

## Deploy

Static site — deploy `dist/` to any static host. On Vercel: import the
repo, framework preset **Vite**, build command `npm run build`, output
directory `dist`.

## Portfolio and Lumera

Portfolio presents an interactive, filterable collection with Lumera as its first
experience. `/portfolio/lumera` retains the detailed Torall case study. The homepage
Services anchor and all five `/services/:slug` detail pages retain the existing
service overviews, stories, and feature lists. Old `/services` and `/templates`
links resolve to `/portfolio`.

Lumera runs independently in `Torallventures/lumera-template`. The existing Torall
Vercel project proxies `/lumeratm` and `/lumeratm/:path*` to the matching paths on
`https://lumera-template.vercel.app`, before its unchanged SPA fallback. These are
rewrites, not redirects or iframes. No additional project, paid product, middleware,
or credentials are required.

Lumera's Next.js basePath is `/lumeratm`; its scripts, styles, video, posters and
community images use that namespace. Existing internal navigation is hash-based:
`/lumeratm#/portal/overview` and `/lumeratm#/community/forms`. Direct visits and
refreshes preserve the path and hash. The standalone deployment's root redirects
within its own domain to `/lumeratm`. Its Back to Portfolio link returns to
`https://torallventures.com/portfolio`.

Demo activity is browser-local and origin-specific: records saved on the standalone
Lumera domain do not automatically appear on the Torall domain. Roles demonstrate
permissions; they are not production authentication. No API, database or messaging
service is connected by this integration.

### Collaboration and deployment

- Fetch the current `main` before starting; keep changes on a feature branch and
  review through a pull request. Never force-push over another developer's work.
- The existing Vercel Git integration deploys `main` to the existing Torall project.
  Deployment configuration remains unchanged. Confirm destination and authorization
  before release.
- Deploy compatible Lumera changes before publishing Torall routing changes. Verify
  standalone and proxied assets, including partial/range requests for video.
- Keep the two repositories and deployments independent. Do not add root-level
  `/_next` or `/media` proxies that could collide with future Torall assets.
- Billing, domains, credentials, and unrelated project settings are outside this change.

### Verification

Run `npm run build`. Review desktop and mobile navigation, portfolio filters,
service accordions, service detail pages, contact preparation, and route refreshes.
Respect reduced-motion preferences. Torall-only presentation changes do not require
access to the independently managed Lumera application.

## Visitor experience and inquiries

The homepage follows the reference agency format: a spacious introduction and
floating Torall character, full-width services film, counter-moving type bands,
staggered portfolio, industry wordmarks, six interactive values, service accordions,
moving photo strip, creative-space photograph, inquiry form, featured Lumera card,
and illustrated landscape footer. Interior pages share the same navigation and
visual system. Scroll reveals, hover details, and character docking respect reduced
motion; offscreen videos pause. Photographs are locally hosted and documented in
`public/media/agency/ATTRIBUTION.txt`. Industry names describe audiences, not clients.

Contact prepares a project email for the visitor to review and send in their own email
app. It does not submit a server-side form or claim delivery. A copy-brief option works
with webmail; if clipboard access is unavailable, a selectable brief is displayed.
Visitors can download a local `.eml` draft, optionally including a supporting file
up to 8 MB. Files stay in the browser and are never uploaded by this website.
Service-detail links carry the selected service into the inquiry form. No email API,
new credentials, tracking service, database, or paid service has been added.

Shared page metadata supplies route titles, descriptions, canonical URLs, and noindex
for the missing-page view. Public robots.txt and sitemap.xml list the main Torall pages.
Navigation includes a skip link, route focus, and Escape-to-close mobile menu behavior.

The agency redesign builds on the shared restoration and preserves the existing
service content, supplied film, portfolio integration, and complete Git history.
