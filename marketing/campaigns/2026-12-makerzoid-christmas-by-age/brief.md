# Makerzoid Christmas gifts by age

## Summary

- **Campaign slug:** `2026-12-makerzoid-christmas-by-age` (also the `utm_campaign` value)
- **Type:** Partner brand (Makerzoid), organised by age
- **Audience:** Parents
- **Persona:** Parents (and grandparents) who want a STEM Christmas gift but don't know which kit suits the child (`assets/brand/brand-strategy.md`)
- **Runs:** 1 December 2026 to about 18 December 2026
- **Owner:** Hayley
- **Status:** Draft

## The one thing

Makerzoid has a Christmas gift for every stage, from a first building set at 5 to sensor-packed robots for 10 to 14 year olds. Start with the child's age and we've already done the choosing. No sale and no discount.

Sister campaign to `2026-12-matatastudio-christmas-by-age`, same design.

## Subject

**Partner brand:** Makerzoid, shop filter `/shop?brand=Makerzoid` (200 OK 2026-11-26).

Makerzoid doesn't cover 3-5 or 13+, so the pills show each kit's own age from its live product page rather than the homepage age groups. The four pill colours keep the same red, green, blue, purple order as a sequence; they don't map to the homepage age tiles here.

| Pill | Kit shown | Shopify handle | Line on the card | Stock |
|---|---|---|---|---|
| Ages 5-8 (red) | Diverse Building Blocks | `makerzoid-diverse-building-blocks` | **Build only:** no coding | In stock |
| Ages 6-10 (green) | Superbot | `makerzoid-superbot` | **Build + code:** first robot | In stock |
| Ages 6-14 (blue) | Robot Master Premium | `makerzoid-robot-master-premium` | **Build + code:** 200+ robots | In stock |
| Ages 10-14 (purple) | Superbot Master Premium | `makerzoid-superbot-master-premium` | **Build + code:** smart sensors | In stock |

Ages are the live product page badges (`custom.minimum_age` / `maximum_age`), stock from the live JSON-LD, both checked 2026-11-26. Robot Master Tournament (10-14) was considered but its teal case looks almost identical to Robot Master Premium's, so the yellow Superbot Master Premium case is used instead. No prices on the image: the live prices on 2026-11-26 are Black Friday prices and will change before this runs.

The line above each kit name follows one pattern so the four read as a set: a bold navy label for what kind of kit it is, a colon, then what sets it apart in grey (changed 2026-11-26 from four unrelated descriptions).

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Kit ages and stock | As in the Subject table | Live product pages | 2026-11-26 |
| Diverse Building Blocks | **Build only:** no coding | `assets/product/makerzoid-diverse-building-blocks/content.md`, box | 2026-11-26 |
| Superbot | Makerzoid's first programmable building block set | `assets/product/makerzoid-superbot/content.md` | 2026-11-26 |
| Robot Master Premium | 600+ pieces, 200+ robot models | `assets/product/makerzoid-robot-master-premium/content.md` | 2026-11-26 |
| Superbot Master Premium | 72+ models; colour and greyscale sensors | `assets/product/makerzoid-superbot-master-premium/content.md` | 2026-11-26 |
| Delivery | Free over R 1,500, otherwise R 140, 1-3 days with The Courier Guy | `storefront/src/config/site.json` | 2026-11-26 |

**Not claiming:** prices on the image; any sale or discount; delivery before Christmas or a last order date (not confirmed); "bestseller", ratings or customer counts; next-day delivery.

## Assets

| File | Canvas | Channel | Landing URL (with UTMs) | Link checked |
|---|---|---|---|---|
| `feed-portrait.html` | `meta-portrait` | Meta feed (lead asset) | `https://www.thecreatespace.co.za/shop?brand=Makerzoid&utm_source=meta&utm_medium=paid&utm_campaign=2026-12-makerzoid-christmas-by-age&utm_content=feed-portrait` | Filter page 200 OK 2026-11-26 |
| `feed-square.html` | `meta-square` | Meta feed | `https://www.thecreatespace.co.za/shop?brand=Makerzoid&utm_source=meta&utm_medium=paid&utm_campaign=2026-12-makerzoid-christmas-by-age&utm_content=feed-square` | Filter page 200 OK 2026-11-26 |
| `story.html` | `meta-story` | Meta stories | `https://www.thecreatespace.co.za/shop?brand=Makerzoid&utm_source=meta&utm_medium=paid&utm_campaign=2026-12-makerzoid-christmas-by-age&utm_content=story` | Filter page 200 OK 2026-11-26 |

**Design:** the MatataStudio gift-wrapped layout (see that campaign's brief), with these differences in this folder's `gift-box.css`: the packshots are zoomed 1.22x and clipped to their area, because the Makerzoid images carry wide empty margins; the bow is smaller (184px on the portrait) and kit names are 33px on one line, so the long names (Diverse Building Blocks, Superbot Master Premium) clear the bow. Supporting line: "Our Makerzoid picks, from first build to smart robots." CTA: "Shop Makerzoid". The story runs from y 236 to 1684, slightly inside Instagram's covered zones; check the Ads Manager preview before upload.

## Imagery

Packshots from the Shopify CDN (each product's first image), resized to 700px:

| File in `images/` | Product |
|---|---|
| `diverse-building-blocks-box.png` | Diverse Building Blocks box |
| `superbot-box.jpg` | Superbot box |
| `robot-master-premium-case.png` | Robot Master Premium case |
| `superbot-master-premium-case.png` | Superbot Master Premium case |

## Ad copy (Meta)

- **Primary text:**

  > Not sure which STEM gift to get this Christmas? Start with their age.
  >
  > Our Makerzoid picks for every stage:
  >
  > Ages 5-8: Diverse Building Blocks, 370+ pieces and 100+ models to build, no coding needed
  > Ages 6-10: Superbot, their first robot to build and code
  > Ages 6-14: Robot Master Premium, 600+ pieces and 200+ robots
  > Ages 10-14: Superbot Master Premium, smart sensors and 72+ builds
  >
  > Free delivery on orders over R 1,500.

- **Headline:** Makerzoid gifts for every age
- **Description:** Free delivery over R 1,500
- **Button:** Shop now

**On-image headline:** "Christmas gifts, sorted by age."

## Open questions

1. Last order date for Christmas delivery (needs The Courier Guy cut-off).
2. A four-card carousel, one card per kit to its product page.
