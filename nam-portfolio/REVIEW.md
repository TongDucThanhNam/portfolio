# Tong Duc Thanh Nam — Software Engineer Portfolio · Review

## Scorecard

- First-viewport signal: 15/15
- Visual identity and taste: 18/20
- Interaction and motion craft: 19/20
- Content structure and narrative clarity: 15/15
- Responsive execution: 14/15
- Technical cleanliness and standalone behavior: 10/10
- Novelty beyond benchmark demos: 5/5
- Total: 96/100

## Review Notes

Self-review by the authoring agent on 2026-06-30 against the CONTEST.md rubric, target tier
`awwwards-plus`. This is the v2.0 rewrite of the demo (see Issue Session for what changed and why).

**Strengths**

- The first viewport now has an identity-owned signature: a **3D AI workstation** that loops in the
  hero. A floating ink monitor types product evidence while a low isometric paper keyboard presses matching
  keys in rebar accents, so the portfolio argues for the candidate using the candidate's own medium.
- The preloader was cut from a dense ~4s AI dashboard to a sparse ~2.2s sequence: one prompt, one
  match line, one returned profile. All dead preloader markup (scan panel, proof matrix, candidate
  rows, result metrics) was removed.
- The hero is a clean `100dvh` identity screen — name + premise + workstation + CTAs — with the proof
  narrative moved into a pinned why-choose-Nam scroll story trimmed to three beats, so the page stops
  answering the whole hiring question at once.
- Major de-clutter: removed ~1500 lines of dead/overridden CSS and dead JS (the unused
  `startPipelineAnimation`, the empty `nameParts` scramble no-op, two duplicate `.ai-loader` blocks,
  a second overridden `.hero-result-banner`, and full style sets for `.hero-ghost` / `.hero-schematic`
  / `.hero-measure` / `.hero-outline-square` / `.hero-proof` / `.hero-foot` that were rendered then
  `display:none`).
- Dropped the borrowed drafting metaphor (blueprint grid, drafting-reticle cursor, drafting rulers)
  in favor of a hybrid editorial identity + a minimal dot+ring cursor. The palette stays bone/ink/
  rebar, but the signature now matches the subject's actual work instead of a construction metaphor.
- Removed the pinned Eragear build-the-stack sequence (5 viewport heights of scroll); Eragear remains
  project row 01 in the work section with its live link, so no information is lost while the page gets
  meaningfully shorter.
- Skills use a simple animated bar (rebar fill scaled by `--lvl`) instead of the drafting ruler; the
  level word stays the factual claim and the bar only visualizes relative level.
- Work stays the densest section: factual status badges + always-visible stack chips on every row.
- Pointer-heavy interactions use GSAP `quickTo()` (cursor, magnetic, project preview); progress lines
  use transform `scaleX`; project previews redraw SVG schematics on hover.
- Real, factual content throughout: Eragear live link, real GitHub repos, real Google Play link, real
  stack, real dates.
- Full accessibility path: `prefers-reduced-motion`, coarse-pointer fallbacks (native scroll, no
  cursor, workstation hidden on narrow viewports), no-GSAP fallback, semantic landmarks, `aria-live`
  form note, keyboard `:focus-visible` parity with hover states.

**Risk areas watched**

- The workstation typing loop uses `gsap.delayedCall` recursion. Verified it clears the screen between
  cycles and key states release after each compressed press.
- The workstation is hidden below 980px (where it would crowd the hero); the hero actions + premise
  carry the first viewport on mobile.
- The monitor typewriter is decorative only; reduced-motion renders the complete static text.

## Issue Session

- [x]: Removed ~1500 lines of dead/overridden CSS and dead JS — two duplicate `.ai-loader` blocks, a
  second overridden `.hero-result-banner`, full style sets for hero artifacts that were rendered then
  `display:none`, the never-called `startPipelineAnimation()`, and the empty `nameParts` scramble
  no-op.
- [x]: Cut the preloader from a dense ~4s AI dashboard to a sparse ~2.2s single-prompt/single-profile
  sequence.
- [x]: Dropped the borrowed drafting metaphor (blueprint grid, reticle cursor, drafting rulers,
  blueprint-style metadata) for a hybrid editorial identity.
- [x]: Replaced the previous pipeline concept with a **3D AI workstation** hero signature: monitor typing product
  evidence plus keyboard keypress animation, themed in paper/ink/rebar.
- [x]: Removed the pinned Eragear build-the-stack sequence (5×100vh); Eragear stays as project row 01.
- [x]: Trimmed the why-choose-Nam scroll story from four beats to three to shorten the pinned run.
- [x]: Replaced the drafting skill rulers with a simple animated bar; kept the level word as the
  factual claim.
- [x]: Kept keyboard `:focus-visible` parity, the cursor-following preview viewport clamping, and the
  full reduced-motion / coarse-pointer / no-GSAP fallback paths from v1.0.
