import { defineConfig } from 'vitepress'

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
  markdown: {
    config: (md) => {
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
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]
  ],
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

