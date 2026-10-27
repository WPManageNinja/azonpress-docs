---
name: azonpress-doc-screenshots
description: Take, annotate, and place pixel-consistent screenshots of the AzonPress admin and front end for this docs site, using the headless-Chrome runner (scripts/screenshots/shoot.cjs) and JSON shot plans. Use whenever the user asks to "take screenshots", "capture the UI", "add images", "update the screenshot", or when a page needs an image of an AzonPress screen. Covers site facts, plan syntax, clip/arrow rules, placing .webp files in markdown, and verification. Do NOT use the Claude-in-Chrome extension or macOS screencapture. For image path/alt-text conventions without capturing, use azonpress-manage-images.
---

# AzonPress Doc Screenshots

Every screenshot is produced by a script, never by hand, so the output is reproducible and every image shares the same framing, scale, and arrow style. Ported from the FluentCart docs repo's `fluentcart-doc-screenshots` skill and adapted to AzonPress. Read this whole file before shooting.

## 1. Facts

| Thing | Value |
|---|---|
| Dev site | `http://localhost:10053` (Local by Flywheel, the `fcrmv3` site). Default login `admin` / `admin`; override with env `AZP_USER`, `AZP_PASS`, `AZP_SITE`. |
| Plugin on the site | `~/Local Sites/fcrmv3/app/public/wp-content/plugins/azonpress` — an **installed copy**, not a symlink to the dev clone. What the site shows is whatever version is installed there. Check `Version:` in its `azonpress.php` and compare with the release the docs cover. |
| Admin URL | `http://localhost:10053/wp-admin/admin.php?page=azonpress#<route>`. Routes are vue-router paths in the plugin's `resources/assets/js/Routes/index.js`: `/product_tables`, `/product_tables/edit/:id`, `/comparison_tables`, `/custom_products`, `/collections`, `/collections/edit/:id`, `/reports/reports_overview`, `/reports/geo-location`, `/settings/amazon-api`, `/settings/geo-tracking-settings`, `/settings/affiliate-link-config`, `/settings/other_settings`, `/settings/licensing`, `/guide`. |
| App root | `.azp-main-application` (the harness waits for it). |
| Runner | `npm run shots -- scripts/screenshots/plans/<plan>.json` (= `node scripts/screenshots/shoot.cjs …`). Library in `scripts/screenshots/lib/`. |
| Browser | Headless real Google Chrome via `playwright-core` (a devDependency). No download, no macOS permission. |
| Output | `guide/public/images/<section>/<slug>/<name>.webp`, referenced in markdown as `/guide/public/images/<section>/<slug>/<name>.webp` (this repo's full on-disk form — see CLAUDE.md "Images"). Raw PNGs go to `scripts/screenshots/raw/` (gitignored). |
| Scale | Viewport 1600 CSS px wide, device scale factor 2, so images are about 2880 px wide. Never resize output. webp quality 82. |
| Arrow colour | `#D97706` (deep amber) with a white halo, set in `lib/annotate.cjs`. The brand yellow `#FFC700` is too pale on white. |

### Preconditions (check before shooting)
- **The plugin must be licensed and the Creators API connected**, otherwise the admin shows "Please Activate AzonPress" and `.azp-main-application` never appears (the runner times out). Activation is under `/settings/licensing`; credentials under `/settings/amazon-api`. Do not invent a license key. If the site is unlicensed, stop and tell the user.
- **Install dev dependencies with `NODE_ENV=development`.** This shell may export `NODE_ENV=production`, which makes `npm install` skip dev dependencies and silently remove `sharp`, `vitepress` and `playwright-core`. Use `NODE_ENV=development npm install` (or `npm install --include=dev`), and run `NODE_ENV=development npm run shots -- …`.

### Site state the plans assume (fcrmv3 dev site)
- `product-collections.json` needs the Custom Product module active, three sample custom products (**Sample Standing Desk**, **Sample Ergonomic Chair**, **Sample LED Desk Lamp**, ids 1–3), and an **empty** collection id 1 titled *Home Office Essentials*. Empty it first (collection editor → **Select all** → **Remove selected** → confirm → **Save Changes**), otherwise the add-products dialog has nothing to tick.
- `product-table-refresh-prices.json` needs the Amazon Creators API connected and one Amazon product table; the site has neither yet.
- Plans that open a dialog or a toast should clip with `pad: 0` / hide `.el-message` so the dim backdrop and "saved" toasts stay out of the image.

### What does NOT work
- The Claude-in-Chrome extension (bound to another device, cannot resolve Local sites).
- AppleScript + `screencapture` (captures overlapping windows, needs permissions).
- `wp-cli` for reading settings on this site; read the plugin PHP/Vue source instead.

## 2. Workflow

### Step 1 — Decide the shot list from the doc
For the page, list each screenshot: `name | what it shows | clip type | arrow target | where it goes in the .md`.
- One image per click step, placed right after the sentence that says to click. Pure-reading steps get one image per section.
- Arrows only where the sentence says "click/select/open"; field-reference images get no arrow.
- Reuse an existing filename when replacing a stale image (the markdown stays untouched). Find a page's images by grepping its refs; the folder name does not always match the slug (see CLAUDE.md "Known state").
- Naming: kebab-case, `<screen>-<what>.webp`. No numbers or dates.

### Step 2 — Confirm the UI is on the site
Open the plugin's source or the live admin and make sure the feature exists in the installed version. If it does not, stop and tell the user rather than shooting something similar.

### Step 3 — Write the plan
Create `scripts/screenshots/plans/<page-slug>.json`. Start from `other-settings.json` (a settings block) or `product-table-refresh-prices.json` (a toolbar button with an arrow). The full step vocabulary is documented at the top of `scripts/screenshots/shoot.cjs`.

```json
{
  "outDir": "guide/public/images/miscellaneous/other-settings",
  "viewport": { "width": 1600, "height": 1300 },
  "steps": [
    { "admin": "/settings/other_settings" },
    { "shot": { "name": "other-settings-privacy",
                "clip": { "rows": ["Click Tracking Privacy"], "pad": 24 } } }
  ]
}
```

Selector forms: a CSS string; `{ "text": "Refresh Prices" }` (exact visible text); `{ "role": "button", "name": "^update$" }`; `{ "selector": "css", "hasText": "..." }`; `{ "row": "Click Tracking Privacy", "part": "control" }` for a settings block (any `<label>`, `<h3>`, `<h4>` text inside a `.form_group`).

Clip rules: `"app"` for the whole admin content (WP bar/menu hidden); `{ "rows": [...], "pad": 24 }` for settings blocks; `{ "element": "<sel>", "pad": 24 }` for dialogs/cards/tables; `"crop": { "height": N }` (image px) trims dead space at the bottom. Raise `viewport.height` when a form is taller than the viewport.

Arrow rules: `from` is the side the arrow comes from — pick the side with empty space. `len` 130–160. One arrow per image, never labelled. Never crop a control to fit an arrow.

Data rules: use obviously sample values; never real customer data or real affiliate tags. Anything you save to show an effect must be put back afterwards.

### Step 4 — Run
```bash
NODE_ENV=development npm run shots -- scripts/screenshots/plans/<slug>.json
NODE_ENV=development npm run shots -- scripts/screenshots/plans/<slug>.json --only=name1,name2
```
If login loops, the site is slow: re-run. If a selector is not found, read the Vue file under the plugin's `resources/assets/js/Views/` — do not guess class names.

### Step 5 — Verify every image (mandatory)
Open each `.webp` with Read and check: no WP admin bar/menu or notices; the control is fully inside the frame; the arrow tip sits just outside the control; state is right (value filled, toggle on); size is sane. Fix the plan and re-run with `--only=`. Never hand-edit images.

### Step 6 — Place in markdown
`![Screenshot of <what the reader sees>](/guide/public/images/<section>/<slug>/<name>.webp)` — directly after the step it illustrates, on its own line, alt text starting "Screenshot of". Never stack two images with no text between. Then run `npm run docs:build` (must be clean). Do not commit unless asked.

### Step 7 — Leave the site as you found it
Revert any setting you saved. Keep the plan JSON in `scripts/screenshots/plans/` as the regression fixture for the next release.

## 3. Hard rules
- Never take screenshots by hand or through the Chrome extension; if the runner cannot do it, extend `lib/harness.cjs` and keep the plan declarative.
- Never publish an image that shows another plugin's UI (FluentCRM, Woo, Elementor) or the WordPress chrome.
- Never invent UI. If a label from the doc cannot be found on the site, stop and report which step is missing.
