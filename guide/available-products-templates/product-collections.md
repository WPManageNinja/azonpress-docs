---
title: "Product Collections"
title_tag: "Product Collections Guide | Azonpress Documentation"
meta_description: "Group custom and Amazon products into one reusable list and show it anywhere with a shortcode or block. Build your first collection today!"
---

# Product Collections

A **Product Collection** is a reusable list of products. You pick the products once, then show the same list on as many posts and pages as you like, in a **Grid**, **List**, or **Table** layout. You can mix **Custom Products** and **Amazon Products** in the same collection.

A collection never copies your product data. It points to each product where it already lives, so when you edit a product, every collection that contains it updates automatically.

## Create a Collection

1. In your WordPress admin, go to **AzonPress → Collections**.
2. Click **Add New Collection**. A small pop-up will appear.

![Screenshot of the Collections list with the Add New Collection button, shortcodes, and Preview, Edit, Duplicate and Delete actions](/guide/public/images/available-products-templates/product-collections/collections-list.webp)
3. Enter a **Collection title** (for example, *Home Office Essentials*) and click **Create**.

![Screenshot of the Create a new Collection pop-up with the Collection title filled in](/guide/public/images/available-products-templates/product-collections/new-collection-form.webp)

4. Your new collection opens in the editor. Click **Add Products** and choose the products to include:
    * **Custom Products**: Search by product or template title.
    * **Amazon Products**: Search by product title, ASIN, or table name. You can also paste ASINs, one per line or separated by commas. If a product doesn't exist yet, use **Create custom products**.
5. Tick the products you want, then click **Add [number] products**.

![Screenshot of the Add products to this collection dialog with Custom Products and Amazon Products tabs and three products selected](/guide/public/images/available-products-templates/product-collections/add-products-dialog.webp)

6. Click **Save Changes** to save the collection. Use **Preview** to see how it looks, or set the **Status** to **Draft** if you aren't ready to publish it.

> **Note**, a collection can hold up to 100 products.

## Reorder and Remove Products

* Drag a product to change its position.
* Prefer the keyboard? Use the **Move up** and **Move down** buttons next to each product.
* Your new order is applied when you save the collection.
* Click the **Trash icon** (**Remove from collection**) next to a product to take it out. To remove several at once, tick **Select all** or the products you want, then click **Remove selected**. The original products are not deleted.

![Screenshot of the collection product list with the drag handle, Move up and Move down buttons, Customize button, and Remove icon](/guide/public/images/available-products-templates/product-collections/reorder-and-remove-products.webp)

To give a product its own **Title**, **Badge** (for example, *Best Pick*), or **Button text**, click **Customize** next to it. These apply only inside this collection, and the original product is not changed.

> **Note**, if a product was deleted, Amazon no longer returns it, or its link was flagged as broken, it stays hidden on your site until you fix or remove it. The collection editor shows a warning next to it.

## Collection Settings

| Setting | What it does |
| --- | --- |
| **Shortcode ID (slug)** | The ID used in the shortcode. |
| **Status** | **Published** collections appear on your site. **Draft** collections render nothing. |
| **Description** | Optional text shown with the collection. |
| **Internal notes** | Visible to admins only. |
| **Layout** | **Grid**, **List**, or **Table**. |
| **Columns** | Number of columns for the **Grid** layout (1–4). |
| **Button text** | Overrides the button label. Leave empty to use each product's default. |
| **Disclosure** | Show the **Global** affiliate disclosure, a **Custom** one, or **None**. |
| **Disclosure text** / **Disclosure position** | Your custom wording, shown **Above products** or **Below products**. Basic HTML is allowed, and `%last_update%` shows when the collection was last saved. |

You can also switch **Show heading**, **Show price**, **Show rating**, and **Show description** on or off.

![Screenshot of the collection settings panels with Collection, Display and Affiliate options](/guide/public/images/available-products-templates/product-collections/collection-settings.webp)

## Show a Collection on Your Site

### Using the shortcode

In the **Collections** list, click the shortcode of a collection to copy it, then paste it into any post or page:

```text
[azonpress_collection id="best-budget-laptops"]
```

You can override the saved settings for a single placement with these attributes:

| Attribute | Example | Description |
| --- | --- | --- |
| `layout` | `layout="table"` | `grid`, `list`, or `table` |
| `columns` | `columns="2"` | 1 to 4 (Grid layout) |
| `limit` | `limit="5"` | Show only the first 5 products |
| `button_text` | `button_text="Check Price"` | Custom button label |

```text
[azonpress_collection id="best-budget-laptops" layout="list" limit="5"]
```

### Using the Gutenberg block

1. In the block editor, click the **Plus (+) icon** and add the **Azp Product Collection** block.
2. In the block settings, choose your collection under **Select a collection**.
3. Under **Display overrides**, optionally change the **Layout** (**Collection default**, **Grid**, **List**, or **Table**) and **Max products** for this placement only. Leave **Max products** empty to show all products.

<!-- SCREENSHOT NEEDED: Block editor with the AzonPress Product Collection block, showing 'Select a collection' and the Display overrides (Layout, Max products). Save as collection-gutenberg-block.webp -->

> **Remember**, a collection set to **Draft** shows nothing to visitors. If a published collection has no products to show, only admins see a short notice explaining why.

## Collection Click Stats

Open a collection in the editor to see its **Clicks (last 30 days)**, broken down:

* **By page**: Which posts or pages the clicks came from.
* **By product**: Which products in the collection get the most clicks.

<!-- SCREENSHOT NEEDED: Collection editor 'Clicks (last 30 days)' panel showing the By page and By product lists. Save as collection-click-stats.webp -->

Collection and page attribution is also recorded in your site-wide click analytics. See [Click Tracking & Cloaked URL Analytics](/guide/reports/click-tracking-and-cloaked-url-analytics) for how clicks are tracked.

## Edit, Duplicate, or Delete a Collection

From the **Collections** list you can **Preview**, **Edit**, **Duplicate**, or **Delete** any collection.

Collections give you one place to maintain a product list and reuse it everywhere. For more layout options, see the [Grid Template](/guide/available-products-templates/grid-template) and [List Template](/guide/available-products-templates/list-template).
