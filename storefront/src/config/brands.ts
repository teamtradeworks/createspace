/**
 * Canonical brand list for CREATESPACE.
 *
 * `vendor` is the exact Shopify vendor string, used for shop filtering.
 * `key` is a stable slug for internal references (e.g. photo wall attribution).
 */
export type Brand = {
  key: string;
  name: string;
  logo: string;
  vendor: string;
};

export const BRANDS: Brand[] = [
  {
    key: "matatastudio",
    name: "MatataStudio",
    logo: "/images/brands/matatastudio.png",
    vendor: "MatataStudio",
  },
  {
    key: "makerzoid",
    name: "Makerzoid",
    logo: "/images/brands/makerzoid.png",
    vendor: "Makerzoid",
  },
  {
    key: "bbc-microbit",
    name: "BBC micro:bit",
    logo: "/images/brands/bbc-microbit.png",
    vendor: "micro:bit",
  },
  {
    key: "elecfreaks",
    name: "ELECFREAKS",
    logo: "/images/brands/elecfreaks.png",
    vendor: "ELECFREAKS",
  },
  {
    key: "snap-circuits",
    name: "Snap Circuits",
    logo: "/images/brands/snap-circuits.png",
    vendor: "Snap Circuits",
  },
  {
    key: "arduino",
    name: "Arduino",
    logo: "/images/brands/arduino.png",
    vendor: "Arduino",
  },
  {
    key: "national-geographic",
    name: "National Geographic",
    logo: "/images/brands/national-geographic.png",
    vendor: "National Geographic",
  },
  {
    key: "blockaroo",
    name: "Blockaroo",
    logo: "/images/brands/blockaroo.png",
    vendor: "Blockaroo",
  },
  {
    key: "nasa",
    name: "NASA",
    logo: "/images/brands/nasa.png",
    vendor: "NASA",
  },
  {
    key: "robotico",
    name: "Robotico",
    logo: "/images/brands/robotico.png",
    vendor: "Robotico",
  },
];
