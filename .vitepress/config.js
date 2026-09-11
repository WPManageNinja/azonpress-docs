import { defineConfig } from 'vitepress'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { zoomablePlugin } from './theme/markdown-plugin-zoomable.js'

// Canonical origin for this site — reused by the canonical links and the absolute
// og:/twitter: URLs below. Changing the host should only ever mean editing this line.
const SITE_URL = 'https://docs.azonpress.com'

/**
 * Per-page link-preview cards.
 *
 * `scripts/generate-featured-images.mjs` renders a branded 1200x630 PNG carrying each
 * page's own title into `guide/public/images/featured/`, served at `/images/featured/`.
 *
 * NAMING RULE — kept in sync with that script's cardNameFor(): the card is the page's
 * served path (i.e. `pageData.relativePath`, which VitePress has already passed through
 * any `rewrites`) minus `.md`, with every `/` replaced by `--`, plus `.png`. The home
 * page's `index.md` uses `index.png`.
 *
 * Anything without a generated card falls back to `default.png`, which the generator
 * also emits — so a shared link is never left with no preview at all. The URL must be
 * absolute: relative paths are ignored by Slack/X/LinkedIn/Facebook scrapers.
 */
const FEATURED_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'guide', 'public', 'images', 'featured')

function featuredImageFor(relativePath) {
  const name = `${relativePath.replace(/\.md$/, '').replace(/\//g, '--')}.png`
  const file = existsSync(join(FEATURED_DIR, name)) ? name : 'default.png'
  return `${SITE_URL}/images/featured/${encodeURIComponent(file)}`
}

export default defineConfig({
  title: 'AzonPress Docs',
  description: 'Everything you need to integrate Amazon products into your WordPress site',
  cleanUrls: true,
  // Repo-level docs must not become site routes (/readme, /claude).
  srcExclude: ['README.md', 'CLAUDE.md', '.claude/**/*.md'],
  vite: {
    // Keep existing docs media under guide/public available as static assets.
    publicDir: 'guide/public'
  },
  // Screenshots are written as on-disk paths (/guide/public/images/...) which only
  // resolve because Vite hashes and bundles them into /assets/. The zoom plugin hands
  // that path to <ZoomableImage> as a plain string prop, which Vite would NOT process —
  // every image would 404 in production. Listing the component here puts its `src` back
  // through the same asset pipeline as a plain <img src>. The other tags are the Vue
  // defaults and must be repeated, since supplying this object replaces them.
  vue: {
    template: {
      transformAssetUrls: {
        video: ['src', 'poster'],
        source: ['src'],
        img: ['src'],
        image: ['xlink:href', 'href'],
        use: ['xlink:href', 'href'],
        ZoomableImage: ['src']
      }
    }
  },
  markdown: {
    config: (md) => {
      // Click-to-zoom on every markdown image.
      md.use(zoomablePlugin)

      const defaultRender = md.renderer.rules.link_open || ((tokens, idx, options, env, self) =>
        self.renderToken(tokens, idx, options))
      md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const aIndex = tokens[idx].attrIndex('target')
        if (aIndex < 0) {
          tokens[idx].attrSet('target', '_blank')
          tokens[idx].attrSet('rel', 'noopener noreferrer')
        }
        return defaultRender(tokens, idx, options, env, self)
      }
    }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],

    // Open Graph / Twitter values that never vary per page. Every generated card is
    // 1200x630, so the dimensions live here; the image URL itself is per page and
    // is set in transformPageData() below.
    ['meta', { property: 'og:site_name', content: 'AzonPress Docs' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],
  // Per-page SEO tags: canonical URL plus the Open Graph / Twitter values that differ
  // per page, including the page's own featured image (see featuredImageFor above).
  transformPageData(pageData, { siteConfig }) {
    // `relativePath` is the path AFTER `rewrites`, so it matches the public URL.
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const url = path ? `${SITE_URL}/${path}` : `${SITE_URL}/`
    const title = pageData.frontmatter.title || pageData.title || siteConfig.site.title
    const description =
      pageData.frontmatter.description || pageData.description || siteConfig.site.description
    const image = featuredImageFor(pageData.relativePath)

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:image', content: image }],
      ['meta', { property: 'og:image:alt', content: title }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: image }]
    )
  },
  themeConfig: {
    logo: {
      light: '/images/brand/azonpress_primary_logo.png',
      dark: '/images/brand/azonpress_monotone_light_logo.png'
    },
    siteTitle: false,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'User Docs', link: '/guide/getting-started/azonpress-introduction' },
      { text: 'Website', link: 'https://azonpress.com' },
      { text: 'Changelog', link: '/guide/changelog' }

    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/getting-started/azonpress-introduction' },
            { text: 'Installation & Activation', link: '/guide/getting-started/how-to-install-activate-and-update-the-azonpress' },
            { text: 'Dashboard Overview', link: '/guide/getting-started/dashboard-of-azonpress' },
            { text: 'AzonPress Glossary', link: '/guide/getting-started/azonpress-glossary' }
          ]
        },
        {
          text: 'Configuring Amazon API',
          items: [
            { text: 'Creating API Credentials', link: '/guide/configuring-amazon-api/creating-credentials-for-amazon-product-advertising-api' },
            { text: 'Configure API', link: '/guide/configuring-amazon-api/configure-amazon-api' },
            { text: 'Geo Tracking Settings', link: '/guide/configuring-amazon-api/geo-tracking-targeting-settings' }
          ]
        },
        {
          text: 'Product Tables',
          items: [
            { text: 'Create Product Table', link: '/guide/product-tables-module/how-to-create-an-amazon-product-table' },
            { text: 'Customization', link: '/guide/product-tables-module/customization-of-product-tables' },
            { text: 'Add Columns', link: '/guide/product-tables-module/add-columns-in-product-tables' }
          ]
        },
        {
          text: 'Comparison Tables',
          items: [
            { text: 'Create Comparison Table', link: '/guide/amazon-comparison-tables/how-to-create-an-amazon-comparison-table' },
            { text: 'Customization', link: '/guide/amazon-comparison-tables/customization-of-comparison-tables' }
          ]
        },
        {
          text: 'Product Templates',
          items: [
            { text: 'Grid Template', link: '/guide/available-products-templates/grid-template' },
            { text: 'Box Template', link: '/guide/available-products-templates/box-template' },
            { text: 'List Template', link: '/guide/available-products-templates/list-template' },
            { text: 'Bestseller Lists', link: '/guide/available-products-templates/bestseller-lists' },
            { text: 'Product Elements', link: '/guide/available-products-templates/product-elements' },
            { text: 'Table Template', link: '/guide/available-products-templates/table-template' },
            { text: 'Widget Small Template', link: '/guide/available-products-templates/widget-small-template' },
            { text: 'Widget Template', link: '/guide/available-products-templates/widget-template' }
          ]
        },
        {
          text: 'Custom Products',
          items: [
            { text: 'Dashboard', link: '/guide/custom-product/custom-products-and-its-dashboard' },
            { text: 'Add Single Product', link: '/guide/custom-product/how-to-add-a-single-custom-product' },
            { text: 'Add Multiple Products', link: '/guide/custom-product/how-to-add-multiple-custom-products' }
          ]
        },
        {
          text: 'Reports',
          items: [
            { text: 'Overview', link: '/guide/reports/reports-overview' },
            { text: 'Click Tracking', link: '/guide/reports/click-tracking-and-cloaked-url-analytics' },
            { text: 'Geo Location Report', link: '/guide/reports/geo-location-report' },
          ]
        },
        {
          text: 'Miscellaneous',
          items: [
            { text: 'Appearance Settings', link: '/guide/miscellaneous/appearance-settings' },
            { text: 'Affiliate Link Configuration', link: '/guide/miscellaneous/affiliate-link-configuration' },
            { text: 'Other Settings', link: '/guide/miscellaneous/other-settings' }
          ]
        },
        {
          text: 'Support',
          items: [
            { text: 'How to Get Support', link: '/guide/support/how-to-get-support' }
          ]
        }
      ]
    },
    footer: {
      copyright: 'Copyright © 2026 AzonPress'
    },
    search: {
      provider: 'local'
    }
  }
})

