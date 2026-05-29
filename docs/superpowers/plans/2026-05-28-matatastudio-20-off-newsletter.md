# MatataStudio 20% Off Newsletter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a one-off email newsletter template (`storefront/emails/matatastudio-20-off-may-2026.tsx`) promoting a 20% off MatataStudio sale (29 May – 5 June 2026), featuring TaleBot Pro and VinciBot, and link out to the full MatataStudio range. Publishable as a Resend Broadcast draft via the existing `npm run newsletter:publish` script.

**Architecture:** Single new file under `storefront/emails/`, following the same pattern as the existing `welcome-spring-2026.tsx`. Exports `metadata`, `loadProps` (fetches both products from Shopify in parallel), a default React component (using the shared `EmailLayout` + an inline `ProductCard` helper for the two featured products), and `PreviewProps` for the `email:dev` preview server. No new shared components, no new tests (`emails/` has none), no changes to `EmailLayout` or the publish script. The 20% discount is applied automatically in Shopify, so live `priceRange` / `compareAtPriceRange` data renders the strikethrough naturally.

**Tech Stack:** React + `@react-email/components` + Tailwind config inside `EmailLayout`, TypeScript, `getProductByHandle` from `src/lib/shopify`, Resend (via existing publish script).

**Spec:** `docs/superpowers/specs/2026-05-28-matatastudio-20-off-newsletter-design.md`.

---

## File Structure

- **Create**: `storefront/emails/matatastudio-20-off-may-2026.tsx` — the entire email module.

That is the only file in the change.

---

## Task 1: Scaffold the email module (imports, metadata, types, loadProps)

**Files:**
- Create: `storefront/emails/matatastudio-20-off-may-2026.tsx`

- [ ] **Step 1: Create the file with imports, constants, metadata, Props type, loadProps, and a placeholder default export**

Create `storefront/emails/matatastudio-20-off-may-2026.tsx` with exactly this content:

```tsx
import { Button, Heading, Img, Section, Text } from "@react-email/components";
import { formatPrice, getProductByHandle, type ProductDetail } from "../src/lib/shopify";
import { EmailLayout } from "./components/EmailLayout";

const TALE_BOT_HANDLE = "matatastudio-tale-bot-pro";
const VINCIBOT_HANDLE = "matatastudio-vincibot-coding-robot-set";
const DEFAULT_BASE_URL = "https://www.thecreatespace.co.za";

export const metadata = {
  name: "MatataStudio 20% off — May 2026",
  subject: "20% off MatataStudio — this week only",
  previewText:
    "From storytelling robots to coding sets — every MatataStudio kit, 20% off until 5 June.",
};

type Props = {
  baseUrl: string;
  taleBotPro: ProductDetail;
  vinciBot: ProductDetail;
};

export async function loadProps(): Promise<Props> {
  const baseUrl = process.env.EMAIL_ASSET_BASE_URL ?? DEFAULT_BASE_URL;
  const [taleBotPro, vinciBot] = await Promise.all([
    getProductByHandle(TALE_BOT_HANDLE),
    getProductByHandle(VINCIBOT_HANDLE),
  ]);
  if (!taleBotPro) {
    throw new Error(
      `Featured product "${TALE_BOT_HANDLE}" not found in Shopify. Update TALE_BOT_HANDLE in matatastudio-20-off-may-2026.tsx.`,
    );
  }
  if (!vinciBot) {
    throw new Error(
      `Featured product "${VINCIBOT_HANDLE}" not found in Shopify. Update VINCIBOT_HANDLE in matatastudio-20-off-may-2026.tsx.`,
    );
  }
  return { baseUrl, taleBotPro, vinciBot };
}

export default function MatataStudio20OffMay2026({ baseUrl }: Props) {
  return (
    <EmailLayout previewText={metadata.previewText} baseUrl={baseUrl}>
      <Section>
        <Heading className="m-0 text-2xl font-semibold text-navy">
          Scaffolding — content lands in Task 2.
        </Heading>
      </Section>
    </EmailLayout>
  );
}
```

- [ ] **Step 2: Verify the file compiles via lint**

Run from `storefront/`:

```bash
npm run lint
```

Expected: no errors. (TypeScript errors would surface during build; lint catches obvious issues now.) If lint flags the unused `Button`, `Img`, or `Text` imports, leave them — they will be used in Task 2 and removing them now would just churn the file.

If the lint rule for unused imports is strict and fails, temporarily comment out `Button`, `Img`, `Text` (keep `Heading` and `Section` — they're used by the placeholder). Restore in Task 2.

- [ ] **Step 3: Verify the email appears in the preview server**

Start the preview server from `storefront/`:

```bash
npm run email:dev
```

Open `http://localhost:3000` in a browser. Expected:
- `matatastudio-20-off-may-2026.tsx` appears in the file list.
- Clicking it renders the placeholder heading "Scaffolding — content lands in Task 2." inside the EmailLayout chrome (navy logo header, footer with illustrations).
- No console errors.

Note: At this stage there is no `PreviewProps`, so the preview server will pass `undefined` for `baseUrl`. The `EmailLayout`'s logo image src will be broken (`undefined/images/brand/logo-dark.png`); this is expected and will be fixed in Task 3. Confirm the heading renders, then stop the server (`Ctrl+C`).

- [ ] **Step 4: Do not commit yet**

The file is incomplete. Commit happens after Task 4.

---

## Task 2: Implement the full component layout

**Files:**
- Modify: `storefront/emails/matatastudio-20-off-may-2026.tsx`

- [ ] **Step 1: Replace the default export with the full layout and inline ProductCard**

Find this block in `storefront/emails/matatastudio-20-off-may-2026.tsx`:

```tsx
export default function MatataStudio20OffMay2026({ baseUrl }: Props) {
  return (
    <EmailLayout previewText={metadata.previewText} baseUrl={baseUrl}>
      <Section>
        <Heading className="m-0 text-2xl font-semibold text-navy">
          Scaffolding — content lands in Task 2.
        </Heading>
      </Section>
    </EmailLayout>
  );
}
```

Replace it with:

```tsx
type ProductCardProps = {
  product: ProductDetail;
  baseUrl: string;
  tagline: string;
};

function ProductCard({ product, baseUrl, tagline }: ProductCardProps) {
  const productImage = product.images.edges[0]?.node;
  const productUrl = `${baseUrl}/product/${product.handle}`;
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode,
  );
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const compareAtPrice =
    compareAt && parseFloat(compareAt.amount) > parseFloat(product.priceRange.minVariantPrice.amount)
      ? formatPrice(compareAt.amount, compareAt.currencyCode)
      : null;

  return (
    <Section className="mt-6 overflow-hidden rounded-xl border border-solid border-gray-200">
      {productImage ? (
        <Img
          src={productImage.url}
          alt={productImage.altText ?? product.title}
          width="540"
          height="360"
          className="block h-auto w-full object-cover"
        />
      ) : null}
      <Section className="px-6 py-6">
        <Heading as="h2" className="m-0 text-2xl font-semibold text-navy">
          {product.title}
        </Heading>
        <Text className="mt-2 text-base leading-relaxed text-gray-700">{tagline}</Text>
        <Section className="mt-4">
          <Text className="m-0 text-2xl font-semibold text-navy">
            {price}
            {compareAtPrice ? (
              <span className="ml-2 text-base font-normal text-gray-400 line-through">
                {compareAtPrice}
              </span>
            ) : null}
          </Text>
        </Section>
        <Section className="mt-5">
          <Button
            href={productUrl}
            className="rounded-md bg-orange px-6 py-3 text-base font-semibold text-white"
          >
            View product
          </Button>
        </Section>
      </Section>
    </Section>
  );
}

export default function MatataStudio20OffMay2026({ baseUrl, taleBotPro, vinciBot }: Props) {
  return (
    <EmailLayout previewText={metadata.previewText} baseUrl={baseUrl}>
      <Section className="text-center">
        <Img
          src={`${baseUrl}/images/illustrations/robot-blue.png`}
          width="80"
          height="163"
          alt=""
          className="mx-auto"
        />
        <Heading className="mb-2 mt-4 text-3xl font-semibold leading-tight text-navy">
          20% off MatataStudio. This week only.
        </Heading>
        <Text className="m-0 text-base leading-relaxed text-gray-700">
          From first stories to first lines of code, every MatataStudio kit is 20% off until 5 June.
        </Text>
      </Section>

      <Section className="mt-6 text-center">
        <Text className="m-0 inline-block rounded-full bg-brand-yellow px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy">
          29 May – 5 June
        </Text>
      </Section>

      <ProductCard
        product={taleBotPro}
        baseUrl={baseUrl}
        tagline="Screen-free storytelling and play for ages 3+."
      />
      <ProductCard
        product={vinciBot}
        baseUrl={baseUrl}
        tagline="Coding and robotics that grow with the child, 6+."
      />

      <Section className="mt-10">
        <Heading as="h2" className="m-0 text-xl font-semibold text-navy">
          Plus every other MatataStudio kit
        </Heading>
        <Text className="mt-2 text-base leading-relaxed text-gray-700">
          AI Vision, Inventor &amp; Creator add-ons, the Activity Box, classroom sets and more — all 20% off.
        </Text>
      </Section>

      <Section className="mt-6 text-center">
        <Button
          href={`${baseUrl}/shop?brand=MatataStudio`}
          className="rounded-md border border-solid border-navy bg-white px-6 py-3 text-base font-semibold text-navy"
        >
          Browse all MatataStudio
        </Button>
      </Section>

      <Section className="mb-2 mt-8 text-center">
        <Text className="m-0 text-xs text-gray-500">
          Offer ends Friday 5 June. Discount applied automatically at checkout — no code needed.
        </Text>
      </Section>
    </EmailLayout>
  );
}
```

(If in Task 1 / Step 2 you temporarily commented out `Button`, `Img`, or `Text`, uncomment those imports now — they are used here.)

- [ ] **Step 2: Run lint**

From `storefront/`:

```bash
npm run lint
```

Expected: no errors. If TypeScript complains about anything, the most likely cause is a typo in property access on `ProductDetail`. Re-check against the canonical type at `storefront/src/lib/shopify.ts:380`.

---

## Task 3: Add PreviewProps for the email:dev preview server

**Files:**
- Modify: `storefront/emails/matatastudio-20-off-may-2026.tsx`

- [ ] **Step 1: Append PreviewProps to the bottom of the file**

Append this block at the **very end** of `storefront/emails/matatastudio-20-off-may-2026.tsx` (after the default export function):

```tsx
const PREVIEW_TALE_BOT: ProductDetail = {
  id: "preview-tale-bot",
  title: "MatataStudio Tale-Bot Pro",
  handle: TALE_BOT_HANDLE,
  description: "Screen-free storytelling robot for early learners.",
  descriptionHtml: "",
  vendor: "MatataStudio",
  productType: "",
  tags: [],
  availableForSale: true,
  priceRange: {
    minVariantPrice: { amount: "2399.00", currencyCode: "ZAR" },
    maxVariantPrice: { amount: "2399.00", currencyCode: "ZAR" },
  },
  compareAtPriceRange: {
    minVariantPrice: { amount: "2999.00", currencyCode: "ZAR" },
  },
  images: {
    edges: [
      {
        node: {
          url: "https://placehold.co/540x360/0C1446/FFFFFF/png?text=Tale-Bot+Pro",
          altText: "Tale-Bot Pro",
        },
      },
    ],
  },
  media: { edges: [] },
  variants: { edges: [] },
  minAge: null,
  maxAge: null,
  batteriesRequired: null,
  batteriesIncluded: null,
  batteriesList: null,
  projects: null,
  guide: null,
  soldering: null,
  codingPlatform: null,
  rating: null,
  ratingCount: null,
};

const PREVIEW_VINCIBOT: ProductDetail = {
  id: "preview-vincibot",
  title: "MatataStudio VinciBot Coding Robot Set",
  handle: VINCIBOT_HANDLE,
  description: "Coding and robotics that grow with the child.",
  descriptionHtml: "",
  vendor: "MatataStudio",
  productType: "",
  tags: [],
  availableForSale: true,
  priceRange: {
    minVariantPrice: { amount: "3599.00", currencyCode: "ZAR" },
    maxVariantPrice: { amount: "3599.00", currencyCode: "ZAR" },
  },
  compareAtPriceRange: {
    minVariantPrice: { amount: "4499.00", currencyCode: "ZAR" },
  },
  images: {
    edges: [
      {
        node: {
          url: "https://placehold.co/540x360/0C1446/FFFFFF/png?text=VinciBot",
          altText: "VinciBot",
        },
      },
    ],
  },
  media: { edges: [] },
  variants: { edges: [] },
  minAge: null,
  maxAge: null,
  batteriesRequired: null,
  batteriesIncluded: null,
  batteriesList: null,
  projects: null,
  guide: null,
  soldering: null,
  codingPlatform: null,
  rating: null,
  ratingCount: null,
};

MatataStudio20OffMay2026.PreviewProps = {
  baseUrl: DEFAULT_BASE_URL,
  taleBotPro: PREVIEW_TALE_BOT,
  vinciBot: PREVIEW_VINCIBOT,
} satisfies Props;
```

If TypeScript complains that `PREVIEW_TALE_BOT` or `PREVIEW_VINCIBOT` is missing a property because the canonical `ProductDetail` type has more fields than listed above (check `storefront/src/lib/shopify.ts:380`), add the missing fields with `null` or sensible empty defaults — match what the welcome email's `PreviewProps` does at `storefront/emails/welcome-spring-2026.tsx:133` for reference.

- [ ] **Step 2: Run lint**

From `storefront/`:

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Verify the rendered preview in the browser**

Start the dev server from `storefront/`:

```bash
npm run email:dev
```

Open `http://localhost:3000` in a browser, click `matatastudio-20-off-may-2026.tsx`. Visually confirm:

- [ ] Navy header band with the CREATESPACE logo (logo image loads — no broken-image icon).
- [ ] Blue robot illustration centred.
- [ ] H1: "20% off MatataStudio. This week only."
- [ ] Body sentence below the H1 mentioning "until 5 June".
- [ ] Yellow pill showing "29 May – 5 June".
- [ ] Tale-Bot Pro card with placeholder image, title "MatataStudio Tale-Bot Pro", tagline about storytelling, price `R 2,399.00` with `R 2,999.00` struck through, orange "View product" button.
- [ ] VinciBot card with placeholder image, title "MatataStudio VinciBot Coding Robot Set", tagline about coding, price `R 3,599.00` with `R 4,499.00` struck through, orange "View product" button.
- [ ] H2: "Plus every other MatataStudio kit" + body line mentioning add-ons and classroom sets.
- [ ] Outlined navy "Browse all MatataStudio" button.
- [ ] Small grey closing text: "Offer ends Friday 5 June. Discount applied automatically at checkout — no code needed."
- [ ] Footer with three illustrations + copy + unsubscribe link.

If any item is missing or styled wrong, fix it before continuing. Stop the dev server (`Ctrl+C`).

---

## Task 4: Final verification (lint, unit tests, build) and commit

**Files:**
- No changes — verification + commit only.

- [ ] **Step 1: Run lint**

From `storefront/`:

```bash
npm run lint
```

Expected: passes.

- [ ] **Step 2: Run unit tests**

From `storefront/`:

```bash
npm test
```

Expected: passes (no new tests, but existing tests must remain green).

- [ ] **Step 3: Run the production build**

From `storefront/`:

```bash
npm run build
```

Expected: build succeeds. The new email file lives under `storefront/emails/` which is outside `src/app/`, so it should not affect the Next.js build, but a clean build run is the project's "before pushing" gate per `CLAUDE.md`.

- [ ] **Step 4: Commit**

From the repo root:

```bash
git add storefront/emails/matatastudio-20-off-may-2026.tsx
git commit -m "Add MatataStudio 20% off newsletter (29 May – 5 June)"
```

(No `Co-Authored-By` line — repo convention per `CLAUDE.md`.)

- [ ] **Step 5: Confirm working tree is clean**

```bash
git status
```

Expected: `nothing to commit, working tree clean`.

---

## Post-implementation (manual, by the user)

These steps are **not** part of the implementation plan because they require credentials and human review, but listing them so they aren't forgotten:

1. From `storefront/`, with `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `RESEND_FROM_EMAIL`, and `EMAIL_ASSET_BASE_URL` set in `.env.local`, run:

   ```bash
   npm run newsletter:publish -- matatastudio-20-off-may-2026
   ```

   The script will create a **draft** Broadcast in Resend, print the broadcast ID and dashboard URL, and exit. It does not send.

2. Review the draft in the Resend dashboard, confirm the live Shopify prices look correct (TaleBot Pro and VinciBot should show the discounted price plus the strikethrough compareAt), and schedule/send from there.

3. After the promo window closes (5 June), no code change is required — but the file remains in the repo as a record of the campaign.
