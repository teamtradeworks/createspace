import { describe, it, expect } from "vitest";
import { shopifyIdToFeraId } from "@/lib/fera";

describe("shopifyIdToFeraId", () => {
  it("extracts numeric ID from Shopify product GID", () => {
    expect(shopifyIdToFeraId("gid://shopify/Product/7654321")).toBe("7654321");
  });

  it("extracts numeric ID from variant GID", () => {
    expect(shopifyIdToFeraId("gid://shopify/ProductVariant/123456")).toBe(
      "123456"
    );
  });

  it("handles string with no slashes", () => {
    expect(shopifyIdToFeraId("12345")).toBe("12345");
  });
});
