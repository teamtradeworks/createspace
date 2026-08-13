import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import * as Sentry from "@sentry/nextjs";
import { getPostHogClient } from "@/lib/posthog-server";

type LineItem = {
  title: string;
  quantity: number;
  price: string;
  sku: string;
  product_id: number;
  variant_id: number;
};

type ShopifyOrder = {
  id: number;
  order_number: number;
  email: string;
  total_price: string;
  subtotal_price: string;
  total_tax: string;
  total_discounts: string;
  currency: string;
  line_items: LineItem[];
  customer?: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    orders_count: number;
  };
  shipping_address?: {
    city: string;
    province: string;
    country: string;
  };
  discount_codes?: { code: string; amount: string; type: string }[];
  note_attributes?: { name: string; value: string }[];
};

function verifyWebhook(body: Buffer, hmacHeader: string): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret) return false;

  const a = Buffer.from(crypto.createHmac("sha256", secret).update(body).digest("base64"));
  const b = Buffer.from(hmacHeader);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  Sentry.addBreadcrumb({
    category: "webhook",
    message: "Shopify orders/create webhook received",
    level: "info",
  });

  const rawBody = Buffer.from(await request.arrayBuffer());
  const hmac = request.headers.get("x-shopify-hmac-sha256");

  if (!hmac || !verifyWebhook(rawBody, hmac)) {
    Sentry.captureMessage("Shopify webhook HMAC verification failed", "warning");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let order: ShopifyOrder;
  try {
    order = JSON.parse(rawBody.toString("utf-8"));
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const email = order.email || order.customer?.email;
  if (!email) {
    return NextResponse.json({ ok: true });
  }

  const posthogAnonymousId = order.note_attributes?.find(
    (attr) => attr.name === "_posthog_distinct_id",
  )?.value;

  const claimedCourse =
    order.note_attributes?.find((attr) => attr.name === "_inspire_africa_course")?.value === "yes";

  // Use the anonymous ID as distinctId so the purchase event lands on the
  // same person as the browsing session. Fall back to email when no
  // anonymous ID was attached (e.g. orders placed before this change).
  const distinctId = posthogAnonymousId || email;

  // Map numeric variant ID -> product handle attached at checkout creation.
  // Lets us include `handle` on each purchase line so events can be joined
  // with product_viewed / product_added_to_cart.
  let handleMap: Record<string, string> = {};
  const handlesAttr = order.note_attributes?.find(
    (attr) => attr.name === "_posthog_handles",
  )?.value;
  if (handlesAttr) {
    try {
      handleMap = JSON.parse(handlesAttr);
    } catch {
      // Ignore malformed handle map; items will be sent without handles.
    }
  }

  const posthog = getPostHogClient();

  try {
    await posthog.captureImmediate({
      distinctId,
      event: "purchase_completed",
      properties: {
        order_id: order.id,
        order_number: order.order_number,
        total_price: parseFloat(order.total_price),
        subtotal_price: parseFloat(order.subtotal_price),
        total_tax: parseFloat(order.total_tax),
        total_discounts: parseFloat(order.total_discounts),
        currency: order.currency,
        item_count: order.line_items.length,
        items: order.line_items.map((item) => ({
          title: item.title,
          sku: item.sku,
          handle: handleMap[String(item.variant_id)],
          price: parseFloat(item.price),
          quantity: item.quantity,
          product_id: item.product_id,
          variant_id: item.variant_id,
        })),
        discount_codes: order.discount_codes?.map((d) => d.code) ?? [],
        shipping_city: order.shipping_address?.city,
        shipping_province: order.shipping_address?.province,
        is_repeat_customer: order.customer ? order.customer.orders_count > 1 : false,
        claimed_inspire_africa_course: claimedCourse,
        $value: parseFloat(order.total_price),
      },
    });
  } catch (err) {
    console.error("PostHog captureImmediate failed for order webhook:", err);
    Sentry.captureException(err, {
      tags: { webhook: "shopify_orders", step: "capture" },
      extra: { order_id: order.id, order_number: order.order_number },
    });
  }

  try {
    await posthog.identifyImmediate({
      distinctId,
      properties: {
        email,
        first_name: order.customer?.first_name,
        last_name: order.customer?.last_name,
        total_orders: order.customer?.orders_count,
      },
    });
  } catch (err) {
    console.error("PostHog identifyImmediate failed for order webhook:", err);
    Sentry.captureException(err, {
      tags: { webhook: "shopify_orders", step: "identify" },
      extra: { order_id: order.id, order_number: order.order_number },
    });
  }

  if (posthogAnonymousId && posthogAnonymousId !== email) {
    try {
      await posthog.aliasImmediate({ distinctId: email, alias: posthogAnonymousId });
    } catch (err) {
      console.error("PostHog aliasImmediate failed for order webhook:", err);
      Sentry.captureException(err, {
        tags: { webhook: "shopify_orders", step: "alias" },
        extra: { order_id: order.id, order_number: order.order_number },
      });
    }
  }

  return NextResponse.json({ ok: true });
}
