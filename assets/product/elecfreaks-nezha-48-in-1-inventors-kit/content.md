# Product Research: ELECFREAKS Nezha 48-in-1 Inventor's Kit

**Product Handle:** elecfreaks-nezha-48-in-1-inventors-kit
**SKU:** EF08232
**Research Date:** 2026-11-18

---

## Shopify Reference

Product confirmed in Shopify via the Storefront API (`gid://shopify/Product/9003782373513`, vendor ELECFREAKS, single "Default Title" variant). The createspace-shopify MCP server failed to connect during this session, so the product was looked up directly against the Storefront GraphQL API using the storefront's own credentials.

The following are handled automatically by the storefront and are NOT included in this research:
- Pricing, discounts, and variants
- Product images
- Availability and stock status
- Delivery information

### Current Shopify Description
*(Empty. No description, product type or tags are set in Shopify.)*

### Product Attributes (from Shopify metafields)
**None of the custom metafields are set yet.** Recommended values based on this research:

- **Age Range (`custom.minimum_age`):** 8 (manufacturer tags the kit "8+"; leave `maximum_age` empty)
- **Batteries (`custom.batteries_required` / `custom.batteries_included`):** No replaceable batteries needed. The Nezha expansion board has a built-in rechargeable 900mAh lithium battery, charged by USB (cable included). Suggest `batteries_required: false`.
- **Projects (`custom.projects`):** "48" (48 official wiki cases can be built with the kit alone plus a micro:bit; 76 cases exist in total if you add PlanetX expansion modules). "48+" is also accurate.
- **Guide (`custom.guide`):** "Online wiki with 48+ step-by-step builds" (no printed manual in the packing list; instructions, assembly diagrams, assembly videos and code are on the ELECFREAKS wiki)
- **Soldering (`custom.soldering`):** false (plug-and-play RJ11 connectors)
- **Coding Platform (`custom.coding_platform`):** "Block & Text" (Microsoft MakeCode blocks, JavaScript, Python; manufacturer also lists C++)

> **Important:** The BBC micro:bit is **NOT included** in this SKU (EF08232 is the "Without micro:bit Board" version). ELECFREAKS sells a separate bundle with the micro:bit (EF08232+EF01037). A micro:bit V2 is strongly recommended, since several cases use the V2's built-in microphone and speaker.

---

## Researched Content (Static)

### Manufacturer Information

**Source:** ELECFREAKS official shop (https://shop.elecfreaks.com/products/elecfreaks-micro-bit-nezha-48-in-1-inventors-kit-without-micro-bit-board) and ELECFREAKS Wiki (https://wiki.elecfreaks.com/en/microbit/building-blocks/nezha-inventors-kit)

**Official name on the ELECFREAKS shop:** "ELECFREAKS micro:bit Nezha 48-in-1 Inventor's Kit, Creative STEM Robotics Kits for Kids to Inspire STEM Project ideas"
**Variant name:** "Nezha Inventor's Kit Without micro:bit Board" (SKU EF08232)
**Manufacturer:** ELECFREAKS (Shenzhen EF Technology Co., Ltd)
**Category:** micro:bit robotics / building-block inventor kit
**Manufacturer tags:** 8+, Building Block Kits, Car Kits, Robot Kits, micro:bit Kits, Nezha Kits, Best Seller

> **Do not confuse with:** Nezha Inventor's Kit V2 (EF08288), a newer, different product with different cases. ELECFREAKS's FAQ says the main difference between the 48-in-1 and V2 kits is the cases they're designed for.

### Product Overview

Manufacturer description (verbatim, ELECFREAKS shop):

> Based on Planet X sensors, ELECFREAKS micro:bit Nezha 48 IN 1 Inventor's Kit is designed for BBC micro:bit. It contains multiple sensors and modules including LED, trumpet, soil moisture sensor, ultrasonic sensor, crash sensor, line-tracking sensor, etc., and also over 400 pieces of building bricks. We've built over 48 cases with this kit and the Interactive coding accessories pack aiming to cultivate and inspire kids' creativity and imagination. Make each kid be an inventor from ELECFREAKS micro:bit Nezha 48 IN 1 Inventor's Kit.

(Note: "trumpet" in ELECFREAKS copy is a mistranslation of "trimpot", i.e. the potentiometer. There is no trumpet/speaker module in the box.)

Wiki introduction (verbatim):

> Based on Planet X sensors, Nezha Inventor's Kit is designed for BBC micro:bit. It contains multiple sensors and modules including LED, trimpot, soil moisture sensor, ultrasonic sensor, crash sensor, line-tracking sensor, etc., and also with over 400 pieces of bricks. We've built over 36 cases with this kit aiming to cultivate and inspire kids' creativity and imagination. Make each kid be an inventor from Nezha Inventor's Kit !

Retailer description (elektronicavoorjou.nl, verbatim):

> This is the ELECFREAKS micro:bit Nezha 48-in-1 Inventor's Kit. The kit is specially made for the BBC micro:bit (not included). It opens up a world of engineering discovery for children. This comprehensive kit contains over 400 components and various sensors and modules, such as an LED, trumpet, soil moisture sensor, ultrasonic sensor, crash sensor and line following sensor. With this set, children can perform over 48 different tasks, encouraging their creativity and imagination. The Interactive Coding Accessories Pack makes learning to code and invent even more fun. This kit is perfect for inspiring young inventors and giving them hands-on experience in the world of electronics and coding.

### Features

Manufacturer feature blocks (verbatim, ELECFREAKS shop):

- **Smart Wiring Port:** "Unique color identification, identify the ports of digital, analog, and IIC with the colored labels. Also using the RJ11 connector is convenient for children to use and connect."
- **Compatible Rich:** "Compatible with the most well-known brand building blocks on the market." (i.e. LEGO Technic; an independent reviewer also confirms Fischertechnik compatibility)
- **Accessories Rich:** "400+ particles, 11 electronic modules."
- **Expand Rich:** "Our Product can support up to 40+ sensors. Like LED, trumpet, soil moisture sensor ultrasonic sensor, crash sensor, line-tracking sensor, etc..."
- **Rich Case:** "48+ basic cases, more cases can be expanded with our accessories."
- **Support Multiple Programming:** "Four general programming methods, one set to learn four programming languages."
- **Easy to Store & Carry:** "Nezha kits come with a plastic toolbox for easy storage. The compartments of various sizes inside make storage more convenient and fast. And easy to carry."
- **Long Battery Life:** "Built-in lithium battery. With one charge, you can take 3 lessons."

### Specifications

Nezha expansion board (manufacturer spec table):

| Item | Parameter |
|------|-----------|
| Shell | ABS fireproof shell |
| Circuit board | FR4 epoxy resin board, fire rating 94V0 |
| Capacity | 900mA lithium battery |
| Size | 60 × 82 × 28 mm |
| Communication protocol | IIC, UART, and SPI |
| Program type | MakeCode, JavaScript, Python and C++ |
| Control board | micro:bit |
| Input voltage | 5V |
| Charging current | 1A |

Additional board details from an independent hands-on review (magazinmehatronika.com, translated from Serbian):
- micro:bit slots into the top of the Nezha board and sits firmly; the full LED matrix stays visible and the edge pins stay accessible. Works with **both micro:bit V1 and V2**.
- Micro USB port on the side charges the built-in battery. A full charge should give **up to about 2 hours** of use, depending on how many motors are connected.
- Multi-colour status LED: flashes red when the battery is flat; changes red → yellow → green while charging; glows blue during use.
- **3 × I2C ports** (one side) and **4 × digital I/O ports** (other side, the first two can also be used as analogue inputs). Ports are colour-coded and each PlanetX module has a matching colour, so children don't need to know which signal type goes where.
- **4 × motor outputs (M1–M4)**, max 3.7V, plus four pairs of gold connectors for Fischertechnik motors (up to 9V) that mirror M1–M4.
- **4 × servo outputs (S1–S4)**.
- All connections use RJ11 ("telephone-style") plugs that click in.

### What's Included

From the official ELECFREAKS packing list image (micro:bit not included):

| Item | Qty |
|------|-----|
| Nezha Expansion Board (with built-in rechargeable battery) | 1 |
| Red LED module (PlanetX) | 1 |
| Green LED module (PlanetX) | 1 |
| Yellow LED module (PlanetX) | 1 |
| Crash Sensor (PlanetX, a push button/collision switch) | 1 |
| Line-tracking Sensor (PlanetX) | 1 |
| Ultrasonic Sensor (PlanetX, a.k.a. Sonar:bit) | 1 |
| Potentiometer / Trimpot (PlanetX) | 1 |
| Soil Moisture Sensor (PlanetX) | 1 |
| 360° Motor (red, LEGO-compatible) | 2 |
| 360° Servo (grey Geekservo, LEGO-compatible) | 1 |
| Wheel | 2 |
| Universal Wheel (ball caster) | 1 |
| Long RJ11 4P4C wires | 3 |
| RJ11 4P4C wires | 3 |
| USB cable (for charging) | 1 |
| Blocks Package-1 | 1 |
| Blocks Package-2 | 9 |
| Blocks Package-3 | 1 |
| Line-tracking Map | 1 |

Also noted by the independent reviewer:
- Plastic carry/storage toolbox with a removable sorting tray (electronics on top, bricks underneath). The lid is shaped to stack boxes securely. The box has slots for dividers (up to 15 compartments) but dividers aren't included.
- A blue brick-separator / pin-removal tool.
- Rubber bands that act as drive belts.
- Bricks are LEGO Technic-style beams, axles, pins and gears; the reviewer found the plastic quality indistinguishable from genuine LEGO. Long beams have alternating markings that make counting holes easier.

**Electronic module count:** 8 PlanetX sensor/output modules + 2 motors + 1 servo = the "11 electronic modules" in ELECFREAKS copy.

## Retailer Information

### Little Bird Electronics (Australia)
**Source:** https://littlebirdelectronics.com.au/products/nezha-inventor-s-kit-for-micro-bit-without-micro-bit-board

Lists SKU EF-EF08232, "NEZHA Inventor's kit for micro:bit (without micro:bit board)". Uses the older wiki description ("We plan to write 36 cases for this kit in our wiki...").

### Bot'n Roll (Portugal)
**Source:** https://www.botnroll.com/en/bbc-microbit/4765-elecfreaks-micro-bit-nezha-48-in-1-inventor-s-kit-without-micro-bit-board.html

"Nezha 48 IN 1 Inventor's Kit for micro:bit (Without micro:bit Board) - ELECFREAKS EF08232". Repeats the full manufacturer feature list and spec table.

### Other retailers carrying EF08232
- Cool Components (UK): "micro:bit Nezha 48 IN 1 Inventor's Kit"
- RS Components (incl. RS South Africa, za.rs-online.com, stock no. 2233954): "Elecfreaks Nezha Inventor's Kit for Micro:bit"
- elektronicavoorjou.nl (NL), Congeriem (US), The Pi Hut (UK, "Compatible with the BBC micro:bit (V1 and v2)")

### Customer / reviewer insights
Independent review, magazin Mehatronika (Aleksandar Dakić, July 2024, Serbian):
- Pros: huge PlanetX sensor ecosystem compatible with Fischertechnik and LEGO Technic; very good quality parts, the brick count alone justifies the price; no need to understand hardware for the system to work; modern pastel colours.
- Cons: the wiki models look fairly basic visually; would have liked a Wi-Fi module included; instructions should show axle lengths more clearly; no box dividers.
- "The manufacturer has provided instructions and programs for 76 projects on its site. Note that you won't be able to build all of them without buying some of the ~40 available PlanetX sensors; with the base kit, 48 can be built."
- Instructions are very visual: never more than a couple of parts added per step, highlighted with a red frame.
- "No knowledge of electrical laws or hardware is needed... everything works plug-and-play, and children can easily grasp automation concepts." Blocks handle everything; children focus on how changing parameters affects the whole system.
- Recommends this as the first kit to buy in the Nezha ecosystem.
- Reviewer built the motorcycle (Case 40): one servo for steering, one DC motor on the rear wheel; suggested extensions like adding lights or a third wheel to make a tricycle.

### Requirements
- **micro:bit:** BBC micro:bit V1 or V2 required, **not included**. V2 recommended (Cases 15, 23, 24, 27 and most cases from 49 onward specify micro:bit V2; V2 adds the built-in microphone and speaker).
- **Batteries:** None to buy. Built-in rechargeable 900mAh lithium battery in the Nezha board; charges via the included USB cable (5V, 1A). Don't use the board while charging (manufacturer safety note).
- **Software:** Microsoft MakeCode for micro:bit (free, browser-based at makecode.microbit.org) with the "nezha" and "PlanetX" extensions. Also programmable in JavaScript and Python (MakeCode/Python editor).
- **OS Compatibility:** Any device with a modern web browser (Windows, macOS, ChromeOS, Linux). micro:bit can also be flashed over Bluetooth from the micro:bit app on iOS/Android.
- **Tools:** None required. A brick-removal tool is included. A computer/tablet and a micro USB cable for the micro:bit are needed for programming (the included USB cable is for charging the Nezha board; check whether it doubles as a micro:bit data cable).
- **Extras for specific cases:** a rubber band (Case 44); black electrical tape and a white surface to make your own track (Case 11, a line map is also included); a second micro:bit as a radio remote control (Cases 53 and 58).

## Learning Outcomes (Expanded)

### Why Hands-On Learning Works

- A 2024 meta-analysis of 37 studies (7,832 students) in the *International Journal of STEM Education* identified 36 measurable benefits from integrating computational thinking into STEM, strongest in cognitive outcomes.
- A 2023 meta-analysis in the *European Journal of Educational Research* (8 studies, 567 primary-school children, 2018–2022) found a medium overall effect in favour of educational robotics on cognitive outcomes such as computational thinking.
- A PMC review of educational robotics reports that robotics "facilitates students' cognitive learning of STEM knowledge and problem-solving skills, soft skills such as teamwork and social skills, and affective domains such as attitudes and interests toward STEM subjects and careers."
- Reviews of construction/robotics toys (ASEE) report that toy-based engineering learning strengthens problem-solving and increases children's interest in STEM fields; early-childhood robotics reviews link robotics activities to gains in logical and sequential thinking and spatial reasoning.
- micro:bit Foundation research: 96% of teachers found students wanted to learn more about coding after using micro:bit; 95% said students found coding easier than expected; 80% of students said "anyone can learn programming" afterwards.
- Building and coding a working machine sits at the top of Bloom's taxonomy ("Create"): children design, build, test and improve real devices rather than passively consume content.

### STEM Skills

**Coding & Computational Thinking (MakeCode blocks → JavaScript/Python):**
- Sequencing, loops (forever/repeat), conditionals (if/else), variables and counters
- Event handling (button A/B, sensor triggers, on-shake/tilt, sound level events)
- Functions and arrays (Helix drawing, memory game, music box)
- Random numbers (Memory Test, Avoiding Bricks game)
- Radio communication between two micro:bits (remote-control lunar rover and washing machine)
- Debugging and iterating

**Sensors & Electronics:**
- Ultrasonic distance measurement (sonar), thresholds and object detection
- Line-tracking sensor (reflective IR, black/white detection)
- Analogue input from a potentiometer, mapping ranges to speed/brightness/pitch
- Soil moisture sensing (and using it as a rain detector)
- Digital input (crash sensor/button) and digital output (LEDs)
- micro:bit built-in sensors: light level, temperature, accelerometer/tilt, microphone (V2), buzzer/speaker
- Input → process → output systems thinking

**Robotics & Automation:**
- DC motor control: speed, direction, differential steering
- Servo control: angle/position and continuous rotation
- Autonomous behaviours: obstacle avoidance, line following, automatic doors, smart lamps
- Feedback control (sensor reading drives actuator response)

**Engineering & Mechanical Design:**
- Gears, gear ratios, axles and beams (LEGO Technic-style construction)
- Linkages and walking mechanisms (shrimp, crab, springtail, walking robot, crawler with ratchet)
- Levers and lifting mechanisms (forklift, grabbing claw, seesaw, flag pole, drying racks)
- Launch mechanisms and stored energy (bricks launcher, blocks emitter with rubber bands)
- Following step-by-step technical assembly diagrams; structural stability

**Science & Real-World Applications:**
- Sound, pitch and frequency (Lively Music, Rangefinder Guitar, Guess the Tones)
- Plant care and soil moisture; weather/rain detection
- Temperature and light as environmental variables
- Traffic systems, home automation, energy saving (corridor lights)

### Complete Project, Challenge & Activity List

The ELECFREAKS wiki has **76 cases** for this kit. **48 can be built with the kit plus a micro:bit** (that's where the "48-in-1" name comes from, and it's confirmed independently by the Mehatronika reviewer). The other 28 need extra PlanetX modules or the Interactive Coding Accessories Pack, sold separately.

**Summary (cases built with the kit only):**
- **Projects:** 34 (guided builds that make a working machine or device)
- **Activities:** 10 (shorter coding exercises that use the Nezha board, LEDs or micro:bit with little or no building)
- **Challenges:** 4 (game/puzzle-style builds where the child has to beat or solve something: Guess the Tones, Memory Test, Avoiding Bricks, plus the open-ended "Thinking/Activity" prompts in Cases 38 and 42)
- **Total buildable with this kit:** 48
- **Additional cases needing expansion modules:** 28 (total on the wiki: 76)

Every case on the wiki follows the same format: introduction, materials list, assembly steps (brick diagrams and in many cases a YouTube assembly video), connection diagram, MakeCode code with a shareable link and downloadable .hex file, and a description of the expected result. Some later cases add "Thinking" questions and extension activities.

#### Cases buildable with the kit + micro:bit (48)

| # | Name | Type | Description | Skills/Concepts Taught |
|---|------|------|-------------|----------------------|
| 1 | The Mechanical Shrimp | Project | A two-motor shrimp that crawls forward, waves its pincers with a servo and turns away when the ultrasonic sensor spots an obstacle. | Linkages, motors, servo, ultrasonic sensing, conditionals |
| 2 | Flower-watering Prompter | Project | A soil moisture sensor in a plant pot lights a red LED when the soil is dry and a green LED when it's fine. | Analogue sensing, thresholds, if/else |
| 3 | Automatic Gate | Project | A servo-driven gate that opens when the ultrasonic sensor detects someone approaching and closes again. | Distance sensing, servo control, automation |
| 4 | Mini Table Lamps | Project | A brick desk lamp whose yellow LED is switched on and off with the crash sensor. | Digital input/output, toggling state |
| 5 | Automatic Dryer | Project | A hand-dryer fan that starts when hands are detected underneath by the ultrasonic sensor. | Motor control, distance thresholds |
| 6 | Temperature-controlled Fan | Project | A fan that switches on when the micro:bit's temperature sensor reads high and off when it cools. | Temperature sensing, energy saving, conditionals |
| 7 | Smart Lamps | Project | A lamp that turns on automatically when the micro:bit senses the room getting dark. | Light sensing, automation |
| 8 | Speed Adjustable Fans | Project | A fan whose speed is set by turning the potentiometer knob. | Analogue input, mapping values to motor speed |
| 9 | Invading Detection Device | Project | An intruder alarm: green LED when clear, red LED and buzzer alarm when the sonar detects someone. | Distance sensing, alarms, outputs |
| 10 | Speed Adjustable Car | Project | A two-motor car with a potentiometer on the back to control its speed. | Motor speed, analogue input, vehicle build |
| 11 | Line-tracking Car | Project | A car that follows a black line on the included map (or tape on a white surface). | Line-tracking sensor, steering logic, loops |
| 12 | Obstacles Avoidance Car | Project | A car that drives itself and turns when the ultrasonic sensor sees an obstacle. | Autonomous navigation, sensing, conditionals |
| 13 | Lively Music | Activity | Turn the potentiometer to change the pitch of the micro:bit's buzzer and make your own tunes. | Sound frequency, analogue input |
| 14 | Guess the Tones | Challenge | A game: the micro:bit plays a tone, the player picks a number with A and confirms with B; tick or cross shows if they were right. | Buttons, variables, game logic, listening |
| 15 | Volume Reminder | Project | A servo-driven pointer that swings according to the noise level picked up by the micro:bit V2 microphone. | Sound sensing (V2), mapping, servo position |
| 16 | Memory Test | Challenge | Red and green LEDs flash in a random sequence; repeat it with buttons A (red) and B (green). | Random numbers, arrays/sequences, memory |
| 17 | Alarm Device | Activity | Press A to start a flashing red LED and buzzer alarm; press A again to stop it. | Toggling state, loops, sound output |
| 18 | Music Box | Activity | Press A to switch between melodies played on the micro:bit. | Music blocks, events, variables |
| 19 | The Automatic Laundry Rack | Project | A rack that retracts when the soil moisture sensor detects rain and extends again when it's dry. | Sensor as rain detector, servo, real-world automation |
| 20 | Avoiding Bricks | Challenge | A micro:bit LED-screen game: tilt to dodge falling bricks until you get hit. | Accelerometer/tilt, game loops, collision logic |
| 21 | An Oscillating Fan | Project | A fan (motor) on a servo head that swings side to side; buttons control the fan and oscillation. | Combining motor and servo, buttons |
| 22 | Micro:bit Helix | Activity | Press A to draw a spiral on the LED screen and B to erase it the same way. | Coordinates, loops, algorithms/geometry |
| 23 | micro:bit Crawlers | Project | A brick caterpillar that crawls forward using a servo and a ratchet mechanism. | Ratchet mechanism, servo motion |
| 24 | The Climbing LEDs | Activity | The number of lit LEDs on the micro:bit rises and falls with surrounding sound (V2 microphone). | Sound sensing, bar graphs, mapping |
| 27 | The Distance Indicator | Project | A social-distance meter that shows the distance to the person in front on the micro:bit screen. | Ultrasonic measurement, displaying data |
| 37 | Traffic Lights | Activity | Red, yellow and green LEDs cycle with real traffic-light timing (5s / 2s / 5s). | Sequencing, timing/pauses, road safety |
| 38 | The Mechanical Springtail | Project | A crawling insect-style robot (A = go, B = stop). Includes a "Thinking" question about why the arms have tyres and an activity to modify it and race. | Friction, walking mechanisms, design iteration |
| 39 | The Mechanical Crab | Project | A crab that scuttles sideways when it sees something approaching. | Linkages, ultrasonic sensing |
| 40 | The Mechanical Motorcycle | Project | A motorbike with servo steering: A turns left, B right, A+B stops. | Steering geometry, servo + motor |
| 41 | The Forklift | Project | Press A: the forklift drives forward, lifts its fork, drives on, lowers it and reverses. | Lifting mechanism, sequenced program |
| 42 | The Grabbing Cart | Project | A cart that drives forward and closes its claw to grab an object. Includes a "Thinking" prompt about adding steering. | Claw mechanism, gears, sequencing |
| 44 | Tightrope Walker | Project | A little figure that walks along a tightrope (needs one rubber band). | Balance, motion, mechanisms |
| 46 | Rangefinder Guitar | Project | Move a baffle closer to or further from the ultrasonic sensor to play different notes. | Distance to pitch mapping, music |
| 47 | Wipers | Project | Windscreen wipers: A starts and speeds up, B slows down. | Speed control, linkages |
| 48 | The Walking Robot | Project | A legged robot that walks forward (A) and stops (B). | Walking linkages, gears |
| 51 | Lifting Dry Rack | Project | A drying rack that lowers on button A and rises automatically when clothes are hung (ultrasonic). | Lifting mechanism, sensing |
| 52 | Smart Sweeper | Project | A robot vacuum that follows a route on the line map and stops when it bumps an obstacle. | Line tracking + obstacle detection combined |
| 53 | The Lunar Exploration Vehicle | Project | A moon rover with ultrasonic sensor, driven left/right/stop/reverse from a second micro:bit acting as a radio remote. | Radio communication, remote control, space exploration |
| 54 | Happy Seesaw | Project | A seesaw mechanism that tips objects off when something is detected in front. | Levers, ultrasonic trigger |
| 55 | Gyro Transmitter | Project | Hold the crash sensor to spin up a spinning top launcher; release to stop. | Rotation, gearing for speed |
| 56 | Powerful Fighter | Project | A vehicle that turns when it meets an obstacle and counts how many obstacles it has hit. | Counters/variables, obstacle avoidance |
| 57 | An Unmanned Bus | Project | A driverless bus that stops at a "bus stop" and leaves when a passenger presses the crash sensor. | Autonomous vehicles, multiple sensors |
| 58 | Smart Washing Machine | Project | A washing machine drum whose spin speed is set from a second micro:bit radio remote. | Radio communication, motor speed |
| 59 | Submarines | Project | A submarine that cruises forward and backs away from "rocks" detected by the ultrasonic sensor. | Obstacle response, motor direction |
| 60 | Raising the National Flag | Project | A flagpole: A raises the flag while music plays, B lowers it. | Pulley/winch mechanism, music |
| 61 | The Boxing Robot | Project | A robot that starts punching when something comes close. | Crank mechanisms, ultrasonic trigger |
| 65 | Drum Beater | Project | A drumming machine whose beat speed is set by the potentiometer. | Rhythm/timing, cam mechanism, analogue input |
| 67 | The Blocks Emitter | Project | A rubber-band powered brick launcher with firing rate controlled by the potentiometer. | Stored energy, launch mechanisms |

**Notes on classification:**
- Cases 53 and 58 need a **second micro:bit** to act as the remote control.
- Case 44 needs one rubber band; Case 67 uses rubber bands (rubber bands are included in the kit per the reviewer).
- Cases 15, 23, 24, 27 and 51 onward specify a **micro:bit V2**.

#### Cases that need modules sold separately (28)

| # | Name | Extra parts needed | Description |
|---|------|--------------------|-------------|
| 25 | Colors of the Emotions | Colour sensor | micro:bit shows happy/sad/angry faces depending on the colour it sees |
| 26 | The Volume Indicator | Rainbow LED ring | Noise meter that lights different colours by sound level |
| 28 | The Corridor Lights | Rainbow LED ring | Lights that turn on only when it's dark and footsteps are heard |
| 29 | The Dazzling Car | Rainbow LED ring, colour sensor | Car with light-show effects |
| 30 | Adjustable Lights | Rainbow LED ring | Brightness set with the potentiometer |
| 31 | The Rotary Password Door | OLED display | Dial a code with the potentiometer to open a door |
| 32 | Gesture Recognition Ring LEDs | Gesture sensor, rainbow LED ring | Change light colour with hand gestures |
| 33 | Color-controlled Lights | Colour sensor, rainbow LED ring | LEDs copy the colour detected |
| 34 | Gesture Recognition Car | Gesture sensor | Steer a car with hand gestures |
| 35 | Color Recognition Car | Colour sensor, rainbow LED ring | Car that reads colour blocks on its route |
| 36 | Color Recognition Password Door | Colour sensor | Door with a colour-card password |
| 43 | The Bricks Launcher | PlanetX button module | Brick launcher fired with a button |
| 45 | The Grasping Car V2 | PlanetX button module | Car that steers and grabs with one servo |
| 49 | The PIR Railing | PIR motion sensor | Barrier that lifts when someone arrives |
| 50 | A Small Trash Can | (Written for the Arduino Nezha-A kit) | Bin lid opens/closes with buttons |
| 62 | The Gesture-controlled Fan | Gesture sensor, rainbow LED ring, motor fan | Fan speed by gesture |
| 63 | The Intelligent Pitching Machine | AI Lens, 4-digit display, 2nd servo | Pitches a ball when it sees a red card |
| 64 | The Intelligent Forklift | Speech recognition module | Voice-controlled forklift |
| 66 | The Voice Control Car | Speech recognition, 8×16 matrix | Change gear by voice |
| 68 | The Weather Stations | Speech recognition, rainbow LEDs, BME280, OLED | Voice-activated weather station |
| 69 | The Trimpot Remote Control Car | Interactive Coding Accessories Pack | Two-knob wired remote control car |
| 70 | Voice Controlled Laser Launching Vehicle | Speech recognition, laser, 4-channel line sensor | Voice-commanded line-following laser car |
| 71 | Blocks Sorting Machine | Interactive Coding Accessories Pack | Sorts bricks by colour |
| 72 | The Smoke Detection Fan | Dust sensor, motor fan | Ventilation fan for dusty air |
| 73 | A Mock Awning | UV sensor | Shade opens when UV is high (for plants) |
| 74 | The Happy Crab | RFID sensor, 2nd servo | Crab dances when a card is scanned |
| 75 | The Magic Painter | UV sensor | Drawing robot whose pattern changes with UV |
| 76 | The Tomato Clock | Segment display, rainbow LEDs | Pomodoro study timer |

**Difficulty Progression:** Roughly ordered by complexity in batches. Cases 2–24 are short builds focused on one sensor or output each (LEDs, sonar, potentiometer, soil moisture, motor, servo) plus micro:bit-only coding games, which makes them a good on-ramp. Cases 1 and 38–48 are larger mechanical builds (animals, vehicles, forklift, walking robot) with more complex brick assembly. Cases 51–67 combine multiple sensors/mechanisms and introduce radio remote control. Cases 25–36 and 62–76 are expansion projects for when a child wants to add modules. Cases are independent of each other, so children can jump to whatever interests them.

### Life Skills & Character Development

**Critical Thinking & Problem-Solving:**
- Every build is a working system (sensor → micro:bit → motor/LED). When it doesn't work, the child has to work out whether the problem is the bricks, the wiring port, or the code.
- Many cases ask the child to tune thresholds (how dry is "dry"? how close is "too close"?), which means testing and adjusting.
- "Thinking" questions in later cases (e.g. "why do we put tyres on the springtail's arms?", "could you make a car that turns and grabs?") prompt engineering reasoning.

**Resilience & Growth Mindset:**
- 48 builds that ramp up from a single LED to walking robots provide many early wins before harder mechanical builds.
- Rebuilding a mechanism that doesn't move as expected is physical debugging.

**Emotional Regulation:**
- Multi-step mechanical builds (walking robot, forklift, crab) require patience and careful step-following; a single misplaced axle stops the mechanism working.
- Clear visual instructions (only a couple of parts per step, highlighted in red) keep frustration manageable.

**Confidence & Self-Esteem:**
- Children build real working devices they recognise (automatic doors, traffic lights, robot vacuum, driverless bus) and can demonstrate to family.
- The progression from block code to JavaScript/Python means the kit grows with the child.

**Creativity & Innovation:**
- 400+ LEGO Technic-compatible bricks means children can redesign builds or invent their own, and combine with LEGO they already own.
- Cases explicitly encourage modification (e.g. "modify your own mechanical springtail and hold races").
- Open-ended: the same 8 sensors, 2 motors and servo can be reconfigured endlessly.

**Collaboration:**
- Larger builds and radio-controlled cases (two micro:bits) suit siblings, friends or a classroom group working together.

### Future-Ready Skills & Career Connections
- **Robotics & automation engineering:** motors, servos, sensor feedback and autonomous behaviours (line following, obstacle avoidance) are the foundations of industrial and service robotics.
- **Autonomous vehicles:** the line-tracking car, obstacle-avoiding car, smart sweeper and unmanned bus mirror how self-driving systems and robot vacuums use sensors to decide what to do.
- **Smart home / IoT:** automatic doors, smart lamps, corridor lights, plant watering prompter and laundry rack are mini versions of home automation products.
- **Mechanical & product design:** gears, linkages, claws, levers and walking mechanisms build mechanical intuition.
- **Software engineering:** block coding transitions to JavaScript and Python in the same editor.
- **Agritech & environmental monitoring:** soil moisture and temperature sensing link to smart farming.
- **Space & exploration robotics:** the lunar exploration vehicle case connects to rover design.
- World Economic Forum projections indicate a net gain of ~78 million jobs globally by 2030, with technology and digital skills among the fastest-growing in demand.

### What Parents Will Observe
- Children explaining how everyday automation works ("the door opens because a sensor sees you, like the one I built").
- Independent troubleshooting: checking connections and code before asking for help.
- Long, focused build sessions, followed by children modifying builds or inventing their own machines.
- Growing comfort with code: from dragging blocks to changing numbers to see what happens, to writing their own programs.
- Children testing and measuring (how far away does the sensor react? how fast should the fan spin?), which is early scientific method.
- Pride in showing off working robots and gadgets.

### Curriculum Alignment
- **South Africa:** Coding and Robotics CAPS for Grades R–9 was approved in February 2024 and gazetted in June 2024, with Foundation Phase rollout and teacher training from 2025 and wider deployment from 2026. This kit covers core strands: coding (algorithms, sequencing, loops, conditionals), robotics (sensors, actuators, input-process-output), and engineering design (building mechanical structures). Fits Intermediate and Senior Phase (Grades 4–9).
- **Technology CAPS (Senior Phase):** structures, mechanical systems (gears, levers, linkages) and electrical systems/control.
- **Natural Sciences:** sound and pitch, temperature, light, plants and water.
- **International:** micro:bit and MakeCode are used in computing curricula worldwide (UK KS2–KS3, US CSTA standards).
- **Age/grade:** Manufacturer rates 8+. Simple single-sensor cases suit 8–10 year-olds with some adult help; the complex mechanical builds and Python suit 10–14.

## Additional Notes

### Quality & Safety
- **Certifications:** CE (EMC Directive 2014/30/EU, Anbotek, Nov 2020) and RoHS (2011/65/EU, Anbotek, Dec 2020) certificates published on the product page.
- Nezha board: ABS fireproof shell; FR4 circuit board with 94V0 fire rating.
- Bricks: independent reviewer rates them as very high quality, comparable to genuine LEGO.
- Manufacturer safety instructions: don't use the Nezha board while charging; don't clean with water or detergent (use a cloth with a little alcohol); keep paper, dust, gum etc. out of the ports; don't disassemble; keep away from fire; store in a clean, dry box when not in use. Set the servo angle before building to prevent it jamming. PlanetX sensors follow the same care rules.
- Contains small parts (not suitable for children under 3).

### Longevity
- 48 builds with the kit alone, 76 on the wiki with expansion modules, plus unlimited free-building.
- Expandable with 40+ ELECFREAKS PlanetX sensors and modules (colour, gesture, PIR, rainbow LED ring, OLED, speech recognition, AI Lens, etc.) and the ELECFREAKS Interactive Coding Accessories Pack.
- LEGO Technic and Fischertechnik compatible, so it combines with bricks children already own.
- Grows from block coding to JavaScript/Python in the same editor.
- Rechargeable battery means no ongoing battery cost.
- Sturdy stackable storage box keeps parts organised for repeat use.

### Build Time
- No official build times published. Based on case scope: simple single-sensor cases (2–24, 37) roughly 15–30 minutes including coding; vehicle builds (10–12) roughly 30–45 minutes; larger mechanical builds (1, 38–48, 51–67) roughly 45–90 minutes. *(Estimate, not manufacturer data.)*
- Battery: "With one charge, you can take 3 lessons" (manufacturer); up to about 2 hours depending on motor use (reviewer).

### Unique Features
- Colour-coded, click-in RJ11 ports: children match the module colour to the port colour, with no breadboards, jumper wires or soldering.
- Built-in rechargeable battery in the controller box.
- Real LEGO Technic compatibility with 400+ bricks: building and coding in one kit.
- Huge free project library (76 cases) with assembly videos and ready-made code links.
- Part of the wider PlanetX/Nezha ecosystem, so the kit can be extended rather than replaced.

## Research Gaps
- **Shopify metafields and description are empty**: age, batteries, projects, guide, soldering and coding platform need to be set in Shopify admin (suggested values above).
- **micro:bit not included**: the product page must make this clear and ideally cross-sell a micro:bit V2.
- **USB cable**: unclear whether the included USB cable can also be used to program the micro:bit (it's listed as a charging cable).
- **Exact brick count and part list**: only "400+ bricks" across 11 bag packages; no itemised brick list found.
- **Official build-time estimates**: none published.
- **Rubber bands**: the reviewer mentions rubber bands in the box, but they're not on the official packing list image.
- **Case 50** is written for the Nezha-A (Arduino) kit and may not translate directly.
- **No Amazon listing found** for this SKU; no customer reviews beyond the one independent review.
- **Wiki intro still says "36 cases"** while the directory lists 76; 48 is the manufacturer's headline figure.

## Sources

### Product Information
1. ELECFREAKS official shop (product JSON, Nezha Kits collection): https://shop.elecfreaks.com/collections/nezha-kits
2. ELECFREAKS product page: https://shop.elecfreaks.com/products/elecfreaks-micro-bit-nezha-48-in-1-inventors-kit-without-micro-bit-board
3. ELECFREAKS Wiki, Nezha Inventor's Kit (EF08232) directory: https://wiki.elecfreaks.com/en/microbit/building-blocks/nezha-inventors-kit
4. ELECFREAKS Wiki, kit introduction: https://wiki.elecfreaks.com/en/microbit/building-blocks/nezha-inventors-kit/Nezha-Inventor-s-kit-for-microbit
5. ELECFREAKS Wiki, safety instructions: https://wiki.elecfreaks.com/en/microbit/building-blocks/nezha-inventors-kit/safety_instructions
6. ELECFREAKS packing list image: https://cdn.shopify.com/s/files/1/0566/1717/3071/files/20230308-105503.jpg
7. Bot'n Roll: https://www.botnroll.com/en/bbc-microbit/4765-elecfreaks-micro-bit-nezha-48-in-1-inventor-s-kit-without-micro-bit-board.html
8. Little Bird Electronics: https://littlebirdelectronics.com.au/products/nezha-inventor-s-kit-for-micro-bit-without-micro-bit-board
9. elektronicavoorjou.nl: https://elektronicavoorjou.nl/en/product/elecfreaks-microbit-nezha-48-in-1-inventors-kit
10. Congeriem: https://www.congeriem.com/nezha-inventor-s-kit-for-micro-bit-without-micro-bit-board.html
11. RS South Africa: https://za.rs-online.com/web/p/bbc-micro-bit-add-ons/2233954
12. The Pi Hut: https://thepihut.com/products/nezha-inventors-kit-for-bbc-micro-bit

### Project Tutorials
13. Case pages follow the pattern `https://wiki.elecfreaks.com/en/microbit/building-blocks/nezha-inventors-kit/Nezha_Inventor_s_kit_for_microbit_case_NN` (NN = 01 to 76), e.g.:
    - Case 01 The Mechanical Shrimp: https://wiki.elecfreaks.com/en/microbit/building-blocks/nezha-inventors-kit/Nezha_Inventor_s_kit_for_microbit_case_01
    - Case 11 Line-tracking Car: https://wiki.elecfreaks.com/en/microbit/building-blocks/nezha-inventors-kit/Nezha_Inventor_s_kit_for_microbit_case_11
    - Case 48 The Walking Robot: https://wiki.elecfreaks.com/en/microbit/building-blocks/nezha-inventors-kit/Nezha_Inventor_s_kit_for_microbit_case_48
    - Case 53 The Lunar Exploration Vehicle: https://wiki.elecfreaks.com/en/microbit/building-blocks/nezha-inventors-kit/Nezha_Inventor_s_kit_for_microbit_case_53

### Reviews & Recommendations
14. magazin Mehatronika, "Elecfreaks Nezha Inventor's Kit for micro:bit recenzija" (July 2024): https://magazinmehatronika.com/elecfreaks-nezha-inventors-kit-for-microbit-recenzija

### Educational Research
15. International Journal of STEM Education, CT-STEM meta-analysis (2024): https://stemeducationjournal.springeropen.com/articles/10.1186/s40594-024-00498-z
16. European Journal of Educational Research, educational robotics meta-analysis (primary): https://pdf.eu-jer.com/EU-JER_12_4_1683.pdf
17. PMC, Educational Robotics and cognitive development: https://pmc.ncbi.nlm.nih.gov/articles/PMC10078047/
18. Frontiers in Education, robotics and STEM competence in primary (2024): https://frontiersin.org/journals/education/articles/10.3389/feduc.2024.1480908/pdf
19. ASEE, construction kits and robotics for early engineering: https://nemo.asee.org/public/conferences/374/papers/51799/download
20. micro:bit Foundation research: https://microbit.org/impact/research/

### Hands-On Learning Benefits
21. CEUR workshop paper, early childhood robotics review: https://ceur-ws.org/Vol-4234/short8.pdf
22. Edutopia, computational thinking with micro:bit: https://www.edutopia.org/article/computational-thinking-microbit-without-screens/

### Curriculum (South Africa)
23. Department of Basic Education, Coding and Robotics pilot: https://www.education.gov.za/ArchivedDocuments/ArchivedArticles/Piloting-of-Coding-and-Robotics-still-underway.aspx
24. Daily Maverick, coding and robotics curriculum (July 2025): https://www.dailymaverick.co.za/article/2025-07-21-coding-and-robotics-curriculum-can-boost-numeracy-literacy
25. BusinessTech, what schools will be teaching: https://businesstech.co.za/news/technology/478527/coding-and-robotics-in-south-africa-what-schools-will-actually-be-teaching/

### Future Skills & Careers
26. Morson / WEF Future of Jobs, skills for 2030: https://www.morson.com/blog/looking-job-ai-era-build-skills-will-define-2030
