---
name: azonpress-manage-images
description: 'Add, replace, standardize, and audit screenshots in the AzonPress VitePress docs. Enforces the repo convention: per-page images live at docs/public/images/<section>/<slug>/, are referenced in markdown with the full root-relative /docs/public/images/... path, use .webp, and carry meaningful alt text. Verifies every reference resolves to a real file and reports orphans. USE FOR: add screenshots, embed images, replace an image, fix image paths, broken image, image not showing, standardize screenshots, rename screenshots, find unused images, check alt text. DO NOT USE FOR: brand assets like logos or the favicon (those are config-level, see CLAUDE.md), creating a whole new page (use azonpress-add-doc), or prose edits (use azonpress-edit-doc).'
license: MIT
compatibility: 'VitePress 1.6 with vite.publicDir set to docs/public. Markdown image refs resolve through the VITE ASSET PIPELINE using the full on-disk path (/docs/public/images/...), NOT through publicDir. Image conversion, if needed, requires cwebp or ImageMagick. Requires Node + npm to run docs:build.'
metadata:
  project: azonpress-docs
  canonical-rules: CLAUDE.md
---

# Manage AzonPress Doc Screenshots

Add, swap, and validate images without breaking the two different path systems this repo uses.

---

## ⚠️ The two path systems (read this first)

Both of these work, for **different reasons**. Mixing them up is the #1 cause of broken images here.

| Use | Path you write | Why it works |
| --- | --- | --- |
| **Screenshots in Markdown** | `/docs/public/images/<section>/<slug>/<name>.webp` | Vite reads the leading `/` as **project-root relative**, finds the file on disk, and bundles it to `/assets/<name>.<hash>.webp` |
| **Brand assets in `config.js`** | `/images/brand/<name>.png`, `/favicon.png` | Passed straight through by `publicDir: 'docs/public'` |

**In Markdown, always write the full path including `docs/public`.** Shortening it to
`/images/...` will still render, but the file skips content-hashing and cache-busting — an
invisible regression. All 125 existing refs use the full form.

The root `public/` directory is **dead** (publicDir is overridden). Never put assets there.

---

## Agent Behavior Rules

1. **DO** use the full `/docs/public/images/<section>/<slug>/<name>.webp` form in Markdown.
2. **DO** find a page's **real** image folder by grepping its existing refs — folder names do not
   always match the page slug (e.g. `how-to-create-an-amazon-product-table.md` uses
   `.../product-tables-module/how-to-create-a-product-table/`).
3. **DO** prefer `.webp`. Convert `.png`/`.jpg` sources before adding them.
4. **DO** write descriptive alt text stating what the screenshot shows
   (`![Save changes and Preview button](...)`), not `![screenshot]` or `![image]`.
5. **DO** place each image directly after the step it illustrates.
6. **DO** use kebab-case, descriptive file names.
7. **DO** end on a clean `npm run docs:build` — Vite fails loudly on an asset path that doesn't
   resolve, which is the real test that an image works.
8. **DO NOT** use relative `./` or `../` image paths.
9. **DO NOT** put doc screenshots in `docs/public/images/brand/` — that folder is logos and the
   hero banner only.
10. **DO NOT** bulk-delete orphaned image folders. This repo has 13 of them from an earlier doc
    structure; some are likely wanted. Report them and ask.

---

## Phase 1: Setup (Interactive)

### 1.1 Task
> **What do you need?**

```
A. ADD       - new screenshots to an existing page
B. REPLACE   - swap an outdated screenshot
C. FIX       - an image isn't rendering
D. AUDIT     - check refs resolve, find orphans, check alt text
```

Record `TASK`.

### 1.2 Target
For A–C: > **Which page?** Resolve it:
```
find docs -name '<slug>.md' -not -path '*/public/*'
```
Record `TARGET_PATH`, `SECTION`, `SLUG`.

For D: no target — the whole site.

### 1.3 Source files
For A/B: > **Where are the new screenshots?** Record their paths and formats.

### 1.4 Confirm the destination folder

Resolve the page's **existing** image folder first:
```
grep -oE '/docs/public/images/[^)]*' <TARGET_PATH> | sed 's|/[^/]*$||' | sort -u
```
- If the page already has a folder → **use that one**, even if its name differs from the slug.
- If it has none → create `docs/public/images/<SECTION>/<SLUG>/`.

State the destination and wait for confirmation.

---

## Phase 2: Procedure by task

### A. ADD
```
1. Convert sources to .webp if needed:
     cwebp -q 85 input.png -o output.webp
     # or: magick input.png -quality 85 output.webp
2. Name them kebab-case and descriptively.
3. Copy into the confirmed folder.
4. Insert refs in TARGET_PATH directly after the step each one illustrates:
     ![Descriptive alt text](/docs/public/images/<SECTION>/<FOLDER>/<name>.webp)
5. npm run docs:build
```

### B. REPLACE
```
1. Find the existing ref and its file name.
2. Keep the SAME file name where possible — then no markdown edit is needed and no other
   page that reuses the image breaks.
3. If the name must change: update the ref, and grep for the old name across all docs first
   (images are occasionally reused between pages).
4. npm run docs:build
```

### C. FIX a broken image
Work down this list — it is ordered by how often each cause actually occurs here:
```
1. Path shortened to /images/... instead of /docs/public/images/...
2. Folder name assumed from the slug, but the real folder is named differently
3. Typo in the file name, or wrong extension (.png vs .webp)
4. File genuinely missing from disk
5. Relative path (./ or ../) used instead of root-relative
```
Verify the file exists:
```
ls docs/public/images/<SECTION>/<FOLDER>/
```

### D. AUDIT (read-only)
```
1. BROKEN REFS - every markdown ref must resolve to a real file:
     grep -rhoE '\(/docs/public/images/[^)]*\)' --include='*.md' docs index.md \
       | tr -d '()' | sed 's|^/||' | sort -u \
       | while read p; do [ -f "$p" ] || echo "MISSING: $p"; done

2. WRONG FORM  - refs that skip the docs/public prefix:
     grep -rn '](/images/' --include='*.md' docs index.md

3. RELATIVE    - relative image paths:
     grep -rnE '!\[[^]]*\]\(\.\.?/' --include='*.md' docs index.md

4. ORPHANS     - image folders with no matching page:
     for d in docs/public/images/*/*/; do
       sec=$(basename $(dirname "$d")); slug=$(basename "$d")
       [ -f "docs/$sec/$slug.md" ] || echo "ORPHAN DIR: $sec/$slug"
     done
     (Expect ~13. Report, do not delete.)

5. ALT TEXT    - empty or placeholder alt text:
     grep -rnE '!\[(|image|screenshot|img)\]\(' --include='*.md' docs index.md

6. NON-WEBP    - non-webp screenshots:
     find docs/public/images -type f ! -name '*.webp' ! -path '*/brand/*'
```

---

## Phase 3: Verify & Report

Report:
- Task performed and the folder used (confirm it was the page's real folder)
- Images added / replaced / removed, by name
- Any refs updated
- Audit findings, grouped: broken refs, wrong-form paths, orphans, weak alt text, non-webp
- Build: pass / fail

For an audit, present findings as a checklist with counts and offending paths, then **offer**
fixes — do not apply them unasked.

---

## Quick Reference

### Formats
```
Markdown ref:  ![Descriptive alt text](/docs/public/images/<section>/<folder>/<name>.webp)
On disk:       docs/public/images/<section>/<folder>/<name>.webp
Brand assets:  docs/public/images/brand/  → referenced in config.js as /images/brand/...
```

### Locate
```
A page's image folder:  grep -oE '/docs/public/images/[^)]*' <file> | sed 's|/[^/]*$||' | sort -u
Reuse of one image:     grep -rn '<image-name>.webp' --include='*.md' docs index.md
Folder contents:        ls docs/public/images/<section>/<folder>/
```

### Convert to webp
```
cwebp -q 85 input.png -o output.webp
magick input.png -quality 85 output.webp
```

### Key Principles
1. **Full path in Markdown** — `/docs/public/images/...`, always.
2. **Find the folder, don't guess it** — names drift from slugs.
3. **`.webp` + descriptive alt text.**
4. **Root `public/` is dead**; brand assets live under `docs/public/images/brand/`.
5. **Orphans get reported, not deleted.**
