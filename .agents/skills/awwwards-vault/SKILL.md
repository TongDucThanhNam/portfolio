---
name: awwwards-vault
description: "Applies mechanisms from Terasumi's curated awwwards component vault — scroll animation, WebGL/Three.js, text animations, hover effects, physics, page transitions, navigation menus, sliders, cursor effects, plus art-direction worlds — to any project from any working directory. Not for inventing effects from scratch with no parts-bin source, and it never reads the lab's demo entries (banned as prior art). Use when the user wants awwwards-level animations or effects (premium scroll, page transitions, custom cursors, hero reveals, WebGL scenes, magnetic hovers, marquees, loaders), or says 'awwwards vault', 'vault component', 'parts bin', 'lab component', 'awwwards animation', 'ap dung component tu lab', 'dung component cua lab'. Ships a query CLI (scripts/vault.mjs, progressive disclosure over components meta) — no manual path hunting, no stale text indexes."
compatibility: "Requires Node.js 18+ or Bun. Expects the lab repo at ~/Documents/source_code/htmls/lab — override with the --lab flag or the AWWARDS_LAB env var. Strictly read-only over the lab."
metadata:
  version: "2.0"
  author: terasumi
  vault_cli: "scripts/vault.mjs"
---

# Awwwards Vault — awwwards mechanisms for any project

The `lab` repo holds a curated, ever-growing parts bin of awwwards-grade mechanism packages plus distilled art-direction worlds. Counts and categories are live facts, never quoted here: `vault categories` is the source of truth. The lab is the *source*; the project you are working in is the *destination*.

## Query tool — progressive disclosure

A zero-dependency CLI ships with this skill (`scripts/vault.mjs`). It indexes `components/*/meta.json` directly — the source of truth, always fresh; the generated `LIBRARY.md` may lag. Node 18+ or Bun. Read-only.

```bash
vault() { node "$HOME/.agents/skills/awwwards-vault/scripts/vault.mjs" "$@"; }
```

Go one level deeper ONLY when the previous level tells you to:

| Level | Command | Answers |
|---|---|---|
| 1 | `vault categories` | what exists — category map + counts |
| 2 | `vault list --category scroll` · `--tag gsap` · `vault search "magnetic button"` | which slugs fit the need (one line each; `[!]` = live caveats) |
| 3 | `vault show <slug>` | full description, caveats, file map — decide between shortlisted |
| 4 | `vault source <slug> [--file style.css]` | the runtime source, ready to adapt |
| + | `vault worlds` · `vault cliches` | art-direction systems · saturated-technique ledger |

Category/tag/query matches are substring-normalized (`scroll` matches `scroll-animation`); search words are AND-ed; `--json` on `list`/`show` for machine output. If the default lab path is missing, ask the user for the location — never guess.

## Workflow

1. **Frame the need before touching the lab.** What must the mechanism *do*, and what are the target project's stack and design tokens? Every component gets re-themed to THIS project.
2. **Shortlist via the tool** — 2–4 candidates. Run `vault cliches`: saturated techniques are table stakes, never the centerpiece.
3. **Inspect before committing.** `vault show <slug>` per candidate. Caveats (`[!]`) are live traps — handle explicitly or pick another package. **Every package ships a `GUIDE.md`** (path printed by `show`) — read it BEFORE the source. Then `vault source <slug>`.
4. **Ask the world question.** If the ask is a whole look (palette+material, type+composition, motion language), `vault worlds` first; carry the system, re-theme the subject.
5. **Adapt, never drop in verbatim.** Port the mechanism into the target stack, replace demo tokens with the project's tokens, strip the source identity. Result is self-contained — zero references back into the lab. For non-trivial ports follow **`references/adaptation-playbook.md`**.
6. **Carry dependencies** the way the target project manages them — the playbook has the dependency table and known traps.
7. **Verify in the target project, not by inspection** — run/build, exercise the effect, watch the console, check mobile widths. Report done only with evidence, listing which lab slugs were adapted.

## Hard rules

- **One-way pipe:** READ the lab from external projects — never write into it. Flagging caveats and registry edits run inside the lab only.
- **Never open `<lab>/demos/<other-slug>/`** — other entries are not prior art. Sanctioned prior art is exactly the component packages, `LIBRARY.md`, and `WORLDS.md`.
- **No cross-project imports:** the adapted code must not import, fetch, or hotlink anything under the lab path.
- If cwd is already inside the lab, follow the lab's own `AGENTS.md` instead; the mechanics above stay the same.

## References

- **`references/adaptation-playbook.md`** — porting patterns (vanilla ↔ React/Next, Lenis + ScrollTrigger integration), token re-theming checklist, dependency table with traps, verification checklist. Read it when the port touches React/Next/SSR, smooth-scroll integration, or a caveat names a trap you have not handled.
