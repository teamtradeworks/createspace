# Project Description

This is a Shopify headless ecommerce store for our online store.  The website is in `storefront/` and is deployed to Vercel through a GitHub integration.  This is going to replace our existing website at https://thecreatespace.co.za.

# Technical

 - Built with Next.js
 - Deployed to Vercel
 - Uses the Shopify GraphQL storefront API
 - Design must work on desktop and mobile
 - **Internal links must use Next.js `Link` from `next/link`** — never use raw `<a>` tags for internal routes. Raw `<a>` tags cause full page reloads, bypass client-side navigation, and can lose client state (e.g. cart). Reserve `<a>` for external URLs only.
 - **Before pushing changes**, always run `npm run lint` from the `storefront/` directory and verify it passes. Do not push if linting fails.
 - **Before pushing changes**, always run `npm run build` from the `storefront/` directory and verify it succeeds. Do not push if the build fails.
 - **Before pushing changes**, always run `npm test` from the `storefront/` directory and verify all unit tests pass. Do not push if tests fail.

## Testing

Unit tests use **Vitest** and live in `storefront/src/__tests__/`. E2E tests use **Playwright** and live in `storefront/e2e/`.

**Commands** (run from `storefront/`):
- `npm run lint` — run linter (must pass before pushing)
- `npm test` — run unit tests (must pass before pushing)
- `npm run test:watch` — run unit tests in watch mode during development
- `npm run test:e2e` — run E2E tests (requires built app or dev server on localhost:3000)
- `npm run test:e2e:ui` — interactive Playwright UI

**When to run tests:**
- Run `npm test` before every push
- Run `npm test` after modifying any code in `src/lib/`, `src/config/`, or `src/context/`

**When to write/update tests:**
- When adding or modifying business logic (pricing, delivery, formatting, add-ons)
- When fixing a bug — add a test that reproduces the bug before fixing it
- When adding new utility functions or helpers
- Unit tests go in `src/__tests__/{module}.test.ts`
- E2E tests go in `e2e/{feature}.spec.ts`

**CI:** GitHub Actions runs lint, unit tests, build, and E2E tests on every PR to `main`. All must pass to merge.

## SEO

The site has foundational SEO infrastructure that must be maintained:

- **Sitemap** (`storefront/src/app/sitemap.ts`): Products are pulled dynamically from Shopify. Static pages are listed manually — **when adding a new page, add it to the sitemap**.
- **Robots** (`storefront/src/app/robots.ts`): Blocks `/cart`, `/search`, `/product/kitchen-sink`. Add any new non-indexable pages here.
- **Open Graph**: Root layout (`layout.tsx`) sets `metadataBase`, default OG image, siteName, locale, and Twitter Card config. Child pages inherit these defaults — their `title`/`description` automatically become `og:title`/`og:description`. Product pages should include `openGraph.images` with the product image in `generateMetadata`.
- **JSON-LD**: Product pages include `<ProductJsonLd>` for schema.org structured data. Always include this on new product pages.
- **Heading hierarchy**: Every page must have exactly one `<h1>` tag. Do not add multiple `<h1>` tags to a page.
- **Metadata**: Every page must export `metadata` or `generateMetadata` with a `title` and `description`.

## Product Metafields

Product attributes are configured in Shopify admin via metafield definitions. These are accessible via the Storefront API.

| Metafield Key | Type | Description |
|---------------|------|-------------|
| `custom.minimum_age` | Integer | Minimum recommended age |
| `custom.maximum_age` | Integer | Maximum recommended age (leave empty for "X+" products) |
| `custom.batteries_required` | Boolean | Whether the product requires batteries |
| `custom.batteries_included` | Boolean | Whether batteries are included in the box |
| `custom.batteries_list` | Metaobject reference | Reference to a battery type metaobject |
| `custom.projects` | Single line text | Number of projects included (e.g., "15+", "200+") |
| `custom.guide` | Single line text | Guide/manual description (e.g., "170-page book") |
| `custom.soldering` | Boolean | Whether soldering is required |
| `custom.coding_platform` | Single line text | Coding platform/language (e.g., "Scratch", "Block & Text") |

**Querying metafields in GraphQL:**
```graphql
product(handle: "example") {
  minAge: metafield(namespace: "custom", key: "minimum_age") { value }
  maxAge: metafield(namespace: "custom", key: "maximum_age") { value }
  projects: metafield(namespace: "custom", key: "projects") { value }
}
```

# Git & PR Conventions

- Do NOT include `Co-Authored-By: Claude` or any AI co-author lines in commit messages
- Do NOT mention Claude or AI in pull request descriptions
- **Always update the PR title and description** when pushing further commits to reflect all changes in the PR

# General Conventions

 - This is a South African business and we only sell locally.
 - Currency is Rand (ZAR).  For example, use R1,200.
 - Number formats use commas for thousand seperation and period for decimals, e.g. 2,500.99
 - We use The Courier Guy for deliveries - https://thecourierguy.co.za/
 - We use Stitch for secure payments - https://stitch.money/

## Naming
- Company name is always "CREATESPACE" (all caps)
- Use the word "Delivery" and not "Shipping" when referring to delivering of orders
- Use the word "VAT" and not "Tax"

## Delivery Rates

Delivery pricing is configured in `storefront/src/config/site.json`. Update that file to change thresholds across the site when prompted. Next day delivery option is also available at checkout at an additional cost.

# Brand and Tone

See our full brand strategy document at `assets/brand/brand-strategy.md`.  When writing content, always refer to our brand strategy to ensure correct tone, correct audience, appropriate messaging, etc.

## Brand Voice
- **Personality**: Fun, playful, enthusiastic, trustworthy, knowledgeable, inviting, integral
- **NOT**: Elitist, complicated, nerdy/stereotypical, dry/boring, gimmicky, corporate, childish

## Key Messaging
- Vision: Ignite a passion for STEM in children
- STEM is a crucial skill for children to develop early
- STEM is for everyone—regardless of background, gender, or ability
- Play is a powerful tool for learning and discovery
- We are specialists, not a general toy store

# Brand 

## Visual assets
 - Find logo assets in `assets/design/LOGO`. Use logos from the `DARK/` subfolder when against a dark background and logos from the `LIGHT/` against light (white) backgrounds.
 - For Typography, use Outfit Semi Bold for headlines and Outfit Regular for body copy and headlines. Fonts can be found in `assets/design/Outfit/`.
 - Our brand-aligned illustrations are in `assets/design/ILLUSTRATIONS/ELEMENTS` - these are images of robots, cogs, beakers, planets, etc. which represent our brand in a fun way.  These can be used sparingly on web pages in between content.
 - Our brand-aligned icons are in `assets/design/ICONS/`.  Use icons from the `DARK/` subfolder when against a dark background and icons from the `LIGHT/` against light (white) backgrounds. These icons are very simple images which can be used, for example, as trust badges, social media links, beside contact details, etc.

## Guidelines
 - Always use the appropriate file format considering this is a website.
 - Do not reference images from `assets/` on the website - they must be copied into `storefront/public/images/`.
 - Resize images (or request that they be resized) if they have inappropriately large dimensions.
 - Use SVGs when appropriate as they are vector-based and dont need to be rescaled or resized.

## Colours
Navy and white serve as the primary background colours, interchangeably.
Red, orange, blue, yellow, green, purple and grey act as accent colours and are used more sparingly, and in illustrations.
Text is navy on white and white on navy. Accent colours can be used as as accents and highlights for text.

 - NAVY: #0C1446
 - RED: #F70B28
 - BLUE: #3CC7F7
 - PURPLE: #AC4DFF
 - ORANGE: #FF8B00
 - GREEN: #93DB21
 - YELLOW: #FFD500
 - GREY: #B3B3B3
 - WHITE: #ffffff


# Image Organisation

All website images must be stored locally in `storefront/public/images/`. Never link to external image URLs (except Shopify CDN for product images).

### Folder Structure
```
storefront/public/images/
├── brand/              # Logos and brand assets
│   ├── logo-dark.png   # Logo for light backgrounds
│   └── logo-light.png  # Logo for dark backgrounds
├── illustrations/      # Reusable brand illustrations (robots, atoms, etc.)
├── home/               # Homepage images
├── education/          # Education section images
├── about/              # About page images
└── shop/               # Shop page images (non-product)
```

When adding new pages, create a corresponding subfolder (e.g., `images/contact/` for `/contact` page).

### Naming Conventions (SEO-friendly)
- Use lowercase with hyphens: `stem-tutoring-workshop.jpg` (not `STEMTutoringWorkshop.jpg`)
- Be descriptive: `children-robotics-classroom.jpg` (not `IMG_1234.jpg`)
- Include context: `hero-stem-education.jpg`, `team-createspace.jpg`
- For sequences: `stem-workshop-1.png`, `stem-workshop-2.png`

### Image Optimisation Requirements

**Before adding any image:**
1. **Resize** to appropriate dimensions (max 1920px width for hero images, 1200px for content images)
2. **Compress** using sharp-cli or similar tool
3. **Choose correct format**: JPEG for photos, PNG for graphics with transparency

**Target file sizes:**
- Hero images: < 200KB
- Content images: < 100KB
- Illustrations/icons: < 50KB
- Logos: < 30KB

**Compression commands:**
```bash
# Resize large images (from storefront/public/images/)
sips --resampleWidth 1200 path/to/image.jpg

# Compress JPEGs
npx sharp-cli --input image.jpg --output image.jpg --quality 85

# Compress PNGs
npx sharp-cli --input image.png --output image.png --compressionLevel 9
```

### Using Images in Code

Always use Next.js `Image` component for automatic optimisation:

```tsx
import Image from "next/image";

// For fixed-size images
<Image
  src="/images/illustrations/robot-orange.png"
  alt="Robot illustration"
  width={128}
  height={128}
/>

// For responsive/fill images
<Image
  src="/images/home/hero-stem-education.jpg"
  alt="Children learning STEM"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
  priority  // Add for above-the-fold images
/>
```

**Important:** Add `priority` prop to hero/above-the-fold images for better LCP.

# Website Content and Structure

## Education Section
The education pages target teachers, principals, and educators (B2B audience). We offer three education solutions:

1. **STEM Tutors** (`/education/stem-tutors`)
   - Partner: Robotixkids (https://robotixkids.co.za/)
   - Trained facilitators deliver robotics and coding programmes at schools

2. **Curriculum for Teachers** (`/education/curriculum`)
   - Partner: Inspire Africa (https://inspire.africa/)
   - Online teacher training platform with CAPS-aligned content
   - Ready-to-use lesson plans and resources
   - Empowers educators to teach STEM independently

3. **Classroom Kits** (`/education/classroom-kits`)
   - Multi-learner STEM kits designed for group work
   - Bulk pricing for schools (10+ units)
   - Reusable materials for ongoing use

## Product Pages

When creating, improving, or modifying product pages, you MUST follow this section and referenced documents.

We often differentiate and reference products by their unique slug (`{slug}`), which comes from the Shopify API (e.g. arduino-starter-kit).

Working on product pages has three parts:
 1. Content research:
    - Triggered by the Claude command `/research {slug}`.
    - This involved gathering written content about a product from online sources.
    - There should be more than enough content gathered for us to write product pages.
    - The content doesn't need to be rewritten with our tone or style yet.
    - There should be enough content to satisfy the guidelines in `assets/brand/product-content-framework.md`.
    - The content is to be stored in `assets/product/{slug}/content.md`.
 2. Turning research content into a parent-focused product page:
    - This involved uses the researched content in `assets/product/{slug}/content.md` and the following two documents to create product pages:
      - `assets/brand/product-content-framework.md`
      - `assets/brand/product-page-design.md`
    - Rewrite the content from `assets/product/{slug}/content.md` using the product-content-framework.md.
    - No copying and pasting.
    - Triggered by the Claude command `/product-page {slug}`
 3. Turning research content into an educator/school-focused product page:
    - Uses the researched content in `assets/product/{slug}/content.md` and the following two documents:
      - `assets/brand/edu-product-content-framework.md`
      - `assets/brand/product-page-design.md`
    - Rewrite the content from `assets/product/{slug}/content.md` using the edu-product-content-framework.md.
    - Addresses educators, teachers, and school administrators (not parents).
    - No copying and pasting.
    - Triggered by the Claude command `/product-page-edu {slug}`

We keep the research step separate so that we don't need to repeat researching online while reworking a product page. Steps 2 and 3 are alternatives — use `/product-page` for consumer products (Shop) and `/product-page-edu` for classroom kits (Education).

**Content Framework** - `assets/brand/product-content-framework.md`
   - Parent-focused content guidelines (consumer product pages)
   - What information to include (age, skill level, learning outcomes)
   - Skill tag taxonomy (STEM Skills + Life Skills)
   - Writing guidelines and tone
   - Imagery requirements (lifestyle photos, videos/GIFs)

**Education Content Framework** - `assets/brand/edu-product-content-framework.md`
   - Educator-focused content guidelines (classroom kit pages)
   - Three educator personas (STEM Champions, Decision-Makers, STEM-Hesitant)
   - Three educator questions (curriculum alignment, cost-per-learner, support)
   - Education-specific writing guidelines and tone

**Page Design Spec** - `assets/brand/product-page-design.md`
   - Page structure with 15 component sections
   - Component usage examples with TSX code
   - Required vs optional sections
   - Minimal vs full page guidance

**Component Reference** - `assets/brand/product-page-components.md`
   - Detailed specification for every product section component
   - Props, types, defaults, and usage examples
   - **Must be updated whenever a component is modified**
   - Kitchen sink preview available at `/product/kitchen-sink`

**Rules to always obey:**
- Research content lives in `assets/product/{slug}/content.md`
- Custom product pages live in `storefront/src/app/product/{slug}/page.tsx` (folder name = product handle = URL slug = Shopify slug)
- Use only the components from `storefront/src/components/product-sections/` 
- Never write inline JSX for product page sections - use the existing components

**Creating a new custom product page:**
1. Create folder: `storefront/src/app/product/{slug}/page.tsx` (folder name must match Shopify handle/slug)
2. Define `PRODUCT_SKU` constant for add-on resolution
3. Use `getProductByHandle("handle")` to fetch product data
4. Add `<ProductJsonLd product={product} />` inside the JSX (import from `@/components/ProductJsonLd`)
5. Export `generateMetadata` with `title`, `description`, `alternates.canonical`, and `openGraph.images`:
   ```ts
   export async function generateMetadata() {
     const product = await getProductByHandle(PRODUCT_HANDLE);
     if (!product) return { title: "Product Not Found" };
     return {
       title: `${product.title} | CREATESPACE`,
       description: "Benefit-led description under 160 characters.",
       alternates: {
         canonical: "/product/{slug}",  // Use the folder name (URL path), not the Shopify handle
       },
       openGraph: {
         images: product.images.edges[0]?.node.url
           ? [{ url: product.images.edges[0].node.url }]
           : undefined,
       },
     };
   }
   ```

### Product add-ons

Product add-ons are other related products which we want to upsell on a product page.  These can be included when adding to cart.

Add-on relationships are configured in `storefront/src/config/product-addons.json` using SKUs:
```json
{
  "addons": [
    {
      "parentSku": "EF08183",
      "addonSku": "MEFV22G",
      "discountPercent": 15
    }
  ]
}
```

To enable add-ons on a product page:
1. Import `resolveAddonsForSku` and `serializeAddons` from `@/lib/product-addons`
2. Resolve add-ons: `const resolvedAddons = await resolveAddonsForSku(PRODUCT_SKU)`
3. Serialize for client: `const addons = serializeAddons(resolvedAddons)`
4. Pass to ProductHero: `<ProductHero product={product} addons={addons} />`

For detailed brand strategy, customer personas, and messaging guidance: see `assets/brand/brand-strategy.md`

### Product imagery

Product-specific images are stored in `assets/product/[product-handle]/` with the following subfolders:

| Folder        | Content                                   | Usage                                                           |
| ------------- | ----------------------------------------- | --------------------------------------------------------------- |
| `animations/` | Short animated GIFs of product in action  | Use sparingly, small format, great for "wow" moments            |
| `end-user/`   | Customer photos of projects and creations | Social proof, use in groups at small scale (not studio quality) |
| `lifestyle/`  | Professional lifestyle photography        | Hero images, large format, primary visual content               |
| `logo/`       | Official brand logos                      | Brand attribution, partnerships                                 |
| `projects/`   | Small images representing individual projects/activities | ProjectShowcase card thumbnails, one per project  |

**Guidelines:**
- Filenames describe the photo content - use this to pair images with relevant sections
- Lifestyle photos can be used full-width; end-user and animations should be smaller/grouped
- Not all images need to be used - select the most relevant ones
- Copy images to `storefront/public/images/products/[handle]/` before using on the website




