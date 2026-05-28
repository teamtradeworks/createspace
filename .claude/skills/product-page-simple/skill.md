---
name: product-page-simple
description: Create or update a custom product page for a non-coding, non-electronics physical product (telescopes, building toys, science kits, activity books). Use when the user runs `/product-page-simple {slug}`. Transforms research content into a leaner product page that leads with curiosity and discovery rather than structured learning outcomes.
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
---

# Simple Product Page Skill

## Purpose

Create or update a custom product page for non-coding, non-electronics physical products — telescopes, building toys, discovery kits, experiment kits, and activity books. These pages are leaner than standard product pages and lead with experience, curiosity, and play rather than structured learning outcomes.

## When to Use

Invoke when:
- User runs `/product-page-simple {slug}` command
- User asks to create a product page for a telescope, building toy, science kit, mineral kit, crystal kit, activity book, or similar non-coding physical product
- User wants to update an existing simple product page

## Prerequisites

**Required:** Research content must exist at `assets/product/{slug}/content.md`

If the content file doesn't exist, inform the user to run `/research {slug}` first.

## Arguments

Takes one argument:
1. **slug** — the product's slug/handle from Shopify

Example usage:
```
/product-page-simple nasa-lunar-telescope
/product-page-simple blockaroo-foam-blocks
/product-page-simple natgeo-mineral-kit
```

## What This Skill Does

1. **Validates prerequisites** — Confirms research content exists for the product
2. **Reads research content** — Extracts information from `assets/product/{slug}/content.md`
3. **Catalogs available images** — Lists images in `assets/product/{slug}/` subfolders
4. **Plans page structure** — Determines which sections to include based on available content and product type
5. **Writes the product page** — Creates/updates `storefront/src/app/product/{slug}/page.tsx`
6. **Copies and optimizes images** — Moves needed images to `storefront/public/images/products/{slug}/`

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
- Tagline (experiential, not outcome-led)
- Highlights (3-4 bullets — what's inside, age, ease, fun/wow factor)
- Section content (FeatureGrid items, FAQs, ImageTextBlock copy, WhatsIncluded list)

## What This Skill Does NOT Do

- Research content (use `/research` first)
- Create standard coding/electronics-kit pages (use `/product-page` instead)
- Create educator pages (use `/product-page-edu`)
- Create course pages (use `/product-page-course`)
- Create extension/expansion pages (use `/product-page-ext`)
- Create or modify components (use existing components from `storefront/src/components/product-sections/`)
- Modify the design system
- Write inline JSX for sections — always use the provided components

## Key Resources

Before writing any code, read these files:

1. **Research content:** `assets/product/{slug}/content.md` (REQUIRED)
2. **Simple content framework:** `assets/brand/simple-product-content-framework.md` (REQUIRED)
3. **Parent content framework:** `assets/brand/product-content-framework.md` (for shared rules)
4. **Design spec:** `assets/brand/product-page-design.md`
5. **Component reference:** `assets/brand/product-page-components.md`
6. **Example existing pages:** look at `storefront/src/app/product/` for a recent example to mirror structure

## Available Components

Import components from `@/components/product-sections`:

```tsx
import {
  HeroSection,
  QuickInfoBadges,
  SkillTags,
  VideoEmbed,
  FeatureGrid,
  ImageTextBlock,
  ProjectShowcase,
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  CallToAction,
  RelatedProducts,
} from "@/components/product-sections";
```

## Sections to NEVER Include for Simple Products

- **NumberedSteps** — globally excluded across all product pages (too content-heavy)
- **ExtensionBanner** — extensions only
- **CourseTabs** — courses only
- **StepPath** — programming progression
- **LazyProductReviews** — only relevant when above the fold

## Page Structure

Required sections in bold. See `simple-product-content-framework.md` for full rules.

| # | Section | Status |
|---|---|---|
| 1 | **HeroSection** | Required |
| 2 | **QuickInfoBadges** | Required |
| 3 | SkillTags | Optional |
| 4 | VideoEmbed | Optional |
| 5 | FeatureGrid | Recommended |
| 6 | ImageTextBlock | Recommended (1-2) |
| 7 | ProjectShowcase | Only when 5+ standalone activities/experiments exist |
| 8 | CustomerShowcase | Required if end-user photos exist |
| 9 | ProductReviews | Optional (auto-hides) |
| 10 | **ProductFAQ** | Required |
| 11 | **WhatsIncluded** | Required |
| 12 | Specifications | Conditional (telescopes, instruments) |
| 13 | **CallToAction** | Required |

## Voice & Framing — Critical Rules

- **Lead with experience, not outcomes.** "See craters on the Moon for yourself" beats "Learn lunar topography."
- **No structured-learning-path language.** Avoid "progresses from beginner to advanced", "builds on each skill", "curriculum-aligned."
- **Curiosity, wonder, discovery, play, hands-on** — these are the keywords.
- **Learning is incidental, not the headline.**
- **No coding or electronics framing** — no platforms, programming, soldering, circuits, microcontrollers unless genuinely a product feature.
- **Lean on the research content's existing language** for section titles, counts, and framing (especially from Amazon listings or the brand's own copy). Borrow vocabulary, don't invent generic titles. This applies to naming and framing — body copy is still rewritten in CREATESPACE voice (no copy/paste).

## Workflow

### 1. Validate Prerequisites

```bash
# Check if content exists
ls assets/product/{slug}/content.md
```

If missing, respond:
> Research content not found for `{slug}`. Please run `/research {slug}` first to gather product information.

### 2. Read Required Files

- `assets/product/{slug}/content.md` — The research content
- `assets/brand/simple-product-content-framework.md` — Simple-page voice and section rules
- `assets/brand/product-content-framework.md` — Shared rules (skill tags taxonomy, SEO, etc.)
- `assets/brand/product-page-design.md` — Component reference

### 3. Catalog Available Images

```bash
ls -la assets/product/{slug}/lifestyle/ 2>/dev/null
ls -la assets/product/{slug}/end-user/ 2>/dev/null
ls -la assets/product/{slug}/projects/ 2>/dev/null
ls -la assets/product/{slug}/animations/ 2>/dev/null
```

### 4. Plan Page Structure

Pick sections from the table above based on:
- **ProjectShowcase** — include only if there are 5+ standalone activities/experiments in the research content
- **Specifications** — include for telescopes/instruments with magnification, dimensions, materials worth listing; skip for foam blocks, activity books
- **CustomerShowcase** — required if `assets/product/{slug}/end-user/` contains photos
- **VideoEmbed** — include if a good video URL exists in the research
- **SkillTags** — include 2-3 tags only if they honestly fit (Creativity, Patience & Focus, Fine Motor Skills, Following Instructions, Science). Skip if forced.

### 5. Write Content

Transform research content into simple-product copy:

- **Apply simple-product voice:** experience-led, curiosity-led, no learning-path language
- **Pull titles from research** wherever the brand has its own framing for activities/experiments/contents
- **Tagline:** experiential ("Grow your own glittering crystals at home")
- **Highlights:** 3-4 bullets — what's inside, age, ease, fun factor (NOT learning outcomes)
- **FAQs:** focus on age, mess, setup, safety, independence, replayability — NOT coding/software/soldering
- **No copy/paste** of body copy from research per `CLAUDE.md` rule, but DO borrow titling/framing

### 6. Copy and Optimize Images

```bash
mkdir -p storefront/public/images/products/{slug}
cp assets/product/{slug}/lifestyle/selected-image.jpg storefront/public/images/products/{slug}/

# Resize and compress
sips --resampleWidth 1200 storefront/public/images/products/{slug}/image.jpg
npx sharp-cli --input storefront/public/images/products/{slug}/image.jpg --output storefront/public/images/products/{slug}/image.jpg --quality 80
```

Select 2-4 images — fewer than standard pages, more than extension pages.

### 7. Write the Page

Create/update the page file at:
`storefront/src/app/product/{slug}/page.tsx`

Include:
- `<ProductJsonLd product={product} />`
- `generateMetadata` with `title`, `description` (under 160 chars), `alternates.canonical`, `openGraph.images`
- Single `<h1>` (provided by `HeroSection` — do not add another)
- `RelatedProducts` at the bottom

### 8. Remind the User of Pre-Push Checks

After writing the page, remind the user to run from `storefront/`:
```bash
npm run lint
npm run build
npm test
```

And to add the page to `storefront/src/app/sitemap.ts`.

## Output

The skill produces:
1. A complete simple product page at `storefront/src/app/product/{slug}/page.tsx`
2. Images copied to `storefront/public/images/products/{slug}/` (if any)

## Validation Checklist

Before completing, verify:

- [ ] Content file was read: `assets/product/{slug}/content.md`
- [ ] Simple content framework was read: `assets/brand/simple-product-content-framework.md`
- [ ] Required sections included: HeroSection, QuickInfoBadges, ProductFAQ, WhatsIncluded, CallToAction
- [ ] **NumberedSteps is NOT included**
- [ ] Hero tagline is experiential, not outcome-led
- [ ] No coding/electronics/soldering/platform language anywhere unless genuinely a feature
- [ ] No "learning journey" or "progresses from beginner" language
- [ ] ProjectShowcase title (if used) is drawn from research content, not invented
- [ ] FAQ topics focus on simple-product concerns (age, mess, setup, safety, independence, replayability)
- [ ] `<ProductJsonLd product={product} />` included
- [ ] `generateMetadata` exports `title`, `description`, `alternates.canonical`, `openGraph.images`
- [ ] HeroSection receives `product` prop (no hardcoded prices)
- [ ] Images optimised if any were copied
- [ ] Backgrounds alternate — no two consecutive sections share the same colour
- [ ] File created at correct path: `storefront/src/app/product/{slug}/page.tsx`
- [ ] User reminded of pre-push checks (`npm run lint`, `npm run build`, `npm test`) and sitemap update

## Error Handling

**Content file missing:**
> Research content not found for `{slug}`. Please run `/research {slug}` first.

**No images available:**
> No product images found in `assets/product/{slug}/`. The page will use text-only sections (no ImageTextBlock, no CustomerShowcase). Consider sourcing images before publishing.

**Product seems to involve coding/electronics:**
> The research content suggests this product involves coding or electronics. The `/product-page-simple` skill is for non-coding products — `/product-page` may be a better fit. Please confirm which to use.
