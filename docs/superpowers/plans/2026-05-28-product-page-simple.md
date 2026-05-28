# Product Page Simple Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/product-page-simple` skill, supporting content framework doc, and CLAUDE.md updates so the team can generate leaner product pages for non-coding, non-electronics physical products (telescopes, building blocks, science kits, activity books).

**Architecture:** Three artefacts, each modelled directly on existing equivalents — the framework doc follows the shape of `ext-product-content-framework.md`, the skill follows the shape of `.claude/skills/product-page-ext/skill.md`, and the CLAUDE.md update mirrors the existing per-variant blocks. No tests apply (these are configuration/documentation files); validation is by reading the produced files and confirming the slash command is discoverable in a fresh Claude Code session.

**Tech Stack:** Markdown docs, Claude skill frontmatter, no code changes to the storefront.

**Spec:** `docs/superpowers/specs/2026-05-28-product-page-simple-design.md`

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `assets/brand/simple-product-content-framework.md` | Create | Voice/section rules for the simple page type. Concise. References `product-content-framework.md` for shared rules. |
| `.claude/skills/product-page-simple/skill.md` | Create | Trigger + workflow for `/product-page-simple {slug}`. Mirrors `product-page-ext/skill.md`. |
| `CLAUDE.md` | Modify | Add step 6 describing the new variant; update the trailing summary sentence. |

No tests to write — these are configuration/documentation files. Validation steps below confirm the artefacts work in practice.

---

## Task 1: Create the simple-product content framework doc

**Files:**
- Create: `assets/brand/simple-product-content-framework.md`

- [ ] **Step 1: Write the framework doc**

Create `assets/brand/simple-product-content-framework.md` with the following content:

```markdown
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
| 3 | SkillTags | Optional | 2-3 lighter tags (Creativity, Patience & Focus, Science, Fine Motor Skills). Skip if forced. |
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
```

- [ ] **Step 2: Verify the file reads correctly**

Open `assets/brand/simple-product-content-framework.md` in an editor or render preview. Confirm:
- The markdown renders cleanly (tables, headings, lists)
- Internal links to `product-page-design.md`, `product-page-components.md`, `product-content-framework.md` are correct relative paths (all three are siblings in `assets/brand/`)
- No placeholders, TODOs, or empty sections

- [ ] **Step 3: Commit**

```bash
git add assets/brand/simple-product-content-framework.md
git commit -m "Add simple-product content framework"
```

---

## Task 2: Create the product-page-simple skill

**Files:**
- Create: `.claude/skills/product-page-simple/skill.md`

- [ ] **Step 1: Write the skill file**

Create `.claude/skills/product-page-simple/skill.md` with the following content. The frontmatter `description` field is what Claude Code surfaces to decide whether to invoke the skill — it must mention the `/product-page-simple {slug}` trigger so the command is discoverable.

````markdown
---
name: product-page-simple
description: Create or update a custom product page for a non-coding, non-electronics physical product (telescopes, building toys, science kits, activity books). Use when the user runs `/product-page-simple {slug}`. Transforms research content into a leaner product page that leads with curiosity and discovery rather than structured learning outcomes.
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
---

# Simple Product Page Skill

## Purpose

Create or update a custom product page for non-coding, non-electronics physical products — telescopes, building toys, discovery kits, experiment kits, and activity books. These pages are leaner than standard product pages and lead with experience, curiosity, and play rather than structured learning outcomes.

## When to Use

Invoke when:
- User runs `/product-page-simple {slug}` command
- User asks to create a product page for a telescope, building toy, science kit, mineral kit, crystal kit, activity book, or similar non-coding physical product
- User wants to update an existing simple product page

## Prerequisites

**Required:** Research content must exist at `assets/product/{slug}/content.md`

If the content file doesn't exist, inform the user to run `/research {slug}` first.

## Arguments

Takes one argument:
1. **slug** — the product's slug/handle from Shopify

Example usage:
```
/product-page-simple nasa-lunar-telescope
/product-page-simple blockaroo-foam-blocks
/product-page-simple natgeo-mineral-kit
```

## What This Skill Does

1. **Validates prerequisites** — Confirms research content exists for the product
2. **Reads research content** — Extracts information from `assets/product/{slug}/content.md`
3. **Catalogs available images** — Lists images in `assets/product/{slug}/` subfolders
4. **Plans page structure** — Determines which sections to include based on available content and product type
5. **Writes the product page** — Creates/updates `storefront/src/app/product/{slug}/page.tsx`
6. **Copies and optimizes images** — Moves needed images to `storefront/public/images/products/{slug}/`

## Important: Dynamic vs Static Content

**Dynamic content (from Shopify - NEVER hardcode):**
- Product title
- Price and compare-at price
- Availability status
- Product images (HeroSection gallery only)
- Variants
- Vendor/brand

These are fetched at runtime via `getProductByHandle()` and passed to `HeroSection` via the `product` prop.

**Static content (from research - what you write):**
- Tagline (experiential, not outcome-led)
- Highlights (3-4 bullets — what's inside, age, ease, fun/wow factor)
- Section content (FeatureGrid items, FAQs, ImageTextBlock copy, WhatsIncluded list)

## What This Skill Does NOT Do

- Research content (use `/research` first)
- Create standard coding/electronics-kit pages (use `/product-page` instead)
- Create educator pages (use `/product-page-edu`)
- Create course pages (use `/product-page-course`)
- Create extension/expansion pages (use `/product-page-ext`)
- Create or modify components (use existing components from `storefront/src/components/product-sections/`)
- Modify the design system
- Write inline JSX for sections — always use the provided components

## Key Resources

Before writing any code, read these files:

1. **Research content:** `assets/product/{slug}/content.md` (REQUIRED)
2. **Simple content framework:** `assets/brand/simple-product-content-framework.md` (REQUIRED)
3. **Parent content framework:** `assets/brand/product-content-framework.md` (for shared rules)
4. **Design spec:** `assets/brand/product-page-design.md`
5. **Component reference:** `assets/brand/product-page-components.md`
6. **Example existing pages:** look at `storefront/src/app/product/` for a recent example to mirror structure

## Available Components

Import components from `@/components/product-sections`:

```tsx
import {
  HeroSection,
  QuickInfoBadges,
  SkillTags,
  VideoEmbed,
  FeatureGrid,
  ImageTextBlock,
  ProjectShowcase,
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  CallToAction,
  RelatedProducts,
} from "@/components/product-sections";
```

## Sections to NEVER Include for Simple Products

- **NumberedSteps** — globally excluded across all product pages (too content-heavy)
- **ExtensionBanner** — extensions only
- **CourseTabs** — courses only
- **StepPath** — programming progression
- **LazyProductReviews** — only relevant when above the fold

## Page Structure

Required sections in bold. See `simple-product-content-framework.md` for full rules.

| # | Section | Status |
|---|---|---|
| 1 | **HeroSection** | Required |
| 2 | **QuickInfoBadges** | Required |
| 3 | SkillTags | Optional |
| 4 | VideoEmbed | Optional |
| 5 | FeatureGrid | Recommended |
| 6 | ImageTextBlock | Recommended (1-2) |
| 7 | ProjectShowcase | Only when 5+ standalone activities/experiments exist |
| 8 | CustomerShowcase | Required if end-user photos exist |
| 9 | ProductReviews | Optional (auto-hides) |
| 10 | **ProductFAQ** | Required |
| 11 | **WhatsIncluded** | Required |
| 12 | Specifications | Conditional (telescopes, instruments) |
| 13 | **CallToAction** | Required |

## Voice & Framing — Critical Rules

- **Lead with experience, not outcomes.** "See craters on the Moon for yourself" beats "Learn lunar topography."
- **No structured-learning-path language.** Avoid "progresses from beginner to advanced", "builds on each skill", "curriculum-aligned."
- **Curiosity, wonder, discovery, play, hands-on** — these are the keywords.
- **Learning is incidental, not the headline.**
- **No coding or electronics framing** — no platforms, programming, soldering, circuits, microcontrollers unless genuinely a product feature.
- **Lean on the research content's existing language** for section titles, counts, and framing (especially from Amazon listings or the brand's own copy). Borrow vocabulary, don't invent generic titles. This applies to naming and framing — body copy is still rewritten in CREATESPACE voice (no copy/paste).

## Workflow

### 1. Validate Prerequisites

```bash
# Check if content exists
ls assets/product/{slug}/content.md
```

If missing, respond:
> Research content not found for `{slug}`. Please run `/research {slug}` first to gather product information.

### 2. Read Required Files

- `assets/product/{slug}/content.md` — The research content
- `assets/brand/simple-product-content-framework.md` — Simple-page voice and section rules
- `assets/brand/product-content-framework.md` — Shared rules (skill tags taxonomy, SEO, etc.)
- `assets/brand/product-page-design.md` — Component reference

### 3. Catalog Available Images

```bash
ls -la assets/product/{slug}/lifestyle/ 2>/dev/null
ls -la assets/product/{slug}/end-user/ 2>/dev/null
ls -la assets/product/{slug}/projects/ 2>/dev/null
ls -la assets/product/{slug}/animations/ 2>/dev/null
```

### 4. Plan Page Structure

Pick sections from the table above based on:
- **ProjectShowcase** — include only if there are 5+ standalone activities/experiments in the research content
- **Specifications** — include for telescopes/instruments with magnification, dimensions, materials worth listing; skip for foam blocks, activity books
- **CustomerShowcase** — required if `assets/product/{slug}/end-user/` contains photos
- **VideoEmbed** — include if a good video URL exists in the research
- **SkillTags** — include 2-3 tags only if they honestly fit (Creativity, Patience & Focus, Fine Motor Skills, Following Instructions, Science). Skip if forced.

### 5. Write Content

Transform research content into simple-product copy:

- **Apply simple-product voice:** experience-led, curiosity-led, no learning-path language
- **Pull titles from research** wherever the brand has its own framing for activities/experiments/contents
- **Tagline:** experiential ("Grow your own glittering crystals at home")
- **Highlights:** 3-4 bullets — what's inside, age, ease, fun factor (NOT learning outcomes)
- **FAQs:** focus on age, mess, setup, safety, independence, replayability — NOT coding/software/soldering
- **No copy/paste** of body copy from research per `CLAUDE.md` rule, but DO borrow titling/framing

### 6. Copy and Optimize Images

```bash
mkdir -p storefront/public/images/products/{slug}
cp assets/product/{slug}/lifestyle/selected-image.jpg storefront/public/images/products/{slug}/

# Resize and compress
sips --resampleWidth 1200 storefront/public/images/products/{slug}/image.jpg
npx sharp-cli --input storefront/public/images/products/{slug}/image.jpg --output storefront/public/images/products/{slug}/image.jpg --quality 80
```

Select 2-4 images — fewer than standard pages, more than extension pages.

### 7. Write the Page

Create/update the page file at:
`storefront/src/app/product/{slug}/page.tsx`

Include:
- `<ProductJsonLd product={product} />`
- `generateMetadata` with `title`, `description` (under 160 chars), `alternates.canonical`, `openGraph.images`
- Single `<h1>` (provided by `HeroSection` — do not add another)
- `RelatedProducts` at the bottom

### 8. Remind the User of Pre-Push Checks

After writing the page, remind the user to run from `storefront/`:
```bash
npm run lint
npm run build
npm test
```

And to add the page to `storefront/src/app/sitemap.ts`.

## Output

The skill produces:
1. A complete simple product page at `storefront/src/app/product/{slug}/page.tsx`
2. Images copied to `storefront/public/images/products/{slug}/` (if any)

## Validation Checklist

Before completing, verify:

- [ ] Content file was read: `assets/product/{slug}/content.md`
- [ ] Simple content framework was read: `assets/brand/simple-product-content-framework.md`
- [ ] Required sections included: HeroSection, QuickInfoBadges, ProductFAQ, WhatsIncluded, CallToAction
- [ ] **NumberedSteps is NOT included**
- [ ] Hero tagline is experiential, not outcome-led
- [ ] No coding/electronics/soldering/platform language anywhere unless genuinely a feature
- [ ] No "learning journey" or "progresses from beginner" language
- [ ] ProjectShowcase title (if used) is drawn from research content, not invented
- [ ] FAQ topics focus on simple-product concerns (age, mess, setup, safety, independence, replayability)
- [ ] `<ProductJsonLd product={product} />` included
- [ ] `generateMetadata` exports `title`, `description`, `alternates.canonical`, `openGraph.images`
- [ ] HeroSection receives `product` prop (no hardcoded prices)
- [ ] Images optimised if any were copied
- [ ] Backgrounds alternate — no two consecutive sections share the same colour
- [ ] File created at correct path: `storefront/src/app/product/{slug}/page.tsx`
- [ ] User reminded of pre-push checks (`npm run lint`, `npm run build`, `npm test`) and sitemap update

## Error Handling

**Content file missing:**
> Research content not found for `{slug}`. Please run `/research {slug}` first.

**No images available:**
> No product images found in `assets/product/{slug}/`. The page will use text-only sections (no ImageTextBlock, no CustomerShowcase). Consider sourcing images before publishing.

**Product seems to involve coding/electronics:**
> The research content suggests this product involves coding or electronics. The `/product-page-simple` skill is for non-coding products — `/product-page` may be a better fit. Please confirm which to use.
````

- [ ] **Step 2: Verify the skill file structure**

Confirm:
- Frontmatter has `name: product-page-simple`, `description` mentioning `/product-page-simple {slug}`, and `allowed-tools`
- File path is `.claude/skills/product-page-simple/skill.md` (lowercase `skill.md`, matching existing skills)
- No placeholders, TODOs, or empty sections

Compare with `.claude/skills/product-page-ext/skill.md` to confirm structural parity.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/product-page-simple/skill.md
git commit -m "Add /product-page-simple skill"
```

---

## Task 3: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md` (the "Product Pages" section, around lines 254-296)

- [ ] **Step 1: Add the new step 6 between current step 5 and the trailing summary**

Edit `CLAUDE.md` and insert a new step 6 immediately after the existing step 5 (the extension/expansion variant, ending at "Triggered by the Claude command `/product-page-ext {slug} {parent-slug}`").

The exact text to insert (matching the format of existing steps 2-5):

```markdown

 6. Turning research content into a simple product page (non-coding, non-electronics):
    - Uses the researched content in `assets/product/{slug}/content.md` and the following documents:
      - `assets/brand/simple-product-content-framework.md`
      - `assets/brand/product-page-design.md`
    - Leaner product pages for non-coding, non-electronics physical products (telescopes, building toys, science kits, activity books)
    - Leads with experience, curiosity, and play rather than structured learning outcomes
    - No copying and pasting.
    - Triggered by the Claude command `/product-page-simple {slug}`
```

- [ ] **Step 2: Update the trailing summary sentence**

Find the line:
```
We keep the research step separate so that we don't need to repeat researching online while reworking a product page. Steps 2, 3, 4, and 5 are alternatives — use `/product-page` for consumer products (Shop), `/product-page-edu` for classroom kits (Education), `/product-page-course` for online courses (Education), and `/product-page-ext` for extension/expansion products.
```

Replace it with:
```
We keep the research step separate so that we don't need to repeat researching online while reworking a product page. Steps 2, 3, 4, 5, and 6 are alternatives — use `/product-page` for consumer products (Shop), `/product-page-edu` for classroom kits (Education), `/product-page-course` for online courses (Education), `/product-page-ext` for extension/expansion products, and `/product-page-simple` for non-coding, non-electronics physical products (Shop).
```

- [ ] **Step 3: Verify the edit**

```bash
grep -n "product-page-simple" CLAUDE.md
```

Expected: two matches — one in the new step 6, one in the updated summary sentence.

```bash
grep -n "Steps 2, 3, 4, 5, and 6 are alternatives" CLAUDE.md
```

Expected: one match.

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "Document /product-page-simple in CLAUDE.md"
```

---

## Task 4: End-to-end verification

**Files:** none modified; this is a manual verification step.

- [ ] **Step 1: Confirm all three artefacts exist with the expected paths**

```bash
ls assets/brand/simple-product-content-framework.md
ls .claude/skills/product-page-simple/skill.md
grep -c "product-page-simple" CLAUDE.md
```

Expected:
- Both `ls` commands return the file path with no error
- `grep -c` returns at least `2`

- [ ] **Step 2: Skill discoverability check**

Open a fresh Claude Code session (or use the existing one in a new turn) and verify that typing `/product-page-simple` is suggested or accepted as a valid skill invocation. Confirm the skill description references `/product-page-simple {slug}` so Claude correctly routes the command.

If the skill isn't picked up: confirm filename is `skill.md` (lowercase), confirm frontmatter is valid YAML, and confirm the `description` field includes the trigger phrase.

- [ ] **Step 3: Internal link sanity check**

Open `assets/brand/simple-product-content-framework.md` and click/follow each internal link. Confirm they resolve to:
- `./product-page-design.md` → exists
- `./product-page-components.md` → exists
- `./product-content-framework.md` → exists

- [ ] **Step 4: Optional smoke test (only if a candidate product has research content already)**

If `assets/product/{slug}/content.md` exists for one of the five reference products, try invoking `/product-page-simple {slug}` in a fresh turn to confirm the skill runs end-to-end. This is optional — it generates real code and should not be done without intent to keep the result.

If no smoke test product is available, skip this step.

- [ ] **Step 5: No commit needed for verification**

Nothing changed in this task. If steps 1-4 passed, the implementation is complete.

---

## Definition of Done

- [ ] `assets/brand/simple-product-content-framework.md` exists, is committed, and renders cleanly
- [ ] `.claude/skills/product-page-simple/skill.md` exists, is committed, frontmatter is valid
- [ ] `CLAUDE.md` documents `/product-page-simple` as step 6 and includes it in the alternatives summary
- [ ] All three commits are on the current branch
- [ ] Skill is discoverable by Claude Code
- [ ] Internal links in the framework doc resolve correctly

No PR is created by this plan — open one separately when ready, per existing workflow.
