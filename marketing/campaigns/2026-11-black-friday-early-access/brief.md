# Black Friday early access for subscribers

## Summary

- **Campaign slug:** `2026-11-black-friday-early-access` (also the `utm_campaign` value)
- **Type:** Sale (list growth ahead of Black Friday)
- **Audience:** Parents
- **Runs:** November 2026, before Black Friday opens to everyone
- **Status:** Draft

## The one thing

Join the CREATESPACE list now, because subscribers get into the Black Friday sale before everyone else.

## What we can say

| Claim | Value | Source |
|---|---|---|
| Subscribers get early Black Friday access | Yes, no discount given yet | Owner, 2026-10-15 (see `2026-10-little-luna-vip/brief.md`) |
| Subscriber sale dates | 19 to 22 Nov 2026 | Owner, 2026-10-28 (see `2026-10-vip-black-friday/brief.md`) |
| Open sale dates | From 23 Nov 2026, for everyone | Owner, 2026-10-28 (see `2026-10-vip-black-friday/brief.md`) |
| Signing up is free | Yes | `storefront/src/components/EmailPopup.tsx` |
| Robot shown | MatataStudio VinciBot Coding Robot Set, ages 8 to 12 | `assets/product/matatastudio-vincibot-coding-robot-set/content.md` |

**Not claiming:** a discount percentage, or that VinciBot or Tale-Bot is in the sale.

## Assets

| File | Canvas | Use |
|---|---|---|
| `feed-square.html` | `meta-square` (1080 x 1080) | Feed and carousel. VinciBot studio photo, full-width navy headline, red "Early access" sticker, navy CTA band with the red A mark |
| `feed-portrait.html` | `meta-portrait` (1080 x 1350) | Instagram and Facebook feed post. Adapted from the square, with a bigger robot. Headline and robot stay inside the middle 1080 x 1080; the CTA band falls outside it if Facebook crops to 1:1 |
| `story.html` | `meta-story` (1080 x 1920) | Instagram and Facebook Stories. "Black Friday" stacked over two lines to fill the height, a bigger robot, and the CTA as a floating navy panel just above the bottom 270px (reply bar), with the photo running to the edge behind it |

| `feed-portrait-pass.html` | `meta-portrait` (1080 x 1350) | Organic Instagram feed post (added 2026-11-09). White ground with five faint navy brand line icons (lightbulb, flask, atom, planet, gear, from `assets/design/ICONS/DARK/`, copied to `images/icon-*.png`), so it reads differently from the navy calendar and pass posts before it. A navy VIP lanyard badge hangs from a blue strap on the right: Tale-Bot photo, giant "VIP", "Black Friday early access", and a yellow strip reading "4 days early". Left column: headline "Your pass to shop Black Friday first!" ("first!" in orange), "Subscribers 19 to 22 Nov" on a yellow marker, "Everyone else from 23 Nov" in grey (not struck, because the open sale still happens), "Sign up on our website." and an orange "Link in bio" button, since organic posts have no tappable link |
| `story-pass.html` | `meta-story` (1080 x 1920) | Organic Instagram story (added 2026-11-09), the story version of `feed-portrait-pass`. Same layout spread over the taller canvas with bigger text, a larger badge (scaled 1.1, tilted 2.5 degrees) and a longer strap. Content runs from about 200px to 1690px, a little inside Instagram's top and bottom bands, since organic stories carry less chrome than ads. No CTA button on the image: add Instagram's link sticker (story link below) when posting, under "Sign up on our website." Both files share `pass.css`; each sets only its own positions |

Images: `images/vincibot-on-line-track.jpg`, copied from `assets/product/matatastudio-vincibot-coding-robot-set/lifestyle/vincibot-close-up-on-line-following-map.jpeg` (1000 x 1000). `images/two-kids-coding-tale-bot.jpg` is copied from `2026-10-vip-black-friday/images/`. The Tale-Bot photo shows the kind of kit on offer, not a claim that it is in the sale.

## Landing link

`https://www.thecreatespace.co.za/?utm_source=meta&utm_medium=paid-social&utm_campaign=2026-11-black-friday-early-access&utm_content=feed-square#subscribe`

For the portrait post use `utm_content=feed-portrait`, and for the story `utm_content=story`.

Lands on the homepage and jumps to the footer sign-up form.

## Meta copy (draft)

- **Primary text:** Our Black Friday sale opens to subscribers first. Join the free CREATESPACE email list and you'll get in before everyone else, with first pick of robots, coding kits and science sets.
- **Headline:** Shop Black Friday first
- **Button:** Sign up

## Instagram caption (organic, `feed-portrait-pass`)

Our Black Friday sale opens to email subscribers first. 🎟️

Join our list and you can shop from Thursday 19 November, four days before everyone else gets in on the 23rd. That means first pick of the robots, coding kits and science sets, before the popular ones run low.

It's free and takes ten seconds. Tap the link in our bio to sign up.

#BlackFriday #STEMtoys #STEMforkids #SouthAfrica #CREATESPACE

Bio link: `https://www.thecreatespace.co.za/?utm_source=instagram&utm_medium=organic&utm_campaign=2026-11-black-friday-early-access&utm_content=feed-portrait-pass#subscribe`

Story link sticker: `https://www.thecreatespace.co.za/?utm_source=instagram&utm_medium=organic&utm_campaign=2026-11-black-friday-early-access&utm_content=story-pass#subscribe`

## Open questions

- What is the discount? Add it once confirmed. The VinciBot assets still carry no dates; consider adding 19 to 22 Nov.
- Should the landing page be a dedicated sign-up page rather than the footer form?
