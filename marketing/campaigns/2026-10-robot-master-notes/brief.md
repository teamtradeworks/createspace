# Robot Master Premium: notes checklist

## Summary

- **Campaign slug:** `2026-10-robot-master-notes` (also the `utm_campaign` value)
- **Type:** Product
- **Audience:** Parents
- **Runs:** October 2026 into the Christmas run-up. No offer, no end date.
- **Status:** Draft

## The one thing

Robot Master Premium isn't a one-build toy. It's told through a parent's own holiday notes list: four builds ticked off and "about 196 more to go".

## Subject

| Product | Shopify handle | Price | Ages | Research notes |
|---|---|---|---|---|
| Makerzoid Robot Master Premium | `makerzoid-robot-master-premium` | R 2,380 (research notes, not on the image) | 6-14 | `assets/product/makerzoid-robot-master-premium/content.md` |

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Models | 200+ | `assets/product/makerzoid-robot-master-premium/content.md`; `2026-10-hero-kits/brief.md` | 2026-10-21 |
| Ages | 6-14 | `content.md` (Age/Skill Information) | 2026-10-21 |
| Pieces, lessons | 600+ pieces, 47 lessons across three levels | `content.md` | 2026-10-21 |
| Coding | Drag-and-drop block coding in the Makerzoid app | `content.md` | 2026-10-21 |

The four ticked builds (robot dog, crane, walking dinosaur, coded car) are illustrative examples of what the kit makes, kept generic as the brief asks. "Liam (7)" is a made-up child.

**Not claiming:** star ratings, "bestseller", review counts.

## Assets

| File | Canvas | Channel | Landing URL (with UTMs) | Link checked |
|---|---|---|---|---|
| `feed-portrait.html` | `meta-portrait` | Meta feed | `https://www.thecreatespace.co.za/product/makerzoid-robot-master-premium?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-robot-master-notes&utm_content=feed-portrait` | 200 OK 2026-10-21 |
| `story.html` | `meta-story` | Meta stories | `https://www.thecreatespace.co.za/product/makerzoid-robot-master-premium?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-robot-master-notes&utm_content=story` | 200 OK 2026-10-22 |

## Imagery

| File in `images/` | Source | Shows |
|---|---|---|
| `robot-master-kit-and-builds.jpg` | `assets/product/makerzoid-robot-master-premium/lifestyle/whats-in-the-box.png`, resized to 760px wide JPEG | The Robot Master box, sorting tray, course books and three finished builds on white |

## Design notes

- Generic notes screen, not modelled on any real app. Cream `#FFFDF3` ground, no status bar, a mustard "< Notes" back label at the top left.
- DM Sans throughout, as the brief pins it. It's outside the CREATESPACE type system on purpose, so the image reads as a phone screenshot (same exception as the Gran chat ads). Font file: `creative/kit/fonts/DMSans.ttf`.
- Mustard `#D9A21B` for the back label and the filled round ticks. Done items are struck through in grey; the open item is near-black.
- The product sits on a white card tilted -4 degrees with a soft shadow, like a photo stuck onto the note. A tape strip was tried and dropped: in CSS it read as a highlighter box.
- The only brand mark is the small CREATESPACE wordmark at the bottom left. No CTA button on the image; Meta's button does that job.
- **Story** (`story.html`) shares `notes.css` with the feed version. The note starts below Meta's top 270px, the photo card is a little larger, and the card and wordmark sit above the bottom 270px.

## Ad copy (Meta)

- **Primary text:** Four builds down, about 196 to go. Makerzoid Robot Master Premium has 200+ robot models in one box, from cranes that lift to dinosaurs that walk, and your child codes them with drag-and-drop blocks. Ages 6-14.
- **Headline:** Robot Master Premium: 200+ builds, ages 6-14
- **Description:** Delivered by The Courier Guy
- **Button:** Shop now

## Open questions

- Recheck the price in Shopify if it goes into the copy. The Shopify connector was down when this was built.
- Run `marketing/scripts/check-links.sh` on this folder again before shipping.
