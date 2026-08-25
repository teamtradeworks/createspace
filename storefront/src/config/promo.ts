// Rotating homepage promo strip (PromoBand).
//
// The strip cycles through these in order (first entry shows first) — via the
// left/right arrows and a gentle auto-advance. Add, remove, or reorder freely;
// empty the array to hide the strip. Keep each message to one line + one CTA;
// the strip truncates rather than wraps, so lead with the words that matter.
// `badge` renders as a striking red attention badge (use for sales); `eyebrow`
// is the quieter navy pill. Discounts are copy — update them here.
//
// `heading` is either a plain string, or an array of segments where any segment
// can be an inline link: `["Save on ", { text: "robots", href: "/shop" }, "!"]`.
// Inline links render underlined within the single-line heading.
//
// `endsAt` ("YYYY-MM-DD") keeps a promo visible through the END of that day in
// South Africa (UTC+2), then drops it automatically — no code change needed
// when a sale lapses. Keep any date mentioned in the copy in sync with it.
export type PromoSegment = string | { text: string; href: string };

export type Promo = {
  badge?: string;
  eyebrow?: string;
  heading: string | PromoSegment[];
  body?: string;
  cta: { label: string; href: string };
  endsAt?: string;
};

// Whether a promo is still live at `now`. A promo with no `endsAt` never
// expires; one with `endsAt` lasts through 23:59:59 SAST on that day.
export function isPromoActive(promo: Promo, now: Date): boolean {
  if (!promo.endsAt) return true;
  return now <= new Date(`${promo.endsAt}T23:59:59+02:00`);
}

export function activePromos(now: Date = new Date()): Promo[] {
  return PROMOS.filter((promo) => isPromoActive(promo, now));
}

export const PROMOS: Promo[] = [
  {
    badge: "20% off Makerzoid",
    heading: "Build, code and bring robots to life.",
    body: "Ends 31 August.",
    cta: { label: "Shop the Makerzoid sale", href: "/shop?brand=Makerzoid" },
    endsAt: "2026-08-31",
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
