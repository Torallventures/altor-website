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

## Templates and Lumera

The `/templates` route is part of this existing Torall website. Its dedicated
`templates/index.html` build entry also produces `dist/templates/index.html`,
so direct visits and refreshes work on a static host without a deployment rewrite.
The gallery uses the existing shared navigation, footer, palette, and fonts.

Explore Template opens the complete, independent Lumera application at the URL in
`src/lib/templates.ts`. Lumera is maintained in the private repository
`Torallventures/lumera-template`; its Back to Templates link returns to
`https://torallventures.com/templates`. This repository contains only a preview
screenshot, not a copy of Lumera or its portal.

Before merging this feature, obtain approval for Lumera's first deployment,
confirm its GitHub connection, and test `https://lumera-template.vercel.app`.
The assigned domain is not a working deployment until that step is completed.
Public commercial use also requires checking Vercel's current hosting terms.
Do not change the existing plan or billing automatically.

### Collaboration

- Fetch `origin` before starting work and branch from its latest `main`.
- Push work to a feature branch and open a pull request targeting `main`.
- Review newer changes from the other developer before merging; never force-push
  or overwrite their work.
- Merging or pushing to `main` triggers the existing production deployment
  workflow. Both require the owner's explicit approval. The workflow and existing
  Vercel project configuration are unchanged by this feature.
- Lumera has its own repository and Vercel project. Continue making its changes
  independently; do not import it into this application's build.

### Feature checks

```bash
npm run build
npx eslint src/App.tsx src/pages/Templates.tsx src/sections/Navbar.tsx src/sections/Footer.tsx src/lib/navigation.ts src/lib/templates.ts vite.config.ts
```

Check desktop and mobile navigation, direct loading and refresh of `/templates/`,
the Explore Template URL, and links back to homepage sections. The full lint run
currently has 10 pre-existing errors in UI components and `src/sections/About.tsx`;
these are outside the Templates change.
