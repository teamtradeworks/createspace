# Zoho Books invoice and quote templates

The PDF templates for CREATESPACE tax invoices and quotes in Zoho Books. They are custom HTML templates, edited under **Settings → Templates → (template) → Edit Custom Template**. Paste each file into the editor's source view, not the formatting view.

| File | Zoho template |
|---|---|
| `invoice-template.html` | Invoices (TAX INVOICE) |
| `quote-template.html` | Quotes (Zoho calls these Estimates) |

`drafts/` holds the earlier design options and their previews, kept for reference. They are not in use.

## Placeholders

Zoho fills `%Name%` placeholders when it builds the PDF. In the editor, a placeholder Zoho recognises shows as `{{Name}}`; one it doesn't recognise stays as raw `%Name%` and prints blank. To find a placeholder's code, use the three dropdowns above the editor: pick the section, pick the field, and the third box shows the code.

| Shows as | Invoice | Quote |
|---|---|---|
| Number | `%InvoiceNumber%` | `%EstimateNumber%` |
| Date | `%InvoiceDate%` | `%EstimateDate%` |
| Valid until | n/a | `%ExpiryDate%` |
| Subtotal | `%InvoiceSubTotal%` | `%EstimateSubTotal%` |
| Delivery | `%ShippingCharge%` | n/a (Zoho has no shipping field on quotes; add delivery as an item line) |
| Total | `%InvoiceTotal%` | `%EstimateTotal%` |

Item lines, both templates: `%ItemName%`, `%ItemQty%`, `%ItemRate%`, `%ItemDiscount%`, `%DiscountAmount%`, `%ItemAmount%`. VAT rows: `%TaxValue%`.

Keep the `tbody` ids (`lineitem`, `headerItem`, `subtotalItem`, `taxItems`) and the `tmp_*` ids. Zoho repeats or fills those sections by id.

## Zoho PDF engine limits

- **Images must be public URLs.** Zoho rejects base64 data URIs. The logo loads from `https://www.thecreatespace.co.za/images/brand/logo-light-trimmed.png`, so that file must stay on the website.
- **Fonts don't inherit into tables.** The stylesheet sets the font and size on every `td`.
- **Text renders about 10% larger than in Chrome.** Leave slack in column widths.
- **Only the total carries the currency symbol.** Zoho prints `%InvoiceTotal%` and `%EstimateTotal%` as `R1,234.00`; every other amount has no R.
- **No conditional content.** A row can't be hidden when its value is empty or zero, so rows like a discount total were removed rather than left blank.
- **Fixed-layout tables take column widths from the first row.** Avoid a full-width (`colspan`) first row in a two-column table; put dividers on the table border instead.
