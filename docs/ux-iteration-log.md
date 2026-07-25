# UX iteration log

## 2026-07-25 — `/` / zero-orbit portrait reset

| Field | Evidence |
| --- | --- |
| Status | Implemented and locally verified; not deployed |
| Supersedes | Every portrait orbit, frame, connector, node, plate, and telemetry treatment explicitly rejected by the user |
| Accepted audit baseline | `docs/ux-ui-map/external-audit-baseline-HeroSection-20260725T100818Z.txt` |
| Final maps | `docs/ux-ui-map/final-HeroSection-20260725T102038Z.txt`; `docs/ux-ui-map/final-PortraitOrbit-20260725T102038Z.txt` |
| Independent audit | `C:\Users\terasumi\Documents\source_code\improve-ux-ui\artifacts\herosection-20260725T100818Z` |
| Semantic verdict | `ACCEPT`; subtraction only, with no replacement geometry or portrait-mounted annotation |
| Viewports | 1865 × 970, 1280 × 720, 1024 × 768, and 390 × 844 |

### Direction delivered

- Removed the `PortraitOrbit` component, import, and mount rather than
  attempting another geometric revision.
- Removed the dashed portrait-to-`HUMAN` handoff and all three portrait tags:
  `unit: human`, `override: enabled`, and `coffee: 78%`.
- Deleted the orbit SVG, route, nodes, live pulse, title plate, animations,
  responsive overrides, and unused legacy orbit styles.
- Added no replacement curve, circle, ring, path, badge, node, plate, frame,
  halo, rail, or floating label.
- Preserved the portrait asset and crop, wordmarks, premise, metadata,
  `HumanLoopPanel`, CTAs, proof strip, and accessible portrait alt text.

### Baseline-to-final evidence

- The final `HeroSection` map contains no `PortraitOrbit` source branch and no
  portrait-mounted decoration literals.
- A final focused map for `PortraitOrbit` fails closed because the component no
  longer exists below `apps/web/src`; that removal evidence is recorded in the
  final map artifact.
- The production client stylesheet falls from 90.06 kB to 84.58 kB
  uncompressed and from 18.70 kB to 17.65 kB gzip after the dead decoration
  system is removed.

### Verification

- The supplied 1865 × 970 composition renders the portrait in clean negative
  space with the wordmarks and HUD carrying the hierarchy.
- Desktop, tablet, and mobile runtime checks report zero orbit, plate,
  connector, node, or portrait-tag elements and no horizontal overflow.
- Reduced-motion emulation preserves the same portrait-only composition.
- Targeted Biome formatting/check, TypeScript typecheck, and production build
  complete successfully. Biome reports the same 14 pre-existing stylesheet
  warnings and no errors.
- Connected-browser diagnostics contain the known environment-only hydration
  warning caused by the injected `div#codex-browser-sidebar-comments-root`;
  the production build itself succeeds.

## 2026-07-25 — `/` / portrait connector correction

| Field | Evidence |
| --- | --- |
| Status | Superseded by full removal of the portrait decoration system after explicit user rejection; not deployed |
| Supersedes | The portrait-to-wordmark L-connector explicitly rejected by the user |
| Accepted audit baseline | `docs/ux-ui-map/external-audit-baseline-HeroSection-20260725T094932Z.txt` |
| Final maps | `docs/ux-ui-map/final-HeroSection-20260725T100242Z.txt`; `docs/ux-ui-map/final-PortraitOrbit-20260725T100242Z.txt`; `docs/ux-ui-map/final-SystemSignal-20260725T100242Z.txt` |
| Independent audit | `C:\Users\terasumi\Documents\source_code\improve-ux-ui\artifacts\herosection-20260725T094932Z` |
| Semantic verdict | `ACCEPT`; the audit diagnosis was adopted, while its full-width replacement curve was rejected in favor of removing the redundant connector |
| Viewports | 1865 × 970, 1280 × 720, 1024 × 768, and 390 × 844 |

### Direction delivered

- Traced the rejected shape to `.hero-link-loop`, which combined separate
  vertical and horizontal repeating gradients into a literal 90-degree elbow.
- Removed the page-level loop connector, its terminal dot, and the redundant
  vertical `to the loop` label instead of replacing them with another long
  decorative route.
- Replaced the portrait frame's own `V174H148` exit with one short continuous
  Bézier taper contained inside the portrait footprint.
- Preserved the quiet left-side handoff into `HUMAN`; `IN THE LOOP` now stands
  on its own as the destination wordmark.
- Updated the decorative system SVG description so assistive technology no
  longer announces a continuous enclosing loop that does not exist.

### Baseline-to-final evidence

- `HeroSection` no longer renders `.hero-link-loop` or
  `.hero-link-loop-label`; all identity, manifesto, location, portrait, HUD,
  CTA, and proof-strip content remains.
- No `V174H148` right-angle path or `to the loop` literal remains in the target
  source or stylesheet.
- `PortraitOrbit` retains its exact title-block copy and existing route/node
  hierarchy; only the rejected exit geometry changes.

### Verification

- The supplied 1865 × 970 composition has no vertical drop, horizontal tail,
  terminal dot, or replacement full-width curve.
- Desktop, tablet, and mobile runtime checks report zero rejected connector
  elements and no horizontal overflow.
- Reduced-motion emulation disables the remaining route and live-node
  animations while preserving the static frame geometry.
- Targeted Biome formatting/check, TypeScript typecheck, production build, and
  `git diff --check` complete successfully. Biome reports the same 14
  pre-existing stylesheet warnings and no errors.
- Connected-browser diagnostics contain the known environment-only hydration
  warning caused by the injected `div#codex-browser-sidebar-comments-root`;
  the production build itself succeeds.

## 2026-07-25 — `/` / asymmetric portrait frame revision

| Field | Evidence |
| --- | --- |
| Status | Superseded at the loop connector after explicit user rejection; not deployed |
| Supersedes | The circular orbit and medallion treatment below, rejected by the user |
| Accepted audit baseline | `docs/ux-ui-map/external-audit-baseline-PortraitOrbit-20260725T074957Z.txt` |
| Final map | `docs/ux-ui-map/final-PortraitOrbit-20260725T080854Z.txt` |
| Independent audit | `C:\Users\terasumi\Documents\source_code\improve-ux-ui\artifacts\portraitorbit-20260725T074957Z` |
| Semantic verdict | `ACCEPT`; constrained to one open frame, one short active route, two docks, one live node, and one flat title block |
| Viewports | 1865 × 970, 1280 × 720, 1024 × 768, and 390 × 844 |

### Direction delivered

- Removed the near-complete circle, inner echo, concentric badge, circular
  copy, badge spin, and duplicated status dot.
- Reframed the portrait with one open top/right Bézier route that preserves
  the existing wordmark connector endpoints without enclosing the face.
- Added one short, slowly drifting terracotta segment over a quiet ink
  hairline and retained only two small connector docks plus one live node.
- Remounted the exact manifesto copy as a rectilinear title block aligned with
  `unit: human`, positioned over the left shoulder rather than the face.
- Mobile keeps a low-contrast open frame but removes the title block so the
  revision does not add to the existing small-screen Hero density.

### Baseline-to-final evidence

- `PortraitOrbit` keeps its only visible literal unchanged; its source line
  moves from 115 to 85 because the circular badge markup was removed.
- No full-circle SVG primitive, circular text path, badge class, concentric
  track, or orbit-spin animation remains in the final component.
- Hero identity, portrait asset, annotations, wordmarks, connectors,
  `HumanLoopPanel`, CTAs, and proof strip remain unchanged.

### Verification

- The supplied 1865 × 970 composition keeps the portrait dominant and aligns
  the frame exit with the existing vertical `to the loop` connector.
- Tablet retains the full frame and mounted title block; mobile retains only
  the quiet frame. All tested viewports have no horizontal overflow.
- Reduced-motion CSS freezes the route drift and live-node pulse while
  preserving their static geometry.
- Targeted Biome formatting/check, TypeScript typecheck, production build,
  and `git diff --check` complete successfully. Biome reports 14 pre-existing
  stylesheet warnings outside the revised frame rules and no errors.

## 2026-07-25 — `/` / portrait orbit refinement

| Field | Evidence |
| --- | --- |
| Status | Superseded after explicit user rejection; not deployed |
| Accepted audit baseline | `docs/ux-ui-map/external-audit-baseline-PortraitOrbit-20260725T041537Z.txt` |
| Final maps | `docs/ux-ui-map/final-PortraitOrbit-20260725T043551Z.txt`; `docs/ux-ui-map/final-HeroSection-20260725T043551Z.txt` |
| Independent audit | `C:\Users\terasumi\Documents\source_code\improve-ux-ui\artifacts\portraitorbit-20260725T041537Z` |
| Semantic verdict | `ACCEPT`; constrained to the orbit, badge, annotations, motion, and responsive treatment |
| Viewports | 1280 × 720, 1024 × 768, and 390 × 844 |

### Direction delivered

- Rebuilt the portrait orbit as three layers: a quiet structural guide, a
  faint inner echo, and a terracotta active route between the two wordmark
  junctions.
- Differentiated the two connector anchors from the single live node, giving
  the ring a readable structure → route → status hierarchy.
- Reworked the rotating badge as a docked instrument with concentric tracks,
  a quieter central arrow, and a token-backed terracotta marker.
- Removed the hardcoded green badge status, scanline flourish, and portrait
  zoom so the portrait area uses the same restrained motion and color language
  as the rest of the Hero.
- Preserved the full orbit and badge on tablet/desktop. Runtime evidence at
  390 px showed that the existing Hero is too dense for the badge and portrait
  annotations, so mobile keeps only a low-contrast halo.

### Baseline-to-final evidence

- The visible badge copy remains unchanged; the `ui-map` difference is only
  its source line moving from 66 to 115 after the SVG gained structural
  layers.
- The Hero copy, actions, `HumanLoopPanel`, portrait asset, proof strip, and
  wordmark remain unchanged.
- The decorative scanline node is absent from the final Hero source.

### Verification

- Desktop and tablet captures preserve the ring-to-wordmark junctions and
  keep the portrait as the focal object.
- The 390-pixel capture keeps the orbit metaphor without adding badge or tag
  collisions to the dense mobile Hero.
- Reduced-motion CSS disables the badge rotation and live-node halo pulse
  while preserving their static states.
- Targeted Biome formatting/check, TypeScript typecheck, production build,
  and `git diff --check` complete successfully. Biome reports 14 pre-existing
  stylesheet warnings outside the orbit rules and no errors.
- Connected-browser diagnostics contain the known environment-only hydration
  warning caused by the injected `div#codex-browser-sidebar-comments-root`;
  the production build itself succeeds.

## 2026-07-24 — `/` / lightweight motion art-direction pass

| Field | Evidence |
| --- | --- |
| Status | Deployed and live-verified |
| Accepted audit baseline | `docs/ux-ui-map/external-audit-baseline-NamPortfolio-20260724T030848Z.txt` |
| Final map | `docs/ux-ui-map/final-NamPortfolio-20260724T034701Z.txt` |
| Independent audit | `C:\Users\terasumi\Documents\source_code\improve-ux-ui\artifacts\namportfolio-20260724T030848Z` |
| Semantic verdict | `ACCEPT`; retain the uploaded English CV as the content authority |
| Live route | `https://tanstack-start-portfolio-web-dev.terasumi.workers.dev` |
| Viewports | 1440 × 1000 and 390 × 844 |

### Motion direction delivered

- Rebuilt the first impression around a masked `Thanh / Nam` type entrance and
  an animated product-system topology connecting browser context, the AI
  workspace, Cloudflare edge delivery, and the Android IME.
- Added a dark capabilities ribbon, restrained orbital and signal motion, and
  a single IntersectionObserver-driven reveal grammar across the document.
- Added bounded pointer tilt to the hero system card without a perpetual
  pointer loop.
- Turned the project area into a focus-aware showcase: hovering or focusing a
  case updates a sticky SVG schematic, while mobile receives a compact
  drawing-only version.
- Added active progress and panel transitions to the keyboard-operable
  Product / System / Proof narrative.
- Kept the route free of loaders, custom cursors, Lenis, GSAP, Three.js, and
  heavyweight canvas simulations.

### Component-library patterns distilled

- `typography-driven-hero-reveal`: editorial masked type with CSS-only entrance
  timing.
- `refined-image-row-reveal` and `hover-image-reveal`: shared project preview
  state driven by both pointer and keyboard focus.
- `grid-to-full-preview`: archive-to-preview continuity without hiding any CV
  project.
- `magnetic-button`: bounded tactile response adapted to one hero surface.
- `threshold-footer-progress-reveal`: decisive dark contrast and a restrained
  progress motif.

### Live performance and accessibility evidence

| Runtime signal | Verified result |
| --- | ---: |
| DOM nodes | 829 |
| Desktop document height | 10,691 px |
| One-time reveal targets completed | 41 / 41 |
| Settled normal-mode animations | 9 lightweight CSS/SVG loops |
| Reduced-motion running animations | 0 |
| Five-second full-page scroll p95 frame | 8.4 ms |
| Maximum sampled scroll frame | 23.6 ms |
| Frames over 25 ms / 50 ms | 0 / 0 |
| Long tasks during full-page scroll | 0 |
| CSS + route + client gzip | 113.22 kB |

### Final verification

- The live route returns `200` and serves the final
  `global-DBwFVq4g.css` asset.
- Normal mode completes the hero entrance and settles to inexpensive SVG/CSS
  motion; reduced-motion renders the hero immediately with no hidden reveals
  or running animations.
- The 390-pixel route has no horizontal overflow and preserves three featured
  projects plus six archive projects.
- Mobile navigation locks background scrolling, makes main/footer inert,
  closes with Escape, and restores focus to the menu trigger.
- Both experience records, all eight skill groups, and all nine CV projects
  remain represented.
- The deployed CV returns `200`, `application/pdf`, and 27,562 bytes.
- Targeted Biome checks, repository typecheck, production build, and
  `bun run deploy` all complete successfully.

## 2026-07-24 — `/` / NamPortfolio

| Field | Evidence |
| --- | --- |
| Status | Deployed and verified |
| Accepted audit baseline | `docs/ux-ui-map/external-audit-baseline-NamPortfolio-20260724T021643Z.txt` |
| Final map | `docs/ux-ui-map/final-NamPortfolio-20260724T025406Z.txt` |
| Independent audit | `C:\Users\terasumi\Documents\source_code\improve-ux-ui-direct\artifacts\namportfolio-20260724T021643Z` |
| Semantic verdict | `ACCEPT`; the uploaded English CV is the authoritative content source |
| Viewports | 1440 × 1000, 1366 × 768, 390 × 844 |

### Findings resolved

- Removed the blocking intro sequence, custom cursor and trail, Lenis smooth
  scrolling, the GSAP ticker, SplitText effects, the 3D workstation, the
  300-viewport-height story scrub, schematic drawing animations, and the
  sticky project stack from the routed experience.
- Replaced seven overlapping scroll and pointer systems with one passive,
  requestAnimationFrame-throttled chapter and progress controller.
- Rebuilt the hero around immediate identity, role, outcome, work and CV
  actions, and a compact evidence panel.
- Replaced passive story choreography with a keyboard-operable Product /
  System / Proof tab set while preserving all three source relationships.
- Preserved both CV experience records, all eight skill groups and their
  items, and all nine projects with their original type, status, proof,
  highlights, stack, public-link, and no-public-link relationships.
- Rebuilt featured projects as three editorial case files in ordinary
  document flow and kept the remaining six projects as native disclosures.
- Kept email as the primary contact action and exposed phone, GitHub,
  portfolio, and CV as secondary verified actions.
- Replaced the 225,749-byte favicon with a 305-byte portfolio mark.

### Local component-library patterns distilled

- `typography-driven-hero-reveal`: masked-style editorial hierarchy expressed
  through layout and type rather than runtime text splitting.
- `grid-to-full-preview` and `refined-image-row-reveal`: the selected-project
  grid becomes full case-file reading surfaces without hover-only content.
- `threshold-footer-progress-reveal`: a decisive dark editorial ending plus a
  single inexpensive page-progress transform.
- `magnetic-button`: its tactile contrast and target hierarchy were retained,
  while the perpetual pointer-tracking loop was intentionally omitted.

### States audited

- Immediate hero load with no blocking preloader
- Desktop chapter state and scroll progress
- Product / System / Proof pointer and arrow-key selection
- Featured case files and archive disclosure open/closed states
- Mobile menu open/closed, background inertness, focus trap, Escape close, and
  focus restoration
- Direct contact, public project, and CV actions
- Reduced-motion rendering
- 1440, 1366, and 390-pixel responsive layouts

### Performance evidence

| Runtime signal | Before | After |
| --- | ---: | ---: |
| DOM nodes | 1,689 | 705 |
| Desktop document height | 12,338 px | 10,117 px |
| Active animations after load | 8 | 0 |
| Frames over 25 ms in a five-second full-page scroll | 9 | 0 |
| Maximum sampled scroll frame | 45.5 ms | 6.4 ms |
| Long-task total | 438 ms | 255 ms |
| Maximum long task | 288 ms | 176 ms |
| Transferred page resources | 260,957 bytes | 113,881 bytes |
| Favicon transfer | 77,446 bytes | 546 bytes |

### Verification

- No horizontal overflow at 1440, 1366, or 390 pixels.
- No duplicate IDs and no unlabeled buttons.
- Mobile navigation makes the main content and footer inert while open,
  closes on Escape, restores focus, and unlocks document scrolling.
- Story tabs use `tablist`, `tab`, and `tabpanel` semantics and support arrow,
  Home, and End keys.
- The rendered record contains exactly three featured projects, six archive
  projects, eight skill groups, and two experience records.
- All six public project actions match CV URLs; private, in-progress, and
  academic entries do not invent links.
- The CV endpoint returns `200`, `application/pdf`, and 27,562 bytes.
- No GSAP, Lenis, React Three Fiber, ScrollTrigger, custom-cursor, or
  workstation signatures remain in the built client route.
- Targeted Biome checks, repository typecheck, and production build complete
  successfully.
- `bun run deploy` completes successfully and the live Worker at
  `https://tanstack-start-portfolio-web-dev.terasumi.workers.dev` returns
  `200`.
- The live 390-pixel layout has no horizontal overflow; its menu makes the
  document inert while open, closes on Escape, and restores toggle focus.

## 2026-07-24 — `/` / NamPortfolio art-direction audit

| Field | Evidence |
| --- | --- |
| Status | Audited; three concept directions generated; no UI implementation |
| Baseline map | `docs/ux-ui-map/external-audit-baseline-NamPortfolio-20260724T114342Z.txt` |
| Independent audit | `C:\Users\terasumi\Documents\source_code\improve-ux-ui\artifacts\namportfolio-20260724T114342Z` |
| Semantic verdict | `REJECT`; the generated preview retained the current art direction and contradicted its own redundancy recommendation |
| Live checks | Desktop and mobile route, mobile menu, section navigation, project stage, console diagnostics |
| Generated concepts | Editorial Human / Product Proof; Technical Atelier / Living Product System; Kinetic Product Magazine |

### Decision

- Carry forward the source-backed navigation, mobile work-ordering,
  accessibility, and repeated-proof findings.
- Do not implement the audit preview.
- Use the generated concepts to choose a materially different art direction
  before changing the routed UI.

## 2026-07-24 — `/` / From Vague → Working implementation

| Field | Evidence |
| --- | --- |
| Status | Implemented and locally verified; not deployed |
| Accepted audit baseline | `docs/ux-ui-map/external-audit-baseline-NamPortfolio-20260724T122930Z.txt` |
| Final map | `docs/ux-ui-map/final-NamPortfolio-20260724T130200Z.txt` |
| Independent audit | `C:\Users\terasumi\Documents\source_code\improve-ux-ui\artifacts\namportfolio-20260724T122930Z` |
| Semantic verdict | `ACCEPT`; user-selected signal art direction supersedes the conservative audit preview |
| Viewports | 1440 × 900 and 390 × 844 |

### Direction delivered

- Rebuilt the exact `100dvh` hero around one terracotta route from vague input
  through browser context, AI workspace, data / edge, and shipped output.
- Added a grayscale, irregular portrait mask and three real project artifacts
  without introducing a new color, type family, radius, or shadow system.
- Added a fine-pointer route bend with requestAnimationFrame throttling and a
  static reduced-motion fallback.
- Moved the three featured projects directly after the hero handoff and
  rebuilt them as product-first chapters with a persistent desktop route rail.
- Replaced the global hover-only project preview with readable product canvases
  inside each case and kept technical evidence in native disclosures.
- Preserved the complete six-project archive, all public URLs, all eight skill
  groups, both experience records, contact actions, and the uploaded CV.
- Removed the repeated About KPI strip so hero proof remains the primary proof
  location; About now owns profile and education context.
- Enabled route SSR so the production response contains the complete portfolio
  rather than relying on a client-only first render.

### Baseline-to-final evidence

- The baseline mobile `order-1` preview-first pattern is absent from the final
  map.
- The final map adds a dedicated `ProjectCanvas` surface and three featured
  project articles while keeping all eight route sections.
- No featured chapter or archive surface is marked `aria-hidden`.
- The route renders one H1, three featured chapters, six archive rows, nine
  native disclosures, six public project actions, no duplicate IDs, no empty
  links, and no unlabeled buttons.

### Runtime verification

| Runtime signal | Verified result |
| --- | ---: |
| Desktop hero height | 900 px in a 1440 × 900 viewport |
| Mobile hero height | 844 px in a 390 × 844 viewport |
| Desktop horizontal overflow | None |
| Mobile horizontal overflow | None |
| Desktop document height | 10,769 px |
| Mobile document height | 14,624 px |
| Featured / archive projects | 3 / 6 |

- Pointer movement changes both the signal route path and its CSS focus
  coordinates; leaving the fine-pointer experience is not required for access.
- Featured chapter links scroll to the correct system and update the active
  rail location.
- Product / System / Proof tabs retain Arrow-key selection and focus behavior.
- Technical evidence and archive rows open as native disclosures.
- Mobile navigation locks document scrolling, makes main and the page footer
  inert, closes with Escape, restores focus, and reports the active chapter.
- The connected browser injects
  `div#codex-browser-sidebar-comments-root` as a third direct child of
  `<html>`, which produces environment-only React hydration warnings. The
  production HTML response itself contains the complete SSR portfolio.
- Targeted Biome checks, TypeScript typecheck, and the production Vite build
  complete successfully.

## 2026-07-24 — `/` / Approved hero fidelity correction

| Field | Evidence |
| --- | --- |
| Status | Corrected and locally verified; not deployed |
| Supersedes | The header and oval portrait treatment in the implementation above |
| Final map | `docs/ux-ui-map/final-NamPortfolio-20260724T141615Z.txt` |
| Runtime viewport | 1280 × 720 |

### Correction delivered

- Removed the global `Header` and `MobileMenu` from the rendered portfolio
  route. Identity, availability, location, and the `FROM VAGUE → WORKING`
  statement now live inside the hero canvas itself.
- Replaced the oval crop of the original brick-wall photo with a generated
  1024 × 1536 profile cutout with alpha transparency.
- Rebuilt the portrait as independent layers: circular terracotta field,
  halftone texture, transparent person, and routed product signal. A
  cross-browser radial alpha mask now preserves full contrast through the face
  and collar before feathering the shoulders and lower chest into the paper
  field without a visible cut line.
- Reduced the wide-screen portrait cap from 480 px to 400 px and the internal
  image scale from 126% to 120%, preventing the portrait from overwhelming the
  product-system composition.
- Pulled the editorial metadata and `VAGUE` display word to the top of the
  canvas after removing the fixed header, while preserving the exact
  `100dvh` hero contract.
- Kept `DESIGN.md` unchanged.

### Runtime verification

| Runtime signal | Verified result |
| --- | ---: |
| Hero height | 720 px in a 1280 × 720 viewport |
| Global portfolio header/menu mounted | No |
| Portrait mask box / circle bottom | 583.2 px / 475.7 px |
| Lower mask | Elliptical radial alpha gradient with an 18% feather band |
| Scaled source hidden below mask box | 160.4 px |
| Horizontal overflow | None |
| Cutout asset | 4-channel WebP with alpha, 64,960 bytes |

- The corrected desktop capture visually matches the approved composition:
  top-canvas metadata, no navigation bar, large editorial typography, routed
  product artifacts, and a person cutout crossing the circular field.
- Targeted Biome formatting, TypeScript typecheck, and the production Vite
  build complete successfully.
