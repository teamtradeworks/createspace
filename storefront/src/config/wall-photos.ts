/**
 * Photos for the "Built by kids like yours" wall on the homepage.
 *
 * These are hand-picked from each product page's "See What Others Are Creating"
 * gallery (`storefront/public/images/products/<handle>/`) — genuine social-proof
 * shots of kids, hands and finished builds, not studio packshots. Every entry
 * ties back to a real product `handle` so the flip side can link to the kit.
 *
 * Curation rules:
 *  - Favour people/hands/action over box, manual, unboxing or screenshot shots.
 *  - Spread across brands; a product may appear more than once with different
 *    photos, and a brand may span several of its products.
 *  - `width`/`height` are the real pixel dimensions (drives the masonry aspect).
 *
 * The wall interleaves these by brand and caps the count (see CustomerPhotoWall),
 * so ordering within a brand controls which of its photos surface first.
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
  // Snap Circuits — 5 kits, snap-together electronics
  {
    handle: "snap-circuits-arcade",
    brand: "snap-circuits",
    src: "/images/products/snap-circuits-arcade/child-playing-with-arcade.jpeg",
    alt: "Child playing with their finished Snap Circuits Arcade build",
    width: 1200,
    height: 900,
  },
  {
    handle: "snap-circuits-beginner",
    brand: "snap-circuits",
    src: "/images/products/snap-circuits-beginner/kid-playing-with-board.jpg",
    alt: "Child playing with the Snap Circuits Beginner board",
    width: 1200,
    height: 1159,
  },
  {
    handle: "snap-circuits-classic-300",
    brand: "snap-circuits",
    src: "/images/products/snap-circuits-classic-300/child-building-circuit.jpg",
    alt: "A child's hands building a Snap Circuits project on a wooden table",
    width: 962,
    height: 2079,
  },
  {
    handle: "snap-circuits-my-home",
    brand: "snap-circuits",
    src: "/images/products/snap-circuits-my-home/hands-snapping-pieces-together.jpeg",
    alt: "Hands snapping circuit pieces together on the Snap Circuits board",
    width: 1200,
    height: 900,
  },
  {
    handle: "snap-circuits-explorer-junior",
    brand: "snap-circuits",
    src: "/images/products/snap-circuits-explorer-junior/child-building-board-with-manual-in-front-of-him.jpg",
    alt: "Child following the manual while building a Snap Circuits project",
    width: 1224,
    height: 1632,
  },

  // National Geographic — hands-on science kits
  {
    handle: "national-geographic-motorized-marble-run",
    brand: "national-geographic",
    src: "/images/products/national-geographic-motorized-marble-run/kids-playing-with-marble-run.jpg",
    alt: "Children building and playing with the Motorized Marble Run",
    width: 800,
    height: 800,
  },
  {
    handle: "national-geographic-mega-bug-habitat",
    brand: "national-geographic",
    src: "/images/products/national-geographic-mega-bug-habitat/girl-in-garden-looking-through-magnifying-glass.png",
    alt: "Girl in the garden looking through the bug habitat magnifying glass",
    width: 1200,
    height: 1200,
  },
  {
    handle: "national-geographic-glow-in-the-dark-human-body",
    brand: "national-geographic",
    src: "/images/products/national-geographic-glow-in-the-dark-human-body/childs-hands-putting-body-together.jpg",
    alt: "A child's hands assembling the glow-in-the-dark human body model",
    width: 1414,
    height: 1414,
  },
  {
    handle: "national-geographic-glow-in-the-dark-solar-system-activity-kit",
    brand: "national-geographic",
    src: "/images/products/national-geographic-glow-in-the-dark-solar-system-activity-kit/child-painting.jpg",
    alt: "Child carefully painting a planet from the solar system kit",
    width: 1200,
    height: 1232,
  },
  {
    handle: "national-geographic-dino-fossil-dig-kit",
    brand: "national-geographic",
    src: "/images/products/national-geographic-dino-fossil-dig-kit/kids-scraping-at-fossil.png",
    alt: "Kids carefully scraping at a fossil dig brick",
    width: 1200,
    height: 1200,
  },

  // MatataStudio — screen-free coding robots
  {
    handle: "matatastudio-coding-set-pro",
    brand: "matatastudio",
    src: "/images/products/matatastudio-coding-set-pro/2-boys-playing-together-on-floor.jpg",
    alt: "Two boys collaborating on coding challenges on the floor",
    width: 1200,
    height: 787,
  },
  {
    handle: "matatastudio-tale-bot-pro",
    brand: "matatastudio",
    src: "/images/products/matatastudio-tale-bot-pro/two-girls-sitting-on-floor-playing-with-tale-bot-on-board.jpg",
    alt: "Two girls sitting on the floor coding Tale-Bot Pro on its map",
    width: 983,
    height: 739,
  },
  {
    handle: "matatastudio-tale-bot-pro",
    brand: "matatastudio",
    src: "/images/products/matatastudio-tale-bot-pro/young-girls-pressing-buttons-on-talebot-pro.png",
    alt: "Young girls pressing the command buttons on Tale-Bot Pro",
    width: 1200,
    height: 1500,
  },
  {
    handle: "matatastudio-vincibot-coding-robot-set",
    brand: "matatastudio",
    src: "/images/products/matatastudio-vincibot-coding-robot-set/child-coding-on-laptop-with-vincibot-next-to-her-on-built-pathway.png",
    alt: "Child coding on a laptop with VinciBot on a built pathway beside her",
    width: 830,
    height: 542,
  },

  // Makerzoid — programmable robotics with building bricks
  {
    handle: "makerzoid-robot-master-premium",
    brand: "makerzoid",
    src: "/images/products/makerzoid-robot-master-premium/two-kids-playing-together-building-and-with-app-on-phone.png",
    alt: "Two kids building a Makerzoid robot together with the app on a phone",
    width: 783,
    height: 839,
  },
  {
    handle: "makerzoid-superbot",
    brand: "makerzoid",
    src: "/images/products/makerzoid-superbot/child-building-blocks-with-tablet.jpg",
    alt: "Child building with Makerzoid Superbot bricks, a tablet showing instructions nearby",
    width: 1200,
    height: 1193,
  },
  {
    handle: "makerzoid-superbot",
    brand: "makerzoid",
    src: "/images/products/makerzoid-superbot/child-reaching-into-box-with-block-parts.jpg",
    alt: "Child reaching into the Makerzoid Superbot box to pick building pieces",
    width: 1200,
    height: 1108,
  },
  {
    handle: "makerzoid-diverse-building-blocks",
    brand: "makerzoid",
    src: "/images/products/makerzoid-diverse-building-blocks/hands-holding-a-robot-build.jpg",
    alt: "Two hands holding a completed Makerzoid robot build",
    width: 800,
    height: 800,
  },

  // BBC micro:bit — pocket-sized computer for learning to code
  {
    handle: "micro-bit-wearable-x-10",
    brand: "bbc-microbit",
    src: "/images/products/micro-bit-wearable-x-10/kid-dancing-infront-of-projector-screen.jpg",
    alt: "Child dancing with a micro:bit wearable strapped to their wrist",
    width: 1200,
    height: 1113,
  },
  {
    handle: "bbc-micro-bit-club",
    brand: "bbc-microbit",
    src: "/images/products/bbc-micro-bit-club/girls-hand-holding-microbit-infront-of-computer.jpg",
    alt: "Girl holding a micro:bit board in front of a computer screen",
    width: 1200,
    height: 1200,
  },
  {
    handle: "micro-bit-wearable-x-10",
    brand: "bbc-microbit",
    src: "/images/products/micro-bit-wearable-x-10/kids-in-circle-with-straps-on-wrists.jpeg",
    alt: "Group of children in a circle wearing micro:bit wearable straps",
    width: 1200,
    height: 675,
  },
  {
    handle: "bbc-micro-bit-club",
    brand: "bbc-microbit",
    src: "/images/products/bbc-micro-bit-club/kids-on-computers-python-and-block-coding.jpg",
    alt: "Learners on computers exploring Python and block-based coding",
    width: 1200,
    height: 1200,
  },

  // ELECFREAKS — robots and kits that extend the micro:bit
  {
    handle: "elecfreaks-micro-bit-tinker-kit",
    brand: "elecfreaks",
    src: "/images/products/elecfreaks-micro-bit-tinker-kit/kids-in-classroom.jpeg",
    alt: "Kids in a classroom coding with micro:bit and Tinker Kit components",
    width: 1200,
    height: 721,
  },
  {
    handle: "elecfreaks-micro-bit-smart-cutebot-pro",
    brand: "elecfreaks",
    src: "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/hand-plugging-in-microbit-with-cutebot-behind.jpg",
    alt: "Hand plugging a micro:bit into the Cutebot Pro robot car",
    width: 800,
    height: 800,
  },
  {
    handle: "elecfreaks-micro-bit-tinker-kit",
    brand: "elecfreaks",
    src: "/images/products/elecfreaks-micro-bit-tinker-kit/plant-monitoring-device-example.jpg",
    alt: "Plant monitoring device built with the Tinker Kit soil sensor",
    width: 1200,
    height: 1200,
  },

  // Arduino — open-source electronics for teen makers and up
  {
    handle: "arduino-sensor-kit-base",
    brand: "arduino",
    src: "/images/products/arduino-sensor-kit-base/kids-smiling-holding-sensor-base.jpg",
    alt: "Kids smiling while holding the Arduino Sensor Kit base board",
    width: 1024,
    height: 927,
  },
  {
    handle: "arduino-sensor-kit-base",
    brand: "arduino",
    src: "/images/products/arduino-sensor-kit-base/arduino-camp-kids-in-class.jpg",
    alt: "Kids working with Arduino kits in a classroom setting",
    width: 2048,
    height: 1536,
  },
  {
    handle: "arduino-student-kit",
    brand: "arduino",
    src: "/images/products/arduino-student-kit/teen-homeschooling-with-student-kit.jpg",
    alt: "Teenager homeschooling with the Arduino Student Kit",
    width: 800,
    height: 800,
  },
  {
    handle: "arduino-starter-kit",
    brand: "arduino",
    src: "/images/products/arduino-starter-kit/finger-pressing-button-light-on.jpg",
    alt: "Finger pressing a button with an LED lit up on an Arduino breadboard",
    width: 675,
    height: 900,
  },

  // NASA — telescopes and space kits
  {
    handle: "nasa-astronaut-helmet",
    brand: "nasa",
    src: "/images/products/nasa-astronaut-helmet/child-dressed-in-astronaut-outfit.jpg",
    alt: "Child in an astronaut suit and NASA helmet giving two thumbs up",
    width: 1200,
    height: 1600,
  },
  {
    handle: "nasa-lunar-telescope",
    brand: "nasa",
    src: "/images/products/nasa-lunar-telescope/end-user-child-looking-through-telescope.jpg",
    alt: "Child looking through the NASA Lunar Telescope",
    width: 1060,
    height: 1885,
  },
  {
    handle: "nasa-astronaut-helmet",
    brand: "nasa",
    src: "/images/products/nasa-astronaut-helmet/child-dressed-up-as-astronaut.jpg",
    alt: "Child dressed up as an astronaut wearing the NASA helmet",
    width: 1200,
    height: 1600,
  },

  // Blockaroo — magnetic foam builders for the youngest engineers
  {
    handle: "blockaroo-magnetic-foam-builders-trunk-set",
    brand: "blockaroo",
    src: "/images/home/customer-wall/blockaroo-bath.jpg",
    alt: "Foam building blocks stuck to the side of a bath",
    width: 900,
    height: 1200,
  },
];
