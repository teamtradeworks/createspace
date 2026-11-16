import { describe, it, expect } from "vitest";
import { BLACK_FRIDAY, PROMOS, activeNavPromo, isPromoActive } from "@/config/promo";
import { BLACK_FRIDAY_PRODUCTS, BLACK_FRIDAY_HANDLES } from "@/config/black-friday";

describe("Black Friday sale window", () => {
  it("is hidden until 19 November 2026 in South Africa", () => {
    // 23:59 SAST on 18 Nov = 21:59 UTC
    expect(isPromoActive(BLACK_FRIDAY, new Date("2026-11-18T21:59:00Z"))).toBe(false);
  });

  it("goes live at midnight SAST on 19 November 2026", () => {
    // 00:00 SAST on 19 Nov = 22:00 UTC on 18 Nov
    expect(isPromoActive(BLACK_FRIDAY, new Date("2026-11-18T22:00:00Z"))).toBe(true);
  });

  it("stays live through the end of 30 November 2026", () => {
    expect(isPromoActive(BLACK_FRIDAY, new Date("2026-11-30T21:59:00Z"))).toBe(true);
  });

  it("is gone on 1 December 2026", () => {
    expect(isPromoActive(BLACK_FRIDAY, new Date("2026-11-30T22:00:01Z"))).toBe(false);
  });

  it("features the sale in the nav, linking to the sale page, while it is live", () => {
    expect(activeNavPromo(new Date("2026-11-25T10:00:00Z"))).toEqual({
      label: "Black Friday Sale",
      href: "/black-friday",
    });
    expect(activeNavPromo(new Date("2026-11-17T10:00:00Z"))).toBeNull();
    expect(activeNavPromo(new Date("2026-12-01T10:00:00Z"))).toBeNull();
  });

  it("is in the promo list", () => {
    expect(PROMOS).toContain(BLACK_FRIDAY);
  });
});

describe("Black Friday products", () => {
  it("lists the 35 products from the pricing sheet plus the Arduino Sensor Kit", () => {
    expect(BLACK_FRIDAY_HANDLES).toHaveLength(36);
    expect(BLACK_FRIDAY_HANDLES).toContain("arduino-sensor-kit-base");
  });

  it("lists each product once", () => {
    expect(new Set(BLACK_FRIDAY_HANDLES).size).toBe(BLACK_FRIDAY_HANDLES.length);
  });

  it("gives every product a positive whole-Rand sale price below its was price", () => {
    for (const product of BLACK_FRIDAY_PRODUCTS) {
      expect(Number.isInteger(product.salePrice) && product.salePrice > 0).toBe(true);
      expect(product.salePrice, product.handle).toBeLessThan(product.wasPrice);
    }
  });

  it("rounds every sale price to the nearest R10", () => {
    for (const product of BLACK_FRIDAY_PRODUCTS) {
      expect(product.salePrice % 10, product.handle).toBe(0);
    }
  });
});
