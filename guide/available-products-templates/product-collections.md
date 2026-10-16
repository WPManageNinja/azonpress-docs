---
title: "Product Collections"
title_tag: "Product Collections Guide | Azonpress Documentation"
meta_description: "Group custom and Amazon products into one reusable list and show it anywhere with a shortcode or block. Build your first collection today!"
---

# Product Collections

A **Product Collection** is a reusable list of products. You pick the products once, then show the same list on as many posts and pages as you like, in a **Grid**, **List**, or **Table** layout. You can mix **Custom Products** and **Amazon Products** in the same collection.

A collection never copies your product data. It points to each product where it already lives, so when you edit a product, every collection that contains it updates automatically.

## Create a Collection


<!-- SCREENSHOT NEEDED: AzonPress → Collections list page showing the Add New Collection button, each collection's copyable shortcode, and the Preview / Edit / Duplicate / Delete actions. Save as collections-list.webp -->
1. In your WordPress admin, go to **AzonPress → Collections**.
2. Click **Add New Collection**.
3. Enter a **Collection title** (for example, *Best Budget Laptops*).
4. Click **Add Products** and choose the products to include:
    * **Custom Products**: Search by product or template title.
    * **Amazon Products**: Search by product title, ASIN, or table name. You can also paste one or more ASINs separated by commas.
5. Review the list and save the collection.

<!-- SCREENSHOT NEEDED: New collection form with the Collection title field filled in and the Add Products button. Save as new-collection-form.webp -->

<!-- SCREENSHOT NEEDED: 'Add products to this collection' dialog showing the Custom Products and Amazon Products tabs and the search field. Save as add-products-dialog.webp -->

> **Note**, a collection can hold up to 100 products.

## Reorder and Remove Products

* Drag a product by its handle to change its position.
* Prefer the keyboard? Use the **Move up** and **Move down** buttons next to each product.
* Click **Remove from collection** to take a product out. The original product is not deleted.

<!-- SCREENSHOT NEEDED: Collection product list showing the drag handle, Move up, Move down and Remove from collection buttons. Save as reorder-and-remove-products.webp -->

Each product can also have its own label (for example, *Best Pick*) that applies only inside this collection. The original product is not changed.

> **Note**, if a product was deleted, Amazon no longer returns it, or its link was flagged as broken, it stays hidden on your site until you fix or remove it. The collection editor shows a warning next to it.

## Collection Settings

| Setting | What it does |
| --- | --- |
| **Shortcode ID (slug)** | The ID used in the shortcode. |
| **Status** | **published** collections appear on your site. **draft** collections render nothing. |
| **Description** | Optional text shown with the collection. |
| **Internal notes** | Visible to admins only. |
| **Layout** | **Grid**, **List**, or **Table**. |
| **Columns** | Number of columns for the Grid layout (1–4). |
| **Button text** | Overrides the button label. Leave empty to use each product's default. |
| **Disclosure** | Show the **global** affiliate disclosure, a **custom** one, or **none**. |
| **Disclosure text** / **Disclosure position** | Your custom wording, shown at the **top** or **bottom** of the collection. |

You can also choose whether to show a header, the price, the rating, and the description.

<!-- SCREENSHOT NEEDED: Collection settings panel showing Shortcode ID (slug), Status, Layout, Columns, Button text and Disclosure options. Save as collection-settings.webp -->

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
| `columns` | `columns="2"` | 1 to 4 |
| `limit` | `limit="5"` | Show only the first 5 products |
| `button_text` | `button_text="Check Price"` | Custom button label |

```text
[azonpress_collection id="best-budget-laptops" layout="list" limit="5"]
```

### Using the Gutenberg block

1. In the block editor, click the **Plus (+) icon** and add the **AzonPress Product Collection** block.
2. Choose your collection under **Select a collection**.
3. Under **Display overrides**, optionally change the **Layout** (**Collection default**, **Grid**, **List**, or **Table**) and **Max products** for this placement only.

<!-- SCREENSHOT NEEDED: Block editor with the AzonPress Product Collection block, showing 'Select a collection' and the Display overrides (Layout, Max products). Save as collection-gutenberg-block.webp -->

> **Remember**, a collection set to **draft** shows nothing to visitors. If a published collection has no products to show, only admins see a short notice explaining why.

## Collection Click Stats

Open a collection in the editor to see its **Clicks (last 30 days)**, broken down:

* **By page**: Which posts or pages the clicks came from.
* **By product**: Which products in the collection get the most clicks.

<!-- SCREENSHOT NEEDED: Collection editor 'Clicks (last 30 days)' panel showing the By page and By product lists. Save as collection-click-stats.webp -->

Collection and page attribution is also recorded in your site-wide click analytics. See [Click Tracking & Cloaked URL Analytics](/guide/reports/click-tracking-and-cloaked-url-analytics) for how clicks are tracked.

## Edit, Duplicate, or Delete a Collection

From the **Collections** list you can **Preview**, **Edit**, **Duplicate**, or **Delete** any collection.

Collections give you one place to maintain a product list and reuse it everywhere. For more layout options, see the [Grid Template](/guide/available-products-templates/grid-template) and [List Template](/guide/available-products-templates/list-template).
