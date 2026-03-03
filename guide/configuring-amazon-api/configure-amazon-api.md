---
title: "Configure Amazon API in AzonPress"
title_tag: "Configure Amazon API in AzonPress | Azonpress Documentation"
meta_description: "Complete guide to configure Amazon Product Advertising API in AzonPress. Set up credentials, enable smart caching, and configure geo-targeting. Get started today!"
---

# Configure Amazon API in AzonPress

To use the AzonPress plugin on your WordPress site, you need to configure the Amazon API settings. This ensures the plugin can fetch real-time product data and correctly track your affiliate links. This guide will walk you through the configuration process.

## Amazon API Configuration in AzonPress

To learn how to configure your Amazon API settings, follow the steps and refer to the screenshots below:

> **Note:** Before configuring AzonPress, you must first register as an Amazon Associate and create your credentials for the Amazon Product Advertising API (PA-API) on your Amazon Associate account.

1. **Access Settings:** From your WordPress Sidebar or the AzonPress Navbar, navigate to **Settings** and select the **Amazon API** option from the left sidebar.

2. **Enter Credentials:** Input the following details generated from your Amazon Associate Account:
   * **API Key & API Secret:** Enter your primary PA-API credentials.
   * **Country:** Select your primary Amazon marketplace (e.g., US, UK, CA).
   * **Tracking Id:** Enter your unique Amazon Associate Tracking ID.
   * **Creators API ID & Secret:** If you use the Amazon Creators API, enter those specific credentials here to enable advanced features.
   * **API Version:** Choose the appropriate version for your region (e.g., 2.1 - North America).

![Configuring Amazon API](/guide/public/images/configuring-amazon-api/configure-amazon-api/amazon-api-settings.webp)

## Additional Optimization Settings

Besides the credential fields, you can configure two powerful features to improve site performance and global reach:

**Amazon API Call Smart Caching:** To prevent your site from slowing down due to frequent API requests, AzonPress uses smart caching. You can set the **API Caching Time** (in hours) to specify how long product data should be stored. The recommended value is **24 hours**.

**Geo-Targeting Settings:** Under **Geo-Target Type**, you can choose how to handle international traffic:
  * **None:** No redirection.
  * **Country wise targeting:** Automatically redirects visitors to their local Amazon store based on their location.
  * **Amazon One Link:** Integrates with Amazon's official global linking service.

Once you have filled in all the required information, click the **Update** button to save your changes. Your Amazon API configuration is now complete!

---

If you have any further questions, concerns, or suggestions, please do not hesitate to contact our [support team](https://wpmanageninja.com/support-tickets/). Thank you!

