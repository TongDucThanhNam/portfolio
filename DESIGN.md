---
version: alpha
name: Tong Duc Thanh Nam — Software Engineer Portfolio
description: AWWWARDS-grade portfolio identity for a full-stack TypeScript / AI application engineer. Warm bone surfaces, ink type, a single terracotta accent, and a 3D AI workstation as the signature interaction. Editorial serif display over grotesk body and mono metadata.
colors:
  primary: "#16140F"
  secondary: "#2B2722"
  tertiary: "#B8422E"
  neutral: "#EFEAE0"
  paper: "#F6F2E9"
  bone: "#E6DFD1"
  muted: "#908A7E"
  line: "#D2C9B6"
  ink: "#16140F"
  steel: "#3C4A56"
  terracottaSoft: "#F0E0D6"
  rebar: "#B8422E"
typography:
  display:
    fontFamily: Fraunces
    fontSize: 6rem
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  h1:
    fontFamily: Fraunces
    fontSize: 12rem
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  h2:
    fontFamily: Fraunces
    fontSize: 4rem
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  h3:
    fontFamily: Fraunces
    fontSize: 2.1rem
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  bodyMd:
    fontFamily: Manrope
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  bodySm:
    fontFamily: Manrope
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  mono:
    fontFamily: Space Mono
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.14em
    textTransform: uppercase
rounded:
  none: 0px
  sm: 4px
  md: 10px
  pill: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 16px
  md: 32px
  lg: 64px
  xl: 120px
borders:
  thin: 1px
  hairline: 1px solid {colors.line}
layout:
  padX: clamp(20px, 5vw, 84px)
  padY: clamp(80px, 14vh, 180px)
  gridGap: 16px
motion:
  easeReveal: expo.out
  easeDefault: power3.out
  durationReveal: 1.2s
  durationQuick: 0.4s
  staggerDefault: 0.08s
effects:
  grain:
    opacity: 0.04
    blendMode: multiply
  blueprint:
    lineColor: "{colors.line}"
    opacity: 0.5
  shadow:
    card: 0 24px 60px rgba(22,20,15,0.18)
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: 18px 32px
    typography: "{typography.mono}"
  button-primary-hover:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: 16px 28px
  chip:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
    typography: "{typography.mono}"
  skill-cell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: 28px 24px
  skill-ruler:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.rebar}"
    typography: "{typography.mono}"
  project-badge-live:
    textColor: "{colors.rebar}"
    backgroundColor: "{colors.neutral}"
    rounded: "{rounded.pill}"
    typography: "{typography.mono}"
    padding: 4px 10px
  project-badge-oss:
    textColor: "{colors.steel}"
    backgroundColor: "{colors.neutral}"
    rounded: "{rounded.pill}"
    typography: "{typography.mono}"
    padding: 4px 10px
  project-badge-published:
    textColor: "{colors.ink}"
    backgroundColor: "{colors.neutral}"
    rounded: "{rounded.pill}"
    typography: "{typography.mono}"
    padding: 4px 10px
  stack-layer:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.ink}"
  hairline:
    backgroundColor: "{colors.line}"
    height: 1px
  ghost-word:
    textColor: "{colors.bone}"
    typography: "{typography.display}"
  accent-tint:
    backgroundColor: "{colors.terracottaSoft}"
    textColor: "{colors.ink}"
  nav-bar:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.ink}"
    padding: 22px {layout.padX}
  section-tag:
    textColor: "{colors.muted}"
    typography: "{typography.mono}"
  label-accent:
    textColor: "{colors.tertiary}"
    typography: "{typography.mono}"
  ai-search-loader:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.none}"
    padding: 40px
  ai-proof-chip:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.none}"
    padding: 8px
  ai-result-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: 28px
  choice-story:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: clamp(20px, 5vw, 84px)
  workstation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: 18px
---

## Overview

Tong Duc Thanh Nam's portfolio is presented as a clean **hybrid editorial** page. Warm bone
surfaces, ink type, one **rebar terracotta** accent doing all the chromatic work, and a **3D AI
workstation** — a floating ink monitor typing product evidence above a terracotta-accented paper keyboard —
as the signature interaction in the first viewport. The voice is editorial: Fraunces serif display over Manrope body and Space Mono metadata,
and every motion is tuned to feel like a controlled reveal, not a fireworks show.

The page is a conventional engineer portfolio (why, about, experience, skills, selected work, contact)
delivered with the motion vocabulary of an AWWWARDS-grade landing page: a sparse AI talent-search
preloader that turns one recruiter prompt into one returned profile, a 100dvh hero whose signature is
a looping 3D AI workstation that types why the candidate is the returned match, a pinned why-choose-Nam scroll story,
masked hero-line reveals, infinite marquee, a right-edge chapter rail, scroll-triggered reveals,
an about-statement line-split, simple animated skill bars, and cursor-following SVG project previews.
It is built with GSAP + ScrollTrigger on top of Lenis smooth scroll, and every decorative animation
degrades gracefully under `prefers-reduced-motion`.

## Colors

The palette is narrow on purpose — ink, bone neutrals, one warm accent.

- **primary `#16140F`** — near-black ink for headlines, strokes, and the primary button fill.
  Warm rather than pure black so it reads like a pencil lead.
- **secondary `#2B2722`** — soft ink for body copy on light fields and for dark section fills.
- **tertiary `#B8422E`** — the "rebar" accent, a fired terracotta. Used for italic display emphasis
  words, section labels, hovers, links, and the custom cursor. Never used as a large flat fill.
- **neutral `#EFEAE0`** — the default bone drafting paper background.
- **paper `#F6F2E9`** — lighter bone, used to alternate sections and lift cards.
- **bone `#E6DFD1`** — deepest neutral, for the large ghost words behind the hero and contact.
- **muted `#908A7E`** — supporting metadata, captions, and section tags.
- **line `#D2C9B6`** — the hairline rules that structure the blueprint grid and section dividers.
- **steel `#3C4A56`** — a cool secondary tone reserved for occasional contrast against the warm terracotta.
- **terracottaSoft `#F0E0D6`** — a pale terracotta tint for cursor hovers and magnetic fill.

WCAG: ink `#16140F` on bone `#EFEAE0` and paper `#F6F2E9` both exceed AAA contrast. Terracotta
`#B8422E` on bone passes AA for large text and labels — it is reserved for display italics, links,
and small uppercase metadata, never body.

## Typography

A three-family system gives the page its drafting-studio voice.

- **Fraunces** (display / headings) — variable serif at weight 400, occasionally 300 italic for the
  terracotta emphasis word. Tight negative tracking (`-0.025em` to `-0.035em`) and fluid `clamp()` sizing.
- **Manrope** (body) — neutral grotesk for paragraphs, captions, and UI at 1rem / 1.6 line-height.
- **Space Mono** (labels / metadata) — uppercase, wide-tracked (`0.14em`) 12px for section tags,
  coordinates, stat units, nav links, and project metadata.

Hierarchy: display H1 → section H2 → card H3 → body → mono label. The mono label is the page's
narrator — it opens every chapter like a drawing title block.

## Layout

A full-bleed vertical scroll of alternating `neutral` / `paper` sections over a flat editorial
background (a faint paper grain, no blueprint grid). Horizontal padding is fluid
(`clamp(20px, 5vw, 84px)`), vertical rhythm uses `clamp(80px, 14vh, 180px)`. The hero is locked to
`100dvh`: identity and one premise up top, with the **3D AI workstation** docked bottom-right as the
signature — a floating monitor and keyboard typing the match evidence. Immediately after it,
`choice-story` pins a full viewport and uses scroll to answer "why choose Nam?" across three beats.
The section rail on the right edge tracks the active chapter across seven chapters
(00 Intro → 06 Contact). Experience uses a two-column meta/body layout; skills use a 3-column
hairline-divided grid with a simple animated bar under each skill; projects use a dense two-line
hover list (name + status badge over type + stack chips + year) with a cursor-following preview.

## Elevation & Depth

Mostly flat — depth is implied, never shouted.

1. **Flat bone field** — the page sits on a near-flat bone surface; a faint paper grain (radial-dot
   overlay at ~3.5% opacity, `multiply`) gives a printed texture without color noise.
2. **Parallax drift** — in the hero and contact stages, a giant italic ghost word and a terracotta
   disc move at `data-depth` 0.08–0.20 and the eye assembles the space.
3. **Soft shadow on floating previews** — the cursor-following project preview uses one restrained
   drop shadow (`0 24px 60px rgba(22,20,15,0.18)`) so it reads as a detached sheet.
4. **Workstation glow** — the floating monitor carries a soft terracotta halo and the active key
   compresses downward, so the scene reads as live work being typed rather than a static illustration.

## Shapes

**Circular accents on an otherwise rectilinear editorial layout.** Buttons, the magnetic CTA, the
cursor, and the parallax discs are full circles/pills (`rounded.pill`). Project arrows sit in
circular frames. The workstation screen, keys, and structural cards keep slightly softened rectangles
(`rounded.sm`/`md`), so the system reads as product UI rather than cut drafting sheets. The contrast
between soft circles and hard rectangles is the shape identity.

## Components

- **button-primary** — ink pill, paper text, that warms to terracotta on hover. Hero CTA + contact CTA.
- **button-ghost** — outlined pill on light fields, ink-on-bone. Secondary actions.
- **ai-search-loader** — the entry sequence is staged as a sparse AI recruiter search: one recruiter
  prompt appears, the interface matches product evidence, then Tong Duc Thanh Nam is returned as the
  single profile. It uses paper/ink/line/rebar, generous whitespace, quiet metadata, and a light
  editorial result card. ~2.2s.
- **workstation** — the hero signature. An ink/rebar 3D monitor floats above a low isometric paper
  keyboard. The monitor types a recruiter-style evidence trail, while matching keys compress with a
  restrained terracotta active state. It reduces to static text under reduced-motion and is hidden on
  narrow/coarse viewports.
- **choice-story** — a pinned 100dvh scrolltelling section answering why to choose Nam. Three beats
  cross-fade on scrub: product proof, full-stack loop, and verifiable output. The section uses one
  large serif sentence, one body paragraph, one proof label, and a rebar progress line.
- **chip** — hairline-bordered pill for stack tags on experience items and project rows.
- **skill-cell** — paper cell inside a hairline-divided grid; skill name left, mono level right, with a
  simple animated bar (rebar fill scaled by `--lvl`) under each skill.
- **project-badge** — factual status pill on each work row (`is-live` / `is-oss` / `is-published`),
  colored by the accent / steel / ink. The level of proof is visible without hovering.
- **exp-item** — two-column meta (date/location) + body (role, org, points, stack chips).
- **project-row** — dense two-line hover list; row slides right, name turns terracotta, arrow rotates;
  a cursor-following SVG preview appears beside the cursor and redraws each project schematic on hover.
  A status badge + always-visible stack chips make the work section the densest on screen.
- **nav-bar** — transparent fixed bar, multiply-blended so it survives both light and dark sections;
  collapses the menu on coarse pointers.
- **cursor** — minimal dot + ring; the ring enlarges to a soft terracotta halo over interactive
  targets, with a contextual mono label. Disabled on coarse pointers.
- **section-tag / label-accent** — the mono voiceover. Accent labels carry a short terracotta rule;
  section tags sit top-right in muted ink.
- **section-rail** — right-edge vertical chapter navigator with an active tick.

## Do's and Don'ts

**Do**
- Keep rebar terracotta as the *only* chromatic accent — italic display words, labels, hovers, links,
  and the cursor, nowhere else.
- Use Fraunces italics (weight 300, terracotta) to emphasize a single word per heading. That emphasis
  is the accent's job.
- Let the monospace label introduce every chapter; it is the drawing's title block.
- Tune easings toward slow-out (`expo.out`, `power3.out`) — the drafting mood is measured, never snappy.
- Respect `prefers-reduced-motion`: the script short-circuits decorative animation and keeps the page
  fully usable static.

**Don't**
- Don't add a second accent color. Depth comes from motion, type weight, and the blueprint grid, not hue.
- Don't round the structural cards/cells — only buttons, the cursor, and accent discs are circular.
- Don't use neon, pure black, or pure white. Ink is `#16140F`, paper is bone, and the accent is earthy
  terracotta.
- Don't replace the serif/grotesk/mono triad; the type system *is* the identity.
- Don't hide essential content behind motion — every section must read correctly with animation disabled.
