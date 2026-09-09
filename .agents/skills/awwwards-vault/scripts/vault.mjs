#!/usr/bin/env node
// awwards-vault — progressive-disclosure query CLI over Terasumi's lab parts bin.
// Reads components/*/meta.json directly (the source of truth; the generated
// LIBRARY.md may lag behind it). Zero dependencies, Node >= 18 or Bun. Read-only.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const DEFAULT_LAB = join(homedir(), "Documents", "source_code", "htmls", "lab");

const USAGE = `awwwards-vault — query the lab parts bin with progressive disclosure

Usage: vault <command> [options]
  vault categories                     1. category map + counts (orientation)
  vault list --category <q>            2. components in matching categories
  vault list --tag <tag>               2. components carrying a tag (e.g. gsap)
  vault search <words...>              2. full-text search slug/title/desc/tags
  vault show <slug>                    3. full meta: description, live caveats, file map
  vault source <slug> [--file <name>]  4. dump runtime source files to adapt
  vault worlds                         +  art-direction systems index
  vault cliches                        +  the cliche ledger (saturated techniques)

Options:
  --json        machine-readable output (list / show)
  --lab <path>  lab root (default: $AWWWARDS_LAB env or ${DEFAULT_LAB})

Go one level deeper only when the previous level tells you to.`;

const raw = process.argv.slice(2);
const takeFlag = (name) => {
  const i = raw.indexOf(`--${name}`);
  if (i === -1) return undefined;
  return raw.splice(i, 2)[1];
};
const lab = takeFlag("lab") || process.env.AWWARDS_LAB || DEFAULT_LAB;
const fileFilter = takeFlag("file");
const categoryQ = takeFlag("category");
const tagQ = takeFlag("tag");
const asJson = raw.includes("--json") ? (raw.splice(raw.indexOf("--json"), 1), true) : false;
const [cmd, ...rest] = raw;

const fail = (msg) => {
  console.error(`vault: ${msg}`);
  process.exit(1);
};
const norm = (s) =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const ellip = (s, n = 96) =>
  s.length <= n ? s : s.slice(0, n).replace(/\s+\S*$/, "") + "...";

if (!cmd || cmd === "help" || cmd === "--help") {
  console.log(USAGE);
  process.exit(0);
}
if (!existsSync(join(lab, "components"))) {
  fail(
    `no components/ under "${lab}". Pass --lab <path> or set AWWARDS_LAB. ` +
      `Default expects the repo at ${DEFAULT_LAB}.`
  );
}

function loadComponents() {
  const root = join(lab, "components");
  const out = [];
  for (const name of readdirSync(root)) {
    const metaPath = join(root, name, "meta.json");
    if (!existsSync(metaPath)) continue;
    try {
      const meta = JSON.parse(readFileSync(metaPath, "utf8"));
      if (meta && (meta.slug || meta.title)) out.push({ dir: name, ...meta });
    } catch {
      /* unreadable meta.json — skip, not fatal */
    }
  }
  return out;
}

const components = loadComponents();
const pkgDir = (c) => join(lab, "components", c.dir || c.slug);
const hasGuide = (c) => existsSync(join(pkgDir(c), "GUIDE.md"));
const runtimeFiles = (c) => {
  const files = [];
  if (c.entry) files.push(c.entry);
  for (const f of [...(c.runtime?.css || []), ...(c.runtime?.js || [])])
    if (!files.includes(f)) files.push(f);
  return files;
};

function oneLiner(c) {
  // GUIDE.md ships with every package — flag only the live traps.
  const marks = c.caveats?.length ? "[!]" : "";
  return `${c.slug || c.dir} ${marks} — ${ellip(c.description || c.title || "")} — ${(
    c.tags || []
  ).join(", ")}`;
}

function printList(items, heading) {
  console.log(heading);
  if (!items.length) {
    console.log("  (no matches)");
    return;
  }
  for (const c of items) console.log("  " + oneLiner(c));
  console.log(`  ${items.length} component(s)`);
}

/* ---------- level 1: categories ---------- */
if (cmd === "categories") {
  const byCat = new Map();
  for (const c of components) {
    const cat = c.libraryCategory || "uncategorized";
    byCat.set(cat, (byCat.get(cat) || 0) + 1);
  }
  const rows = [...byCat.entries()].sort((a, b) => b[1] - a[1]);
  if (asJson) {
    console.log(JSON.stringify(Object.fromEntries(rows), null, 2));
  } else {
    console.log(`lab: ${lab} — ${components.length} components indexed`);
    for (const [cat, n] of rows) console.log(`  ${cat} (${n})`);
  }
}

/* ---------- level 2: list / search ---------- */
else if (cmd === "list" || cmd === "search") {
  let items;
  if (cmd === "list") {
    if (!categoryQ && !tagQ) fail("list needs --category <q> and/or --tag <tag>");
    items = components.filter((c) => {
      const catOk =
        !categoryQ ||
        norm(c.libraryCategory || "").includes(norm(categoryQ)) ||
        norm(categoryQ).includes(norm(c.libraryCategory || ""));
      const tagOk =
        !tagQ || (c.tags || []).some((t) => norm(t).includes(norm(tagQ)));
      return catOk && tagOk;
    });
  } else {
    const tokens = rest.join(" ").split(/\s+/).filter(Boolean).map(norm);
    if (!tokens.length) fail("search needs a query");
    items = components.filter((c) => {
      const hay = norm(
        [c.slug, c.dir, c.title, c.description, (c.tags || []).join(" ")].join(" ")
      );
      return tokens.every((t) => hay.includes(t)); // AND across words
    });
  }
  if (asJson) {
    console.log(
      JSON.stringify(
        items.map((c) => ({
          slug: c.slug || c.dir,
          title: c.title,
          category: c.libraryCategory,
          tags: c.tags || [],
          caveats: c.caveats?.length || 0,
          guide: hasGuide(c),
          description: c.description,
        })),
        null,
        2
      )
    );
  } else {
    printList(items, `lab: ${lab}`);
  }
}

/* ---------- level 3: show ---------- */
else if (cmd === "show") {
  const q = norm(rest.join(" "));
  let c =
    components.find((x) => norm(x.slug) === q) ||
    components.find((x) => norm(x.dir) === q);
  if (!c) {
    const near = components.filter((x) => norm(x.slug).includes(q)).slice(0, 10);
    fail(
      `no component "${rest.join(" ")}"` +
        (near.length
          ? `. Close: ${near.map((x) => x.slug).join(", ")}`
          : ". Try: vault list --category <q>  |  vault search <words>")
    );
  }
  const dir = pkgDir(c);
  const dirFiles = readdirSync(dir).map((f) => {
    const p = join(dir, f);
    const st = statSync(p);
    return { f, size: st.isDirectory() ? null : st.size, isDir: st.isDirectory() };
  });
  if (asJson) {
    console.log(
      JSON.stringify(
        {
          ...c,
          guide: hasGuide(c),
          guidePath: hasGuide(c) ? join(dir, "GUIDE.md") : null,
          packageDir: dir,
          runtime: runtimeFiles(c),
          files: dirFiles,
        },
        null,
        2
      )
    );
  } else {
    console.log(`lab: ${lab}`);
    console.log(`${c.title}  [${c.slug || c.dir}]`);
    console.log(`category: ${c.libraryCategory || "uncategorized"}`);
    if (c.promotedFrom) console.log(`promoted from demo: ${c.promotedFrom}`);
    if (c.publishedAt) console.log(`published: ${c.publishedAt}`);
    console.log(`tags: ${(c.tags || []).join(", ")}`);
    console.log(`\ndescription:\n  ${c.description || "(none)"}`);
    if (hasGuide(c))
      console.log(
        `\nGUIDE: ${join(dir, "GUIDE.md")}\n  Read this BEFORE the source — four-section manual (What you see / How it works / How to adapt / When to use).`
      );
    if (c.caveats?.length) {
      console.log(`\nCAVEATS (live traps — handle explicitly or pick another component):`);
      for (const cv of c.caveats)
        console.log(
          `  ! ${cv.note}${cv.source ? ` (seen in ${cv.source})` : ""}${cv.addedAt ? ` [added ${cv.addedAt}]` : ""}`
        );
    }
    console.log(`\nfiles:`);
    for (const { f, size, isDir } of dirFiles)
      console.log(
        `  ${f}${isDir ? "/" : ` (${size} B)`}${runtimeFiles(c).includes("./" + f) || runtimeFiles(c).includes(f) ? "  <- runtime" : ""}`
      );
    console.log(`\nnext: vault source ${c.slug || c.dir}   # dump the runtime source`);
  }
}

/* ---------- level 4: source ---------- */
else if (cmd === "source") {
  const q = norm(rest.join(" "));
  const c =
    components.find((x) => norm(x.slug) === q) ||
    components.find((x) => norm(x.dir) === q);
  if (!c) fail(`no component "${rest.join(" ")}" — find one via vault list/search first`);
  const dir = pkgDir(c);
  const wanted = fileFilter
    ? [fileFilter.startsWith("./") || fileFilter.startsWith("/") ? fileFilter : "./" + fileFilter]
    : runtimeFiles(c);
  if (fileFilter && !existsSync(join(dir, fileFilter)))
    fail(
      `no file "${fileFilter}" in ${dir}. Available: ${readdirSync(dir).join(", ")}`
    );
  if (!wanted.length)
    fail(`meta.json declares no runtime files — inspect the package dir: ${dir}`);
  for (const rel of wanted) {
    const p = join(dir, rel);
    if (!existsSync(p)) continue;
    console.log(`===== ${p} =====`);
    console.log(readFileSync(p, "utf8").trimEnd());
    console.log("");
  }
  if (hasGuide(c))
    console.log(`(GUIDE.md exists at ${join(dir, "GUIDE.md")} — read it before adapting.)`);
}

/* ---------- extras: worlds, cliches ---------- */
else if (cmd === "worlds") {
  const wroot = join(lab, "worlds");
  if (!existsSync(wroot)) {
    console.log("no worlds/ in this lab");
    process.exit(0);
  }
  const found = readdirSync(wroot).filter((w) =>
    existsSync(join(wroot, w, "WORLD.md"))
  );
  if (!found.length) console.log("no worlds indexed");
  for (const w of found) {
    const d = join(wroot, w);
    const extras = ["tokens.css", "preview.png"]
      .filter((f) => existsSync(join(d, f)))
      .join(", ");
    console.log(`  ${w} — WORLD.md${extras ? " + " + extras : ""}  (${d})`);
  }
  console.log(`\nA world is knowledge (palette/material/type/motion spec), not a runnable package.`);
  console.log(`Read <world>/WORLD.md + tokens.css; carry the system, re-theme the subject.`);
} else if (cmd === "cliches") {
  const libPath = join(lab, "LIBRARY.md");
  if (!existsSync(libPath)) fail("no LIBRARY.md to read the ledger from");
  const m = readFileSync(libPath, "utf8").match(/## Cliché Ledger\r?\n([\s\S]*?)\r?\n## Index/);
  if (!m) fail("cliche ledger section not found in LIBRARY.md");
  console.log(m[1].trim());
  console.log(`\n(saturated techniques — fine as table stakes, never the centerpiece)`);
} else {
  fail(`unknown command "${cmd}"\n\n${USAGE}`);
}
