import { describe, it, expect, vi, afterEach } from "vitest";
import { shopifyIdToFeraId, decodeHtmlEntities, openWriteReview } from "@/lib/fera";

describe("shopifyIdToFeraId", () => {
  it("extracts numeric ID from Shopify product GID", () => {
    expect(shopifyIdToFeraId("gid://shopify/Product/7654321")).toBe("7654321");
  });

  it("extracts numeric ID from variant GID", () => {
    expect(shopifyIdToFeraId("gid://shopify/ProductVariant/123456")).toBe("123456");
  });

  it("handles string with no slashes", () => {
    expect(shopifyIdToFeraId("12345")).toBe("12345");
  });
});

describe("decodeHtmlEntities", () => {
  it("decodes the entities Fera encodes in review text", () => {
    expect(
      decodeHtmlEntities(
        "Tom &amp; Jerry &lt;3 &quot;robots&quot; &#39;n&#39; &apos;bots&apos; &gt;",
      ),
    ).toBe(`Tom & Jerry <3 "robots" 'n' 'bots' >`);
  });

  it("does not double-decode an escaped entity", () => {
    expect(decodeHtmlEntities("&amp;lt;")).toBe("&lt;");
  });

  it("returns plain text unchanged", () => {
    expect(decodeHtmlEntities("Great kit, my son loves it")).toBe("Great kit, my son loves it");
  });

  // Regression: Fera returns `body: null` for rating-only reviews, which threw
  // "Cannot read properties of null (reading 'replace')" and crashed the product page.
  it("returns an empty string for a null review body", () => {
    expect(decodeHtmlEntities(null)).toBe("");
  });

  it("returns an empty string for undefined", () => {
    expect(decodeHtmlEntities(undefined)).toBe("");
  });

  it("returns an empty string for an empty string", () => {
    expect(decodeHtmlEntities("")).toBe("");
  });
});

describe("openWriteReview", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("opens Fera's review form for the given product", () => {
    const writeReview = vi.fn();
    vi.stubGlobal("window", { fera: { writeReview } });

    expect(openWriteReview("8056467161225")).toBe(true);
    expect(writeReview).toHaveBeenCalledWith({ product_id: "8056467161225" });
  });

  it("returns false when the Fera SDK hasn't loaded", () => {
    vi.stubGlobal("window", {});
    expect(openWriteReview("8056467161225")).toBe(false);
  });

  it("returns false outside the browser", () => {
    expect(openWriteReview("8056467161225")).toBe(false);
  });
});
