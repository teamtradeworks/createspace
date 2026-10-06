# Product

<!-- impeccable:product-schema 1 -->

This record scopes Impeccable to the CREATESPACE storefront in `storefront/`: the website at www.thecreatespace.co.za. Marketing creative is a separate workspace with its own record in `marketing/PRODUCT.md`; both are declared in the root `.impeccable/config.json`. The visual system recorded for this workspace (`DESIGN.md`) is the canonical CREATESPACE system, and the marketing record derives from it.

## Platform

web

## Users

- **Primary: a parent on a phone.** They arrive from an Instagram or Facebook ad (about 30% of sessions come through Meta catalogue links), usually with one kit or one category in mind, and need to decide in a few minutes whether it fits their child: the age, what gets built, whether the child can do it alone, what else is needed, and the price delivered. Then they buy. The four parent personas in `assets/brand/brand-strategy.md` apply: STEM-curious, STEM-valuing, STEM-unfamiliar, and the child looking over a shoulder.
- **Secondary: educators.** Teachers, STEM leads, principals and procurement staff evaluating classroom kits, STEM tutors, curriculum or short courses on `/education` and its four pages. They judge curriculum fit, cost per learner and support, then make contact or buy a course. Personas: `assets/brand/edu-product-content-framework.md`.

Confirmed 2026-10-06: storefront design decisions serve the parent first. Education pages serve educators and are not reworked for parents.

## Product Purpose

CREATESPACE is a South African specialist store for STEM kits and programmes. The storefront exists so a parent (or educator) can understand a product well enough to buy it with confidence. **Success means more completed purchases** (confirmed 2026-10-06): checkout conversion rate and revenue per visit are what future design work is judged against. July 2026 baseline: 0.57% conversion, and 69% of product-page visitors never scroll past the first quarter of the page. Education enquiries, newsletter growth and repeat visits are tracked but secondary.

## Positioning

We curate and explain. Every kit is chosen for age fit and learning value, and each product page answers the parent's questions in plain language: age and skill level, what the child will make, what they will learn, whether they can do it alone, what else is needed, and whether it can be trusted (the Product Clarity and Trust Framework in `assets/brand/brand-strategy.md`). A general toy store or marketplace lists the box; we explain the experience. We are the local, official channel for the brands we carry (MatataStudio, Makerzoid, micro:bit, ELECFREAKS, Snap Circuits, Arduino, National Geographic and others), delivered by The Courier Guy and paid for through Stitch.

## Operating Context

- **Live site.** The Next.js storefront serves www.thecreatespace.co.za (the `www.` host is canonical; Shopify webhooks and ad landing URLs point there). It replaced the previous website.
- **Traffic.** Mostly mobile, mostly from Meta ads and catalogue links that land on product pages or brand-filtered `/shop` URLs such as `/shop?brand=Makerzoid`. Those URLs are live ad infrastructure. UTM attribution is captured on first touch.
- **Buying flow.** Browse (`/shop` with brand, age and category filters; `/search`), product page, cart (`/cart`, with add-on upsells, delivery pricing from `site.json`, and a running Inspire Africa course giveaway for orders over R 1,500 with 25 spots), then Shopify's hosted checkout on the `checkout.` subdomain, paying through Stitch. The Courier Guy delivers in 1 to 3 days; next-day delivery is a paid option at checkout. Products on back-order show "Delivery in 7 - 14 days" instead of In Stock.
- **Sales.** Discounts come from Shopify compare-at prices. A Sale pill appears in the navigation while any product is discounted, and discount badges appear on product cards.
- **Education.** `/education` with four offers: STEM tutors with Robotixkids, curriculum and short courses with Inspire Africa, and classroom kits. Courses are digital: after purchase CREATESPACE sends a QR code for the Inspire Africa platform by hand. Educators reach us through the contact form and info@thecreatespace.co.za.
- **Content pipeline.** Product pages are hand-built from researched content (`assets/product/<handle>/content.md`) with the frameworks in `assets/brand/`, using only the section components in `storefront/src/components/product-sections/`. 71 custom product pages exist; everything else renders through the generic `/product/[handle]` template. `/downloads` holds tutorials and code for electronics kits.
- **Measurement.** PostHog (funnels, recordings, feature flags), GA4 and Meta Pixel through Google Tag Manager, Sentry. Purchases arrive by Shopify webhook and are joined to the browsing session.
- **Newsletters** go out through Resend; any storefront URL with `?join={email}` subscribes that address with one click.

## Capabilities and Constraints

- **Stack.** Next.js 16 App Router, React 19, Tailwind CSS 3.4, deployed to Vercel from GitHub. Catalogue, cart and checkout through the Shopify Storefront API. Product attributes (age range, batteries, projects, soldering, coding platform) come from Shopify metafields.
- **Must work on desktop and mobile.** Mobile is the majority case.
- **Name and words.** Always "CREATESPACE". "Delivery", never "Shipping". "VAT", never "Tax". South African English.
- **Money.** Rand, written `R 1,200`; `R 2,500.99` with comma thousands and period decimals.
- **Delivery facts** live in `storefront/src/config/site.json` (free over R 1,500, standard R 140, next-day R 218, 1 to 3 days). The Shopify Admin shipping rate is what is actually charged, so the two change together.
- **South Africa only.** No international delivery or pricing claims.
- **Engineering rules** (from the root `CLAUDE.md`): internal links use `next/link`; images live in `storefront/public/images/` and render through `next/image`, with `priority` above the fold; exactly one `<h1>` per page; every page exports metadata; new pages join the sitemap; lint, unit tests, knip and build must pass before pushing; CI also runs Playwright end-to-end tests and Lighthouse.
- **Reviews.** Product reviews come from Fera (`ProductReviews`, loaded lazily on product pages).
- **Undecided.** Whether a formal accessibility standard beyond the Lighthouse gate will be adopted. Whether the company profile PDF is offered as a download on the site.

## Brand Commitments

- **Voice** follows `assets/brand/voice-and-tone.md` and `assets/brand/brand-strategy.md`: fun, playful, enthusiastic, trustworthy, knowledgeable, inviting. Never elitist, complicated, nerdy, dry, gimmicky, corporate or childish. Sentence-case headings. The voice guide's banned phrase lists apply to every page ("inspire the next generation", "unlock potential", "empower", "journey", "join thousands of families", manufacturer school counts). No em dashes or en dashes in copy.
- **Identity** comes from the CI guide (`assets/design/CI/CREATE-SPACE_CI_FINAL.pdf`): the CREATESPACE logo (white version on navy, dark version on white), the Outfit typeface (SemiBold for headings, Regular for body), navy and white as the only grounds, and red, orange, blue, yellow, green, purple and grey as accents. Brand illustrations (robots, atoms, beakers, planets) from `assets/design/ILLUSTRATIONS/ELEMENTS/` and icons from `assets/design/ICONS/` appear sparingly between content. The incumbent website is the visual authority and `DESIGN.md` records it.
- **Audience separation.** A page talks to parents or to educators, never both. Product pages follow the parent framework; education pages follow the educator one.

## Evidence on Hand

- **Product photography** for about 69 products in `storefront/public/images/products/<handle>/`, copied from `assets/product/<handle>/` (lifestyle, end-user, projects, animations), plus Shopify's own product images.
- **Testimonials:** three named quotes in `storefront/src/components/HomeTestimonials.tsx` (a parent of a 9-year-old, an educational psychologist in Durban, the founder of JustMi-Kid) and five named references in the company profile. These are the only testimonials; do not invent others.
- **Reviews:** Fera product reviews where customers have left them.
- **Company facts:** `assets/company-profile/README.md` lists 120+ schools supplied and R 8m+ annual recurring revenue (supplied by the founder; keep a defensible source before quoting) and founded 2021 (from the CIPC registration). The team is based in Cape Town.
- **Partner brand logos** in `assets/company-profile/assets/img/brands/` and `marketing/creative/kit/`.
- **Absent, never fabricate:** review counts or star ratings not returned by Fera, customer numbers, "bestseller" badges, awards, press mentions, and manufacturers' global statistics presented as ours.

## Product Principles

1. **Answer the parent's six questions on every product.** Age and skill, what gets made, what is learnt, how independently, what else is needed, and why it can be trusted. A page that leaves one unanswered loses the sale.
2. **Plain language over jargon.** "Build a robot that actually moves" beats "advanced servo technology". The STEM-unfamiliar parent must never feel talked down to or left behind.
3. **Show the thing the child makes.** Real photos of builds and children mid-build carry more than any abstract STEM graphic.
4. **Every claim is checkable.** Prices and delivery numbers trace to Shopify and `site.json`; proof traces to a named testimonial, a Fera review or the company profile.
5. **Specialist, not toy shop.** Playful and warm, never childish, discount-bin or corporate.

## Accessibility & Inclusion

- **Requirement (confirmed 2026-10-06): the Lighthouse CI accessibility gate.** `storefront/lighthouserc.js` fails below a score of 90 for accessibility, best practices and SEO, and warns below 80 for performance. No formal WCAG level has been adopted. Existing contrast decisions follow AA (for example navy, not white, labels on orange) and every animation is opt-in through `prefers-reduced-motion`; future work keeps both.
- **STEM is for everyone.** Imagery and copy show girls and boys and children of different backgrounds, and never imply a subject belongs to one group.
