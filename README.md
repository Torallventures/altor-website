# Altor Technologies — Website

Company website for Altor Technologies. Deep-space theme: animated nebula
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
