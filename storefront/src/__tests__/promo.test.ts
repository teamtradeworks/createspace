import { describe, it, expect } from "vitest";
import { isPromoActive, activePromos, PROMOS, type Promo } from "@/config/promo";

const promo = (endsAt?: string): Promo => ({
  heading: "Test promo",
  cta: { label: "Go", href: "/shop" },
  ...(endsAt ? { endsAt } : {}),
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

describe("PROMOS config", () => {
  it("uses YYYY-MM-DD for every endsAt", () => {
    for (const p of PROMOS) {
      if (p.endsAt) {
        expect(p.endsAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(Number.isNaN(new Date(`${p.endsAt}T00:00:00+02:00`).getTime())).toBe(false);
      }
    }
  });
});
