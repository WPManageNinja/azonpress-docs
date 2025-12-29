# How to Resolve "Request Throttled" Error of Amazon API

API (Application Programming Interface) is a method we use in our plugin to connect with Amazon to retrieve product information. Our plugin including AzonPress won't connect to Amazon's Servers if you don't have a working API key generated from your Amazon account.

## What is the "Request Throttled" Error?

Before, you could generate an API key after verifying your account, and by using our plugin you can get product details without any restrictions. However, now Amazon has made some changes in its affiliate program.

### A Few New Rules Set by Amazon:

* New Affiliate accounts will only have access to API keys after verifying the shop by completing 3 qualifying sales in the first 180 days and agreeing to comply with the Operating Terms & Conditions.
* After the verification of your new API key, within a few hours, it will start working.
* You may lose access to Product Advertising API unless your account generates a minimum of 3 referring sales in a consecutive 30-day period.
* If you lose access to Product Advertising API 5.0, you can still use other product linking tools to generate revenue, like SiteStripe, the Custom Products feature of AzonPress, etc.
* But, if you want to regain access to Product Advertising API 5.0, you can get it within two days after your required sales are shipped.
* According to Amazon Product Advertising, only 8640 initial usage requests are allowed every day for the first 30-day period. Also, in the last 30 days, each account limit will be based on the revenue performance of Product API.

Now, when your Amazon Affiliate account does not follow the new rules, you will receive an error text (**Something went wrong. Please check your API keys**) in the API setting page of the **AzonPress Plugin** and this is called the **RequestThrottled Error**.

**Remember**, if you do not follow any rules mentioned above, your API key will be blocked by Amazon and it will not work. In this case, you can not configure this account's API with the AzonPress plugin.

## How do you check if your API keys work?

You can check this with the help of **Amazon's AWS Scratchpad** (Official). The official **Scratchpad** receives a detailed error report related to API keys.

To test whether API keys working or not, follow the steps with a screenshot below –

First, go to Amazon's AWS Scratchpad, click on **SearchItems** from the left sidebar, and a form will appear where you must enter your **Amazon API key ID**, **Access & Secret key**, and **Tracking ID**.

Then click the **Run Request** button and finally, the result will be displayed under the "**Response types**" section on the current page.

## How to Resolve the "RequestThrottled" error?

If your API keys do not work, follow the rules below to resolve the error.

1. For newly created API keys, verify this by completing required sales and agreeing with referred operating agreements. Then, wait at least 48 hours for active keys.
2. Confirmed that you have generated a minimum of 3 referring sales every 30 days.
3. On multiple websites, never use the same API keys if you are not generating enough sales. It will not allow you to create more API requests.

We can do nothing from our site for API errors, and for more information, you can contact with Amazon Associates team directly at <https://affiliate-program.amazon.com/home/contact>.

If you have any further questions, concerns, or suggestions, please do not hesitate to contact our support team. Thank you.

---

