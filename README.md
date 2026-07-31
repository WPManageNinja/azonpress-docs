# AzonPress – User Documentation

Official end-user documentation for [AzonPress](https://azonpress.com), the WordPress affiliate-marketing plugin by [WPManageNinja](https://wpmanageninja.com).

Built with [VitePress](https://vitepress.dev/).

## What's Inside

- **Getting Started** – Introduction, installation & activation, dashboard tour, glossary
- **Configuring Amazon API** – Creating Amazon API credentials, connecting them, geo tracking
- **Product Tables** – Creating Amazon product tables, customization, adding columns
- **Comparison Tables** – Building and customizing product comparison tables
- **Product Templates** – Grid, Box, List, Table, Widget, Widget Small, Bestseller Lists, Product Elements
- **Custom Products** – Adding non-Amazon products, single and in bulk, with cloaked URLs
- **Reports** – Click tracking, cloaked URL analytics, and geo-location reporting
- **Miscellaneous** – Appearance settings, affiliate link configuration, other settings
- **Support** – How to reach the WPManageNinja support team
- **Changelog** – Release notes, newest first

Currently documented release: **AzonPress v2.3.0** (July 21, 2026).

## Local Development

```bash
# Install dependencies
npm install

# Start the dev server
npm run docs:dev
```

The site will be available at `http://localhost:5173/`.

## Build

```bash
# Production build → .vitepress/dist/
npm run docs:build

# Preview the production build → http://localhost:4173
npm run docs:preview
```

`npm run docs:build` is the project's correctness check — it fails on dead internal links. Run it before opening a pull request.

## Project Structure

```
.
├── index.md                          # Homepage (hero + feature cards)
├── .vitepress/
│   ├── config.js                     # Nav, sidebar, markdown rules — single source of truth
│   └── theme/                        # Brand CSS, custom layout, feedback widget
├── guide/                            # All documentation content (Markdown)
│   ├── getting-started/
│   ├── configuring-amazon-api/
│   ├── product-tables-module/
│   ├── amazon-comparison-tables/
│   ├── available-products-templates/
│   ├── custom-product/
│   ├── reports/
│   ├── miscellaneous/
│   ├── support/
│   ├── changelog.md
│   └── public/                       # Static assets (served from the site root)
│       ├── favicon.png
│       └── images/
│           ├── brand/                # Logos and hero banner
│           └── <section>/<page>/     # Per-page screenshots (.webp)
└── CLAUDE.md                         # Full conventions reference for contributors & AI agents
```

## Writing Conventions

A page lives at `guide/<section>/<slug>.md` and is served at `/guide/<section>/<slug>`. The section folder is part of the public URL, so moving a page changes its live link.

Every page starts with frontmatter:

```yaml
---
title: "Page Title"
title_tag: "SEO Title | Azonpress Documentation"
meta_description: "A benefit-led summary of roughly 150–160 characters."
---
```

Screenshots are `.webp`, stored in `guide/public/images/<section>/<slug>/`, and referenced with the full root-relative path:

```md
![Descriptive alt text](/guide/public/images/reports/geo-location-report/geo-map.webp)
```

**Adding a page requires adding it to the sidebar** in `.vitepress/config.js` — VitePress does not generate navigation from the filesystem, and a missing entry will not fail the build.

See [`CLAUDE.md`](./CLAUDE.md) for the complete conventions reference, including callout style, changelog formatting, and known quirks.

## Contributing

1. Create a branch from `master`.
2. Make your changes under `guide/`.
3. Add any new page to the sidebar in `.vitepress/config.js`.
4. Run `npm run docs:dev` to preview, then `npm run docs:build` to verify.
5. Open a pull request.

## Tech Stack

- [VitePress](https://vitepress.dev/) v1.6
- [Vue 3](https://vuejs.org/) (custom theme layer)
- Markdown with VitePress extensions (frontmatter, containers, code groups)
- Local (client-side) search — no external search service
