# Product Page Design

How to structure and lay out product pages by composing components.

For content guidelines and writing advice, see [product-content-framework.md](./product-content-framework.md).
For component props, types, and examples, see [product-page-components.md](./product-page-components.md).

---

## Design Principles

1. **Scannable first** — Key info visible without scrolling
2. **Mobile-first** — Most parents browse on phones
3. **Trust through clarity** — Clean layout signals professionalism
4. **Decision support** — Guide parents to confident purchase

---

## Page Structure

Each section maps to a specific component. Build pages by composing these sections in order. The flow follows a conversion arc: **Hook → Convince → Educate → Reassure → Details → Close**.

### Hook & Qualify

#### 1. HeroSection (Required)

Everything a parent needs for a quick "yes/no" decision. Product title, pricing, discounts, images, availability, delivery info, and add-to-cart are all **pulled automatically from Shopify** — no need to write this into custom content.

**Component:** `HeroSection`

The only custom content for the hero is a benefit-led tagline and 3-4 highlight bullet points. Pass `addons` for upselling.

#### 2. QuickInfoBadges (Required)

Quick-reference badges immediately after the hero. Displays as an "At a Glance" section. All badges (age range, batteries, projects, guide, soldering, coding platform) are **derived automatically from Shopify product metafields** — just pass the product object.

**Component:** `QuickInfoBadges`

### Convince

#### 3. NumberedSteps (Recommended)

"Why choose this?" positioning with numbered benefits. Place early to establish value before diving into details. 3 steps is the sweet spot.

**Component:** `NumberedSteps` — use `background="navy-card"` for visual emphasis.

#### 4. VideoEmbed (Recommended)

Show the product in action. A 15-60 second video is worth a thousand photos. Place after the value proposition (NumberedSteps) to provide visual proof.

**Component:** `VideoEmbed`

### Educate

#### 5. FeatureGrid (Optional)

Grid of features with icons. Good for highlighting what's included and why it matters. 3-6 features, 3 columns.

**Component:** `FeatureGrid`

#### 6. ProjectShowcase (Optional)

Show off the projects, challenges, and activities included with the product. The total count is a powerful selling point — make it prominent in the subtitle and moreText. Show 6 representative items with image thumbnails sourced **strictly from `assets/product/[slug]/projects/` folder**. Best for products with 5+ distinct projects.

**Component:** `ProjectShowcase` — use subtitle to state totals (e.g. "This kit includes 39 projects. Here are a few favourites:") and moreText to reinforce breadth. Images display at 120% of base thumbnail size for better visibility.

### Reassure

#### 7. CustomerShowcase (Required if end-user photos available)

Gallery of real customer/end-user photos. Social proof from real families using the product. **IMPORTANT: If end-user photos exist in `assets/product/[slug]/end-user/`, CustomerShowcase MUST be included and MUST come immediately after ProjectShowcase. Include ALL available end-user photos — do not cherry-pick or limit the number.**

**Component:** `CustomerShowcase` — use ALL images from `assets/product/[slug]/end-user/`.

#### 8. ProductTestimonials (Optional)

Curated testimonials from parents and educators. 2-3 testimonials from different perspectives. Quotes from real parents are more persuasive than a parts list. **Must be placed directly below CustomerShowcase when both sections are present.**

**Component:** `ProductTestimonials`

### Details & Objections

#### 9. ProductFAQ (Recommended)

Address common concerns and questions. FAQs are conversion tools — the last barrier before the CTA. See the content framework for high-priority topics.

**Component:** `ProductFAQ`

#### 10. WhatsIncluded (Required)

Show exactly what's in the box. Removes uncertainty and sets expectations. Placed low on the page — parents want to know *why* before *what*. By this point they're already convinced and just confirming details.

**Component:** `WhatsIncluded`

#### 11. Specifications (Optional) — Always Last

Technical specs for products where it matters (microcontrollers, connectivity, dimensions). Skip for simple products. **Specifications must always be the last content section before the Close sections (CallToAction and RelatedProducts).**

**Component:** `Specifications`

### Close

#### 12. CallToAction (Required)

Final push to purchase. Always include.

**Component:** `CallToAction` — use `background="navy"`. Primary button links to `#product-actions`, secondary to `/shop`.

#### 13. RelatedProducts (Required)

Keep them browsing if this isn't the right fit.

**Component:** `RelatedProducts`

### ImageTextBlock (Floating — use throughout)

Image + text side-by-side for storytelling. **Not a fixed position** — scatter 2-3 of these throughout the page between denser sections to create visual breathing room. Each one should pair a lifestyle photo with compelling, benefit-led copy.

**Component:** `ImageTextBlock` — alternate `layout` between `"image-left"` and `"image-right"`.

**Rules:**
- **Maximum 2-3 per page** — be selective, not exhaustive
- **Never place two ImageTextBlocks directly below one another** — always have at least one other section between them
- **Always above the details/reassure sections** — ImageTextBlocks must appear above Specifications, ProductFAQ, ProductTestimonials, and WhatsIncluded

**Good placement spots:**
- Between VideoEmbed and FeatureGrid
- Between NumberedSteps and FeatureGrid
- Between FeatureGrid and ProjectShowcase

---

## Layout Rhythm

### Background alternation

Never use the same background colour on two consecutive sections. Follow this general pattern:

- **HeroSection** → (no background prop — built-in)
- **QuickInfoBadges** → gray (fixed)
- **SkillTags / NumberedSteps** → `navy-card` (the go-to for early emphasis)
- **VideoEmbed** → `gray`
- **Content sections** → alternate `white` and `gray`, using ImageTextBlocks between dense sections
- **CallToAction** → `navy` (always)
- **RelatedProducts** → `gray`

Use `navy` backgrounds sparingly — typically only for CallToAction and NumberedSteps (`navy-card`).

### ImageTextBlock alternation

Alternate `layout` on consecutive ImageTextBlocks for visual rhythm:
- First: `image-left`
- Second: `image-right`
- Third: `image-left`
- And so on...

### Visual pacing

- Break up dense sections (FeatureGrid, ProjectShowcase, WhatsIncluded) with ImageTextBlocks between them
- Don't place two grid/list-style components back-to-back without a visual break
- Use 2-3 ImageTextBlocks across a full product page, scattered throughout
- Each ImageTextBlock should pair a lifestyle photo with meaningful content — not filler

---

## Minimal vs Full Pages

Not every product needs every section.

### Minimal page (simple products)

Use when the product is straightforward with fewer features to highlight:

1. HeroSection
2. QuickInfoBadges
3. NumberedSteps
4. FeatureGrid
5. ProductFAQ
6. WhatsIncluded
7. CallToAction
8. RelatedProducts

### Full page (flagship products)

Use for flagship products with rich content, multiple projects, and available lifestyle imagery:

All 13 sections as needed, with ImageTextBlocks scattered between dense sections for storytelling and visual breathing room.

### Decision guide

| Question | If yes... |
|----------|-----------|
| Does it have 5+ distinct projects? | Add ProjectShowcase |
| Is there a good product video? | Add VideoEmbed |
| Do we have customer photos? | Add CustomerShowcase |
| Is it a technical product (microcontroller, etc.)? | Add Specifications |
| Do we have parent/educator testimonials? | Add ProductTestimonials |
| Are there 3+ lifestyle photos? | Add multiple ImageTextBlocks |

---

## Checklist

Before launching a product page:

- [ ] Hero image is high quality and shows finished product
- [ ] Price is clearly visible above the fold
- [ ] Tagline is benefit-led and concise
- [ ] "At a Glance" badges show (product metafields configured in Shopify)
- [ ] "What's in the Box" is complete
- [ ] Requirements addressed in FAQ (batteries, tools, software)
- [ ] At least one lifestyle photo is included (from `assets/product/[slug]/lifestyle/`)
- [ ] End-user photos used for social proof if available (from `assets/product/[slug]/end-user/`)
- [ ] Short video/GIF included if available
- [ ] Related products are populated
- [ ] Backgrounds alternate — no two consecutive sections share the same colour
- [ ] ImageTextBlock layouts alternate (left/right)
- [ ] `generateMetadata` provides title and description under 160 chars
- [ ] Mobile layout has been tested

---

## Component Quick Reference

All components are in `storefront/src/components/product-sections/`. For full props and examples, see [product-page-components.md](./product-page-components.md).

| Component           | Required?   | Position          | Background Options           |
| ------------------- | ----------- | ----------------- | ---------------------------- |
| HeroSection         | Yes         | 1. Hook           | — (built-in)                 |
| QuickInfoBadges     | Yes         | 2. Hook           | gray (fixed)                 |
| NumberedSteps       | Recommended | 3. Convince       | white, gray, navy, navy-card |
| VideoEmbed          | Recommended | 4. Convince       | white, gray, navy            |
| FeatureGrid         | Optional    | 5. Educate        | white, gray, navy            |
| ProjectShowcase     | Optional    | 6. Educate        | white, gray, navy            |
| CustomerShowcase    | Optional    | 7. Reassure       | white, gray                  |
| ProductTestimonials | Optional    | 8. Reassure (after CustomerShowcase) | white, gray, navy            |
| ProductFAQ          | Recommended | 9. Details        | white, gray                  |
| WhatsIncluded       | Yes         | 10. Details       | white, gray                  |
| Specifications      | Optional    | 11. Details (always last) | white, gray                  |
| CallToAction        | Yes         | 12. Close         | navy, gray, white            |
| RelatedProducts     | Yes         | 13. Close         | white, gray, navy            |
| ImageTextBlock      | Optional    | Floating          | white, gray, navy            |
