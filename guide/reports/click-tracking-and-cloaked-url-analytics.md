---
title: "Click Tracking & Cloaked URL Analytics"
title_tag: "Click Tracking & Cloaked URL Analytics Guide | Azonpress Documentation"
meta_description: "Learn how AzonPress tracks clicks across product tables, comparison tables, Gutenberg blocks, and cloaked URLs, including geo-location data. See where to view your analytics."
---

# Click Tracking & Cloaked URL Analytics

AzonPress automatically records every click on your affiliate links so you can measure how your products perform. This article explains **which link types are tracked**, how **standalone Cloaked URL** visits are tracked, and **where to view** all this data.

## Which Link Types Are Tracked

AzonPress records clicks from every place a product link can appear on your site:

* **Product Tables**: Clicks on any product row, image, or Buy button.
* **Comparison Tables**: Clicks on any compared product's Buy button or linked column.
* **Custom Products**: Clicks on single or multiple custom product links, including their **Cloaked URLs**.
* **Gutenberg Blocks**: Clicks on links from the Single Product block and other product-display blocks in the block editor.

You don't need to enable anything separately for each of these tracking is active automatically as soon as you publish a product, table, or block on your site.

## How Gutenberg Block Click Tracking Works

Before this feature, click tracking only worked for products displayed with an AzonPress **shortcode** Amazon products inserted through the **Single Product block** (or other product-display blocks) in the block editor weren't recorded at all.

AzonPress now brings block-based products to full parity with shortcodes:

* Every product link rendered by a block is tagged with the product's identifier behind the scenes, so a click on it is recognized and recorded the same way a shortcode click is.
* This works automatically for **existing** blocks already published on your site, and for any **new** block you add there's no setting to turn on.
* Recorded clicks from blocks count toward the same **Total Clicks**, **Unique Clicks**, and **Total Countries** metrics as any other product, with no separate "block clicks" number to check.

## How Cloaked URL Tracking Works

A **Cloaked URL** is the short, branded link (e.g., `/azp/product-name`) AzonPress generates for your Custom Products, so you can share a clean link instead of a long affiliate URL.

Visitors can access a Cloaked URL from anywhere, including social media, emails, or external websites. To ensure these visits are tracked correctly:

* The click is recorded **server-side**, at the moment AzonPress redirects the visitor to the product's affiliate URL — not by JavaScript running in the visitor's browser.
* Because it's captured at the redirect step, the visit is tracked even if the visitor never actually loads one of your pages first.
* The visitor's **location is resolved at the same time**, so Cloaked URL visits appear on your Geo Location report with the same accuracy as clicks on a table or block.

> **Remember**, to see location data for any click including **Cloaked URLs** you need to configure your MaxMind API key first. See [Geo Tracking (Targeting) Settings](/guide/configuring-amazon-api/geo-tracking-targeting-settings) for setup steps.

## Where to View Your Analytics

All the click types above feed into the same AzonPress **Reports** section — there's no separate dashboard for Cloaked URLs or Gutenberg blocks:

* **[Reports Overview](/guide/reports/reports-overview)**: Total Clicks, Unique Clicks, Total Views, Total Countries, and a line chart of clicks over time, combined across every link type.
* **[Geo Location Report](/guide/reports/geo-location-report)**: A Geo Tracking Map and country-wise click breakdown, also combined across every link type.

Both reports support the same **Timeframe** and **Date** filters, so you can narrow down to a specific period regardless of which link type generated the click.

> **Note**, to avoid inflating your numbers from accidental double-clicks, rapid repeat visits from the same visitor within a couple of seconds are only counted once.
