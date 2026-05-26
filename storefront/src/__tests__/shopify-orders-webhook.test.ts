import { beforeEach, describe, expect, it, vi } from "vitest";
import crypto from "crypto";

process.env.SHOPIFY_WEBHOOK_SECRET = "test-secret";
process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN = "test-token";

const mocks = vi.hoisted(() => ({
  captureImmediate: vi.fn(),
  identifyImmediate: vi.fn(),
  aliasImmediate: vi.fn(),
  sentryCapture: vi.fn(),
  sentryMessage: vi.fn(),
  sentryBreadcrumb: vi.fn(),
}));

vi.mock("@/lib/posthog-server", () => ({
  getPostHogClient: () => ({
    captureImmediate: mocks.captureImmediate,
    identifyImmediate: mocks.identifyImmediate,
    aliasImmediate: mocks.aliasImmediate,
  }),
}));

vi.mock("@sentry/nextjs", () => ({
  addBreadcrumb: mocks.sentryBreadcrumb,
  captureException: mocks.sentryCapture,
  captureMessage: mocks.sentryMessage,
}));

import { NextRequest } from "next/server";
import { POST } from "@/app/api/webhooks/shopify/orders/route";

type OrderOverrides = Partial<{
  email: string;
  customer: unknown;
  note_attributes: { name: string; value: string }[];
  discount_codes: { code: string; amount: string; type: string }[];
}>;

function makeOrder(overrides: OrderOverrides = {}) {
  return {
    id: 1234,
    order_number: 4567,
    email: "buyer@example.com",
    total_price: "150.00",
    subtotal_price: "130.00",
    total_tax: "20.00",
    total_discounts: "0.00",
    currency: "ZAR",
    line_items: [
      {
        title: "Robot Kit",
        quantity: 1,
        price: "150.00",
        sku: "RBT01",
        product_id: 11,
        variant_id: 99,
      },
    ],
    customer: {
      id: 5,
      email: "buyer@example.com",
      first_name: "Avi",
      last_name: "Buyer",
      orders_count: 2,
    },
    discount_codes: [],
    shipping_address: { city: "Cape Town", province: "WC", country: "ZA" },
    note_attributes: [
      { name: "_posthog_distinct_id", value: "anon-abc" },
      { name: "_posthog_handles", value: JSON.stringify({ "99": "robot-kit" }) },
    ],
    ...overrides,
  };
}

function signedRequest(
  body: object | string,
  opts: { secret?: string; badHmac?: string; omitHmac?: boolean } = {},
) {
  const raw = typeof body === "string" ? body : JSON.stringify(body);
  const secret = opts.secret ?? "test-secret";
  const hmac = opts.badHmac
    ?? crypto.createHmac("sha256", secret).update(raw).digest("base64");

  const headers: Record<string, string> = { "content-type": "application/json" };
  if (!opts.omitHmac) headers["x-shopify-hmac-sha256"] = hmac;

  return new NextRequest(
    "https://www.thecreatespace.co.za/api/webhooks/shopify/orders",
    { method: "POST", headers, body: raw },
  );
}

describe("Shopify orders webhook", () => {
  beforeEach(() => {
    mocks.captureImmediate.mockReset().mockResolvedValue(undefined);
    mocks.identifyImmediate.mockReset().mockResolvedValue(undefined);
    mocks.aliasImmediate.mockReset().mockResolvedValue(undefined);
    mocks.sentryCapture.mockReset();
    mocks.sentryMessage.mockReset();
    mocks.sentryBreadcrumb.mockReset();
  });

  describe("HMAC verification", () => {
    it("returns 401 when the HMAC header is missing", async () => {
      const res = await POST(signedRequest(makeOrder(), { omitHmac: true }));
      expect(res.status).toBe(401);
      expect(mocks.sentryMessage).toHaveBeenCalled();
      expect(mocks.captureImmediate).not.toHaveBeenCalled();
    });

    it("returns 401 when the HMAC header is wrong", async () => {
      const res = await POST(signedRequest(makeOrder(), { badHmac: "deadbeef" }));
      expect(res.status).toBe(401);
      expect(mocks.captureImmediate).not.toHaveBeenCalled();
    });

    it("returns 401 when signed with a different secret", async () => {
      const res = await POST(signedRequest(makeOrder(), { secret: "wrong-secret" }));
      expect(res.status).toBe(401);
    });
  });

  it("returns 400 on a body that is not valid JSON", async () => {
    const res = await POST(signedRequest("{not json"));
    expect(res.status).toBe(400);
    expect(mocks.captureImmediate).not.toHaveBeenCalled();
  });

  it("returns 200 without firing events when the order has no email", async () => {
    const order = makeOrder({ email: "", customer: undefined });
    const res = await POST(signedRequest(order));
    expect(res.status).toBe(200);
    expect(mocks.captureImmediate).not.toHaveBeenCalled();
    expect(mocks.identifyImmediate).not.toHaveBeenCalled();
    expect(mocks.aliasImmediate).not.toHaveBeenCalled();
  });

  describe("distinctId resolution", () => {
    it("uses _posthog_distinct_id from note_attributes as distinctId", async () => {
      const res = await POST(signedRequest(makeOrder()));
      expect(res.status).toBe(200);
      expect(mocks.captureImmediate).toHaveBeenCalledWith(
        expect.objectContaining({
          distinctId: "anon-abc",
          event: "purchase_completed",
        }),
      );
    });

    it("falls back to email when no _posthog_distinct_id is present", async () => {
      const order = makeOrder({ note_attributes: [] });
      const res = await POST(signedRequest(order));
      expect(res.status).toBe(200);
      expect(mocks.captureImmediate).toHaveBeenCalledWith(
        expect.objectContaining({ distinctId: "buyer@example.com" }),
      );
      expect(mocks.aliasImmediate).not.toHaveBeenCalled();
    });
  });

  describe("handle map", () => {
    it("attaches handle from _posthog_handles to each line item by variant_id", async () => {
      await POST(signedRequest(makeOrder()));
      const call = mocks.captureImmediate.mock.calls[0][0];
      expect(call.properties.items[0]).toMatchObject({
        sku: "RBT01",
        variant_id: 99,
        handle: "robot-kit",
      });
    });

    it("leaves handle undefined when variant_id is not in the map", async () => {
      const order = makeOrder({
        note_attributes: [
          { name: "_posthog_distinct_id", value: "anon-abc" },
          { name: "_posthog_handles", value: JSON.stringify({ "999": "other" }) },
        ],
      });
      await POST(signedRequest(order));
      const call = mocks.captureImmediate.mock.calls[0][0];
      expect(call.properties.items[0].handle).toBeUndefined();
    });

    it("ignores malformed _posthog_handles JSON without throwing", async () => {
      const order = makeOrder({
        note_attributes: [
          { name: "_posthog_distinct_id", value: "anon-abc" },
          { name: "_posthog_handles", value: "{not-json" },
        ],
      });
      const res = await POST(signedRequest(order));
      expect(res.status).toBe(200);
      const call = mocks.captureImmediate.mock.calls[0][0];
      expect(call.properties.items[0].handle).toBeUndefined();
    });
  });

  describe("event payload", () => {
    it("includes totals, currency, repeat-customer flag, and discount codes", async () => {
      const order = makeOrder({
        discount_codes: [{ code: "WELCOME10", amount: "10.00", type: "percentage" }],
      });
      await POST(signedRequest(order));
      const props = mocks.captureImmediate.mock.calls[0][0].properties;
      expect(props).toMatchObject({
        total_price: 150,
        subtotal_price: 130,
        total_tax: 20,
        currency: "ZAR",
        item_count: 1,
        discount_codes: ["WELCOME10"],
        $value: 150,
        is_repeat_customer: true,
        shipping_city: "Cape Town",
        shipping_province: "WC",
      });
    });

    it("treats first-time customers as not-repeat", async () => {
      const order = makeOrder({
        customer: {
          id: 5,
          email: "buyer@example.com",
          first_name: "Avi",
          last_name: "Buyer",
          orders_count: 1,
        },
      });
      await POST(signedRequest(order));
      const props = mocks.captureImmediate.mock.calls[0][0].properties;
      expect(props.is_repeat_customer).toBe(false);
    });
  });

  describe("identify and alias", () => {
    it("identifies with the order email and customer fields", async () => {
      await POST(signedRequest(makeOrder()));
      expect(mocks.identifyImmediate).toHaveBeenCalledWith({
        distinctId: "anon-abc",
        properties: expect.objectContaining({
          email: "buyer@example.com",
          first_name: "Avi",
          last_name: "Buyer",
          total_orders: 2,
        }),
      });
    });

    it("aliases anonymous distinctId to email", async () => {
      await POST(signedRequest(makeOrder()));
      expect(mocks.aliasImmediate).toHaveBeenCalledWith({
        distinctId: "buyer@example.com",
        alias: "anon-abc",
      });
    });

    it("does not alias when the anonymous id equals the email", async () => {
      const order = makeOrder({
        note_attributes: [
          { name: "_posthog_distinct_id", value: "buyer@example.com" },
        ],
      });
      await POST(signedRequest(order));
      expect(mocks.aliasImmediate).not.toHaveBeenCalled();
    });
  });

  describe("error isolation", () => {
    it("capture throwing does not block identify and alias", async () => {
      mocks.captureImmediate.mockRejectedValueOnce(new Error("posthog capture down"));
      const res = await POST(signedRequest(makeOrder()));
      expect(res.status).toBe(200);
      expect(mocks.identifyImmediate).toHaveBeenCalled();
      expect(mocks.aliasImmediate).toHaveBeenCalled();
      expect(mocks.sentryCapture).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          tags: expect.objectContaining({ step: "capture" }),
        }),
      );
    });

    it("identify throwing does not block alias", async () => {
      mocks.identifyImmediate.mockRejectedValueOnce(new Error("identify down"));
      await POST(signedRequest(makeOrder()));
      expect(mocks.aliasImmediate).toHaveBeenCalled();
      expect(mocks.sentryCapture).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          tags: expect.objectContaining({ step: "identify" }),
        }),
      );
    });

    it("alias throwing still returns 200 and reports to Sentry", async () => {
      mocks.aliasImmediate.mockRejectedValueOnce(new Error("alias down"));
      const res = await POST(signedRequest(makeOrder()));
      expect(res.status).toBe(200);
      expect(mocks.sentryCapture).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          tags: expect.objectContaining({ step: "alias" }),
        }),
      );
    });
  });
});
