# Tale-Bot Pro: A gift they'll still be using in January

## Summary

- **Campaign slug:** `2026-10-tale-bot-gift-january` (also the `utm_campaign` value)
- **Type:** Product, gifting (ad brief G1)
- **Audience:** Parents and grandparents buying a Christmas gift for a 3 to 6 year old
- **Runs:** October 2026 into the Christmas run-up. No offer, no end date.
- **Owner:** Dylan
- **Status:** Draft

## The one thing

Most gifts are forgotten by New Year. Tale-Bot Pro is coded with the buttons on its back, needs no screen, and keeps a small child busy long after the wrapping paper is gone.

## Subject

| Product | Shopify handle | Price | Ages | Research notes |
|---|---|---|---|---|
| MatataStudio Tale-Bot Pro | `matatastudio-tale-bot-pro` | R 2,280 | 3-6 | `assets/product/matatastudio-tale-bot-pro/content.md` |

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Price | R 2,280 | Ad brief G1; matches `2026-10-tale-bot-coding-at-3/brief.md` | Recheck in Shopify before upload |
| Ages | 3-6 | Ad brief G1; matches the A1 and gran-chat briefs | 2026-10-22 |
| Delivered in 1-3 days | "1-3 days to your door" | `storefront/src/config/site.json` | 2026-10-22 |
| Coded with buttons, no screen | Button coding on the robot | `content.md` | 2026-10-22 |

**Not claiming:** free delivery, Christmas delivery cut-off dates, awards, review counts.

## Layout

- Navy ground, 72px margins, wordmark top left.
- Headline Outfit ExtraBold 96px, white, "January." in yellow.
- Lower left: kraft gift tag (`#D8B98A`), chamfered top corners, punched hole with a reinforcement ring and a twine loop, tilted -6 degrees with a soft shadow. Handwritten note in Caveat SemiBold, dark brown (`#4A2C17`), with the "0" circled in the same marker.
- Lower right: product photo on a white card bleeding off the right edge, the tag overlapping its left edge.
- Footer: product name and ages, price and delivery line, red "Shop gifts" pill.
- Story: the same stack, padded 290px at the top and bottom to clear Meta's UI, with a taller card. The shared layout is `gift-tag.css`; each canvas only moves the card, tag and footer.

## Assets

| File | Canvas | Channel | Destination | Link checked |
|---|---|---|---|---|
| `feed-portrait.html` | `meta-portrait` | Meta feed | `https://www.thecreatespace.co.za/product/matatastudio-tale-bot-pro?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-tale-bot-gift-january&utm_content=feed-portrait` | No |
| `story.html` | `meta-story` | Meta stories | `https://www.thecreatespace.co.za/product/matatastudio-tale-bot-pro?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-tale-bot-gift-january&utm_content=story` | No |

## Imagery

| File in `images/` | Source | Shows |
|---|---|---|
| `talebot-pro-pens-white.jpg` | `assets/product/matatastudio-tale-bot-pro/projects/tale-bot-pro-drawing-white-background.jpg` | Tale-Bot Pro with two felt-tip pens in its Lego side plates, on white |

## Ad copy (Meta)

- **Primary text:** Most presents are forgotten by New Year. Tale-Bot Pro isn't. Your little one codes it with the buttons on its back, so there's no screen, no app and no reading. Ages 3-6, R 2,280, delivered in 1-3 days.
- **Headline:** A gift they'll still be using in January
- **Button:** Shop now

## Notes

- The brief wrote the price as "R2,280". The image uses "R 2,280" to follow the house money format.
- The CTA is red, as the brief asks, rather than the system's orange action colour. Headline weight 800 and the 96px size are also from the brief.
- Caveat (OFL) was added to `creative/kit/fonts/` for the handwriting, with its licence in `Caveat-OFL.txt`.

## Open questions

- Recheck the R 2,280 price in Shopify before upload. The Shopify connector was down when this was built.
- "Shop gifts" suggests a gift collection, but the destination is the product page. Change the destination if a gifts page or collection goes live.
