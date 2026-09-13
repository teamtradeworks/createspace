import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Set required env vars before importing the module under test.
process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN = "test-shop.myshopify.com";
process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN = "test-token";

import { shopifyFetch, hasProductsOnSale } from "@/lib/shopify";

const QUERY = "query { shop { name } }";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function htmlResponse(body: string, status = 502): Response {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html" },
  });
}

describe("shopifyFetch", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns data on a successful response", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(jsonResponse({ data: { shop: { name: "OK" } } }));

    const data = await shopifyFetch<{ shop: { name: string } }>({ query: QUERY });

    expect(data.shop.name).toBe("OK");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("retries once on a network error and then succeeds", async () => {
    const networkError = new TypeError("fetch failed");
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValueOnce(networkError)
      .mockResolvedValueOnce(jsonResponse({ data: { shop: { name: "RETRY" } } }));

    const data = await shopifyFetch<{ shop: { name: string } }>({ query: QUERY });

    expect(data.shop.name).toBe("RETRY");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("retries once on a 5xx response and then succeeds", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(htmlResponse("<!-- gateway error -->", 503))
      .mockResolvedValueOnce(jsonResponse({ data: { shop: { name: "OK" } } }));

    const data = await shopifyFetch<{ shop: { name: string } }>({ query: QUERY });

    expect(data.shop.name).toBe("OK");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("throws with status and snippet on a non-OK response after retry", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(htmlResponse("<!-- gateway error -->", 503))
      .mockResolvedValueOnce(htmlResponse("<!-- still failing -->", 503));

    await expect(shopifyFetch({ query: QUERY })).rejects.toThrow(/Shopify 503/);
  });

  it("does not retry deterministic GraphQL-level errors", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(jsonResponse({ data: null, errors: [{ message: "Bad query" }] }));

    await expect(shopifyFetch({ query: QUERY })).rejects.toThrow("Bad query");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("retries once on a transient Shopify internal error and then succeeds", async () => {
    // Shopify returns this on an HTTP 200 when something fails on their side.
    // Seen in production on POST /api/checkout (Sentry CREATESPACE-28).
    const internalError = {
      message:
        "Internal error. Looks like something went wrong on our end.\nRequest ID: abc-123 (include this in support requests).",
    };
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(jsonResponse({ data: null, errors: [internalError] }))
      .mockResolvedValueOnce(jsonResponse({ data: { shop: { name: "OK" } } }));

    const data = await shopifyFetch<{ shop: { name: string } }>({ query: QUERY });

    expect(data.shop.name).toBe("OK");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("retries once when Shopify reports throttling", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(jsonResponse({ data: null, errors: [{ message: "Throttled" }] }))
      .mockResolvedValueOnce(jsonResponse({ data: { shop: { name: "OK" } } }));

    const data = await shopifyFetch<{ shop: { name: string } }>({ query: QUERY });

    expect(data.shop.name).toBe("OK");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("throws the Shopify message when a transient error persists on retry", async () => {
    const internalError = {
      message: "Internal error. Looks like something went wrong on our end.",
    };
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(jsonResponse({ data: null, errors: [internalError] }))
      .mockResolvedValueOnce(jsonResponse({ data: null, errors: [internalError] }));

    await expect(shopifyFetch({ query: QUERY })).rejects.toThrow(/Internal error/);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("does not retry on a 4xx response", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(htmlResponse("Not found", 404));

    await expect(shopifyFetch({ query: QUERY })).rejects.toThrow(/Shopify 404/);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("hasProductsOnSale", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function collection(nodes: { price: string; compareAt?: string }[]): Response {
    return jsonResponse({
      data: {
        collection: {
          products: {
            edges: nodes.map((n) => ({
              node: {
                priceRange: { minVariantPrice: { amount: n.price } },
                compareAtPriceRange: n.compareAt
                  ? { minVariantPrice: { amount: n.compareAt } }
                  : null,
              },
            })),
          },
        },
      },
    });
  }

  it("is true when any product carries a live discount", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      collection([{ price: "100" }, { price: "80", compareAt: "120" }]),
    );
    expect(await hasProductsOnSale()).toBe(true);
  });

  it("is false when nothing is discounted", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      collection([{ price: "100" }, { price: "80", compareAt: "80" }]),
    );
    expect(await hasProductsOnSale()).toBe(false);
  });

  it("is false when the collection is missing", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      jsonResponse({ data: { collection: null } }),
    );
    expect(await hasProductsOnSale()).toBe(false);
  });

  // The header calls this on every route, so a Shopify outage must hide the
  // shortcut rather than take the whole site down with it.
  it("is false, not thrown, when Shopify fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(globalThis, "fetch").mockResolvedValue(htmlResponse("Bad gateway", 502));
    await expect(hasProductsOnSale()).resolves.toBe(false);
  });
});
