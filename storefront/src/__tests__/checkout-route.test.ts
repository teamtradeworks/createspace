import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  shopifyFetch: vi.fn(),
  capture: vi.fn(),
  flush: vi.fn(),
  getCookies: vi.fn(),
}));

vi.mock("@/lib/shopify", () => ({
  shopifyFetch: mocks.shopifyFetch,
}));

vi.mock("@/lib/posthog-server", () => ({
  getPostHogClient: () => ({
    capture: mocks.capture,
    flush: mocks.flush,
  }),
}));

vi.mock("next/headers", () => ({
  cookies: async () => ({ getAll: mocks.getCookies }),
}));

import { NextRequest } from "next/server";
import { POST } from "@/app/api/checkout/route";

type Line = { variantId: string; quantity: number; handle?: string };

function makeRequest(body: unknown) {
  return new NextRequest("https://www.thecreatespace.co.za/api/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function setPostHogCookie(distinctId: string | null, name = "ph_test_posthog") {
  if (distinctId === null) {
    mocks.getCookies.mockReturnValue([]);
    return;
  }
  mocks.getCookies.mockReturnValue([
    { name, value: JSON.stringify({ distinct_id: distinctId }) },
  ]);
}

function mockCartCreateOk(checkoutUrl = "https://shop.example.com/checkouts/abc") {
  mocks.shopifyFetch.mockResolvedValueOnce({
    cartCreate: { cart: { checkoutUrl }, userErrors: [] },
  });
}

describe("checkout API route", () => {
  beforeEach(() => {
    mocks.shopifyFetch.mockReset();
    mocks.capture.mockReset();
    mocks.flush.mockReset().mockResolvedValue(undefined);
    mocks.getCookies.mockReset().mockReturnValue([]);
  });

  describe("validation", () => {
    it("returns 400 when lines array is empty", async () => {
      const res = await POST(makeRequest({ lines: [] }));
      expect(res.status).toBe(400);
      expect(mocks.shopifyFetch).not.toHaveBeenCalled();
    });

    it("returns 400 when lines is missing", async () => {
      const res = await POST(makeRequest({}));
      expect(res.status).toBe(400);
      expect(mocks.shopifyFetch).not.toHaveBeenCalled();
    });
  });

  describe("cart attributes", () => {
    it("attaches _posthog_distinct_id from the PostHog cookie", async () => {
      setPostHogCookie("anon-xyz");
      mockCartCreateOk();

      const lines: Line[] = [
        { variantId: "gid://shopify/ProductVariant/123", quantity: 1 },
      ];
      await POST(makeRequest({ lines }));

      const call = mocks.shopifyFetch.mock.calls[0][0];
      expect(call.variables.attributes).toContainEqual({
        key: "_posthog_distinct_id",
        value: "anon-xyz",
      });
    });

    it("does not attach _posthog_distinct_id when no PostHog cookie is present", async () => {
      setPostHogCookie(null);
      mockCartCreateOk();

      await POST(
        makeRequest({
          lines: [{ variantId: "gid://shopify/ProductVariant/123", quantity: 1 }],
        }),
      );

      const call = mocks.shopifyFetch.mock.calls[0][0];
      expect(call.variables.attributes).toEqual([]);
    });

    it("ignores a malformed PostHog cookie without throwing", async () => {
      mocks.getCookies.mockReturnValue([
        { name: "ph_test_posthog", value: "{not-json" },
      ]);
      mockCartCreateOk();

      const res = await POST(
        makeRequest({
          lines: [{ variantId: "gid://shopify/ProductVariant/123", quantity: 1 }],
        }),
      );

      expect(res.status).toBe(200);
      const call = mocks.shopifyFetch.mock.calls[0][0];
      expect(call.variables.attributes).toEqual([]);
    });

    it("only inspects cookies whose names match the PostHog pattern", async () => {
      mocks.getCookies.mockReturnValue([
        { name: "session", value: "irrelevant" },
        { name: "ph_test_posthog", value: JSON.stringify({ distinct_id: "anon-1" }) },
        { name: "ph_other", value: "not-posthog-shaped" },
      ]);
      mockCartCreateOk();

      await POST(
        makeRequest({
          lines: [{ variantId: "gid://shopify/ProductVariant/1", quantity: 1 }],
        }),
      );

      const call = mocks.shopifyFetch.mock.calls[0][0];
      expect(call.variables.attributes).toContainEqual({
        key: "_posthog_distinct_id",
        value: "anon-1",
      });
    });

    it("builds _posthog_handles keyed by numeric variant id extracted from the gid", async () => {
      setPostHogCookie("anon-1");
      mockCartCreateOk();

      const lines: Line[] = [
        { variantId: "gid://shopify/ProductVariant/123", quantity: 1, handle: "robot-kit" },
        { variantId: "gid://shopify/ProductVariant/456", quantity: 2, handle: "battery-pack" },
      ];
      await POST(makeRequest({ lines }));

      const call = mocks.shopifyFetch.mock.calls[0][0];
      const handlesAttr = call.variables.attributes.find(
        (a: { key: string }) => a.key === "_posthog_handles",
      );
      expect(handlesAttr).toBeDefined();
      expect(JSON.parse(handlesAttr.value)).toEqual({
        "123": "robot-kit",
        "456": "battery-pack",
      });
    });

    it("omits lines that have no handle from the handle map", async () => {
      setPostHogCookie("anon-1");
      mockCartCreateOk();

      const lines: Line[] = [
        { variantId: "gid://shopify/ProductVariant/1", quantity: 1, handle: "robot-kit" },
        { variantId: "gid://shopify/ProductVariant/2", quantity: 1 },
      ];
      await POST(makeRequest({ lines }));

      const call = mocks.shopifyFetch.mock.calls[0][0];
      const handlesAttr = call.variables.attributes.find(
        (a: { key: string }) => a.key === "_posthog_handles",
      );
      expect(JSON.parse(handlesAttr.value)).toEqual({ "1": "robot-kit" });
    });

    it("does not include _posthog_handles when no line has a handle", async () => {
      setPostHogCookie("anon-1");
      mockCartCreateOk();

      await POST(
        makeRequest({
          lines: [{ variantId: "gid://shopify/ProductVariant/1", quantity: 1 }],
        }),
      );

      const call = mocks.shopifyFetch.mock.calls[0][0];
      const handlesAttr = call.variables.attributes.find(
        (a: { key: string }) => a.key === "_posthog_handles",
      );
      expect(handlesAttr).toBeUndefined();
    });
  });

  describe("cartCreate response handling", () => {
    it("returns the checkoutUrl on success", async () => {
      setPostHogCookie(null);
      mockCartCreateOk("https://shop.example.com/checkouts/xyz");

      const res = await POST(
        makeRequest({
          lines: [{ variantId: "gid://shopify/ProductVariant/1", quantity: 1 }],
        }),
      );

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.checkoutUrl).toBe("https://shop.example.com/checkouts/xyz");
    });

    it("forwards the merchandiseId and quantity for each line", async () => {
      setPostHogCookie(null);
      mockCartCreateOk();

      await POST(
        makeRequest({
          lines: [
            { variantId: "gid://shopify/ProductVariant/1", quantity: 1, handle: "a" },
            { variantId: "gid://shopify/ProductVariant/2", quantity: 3, handle: "b" },
          ],
        }),
      );

      const call = mocks.shopifyFetch.mock.calls[0][0];
      expect(call.variables.lines).toEqual([
        { merchandiseId: "gid://shopify/ProductVariant/1", quantity: 1 },
        { merchandiseId: "gid://shopify/ProductVariant/2", quantity: 3 },
      ]);
    });

    it("returns 400 with the first user error when cartCreate has userErrors", async () => {
      setPostHogCookie(null);
      mocks.shopifyFetch.mockResolvedValueOnce({
        cartCreate: {
          cart: null,
          userErrors: [
            { field: ["lines"], message: "Variant is sold out" },
            { field: ["lines"], message: "Other issue" },
          ],
        },
      });

      const res = await POST(
        makeRequest({
          lines: [{ variantId: "gid://shopify/ProductVariant/1", quantity: 1 }],
        }),
      );

      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toBe("Variant is sold out");
    });

    it("returns 500 when cartCreate returns no cart and no errors", async () => {
      setPostHogCookie(null);
      mocks.shopifyFetch.mockResolvedValueOnce({
        cartCreate: { cart: null, userErrors: [] },
      });

      const res = await POST(
        makeRequest({
          lines: [{ variantId: "gid://shopify/ProductVariant/1", quantity: 1 }],
        }),
      );

      expect(res.status).toBe(500);
    });
  });

  describe("checkout_created analytics event", () => {
    it("fires checkout_created with line items when a distinctId is available", async () => {
      setPostHogCookie("anon-xyz");
      mockCartCreateOk();

      const lines: Line[] = [
        { variantId: "gid://shopify/ProductVariant/1", quantity: 2, handle: "robot-kit" },
      ];
      await POST(makeRequest({ lines }));

      expect(mocks.capture).toHaveBeenCalledWith({
        distinctId: "anon-xyz",
        event: "checkout_created",
        properties: { item_count: 1, line_items: lines },
      });
      expect(mocks.flush).toHaveBeenCalled();
    });

    it("does not fire checkout_created when no distinctId is available", async () => {
      setPostHogCookie(null);
      mockCartCreateOk();

      await POST(
        makeRequest({
          lines: [{ variantId: "gid://shopify/ProductVariant/1", quantity: 1 }],
        }),
      );

      expect(mocks.capture).not.toHaveBeenCalled();
    });

    it("still returns checkoutUrl when PostHog flush throws", async () => {
      setPostHogCookie("anon-xyz");
      mockCartCreateOk("https://shop.example.com/checkouts/zzz");
      mocks.flush.mockRejectedValueOnce(new Error("posthog down"));

      const res = await POST(
        makeRequest({
          lines: [{ variantId: "gid://shopify/ProductVariant/1", quantity: 1 }],
        }),
      );

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.checkoutUrl).toBe("https://shop.example.com/checkouts/zzz");
    });
  });
});
