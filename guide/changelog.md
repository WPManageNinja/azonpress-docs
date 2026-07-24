---
title: "Change Log"
description: "Stay updated with the latest improvements, new features, bug fixes, and performance enhancements in AzonPress."
---

# Change Log

Stay updated with the latest improvements, new features, bug fixes, and performance enhancements in AzonPress.


## AzonPress v2.3.0
*Released on July 21, 2026*

::: code-group

```md [🆕 New Features]
• Amazon Creators API as the only product data source
• Admin notice for the PA-API shutdown, with a link to connect
• Last Amazon API error shown on the Settings screen
• Cached product fallback when Amazon is unreachable
```

```md [🔧 Improvements]
• Improved request pacing for Amazon's 1 request per second limit
• Product cache now rebuilds automatically after this update
```

```md [🗑️ Removed]
• Prime badges and the Hide Prime status option, no longer sent by Amazon
• Lowest price and offer count, no longer sent by Amazon
• PA-API credentials (API Key / Secret) from Settings
```

```md [🐛 Bug fixes]
• Fixed legacy Prime rows being stripped from saved comparison tables
• Fixed rejected ASINs being re-requested on every page view
• Fixed lowercase ASINs not resolving
```

:::


## AzonPress v2.2.5
*Released on May 5, 2026*

::: code-group

```md [🆕 New Features]
• Click tracking for Gutenberg block links
• Standalone cloaked URL visit tracking with click analytics & geo tracking
```

```md [🐛 Bug fixes]
• Fixed Creators API token request format
• Fixed click tracking for all product link types
• Fixed custom product template title validation before save
• Fixed Grid template not rendering in the [azonpress] shortcode
```

:::


## AzonPress v2.2.3
*Released on September 25, 2025*

::: code-group

```md [🆕 New Features]
• Option to edit product titles in comparison tables
```

```md [🔧 Improvements]
• Improved Cloaked URL handling and customization options
```

```md [🐛 Bug fixes]
• Fixed query params not being included with product templates
```

:::


## AzonPress v2.2.2
*Released on April 18, 2025*

::: code-group

```md [🐛 Bug fixes]
• Fixed the main JavaScript file being removed automatically on Namecheap shared hosting
• Fixed text domain loading issue with WordPress 6.8
```

:::


## AzonPress v2.2.1
*Released on March 6, 2025*

::: code-group

```md [🔧 Improvements]
• Customers can now add custom content under any product table item
```

```md [🐛 Bug fixes]
• Fixed Amazon product table loader issue
• Fixed product list render issue
• Fixed Amazon product & comparison table pagination issue
• Fixed unique click tracking issue
```

:::


## AzonPress v2.2.0
*Released on August 15, 2024*

::: code-group

```md [🆕 New Features]
• Disclaimer text option for Custom products
```

```md [🔧 Improvements]
• Made admin site text translatable
• Improved Custom Product module fetching and reliability
• Improved Azp block's editor
• Improved Custom Products rating component
```

```md [🐛 Bug fixes]
• Fixed fetching issue of the Azp Single Product (Gutenberg block)
• Fixed editing issue of Azp Pros and Cons (Gutenberg block)
• Fixed responsive design issue of the Custom Product Grid template
• Fixed Azp Single Product's image alt tag issue
```

:::


## AzonPress v2.1.1
*Released on May 30, 2024*

::: code-group

```md [🆕 New Features]
• Button for custom multiple product card
```

```md [🐛 Bug fixes]
• Fixed conflict with the RankMath plugin
• Fixed preview URL issue
• Fixed Cloaked URL issue
• Fixed multi shortcode render issue for Custom Product
```

:::


## AzonPress v2.1.0
*Released on February 28, 2024*

::: code-group

```md [🆕 New Features]
• Custom product and template (Zero API)
• Advanced reports with click tracking
• Geolocation tracking
```

```md [🔧 Improvements]
• Refactored UI designs
```

```md [🐛 Bug fixes]
• Fixed other minor issues
```

:::


## AzonPress v2.0.8
*Released on September 30, 2022*

::: code-group

```md [🆕 New Features]
• Shortcode size attributes
```

```md [🐛 Bug fixes]
• Fixed pagination break issue
• Fixed row hover color issue on the semantic_ui table
```

:::


## AzonPress v2.0.7
*Released on October 30, 2021*

::: code-group

```md [🆕 New Features]
• Single Product Gutenberg block
• Call To Action Gutenberg block
• Pros and Cons Gutenberg block
• Button Gutenberg block
• Star Ratings Gutenberg block
• Notification Gutenberg block
• Notice Gutenberg block
```

```md [🐛 Bug fixes]
• Fixed comparison table word-break issue
• Fixed table edit not working issue
• Fixed Amazon Gutenberg blocks issues
```

:::


## AzonPress v2.0.6
*Released on August 4, 2021*

::: code-group

```md [🐛 Bug fixes]
• Fixed products table row delete issue
```

:::


## AzonPress v2.0.5
*Released on July 17, 2021*

::: code-group

```md [🆕 New Features]
• Optional "noindex" setting (on meta) to prevent indexing
• Custom hooks and filters to build custom templates
```

```md [🐛 Bug fixes]
• Fixed page breaking (sidebar goes down) issue
• Fixed frontend unused scripts issue
• Fixed Cumulative Layout Shift (CLS) issue
• Fixed product table content hover issue on background
• Fixed HTML fields edit issue
• Fixed large product image issue
• Fixed prime status issue
• Fixed editor Custom Button issue
```

:::


## AzonPress v2.0.4
*Released on May 3, 2021*

::: code-group

```md [🆕 New Features]
• Pagination for product table
```

```md [🐛 Bug fixes]
• Fixed label hide issue for mobile devices
• Fixed ASIN issue for particular products
• Fixed library conflicts issue
```

:::


## AzonPress v2.0.3
*Released on April 12, 2021*

::: code-group

```md [🐛 Bug fixes]
• Fixed API query issue
```

:::


## AzonPress v2.0.2
*Released on April 9, 2021*

::: code-group

```md [🔒 Security]
• Added nonce validation for admin AJAX requests
```

:::


## AzonPress v2.0.1
*Released on March 12, 2021*

::: code-group

```md [🐛 Bug fixes]
• Fixed image size issue
```

:::


## AzonPress v2.0.0
*Released on March 12, 2021*

::: code-group

```md [🆕 New Features]
• Guten-blocks for the Gutenberg editor
• Table duplicate option
• Endpoints for custom templates
```

```md [🐛 Bug fixes]
• Fixed comma-separated discount issue
• Fixed no-follow issue for product templates
• Fixed PHP deprecated notice issue
• Fixed border issue for product table
• Fixed mobile device label issue
• Fixed typo mistakes
```

:::
