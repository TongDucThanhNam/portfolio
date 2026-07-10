# Astro to TanStack Start and Better-T-Stack Migration

## Objective

Move the portfolio from Astro to TanStack Start, then align the repository with the Better-T-Stack Cloudflare/D1/Alchemy architecture.

## Framework Boundary Changes

Removed Astro-owned files:

- `astro.config.mjs`
- `src/pages/index.astro`
- `src/layouts/*.astro`
- Astro wrapper components under `src/components/*.astro`

Added TanStack Start-owned files:

- `apps/web/src/router.tsx`
- `apps/web/src/routes/__root.tsx`
- `apps/web/src/routes/index.tsx`
- `apps/web/vite.config.ts`

Added Better-T-Stack-style workspace packages:

- `packages/infra/alchemy.run.ts`
- `packages/db/drizzle.config.ts`
- `packages/db/src/schema/index.ts`
- `packages/env/src/server.ts`
- `packages/env/src/cloudflare-local.ts`

## Runtime Model

TanStack Start treats route modules as isomorphic by default. The previous Astro app used client directives such as `client:idle` and `client:visible`, so browser-heavy UI was implicitly isolated from SSR.

To preserve behavior during migration, `apps/web/src/routes/index.tsx` sets:

```ts
ssr: false
```

This prevents SSR from executing the animation-heavy home page while still using TanStack Start routing, head management, bundling, and the Cloudflare deployment path.

The production runtime changed again after the first framework migration:

- Removed the Nitro `node-server` preset and `server.ts` entrypoint.
- Added Alchemy's TanStack Start Cloudflare integration.
- Added a D1 resource bound as `DB` through `packages/infra/alchemy.run.ts`.
- Added `packages/env` so server code can import typed Cloudflare bindings from `cloudflare:workers`.

The local Vite dev server uses a shim for `cloudflare:workers` unless Alchemy has generated `.alchemy/local/wrangler.jsonc`.

## Build And Serve

Development:

```sh
npm run dev
```

Validation:

```sh
npm run typecheck
npm run build
```

Local preview:

```sh
npm start
```

The Vite/TanStack Start build emits:

```txt
apps/web/dist/client/
apps/web/dist/server/
```

Cloudflare production deployment is owned by:

```sh
npm run deploy
```

D1 migrations are generated from `packages/db/src/schema`:

```sh
npm run db:generate
```

## Follow-Up Hardening

These are not required for the framework migration, but they are the next risk-reduction steps:

- Re-enable SSR selectively after browser-only code is isolated.
- Prune remaining unused legacy 3D/image/icon dependencies after the new portfolio UI stabilizes.
- Extract reusable Tailwind components from `NamPortfolio.tsx` if another route starts using the same `DESIGN.md` theme.
- Add real D1 tables under `packages/db/src/schema` before persisting runtime data.
