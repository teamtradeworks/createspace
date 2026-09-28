# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: South African parents (and gift-givers) of STEM-curious children, roughly ages 3 to 16, looking for a hands-on kit that matches their child's age and ability. Confirmed as the audience for paid social.

Secondary: educators, teachers, and school decision-makers buying classroom kits, tutoring programmes, curriculum, and short courses (the `/education` section).

## Product Purpose
CREATESPACE is a specialist STEM store and education provider, selling locally in South Africa (prices in ZAR, delivery by The Courier Guy, payments by Stitch). A headless Shopify storefront (`storefront/`, Next.js on Vercel) replaces thecreatespace.co.za. Success is parents finding the right kit for their child quickly and trusting the recommendation.

## Positioning
A curated specialist, not a general toy store: every product is chosen for hands-on, guided learning, with a clear age range and skill level. Range spans six categories: Robotics & Coding, Electronics & Circuits, Building & Mechanics, Earth Sciences, Space & Astronomy, Chemistry (`storefront/src/config/categories.ts`).

## Operating Context
Shoppers browse by age and category on the shop page; product pages follow the content frameworks in `assets/brand/`. Paid social runs on Meta (Pixel via GTM). Prior ad creative lives in `assets/ad-creative/`.

## Capabilities and Constraints
- Free delivery over R1,500; standard delivery R140; next-day available (`storefront/src/config/site.json`).
- Terminology: "Delivery" not "Shipping", "VAT" not "Tax", company name always "CREATESPACE".
- Currency format: R 1,200; comma thousands, period decimals.
- Brands stocked include Arduino, BBC micro:bit, Blockaroo, ELECFREAKS, Makerzoid, MatataStudio, NASA, National Geographic, Snap Circuits.

## Brand Commitments
- Voice: fun, playful, enthusiastic, trustworthy, knowledgeable, inviting. Never elitist, nerdy, corporate, gimmicky, or childish. Banned phrases and humanizer rules in `assets/brand/voice-and-tone.md`.
- Colours: Navy #0C1446 and white are primary grounds; red #F70B28, blue #3CC7F7, purple #AC4DFF, orange #FF8B00, green #93DB21, yellow #FFD500, grey #B3B3B3 are accents.
- Typography: Outfit (SemiBold headlines, Regular body), per the brand CI.
- Assets: logos `assets/design/LOGO/`, illustration elements (robots, atoms, beakers, planets, nuts, chips) `assets/design/ILLUSTRATIONS/ELEMENTS/`, icons `assets/design/ICONS/`.

## Evidence on Hand
Lifestyle photography per product in `assets/product/{slug}/lifestyle/`. No verified customer counts or statistics: never claim "thousands of families" or quote manufacturer stats as our own.

## Product Principles
1. Specific beats sweeping: name ages, projects, and what the child actually builds.
2. Show the kit doing its job rather than proclaiming its importance.
3. STEM is for everyone, regardless of background, gender, or ability.
4. Play is the method; learning is the result.
