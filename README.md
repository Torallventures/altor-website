# Torall Ventures — Website

Company website for Torall Ventures. Deep-space theme: animated nebula
shader background, particle hero, scroll-replay animations, court green
brand palette.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Three.js (hero particle core + full-page animated nebula background)
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

Portfolio replaces the former top-level Services/Templates navigation. It features
Lumera and incorporates the existing service overviews and feature lists. All five
`/services/:slug` detail pages remain intact. Old `/services` and `/templates` links
resolve to `/portfolio`.

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
- The existing GitHub Actions workflow deploys `main` to the existing Torall project.
  It remains unchanged. Confirm the destination and user authorization before release.
- Deploy compatible Lumera changes before publishing Torall routing changes. Verify
  standalone and proxied assets, including partial/range requests for video.
- Keep the two repositories and deployments independent. Do not add root-level
  `/_next` or `/media` proxies that could collide with future Torall assets.
- Billing, domains, credentials, and unrelated project settings are outside this change.

### Verification

Run `npm run build` and ESLint for changed files. Check desktop/mobile Portfolio,
legacy route aliases, all service detail pages, the full Lumera experience, its
return link, and direct/refresh loading of hash routes. The existing full-lint
baseline contains 10 unrelated UI/About errors; the existing bundle-size warning
also remains.

## Visitor experience and inquiries

The homepage connects the cinematic hero and services film to the capabilities gallery,
featured Lumera experience, project process, common questions, and contact action.
The site uses the established dark/green identity. Interior pages use a quiet CSS
background; the Three.js particle renderer is loaded only on the homepage.

Contact prepares a project email for the visitor to review and send in their own email
app. It does not submit a server-side form or claim delivery. A copy-brief option works
with webmail; if clipboard access is unavailable, a selectable brief is displayed.
Service-detail links carry the selected service into the inquiry form. No email API,
new credentials, tracking service, database, or paid service has been added.

Shared page metadata supplies route titles, descriptions, canonical URLs, and noindex
for the missing-page view. Public robots.txt and sitemap.xml list the main Torall pages.
Navigation includes a skip link, route focus, and Escape-to-close mobile menu behavior.

The restoration commit reverses the three 2026-11-11 redesign commits while retaining
PRs #35–38 (particle hero, service/gallery work, and supplied film). History is preserved.
