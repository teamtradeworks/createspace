import { describe, it, expect } from "vitest";
import {
  isPromoActive,
  activePromos,
  activeNavPromo,
  activePromoSection,
  PROMO_SECTION_IDS,
  PROMOS,
  type Promo,
} from "@/config/promo";

const promo = (endsAt?: string, startsAt?: string): Promo => ({
  heading: "Test promo",
  cta: { label: "Go", href: "/shop" },
  ...(endsAt ? { endsAt } : {}),
  ...(startsAt ? { startsAt } : {}),
});

describe("isPromoActive", () => {
  it("keeps a promo with no endsAt forever", () => {
    expect(isPromoActive(promo(), new Date("2099-01-01T00:00:00Z"))).toBe(true);
  });

  it("keeps a promo through the end of its endsAt day in South Africa (UTC+2)", () => {
    // 23:59 SAST on the expiry day = 21:59 UTC
    expect(isPromoActive(promo("2026-08-06"), new Date("2026-08-06T21:59:00Z"))).toBe(true);
  });

  it("drops a promo once the endsAt day has passed in South Africa", () => {
    // 00:00:01 SAST the next day = 22:00:01 UTC on the endsAt date
    expect(isPromoActive(promo("2026-08-06"), new Date("2026-08-06T22:00:01Z"))).toBe(false);
  });

  it("holds a promo back until the start of its startsAt day in South Africa", () => {
    // 00:00 SAST on the start day = 22:00 UTC the day before
    const scheduled = promo("2026-11-30", "2026-11-27");
    expect(isPromoActive(scheduled, new Date("2026-11-26T21:59:59Z"))).toBe(false);
    expect(isPromoActive(scheduled, new Date("2026-11-26T22:00:00Z"))).toBe(true);
  });
});

describe("activePromos", () => {
  it("filters expired promos out of the configured list", () => {
    const farFuture = new Date("2099-01-01T00:00:00Z");
    // By 2099 every dated promo has lapsed; only evergreen promos remain.
    for (const p of activePromos(farFuture)) {
      expect(p.endsAt).toBeUndefined();
    }
  });
});

describe("activeNavPromo", () => {
  const sale: Promo = {
    badge: "Black Friday Sale",
    heading: "Up to 30% off.",
    cta: { label: "Shop the sale", href: "/shop?sale=true" },
    startsAt: "2026-11-27",
    endsAt: "2026-11-30",
    navLabel: "Black Friday Sale",
  };
  const evergreen: Promo = { heading: "Free course", cta: { label: "Learn more", href: "/x" } };
  const during = new Date("2026-11-28T10:00:00Z");

  it("features a live promo in the nav under its own name and link", () => {
    expect(activeNavPromo(during, [evergreen, sale])).toEqual({
      label: "Black Friday Sale",
      href: "/shop?sale=true",
    });
  });

  it("features nothing before the promotion starts or after it ends", () => {
    expect(activeNavPromo(new Date("2026-11-26T12:00:00Z"), [sale])).toBeNull();
    expect(activeNavPromo(new Date("2026-12-01T12:00:00Z"), [sale])).toBeNull();
  });

  it("ignores live promos that aren't promotions", () => {
    expect(activeNavPromo(during, [evergreen])).toBeNull();
  });

  it("picks the first live promotion when two overlap", () => {
    const brandPromo: Promo = {
      ...sale,
      navLabel: "Makerzoid Promo",
      cta: { label: "Shop Makerzoid", href: "/shop?brand=makerzoid" },
    };
    expect(activeNavPromo(during, [brandPromo, sale])?.label).toBe("Makerzoid Promo");
  });
});

describe("PROMOS config", () => {
  it("uses YYYY-MM-DD for every startsAt and endsAt", () => {
    for (const p of PROMOS) {
      for (const date of [p.startsAt, p.endsAt]) {
        if (date) {
          expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
          expect(Number.isNaN(new Date(`${date}T00:00:00+02:00`).getTime())).toBe(false);
        }
      }
    }
  });

  // With its tag icon, "School Holiday Sale" (19) leaves ~17px either side of
  // the pill on a 1024px desktop bar; longer labels crowd the logo.
  it("keeps every navLabel short enough for the desktop nav bar", () => {
    for (const p of PROMOS) {
      if (p.navLabel) expect(p.navLabel.length).toBeLessThanOrEqual(19);
    }
  });

  it("never ends a promo before it starts", () => {
    for (const p of PROMOS) {
      if (p.startsAt && p.endsAt) expect(p.startsAt <= p.endsAt).toBe(true);
    }
  });
});

describe("activePromoSection", () => {
  it("gives the homepage hero to the Black Friday section during the sale", () => {
    const active = activePromoSection("homeHero", new Date("2026-11-25T10:00:00Z"));
    expect(active?.id).toBe("black-friday-home-hero");
    expect(active?.promo.badge).toBe("Black Friday Sale");
  });

  it("switches on at midnight SAST on 19 Nov and stays on through 30 Nov", () => {
    // 00:00 SAST on 19 Nov = 22:00 UTC on 18 Nov
    expect(activePromoSection("homeHero", new Date("2026-11-18T22:00:00Z"))?.id).toBe(
      "black-friday-home-hero",
    );
    // 23:59 SAST on 30 Nov = 21:59 UTC
    expect(activePromoSection("homeHero", new Date("2026-11-30T21:59:00Z"))?.id).toBe(
      "black-friday-home-hero",
    );
  });

  it("falls back to the default (null) before the sale starts or after it ends (SAST)", () => {
    expect(activePromoSection("homeHero", new Date("2026-11-18T21:59:00Z"))).toBeNull();
    expect(activePromoSection("homeHero", new Date("2026-11-30T22:00:01Z"))).toBeNull();
  });

  it("leaves a slot the live promo does not fill on its default", () => {
    const heroOnly: Promo = { ...promo(), sections: { homeHero: "black-friday-home-hero" } };
    expect(
      activePromoSection("shopHeader", new Date("2026-11-25T10:00:00Z"), [heroOnly]),
    ).toBeNull();
  });

  it("gives the shop header to the Black Friday section during the sale", () => {
    expect(activePromoSection("shopHeader", new Date("2026-11-25T10:00:00Z"))?.id).toBe(
      "black-friday-shop-header",
    );
  });

  it("ignores live promos without sections", () => {
    expect(activePromoSection("homeHero", new Date("2026-01-01T00:00:00Z"), [promo()])).toBeNull();
  });

  it("skips an expired promo and uses the next live one for the slot", () => {
    const now = new Date("2026-06-15T10:00:00Z");
    const expired: Promo = {
      ...promo("2026-06-01"),
      badge: "Old",
      sections: { homeHero: "black-friday-home-hero" },
    };
    const live: Promo = {
      ...promo("2026-06-30"),
      badge: "Live",
      sections: { homeHero: "black-friday-home-hero" },
    };
    expect(activePromoSection("homeHero", now, [expired, live])?.promo.badge).toBe("Live");
  });
});

describe("PROMOS sections", () => {
  it("only reference registered section ids for known slots", () => {
    for (const p of PROMOS) {
      for (const [slot, id] of Object.entries(p.sections ?? {})) {
        expect(Object.keys(PROMO_SECTION_IDS)).toContain(slot);
        expect(
          PROMO_SECTION_IDS[slot as keyof typeof PROMO_SECTION_IDS] as readonly string[],
        ).toContain(id);
      }
    }
  });

  it("only give sections to promos with both dates, so they always end", () => {
    for (const p of PROMOS.filter((p) => p.sections)) {
      expect(p.startsAt, p.badge).toBeTruthy();
      expect(p.endsAt, p.badge).toBeTruthy();
    }
  });
});
