import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Set required env vars before importing the module under test.
process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN = "test-shop.myshopify.com";
process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN = "test-token";

import { shopifyFetch } from "@/lib/shopify";

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

    await expect(shopifyFetch({ query: QUERY })).rejects.toThrow(
      /Shopify 503/,
    );
  });

  it("does not retry GraphQL-level errors", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(
        jsonResponse({ data: null, errors: [{ message: "Bad query" }] }),
      );

    await expect(shopifyFetch({ query: QUERY })).rejects.toThrow("Bad query");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("does not retry on a 4xx response", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(htmlResponse("Not found", 404));

    await expect(shopifyFetch({ query: QUERY })).rejects.toThrow(/Shopify 404/);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
