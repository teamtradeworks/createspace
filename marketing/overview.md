# Current State Assessment

*Last updated: 2026-04-17*

## Business Context

CREATESPACE is a South African online STEM education store targeting parents (B2C) and educators (B2B). The storefront is a headless Shopify store built with Next.js, deployed on Vercel.

- **Currency**: ZAR (South African Rand)
- **Delivery**: The Courier Guy, free over R 1,500, standard R 128, next-day R 218
- **Payments**: Stitch (stitch.money)
- **Lead time**: 7-14 days for non-stock items

## Site Structure & User Entry Points

### Consumer Pages (B2C - Parents)
| Page | Purpose |
|------|---------|
| `/` (Homepage) | Brand intro, hero carousel, featured products |
| `/shop` | Full product catalogue |
| `/product/[handle]` | Individual product pages (39 custom pages) |
| `/cart` | Shopping cart |
| `/search` | Product search |
| `/about` | Brand story |
| `/contact` | Contact form |
| `/delivery-policy` | Delivery info |

### Education Pages (B2B - Educators)
| Page | Purpose |
|------|---------|
| `/education` | Education hub landing |
| `/education/stem-tutors` | Robotixkids tutor partnerships |
| `/education/curriculum` | Inspire Africa curriculum platform |
| `/education/classroom-kits` | Bulk classroom kits |
| `/education/courses` | Online STEM courses |

### Product Catalogue
39 custom product pages across these brands:
- **Arduino** (5 products) - Electronics/IoT kits
- **BBC micro:bit** (3 products) - Coding microcontrollers
- **Elecfreaks** (3 products) - micro:bit accessories
- **Makerzoid** (7 products) - Building/robotics kits
- **MatataStudio** (12 products) - Early coding & robotics
- **Snap Circuits** (5 products) - Electronics circuits
- **Other** (4 products) - Starter kits, coding course

## Analytics Stack

### Primary Tools
- **PostHog** — Product analytics, funnels, session recordings, heatmaps, user identification, feature flags, A/B testing
- **Google Analytics (GA4)** — Traffic sources, campaign attribution, audience demographics, ecommerce reporting, UTM tracking

### What We Track Well
- **Full ecommerce funnel**: product view → add to cart → cart view → checkout → purchase
- **Product engagement**: section visibility, scroll depth, time on section
- **Search behaviour**: queries and results viewed
- **Newsletter funnel**: popup shown → dismissed vs subscribed
- **User identification**: email-based via newsletter signup, contact form, checkout
- **Addon interactions**: which addons are selected/deselected on product pages
- **Traffic attribution**: GA4 captures UTM parameters, referral sources, organic search
- **Ecommerce events in GA4**: view_item, add_to_cart, view_cart, begin_checkout, search

### Gaps in Tracking
- ~~No purchase completion event~~ — **RESOLVED**: Shopify `orders/create` webhook fires `purchase_completed` event in PostHog (endpoint: `/api/webhooks/shopify/orders`).
- ~~No UTM/campaign attribution in PostHog~~ — **RESOLVED**: First-touch UTM params are now captured as PostHog user properties (`initial_utm_*`) and registered on all session events. GTM ecommerce events also include UTM attribution.
- **No returning visitor segmentation** — we identify users by email but don't segment first-time vs returning visitors in a structured way.
- **No product listing engagement** — we track product page views but not which products users see/scroll past on `/shop` or collection pages.
- **No exit intent tracking** — we show a newsletter popup on exit intent but don't track broader exit patterns.
- **No post-purchase behaviour** — no data on repeat purchases, review submissions, or referral activity.

## Customer Segments (from Brand Strategy)

| Segment | Description | Key Need |
|---------|-------------|----------|
| STEM-curious parents | Child already interested in STEM | Next challenge, skill progression |
| STEM-valuing parents | Appreciate STEM for future success | Clear learning outcomes, trust |
| STEM-unfamiliar parents | Open but intimidated | Reassurance, simple entry points |
| Educators | Schools, teachers, institutions | Curriculum alignment, bulk pricing, support |
| Children | Grade R-12, influence purchases | Fun, cool results, achievement |

## Key Questions to Answer

### Conversion
1. What is the overall conversion rate (visit → checkout)?
2. Where in the funnel do users drop off most?
3. Which products have the highest/lowest conversion rates?
4. Do addons increase or decrease checkout completion?
5. What is the average cart value? Does free delivery threshold (R 1,500) influence cart size?

### User Behaviour
6. What is the typical user journey (pages visited before purchase)?
7. How do users discover products (search, browse, direct)?
8. Which product page sections get the most engagement?
9. How deep do users scroll on product pages?
10. Do users compare products (visit multiple product pages)?

### Retention & Engagement
11. What percentage of visitors return?
12. Does newsletter signup correlate with purchase?
13. What is the email popup conversion rate?
14. How effective is the exit-intent trigger vs delay trigger?

### Traffic & Campaigns
15. Which traffic sources drive the highest-converting visitors?
16. What search terms do users enter? Do they find what they need?
17. Which pages have the highest bounce rates?
18. Is mobile vs desktop performance significantly different?

### Education (B2B)
19. How much traffic do education pages get vs consumer pages?
20. Do education visitors convert differently (contact form vs purchase)?
