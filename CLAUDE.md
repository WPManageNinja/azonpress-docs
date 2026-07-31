# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Repository overview

This is the **end-user documentation site** for **AzonPress** — a WordPress affiliate-marketing plugin by WPManageNinja that pulls Amazon product data into product tables, comparison tables, and templates. The site is built with [VitePress](https://vitepress.dev/) v1.6 (Vue 3).

> **You are editing user-facing documentation, not plugin source code.** All content lives under `guide/` as Markdown. The currently documented release is **AzonPress v2.3.0** (July 21, 2026) — the release that moved from the Amazon Product Advertising API (PA-API) to the **Amazon Creators API**.

This repo is one of ~20 sibling VitePress doc sites under `WPManageNinja-Docs/`. Conventions here are close to, but **not identical to**, its siblings — do not copy patterns from a sibling repo without checking them against this file (notably: this repo uses plain `config.js`, has **no** `rewrites`, and resolves images differently).

---

## Commands

```bash
npm install            # Install dependencies
npm run docs:dev       # Dev server → http://localhost:5173 (live reload)
npm run docs:build     # Production build → .vitepress/dist/
npm run docs:preview   # Preview the production build → http://localhost:4173
```

**Validation:** There are no tests, linters, or formatters. `npm run docs:build` is the de facto correctness check — VitePress fails the build on dead internal links and warns on unresolved image paths. Run it after any link, image, or page change. A clean build takes ~3 seconds.

---

## Project structure

```text
.
├── index.md                      # Homepage (layout: home, hero + 8 feature cards)
├── README.md                     # Repo readme — excluded from the site via srcExclude
├── CLAUDE.md                     # This file — excluded from the site via srcExclude
├── package.json                  # Scripts + devDep (vitepress ^1.6.4)
│
├── .claude/
│   ├── settings.local.json       # Local permission allowlist
│   └── skills/                   # Repo skills — see "Skills" below
│
├── .vitepress/
│   ├── config.js                 # Site config — nav, sidebar, markdown rules. SINGLE SOURCE OF TRUTH
│   ├── theme/
│   │   ├── index.js              # Extends DefaultTheme; registers Feedback; imports custom.css
│   │   ├── Layout.vue            # Injects <Feedback/> into the #doc-footer-before slot
│   │   ├── custom.css            # AzonPress brand colors (yellow #FFC700)
│   │   └── components/
│   │       └── Feedback.vue      # 👍/👎 widget → Google Apps Script endpoint
│   ├── cache/                    # Build cache (gitignored)
│   └── dist/                     # Build output (gitignored; may be stale — never authoritative)
│
├── guide/                        # ALL documentation content
│   ├── changelog.md              # Release notes (linked from top nav)
│   ├── getting-started/          # Introduction, install, dashboard, glossary
│   ├── configuring-amazon-api/   # API credentials, configuration, geo tracking
│   ├── product-tables-module/    # Creating + customizing product tables, columns
│   ├── amazon-comparison-tables/ # Creating + customizing comparison tables
│   ├── available-products-templates/  # Grid, Box, List, Table, Widget, Bestseller, Elements
│   ├── custom-product/           # Custom (non-Amazon) products — dashboard, single, bulk
│   ├── reports/                  # Overview, click tracking, geo location
│   ├── miscellaneous/            # Appearance, affiliate links, other settings
│   ├── support/                  # How to get support
│   └── public/                   # SERVED AS THE SITE'S publicDir — see "Images" below
│       ├── favicon.png           #   → /favicon.png
│       └── images/
│           ├── brand/            #   Logos + hero banner → /images/brand/...
│           └── <section>/<slug>/ #   Per-page screenshots (.webp)
│
└── public/                       # ⚠️ DEAD — publicDir is overridden to guide/public.
                                  #   Files here are NOT served. Do not add assets here.
```

There are **31 content pages** across 9 sidebar sections, plus the homepage. Sections are flat: no `index.md` landing pages per section.

---

## Architecture decisions to be aware of

### URLs are literal file paths — there are no rewrites

`guide/<section>/<slug>.md` is served at `/guide/<section>/<slug>` (`cleanUrls: true` strips `.html`).

**The section folder is part of the public URL.** Moving a page between sections changes its live URL and breaks external inbound links and SEO. Treat cross-section moves as a deliberate, confirmed decision — see the `azonpress-restructure-docs` skill.

### Sidebar is manual and is the single source of truth

`themeConfig.sidebar['/guide/']` in `.vitepress/config.js` is a hand-maintained array of `{ text, items: [{ text, link }] }` groups. VitePress does **not** generate it from the filesystem.

- **A new page is invisible until you add it to that array.** It is still reachable by URL, so the build stays green — a missing sidebar entry will never fail CI. Check it by hand.
- The 9 sidebar group titles are shorter than the folder names (e.g. folder `product-tables-module` → group `Product Tables`) and item `text` values are shortened versions of the page H1 (e.g. `# How to Create an Amazon Product Table` → `Create Product Table`). Match that brevity.
- The top `nav` (Home, User Docs, Website, Changelog) lives in the same file.

### Images: two different resolution mechanisms

This is the single most confusing thing in the repo. Both forms work, for different reasons.

| Use | Path form | How it resolves |
| --- | --- | --- |
| **Screenshots in Markdown** | `/guide/public/images/<section>/<slug>/<name>.webp` | Vite treats a leading `/` as **project-root relative**, finds the real file on disk, and bundles it into `/assets/<name>.<hash>.webp` |
| **Brand assets in `config.js`** | `/images/brand/<name>.png`, `/favicon.png` | Served straight through by `publicDir: 'guide/public'` |

So in Markdown, **always write the full on-disk path** including `guide/public`:

```md
![Alt text](/guide/public/images/reports/geo-location-report/geo-map.webp)
```

Do not "simplify" it to `/images/...` — that skips content hashing and cache-busting. All 125 existing image references use the full form. Never use relative (`./`) image paths.

Screenshots are **`.webp`**, stored one folder per page: `guide/public/images/<section>/<slug>/`. There are no `.gitkeep` files in this repo; empty folders simply aren't tracked.

### Video embeds

VitePress has no video component — the supported approach is raw HTML in Markdown, which
VitePress passes through untouched. This site standardises on a `.video-frame` wrapper defined in
`.vitepress/theme/custom.css`:

```html
<div class="video-frame">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Exact YouTube video title"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>
```

The wrapper gives a 16:9 responsive frame at the same width as a screenshot in the content column,
with the site's divider border and 8px radius. There is a `@supports` padding-bottom fallback for
browsers without `aspect-ratio`.

Rules for adding one:
- **Only embed videos from the WPManageNinja channel** (`youtube.com/@WPManageNinja`). Search
  results surface third-party AzonPress tutorials — verify ownership before embedding.
- **Verify the video before embedding it.** The YouTube oEmbed endpoint confirms in one call that
  the ID resolves, the video is embeddable, and who owns it:
  `curl -s "https://www.youtube.com/oembed?url=https%3A//www.youtube.com/watch%3Fv%3D<ID>&format=json"`
  (200 + `"author_name":"WPManageNinja"`). Never write a video ID from memory.
- **Check the upload date against the documented release.** Several AzonPress videos date from
  2018 and show a pre-Creators-API UI that contradicts the current docs — see "Known state" below.
- **Embed the frame on its own — no heading and no lead-in sentence above it.** Place it after
  the page intro, before the first step section (in `azonpress-introduction.md` it sits inline in
  the editors section). The video is meant to speak for itself.
- Use the exact YouTube title as the `title` attribute — it is the accessible name for the frame.

### Every in-content link opens in a new tab

A `markdown-it` `link_open` rule in `config.js` adds `target="_blank" rel="noopener noreferrer"` to **every** link that lacks an explicit `target` — including internal cross-references. This is intentional but surprising; account for it when reasoning about navigation, and don't "fix" internal links by adding a target.

### Frontmatter SEO fields are currently inert

30 of 31 pages carry `title_tag` and `meta_description`. **Neither reaches the built HTML.** They are not VitePress keys, and there is no `transformHead` hook to read them. Built pages get `<title>{title} | AzonPress Docs</title>` and fall back to the *site-wide* description for `<meta name="description">`.

They are carryover fields from the source CMS the docs were migrated from. **Keep writing them** — they are consistent across the site and are ready to wire up — but do not expect them to affect output, and do not report SEO changes as live.

### Custom theme

- `Layout.vue` injects the `<Feedback />` widget into the `doc-footer-before` slot on every doc page.
- `Feedback.vue` POSTs votes and comments to a hardcoded Google Apps Script URL, tagged `PRODUCT_NAME = 'AzonPress-user-docs'`. The same endpoint is shared across sibling doc sites, so **do not change `PRODUCT_NAME`** — it is the only thing separating this site's feedback from other products'.
- `custom.css` overrides `--vp-c-brand-*` to AzonPress yellow (`#FFC700`) and darkens the homepage hero button (`#e7bd12`).

### Search

Local provider (`search: { provider: 'local' }`) — client-side MiniSearch, built at build time. No external service, no API keys, no config needed when adding pages.

---

## Content conventions

Follow these to stay consistent with the 31 existing pages.

### Frontmatter

Every content page opens with:

```yaml
---
title: "How to Create an Amazon Product Table"
title_tag: "Amazon Product Table Guide | Azonpress Documentation"
meta_description: "One or two sentences, ~150–160 chars, ending in a short call to action."
---
```

- `title` — matches the H1.
- `title_tag` — always ends with `| Azonpress Documentation` (lowercase "zon", no camel case — this is the established pattern across the site).
- `meta_description` — benefit-led, ~150–160 characters, typically closing with a short imperative ("Start today!", "Analyze now!").
- `description` is used on only 5 pages. Prefer the `title_tag` / `meta_description` pair for new content.

### Page body

- One `# H1` immediately after the frontmatter, then `## H2` sections, `### H3` only when genuinely needed.
- Bold UI labels exactly as they appear in the plugin: `**Preview**`, `**Save Changes**`, `**Settings → General**`.
- Numbered lists for sequential steps; bullets for non-sequential options.
- Screenshots go **directly after** the step they illustrate, each with descriptive alt text.
- Pages typically close with a one-line wrap-up sentence, sometimes followed by `---`.

### Callouts

This repo does **not** use VitePress `::: tip` / `::: warning` containers in body copy. The established emphasis pattern is a blockquote with a bold lead-in:

```md
> **Note**, rapid repeat clicks from the same visitor within a couple of seconds are only counted once.

> **Remember**, you need to configure your MaxMind API key first.
```

`::: code-group` **is** used — but only in `guide/changelog.md`. Match what neighbouring pages do rather than introducing new container types.

### Links

- Cross-references use the full root-relative path: `[Geo Tracking Settings](/guide/configuring-amazon-api/geo-tracking-targeting-settings)`.
- Never use relative paths (`../geo-location-report`) — fragile with `cleanUrls`.
- For support, link to `/guide/support/how-to-get-support` rather than repeating support boilerplate at the end of a page.

### Free vs Pro

AzonPress docs currently carry **no** `(Pro)` labels — unlike several sibling repos. Don't introduce Pro/Free markers unless the product team confirms a tier split.

### Changelog format

`guide/changelog.md` is reverse-chronological. Each release is:

````md
## AzonPress v2.3.0
*Released on July 21, 2026*

::: code-group

```md [🆕 New Features]
• Entry written from the user's point of view
```

```md [🔧 Improvements]
• ...
```

```md [🗑️ Removed]
• ...
```

```md [🐛 Bug fixes]
• ...
```

:::
````

Rules: `md` as the fence language inside `code-group`, `•` bullets (not `-`), sentence case with no trailing period, and **omit any tab that has no entries**. Newest release goes directly under the intro paragraph.

---

## Known state and gotchas

Verified as of the last review — worth knowing before you assume something is broken:

1. **13 orphaned image folders.** Directories under `guide/public/images/<section>/` have no matching `.md` page (e.g. `miscellaneous/api-caching`, `product-tables-module/how-to-create-a-product-table`, `getting-started/how-to-use-azonpress-using-gutenberg-blocks`). They are leftovers from an earlier doc structure. They cost nothing at build time — Vite only bundles referenced files — so **do not bulk-delete them without asking**; some are likely wanted for pages that were merged or are pending a rewrite.
2. **Image folder names don't always match the page slug.** `how-to-create-an-amazon-product-table.md` uses images from `.../product-tables-module/how-to-create-a-product-table/`. Locate a page's images by grepping its refs, not by guessing the path from the slug.
3. **3 pages have no image folder** — `azonpress-glossary`, `click-tracking-and-cloaked-url-analytics`, `how-to-get-support`. These are intentionally text-only.
4. **The root `public/` directory is dead.** It holds `logo-dark.png` / `logo-light.png` that are never served, because `vite.publicDir` is overridden to `guide/public`. Live logos are in `guide/public/images/brand/`.
5. **`.gitignore` has duplicated entries** (`.DS_Store` ×4, `/.vitepress/dist` ×2). Cosmetic.
6. **A missing sidebar entry never fails the build.** It is the most common way a new page silently ships invisible.
7. **Deliberately un-embedded videos.** The WPManageNinja channel has AzonPress tutorials from
   2018 that were *not* embedded, because they contradict the current product:
   - `195WyDdnpwM` "Creating Credentials and Configuring API" teaches the **PA-API Access Key /
     Secret Key** flow, which v2.3.0 removed. The docs now state those credentials are no longer
     supported, so embedding this would actively mislead readers. **Do not add it** unless a
     re-recorded Creators API version is published.
   - `RMmo1i5i85I` (Installation), `WbHOU2U3vFE` (Templates & Layouts), `nBrPhh5ipuU` (Product
     Elements), `PHsgAwjgXbY` (Button Customization) are all Dec 2018 and show a seven-year-old
     UI. Left out pending refreshed recordings, not because they were missed.
   - `ksXoOLMOTWM` (Comparison tables, 2018) and `zBPvRs1_02A` (BestSeller lists, 2018) are
     superseded by the Nov 2025 recordings that are embedded instead.

---

## Checklist: adding a new doc page

1. Pick the section folder — remember it becomes part of the public URL.
2. Create `guide/<section>/<slug>.md` with `title` / `title_tag` / `meta_description` frontmatter and a matching `# H1`.
3. Create `guide/public/images/<section>/<slug>/` and add `.webp` screenshots.
4. Reference them as `![Alt](/guide/public/images/<section>/<slug>/<name>.webp)`.
5. **Add the page to `themeConfig.sidebar['/guide/']` in `.vitepress/config.js`**, in the right group and position. Keep the `text` short.
6. Cross-link from at least one related page so the page isn't an orphan.
7. Run `npm run docs:build` and confirm it is clean, then spot-check in `npm run docs:dev`.

---

## Skills

Repo-specific skills live in `.claude/skills/`. Prefer them over ad-hoc edits — they encode the conventions above as procedures.

| Skill | Use it for |
| --- | --- |
| `azonpress-add-doc` | Creating a new documentation page, wired into the sidebar |
| `azonpress-edit-doc` | Editing an existing page in place (same slug, same location) |
| `azonpress-restructure-docs` | Renaming, moving, merging, deleting pages; reordering the sidebar |
| `azonpress-manage-images` | Adding, replacing, or auditing screenshots |
| `azonpress-changelog` | Adding a release entry to `guide/changelog.md` |
| `azonpress-audit-docs` | Read-only site-wide quality gate before publishing |
