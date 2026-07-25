# Tong Duc Thanh Nam — Software Engineer Portfolio

> Historical design and interaction brief. The standalone HTML/CSS/JS prototype was retired after
> the production React route was migrated to Tailwind CSS v4 utilities. The live implementation is
> under `apps/web/src/components/nam-portfolio/`.

## Overview

A single-page AWWWARDS-grade portfolio for **Tong Duc Thanh Nam** (Junior Full-stack TypeScript
Engineer / AI Application Engineer, Ho Chi Minh City). The subject ships AI application products —
Eragear (an AI-native workspace), a branching AI chat UI, a desktop AI coding copilot, and a
published Android keyboard. Audience: hiring teams and founders.

Intended first impression: warm bone surfaces, a large editorial name with a masked reveal, and —
as the signature — a **3D AI workstation** looping in the hero: a floating ink monitor types product
evidence while a low isometric keyboard responds key-by-key in rebar accents.
Scrolling then walks a clean, conventional engineer narrative: why, about, experience, skills,
selected work, contact.

## AWWWARDS Case

- **Winning thesis:** the first viewport's signature is a *working object*, not a diagram. A 3D paper
  monitor and paper keyboard type the candidate evidence in real time, so the hero feels like the AI search
  is producing the portfolio live. No competing benchmark demo presents the subject this way — the
  portfolio argues for the candidate using the candidate's medium.
- **First viewport:** a sparse ~2.2s AI talent-search preloader turns one recruiter prompt into one
  returned profile; the hero is a clean `100dvh` identity screen (name + premise + workstation + CTAs),
  with no proof grid cluttering the fold.
- **Art direction:** a hybrid editorial identity — bone/ink palette, one rebar-terracotta accent, the
  Fraunces / Manrope / Space Mono triad, a restrained dot+ring cursor, a faint paper grain. A
  conventional engineer CV presented with this much art direction reads as authored, not templated.
- **Interaction density:** looping 3D workstation, contextual cursor, magnetic buttons, masked hero
  reveals, pinned why-choose-Nam scrolltelling (3 beats), infinite marquee, right-edge chapter rail,
  scroll-triggered reveals, about line-split, animated skill bars, cursor-following SVG project
  previews that redraw each schematic on hover.
- **Content density:** the work section is the densest on screen — each row carries a factual status
  badge (`LIVE` / `OPEN SOURCE` / `PUBLISHED · 100+ INSTALLS`) plus always-visible stack chips, so
  credibility reads without hovering.
- **Motion craft:** Lenis smooth scroll driven by the GSAP ticker; ScrollTrigger for reveals,
  parallax, the rail, and the pinned sequence; `gsap.quickTo()` for cursor, magnetic controls, and
  project-preview follow; transform-based progress lines (`scaleX`). All motion respects
  `prefers-reduced-motion`; coarse pointers get native scroll and no custom cursor; no-GSAP fallback
  reveals everything.
- **Responsive polish:** the section rail and cursor hide on small/coarse screens; all grids collapse
  cleanly; the workstation hides on narrow viewports; the project hover-list keeps working without the
  preview on touch.

## How It Was Built

- **HTML:** semantic single page — sparse preloader, nav + mobile overlay, section rail, hero (with a
  parallax disc/ghost-word background and the **3D AI workstation** signature docked bottom-right),
  why-choose-Nam pinned scroll story, marquee, about (statement + facts card), experience
  (two-column meta/body items), skills (hairline-divided grid with animated bars), projects (dense
  two-line hover list with status badges, stack chips, and SVG previews), contact (info + form +
  magnetic CTA), footer.
- **CSS system (`style.css`):** CSS variables for the full palette, type, motion easings, layout, and
  radius. Stepped bone surfaces (`--bone / --paper / --bone-deep`), one terracotta accent, one cool
  steel. A faint fixed paper grain (no blueprint grid). `[data-reveal]` / `[data-line-inner]` are the
  reveal primitives GSAP drives; `.skill-bar-fill` (scaleX via `--lvl`), `.pre-search-fill`,
  `.scroll-progress-fill`, and `.choice-story-progress` are transform-based measurement primitives.
- **JS (`script.js`):** one IIFE. Lenis instantiated and (when present) driven by `gsap.ticker`;
  ScrollTrigger registered and bound to `lenis.on('scroll')`. Modules: minimal dot+ring cursor
  (`gsap.quickTo` follow), mobile menu, sparse preloader timeline (prompt reveal, score count-up,
  single profile reveal, clip-path exit), hero entrance timeline + parallax, **workstation engine**
  (typed evidence on the monitor plus matching key-compression states on the keyboard), pinned why-choose-Nam scroll story (pin + scrub +
  transform progress + cross-fading copy), marquee, transform-based scroll progress, section-rail
  active tracking, generic reveals, about line-split, skill-bar IntersectionObserver, project hover
  preview follow (viewport-clamped + SVG stroke redraw), magnetic buttons + radial CTA, contact-form
  handler, nav scroll state.
- **Asset strategy:** zero local images. The only "visuals" are CSS 3D geometry, inline SVG project
  previews, and the nav glyph — featherweight and on-theme.

## Techniques & Skills

- **GSAP:** timeline (preloader, hero entrance, workstation typing loop), ScrollTrigger (pinned choice
  story, reveals, parallax, section-rail state), `quickTo()` for high-frequency pointer interactions,
  transform-based `scaleX` progress primitives, SVG stroke redraw on project previews, `delayedCall`
  for the streaming typewriter, stagger on project-row reveal, elastic return on magnetic elements.
- **Lenis:** smooth scroll with `lerp`, bound to the GSAP ticker; `lenis.scrollTo` for anchor
  navigation; scroll event drives progress bar + nav state.
- **CSS craft:** masked overflow reveal lines, a faint paper-grain overlay, `mix-blend-mode: multiply`
  nav + rail + cursor for legibility on any background, CSS-variable design tokens, `clamp()` fluid
  type/spacing, pill-vs-rect shape contrast, floating-label form fields, and compressed active keys
  with a restrained terracotta monitor glow.
- **Interaction design:** a looping 3D workstation that demonstrates the candidate's actual work —
  product evidence being typed into view — instead of decorative motion; a cursor-following preview that redraws each project schematic; a cursor that contextualizes
  every interactive target with a mono label.
- **Accessibility:** full `prefers-reduced-motion` path (preloader fades instantly, workstation renders
  static text, motion near-instant), coarse-pointer fallbacks (native scroll, no cursor, workstation hidden),
  graceful no-GSAP fallback that reveals everything, semantic landmarks, `aria-live` form note,
  keyboard `:focus-visible` parity with hover states.

## Benchmark Delta

- **`axiom-freelance-developer`** is the motion-density benchmark (Lenis + GSAP, custom cursor,
  magnetic CTAs, marquees) but is a generic dark brutalist page with placeholder, content-light case
  studies. This portfolio matches its motion vocabulary *and* beats it on identity ownership: the hero
  signature is a moving product sketch of the candidate's own stack, not generic maximalist type, and
  the work section has real, linked projects with factual status badges and always-visible stack chips
  on a light, editorial surface.
- **`blueprint-cv-developer`** is the document-craft benchmark (genuine résumé schema, color-as-
  wayfinding, the best proficiency bars) but is a static ivory sheet. This portfolio delivers the same
  factual content depth (real projects, real stack, real dates) as a moving editorial experience with
  a signature interaction the benchmark set does not have.
- **`thanh-nam-vlxd-awwwards`** (the original drafting-atelier source of this palette) proved the
  bone/ink/rebar system on a product landing page with a scrolltelling building. This portfolio
  deliberately *drops* the borrowed drafting metaphor (blueprint grid, reticle, drafting rulers) and
  replaces it with a hybrid editorial identity plus a 3D AI workstation — proving the palette reads
  even more strongly when the signature matches the subject's actual work, not a borrowed construction
  metaphor.
