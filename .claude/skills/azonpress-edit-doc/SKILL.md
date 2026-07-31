---
name: azonpress-edit-doc
description: 'Edit the CONTENT of an EXISTING AzonPress documentation page in place — same slug, same folder, same URL — while preserving every site convention. Handles rewording, adding or removing sections, updating steps for a new plugin version, and swapping screenshots. USE FOR: edit the X doc, update the wording on, add a section to, rewrite this page, this doc is out of date, fix an error in the doc, expand the X guide, update the doc for the new release. DO NOT USE FOR: creating a new page (use azonpress-add-doc), renaming a slug / moving between sections / deleting / reordering the sidebar (use azonpress-restructure-docs), release notes (use azonpress-changelog), or site-wide checks (use azonpress-audit-docs).'
license: MIT
compatibility: 'VitePress 1.6 repo using guide/<section>/<slug>.md layout with NO rewrites. Sidebar is a manual array at themeConfig.sidebar["/guide/"] in .vitepress/config.js (plain JS). Screenshots live at guide/public/images/<section>/<slug>/ — note that folder names do not always match the page slug. Requires Node + npm.'
metadata:
  project: azonpress-docs
  canonical-rules: CLAUDE.md
---

# Edit an AzonPress Doc Page

Modify an existing page in place. The file path, slug, public URL, and sidebar `link` all stay
the same. Canonical conventions live in `CLAUDE.md`; this skill is the *procedure* for safe edits.

---

## Agent Behavior Rules

1. **DO** locate the exact file and confirm it with the user before editing.
2. **DO** read the whole page before changing any part of it — steps are usually sequential and
   screenshots are interleaved with them.
3. **DO** preserve conventions on every touched line: full `/guide/<section>/<slug>` cross-links,
   `**Bold**` UI labels with no inner spaces, `> **Note**,` blockquote callouts.
4. **DO** find this page's real image folder by grepping its existing refs — **the folder name
   does not always match the slug** (e.g. `how-to-create-an-amazon-product-table.md` uses
   `.../product-tables-module/how-to-create-a-product-table/`).
5. **DO** update the matching sidebar `text` in `.vitepress/config.js` if the H1 changes. The
   `link` must stay identical.
6. **DO** keep frontmatter `title` in sync with the H1, and refresh `meta_description` if the
   page's scope materially changed.
7. **DO** end on a clean `npm run docs:build`.
8. **DO NOT** change the slug, rename, or move the file — that is restructure work and it breaks
   live URLs.
9. **DO NOT** introduce relative links (`./slug`, `../slug`) or shorten image paths to `/images/...`.
10. **DO NOT** convert existing `> **Note**,` callouts into `::: tip` containers, or add `(Pro)`
    labels — neither is used on this site.
11. **DO NOT** touch unrelated pages.

---

## Phase 1: Setup (Interactive)

### 1.1 Target page
> **Which doc?** (title, slug, or URL)

Resolve to a file:
```
find guide -name '<slug>.md' -not -path '*/public/*'
```
If ambiguous or not found, ask. Record `TARGET_PATH`, `SLUG`, `SECTION`.

### 1.2 The change
> **What should change?** (new wording, add/remove a section, updated steps, swapped screenshot…)

Record as `CHANGE`.

### 1.3 Scope flags
> **Does this involve screenshots?** and **does the page title (H1) change?**

Record `TOUCHES_IMAGES` and `TITLE_CHANGES`.

### 1.4 Confirm

| Parameter | Value |
| --- | --- |
| File | ... |
| Change | ... |
| Touches images | yes / no |
| Title changes | yes / no |

Wait for confirmation.

---

## Phase 2: Context

1. Read `TARGET_PATH` in full.
2. Read `CLAUDE.md` for conventions.
3. Resolve the page's actual image folder:
   ```
   grep -oE '/guide/public/images/[^)]*' <TARGET_PATH> | sed 's|/[^/]*$||' | sort -u
   ```
4. If `TITLE_CHANGES`: locate the sidebar entry
   ```
   grep -n '/guide/<SECTION>/<SLUG>' .vitepress/config.js
   ```
   Its `text` will need updating; its `link` will not.
5. If adding substantial new prose, read one neighbouring page in the same `SECTION` to match
   house style.

---

## Phase 3: Procedure

```
1. EDIT      - Apply CHANGE to TARGET_PATH with Edit.
               Enforce conventions on touched lines:
                 full /guide/... cross-links, **Bold** UI labels,
                 > **Note**, blockquote callouts, no support boilerplate.

2. IMAGES    - If TOUCHES_IMAGES: add/replace .webp files in the page's REAL image folder
               (resolved in Phase 2, step 3 — not a guessed path).
               Update ![alt](/guide/public/images/<section>/<folder>/<file>.webp) refs.
               Remove refs for any file you deleted.

3. META      - If TITLE_CHANGES: update frontmatter `title` to match the new H1.
               Refresh `meta_description` if the page's scope changed.

4. SIDEBAR   - If TITLE_CHANGES: update that entry's `text` in .vitepress/config.js.
               Do NOT change its `link`. Keep valid JS.

5. BUILD     - npm run docs:build ; fix anything reported; rebuild until clean.
```

---

## Phase 4: Verify & Report

Report:
- File edited: `TARGET_PATH` (URL unchanged)
- What changed, in one or two sentences
- Images added / replaced / removed (with the folder path used)
- Frontmatter updated? Sidebar `text` updated? (link unchanged)
- Build: pass / fail

---

## Quick Reference

### Locate
```
File by slug:    find guide -name '<slug>.md' -not -path '*/public/*'
Its image dir:   grep -oE '/guide/public/images/[^)]*' <file> | sed 's|/[^/]*$||' | sort -u
Sidebar entry:   grep -n '/guide/<section>/<slug>' .vitepress/config.js
Inbound links:   grep -rn '/guide/<section>/<slug>' --include='*.md' guide index.md
```

### Formats (unchanged from site rules)
```
Cross-link:  [Text](/guide/<section>/<slug>)            (full path — never relative)
Image ref:   ![Alt](/guide/public/images/<section>/<folder>/<name>.webp)
Bold label:  **Save Changes**                           (no inner spaces)
Callout:     > **Note**, <sentence>
             > **Remember**, <sentence>
```

### Key Principles
1. **In place only** — same path, same slug, same sidebar link.
2. **Conventions survive edits** — don't regress links, bold, or callout style.
3. **Title change ⇒ frontmatter + sidebar `text` change** (link stays).
4. **Find the image folder, don't guess it.**
5. **Green build or it's not done.**
