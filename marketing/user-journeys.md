# User Journeys

*Last updated: 2026-04-17*

## Mapped Funnels

### Primary Purchase Funnel
```
Landing Page → Browse/Search → Product Page → Add to Cart → Cart → Checkout → (Shopify) → Purchase
```

**Tracked events at each stage:**
1. `$pageview` (any page)
2. `search_performed` or `$pageview` on `/shop`
3. `product_viewed`
4. `product_added_to_cart` or `product_buy_now_clicked`
5. `cart_viewed`
6. `checkout_initiated`
7. `checkout_created` (server-side — last event we control)

**Known drop-off risk points:**
- **Browse → Product**: Users may not find relevant products. No tracking on listing page engagement.
- **Product → Cart**: Product page may not convince. Section engagement tracking can help identify which sections matter.
- **Cart → Checkout**: Price shock (delivery cost revealed), decision fatigue. Free delivery threshold (R 1,500) may cause abandonment if cart is close but not over.
- **Checkout → Purchase**: Shopify external checkout — we lose control and visibility.

### Newsletter Signup Funnel
```
Page Visit → Popup Shown → Subscribe / Dismiss
```

**Tracked events:**
1. `email_popup_shown` (with trigger: delay / exit_intent / manual)
2. `newsletter_subscribed` or `email_popup_dismissed`

**Notes:**
- Popup suppressed for 7 days after dismissal, 10 years after subscription
- Subscription triggers PostHog `identify()` — links anonymous sessions to email

### Education Enquiry Funnel
```
Education Landing → Solution Page → Contact Form → Submission
```

**Tracked events:**
1. `$pageview` on `/education`
2. `$pageview` on `/education/{solution}`
3. `contact_form_submitted`

### Search Journey
```
Search Input → Results → Product Page (or no results)
```

**Tracked events:**
1. `search_performed`
2. `search_results_viewed`
3. `product_viewed` (if clicked through)

---

## Journey Analysis Framework

### Data to Collect (via PostHog)

**Session-level journeys:**
- Sequence of pages per session
- Time between events
- Entry page → exit page
- Number of product pages viewed per session
- Search → product view conversion

**User-level journeys:**
- First visit → first purchase (days)
- Number of sessions before purchase
- Newsletter signup → purchase correlation
- Return visit patterns

### Segments to Analyse

| Segment | Definition | Why It Matters |
|---------|-----------|----------------|
| Converters | Users with `checkout_created` event | Understand what successful journeys look like |
| Cart abandoners | `product_added_to_cart` but no `checkout_initiated` | Biggest conversion opportunity |
| Browsers | Multiple `product_viewed` but no cart | Need better product-to-cart conversion |
| Searchers | Users who `search_performed` | Are they finding what they need? |
| Newsletter subscribers | `newsletter_subscribed` event | Do they convert at higher rates? |
| Mobile users | Device type = mobile | Mobile experience may differ significantly |
| Education visitors | Pageview on `/education/*` | B2B journey is fundamentally different |

---

## Optimisation Hypotheses

### H1: Free delivery threshold drives cart upselling
- **Signal**: Users with cart value near R 1,500 may add items to reach free delivery
- **Test**: Analyse cart values at checkout — is there clustering around R 1,500?
- **Action**: Show "Add R X for free delivery" messaging in cart

### H2: Product page scroll depth correlates with conversion
- **Signal**: Users who scroll deeper may be more engaged
- **Test**: Compare scroll depth of converters vs non-converters
- **Action**: Move highest-impact content above the fold

### H3: Multi-product viewers convert at higher rates
- **Signal**: Users who view 3+ products may be comparison shopping (buying intent)
- **Test**: Segment by products viewed per session, compare conversion rates
- **Action**: Add "Related products" or comparison features

### H4: Search users have higher intent
- **Signal**: Users who search know what they want
- **Test**: Compare conversion rate of searchers vs browsers
- **Action**: Optimise search results, add search suggestions

### H5: Newsletter subscribers convert later
- **Signal**: Newsletter capture creates a retargeting channel
- **Test**: Track time from signup to first purchase
- **Action**: Design email sequences that drive purchase

### H6: Exit-intent popup outperforms delay popup
- **Signal**: Different trigger types may have different conversion rates
- **Test**: Compare `email_popup_shown` trigger types against `newsletter_subscribed`
- **Action**: Optimise popup trigger strategy
