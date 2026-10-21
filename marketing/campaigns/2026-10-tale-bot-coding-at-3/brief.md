# Tale-Bot Pro: Coding at 3

## Summary

- **Campaign slug:** `2026-10-tale-bot-coding-at-3` (also the `utm_campaign` value)
- **Type:** Category or age (ad brief A1 of the age and skill series, A1-A6)
- **Audience:** Parents
- **Persona:** Parents of preschoolers who want learning without more screen time (`assets/brand/brand-strategy.md`)
- **Runs:** ongoing, from approval
- **Owner:** Dylan
- **Status:** Draft

## The one thing

A three-year-old can code before they can read: Tale-Bot Pro is programmed with the arrow buttons on its back, with no tablet, app or reading needed.

## Subject

| Product | Shopify handle | Price | Ages | Research notes |
|---|---|---|---|---|
| MatataStudio Tale-Bot Pro | `matatastudio-tale-bot-pro` | R 2,280 | 3-6 | `assets/product/matatastudio-tale-bot-pro/content.md` |

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Price | R 2,280 | Ad brief A1; matches `2026-10-hero-kits/brief.md` (live product page, 2026-10-02) | Recheck in Shopify before upload |
| Ages | 3-6 | Ad brief A1; matches `2026-10-tale-bot-gran-chat/brief.md` | 2026-10-21 |
| 14 missions | Challenge booklet, 14 missions | `content.md`, "What's in the box" | 2026-10-21 |
| 5 maps | 5 double-sided interactive maps | `content.md`, "What's in the box" | 2026-10-21 |
| Screen-free | Coded with the buttons on the robot | `content.md` | 2026-10-21 |

**Not claiming:** delivery, awards, review counts.

## Series layout (A1-A6)

The shared layout is `age-series.css` in this folder. Every ad in the series keeps it unchanged and sets only `--accent`, its copy, photo and product. A2-A6 copy the file into their own campaign folder.

- Navy ground, 72px margins.
- Top row: wordmark left, series label right in the accent colour (A1: blue, "Early explorers 3-5").
- Headline Outfit ExtraBold 120px, leading 0.92, white, only the age number in yellow.
- Body 32px, `#D8DBEA`, max 860px.
- Three outlined pills in the accent colour.
- White product card from the left margin, bleeding off the right edge, rounded on the left.
- Footer: product name, price and URL; red "Shop now" pill bottom right.
- Story: same stack, padded 290px top and bottom to clear Meta's UI.

## Assets

| File | Canvas | Channel | Destination | Link checked |
|---|---|---|---|---|
| `feed-portrait.html` | `meta-portrait` | Meta feed | `https://www.thecreatespace.co.za/product/matatastudio-tale-bot-pro?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-tale-bot-coding-at-3&utm_content=feed-portrait` | No |
| `story.html` | `meta-story` | Meta stories | `https://www.thecreatespace.co.za/product/matatastudio-tale-bot-pro?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-tale-bot-coding-at-3&utm_content=story` | No |

## Imagery

| File in `images/` | Source | Shows |
|---|---|---|
| `talebot-pro-three-bots-white.jpg` | `assets/product/matatastudio-tale-bot-pro/lifestyle/3-bots-with-different-arm-attachments.png`, centre-cropped to 800x330 | Three Tale-Bots with arm, Lego plate and beak attachments, on white |

## Ad copy (Meta)

- **Primary text:** Coding at 3, before they can read. Press the arrow buttons and Tale-Bot walks the route your child planned. No tablet, no app, no reading. Ages 3-6, R 2,280.
- **Headline:** Coding at 3. Before they can read.
- **Button:** Shop now

## Notes

- The brief wrote the price as "R2,280". The image uses "R 2,280" to follow the house money format.
- The CTA is red, as the series brief asks, rather than the system's orange action colour.

## Open questions

- Recheck the R 2,280 price in Shopify before upload. The Shopify connector was down when this was built.
- The series label says 3-5 while the product is 3-6. Intentional per the brief (the label names the series age band, the pill names the product's range).
