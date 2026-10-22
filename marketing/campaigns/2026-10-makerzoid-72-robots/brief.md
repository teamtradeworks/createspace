# Makerzoid: This one has 72 robots in it

## Summary

- **Campaign slug:** `2026-10-makerzoid-72-robots` (also the `utm_campaign` value)
- **Type:** Product (ad brief G3 of the gifting series: gifting, durability)
- **Audience:** Parents
- **Persona:** Parents buying a Christmas gift for a 6 to 8 year old who want it to last past the first week (`assets/brand/brand-strategy.md`)
- **Runs:** from approval to 24 December 2026
- **Owner:** Dylan
- **Status:** Draft

## The one thing

Most Christmas toys are done by Boxing Day. The Makerzoid Smart Robot is 72 different robots: build one, take it apart, build the next.

## Subject

| Product | Shopify handle | Price | Ages | Research notes |
|---|---|---|---|---|
| Makerzoid Smart Robot | `makerzoid-smart-robot` | R 980 | 6+ | `assets/product/makerzoid-smart-robot/content.md` |

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Price | R 980, not on sale | Ad brief G3; live product page JSON-LD (`"price":"980.0"`) | 2026-10-22, recheck before upload |
| Ages | 6+ | `content.md` (Recommended Age: 6 years and older); also printed on the box | 2026-10-22 |
| 72 models | 72+ robot models | `content.md` (Robot Models); "72 in 1" on the box | 2026-10-22 |
| 300 pieces | 300+ blocks | `content.md` (Build System); "300 pcs" on the box | 2026-10-22 |
| Screen-free | No computer, app or screen needed | `content.md` (no-code reactive robots); "Screen-Free" on the box | 2026-10-22 |

**Not claiming:** coding (this kit has none), batteries (2 x AAA, not included), delivery dates before Christmas, awards, review counts.

## Assets

| File | Canvas | Channel | Destination | Link checked |
|---|---|---|---|---|
| `feed-portrait.html` | `meta-portrait` | Meta feed | `https://www.thecreatespace.co.za/product/makerzoid-smart-robot?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-makerzoid-72-robots&utm_content=feed-portrait` | 2026-10-22 |
| `story.html` | `meta-story` | Meta stories | `https://www.thecreatespace.co.za/product/makerzoid-smart-robot?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-makerzoid-72-robots&utm_content=story` | 2026-10-22 |

Both share `g3-ad.css`. The story keeps the same stack with 290px top and bottom padding (Meta's 270px story safe zones), so the product card grows to fill the extra height.

## Imagery

| File in `images/` | Source | Shows |
|---|---|---|
| `makerzoid-smart-robot-box-and-builds.jpg` | `assets/product/makerzoid-smart-robot/lifestyle/whats-in-the-box.jpg` (the main product shot, 1000 x 957) | The Smart Robot box, the drummer build and eleven other builds on white |

The photo is on white, so the card uses `mix-blend-mode: multiply` to let the pale blue `#EEF8FD` show through instead of a white rectangle.

## Ad copy (Meta)

- **Primary text:** Most Christmas toys get one good day. The Makerzoid Smart Robot has 72 robots in the box, from a drummer to a weightlifter. Build one, take it apart, build the next. 300 pieces, no screen and no app. Ages 6+, R 980.
- **Headline:** 72 robots in one box
- **Button:** Shop now

## Notes

- The brief asked for a grey first line. CI grey `#B3B3B3` is about 2:1 on white, so the line uses a navy-tinted grey `#858AA3` (about 3.4:1, passes AA for large text). It still reads as faded next to the navy headline.
- The red strike and red CTA follow the brief, although `marketing/DESIGN.md` reserves red for savings and orange for the CTA. White on Rocket Red at 32px bold passes AA for large text.
- "72" is set at 700 weight (a number, per the SemiBold Ceiling Rule) on a yellow band covering the lower part of the numerals, tilted 1.5 degrees like a pen stroke.
- The CTA on the image says "Shop gifts" as briefed. Meta's button options have no "Shop gifts", so the button is "Shop now". The ad lands on the product page; if a gifts collection goes live, point it there instead.

## Open questions

- Recheck the price and run `marketing/scripts/check-links.sh` once more before upload.
