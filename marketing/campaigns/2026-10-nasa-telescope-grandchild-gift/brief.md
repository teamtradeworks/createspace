# NASA Lunar Telescope: For the grandchild

## Summary

- **Campaign slug:** `2026-10-nasa-telescope-grandchild-gift` (also the `utm_campaign` value)
- **Type:** Product (gifting)
- **Audience:** Parents, here grandparents buying a gift. Runs in a 55+ ad set.
- **Runs:** October 2026 into the Christmas run-up. No offer, no end date.
- **Status:** Draft. **Blocked on NASA licensor review** (see below).

## The one thing

A real telescope is the gift for the grandchild who asks about everything, and it's something they can use straight away in the garden.

## Subject

| Product | Shopify handle | Price | Ages | Research notes |
|---|---|---|---|---|
| NASA Lunar Telescope (Blue Marble) | `nasa-lunar-telescope` | R 1,150 | 8+ | `assets/product/nasa-lunar-telescope/content.md` |

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Price | R 1,150 | Live product page JSON-LD (`"price":"1150.0"`, ZAR) | 2026-10-22 |
| Ages | 8+ | Research notes (8+, core 8-13); changed from the brief's 8-12 on request | 2026-10-22 |
| Officially licensed NASA | Blue Marble, NASA licensed product | `assets/product/nasa-lunar-telescope/content.md` | 2026-10-22 |
| Delivered in 1-3 days | "1-3 days to your door" | `storefront/src/config/site.json` | 2026-10-22 |
| 30-day returns | 30-day return window, unused and in original packaging | `storefront/src/app/refund/page.tsx`, `contact/page.tsx` FAQ | 2026-10-22 |

**Not claiming:** free delivery (R 1,150 is under the R 1,500 threshold), magnification figures, star ratings, "bestseller", Blue Marble's Toy of the Year award.

## Assets

| File | Canvas | Channel | Landing URL (with UTMs) | Link checked |
|---|---|---|---|---|
| `feed-portrait.html` | `meta-portrait` | Meta feed | `https://www.thecreatespace.co.za/product/nasa-lunar-telescope?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-nasa-telescope-grandchild-gift&utm_content=feed-portrait` | 200 OK 2026-10-22 |

## Imagery

| File in `images/` | Source | Shows |
|---|---|---|
| `nasa-lunar-telescope-white.jpg` | `assets/product/nasa-lunar-telescope/shopify/cover-image.png`, eyepieces and booklet painted out, cropped to the telescope, 706x900 | Telescope on its tripod on white, NASA meatball on the tube |

## Design notes

- Warm cream ground `#FBF6EC` instead of navy or white, for a softer gift feel. Navy text throughout.
- Type is set larger than the age-series ads for older readers: headline 96px bold, body 34px, ticks 30px semibold, product name and CTA 34px.
- "everything." sits on a yellow highlighter band, tilted 1.4deg so it reads as drawn by hand.
- Left column holds the body and three green tick marks; the telescope sits on a 530px white circle on the right with a soft shadow.
- Footer under a hairline: product name, price and domain, red "Shop gifts" pill.
- Money is written `R 1,150` (house format, with the space).

## NASA licensor review

**Required before launch.** The ad says "Officially licensed NASA" and the product photo shows the NASA insignia on the telescope tube. NASA's brand guidelines restrict use of the insignia and the NASA name in advertising, and licensed-product ads normally go through the licensee (Blue Marble) for approval. Send the rendered PNG and the ad copy below to Blue Marble / the NASA licensing contact and record the outcome here before upload.

- [ ] Sent for review (date, to whom)
- [ ] Approved, or changes requested

## Ad copy (Meta)

- **Primary text:** Got a grandchild who never stops asking questions? This one's a real telescope, for ages 8 and up, that shows the craters on the moon from your own garden. Officially licensed NASA, R 1,150, delivered by The Courier Guy in 1-3 days.
- **Headline:** A real telescope for ages 8+
- **Description:** 30-day easy returns
- **Button:** Shop now

## Open questions

- "Shop gifts" on the image, but the landing page is the product page. If a gifts collection page goes live, consider pointing the ad there; otherwise the button label on Meta stays "Shop now".
- Run `marketing/scripts/check-links.sh` on this folder again before shipping.
