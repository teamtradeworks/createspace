/**
 * Canonical product category list for CREATESPACE.
 *
 * `id` matches the Shopify tag (products carry `category:<id>` tags) and the
 * `/shop?category=` query parameter. Labels are display-only, so renames here
 * never require retagging in Shopify admin.
 *
 * Used by the homepage category chips and the shop page filter — keep this the
 * single source of truth so the two can't drift apart.
 */
export type Category = {
  id: string;
  label: string;
  icon: string; // monochrome line icon, used in the nav dropdown and shop filter
  illustration: string; // colourful brand illustration, used on the homepage chips
  color: string; // brand accent, used to tint the category icon
  // Shopify `category:<tag>` values this category matches. Defaults to [id].
  // Set explicitly when one display category spans several product tags.
  matchTags?: string[];
};

export const CATEGORIES: Category[] = [
  {
    id: "robotics-coding",
    label: "Robotics & Coding",
    icon: "/images/icons/robotic-arm.svg",
    illustration: "/images/illustrations/robot-2.svg",
    color: "#3CC7F7",
    matchTags: ["robotics", "coding"],
  },
  {
    id: "electricity",
    label: "Electronics & Circuits",
    icon: "/images/icons/bolt.svg",
    illustration: "/images/illustrations/chip-1.svg",
    color: "#FFD500",
  },
  {
    id: "building-mechanics",
    label: "Building & Mechanics",
    icon: "/images/icons/wrench-alt.svg",
    illustration: "/images/illustrations/nut.svg",
    color: "#FF8B00",
  },
  {
    id: "earth-sciences",
    label: "Earth Sciences",
    icon: "/images/icons/save-the-planet.svg",
    illustration: "/images/illustrations/earth.svg",
    color: "#93DB21",
  },
  {
    id: "astronomy",
    label: "Space & Astronomy",
    icon: "/images/icons/rocket-lunch.svg",
    illustration: "/images/illustrations/planet-1.svg",
    color: "#F70B28",
  },
  {
    id: "chemistry",
    label: "Chemistry",
    icon: "/images/icons/flask.svg",
    illustration: "/images/illustrations/beaker.svg",
    color: "#93DB21",
  },
];

// The Shopify `category:<tag>` values a category id filters on. Falls back to
// the id itself so unknown/legacy ids (e.g. an old `?category=coding` link)
// still resolve to their tag.
export function categoryMatchTags(id: string): string[] {
  return CATEGORIES.find((c) => c.id === id)?.matchTags ?? [id];
}
