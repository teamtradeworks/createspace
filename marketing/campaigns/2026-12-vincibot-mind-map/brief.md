# VinciBot Christmas mind map

## Summary

- **Campaign slug:** `2026-12-vincibot-mind-map` (also the `utm_campaign` value)
- **Type:** Product (one hero product, no offer)
- **Audience:** Parents
- **Persona:** Parents buying a Christmas gift for a child of 8 to 12 who likes gadgets, building or drawing, and who want a gift with more than one trick (`assets/brand/brand-strategy.md`)
- **Runs:** December 2026, dates not set yet. Sits alongside `2026-12-christmas-gift-guide`.
- **Owner:** Hayley
- **Status:** Draft

## The one thing

One gift, many things to do. VinciBot draws, follows lines, lights up and plays music, builds into LEGO models and grows from block coding to Python. The mind map shows that breadth at a glance, with VinciBot in the middle.

No sale and no discount on the ad.

## Subject

**Product(s):**

| Product | Shopify handle | Price | Ages | Research notes |
|---|---|---|---|---|
| MatataStudio VinciBot Coding Robot Set | `matatastudio-vincibot-coding-robot-set` | R 2,550 regular. Showing R 2,040 (20% off, Black Friday) on 2026-11-19 | 8-12 | `assets/product/matatastudio-vincibot-coding-robot-set/content.md` |

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Price | R 2,550 regular; R 2,040 on 2026-11-19 while the Black Friday price is live. In stock. | Live product page (Shopify MCP was unavailable) | 2026-11-19 |
| Ages | 8-12 | Live product page, Shopify description | 2026-11-19 |
| Draws | Holds a pen; Precision Drawing mode | `content.md` (Included Modes, Creative Drawing) | 2026-11-19 |
| Follows lines | Line follower sensor; double-sided activity map in the box, one side a line-following track | `content.md` (What's in the box) | 2026-11-19 |
| Lights and music | 128-LED face for expressions and animations, 6 RGB lights, speaker with 21 instrument sounds | `content.md` (Hardware) | 2026-11-19 |
| Coding | Drag-and-drop blocks, then Python, in the free MatataCode app (Windows, Mac, iOS, Android) | `content.md` (Coding platform) | 2026-11-19 |
| LEGO | Compatible with LEGO bricks and Technic motors | `content.md` (Extensible design) | 2026-11-19 |
| Sensors | 8 built-in sensors (distance, light, sound, colour, line, infrared) | `content.md`, Shopify description | 2026-11-19 |
| Activities | 93: 18 challenges in the box plus 75 online lessons | `content.md` (Product Attributes) | 2026-11-19 |
| Delivery | Free over R 1,500; otherwise R 140; 1-3 days, The Courier Guy | `storefront/src/config/site.json` | 2026-11-19 |

**Not claiming:** any discount, sale or "was" price; the star rating or review count in the page's structured data (3 reviews, not ours to quote in ads); that a pen is included; soccer, AI vision or other add-on kit features (they need the separate expansion kits); delivery before Christmas or a last order date; "bestseller".

## Assets

| File | Canvas | Channel | Landing URL (with UTMs) | Link checked |
|---|---|---|---|---|
| `feed-portrait.html` | `meta-portrait` | Meta feed | `https://www.thecreatespace.co.za/product/matatastudio-vincibot-coding-robot-set?utm_source=meta&utm_medium=paid&utm_campaign=2026-12-vincibot-mind-map&utm_content=feed-portrait` | 200 OK 2026-11-19 |
| `feed-square.html` | `meta-square` | Meta feed | `https://www.thecreatespace.co.za/product/matatastudio-vincibot-coding-robot-set?utm_source=meta&utm_medium=paid&utm_campaign=2026-12-vincibot-mind-map&utm_content=feed-square` | 200 OK 2026-11-19 |
| `story.html` | `meta-story` | Meta stories | `https://www.thecreatespace.co.za/product/matatastudio-vincibot-coding-robot-set?utm_source=meta&utm_medium=paid&utm_campaign=2026-12-vincibot-mind-map&utm_content=story` | 200 OK 2026-11-19 |

**Design:** a mind map on navy. VinciBot sits in a white circle at the centre; curved branches run out to six round feature nodes, each a photo of VinciBot doing that thing or a big number, with a short label. All three sizes share `mind-map.css`. The square drops the CREATESPACE logo (the page name shows above the ad), centres the kicker, puts the headline on one line and centres the CTA under the hub; in the story, the kicker and the logo/CTA row sit about 50px inside the zones Meta suggests keeping clear (top and bottom 270px), to give the mind map room. Check the Ads Manager preview before launch.

## Imagery

| File in `images/` | Source | Shows |
|---|---|---|
| `vincibot-front-white.jpg` | Shopify product image `MS0201500088-5.png` (990 x 990), cropped to the robot | VinciBot face-on, on white |
| `vincibot-drawing-plane.jpg` | `projects/vincibot-drawing.png` (516 x 373), cropped to the robot and plane | VinciBot holding a marker beside the plane it drew |
| `vincibot-following-line.jpg` | `lifestyle/vincibot-close-up-on-line-following-map.jpeg` | VinciBot on the black line track |
| `vincibot-lights-music.jpg` | `projects/vincitbot-with-lights-dancing-music.png` (516 x 376), padded to square | VinciBot with glowing ears, music notes around it |
| `blocks-and-python-code.jpg` | `projects/coding.png` (1080 x 1080), cropped to the blocks | The same program as blocks and as Python |
| `vincibot-lego-build.jpg` | Shopify product image `MS0201500088-2.png` | VinciBot built into a LEGO conveyor |
| `vincibot-with-remote.jpg` | `projects/ir-remote-control-mode.jpg` (400 x 396), padded | Hand pointing the remote at VinciBot |

All source paths are under `assets/product/matatastudio-vincibot-coding-robot-set/` unless noted.

## Ad copy (Meta)

- **Primary text:**

  > Wrap one robot, unwrap a whole lot of play. VinciBot draws pictures, follows a track, lights up and plays music, and clicks into LEGO builds.
  >
  > Kids start coding with drag-and-drop blocks and move on to Python when they're ready. There are 93 activities to work through: 18 challenges in the box and 75 more online.
  >
  > For ages 8 to 12. Free delivery on orders over R 1,500.

- **Headline:** VinciBot: one gift, lots to do
- **Description:** Ages 8-12. Free delivery over R 1,500
- **Button:** Shop now

**On-image headline:** "One gift. So many ways to play."

## Constraints

- No price on the image. The live price changes after Black Friday; recheck before upload and add it to the primary text only if wanted.
- Christmas touch stays on brand: navy, white, accents, Outfit. A few yellow stars and the kicker, no snow or red-and-green.
- MatataStudio logo kept off navy (`marketing/PRODUCT.md`); the product is named, not logo'd.

## Open questions

1. **Run dates.** Not set. Also whether it runs alongside the gift guide or after it.
2. **Carousel.** Portrait, story and square are done. A carousel version is not planned yet.
