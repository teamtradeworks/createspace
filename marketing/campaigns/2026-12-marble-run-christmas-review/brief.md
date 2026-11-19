# Marble run Christmas review

## Summary

- **Campaign slug:** `2026-12-marble-run-christmas-review` (also the `utm_campaign` value)
- **Type:** Product
- **Audience:** Parents buying a Christmas gift for their own child
- **Runs:** December 2026, before Christmas (dates to confirm)
- **Owner:** Hayley
- **Status:** Draft (2026-11-19)

## The one thing

A real parent says the marble run was their child's favourite gift by far. We let the review do the selling and give it a Christmas frame.

## Subject

| Product | Shopify handle | Price | Ages | Research notes |
|---|---|---|---|---|
| National Geographic Motorized Marble Run | `national-geographic-motorized-marble-run` | R 1,020 | 8+ | `assets/product/national-geographic-motorized-marble-run/content.md` |

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Price and stock | R 1,020, in stock (primary text only, not on the image) | Live product page JSON-LD | 2026-11-19 |
| Age | 8+ | `content.md` (Shopify metafield) | 2026-11-19 |
| Review | Quoted in full, unedited, 5 stars | Supplied by Hayley in chat | 2026-11-19 |

**Watch:**
- **Review source.** Record where the review came from (our Google profile, Takealot, email) and keep a copy. The ad says only "A parent's 5-star review", so it doesn't claim to be one of our own customers.
- **Age mismatch.** The reviewer's son is 7; the kit is ages 8+. The footer shows 8+, which is right for us, but a sharp-eyed parent may notice. Leave it as the reviewer wrote it.
- **"7-year old"** is the reviewer's own spelling; kept verbatim.
- **Not claiming:** piece counts (the box says 100, `content.md` says 75), delivery before Christmas, discounts.

## Licensor review (National Geographic)

National Geographic is a licensed brand. The ad names the product in full and shows the manufacturer's own lifestyle photo (uncropped, unedited) and the official box front with only its white background removed. The National Geographic logo and yellow border appear only as printed on the box; we don't reproduce them anywhere else. Send to the licensor before it runs, as with `2026-10-parent-quotes`.

## Assets

| File | Canvas | Landing URL (with UTMs) |
|---|---|---|
| `feed-portrait.html` | `meta-portrait` | `https://www.thecreatespace.co.za/product/national-geographic-motorized-marble-run?utm_source=meta&utm_medium=paid&utm_campaign=2026-12-marble-run-christmas-review&utm_content=feed-portrait` |
| `feed-square.html` | `meta-square` | `https://www.thecreatespace.co.za/product/national-geographic-motorized-marble-run?utm_source=meta&utm_medium=paid&utm_campaign=2026-12-marble-run-christmas-review&utm_content=feed-square` |
| `story.html` | `meta-story` | `https://www.thecreatespace.co.za/product/national-geographic-motorized-marble-run?utm_source=meta&utm_medium=paid&utm_campaign=2026-12-marble-run-christmas-review&utm_content=story` |

Shared styles in `review.css` (its values are the feed-portrait layout; each canvas overrides positions). The baubles are drawn by `baubles.js` from each canvas's `data-baubles` list. The story keeps the headline and text below the 270px top safe zone; the baubles hang into it. To cut the empty space at the bottom (Hayley, 2026-11-19), the review card ends at about 1650px and the orange button at 1724px, about 75px into Meta's 270px bottom zone. Check it in Ads Manager's story preview; if Meta's reply bar covers the button, raise `.buy` in `story.html` (Meta adds its own button there anyway).

**Design:** navy night sky with three baubles (blue, yellow, purple) hanging from the top edge on the right. A string of lights was tried and dropped as too much (2026-11-19). Kicker "This Christmas", headline "Give their favourite gift, *by far.*" pulled from the review, then "National Geographic Motorized Marble Run · Ages 8+" straight underneath so the product is named before anything else. A bright close-up of blue marbles racing down the coloured tracks (right), with the official box propped against its bottom-right corner so the product is unmistakable at a glance. A narrower white review card with five yellow stars and a red gift bow overlaps the photo's lower left (about a fifth of the photo). Orange "Shop now" bottom right. No price on the image (Hayley, 2026-11-19); it stays in the primary text.

**Red bow:** The Red Means Saving Rule covers type and badges. The bow is a decorative object, so it doesn't read as a saving. Hayley asked for the red bow on 2026-11-19.

## Imagery

| File in `images/` | Source | Shows |
|---|---|---|
| `marble-run-box.png` | `assets/product/national-geographic-motorized-marble-run/shopify/cover-image.png`, white background removed, cropped to the box, 620px | Official box front, unedited |
| `marbles-racing-down-marble-run.jpg` | `assets/product/national-geographic-motorized-marble-run/lifestyle/image-of-marbles-close-up-going-down-run.png` (679 x 500, shown at 724 wide) | Blue marbles racing down the run, official lifestyle shot |

Swapped on 2026-11-19 from the customer photo of children at a table (Hayley: use a better photo).

## Ad copy (Meta)

- **Primary text:** "His favourite gift by far." That's what one parent told us about the National Geographic Motorized Marble Run. Kids build the track, then a motorised spiral lift carries the marbles back to the top, so the run keeps going (and so do they). A gift that gets them thinking like engineers. Ages 8+, R 1,020.
- **Headline:** Give their favourite gift this Christmas
- **Button:** Shop now
