---
title: "Other Settings in AzonPress"
title_tag: "Other Settings Configuration Guide | Azonpress Documentation"
meta_description: "Configure AzonPress other settings: assign admin access roles, configure global asset loading for CSS/JS. Manage plugin permissions easily!"
---

# Other Settings in AzonPress

In AzonPress, the "Other Settings" feature allows you to **Assign** the **Users** full **Admin Access** for a specific **AzonPress Site/Plugin**. Also, you can decide with this setting option whether you want to load the CSS and JS file globally or on-demand. You can also manage how AzonPress stores your click data under **Click Tracking Privacy**. This article will guide you through giving admin access to the users.

## Give Admin Access to Users with Other Settings

To learn how you can **give** your **AzonPress Site's** full **Admin Access** to the **Users** of your **WordPress Site**, follow the steps with the screenshots below –

First, go to **Settings** from the **AzonPress Navbar** and click on **Other Settings.**

![Other Settings option from AzonPress dashboard](/guide/public/images/miscellaneous/other-settings/other-settings-option-from-azonpress-dashboard.webp)

## Explanation of Other Settings Options

Now, here you can see three major settings options. These are:

#### 1. Global Asset Loading

This setting controls how the plugin's technical files are loaded on your website:

 * **Load CSS and JS Globally:** Enable this option if you want to load all AzonPress CSS and JS files on every page of your site.
 * **Load CSS and JS On-Demand:** By default, this option is enabled to load files only when they are needed, which helps maintain site performance.

#### 2. AzonPress Access Roles

By default, Administrators have all the access. You can assign more user roles to use AzonPress on your site by simply clicking the checkbox of your desired role/s:

 * **Editor**
 * **Author**
 * **Contributor**

Once you have selected your desired roles, those specific user/s will be able to access AzonPress features.

#### 3. Click Tracking Privacy

This section controls how AzonPress stores click data:

 * **Track clicks only with consent:** A consent plugin that supports the WP Consent API (for example, Complianz or CookieYes) is always respected. Turn this on to also stop tracking when no such plugin is installed.
 * **Anonymise visitor IP addresses:** Stores IPs with the last part removed (for example, `192.168.1.0`). The country is still detected, but unique-click counts become approximate. This applies to new clicks only.
 * **Keep click data for ___ days:** Older click data is deleted once a day. New installs keep analytics for **365 days** by default. Enter `0` to keep click data forever.

![Screenshot of the Click Tracking Privacy settings with consent, IP anonymising, and click data retention options](/guide/public/images/miscellaneous/other-settings/other-settings-privacy.webp)

> **Note**, click data older than the number of days you set is permanently deleted.

**Update Settings:** Once you are done making your selections, click the **Update** button to save all the changes.

![Other Settings Popup page](/guide/public/images/miscellaneous/other-settings/othe-settings-popup-page.webp)



