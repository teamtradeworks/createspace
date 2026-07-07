---
name: product-page-course
description: Create or update a custom course product page from researched content. Use when the user runs `/product-page-course {slug}`. Transforms research content into a course-focused product page using the design system components.
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
---

# Course Product Page Skill

## Purpose

Create or update a custom product page for online courses (digital products) using researched content and the design system components. These are courses hosted on the Inspire Africa learning platform — simpler pages focused on what the course teaches, duration, modules, and outcomes.

## When to Use

Invoke when:
- User runs `/product-page-course {slug}` command
- User asks to "create a course page" or "build the course product page" for a specific course
- User wants to update an existing custom course product page

## Prerequisites

**Required:** Research content must exist at `assets/courses/{slug}/content.md`

If the content file doesn't exist, inform the user to run `/research {slug}` first.

## Arguments

Takes a single argument: the product slug/handle from Shopify.

Example usage:
```
/product-page-course intro-to-robotics
/product-page-course stem-coding-fundamentals
```

## What This Skill Does

1. **Validates prerequisites** - Confirms research content exists
2. **Reads research content** - Extracts information from `assets/courses/{slug}/content.md`
3. **Catalogs available images** - Lists images in `assets/courses/{slug}/` subfolders (if any)
4. **Plans page structure** - Determines which components to use based on content
5. **Writes the course product page** - Creates/updates `storefront/src/app/product/{slug}/page.tsx`
6. **Copies and optimizes images** - Moves needed images to `storefront/public/images/products/{slug}/` (if any)

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
- Learning outcomes, modules, FAQs
- All component props except `product`

## What This Skill Does NOT Do

- Research content (use `/research` first)
- Create consumer/parent-focused pages (use `/product-page` for that)
- Create educator/classroom-kit pages (use `/product-page-edu` for that)
- Create components (use existing components from `storefront/src/components/product-sections/`)
- Modify the design system
- Write inline JSX for sections - always use the provided components

## Key Resources

Before writing any code, read these files:

1. **Research content:** `assets/courses/{slug}/content.md` (REQUIRED)
2. **Design spec:** `assets/brand/product-page-design.md`
3. **Example page:** `storefront/src/app/product/arduino-starter-kit/page.tsx`

## Available Components

Import components from `@/components/product-sections`:

```tsx
import {
  HeroSection,
  NumberedSteps,
  VideoEmbed,
  FeatureGrid,
  ImageTextBlock,
  ProductFAQ,
  CallToAction,
  RelatedProducts,
} from "@/components/product-sections";
```

## Sections to SKIP for Courses

These components are for physical products and should NOT be used on course pages:

- **QuickInfoBadges** — relies on physical product metafields (batteries, soldering, etc.)
- **WhatsIncluded** — no physical box contents
- **Specifications** — no hardware specs
- **ProjectShowcase** — no physical projects
- **CustomerShowcase** — no end-user photos
- **SkillTags** — not applicable to digital courses
- **ProductReviews** — skip unless reviews exist

## Page Structure Template

```tsx
import { notFound } from "next/navigation";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  NumberedSteps,
  FeatureGrid,
  ProductFAQ,
  CallToAction,
  RelatedProducts,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "{slug}";

export default async function CourseNamePage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    notFound();
  }

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
        highlights={[
          "X modules covering ...",
          "Approximately X hours to complete",
          "Key outcome statement",
          "Digital access via QR code",
        ]}
        addons={addons}
        digital
      />

      {/* Required: What You'll Learn */}
      <NumberedSteps
        title="What You'll Learn"
        subtitle="Key outcomes from this course"
        steps={[
          { title: "...", description: "..." },
          { title: "...", description: "..." },
          { title: "...", description: "..." },
        ]}
        background="navy-card"
      />

      {/* Required: Course Modules */}
      <FeatureGrid
        title="Course Modules"
        features={[
          { icon: "guide", title: "Module 1: ...", description: "..." },
          { icon: "guide", title: "Module 2: ...", description: "..." },
          // ...
        ]}
        columns={2}
        background="gray"
      />

      {/* Required: How the Platform Works */}
      <NumberedSteps
        title="How the Inspire Campus Works"
        subtitle="This course is hosted on the Inspire Africa learning platform — a dedicated LMS built for STEM education in South Africa."
        steps={[
          {
            title: "Purchase and Receive Your QR Code",
            description: "Complete your purchase on CREATESPACE and you'll receive a QR code via email. Scan it to go straight to your course on the Inspire Campus.",
          },
          {
            title: "Watch the Video Lessons",
            description: "Each module includes a video lesson that breaks down the topic in clear, practical terms. Watch at your own pace, pause, and revisit anytime.",
          },
          {
            title: "Download Notes and Resources",
            description: "Every module comes with downloadable notes and supplementary materials.",
          },
          {
            title: "Complete the Quizzes",
            description: "After each module, take a short quiz to check your understanding. Quizzes reinforce key concepts and track your progress through the course.",
          },
          {
            title: "Earn Your Certificate",
            description: "Once you've completed all modules and quizzes, you'll receive a professional certificate.",
          },
        ]}
        background="white"
      />

      {/* Recommended: FAQ */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          { question: "...", answer: "..." },
          // ...
        ]}
      />

      {/* Required: Call to Action */}
      <CallToAction
        title="Ready to Start Learning?"
        subtitle="..."
        primaryLabel="Enrol Now"
        primaryHref="#product-actions"
        secondaryLabel="Browse All Courses"
        secondaryHref="/education/courses"
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
ls assets/courses/{slug}/content.md
```

If missing, respond:
> Research content not found for `{slug}`. Please run `/research {slug}` first to gather course information.

### 2. Read Required Files

Read these files:
- `assets/courses/{slug}/content.md` - The research content
- `assets/brand/product-page-design.md` - Component reference
- `storefront/src/app/product/arduino-starter-kit/page.tsx` - Example implementation (for structure reference)

### 3. Catalog Available Images (if any)

Courses may not have many images. Check if any exist:
```bash
ls -la assets/courses/{slug}/lifestyle/ 2>/dev/null
ls -la assets/courses/{slug}/logo/ 2>/dev/null
```

If no images are available, that's fine — course pages work without them.

### 4. Plan Page Structure

**Required sections (always include):**
- HeroSection (with `digital` prop)
- NumberedSteps (learning outcomes)
- FeatureGrid (course modules)
- NumberedSteps — "How the Inspire Campus Works" (platform experience)
- CallToAction
- RelatedProducts

**Recommended sections (include if content available):**
- ProductFAQ (if FAQ content available — strongly recommended)
- VideoEmbed (if video URL in research)

**Optional sections (only if images available):**
- ImageTextBlock (if lifestyle images exist)

### 5. Write Content

Transform research content into course-focused copy:

**Apply brand voice:**
- Professional, enthusiastic, trustworthy, knowledgeable
- Address the learner or educator directly
- Lead with outcomes ("You'll learn to..."), follow with structure
- Be specific about duration, modules, and what's covered
- Mention the Inspire Africa platform where appropriate

**Writing rules:**
- No unexplained jargon
- Use bullets and short paragraphs
- Be honest about time commitment and prerequisites
- Don't oversell — let the course content speak for itself

### 6. Copy and Optimize Images (if applicable)

If images exist, copy and optimize them:

```bash
mkdir -p storefront/public/images/products/{slug}
cp assets/courses/{slug}/lifestyle/selected-image.jpg storefront/public/images/products/{slug}/

# Resize and compress
sips --resampleWidth 1200 storefront/public/images/products/{slug}/image.jpg
npx sharp-cli --input storefront/public/images/products/{slug}/image.jpg --output storefront/public/images/products/{slug}/image.jpg --quality 80
```

### 7. Write the Page

Create/update the page file at:
`storefront/src/app/product/{slug}/page.tsx`

### 8. Humanize the Copy

Before finishing, refine the prose you wrote using the **humanizer** skill (`.agents/skills/humanizer/SKILL.md`). Apply it to every piece of customer-facing copy on the page — the tagline, highlights, learning outcomes, module descriptions, FAQ answers, and CTA copy.

The humanizer removes the tells that make copy read as AI-generated: em dashes, forced rule-of-three lists, promotional filler ("vibrant", "testament", "boasts"), superficial "-ing" clauses, and negative parallelisms. The goal is copy that sounds like a real person at CREATESPACE wrote it.

- Only touch the prose you authored — never code, imports, prop names, or dynamic Shopify data.
- Preserve the course-focused brand voice and every specific fact from the research. Humanizing refines how the copy reads; it does not change what it claims.

## Content Transformation Guidelines

### Hero Section

From research, extract:
- **Tagline:** One-sentence course value proposition (what you'll gain)
- **Highlights:** 3-4 key selling points

Highlights should include:
- Number of modules or lessons
- Estimated completion time
- Primary learning outcome
- "Digital access via QR code" or similar digital delivery note

Example:
```
Research: "This course covers 8 modules on introductory robotics over approximately 12 hours..."
Result: tagline="Master the fundamentals of robotics — from sensors to programming"
Result: highlights={[
  "8 modules from basics to advanced concepts",
  "~12 hours of self-paced content",
  "Build and program your first robot by course end",
  "Instant digital access via QR code",
]}
```

### NumberedSteps — Learning Outcomes

Use NumberedSteps to present 3-5 key outcomes — what the learner will be able to DO after completing the course.

- Frame as outcomes, not topics: "Design and build a simple circuit" not "Electronics basics"
- Be specific and actionable
- Use `background="navy-card"` for visual emphasis

### FeatureGrid — Course Modules

Use FeatureGrid to show the course curriculum/modules:

- Each module as a feature with title and description
- Use `icon: "guide"` for all modules (or vary if appropriate)
- Use `columns={2}` for readability
- Use `background="gray"` to alternate with white sections
- Module titles should be clear: "Module 1: Introduction to Circuits"
- Descriptions: 1-2 sentences on what the module covers

### ProductFAQ

Create FAQs that address course-specific concerns:
- "How do I access the course?"
- "How long do I have to complete it?"
- "Do I need any prior knowledge?"
- "What equipment or software do I need?"
- "Can I retake modules?"
- "Do I receive a certificate?"
- "Is this suitable for classroom use?"

### CallToAction

- **Primary CTA:** "Enrol Now" → `#product-actions`
- **Secondary CTA:** "Browse All Courses" → `/education/courses`
- **Background:** `navy`
- **Subtitle:** Mention the QR code delivery and Inspire Africa platform

## Output

The skill produces:
1. A complete course product page at `storefront/src/app/product/{slug}/page.tsx`
2. Images copied to `storefront/public/images/products/{slug}/` (if any)

## Validation Checklist

Before completing, verify:

- [ ] Content file was read: `assets/courses/{slug}/content.md`
- [ ] Required sections included: HeroSection, NumberedSteps (outcomes), FeatureGrid (modules), NumberedSteps (How Inspire Campus Works), CallToAction
- [ ] `<ProductJsonLd product={product} />` included for schema.org structured data
- [ ] `openGraph.images` included in `generateMetadata` for social sharing
- [ ] `alternates.canonical` included in `generateMetadata`
- [ ] HeroSection receives `product` prop (dynamic data) - no hardcoded prices/availability
- [ ] HeroSection has `digital` prop set (hides delivery info, shows "Online Course")
- [ ] Learning outcomes are specific and actionable (not vague topic names)
- [ ] Course modules are clearly described
- [ ] Duration/time commitment mentioned in highlights
- [ ] Digital delivery (QR code) mentioned
- [ ] CTA secondary link goes to `/education/courses`
- [ ] FAQ addresses course-specific concerns (access, duration, prerequisites)
- [ ] No physical product language (batteries, unboxing, soldering, etc.)
- [ ] Copy passed through the humanizer skill to remove AI writing tells
- [ ] Images optimized if any were copied
- [ ] generateMetadata function included
- [ ] File created at correct path: `storefront/src/app/product/{slug}/page.tsx`

## Error Handling

**Content file missing:**
> Research content not found. Please run `/research {slug}` first.

**No images available:**
> No product images found. This is normal for course products — the page will use text-based sections only (NumberedSteps, FeatureGrid, FAQ).

**Note:** If the product handle is incorrect, the page will show a 404 at runtime (handled by `notFound()` in the page component). The skill assumes the slug matches a valid Shopify product.

## Example

User: `/product-page-course intro-to-robotics`

1. Found `assets/courses/intro-to-robotics/content.md`
2. Read design spec
3. No lifestyle images found (normal for courses)
4. Planned page structure (6 sections)
5. Transformed content with course-focused voice
6. Created `storefront/src/app/product/intro-to-robotics/page.tsx`

Output:
> Created course product page for Introduction to Robotics with:
> - Hero section with 4 highlights (8 modules, ~12 hours, key outcome, QR access)
> - What You'll Learn (4 learning outcomes)
> - Course Modules (8 modules in 2-column grid)
> - FAQ (6 course-specific questions)
> - Call to action linking to /education/courses
> - Related products
