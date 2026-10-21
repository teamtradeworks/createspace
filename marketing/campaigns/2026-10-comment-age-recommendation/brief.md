# Comment their age (Ad brief C1)

## Summary

- **Campaign slug:** `2026-10-comment-age-recommendation` (also the `utm_campaign` value)
- **Type:** Category or age
- **Audience:** Parents
- **Runs:** not scheduled
- **Status:** Draft

## The one thing

Comment your child's age and we reply with the one kit we'd pick for them, and why. The goal is comments, which we turn into personal recommendations.

## Look

On system: navy ground, white type, the white CREATESPACE wordmark top left. The headline is Outfit ExtraBold (800) at 96px because the brief pins it, which steps past DESIGN.md's SemiBold ceiling for words. "age" is the one Spark Yellow word. Body copy is `#D8DBEA`, a navy-tinted light grey (the brief's value).

The age tiles are a 6-column grid: 3 to 12 as yellow-outlined rounded squares with white 800 numerals, and 13+ as a solid yellow tile spanning two columns. Below them a mock comment thread in white bubbles: a blue avatar with a generic person glyph labelled "You", and an indented reply from a red "C" avatar labelled CREATESPACE. The commenter is "You" so it never reads as a real customer.

There is no CTA button on the image. Meta supplies the button; the call to action here is the comment itself.

## Subject

No product as hero. The example reply names one product:

| Product | Shopify handle | Price | Ages | Research notes |
|---|---|---|---|---|
| Makerzoid Robot Master Premium | `makerzoid-robot-master-premium` | R 2,380 | 6-14 | `assets/product/makerzoid-robot-master-premium/content.md` |

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Fits LEGO | Compatible with standard LEGO and LEGO Technic | content.md (Specifications: "LEGO Compatible") | 2026-10-21 |
| Robots | 200+ robot models | content.md (Shopify description, Specifications) | 2026-10-21 |
| Codes | Graphical (Scratch-style) block coding through the app | content.md | 2026-10-21 |
| Age 6 fits | Ages 6-14 | content.md; 2026-10-notes-checklist brief | 2026-10-21 |

**Watch:**
- **"We reply to every one"** is a promise. Someone has to answer every comment while the ad runs, with one named kit and a reason. Don't run it over a period nobody is watching the comments.
- The exchange is illustrative. Don't present it as a real customer in the primary text.
- Ages 3 to 5 need a real answer too. Check we stock a kit we'd pick for each age on the tiles before launch.

## Assets

| File | Canvas | Channel | Landing URL (with UTMs) | Link checked |
|---|---|---|---|---|
| `feed-portrait.html` | `meta-portrait` | Meta feed | `https://www.thecreatespace.co.za/shop?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-comment-age-recommendation&utm_content=feed-portrait` | |
| `story.html` | `meta-story` | Meta stories | `...&utm_content=story` | |

Both files share `comment-age.css`. The story keeps the feed layout and holds everything inside the 270px top and bottom safe zones (290px padding), with a little more space between the headline, body and tiles.

Stories have no comments box, only the reply bar, so in stories a "comment" lands as a DM reply. That still works for us, but whoever answers needs to watch the inbox as well as the comments.

## Imagery

None. Type, tiles and the mock thread only.

## Ad copy (Meta)

Suggested, not yet reviewed:

- **Primary text:** How old is your child? Tell us in the comments and we'll reply with the one kit we'd choose for them, and why. Real people, real picks, no quiz.
- **Headline:** Tell us their age
- **Button:** Shop now

## Open questions

- Engagement objective (comments) or traffic objective (link to `/shop`)? The image is built for comments; the button and landing URL above assume traffic as a fallback.
