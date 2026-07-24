---
title: "Creating Credentials for Amazon Creators API"
description: "Learn how to generate your Amazon Creators API Credential ID and Credential Secret for AzonPress. Follow our step-by-step guide covering eligibility requirements and credential setup."
title_tag: "Create Amazon Creators API Credentials Guide | Azonpress Documentation"
meta_description: "Step-by-step guide to create Amazon Creators API credentials for AzonPress. Learn eligibility requirements, generate your Credential ID and Secret, and start fetching product data now!"
---

# Creating Credentials for Amazon Creators API

The **Creators API Credential ID** and **Credential Secret** are required for the AzonPress plugin to connect to the **Amazon Creators API**. This enables the plugin to fetch up-to-date product information, display accurate listings, and track affiliate commissions. To set up these credentials in **AzonPress**, you must first generate them from your Amazon Associates account. This article will guide you through creating them.

> [!Note]
> AzonPress uses the Amazon Creators API for authentication. Access Key and Secret Key credentials are no longer supported.

## Eligibility Requirements

Before you can request Creators API access, your **Amazon Associates account** needs to meet a few requirements:

* You need an active, approved **Amazon Associates account**. If you haven't signed up yet, visit the Amazon Associates website for your region and apply.
* Your account must have generated at least **10 qualifying sales within the last 30 days**. Amazon uses this to confirm your site is actively driving real traffic.
* This is an **ongoing requirement**, not a one-time check if your qualifying sales drop below this threshold, your Creators API access may be temporarily suspended until you start generating qualifying sales again.

> **Remember**, if you don't yet qualify for Creators API access, you can still use AzonPress's **Custom Product (Zero API)** feature to build and promote Amazon affiliate product displays without connecting to Amazon's API, and connect your credentials later once you're eligible.

## How to Get Amazon Creators API Credentials

Once your Associates account meets the eligibility requirements above, go to the [Home dashboard](https://affiliate-program.amazon.com/home) of your Amazon Associates account and follow the steps below to generate your credentials.

1. **Open the menu:** In the top-right corner, click the **three-line (hamburger)** menu icon.

![Amazon api key](/guide/public/images/configuring-amazon-api/creating-credentials-for-amazon-product-advertising-api/access-amazon-api-1.webp)

2. **Navigate to Creators API:** A pop-up menu will appear under **Tools**. From the list, select **CreatorsAPI**.

![Creator API](/guide/public/images/configuring-amazon-api/creating-credentials-for-amazon-product-advertising-api/creator-api-2.webp)

3. **Apply for API access:** If your account is eligible, you'll see an option to apply. Click **Apply for Access** and fill in the short application form about your website and expected usage. Approval is usually granted within a few minutes, though it can occasionally take 24–48 hours.

4. **Create an application:** Once approved, click **Create Application** and give it a name this is only for your own reference.

5. **Generate your credentials:** Click **Add New Credential**. Amazon will instantly generate:
   * **Credential ID** - a long string of letters and numbers.
   * **Credential Secret** — another long string; keep this private.
   * **API Version** — the [Creators API](https://affiliate-program.amazon.com/creatorsapi) version for your marketplace.

> **Important:** Amazon shows the **Credential Secret only once**. Copy it immediately, or download it as a CSV file, and store it somewhere secure. If you lose it, you'll need to generate a new credential.

Now, you can [configure the Amazon API](/guide/configuring-amazon-api/configure-amazon-api) in the AzonPress plugin using these credentials.

Remember, if you're using a local Associates program, your dashboard URL might be different.

If you have any further questions, concerns, or suggestions, please do not hesitate to contact our support team. Thank you.
