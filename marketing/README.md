# CREATESPACE Marketing Intelligence

This folder contains marketing analysis, user behaviour insights, and optimisation strategies for the CREATESPACE storefront.

## Folder Structure

```
marketing/
├── README.md                  # This file - overview and instructions
├── overview.md                # Current state assessment and key metrics
├── user-journeys.md           # Mapped user journeys and drop-off points
├── recommendations.md         # Prioritised optimisation recommendations
├── data/                      # Raw and processed analytics data exports
│   └── .gitkeep
└── campaigns/                 # Campaign planning and performance tracking
    └── .gitkeep
```

## How to Use This Folder

### For AI-Assisted Analysis
When asking Claude to analyse user behaviour or marketing performance:
1. Point it at this folder for context on prior analysis
2. Ask it to query PostHog/GA4 for fresh data and update the data/ folder
3. Request updates to recommendations.md based on new findings

### Data Sources
| Source | What It Captures | Access |
|--------|-----------------|--------|
| **PostHog** | Product analytics, funnels, user identification, session recordings, heatmaps | [Dashboard](https://eu.posthog.com/project/141124/dashboard/568907) |
| **Google Analytics (via GTM)** | GA4 ecommerce events, traffic sources, campaigns, audience demographics | Google Analytics console |
| **Meta Pixel (via GTM)** | PageView, ViewContent, AddToCart, InitiateCheckout, Purchase — managed as GTM tags | Meta Events Manager |
| **Sentry** | Error tracking, session replay on errors | Sentry console |
| **Shopify** | Orders, revenue, product performance, customer data | Shopify admin |

### Key PostHog Events (for querying)
| Event | Description |
|-------|-------------|
| `$pageview` | Page navigation |
| `product_viewed` | Product page loaded |
| `product_added_to_cart` | Add to cart (includes price, addons) |
| `product_buy_now_clicked` | Buy now click |
| `product_quick_added_to_cart` | Quick-add from product listing |
| `addon_selected` | Add-on toggle |
| `cart_viewed` | Cart page visit |
| `checkout_initiated` | Checkout button clicked |
| `checkout_created` | Shopify checkout URL created (server-side) |
| `search_performed` | Search query submitted |
| `email_popup_shown` | Newsletter popup displayed |
| `email_popup_dismissed` | Newsletter popup closed |
| `newsletter_subscribed` | Newsletter signup |
| `contact_form_submitted` | Contact form sent |
| `section_viewed` | Section engagement (with duration) |
| `scroll_depth` | 25%, 50%, 75%, 100% scroll milestones |

### Updating This Analysis
- Export fresh data periodically and save to `data/`
- Re-run funnel analysis monthly
- Update recommendations.md when implementing changes
- Track campaign performance in `campaigns/`
