# Google Business Profile images

**Status:** Approved
**Audience:** Parents searching for CREATESPACE on Google Search and Maps (the schools image is for educators)
**Channel:** Google Business Profile (not ads; no UTMs)

## What to upload where

| File (in `exports/`) | Size | Where it goes |
|---|---|---|
| `profile-portrait.png` | 1080 x 1920 | **Cover photo.** Fills the tall first tile in the Search knowledge panel |
| `logo-square.png` | 1200 x 1200 | **Logo.** Shown as a small circle beside the business name, so it is the red mark only |
| `lifestyle-*.png` | 1200 x 1200 | Photos: one per brand (National Geographic, MatataStudio, Snap Circuits, Blockaroo, micro:bit, NASA, Makerzoid) |
| `brands-square.png` | 1200 x 1200 | Photos: every brand we stock |
| `delivery-square.png` | 1200 x 1200 | Photos: delivery, payment and returns |
| `categories-square.png` | 1200 x 1200 | Photos: the six shop categories |
| `schools-square.png` | 1200 x 1200 | Photos: STEM for schools |
| `profile-cover@2x.png` | 2160 x 1216 | Alternative 16:9 cover. Not used: the Search tile crops it to a tall centre slice |

Upload order: cover and logo first, then the brand lifestyle photos, then the text-led squares. Google favours real photos over graphics, and picks which photo leads the tile, so the new cover can take a few days to appear.

## How the cover is cropped

The Search knowledge-panel tile shows about 0.62:1 from the centre of the cover, so a landscape design loses its sides. The portrait canvas (`google-business-portrait` in `creative/kit/canvas.js`) keeps everything inside the middle 1080 x 1740. Maps on mobile can crop a wide strip instead, so the logo and headline sit at the vertical centre.

## Checked facts

- Delivery: free over R 1,500, 1 to 3 days with The Courier Guy (`storefront/src/config/site.json`). Next-day delivery is no longer offered.
- Payments: Stitch. Returns: 30 days (`storefront/src/config/promises.ts`).
- Brands: the ten in `storefront/src/config/brands.ts`.
- Categories: the six in `storefront/src/config/categories.ts`.
- Schools: classroom kits, STEM tutors, CAPS-aligned curriculum, short courses (the education section of the site).

## Photos

Lifestyle photos are the brands' own photography from `assets/product/<handle>/lifestyle/` and `end-user/`, copied into `images/`. Replace them with our own customer photos as we collect them.

Re-render after any change:

```bash
marketing/scripts/render.sh marketing/campaigns/2026-10-google-profile/*.html
```
