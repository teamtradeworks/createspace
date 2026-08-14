/**
 * Canonical brand list for CREATESPACE.
 *
 * `vendor` is the exact Shopify vendor string, used for shop filtering.
 * `key` is a stable slug for internal references (e.g. photo wall attribution).
 * `blurb` is a one-line, factual description shown in brand spotlights.
 */
type Brand = {
  key: string;
  name: string;
  logo: string;
  vendor: string;
  blurb: string;
};

export const BRANDS: Brand[] = [
  {
    key: "matatastudio",
    name: "MatataStudio",
    logo: "/images/brands/matatastudio.png",
    vendor: "MatataStudio",
    blurb: "Screen-free coding robots for ages 3 to 9.",
  },
  {
    key: "makerzoid",
    name: "Makerzoid",
    logo: "/images/brands/makerzoid.png",
    vendor: "Makerzoid",
    blurb: "Programmable robotics kits that build with LEGO-compatible bricks.",
  },
  {
    key: "bbc-microbit",
    name: "BBC micro:bit",
    logo: "/images/brands/bbc-microbit.png",
    vendor: "micro:bit",
    blurb: "The BBC's pocket-sized computer, built for learning to code.",
  },
  {
    key: "elecfreaks",
    name: "ELECFREAKS",
    logo: "/images/brands/elecfreaks.png",
    vendor: "ELECFREAKS",
    blurb: "Robots, kits and add-ons that extend the micro:bit.",
  },
  {
    key: "snap-circuits",
    name: "Snap Circuits",
    logo: "/images/brands/snap-circuits.png",
    vendor: "Snap Circuits",
    blurb: "Snap-together electronics projects, no soldering needed.",
  },
  {
    key: "arduino",
    name: "Arduino",
    logo: "/images/brands/arduino.png",
    vendor: "Arduino",
    blurb: "The open-source electronics platform for teen makers and up.",
  },
  {
    key: "national-geographic",
    name: "National Geographic",
    logo: "/images/brands/national-geographic.png",
    vendor: "National Geographic",
    blurb: "Hands-on science kits from a name kids already know.",
  },
  {
    key: "blockaroo",
    name: "Blockaroo",
    logo: "/images/brands/blockaroo.png",
    vendor: "Blockaroo",
    blurb: "Magnetic foam builders made for the youngest engineers.",
  },
  {
    key: "nasa",
    name: "NASA",
    logo: "/images/brands/nasa.png",
    vendor: "NASA",
    blurb: "Telescopes and space kits carrying the NASA badge.",
  },
  {
    key: "robotico",
    name: "Robotico",
    logo: "/images/brands/robotico.png",
    vendor: "Robotico",
    blurb: "Arduino-compatible starter kits with guided projects.",
  },
];
