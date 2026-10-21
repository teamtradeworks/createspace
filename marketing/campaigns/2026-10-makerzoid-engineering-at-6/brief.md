# Makerzoid: Engineering at 6

## Summary

- **Campaign slug:** `2026-10-makerzoid-engineering-at-6` (also the `utm_campaign` value)
- **Type:** Category or age (ad brief A3 of the age and skill series, A1-A6)
- **Audience:** Parents
- **Persona:** Parents of 6 to 8 year olds who like building toys and want them to lead somewhere (`assets/brand/brand-strategy.md`)
- **Runs:** ongoing, from approval
- **Owner:** Dylan
- **Status:** Draft

## The one thing

Robot Master Premium is real engineering a 6 year old can start: build a robot, code it in Scratch blocks, take it apart, build the next of 200+.

## Subject

| Product | Shopify handle | Price | Ages | Research notes |
|---|---|---|---|---|
| Makerzoid Robot Master Premium | `makerzoid-robot-master-premium` | R 2,380 | 6-14 | `assets/product/makerzoid-robot-master-premium/content.md` |

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Price | R 2,380, not on sale | Ad brief A3; matches `2026-10-makerzoid-guess-how-many/brief.md` (Shopify Storefront API, 2026-10-21) and `content.md` | Recheck in Shopify before upload |
| Ages | 6-14 | `content.md` (Age/Skill Information) | 2026-10-21 |
| 200+ models | 200+ robot models from 600+ pieces | `content.md` (Specifications) | 2026-10-21 |
| Scratch 3.0 | Codes in Scratch 3.0 through the Makerzoid app | `content.md` (Programming Language) | 2026-10-21 |

**Not claiming:** screen-free play (coding needs a phone or tablet), batteries (2 x AA, not included), delivery, awards, review counts.

## Series layout (A1-A6)

`age-series.css` is copied unchanged from A1 (`2026-10-tale-bot-coding-at-3`) via A2. This ad sets only `--accent` to green, plus its copy, photo and product. Series label "Junior Innovators 6-8", top right, in the accent (uppercased by the series CSS).

## Assets

| File | Canvas | Channel | Destination | Link checked |
|---|---|---|---|---|
| `feed-portrait.html` | `meta-portrait` | Meta feed | `https://www.thecreatespace.co.za/product/makerzoid-robot-master-premium?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-makerzoid-engineering-at-6&utm_content=feed-portrait` | No |
| `story.html` | `meta-story` | Meta stories | `https://www.thecreatespace.co.za/product/makerzoid-robot-master-premium?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-makerzoid-engineering-at-6&utm_content=story` | No |

## Imagery

| File in `images/` | Source | Shows |
|---|---|---|
| `makerzoid-robot-master-premium-box.jpg` | Copied from `2026-10-makerzoid-guess-how-many/images/` (Shopify product image 1, white margins trimmed to 1042 x 899) | The Robot Master Premium storage box on white, with the robot builds on its lid |

## Ad copy (Meta)

- **Primary text:** They build it, then code it with Scratch blocks. Then they take it apart and build the next one. Makerzoid Robot Master Premium has 600+ pieces and 200+ robot models, from dinosaurs to cranes. Ages 6-14, R 2,380.
- **Headline:** Engineering at 6. 200 robots deep.
- **Button:** Shop now

## Notes

- The brief wrote the price as "R2,380". The image uses "R 2,380" to follow the house money format, as A1 and A2 did.
- The CTA stays red, as the series asks, even though the accent is green.
- The series label says 6-8 while the pill says 6-14: the label names the age band this ad targets, the pill the product's full range.
- At the series' 0.92 line height the "g" in "Engineering" just meets the top of "200". Left as is so the shared CSS stays identical across A1-A6.

## Open questions

- Recheck the R 2,380 price in Shopify before upload. The Shopify connector was down when this was built.
