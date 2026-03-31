import { describe, it, expect } from "vitest";
import {
  formatPrice,
  formatAgeRange,
  getProductAgeRange,
  getProductBatteryInfo,
  getProductRating,
  getStockStatus,
  isDigitalProduct,
  type ProductDetail,
} from "@/lib/shopify";

describe("formatPrice", () => {
  it("hides cents by default for ZAR", () => {
    expect(formatPrice("1234.56", "ZAR")).toBe("R 1,234");
  });

  it("formats whole numbers without cents by default", () => {
    expect(formatPrice("100", "ZAR")).toBe("R 100");
  });

  it("adds commas for thousands", () => {
    expect(formatPrice("1000", "ZAR")).toBe("R 1,000");
    expect(formatPrice("1000000", "ZAR")).toBe("R 1,000,000");
  });

  it("handles small amounts", () => {
    expect(formatPrice("0.99", "ZAR")).toBe("R 0");
    expect(formatPrice("0", "ZAR")).toBe("R 0");
  });

  it("handles numeric input", () => {
    expect(formatPrice(1234.5, "ZAR")).toBe("R 1,234");
  });

  it("formats non-ZAR without cents by default", () => {
    expect(formatPrice("1234.56", "USD")).toBe("USD 1,234");
    expect(formatPrice("99.99", "EUR")).toBe("EUR 99");
  });

  it("rounds to 2 decimal places", () => {
    expect(formatPrice("10.999", "ZAR")).toBe("R 11");
    expect(formatPrice("10.005", "ZAR")).toBe("R 10");
  });

  it("shows cents when showCents is true", () => {
    expect(formatPrice("1234.56", "ZAR", { showCents: true })).toBe("R 1,234.56");
    expect(formatPrice("100", "ZAR", { showCents: true })).toBe("R 100.00");
    expect(formatPrice(1234.5, "ZAR", { showCents: true })).toBe("R 1,234.50");
    expect(formatPrice("99.99", "EUR", { showCents: true })).toBe("EUR 99.99");
  });
});

describe("formatAgeRange", () => {
  it("returns range for min and max age", () => {
    expect(formatAgeRange({ value: "6" }, { value: "12" })).toBe("Ages 6-12");
  });

  it("returns min+ when no max age", () => {
    expect(formatAgeRange({ value: "10" }, null)).toBe("Ages 10+");
  });

  it("returns null when no min age", () => {
    expect(formatAgeRange(null, { value: "12" })).toBe(null);
  });

  it("returns null for both null", () => {
    expect(formatAgeRange(null, null)).toBe(null);
  });

  it("returns null for non-numeric min age", () => {
    expect(formatAgeRange({ value: "abc" }, null)).toBe(null);
  });

  it("returns min+ for non-numeric max age", () => {
    expect(formatAgeRange({ value: "6" }, { value: "abc" })).toBe("Ages 6+");
  });

  it("handles empty value strings", () => {
    expect(formatAgeRange({ value: "" }, null)).toBe(null);
  });
});

// Helper to build a minimal ProductDetail with metafield overrides
function makeProduct(overrides: Partial<ProductDetail> = {}): ProductDetail {
  return {
    id: "gid://shopify/Product/1",
    title: "Test Product",
    handle: "test-product",
    description: "",
    descriptionHtml: "",
    vendor: "",
    productType: "",
    tags: [],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: "100.00", currencyCode: "ZAR" },
      maxVariantPrice: { amount: "100.00", currencyCode: "ZAR" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "0.00", currencyCode: "ZAR" },
    },
    images: { edges: [] },
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
    ...overrides,
  };
}

describe("getProductAgeRange", () => {
  it("returns undefined when no min age", () => {
    expect(getProductAgeRange(makeProduct())).toBeUndefined();
  });

  it("returns X+ format when only min age", () => {
    expect(getProductAgeRange(makeProduct({ minAge: { value: "8" } }))).toBe("8+");
  });

  it("returns X-Y format with both ages", () => {
    expect(
      getProductAgeRange(makeProduct({ minAge: { value: "6" }, maxAge: { value: "12" } })),
    ).toBe("6-12");
  });
});

describe("getProductBatteryInfo", () => {
  it("returns undefined when metafield is null", () => {
    expect(getProductBatteryInfo(makeProduct())).toBeUndefined();
  });

  it("returns 'No batteries required' when not required", () => {
    expect(getProductBatteryInfo(makeProduct({ batteriesRequired: { value: "false" } }))).toBe(
      "No batteries required",
    );
  });

  it("returns battery type with included status", () => {
    expect(
      getProductBatteryInfo(
        makeProduct({
          batteriesRequired: { value: "true" },
          batteriesIncluded: { value: "true" },
          batteriesList: {
            reference: {
              type: "battery",
              fields: [{ key: "label", value: "2x AA" }],
            },
          },
        }),
      ),
    ).toBe("2x AA (included)");
  });

  it("returns battery type with not included status", () => {
    expect(
      getProductBatteryInfo(
        makeProduct({
          batteriesRequired: { value: "true" },
          batteriesIncluded: { value: "false" },
          batteriesList: {
            reference: {
              type: "battery",
              fields: [{ key: "label", value: "3x AAA" }],
            },
          },
        }),
      ),
    ).toBe("3x AAA (not included)");
  });

  it("returns fallback when no battery type specified", () => {
    expect(
      getProductBatteryInfo(
        makeProduct({
          batteriesRequired: { value: "true" },
          batteriesIncluded: { value: "true" },
        }),
      ),
    ).toBe("Included");
  });

  it("returns 'Required' fallback when not included and no type", () => {
    expect(
      getProductBatteryInfo(
        makeProduct({
          batteriesRequired: { value: "true" },
          batteriesIncluded: { value: "false" },
        }),
      ),
    ).toBe("Required");
  });
});

describe("getProductRating", () => {
  it("returns null when no rating", () => {
    expect(getProductRating(null, null)).toBeNull();
  });

  it("returns null when rating but no count", () => {
    expect(getProductRating({ value: '{"value":"4.5"}' }, null)).toBeNull();
  });

  it("parses valid rating and count", () => {
    const result = getProductRating({ value: '{"value":"4.5"}' }, { value: "12" });
    expect(result).toEqual({ average: 4.5, count: 12 });
  });

  it("returns null for zero count", () => {
    expect(getProductRating({ value: '{"value":"4.5"}' }, { value: "0" })).toBeNull();
  });

  it("returns null for invalid JSON", () => {
    expect(getProductRating({ value: "not json" }, { value: "5" })).toBeNull();
  });
});

function makeVariant(
  overrides: {
    availableForSale?: boolean;
    currentlyNotInStock?: boolean;
    requiresShipping?: boolean;
  } = {},
) {
  return {
    node: {
      id: "gid://shopify/ProductVariant/1",
      title: "Default",
      availableForSale: overrides.availableForSale ?? true,
      currentlyNotInStock: overrides.currentlyNotInStock ?? false,
      requiresShipping: overrides.requiresShipping ?? true,
      price: { amount: "100.00", currencyCode: "ZAR" },
      compareAtPrice: null,
    },
  };
}

describe("getStockStatus", () => {
  it("returns 'out-of-stock' when product is not available for sale", () => {
    const product = makeProduct({
      availableForSale: false,
      variants: { edges: [makeVariant({ availableForSale: false })] },
    });
    expect(getStockStatus(product)).toBe("out-of-stock");
  });

  it("returns 'in-stock' when variant has physical inventory", () => {
    const product = makeProduct({
      availableForSale: true,
      variants: {
        edges: [makeVariant({ availableForSale: true, currentlyNotInStock: false })],
      },
    });
    expect(getStockStatus(product)).toBe("in-stock");
  });

  it("returns 'lead-time' when all available variants are currentlyNotInStock", () => {
    const product = makeProduct({
      availableForSale: true,
      variants: {
        edges: [makeVariant({ availableForSale: true, currentlyNotInStock: true })],
      },
    });
    expect(getStockStatus(product)).toBe("lead-time");
  });

  it("returns 'in-stock' when at least one variant has stock (mixed)", () => {
    const product = makeProduct({
      availableForSale: true,
      variants: {
        edges: [
          makeVariant({ availableForSale: true, currentlyNotInStock: true }),
          makeVariant({ availableForSale: true, currentlyNotInStock: false }),
        ],
      },
    });
    expect(getStockStatus(product)).toBe("in-stock");
  });

  it("ignores unavailable variants when checking lead-time", () => {
    const product = makeProduct({
      availableForSale: true,
      variants: {
        edges: [
          makeVariant({ availableForSale: true, currentlyNotInStock: true }),
          makeVariant({ availableForSale: false, currentlyNotInStock: false }),
        ],
      },
    });
    expect(getStockStatus(product)).toBe("lead-time");
  });

  it("returns 'in-stock' when product has no variants", () => {
    const product = makeProduct({
      availableForSale: true,
      variants: { edges: [] },
    });
    expect(getStockStatus(product)).toBe("in-stock");
  });
});

describe("isDigitalProduct", () => {
  it("returns true when no variant requires shipping", () => {
    const product = makeProduct({
      variants: {
        edges: [makeVariant({ requiresShipping: false })],
      },
    });
    expect(isDigitalProduct(product)).toBe(true);
  });

  it("returns false when any variant requires shipping", () => {
    const product = makeProduct({
      variants: {
        edges: [makeVariant({ requiresShipping: false }), makeVariant({ requiresShipping: true })],
      },
    });
    expect(isDigitalProduct(product)).toBe(false);
  });

  it("returns false for physical products", () => {
    const product = makeProduct({
      variants: {
        edges: [makeVariant({ requiresShipping: true })],
      },
    });
    expect(isDigitalProduct(product)).toBe(false);
  });

  it("returns false when product has no variants", () => {
    const product = makeProduct({
      variants: { edges: [] },
    });
    expect(isDigitalProduct(product)).toBe(false);
  });
});
