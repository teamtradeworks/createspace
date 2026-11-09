# Christmas gift guide

## Summary

- **Campaign slug:** `2026-12-christmas-gift-guide` (also the `utm_campaign` value)
- **Type:** Product (three kits shown together as a gift guide)
- **Audience:** Parents
- **Persona:** Parents buying a Christmas gift for their own child, ages 6 to 14 (the ad itself doesn't state an overall age range, so it doesn't suggest we only stock those ages) (`assets/brand/brand-strategy.md`)
- **Runs:** 1 December 2026 to about 18 December 2026, so orders arrive before Christmas
- **Owner:** Hayley
- **Status:** Approved (2026-11-09)

## The one thing

These are gifts your child will still be playing with in January, long after the wrapping paper is gone. No sale and no discount: the ad shows the kits, their ages and why each one keeps going.

Builds on the "A gift they actually use" angle (Google ROAS 5.55) and the gift-tag concept in `2026-10-hero-kits`.

## Subject

**Product(s):**

| Product | Shopify handle | Price | Ages | Why it lasts past Christmas Day | Research notes |
|---|---|---|---|---|---|
| Makerzoid Robot Master Premium | `makerzoid-robot-master-premium` | R 2,380 | 6-14 | 600+ pieces, 200+ robot models, 47 video lessons | `assets/product/makerzoid-robot-master-premium/content.md` |
| Snap Circuits Explorer Junior | `snap-circuits-explorer-junior` | R 1,350 | 8-12 | 101 projects (doorbell, burglar alarm, AM radio); snap together, no soldering | `assets/product/snap-circuits-explorer-junior/content.md` |
| MatataStudio VinciBot Coding Robot Set | `matatastudio-vincibot-coding-robot-set` | R 2,550 | 8-12 | Codes with blocks or Python; 8 sensors; 75 activity cards plus an 18-challenge booklet | `assets/product/matatastudio-vincibot-coding-robot-set/content.md` |

Price span: R 1,350 to R 2,550. All three were in stock on 2026-11-09.

Cut from five kits to three on 2026-11-09 (Hayley: too much copy), then Tale-Bot Pro (3-6) swapped for VinciBot so all three suit a similar age group (6 to 14). Light-Up Air Rockets and Tale-Bot Pro were dropped; the Glow-in-the-Dark Human Body was out of stock.

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Prices and stock | As in the Subject table | Live product page JSON-LD (Shopify MCP was unavailable) | 2026-11-09 |
| Ages | As in the Subject table | Age badge on the live product page (`custom.minimum_age` / `maximum_age`) | 2026-11-09 |
| Ages 6 to 14 across the three | Robot Master 6-14; Snap Circuits and VinciBot 8-12 | Same | 2026-11-09 |
| VinciBot coding | Block coding and Python; 8 sensors; 75 activity cards and 18 challenges | `content.md` | 2026-11-09 |
| Robot Master contents | 600+ pieces, 200+ robot models, 47 video lessons | `content.md` | 2026-11-09 |
| Explorer Junior projects | 101 projects including a burglar alarm, 30 parts, no soldering or tools | `content.md` | 2026-11-09 |
| Delivery | Free over R 1,500; otherwise R 140; 1-3 days, The Courier Guy | `storefront/src/config/site.json` | 2026-11-09 |

**Not claiming:** any discount or sale (there isn't one); "arrives before Christmas" or a last order date (not confirmed, see Open questions); "bestseller", ratings or customer counts; next-day delivery; that most toys are forgotten (no data).

## Assets

| File | Canvas | Channel | Landing URL (with UTMs) | Link checked |
|---|---|---|---|---|
| `feed-portrait.html` | `meta-portrait` | Meta feed (lead asset) | `https://www.thecreatespace.co.za/shop?utm_source=meta&utm_medium=paid&utm_campaign=2026-12-christmas-gift-guide&utm_content=feed-portrait` | 200 OK 2026-11-09 |
| `feed-square.html` | `meta-square` | Meta feed | `https://www.thecreatespace.co.za/shop?utm_source=meta&utm_medium=paid&utm_campaign=2026-12-christmas-gift-guide&utm_content=feed-square` | 200 OK 2026-11-09 |
| `story.html` | `meta-story` | Meta stories | `https://www.thecreatespace.co.za/shop?utm_source=meta&utm_medium=paid&utm_campaign=2026-12-christmas-gift-guide&utm_content=story` | 200 OK 2026-11-09 |

The ad lands on the unfiltered `/shop` because there's no gift page and the three kits span categories and ages. The on-image CTA reads "Shop STEM gifts" rather than "Shop the list" for that reason.

**Design:** a child's wish list to Father Christmas on a tilted notepad page, each wish ticked and matched to the real kit and its age, with a taped photo beside it. Shared styles in `wish-list.css`.

## Imagery

| File in `images/` | Source | Shows |
|---|---|---|
| `kids-building-makerzoid-robot.jpg` | `assets/product/makerzoid-robot-master-premium/lifestyle/kids-playing-with-pieces-with-tablet-instructions.png` (1000 x 666) | Two children building on the floor, finished robot and tablet beside them |
| `boy-building-snap-circuits.jpg` (resized to 1200 wide) | `assets/product/snap-circuits-explorer-junior/lifestyle/child-sitting-at-table-playing-with-circuits.png` (2000 x 1600) | Boy in a red jumper building a circuit at a table |
| `vincibot-on-line-track.jpg` | `assets/product/matatastudio-vincibot-coding-robot-set/lifestyle/vincibot-close-up-on-line-following-map.jpeg` (1000 x 1000) | Orange VinciBot on a line-following track, studio shot |

Each file carries its origin as an embedded comment. Girls and boys both appear.

## Ad copy (Meta)

- **Primary text:**

  > The best Christmas gifts are the ones still on the floor in January. Here are three that keep going:
  >
  > Makerzoid Robot Master Premium (ages 6-14): 600+ pieces and 200+ robots to build and code. R 2,380
  >
  > Snap Circuits Explorer Junior (ages 8-12): 101 projects, from a doorbell to a burglar alarm. R 1,350
  >
  > VinciBot (ages 8-12): a robot they code themselves, with 8 sensors and 93 challenges to work through. R 2,550
  >
  > Free delivery on orders over R 1,500.

- **Headline:** Gifts they'll still use in January
- **Description:** Free delivery over R 1,500
- **Button:** Shop now

**On-image headline:** "Unwrapped in December. Still playing in January."

Copy follows `voice-and-tone.md`: no dashes, no banned phrases, money as `R 1,500`. The humanizer rules were applied by hand, without running the skill.

## Constraints

- Christmas styling stays on brand: navy and white with accent colours, Outfit, with Caveat only for the child's handwriting. The festive touch is "Dear Father Christmas" and one doodled star, not snow or red-and-green.
- Keep partner logos off navy (`marketing/PRODUCT.md`). The kits are named without logos.
- Prices stay in the primary text only and must be rechecked on the live pages just before upload on 1 December.

## Open questions

1. **Last order date for Christmas delivery.** Do we want to tell people "order by [date]" for delivery before 25 December? It needs a date confirmed with The Courier Guy. Until then the ad makes no delivery-by-Christmas promise.
2. **Carousel version.** The square format could also run as a three-card carousel with each card going to its product page. Worth adding?
