# National Geographic: Pick 1, 2 or 3

## Summary

- **Campaign slug:** `2026-10-natgeo-pick-123` (also the `utm_campaign` value)
- **Type:** Partner brand (engagement)
- **Audience:** Parents
- **Persona:** Parents extending an interest the child already has (`assets/brand/brand-strategy.md`)
- **Runs:** ongoing, from approval
- **Owner:** Dylan
- **Status:** Draft

## The one thing

Comment one number. The reply tells us whether the parent's child leans to bugs, circuits or rockets, and we retarget each commenter with the single-product ad for the kit they picked.

**Why engagement, not sales:** multi-product ads have sold poorly on this account. This ad runs on the Engagement objective only and is not judged on purchases. The sale happens in the retargeting step.

## Subject

| # | Nickname | Product | Shopify handle | Ages (as briefed) | Research notes |
|---|---|---|---|---|---|
| 1 | The bug catcher | Mega Bug Habitat | `national-geographic-mega-bug-habitat` | 4-12 | `assets/product/national-geographic-mega-bug-habitat/content.md` |
| 2 | The circuit builder | Epic Circuits | `national-geographic-epic-circuits-science-kit` | 8-14 | `assets/product/national-geographic-epic-circuits-science-kit/content.md` |
| 3 | The rocket launcher | Light-Up Air Rockets | `national-geographic-light-up-air-rockets` | 6-12 | `assets/product/national-geographic-light-up-air-rockets/content.md` |

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Epic Circuits ages | 8-14 | Product page `storefront/src/app/product/national-geographic-epic-circuits-science-kit/page.tsx` | 2026-10-21 |
| Mega Bug Habitat ages | 4-12 | Ad brief C3. Product page says "Ages 4+" | 2026-10-21, see open questions |
| Light-Up Air Rockets ages | 6-12 | Ad brief C3, and the merged parent quotes ad. Product page says "Ages 8+" | 2026-10-21, see open questions |

**Not claiming:** prices, delivery, project counts, awards. The ad asks a question; it sells nothing on the image.

## Assets

| File | Canvas | Channel | Destination | Link checked |
|---|---|---|---|---|
| `feed-portrait.html` | `meta-portrait` | Meta feed, Engagement objective | None needed for engagement. If Meta asks for one: `https://www.thecreatespace.co.za/shop?brand=National%20Geographic&utm_source=meta&utm_medium=paid&utm_campaign=2026-10-natgeo-pick-123&utm_content=feed-portrait` | No |
| `story.html` | `meta-story` | Meta stories, Engagement objective | None needed for engagement. If Meta asks for one: `https://www.thecreatespace.co.za/shop?brand=National%20Geographic&utm_source=meta&utm_medium=paid&utm_campaign=2026-10-natgeo-pick-123&utm_content=story` | No |

## Retargeting

Build three custom audiences from people who commented 1, 2 or 3 (manually tagged, or by keyword via comment automation), and serve each the existing single-product ad:

| Comment | Retarget with |
|---|---|
| 1 | Mega Bug Habitat single-product ad (to be made) |
| 2 | Epic Circuits single-product ad (to be made) |
| 3 | Light-Up Air Rockets ads (`2026-10-hero-kits/rockets-*`, `2026-10-parent-quotes/*`) |

## Imagery

| File in `images/` | Source | Shows |
|---|---|---|
| `national-geographic-mega-bug-habitat-box.jpg` | `assets/product/national-geographic-mega-bug-habitat/shopify/cover-image.jpeg` | Box, on white |
| `national-geographic-epic-circuits-box.jpg` | `assets/product/national-geographic-epic-circuits-science-kit/shopify/cover-image.png` | Box, on white |
| `national-geographic-light-up-air-rockets-box.jpg` | `assets/product/national-geographic-light-up-air-rockets/shopify/cover-image.jpg` | Box, on white |

All resized to 600px.

## Ad copy (Meta)

- **Primary text:** Bugs, circuits or rockets? Tell us which one your child would rip open first. Comment 1, 2 or 3.
- **Headline:** Which one gets opened first?
- **Button:** none (engagement)

## Constraints

- **National Geographic licensor review.** The ad shows National Geographic packaging and product names, so it goes to the licensor for approval before it runs. Do not publish until approved.
- We do not add the National Geographic logo ourselves; it appears only on the product boxes.

## Open questions

- **Ages differ from the product pages.** Bug Habitat is "Ages 4+" on site and Air Rockets is "Ages 8+" on site, while this brief (and the earlier parent quotes ad) uses 4-12 and 6-12. Confirm against Shopify's `minimum_age` / `maximum_age` metafields and the box before licensor review.
