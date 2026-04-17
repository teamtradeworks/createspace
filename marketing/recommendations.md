# Optimisation Recommendations

*Last updated: 2026-04-17*
*Status: Initial framework — needs data validation*

## Priority Matrix

Recommendations are ranked by **impact** (potential revenue/conversion lift) and **effort** (development/operational cost).

---

## P0: Quick Wins (High Impact, Low Effort)

### 1. Add "free delivery" progress bar to cart
- **Problem**: Users may abandon cart when they see R 128 delivery charge, not realising they're close to the R 1,500 free delivery threshold.
- **Action**: Show a progress bar on the cart page: "You're R 300 away from free delivery!"
- **Expected impact**: Increased average order value, reduced cart abandonment
- **Effort**: Small frontend change
- **Measure**: Compare AOV and cart abandonment rate before/after

### 2. Track purchase completion via Shopify webhooks — DONE
- **Status**: Implemented. Webhook endpoint at `/api/webhooks/shopify/orders`.
- **What it captures**: `purchase_completed` event in PostHog with order value, items, SKUs, discount codes, shipping location, repeat customer flag, and customer identification.
- **Setup required**: Add `SHOPIFY_WEBHOOK_SECRET` env var and configure the `orders/create` webhook in Shopify admin pointing to `https://thecreatespace.co.za/api/webhooks/shopify/orders`.

### 3. Capture UTM parameters in PostHog and GTM ecommerce events — DONE
- **Status**: Implemented. UTM params captured on first touch and stored in sessionStorage.
- **PostHog**: `register()` adds UTMs to all events for the session. `setPersonProperties()` stores `initial_utm_*` as permanent user properties for first-touch attribution.
- **GTM**: All ecommerce events (`view_item`, `add_to_cart`, `view_cart`, `begin_checkout`, `search`) now include `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` from first touch.
- **Files**: `src/lib/utm.ts` (shared utility), `src/components/PostHogPageview.tsx`, `src/lib/gtm.ts`.

---

## P1: Medium-Term (High Impact, Medium Effort)

### 4. Post-purchase email sequence
- **Problem**: No post-purchase engagement. No mechanism for repeat purchases, reviews, or referrals.
- **Action**: Design a 3-email sequence:
  1. Order confirmation + "what to expect" (delivery timeline)
  2. "How's the build going?" + tips (1 week after delivery)
  3. "What to try next" + related product suggestions (3 weeks)
- **Expected impact**: Repeat purchase rate, customer lifetime value
- **Effort**: Email platform setup + content creation
- **Measure**: Repeat purchase rate, email open/click rates

### 5. Product recommendation engine on product pages
- **Problem**: Users viewing one product may not discover related products.
- **Action**: Add "Customers also viewed" or "Next step up" sections to product pages, using PostHog data on co-viewed products.
- **Expected impact**: More products viewed per session, higher conversion
- **Effort**: Medium — component exists, needs data pipeline
- **Measure**: Products viewed per session, cross-sell conversion

### 6. Abandoned cart recovery
- **Problem**: Users who add to cart but don't checkout are lost.
- **Action**: For identified users (newsletter subscribers), send a reminder email if `product_added_to_cart` but no `checkout_created` within 2 hours.
- **Expected impact**: Recovered revenue from high-intent users
- **Effort**: Requires email automation + PostHog integration
- **Measure**: Recovery rate, recovered revenue

### 7. Search experience improvement
- **Problem**: Unknown whether search is effective. Users searching may not find what they need.
- **Action**: Analyse top search terms, identify "no results" queries, add search suggestions and autocomplete.
- **Expected impact**: Better search → product page conversion
- **Effort**: Search analytics + frontend improvements
- **Measure**: Search-to-product-view rate, search-to-purchase rate

---

## P2: Strategic (High Impact, High Effort)

### 8. Customer segmentation and personalised experiences
- **Problem**: All visitors see the same homepage and product ordering regardless of intent.
- **Action**: Use PostHog feature flags to personalise based on:
  - New vs returning visitor
  - Parent vs educator (based on pages visited)
  - Age range interest (based on products viewed)
- **Expected impact**: Higher relevance → higher conversion
- **Effort**: Significant — needs segmentation logic + variant design
- **Measure**: Conversion rate by segment

### 9. Age-based product finder / quiz
- **Problem**: Parents unfamiliar with STEM don't know where to start. Our brand strategy identifies this as a key persona.
- **Action**: Interactive quiz: "How old is your child?" → "What are they interested in?" → Personalised recommendations.
- **Expected impact**: Reduced browse-to-cart friction for uncertain parents
- **Effort**: New feature — frontend + recommendation logic
- **Measure**: Quiz completion rate, quiz-to-purchase conversion

### 10. Education lead scoring
- **Problem**: Education enquiries come through generic contact form. No way to prioritise or follow up systematically.
- **Action**: Track education page engagement depth, form submissions with school details, and score leads by engagement level.
- **Expected impact**: Better B2B conversion, higher-value orders
- **Effort**: CRM integration or manual scoring system
- **Measure**: Education enquiry → order conversion rate

---

## Tracking Gaps to Close First

Before most recommendations can be validated, these tracking improvements are needed:

| Gap | Priority | Effort |
|-----|----------|--------|
| Purchase completion webhook | Critical | Low |
| UTM parameter capture in PostHog | High | Low |
| Product listing impressions (which products users scroll past) | Medium | Medium |
| Returning visitor identification | Medium | Low |
| Post-purchase event tracking (delivery, review, repeat) | Medium | Medium |

---

## How to Validate

For each recommendation:
1. **Baseline**: Measure current metric before change
2. **Implement**: Make the change
3. **Measure**: Compare metric after change (allow 2-4 weeks)
4. **Decide**: Keep, iterate, or revert

Use PostHog's A/B testing (feature flags) for changes where possible to get statistical confidence.
