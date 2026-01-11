# Product Page Design

A specification for how product pages should be structured and laid out.

For content guidelines, see [product-content-framework.md](./product-content-framework.md).

---

## Design Principles

1. **Scannable first** - Key info visible without scrolling
2. **Mobile-first** - Most parents browse on phones
3. **Trust through clarity** - Clean layout signals professionalism
4. **Decision support** - Guide parents to confident purchase

---

## Page Structure

Each section maps to a specific component. Build pages by composing these components in order.

---

### 1. ProductHero (Required)

Everything a parent needs for a quick "yes/no" decision.

```tsx
<ProductHero
  product={product}
  tagline="Your gateway to electronics and coding"
  highlights={[
    "15 hands-on projects included",
    "No prior experience needed",
  ]}
/>
```

**Includes:** Image gallery, title, price, availability, delivery info, Add to Cart button.

---

### 2. AgeSkillBadges (Required)

Quick-reference badges immediately after the hero. Displays as "At a Glance" section.

```tsx
<AgeSkillBadges
  age="8-12"
  skill="beginner"
  supervision={false}
  batteries="2x AA (not included)"
  badges={[
    { icon: "projects", label: "Projects", value: "15 Included" },
    { icon: "time", label: "Build Time", value: "2-3 hours" },
    { icon: "no-soldering", label: "Soldering", value: "Not Required" },
    { icon: "guide", label: "Guide", value: "Included" },
  ]}
/>
```

**Available icons:**
| Icon | Use for |
|------|---------|
| `age` | Age range (auto-added when `age` prop used) |
| `skill` | Skill level (auto-added when `skill` prop used) |
| `supervision` | Adult supervision (auto-added when `supervision` prop used) |
| `battery` | Battery requirements (auto-added when `batteries` prop used) |
| `time` | Build time / duration |
| `projects` | Number of projects included |
| `no-soldering` | No soldering required |
| `guide` | Guide / instructions included |
| `no-tools` | No tools needed |
| `app` | Free companion app |
| `scratch` | Scratch / block coding |
| `tag` | Generic / other |

---

### 3. NumberedSteps (Optional)

"Why choose this?" style benefits with numbered circles. Good for explaining value proposition.

```tsx
<NumberedSteps
  title="Why Start with Arduino?"
  subtitle="The world's most popular learning platform"
  steps={[
    { title: "Build Real Things", description: "..." },
    { title: "Industry Standard", description: "..." },
    { title: "Massive Community", description: "..." },
  ]}
  background="navy"
/>
```

---

### 5. VideoEmbed (Recommended)

Show the product in action. A 15-60 second video is worth a thousand photos.

```tsx
<VideoEmbed
  url="https://youtube.com/watch?v=..."
  title="See it in action"
/>
```

---

### 6. FeatureGrid (Optional)

Grid of features with icons. Good for highlighting key selling points.

```tsx
<FeatureGrid
  title="Everything You Need"
  features={[
    { icon: "book", title: "Project Book", description: "..." },
    { icon: "puzzle", title: "15 Projects", description: "..." },
  ]}
  columns={3}
/>
```

---

### 7. ImageTextBlock (Optional, can use multiple)

Image + text side-by-side. Alternate `layout` for visual rhythm.

```tsx
<ImageTextBlock
  image="/images/products/kit-unboxed.jpg"
  title="Everything in One Box"
  body="Open the box and you're ready to start..."
  layout="image-left"
/>

<ImageTextBlock
  image="/images/products/kit-built.jpg"
  title="From Beginner to Maker"
  body="Build confidence with each project..."
  layout="image-right"
  background="gray"
/>
```

---

### 8. WhatsIncluded (Required)

Show exactly what's in the box. Removes uncertainty.

```tsx
<WhatsIncluded
  title="What's in the Box"
  items={[
    "Arduino UNO Board",
    "170-page project book",
    "USB cable",
    "Breadboard",
    "70+ jumper wires",
    "LEDs, resistors, sensors...",
  ]}
/>
```

**Important:** Always include a "You'll Also Need" section in the product description if batteries, tools, or software are required.

---

### 9. LearningOutcomes (Recommended)

Expand on skill tags with specific learning outcomes.

```tsx
<LearningOutcomes
  title="Skills They'll Develop"
  outcomes={[
    "Basic electronics - circuits, voltage, resistance",
    "Programming fundamentals - variables, loops, functions",
    "Problem-solving and debugging",
    "Reading technical documentation",
  ]}
/>
```

---

### 10. ProjectShowcase (Optional)

For kits with multiple projects/builds. Shows progression and variety.

```tsx
<ProjectShowcase
  title="Projects You'll Build"
  subtitle="Each project builds on the last"
  projects={[
    { name: "LED Controller", description: "...", concepts: "Digital I/O" },
    { name: "Temperature Sensor", description: "...", concepts: "Analog input" },
  ]}
  moreText="Plus 9 more projects..."
/>
```

---

### 11. Specifications (Optional)

Technical specs for products where it matters.

```tsx
<Specifications
  title="Technical Details"
  specs={[
    { label: "Processor", value: "ATmega328P" },
    { label: "Operating Voltage", value: "5V" },
    { label: "Dimensions", value: "68.6 x 53.4 mm" },
  ]}
/>
```

---

### 12. ProductFAQ (Recommended)

Address common concerns and questions.

```tsx
<ProductFAQ
  title="Common Questions"
  faqs={[
    {
      question: "Do I need prior experience?",
      answer: "No! This kit is designed for complete beginners...",
    },
    {
      question: "Is adult supervision required?",
      answer: "Most children 10+ can work independently...",
    },
  ]}
/>
```

---

### 13. ProductTestimonials (Optional)

Curated testimonials from parents and educators.

```tsx
<ProductTestimonials
  title="What Parents & Educators Say"
  testimonials={[
    {
      quote: "My 12-year-old built it entirely on her own...",
      author: "Sarah M.",
      role: "Parent",
      rating: 5,
    },
  ]}
/>
```

---

### 14. CallToAction (Required)

Final push to purchase. Always include.

```tsx
<CallToAction
  title="Ready to Start Building?"
  subtitle="Join millions of makers worldwide"
  primaryLabel="Add to Cart"
  primaryHref="#product-actions"
  secondaryLabel="Browse More Kits"
  secondaryHref="/shop"
  background="navy"
/>
```

---

### 15. RelatedProducts (Required)

Keep them browsing if this isn't the right fit.

```tsx
<RelatedProducts
  products={relatedProducts}
  title="You May Also Like"
/>
```

**Logic for "related":**
- Same skill tags
- Same age range
- Same brand/series
- Complementary products

---

## Minimal vs Full Pages

Not every product needs every component. Here's guidance:

**Minimal page** (simple products):
1. ProductHero
2. AgeSkillBadges
3. WhatsIncluded
4. ProductFAQ
5. CallToAction
6. RelatedProducts

**Full page** (flagship products like Arduino Starter Kit):
All 14 sections as needed.

---

## Mobile Considerations

On mobile, stack everything vertically:

1. Hero image (full width, swipeable gallery)
2. Title + price + rating
3. Spec badges (horizontal scroll if needed)
4. Add to Cart (sticky at bottom of screen)
5. One-liner + skill tags
6. Accordion sections for detail:
   - What's Included ▼
   - Full Description ▼
   - Reviews ▼

**Sticky Add to Cart:** On mobile, keep the Add to Cart button visible at all times as the user scrolls.

---

## Visual Design Notes

**Colours:**
- Use navy/white as primary backgrounds
- Skill tags can use accent colours (but keep readable)
- Price in navy, prominent but not aggressive

**Typography:**
- Product title: Outfit Semi Bold
- Body text: Outfit Regular
- Spec badges: Small, uppercase, subtle background

**Spacing:**
- Generous white space between sections
- Don't cram - let content breathe
- Clear visual separation between sections

---

## Product Imagery

Product-specific images are stored in `assets/product/[product-handle]/` and should be copied to `storefront/public/images/products/[handle]/` before use.

### Image Categories

| Folder | Quality | Display Size | Best Components |
|--------|---------|--------------|-----------------|
| `lifestyle/` | Professional | Full-width, large | ImageTextBlock, hero backgrounds, FeatureGrid |
| `end-user/` | User-generated | Small, grouped | Gallery grids, testimonial sections, social proof |
| `animations/` | User-generated | Small, inline | Feature highlights, inline demos |
| `logo/` | Official | Small, badge-style | Brand attribution, partnerships |

### Usage by Component

**ImageTextBlock** - Use `lifestyle/` photos for the main image. Filenames describe content, so match to section topic:
```tsx
<ImageTextBlock
  image="/images/products/arduino-starter-kit/kids_working_on_project.jpg"
  title="Learn Together"
  body="Perfect for parent-child projects..."
  layout="image-right"
/>
```

**End-user photo galleries** - Group 3-4 `end-user/` photos in a grid within sections to show real-world usage:
```tsx
// Small thumbnail grid showing customer creations
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <Image src="/images/products/handle/end-user/project-1.jpg" ... />
  <Image src="/images/products/handle/end-user/project-2.jpg" ... />
</div>
```

**Animations/GIFs** - Use sparingly within content sections to show movement:
```tsx
// Small inline GIF demonstrating a feature
<Image
  src="/images/products/handle/animations/led-blink.gif"
  width={200}
  height={150}
  alt="LED blinking demonstration"
  className="rounded-lg"
  unoptimized  // Required for GIFs
/>
```

### Selection Guidelines

- **Don't use all images** - Select the most relevant 3-5 for the page
- **Match filenames to content** - `arduino_board_laptop_on_desk.jpg` goes with a "getting started" section
- **Alternate image types** - Mix lifestyle (professional) with end-user (authentic) for variety
- **Keep animations small** - User-generated GIFs work best at thumbnail size

---

## Checklist

Before launching a product page:

- [ ] Hero image is high quality and shows finished product
- [ ] Price is clearly visible above the fold
- [ ] "At a Glance" badges are complete (age, skill, time, etc.)
- [ ] "What's Included" is complete
- [ ] "You'll Also Need" is present (even if empty)
- [ ] Adult supervision requirement is addressed
- [ ] At least one lifestyle photo is included (from `assets/product/[handle]/lifestyle/`)
- [ ] End-user photos used for social proof (from `assets/product/[handle]/end-user/`)
- [ ] Short video/GIF included if available (from `assets/product/[handle]/animations/`)
- [ ] Reviews section is functional
- [ ] Related products are populated
- [ ] Mobile layout has been tested
- [ ] Sticky Add to Cart works on mobile

---

## Component Quick Reference

All components are in `storefront/src/components/product-sections/`.

| Component | Required? | Background Options |
|-----------|-----------|-------------------|
| ProductHero | Yes | - |
| AgeSkillBadges | Yes | gray (fixed) |
| NumberedSteps | Optional | white, gray, navy, navy-card |
| VideoEmbed | Recommended | white, gray |
| FeatureGrid | Optional | white, gray |
| ImageTextBlock | Optional | white, gray, navy |
| WhatsIncluded | Yes | white, gray |
| LearningOutcomes | Recommended | white, gray |
| ProjectShowcase | Optional | white, gray, navy |
| Specifications | Optional | white, gray |
| ProductFAQ | Recommended | white, gray |
| ProductTestimonials | Optional | white, gray |
| CallToAction | Yes | navy, gray, white |
| RelatedProducts | Yes | white, gray |

### Components to Consider Adding

| Component | Purpose |
|-----------|---------|
| **GifShowcase** | Short looping video/GIF for "wow" moments |
| **TrustBadges** | "Tested by educators", "Official distributor" |
| **ComparisonTable** | Compare variants or similar products |

---

## Reference

For content guidelines and skill tag taxonomy, see [product-content-framework.md](./product-content-framework.md).
