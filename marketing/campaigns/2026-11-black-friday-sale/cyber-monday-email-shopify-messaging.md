# Cyber Monday email: Shopify Messaging build sheet

The last-day email of the Black Friday sale. It uses the same Shopify Messaging sections and colours as the Black Friday email (`email-shopify-messaging.md`), so the two sends read as one sale. It's shorter: one message (the sale ends tonight), the biggest savings first, and no finder block. Preview: `cyber-monday-email-preview.html` (screenshot `exports/cyber-monday-email-preview.png`).

- **Send:** Monday 30 November 2026, early morning (around 07:00), so it lands before the school run and people still have the whole day to buy
- **Sale:** ends 30 November 2026. The site's promo strip and hero switch off after 23:59 SAST (`storefront/src/config/promo.ts`). **Check the RockitSales end time before sending.** The email says "tonight" and "before midnight", so the prices must stay live until 23:59.

## Email settings

| Field | Value |
|---|---|
| Subject | Last day: up to 20% off ends tonight |
| Preview text | Cyber Monday is the final day of our Black Friday sale. Here's what's still on. |

Other subjects to test: "Cyber Monday: the sale ends tonight", or "Prices go back up tomorrow".

## Sections, top to bottom

| # | Section | Background | Content |
|---|---|---|---|
| 1 | Header | Navy | Logo for dark backgrounds (`marketing/creative/kit/logo/logo-on-navy.png`) |
| 2 | Image | Navy | `exports/cyber-monday-email-hero-g.jpg` (1200 x 800; our blue brand robot with code, lightbulb, nut, planet and chip on a dashed orbit). Earlier options A to F are alongside it in `exports/`. Alt: "Cyber Monday, last day of the sale. Up to 20% off STEM kits, ends tonight." Links to `/shop?sale=true` |
| 3 | Text | Navy, white text, centred | It's the last day of our Black Friday sale, with up to 20% off selected kits. Get your Christmas presents sorted early, and at an awesome price too! |
| 4 | Button | Navy | "Shop before it ends", orange (`#FF8B00`) with navy text, to `/shop?sale=true` |
| 5 | Text | Red, white text, centred, small caps | LAST DAY · SALE ENDS TONIGHT |
| 6 | Text | Blue tint (`#DCF4FD`) | Small label "ROBOTS AND CODING", heading "Kits to build, code and tinker with", then "From robots they build and code at 6, to wiring up their own circuits at 13." |
| 7 | Product | Blue tint | VinciBot, Robot Master Premium, Superbot, Robotico Ultimate UNO R3 Starter Kit. 2 per row (MatataStudio, two Makerzoid, Robotico) |
| 8 | Text | Yellow tint (`#FFF4BF`) | "SPACE", heading "For the kid who looks up", then "Two gifts for curious stargazers, both under R 1,000." |
| 9 | Product | Yellow tint | NASA Lunar Telescope, National Geographic Mega Space Activity Kit |
| 10 | Text | Purple tint (`#F3E6FF`), centred | Heading "Not sure which kit is best?", then "Drop us a message on WhatsApp and we'll help you." |
| 11 | Button | Purple tint | "Chat on WhatsApp", green (`#93DB21`) with navy text, to `https://wa.me/27756246775?text=Hi%20CREATESPACE%2C%20I%27m%20not%20sure%20which%20kit%20is%20best` (WhatsApp number from `storefront/src/config/site.json`; the message is pre-filled so it arrives with context) |
| 12 | Text | Yellow (`#FFD500`), centred | **Free delivery on orders over R 1,500** / Sent with The Courier Guy, 1 to 3 days to your door. |
| 13 | Text | White, centred | There are 35 kits in the sale, from first circuits to coding robots. Have a look before midnight. |
| 14 | Button | White | "See everything on sale", navy with white text, to `/shop?sale=true` |
| 15 | Text | White | Thanks for shopping with us this week, / **The CREATESPACE Team** |
| 16 | Footer | Navy | Unchanged |

Add `?utm_source=shopify-email&utm_medium=email&utm_campaign=2026-11-black-friday-sale&utm_content=cyber-monday` to links you type in yourself, so PostHog can tell this send apart from the first one.

## Tone: lead with the kits, not the savings

Owner's direction (27 Nov 2026): savings-led copy such as "Biggest savings", "Up to R 510 off" or "SAVE 20%" badges reads like a supermarket circular and cheapens the brand. The email names the sale and its end date (banner, intro, red strip) and lets the struck-through was-price show the discount on each product. Section labels and headings talk about the kits and the child. In the Product sections, show the was and now prices, and switch off any "sale" or percentage badge if Shopify Messaging offers one.

## Prices (live on the website, checked 27 Nov 2026)

| Product | Was | Now | Saving |
|---|---|---|---|
| MatataStudio VinciBot Coding Robot | R 2,550 | R 2,040 | R 510 (20%) |
| Makerzoid Robot Master Premium | R 2,380 | R 1,904 | R 476 (20%) |
| Makerzoid Superbot | R 1,480 | R 1,184 | R 296 (20%) |
| Robotico Ultimate UNO R3 Starter Kit | R 1,300 | R 1,105 | R 195 (15%) |
| NASA Lunar Telescope | R 1,150 | R 920 | R 230 (20%) |
| National Geographic Mega Space Activity Kit | R 620 | R 496 | R 124 (20%) |

RockitSales has applied an exact 20%, not the sale sheet's rounded figures. Robot Master is R 1,904 on the site (the sheet and the ads say R 1,900) and Mega Space is R 496 (sheet R 500, "SAVE 19%" in the first email). Shopify's Product section pulls the live price, so the email will match the site. Only the typed copy needs care: "Up to R 510 off" (VinciBot) and "R 1,416" (telescope + Mega Space) are both worked out from the live prices.

**Why these products.** The band leads with three best sellers from the brief's 12-month table: Makerzoid Robot Master Premium (#1), Superbot (#4) and MatataStudio VinciBot (#5, the biggest saving at R 510). The fourth slot went first to Smart Robot Premium (dropped: three Makerzoid kits out of four, and it repeats the Robot Master's "lots of builds" message), then to Tale-Bot Pro (dropped: stock shortfall). It's now the Robotico Ultimate UNO R3 Starter Kit (owner's call, 27 Nov): a different brand, and the next step up for older kids, with an Arduino-compatible board, 33 lessons and no soldering, for ages 13+. It's an electronics kit rather than a robot, so the heading says "robot and coding kits" and drops "most popular". It's 15% off, so the intro says "up to 20%". The space pair repeats from the first email because it's the under-R 1,000 option and works as a pair. The electronics pair and the finder block were left out to keep a last-day email short.
