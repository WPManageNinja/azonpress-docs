---
name: azonpress-audit-docs
description: 'Run a READ-ONLY quality gate across the whole AzonPress docs site: production build, sidebar coverage (pages that exist but are invisible), inbound-link integrity, image reference resolution and orphan folders, frontmatter completeness, and convention compliance. Produces a scored checklist with offending paths, then offers fixes. USE FOR: audit the docs, review the documentation, pre-publish check, lint the docs, check for broken links, find pages missing from the sidebar, find orphaned images, is everything consistent, check before committing. DO NOT USE FOR: writing a new page (use azonpress-add-doc), editing content (use azonpress-edit-doc), renaming or moving (use azonpress-restructure-docs), or release notes (use azonpress-changelog).'
license: MIT
compatibility: 'VitePress 1.6 repo, guide/<section>/<slug>.md layout with NO rewrites. Sidebar is a manual array at themeConfig.sidebar["/guide/"] in .vitepress/config.js. Screenshots at guide/public/images/. Requires Node + npm to run docs:build. Read-only until the user approves fixes.'
metadata:
  project: azonpress-docs
  canonical-rules: CLAUDE.md
---

# Audit the AzonPress Docs

A read-only quality gate. Runs every check the build cannot, reports findings with paths, then
offers to fix. Canonical conventions live in `CLAUDE.md`.

---

## Agent Behavior Rules

1. **DO** run every check before reporting anything — a partial audit is worse than none.
2. **DO** report exact file paths and line numbers so findings are actionable.
3. **DO** treat the sidebar-coverage check as the highest-value one. A page missing from the
   sidebar is invisible to users and **the build stays green**, so nothing else catches it.
4. **DO** report the ~13 known orphaned image folders as *known state*, separately from new
   problems, so they don't drown the real findings.
5. **DO NOT** modify anything during the audit. Report first, fix only on approval.
6. **DO NOT** flag `title_tag` / `meta_description` as broken because they don't reach the HTML.
   That is documented, intentional current state (see `CLAUDE.md`); flag only *missing* ones.
7. **DO NOT** flag internal links opening in a new tab — that is a deliberate `markdown-it` rule.
8. **DO NOT** flag the absence of `(Pro)` labels or `::: tip` containers — neither is used here.

---

## Phase 1: Run all checks

Run these in order. Collect results; report nothing until all have run.

### 1. Production build (dead internal links, unresolved assets)
```
npm run docs:build 2>&1 | tail -30
```
Must complete with `build complete`. Any warning about a dead link or unresolved asset is a
**BLOCKER**.

### 2. Sidebar coverage — the most important check
Every page under `guide/` (except `changelog.md`, which is in the top nav) must appear in
`.vitepress/config.js`.
```
for f in guide/*/*.md; do
  link="/${f%.md}"
  grep -q "$link'" .vitepress/config.js || echo "NOT IN SIDEBAR: $f"
done
```
Also check the reverse — sidebar links pointing at files that don't exist:
```
grep -oE "link: '/guide/[^']*'" .vitepress/config.js | sed "s/link: '//;s/'//" \
  | while read l; do [ -f ".${l}.md" ] || echo "DEAD SIDEBAR LINK: $l"; done
```

### 3. Image references resolve
```
grep -rhoE '\(/guide/public/images/[^)]*\)' --include='*.md' guide index.md \
  | tr -d '()' | sed 's|^/||' | sort -u \
  | while read p; do [ -f "$p" ] || echo "MISSING IMAGE: $p"; done
```

### 4. Image path form
```
grep -rn '](/images/' --include='*.md' guide index.md          # wrong: skips guide/public
grep -rnE '!\[[^]]*\]\(\.\.?/' --include='*.md' guide index.md  # wrong: relative path
```

### 5. Orphaned image folders (known state — report separately)
```
for d in guide/public/images/*/*/; do
  sec=$(basename $(dirname "$d")); slug=$(basename "$d")
  [ -f "guide/$sec/$slug.md" ] || echo "ORPHAN DIR: $sec/$slug"
done
```
Baseline is ~13. Report the count and flag only anything *new* beyond the known set.

### 6. Frontmatter completeness
```
for f in guide/*/*.md; do
  for k in title title_tag meta_description; do
    grep -qE "^$k:" "$f" || echo "MISSING $k: $f"
  done
done
```

### 7. Link hygiene
```
grep -rnE '\]\(\.\.?/' --include='*.md' guide index.md        # relative cross-links
grep -rn '](/guide/' --include='*.md' guide index.md \
  | grep -E '\.md\)' && echo "^ links ending in .md — should be extensionless"
```

### 8. Orphan pages (no inbound links)
```
for f in guide/*/*.md; do
  link="/${f%.md}"
  n=$(grep -rl "$link" --include='*.md' guide index.md | grep -v "^$f$" | wc -l)
  [ "$n" -eq 0 ] && echo "NO INBOUND LINKS: $f"
done
```
Not a blocker, but a page reachable only from the sidebar is worth cross-linking.

### 9. Convention spot-checks
```
grep -rn '::: tip\|::: warning\|::: info' --include='*.md' guide   # not this site's style
grep -rn '(Pro)' --include='*.md' guide                            # no tier split here
grep -rnE '!\[(|image|screenshot|img)\]\(' --include='*.md' guide  # weak alt text
grep -rn 'title_tag.*|.*AzonPress Documentation' --include='*.md' guide  # should be "Azonpress"
```

### 10. Alt text presence
```
grep -rcE '!\[\]\(' --include='*.md' guide | grep -v ':0$'
```

---

## Phase 2: Report

Present a scored checklist. Group by severity, never as a wall of raw command output.

```
AZONPRESS DOCS AUDIT
====================

BLOCKERS (must fix before publishing)
  [ ] Build failure / dead link .............. N   <paths>
  [ ] Missing image files .................... N   <paths>
  [ ] Dead sidebar links ..................... N   <paths>

HIGH (users are affected, build stays green)
  [ ] Pages missing from the sidebar ......... N   <paths>
  [ ] Wrong-form image paths ................. N   <paths:line>
  [ ] Relative links ......................... N   <paths:line>

MEDIUM (consistency)
  [ ] Missing frontmatter keys ............... N   <paths>
  [ ] Weak or empty alt text ................. N   <paths:line>
  [ ] Off-style callouts / (Pro) labels ...... N   <paths:line>

LOW (worth a look)
  [ ] Pages with no inbound links ............ N   <paths>

KNOWN STATE (not regressions — see CLAUDE.md)
  •  Orphaned image folders: N (baseline ~13)
  •  title_tag / meta_description do not reach built HTML by design
  •  Root public/ is unused (publicDir → guide/public)

RESULT: PASS | PASS WITH WARNINGS | FAIL
```

Then ask which findings to fix. Apply nothing unprompted.

---

## Phase 3: Fixes (only on approval)

Route each approved fix to the right skill rather than doing it ad hoc:
```
Missing sidebar entry   → azonpress-add-doc (sidebar step) or edit config.js directly
Image path / alt text   → azonpress-manage-images
Prose / frontmatter     → azonpress-edit-doc
Renames and moves       → azonpress-restructure-docs
```
Re-run the full audit after fixes and report the new score.

---

## Quick Reference

### One-shot health check
```
npm run docs:build && echo "BUILD OK"
for f in guide/*/*.md; do grep -q "/${f%.md}'" .vitepress/config.js || echo "NOT IN SIDEBAR: $f"; done
```

### Baseline (verified — deviations are worth investigating)
```
Content pages ........... 31 (+ index.md)
Sidebar groups .......... 9
Image references ........ ~125, all in /guide/public/images/... form
Image files ............. ~183 .webp
Orphaned image dirs ..... ~13
Pages with no image dir .. 3 (glossary, click-tracking, support — intentionally text-only)
Build time .............. ~3s
```

### Key Principles
1. **The sidebar check is the one the build can't do for you.**
2. **Report every path** — a finding without a location isn't actionable.
3. **Separate known state from regressions.**
4. **Read-only until approved.**
5. **Re-audit after fixing.**
