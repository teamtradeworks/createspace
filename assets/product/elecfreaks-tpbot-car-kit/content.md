# Product Research: ELECFREAKS TPBot Car Kit for micro:bit

**Product Handle:** elecfreaks-tpbot-car-kit
**SKU:** EF08230
**Research Date:** 2026-11-18

---

## Shopify Reference

Product confirmed in Shopify (`gid://shopify/Product/9003871993993`, vendor ELECFREAKS, status UNLISTED, created 2026-11-18). The following are handled automatically by the storefront and are NOT included in this research:
- Pricing, discounts, and variants
- Product images
- Availability and stock status
- Delivery information

### Current Shopify Description
None. The description is empty, there are no tags and no product type.

### Product Attributes (from Shopify metafields)
No `custom.*` metafields are set yet. Suggested values from this research:
- **Age Range:** 8+ (`custom.minimum_age` = 8, leave maximum empty)
- **Batteries:** Required: 4 x 1.5V AAA. Included? Sources conflict (see Requirements). Retailers say NOT included.
- **Projects:** 19 core MakeCode cases + 4 AI Lens cases (23 total), plus 2 preset modes that need no coding
- **Guide:** Printed manual book in the box + free online tutorial wiki
- **Soldering:** Not required
- **Coding Platform:** MakeCode (blocks / JavaScript) and MicroPython
- **micro:bit:** NOT included. Requires a BBC micro:bit (V1 or V2) for programming. Preset modes work without one.

---

## Researched Content (Static)

### Manufacturer Information

**Source:** ELECFREAKS Wiki, "TPBot(TianPeng)(EF08230)" (source markdown on GitHub: https://github.com/elecfreaks/learn-en/tree/master/microbitKit/TPbot_tianpeng ; live wiki: https://wiki.elecfreaks.com/en/microbit/microbit-smart-car/microbit-tpbot)

### Product Overview

Official introduction (verbatim, ELECFREAKS wiki):

> TP Bot is a smart coding car for micro:bit. It can be regarded as a toy for its preset functions that do not need a micro:bit; it can also be used as a teaching aid at the same time, you can code it via the micro:bit or make extensions for the other modules and the Lego bricks to develop children's imagination and creativity.

Retailer copy (Little Bird Electronics, verbatim, appears to be translated ELECFREAKS shop copy):

> **Graphical Programming:** Welcome to makecode graphical programming. It is easier for children to understand and be interested in programming.

> **Modular and compatible with building bricks:** As an advanced educational tool, TPBot Smart Car is compatible with building blocks, allowing your kids to build and test different structures. At the same time, this smart car is also expandable with electronic modules, allowing your children to rely on the expandable smart functions, which they can freely explore and add to the car.

> **Easy To Program:** Developed by the BBC, the micro:bit motherboard is a portable computer that can be programmed to operate multiple functions, making it easy for children to learn to program while enjoying travel as a fun activity. Use it to play football, turn it into a police car and organize chases, make it visible in the dark by automatically turning on the lights, or make it a transport car - the possibilities are as endless as you can imagine. It's up to you to use your creativity to make it happen!

> **Unique Design:** A gadget that stimulates children's imagination must necessarily be versatile. That's why the ELECFREAKS micro:bit TPBot Car Kit features interlocking joints on both sides of the body and dimples on the top, allowing you or your kids to create a custom look and express any creative features you want to you have got. At the same time, our TPBot car also won America's IDEA Design Bronze Award, its unique design and cute shape are very attractive to teachers!

Feature points from PiShop US listing (paraphrased by fetch tool; original not quotable in full):
- ABS body, "not a naked car" (fully enclosed shell, better colour and hardness than bare-PCB robot cars)
- Two modes: (1) line following and obstacle avoidance without a micro:bit; (2) with a micro:bit inserted, a programmable smart car
- "Eye patch" (headlight) colour customisable through graphical MakeCode, glows in the dark
- Extension interfaces: RJ11 (4P4C) sensor ports and a 4-way servo interface (3-pin)
- Building block extension: compatible with building bricks
- Lock-joints on both sides of the body and bumps on top for personalising appearance
- "Suitable for ages over 8 years old."

### Specifications

From the official ELECFREAKS parameter table (wiki image, transcribed):

| Technical Item | Parameter |
|---|---|
| Controller | BBC micro:bit |
| Coding platform | MakeCode |
| Dimensions with package | 195 x 145 x 104 mm |
| Dimensions without package | 128 x 113 x 90 mm (without micro:bit) |
| Gross weight with package | 766 g |
| Diameter of wheels | 62 mm |
| Diameter of omni wheel | 14 mm |
| Net weight without package | 363 g (batteries, micro:bit and accessories not included) |
| Power supply | 4 x 1.5V AAA batteries |
| Working voltage | 4.5V–6V |
| Working current | 0.1A–1.5A |
| Battery life | Theoretically run for 1.5 hours in continuous operation |
| Connections | P1, P8, P2, P12 and 2-way IIC ports |
| RGB headlights | "13 * RGB" (as printed in table; the car has two RGB headlights, figure unclear) |
| Motor type | 130 motor (torque 55 N*M as printed) |
| Ultrasonic sound sensor | HC-SR04 (2–400 cm non-contact distance detecting, accuracy 3 mm) |
| Line-following sensor | ITR20001 photoelectric correlated cell |
| Compatibility | Lego bricks connections |

BerryBase (EU retailer, product no. EF08230) spec list:
- Controller: micro:bit board (not included)
- Programming language: MakeCode graphical programming / Python
- Main functions: Entertainment mode / Programming mode
- Compatibility: Standard brick connector
- Expandable: 4-way sensor connection and 4-way servo connection
- Dimensions: 11.3 x 12.8 x 9.0 cm
- Battery: 4x 1.5V (AAA) dry batteries

Hardware layout (from wiki labelled diagram, rear of car): AAA battery holder (top), sensor connections (RJ11, left pair), IIC ports (RJ11, right pair), servo connection (centre pin header), power switch (single button), power indicator LED.

Wiki note on servos: "The connection to servos shall be inserted vertically with the Ground wire in the bottom."

### Features

- **Works straight out of the box without a micro:bit** – built-in line-tracking and obstacle-avoidance mode
- **Programmable with micro:bit** – slot the micro:bit in and code it in MakeCode blocks, JavaScript or MicroPython
- **Built-in sensors:** ultrasonic distance sensor (front "eyes"), 2 line-tracking sensors (underneath), 2 RGB headlights
- **Expandable:** 4 RJ11 ports (2 sensor + 2 IIC) for ELECFREAKS PlanetX sensors (potentiometer, rainbow LED, gesture sensor, colour sensor, Smart AI Lens), plus servo header for up to 4 servos
- **Brick-compatible:** interlocking joints on both sides and studs on top accept LEGO-compatible bricks so kids can customise the look or build attachments (e.g. sweeper, bulldozer, transporter)
- **Enclosed ABS shell** – robust, rounded "cute" design, no exposed circuit board
- **Award:** IDEA (International Design Excellence Awards, USA) Design Bronze Award (per ELECFREAKS shop copy; not independently verified)
- **Includes line-tracking map and stickers** for decorating and for line-following activities

### Preset (no micro:bit) mode – User Guide (verbatim, ELECFREAKS wiki)

> - TPBot is available to operate even without the micro:bit, here are the instructions:
> - Press the power button to enter into its standby mode, here lights on the power indicator and the LEDs in breathing green.
> - While in its standby mode, press the power button to enter into the line-tracking & obstacles-avoidance mode, here lights on the LEDs in rainbow mode at the same time.
> - While in its line-tracking & obstacles-avoidance mode, the headlights turn to red and it stops moving if an obstacle was detected.
> - While in its line-tracking & obstacles-avoidance mode, press the power button to get back to the standby mode.
> - No matter in its line-tracking & obstacles-avoidance mode or the standby mode, double click the power button to power off the TPBot.

### What's Included

Official ELECFREAKS wiki "Components":
- TPBot Smart Car x 1
- Sticker(s) x 1
- Map x 1 (line-tracking map)
- Manual book x 1
- Batteries x 4 (see conflict note below)

BerryBase "Scope of delivery": 1x TPBot Smart Car, 1x sticker, 1x user manual, 1x line tracking map (no batteries listed).

**Not included:** BBC micro:bit board; USB cable; servos and PlanetX sensors used in cases 15–19; Smart AI Lens used in cases 20–23; batteries (per retailers).

## Retailer Information

### Little Bird Electronics (AU)
**Source:** https://littlebirdelectronics.com.au/products/tpbot-stem-car-micro-bit-robot

Marketing copy quoted above (Graphical Programming, Modular, Easy to Program, Unique Design). Mentions IDEA Design Bronze Award. No spec table, age or package list.

### PiShop US
**Source:** https://www.pishop.us/product/elecfreaks-micro-bit-tpbot-car-kit-without-micro-bit-board/

Title: "ElecFreaks micro:bit TPBot Car Kit (Without micro:bit Board)", MPN EF08230. Key tip line (verbatim): "[TIPS] WITHOUT micro: bit and BATTERY!!! Suitable for ages over 8 years old. Get powerful technical support." Suggested add-ons: Smart AI Lens Kit, BBC micro:bit V2.

### BerryBase (AT/DE)
**Source:** https://www.berrybase.at/en/elecfreaks-tpbot-smart-car-for-micro-bit-graphical-programming-expandable-lego-compatible

Title: "ELECFREAKS TPBot Smart Car for micro:bit, graphical programming, expandable, LEGO-compatible". Features at a glance: graphical programming; modular and compatible with building blocks; easy to program; versatile design (interlocking joints and studs); compatible with ELECFREAKS Interactive Coding Accessories Pack. Safety: "Adult supervision required for children."

### RS Components
**Source:** https://za.rs-online.com/web/p/bbc-micro-bit-add-ons/2233953 (RS stock no. 2233953). Page blocked automated access. Search snippet confirms: controller BBC micro:bit, coding platform MakeCode, power 1.5V AAA batteries, interlocking joints and recesses on top, compatible with building bricks. Notable: available through RS South Africa.

### Requirements
- **micro:bit:** BBC micro:bit V1 or V2 required for programming (not included). Preset line-tracking/obstacle-avoidance mode works without one. Case 12 "micro:bit Remote Control" and case 13 need a **second** micro:bit as the remote. Some built-in micro:bit features (sound sensing) need V2.
- **Batteries:** 4 x 1.5V AAA. Inclusion is unclear: the ELECFREAKS wiki lists "Batteries * 4" in components, but PiShop says "WITHOUT micro: bit and BATTERY" and BerryBase omits them from the scope of delivery. **Check a physical box before stating on the page.**
- **Software:** Microsoft MakeCode for micro:bit (free, browser-based at makecode.microbit.org) with the "tpbot" extension; or the micro:bit Python Editor (python.microbit.org) with ELECFREAKS' `TPBot.py` library.
- **OS Compatibility:** Any device with a modern web browser (Windows, macOS, ChromeOS, Linux). MakeCode/micro:bit apps also exist for iOS and Android (Bluetooth upload).
- **Tools:** None. No assembly or soldering; the car arrives fully built. A USB cable is needed to load code onto the micro:bit (usually comes with a micro:bit, not with TPBot).
- **Optional for advanced cases:** ELECFREAKS PlanetX modules (potentiometer, rainbow LED, gesture sensor, colour sensor), a 360-degree servo, Joystick:bit, Smart AI Lens.

## Learning Outcomes (Expanded)

### Why Hands-On Learning Works
- A meta-analysis of educational robotics in primary classrooms (Mukhasheva et al., 2023, European Journal of Educational Research) reported a moderate positive effect on cognitive outcomes vs traditional teaching (Hedges' g = 0.64, 95% CI 0.44–0.84). Small evidence base (8 studies), so treat as indicative.
- A 2023 review and meta-analysis in the Journal of Research on Technology in Education (57 studies, 10,913 participants) found educational robotics and STEM have a positive impact on knowledge, skills and attitudes, with skills benefiting most.
- A multilevel meta-analysis across K-16 (Ouyang & Xu, 2024, International Journal of STEM Education) found moderate effects on learning performance and attitudes, but not a significant effect on computational thinking. Counterpoint: robotics reliably improves engagement and learning; CT gains depend on how it's taught.
- A 2025 PRISMA review (11 studies in compulsory education) concluded educational robotics is an effective tool for developing computational thinking in basic education, noting small samples.
- Key insight: a physical robot makes code visible. When a child changes a number and the car instantly turns faster or stops sooner, abstract ideas (variables, conditions, loops) become something they can see and test.

### STEM Skills

**Programming Concepts:**
- Sequencing (on start / forever blocks)
- Events (button A/B/A+B presses, radio received)
- Conditionals (if/else on sensor readings)
- Loops (forever loops, repeated flashing)
- Variables (storing distance readings)
- Comparison and logic operators (`i < 15 and i ≠ 0`, ranges between 10 and 20)
- Random numbers (random wheel speeds, random headlight colours)
- Functions/modes (colour cards trigger different behaviours)
- Text-based coding: MicroPython via the TPBot Python library

**Robotics & Sensors:**
- Motor control and differential steering (independent left/right wheel speeds, negative speed = reverse)
- Ultrasonic distance sensing (HC-SR04, 2–400 cm)
- Infrared line tracking (two ITR20001 sensors)
- Light sensing (automatic headlights, seeking light)
- Feedback loops: sense → decide → act (obstacle avoidance, following distance)
- Servos (sweeper attachment)
- Add-on sensors: potentiometer (analogue input), gesture, colour, AI vision (Smart AI Lens)

**Communications & Electronics:**
- Wireless radio between two micro:bits (radio groups, sending numbers)
- Accelerometer/tilt control
- RGB colour mixing in LED headlights
- Ports and connectors (RJ11 sensor/IIC ports, servo header)

**Engineering & Design:**
- Customising and building attachments with LEGO-compatible bricks
- Testing and iterating on speed/threshold values
- Real-world analogues: autonomous vehicles, parking sensors, adaptive cruise control, robot vacuum cliff sensors

### Complete Project, Challenge & Activity List

**Summary:**
- **Preset modes (no coding):** 2 (standby light mode; line-tracking & obstacle-avoidance mode)
- **Core projects (TPBot only + micro:bit):** 14 (cases 1–14; cases 12–14 need a second micro:bit or Joystick:bit as remote)
- **Expansion projects (extra modules needed):** 5 (cases 15–19)
- **AI Lens projects (Smart AI Lens needed):** 4 (cases 20–23)
- **Python samples:** separate "TPBot Samples for Python" page (Sample 1: drive at full speed; Sample 2: random headlight colours; further samples on page)
- **Total official cases:** 23 (19 for TPBot alone/with common add-ons + 4 AI Lens). Each case ends with an "Exploration" prompt that can serve as an open-ended challenge.

All cases use MakeCode with the "tpbot" extension and include a shareable MakeCode project link.

| # | Name | Type | Description | Skills/Concepts Taught |
|---|------|------|-------------|----------------------|
| – | Standby mode | Activity (no micro:bit) | Press power: indicator lights and headlights breathe green. | Power on/off, modes |
| – | Line-tracking & obstacle-avoidance mode | Activity (no micro:bit) | Press power again: rainbow lights, car follows the line on the map and stops with red lights at obstacles. | Intro to sensors and autonomous behaviour |
| 1 | Running Control | Project | Learn to control TPBot's movement by setting both wheel speeds. | Motors, speed values, sequencing |
| 2 | Light Control | Project | Buttons A, B and A+B switch the headlights red, blue and green. | Events, RGB colour |
| 3 | Line Tracking | Project | Car follows a black line by slowing one wheel when a sensor sees black. | IR sensors, conditionals, differential steering |
| 4 | Obstacle-avoidance Driving | Project | Drives forward, and if something is closer than 15 cm, stops, flashes, reverses and turns. | Ultrasonic sensor, variables, logic (AND), loops |
| 5 | Automatic Lamp | Project | Headlights switch on white automatically when it gets dark. | Light sensing, thresholds, if/else |
| 6 | Drive at Random | Project | Wheels get random speeds between -100 and 100 every 2 seconds. | Random numbers, negative speeds |
| 7 | Here Comes the Police | Project | Drives forward with headlights flashing red and blue like a police car. | Forever loops, timing/pauses |
| 8 | Parking at A Set Point | Project | Drives until both line sensors detect a black line, then stops (parks). | Sensor states, conditions |
| 9 | Seeking Light | Project | Moves forward towards light, circles when it's too dark. | Light sensing, thresholds |
| 10 | Fall-arrest TPBot | Project | Black tape on table edges: car reverses and turns when it detects the edge, so it never falls off. | Line sensors as cliff sensors, real-world safety logic |
| 11 | Following with A Fixed Distance | Project | Keeps 10–20 cm behind a car in front: stops, reverses or drives forward. | Ranges, nested conditionals, feedback control (cruise control) |
| 12 | micro:bit Remote Control | Project | A second micro:bit sends button presses over radio: A = left, B = right, A+B = forward. | Radio communication, sender/receiver |
| 13 | Remote Control with micro:bit Accelerometer | Project | Tilt the remote micro:bit to steer the car. | Accelerometer, maths (dividing values), radio |
| 14 | Remote Control with Joystick:bit | Project (needs Joystick:bit) | Drive the car with a joystick gamepad over radio. | Analogue joystick values, radio |
| 15 | Speed Adjustable TPBot | Project (needs PlanetX potentiometer) | Turn a knob to change the car's speed. | Analogue input, mapping values |
| 16 | The Dazzling Lights | Project (needs PlanetX rainbow LED) | Rainbow LED strip cycles red/blue like police lights (button A on, B off). | LED strips, loops |
| 17 | Gesture-controlled TPBot | Project (needs PlanetX gesture sensor) | Wave hands to drive forward, back, left and right. | Gesture sensing, IIC modules |
| 18 | Color-controlled TPBot | Project (needs colour sensor + rainbow LED) | Show coloured cards: white = forward, red = stop/random lights, yellow = obstacle-avoid, green = line-follow. | Colour sensing, modes/state machines |
| 19 | Sweeper | Project (needs 360° servo) | Attach a servo arm so the car sweeps as it drives. | Servos, mechanical design |
| 20 | Road Indicator for TPBot with AI Lens | Project (needs Smart AI Lens) | Car reads road-sign cards and drives accordingly. | Computer vision, AI image recognition |
| 21 | Color Recognition with TPBot | Project (needs Smart AI Lens) | Recognise a colour and show it on the headlights. | AI colour recognition |
| 22 | Balls Tracking with TPBot | Project (needs Smart AI Lens) | Car tracks and follows a ball. | Object tracking, AI vision |
| 23 | Face-tracking with TPBot | Project (needs Smart AI Lens) | Car turns to follow a face. | Face detection, AI |

Retailer copy also suggests open-ended play: "play football", "police car ... chases", "transport car".

**Difficulty Progression:** Ordered by difficulty. Cases 1–2 introduce motors and lights; 3–11 add sensor-driven autonomous behaviour with growing logic complexity; 12–14 introduce wireless remote control; 15–19 add external modules; 20–23 add AI vision. A child can do cases 1–11 with only TPBot and one micro:bit.

### Life Skills & Character Development

**Critical Thinking & Problem-Solving:**
- Every behaviour (avoid an obstacle, don't fall off the table, follow a car) is a real problem broken into sense → decide → act steps
- Tuning thresholds (how close is "too close"?) teaches testing hypotheses

**Resilience & Growth Mindset:**
- Instant physical feedback: if the car crashes, kids adjust the code and try again
- ELECFREAKS FAQ notes that when the car doesn't respond, low batteries are a likely cause: real-world debugging

**Emotional Regulation:**
- Small, quick iterations keep frustration manageable; the preset mode gives a success moment before any coding

**Confidence & Self-Esteem:**
- Research (quasi-experimental study, 97 children aged 4–6) found a year-long robotics curriculum group reported greater confidence in building, following instructions and solving problems than a control group
- Robotics studies with older students show significant self-efficacy gains tied to "mastery experiences"; gains were consistent across genders (Altıok & Üçgül, 2024)

**Creativity & Innovation:**
- Brick-compatible body invites building custom shells, bumpers, trailers and attachments
- Stickers for personalising
- Exploration prompts at the end of each case encourage kids to extend the code

**Collaboration:**
- Remote-control and car-following cases work well in pairs or groups (one child codes the remote, another the car)

### Future-Ready Skills & Career Connections
- WEF Future of Jobs Report 2025: AI and big data, networks and cybersecurity, and technological literacy are the three fastest-growing skills to 2030; 170 million new roles created and 92 million displaced (22% of jobs disrupted), net +78 million. Survey of 1,000+ employers, 14 million workers, 55 economies.
- TPBot's behaviours mirror real technology: obstacle avoidance and following distance = autonomous vehicles and adaptive cruise control; fall-arrest = robot vacuum cliff sensors; line tracking = warehouse robots (AGVs); AI Lens cases = computer vision.
- Career pathways: robotics engineering, software development, mechatronics, automotive/autonomous vehicle engineering, AI/machine learning, product design.

### What Parents Will Observe
- Excitement on day one: the car drives itself on the included map before any code is written
- Child explaining cause and effect ("it stops because the sensor sees something within 15 cm")
- Experimenting with numbers (speeds, distances) and predicting results
- Building custom shapes on the car with LEGO-compatible bricks
- Moving from block coding to more complex logic, and possibly Python
- Inviting siblings/friends to play (remote control, police chases, races)

### Curriculum Alignment
- micro:bit is widely used in schools globally (UK KS2/KS3 computing) and MakeCode is the standard micro:bit environment
- South Africa: relevant to the CAPS Coding and Robotics subject (being phased in Grade R–9) – algorithms, sequencing, conditionals, sensors and robotics. (Alignment inferred, not stated by ELECFREAKS.)
- Age/grade: 8+ (approx. Grade 3 upwards); Python content suits ages 11+

## Additional Notes

### Quality & Safety
- Enclosed ABS body (no exposed PCB)
- IDEA Design Bronze Award (USA) per ELECFREAKS copy
- Official safety instructions (ELECFREAKS wiki, summarised): don't block the wheels or overload (motor overheating); don't disassemble or modify; keep away from water; don't place where it can fall; clean with a cotton cloth and alcohol, not water/detergent; keep paper, dust and gum out of the ports; keep away from fire; remove batteries after use
- BerryBase: "Adult supervision required for children."
- No CE/other certification details found

### Longevity
- 23 official cases plus Python samples
- Expandable with PlanetX sensors, servos, Joystick:bit, Smart AI Lens (ELECFREAKS sells these; ELECFREAKS Interactive Coding Accessories Pack listed as compatible)
- LEGO-compatible body for endless physical customisation
- Free, maintained MakeCode "tpbot" extension; large global micro:bit community
- The micro:bit can be reused in other projects

### Build Time
- No assembly: ready to use out of the box (insert batteries, press power)
- Each core case is a short single-session project (roughly 10–30 minutes, estimated; not stated by ELECFREAKS)

### Unique Features
- Works without a micro:bit (preset self-driving mode) – rare among micro:bit cars
- Fully enclosed, toy-like body vs bare-PCB competitors (e.g. Cutebot)
- LEGO-compatible studs and side joints
- Award-winning design
- AI vision expansion path (Smart AI Lens)

### Related Products (possible add-ons)
- BBC micro:bit V2 (required for programming)
- ELECFREAKS Smart AI Lens Kit (cases 20–23)
- ELECFREAKS Joystick:bit (case 14)
- ELECFREAKS Interactive Coding Accessories Pack / PlanetX modules (cases 15–18)
- Distinct product: "TPBot Edu" is a newer rechargeable version with different cases; do not mix its content with this kit

## Research Gaps

- **Battery inclusion:** wiki says 4 batteries included; retailers say batteries NOT included. Check a physical unit.
- **micro:bit inclusion:** Shopify title "TPBot Car Kit for micro:bit" doesn't say. Official EF08230 is the "without micro:bit board" version; confirm what CREATESPACE ships.
- **Official ELECFREAKS shop page:** shop.elecfreaks.com rate-limited/blocked, elecfreaks.com/tpbot.html returned a 500 error, wiki.elecfreaks.com failed TLS verification. Wiki content was taken from ELECFREAKS' public GitHub source instead.
- **Headlight count:** spec table says "13 * RGB"; unclear (visibly two headlights).
- **Manual book:** page count and content not found.
- **Light sensor:** cases 5 and 9 use light intensity; unclear whether the sensor is on TPBot or uses the micro:bit's LED-matrix light sensing.
- **Full list of Python samples:** only first two confirmed.
- **No Amazon listing found** for this exact SKU.
- **Safety certifications** (CE, etc.) not found.

## Sources

### Product Information
1. ELECFREAKS Wiki source (GitHub), TPBot introduction, safety and cases 1–23: https://github.com/elecfreaks/learn-en/tree/master/microbitKit/TPbot_tianpeng
2. ELECFREAKS Wiki (live): https://wiki.elecfreaks.com/en/microbit/microbit-smart-car/microbit-tpbot
3. Little Bird Electronics: https://littlebirdelectronics.com.au/products/tpbot-stem-car-micro-bit-robot
4. PiShop US: https://www.pishop.us/product/elecfreaks-micro-bit-tpbot-car-kit-without-micro-bit-board/
5. BerryBase: https://www.berrybase.at/en/elecfreaks-tpbot-smart-car-for-micro-bit-graphical-programming-expandable-lego-compatible
6. RS Components South Africa: https://za.rs-online.com/web/p/bbc-micro-bit-add-ons/2233953
7. ELECFREAKS shop (not readable): https://shop.elecfreaks.com/products/elecfreaks-micro-bit-tpbot-car-kit-without-micro-bit-board

### Educational Research
8. Mukhasheva et al. (2023), The Impact of Educational Robotics on Cognitive Outcomes in Primary Students: https://eu-jer.com/the-impact-of-educational-robotics-on-cognitive-outcomes-in-primary-students-a-meta-analysis-of-recent-studies
9. Educational robotics and STEM in primary education: a review and a meta-analysis (JRTE 2023): https://aminer.org/pub/63ec88cd90e50fcafdf9d054/educational-robotics-and-stem-in-primary-education-a-review-and-a-meta
10. Ouyang & Xu (2024), International Journal of STEM Education: https://link.springer.com/article/10.1186/s40594-024-00469-4
11. Frontiers in Education (2024): https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1480908/epub

### Hands-On Learning Benefits
12. Altıok & Üçgül (2024), Effects of Robotic Coding on Computational Thinking Skills of Secondary School Students: https://cjlt.ca/index.php/cjlt/article/view/28607
13. Robotics and young children's self-efficacy (MDPI Education Sciences 2025): https://www.mdpi.com/2227-7102/15/11/1436
14. ITEEA STEM Sparks, July 2026: https://www.iteea.org/news/stem-sparks-july-2026

### Future Skills & Careers
15. WEF Future of Jobs Report 2025 press release: https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/
16. WEF Future of Jobs Report 2025, Skills outlook: https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/
