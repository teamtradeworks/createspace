---
name: campaign
description: Start or update a marketing campaign and write its brief. Use when the user runs `/campaign {name}` or asks to start, plan or set up a campaign, ad set, flyer run or awareness push. Handles every campaign type (products, a partner brand, a sale, a category or age group, CREATESPACE brand awareness, education). Interviews the user, checks every fact and landing link, gathers imagery, drafts Meta copy, and writes marketing/campaigns/{slug}/brief.md ready for Impeccable. Does not design assets.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebFetch, AskUserQuestion, Skill, mcp__createspace-shopify__search_shop_catalog, mcp__createspace-shopify__get_product_details, mcp__Claude_Browser__navigate, mcp__Claude_Browser__get_page_text, mcp__Claude_Browser__find
---

# Campaign Skill

## Purpose

Turn a campaign idea into a checked, complete brief at `marketing/campaigns/<slug>/brief.md`. Impeccable designs the assets from that brief afterwards, so everything it could put on an asset (prices, dates, claims, links, photos, copy) is settled and sourced here first.

A campaign is **not** tied to one product. It may be about several products, a whole partner brand, a sale, an age group or category, CREATESPACE itself, or an education programme. The campaign type decides what this skill gathers.

## What this skill does NOT do

- Does NOT design or build asset HTML. That's Impeccable's job, after the brief is approved.
- Does NOT invent facts. Anything it can't confirm goes under **Open questions** in the brief, not onto an asset.
- Does NOT launch anything in Meta Ads Manager or send anything to a printer.

## Arguments

A campaign name, e.g. `/campaign makerzoid month`, `/campaign 2026-11 brand awareness`, `/campaign holiday sale`. May be empty; then ask for it.

**Slug rule:** `<yyyy-mm>-<kebab-name>`, using the month the campaign starts (default: the current month). Lowercase, hyphens, no product SKUs unless the campaign really is one product. The slug is also the `utm_campaign` value, so keep it short and stable: `2026-10-makerzoid-month`, `2026-11-brand-awareness`, `2026-12-holiday-sale`.

If `marketing/campaigns/<slug>/` already exists, switch to **update mode**: read the existing brief, ask what has changed, update only those sections, and re-run the link check. Never overwrite a brief silently.

## Read first

Before interviewing, read enough to ask good questions and to not ask what the repo already answers:

- `marketing/PRODUCT.md`: audiences, channels, claim rules, UTM conventions
- `marketing/creative/formats.md`: canvas names and sizes
- `marketing/campaigns/_template/brief.md`: the brief's shape. Copy it; don't reinvent it.
- `assets/brand/brand-strategy.md` (parent personas) and, for educators, `assets/brand/edu-product-content-framework.md`
- `assets/brand/voice-and-tone.md` (needed for the copy step)
- `ls marketing/campaigns/`: recent campaigns, to avoid clashing slugs and to reuse what worked (read their `results.md` if present)

## Step 1: Interview

Use AskUserQuestion. At most two rounds, at most four questions per round. Offer sensible options; the user can always type their own.

**Round 1 (always):**

1. **Type:** six types, but a question holds four options, so offer "Products, a brand or an age group", "A sale", "CREATESPACE awareness" and "Education". Settle which of the first three it is in round 2.
2. **Audience:** Parents or Educators. One per campaign. If the user wants both, propose two campaigns with two briefs.
3. **Formats:** multi-select from the canvases in `formats.md` (Meta feed portrait, Meta story, Meta reel, landscape, print A5 / A4 / A3 / A6 / DL).
4. **Dates:** start and end, or ongoing.

**Round 2 (depends on type):** ask only what the repo can't answer.

| Type | Ask |
|---|---|
| Product(s) | Which products (names or handles)? Is there an offer? |
| Partner brand | Which brand? The whole range or a hero product? Any offer? |
| Sale | Discount, what it covers, exclusions, end date |
| Category or age group | Which group? (maps to a `/shop` filter) |
| CREATESPACE awareness | The single message: what should people remember about us? Where is it running (cold audience, retargeting, local event)? |
| Education | Which programme (classroom kits, STEM tutors, curriculum, courses)? Which schools or phase? |

Also ask for **the one thing** (what the reader should believe or do) if the user hasn't said it. Offer two or three phrasings drawn from the type and persona.

## Step 2: Gather and check the facts

Every claim that could reach an asset goes into the brief's **What we can say** table with its source and today's date. Use these sources and no others:

| Fact | Source |
|---|---|
| Product exists, title, handle, price, compare-at price, availability | Shopify: `mcp__createspace-shopify__search_shop_catalog` / `get_product_details`. If that server is unavailable, read the live page `https://www.thecreatespace.co.za/product/<handle>` (WebFetch or the browser pane). Say which one you used. |
| What a product is, ages, what's in the box, what kids build | `assets/product/<handle>/content.md` if it exists; otherwise the live product page. If neither has it, suggest `/research <handle>` rather than guessing. |
| Products in a brand, category, age group or sale | The live filtered shop page, e.g. `https://www.thecreatespace.co.za/shop?brand=Makerzoid`, opened in the browser pane so the client-side filter runs. Record the product count and the price span. |
| Delivery threshold and rates | `storefront/src/config/site.json` |
| Company facts (schools supplied, founded, number of brands, official distributor) | `assets/company-profile/README.md`, section "Facts to keep current". Carry its caveats into the brief. |
| Testimonials | `storefront/src/components/HomeTestimonials.tsx`, quoted exactly, with a note to confirm the person agreed to advertising use |
| Education programmes and partners | Root `CLAUDE.md` (Education Section) and the live `/education/...` pages |

By type:

- **Product(s):** confirm each handle in Shopify. Fill the Subject product table. A sale price only counts if Shopify shows it.
- **Partner brand:** use the brand name exactly as the shop filter spells it, which is the Shopify vendor (`storefront/src/config/brands.ts`). Current values: `Arduino`, `Blockaroo`, `ELECFREAKS`, `Makerzoid`, `MatataStudio`, `NASA`, `National%20Geographic`, `Robotico`, `Snap%20Circuits`, `micro%3Abit`. Confirm the filtered page shows products. Note that partner logos go on white only (`marketing/PRODUCT.md`), and whether we have that brand's logo file.
- **Sale:** confirm in Shopify that the discount is actually live (or scheduled) on the products named. If the user says "20% off" but Shopify shows otherwise, stop and ask. The end date must be on the brief.
- **Category or age group:** map to the real filter values (ages are `3-5`, `6-8`, `9-12`, `13%2B`; confirm category values from the shop page). Record the products it returns.
- **CREATESPACE awareness:** there is no price and often no product. The facts table holds only claims we can back up. Fill in **Not claiming** with the tempting ones we can't back up (customer counts, "South Africa's biggest", ratings, anything from `voice-and-tone.md`'s unverifiable social proof list).
- **Education:** audience is educators; use the education framework's language (curriculum fit, cost per learner, support). Bulk pricing only if the user supplied it.

## Step 3: Landing links

One destination per asset, chosen by type:

| Type | Usual destination |
|---|---|
| Product | `/product/<handle>` |
| Several products, brand, category, age | `/shop?brand=...` / `/shop?age=...` / `/shop?category=...` |
| Sale | `/shop?sale=true` (optionally with a brand filter) |
| Awareness | `/` or `/about` |
| Education | `/education` or the specific `/education/...` page |

Build each URL on `https://www.thecreatespace.co.za` (never the apex) with:

- Meta: `utm_source=meta&utm_medium=paid&utm_campaign=<slug>&utm_content=<asset-file-name>`
- Print: `utm_source=flyer` (or `poster`) `&utm_medium=print&utm_campaign=<slug>&utm_content=<asset-file-name>`

Fill the brief's Assets table with one row per asset file. Name files after canvas and angle, e.g. `feed-portrait.html`, `story.html`, `flyer-a5.html`. Then run:

```bash
marketing/scripts/check-links.sh marketing/campaigns/<slug>
```

It fails on non-200s, on the "Product Not Found" soft 404, and on apex URLs. For filtered `/shop` links, also open the URL in the browser pane and confirm it shows products; a filter value with a typo returns an empty but valid page. Mark each row's **Link checked** with the date.

## Step 4: Imagery

Pick photos to suggest; the user confirms.

- Product and brand campaigns: `assets/product/<handle>/lifestyle/` first, `end-user/` for real customer photos.
- Awareness: customer photos across products (`end-user/`), `storefront/public/images/about/team-createspace.jpg`, and brand illustrations (already in `marketing/creative/kit/illustrations/`).
- Education: classroom-looking photos; ask the user if none exist rather than using consumer shots.
- Show children of different genders and backgrounds across the set (`marketing/PRODUCT.md`, Accessibility & Inclusion).

Copy the chosen files into `marketing/campaigns/<slug>/images/` with descriptive lowercase names (`girl-building-makerzoid-robot.jpg`). Keep the resolution: print needs 300 DPI at size (see `formats.md`). Only downscale files wider than 3000px, with `sips --resampleWidth 3000`. Record each in the brief's Imagery table with its source path.

For each print asset, make its QR code:

```bash
marketing/scripts/qr.sh marketing/campaigns/<slug>/images/qr-<asset>.svg "<that asset's landing URL>"
```

## Step 5: Draft the Meta copy

For each Meta placement, draft the text that sits outside the image: primary text, headline, description, and a button from Meta's list (Shop now, Learn more, Sign up, Contact us...).

- Follow `assets/brand/voice-and-tone.md`: its banned phrases, no em or en dashes, CREATESPACE in capitals, "Delivery" not "Shipping", `R 1,499` money format.
- Use only claims from the **What we can say** table.
- Write for the persona in the brief. Specific beats superlative ("Build 12 robots from one box" over "endless fun").
- Run the draft through the `humanizer` skill as a last pass.

Also suggest the short on-image line (a few words). Impeccable will refine it, but it needs a starting point.

## Step 6: Write the brief

Create `marketing/campaigns/<slug>/` by copying `marketing/campaigns/_template/brief.md` (and the empty `images/` folder). Don't copy `asset.html`; Impeccable creates each asset from `_template/asset.html` when it designs it.

Fill every section that applies, delete the Subject blocks for other types, and delete the template's HTML comments. Set **Status: Draft**. Put anything unconfirmed under **Open questions**.

## Step 7: Hand off

Tell the user, briefly:

1. What the brief says: type, audience, the one thing, assets and their destinations.
2. What you checked and how (e.g. "prices from Shopify MCP" or "from the live product pages, since the Shopify MCP was unavailable").
3. The open questions, if any.
4. The next step, with the exact command filled in:

   > /impeccable Design the lead asset for marketing/campaigns/<slug>/: <first asset file>, canvas <canvas>, starting from marketing/campaigns/_template/asset.html. The brief is marketing/campaigns/<slug>/brief.md.

   Then, once approved: `/impeccable adapt marketing/campaigns/<slug>/<lead>.html into <other files and canvases>`, followed by `marketing/scripts/render.sh marketing/campaigns/<slug>/*.html`.

Don't start the Impeccable run yourself. The user approves the brief first and changes **Status** to Approved.
