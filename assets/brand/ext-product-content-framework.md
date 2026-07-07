# Extension Product Content Framework

A guide for creating product pages for expansion packs, add-ons, and extension kits — products designed to extend or expand another product.

For page layout and composition, see [product-page-design.md](./product-page-design.md).
For component specifications, see [product-page-components.md](./product-page-components.md).

---

## Philosophy

Extension products serve an existing customer who already owns and enjoys the parent product. They don't need to be sold on the category — they need to understand **what's new, what's different, and whether it's worth adding**.

**Key principle:** Be concise. The parent already did the heavy lifting of explaining the brand, the platform, and the learning approach. Extension pages should be shorter, more focused, and assume some baseline familiarity.

---

## Audience

The primary audience is parents who already own the parent product. They may also be new customers browsing the range. Write for both, but lean towards the existing customer.

### Existing customers
- Already familiar with the parent product and brand
- Want to know: "What new things can my child do with this?"
- Looking for clear differentiation from what they already have
- May be repeat buyers — trust is already established

### New customers who land here directly
- May not own the parent product yet
- Need to understand this requires another product
- Should be guided to the parent product page for the full picture

---

## The Extension Relationship

Every extension product page must make the parent relationship **unmissable**. This is the single most important distinction from standard product pages.

**Required elements:**
1. **ExtensionBanner** — immediately after the hero, prominently linking to the parent product
2. **Hero tagline** — should reference the extension nature (e.g. "New sensors and projects for your Arduino Starter Kit")
3. **FAQ** — must include "Do I need the [parent product]?" as the first or second question

**Tone for the extension relationship:**
- Additive, not replacement: "adds", "expands", "unlocks", "goes further"
- Positive: "Take your projects further" not "Your current kit is limited"
- Clear: "Requires the [Parent Product]" — don't bury this

---

## Content Approach: Shorter and Sharper

Extension pages use fewer sections and shorter copy than standard product pages. The goal is a focused page that answers:

1. **"What's new?"** — What does this add that the parent product doesn't have?
2. **"What will they build?"** — New projects, challenges, or capabilities
3. **"Do I need the original?"** — Clear compatibility information

### What to skip
- Long "why STEM" messaging — the parent page handles this
- Detailed brand introductions
- Extensive social proof (one or two lifestyle photos is enough)
- Skill tags — the parent product already established these

### What to emphasise
- **New components and sensors** — what's physically different
- **New projects** — what new things they'll build
- **Compatibility** — what's required and what works together
- **What's included** — still essential, but shorter lists are fine

---

## Writing for Extensions

### Do
- Reference the parent product by name: "pairs with your Arduino Starter Kit"
- Lead with what's new: "10 new sensor modules" not "A sensor exploration kit"
- Be specific about compatibility: "Requires the Arduino Uno (included in the Starter Kit)"
- Keep descriptions tight — 1-2 sentences per section, not 3-4
- Use South African English spelling (colour, favourite, programme)

### Don't
- Repeat information that's on the parent product page
- Oversell — existing customers know the brand, just show the value
- Use vague language: "enhances your experience" — say what it actually adds
- Forget to mention the parent product requirement

**Final pass:** Run drafted copy through the humanizer to strip AI tells (em dashes, rule-of-three, promotional filler) before publishing. See [voice-and-tone.md](./voice-and-tone.md#sounding-human-not-ai-generated).

### Hero tagline and highlights

The hero must immediately communicate the extension nature:
- **Tagline:** Name the parent and the new capability: "10 new sensors to expand your Arduino projects"
- **Highlights:** 3-4 bullets focused on what's new and different
  - What's added (components, sensors, modules)
  - Number of new projects or activities
  - Compatibility note
  - No experience beyond the parent product needed

### FAQ approach

Keep FAQs focused on extension-specific concerns (4-5 questions):
- "Do I need the [parent product]?" → Yes, clearly state what's required
- "What's different from the [parent product]?" → Highlight the new additions
- "Can I use this with [other related product]?" → If applicable
- "What new things will my child build?" → Specific project examples
- "Is this suitable for the same age range?" → Confirm or clarify

### CTA approach

- **Primary CTA:** "Add to Cart" → `#product-actions`
- **Secondary CTA:** Link to the parent product ("View the [Parent Product]" → parent product URL)
- This is a key difference from standard pages which link to `/shop`

---

## Section-Level Content Guidance

### HeroSection
- Tagline references extension nature
- Highlights focus on what's new
- Keep highlights to 3-4 bullet points

### ExtensionBanner (NEW — required for extensions)
- Placed immediately after HeroSection
- Links to parent product
- Short, clear message about the relationship

### QuickInfoBadges
- Still derived from Shopify metafields
- Same as standard product pages

### FeatureGrid
- Focus on new capabilities: "What This Adds"
- 3-4 items highlighting what's new
- Don't repeat features of the parent product

### WhatsIncluded
- List everything in the extension kit
- Be clear about what's NOT included (i.e. the parent product's components)

### ProductFAQ
- 4-5 questions, extension-focused
- First question should address the parent product requirement

### CallToAction
- Secondary CTA links to parent product, not `/shop`
- Title: direct and simple

---

## SEO and Metadata

Metadata should reference both the extension and parent product:

```
title: "Arduino Sensor Kit | CREATESPACE"
description: "Expand your Arduino Starter Kit with 10 plug-and-play sensors and 10 guided projects. Learn about light, sound, temperature, and more. Ages 10+."
```

The description should mention the parent product naturally for search context.
