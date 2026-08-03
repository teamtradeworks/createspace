// Rotating homepage promo strip (PromoBand).
//
// The strip cycles through these in order (first entry shows first) — via the
// left/right arrows and a gentle auto-advance. Add, remove, or reorder freely;
// empty the array to hide the strip. Keep each message to one line + one CTA;
// the strip truncates rather than wraps, so lead with the words that matter.
// `badge` renders as a striking red attention badge (use for sales); `eyebrow`
// is the quieter navy pill. Dates and discounts are copy — update them here.
export type Promo = {
  badge?: string;
  eyebrow?: string;
  heading: string;
  body?: string;
  cta: { label: string; href: string };
};

export const PROMOS: Promo[] = [
  {
    badge: "20% OFF",
    heading: "Makerzoid robotics kits",
    body: "Build, code and bring robots to life. Sale ends 6 August.",
    cta: { label: "Shop the sale", href: "/shop?brand=Makerzoid" },
  },
  {
    eyebrow: "Just landed",
    heading: "National Geographic, NASA & Blockaroo are here",
    body: "Science kits, space sets and magnetic builders. Our newest brands, now in stock.",
    cta: { label: "Shop new brands", href: "/shop?brand=Blockaroo%2CNASA%2CNational%20Geographic" },
  },
  {
    eyebrow: "For teachers",
    heading: "Spend R1,500, get a free teaching course",
    body: "A free Inspire Africa online course (worth R490) with every qualifying order.",
    cta: { label: "Learn more", href: "/education/courses" },
  },
];
