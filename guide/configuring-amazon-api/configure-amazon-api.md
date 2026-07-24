---
title: "Configure Amazon API in AzonPress"
title_tag: "Configure Amazon API in AzonPress | Azonpress Documentation"
meta_description: "Complete guide to configure the Amazon Creators API in AzonPress. Set up credentials, enable smart caching, and configure geo-targeting. Get started today!"
---

# Configure Amazon API in AzonPress

To use the AzonPress plugin on your WordPress site, you need to configure the Amazon API settings. This ensures the plugin can fetch real-time product data and correctly track your affiliate links. This guide will walk you through the configuration process.

## Amazon API Configuration in AzonPress

To learn how to configure your Amazon API settings, follow the steps and refer to the screenshots below:

> [!Note]
> Traditional PA-API credentials are no longer required to connect your Amazon account with AzonPress. Instead, AzonPress now utilizes the Amazon Creators API for product searches, details, and live offers.

> [!Note]
> If your Creators API credentials aren't configured yet, you'll see an admin notice in your WordPress dashboard about the PA-API shutdown with a **Connect Creators API** link. Clicking it brings you directly to this Settings screen; the notice disappears automatically once your credentials are connected and verified.

1. **Access Settings:** From your WordPress Sidebar or the AzonPress Navbar, navigate to **Settings** and select the **Amazon API** option from the left sidebar.

2. **Enter Credentials:** Configure the required fields using your Amazon Associates Central details:

   * **Country:** Select your primary Amazon marketplace (e.g., US, UK, CA).
   * **Tracking Id:** Enter your unique Amazon Associate Tracking ID.

3. **Creators API Credentials:** Enter the credentials generated from Associates Central:

   * **Creators API ID:** **Paste** your unique Creator Application Client ID.
   * **Creators API Secret:** Input your Creator Application Secret key.
   * **API Version:** Select the API version corresponding to your regional marketplace (e.g., 3.2 – EU (Europe), 2.1 – NA (North America)). Match the region to your marketplace as indicated in the helper text under the selector.

Once your credentials are correct, you will see a green **Connected** badge next to **Creators API Status**.

![Configuring Amazon API](/guide/public/images/configuring-amazon-api/configure-amazon-api/amazon-api-settings.webp)

**Last Amazon API Error:** If Amazon rejects a request (an expired credential, an invalid ASIN, or a rate-limit hit), the most recent error message is shown right here on the Settings screen, so you don't need to check your server logs to see what's wrong. This alert clears automatically the next time your credentials are saved and verified successfully.

## Additional Optimization Settings

Besides the credential fields, you can configure two powerful features to improve site performance and global reach:

**Amazon API Call Smart Caching:** To prevent your site from slowing down due to frequent API requests, AzonPress uses smart caching. You can set the **API Caching Time** (in hours) to specify how long product data should be stored. The recommended value is **24 hours**.

**Geo-Targeting Settings:** Under **Geo-Target Type**, you can choose how to handle international traffic:
  * **None:** No redirection.
  * **Country wise targeting:** Automatically redirects visitors to their local Amazon store based on their location.
  * **Amazon One Link:** Integrates with Amazon's official global linking service.

Once you have filled in all the required information, click the **Update** button to save your changes. Your Amazon API configuration is now complete!



