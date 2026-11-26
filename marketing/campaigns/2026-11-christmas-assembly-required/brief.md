# Christmas: some assembly required

## Summary

- **Campaign slug:** `2026-11-christmas-assembly-required` (also the `utm_campaign` value)
- **Type:** CREATESPACE awareness (Christmas)
- **Audience:** Parents
- **Persona:** Parents choosing a Christmas gift for their own child, both those who already value STEM and those unfamiliar with it (`assets/brand/brand-strategy.md`). Runs to a broad audience: people who don't know us yet and people who have visited or follow us.
- **Runs:** No fixed dates. Christmas season 2026, pulled after Christmas.
- **Owner:** Hayley
- **Status:** Draft (2026-11-26)

## The one thing

At CREATESPACE, the gift is the building. "Some assembly required" is usually the scariest line on a Christmas box; on ours it's the best part, because kids build, test and rebuild these kits long after Christmas morning.

Different from the other Christmas campaigns: `2026-12-christmas-gift-guide` sells three named kits (wish list, January calendar, Robot Master) and `2026-12-marble-run-christmas-review` sells one kit through a review. This one sells CREATESPACE as the place for gifts that get built, with no product, price or offer on the image.

## Subject

**CREATESPACE awareness:** CREATESPACE is the STEM specialist for Christmas gifts that kids build themselves. Carried by photos of one kit, the Makerzoid Robot Master Premium, followed from box to build to code to the next build (one product only, so the four steps read as one gift; Hayley, 2026-11-26), and by the delivery facts below. The kit isn't named on the image.

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Delivery | Free over R 1,500; otherwise R 140 | `storefront/src/config/site.json` | 2026-11-26 |
| Delivery time and courier | 1-3 days to your door, The Courier Guy | `storefront/src/config/site.json` | 2026-11-26 |
| What we sell | STEM kits (specialist, not a general toy store) | `marketing/PRODUCT.md`, `assets/brand/brand-strategy.md` | 2026-11-26 |
| Robot Master | 200+ robot models from one box; app coding; ages 6-14 (live page shows Ages 6-14, in stock, R 1,904 on 2026-11-26; price stays off the image) | `assets/product/makerzoid-robot-master-premium/content.md` | 2026-11-26 |

**Not claiming:** delivery before Christmas or a last order date (not confirmed with The Courier Guy); any discount or sale; customer counts, ratings, "bestseller" or "South Africa's biggest"; the 120+ schools figure (it's for educators and unverified here); next-day delivery; that kids "never get bored" or play "for months" as a fact (say it as an invitation, not a statistic).

## Assets

| File | Canvas | Channel | Landing URL (with UTMs) | Link checked |
|---|---|---|---|---|
| `feed-portrait.html` | `meta-portrait` | Meta feed (lead asset) | `https://www.thecreatespace.co.za/product/makerzoid-robot-master-premium?utm_source=meta&utm_medium=paid&utm_campaign=2026-11-christmas-assembly-required&utm_content=feed-portrait` | 200 OK 2026-11-26 |
| `feed-square.html` | `meta-square` | Meta feed | `https://www.thecreatespace.co.za/product/makerzoid-robot-master-premium?utm_source=meta&utm_medium=paid&utm_campaign=2026-11-christmas-assembly-required&utm_content=feed-square` | 200 OK 2026-11-26 |
| `story.html` | `meta-story` | Meta stories | `https://www.thecreatespace.co.za/product/makerzoid-robot-master-premium?utm_source=meta&utm_medium=paid&utm_campaign=2026-11-christmas-assembly-required&utm_content=story` | 200 OK 2026-11-26 |

All three share `assembly.css` (per-canvas geometry under `[data-canvas]`) and each has its own scattered star field: `stars.svg` (portrait), `stars-square.svg`, `stars-story.svg`. The story's content runs from about 230px to 1690px, a little inside Meta's 270px zones (Hayley, 2026-11-26: the gaps were too big). Its footer stacks the kit name and details over a full-width CTA. Check it in the Ads Manager story preview before launch.

Lands on the Robot Master product page (changed from `/shop` on 2026-11-26): every photo is that kit and the footer names it, so the tap should land on it.

## Imagery

| File in `images/` | Source | Shows |
|---|---|---|
| `girls-opening-robot-master-at-christmas.jpg` | Supplied by Hayley in chat, 2026-11-26 (1500 x 1500, Makerzoid Christmas lifestyle shot); also saved to `assets/product/makerzoid-robot-master-premium/lifestyle/girl-and-sister-opening-robot-master-under-christmas-tree.jpg` | Two girls opening a Robot Master box on the floor in front of a Christmas tree, wrapped gifts beside them (step 1) |
| `kids-building-makerzoid-robot-on-floor.jpg` | `assets/product/makerzoid-robot-master-premium/lifestyle/kids-playing-with-pieces-with-tablet-instructions.png` (1000 x 666, converted to JPEG) | Overhead: two children building on a wooden floor, parts and a tablet with instructions around them (step 2) |
| `boy-coding-makerzoid-robot-on-tablet.jpg` | `assets/product/makerzoid-robot-master-premium/lifestyle/boy-coding-on-tablet-with-robot-on-floor.jpg` (600 x 600, white side borders trimmed to 563 x 600; zoomed 1.1x in the frame) | Boy lying on a rug coding on a tablet, two Robot Master builds behind him (step 3) |
| `makerzoid-helicopter-build-with-manual.jpg` | `assets/product/makerzoid-robot-master-premium/lifestyle/helicopter-being-built-with-manual.jpg` (2200 x 1239, resized to 1400 wide; zoomed 1.25x on the helicopter in the frame) | A finished robot helicopter beside the parts tray and the open build manual (step 4) |

All four images are of the Makerzoid Robot Master Premium. All four are the manufacturer's lifestyle photos, replacing customer phone photos and project renders (2026-11-26). Confirm the step 1 photo's source and that we may use it in ads, as with the other Makerzoid imagery. Girls and boys both appear. The set is light on children of colour; swap in another Robot Master photo if a better one turns up.

## Ad copy (Meta)

- **Primary text:**

  > "Some assembly required" usually means a long night for Father Christmas. On our kits, it's the whole point.
  >
  > Kids open the box, build the robot, code it on a tablet, then pull it apart and build something new. That's the Makerzoid Robot Master (ages 6-14) in the photos, and we stock STEM kits for ages 3 to teens, so we'll tell you straight which one suits your child.
  >
  > Free delivery on orders over R 1,500, with The Courier Guy.

- **Headline:** Christmas gifts they build themselves
- **Description:** STEM kits, delivered across South Africa
- **Button:** Shop now

**On-image line:** "The gift that keeps building." with "building." in orange, and "200+ robots in one box." below (Robot Master, from the facts table). Changed from "Some assembly required. That's the gift." on 2026-11-26 (Hayley didn't love it).

Ages 3 to teens: the live `/shop` age filter runs from 3-5 to 13+ (checked 2026-11-26). Recheck before shipping.

Copy follows `voice-and-tone.md`: no dashes, no banned phrases, money as `R 1,500`. Humanizer rules applied by hand.

## Constraints

- **Design (built 2026-11-26, `feed-portrait.html`, styles in `assembly.css`):** a kit's assembly instruction sheet on a navy ground printed like gift wrap (yellow and white stars scattered by hand in `stars.svg`, not a repeat, and kept clear of the text). The sheet is headed "Assembly instructions" with "Christmas morning onwards" on the right, and holds four numbered steps, each a photo of the Makerzoid Robot Master Premium: 1 "Unwrap it.", 2 "Build it.", 3 "Code it.", 4 "Build the next one." Orange chevrons link the steps. Footer: "Makerzoid Robot Master Premium" and "Ages 6-14 · Free delivery over R 1,500" left, orange "Shop the kit" CTA right. Christmas comes through the gift-wrap stars and the sheet note only, not snow or red-and-green.
- Navy and white with accent colours, Outfit. No partner logos on navy; product boxes appear only as photographed.
- Keep the headline and the steps inside the middle 1080 x 1080 so a 1:1 crop still works.

## Open questions

1. **Square and story versions.** Done 2026-11-26.
2. **Last order date.** As with the gift guide, no delivery-by-Christmas promise until a date is confirmed with The Courier Guy.
