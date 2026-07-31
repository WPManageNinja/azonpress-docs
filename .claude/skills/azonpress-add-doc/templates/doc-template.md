---
title: "<Page Title — matches the H1 below>"
title_tag: "<SEO Title, ~55-60 chars> | Azonpress Documentation"
meta_description: "<Benefit-led summary, ~150-160 characters, closing with a short call to action.>"
---

# <Page Title>

<One or two sentences on what this page covers and who it is for. Name the feature and the
outcome the reader gets. Link out to a prerequisite page if one exists, e.g.
[Configure Amazon API](/guide/configuring-amazon-api/configure-amazon-api).>

## <First Section — usually the main task>

<Short lead-in sentence.>

1. Navigate to **AzonPress → <Screen>** from your WordPress dashboard.
2. Click the **<Button Label>** button.

![Descriptive alt text saying what this screenshot shows](/guide/public/images/<section>/<slug>/<name>.webp)

3. Fill in the **<Field Label>** field.
4. Click **Save Changes**.

![Descriptive alt text](/guide/public/images/<section>/<slug>/<name>.webp)

> **Note**, <a caveat, limit, or behavior the reader should know at this exact point>.

## <Second Section — options, settings, or variations>

* **<Option Name>**: <What it does and when to use it.>
* **<Option Name>**: <What it does and when to use it.>

> **Remember**, <a prerequisite or dependency, linking to the page that explains it, e.g.
> [Geo Tracking Settings](/guide/configuring-amazon-api/geo-tracking-targeting-settings)>.

## <Optional: Troubleshooting or FAQ>

<Only if the feature has a common failure mode. Otherwise delete this section.>

<Closing one-line wrap-up, e.g. "This is how you can <do the thing> efficiently using AzonPress!">

---

<!--
CHECKLIST before deleting this comment and shipping:
  [ ] Frontmatter: title / title_tag / meta_description all filled in
  [ ] title_tag ends with "| Azonpress Documentation"  (lowercase "zon")
  [ ] Single H1, matching frontmatter title
  [ ] Every UI label bolded exactly as it appears in the plugin
  [ ] Screenshots are .webp in guide/public/images/<section>/<slug>/
  [ ] Every image ref uses the FULL /guide/public/images/... path
  [ ] Every image has descriptive alt text
  [ ] Cross-links use full /guide/<section>/<slug> paths, never relative
  [ ] No ::: tip / ::: warning containers, no (Pro) labels, no support boilerplate
  [ ] Page added to themeConfig.sidebar['/guide/'] in .vitepress/config.js
  [ ] Linked from at least one related page
  [ ] npm run docs:build is clean
-->
