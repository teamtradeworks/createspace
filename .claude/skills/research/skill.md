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

1. **Fetches Shopify product data** - Gets product metadata (title, SKU, price, availability, variants)
2. **Researches static content** - Gathers descriptive text, specs, features, and learning outcomes from manufacturer and retailer sites
3. **Compiles research** - Organizes all textual findings into a structured markdown file

**Note:** Shopify API provides dynamic data (images, pricing, availability, variants). This skill focuses only on gathering **static textual content** for the product page.

## What This Skill Does NOT Do

- Does NOT write final product page copy
- Does NOT apply brand voice or tone
- Does NOT create React components or TSX files
- Does NOT optimize content for parents/customers
- Does NOT research or gather images from external sources (images come from Shopify API or separate process)

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

### Essential Information to Research

These are the **static content** items that need to be gathered from external sources:

1. **Product Basics**
   - Official product name and model number
   - Manufacturer/brand
   - Product category (kit, robot, electronics, etc.)

2. **Age/Skill Information**
   - Recommended age range (e.g., 8-12 years)
   - Skill level (Beginner, Intermediate, Advanced)
   - Adult supervision requirement

3. **What's Included**
   - Complete component list
   - Materials and parts
   - Documentation included

4. **What's Required**
   - Batteries needed
   - Software/apps required
   - OS compatibility (Windows, Mac, iOS, Android)
   - Additional tools needed

5. **Learning Outcomes**
   - Technical skills taught (circuits, coding, robotics, etc.)
   - Life skills developed (problem-solving, creativity, etc.)
   - Specific concepts covered

6. **Features & Specifications**
   - Technical specifications
   - Key features and capabilities
   - Unique selling points
   - Build/project time estimates

7. **Quality & Safety**
   - Safety certifications
   - Materials used
   - Quality indicators
   - Durability information

8. **Longevity & Expansion**
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

Extract:
- Title and description
- Price and currency
- Variants (with prices, availability)
- Product tags
- Images and URLs
- Product type

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

## Output Format

Save all research to: `assets/product/{slug}/content.md`

Use this markdown structure:

```markdown
# Product Research: [Product Name]

**Product Handle:** {slug}
**SKU:** {sku-from-shopify}
**Research Date:** {YYYY-MM-DD}

---

## Shopify Data (Dynamic - Not for Research)

These details come from Shopify API and are already available on the site:
- **Title:** [from Shopify]
- **Price:** R[price]
- **Available:** Yes/No
- **Variants:** [list if multiple]
- **Images:** Available via Shopify API

### Current Shopify Description
[paste existing Shopify description if any]

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

### Age/Skill Information
- **Recommended Age:** [range]
- **Skill Level:** [Beginner/Intermediate/Advanced]
- **Adult Help Required:** [Yes/No/Optional]

### Requirements
- **Batteries:** [type and quantity]
- **Software:** [apps or programs needed]
- **OS Compatibility:** [Windows/Mac/iOS/Android/Web]
- **Tools:** [screwdrivers, etc.]

## Learning Outcomes

### STEM Skills
- [specific technical skills taught]

### Life Skills
- [problem-solving, creativity, etc.]

### Concepts Covered
- [specific educational concepts]

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

1. [Manufacturer URL]
2. [Retailer URL]
3. [Additional URLs]
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
   - Extract complete product metadata (title, description, price, variants, tags, images)
   - Note any existing product description from Shopify
   - This data is for reference only - it's already available dynamically on the site

4. **Search manufacturer site**
   - Use WebSearch to find official product page
   - Use WebFetch to extract detailed content
   - Focus on specs, features, what's included

5. **Search retailers**
   - Search Amazon, educational retailers
   - Look for additional specs and customer insights
   - Note age recommendations and requirements

6. **Compile research**
   - Organize all findings into structured markdown
   - Note any information gaps
   - Save to `assets/product/{slug}/content.md`

7. **Confirm completion**
   - Report what was found
   - Highlight any missing information
   - Provide path to saved research file

## Important Notes

- **Focus on static content** - research textual descriptions, specs, learning outcomes, and features
- **Shopify provides dynamic data** - don't research what Shopify already provides (images, pricing, availability, variants)
- **Be thorough** - gather MORE information than needed; better to have too much than too little
- **Cite sources** - include URLs for all information sources
- **Don't editorialize** - this is raw research, not final copy
- **Note gaps** - if critical information is missing, document it
- **Multiple searches** - try different search terms if initial results are poor
- **Official sources first** - prioritize manufacturer data over retailer data

## Success Criteria

Research is complete when:
- ✅ Product found in Shopify using MCP search tools
- ✅ Full product details fetched via MCP (description, variants, pricing, tags, images)
- ✅ Manufacturer's official page is found and content extracted
- ✅ At least one retailer source is checked
- ✅ All essential information categories are addressed
- ✅ Content is saved to `assets/product/{slug}/content.md`
- ✅ Any information gaps are documented

## Example Output

User: `/research arduino-starter-kit`