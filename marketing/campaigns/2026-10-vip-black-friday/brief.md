# VIP Black Friday: subscribe for early access

## Summary

- **Campaign slug:** `2026-10-vip-black-friday` (also the `utm_campaign` value)
- **Type:** Sale (pre-sale list building)
- **Audience:** Parents
- **Persona:** Gift-buying parents and grandparents planning ahead for the festive season (`assets/brand/brand-strategy.md`)
- **Runs:** Late October 2026 until the VIP early-access sale opens
- **Owner:** Hayley
- **Status:** Draft

## The one thing

Join the CREATESPACE email list now, because subscribers get into the Black Friday sale before it opens to everyone else.

## Subject

**Sale:** A VIP early-access Black Friday sale for email subscribers only. No discount, start date or product list is confirmed yet, so the assets promise early access and nothing more.

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Subscribers get early Black Friday access | Yes | Owner, 2026-10-15 (Little Luna brief) and 2026-10-27 | 2026-10-27 |
| Subscribers get their own early sale ("subscriber-only deals") | Yes, the VIP sale is for subscribers only | Owner, 2026-10-27 | 2026-10-27 |
| Signing up is free | Yes, the newsletter costs nothing | `storefront/src/components/EmailPopup.tsx` | 2026-10-27 |

**Not claiming:** a discount percentage, the early-access date, how long early access lasts, which products are included, subscriber counts, or "limited spots" (there is no limit, so no false scarcity).

## Assets

| File | Canvas | Channel | Landing URL (with UTMs) | Link checked |
|---|---|---|---|---|
| `feed-square.html` | `meta-square` | Meta feed | `https://www.thecreatespace.co.za/?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-vip-black-friday&utm_content=feed-square` | 2026-10-27 |
| `feed-portrait.html` | `meta-portrait` | Instagram and Facebook feed (4:5) | `https://www.thecreatespace.co.za/?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-vip-black-friday&utm_content=feed-portrait` | 2026-10-28 |
| `story.html` | `meta-story` | Instagram and Facebook Stories (9:16) | `https://www.thecreatespace.co.za/?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-vip-black-friday&utm_content=story` | 2026-10-28 |

## Imagery

Three lifestyle photos in a collage, chosen by the owner on 2026-10-28. Two earlier concepts (a guest list with first names, then cartoon robots queuing at a door) were dropped on 2026-10-28 as too cartoony.

| File in `images/` | Source | Shows |
|---|---|---|
| `two-kids-coding-tale-bot.jpg` | `assets/product/matatastudio-tale-bot-pro-classroom-set/lifestyle/two-kids-playing-with-talebot-together.png` | Two children coding Tale-Bot on a story map |
| `dad-and-kids-launching-rockets.jpg` | `assets/product/national-geographic-light-up-air-rockets/lifestyle/dad-and-kids-playing-excited.jpg` | Dad and two boys cheering an air rocket launch |
| `dad-and-son-digital-microscope.jpg` | `assets/product/matatastudio-digital-microscope-mt3-2/lifestyle/father-and-son-smiling-at-microscope.png` | Dad and son at a digital microscope |

**On the image:** "Sign up and shop Black Friday first." / "Our sale opens early for subscribers only." / red round badge "VIP early access" / button "Get on the list".

## Ad copy (Meta)

- **Primary text:** Our Black Friday sale opens early for people on our email list. Sign up now and you'll get first pick of the STEM kits before everyone else, which matters when the best ones sell out. It's free and takes ten seconds.
- **Headline:** Get early access to Black Friday
- **Description:** Subscribers shop first
- **Button:** Sign up

## Constraints

- No date or discount on the image until the owner confirms them.
- Red only for the "early access" stamp (urgency), per the Red Means Saving rule.

## Open questions

- **The landing page doesn't mention VIP access yet.** The homepage popup and newsletter band both say "Stay in the loop". Someone tapping this ad should see "Get VIP early access to Black Friday" where they sign up, or the ad's promise gets lost. Update `EmailPopup.tsx` and `NewsletterBand.tsx` copy before the ad goes live (or consider a Meta Instant Form).
- **The popup never opens by itself.** `EmailPopup.tsx` only opens on an `open-email-popup` event, so ad traffic lands on the homepage and has to scroll to the newsletter band near the bottom. Either open the popup for visitors arriving with `utm_campaign=2026-10-vip-black-friday`, or point the ad at a short dedicated VIP signup page.
- When is the VIP sale and what's the discount? Add them to the ad once confirmed; dated creative usually beats undated.
