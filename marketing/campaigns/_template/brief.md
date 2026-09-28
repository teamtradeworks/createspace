# <Campaign name>

<!--
  Campaign brief. Normally written by `/campaign <slug>`; if you fill it in by
  hand, complete every section that applies to the campaign type and delete
  the ones that don't. Impeccable reads this brief when designing the assets,
  so write facts, not hopes. Delete these comments when you're done.
-->

## Summary

- **Campaign slug:** `<yyyy-mm-slug>` (also the `utm_campaign` value)
- **Type:** Product | Partner brand | Sale | Category or age | CREATESPACE awareness | Education
- **Audience:** Parents | Educators <!-- one per campaign; make a second campaign for the other -->
- **Persona:** <!-- e.g. "Parents unfamiliar with STEM" from assets/brand/brand-strategy.md -->
- **Runs:** <start date> to <end date, or "ongoing">
- **Owner:** <name>
- **Status:** Draft | Approved | Live | Ended

## The one thing

<!-- What should the reader believe or do, and why now? One or two sentences.
     Awareness campaigns still get one: "remember that we're the specialist STEM store" is a belief, "follow us" is an action. -->

## Subject

<!-- Fill in the block for this campaign's type and delete the others. -->

**Product(s):**

| Product | Shopify handle | Price | Ages | Research notes |
|---|---|---|---|---|
| | | R | | `assets/product/<handle>/content.md` |

**Partner brand:** <!-- name as used in the shop filter, e.g. Makerzoid. Number of products live, price span, what the range is known for. -->

**Sale:** <!-- discount, what it applies to, start and end dates, any exclusions -->

**Category or age group:** <!-- the shop filter it maps to, and the products in it -->

**CREATESPACE awareness:** <!-- the single message, and which proof points below carry it. No product or price needed. -->

**Education:** <!-- the programme (classroom kits, STEM tutors, curriculum, courses), partner if any, bulk pricing if quoted -->

## What we can say

<!-- Every number or claim that could appear on an asset or in ad copy, with where it came from and when it was checked.
     If a claim has no source, it doesn't go on an asset. -->

| Claim | Value | Source | Checked |
|---|---|---|---|
| Delivery | Free over R 1,500 | `storefront/src/config/site.json` | |
| | | | |

**Not claiming:** <!-- tempting claims we can't back up, so nobody adds them later -->

## Assets

<!-- One row per file. Canvas names are in marketing/creative/formats.md. utm_content = the file name without .html. -->

| File | Canvas | Channel | Landing URL (with UTMs) | Link checked |
|---|---|---|---|---|
| `feed-portrait.html` | `meta-portrait` | Meta feed | `https://www.thecreatespace.co.za/...?utm_source=meta&utm_medium=paid&utm_campaign=<slug>&utm_content=feed-portrait` | |
| `story.html` | `meta-story` | Meta stories | `...&utm_content=story` | |
| `flyer-a5.html` | `a5` | Print (QR code) | `...?utm_source=flyer&utm_medium=print&utm_campaign=<slug>&utm_content=flyer-a5` | |

## Imagery

<!-- Photos copied into images/, with where each came from and what it shows. -->

| File in `images/` | Source | Shows |
|---|---|---|
| | `assets/product/<handle>/lifestyle/...` | |

## Ad copy (Meta)

<!-- Text that sits outside the image in Ads Manager. Keep the words on the image short. -->

- **Primary text:**
- **Headline:**
- **Description:**
- **Button:** Shop now | Learn more | ...

## Constraints

<!-- Partner brand rules, must-include logos, supplier requests, anything else. -->

## Open questions

<!-- Anything /campaign couldn't confirm. Resolve before designing. -->
