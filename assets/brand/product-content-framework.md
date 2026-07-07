# Product Content Framework

A guide for creating product page content that converts browsers into buyers.

For page layout and composition, see [product-page-design.md](./product-page-design.md).
For component specifications, see [product-page-components.md](./product-page-components.md).

---

## Philosophy

Parents shopping for STEM products often feel overwhelmed. The terminology is unfamiliar, the options are endless, and the fear of choosing "wrong" is real. Our job is to **empower confident decisions** — not impress with technical jargon.

**Key principle:** Parents move fast. Every piece of information must earn its place. Be comprehensive in coverage but ruthless in brevity.

---

## Audience

The primary audience for product pages is parents. We serve three distinct parent personas, each with different needs. Good product page content speaks to all three simultaneously.

### Parents with STEM-curious children

Children already show interest in science, building, coding, or how things work.

- **Pain points:** Finding products that match their child's growing abilities; avoiding "outgrown" gifts
- **What they need:** Clear age ranges, skill progression, product recommendations
- **How to write for them:** Emphasise what the child will *do* with the product. Show progression. Use language like "next challenge" and "level up."

### Parents who value STEM education

They appreciate the sciences and want their child to develop STEM skills for future success.

- **Pain points:** Unsure which products genuinely educate vs. just entertain; worried about screen time
- **What they need:** Clear learning outcomes, trusted recommendations, evidence of educational value
- **How to write for them:** Lead with learning outcomes and real-world skill development. Use terms like "foundational skills" and "hands-on learning." Show the educational substance behind the fun.

### Parents unfamiliar with STEM

Not familiar with STEM but open to learning about its value for their child.

- **Pain points:** Intimidated by technical jargon; unsure if their child will enjoy it; worried they can't help
- **What they need:** Reassurance, simple explanations, beginner-friendly entry points
- **How to write for them:** Avoid jargon entirely. Reassure: "No experience needed." Emphasise that instructions are clear and children can work independently. This persona is the reason every FAQ should address "Do I need to help?"

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

Since this information already appears as badges at the top of every product page, **do not duplicate it as standalone data points** elsewhere. However, these details should still be discussed naturally in written content — for example, referencing the number of projects in hero highlights, addressing battery requirements in FAQs, or mentioning the coding platform in feature descriptions. The badges provide at-a-glance facts; the written content provides narrative context and reassurance.

---

## The Three Questions

Every product page must answer three parent questions. If a parent can't answer all three within 30 seconds of landing on the page, the content isn't working.

### 1. "Is this right for my child?"

| Element         | Purpose                      | Where it appears                               |
| --------------- | ---------------------------- | ---------------------------------------------- |
| **Age range**   | Immediate filtering          | QuickInfoBadges (auto from Shopify metafields) |
| **Skill level** | Match to child's confidence  | FAQ section or body copy                       |
| **Independence**| Address supervision concerns | FAQ section (e.g. "Does my child need help?")  |

**Note on independence:** Many parents are intimidated by the assumption they'll need to assist. Where possible, reassure: "Clear step-by-step instructions — most children complete independently." Address this in the FAQ.

### 2. "What do they get?"

| Element               | Purpose                   | Where it appears                                    |
| --------------------- | ------------------------- | --------------------------------------------------- |
| **End result**        | Show the finished product | Hero image + tagline                                |
| **Learning outcomes** | Justify educational value | Woven into page content (ImageTextBlocks, NumberedSteps, FeatureGrid) + SkillTags |
| **What's included**   | Set expectations          | WhatsIncluded component                             |
| **What's required**   | Remove purchase barriers  | FAQ or hero highlights (batteries, tools, software) |
| **Longevity**         | Justify investment        | Body copy, NumberedSteps, or FeatureGrid            |

**Note on learning outcomes:** Use accessible language. Not "introduces computational thinking" but "teaches problem-solving and logical sequencing."

### 3. "Can I trust this?"

| Element             | Purpose                 | Where it appears                      |
| ------------------- | ----------------------- | ------------------------------------- |
| **Quality signals** | Build confidence        | Brand mentions, FeatureGrid, body copy|
| **Safety**          | Address parent concerns | FAQ section, hero highlights          |
| **Social proof**    | Reduce risk perception  | ProductReviews, CustomerShowcase      |
| **Gift-worthiness** | Support gift buyers     | Hero highlights, ImageTextBlock copy  |

---

## Skill Tags

Skill tags make learning outcomes tangible and scannable. They answer "what will my child learn?" at a glance — like a nutritional label for education.

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
| Fine Motor Skills      | Precision work, hand-eye coordination         |
| Patience & Focus       | Projects requiring sustained attention        |

**Usage guidelines:**
- Assign 2-4 skill tags per product (more dilutes meaning)
- Combine STEM skills with life skills where genuine
- Use plain language — "Circuits" not "Electronic Engineering Fundamentals"
- Be honest — don't tag skills the product barely touches

---

## Writing for Conversion

### Section titles

Section titles should be **specific and concrete**. If a title could apply to any STEM kit, rewrite it. Describe what the product *is* or what the child *does* — not how it *feels*.

Short and functional is fine: "Key Features", "How It Works", "What's Included". Personality is welcome where it adds real meaning, not just flair.

| Do                                       | Don't                                    |
| ---------------------------------------- | ---------------------------------------- |
| "A Pocket-Sized Programmable Computer"   | "Packed with Possibilities"              |
| "Build Beyond the Box with LEGO"         | "From Imagination to Reality"            |
| "93+ Projects from Beginner to Expert"   | "Everything a Young Learner Needs"       |
| "What Families Are Building"             | "Real Families, Real Learning"           |
| "Your First Electronics Lab"             | "A Complete Electronics Lab in a Box"    |
| "Get Started"                            | "Ready to Start Their Coding Journey?"   |
| "Technical Details"                       | "Product Specifications"                 |
| "What's in the Box"                       | "Included Components"                    |

**The test:** read the title out of context. Does it tell you something concrete about this specific product? Keep it. Does it sound like a tagline that could go on any product? Rewrite it.

### Objection handling in FAQs

FAQs are conversion tools, not afterthoughts. Every FAQ should anticipate and resolve a reason a parent might *not* buy.

**High-priority FAQ topics** (address on every product page):
- "Do I/my child need prior experience?" → Always reassure
- "What age is this suitable for?" → Be specific, mention independence
- "Do I need anything else?" → Batteries, computer, software, tools
- "Is this safe?" → Address for younger age ranges
- "What happens after they finish?" → Replayability, expansion, community

**FAQ answer formula:** Reassure → Answer → Expand
> "Not at all! The kit is designed for complete beginners. The project book starts from the basics and builds your knowledge with each project."

### Hero tagline and highlights

The hero is the most important 5 seconds. The tagline and highlights must:
- **Tagline:** One sentence that captures the product's promise. Benefit-first. "Your gateway to electronics and coding" not "Arduino-based electronics learning kit."
- **Highlights:** 3-4 bullet points answering the most common objections. Lead with the strongest: number of projects, no experience needed, guide included.

### CTA copy

- Primary CTA always links to `#product-actions` (scroll to cart)
- Secondary CTA links to `/shop` for continued browsing
- CTA title should be direct: "Get Started" or "Get Started with [Product]" — not "Purchase Product" but also not overwrought ("Ready to Start Their Coding Journey?")
- CTA subtitle should reinforce social proof or breadth: "Join millions of makers worldwide"

---

## Section-Level Content Guidance

This maps content types to page sections. For component props and usage, see the [components doc](./product-page-components.md).

### HeroSection content

- **Tagline:** One sentence, benefit-led, answers "what is this?"
- **Highlights:** 3-4 strings, each addressing a different concern (projects included, experience needed, guide included, learning outcomes)

### NumberedSteps content

Best for "Why choose this?" positioning. 3 steps is ideal.
- Each step should be a *benefit*, not a feature
- Title: 2-4 words, punchy. Description: 1-2 sentences expanding the point
- Good: "Build Real Things" / "Industry Standard" / "Massive Community"
- Bad: "Step 1: Open Box" / "Step 2: Follow Instructions" / "Step 3: Complete Project"

### FeatureGrid content

Best for feature breakdowns with icons. 3-6 features.
- Each feature: short title + one sentence description
- Use icons that visually represent the feature (see components doc for icon list)
- Focus on what's *included and why it matters*, not raw specs

### ImageTextBlock content

The storytelling component. Use for emotional, narrative content.
- **Title:** Specific and concrete — describe what this section is about ("Built for Group Learning", "LEGO Compatible")
- **Body:** 2-3 sentences. Paint a picture. Address a parent concern or aspiration
- Match the image to the message — use lifestyle photos from `assets/product/[slug]/lifestyle/`

### LearningOutcomes content

4-6 specific learning outcomes.
- Start each with a skill area, then specifics: "Basic electronics — circuits, voltage, resistance"
- Mix technical skills with transferable skills
- Use language parents understand, not curriculum jargon

### ProjectShowcase content

Show off the projects, challenges, and activities included with the product. This is a key selling point — parents want to see the breadth and variety of what their child will do.

- **Title:** Action-oriented ("Projects You'll Build", "Projects, Challenges & Activities")
- **Highlight:** Free-form emphasised text communicating what's included — counts, format, and context (e.g. "15 real-world projects in a 170-page printed guidebook", "39 hands-on projects with step-by-step online tutorials")
- **Subtitle:** Supporting context about progression or selection (e.g. "Each project builds on the last, gradually introducing new concepts.")
- **Projects array:** 6 items is the sweet spot — enough to show variety, not so many it overwhelms
- **moreText:** Reinforce the full count and what else is included ("Plus 33 more projects including games, alarms, and displays")
- **Images:** Source from `assets/product/[slug]/projects/` — one thumbnail per card

The total project/challenge/activity count should also be highlighted in:
- **Hero highlights** (e.g. "39 hands-on projects with online tutorials")
- **FeatureGrid** (e.g. a feature card about the number of projects)
- **NumberedSteps** (if project variety is a key differentiator)

### WhatsIncluded content

Complete box contents list. Be specific.
- Include quantities where relevant ("70+ jumper wires", "2x AA batteries")
- Group similar items if the list is long
- If something is NOT included but required, address in FAQ

### ProductFAQ content

5-7 questions. See "Objection handling in FAQs" above.
- Order from most common concern to least
- Keep answers concise — 2-3 sentences max
- Always include age suitability, experience needed, and requirements

### ProductReviews content

Reviews are pulled automatically from Fera — no manual content needed.
- Add `<ProductReviews productId={product.id} />` to the page
- The component handles fetching, display, and pagination
- Hidden automatically when no reviews exist

### CallToAction content

- **Title:** Direct and simple ("Get Started" or "Get Started with [Product]")
- **Subtitle:** Reinforce value or social proof
- **Primary:** "Add to Cart" → `#product-actions`
- **Secondary:** "Browse More Kits" → `/shop`

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
- Match filenames to content (e.g. `kids_working_on_project.jpg` for a collaboration section)
- Copy images to `storefront/public/images/products/[slug]/` before use on the website
- Feature both boys and girls — STEM is for everyone
- Show real engagement, not posed smiles at camera
- Capture the "aha moment" where possible

---

## SEO and Metadata

Every product page includes a `generateMetadata` function. Write descriptions that:
- Include the product name and key selling points
- Mention age range and number of projects/components
- Stay under 160 characters
- Include "CREATESPACE" in the title

**Example:**
```
title: "Arduino Starter Kit | CREATESPACE"
description: "Learn electronics and coding with the official Arduino Starter Kit. 15 hands-on projects, 170-page guide, and 100+ components. Perfect for beginners aged 10+."
```

---

## Writing Guidelines

### Do
- Lead with benefits, follow with features
- Write specifically to parents — use "your child" not "the user"
- Be specific: "Ages 8-12" not "Kids"
- Show outcomes: "Build a walking robot" not "Robotics kit"
- Address concerns directly: "No soldering required"
- Use South African English spelling (colour, favourite, programme)

### Don't
- Use unexplained jargon (programming, C++, Arduino without context)
- Write walls of text — use bullets and white space
- Assume knowledge — explain what makes this special
- Hide requirements — batteries, apps, tools go upfront
- Oversell — honest descriptions build trust

### Tone

For full brand voice, tone, and messaging guidance, see [brand-strategy.md](./brand-strategy.md).

**Quick reference:**
- Fun, playful, enthusiastic, trustworthy — never elitist, complicated, or gimmicky
- "Build a robot that actually moves" not "This kit utilises servo motor technology"
- "Perfect for curious kids aged 8-12" not "Suitable for children aged 8-12"

**Final pass:** Run drafted copy through the humanizer to strip AI tells (em dashes, rule-of-three, promotional filler) before publishing. See [voice-and-tone.md](./voice-and-tone.md#sounding-human-not-ai-generated).

---

## Examples

### Good: Clear and Confident
>
> Build a robot that actually walks. This kit teaches basic engineering and circuit concepts through hands-on assembly — no prior experience needed.
>
> **Skills:** `Mechanical Engineering` · `Circuits` · `Following Instructions`
>

### Poor: Overwhelming and Vague
> This advanced STEM robotics kit leverages servo motor technology and introduces young makers to the fundamentals of mechatronics and kinematic principles through our proprietary curriculum-aligned learning pathway...
