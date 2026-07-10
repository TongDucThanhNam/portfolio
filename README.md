# TanStack Start Portfolio

Personal portfolio for Tong Duc Thanh Nam, migrated from Astro to a Better-T-Stack-style TanStack Start workspace.

## Stack

- npm workspaces with `apps/*` and `packages/*`
- TanStack Start with TanStack Router in `apps/web`
- React 18
- Vite 8
- Cloudflare deployment through Alchemy
- Cloudflare D1 with Drizzle in `packages/db`
- Tailwind CSS 4 via `@tailwindcss/vite`, with the `DESIGN.md` bone/ink/rebar theme defined in CSS
- Lenis + GSAP ScrollTrigger for portfolio scroll, reveal, story, cursor-preview, and typewriter motion

## Getting Started

Requirements:

- Node.js 22.12 or newer
- npm

Install dependencies:

```sh
npm ci
```

Run the development server:

```sh
npm run dev
```

Build and typecheck:

```sh
npm run typecheck
npm run build
```

Preview the built web app locally:

```sh
npm start
```

The preview command serves `apps/web/dist`. Production deploy is handled by Alchemy, not by a Node server entrypoint.

## Cloudflare Deploy

Local env files are intentionally ignored. The committed examples describe the expected shape:

- `apps/web/.env.example` - web/runtime values such as `CORS_ORIGIN`
- `packages/infra/.env.example` - Alchemy state password

Cloudflare credentials must be available in the shell when deploying:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

Generate D1 migrations from `packages/db/src/schema`:

```sh
npm run db:generate
```

Deploy or destroy the Cloudflare resources through Alchemy:

```sh
npm run deploy
npm run destroy
```

## Project Structure

- `apps/web/src/routes/__root.tsx` - root document, metadata, styles, providers, scripts
- `apps/web/src/routes/index.tsx` - portfolio page route
- `apps/web/src/router.tsx` - TanStack Start router entry via `getRouter()`
- `apps/web/vite.config.ts` - Tailwind CSS v4, TanStack Start, React, Cloudflare/Alchemy plugin, and aliases
- `DESIGN.md` - canonical portfolio design system copied from `nam-portfolio/DESIGN.md`
- `apps/web/src/components/NamPortfolio.tsx` - React/Tailwind port of the `nam-portfolio` HTML/CSS/JS experience, including Lenis/GSAP motion setup
- `apps/web/src/styles/global.css` - Tailwind v4 entry, CSS-first theme tokens, and small global interaction primitives
- `packages/infra/alchemy.run.ts` - Cloudflare Worker app and D1 resource graph
- `packages/db/` - Drizzle schema and D1 migration generation
- `packages/env/` - typed Cloudflare Worker bindings and local shim

## Migration Notes

Astro config, layouts, pages, integrations, and `.astro` components were removed. The page is now composed as a TanStack Start file route.

The home route currently uses `ssr: false` because the portfolio contains browser-only scroll, cursor, and typewriter interactions. Server rendering can be reintroduced after those interactions are isolated behind client-only boundaries.

The repository now follows the Better-T-Stack shape for `tanstack-start + backend self + sqlite/drizzle + D1 + Cloudflare web deploy`: web app in `apps/web`, infra in `packages/infra`, database schema in `packages/db`, and environment bindings in `packages/env`.

## Verification

Current migration gates:

```sh
npm run typecheck
npm run build
npm run db:generate
```

Local preview after build runs through `npm start`.

## References

- [TanStack Start documentation](https://tanstack.com/start/latest/docs/framework/react/overview)
- [Better-T-Stack project structure](https://www.better-t-stack.dev/docs/project-structure)
- [Better-T-Stack stack builder](https://www.better-t-stack.dev/new)
- [Cloudflare TanStack Start guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)
