# Canvas formats

Every asset sets one of these names on `<html data-canvas="...">`. The sizes live in [`kit/canvas.js`](kit/canvas.js), which is the only place to change them.

Preview any asset in a browser with `?guides` on the URL to see the safe zones (screen) or the trim line and safe margin (print).

## Screen (Meta)

| Canvas | Size (px) | Ratio | Where it runs | Keep clear |
|---|---|---|---|---|
| `meta-portrait` | 1080 x 1350 | 4:5 | Instagram and Facebook feed. The default feed format: it takes the most screen on a phone. | Nothing enforced. Facebook can crop to 1:1 in some placements, so keep the headline and product in the middle 1080 x 1080. |
| `meta-square` | 1080 x 1080 | 1:1 | Feed, carousel cards, Marketplace | Nothing enforced |
| `meta-story` | 1080 x 1920 | 9:16 | Instagram and Facebook Stories | Top 270px (profile name, progress bar) and bottom 270px (reply bar, link sticker) |
| `meta-reel` | 1080 x 1920 | 9:16 | Reels | Top 270px, bottom 670px (caption and CTA button), 65px each side (like/share icons sit on the right) |
| `meta-landscape` | 1200 x 628 | 1.91:1 | Facebook right column, link previews | Nothing enforced |

Notes:

- Meta shows the headline, primary text and button **outside** the image. The image carries one short line; the rest goes in Ads Manager. Write that copy in the campaign brief next to the asset.
- A campaign usually needs the same idea in `meta-portrait` plus `meta-story` (Meta asks for both when you run Advantage+ placements). Make them as two files that share a stylesheet, not one file stretched.
- Export at exactly these sizes (`render.sh` does). Meta recompresses everything, so avoid fine text under about 28px and thin hairlines: they turn to mush.
- Safe-zone figures follow Meta's published guidance (roughly 14% top, 14% or 35% bottom). Meta changes its UI from time to time. If an ad looks covered in the Ads Manager preview, trust the preview and widen the zone in `canvas.js`.

## Screen (Google)

| Canvas | Size (px) | Ratio | Where it runs | Keep clear |
|---|---|---|---|---|
| `google-landscape` | 1200 x 628 | 1.91:1 | Performance Max and Demand Gen (required) | Google crops to other ratios automatically, so keep the subject central |
| `google-square` | 1200 x 1200 | 1:1 | Performance Max and Demand Gen (required) | Nothing enforced |
| `google-portrait` | 960 x 1200 | 4:5 | Performance Max, Discover, YouTube feeds | Nothing enforced |

Notes:

- Google's image guidance asks for little or no overlaid text, and no fake buttons. Keep Google images to the photo, the logo and at most one short badge (an age or a number). Headlines and descriptions go in the asset group as text assets.
- Each file must stay under 5MB. `render.sh` PNGs are well under.

## Print

All print canvases are built with **3mm bleed** on every side and a **5mm safe margin** inside the trim line. `render.sh` exports two PDFs from the same file: one with bleed for a print shop, one trimmed for an office printer.

| Canvas | Trim size (mm) | Canvas with bleed (mm) | Typical use |
|---|---|---|---|
| `a6` | 105 x 148 | 111 x 154 | Parcel inserts, postcards |
| `a5` | 148 x 210 | 154 x 216 | Market and event flyers |
| `a4` | 210 x 297 | 216 x 303 | One-pagers for schools, email attachments |
| `a3` | 297 x 420 | 303 x 426 | Posters for staff rooms, stands |
| `dl` | 99 x 210 | 105 x 216 | Rack cards, compliment slips |

Add `-landscape` to any print canvas to rotate it, e.g. `a4-landscape`.

In CSS, the canvas exposes `--bleed`, `--safe`, `--trim-w` and `--trim-h`. Backgrounds and full-bleed photos run to the canvas edge; text, logos, prices and QR codes stay inside `calc(var(--bleed) + var(--safe))`.

Print notes:

- **Images:** 300 DPI at printed size. A full-bleed A5 photo needs about 1820 x 2550px. Product lifestyle photos from `assets/product/<handle>/lifestyle/` are usually big enough; check before use.
- **Colour:** Chrome exports RGB. Most South African print shops accept RGB PDFs and convert, but saturated brand colours (the red, blue, green and purple especially) come out duller in CMYK. Ask for a proof on anything going to a big run.
- **Crop marks:** not added. Tell the print shop the PDF has 3mm bleed; they add their own.
- **Type:** body copy at 9pt or larger. Fonts are embedded in the PDF automatically.
- **QR codes:** at least 20mm square, navy on white, with a quiet zone. Make one with `scripts/qr.sh`. Print the short URL beside it.
