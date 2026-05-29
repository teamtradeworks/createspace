# Simple Product Content Framework

A guide for creating product pages for non-coding, non-electronics physical products — telescopes, building toys, discovery kits, experiment kits, activity books, and similar.

For page layout and composition, see [product-page-design.md](./product-page-design.md).
For component specifications, see [product-page-components.md](./product-page-components.md).
For shared rules (Shopify metafields, SEO, imagery folders, baseline tone), see the parent doc [product-content-framework.md](./product-content-framework.md). This doc only documents what's *different* — read it alongside the parent.

---

## Philosophy

Existing parent-focused product pages assume a structured learning journey with concrete educational outcomes — kids learn coding, electronics, problem-solving. That framing doesn't fit telescopes, foam blocks, mineral kits, or activity books.

These products share a different value proposition: **curiosity, discovery, hands-on play, and fun.** Projects and activities may exist, but they're typically standalone rather than part of a progression, and they never involve coding or electronics. The page is leaner, and the voice is different.

**Key principle:** Lead with the experience, not the outcome. Parents buying a telescope want their child to see Saturn's rings, not "master lunar topography."

---

## Audience

Unchanged from the parent framework — same three parent personas. The shift is *what's being sold*, not *who's buying*.

---

## The Three Questions — Adapted

The parent framework's three questions still apply, but the middle one shifts:

| Parent framework | Simple framework |
|---|---|
| "Is this right for my child?" | (unchanged) |
| "What do they get?" → end result, learning outcomes, what's included | "What will they *do* with it?" → the experience, the activities, what's in the box |
| "Can I trust this?" | (unchanged) |

The "learning outcomes" framing is replaced with experience and activity framing. Learning happens, but it's incidental, not the headline benefit.

---

## Voice & Framing Rules

- **Lead with experience, not outcomes.** "See craters on the Moon for yourself" beats "Learn lunar topography."
- **No structured-learning-path language.** Avoid "progresses from beginner to advanced", "builds on each skill", "curriculum-aligned." These products aren't journeys.
- **Curiosity, wonder, discovery, play, hands-on** are the keywords.
- **Learning is incidental, not the headline.** Skill tags still appear when used, but copy doesn't sell skill acquisition as the primary benefit.
- **No coding or electronics framing.** No mention of platforms, programming, soldering, circuits, microcontrollers — unless genuinely a product feature.
- **Lean on the research content's existing language** for section titles, counts, and framing. Amazon listings and brand websites often surface what the product actually calls its activities, experiments, or contents — borrow that vocabulary. Don't invent generic copy ("Activities Inside") when specific copy exists ("7 Mind-Blowing Experiments"). This applies to *naming* and *framing* — descriptions and body copy still get rewritten in CREATESPACE voice per the parent framework's "no copying and pasting" rule.

---

## Page Structure

Required sections in bold. See `product-page-design.md` for component details.

| # | Section | Status | Notes |
|---|---|---|---|
| 1 | **HeroSection** | Required | Tagline leads with experience/wonder, not learning outcomes |
| 2 | **QuickInfoBadges** | Required | Coding-platform and soldering badges naturally won't appear; age + batteries + guide will |
| 3 | ~~SkillTags~~ | Excluded | Do not use — removed globally. |
| 4 | VideoEmbed | Optional | If a good video exists |
| 5 | FeatureGrid | Recommended | The main "what's special" section. 3-4 features. |
| 6 | ImageTextBlock | Recommended | 1-2 throughout for storytelling/lifestyle imagery |
| 7 | ProjectShowcase | Conditional | Only when there are genuinely 5+ standalone activities/experiments. Title drawn from research content. |
| 8 | CustomerShowcase | Required if end-user photos exist | Same rule as parent framework |
| 9 | ProductReviews | Optional | Auto-hides when none |
| 10 | **ProductFAQ** | Required | Different topic set (see below) |
| 11 | **WhatsIncluded** | Required | Same role as parent framework |
| 12 | Specifications | Conditional | Use for telescopes/instruments. Skip for blocks/books. |
| 13 | **CallToAction** | Required | Same role |

### Sections explicitly excluded

- **SkillTags** — removed globally; do not use on any product page
- **NumberedSteps** — globally excluded across all product pages at present (too content-heavy)
- **CourseTabs** — courses only
- **ExtensionBanner** — extensions only
- **StepPath** — programming progression
- **LazyProductReviews** — only relevant when above the fold

---

## Section-Specific Content Rules

### HeroSection

- **Tagline:** Sensory or experiential. "Grow your own glittering crystals at home." "See craters on the Moon for yourself." Not "Educational crystal kit for ages 8+."
- **Highlights:** 3-4 bullets focused on: what's inside, age suitability, ease of setup, fun/wow factor. NOT learning outcomes.

### FeatureGrid

- 3-4 features framed as "What makes this special" — quality, variety, fun, ease of use.
- Not "Skills your child develops."
- Pull titles from the research content where the brand has its own framing.

### ImageTextBlock

- Storytelling. Lean into moments: the night a kid first sees Saturn's rings; the satisfaction of identifying a real mineral; the calm of building with foam blocks.
- 1-2 per page, alternating image-left and image-right per parent framework's rhythm rules.

### ProjectShowcase (when used)

- Only use when there are 5+ standalone activities or experiments.
- **Title:** Drawn from the research content. Borrow what the brand calls them ("7 Mind-Blowing Experiments", "Activities in the Book"). Don't invent generic titles.
- **Subtitle:** Reflects standalone nature, not progression. Skip the "each builds on the last" framing — these aren't a journey.

### SkillTags

- 2-3 tags max, weighted toward life skills + soft STEM: Creativity, Patience & Focus, Fine Motor Skills, Following Instructions, Science.
- Skip entirely if you can't honestly pick 2-3 tags that fit.

### ProductFAQ

5-7 questions. **Topic shift from the parent framework:**

**High-priority topics for simple products:**
- "What age is this best for?"
- "Is it messy / does it stain / is cleanup easy?" (chemistry, crystals, art kits)
- "How long does the activity last?" / "Can it be reused?"
- "Is the setup easy?" (telescopes, building toys)
- "Is it safe?" (small parts, chemicals, sharp edges)
- "Does my child need help?"
- "What do they get out of it?" — gentle answer about discovery/curiosity, not curriculum

**Topics to drop:**
- "Do they need coding experience?"
- "What software/computer do they need?"
- "Is soldering required?"

### CallToAction

- Same shape as parent framework. Secondary CTA links to `/shop`.

---

## Examples — Section Shape for Reference Products

- **NASA Lunar Telescope** → Hero, Badges, SkillTags, FeatureGrid, ImageTextBlock, CustomerShowcase, FAQ, WhatsIncluded, **Specifications**, CTA
- **Blockaroo Foam Blocks** → Hero, Badges, SkillTags, FeatureGrid, ImageTextBlock×2, CustomerShowcase, FAQ, WhatsIncluded, CTA (no Specs, no ProjectShowcase)
- **NatGeo Mineral Kit** → Hero, Badges, SkillTags, FeatureGrid, ImageTextBlock, ProjectShowcase, FAQ, WhatsIncluded, CTA
- **Crystal Growing Kit** → Hero, Badges, SkillTags, FeatureGrid, ProjectShowcase, ImageTextBlock, FAQ, WhatsIncluded, CTA
- **NatGeo Space Activity Book** → Hero, Badges, SkillTags, FeatureGrid, ImageTextBlock, FAQ, WhatsIncluded, CTA (very minimal)

---

## SEO and Metadata

Follow the parent framework's SEO rules (`product-content-framework.md`) and the SEO Requirements section of `product-page-design.md`. No simple-page-specific changes.
