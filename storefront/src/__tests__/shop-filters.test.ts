import { describe, it, expect } from "vitest";
import {
  matchAge,
  matchCategory,
  matchBrand,
  filterAndSortProducts,
  AGE_BANDS,
} from "@/lib/shop-filters";
import type { Product } from "@/lib/shopify";

// Minimal Product builder — only the fields the filters/sort read.
function make(overrides: Partial<Product> = {}): Product {
  return {
    id: "gid://shopify/Product/1",
    title: "Kit",
    handle: "kit",
    description: "",
    vendor: "Makerzoid",
    tags: [],
    availableForSale: true,
    updatedAt: "2026-01-01T00:00:00Z",
    priceRange: { minVariantPrice: { amount: "100.00", currencyCode: "ZAR" } },
    images: { edges: [] },
    variants: {
      edges: [
        {
          node: {
            id: "v1",
            title: "Default",
            sku: "SKU1",
            availableForSale: true,
            currentlyNotInStock: false,
            price: { amount: "100.00", currencyCode: "ZAR" },
          },
        },
      ],
    },
    minAge: null,
    maxAge: null,
    rating: null,
    ratingCount: null,
    ...overrides,
  } as Product;
}

describe("matchAge", () => {
  it("matches everything when no ages are selected", () => {
    expect(matchAge(make({ minAge: { value: "6" } }), [])).toBe(true);
  });

  it("excludes products with no minimum age when a band is selected", () => {
    expect(matchAge(make({ minAge: null }), ["6-8"])).toBe(false);
  });

  it("matches when the product age range overlaps the band", () => {
    // product 8-12 overlaps the 9-12 band at 9-12
    const p = make({ minAge: { value: "8" }, maxAge: { value: "12" } });
    expect(matchAge(p, ["9-12"])).toBe(true);
  });

  it("does not match a band that sits entirely below the product's min age", () => {
    // product starts at 9; the 3-5 band is fully below it
    const p = make({ minAge: { value: "9" }, maxAge: { value: "12" } });
    expect(matchAge(p, ["3-5"])).toBe(false);
  });

  it("treats a missing max age as open-ended so it reaches the 13+ band", () => {
    const p = make({ minAge: { value: "10" }, maxAge: null });
    expect(matchAge(p, ["13+"])).toBe(true);
  });

  it("matches if any selected band overlaps (OR across bands)", () => {
    const p = make({ minAge: { value: "6" }, maxAge: { value: "8" } });
    expect(matchAge(p, ["3-5", "9-12"])).toBe(false);
    expect(matchAge(p, ["3-5", "6-8"])).toBe(true);
  });

  it("ignores an unknown band id", () => {
    expect(matchAge(make({ minAge: { value: "6" } }), ["nonsense"])).toBe(false);
  });
});

describe("matchCategory", () => {
  it("matches everything when no categories are selected", () => {
    expect(matchCategory(make({ tags: [] }), [])).toBe(true);
  });

  it("expands a merged category to any of its tags", () => {
    // robotics-coding expands to robotics + coding; a coding-only product matches
    const p = make({ tags: ["category:coding"] });
    expect(matchCategory(p, ["robotics-coding"])).toBe(true);
  });

  it("does not match when the product carries none of the category's tags", () => {
    const p = make({ tags: ["category:chemistry"] });
    expect(matchCategory(p, ["robotics-coding"])).toBe(false);
  });
});

describe("matchBrand", () => {
  it("matches case-insensitively on vendor", () => {
    expect(matchBrand(make({ vendor: "Makerzoid" }), ["makerzoid"])).toBe(true);
    expect(matchBrand(make({ vendor: "makerzoid" }), ["Makerzoid"])).toBe(true);
  });

  it("does not match a different vendor", () => {
    expect(matchBrand(make({ vendor: "Arduino" }), ["Makerzoid"])).toBe(false);
  });
});

describe("filterAndSortProducts", () => {
  const empty = { ages: [], categories: [], brands: [] };

  it("does not mutate the input array", () => {
    const products = [make({ id: "a", title: "B" }), make({ id: "b", title: "A" })];
    const snapshot = [...products];
    filterAndSortProducts(products, empty, "name-az");
    expect(products).toEqual(snapshot);
  });

  it("sorts by price low to high and high to low", () => {
    const cheap = make({ id: "cheap", priceRange: { minVariantPrice: { amount: "50", currencyCode: "ZAR" } } });
    const dear = make({ id: "dear", priceRange: { minVariantPrice: { amount: "500", currencyCode: "ZAR" } } });
    expect(filterAndSortProducts([dear, cheap], empty, "price-low").map((p) => p.id)).toEqual([
      "cheap",
      "dear",
    ]);
    expect(filterAndSortProducts([cheap, dear], empty, "price-high").map((p) => p.id)).toEqual([
      "dear",
      "cheap",
    ]);
  });

  it("keeps the fetched order for the featured sort", () => {
    const products = [make({ id: "x", title: "Z" }), make({ id: "y", title: "A" })];
    expect(filterAndSortProducts(products, empty, "featured").map((p) => p.id)).toEqual(["x", "y"]);
  });

  it("sinks out-of-stock products to the end regardless of sort", () => {
    const inStock = make({ id: "in", title: "A", availableForSale: true });
    const outOfStock = make({
      id: "out",
      title: "AAA", // would sort first alphabetically
      availableForSale: false,
      variants: {
        edges: [
          {
            node: {
              id: "v",
              title: "Default",
              sku: null,
              availableForSale: false,
              currentlyNotInStock: false,
              price: { amount: "100", currencyCode: "ZAR" },
            },
          },
        ],
      },
    });
    // Alphabetical would put "AAA" first, but out-of-stock always sinks last.
    expect(filterAndSortProducts([outOfStock, inStock], empty, "name-az").map((p) => p.id)).toEqual(
      ["in", "out"],
    );
  });

  it("applies all three axes together", () => {
    const match = make({
      id: "match",
      vendor: "Makerzoid",
      minAge: { value: "6" },
      maxAge: { value: "8" },
      tags: ["category:robotics"],
    });
    const wrongBrand = make({ ...match, id: "wrongBrand", vendor: "Arduino" } as Partial<Product>);
    const result = filterAndSortProducts(
      [match, wrongBrand],
      { ages: ["6-8"], categories: ["robotics-coding"], brands: ["Makerzoid"] },
      "featured",
    );
    expect(result.map((p) => p.id)).toEqual(["match"]);
  });
});

describe("AGE_BANDS", () => {
  it("covers the four site-wide bands in order", () => {
    expect(AGE_BANDS.map((b) => b.id)).toEqual(["3-5", "6-8", "9-12", "13+"]);
  });
});
