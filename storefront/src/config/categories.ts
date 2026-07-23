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
  icon: string;
};

export const CATEGORIES: Category[] = [
  { id: "robotics", label: "Robotics", icon: "/images/icons/robotic-arm.svg" },
  { id: "coding", label: "Coding", icon: "/images/icons/laptop-code.svg" },
  { id: "electricity", label: "Electronics & Circuits", icon: "/images/icons/bolt.svg" },
  { id: "building-mechanics", label: "Building & Mechanics", icon: "/images/icons/wrench-alt.svg" },
  { id: "earth-sciences", label: "Earth Sciences", icon: "/images/icons/save-the-planet.svg" },
  { id: "astronomy", label: "Space & Astronomy", icon: "/images/icons/rocket-lunch.svg" },
  { id: "chemistry", label: "Chemistry", icon: "/images/icons/eye-dropper.svg" },
];
