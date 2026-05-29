# MatataStudio 20% off newsletter — design

## Summary

A one-off email newsletter promoting a MatataStudio 20% off promotion running **29 May – 5 June 2026**. The promotion is applied automatically as a price reduction on every MatataStudio product in Shopify, so the email pulls live prices and shows the strikethrough naturally. TaleBot Pro and VinciBot are showcased as entry points (younger and older), with a CTA to browse the full MatataStudio range.

## Goals

- Drive traffic to the TaleBot Pro and VinciBot product pages during the promo window.
- Drive traffic to the full MatataStudio range via the brand-filtered shop page.
- Communicate the promo deadline clearly without leaning gimmicky.

## Non-goals

- No discount code (auto-applied at checkout).
- No countdown timer or repeated urgency push (soft urgency only).
- No new shared components — this is one-off email content.
- No automated tests (consistent with existing `emails/` folder).
- No changes to `EmailLayout` or the `publish-broadcast.tsx` script.

## File & publish metadata

- **File**: `storefront/emails/matatastudio-20-off-may-2026.tsx`
- **Publish command**: `npm run newsletter:publish -- matatastudio-20-off-may-2026`
- **Broadcast `name`**: `MatataStudio 20% off — May 2026`
- **`subject`**: `20% off MatataStudio — this week only`
- **`previewText`**: `From storytelling robots to coding sets — every MatataStudio kit, 20% off until 5 June.`

## Featured products

Both fetched via `getProductByHandle` in `loadProps`, in parallel:

| Handle | Role | Tagline (one sentence, hand-written) |
|---|---|---|
| `matatastudio-tale-bot-pro` | First card | Screen-free storytelling and play for ages 3+. |
| `matatastudio-vincibot-coding-robot-set` | Second card | Coding and robotics that grow with the child, 6+. |

If either product is missing from Shopify, `loadProps` throws a clear error — same pattern as `welcome-spring-2026.tsx`.

## Layout

Top to bottom inside `<EmailLayout>`:

1. **Hero**
   - Centred brand illustration (`/images/illustrations/robot-blue.png` — a coding/robotics cue that matches the lead VinciBot vibe; same sizing pattern as the welcome email's robot illustration).
   - H1: `20% off MatataStudio. This week only.`
   - Body sentence: `From first stories to first lines of code, every MatataStudio kit is 20% off until 5 June.`
   - Yellow pill (matching the existing "Featured this month" pill style): `29 May – 5 June`.

2. **Featured pair** — two stacked product cards (TaleBot Pro first, VinciBot second). Each card uses the same visual pattern as the welcome email's featured-product card: image on top, then a padded inner section with title, tagline, price block (with `compareAtPrice` strikethrough when present), and an orange CTA button linking to `/product/{handle}`.

3. **Browse the full range**
   - H2: `Plus every other MatataStudio kit`
   - Body sentence: `AI Vision, Inventor & Creator add-ons, the Activity Box, classroom sets and more — all 20% off.`
   - Secondary CTA (white background, navy border, navy text — matches "Browse the shop" in the welcome email) → `/shop?brand=MatataStudio`.

4. **Closing soft urgency**
   - Small centred grey text: `Offer ends Friday 5 June. Discount applied automatically at checkout — no code needed.`

5. **Footer** — handled by `EmailLayout`.

## Implementation notes

- Use a small inline `ProductCard` component **inside `matatastudio-20-off-may-2026.tsx`** (not exported, not added to `storefront/src/components/`). Props: `{ product: ProductDetail; baseUrl: string; tagline: string }`. Renders the card markup once and is reused for both products to avoid duplicating JSX.
- Price formatting reuses `formatPrice` from `@/lib/shopify`, matching the welcome email.
- `compareAtPrice` rendering reuses the same conditional pattern as the welcome email (only show strikethrough when `compareAt.amount > minVariantPrice.amount`).
- All `/images/...` URLs are prefixed with `baseUrl` (from `EMAIL_ASSET_BASE_URL`, falling back to `https://www.thecreatespace.co.za`) so they resolve in inboxes.
- All shop / product / brand links are absolute URLs built from `baseUrl`.

## `PreviewProps`

For `npm run email:dev`, export `Component.PreviewProps` with hard-coded mock `ProductDetail` objects for both handles, including:

- Placeholder image (`https://placehold.co/540x360/...`).
- Indicative ZAR prices (e.g. TaleBot Pro: discounted `R 2,399`, compareAt `R 2,999`; VinciBot: discounted `R 3,599`, compareAt `R 4,499`) — exact placeholders only, the live broadcast uses Shopify data.
- Same nullable metafields as the welcome email's preview product.

## Tone check

- Playful and inviting: "From first stories to first lines of code" — bookends the audience range.
- Not gimmicky: no all-caps "HURRY", no countdown, no exclamation marks beyond minimal use.
- Not corporate: short sentences, brand voice consistent with the welcome email.

## Acceptance criteria

1. `npm run email:dev` renders the email locally without errors, using `PreviewProps`.
2. `npm run lint` passes from `storefront/`.
3. `npm test` passes from `storefront/` (no new tests required, but existing tests must still pass).
4. `npm run build` succeeds from `storefront/`.
5. `npm run newsletter:publish -- matatastudio-20-off-may-2026` creates a Resend Broadcast as a draft, prints the dashboard URL, and does **not** send. (This is a runtime check the user will do — not a CI gate.)
6. Email body contains: 20% framing, the date range "29 May – 5 June", two product cards, a `/shop?brand=MatataStudio` CTA, and a closing line about auto-applied discount.

## Out of scope (explicit)

- Changing `EmailLayout`.
- Changing `scripts/publish-broadcast.tsx`.
- Adding shared product-card components under `storefront/src/components/`.
- Setting up the Shopify-side discount (assumed done by user).
- A/B subject testing.
