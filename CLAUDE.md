# Project Description

This is a Shopify headless ecommerce store for our online store.  The website is in `storefront/` and is deployed to Vercel through a GitHub integration.  This is going to replace our existing website at https://thecreatespace.co.za.

 - This is a South African business and we only sell locally.
 - Currency is Rand (ZAR).  For example, use R1,200.
 - Number formats use commas for thousand seperation and period for decimals, e.g. 2,500.99
 - We use The Courier Guy for deliveries - https://thecourierguy.co.za/
 - We use Stitch for secure payments - https://stitch.money/

# Technical

 - Built with Next.js
 - Deployed to Vercel
 - Uses the Shopify GraphQL storefront API
 - Design must work on desktop and mobile

# General Conventions

## Naming
- Company name is always "CREATESPACE" (all caps)
- Use "Delivery" and not "Shipping"
- Use "VAT" and not "Tax"

## Delivery Rates
Delivery pricing is configured in `storefront/src/config/site.json`. Update that file to change thresholds across the site.
- Next day delivery option available at checkout (additional cost)

# Brand and Tone

## Brand Voice
- **Personality**: Fun, playful, enthusiastic, trustworthy, knowledgeable, inviting, integral
- **NOT**: Elitist, complicated, nerdy/stereotypical, dry/boring, gimmicky, corporate, childish

## Key Messaging
- Vision: Ignite a passion for STEM
- STEM is for everyone—regardless of background, gender, or ability
- Play is a powerful tool for learning and discovery
- We are specialists, not a general toy store

## Education Section
The education pages target teachers, principals, and educators (B2B audience). We offer three education solutions:

1. **STEM Tutors** (`/education/stem-tutors`)
   - Partner: Robotixkids (https://robotixkids.co.za/)
   - Trained facilitators deliver robotics and coding programmes at schools
   - Options: After-school clubs, workshops, holiday camps, curriculum integration
   - All equipment provided - no upfront investment from schools

2. **Curriculum for Teachers** (`/education/curriculum`)
   - Partner: Inspire Africa (https://inspire.africa/)
   - Online teacher training platform with CAPS-aligned content
   - Ready-to-use lesson plans and resources
   - Empowers educators to teach STEM independently

3. **Classroom Kits** (`/education/classroom-kits`)
   - Multi-learner STEM kits designed for group work
   - Teacher guides included
   - Bulk pricing for schools (10+ units)
   - Reusable materials for ongoing use

## Product Content Guidelines
When writing product descriptions, ensure clarity on:
- Age/grade appropriateness
- Skill level (beginner, intermediate, advanced)
- What the finished product is
- Learning outcomes
- Whether adult supervision is required
- Any extras required (batteries, software, tools)

For detailed brand strategy, customer personas, and messaging guidance: see `assets/brand/brand-strategy.md`

# Visual assets

 - Find logo assets in `assets/design/LOGO`. Use logos from the `DARK/` subfolder when against a dark background and logos from the `LIGHT/` against light (white) backgrounds.
 - For Typography, use Outfit Semi Bold for headlines and Outfit Regular for body copy and headlines. Fonts can be found in `assets/design/Outfit/`.
 - Our brand-aligned illustrations are in `assets/design/ILLUSTRATIONS/ELEMENTS` - these are images of robots, cogs, beakers, planets, etc. which represent our brand in a fun way.  These can be used sparingly on web pages in between content.
 - Our brand-aligned icons are in `assets/design/ICONS/`.  Use icons from the `DARK/` subfolder when against a dark background and icons from the `LIGHT/` against light (white) backgrounds. These icons are very simple images which can be used, for example, as trust badges, social media links, beside contact details, etc.

## Guidelines
 - Always use the appropriate file format considering this is a website.
 - Do not reference images from `assets/` on the website - they must be copied into `storefront/public/images/`.
 - Resize images (or request that they be resized) if they have inappropriately large dimensions.
 - Use SVGs when appropriate as they are vector-based and dont need to be rescaled or resized.

## Image Organisation

All website images must be stored locally in `storefront/public/images/`. Never link to external image URLs (except Shopify CDN for product images).

### Folder Structure
```
storefront/public/images/
├── brand/              # Logos and brand assets
│   ├── logo-dark.png   # Logo for light backgrounds
│   └── logo-light.png  # Logo for dark backgrounds
├── illustrations/      # Brand illustrations (robots, atoms, etc.)
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
npx sharp-cli --input image.jpg --output image.jpg --quality 80

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

# Design

## Colours
Navy and white serve as the primary background colours, interchangeably.
Red, orange, blue, yellow, green, purple and grey act as accent colours and are used more sparingly, and in illustrations.
Text is navy on white and white on navy. Accent colours can be used as as accents and highlights for text.

NAVY: #0C1446
RED: #F70B28
BLUE: #3CC7F7
PURPLE: #AC4DFF
ORANGE: #FF8B00
GREEN: #93DB21
YELLOW: #FFD500
GREY: #B3B3B3
WHITE: #ffffff

