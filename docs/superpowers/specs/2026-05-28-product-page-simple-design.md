# Product Page Type: Simple

A new product page type for non-coding, non-electronics physical products sold on the consumer Shop (e.g. telescopes, building blocks, mineral kits, crystal experiments, activity books).

## Purpose & Motivation

Existing parent-focused product pages (`/product-page`) assume a structured learning journey with concrete educational outcomes — kids learn coding, electronics, problem-solving as the headline benefit. That framing doesn't fit a growing set of products in our catalogue:

- Telescopes (NASA Lunar Telescope)
- Open-ended building toys (Blockaroo Foam Blocks)
- Discovery kits (NatGeo Mineral Starter Kit)
- Experiment kits (Crystal growing)
- Activity books (NatGeo Space Activity Book)

These products share a different value proposition: **curiosity, discovery, hands-on play, and fun** rather than skill acquisition. Projects/activities/experiments may exist, but they're typically standalone rather than part of a progression, and they never involve coding or electronics. The page needs a different content voice and a leaner section set to match.

## Audience

Unchanged from existing parent-focused pages — same three parent personas (STEM-curious children, STEM-valuing parents, STEM-unfamiliar parents). The shift is *what's being sold*, not *who's buying*.

## Artefacts

### New files

1. **Content framework** — `assets/brand/simple-product-content-framework.md`
   - Concise (~150-200 lines), references `product-content-framework.md` for shared rules
   - Documents only what's different: audience reframe, voice rules, section content rules, FAQ topic shift, "lean on research content" rule
   - Lists section requirements specific to this page type

2. **Skill** — `.claude/skills/product-page-simple/skill.md`
   - Mirrors structure of existing `product-page-ext/skill.md`
   - Frontmatter includes the `/product-page-simple {slug}` trigger (no separate command file is needed — the skill name IS the slash command, matching existing skills)
   - Reads research from `assets/product/{slug}/content.md`
   - Loads `simple-product-content-framework.md` and `product-page-design.md`
   - Generates page at `storefront/src/app/product/{slug}/page.tsx`
   - Enforces: NumberedSteps excluded, no coding/learning-path language, titles drawn from research content

### Updated files

3. **`CLAUDE.md`** — Add step 6 to the "Product Pages" section, describing `/product-page-simple` alongside the existing four variants. One-paragraph description matching the format of the others.

### Out of scope

- `/research` command — stays generic; raw research content is still useful
- Existing product page commands, skills, or framework docs
- Components in `storefront/src/components/product-sections/`
- `product-page-design.md` and `product-page-components.md` (other than being referenced)
- Generating any actual product page — this spec is the framework + tooling only

## Page Structure

Mirrors the existing design's flow but trimmed. Required sections in bold.

| # | Section | Status | Notes |
|---|---|---|---|
| 1 | **HeroSection** | Required | Tagline leads with experience/wonder, not learning outcomes |
| 2 | **QuickInfoBadges** | Required | Coding-platform and soldering badges naturally won't appear (metafields empty); age + batteries + guide will |
| 3 | SkillTags | Optional | 2-3 lighter tags (Creativity, Patience & Focus, Science, Fine Motor Skills) — skip if forced |
| 4 | VideoEmbed | Optional | If a good video exists |
| 5 | FeatureGrid | Recommended | The main "what's special" section. 3-4 features. Replaces the convince role NumberedSteps used to play |
| 6 | ImageTextBlock | Recommended | 1-2 throughout the page for storytelling/lifestyle imagery |
| 7 | ProjectShowcase | Conditional | Only when genuinely 5+ standalone activities/experiments. Title drawn from research content (e.g. Amazon listing language), not invented |
| 8 | CustomerShowcase | Required if end-user photos exist | Same rule as existing framework |
| 9 | ProductReviews | Optional | Auto-hides when none |
| 10 | **ProductFAQ** | Required | Different topic set (see Content Framework below) |
| 11 | **WhatsIncluded** | Required | Same role as existing |
| 12 | Specifications | Conditional | Use for telescopes/instruments — anything with magnification, dimensions, materials worth noting. Skip for blocks/books |
| 13 | **CallToAction** | Required | Same role |

### Sections explicitly excluded

- **NumberedSteps** — globally excluded per current preference (too content-heavy)
- **CourseTabs** — courses only
- **ExtensionBanner** — extensions only
- **StepPath** — programming progression
- **LazyProductReviews** — only relevant when above the fold

### Example shapes for the five reference products

- **NASA Lunar Telescope** → Hero, Badges, SkillTags, FeatureGrid, ImageTextBlock, CustomerShowcase, FAQ, WhatsIncluded, **Specifications**, CTA
- **Blockaroo Foam Blocks** → Hero, Badges, SkillTags, FeatureGrid, ImageTextBlock×2, CustomerShowcase, FAQ, WhatsIncluded, CTA (no Specs, no ProjectShowcase)
- **NatGeo Mineral Kit** → Hero, Badges, SkillTags, FeatureGrid, ImageTextBlock, ProjectShowcase, FAQ, WhatsIncluded, CTA
- **Crystal Growing Kit** → Hero, Badges, SkillTags, FeatureGrid, ProjectShowcase, ImageTextBlock, FAQ, WhatsIncluded, CTA
- **NatGeo Space Activity Book** → Hero, Badges, SkillTags, FeatureGrid, ImageTextBlock, FAQ, WhatsIncluded, CTA (very minimal)

## Content Framework

The new doc is concise — it points to `product-content-framework.md` for shared rules (Shopify metafields, SEO, imagery folder conventions, writing tone basics) and only documents what's different.

### The Three Questions — adapted

| Existing framework | Simple framework |
|---|---|
| "Is this right for my child?" | (unchanged) |
| "What do they get?" → end result, learning outcomes, what's included | "What will they *do* with it?" → the experience, the activities, what's in the box |
| "Can I trust this?" | (unchanged) |

### Voice & framing rules

- **Lead with experience, not outcomes.** "See craters on the Moon for yourself" beats "Learn lunar topography."
- **No structured-learning-path language.** Avoid "progresses from beginner to advanced", "builds on each skill", "curriculum-aligned." These products aren't journeys.
- **Curiosity, wonder, discovery, play, hands-on** are the keywords.
- **Learning is incidental, not the headline.** Skill tags still appear, but copy doesn't sell skill acquisition as the primary benefit.
- **No coding/electronics framing.** No mention of platforms, programming, soldering, circuits, microcontrollers — unless genuinely a product feature.
- **Lean on the research content's existing language** for section titles, counts, and framing. The Amazon listings (and brand websites) often surface what the product actually calls its activities/experiments/contents — borrow that vocabulary, don't invent generic copy when specific copy exists. This applies to *naming* and *framing* (ProjectShowcase title/subtitle, FeatureGrid titles, what to call the activities). It does **not** override the existing "no copying and pasting" rule from `CLAUDE.md` — descriptions and body copy still get rewritten in CREATESPACE voice.

### Section-specific content rules

- **HeroSection tagline** — sensory or experiential ("Grow your own glittering crystals at home.")
- **HeroSection highlights** — 3-4 bullets focused on: what's inside, age suitability, ease of setup, fun/wow factor. NOT learning outcomes.
- **FeatureGrid** — 3-4 features framed as "What makes this special" (quality, variety, fun, ease). Not "Skills your child develops."
- **ImageTextBlock** — storytelling. Lean into moments: the night a kid first sees Saturn's rings; the satisfaction of identifying a real mineral.
- **ProjectShowcase (when used)** — title drawn from research content. Subtitle reflects standalone nature, not progression. Skip the "each builds on the last" framing.
- **SkillTags** — 2-3 max, weighted toward life skills + soft STEM (Creativity, Patience & Focus, Fine Motor Skills, Following Instructions, Science). Skip if forced.

### FAQ topic shift

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

## Validation (handled per existing pattern)

The skill produces a page that must pass the same pre-push checks as existing product pages:

- `npm run lint`, `npm run build`, `npm test` from `storefront/`
- Page added to `storefront/src/app/sitemap.ts`
- `<ProductJsonLd>`, `generateMetadata` (with title, description, canonical, og:image), single `<h1>` — same SEO rules as existing pages

These are enforced by `CLAUDE.md` already and apply to all product page types; the skill should remind the user but not reinvent the checks.

## Open Questions

None at spec time. The slash command name `/product-page-simple` and the framework doc name are settled; structure and content rules are agreed; out-of-scope items are explicit.
