# Email signature

`index.html` is a small generator page: enter your name, click **Copy signature**, and paste into Gmail (Settings → See all settings → General → Signature → Create new). It copies rich HTML to the clipboard, so the logo, colour stripe and social icons come across as-is.

Open it straight from disk in a browser, or use the published copy shared with the team.

## What the signature contains

- "Keep exploring," sign-off in Verdana, matching the email body
- Name with the ✨ sparkles from the original signature
- CREATESPACE wordmark with the five-colour brand stripe
- Website and info@ address
- On the next line, 087 265 0997 (Office) with a phone icon and 075 624 6775 (WhatsApp) with a WhatsApp icon as a wa.me link (same number as `storefront/src/config/site.json`)
- Nine brands in semi-bold orange, each linking to its filtered shop page (`/shop?brand=<vendor>`). Vendor strings come from `storefront/src/config/brands.ts`; the order is set in `index.html` and Arduino is deliberately left out.
- Facebook, Instagram and Google icons. The Google icon links to our review page (`https://g.page/r/CUyt6FQiOY1FEAI/review`).

## Hosted images

Email clients can only show images from a public URL, so the signature points at production:

| Image | URL |
|-------|-----|
| Wordmark (navy, trimmed of its transparent margin so it sits flush left) | `https://www.thecreatespace.co.za/images/brand/logo-light-trimmed.png` |
| Facebook icon | `https://www.thecreatespace.co.za/images/brand/icon-facebook.png` |
| Instagram icon | `https://www.thecreatespace.co.za/images/brand/icon-instagram.png` |
| Google icon | `https://www.thecreatespace.co.za/images/brand/icon-google.png` |
| Phone icon | `https://www.thecreatespace.co.za/images/brand/icon-phone.png` |
| WhatsApp icon | `https://www.thecreatespace.co.za/images/brand/icon-whatsapp.png` |

The trimmed wordmark and the icons live in `storefront/public/images/brand/` and must be deployed before the signature shows them.

The on-page preview uses embedded copies of these images (`PREVIEW_IMAGES` in `index.html`), because the shared Claude page cannot load images from other hosts. The copied HTML always uses the live URLs above, since Gmail rejects embedded images. Re-embed the copies when an image changes.

Each image URL carries a `?v=N` parameter (`ASSET_VERSION` in `index.html`). Gmail's image proxy and browsers cache by URL, and they cache a 404 fetched before a file was deployed, so bump the version whenever an image is added or replaced and have everyone re-copy the signature.

## Gmail notes

- Gmail keeps inline styles, tables, `bgcolor` and image URLs, which is all the signature uses. It drops `<style>` blocks and web fonts, so the signature falls back from Outfit to Helvetica/Arial on most recipients' screens.
- Gmail's limit is 10,000 characters per signature. This one is about 3,000.
- Tick the signature under **Signature defaults** for both new emails and replies, then **Save Changes** at the bottom of the settings page.
