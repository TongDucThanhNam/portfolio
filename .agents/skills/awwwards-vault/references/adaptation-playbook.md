# Adaptation Playbook

Deep manual for porting a lab mechanism into a target project. Read the sections you need — this file is declarative knowledge; the workflow lives in `SKILL.md`.

## Porting patterns

### Vanilla package → React

- Wrap the mechanism in a component; mount target elements via **refs, not selectors** (`document.querySelector` inside React invites double-match bugs).
- GSAP: prefer `useGSAP(fn, { scope })` from `@gsap/react` (auto cleanup + scope). Without it, use `gsap.context()` and revert in cleanup. Never leave tweens running after unmount — React 18 StrictMode double-invokes effects in dev, which surfaces missing cleanup instantly.
- Three.js / WebGL: create the renderer in the effect, keep handles in refs, and dispose renderer/geometries/materials/textures on cleanup. RequestAnimationFrame loops must be cancelled.
- SplitText/ScrollTriggers created imperatively: register via `gsap.registerPlugin` once at module top.

### React package → vanilla

- Lift the effect logic out of the component lifecycle into a plain module with `init(el)` / `destroy()` exports; call them from the host page's own bootstrap.

### Next.js / SSR frameworks

- Mark animation components `'use client'`; import Three.js and any window-dependent code inside `useEffect` or via `next/dynamic` with `ssr: false`.
- Guard browser-only APIs (`typeof window !== 'undefined'`) — lab code assumes a static browser page.

### Static HTML

- Copy runtime files from `vault source`, inline or link them, wrap bootstrapping in `DOMContentLoaded` (or `defer`), and keep the package's data-attribute config surface — it is the re-theming hook.

## Smooth-scroll integration (Lenis + ScrollTrigger)

Baseline wiring when the target page uses Lenis with GSAP scroll effects `[General model — verify against the project's installed versions]`:

```js
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

Without this, ScrollTrigger reads un-smoothed positions and triggers desync from what the visitor sees. Pinned sections + Lenis on touch devices: test `lenis` smoothTouch behavior explicitly — some mechanisms assume desktop wheel scrolling.

## Token re-theming

- Map, never keep: the package's demo colors/spacing/radius/easing → the target project's tokens. Replace CSS custom properties at their declaration site rather than overriding at usage sites.
- Strip identity checklist: component's own name/branding in markup and copy, demo fonts, demo palette, demo imagery, source-file comment headers. What ships must read as native to the destination project.
- Keep the mechanism's *structure* (data attributes, class contract between CSS and JS, timing ratios) — that is the mechanism; everything visual is negotiable.

## Dependencies

| Library | npm/bun | Notes |
|---|---|---|
| GSAP core + ScrollTrigger | `gsap` | Free plugins ship in the public npm package and CDN |
| GSAP Club (SplitText, ScrambleText, Inertia…) | `gsap` | 404 on the public CDN below `gsap@3.13`; verify the project's resolution before using |
| Lenis | `lenis` | Package renamed from `@studio-freight/lenis` — old name is the deprecated publish `[Version-dep]` |
| Three.js | `three` | Match the version the mechanism was written against when shaders are involved |
| Motion | `motion` | Formerly Framer Motion |
| Anime.js | `animejs` | v4 changed import style vs v3 `[Version-dep]` |

CDN (static pages): pin exact versions; never floating `@latest` tags.

## Verification checklist

- [ ] Build/run passes in the target project (its own tooling, not the lab's).
- [ ] Effect exercised: hover, scroll, drag, resize — not just initial render.
- [ ] Console clean; no 404s; no unhandled rejections.
- [ ] Mobile width checked — caveats usually name the exact mobile failure mode.
- [ ] `prefers-reduced-motion` respected or consciously overridden.
- [ ] React: mount/unmount/remount cycle leaves no leaked tweens, listeners, or canvases.
- [ ] Zero references (import/fetch/hotlink) pointing back into the lab path.

## Worlds (art-direction systems)

When the ask is a whole look, not one effect: `vault worlds` → read the world's `WORLD.md` (five-rule spec) + `tokens.css`. A world is knowledge, not a runnable package — carry the palette/material/type/composition/motion system, re-theme the subject matter, and credit the lineage in the PR/commit message.
