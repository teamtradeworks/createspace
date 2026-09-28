# Product

<!-- impeccable:product-schema 1 -->

This record scopes Impeccable to CREATESPACE marketing creative: paid social ads, flyers, posters and other campaign pieces made in `marketing/`. The storefront in `storefront/` is a separate surface with no PRODUCT.md of its own; the facts below about the business apply to both.

## Platform

web

## Stack

Static HTML/CSS, one file per asset, rendered to PNG (screen) or PDF (print) with headless Google Chrome via `marketing/scripts/render.sh`. No framework and no build step. Fonts, logos and illustrations come from the shared kit in `marketing/creative/kit/` and each campaign keeps its own photos, so a render never reaches outside `marketing/`. See `marketing/creative/README.md` for the workflow and `marketing/creative/formats.md` for canvas specs.

## Users

Two audiences, and every campaign declares which one it is talking to. A single asset never tries to address both.

- **Parents** (B2C). South African parents buying STEM kits for children from Grade R to Grade 12, usually as gifts or to extend an interest the child already has. They meet our ads while scrolling Instagram or Facebook on a phone, and meet our flyers at markets, school events, or in a parcel. Their job: decide in a few seconds whether this is right for their child, then tap through. The four parent personas in `assets/brand/brand-strategy.md` apply.
- **Educators** (B2B). Teachers, STEM leads, principals and procurement staff choosing classroom kits, STEM tutors, curriculum, or courses. They meet our pieces as an email attachment, a flyer at an education expo, or a poster in a staff room. Their job: judge curriculum fit, cost per learner, and support, then make contact. The personas in `assets/brand/edu-product-content-framework.md` apply.

Children influence purchases and often see the ads over a parent's shoulder, but they are not the reader we write for.

## Product Purpose

CREATESPACE is a specialist South African online store for STEM kits and programmes. It is not a general toy store. Marketing creative exists to bring the right parent or educator to the right page on thecreatespace.co.za, and every asset is judged by whether it earns that tap or scan. Success is measured in PostHog and GA4 through the UTM parameters on each asset's landing URL.

## Positioning

We curate. Every kit is chosen for its age fit and learning value, and we explain it in plain language: what the child will build, what they will learn, whether they can do it alone. We are the local, official distributor for the brands we carry, delivered by The Courier Guy and paid for securely through Stitch.

## Operating Context

- **Channels.** Formats vary by campaign. Meta (Instagram and Facebook) feed, stories and reels are the main paid channel. Print flyers, posters and one-pagers support markets, school events, expos and parcels. Canvas sizes and safe zones live in `marketing/creative/formats.md`.
- **Printing.** Undecided per piece. Print assets are built with 3mm bleed so they can go to a print shop, and the same source can export a trimmed PDF for office printing.
- **Landing pages.** Meta ads commonly land on brand-filtered `/shop` URLs (for example `/shop?brand=Makerzoid`) or product pages. These URLs are live ad infrastructure: check the destination exists before an asset ships.
- **Attribution.** Every asset's destination carries `utm_source`, `utm_medium`, `utm_campaign` and `utm_content`. Existing Meta campaigns use `utm_source=meta` with `utm_medium=paid`; keep to that so reports stay comparable. Print pieces carry a QR code to the UTM-tagged URL, and print the short `www.thecreatespace.co.za/...` address beside it for people who won't scan.
- **Campaign planning and results** live in `marketing/campaigns/<campaign>/`. Analytics context lives in `marketing/overview.md` and `marketing/user-journeys.md`.

## Capabilities and Constraints

- **Name.** Always "CREATESPACE", all caps.
- **Words.** "Delivery", never "Shipping". "VAT", never "Tax".
- **Money.** Rand, written `R 1,200` (space after R, comma thousands, period decimals: `R 2,500.99`).
- **Delivery facts** come from `storefront/src/config/site.json` and must match it: currently free delivery over R 1,500, standard R 140, next-day available at checkout. Never hard-code a delivery number from memory.
- **Prices and sale percentages** must match Shopify at the time the asset ships. A sale asset names its end date or is pulled when the sale ends.
- **We sell locally only.** No international delivery claims.
- **Meta text.** Meta no longer rejects text-heavy images, but less text on the image performs better. The headline on the image is short; the long copy goes in the ad's primary text field.
- **Undecided.** Whether a print shop or office printer is used, per piece. Whether video or motion ads are in scope (static only for now).

## Brand Commitments

- **Voice** follows `assets/brand/voice-and-tone.md` and `assets/brand/brand-strategy.md`: fun, playful, enthusiastic, trustworthy, knowledgeable, inviting. Never elitist, complicated, nerdy, dry, gimmicky, corporate or childish.
- **Banned in copy:** em dashes and en dashes, and the phrase lists in the voice guide ("inspire the next generation", "unlock potential", "empower", "journey", "join thousands of families", manufacturer school counts, and the rest). Run drafted copy through the `humanizer` skill as a last pass.
- **Visual identity matches the website.** Marketing creative inherits the storefront's visual system, recorded in `marketing/DESIGN.md`. The logo, colours and Outfit typeface come from the CI guide (`assets/design/CI/CREATE-SPACE_CI_FINAL.pdf`).
- **Brand assets:** ready-to-use copies of the fonts, logos and illustrations are in `marketing/creative/kit/`. Originals: logos in `assets/design/LOGO/` (DARK on navy, LIGHT on white), illustrations in `assets/design/ILLUSTRATIONS/ELEMENTS/`, icons in `assets/design/ICONS/`, fonts in `assets/design/Outfit/`.
- **Partner brand logos** (MatataStudio, Makerzoid, micro:bit, ELECFREAKS, Snap Circuits, Arduino and others) sit on white. Several carry baked-in white boxes or dark artwork that disappears on navy.

## Evidence on Hand

- **Product photography:** `assets/product/<handle>/lifestyle/` (professional), `end-user/` (customer photos), `projects/`, `animations/`, for most of the ~65 researched products.
- **Product facts:** `assets/product/<handle>/content.md` research notes, plus the live Shopify catalogue.
- **Testimonials:** the named quotes in `storefront/src/components/HomeTestimonials.tsx` are the source of truth. Confirm they are cleared for advertising before using one in an ad.
- **Company facts:** `assets/company-profile/README.md` lists figures (120+ schools supplied, founded 2021) with notes on how current and defensible each is. Check there before quoting a number.
- **Previous creative:** `assets/ad-creative/makerzoid-sale/` (Meta ads, HTML) and `assets/company-profile/` (A4 print, HTML to PDF).
- **Absent, never fabricate:** review counts, star ratings, customer numbers, "bestseller" claims, awards, press mentions, and any manufacturer's global statistics presented as ours.

## Product Principles

1. **Show the thing the child makes.** A finished build or a child mid-build beats any abstract STEM graphic. People don't buy what they can't picture.
2. **One asset, one reader, one action.** Parent or educator, never both. One destination and one clear next step.
3. **Specific over superlative.** "Build 15 projects, from alarms to light shows" beats "endless possibilities". Age, what's in the box, and price earn the tap.
4. **Every claim is checkable.** Prices, delivery thresholds, sale dates and testimonials trace back to a source in this repo or Shopify.
5. **Specialist, not toy shop.** Playful but never childish or discount-bin. The work should feel like it comes from people who know the products.

## Accessibility & Inclusion

- **STEM is for everyone.** Imagery and copy show girls and boys and children of different backgrounds, and never imply a subject belongs to one group.
- **Legibility.** Text meets WCAG AA contrast against its background. Feed ads must survive being viewed at thumbnail size on a phone. Print body copy stays at 9pt or larger.
