import { describe, it, expect } from "vitest";
import {
  CartItem,
  getAvailableItems,
  getCartItemCount,
  getCartSubtotal,
} from "@/context/CartContext";

function makeItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: "prod-1",
    variantId: "var-1",
    title: "Test Product",
    price: 100,
    currencyCode: "ZAR",
    quantity: 1,
    handle: "test-product",
    available: true,
    ...overrides,
  };
}

describe("cart availability helpers", () => {
  describe("getAvailableItems", () => {
    it("includes items with available=true", () => {
      const items = [makeItem({ available: true })];
      expect(getAvailableItems(items)).toHaveLength(1);
    });

    it("includes items with available=undefined (legacy cart data)", () => {
      const items = [makeItem({ available: undefined })];
      expect(getAvailableItems(items)).toHaveLength(1);
    });

    it("excludes items with available=false", () => {
      const items = [makeItem({ available: false })];
      expect(getAvailableItems(items)).toHaveLength(0);
    });

    it("filters a mixed set correctly", () => {
      const items = [
        makeItem({ variantId: "v1", available: true }),
        makeItem({ variantId: "v2", available: false }),
        makeItem({ variantId: "v3", available: undefined }),
        makeItem({ variantId: "v4", available: false }),
      ];
      const result = getAvailableItems(items);
      expect(result).toHaveLength(2);
      expect(result.map((i) => i.variantId)).toEqual(["v1", "v3"]);
    });
  });

  describe("getCartItemCount", () => {
    it("returns 0 for empty cart", () => {
      expect(getCartItemCount([])).toBe(0);
    });

    it("sums quantities of available items only", () => {
      const items = [
        makeItem({ variantId: "v1", quantity: 2, available: true }),
        makeItem({ variantId: "v2", quantity: 3, available: false }),
        makeItem({ variantId: "v3", quantity: 1, available: true }),
      ];
      expect(getCartItemCount(items)).toBe(3);
    });

    it("returns 0 when all items are out of stock", () => {
      const items = [
        makeItem({ variantId: "v1", quantity: 5, available: false }),
        makeItem({ variantId: "v2", quantity: 2, available: false }),
      ];
      expect(getCartItemCount(items)).toBe(0);
    });
  });

  describe("getCartSubtotal", () => {
    it("returns 0 for empty cart", () => {
      expect(getCartSubtotal([])).toBe(0);
    });

    it("sums price * quantity for available items only", () => {
      const items = [
        makeItem({ variantId: "v1", price: 200, quantity: 2, available: true }),
        makeItem({ variantId: "v2", price: 500, quantity: 1, available: false }),
        makeItem({ variantId: "v3", price: 150, quantity: 3, available: true }),
      ];
      // (200*2) + (150*3) = 400 + 450 = 850
      expect(getCartSubtotal(items)).toBe(850);
    });

    it("returns 0 when all items are out of stock", () => {
      const items = [makeItem({ variantId: "v1", price: 999, quantity: 10, available: false })];
      expect(getCartSubtotal(items)).toBe(0);
    });

    it("includes items without available field (legacy data)", () => {
      const items = [makeItem({ variantId: "v1", price: 100, quantity: 1, available: undefined })];
      expect(getCartSubtotal(items)).toBe(100);
    });
  });
});
