import { describe, it, expect } from "vitest";
import {
  getBundleSavings,
  getTotalBundleSaving,
  normaliseBundleLine,
} from "@/lib/bundle-pricing";
import { getCartSubtotal, type CartItem } from "@/context/CartContext";

const CUTEBOT = "elecfreaks-micro-bit-smart-cutebot-pro";
const TPBOT = "elecfreaks-tpbot-car-kit";
const MICROBIT = "bbc-micro-bit-go";

function line(handle: string, quantity: number, price: number, extra: Partial<CartItem> = {}) {
  return {
    id: `prod-${handle}`,
    variantId: `var-${handle}`,
    title: handle,
    price,
    currencyCode: "ZAR",
    quantity,
    handle,
    available: true,
    ...extra,
  } satisfies CartItem;
}

const microbitSaving = (items: CartItem[]) => getBundleSavings(items).get(`var-${MICROBIT}`);

describe("getBundleSavings (mirrors Shopify's 15% off BBC micro:bit Go)", () => {
  it("discounts one micro:bit for one kit", () => {
    expect(microbitSaving([line(CUTEBOT, 1, 1200), line(MICROBIT, 1, 450)])).toEqual({
      units: 1,
      amount: 67.5,
    });
  });

  it("discounts only one of two micro:bits when there is one kit", () => {
    expect(microbitSaving([line(CUTEBOT, 1, 1200), line(MICROBIT, 2, 450)])).toEqual({
      units: 1,
      amount: 67.5,
    });
  });

  it("discounts one micro:bit per kit", () => {
    expect(microbitSaving([line(CUTEBOT, 2, 1200), line(MICROBIT, 2, 450)])).toEqual({
      units: 2,
      amount: 135,
    });
  });

  it("counts different kits together", () => {
    const items = [line(CUTEBOT, 1, 1200), line(TPBOT, 1, 900), line(MICROBIT, 3, 450)];
    expect(microbitSaving(items)).toEqual({ units: 2, amount: 135 });
  });

  it("gives no saving without a kit", () => {
    expect(microbitSaving([line(MICROBIT, 1, 450)])).toBeUndefined();
  });

  it("ignores an out-of-stock kit", () => {
    const items = [line(CUTEBOT, 1, 1200, { available: false }), line(MICROBIT, 1, 450)];
    expect(microbitSaving(items)).toBeUndefined();
  });

  it("gives no saving for add-ons without a discount", () => {
    const items = [line(CUTEBOT, 1, 1200), line("18650-lithium-flat-top-battery", 1, 100)];
    expect(getTotalBundleSaving(getBundleSavings(items))).toBe(0);
  });
});

describe("getCartSubtotal with bundle savings", () => {
  it("matches Shopify checkout for one Cutebot Pro and two micro:bits", () => {
    // Shopify: 1200 + 450 + (450 - 67.50) = 2032.50
    expect(getCartSubtotal([line(CUTEBOT, 1, 1200), line(MICROBIT, 2, 450)])).toBe(2032.5);
  });
});

describe("normaliseBundleLine", () => {
  it("restores full price on a micro:bit line saved at the old discounted price", () => {
    const legacy = line(MICROBIT, 2, 382.5, { compareAtPrice: 450 });
    expect(normaliseBundleLine(legacy)).toMatchObject({ price: 450, compareAtPrice: undefined });
  });

  it("leaves other sale items alone", () => {
    const sale = line(CUTEBOT, 1, 1000, { compareAtPrice: 1200 });
    expect(normaliseBundleLine(sale)).toBe(sale);
  });
});
