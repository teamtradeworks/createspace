# Customer voucher (10% off)

## Summary

- **Campaign slug:** `2026-11-customer-voucher`
- **Type:** Sale (one-to-one voucher)
- **Audience:** Parents (existing customers)
- **Runs:** ongoing, one voucher per customer
- **Status:** Draft

## The offer

- 10% off the customer's next order, with a unique code we create in Shopify for each customer.
- Valid for 30 days from the day the customer receives it. The image prints the use-by date.
- Can't be combined with other promotions.
- Free delivery on orders over R 1,500 still applies (`storefront/src/config/site.json`, `freeDeliveryThreshold: 1500`).

## Making one

```bash
marketing/campaigns/2026-11-customer-voucher/make-voucher.sh CODE [YYYY-MM-DD]
```

Writes `exports/voucher-CODE.png` (1200 x 800, `email-hero` canvas), good for email or WhatsApp. The date defaults to today. Per-customer exports are gitignored; `exports/voucher.png` is the placeholder sample.

Make sure the Shopify discount matches the image: 10% off, one use per customer, an end date 30 days out, and no combining with other discounts.
