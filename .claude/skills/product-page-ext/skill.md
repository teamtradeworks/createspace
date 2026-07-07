---
name: product-page-ext
description: Create or update a custom product page for an extension/expansion product. Use when the user runs `/product-page-ext {slug} {parent-slug}`. Transforms research content into a concise extension-focused product page that links to the parent product.
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
---

# Extension Product Page Skill

## Purpose

Create or update a custom product page for extension products — expansion packs, add-ons, or kits designed to extend another product. These pages are shorter and more focused than standard product pages, with prominent messaging about the parent product relationship.

## When to Use

Invoke when:
- User runs `/product-page-ext {slug} {parent-slug}` command
- User asks to create a product page for an "extension", "expansion", or "add-on" product
- User wants to update an existing extension product page

## Prerequisites

**Required:** Research content must exist at `assets/product/{slug}/content.md`

If the content file doesn't exist, inform the user to run `/research {slug}` first.

## Arguments

Takes two arguments:
1. **slug** — the extension product's slug/handle from Shopify
2. **parent-slug** — the parent product's slug/handle (the product this extends)

Example usage:
```
/product-page-ext arduino-sensor-kit-base arduino-starter-kit
/product-page-ext snap-circuits-explorer-junior snap-circuits-classic-300
```

## What This Skill Does

1. **Validates prerequisites** — Confirms research content exists for the extension product
2. **Reads research content** — Extracts information from `assets/product/{slug}/content.md`
3. **Fetches parent product info** — Reads the parent product page (if it exists) to understand what's already covered
4. **Catalogs available images** — Lists images in `assets/product/{slug}/` subfolders
5. **Plans page structure** — Determines which components to use (fewer than standard pages)
6. **Writes the extension product page** — Creates/updates `storefront/src/app/product/{slug}/page.tsx`
7. **Copies and optimizes images** — Moves needed images to `storefront/public/images/products/{slug}/`

## Important: Dynamic vs Static Content

**Dynamic content (from Shopify - NEVER hardcode):**
- Product title
- Price and compare-at price
- Availability status
- Product images (HeroSection gallery only)
- Variants
- Vendor/brand

These are fetched at runtime via `getProductByHandle()` and passed to `HeroSection` via the `product` prop.

**Static content (from research - what you write):**
- Tagline (must reference extension nature)
- Highlights (focused on what's new)
- Section content (new capabilities, FAQs, what's included)
- Parent product name and link

## What This Skill Does NOT Do

- Research content (use `/research` first)
- Create consumer/parent-focused pages (use `/product-page` for standalone products)
- Create educator pages (use `/product-page-edu`)
- Create components (use existing components from `storefront/src/components/product-sections/`)
- Modify the design system
- Write inline JSX for sections — always use the provided components

## Key Resources

Before writing any code, read these files:

1. **Research content:** `assets/product/{slug}/content.md` (REQUIRED)
2. **Extension content framework:** `assets/brand/ext-product-content-framework.md`
3. **Design spec:** `assets/brand/product-page-design.md`
4. **Parent product page:** `storefront/src/app/product/{parent-slug}/page.tsx` (if exists — for context on what's already covered)
5. **Example page:** `storefront/src/app/product/arduino-starter-kit/page.tsx`

## Available Components

Import components from `@/components/product-sections`:

```tsx
import {
  HeroSection,
  ExtensionBanner,
  QuickInfoBadges,
  NumberedSteps,
  VideoEmbed,
  FeatureGrid,
  ImageTextBlock,
  WhatsIncluded,
  ProductFAQ,
  ProductReviews,
  CallToAction,
  RelatedProducts,
} from "@/components/product-sections";
```

## Sections to SKIP for Extensions

These components add length that extension pages don't need:

- **ProjectShowcase** — keep it brief; mention projects in FeatureGrid or NumberedSteps instead
- **CustomerShowcase** — unless end-user photos specific to this extension exist
- **SkillTags** — the parent product already established these
- **Specifications** — only include if the extension has meaningfully different specs from the parent

## Page Structure Template

```tsx
import { notFound } from "next/navigation";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  ExtensionBanner,
  QuickInfoBadges,
  NumberedSteps,
  FeatureGrid,
  WhatsIncluded,
  ProductFAQ,
  CallToAction,
  RelatedProducts,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "{slug}";
const PARENT_PRODUCT_HANDLE = "{parent-slug}";

export default async function ExtensionProductPage() {
  const [product, parentProduct] = await Promise.all([
    getProductByHandle(PRODUCT_HANDLE),
    getProductByHandle(PARENT_PRODUCT_HANDLE),
  ]);

  if (!product) {
    notFound();
  }

  const [allProducts, resolvedAddons] = await Promise.all([
    getProducts(8),
    resolveAddonsForHandle(PRODUCT_HANDLE),
  ]);

  const relatedProducts = allProducts.filter((p) => p.handle !== product.handle).slice(0, 4);
  const addons = serializeAddons(resolvedAddons);

  const parentProductName = parentProduct?.title || "the original kit";
  const parentProductHref = `/product/${PARENT_PRODUCT_HANDLE}`;

  return (
    <>
      <ProductJsonLd product={product} />

      {/* Required: Hero Section */}
      <HeroSection
        product={product}
        tagline="..."  // Must reference extension nature
        highlights={[
          "X new components/sensors/modules",
          "X guided projects to expand your skills",
          "Compatible with the [Parent Product Name]",
          "No additional experience needed",
        ]}
        addons={addons}
      />

      {/* Required: Extension Banner */}
      <ExtensionBanner
        parentProductName={parentProductName}
        parentProductHref={parentProductHref}
      />

      {/* Required: Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Recommended: What's New (NumberedSteps or FeatureGrid) */}
      <NumberedSteps
        title="What This Adds"
        steps={[
          { title: "...", description: "..." },
          { title: "...", description: "..." },
          { title: "...", description: "..." },
        ]}
        background="navy-card"
      />

      {/* Optional: Video */}
      {/* <VideoEmbed url="..." title="See It in Action" background="gray" /> */}

      {/* Optional: Feature breakdown */}
      {/* <FeatureGrid ... /> */}

      {/* Optional: 1 ImageTextBlock max for storytelling */}
      {/* <ImageTextBlock ... /> */}

      {/* Recommended: FAQ (extension-focused) */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: `Do I need the ${parentProductName}?`,
            answer: "Yes — this is an expansion that builds on ...",
          },
          // 3-4 more extension-specific questions
        ]}
        background="white"
      />

      {/* Required: What's Included */}
      <WhatsIncluded
        title="What's in the Box"
        items={[
          // Extension kit contents only
        ]}
        image="/images/products/{slug}/..."
        background="gray"
      />

      {/* Required: Call to Action */}
      <CallToAction
        title="Expand Your Kit"
        subtitle="..."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel={`View the ${parentProductName}`}
        secondaryHref={parentProductHref}
        background="navy"
      />

      {/* Required: Related Products */}
      <RelatedProducts products={relatedProducts} background="gray" />
    </>
  );
}

export async function generateMetadata() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | CREATESPACE`,
    description: "...",  // Mention parent product naturally
    alternates: {
      canonical: `/product/${PRODUCT_HANDLE}`,
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
```

## Workflow

### 1. Validate Prerequisites

```bash
# Check if content exists
ls assets/product/{slug}/content.md
```

If missing, respond:
> Research content not found for `{slug}`. Please run `/research {slug}` first to gather product information.

### 2. Read Required Files

Read these files:
- `assets/product/{slug}/content.md` — The research content
- `assets/brand/ext-product-content-framework.md` — Extension content guidelines
- `assets/brand/product-page-design.md` — Component reference
- `storefront/src/app/product/{parent-slug}/page.tsx` — Parent product page (if exists)

### 3. Catalog Available Images

List images in the product's asset folder:
```bash
ls -la assets/product/{slug}/lifestyle/ 2>/dev/null
ls -la assets/product/{slug}/end-user/ 2>/dev/null
ls -la assets/product/{slug}/projects/ 2>/dev/null
```

### 4. Plan Page Structure

**Required sections (always include):**
- HeroSection (tagline references extension nature)
- ExtensionBanner (links to parent product)
- QuickInfoBadges
- WhatsIncluded
- ProductFAQ (extension-focused)
- CallToAction (secondary CTA links to parent product)
- RelatedProducts

**Recommended sections (include if content available):**
- NumberedSteps OR FeatureGrid (for "what's new" — pick one, not both)
- VideoEmbed (if video URL in research)

**Optional sections (only if strong content available):**
- ImageTextBlock (maximum 1 — keep the page concise)
- ProductReviews (if reviews exist)

**Target page length:** 7-9 sections total (vs 10-14 for standard pages).

### 5. Write Content

Transform research content into extension-focused copy:

**Apply brand voice:**
- Fun, playful, enthusiastic, trustworthy
- Address parents directly ("your child")
- Lead with what's new, not what's in the parent product
- Be specific and concise

**Extension-specific writing rules:**
- Always name the parent product
- Don't repeat information from the parent product page
- Keep descriptions to 1-2 sentences (shorter than standard pages)
- Assume some familiarity with the parent product's brand/platform

### 6. Copy and Optimize Images

Copy selected images from assets to public, then optimize:

```bash
mkdir -p storefront/public/images/products/{slug}
cp assets/product/{slug}/lifestyle/selected-image.jpg storefront/public/images/products/{slug}/

# Resize and compress
sips --resampleWidth 1200 storefront/public/images/products/{slug}/image.jpg
npx sharp-cli --input storefront/public/images/products/{slug}/image.jpg --output storefront/public/images/products/{slug}/image.jpg --quality 80
```

Select fewer images than standard pages — 1-3 is typically enough.

### 7. Write the Page

Create/update the page file at:
`storefront/src/app/product/{slug}/page.tsx`

### 8. Humanize the Copy

Before finishing, refine the prose you wrote using the **humanizer** skill (`.agents/skills/humanizer/SKILL.md`). Apply it to every piece of customer-facing copy on the page — the tagline, ExtensionBanner text, highlights, section body text, FAQ answers, and CTA copy.

The humanizer removes the tells that make copy read as AI-generated: em dashes, forced rule-of-three lists, promotional filler ("vibrant", "testament", "boasts"), superficial "-ing" clauses, and negative parallelisms. The goal is copy that sounds like a real person at CREATESPACE wrote it.

- Only touch the prose you authored — never code, imports, prop names, or dynamic Shopify data.
- Preserve the brand voice, the concise extension tone, and every specific fact from the research. Humanizing refines how the copy reads; it does not change what it claims.

## Content Transformation Guidelines

### Hero Section

- **Tagline:** Must reference the extension nature. Examples:
  - "10 new sensors to expand your Arduino projects"
  - "New challenges for your Snap Circuits kit"
  - "Take your micro:bit further with wearable tech"
- **Highlights:** 3-4 bullets focused on what's NEW:
  - What's added (components, sensors, modules)
  - Number of new projects
  - Compatibility note
  - No additional experience needed

### ExtensionBanner

Placed immediately after HeroSection. Uses the parent product's title and link.

```tsx
<ExtensionBanner
  parentProductName={parentProductName}
  parentProductHref={parentProductHref}
/>
```

### NumberedSteps or FeatureGrid — "What's New"

Pick ONE (not both) to highlight what the extension adds:
- 3-4 items focusing on new capabilities
- Don't list features of the parent product
- Frame as additions: "adds", "introduces", "unlocks"

### ProductFAQ

4-5 questions focused on extension concerns:
1. "Do I need the [parent product]?" → Yes, state clearly what's required
2. "What's different from the [parent product]?" → Highlight new additions
3. "Can I combine this with other [brand] products?" → If applicable
4. "What new projects can they build?" → Specific examples
5. "Is this suitable for the same age range?" → Confirm or clarify

### CallToAction

- **Primary:** "Add to Cart" → `#product-actions`
- **Secondary:** Links to the PARENT PRODUCT (not `/shop`)
  - Example: `secondaryLabel="View the Arduino Starter Kit"` → `/product/arduino-starter-kit`
- **Title:** Direct and concise: "Expand Your Kit" or "Add More to Your [Product]"

## Output

The skill produces:
1. A complete extension product page at `storefront/src/app/product/{slug}/page.tsx`
2. Images copied to `storefront/public/images/products/{slug}/` (if any)

## Validation Checklist

Before completing, verify:

- [ ] Content file was read: `assets/product/{slug}/content.md`
- [ ] Extension content framework was read: `assets/brand/ext-product-content-framework.md`
- [ ] **ExtensionBanner** is present immediately after HeroSection
- [ ] ExtensionBanner links to the correct parent product
- [ ] Hero tagline references the extension nature
- [ ] CTA secondary button links to parent product (not `/shop`)
- [ ] FAQ includes "Do I need the [parent product]?" question
- [ ] Required sections included: HeroSection, ExtensionBanner, QuickInfoBadges, WhatsIncluded, ProductFAQ, CallToAction, RelatedProducts
- [ ] `<ProductJsonLd product={product} />` included
- [ ] `openGraph.images` included in `generateMetadata`
- [ ] `alternates.canonical` included in `generateMetadata`
- [ ] HeroSection receives `product` prop (no hardcoded prices)
- [ ] Page is concise (7-9 sections, not 10-14)
- [ ] No content duplicated from parent product page
- [ ] Copy passed through the humanizer skill to remove AI writing tells
- [ ] Images optimized if any were copied
- [ ] `generateMetadata` function included
- [ ] File created at correct path: `storefront/src/app/product/{slug}/page.tsx`

## Error Handling

**Content file missing:**
> Research content not found for `{slug}`. Please run `/research {slug}` first.

**Parent product page doesn't exist:**
> Note: No custom page found for parent product `{parent-slug}`. The extension page will still link to `/product/{parent-slug}` (which will use the default product page). Consider creating a custom page for the parent product first.

**No images available:**
> No product images found. The page will use text-based sections only. This is acceptable for extension pages — they are intentionally concise.

## Example

User: `/product-page-ext arduino-sensor-kit-base arduino-starter-kit`

1. Found `assets/product/arduino-sensor-kit-base/content.md`
2. Read extension content framework
3. Read parent page `storefront/src/app/product/arduino-starter-kit/page.tsx`
4. Found 2 lifestyle images
5. Planned concise page structure (8 sections)
6. Transformed content with extension focus
7. Copied and optimized 2 images
8. Created `storefront/src/app/product/arduino-sensor-kit-base/page.tsx`

Output:
> Created extension product page for Arduino Sensor Kit with:
> - Hero section referencing Arduino Starter Kit (4 highlights)
> - Extension banner linking to /product/arduino-starter-kit
> - At a Glance badges
> - "What This Adds" (3 new capabilities)
> - FAQ (5 extension-focused questions)
> - What's Included (12 items)
> - CTA with secondary link to Arduino Starter Kit
> - Related products
