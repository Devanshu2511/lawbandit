# Deployment Guide (Vite + React + Tailwind)

This app is a static Single‑Page Application built with Vite. The production build outputs to `dist/` and can be hosted on any static host (Vercel, Netlify, Cloudflare Pages, S3+CloudFront, GitHub Pages) or served via Nginx using Docker.

## Quick Start (Local)
```bash
# 1) install deps
npm install

# 2) dev server
npm run dev

# 3) production build
npm run build

# 4) preview the build
npm run preview
```

## Deploy to Vercel
- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Deploy to Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Redirects: add a `_redirects` file with `/*   /index.html   200` (for SPA routing)

## Deploy to Cloudflare Pages
- Build command: `npm run build`
- Build output: `dist`
- Framework preset: **Vite**

## Deploy with Docker (Nginx)
This repo includes a `Dockerfile` and `nginx.conf` for SPA routing.
```bash
# build the image
docker build -t my-vite-app .

# run the container
docker run -it --rm -p 8080:8080 my-vite-app

# open http://localhost:8080
```
Port can be changed by editing `nginx.conf`.

## Environment Variables
If you add environment variables at build time, expose them as `VITE_*` so Vite inlines them. Example:
```bash
# On your platform or locally before build
export VITE_API_BASE_URL="https://api.example.com"
npm run build
```

## Common Issues
- **Blank page on refresh / 404s on deep links:** Ensure SPA fallback is set. In Docker, it's handled by `nginx.conf`. On Netlify, use `_redirects`. On Vercel/CF Pages, the preset handles it.
- **Incorrect asset paths when served from a subpath:** Set `base` in `vite.config.ts` to the subpath (e.g., `/myapp/`) and rebuild.
