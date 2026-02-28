---
name: product-page-edu
description: Create or update a custom education-focused product page from researched content. Use when the user runs `/product-page-edu {slug}`. Transforms research content into an educator-focused product page using the design system components.
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
---

# Education Product Page Skill

## Purpose

Create or update a custom product page for classroom kits and education products using researched content and the design system components. This skill transforms raw research content into educator-facing product pages that follow brand guidelines and help schools make confident purchasing decisions.

## When to Use

Invoke when:
- User runs `/product-page-edu {slug}` command
- User asks to "create an education product page" or "build the classroom kit page" for a specific product
- User wants to create a school/educator-focused version of a product page

## Prerequisites

**Required:** Research content must exist at `assets/product/{slug}/content.md`

If the content file doesn't exist, inform the user to run `/research {slug}` first.

## Arguments

Takes a single argument: the product slug/handle from Shopify.

Example usage:
```
/product-page-edu matatastudio-coding-set-pro
/product-page-edu arduino-starter-kit
```

## What This Skill Does

1. **Validates prerequisites** - Confirms research content exists
2. **Reads research content** - Extracts information from `assets/product/{slug}/content.md`
3. **Catalogs available images** - Lists images in `assets/product/{slug}/` subfolders
4. **Plans page structure** - Determines which components to use based on content
5. **Writes the educator-focused product page** - Creates/updates `storefront/src/app/product/{slug}/page.tsx`
6. **Copies and optimizes images** - Moves needed images to `storefront/public/images/products/{slug}/`, resizes and compresses for web

## Important: Dynamic vs Static Content

**Dynamic content (from Shopify - NEVER hardcode):**
- Product title
- Price and compare-at price
- Availability status
- Product images (HeroSection gallery only)
- Variants
- Vendor/brand

These are fetched at runtime via `getProductByHandle()` and passed to `HeroSection` via the `product` prop. The component handles all of this automatically.

**Static content (from research - what you write):**
- Tagline
- Highlights (key selling points)
- Section content (learning outcomes, FAQs, specs, etc.)
- All component props except `product`

**Local images (from assets - for all sections except hero gallery):**
- ImageTextBlock images
- FeatureGrid custom icons
- WhatsIncluded images
- Any other section images

Shopify product images are ONLY used in the HeroSection gallery. All other sections use local images from `storefront/public/images/products/{slug}/` which must be copied from `assets/product/{slug}/`.

## What This Skill Does NOT Do

- Research content (use `/research` first)
- Create consumer/parent-focused pages (use `/product-page` for that)
- Create components (use existing components from `storefront/src/components/product-sections/`)
- Modify the design system
- Write inline JSX for sections - always use the provided components

## Key Resources

Before writing any code, read these files:

1. **Research content:** `assets/product/{slug}/content.md` (REQUIRED)
2. **Design spec:** `assets/brand/product-page-design.md`
3. **Education content framework:** `assets/brand/edu-product-content-framework.md`
4. **Example page:** `storefront/src/app/product/arduino-starter-kit/page.tsx`

## Available Components

Import all components from `@/components/product-sections`:

```tsx
import {
  HeroSection,
  QuickInfoBadges,
  SkillTags,
  NumberedSteps,
  VideoEmbed,
  FeatureGrid,
  ImageTextBlock,
  WhatsIncluded,
  ProjectShowcase,
  Specifications,
  ProductFAQ,
  ProductReviews,
  CallToAction,
  RelatedProducts,
} from "@/components/product-sections";
```

## Page Structure Template

```tsx
import { notFound } from "next/navigation";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  // ... other imports
} from "@/components/product-sections";

const PRODUCT_HANDLE = "{slug}";

export default async function ProductNamePage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    notFound();
  }

  // Get related products and add-ons in parallel
  const [allProducts, resolvedAddons] = await Promise.all([
    getProducts(8),
    resolveAddonsForHandle(PRODUCT_HANDLE),
  ]);

  const relatedProducts = allProducts.filter((p) => p.handle !== product.handle).slice(0, 4);
  const addons = serializeAddons(resolvedAddons);

  return (
    <>
      <ProductJsonLd product={product} />

      {/* Required: Hero Section */}
      <HeroSection
        product={product}
        tagline="..."
        highlights={[...]}
        addons={addons}
      />

      {/* Required: Quick Info Badges */}
      <QuickInfoBadges
        age="..."
        skill="beginner|intermediate|advanced"
        supervision={true|false}
        batteries="..."
        badges={[...]}
      />

      {/* Optional sections based on content... */}

      {/* Required: Call to Action */}
      <CallToAction
        title="Equip Your Classroom"
        subtitle="..."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse Classroom Kits"
        secondaryHref="/education/classroom-kits"
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
    description: "...",
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
- `assets/product/{slug}/content.md` - The research content
- `assets/brand/product-page-design.md` - Component reference
- `assets/brand/edu-product-content-framework.md` - Education content guidelines
- `storefront/src/app/product/arduino-starter-kit/page.tsx` - Example implementation

### 3. Catalog Available Images

List images in the product's asset folder:
```bash
ls -la assets/product/{slug}/lifestyle/
ls -la assets/product/{slug}/end-user/
ls -la assets/product/{slug}/animations/
ls -la assets/product/{slug}/logo/
```

### 4. Plan Page Structure

Based on the research content, determine:

**Required sections (always include):**
- HeroSection
- QuickInfoBadges
- WhatsIncluded
- CallToAction
- RelatedProducts
- CustomerShowcase (if end-user photos exist in `assets/product/{slug}/end-user/` - must come immediately after ProjectShowcase and include ALL end-user images)

**Recommended sections (include if content available):**
- VideoEmbed (if video URL in research)
- ProductFAQ (if FAQ content available)

**Optional sections (include for flagship products):**
- SkillTags
- NumberedSteps
- FeatureGrid
- ImageTextBlock (multiple, alternating layout)
- ProjectShowcase
- Specifications
- ProductReviews

### 5. Write Content

Transform research content into educator-facing copy:

**Apply education brand voice:**
- Professional, enthusiastic, trustworthy, knowledgeable
- Address educators directly ("your learners", "your classroom" — never "your child")
- Lead with curriculum alignment and classroom practicality, follow with features
- Be specific about learner capacity and implementation requirements
- Reference CAPS curriculum where applicable
- Use South African education terminology ("learners" not "students")

**Writing rules:**
- No unexplained jargon without curriculum context
- Use bullets and short paragraphs — educators scan fast
- Address implementation concerns directly (prep time, equipment, training)
- Don't oversell — institutional trust is paramount
- Never use consumer/parent language ("your child", "gift", "fun at home")

### 6. Copy and Optimize Images

Copy selected images from assets to public, then optimize them:

```bash
# Create target directory
mkdir -p storefront/public/images/products/{slug}

# Copy selected images (not all - pick 3-5 most relevant)
cp assets/product/{slug}/lifestyle/selected-image.jpg storefront/public/images/products/{slug}/
```

**Image Optimization (REQUIRED):**

After copying, optimize each image for web performance:

```bash
# 1. Resize large images (max 1200px width for content images)
sips --resampleWidth 1200 storefront/public/images/products/{slug}/image.jpg

# 2. Compress JPEGs (quality 80)
npx sharp-cli --input storefront/public/images/products/{slug}/image.jpg --output storefront/public/images/products/{slug}/image.jpg --quality 80

# 3. Compress PNGs
npx sharp-cli --input storefront/public/images/products/{slug}/image.png --output storefront/public/images/products/{slug}/image.png --compressionLevel 9
```

**Target file sizes:**
| Image Type | Max Size | Max Width |
|------------|----------|-----------|
| Hero/feature images | < 200KB | 1920px |
| Content images | < 100KB | 1200px |
| Thumbnails/icons | < 50KB | 400px |
| GIFs/animations | < 500KB | 400px |

**Naming conventions:**
- Use lowercase with hyphens: `learners-building-circuit.jpg`
- Be descriptive: `classroom-group-robotics-activity.jpg`
- No spaces or special characters

### 7. Write the Page

Create/update the page file at:
`storefront/src/app/product/{slug}/page.tsx`

## Content Transformation Guidelines

### Hero Section

From research, extract:
- **Tagline:** One-sentence classroom value proposition
- **Highlights:** 3-4 key selling points addressing educator concerns

Example transformation:
```
Research: "The Arduino Starter Kit includes 15 hands-on projects..."
Result: tagline="Bring hands-on electronics to your classroom"
Result: highlights={["15 CAPS-aligned activities with complete lesson plans", "Serves groups of 2-4 learners", "Complete teacher guide included", "Reusable across multiple terms"]}
```

### Quick Info Badges

Map research data to badge props:
- Age range → `age="8-12"` (also reference grades in body copy)
- Skill level → `skill="beginner"`
- Supervision required → `supervision={false}`
- Battery requirements → `batteries="2x AA"`

Add custom badges for:
- Number of activities/projects
- Learner capacity per kit
- No soldering required
- Teacher guide included
- App required

### What's Included

List all items from research, grouped logically:
- Main board/kit components
- Teacher resources (guide, lesson plans, assessment rubrics)
- Learner materials (worksheets, activity cards)
- Accessories and consumables
- Storage solution (if applicable)

### FAQs

Create FAQs that address educator concerns:
- "Does this align with CAPS curriculum?"
- "How many learners can use this simultaneously?"
- "Do I need STEM expertise to teach with this?"
- "How durable is this for repeated classroom use?"
- "What preparation is needed before lessons?"
- "Is bulk/school pricing available?"
- "What assessment tools are included?"

## Image Selection Guidelines

From `assets/product/{slug}/`:

1. **Lifestyle photos** (from `lifestyle/`) - Use for:
   - ImageTextBlock sections
   - Hero backgrounds
   - Large feature images
   - **Prefer images showing group/classroom settings**

2. **End-user photos** (from `end-user/`) - Use for:
   - CustomerShowcase component
   - **IMPORTANT:** Include ALL end-user photos (do not cherry-pick)
   - Social proof sections
   - Gallery grids

3. **Project images** (from `projects/`) - Use for:
   - ProjectShowcase component ONLY
   - **IMPORTANT:** Strictly source ProjectShowcase thumbnails from `projects/` folder
   - One thumbnail per project card
   - Images display at 120% of base thumbnail size

4. **Animations/GIFs** (from `animations/`) - Use for:
   - Feature highlights
   - "Wow moment" demonstrations
   - Keep small

**Selection criteria:**
- Match image content to section topic
- Select 3-5 lifestyle images per page for ImageTextBlock (don't use all)
- Use ALL end-user photos for CustomerShowcase
- Use 6 representative project images from projects/ folder for ProjectShowcase
- Prefer classroom/group images over individual use where available
- Ensure variety (professional + authentic)
- Check filename descriptions for context

## Output

The skill produces:
1. A complete product page at `storefront/src/app/product/{slug}/page.tsx`
2. Images copied to `storefront/public/images/products/{slug}/`

## Validation Checklist

Before completing, verify:

- [ ] Content file was read: `assets/product/{slug}/content.md`
- [ ] All required sections included (HeroSection, QuickInfoBadges, WhatsIncluded, CallToAction, RelatedProducts)
- [ ] `<ProductJsonLd product={product} />` included for schema.org structured data
- [ ] `openGraph.images` included in `generateMetadata` for social sharing
- [ ] HeroSection receives `product` prop (dynamic data) - no hardcoded prices/availability
- [ ] Age/skill/supervision information present
- [ ] Content addresses educators, not parents — no "your child" language
- [ ] CTA secondary link goes to `/education/classroom-kits`
- [ ] Curriculum alignment mentioned where applicable
- [ ] FAQ addresses educator-specific concerns (curriculum, group size, teacher support)
- [ ] No unexplained jargon without curriculum context
- [ ] Images copied to public folder
- [ ] Images optimized (resized and compressed to target sizes)
- [ ] Image filenames are lowercase with hyphens
- [ ] generateMetadata function included
- [ ] File created at correct path: `storefront/src/app/product/{slug}/page.tsx`

## Error Handling

**Content file missing:**
> Research content not found. Please run `/research {slug}` first.

**No images available:**
> No product images found in `assets/product/{slug}/`. Sections requiring images (ImageTextBlock, etc.) cannot be used. Consider creating a minimal page with only required sections, or source images first.

**Note:** If the product handle is incorrect, the page will show a 404 at runtime (handled by `notFound()` in the page component). The skill assumes the slug matches a valid Shopify product.

## Example

User: `/product-page-edu matatastudio-coding-set-pro`

1. ✅ Found `assets/product/matatastudio-coding-set-pro/content.md`
2. ✅ Read design spec and education content framework
3. ✅ Found 4 lifestyle images, 2 end-user images
4. ✅ Planned full page structure
5. ✅ Transformed content with educator-focused voice
6. ✅ Selected 3 images for the page
7. ✅ Copied and optimized images (resized to 1200px, compressed to <100KB each)
8. ✅ Created `storefront/src/app/product/matatastudio-coding-set-pro/page.tsx`

Output:
> Created education-focused product page for MatataStudio Coding Set Pro with:
> - Hero section with 4 educator-focused highlights
> - At a Glance badges (auto from Shopify metafields)
> - Why Choose for Your Classroom (3 reasons)
> - 3 ImageTextBlock sections with classroom context
> - FeatureGrid (6 education-focused features)
> - Activity showcase (6 CAPS-aligned activities)
> - What's in the Kit (with teacher guide items)
> - FAQ (6 educator-specific questions)
> - Call to action linking to /education/classroom-kits
> - Related products
>
> Images optimized: 3 files, total 245KB (was 1.8MB)
