---
name: azonpress-add-doc
description: 'Create a NEW AzonPress documentation page in this VitePress site: place it in the right section folder, write frontmatter and body to house style, create its screenshot folder, wire it into the sidebar in .vitepress/config.js, and verify with docs:build. Also handles converting pasted HTML or draft markdown into a clean doc page. USE FOR: add a doc, write a new doc page, create a doc for X, document this feature, new documentation page, add a page to the sidebar, turn this draft into a doc, import this article. DO NOT USE FOR: editing an existing page (use azonpress-edit-doc), renaming/moving/deleting a page or reordering the sidebar (use azonpress-restructure-docs), release notes (use azonpress-changelog), screenshots on an existing page (use azonpress-manage-images), or site-wide checks (use azonpress-audit-docs).'
license: MIT
compatibility: 'VitePress 1.6 repo using guide/<section>/<slug>.md layout with NO rewrites — the section folder is part of the public URL. Sidebar is a manual array at themeConfig.sidebar["/guide/"] in .vitepress/config.js (plain JS, not .mts). Screenshots live at guide/public/images/<section>/<slug>/. Requires Node + npm.'
metadata:
  project: azonpress-docs
  canonical-rules: CLAUDE.md
---

# Add an AzonPress Doc Page

Create a new page and wire it into navigation. Canonical conventions live in `CLAUDE.md`;
this skill is the *procedure*.

---

## Agent Behavior Rules

1. **DO** confirm the section folder with the user before creating anything — the folder is part
   of the permanent public URL (`/guide/<section>/<slug>`) and there are no rewrites to hide it.
2. **DO** add the page to `themeConfig.sidebar['/guide/']` in `.vitepress/config.js`. This is the
   step that is silently skippable: **a missing sidebar entry never fails the build**, it just
   ships an invisible page.
3. **DO** write all three frontmatter keys: `title`, `title_tag`, `meta_description`.
4. **DO** reference images with the full on-disk path `/guide/public/images/<section>/<slug>/<name>.webp`.
   Never shorten to `/images/...` and never use relative `./` paths.
5. **DO** cross-link the new page from at least one existing related page, so it isn't an orphan.
6. **DO** end on a clean `npm run docs:build`.
7. **DO NOT** invent a new section folder without asking — 9 sections exist and the sidebar
   groups are fixed.
8. **DO NOT** use `::: tip` / `::: warning` containers in body copy. This site uses
   `> **Note**,` / `> **Remember**,` blockquotes.
9. **DO NOT** add `(Pro)` labels — this site has no tier split.
10. **DO NOT** append support boilerplate; link to `/guide/support/how-to-get-support` instead.

---

## Phase 1: Setup (Interactive)

### 1.1 Topic and source
> **What is the page about?** and **is there source material?** (pasted HTML, a draft, release
> notes, or should it be written from scratch?)

Record `TOPIC` and `SOURCE`.

### 1.2 Section
> **Which section does it belong to?**

```
Getting Started            → guide/getting-started/
Configuring Amazon API     → guide/configuring-amazon-api/
Product Tables             → guide/product-tables-module/
Comparison Tables          → guide/amazon-comparison-tables/
Product Templates          → guide/available-products-templates/
Custom Products            → guide/custom-product/
Reports                    → guide/reports/
Miscellaneous              → guide/miscellaneous/
Support                    → guide/support/
```

Record `SECTION` (folder) and `GROUP` (sidebar group title).

### 1.3 Slug and title
Propose a kebab-case `SLUG` from the topic and an H1 `TITLE`. Existing slugs are descriptive and
can be long (`how-to-create-an-amazon-product-table`) — match that register.

Verify the slug is free:
```
ls guide/<SECTION>/<SLUG>.md 2>/dev/null && echo "TAKEN"
```

### 1.4 Position and images
> **Where in the sidebar group should it sit?** (first / last / after <page>)
> **Will it have screenshots?**

Record `POSITION` and `HAS_IMAGES`.

### 1.5 Confirm

| Parameter | Value |
| --- | --- |
| File | `guide/<SECTION>/<SLUG>.md` |
| Public URL | `/guide/<SECTION>/<SLUG>` |
| Sidebar group | `<GROUP>` |
| Sidebar text | ... |
| Position | ... |
| Images | yes / no |

Wait for confirmation.

---

## Phase 2: Context

1. Read `CLAUDE.md` for conventions.
2. Read **one existing page in the same `SECTION`** to match tone, heading depth, and how steps
   and screenshots are interleaved.
3. Read the `GROUP` block in `.vitepress/config.js` to see the `text` shortening style used for
   sibling entries.

---

## Phase 3: Procedure

```
1. FILE      - Write guide/<SECTION>/<SLUG>.md
               Frontmatter: title, title_tag, meta_description (see Quick Reference)
               Body: single # H1 matching title, then ## sections
               Bold every UI label exactly as it appears in the plugin: **Save Changes**
               Numbered lists for sequential steps, bullets for options
               Close with a one-line wrap-up sentence

2. IMAGES    - If HAS_IMAGES: create guide/public/images/<SECTION>/<SLUG>/
               Place .webp screenshots there
               Reference each directly after the step it illustrates, with real alt text
               (If the user has no screenshots yet, leave the folder out — this repo does
                not use .gitkeep — and note the gap in the final report.)

3. SIDEBAR   - Edit .vitepress/config.js
               Add { text: '<Short Text>', link: '/guide/<SECTION>/<SLUG>' }
               to the items array of the <GROUP> block, at POSITION.
               Keep valid JS and match surrounding indentation (10 spaces for item objects).

4. CROSSLINK - Add a contextual link to the new page from >=1 related existing page.

5. BUILD     - npm run docs:build ; fix anything reported; rebuild until clean.
```

---

## Phase 4: Verify & Report

Confirm and report:
- File created: `guide/<SECTION>/<SLUG>.md`
- Public URL: `/guide/<SECTION>/<SLUG>`
- Sidebar entry added under `<GROUP>` — quote the exact line
- Image folder created + count of screenshots (or: none yet, and which steps need them)
- Cross-links added from which page(s)
- Build: pass / fail

If screenshots are still missing, say so plainly — do not describe the page as finished.

---

## Quick Reference

### Frontmatter template
```yaml
---
title: "<TITLE>"
title_tag: "<SEO Title> | Azonpress Documentation"
meta_description: "<Benefit-led, ~150-160 chars, closing with a short call to action.>"
---
```
`title_tag` always ends with `| Azonpress Documentation` — lowercase "zon", exactly as written.

### Formats
```
Cross-link:  [Text](/guide/<section>/<slug>)
Image ref:   ![Alt](/guide/public/images/<section>/<slug>/<name>.webp)
Bold label:  **Save Changes**        (no inner spaces)
Callout:     > **Note**, <sentence>
             > **Remember**, <sentence>
```

### Sidebar entry
```js
{ text: 'Create Product Table', link: '/guide/product-tables-module/how-to-create-an-amazon-product-table' }
```
Sidebar `text` is a shortened form of the H1, not a copy of it.

### Locate
```
Sidebar group:  grep -n "text: '<GROUP>'" .vitepress/config.js
Sibling pages:  ls guide/<SECTION>/
Slug collision: ls guide/<SECTION>/<SLUG>.md
```

### Key Principles
1. **The section folder is the URL** — get it right the first time.
2. **Sidebar or invisible** — the build will not remind you.
3. **Full image paths** — `/guide/public/images/...`, always.
4. **Match the neighbouring page**, not a sibling repo.
5. **Green build or it's not done.**
