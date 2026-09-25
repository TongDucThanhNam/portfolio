# Portfolio editorial redesign

## Design

The hero remains the visual anchor. The lower page now alternates warm paper,
ink, and a rust closing section, using Archivo for project and utility headings
and Fraunces for the more personal statements.

- Selected work: one wide image and an asymmetric pair, concise captions, and
  optional build details. The old HTML product mockups and sticky project deck
  have been replaced.
- Archive: six native disclosure rows, preserving project status, stack,
  technical evidence, and public links.
- Approach: one readable statement and three principles, without the long
  pinned sequence.
- Profile: existing portrait, short introduction, education, and CV link.
- Experience: two compact records with the original dates and organizations.
- Capabilities: keyboard-accessible disclosures linked to relevant projects.
- Contact: large animated typography and direct email, GitHub, CV, and phone
  actions.

## Replacing the project placeholders

Edit `preview.src` and `preview.alt` on the three featured projects in
`apps/web/src/components/nam-portfolio/data.ts`. Put the real screenshots in
`apps/web/public/images/projects/` and use paths beginning `/images/projects/`.
No JSX changes are needed.

The lead frame uses 16:9; the other two use 16:10. Screenshots are cropped with
`object-fit: cover` and aligned to the top to preserve website navigation.
Use sufficiently wide captures (around 1600px). Supply descriptive alt text for
the actual interface. Images load lazily with explicit dimensions; failed image
requests fall back to a neutral placeholder without collapsing the layout.

## Vault adaptations

- `scroll-driven-parallax-image-masks`: separate wrapper and inner-image motion,
  adapted to a restrained scroll-linked aperture and zoom. Strong skew, blur,
  3D rotation, and the source loader were omitted to keep product captures legible.
- `animated-footer`: center-out character entrance for the closing invitation,
  with a scoped GSAP lifecycle and a native-scrolling integration.
- `nocturne-gilt-editorial` world: selective accents, contrasting type voices,
  asymmetric composition, and restrained framing, re-themed to the existing
  bone, ink, and rust palette.

The animation modules load separately from the initial page. React cleanup
reverts the GSAP context, removes the resize observer, and cancels pending work.
The new motion responds to reduced-motion preferences. Content remains visible
if the optional animation modules cannot load. No lab runtime paths or assets
are imported.

## Verification

- Production client and SSR build: passed.
- Web TypeScript check: passed.
- Biome check on the affected components and route: passed.
- Tailwind-only audit and diff whitespace check: passed.
- Browser inspection at 390px, 768px, 1280px, and 1440px: no section overflow.
- Featured project disclosure: expands and collapses with build evidence intact.
- Skills disclosure: opens with Enter on the summary.
- Mobile chapter menu: opens, navigates to work, and closes after selection.
- Internal anchors: all resolve to existing targets.
- Reduced motion: no hidden reveals, image transformations, or closing-letter
  transformations; native anchor scrolling switches to `auto`.

Browser limitation: the in-app browser injects
`#codex-browser-sidebar-comments-root` directly beneath `html`. React reports
that unexpected `div` during document hydration and falls back to client
rendering. This warning also occurred before the redesign. The injected element
is absent from the server response; a clean console could not be verified in
that browser environment. No workaround for the browser overlay is shipped.

## Deployment

Deployed on 2026-09-09 to https://tongducthanhnam.id.vn/ with `npm run deploy`.
The deployment initially encountered a stale D1 binding: the database recorded
in local infrastructure state and attached to the live Worker had been deleted.
After confirming its absence and that the portfolio does not use the database,
the stale state file was backed up and the declared database was recreated.
The Worker and custom-domain route then deployed successfully.

Live checks passed: the page, client scripts, stylesheet, three project
placeholder images, and CV all return HTTP 200. The deployed portrait's ASCII
and photo layers keep identical position and dimensions before and after hover;
the wipe transition remains active. The live desktop view has no horizontal
overflow.
