/**
 * Photos for the "Built by kids like yours" wall on the homepage.
 *
 * Hand-picked from each product page's "See What Others Are Creating" gallery
 * (`storefront/public/images/products/<handle>/`) — genuine social-proof shots
 * of kids, hands and finished builds, not studio packshots. Every entry ties
 * back to a real product `handle` so the flip side can link to the kit.
 *
 * There are ~4-12 photos per brand. The wall interleaves them by brand and
 * shows ~12 at a time; when a brand is selected the wall shows up to ~12 of
 * that brand (see CustomerPhotoWall / CustomerPhotoWallGrid). `width`/`height`
 * are the real source pixels; the grid crops to a uniform aspect with
 * object-cover, so exact ratios only need to be roughly photo-shaped.
 *
 * Brand order controls the default round-robin, so keep brands grouped.
 */
export type WallPhotoSource = {
  handle: string;
  brand: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const WALL_PHOTOS: WallPhotoSource[] = [
  // Snap Circuits
  { handle: "snap-circuits-arcade", brand: "snap-circuits", src: "/images/products/snap-circuits-arcade/child-playing-with-arcade.jpeg", alt: "Child playing with their finished Snap Circuits Arcade build", width: 1200, height: 900 },
  { handle: "snap-circuits-beginner", brand: "snap-circuits", src: "/images/products/snap-circuits-beginner/fingers-pressing-switches-in-dark-with-lights.jpg", alt: "Fingers pressing switches on a Snap Circuits board, lights glowing in the dark", width: 1200, height: 904 },
  { handle: "snap-circuits-beginner", brand: "snap-circuits", src: "/images/products/snap-circuits-beginner/kid-playing-with-board.jpg", alt: "Child playing with the Snap Circuits Beginner board", width: 1200, height: 1159 },
  { handle: "snap-circuits-beginner", brand: "snap-circuits", src: "/images/products/snap-circuits-beginner/two-snap-circuit-beginner-boards-with-kids-hands.jpg", alt: "Two children building Snap Circuits boards side by side", width: 1200, height: 675 },
  { handle: "snap-circuits-beginner", brand: "snap-circuits", src: "/images/products/snap-circuits-beginner/finger-pressing-switch-with-colourful-light-fan-spinning.jpg", alt: "Finger pressing a switch as the colourful Snap Circuits fan spins", width: 1200, height: 676 },
  { handle: "snap-circuits-classic-300", brand: "snap-circuits", src: "/images/products/snap-circuits-classic-300/child-building-circuit.jpg", alt: "A child's hands building a Snap Circuits project on a wooden table", width: 962, height: 2079 },
  { handle: "snap-circuits-explorer-junior", brand: "snap-circuits", src: "/images/products/snap-circuits-explorer-junior/child-building-circuit.jpg", alt: "Child building a Snap Circuits Explorer project", width: 962, height: 2079 },
  { handle: "snap-circuits-my-home", brand: "snap-circuits", src: "/images/products/snap-circuits-my-home/hands-snapping-pieces-together.jpeg", alt: "Hands snapping Snap Circuits pieces together on the board", width: 1200, height: 900 },

  // National Geographic
  { handle: "national-geographic-build-your-own-volcano", brand: "national-geographic", src: "/images/products/national-geographic-build-your-own-volcano/boy-stirring-volcano-mix.jpg", alt: "Boy stirring the plaster mix for his volcano", width: 493, height: 493 },
  { handle: "national-geographic-build-your-own-volcano", brand: "national-geographic", src: "/images/products/national-geographic-build-your-own-volcano/girl-painting-volcano.jpg", alt: "Girl carefully painting her finished volcano", width: 459, height: 459 },
  { handle: "national-geographic-crystal-garden", brand: "national-geographic", src: "/images/products/national-geographic-crystal-garden/boy-holding-pen-to-colour-tree.jpg", alt: "Boy colouring his crystal garden tree before growing the crystals", width: 1200, height: 1200 },
  { handle: "national-geographic-dino-fossil-dig-kit", brand: "national-geographic", src: "/images/products/national-geographic-dino-fossil-dig-kit/kids-scraping-at-fossil.png", alt: "Kids carefully scraping at a fossil dig brick", width: 1200, height: 1200 },
  { handle: "national-geographic-epic-circuits-science-kit", brand: "national-geographic", src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-child-playing.jpg", alt: "Child experimenting with the Epic Circuits science kit", width: 588, height: 588 },
  { handle: "national-geographic-epic-circuits-science-kit", brand: "national-geographic", src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-building-circuits.jpg", alt: "Child building circuits with the Epic Circuits kit", width: 800, height: 800 },
  { handle: "national-geographic-epic-circuits-science-kit", brand: "national-geographic", src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-hands-connecting.jpg", alt: "Hands connecting circuit parts with snap-in wires", width: 800, height: 800 },
  { handle: "national-geographic-glow-in-the-dark-human-body", brand: "national-geographic", src: "/images/products/national-geographic-glow-in-the-dark-human-body/child-playing.jpg", alt: "Child exploring the glow-in-the-dark human body model", width: 1224, height: 1632 },
  { handle: "national-geographic-glow-in-the-dark-human-body", brand: "national-geographic", src: "/images/products/national-geographic-glow-in-the-dark-human-body/childs-hands-putting-body-together.jpg", alt: "A child's hands assembling the human body model", width: 1414, height: 1414 },
  { handle: "national-geographic-glow-in-the-dark-solar-system-activity-kit", brand: "national-geographic", src: "/images/products/national-geographic-glow-in-the-dark-solar-system-activity-kit/child-painting.jpg", alt: "Child painting a planet from the solar system kit", width: 1200, height: 1232 },

  // MatataStudio
  { handle: "matatastudio-coding-set-pro", brand: "matatastudio", src: "/images/products/matatastudio-coding-set-pro/2-boys-playing-together-on-floor.jpg", alt: "Two boys collaborating on a coding challenge on the floor", width: 1200, height: 787 },
  { handle: "matatastudio-coding-set-pro", brand: "matatastudio", src: "/images/products/matatastudio-coding-set-pro/3-kids-playing-together.jpeg", alt: "Three children working together with MatataStudio", width: 1200, height: 810 },
  { handle: "matatastudio-coding-set-pro", brand: "matatastudio", src: "/images/products/matatastudio-coding-set-pro/boy-placing-pieces-down.jpg", alt: "Child placing coding blocks on the control board", width: 1100, height: 733 },
  { handle: "matatastudio-coding-set-pro", brand: "matatastudio", src: "/images/products/matatastudio-coding-set-pro/child-playing-with-set.jpeg", alt: "Child engaged in hands-on coding with MatataStudio", width: 983, height: 601 },
  { handle: "matatastudio-tale-bot-pro", brand: "matatastudio", src: "/images/products/matatastudio-tale-bot-pro/two-girls-sitting-on-floor-playing-with-tale-bot-on-board.jpg", alt: "Two girls sitting on the floor coding Tale-Bot Pro on its map", width: 983, height: 739 },
  { handle: "matatastudio-tale-bot-pro", brand: "matatastudio", src: "/images/products/matatastudio-tale-bot-pro/young-girls-pressing-buttons-on-talebot-pro.png", alt: "Young girls pressing the command buttons on Tale-Bot Pro", width: 1200, height: 1500 },
  { handle: "matatastudio-coding-set-pro-classroom-set", brand: "matatastudio", src: "/images/products/matatastudio-coding-set-pro-classroom-set/kids-playing-together.jpg", alt: "Two learners working together on a MatataStudio coding challenge", width: 1200, height: 900 },
  { handle: "matatastudio-coding-set-pro-classroom-set", brand: "matatastudio", src: "/images/products/matatastudio-coding-set-pro-classroom-set/girl-playing.jpg", alt: "Girl placing coding blocks on the control board", width: 1200, height: 1199 },
  { handle: "matatastudio-coding-set-pro-classroom-set", brand: "matatastudio", src: "/images/products/matatastudio-coding-set-pro-classroom-set/girl-looking-at-blocks.jpeg", alt: "Girl examining coding blocks and planning her programme", width: 1200, height: 909 },
  { handle: "matatastudio-coding-set-pro-classroom-set", brand: "matatastudio", src: "/images/products/matatastudio-coding-set-pro-classroom-set/young-boy-playing-with-kit.jpg", alt: "Young boy concentrating on his MatataStudio coding programme", width: 1200, height: 960 },

  // Makerzoid
  { handle: "makerzoid-robot-master-premium", brand: "makerzoid", src: "/images/products/makerzoid-robot-master-premium/two-kids-playing-together-building-and-with-app-on-phone.png", alt: "Two kids building a Makerzoid robot together with the app on a phone", width: 783, height: 839 },
  { handle: "makerzoid-diverse-building-blocks", brand: "makerzoid", src: "/images/products/makerzoid-diverse-building-blocks/hands-holding-a-robot-build.jpg", alt: "Two hands holding a completed Makerzoid robot build", width: 800, height: 800 },
  { handle: "makerzoid-smart-robot-premium", brand: "makerzoid", src: "/images/products/makerzoid-smart-robot-premium/end-user-1.jpg", alt: "Child building a Makerzoid robot with the app instructions open", width: 1200, height: 710 },
  { handle: "makerzoid-diverse-building-blocks", brand: "makerzoid", src: "/images/products/makerzoid-diverse-building-blocks/hand-turning-handle-and-lifting-parts.jpg", alt: "Hand turning the handle on a Makerzoid build to show its moving parts", width: 800, height: 800 },
  { handle: "makerzoid-robot-master-premium", brand: "makerzoid", src: "/images/products/makerzoid-robot-master-premium/close-up-hand-holding-built-car.png", alt: "Close-up of a hand holding a built Makerzoid car", width: 1187, height: 702 },
  { handle: "makerzoid-diverse-building-blocks", brand: "makerzoid", src: "/images/products/makerzoid-diverse-building-blocks/dancing-man.jpg", alt: "A completed Makerzoid dancing figure build", width: 800, height: 800 },
  { handle: "makerzoid-smart-robot-premium", brand: "makerzoid", src: "/images/products/makerzoid-smart-robot-premium/end-user-5.jpg", alt: "Hands sorting and organising Makerzoid building pieces", width: 1200, height: 710 },

  // BBC micro:bit
  { handle: "bbc-micro-bit-club", brand: "bbc-microbit", src: "/images/products/bbc-micro-bit-club/kids-in-class-at-computers-with-microbit.jpg", alt: "Learners at computers in a classroom using micro:bit", width: 500, height: 511 },
  { handle: "bbc-micro-bit-club", brand: "bbc-microbit", src: "/images/products/bbc-micro-bit-club/two-kids-helping-each-other-makecode.jpg", alt: "Two learners helping each other code a micro:bit", width: 800, height: 600 },
  { handle: "bbc-micro-bit-club", brand: "bbc-microbit", src: "/images/products/bbc-micro-bit-club/kids-looking-at-makecode-screen.jpg", alt: "Learners looking at their code while holding their micro:bit boards", width: 1200, height: 806 },
  { handle: "bbc-micro-bit-club", brand: "bbc-microbit", src: "/images/products/bbc-micro-bit-club/child-working-on-computer-on-microbit-app.jpg", alt: "Child coding a micro:bit on a computer", width: 1200, height: 890 },
  { handle: "bbc-micro-bit-club", brand: "bbc-microbit", src: "/images/products/bbc-micro-bit-club/girls-hand-holding-microbit-infront-of-computer.jpg", alt: "Girl holding a micro:bit in front of her computer", width: 1200, height: 1200 },
  { handle: "bbc-micro-bit-club", brand: "bbc-microbit", src: "/images/products/bbc-micro-bit-club/holding-microbit-with-battery-holder.jpeg", alt: "Learner holding a micro:bit with its battery pack attached", width: 710, height: 801 },
  { handle: "bbc-micro-bit-club", brand: "bbc-microbit", src: "/images/products/bbc-micro-bit-club/kids-on-computers-python-and-block-coding.jpg", alt: "Learners at computers exploring block and Python coding", width: 1200, height: 1200 },
  { handle: "bbc-micro-bit-go", brand: "bbc-microbit", src: "/images/products/bbc-micro-bit-go/end-user/kids-looking-at-amkecode-screen-holding-microbit.jpg", alt: "Two boys in class looking at their code, one holding a micro:bit", width: 5199, height: 3495 },
  { handle: "bbc-micro-bit-go", brand: "bbc-microbit", src: "/images/products/bbc-micro-bit-go/end-user/hand-holding-microbit-device-with-coding-screen-in-the-back.jpg", alt: "Hand holding a micro:bit in front of a block-coding screen", width: 960, height: 540 },
  { handle: "bbc-micro-bit-go", brand: "bbc-microbit", src: "/images/products/bbc-micro-bit-go/end-user/two-kids-helping-eachother-with-makecode.jpg", alt: "A girl and boy coding together at their laptops", width: 800, height: 600 },
  { handle: "bbc-micro-bit-go", brand: "bbc-microbit", src: "/images/products/bbc-micro-bit-go/end-user/child-working-on-computer-on-microbit-app.png", alt: "Young girl coding with blocks on a laptop", width: 1550, height: 1150 },
  { handle: "bbc-micro-bit-go", brand: "bbc-microbit", src: "/images/products/bbc-micro-bit-go/end-user/holding-microbit-with-battery-holder-in-front-of-screen.jpeg", alt: "Hands holding a micro:bit with its battery pack in front of a monitor", width: 710, height: 801 },

  // ELECFREAKS
  { handle: "elecfreaks-micro-bit-smart-cutebot-pro", brand: "elecfreaks", src: "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/hand-plugging-in-microbit-with-cutebot-behind.jpg", alt: "Hand plugging a micro:bit into the Cutebot Pro robot car", width: 800, height: 800 },
  { handle: "elecfreaks-micro-bit-tinker-kit", brand: "elecfreaks", src: "/images/products/elecfreaks-micro-bit-tinker-kit/kids-in-classroom.jpeg", alt: "Kids in a classroom coding with micro:bit and the Tinker Kit", width: 1200, height: 721 },
  { handle: "elecfreaks-micro-bit-tinker-kit", brand: "elecfreaks", src: "/images/products/elecfreaks-micro-bit-tinker-kit/moisture-water-testing-build.jpg", alt: "A moisture-testing build made with the Tinker Kit soil sensor", width: 1000, height: 667 },
  { handle: "elecfreaks-micro-bit-tinker-kit", brand: "elecfreaks", src: "/images/products/elecfreaks-micro-bit-tinker-kit/plant-monitoring-device-example.jpg", alt: "A plant-monitoring device built with the Tinker Kit", width: 1200, height: 1200 },

  // Arduino
  { handle: "arduino-sensor-kit-base", brand: "arduino", src: "/images/products/arduino-sensor-kit-base/kids-smiling-holding-sensor-base.jpg", alt: "Kids smiling while holding the Arduino Sensor Kit base board", width: 1024, height: 927 },
  { handle: "arduino-sensor-kit-base", brand: "arduino", src: "/images/products/arduino-sensor-kit-base/pressing-button-with-oled-screen-on.png", alt: "Pressing a button module as the OLED screen shows output", width: 1194, height: 700 },
  { handle: "arduino-sensor-kit-base", brand: "arduino", src: "/images/products/arduino-sensor-kit-base/arduino-camp-kids-in-class.jpg", alt: "Kids working with Arduino kits in a classroom", width: 2048, height: 1536 },
  { handle: "arduino-sensor-kit-base", brand: "arduino", src: "/images/products/arduino-sensor-kit-base/hands-holding-base.jpg", alt: "Hands holding the Arduino base shield", width: 1280, height: 720 },
  { handle: "arduino-starter-kit", brand: "arduino", src: "/images/products/arduino-starter-kit/finger-pressing-button-light-on.jpg", alt: "Finger pressing a button with an LED lit on an Arduino breadboard", width: 675, height: 900 },
  { handle: "arduino-student-kit", brand: "arduino", src: "/images/products/arduino-student-kit/teen-working-on-kit-with-workbook-and-laptop.jpg", alt: "Teen working on the Arduino Student Kit with the workbook and laptop open", width: 1200, height: 800 },
  { handle: "arduino-student-kit", brand: "arduino", src: "/images/products/arduino-student-kit/teen-homeschooling-with-student-kit.jpg", alt: "Teenager homeschooling with the Arduino Student Kit", width: 800, height: 800 },
  { handle: "arduino-student-kit", brand: "arduino", src: "/images/products/arduino-student-kit/lady-and-chlid-working-together-on-kit.jpeg", alt: "Parent and child working together on the Arduino Student Kit", width: 800, height: 800 },
  { handle: "arduino-student-kit", brand: "arduino", src: "/images/products/arduino-student-kit/teen-working-with-student-kit.jpeg", alt: "Teenager working with the Arduino Student Kit", width: 620, height: 620 },

  // NASA
  { handle: "nasa-astronaut-helmet", brand: "nasa", src: "/images/products/nasa-astronaut-helmet/child-dressed-in-astronaut-outfit.jpg", alt: "Child in an astronaut suit and NASA helmet giving two thumbs up", width: 1200, height: 1600 },
  { handle: "nasa-astronaut-helmet", brand: "nasa", src: "/images/products/nasa-astronaut-helmet/child-dressed-up-as-astronaut.jpg", alt: "Child dressed as an astronaut wearing the NASA helmet", width: 1200, height: 1600 },
  { handle: "nasa-lunar-telescope", brand: "nasa", src: "/images/products/nasa-lunar-telescope/end-user-child-looking-through-telescope.jpg", alt: "Child looking through the NASA Lunar Telescope", width: 1060, height: 1885 },
  { handle: "nasa-lunar-telescope", brand: "nasa", src: "/images/products/nasa-lunar-telescope/end-user-girl-looking-through-scope.jpg", alt: "Girl using the NASA Lunar Telescope", width: 1298, height: 1541 },
  { handle: "nasa-lunar-telescope", brand: "nasa", src: "/images/products/nasa-lunar-telescope/end-user-small-boy-looking-through.jpg", alt: "Small boy looking through the NASA Lunar Telescope", width: 842, height: 846 },
  { handle: "nasa-moon-sand-activity-kit", brand: "nasa", src: "/images/products/nasa-moon-sand-activity-kit/boy-sitting-with-sand-box-in-front-of-him-holding-sand.jpg", alt: "Boy holding a handful of NASA moon sand at his play tray", width: 1224, height: 1632 },
  { handle: "nasa-moon-sand-activity-kit", brand: "nasa", src: "/images/products/nasa-moon-sand-activity-kit/child-playing-with-sand.jpg", alt: "Child playing with the NASA moon sand kit", width: 1250, height: 1599 },
  { handle: "nasa-moon-sand-activity-kit", brand: "nasa", src: "/images/products/nasa-moon-sand-activity-kit/hand-holding-moon-sand-above-sand-box.jpg", alt: "Hand holding a ball of moon sand above the play tray", width: 1224, height: 1632 },
  { handle: "nasa-moon-sand-activity-kit", brand: "nasa", src: "/images/products/nasa-moon-sand-activity-kit/hand-holding-stretchy-sand.jpg", alt: "Hand stretching the moon sand to show its texture", width: 1224, height: 1632 },
  { handle: "nasa-moon-sand-activity-kit", brand: "nasa", src: "/images/products/nasa-moon-sand-activity-kit/hand-holding-astronaut.jpg", alt: "A child's hand holding the astronaut figure from the kit", width: 1061, height: 1885 },

  // Blockaroo
  { handle: "blockaroo-magnetic-foam-builders-trunk-set", brand: "blockaroo", src: "/images/home/customer-wall/blockaroo-bath.jpg", alt: "Foam building blocks stuck to the side of a bath", width: 900, height: 1200 },
];
