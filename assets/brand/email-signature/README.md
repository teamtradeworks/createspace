# Email signature

`index.html` is a small generator page: fill in a name and title, click **Copy signature**, and paste into Gmail (Settings → See all settings → General → Signature → Create new). It copies rich HTML to the clipboard, so the logo, colour stripe and social icons come across as-is.

Open it straight from disk in a browser, or use the published copy shared with the team.

## What the signature contains

- Optional sign-off line (defaults to "Keep exploring,")
- Name
- CREATESPACE wordmark with the five-colour brand stripe
- One-line description of what we do
- Website, info@ address and an optional mobile number
- The ten brands from `storefront/src/config/brands.ts`, each linking to its filtered shop page (`/shop?brand=<vendor>`)
- Facebook and Instagram icons

## Hosted images

Email clients can only show images from a public URL, so the signature points at production:

| Image | URL |
|-------|-----|
| Wordmark (navy, for white backgrounds) | `https://www.thecreatespace.co.za/images/brand/logo-light.png` |
| Facebook icon | `https://www.thecreatespace.co.za/images/brand/icon-facebook.png` |
| Instagram icon | `https://www.thecreatespace.co.za/images/brand/icon-instagram.png` |

The icons live in `storefront/public/images/brand/` and must be deployed before the signature shows them.

## Gmail notes

- Gmail keeps inline styles, tables, `bgcolor` and image URLs, which is all the signature uses. It drops `<style>` blocks and web fonts, so the signature falls back from Outfit to Helvetica/Arial on most recipients' screens.
- Gmail's limit is 10,000 characters per signature. This one is about 3,000.
- Tick the signature under **Signature defaults** for both new emails and replies, then **Save Changes** at the bottom of the settings page.
