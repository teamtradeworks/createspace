# Black Friday email: Shopify Messaging build sheet

Built only from Shopify Messaging sections (Header, Image, Text, Button, Product, footer), each with its own background colour. Built on the owner's draft of 18 Nov: same finder block, delivery strip and sign-off, with colour added, and products shown in matched pairs a parent could buy together. Preview: `email-preview.html` (screenshot `exports/email-preview.png`).

- **Send:** Thursday 19 November 2026, morning (RockitSales switches prices at 00:00)
- **Sale:** 19 to 30 November 2026, up to 20% off STEM kits

## Email settings

| Field | Value |
|---|---|
| Subject | Black Friday is on: up to 20% off STEM kits |
| Preview text | 19 to 30 November. Get the Christmas list sorted before December gets busy. |

## Colours

| Name | Hex | Used for |
|---|---|---|
| Navy | `#0C1446` | Top block (header, hero, intro, first button), footer, second button |
| Red | `#F70B28` | Thin "ends 30 November" strip, sale prices |
| Orange | `#FF8B00` | Main button, with navy text |
| Yellow | `#FFD500` | Delivery strip |
| Blue tint | `#DCF4FD` | Band 1: robots and coding |
| Yellow tint | `#FFF4BF` | Band 2: space |
| Green tint | `#EAF8D4` | Band 3: electronics |
| Purple tint | `#F3E6FF` | "Shopping for someone in particular?" box |

Tints, not full-strength accents, behind the products: red sale prices and navy text stay readable on them, and the white product photos sit on them like cards. A text section and the product section under it share the same colour, so each pair reads as one band.

## Sections, top to bottom

| # | Section | Background | Content |
|---|---|---|---|
| 1 | Header | Navy | Logo for dark backgrounds (`marketing/creative/kit/logo/logo-on-navy.png`) |
| 2 | Image | Navy | `exports/email-hero.jpg` (1200 x 800). Alt: "Black Friday, 19 to 30 November. Up to 20% off STEM kits." Links to `/shop?sale=true` |
| 3 | Text | Navy, white text, centred | Up to 20% off STEM kits until 30 November. A good time to get the Christmas list sorted, before December gets busy. |
| 4 | Button | Navy | "Shop the sale", orange with navy text, to `/shop?sale=true` |
| 5 | Text | Red, white text, centred, small caps | UP TO 20% OFF · ENDS 30 NOVEMBER |
| 6 | Text | Blue tint | Small label "ROBOTS AND CODING", heading "Two of our most popular robot kits" |
| 7 | Product | Blue tint | VinciBot, Robot Master Premium. 2 per row |
| 8 | Text | Yellow tint | "SPACE", heading "Space gifts under R 1,000", then "Get both for R 1,420." |
| 9 | Product | Yellow tint | NASA Lunar Telescope, National Geographic Mega Space Activity Kit |
| 10 | Text | Green tint | "ELECTRONICS", heading "For kids who want to know how things work", then "Snap Circuits for ages 8 to 12, Arduino for 12 and up." |
| 11 | Product | Green tint | Snap Circuits Explorer Junior, Robotico Arduino Ultimate MEGA 2560 Starter Kit |
| 12 | Text | White, centred | That's just six. There's lots more on sale. |
| 13 | Button | White | "See everything on sale", navy with white text, to `/shop?sale=true` |
| 14 | Finder block (from the draft) | White, inner box purple tint | Brand pills now: Makerzoid, MatataStudio, Snap Circuits, National Geographic, Robotico (added Makerzoid and Robotico, so every brand in the email has a pill) |
| 15 | Text | Yellow, centred | **Free delivery on orders over R 1,500** / Sent with The Courier Guy, 1 to 3 days to your door. |
| 16 | Text | White | Keep exploring, / **The CREATESPACE Team** |
| 17 | Footer | Navy | Unchanged |

Add `?utm_source=shopify-email&utm_medium=email&utm_campaign=2026-11-black-friday-sale` to links you type in yourself.

## Prices (sale sheet, updated 17 Nov to match the website)

| Product | Was | Now | Off |
|---|---|---|---|
| MatataStudio VinciBot Coding Robot | R 2,550 | R 2,040 | 20% |
| Makerzoid Robot Master Premium | R 2,380 | R 1,900 | 20% |
| NASA Lunar Telescope | R 1,150 | R 920 | 20% |
| National Geographic Mega Space Activity Kit | R 620 | R 500 | 19% |
| Snap Circuits Explorer Junior | R 1,350 | R 1,220 | 10% |
| Robotico Arduino Ultimate MEGA 2560 Starter Kit | R 1,500 | R 1,280 | 15% |

Mega Space is 19% off, not 20%: the sale sheet rounds sale prices to the nearest R 10. Label it "SAVE 19%".

The owner's draft showed VinciBot at R 2,060 (was R 2,580), the figures from the first sale sheet. The 17 Nov update changed it to R 2,040 (was R 2,550), so check what RockitSales has scheduled.

**Why these pairs.** Each band is two kits for the same child, so a parent can picture buying both, and the six products come from six brands: MatataStudio, Makerzoid, NASA, National Geographic, Snap Circuits and Robotico. The space pair comes to R 1,420, close to free delivery at R 1,500. The tinkerer pair runs from a first circuit (8 to 12) to Arduino (12+), so it also works for siblings of different ages, and the Robotico kit has plenty of stock to clear (167 units). Snap Circuits Arcade (9 in stock) was left out because it could sell out from one email; the finder box's "3 to 5" pill covers the under-5s.
