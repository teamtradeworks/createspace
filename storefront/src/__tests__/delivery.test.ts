import { describe, it, expect } from "vitest";
import {
  qualifiesForFreeDelivery,
  calculateDeliveryCost,
  amountToFreeDelivery,
  DELIVERY_CONFIG,
} from "@/config/delivery";

describe("delivery", () => {
  describe("DELIVERY_CONFIG", () => {
    it("loads config from site.json", () => {
      expect(DELIVERY_CONFIG.freeDeliveryThreshold).toBe(1500);
      expect(DELIVERY_CONFIG.standardDeliveryCost).toBe(128);
    });
  });

  describe("qualifiesForFreeDelivery", () => {
    it("returns false below threshold", () => {
      expect(qualifiesForFreeDelivery(0)).toBe(false);
      expect(qualifiesForFreeDelivery(1499.99)).toBe(false);
    });

    it("returns true at exactly the threshold", () => {
      expect(qualifiesForFreeDelivery(1500)).toBe(true);
    });

    it("returns true above threshold", () => {
      expect(qualifiesForFreeDelivery(1500.01)).toBe(true);
      expect(qualifiesForFreeDelivery(5000)).toBe(true);
    });
  });

  describe("calculateDeliveryCost", () => {
    it("returns standard cost below threshold", () => {
      expect(calculateDeliveryCost(0)).toBe(128);
      expect(calculateDeliveryCost(1499.99)).toBe(128);
    });

    it("returns 0 at or above threshold", () => {
      expect(calculateDeliveryCost(1500)).toBe(0);
      expect(calculateDeliveryCost(3000)).toBe(0);
    });
  });

  describe("amountToFreeDelivery", () => {
    it("returns full threshold for zero subtotal", () => {
      expect(amountToFreeDelivery(0)).toBe(1500);
    });

    it("returns remaining amount below threshold", () => {
      expect(amountToFreeDelivery(1000)).toBe(500);
      expect(amountToFreeDelivery(1499.99)).toBeCloseTo(0.01);
    });

    it("returns 0 at or above threshold", () => {
      expect(amountToFreeDelivery(1500)).toBe(0);
      expect(amountToFreeDelivery(2000)).toBe(0);
    });
  });
});
