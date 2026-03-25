# Product Page Components

Technical reference for all reusable product page components. This is the **single source of truth** for component specs — do not duplicate props or examples elsewhere.

Components are located in `storefront/src/components/product-sections/`.

**Kitchen Sink Preview:** View all components at `/product/kitchen-sink`

---

## Page Boilerplate

Every custom product page follows this pattern. Create the file at `storefront/src/app/product/[slug]/page.tsx`.

```tsx
import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import {
  HeroSection,
  QuickInfoBadges,
  // ... other components as needed
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "your-product-slug";

export default async function ProductPage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    notFound();
  }

  const resolvedAddons = await resolveAddonsForHandle(PRODUCT_HANDLE);
  const addons = serializeAddons(resolvedAddons);

  return (
    <ProductTrackingProvider handle={PRODUCT_HANDLE}>
      {/* Components go here */}
    </ProductTrackingProvider>
  );
}

export async function generateMetadata() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | CREATESPACE`,
    description: "Product description under 160 characters.",
  };
}
```

### Section Visibility Tracking

Product pages automatically track how long users view each section via PostHog. This requires two things:

1. **`ProductTrackingProvider`** wraps the page (shown in boilerplate above). Provides the product handle to all child components via React context.
2. **`SectionTracker`** is embedded inside every section component (HeroSection, FeatureGrid, etc.). It reads the handle from context and uses `IntersectionObserver` to fire `section_viewed` events with `section_name`, `page`, and `visible_duration_seconds`.

**No per-section wrapping needed.** As long as `ProductTrackingProvider` wraps the page, all section components track themselves automatically. If no provider is present (e.g. kitchen-sink preview), tracking is silently skipped — components render normally without the observer.

---

## ExtensionBanner

Banner that highlights a product is an extension/expansion of another product. Links to the parent product. Used only on extension product pages, placed immediately after HeroSection.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `parentProductName` | `string` | Yes | — | Display name of the parent product |
| `parentProductHref` | `string` | Yes | — | Link to the parent product page |
| `message` | `string` | No | — | Custom message (overrides default text) |
| `background` | `"white" \| "gray"` | No | `"white"` | Background colour |

**Default message:** "This is an expansion pack for the [Parent Product Name]. Already have one? Add this to unlock new projects and possibilities."

**Example:**
```tsx
<ExtensionBanner
  parentProductName="Arduino Starter Kit"
  parentProductHref="/product/arduino-starter-kit"
/>
```

**With custom message:**
```tsx
<ExtensionBanner
  parentProductName="Snap Circuits Classic"
  parentProductHref="/product/snap-circuits-classic-300"
  message="This expansion adds 200+ new projects to your Snap Circuits Classic kit."
/>
```

---

## CallToAction

Call-to-action section with primary and optional secondary buttons.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | — | Heading text |
| `subtitle` | `string` | No | — | Subheading text |
| `primaryLabel` | `string` | Yes | — | Primary button text |
| `primaryHref` | `string` | Yes | — | Primary button link |
| `secondaryLabel` | `string` | No | — | Secondary button text |
| `secondaryHref` | `string` | No | — | Secondary button link |
| `background` | `"white" \| "gray" \| "navy"` | No | `"navy"` | Background colour |

**Example:**
```tsx
<CallToAction
  title="Ready to Start the STEM Journey?"
  subtitle="Order now and inspire a love of learning"
  primaryLabel="Add to Cart"
  primaryHref="#product-actions"
  secondaryLabel="View All Kits"
  secondaryHref="/shop"
  background="navy"
/>
```

---

## CustomerShowcase

Gallery of end-user/customer photos with labels and hover descriptions. Adaptive grid layout based on image count.

> Exported from `@/components/product-sections`.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | No | `"Customer Creations"` | Section heading |
| `subtitle` | `string` | No | — | Section subtitle |
| `images` | `CustomerImage[]` | Yes | — | Array of customer images |
| `background` | `"white" \| "gray"` | No | `"white"` | Background colour |

**CustomerImage:**
```ts
{ src: string; alt: string; label?: string; description?: string; animation?: string }
```

**Layout behaviour:**
- 1 image: full width, 16:9
- 2 images: equal 2-column grid, 4:3
- 3 images: large square left, 2 stacked right
- 4 images: single row of 4 squares
- 5 images: 2 top row (4:3), 3 bottom row (squares)
- 6 images: 3x2 grid of squares
- 7+ images: responsive 2/3/4-column grid

**Image guidelines:**
- Only use end-user photos from `assets/product/[slug]/end-user/`
- **IMPORTANT:** Include ALL available end-user photos — do not cherry-pick or limit the number
- Labels should be short (1-2 words): "First Build", "Classroom"
- Descriptions show on hover

**Example:**
```tsx
<CustomerShowcase
  title="Customer Creations"
  subtitle="See what our community has built"
  images={[
    {
      src: "/images/products/example/end-user-robot.jpg",
      alt: "Customer robot build",
      label: "First Build",
      description: "Built this robot in just one weekend!",
    },
    {
      src: "/images/products/example/end-user-classroom.jpg",
      alt: "Classroom project",
      label: "Classroom",
    },
  ]}
/>
```

---

## FeatureGrid

Grid of features with icons. Good for highlighting key selling points.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | No | `"Features"` | Section heading |
| `subtitle` | `string` | No | — | Section subtitle |
| `features` | `Feature[]` | Yes | — | Array of features |
| `columns` | `2 \| 3 \| 4` | No | `3` | Grid columns |
| `background` | `"white" \| "gray" \| "navy"` | No | `"gray"` | Background colour |

**Feature:**
```ts
{ icon: string; title: string; description: string }
```

**Available icons:**
`code`, `sensor`, `battery`, `book`, `app`, `tools`, `lightbulb`, `puzzle`, `brain`, `globe`, `shield`, `robot`, `wifi`, `star`, `music`, `microphone`, `compass`, `touch`, `bluetooth`

Can also use image paths (e.g., `/images/icons/custom.svg`).

**Example:**
```tsx
<FeatureGrid
  title="Why Choose This Kit"
  columns={3}
  background="gray"
  features={[
    { icon: "code", title: "Visual Coding", description: "Block-based programming" },
    { icon: "robot", title: "Build Robots", description: "Working motors and sensors" },
    { icon: "book", title: "Guided Learning", description: "Step-by-step instructions" },
  ]}
/>
```

---

## HeroSection

Product hero with image gallery, pricing, delivery info, and add-to-cart. Requires Shopify product data.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `product` | `ProductDetail` | Yes | — | Shopify product data |
| `tagline` | `string` | No | — | Short tagline under title |
| `highlights` | `string[]` | No | — | Key feature bullet points with checkmarks |
| `heroImage` | `string` | No | — | Custom hero image (prepended to gallery) |
| `addons` | `SerializedAddon[]` | No | — | Product add-ons for upselling |

**Already includes:** Breadcrumb, image gallery, title, price, availability, delivery info, add-to-cart button.

**Example:**
```tsx
<HeroSection
  product={product}
  tagline="The perfect introduction to electronics"
  highlights={[
    "15+ hands-on projects",
    "No soldering required",
    "Comprehensive guidebook included",
  ]}
  addons={addons}
/>
```

---

## ImageTextBlock

Split section with image and text content side-by-side. Alternate `layout` for visual rhythm.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `image` | `string` | Yes | — | Image path |
| `imageAlt` | `string` | No | `""` | Alt text for image |
| `title` | `string` | Yes | — | Section heading |
| `body` | `string \| React.ReactNode` | Yes | — | Text content (string or JSX) |
| `layout` | `"image-left" \| "image-right"` | No | `"image-left"` | Image position |
| `background` | `"white" \| "gray" \| "navy"` | No | `"white"` | Background colour |

**Image guidelines:**
- Only use lifestyle photos from `assets/product/[slug]/lifestyle/`
- End-user photos and animations are too low quality for this component

**Example:**
```tsx
<ImageTextBlock
  image="/images/products/example/lifestyle.jpg"
  imageAlt="Child building robot"
  title="Perfect for Young Inventors"
  body="This kit sparks curiosity and inspires creativity..."
  layout="image-left"
  background="white"
/>
```

---

## NumberedSteps

Sequential steps with numbered circles. Good for "why choose this?" benefits.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | — | Section heading |
| `subtitle` | `string` | No | — | Section subtitle |
| `steps` | `Step[]` | Yes | — | Array of steps |
| `columns` | `2 \| 3 \| 4` | No | `3` | Grid columns |
| `background` | `"white" \| "gray" \| "navy" \| "navy-card"` | No | `"white"` | Background style |

**Step:**
```ts
{ title: string; description: string }
```

**Background options:**
- `navy-card`: Navy card container on white background (great for visual emphasis)

**Example:**
```tsx
<NumberedSteps
  title="How It Works"
  subtitle="Getting started is easy"
  columns={3}
  background="navy-card"
  steps={[
    { title: "Unbox & Explore", description: "Familiarise yourself with components" },
    { title: "Build", description: "Follow guided instructions" },
    { title: "Program & Play", description: "Bring your creation to life" },
  ]}
/>
```

---

## ProductFAQ

Accordion-style frequently asked questions.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | No | `"Frequently Asked Questions"` | Section heading |
| `faqs` | `FAQ[]` | Yes | — | Array of FAQs |
| `background` | `"white" \| "gray"` | No | `"white"` | Background colour |

**FAQ:**
```ts
{ question: string; answer: string }
```

**Example:**
```tsx
<ProductFAQ
  title="Frequently Asked Questions"
  background="white"
  faqs={[
    { question: "What age is this suitable for?", answer: "Ages 10 and above." },
    { question: "Are batteries included?", answer: "Yes, rechargeable battery included." },
  ]}
/>
```

---

## ProductReviews

Customer reviews powered by Fera. Fetches reviews and ratings client-side from the Fera SDK. Automatically hidden when no reviews exist for the product.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `productId` | `string` | Yes | — | Shopify product GID (e.g. `product.id`) |
| `background` | `"white" \| "gray" \| "navy"` | No | `"white"` | Background colour |

**Notes:**
- Reviews are fetched automatically from Fera — no manual content needed
- Displays rating summary (stars + average + count), then individual review cards
- Each review shows: customer avatar/initial, name, date, star rating, heading, body text, and photos
- Paginated with "Show More Reviews" button (5 per page)
- Component renders nothing while loading or if there are no reviews
- Requires `NEXT_PUBLIC_FERA_PUBLIC_KEY` environment variable

**Example:**
```tsx
<ProductReviews
  productId={product.id}
  background="white"
/>
```

---

## ProjectShowcase

Grid of project cards with image thumbnails. Shows off projects, challenges, and activities included in the kit. Use the `highlight` prop to emphasise what's included (counts, format, etc.) and `moreText` to reinforce breadth.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | — | Section heading |
| `highlight` | `string` | No | — | Emphasised text below title — use for project counts and format (rendered larger, bold, in accent colour) |
| `subtitle` | `string` | No | — | Section subtitle — use to describe progression or selection |
| `projects` | `Project[]` | Yes | — | Array of projects |
| `moreText` | `string` | No | — | Text below grid (e.g. "Plus 12 more!") |
| `columns` | `2 \| 3` | No | `3` | Grid columns |
| `background` | `"white" \| "gray" \| "navy"` | No | `"white"` | Background colour |

**Project:**
```ts
{ name: string; description: string; concepts?: string; image?: string }
```

- `image` — Path to a small thumbnail image for the project card. **IMPORTANT:** Strictly source images from `assets/product/[slug]/projects/` folder and copy to `storefront/public/images/products/[slug]/`. When provided, the image renders as a rounded thumbnail at 120% of base thumbnail size for better visibility at the top of the card. When omitted, no thumbnail is shown.

**Highlight text:** Renders between the title and subtitle in a larger, semibold accent colour (blue on white/gray, orange on navy). Use free-form text to communicate what's included — e.g. "39 hands-on projects with step-by-step online tutorials" or "15 real-world projects in a 170-page printed guidebook". This is more flexible than rigid count badges and reads naturally.

**Example:**
```tsx
<ProjectShowcase
  title="Projects You'll Build"
  highlight="15 real-world projects in a 170-page printed guidebook"
  subtitle="Each project builds on the last, gradually introducing new concepts."
  columns={3}
  projects={[
    { name: "Line-Following Robot", description: "Follows a black line", concepts: "Sensors, loops", image: "/images/products/example/projects/line-follower.jpg" },
    { name: "Remote Control Car", description: "Drive with your phone", concepts: "Motors, Bluetooth", image: "/images/products/example/projects/remote-car.jpg" },
  ]}
  moreText="Plus 12 more projects included!"
/>
```

---

## QuickInfoBadges

Displays key product information at a glance using icon badges. All badges are **derived automatically from Shopify product metafields** — just pass the product object.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `product` | `ProductDetail` | No | — | Shopify product data (badges derived from metafields) |

**Badges derived from metafields:**

| Badge | Metafield Key | Shown when |
|-------|---------------|------------|
| Age | `custom.minimum_age` / `custom.maximum_age` | Age metafield(s) set |
| Batteries | `custom.batteries_required` / `custom.batteries_included` / `custom.batteries_list` | Battery metafield set |
| Projects | `custom.projects` | Projects metafield set |
| Guide | `custom.guide` | Guide metafield set |
| Soldering | `custom.soldering` | Soldering metafield set |
| Coding | `custom.coding_platform` | Coding platform metafield set |

**Example:**
```tsx
<QuickInfoBadges product={product} />
```

---

## SkillTags

Displays STEM and life skill tags with colour-coded styling.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tags` | `string[]` | Yes | — | Array of skill tag names |
| `title` | `string` | No | `"Skills"` | Label before tags |
| `background` | `"white" \| "gray" \| "navy"` | No | `"white"` | Background colour |

**Pre-defined tag colours:**
- **STEM Skills:** Circuits (blue), Coding (purple), Robotics (orange), Mechanical Engineering (green), Electronics (blue), Science (purple), Mathematics (orange)
- **Life Skills:** Problem Solving (navy), Logical Thinking (navy), Creativity (yellow), Following Instructions (gray), Fine Motor Skills (gray), Patience & Focus (gray)

**Example:**
```tsx
<SkillTags
  title="Skills Developed"
  tags={["Circuits", "Coding", "Problem Solving", "Creativity"]}
/>
```

---

## Specifications

Product specifications in table format.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | No | `"Specifications"` | Section heading |
| `specs` | `Spec[]` | Yes | — | Array of specifications |
| `background` | `"white" \| "gray"` | No | `"gray"` | Background colour |

**Spec:**
```ts
{ label: string; value: string }
```

**Example:**
```tsx
<Specifications
  title="Technical Specifications"
  background="gray"
  specs={[
    { label: "Recommended Age", value: "10+ years" },
    { label: "Number of Pieces", value: "358 components" },
    { label: "Battery", value: "Rechargeable Li-ion (included)" },
  ]}
/>
```

---

## VideoEmbed

Embedded YouTube or Vimeo video with privacy-enhanced mode.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `url` | `string` | Yes | — | YouTube or Vimeo URL |
| `title` | `string` | No | — | Optional section heading |
| `aspectRatio` | `"16:9" \| "4:3" \| "1:1"` | No | `"16:9"` | Video aspect ratio |
| `background` | `"white" \| "gray" \| "navy"` | No | `"white"` | Background colour |

**Supported URL formats:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://vimeo.com/VIDEO_ID`

**Example:**
```tsx
<VideoEmbed
  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  title="See It in Action"
  aspectRatio="16:9"
  background="white"
/>
```

---

## WhatsIncluded

Checklist of box contents with optional image.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | No | `"What's in the Box"` | Section heading |
| `items` | `string[]` | Yes | — | List of included items |
| `image` | `string` | Yes | — | Product image (unboxed kit, components laid out, or product shot) |
| `imageAlt` | `string` | No | `"Box contents"` | Alt text |
| `background` | `"white" \| "gray"` | No | `"gray"` | Background colour |

**Image guidelines:**
- Prefer an image showing the kit unboxed with all components laid out
- If no dedicated unboxed image exists, use a lifestyle photo showing the product and its components
- The image renders at square aspect ratio with `object-contain` so product shots work well

**Example:**
```tsx
<WhatsIncluded
  title="What's in the Box"
  image="/images/products/example/kit-unboxed.jpg"
  imageAlt="Kit unboxed showing all components"
  background="gray"
  items={[
    "Main controller unit",
    "2x DC motors",
    "Touch sensor",
    "USB charging cable",
    "Project guidebook",
  ]}
/>
```
