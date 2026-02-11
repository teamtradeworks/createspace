---
name: research
description: Research and gather product content from online sources. Use when the user asks to research a product or runs `/research {slug}`. Compiles comprehensive product information into assets/product/{slug}/content.md.
allowed-tools: Read, Write, Bash, WebFetch, WebSearch, Grep, Glob, mcp__createspace-shopify__search_shop_catalog, mcp__createspace-shopify__get_product_details
---

# Product Research Skill

## Purpose

Research and gather comprehensive product content from multiple online sources to prepare for writing product pages. This skill focuses on **content gathering only** - not writing final product pages (that's handled by the `/product-page` command).

## When to Use

Invoke when:
- User runs `/research {slug}` command
- User asks to "research" or "gather content" for a product
- Starting work on a new product page and need background information

## What This Skill Does

1. **Validates the product in Shopify** - Confirms the product exists and gets the handle/SKU
2. **Researches static content** - Gathers descriptive text, specs, features, and learning outcomes from manufacturer and retailer sites
3. **Compiles research** - Organizes all textual findings into a structured markdown file

**Note:** The following data is pulled **automatically from Shopify** at render time and should NOT be researched or included in content:
- **Pricing** (prices, discounts, sale prices) — handled by HeroSection
- **Images** — served from Shopify CDN via the product gallery
- **Availability / stock status** — shown in HeroSection
- **Delivery information** — shown in HeroSection

**Note:** Age range, batteries, projects, guide, soldering, and coding platform are displayed as QuickInfoBadges from Shopify metafields, but these details **should still be researched** because they are referenced throughout the written product page content (FAQs, hero highlights, feature descriptions, etc.).

## What This Skill Does NOT Do

- Does NOT write final product page copy
- Does NOT apply brand voice or tone
- Does NOT create React components or TSX files
- Does NOT optimize content for parents/customers
- Does NOT research or gather images from external sources (images come from Shopify API or separate process)
- Does NOT gather pricing information (prices, discounts, sale prices — all handled by Shopify)

This skill gathers **raw research content**. The `/product-page` command will later transform this into customer-facing copy.

## Arguments

Takes a single argument: the product slug/handle from Shopify.

Example usage:
```
/research arduino-starter-kit
/research microbit-go-bundle
```

## Content Requirements

The research must gather enough information to satisfy the Product Content Framework (`assets/brand/product-content-framework.md`):

The slug must be provided as an argument and it MUST be pulled from the shopify MCP and be a valid match.

### Essential Information to Research

These are the **static content** items that need to be gathered from external sources:

1. **Product Basics**
   - Official product name and model number
   - Manufacturer/brand
   - Product category (kit, robot, electronics, etc.)

2. **What's Included**
   - Complete component list
   - Materials and parts
   - Documentation included

3. **What's Required**
   - Software/apps required
   - OS compatibility (Windows, Mac, iOS, Android)
   - Additional tools needed

4. **Product Attributes**
   - Age range / recommended ages
   - Battery requirements (type, quantity, included or not)
   - Guide/manual details (page count, format, language)
   - Whether soldering is required
   - Coding platform / programming language used

> **Note:** These attributes are also displayed as QuickInfoBadges from Shopify metafields, but they must still be researched because they are referenced throughout the written product page content (FAQs, hero highlights, features, learning outcomes, etc.).

5. **Projects, Challenges & Activities** (HIGH PRIORITY — research exhaustively)

   This is critical for the ProjectShowcase section and a key selling point on every product page. The number of projects/challenges/activities is one of the most compelling reasons parents buy STEM kits.

   - **Complete inventory** — list every single project, challenge, and activity included with the product. Not just a sample — the full list.
   - **Categorise each item** as a project (guided build with a defined outcome), challenge (open-ended problem to solve), or activity (shorter exercise or experiment).
   - **Total counts** — provide exact counts for each type (e.g. "15 projects, 8 challenges, 5 activities") and a combined total.
   - **Brief description** of each item — one sentence covering what the child builds/does.
   - **Concepts/skills taught** — what each item teaches (e.g. "loops, sensors, conditionals").
   - **Difficulty progression** — note if items are ordered by difficulty or grouped by theme.

   **Where to find this information:**
   - Manufacturer product pages and documentation
   - Official project guides, wikis, or tutorial sites
   - Retailer listings (often list project names)
   - Curriculum guides or teacher resources
   - YouTube unboxing/review videos that show the project list

   **Why this matters:** The project count and variety are among the strongest selling points. "39 hands-on projects" in a hero highlight is far more compelling than "learn to code." The complete list also feeds directly into the ProjectShowcase component on product pages.

6. **Learning Outcomes & Benefits** (HIGH PRIORITY - research thoroughly)
   - Technical/STEM skills taught (circuits, coding, robotics, etc.)
   - Life skills developed (problem-solving, creativity, resilience, etc.)
   - Specific concepts covered
   - Project-to-skill mapping (what each project/activity teaches)
   - Research-backed educational benefits (look for studies, statistics)
   - Future career connections (how skills apply to jobs/industries)
   - What parents/educators will observe in children
   - Developmental benefits (confidence, growth mindset, emotional regulation)

7. **Features & Specifications**
   - Technical specifications
   - Key features and capabilities
   - Unique selling points
   - Build/project time estimates

8. **Quality & Safety**
   - Safety certifications
   - Materials used
   - Quality indicators
   - Durability information

9. **Longevity & Expansion**
   - Replayability information
   - Expansion packs or add-ons available
   - Community/support resources

## Research Sources

### 1. Shopify Storefront (Primary Source)
Use the MCP tools to fetch product data:

```
# Search for the product by slug/handle
mcp__createspace-shopify__search_shop_catalog(query: slug)

# Get full product details including variants
mcp__createspace-shopify__get_product_details(product_id: "gid://shopify/Product/...")
```

Extract from product data:
- Title and description
- Product tags
- Product type
- SKU
- Metafield values (age range, batteries, projects, guide, soldering, coding platform)

> **Do not extract or record:** Prices, discounts, variants with prices, availability, or images. These are handled automatically by the storefront.

### 2. Manufacturer Website (High Priority)
Search for the official product page. Look for:
- Official product specs
- Learning objectives
- Assembly instructions
- Compatibility information
- Safety certifications
- Educational content
- Video demonstrations

Example searches:
- "Arduino Starter Kit site:arduino.cc"
- "micro:bit Go Bundle site:microbit.org"
- "[Product Name] [Manufacturer] official"

### 3. Major Retailers (Secondary Source)
Search Amazon, educational retailers, electronics stores:
- Customer reviews (for insights)
- Additional specifications
- "What's in the box" details
- Customer questions and answers
- Age recommendations

Example searches:
- "[Product Name] [SKU] site:amazon.com"
- "[Product Name] specifications"

### 4. Educational Resources
For STEM products, look for:
- Lesson plans
- Educational standards alignment
- Teacher reviews
- Classroom usage examples

### 5. Educational Research & Benefits (HIGH PRIORITY)
Search for research-backed information about the educational value of this type of product:

**Search queries to use:**
- "[Product type] learning benefits children STEM education"
- "[Product type] hands-on learning cognitive development research"
- "[Technology/skill] future careers children coding robotics job market"
- "hands-on learning benefits children confidence growth mindset"

**Look for:**
- Academic studies on learning outcomes (PMC, ResearchGate, ScienceDirect, MDPI)
- Statistics on skill development and test score improvements
- Research on hands-on vs passive learning
- Job market projections for related skills
- Developmental psychology insights (growth mindset, resilience, emotional regulation)
- Parent testimonials and observed changes in children

**Key questions to answer:**
- Why does hands-on learning work better than passive learning?
- What specific cognitive benefits does this type of product provide?
- How do these skills prepare children for future careers?
- What will parents observe in their children after using this product?
- Are there any studies showing measurable learning improvements?

## Output Format

Save all research to: `assets/product/{slug}/content.md`

Use this markdown structure:

```markdown
# Product Research: [Product Name]

**Product Handle:** {slug}
**SKU:** {sku-from-shopify}
**Research Date:** {YYYY-MM-DD}

---

## Shopify Reference

Product confirmed in Shopify. The following are handled automatically by the storefront and are NOT included in this research:
- Pricing, discounts, and variants
- Product images
- Availability and stock status
- Delivery information

### Current Shopify Description
[paste existing Shopify description if any]

### Product Attributes (from Shopify metafields)
- **Age Range:** [e.g., 10+, 8-14]
- **Batteries:** [required/included/type]
- **Projects:** [e.g., 15+]
- **Guide:** [e.g., 170-page book]
- **Soldering:** [required/not required]
- **Coding Platform:** [e.g., Scratch, Arduino IDE]

---

## Researched Content (Static)

The following sections contain researched static content for the product page.

### Manufacturer Information

**Source:** [URL]

### Product Overview
[manufacturer's product description]

### Specifications
[technical specs from manufacturer]

### Features
[key features listed by manufacturer]

### What's Included
[component list from manufacturer]

## Retailer Information

### Amazon/Retailer Data
**Source:** [URL]

[Key details, specifications, customer insights]

### Requirements
- **Batteries:** [type, quantity, included or not]
- **Software:** [apps or programs needed]
- **OS Compatibility:** [Windows/Mac/iOS/Android/Web]
- **Tools:** [screwdrivers, etc.]

## Learning Outcomes (Expanded)

### Why Hands-On Learning Works
[Research-backed evidence on why this type of learning is effective]
[Statistics on learning improvements if available]
[Key insight or quote from research]

### STEM Skills
**[Category 1, e.g., Electronics Fundamentals]:**
- [specific skill]
- [specific skill]

**[Category 2, e.g., Programming Concepts]:**
- [specific skill]
- [specific skill]

**[Category 3, e.g., Engineering Principles]:**
- [specific skill]
- [specific skill]

### Complete Project, Challenge & Activity List

**This section is critical.** List every project, challenge, and activity included — not just a sample. This feeds directly into the ProjectShowcase section and hero highlights on the product page.

**Summary:**
- **Projects:** [X] (guided builds with a defined outcome)
- **Challenges:** [X] (open-ended problems to solve)
- **Activities:** [X] (shorter exercises or experiments)
- **Total:** [X]

| # | Name | Type | Description | Skills/Concepts Taught |
|---|------|------|-------------|----------------------|
| 1 | [Name] | Project/Challenge/Activity | [One-sentence description] | [Key skills] |
| 2 | [Name] | Project/Challenge/Activity | [One-sentence description] | [Key skills] |
| ... | ... | ... | ... | ... |

**Difficulty Progression:** [Note whether items are ordered by difficulty, grouped by theme, or independent]

### Life Skills & Character Development

**Critical Thinking & Problem-Solving:**
- [specific benefit]

**Resilience & Growth Mindset:**
- [specific benefit]

**Emotional Regulation:**
- [how product helps with frustration tolerance, etc.]

**Confidence & Self-Esteem:**
- [specific benefit]

**Creativity & Innovation:**
- [specific benefit]

### Future-Ready Skills & Career Connections
[How these skills prepare children for future opportunities]
[Job market statistics if found]
[Specific career pathways these skills support]

### What Parents Will Observe
[Concrete, observable outcomes parents can expect to see:]
- [Observable change 1]
- [Observable change 2]
- [Observable change 3]

### Curriculum Alignment
- [Educational standards this aligns with]
- [Age/grade level appropriateness]

## Additional Notes

### Quality & Safety
- [certifications, materials, safety info]

### Longevity
- [replayability, expansions, community]

### Build Time
- [estimated time to complete]

### Unique Features
- [what makes this product special]

## Research Gaps

[List any information that couldn't be found but is needed]

## Sources

### Product Information
1. [Manufacturer URL]
2. [Retailer URL]

### Reviews & Recommendations
3. [Review site URL]

### Educational Research
4. [Academic study or research article URL]
5. [Educational benefits research URL]

### Hands-On Learning Benefits
6. [Developmental psychology or learning research URL]

### Future Skills & Careers
7. [Career/job market research URL]
```

## Workflow

1. **Validate slug exists**
   - Search for product using `mcp__createspace-shopify__search_shop_catalog` with the slug as query
   - Verify product exists and get product_id
   - Extract product handle, title, basic info

2. **Create directory structure**
   ```bash
   mkdir -p assets/product/{slug}
   ```

3. **Fetch Shopify data**
   - Use `mcp__createspace-shopify__get_product_details` with the product_id
   - Extract title, description, tags, product type, and metafield values for reference
   - Note any existing product description from Shopify
   - Record product attributes from metafields (age, batteries, projects, guide, soldering, coding platform)
   - Do NOT record pricing, variants, availability, or images — these are handled automatically by the storefront

4. **Search manufacturer site**
   - Use WebSearch to find official product page
   - Use WebFetch to extract detailed content
   - Focus on specs, features, what's included

5. **Search retailers**
   - Search Amazon, educational retailers
   - Look for additional specs and customer insights
   - Note age recommendations and requirements

6. **Research educational benefits** (HIGH PRIORITY)
   - Search for research studies on this type of product/learning
   - Look for statistics on learning outcomes and skill development
   - Find information on future career connections
   - Research hands-on learning benefits (growth mindset, confidence, resilience)
   - Document what parents can expect to observe
   - Map specific projects/activities to skills learned

7. **Compile research**
   - Organize all findings into structured markdown
   - Note any information gaps
   - Save to `assets/product/{slug}/content.md`

8. **Confirm completion**
   - Report what was found
   - Highlight any missing information
   - Provide path to saved research file

## Important Notes

- **Focus on static content** - research textual descriptions, specs, learning outcomes, and features
- **Shopify handles dynamic data** - do NOT research or include pricing, discounts, images, availability, or variants. These are pulled automatically from the Shopify Storefront API
- **Product attributes should be researched** - age range, batteries, projects, guide, soldering, and coding platform ARE displayed as QuickInfoBadges from Shopify metafields, but they must still be researched because they are referenced throughout the written content (FAQs, hero highlights, features, etc.)
- **Be thorough** - gather MORE information than needed; better to have too much than too little
- **Cite sources** - include URLs for all information sources
- **Don't editorialize** - this is raw research, not final copy
- **Note gaps** - if critical information is missing, document it
- **Multiple searches** - try different search terms if initial results are poor
- **Official sources first** - prioritize manufacturer data over retailer data
- **PRIORITIZE LEARNING OUTCOMES** - Parents buy STEM products for the benefits, not just features. Research:
  - Why hands-on learning is effective (find studies/statistics)
  - What specific skills each project/activity develops
  - How these skills connect to future opportunities
  - What observable changes parents will see in their children
  - Developmental benefits (confidence, growth mindset, resilience)

## Success Criteria

Research is complete when:
- ✅ Product found in Shopify using MCP search tools
- ✅ Product confirmed via MCP (title, description, tags extracted for reference)
- ✅ Manufacturer's official page is found and content extracted
- ✅ At least one retailer source is checked
- ✅ All essential information categories are addressed
- ✅ **Complete project/challenge/activity inventory** including:
  - Every project, challenge, and activity listed (not just a sample)
  - Each categorised as project, challenge, or activity
  - Total counts for each type and overall
  - Brief description and skills/concepts for each
- ✅ **Learning outcomes are thoroughly researched** including:
  - Research-backed benefits of this type of learning
  - Project-to-skill mapping (if applicable)
  - Life skills and character development benefits
  - Future career connections
  - What parents will observe
- ✅ Content is saved to `assets/product/{slug}/content.md`
- ✅ Any information gaps are documented

## Example Output

User: `/research arduino-starter-kit`