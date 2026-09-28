# STEM range

## Summary

- **Campaign slug:** `2026-09-stem-range` (also the `utm_campaign` value)
- **Type:** Category or age (the whole range, across all six categories)
- **Audience:** Parents
- **Persona:** Parents with STEM-curious children (`assets/brand/brand-strategy.md`)
- **Runs:** ongoing (evergreen, no offer or end date)
- **Owner:** Dylan
- **Status:** Draft

## The one thing

CREATESPACE has a hands-on kit for whatever your child is into, from coding robots to fossils and volcanoes. Tap through and shop by what they love.

## Subject

**Category or age group:** all six shop categories (`storefront/src/config/categories.ts`): Robotics & Coding, Electronics & Circuits, Building & Mechanics, Earth Sciences, Space & Astronomy, Chemistry. Destination is the unfiltered `/shop`, where the category filter sits at the top.

Three concepts are tested against each other, all at `meta-portrait`:

| File | Concept | On-image headline |
|---|---|---|
| `feed-portrait-week.html` | A week planner, one hands-on activity per day | Robots on Monday. Rockets by Friday. |
| `feed-portrait-curious.html` | Six kid types the parent recognises their child in | What kind of curious is your child? |
| `feed-portrait-specimens.html` | Six real kits laid out with labels | Pick a science. Any science. |

## What we can say

| Claim | Value | Source | Checked |
|---|---|---|---|
| Delivery | Free over R 1,500 | `storefront/src/config/site.json` (`freeDeliveryThreshold: 1500`) | 2026-09-28 |
| Age range | Ages 3 to 13+ | Homepage age groups `3-5`, `6-8`, `9-12`, `13+` (`storefront/src/components/AgeGroups.tsx`) | 2026-09-28 |
| Six categories | Names above | `storefront/src/config/categories.ts` | 2026-09-28 |
| Kits named on `feed-portrait-specimens` | MatataStudio Nous AI Set, Snap Circuits Classic 300, Makerzoid Robot Master, Rock & Mineral Starter Kit, Light-Up Air Rockets, Build Your Own Volcano | `assets/product/<handle>/content.md` titles | 2026-09-28 |
| Activities on `feed-portrait-week` | Code a robot; snap together a circuit; build with real gears; crack open a geode; stomp-launch a rocket; make a volcano erupt | Each matches a stocked kit: micro:bit, Snap Circuits, Makerzoid Diverse Building Blocks (gears and axles), National Geographic Break Open 5 Geodes, Light-Up Air Rockets (stomp launcher), Build Your Own Volcano | 2026-09-28 |

**Not claiming:** customer or family counts, "South Africa's biggest STEM store", ratings, manufacturer school counts, any price (the ads carry none, so nothing goes stale).

## Assets

| File | Canvas | Channel | Landing URL (with UTMs) | Link checked |
|---|---|---|---|---|
| `feed-portrait-week.html` | `meta-portrait` | Meta feed | `https://www.thecreatespace.co.za/shop?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-stem-range&utm_content=feed-portrait-week` | 2026-09-28 |
| `feed-portrait-curious.html` | `meta-portrait` | Meta feed | `https://www.thecreatespace.co.za/shop?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-stem-range&utm_content=feed-portrait-curious` | 2026-09-28 |
| `feed-portrait-specimens.html` | `meta-portrait` | Meta feed | `https://www.thecreatespace.co.za/shop?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-stem-range&utm_content=feed-portrait-specimens` | 2026-09-28 |

No `meta-story` versions yet. Advantage+ placements ask for one; adapt the winning concept once the test reads.

## Imagery

| File in `images/` | Source | Shows |
|---|---|---|
| `coder-boy-microbit.jpg` | `assets/product/bbc-micro-bit-club/lifestyle/child-holding-up-microbit-to-camera-with-him-blurred-in-background.jpg` | Boy holding up a micro:bit |
| `circuits-arcade-glow.jpg` | `assets/product/snap-circuits-arcade/lifestyle/top-view-board-in-dark-with-lights-with-kids-hands.png` | Hands on a lit Snap Circuits board |
| `builder-girl-makerzoid.jpg` | `assets/product/makerzoid-diverse-building-blocks/lifestyle/close-up-of-robot-build-with-girl-in-background.jpeg` | Girl with a gear-built figure |
| `builder-two-kids-makerzoid.jpg` | `assets/product/makerzoid-robot-master-premium/end-user/two-kids-playing-together-building-and-with-app-on-phone.png` | Two kids building at a table (customer photo) |
| `digger-kids-geodes.jpg` | `assets/product/national-geographic-break-open-5-geodes/lifestyle/kids-breaking-open-geodes-with-hammer.jpg` | Two girls cracking geodes |
| `palaeo-girl-dino-fossil.jpg` | `assets/product/national-geographic-dino-fossil-dig-kit/lifestyle/girl-digging-dino-fossil.jpg` | Girl with an uncovered dino skeleton |
| `space-family-rocket-launch.jpg` | `assets/product/national-geographic-light-up-air-rockets/lifestyle/dad-and-kids-playing-excited.jpg` | Family launching an air rocket |
| `space-boy-telescope.jpg` | `assets/product/nasa-lunar-telescope/lifestyle/child-looking-through-telescope.png` | Boy at a telescope |
| `chem-kids-pouring-volcano.jpg` | `assets/product/national-geographic-build-your-own-volcano/lifestyle/3-kids-boy-puring-liquid-into-bubbling-volcano.jpg` | Kids making a volcano erupt |
| `obj-nous-robot.jpg` | `assets/product/matatastudio-nous-ai-set/lifestyle/robot-white-background.jpeg` | Nous robot on white |
| `obj-snap-classic-board.jpg` | `assets/product/snap-circuits-classic-300/lifestyle/snap-circuits-classic-300-board.jpeg` | Snap Circuits board on white |
| `obj-robot-master-builds.jpg` | `assets/product/makerzoid-robot-master-premium/lifestyle/kit-with-example-project-builds.jpg` | Robot Master models and box |
| `obj-rock-specimens.jpg` | `assets/product/national-geographic-rock-mineral-starter-kit/lifestyle/whats-in-the-box.png` (cropped) | Rock and mineral specimens |
| `obj-air-rockets-launcher.jpg` | `assets/product/national-geographic-light-up-air-rockets/lifestyle/whats-in-the-box.jpg` (cropped) | Rockets and stomp launcher |
| `obj-volcano-kit.jpg` | `assets/product/national-geographic-build-your-own-volcano/lifestyle/whats-in-the-box.jpg` | Volcano kit contents |

## Ad copy (Meta)

One set per concept, so the test compares the images and not the words around them. Shared headline and button.

- **Headline:** STEM kits for ages 3 to 13+
- **Description:** Free delivery over R 1,500
- **Button:** Shop now

**Primary text, `feed-portrait-week`:**
Code a robot on Monday, snap together a circuit on Tuesday, and launch a rocket by Friday. We stock hands-on STEM kits across six categories, each chosen for its age fit. Free delivery over R 1,500.

**Primary text, `feed-portrait-curious`:**
Some kids want to code. Some want to dig for dinosaurs or look at the Moon. Shop hands-on STEM kits by what your child loves, from robots to volcanoes. Ages 3 to 13+.

**Primary text, `feed-portrait-specimens`:**
Robots, circuits, gears, rocks, rockets and a volcano you build yourself. Six kinds of STEM, picked by a specialist store. Find the kit that fits your child's age and interests.

## Constraints

- `builder-two-kids-makerzoid.jpg` is a customer photo from `end-user/`. Confirm we may use it in paid ads.

## Open questions

- Customer photo clearance (above).
- `feed-portrait-specimens`: the Robot Master and volcano shots still show packaging, and the object scale is uneven. Fine for a test; replace with clean cut-outs if it wins.
- `feed-portrait-curious` has no chemistry tile (the volcano is framed as geology). Intentional, per Dylan.
