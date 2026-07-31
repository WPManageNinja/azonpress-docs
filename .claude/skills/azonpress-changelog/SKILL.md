---
name: azonpress-changelog
description: 'Add or maintain a release entry in the AzonPress docs changelog (guide/changelog.md). Prepends a new reverse-chronological version section using the site''s exact ::: code-group format with 🆕 New Features / 🔧 Improvements / 🗑️ Removed / 🐛 Bug fixes tabs, rewriting raw release notes or git history into user-facing language. USE FOR: write a changelog entry, update the changelog, add release notes, document version X, we shipped a new release. DO NOT USE FOR: writing or updating feature guides (use azonpress-add-doc or azonpress-edit-doc), or site-wide checks (use azonpress-audit-docs).'
license: MIT
compatibility: 'Operates on guide/changelog.md in the azonpress-docs VitePress site. Uses VitePress ::: code-group containers with md-fenced tabs. Requires Node + npm to run docs:build.'
metadata:
  project: azonpress-docs
  canonical-rules: CLAUDE.md
---

# AzonPress Changelog Entry

Add a release to `guide/changelog.md`, newest first, in the site's established format.

---

## Agent Behavior Rules

1. **DO** read the existing top entry in `guide/changelog.md` before writing, and copy its exact
   structure — spacing, emoji, and tab order included.
2. **DO** write from the **user's** point of view: what changed for someone using the plugin, not
   what changed in the code. "Fixed lowercase ASINs not resolving", not "normalize ASIN casing in
   `ProductResolver::fetch()`".
3. **DO** use `•` bullets, sentence case, and **no trailing period**.
4. **DO** omit any tab that has no entries — do not ship an empty `🐛 Bug fixes` block.
5. **DO** insert the new release directly beneath the intro paragraph, above the previous release.
6. **DO** ask for the release date if it isn't given; the format is `*Released on July 21, 2026*`.
7. **DO** end on a clean `npm run docs:build`.
8. **DO NOT** reorder, reword, or "tidy" past releases — they are a historical record.
9. **DO NOT** include internal refactors, test changes, dependency bumps, or ticket numbers.
10. **DO** flag it when a release changes documented behavior: if a feature was removed or
    reworked, the corresponding guide page probably needs an edit too. Say so in the report —
    the changelog alone is not enough.

---

## Phase 1: Setup (Interactive)

### 1.1 Source material
> **What's in this release?** (release notes, a git log range, a plugin readme.txt section, or a
> plain description)

Record `SOURCE`.

### 1.2 Version and date
> **Version number?** and **release date?**

Record `VERSION` (e.g. `2.4.0`) and `DATE` (e.g. `August 12, 2026`).

### 1.3 Confirm the classification

Sort every item into the four buckets and show the user the draft classification before writing:

```
🆕 New Features  - capabilities that did not exist before
🔧 Improvements  - existing behavior made better, faster, or clearer
🗑️ Removed       - features, settings, or fields taken away
🐛 Bug fixes     - things that were broken and now work
```

Drop anything users can't perceive. Wait for confirmation.

---

## Phase 2: Context

1. Read the top ~45 lines of `guide/changelog.md` — the intro plus the current newest release.
2. Note the exact format of the previous entry and mirror it.
3. If the release removes or changes a documented feature, grep for it so you can name the
   affected guide pages in your report:
   ```
   grep -rln '<feature term>' --include='*.md' guide
   ```

---

## Phase 3: Procedure

```
1. DRAFT   - Rewrite each item into one user-facing line.
             Keep lines short — one clause, no sub-bullets.

2. INSERT  - Prepend the new section directly under the intro paragraph
             of guide/changelog.md, above the previous release heading.
             Use the exact template below. Omit empty tabs.

3. BUILD   - npm run docs:build ; confirm the code-group renders and the build is clean.
```

### Template

````md
## AzonPress v<VERSION>
*Released on <DATE>*

::: code-group

```md [🆕 New Features]
• <User-facing capability that is new>
```

```md [🔧 Improvements]
• <Existing behavior, now better>
```

```md [🗑️ Removed]
• <What was taken away, and ideally why>
```

```md [🐛 Bug fixes]
• <What was broken, phrased as "Fixed ...">
```

:::
````

Note the fence language inside each tab is `md`, and the tab label sits in `[...]` after it.

---

## Phase 4: Verify & Report

Report:
- Version and date added
- Item counts per tab, and which tabs were omitted
- Anything from the source you deliberately dropped as not user-facing
- **Guide pages that likely need updating** because of this release (name them)
- Build: pass / fail

---

## Quick Reference

### House style
```
Heading:   ## AzonPress v2.3.0
Date:      *Released on July 21, 2026*
Bullets:   • sentence case, no trailing period
Tabs:      🆕 New Features | 🔧 Improvements | 🗑️ Removed | 🐛 Bug fixes
Order:     newest release first, directly under the intro paragraph
```

### Good vs bad entries
```
GOOD  • Fixed lowercase ASINs not resolving
BAD   • Fix ASIN case normalization in ProductResolver (#412)

GOOD  • Cached product fallback when Amazon is unreachable
BAD   • Added try/catch around the Amazon API client

GOOD  • Prime badges and the Hide Prime status option, no longer sent by Amazon
BAD   • Removed prime_eligible field
```

### Key Principles
1. **User-facing language only.**
2. **Copy the previous entry's format exactly.**
3. **Empty tabs get omitted, not shipped blank.**
4. **Never rewrite history.**
5. **A removed feature usually means a guide page needs editing too — say so.**
