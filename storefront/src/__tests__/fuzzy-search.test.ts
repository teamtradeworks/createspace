import { describe, it, expect } from "vitest";
import { fuzzySearchProducts } from "@/lib/fuzzy-search";
import type { Product } from "@/lib/shopify";

function makeProduct(partial: Partial<Product> & { title: string }): Product {
  return {
    id: `gid://shopify/Product/${partial.title}`,
    handle: partial.title.toLowerCase().replace(/\s+/g, "-"),
    description: "",
    vendor: "",
    tags: [],
    availableForSale: true,
    updatedAt: "2026-01-01T00:00:00Z",
    priceRange: { minVariantPrice: { amount: "100", currencyCode: "ZAR" } },
    images: { edges: [] },
    variants: { edges: [] },
    minAge: null,
    maxAge: null,
    rating: null,
    ratingCount: null,
    ...partial,
  };
}

const products: Product[] = [
  makeProduct({ title: "BBC micro:bit Club", tags: ["coding", "electronics"] }),
  makeProduct({ title: "Arduino Starter Kit", tags: ["electronics", "diy"] }),
  makeProduct({ title: "MatataStudio Tale-Bot Pro", vendor: "MatataStudio", tags: ["robot"] }),
  makeProduct({ title: "LEGO Education SPIKE", tags: ["blocks", "robotics"] }),
  makeProduct({ title: "Makerzoid Robot Master Premium", vendor: "Makerzoid", tags: ["robot"] }),
  makeProduct({ title: "Makerzoid Robot Master Tournament", vendor: "Makerzoid", tags: ["robot"] }),
  makeProduct({ title: "Makerzoid Smart Robot Premium", vendor: "Makerzoid", tags: ["robot"] }),
  makeProduct({
    title: "ELECFREAKS micro:bit Wearable Kit",
    vendor: "ELECFREAKS",
    tags: ["microbit"],
  }),
];

describe("fuzzySearchProducts", () => {
  it("returns empty array for empty or whitespace query", () => {
    expect(fuzzySearchProducts(products, "")).toEqual([]);
    expect(fuzzySearchProducts(products, "   ")).toEqual([]);
  });

  it("matches on exact title token", () => {
    const results = fuzzySearchProducts(products, "arduino");
    expect(results[0].title).toBe("Arduino Starter Kit");
  });

  it("tolerates typos in the query (microbit → micro:bit)", () => {
    const results = fuzzySearchProducts(products, "microbit");
    expect(results.map((p) => p.title)).toContain("BBC micro:bit Club");
  });

  it("matches on vendor", () => {
    const results = fuzzySearchProducts(products, "matatastudio");
    expect(results[0].title).toBe("MatataStudio Tale-Bot Pro");
  });

  it("matches on tag", () => {
    const results = fuzzySearchProducts(products, "robotics");
    expect(results.map((p) => p.title)).toContain("LEGO Education SPIKE");
  });

  it("returns no matches for unrelated queries", () => {
    expect(fuzzySearchProducts(products, "xyzqwerty")).toEqual([]);
  });

  it("matches when words are split that the title concatenates (matata studio → MatataStudio)", () => {
    const results = fuzzySearchProducts(products, "matata studio");
    expect(results[0].title).toBe("MatataStudio Tale-Bot Pro");
  });

  it("matches when a hyphen is removed from the title (talebot → Tale-Bot)", () => {
    const results = fuzzySearchProducts(products, "talebot");
    expect(results.map((p) => p.title)).toContain("MatataStudio Tale-Bot Pro");
  });

  it("tolerates a missing letter (talbot → Tale-Bot)", () => {
    const results = fuzzySearchProducts(products, "talbot");
    expect(results.map((p) => p.title)).toContain("MatataStudio Tale-Bot Pro");
  });

  it("tolerates transposed letters (ardiuno → Arduino)", () => {
    const results = fuzzySearchProducts(products, "ardiuno");
    expect(results.map((p) => p.title)).toContain("Arduino Starter Kit");
  });

  it("resolves synonyms (MatataLabs → MatataStudio)", () => {
    const results = fuzzySearchProducts(products, "MatataLabs");
    expect(results.map((p) => p.title)).toContain("MatataStudio Tale-Bot Pro");
  });

  it("resolves synonyms with spacing (Matata Labs → MatataStudio)", () => {
    const results = fuzzySearchProducts(products, "Matata Labs");
    expect(results.map((p) => p.title)).toContain("MatataStudio Tale-Bot Pro");
  });

  it("matches 'robot master' to all Robot Master titles", () => {
    const titles = fuzzySearchProducts(products, "robot master").map((p) => p.title);
    expect(titles).toContain("Makerzoid Robot Master Premium");
    expect(titles).toContain("Makerzoid Robot Master Tournament");
  });

  it("matches 'robot master standard' even when no product has 'standard'", () => {
    const titles = fuzzySearchProducts(products, "robot master standard").map((p) => p.title);
    expect(titles).toContain("Makerzoid Robot Master Premium");
    expect(titles).toContain("Makerzoid Robot Master Tournament");
  });

  it("matches Elekfreaks → ELECFREAKS (c↔k swap)", () => {
    const titles = fuzzySearchProducts(products, "Elekfreaks").map((p) => p.title);
    expect(titles).toContain("ELECFREAKS micro:bit Wearable Kit");
  });
});
