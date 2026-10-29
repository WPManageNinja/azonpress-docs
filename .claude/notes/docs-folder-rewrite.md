# `docs/` source folder, `/guide/` public URLs

The source folder `guide/` was renamed to `docs/` on 2026-10-29. Public URLs did not change: every page is still served at `/guide/<section>/<slug>`. Read this before touching paths, `.vitepress/config.js`, the scripts, or the featured-image generator.

## Mechanism

`git mv guide docs` plus this rule in `.vitepress/config.js`:

```js
rewrites: { 'docs/:rest*': 'guide/:rest*' }
```

Not a symlink, not 301 redirects. If `rewrites` can't be used, stop and ask. Never improvise a URL change.

## Two meanings of `/guide/` (the main source of mistakes)

Ask: "is this resolved against the filesystem or against the site URL?" If unsure, ask a human.

| Keep as `/guide/` (public URL) | Must be `docs/` (on-disk path) |
| --- | --- |
| nav and sidebar `link` values | Markdown images: `/docs/public/images/...` |
| the `'/guide/'` sidebar key | `vite.publicDir: 'docs/public'` |
| page-to-page links, `index.md` links | `FEATURED_DIR` in `config.js` |
| canonical, `og:url`, card file names (`guide--...png`) | `PUBLIC_DIR_REL` and logo path in `scripts/generate-featured-images.mjs` |
| | screenshot plan `outDir`, `.gitignore` |

Never run a blanket `s/guide/docs/`.

## Must stay in sync

- Featured card names come from the SERVED path. `servedPath()` in the generator maps `docs/` to `guide/`. `SECTION_PREFIXES` is `["docs","guide"]` because the eyebrow label reads the source path. Changing either side renames every social card.
- `pageData.relativePath` is the rewritten path (`guide/...`); `pageData.filePath` is the source (`docs/...`). `transformPageData` must keep using `relativePath`.
- `CLAUDE.md`, `README.md` and the 7 `.claude/skills/azonpress-*` describe this setup. Update them with any future change.

## How to verify any future change (baseline, then diff)

1. Build before the change. Snapshot `.vitepress/dist`: file list, page list, canonical / `og:url` / `og:image` / `twitter:image` per page, and every root-relative `href`/`src`.
2. Make the change, rebuild, diff. Page list and SEO tags must be identical. Refs must be identical once content hashes are stripped.
3. Also check:
   - every config and `index.md` link resolves in `dist`;
   - no `/guide/public` or `/docs/public` strings in built output;
   - every image ref exists in `dist`;
   - `npm run docs:preview` serves `/guide/...` as 200 and `/docs/...` as 404;
   - `npm run featured:regenerate` leaves the PNGs byte-identical.

## Known noise (not a regression)

- The build is not deterministic: minifier variable names, changelog tab IDs and search-index doc-ID order differ between two builds of the same tree.
- `filePath` in page chunks now says `docs/...`. That is expected.
- No `sitemap.xml`, `robots.txt`, `editLink` or `lastUpdated` exist in this repo. `404.html` has empty og tags in the baseline too.
- zsh: quote globs such as `--include='*.md'`, or the command fails.

## Rollback (while uncommitted)

`git mv docs guide`, then `git checkout -- .`, `git clean -n` (dry-run first, review it), rebuild to confirm.

## Why this is risky

A wrong `/guide/` to `/docs/` swap breaks live URLs (SEO and inbound links), or images that only fail in the production build while `docs:dev` looks fine.
