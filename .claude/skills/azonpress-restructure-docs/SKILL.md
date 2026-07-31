---
name: azonpress-restructure-docs
description: 'Perform STRUCTURAL operations on the AzonPress docs while protecting URL and reference integrity: rename a page (change its slug/URL), move a page to another section, delete a page, merge two pages, or reorder the sidebar. Always rewrites inbound links, moves the screenshot folder, and updates the sidebar in .vitepress/config.js. USE FOR: rename this doc, change the slug, change the URL of, move X to another section, delete this page, remove this doc, merge these two docs, reorder the sidebar, change the order of pages, reorganize the docs. DO NOT USE FOR: content or wording edits (use azonpress-edit-doc), creating a brand-new page (use azonpress-add-doc), or read-only checks (use azonpress-audit-docs).'
license: MIT
compatibility: 'VitePress 1.6 repo with NO rewrites — guide/<section>/<slug>.md maps directly to /guide/<section>/<slug>, so the section folder IS part of the public URL and any move is a breaking URL change. Sidebar is a manual array at themeConfig.sidebar["/guide/"] in .vitepress/config.js. Screenshots at guide/public/images/<section>/<slug>/. Requires git, Node + npm.'
metadata:
  project: azonpress-docs
  canonical-rules: CLAUDE.md
---

# Restructure AzonPress Docs

Rename, move, merge, delete, or reorder — without leaving dead links behind.
Canonical conventions live in `CLAUDE.md`; this skill is the *procedure*.

---

## ⚠️ The core risk

This site has **no `rewrites` map**. `guide/<section>/<slug>.md` is served at
`/guide/<section>/<slug>`, literally. That means:

- Renaming a slug **changes the live URL**.
- Moving a page to another section **changes the live URL**.
- Both break external inbound links, bookmarks, and accumulated SEO.

`npm run docs:build` will catch broken *internal* links. It cannot catch broken *external* ones.
So a URL change is a product decision, not a cleanup — get it confirmed explicitly.

---

## Agent Behavior Rules

1. **DO** state the old and new public URL side by side and get explicit confirmation before any
   rename or move.
2. **DO** use `git mv` for file and folder moves so history is preserved.
3. **DO** rewrite **every** inbound reference across `guide/` and `index.md` — including the
   homepage feature cards, which link deep into the guide.
4. **DO** move the page's screenshot folder alongside it, and update every image ref inside the
   page to the new path.
5. **DO** update `.vitepress/config.js` — the sidebar `link`, and the `text` too if the title changed.
6. **DO** check the homepage `index.md` on every operation; its 8 feature cards are easy to forget.
7. **DO** end on a clean `npm run docs:build`, then grep for the old slug to prove nothing is left.
8. **DO NOT** rename or move without confirmation just because a slug looks untidy.
9. **DO NOT** delete a page's screenshot folder as part of a page deletion without asking — this
   repo already keeps 13 orphaned image folders on purpose-ish, and they may be wanted for a
   rewrite.
10. **DO NOT** change page content beyond what the restructure requires (that is edit work).

---

## Phase 1: Setup (Interactive)

### 1.1 Operation
> **What kind of change?**

```
A. RENAME    - same section, new slug          → URL CHANGES
B. MOVE      - different section, same slug    → URL CHANGES
C. MERGE     - fold page A into page B, delete A → A's URL DIES
D. DELETE    - remove a page entirely          → URL DIES
E. REORDER   - sidebar order only              → no URL change, safe
```

Record `OPERATION`.

### 1.2 Targets

Resolve every affected file:
```
find guide -name '<slug>.md' -not -path '*/public/*'
```
Record `SOURCE_PATH`, and `DEST_PATH` where applicable.

### 1.3 Impact survey (always run before confirming)

```
Inbound links:   grep -rn '/guide/<section>/<slug>' --include='*.md' guide index.md
Sidebar entry:   grep -n '/guide/<section>/<slug>' .vitepress/config.js
Image folder:    grep -oE '/guide/public/images/[^)]*' <SOURCE_PATH> | sed 's|/[^/]*$||' | sort -u
```

Record `INBOUND_COUNT` and `IMAGE_DIR`.

### 1.4 Confirm

| Parameter | Value |
| --- | --- |
| Operation | ... |
| Old URL | `/guide/<old-section>/<old-slug>` |
| New URL | `/guide/<new-section>/<new-slug>` or **removed** |
| Inbound links to rewrite | N (list the files) |
| Image folder to move | ... |
| Sidebar change | ... |

For A–D, state clearly: **this changes/removes a live URL and external links to it will 404.**
Wait for explicit confirmation.

---

## Phase 2: Procedure by operation

### A. RENAME (same section, new slug)
```
1. git mv guide/<SECTION>/<OLD>.md guide/<SECTION>/<NEW>.md
2. git mv guide/public/images/<SECTION>/<OLD>/ guide/public/images/<SECTION>/<NEW>/   (if it exists)
3. Update image refs inside the page to the new folder path
4. Rewrite inbound links in guide/ and index.md: /guide/<SECTION>/<OLD> → /guide/<SECTION>/<NEW>
5. Update sidebar `link` (and `text` if the title changed) in .vitepress/config.js
6. Update frontmatter title / title_tag if the title changed
```

### B. MOVE (different section)
```
Same as RENAME, but the SECTION segment changes in every path:
the file, the image folder, the image refs, the inbound links, and the sidebar link.
Also move the sidebar entry into the destination GROUP's items array — ask where in the order.
```

### C. MERGE (A into B)
```
1. Read both pages fully
2. Fold A's unique content into B at the right position — do not duplicate what B already says
3. Move A's images into B's image folder; update the merged refs
4. Rewrite all inbound links to A → B (pointing at the relevant heading anchor where useful)
5. Delete A's markdown file; ASK before deleting A's now-empty image folder
6. Remove A's sidebar entry
```

### D. DELETE
```
1. Rewrite or remove every inbound link first — never leave a dangling reference
2. Remove the sidebar entry
3. git rm the markdown file
4. ASK before removing the image folder
```

### E. REORDER (safe)
```
1. Reorder entries within a GROUP's items array, or reorder the groups themselves,
   in .vitepress/config.js. Nothing else changes — no file moves, no link rewrites.
```

---

## Phase 3: Verify & Report

```
1. BUILD      - npm run docs:build   (must be clean)
2. RESIDUE    - grep -rn '<OLD_SLUG>' --include='*.md' guide index.md .vitepress/config.js
                Must return nothing (except intentional prose mentions).
3. SIDEBAR    - Re-read the changed group; confirm valid JS and correct order.
4. HOMEPAGE   - grep -n '<OLD_SLUG>' index.md   → must be clean.
```

Report:
- Operation performed
- Old URL → new URL (or: removed)
- Files moved (with `git mv` preserved history)
- Inbound links rewritten: N, in which files
- Image folder: moved / left in place / deleted (and whether you asked)
- Sidebar change
- Build: pass / fail
- **Explicit warning** if a live URL changed, so the user can decide about redirects

---

## Quick Reference

### Locate everything for a page
```
File:          find guide -name '<slug>.md' -not -path '*/public/*'
Inbound:       grep -rn '/guide/<section>/<slug>' --include='*.md' guide index.md
Sidebar:       grep -n '<slug>' .vitepress/config.js
Images:        grep -oE '/guide/public/images/[^)]*' <file> | sed 's|/[^/]*$||' | sort -u
Homepage card: grep -n '<slug>' index.md
```

### Sections and sidebar groups
```
guide/getting-started/             → 'Getting Started'
guide/configuring-amazon-api/      → 'Configuring Amazon API'
guide/product-tables-module/       → 'Product Tables'
guide/amazon-comparison-tables/    → 'Comparison Tables'
guide/available-products-templates/→ 'Product Templates'
guide/custom-product/              → 'Custom Products'
guide/reports/                     → 'Reports'
guide/miscellaneous/               → 'Miscellaneous'
guide/support/                     → 'Support'
```

### Key Principles
1. **No rewrites means every move is a breaking URL change** — confirm, don't assume.
2. **`git mv`, never `mv`** — keep the history.
3. **Rewrite inbound links before deleting anything.**
4. **The homepage links into the guide too.**
5. **Clean build + zero grep hits on the old slug = done.**
