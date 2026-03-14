# PostHog Setup Report

## Integration Summary

PostHog analytics has been integrated into the CREATESPACE Next.js (App Router) storefront. The integration uses:

- **`posthog-js`** for client-side event capture
- **`posthog-node`** for server-side event capture in API routes
- **Next.js rewrites** as a reverse proxy to avoid ad-blockers
- **`instrumentation-client.ts`** for client-side initialisation (Next.js 15.3+ approach — no Provider needed)

### Configuration

| Setting | Value |
|---------|-------|
| PostHog Host | `https://eu.i.posthog.com` |
| Ingest Proxy | `/ingest` (via Next.js rewrites) |
| Region | EU |
| Exception Capture | Enabled |

### Files Modified

| File | Change |
|------|--------|
| `storefront/instrumentation-client.ts` | Created — client-side PostHog initialisation |
| `storefront/next.config.mjs` | Added PostHog reverse proxy rewrites + `skipTrailingSlashRedirect` |
| `storefront/src/lib/posthog-server.ts` | Created — server-side PostHog singleton |
| `storefront/.env.local` | Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` |

---

## Events

| Event Name | Description | File |
|------------|-------------|------|
| `product_added_to_cart` | Fired when a user adds a product to the cart from a product page | `storefront/src/components/ProductActions.tsx` |
| `product_buy_now_clicked` | Fired when a user clicks "Buy Now" on a product page | `storefront/src/components/ProductActions.tsx` |
| `addon_selected` | Fired when a user adds or removes an add-on product | `storefront/src/components/ProductActions.tsx` |
| `product_quick_added_to_cart` | Fired when a product is added via the quick-add button on a listing | `storefront/src/components/QuickAddButton.tsx` |
| `checkout_initiated` | Fired when the user clicks "Checkout" from the cart page | `storefront/src/app/cart/page.tsx` |
| `checkout_created` | Server-side — fired when a Shopify checkout URL is created via the API | `storefront/src/app/api/checkout/route.ts` |
| `search_performed` | Fired when a user submits a search query | `storefront/src/components/SearchInput.tsx` |
| `email_popup_dismissed` | Fired when the newsletter popup is closed without subscribing | `storefront/src/components/EmailPopup.tsx` |
| `newsletter_subscribed` | Fired on successful newsletter subscription | `storefront/src/components/EmailPopup.tsx` |
| `newsletter_signup` | Server-side — fired on the subscribe API route (includes `already_subscribed` flag) | `storefront/src/app/api/subscribe/route.ts` |
| `contact_form_submitted` | Fired when the contact form is successfully submitted | `storefront/src/components/ContactForm.tsx` |

---

## Dashboard & Insights

**Dashboard:** [Analytics basics](https://eu.posthog.com/project/141124/dashboard/568907)

| Insight | URL |
|---------|-----|
| Purchase Conversion Funnel | https://eu.posthog.com/project/141124/insights/l7jcxHEo |
| Cart Events Over Time | https://eu.posthog.com/project/141124/insights/gK8pBXZg |
| Newsletter Popup: Subscriptions vs Dismissals | https://eu.posthog.com/project/141124/insights/gkElLKUO |
| Search & Contact Activity | https://eu.posthog.com/project/141124/insights/UFNPf3UA |
