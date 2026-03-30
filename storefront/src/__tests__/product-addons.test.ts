import { describe, it, expect } from "vitest";
import {
  getAddonConfigsForHandle,
  serializeAddons,
  type ResolvedAddon,
} from "@/lib/product-addons";
import type { ProductDetail } from "@/lib/shopify";

describe("getAddonConfigsForHandle", () => {
  it("returns matching addon configs for a known parent", () => {
    const configs = getAddonConfigsForHandle("elecfreaks-micro-bit-tinker-kit");
    expect(configs).toHaveLength(2);
    expect(configs[0]).toMatchObject({
      parentHandle: "elecfreaks-micro-bit-tinker-kit",
      addonHandle: "bbc-micro-bit-go",
      discountPercent: 15,
    });
    expect(configs[1]).toMatchObject({
      parentHandle: "elecfreaks-micro-bit-tinker-kit",
      addonHandle: "varta-long-life-aaa-alkaline-battery",
      quantity: 2,
      discountPercent: 0,
    });
  });

  it("returns empty array for unknown parent", () => {
    expect(getAddonConfigsForHandle("nonexistent-product")).toEqual([]);
  });
});

describe("serializeAddons", () => {
  const mockProduct: ProductDetail = {
    id: "gid://shopify/Product/123",
    title: "BBC micro:bit Go",
    handle: "bbc-micro-bit-go",
    description: "A micro:bit board",
    descriptionHtml: "<p>A micro:bit board</p>",
    vendor: "BBC",
    productType: "Board",
    tags: [],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: "800.00", currencyCode: "ZAR" },
      maxVariantPrice: { amount: "800.00", currencyCode: "ZAR" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "0.00", currencyCode: "ZAR" },
    },
    images: {
      edges: [{ node: { url: "https://cdn.shopify.com/image.jpg", altText: null } }],
    },
    variants: { edges: [] },
    minAge: null,
    maxAge: null,
    batteriesRequired: null,
    batteriesIncluded: null,
    batteriesList: null,
    projects: null,
    guide: null,
    soldering: null,
    codingPlatform: null,
    rating: null,
    ratingCount: null,
  };

  const resolved: ResolvedAddon[] = [
    {
      product: mockProduct,
      variantId: "gid://shopify/ProductVariant/456",
      discountPercent: 15,
      quantity: 1,
      originalPrice: 800,
      discountedPrice: 680,
      currencyCode: "ZAR",
      formattedOriginalPrice: "R800.00",
      formattedDiscountedPrice: "R680.00",
      savings: 120,
      formattedSavings: "R120.00",
      description: "Add a micro:bit",
      viewProductLink: true,
    },
  ];

  it("serializes resolved addons for client components", () => {
    const serialized = serializeAddons(resolved);
    expect(serialized).toHaveLength(1);
    expect(serialized[0]).toEqual({
      productId: "gid://shopify/Product/123",
      variantId: "gid://shopify/ProductVariant/456",
      title: "BBC micro:bit Go",
      handle: "bbc-micro-bit-go",
      image: "https://cdn.shopify.com/image.jpg",
      discountPercent: 15,
      quantity: 1,
      originalPrice: 800,
      discountedPrice: 680,
      currencyCode: "ZAR",
      formattedOriginalPrice: "R800.00",
      formattedDiscountedPrice: "R680.00",
      savings: 120,
      formattedSavings: "R120.00",
      available: true,
      description: "Add a micro:bit",
      viewProductLink: true,
    });
  });

  it("handles product with no images", () => {
    const noImageAddon: ResolvedAddon[] = [
      {
        ...resolved[0],
        product: { ...mockProduct, images: { edges: [] } },
      },
    ];
    const serialized = serializeAddons(noImageAddon);
    expect(serialized[0].image).toBeNull();
  });

  it("prefixes title with quantity when greater than 1", () => {
    const multiQty: ResolvedAddon[] = [
      {
        ...resolved[0],
        quantity: 2,
        originalPrice: 1600,
        discountedPrice: 1360,
      },
    ];
    const serialized = serializeAddons(multiQty);
    expect(serialized[0].title).toBe("2 x BBC micro:bit Go");
    expect(serialized[0].quantity).toBe(2);
  });

  it("does not prefix title when quantity is 1", () => {
    const serialized = serializeAddons(resolved);
    expect(serialized[0].title).toBe("BBC micro:bit Go");
  });

  it("returns empty array for empty input", () => {
    expect(serializeAddons([])).toEqual([]);
  });
});
