import { describe, it, expect } from "vitest";
import { buildFeaturedKit, buildPoints, leadSentence } from "@/lib/featured";
import { type ProductDetail, type Metafield } from "@/lib/shopify";

const mf = (value: string | null): Metafield => ({ value }) as Metafield;

function makeProduct(overrides: Partial<ProductDetail> = {}): ProductDetail {
  return {
    id: "gid://1",
    title: "Arduino Starter Kit",
    handle: "arduino-starter-kit",
    description: "A hands-on electronics kit. Great for teens who want to build real circuits.",
    vendor: "Arduino",
    tags: [],
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: "1200.00", currencyCode: "ZAR" } },
    compareAtPriceRange: { minVariantPrice: { amount: "0.0", currencyCode: "ZAR" } },
    images: {
      edges: [
        { node: { url: "https://cdn/img1.jpg", altText: "front" } },
        { node: { url: "https://cdn/img2.jpg?v=2", altText: null } },
      ],
    },
    minAge: mf("10"),
    maxAge: mf(null),
    projects: mf("15"),
    guide: mf("170-page book"),
    soldering: mf("false"),
    codingPlatform: mf("Scratch & Python"),
    batteriesIncluded: mf("true"),
    rating: mf(JSON.stringify({ value: "4.8" })),
    ratingCount: mf("23"),
    ...overrides,
  } as unknown as ProductDetail;
}

describe("buildPoints", () => {
  it("derives fact-based highlights from metafields, capped at 4", () => {
    const points = buildPoints(makeProduct());
    expect(points).toEqual([
      "15 projects",
      "Code with Scratch & Python",
      "No soldering needed",
      "Includes 170-page book",
    ]);
  });

  it("uses a worded projects value as-is instead of appending 'projects'", () => {
    expect(buildPoints(makeProduct({ projects: mf("33 lessons") }))[0]).toBe("33 lessons");
  });

  it("returns no points when the kit has none of the metafields", () => {
    const bare = makeProduct({
      projects: mf(null),
      codingPlatform: mf(null),
      soldering: mf(null),
      guide: mf(null),
      batteriesIncluded: mf(null),
    });
    expect(buildPoints(bare)).toEqual([]);
  });

  it("does not add a soldering point when soldering is required", () => {
    const points = buildPoints(makeProduct({ soldering: mf("true"), guide: mf(null) }));
    expect(points).not.toContain("No soldering needed");
  });
});

describe("buildFeaturedKit", () => {
  it("flags a sale only when compareAt exceeds price", () => {
    const onSale = buildFeaturedKit(
      makeProduct({
        compareAtPriceRange: { minVariantPrice: { amount: "1500.00", currencyCode: "ZAR" } },
      }),
    );
    expect(onSale.compareAtPrice).not.toBeNull();
    expect(onSale.discountPercent).toBe(20);

    const notOnSale = buildFeaturedKit(makeProduct());
    expect(notOnSale.compareAtPrice).toBeNull();
    expect(notOnSale.discountPercent).toBe(0);
  });

  it("caps the image list at 3 and width-caps the urls", () => {
    const kit = buildFeaturedKit(makeProduct());
    expect(kit.images.length).toBe(2);
    expect(kit.images[0].url).toContain("width=1200");
    expect(kit.images[1].url).toContain("width=800");
    expect(kit.images[1].alt).toBe("Arduino Starter Kit"); // falls back to title
  });

  it("carries age and rating through", () => {
    const kit = buildFeaturedKit(makeProduct());
    expect(kit.ageLabel).toBe("Ages 10+");
    expect(kit.rating).toEqual({ average: 4.8, count: 23 });
  });
});

describe("leadSentence", () => {
  it("returns the first sentence", () => {
    expect(leadSentence("A hands-on kit. More detail here.")).toBe("A hands-on kit.");
  });
  it("skips overly long single sentences", () => {
    expect(leadSentence("x".repeat(200))).toBeNull();
  });
  it("handles empty input", () => {
    expect(leadSentence("")).toBeNull();
  });
});
