// Rotating homepage promo strip (PromoBand).
//
// The strip cycles through these in order (first entry shows first) — via the
// left/right arrows and a gentle auto-advance. Add, remove, or reorder freely;
// empty the array to hide the strip. Keep each message to one line + one CTA;
// the strip truncates rather than wraps, so lead with the words that matter.
// `badge` renders as a striking red attention badge (use for sales); `eyebrow`
// is the quieter navy pill. Dates and discounts are copy — update them here.
//
// `heading` is either a plain string, or an array of segments where any segment
// can be an inline link: `["Save on ", { text: "robots", href: "/shop" }, "!"]`.
// Inline links render underlined within the single-line heading.
export type PromoSegment = string | { text: string; href: string };

export type Promo = {
  badge?: string;
  eyebrow?: string;
  heading: string | PromoSegment[];
  body?: string;
  cta: { label: string; href: string };
};

export const PROMOS: Promo[] = [
  {
    badge: "20% off Makerzoid",
    heading: "Build, code and bring robots to life.",
    body: "Ends 6 August.",
    cta: { label: "Shop the Makerzoid sale", href: "/shop?brand=Makerzoid" },
  },
  {
    eyebrow: "FREE COURSE",
    heading: [
      "Spend R1,500, get full access to the ",
      { text: "Early Years Coding & Robotics", href: "/education/courses" },
      " online course",
    ],
    body: "Worth R999.",
    cta: { label: "Learn more", href: "/education/courses" },
  },
];
