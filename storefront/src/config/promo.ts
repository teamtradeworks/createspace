// Rotating homepage promo strip (PromoBand), and the header's promotion pill.
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
// `startsAt` and `endsAt` ("YYYY-MM-DD") bound a promo in South Africa
// (UTC+2): it appears from the START of `startsAt` and stays through the END
// of `endsAt`, then drops out automatically — no code change needed when a
// sale begins or lapses. Keep any date mentioned in the copy in sync with them.
//
// `navLabel` also features the promo in the header nav, as a yellow pill with
// that label (the promo's name, e.g. "Black Friday Sale") linking to the CTA,
// for exactly as long as the promo is live. Set it on real promotions only;
// with none live, the nav has no pill at all. If several are live at once, the
// first in this list wins. Keep it to 19 characters or fewer (a test checks):
// any longer and it crowds the desktop bar at 1024px.
export type PromoSegment = string | { text: string; href: string };

export type Promo = {
  badge?: string;
  eyebrow?: string;
  heading: string | PromoSegment[];
  body?: string;
  cta: { label: string; href: string };
  startsAt?: string;
  endsAt?: string;
  navLabel?: string;
};

export type NavPromo = { label: string; href: string };

// Whether a promo is live at `now`. Missing dates leave that side open: a
// promo with neither is always on. `startsAt` begins at 00:00 SAST that day;
// `endsAt` lasts through 23:59:59 SAST on that day.
export function isPromoActive(promo: Promo, now: Date): boolean {
  if (promo.startsAt && now < new Date(`${promo.startsAt}T00:00:00+02:00`)) return false;
  if (promo.endsAt && now > new Date(`${promo.endsAt}T23:59:59+02:00`)) return false;
  return true;
}

export function activePromos(now: Date = new Date()): Promo[] {
  return PROMOS.filter((promo) => isPromoActive(promo, now));
}

// The promotion the header nav should feature right now, if any.
export function activeNavPromo(now: Date = new Date(), promos: Promo[] = PROMOS): NavPromo | null {
  const promo = promos.find((p) => p.navLabel && isPromoActive(p, now));
  return promo?.navLabel ? { label: promo.navLabel, href: promo.cta.href } : null;
}

export const PROMOS: Promo[] = [
  {
    badge: "School Holiday Sale",
    heading: "20% off selected products.",
    body: "Ends 30 September.",
    cta: { label: "Shop the sale", href: "/shop?sale=true" },
    startsAt: "2026-09-16",
    endsAt: "2026-09-30",
    navLabel: "School Holiday Sale",
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
