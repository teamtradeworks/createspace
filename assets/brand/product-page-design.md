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

#### 3. SkillTags (Optional)

Display skill tags from the product content framework taxonomy. Reinforces learning value immediately after the badges.

**Component:** `SkillTags`

### Convince

#### 4. NumberedSteps (Recommended)

"Why choose this?" positioning with numbered benefits. Place early to establish value before diving into details. 3 steps is the sweet spot.

**Component:** `NumberedSteps` — use `background="navy-card"` for visual emphasis.

#### 5. VideoEmbed (Recommended)

Show the product in action. A 15-60 second video is worth a thousand photos. Place after the value proposition (NumberedSteps) to provide visual proof.

**Component:** `VideoEmbed`

### Educate

#### 6. FeatureGrid (Optional)

Grid of features with icons. Good for highlighting what's included and why it matters. 3-6 features, 3 columns.

**Component:** `FeatureGrid`

#### 7. ProjectShowcase (Optional)

For kits with multiple projects/builds. Shows progression and variety. Best for products with 5+ distinct projects.

**Component:** `ProjectShowcase`

### Reassure

#### 8. CustomerShowcase (Optional)

Gallery of real customer/end-user photos. Social proof from real families using the product.

**Component:** `CustomerShowcase` — use images from `assets/product/[slug]/end-user/`.

#### 9. ProductTestimonials (Optional)

Curated testimonials from parents and educators. 2-3 testimonials from different perspectives. Quotes from real parents are more persuasive than a parts list.

**Component:** `ProductTestimonials`

### Details & Objections

#### 10. WhatsIncluded (Required)

Show exactly what's in the box. Removes uncertainty and sets expectations. Important but lower down — parents want to know *why* before *what*.

**Component:** `WhatsIncluded`

#### 11. ProductFAQ (Recommended)

Address common concerns and questions. FAQs are conversion tools — the last barrier before the CTA. See the content framework for high-priority topics.

**Component:** `ProductFAQ`

#### 12. Specifications (Optional)

Technical specs for products where it matters (microcontrollers, connectivity, dimensions). Skip for simple products. At the very bottom because only technical-minded parents need this.

**Component:** `Specifications`

### Close

#### 13. CallToAction (Required)

Final push to purchase. Always include.

**Component:** `CallToAction` — use `background="navy"`. Primary button links to `#product-actions`, secondary to `/shop`.

#### 14. RelatedProducts (Required)

Keep them browsing if this isn't the right fit.

**Component:** `RelatedProducts`

### ImageTextBlock (Floating — use throughout)

Image + text side-by-side for storytelling. **Not a fixed position** — scatter 3-5 of these throughout the page between denser sections to create visual breathing room. Each one should pair a lifestyle photo with compelling, benefit-led copy.

**Component:** `ImageTextBlock` — alternate `layout` between `"image-left"` and `"image-right"`.

**Good placement spots:**
- Between NumberedSteps and FeatureGrid
- Between FeatureGrid and ProjectShowcase
- Between ProjectShowcase and CustomerShowcase
- Between ProductTestimonials and WhatsIncluded
- Between WhatsIncluded and ProductFAQ

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
- Use 3-5 ImageTextBlocks across a full product page, scattered throughout
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
5. WhatsIncluded
6. ProductFAQ
7. CallToAction
8. RelatedProducts

### Full page (flagship products)

Use for flagship products with rich content, multiple projects, and available lifestyle imagery:

All 14 sections as needed, with ImageTextBlocks scattered between dense sections for storytelling and visual breathing room.

### Decision guide

| Question | If yes... |
|----------|-----------|
| Does it have 5+ distinct projects? | Add ProjectShowcase |
| Is there a good product video? | Add VideoEmbed |
| Do we have customer photos? | Add CustomerShowcase |
| Is it a technical product (microcontroller, etc.)? | Add Specifications |
| Do we have parent/educator testimonials? | Add ProductTestimonials |
| Are there 3+ lifestyle photos? | Add multiple ImageTextBlocks |
| Does it teach specific skills? | Add SkillTags |

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
| SkillTags           | Optional    | 3. Hook           | white, gray, navy            |
| NumberedSteps       | Recommended | 4. Convince       | white, gray, navy, navy-card |
| VideoEmbed          | Recommended | 5. Convince       | white, gray, navy            |
| FeatureGrid         | Optional    | 6. Educate        | white, gray, navy            |
| ProjectShowcase     | Optional    | 7. Educate        | white, gray, navy            |
| CustomerShowcase    | Optional    | 8. Reassure       | white, gray                  |
| ProductTestimonials | Optional    | 9. Reassure       | white, gray, navy            |
| WhatsIncluded       | Yes         | 10. Details       | white, gray                  |
| ProductFAQ          | Recommended | 11. Details       | white, gray                  |
| Specifications      | Optional    | 12. Details       | white, gray                  |
| CallToAction        | Yes         | 13. Close         | navy, gray, white            |
| RelatedProducts     | Yes         | 14. Close         | white, gray, navy            |
| ImageTextBlock      | Optional    | Floating          | white, gray, navy            |
