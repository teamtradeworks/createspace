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
  color: string; // brand accent, used to tint the category icon
};

export const CATEGORIES: Category[] = [
  { id: "robotics", label: "Robotics", icon: "/images/icons/robotic-arm.svg", color: "#3CC7F7" },
  { id: "coding", label: "Coding", icon: "/images/icons/laptop-code.svg", color: "#AC4DFF" },
  { id: "electricity", label: "Electronics & Circuits", icon: "/images/icons/bolt.svg", color: "#FFD500" },
  { id: "building-mechanics", label: "Building & Mechanics", icon: "/images/icons/wrench-alt.svg", color: "#FF8B00" },
  { id: "earth-sciences", label: "Earth Sciences", icon: "/images/icons/save-the-planet.svg", color: "#93DB21" },
  { id: "astronomy", label: "Space & Astronomy", icon: "/images/icons/rocket-lunch.svg", color: "#F70B28" },
  { id: "chemistry", label: "Chemistry", icon: "/images/icons/eye-dropper.svg", color: "#93DB21" },
];
