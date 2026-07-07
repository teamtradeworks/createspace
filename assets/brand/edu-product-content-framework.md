# Education Product Content Framework

A guide for creating educator-focused product page content that helps schools make confident purchasing decisions.

For page layout and composition, see [product-page-design.md](./product-page-design.md).
For component specifications, see [product-page-components.md](./product-page-components.md).

---

## Philosophy

Educators shopping for classroom STEM resources face different pressures than parents. They must justify spend to administrators, align purchases with curriculum requirements, manage groups of learners simultaneously, and prove educational value. Our job is to **empower confident procurement decisions** — show that this product works in a real classroom, not just a living room.

**Key principle:** Educators are time-poor. They need to quickly determine curriculum fit, cost-per-learner, and implementation effort. Every piece of information must help them justify the purchase to a principal, HOD, or school board.

---

## Audience

The primary audience for education product pages is educators and school decision-makers. We serve three distinct personas, each with different needs. Good content speaks to all three simultaneously.

### STEM Champion Teachers

Teachers already passionate about STEM, looking for the right classroom tools.

- **Pain points:** Limited budget, need to justify purchases, want quality over cheapest option
- **What they need:** Clear learning outcomes mapped to curriculum, evidence of durability, professional development resources
- **How to write for them:** Emphasise curriculum alignment (CAPS), learning outcomes per activity, and how the kit scales to a full class. Use language like "curriculum-aligned", "classroom-tested", and "reusable across terms."

### Administrative Decision-Makers

HODs, principals, and procurement officers evaluating purchases.

- **Pain points:** Need to justify spend, compare options, understand total cost of ownership
- **What they need:** Cost-per-learner calculations, bulk pricing info, longevity/reusability data, support included
- **How to write for them:** Lead with value proposition and ROI. "Serves 30 learners per term, reusable for years" is more compelling than feature lists. Include concrete numbers wherever possible.

### STEM-Hesitant Educators

Teachers asked to teach STEM but lacking confidence or background.

- **Pain points:** No STEM background, worried about classroom management with kits, unsure how to teach with physical materials
- **What they need:** Teacher guides, lesson plans, minimal-prep activities, support resources
- **How to write for them:** Reassure constantly. "No STEM background needed — complete teacher guide included with lesson plans, learning objectives, and assessment rubrics." This persona is the reason every FAQ should address "Do I need STEM expertise to use this?"

---

## What Shopify Already Handles

The following information is pulled **automatically from the Shopify Storefront API** and does not need to be written into product page content. Do not duplicate this information in custom copy.

**HeroSection** (from Shopify product data):
- Product title
- Pricing (including sale prices and discounts)
- Product images (gallery)
- Availability / stock status
- Delivery information
- Add-to-cart functionality
- Product add-ons / upsells

**QuickInfoBadges** (from Shopify product metafields):
- Age range (`custom.minimum_age` / `custom.maximum_age`)
- Battery requirements (`custom.batteries_required` / `custom.batteries_included` / `custom.batteries_list`)
- Number of projects (`custom.projects`)
- Guide information (`custom.guide`)
- Soldering requirement (`custom.soldering`)
- Coding platform (`custom.coding_platform`)

Since this information already appears as badges at the top of every product page, **do not duplicate it as standalone data points** elsewhere. However, these details should still be discussed naturally in written content — for example, referencing the number of activities in hero highlights, addressing equipment requirements in FAQs, or mentioning the coding platform in feature descriptions. The badges provide at-a-glance facts; the written content provides narrative context for educators.

---

## The Three Questions

Every education product page must answer three educator questions. If an educator cannot answer all three within 30 seconds of landing on the page, the content is failing.

### 1. "Does this meet curriculum requirements?"

| Element                  | Purpose                          | Where it appears                               |
| ------------------------ | -------------------------------- | ---------------------------------------------- |
| **Grade/age range**      | Immediate filtering              | QuickInfoBadges (auto from Shopify metafields) |
| **Curriculum alignment** | CAPS fit, learning area coverage | Hero highlights, NumberedSteps, body copy       |
| **Learning outcomes**    | Justify educational value        | FeatureGrid, ImageTextBlock, SkillTags          |

**Note on curriculum:** South African schools follow the CAPS curriculum. Where applicable, reference specific learning areas (Technology, Natural Sciences, Mathematics) and grades. Be specific: "Aligned with CAPS Technology curriculum for Grades 7-9" not just "curriculum-aligned."

### 2. "What is the cost per learner and what does the kit include?"

| Element                 | Purpose                        | Where it appears                                    |
| ----------------------- | ------------------------------ | --------------------------------------------------- |
| **Learner capacity**    | How many learners per kit      | Hero highlights, body copy                          |
| **Kit contents**        | Set expectations               | WhatsIncluded component                             |
| **Teacher resources**   | Reduce preparation burden      | Hero highlights, FeatureGrid, body copy             |
| **Durability**          | Justify long-term investment   | FAQ, NumberedSteps, or FeatureGrid                  |
| **Additional needs**    | Remove purchase barriers       | FAQ or hero highlights (batteries, tools, software) |

**Note on value:** Educators think in terms of cost-per-learner and reusability. Frame value as "Serves groups of 4-6 learners, reusable across multiple terms" rather than listing component counts alone.

### 3. "What support and training is available?"

| Element                     | Purpose                     | Where it appears                      |
| --------------------------- | --------------------------- | ------------------------------------- |
| **Teacher guide**           | Enable confident delivery   | Hero highlights, FeatureGrid          |
| **Lesson plans**            | Save preparation time       | FeatureGrid, ImageTextBlock           |
| **Assessment tools**        | Support grading/reporting   | FeatureGrid, body copy                |
| **Technical support**       | Reduce risk of purchase     | FAQ section                           |
| **Professional development**| Build educator confidence   | ImageTextBlock, body copy             |

---

## Skill Tags

Skill tags make learning outcomes tangible and scannable. They answer "what will my learners develop?" at a glance — like a nutritional label for education.

### STEM Skills (the technical stuff)

| Tag                    | Use for                                            |
| ---------------------- | -------------------------------------------------- |
| Circuits               | Understanding electricity, components, connections |
| Coding                 | Programming, algorithms, sequences                 |
| Robotics               | Building and programming robots                    |
| Mechanical Engineering | Gears, motors, movement, structures                |
| Electronics            | Sensors, microcontrollers, hardware                |
| Science                | Experiments, scientific method, physics, chemistry |
| Mathematics            | Numbers, patterns, measurement, geometry           |

### Life Skills (the transferable stuff)

| Tag                    | Use for                                       |
| ---------------------- | --------------------------------------------- |
| Problem Solving        | Troubleshooting, debugging, finding solutions |
| Logical Thinking       | Sequencing, cause and effect, reasoning       |
| Creativity             | Design, open-ended building, imagination      |
| Following Instructions | Technical reading, step-by-step processes     |
| Collaboration          | Group work, peer learning, team problem-solving |
| Fine Motor Skills      | Precision work, hand-eye coordination         |
| Patience & Focus       | Projects requiring sustained attention        |

**Usage guidelines:**
- Assign 2-4 skill tags per product (more dilutes meaning)
- Combine STEM skills with life skills where genuine
- Use plain language — "Circuits" not "Electronic Engineering Fundamentals"
- Be honest — don't tag skills the product barely touches
- In supporting copy, connect skill tags to curriculum standards where possible: "Coding" becomes "Coding (CAPS Technology curriculum, Grades 7-9)" in body text, though the tag itself remains "Coding"

---

## Writing for Conversion

### Section titles

Section titles should be **specific and concrete**. If a title could apply to any classroom kit, rewrite it. Describe what the product *is* or what educators *get* — not abstract promises.

Short and functional is fine: "Key Features", "How It Works", "What's Included". Personality is welcome where it adds real meaning, not just flair.

| Do                                              | Don't                                    |
| ----------------------------------------------- | ---------------------------------------- |
| "Serves 30 Learners Per Kit"                    | "Built for the Classroom"                |
| "CAPS-Aligned Robotics Activities"              | "Curriculum Ready"                       |
| "Complete Teacher Guide with Lesson Plans"       | "Everything an Educator Needs"           |
| "Reusable Across Multiple Terms"                | "Built to Last"                          |
| "15 Activities from Beginner to Advanced"        | "A Complete Learning Journey"            |
| "What's in the Kit"                              | "Included Components"                    |
| "Classroom Activities"                           | "Exciting Learning Experiences"          |
| "Technical Details"                              | "Product Specifications"                 |

**The test:** read the title out of context. Does it tell you something concrete about this specific product? Keep it. Does it sound like a tagline that could go on any classroom kit? Rewrite it.

### Objection handling in FAQs

FAQs are conversion tools, not afterthoughts. Every FAQ should anticipate and resolve a reason an educator might *not* buy.

**High-priority FAQ topics** (address on every education product page):
- "Does this align with CAPS curriculum?" → Specify learning areas and grades
- "How many learners can use this simultaneously?" → Be specific about group sizes and rotation strategies
- "Do I need STEM expertise to teach with this?" → Always reassure, mention teacher guide
- "How durable is this for repeated classroom use?" → Address wear, replacement parts, storage
- "What preparation is needed before lessons?" → Minimal prep is a selling point
- "Is bulk/school pricing available?" → Direct to contact page or education section
- "What assessment tools are included?" → Rubrics, observation checklists, worksheets

**FAQ answer formula:** Reassure → Answer → Expand
> "Absolutely. The kit comes with a complete teacher guide including lesson plans, learning objectives, and assessment rubrics aligned to CAPS Technology and Natural Sciences. No STEM background is required to deliver effective lessons."

### Hero tagline and highlights

The hero is the most important 5 seconds. The tagline and highlights must:
- **Tagline:** One sentence that captures the product's classroom value proposition. Benefit-first. "Bring hands-on electronics to your classroom" not "Arduino-based classroom electronics kit."
- **Highlights:** 3-4 bullet points addressing the most common educator concerns. Lead with: learner capacity, curriculum alignment, teacher guide included, durability/reusability.

### CTA copy

- Primary CTA always links to `#product-actions` (scroll to cart)
- Secondary CTA links to `/education/classroom-kits` for browsing more classroom kits
- CTA title should be direct: "Equip Your Classroom" or "Get Started with [Product]" — not "Purchase Product" but also not overwrought
- CTA subtitle should reinforce institutional trust or breadth: "Trusted by schools across South Africa"

---

## Section-Level Content Guidance

This maps content types to page sections. For component props and usage, see the [components doc](./product-page-components.md).

### HeroSection content

- **Tagline:** One sentence, benefit-led, answers "what does this bring to my classroom?"
- **Highlights:** 3-4 strings, each addressing a different educator concern (learner capacity, curriculum alignment, teacher guide included, reusability)

### NumberedSteps content

Best for "Why choose this for your classroom?" positioning. 3 steps is ideal.
- Each step should be a *benefit to the school/educator*, not a product feature
- Title: 2-4 words, punchy. Description: 1-2 sentences expanding the point
- Good: "Curriculum Aligned" / "Teacher-Friendly" / "Built for Groups"
- Bad: "Step 1: Unbox Kit" / "Step 2: Follow Guide" / "Step 3: Complete Activity"

### FeatureGrid content

Best for feature breakdowns with icons. 3-6 features.
- Each feature: short title + one sentence description
- Use icons that visually represent the feature (see components doc for icon list)
- Focus on what matters to educators: lesson plans, group capacity, durability, assessment tools, low prep time, curriculum standards

### ImageTextBlock content

The storytelling component. Use for narrative content about classroom use.
- **Title:** Specific and concrete — describe what this section is about ("Built for Group Learning", "Complete Teacher Guide", "Reusable Term After Term")
- **Body:** 2-3 sentences. Paint a classroom picture. Address an educator concern or aspiration
- Match the image to the message — prefer lifestyle photos showing classroom/group settings from `assets/product/[slug]/lifestyle/`

### LearningOutcomes content

4-6 specific learning outcomes.
- Start each with a skill area, then specifics: "Basic electronics — circuits, voltage, resistance"
- Mix technical skills with transferable skills
- Connect outcomes to CAPS curriculum areas where applicable
- Use language educators understand — curriculum terminology is appropriate here (unlike parent pages)

### ProjectShowcase content

Show off the activities and projects included. Educators want to see the breadth and curriculum coverage of what their learners will do.

- **Title:** Action-oriented ("Classroom Activities", "Activities Your Learners Will Complete")
- **Highlight:** Free-form emphasised text communicating what's included — counts, format, and curriculum context (e.g. "15 CAPS-aligned activities with complete lesson plans and assessment rubrics")
- **Subtitle:** Supporting context about progression or curriculum coverage (e.g. "Activities progress from foundational concepts to advanced challenges, suitable for mixed-ability classrooms.")
- **Projects array:** 6 items is the sweet spot — enough to show variety, not so many it overwhelms
- **moreText:** Reinforce the full count and what else is included
- **Images:** Source from `assets/product/[slug]/projects/` — one thumbnail per card

The total activity count should also be highlighted in:
- **Hero highlights** (e.g. "15 CAPS-aligned activities with lesson plans")
- **FeatureGrid** (e.g. a feature card about the number of activities)
- **NumberedSteps** (if activity variety is a key differentiator)

### WhatsIncluded content

Complete kit contents list. Be specific.
- Include quantities where relevant ("30x learner worksheets", "5x sensor modules for group rotation")
- Include education-specific items: teacher guide, lesson plans, assessment rubrics, storage solution (if applicable)
- Group similar items if the list is long
- If something is NOT included but required, address in FAQ

### ProductFAQ content

5-7 questions. See "Objection handling in FAQs" above.
- Order from most common educator concern to least
- Keep answers concise — 2-3 sentences max
- Always include curriculum alignment, group capacity, and teacher support

### ProductReviews content

Reviews are pulled automatically from Fera — no manual content needed.
- Add `<ProductReviews productId={product.id} />` to the page
- The component handles fetching, display, and pagination
- Hidden automatically when no reviews exist

### CallToAction content

- **Title:** Direct and simple ("Equip Your Classroom" or "Get Started with [Product]")
- **Subtitle:** Reinforce institutional trust or value
- **Primary:** "Add to Cart" → `#product-actions`
- **Secondary:** "Browse Classroom Kits" → `/education/classroom-kits`

---

## Imagery

Product-specific images are stored in `assets/product/[slug]/` with subfolders:

| Folder        | Content                      | Best for                                           |
| ------------- | ---------------------------- | -------------------------------------------------- |
| `lifestyle/`  | Professional photography     | ImageTextBlock, hero backgrounds (large, featured)  |
| `end-user/`   | Customer photos of creations | CustomerShowcase (grouped, small format)            |
| `animations/` | Short GIFs of product in use | Inline demos, feature highlights (small, sparingly) |
| `logo/`       | Official brand logos         | Brand attribution                                   |
| `projects/`   | Project/activity thumbnails  | ProjectShowcase (small, per-card thumbnails)        |

**Guidelines:**
- Select 3-5 most relevant images per page — don't use everything
- Match filenames to content (e.g. `learners-working-in-groups.jpg` for a collaboration section)
- Copy images to `storefront/public/images/products/[slug]/` before use on the website
- Prefer images showing group/classroom settings over individual use
- Feature diverse learners — STEM is for everyone
- Show real engagement and collaboration, not posed setups
- If no classroom images exist, use images showing the product's scale, contents spread out, or multiple users

---

## SEO and Metadata

Every product page includes a `generateMetadata` function. Write descriptions that:
- Include the product name and key selling points for schools
- Mention grade/age range, learner capacity, and curriculum alignment
- Stay under 160 characters
- Include "CREATESPACE" in the title

**Example:**
```
title: "Arduino Starter Kit — Classroom Kit | CREATESPACE"
description: "Bring hands-on electronics to your classroom. 15 guided activities, complete teacher guide, serves groups of 2-4 learners. CAPS-aligned for Grades 7-9."
```

---

## Writing Guidelines

### Do
- Lead with classroom benefits, follow with product features
- Write specifically to educators — use "your learners", "your classroom" not "your child"
- Be specific: "Grades 7-9" not "Ages 12-15" (use grade ranges as the primary reference)
- Show classroom outcomes: "Learners build a working circuit in one 45-minute period"
- Address implementation concerns directly: "No prior STEM experience needed"
- Use South African English spelling (colour, favourite, programme)
- Use South African education terminology ("learners" not "students")
- Reference CAPS curriculum where applicable

### Don't
- Use unexplained jargon without linking to curriculum context
- Write walls of text — educators scan even faster than parents
- Assume all educators have STEM backgrounds
- Hide implementation requirements — prep time, consumables, equipment go upfront
- Oversell — honest descriptions build institutional trust
- Use consumer/parent language ("your child", "gift", "fun at home")

### Tone

For full brand voice, tone, and messaging guidance, see [brand-strategy.md](./brand-strategy.md).

**Quick reference:**
- Professional, enthusiastic, trustworthy, knowledgeable — never corporate, dry, or gimmicky
- "Bring electronics to life in your classroom with 15 guided activities" not "This kit utilises servo motor technology"
- "Designed for group work — learners collaborate in pairs or small teams" not "Suitable for children aged 8-12"
- Still fun and energetic, but dialled toward professional-enthusiastic rather than playful-parental

**Final pass:** Run drafted copy through the humanizer to strip AI tells (em dashes, rule-of-three, promotional filler) before publishing. See [voice-and-tone.md](./voice-and-tone.md#sounding-human-not-ai-generated).

---

## Examples

### Good: Clear and Educator-Focused
>
> Equip your classroom with hands-on robotics. This kit supports groups of 4-6 learners through 12 guided activities aligned to CAPS Technology curriculum — complete teacher guide and lesson plans included.
>
> **Skills:** `Robotics` · `Coding` · `Collaboration` · `Problem Solving`
>

### Poor: Parent-Focused or Vague
> This amazing STEM robotics kit will keep your child entertained for hours while they learn the fundamentals of mechatronics through our fun, engaging activities...
