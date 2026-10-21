# Tale-Bot Pro: Gran chat

## Summary

- **Campaign slug:** `2026-10-tale-bot-gran-chat` (also the `utm_campaign` value)
- **Type:** Product
- **Audience:** Parents (and grandparents buying gifts). The thread is told between the two, so it speaks to both.
- **Runs:** October 2026 into the Christmas run-up. No offer, no end date.
- **Status:** Draft

## The one thing

A screen-free coding robot is the gift that both the gran and the parent are happy about. It is told as a native-looking text thread so it reads as a real screenshot in the feed.

## Subject

| Product | Shopify handle | Price | Ages | Research notes |
|---|---|---|---|---|
| MatataStudio Tale-Bot Pro | `matatastudio-tale-bot-pro` | R 2,280 | 3-6 | `assets/product/matatastudio-tale-bot-pro/content.md` |

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Price | R 2,280 | Ad brief N2; matches `2026-10-hero-kits/brief.md` (live product page, 2026-10-02) | Recheck in Shopify before upload |
| Ages | 3-6 | Live product page (see hero-kits brief) | 2026-10-02 |
| No tablet, no app, no reading | Button coding on the robot itself | `assets/product/matatastudio-tale-bot-pro/content.md` | 2026-10-02 |

**Not claiming:** star ratings, "bestseller", or the manufacturer's 3-5 or the insights doc's 3-8 age range.

## Assets

| File | Canvas | Channel | Landing URL (with UTMs) | Link checked |
|---|---|---|---|---|
| `feed-portrait.html` | `meta-portrait` | Meta feed | `https://www.thecreatespace.co.za/product/matatastudio-tale-bot-pro?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-tale-bot-gran-chat&utm_content=feed-portrait` | OK 2026-10-21 |
| `feed-portrait-whatsapp.html` | `meta-portrait` | Meta feed | `https://www.thecreatespace.co.za/product/matatastudio-tale-bot-pro?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-tale-bot-gran-chat&utm_content=feed-portrait-whatsapp` | OK 2026-10-21 |
| `story.html` | `meta-story` | Meta stories | `https://www.thecreatespace.co.za/product/matatastudio-tale-bot-pro?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-tale-bot-gran-chat&utm_content=story` | OK 2026-10-21 |
| `story-whatsapp.html` | `meta-story` | Meta stories | `https://www.thecreatespace.co.za/product/matatastudio-tale-bot-pro?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-tale-bot-gran-chat&utm_content=story-whatsapp` | OK 2026-10-21 |

## Imagery

| File in `images/` | Source | Shows |
|---|---|---|
| `talebot-three-bots-white.jpg` | `assets/product/matatastudio-tale-bot-pro/lifestyle/3-bots-with-different-arm-attachments.png`, cropped to 800x420 (link-preview ratio) | Three Tale-Bots with arm attachments on white |

## Design notes

- Generic messaging screen, not modelled on any real app. White ground, no status bar, light grey header with a "G" avatar and "Gran".
- DM Sans 34px for bubbles, as the brief pins it. It is outside the CREATESPACE type system on purpose, so the image reads as a phone screenshot. Font file: `creative/kit/fonts/DMSans.ttf` (SIL OFL).
- Grey bubbles on the left are Gran. Blue `#2F7CF6` bubbles on the right are the parent, in white text.
- The only brand mark is the small CREATESPACE wordmark at the bottom right. No emoji and no CTA button.
- **Stories** (`story.html`, `story-whatsapp.html`) share a stylesheet with their feed version (`gran-chat.css`, `gran-chat-whatsapp.css`). The header band runs up behind Meta's top 270px so the screen still looks whole, with the avatar and name just below it. The wordmark sits above the bottom 270px.
- **WhatsApp-style variant** (`feed-portrait-whatsapp.html`), added on request to test against the generic version. It borrows WhatsApp's look (beige wallpaper, green outgoing and white incoming bubbles, times and blue ticks inside bubbles, link preview with the URL under it) but uses no WhatsApp logo, name or doodle artwork. The wallpaper doodles are faded CREATESPACE illustrations. Meta may treat a mock of its own app interface as misleading, so if this version is rejected in review, run the generic one.

## Ad copy (Meta)

- **Primary text:** Gran asked. Mum had one rule: no more screens. Tale-Bot Pro is coded with the buttons on its back, so there's no tablet, no app and no reading needed. Ages 3-6, R 2,280.
- **Headline:** Screen-free coding, ages 3-6
- **Description:** Delivered by The Courier Guy
- **Button:** Shop now

## Open questions

- Recheck the R 2,280 price in Shopify before upload. The Shopify connector was down when this was built.
- Run `marketing/scripts/check-links.sh` on this folder again before shipping.
