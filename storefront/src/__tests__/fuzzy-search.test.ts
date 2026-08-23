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
  makeProduct({ title: "Robotico ESP32 Starter Kit", vendor: "Robotico", tags: ["electronics"] }),
  makeProduct({
    title: "Robotico Ultimate UNO R3 Starter Kit",
    vendor: "Robotico",
    tags: ["electronics"],
  }),
  makeProduct({
    title: "MatataStudio VinciBot Coding Robot Set",
    vendor: "MatataStudio",
    tags: ["robot"],
  }),
  makeProduct({
    title: "National Geographic Metal Detector Starter Kit",
    vendor: "National Geographic",
    tags: ["earth-sciences"],
    // Descriptions must not be searchable: this one name-drops hardware the
    // product isn't, and used to drag it into unrelated result sets.
    description: "A metal detector for young explorers. Not an ESP32 or Arduino board.",
  }),
];

/** Titles of a search, for terser assertions. */
function titles(query: string): string[] {
  return fuzzySearchProducts(products, query).products.map((p) => p.title);
}

describe("fuzzySearchProducts", () => {
  it("returns no results for empty or whitespace query", () => {
    expect(fuzzySearchProducts(products, "")).toEqual({ kind: "none", products: [] });
    expect(fuzzySearchProducts(products, "   ")).toEqual({ kind: "none", products: [] });
  });

  it("matches on exact title token", () => {
    expect(titles("arduino")[0]).toBe("Arduino Starter Kit");
  });

  it("tolerates typos in the query (microbit → micro:bit)", () => {
    expect(titles("microbit")).toContain("BBC micro:bit Club");
  });

  it("matches on vendor", () => {
    expect(titles("matatastudio")[0]).toBe("MatataStudio Tale-Bot Pro");
  });

  it("matches on tag", () => {
    expect(titles("robotics")).toContain("LEGO Education SPIKE");
  });

  it("returns no matches for unrelated queries", () => {
    expect(fuzzySearchProducts(products, "xyzqwerty")).toEqual({ kind: "none", products: [] });
  });

  it("matches when words are split that the title concatenates (matata studio → MatataStudio)", () => {
    expect(titles("matata studio")[0]).toBe("MatataStudio Tale-Bot Pro");
  });

  it("matches when a hyphen is removed from the title (talebot → Tale-Bot)", () => {
    expect(titles("talebot")).toContain("MatataStudio Tale-Bot Pro");
  });

  it("tolerates a missing letter (talbot → Tale-Bot)", () => {
    expect(titles("talbot")).toContain("MatataStudio Tale-Bot Pro");
  });

  it("tolerates transposed letters (ardiuno → Arduino)", () => {
    expect(titles("ardiuno")).toContain("Arduino Starter Kit");
  });

  it("resolves synonyms (MatataLabs → MatataStudio)", () => {
    expect(titles("MatataLabs")).toContain("MatataStudio Tale-Bot Pro");
  });

  it("resolves synonyms with spacing (Matata Labs → MatataStudio)", () => {
    expect(titles("Matata Labs")).toContain("MatataStudio Tale-Bot Pro");
  });

  it("resolves the Nat Geo abbreviation", () => {
    expect(titles("nat geo")).toContain("National Geographic Metal Detector Starter Kit");
  });

  it("matches 'robot master' to all Robot Master titles", () => {
    const found = titles("robot master");
    expect(found).toContain("Makerzoid Robot Master Premium");
    expect(found).toContain("Makerzoid Robot Master Tournament");
  });

  it("matches 'robot master standard' even when no product has 'standard'", () => {
    const found = titles("robot master standard");
    expect(found).toContain("Makerzoid Robot Master Premium");
    expect(found).toContain("Makerzoid Robot Master Tournament");
  });

  it("matches Elekfreaks → ELECFREAKS (c↔k swap)", () => {
    expect(titles("Elekfreaks")).toContain("ELECFREAKS micro:bit Wearable Kit");
  });

  describe("precision", () => {
    it("does not match short unrelated words to half the catalogue", () => {
      // At a looser threshold "oil" and "clean" pulled in 10-16 products.
      for (const noise of ["oil", "clean", "helmet"]) {
        expect(fuzzySearchProducts(products, noise).products).toEqual([]);
      }
    });

    it("ignores product descriptions, so a name-drop can't hijack a search", () => {
      // The metal detector's description mentions ESP32 and Arduino.
      expect(titles("esp32")).toEqual(["Robotico ESP32 Starter Kit"]);
      expect(titles("arduino")).not.toContain("National Geographic Metal Detector Starter Kit");
    });

    it("ranks a whole-word title match above a coincidental vendor substring", () => {
      // "robot" is a literal prefix of the vendor "Robotico", which used to
      // outrank every product that is actually a robot.
      const found = titles("robot");
      expect(found[0]).not.toBe("Robotico ESP32 Starter Kit");
      expect(found.slice(0, 4)).toContain("Makerzoid Robot Master Premium");
    });
  });

  describe("spacing and punctuation are normalised away", () => {
    it("finds a one-word title from a spaced query (esp 32 → ESP32)", () => {
      expect(titles("esp 32")).toContain("Robotico ESP32 Starter Kit");
    });

    it("finds a punctuated title from an unpunctuated query (vincibot → VinciBot)", () => {
      expect(titles("vincibot")).toContain("MatataStudio VinciBot Coding Robot Set");
    });
  });

  describe("long queries", () => {
    it("still finds the brand when most of the query's words are absent", () => {
      // As one string this scores too poorly to match anything, because the
      // words the catalogue carries are outweighed by the ones it doesn't. Word
      // level matching recovers it, and "robotico" is a brand we stock, so
      // these are results rather than suggestions.
      const result = fuzzySearchProducts(products, "robotico 37 sensor module kit");
      expect(result.kind).toBe("match");
      expect(result.products[0].vendor).toBe("Robotico");
    });

    it("suggests the closest starter kits for a brand we do not stock", () => {
      // "raspberry" and "pico" match nothing, so only the generic tail of the
      // query lands. Calling that a result would overstate what we sell.
      const result = fuzzySearchProducts(products, "raspberry pi pico starter kit");
      expect(result.kind).toBe("related");
      expect(result.products.map((p) => p.title)).toContain("Robotico Ultimate UNO R3 Starter Kit");
    });

    it("suggests rather than claims a match when the lead word is unknown", () => {
      const result = fuzzySearchProducts(products, "elenco teach tech hydrobot arm kit");
      expect(result.kind).toBe("related");
      expect(result.products.length).toBeGreaterThan(0);
    });

    it("reports none rather than suggesting noise from a two-letter word", () => {
      // "pi" is below the minimum token length, so "raspberry pi" has only one
      // meaningful word and nothing in the catalogue matches it.
      expect(fuzzySearchProducts(products, "raspberry pi").kind).toBe("none");
    });

    it("caps suggestions so the related tier stays a shortlist", () => {
      const result = fuzzySearchProducts(products, "zzzz robot kit set starter premium master");
      expect(result.products.length).toBeLessThanOrEqual(8);
    });
  });
});
