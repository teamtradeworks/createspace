# MatataStudio Christmas gifts by age

## Summary

- **Campaign slug:** `2026-12-matatastudio-christmas-by-age` (also the `utm_campaign` value)
- **Type:** Partner brand (MatataStudio), organised by age
- **Audience:** Parents
- **Persona:** Parents (and grandparents) who want a STEM Christmas gift but don't know which kit suits the child (`assets/brand/brand-strategy.md`)
- **Runs:** 1 December 2026 to about 18 December 2026
- **Owner:** Hayley
- **Status:** Draft

## The one thing

MatataStudio has a Christmas gift for every age, from a first screen-free robot at 3 to an AI robot for teens. Start with the child's age and we've already done the choosing. No sale and no discount.

## Subject

**Partner brand:** MatataStudio, shop filter `/shop?brand=MatataStudio` (200 OK 2026-11-26). One kit per age group, using the same groups and colours as the homepage "Find the right kit" tiles (`storefront/src/components/AgeGroups.tsx`).

| Age group | Pill colour | Kit shown | Shopify handle | Kit's own age | Line on the card | Stock |
|---|---|---|---|---|---|---|
| 3-5 | Rocket Red, white text | Tale-Bot Pro | `matatastudio-tale-bot-pro` | 3-5 | Screen-free coding robot | In stock |
| 6-8 | Sprout Green, navy text | Digital Microscope MX2-AS | `matatastudio-digital-microscope-mx2-as` | 4-11 | Microscope with its own screen | In stock |
| 9-12 | Sky Circuit Blue, navy text | VinciBot Coding Robot Set | `matatastudio-vincibot-coding-robot-set` | 8-12 | Codes in blocks, then Python | In stock |
| 13+ | Nebula Purple, white text | Nous AI Set | `matatastudio-nous-ai-set` | 12-16 (box says 12+) | Build and train an AI robot | In stock |

Stock checked on the live product pages (JSON-LD) on 2026-11-26. Coding Set Pro (4-9) is out of stock, so the microscope covers 6-8. No prices on the image: the live prices on 2026-11-26 are Black Friday prices and will change before this runs.

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Age groups | 3-5, 6-8, 9-12, 13+ | `storefront/src/components/AgeGroups.tsx` | 2026-11-26 |
| Kit ages and stock | As in the Subject table | `assets/product/<handle>/content.md`, live product pages | 2026-11-26 |
| Delivery | Free over R 1,500, otherwise R 140, 1-3 days with The Courier Guy | `storefront/src/config/site.json` | 2026-11-26 |

**Not claiming:** prices on the image (Black Friday prices are live until the sale ends); any sale or discount; delivery before Christmas or a last order date (not confirmed); "bestseller", ratings or customer counts; next-day delivery.

## Assets

| File | Canvas | Channel | Landing URL (with UTMs) | Link checked |
|---|---|---|---|---|
| `feed-portrait.html` | `meta-portrait` | Meta feed (lead asset) | `https://www.thecreatespace.co.za/shop?brand=MatataStudio&utm_source=meta&utm_medium=paid&utm_campaign=2026-12-matatastudio-christmas-by-age&utm_content=feed-portrait` | Not yet checked |
| `feed-square.html` | `meta-square` | Meta feed | `https://www.thecreatespace.co.za/shop?brand=MatataStudio&utm_source=meta&utm_medium=paid&utm_campaign=2026-12-matatastudio-christmas-by-age&utm_content=feed-square` | Not yet checked |
| `story.html` | `meta-story` | Meta stories | `https://www.thecreatespace.co.za/shop?brand=MatataStudio&utm_source=meta&utm_medium=paid&utm_campaign=2026-12-matatastudio-christmas-by-age&utm_content=story` | Not yet checked |

Lands on the MatataStudio brand filter. A four-card carousel (one card per kit, each to its product page) is the natural follow-up.

**Design, gift-wrapped by age:** four white product cards in a 2 x 2 block on navy, one MatataStudio kit per age group, each with the age as a coloured pill (outer corner), the real packshot, a short line on what it is in grey and the kit name in navy. A Rocket Red ribbon fills the gutters between the cards and ties them with a bow in the middle, so the block reads as one wrapped present. Headline above: "Christmas gifts, sorted by age." with "age" in orange, and "Our MatataStudio picks, from first robot to real AI." Footer: logo and "Free delivery over R 1,500" left, orange "Shop MatataStudio" CTA right. The MatataStudio name is text only: partner logos sit on white, and the kit boxes already carry it. The ribbon is a gift object, not a saving, so its red doesn't break The Red Means Saving Rule.

All three sizes share `gift-box.css` (portrait values are the defaults; square and story override sizes in their own `<style>`). The square tightens everything to a 64px margin. The story runs its content from y 236 to 1684, a little into the 270px top and bottom zones Instagram covers, because the first version left too much empty navy (2026-11-26). Faint white brand illustrations at 9% (planet top right, atom and nut bottom) fill the outer edges. Check the Ads Manager story preview before upload: if the profile name or reply bar touches the headline or CTA, move them back to 270px.

A first concept (four photo baubles hanging from the top edge) was dropped on 2026-11-26: it didn't show what the products were and felt too childish. A mixed-brand version (Makerzoid, Robotico) came next; the owner narrowed it to MatataStudio the same day.

## Imagery

Packshots from the Shopify CDN (each product's first image), resized to 700px:

| File in `images/` | Product |
|---|---|
| `tale-bot-pro-box-and-contents.jpg` | Tale-Bot Pro, box, booklet and accessories |
| `digital-microscope-mx2-as-with-slides.jpg` | Digital Microscope MX2-AS on its stand, handheld, with slides |
| `vincibot-box-robot-and-remote.jpg` | VinciBot, box, remote and activity book |
| `nous-ai-set-robot-and-case.jpg` | Nous AI Set robot and carry case |

## Ad copy (Meta)

- **Primary text:**

  > Not sure which STEM gift to get this Christmas? Start with their age.
  >
  > Our MatataStudio picks for every age:
  >
  > Ages 3-5: Tale-Bot Pro, a coding robot they program with buttons, no screen needed
  > Ages 6-8: Digital Microscope, with its own screen so the whole family can look
  > Ages 9-12: VinciBot, coding in blocks first, then Python
  > Ages 13+: Nous AI Set, build a robot and train its AI
  >
  > Free delivery on orders over R 1,500.

- **Headline:** MatataStudio gifts for every age
- **Description:** Free delivery over R 1,500
- **Button:** Shop now

**On-image headline:** "Christmas gifts, sorted by age."

## Open questions

1. Last order date for Christmas delivery (needs The Courier Guy cut-off).
2. A four-card carousel, one card per kit to its product page.
