# Tailwind CSS v4 migration evidence

The production React route was captured before and after the utility-only migration with the
in-app browser's viewport capability and `prefers-reduced-motion: reduce`. Each directory contains
a full-page PNG and computed-layout JSON for the four requested viewport settings.

- [`baseline/`](./baseline/)
- [`final/`](./final/)

## Geometry comparison

| Requested viewport | Baseline page height | Final page height | Delta | Final horizontal overflow |
|---|---:|---:|---:|---|
| 390 × 844 | 14,715 px | 14,664 px | -51 px (-0.35%) | None |
| 768 × 1024 | 13,204 px | 13,165 px | -39 px (-0.30%) | None |
| 1024 × 768 | 11,397 px | 11,344 px | -53 px (-0.46%) | None |
| 1440 × 900 | 12,231 px | 12,169 px | -62 px (-0.51%) | None |

The browser host reported a 20–21 px narrower final content viewport because of scrollbar
accounting. Hero height and every section after Projects retained the exact baseline height at all
four settings. The project section accounts for the small page-height delta; its corrected desktop
grid, rail offset, colors, typography, disclosures, and canvases were visually reviewed against the
baseline.

## Interaction and accessibility checks

| Surface | Result |
|---|---|
| Skip link | First interactive element; focused state reveals the link with a solid rebar outline. Activation resolves `#portfolio-main`, and the target lands at the viewport top. |
| Why tabs | Click, ArrowRight, Home, and End update `aria-selected`, focus, and the visible tabpanel. |
| Project disclosures | Native `details`/`summary` semantics retained; pointer activation toggles the `open` state. |
| Project chapters | Scrolling to AI Workspace updates the matching rail link to `aria-current="location"` and activates its canvas. |
| Scroll progress | Measured from `scaleX(0.0038)` at the top to `scaleX(1)` at Contact. |
| Full motion | `data-motion="full"` reaches ready state, hero content becomes visible, and 12 decorative animations are active. |
| Reduced motion | `data-motion="reduced"`; 0 running animations, 33/33 reveal targets visible, and no hidden reveal target. |
| Responsive overflow | `scrollWidth === clientWidth` at all four viewport settings. |

## Automated gates

- `npm run check:tailwind-only` — passed.
- `npm run typecheck --workspace web` — passed.
- `npm run build --workspace web` — passed for client and SSR.
- `npx biome check ...` over the migrated files — passed.
- Compiled production CSS: 69.55 KB, down from the 84.58 KB baseline.
- Tailwind and the Vite plugin resolve to v4.3.2.

The audit intentionally excludes `public/` document assets. In particular,
`public/Tong_Duc_Thanh_Nam_CV_SlimAI_Harvard_DeepProjects_DemoLinks_EN.html` is a protected,
standalone downloadable CV artifact; the migration constraints prohibit changing CV assets, and it
is not imported by or used to style the application.
