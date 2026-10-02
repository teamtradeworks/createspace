# Hero kits

## Summary

- **Campaign slug:** `2026-10-hero-kits` (also the `utm_campaign` value)
- **Type:** Product (four single-product concepts, tested against each other)
- **Audience:** Parents. The gift concept has a grandparent variant.
- **Persona:** Mothers 35-54 choosing for a specific child; grandmothers 55+ buying gifts (the highest-ROAS Meta segment, never targeted directly before)
- **Runs:** October 2026 into the Christmas run-up. No offer and no end date, so nothing goes stale. Prices must be rechecked before each upload.
- **Owner:** Dylan
- **Status:** Draft

## The one thing

One kit, one fact you can picture, its age and its price. Every concept comes from an angle that already sold in the 365-day data (`creative-insights-365d-2026-10-02.md`, OneDrive client folder): single-image ads with one product, a number in the headline, age as a filter, screen-free tied to a product, sensory detail, and gifts that promise use.

## Concepts

| # | Concept | Product | On-image headline | Data behind it |
|---|---|---|---|---|
| 1 | Lights on, lights off | National Geographic Glow-in-the-Dark Human Body | Anatomy you can hold. | Human Body ad: ROAS 6.58 on sensory detail. Nat Geo is the best range on both platforms |
| 2 | The number sentence | Makerzoid Robot Master Premium | 600 pieces. 200 robots. One very busy kid. | Proven Meta headline; top Google Shopping SKU; "most STEM toys die after the first build" ROAS 6.90 |
| 3 | Coding before reading | MatataStudio Tale-Bot Pro | Coding before reading. | "Screen-free coding, ages 3-8" was the best Tale-Bot title (ROAS 7.8); screen-free is the strongest theme when tied to a product |
| 4 | The gift tag | National Geographic Light-Up Air Rockets | A gift they'll still be using in January. | Google "A Gift They Actually Use" ROAS 5.55, ported to Meta. Air Rockets ROAS 4.8 in Shopping; the photo shows the product mid-launch. Replaced the Bug Habitat, whose photo didn't show the product (Dylan, 2026-10-02) |
| 4b | Gift tag, grandparent | Same | For the grandchild who's curious about everything. | Women 55-64: ROAS 5.52, highest in the account |

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Human Body price | R 600 | Live product page JSON-LD | 2026-10-02 |
| Human Body age | Ages 8-12 | Live product page | 2026-10-02 |
| Human Body contents | 9 squishy organs, 18 glow-in-the-dark bones, forceps, display stand | `assets/product/national-geographic-glow-in-the-dark-human-body/content.md` | 2026-10-02 |
| Robot Master price | R 2,380 | Live product page | 2026-10-02 |
| Robot Master age | Ages 6-14 | Live product page | 2026-10-02 |
| Robot Master contents | 600+ pieces, 200+ robot models, 47 video lessons across three levels | `assets/product/makerzoid-robot-master-premium/content.md` | 2026-10-02 |
| Tale-Bot Pro price | R 2,280 | Live product page | 2026-10-02 |
| Tale-Bot Pro age | Ages 3-6 | Live product page (the insights doc's "3-8" was not used, see Open questions) | 2026-10-02 |
| Tale-Bot Pro behaviour | Screen-free button coding; walks, draws, sings, dances; no tablet or reading needed | `assets/product/matatastudio-tale-bot-pro/content.md` | 2026-10-02 |
| Air Rockets price | R 720 | Live product page | 2026-10-02 |
| Air Rockets age | Ages 6-12 | Live product page header (see Open questions) | 2026-10-02 |
| Air Rockets contents | 3 LED light-up foam rockets, stomp launch pad, adjustable launch tube; up to 30 metres (100 feet) | `assets/product/national-geographic-light-up-air-rockets/content.md` | 2026-10-02 |
| Makerzoid coding | Motors, sensors, Bluetooth app with drag-and-drop block coding; works with standard building bricks | `assets/product/makerzoid-robot-master-premium/content.md` | 2026-10-02 |
| Delivery | Free over R 1,500 | `storefront/src/config/site.json` | 2026-10-02 |

**Not claiming:** school counts (the insights doc's "140+ schools" conflicts with the company profile's 120+, and neither is verified), testimonials, ratings, awards (NAPPA and EdTech awards are left out until cleared), "bestseller".

## Assets

All exports are in `exports/`. Each concept has the same six sizes.

| Concept | Meta 4:5 | Meta 1:1 | Meta 9:16 | Google 1.91:1 | Google 1:1 | Google 4:5 |
|---|---|---|---|---|---|---|
| Human Body | `human-body-meta-portrait` | `human-body-meta-square` | `human-body-meta-story` | `human-body-google-landscape` | `human-body-google-square` | `human-body-google-portrait` |
| Makerzoid | `makerzoid-meta-portrait` | `makerzoid-meta-square` | `makerzoid-meta-story` | `makerzoid-google-landscape` | `makerzoid-google-square` | `makerzoid-google-portrait` |
| Tale-Bot | `talebot-meta-portrait` | `talebot-meta-square` | `talebot-meta-story` | `talebot-google-landscape` | `talebot-google-square` | `talebot-google-portrait` |
| Air Rockets | `rockets-meta-portrait` | `rockets-meta-square` | `rockets-meta-story` | `rockets-google-landscape` | `rockets-google-square` | `rockets-google-portrait` |
| Air Rockets, grandparent | `rockets-grandchild-meta-portrait` | | | | | |

Google images carry only the logo and one short badge or label pair, with no button, following Google's image guidance. The selling lines go in the text assets below. The Makerzoid Google images pair "Build it" (a motorised crane next to its model in the app) with "Code it" (a boy coding his robots with blocks on a tablet), to show what a plain brick set can't do.

### Landing URLs

Meta (`utm_content` = the file name, e.g. `human-body-meta-portrait`):

| Concept | URL |
|---|---|
| Human Body | `https://www.thecreatespace.co.za/product/national-geographic-glow-in-the-dark-human-body?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-hero-kits&utm_content={file}` |
| Makerzoid | `https://www.thecreatespace.co.za/product/makerzoid-robot-master-premium?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-hero-kits&utm_content={file}` |
| Tale-Bot | `https://www.thecreatespace.co.za/product/matatastudio-tale-bot-pro?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-hero-kits&utm_content={file}` |
| Air Rockets | `https://www.thecreatespace.co.za/product/national-geographic-light-up-air-rockets?utm_source=meta&utm_medium=paid&utm_campaign=2026-10-hero-kits&utm_content={file}` |

All four product pages returned 200 on 2026-10-02. Google uses auto-tagging; set the same product pages as each asset group's final URL.

## Ad copy (Meta)

Primary text opens on a belief the parent already holds, then names the product. Headline slots reuse lines that converted.

**1. Human Body**
- **Primary text:** Squishy organs. Glow-in-the-dark bones. A body they put together themselves. The National Geographic Glow-in-the-Dark Human Body has 9 organs to lift out with forceps and 18 bones that glow when the lights go off, then it stands on display like a museum specimen. Ages 8-12. No batteries, no apps.
- **Headline:** Anatomy Comes to Life
- **Description:** Official National Geographic kit
- **Button:** Shop now

**2. Makerzoid**
- **Primary text:** Most expensive STEM toys die after the first build. Makerzoid Robot Master Premium has 200+ robots in one box: 600 pieces, 47 video lessons across three levels, and models your child learns to code. Ages 6-14.
- **Headline:** They Build It, Then They Code It
- **Description:** Free delivery over R 1,500
- **Button:** Shop now

**3. Tale-Bot Pro**
- **Primary text:** No tablets, no apps, no reading required. Press the arrows, press go, and Tale-Bot walks, draws, sings and dances. It's coding for ages 3-6, done the way little ones already play.
- **Headline:** Screen-free coding, ages 3-6
- **Description:** Free delivery over R 1,500
- **Button:** Shop now

**4. Air Rockets**
- **Primary text:** Built for the child who's bored of toys by Boxing Day. Stomp the pad and a National Geographic light-up rocket flies up to 30 metres. Three rockets, an adjustable launch angle, and long summer evenings to see how high they go. Ages 6-12.
- **Headline:** A Gift They Actually Use
- **Description:** Official National Geographic kit, R 720
- **Button:** Shop now

**4b. Air Rockets, grandparent** (target women 55+)
- **Primary text:** For the grandchild who's curious about everything. Stomp the pad and watch a light-up rocket fly up to 30 metres, then work out how to send the next one further. National Geographic Light-Up Air Rockets, ages 6-12, delivered to their door by The Courier Guy.
- **Headline:** The gift that gets a phone call back
- **Description:** Official National Geographic kit, R 720
- **Button:** Shop now

## Ad copy (Google)

Proven lines from the insights doc are kept word for word; new lines are marked (new). All lengths checked: headlines 30 characters or fewer, long headlines and descriptions 90 or fewer.

### Search (AI Max) RSA

Headlines:
1. Sorted by Age, 3 to 13+
2. A Gift They Actually Use
3. Science Kits From R200
4. Science Kits for Kids SA
5. Give the Gift of STEM
6. Screen-Free Coding, Ages 3-6 (new)
7. Build 200+ Robots in One Box (new)
8. Official Nat Geo Kits in SA (new)
9. Rockets, Robots and Circuits (new)
10. Real Science, No Screen
11. Kits That Grow With Them
12. Find a Gift by Age Group
13. Glow-in-the-Dark Anatomy Kit (new)
14. Coding Before Reading (new)
15. Kits Still Used in January (new)

Descriptions:
1. We are official, registered suppliers of top STEM brands.
2. Too advanced for them? Every kit lists an age range and skill level. Filter and shop.
3. Shop science and electronics kits for kids. Free delivery over R1,500. Buy online.
4. Hands-on kits that beat screen time: fossils, rockets, circuits and crystals, from R200. (new)

### PMax asset group: Nat Geo + NASA (add the Human Body and Air Rockets images)

- **Headlines:** Official Nat Geo Kits in SA · Anatomy Comes to Life · Real Science, No Screen · Kits That Grow With Them · A Gift They Actually Use
- **Long headlines:** Squishy organs and glow-in-the-dark bones: the Nat Geo Human Body kit, ages 8-12 (new) · Stomp, launch, repeat: light-up Nat Geo rockets that fly up to 30 metres. Ages 6-12 (new)
- **Descriptions:** Official National Geographic kits, now at CREATESPACE. · 9 squishy organs, 18 bones that glow in the dark, forceps and a stand. Ages 8-12. (new) · Stomp the pad and a light-up rocket flies up to 30 metres. Ages 6-12. (new) · Officially licensed National Geographic kits. Free delivery over R1,500. (new)

### PMax asset group: Makerzoid (new group, per the insights doc)

- **Headlines:** Build 200+ Robots in One Box · 600 Pieces, 200 Robots · They Build It, Then Code It · Motors, Sensors and Code (new) · Not a One-Build Toy · 47 Lessons, 3 Levels
- **Long headlines:** 600 pieces, 200 robots and 47 video lessons in one Makerzoid box. Ages 6-14 (new) · Most STEM toys die after the first build. Makerzoid has 200+ robots in one box (new)
- **Descriptions:** Looking for screen-free fun? Makerzoid offer engaging & educational toys for hours of play · Build it, then code it: 47 lessons across three levels, from first model to own code. (new) · 47 lessons, three levels, free delivery over R1,500 from an official SA supplier. (new) · Bricks that move: motors, sensors and an app to code every robot they build. (new)

### PMax asset group: MatataStudio

- **Headlines:** Screen-Free Coding, Ages 3-6 · Coding Before Reading · Smart Toys, Smarter Kids · No Tablet, No App · Meet Tale-Bot Pro
- **Long headlines:** Screen-free coding for ages 3-6: press the arrows, press go, watch Tale-Bot walk (new) · No tablets, no apps, no reading required. Tale-Bot Pro teaches coding through play (new)
- **Descriptions:** Shop the MatataStudio collection. Screen-free coding for toddlers and AI robots for teens. · Press, plan and play: Tale-Bot walks, draws, sings and dances. Ages 3-6. (new) · Turn playtime into learning time. Coding robots from age 3 to the teens. (adapted)

## Imagery

| File in `images/` | Source | Shows |
|---|---|---|
| `body-model-on-navy.jpg` | `assets/product/national-geographic-glow-in-the-dark-human-body/lifestyle/body-on-stand-with-forceps.png` (resized) | Model on its stand, navy studio ground |
| `body-skeleton-glowing.jpg` | `.../national-geographic-glow-in-the-dark-human-body/end-user/glowing-in-the-dark.jpg` | Model glowing in the dark (customer photo) |
| `makerzoid-two-kids-tray.jpg` | `assets/product/makerzoid-robot-master-premium/end-user/two-kids-playing-together-building-and-with-app-on-phone.png` | Two kids building over the parts tray (customer photo) |
| `talebot-finger-on-button.jpg` | `.../matatastudio-tale-bot-pro/lifestyle/finger-pressing-button-on-tale-bot-pro.png` | Close-up of the coding buttons |
| `rockets-girl-stomp-launch.jpg` | `assets/product/national-geographic-light-up-air-rockets/lifestyle/girl-in-air-jumping-on-launch-pad.jpg` (resized) | Girl mid-jump onto the stomp pad, launcher and rockets in shot |
| `rockets-family-launch.jpg` | `.../national-geographic-light-up-air-rockets/lifestyle/dad-and-kids-playing-excited.jpg` (resized) | Dad and two boys cheering a launch |
| `makerzoid-crane-and-app.jpg` | `assets/product/makerzoid-robot-master-premium/end-user/crane-built-sitting-on-box-with-tablet-behind.png` | Motorised crane with its model on the tablet app (customer photo) |
| `makerzoid-boy-coding-tablet.jpg` | `.../makerzoid-robot-master-premium/lifestyle/boy-coding-on-tablet-with-robot-on-floor.jpg` | Boy coding robots with blocks on a tablet |

## Constraints

- **National Geographic licensing.** The insights doc says Nat Geo and NASA have strict lockup, imagery and "official licensed product" rules. These ads use the name in text only, no Nat Geo logo or lockup, but the Human Body and Air Rockets ads should still go to licensor review before they run.
- **Customer photos** (`end-user/`) are used in four of the eight images. Confirm we may use them in paid ads.
- **Visual rules:** `marketing/DESIGN.md` won over the insights doc's design section (Dylan, 2026-10-02): orange CTA with navy label, SemiBold headlines, one or two highlighted words.

## Open questions

- **Tale-Bot age.** The insights doc's winning title said "ages 3-8"; the live product page says 3-6 and the manufacturer says 3-5. The ads use 3-6. If the 3-8 title is what sold, decide whether to change the product page or keep the ads at 3-6.
- **"From R200".** The proven Google lines say "From R200" while the insights doc's top Meta ad says "from R220". Check the cheapest kit in Shopify before uploading the RSA.
- **Makerzoid photos** are small originals (600 to 783 px wide) and look soft on the larger sizes, the coding photo most of all on the Google square and portrait. Swap in sharper shots if Makerzoid can supply them.
- **Air Rockets age.** The product page header says 6-12, but its bullet list and the manufacturer say 8+. The ads use 6-12; align the product page.
- **Google logo assets** (1200 x 1200 and 1200 x 300) aren't in this set. Reuse the ones already in the account.
