import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
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

  const a = Buffer.from(
    crypto.createHmac("sha256", secret).update(body).digest("base64"),
  );
  const b = Buffer.from(hmacHeader);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const rawBody = Buffer.from(await request.arrayBuffer());
  const hmac = request.headers.get("x-shopify-hmac-sha256");

  if (!hmac || !verifyWebhook(rawBody, hmac)) {
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
    // No email to identify the user — acknowledge but skip tracking
    return NextResponse.json({ ok: true });
  }

  // Check if we have the PostHog anonymous ID from cart attributes
  const posthogAnonymousId = order.note_attributes?.find(
    (attr) => attr.name === "_posthog_distinct_id",
  )?.value;

  // Use the anonymous ID as distinctId so the purchase event lands on the
  // same person as the browsing session.  Fall back to email when no
  // anonymous ID was attached (e.g. orders placed before this change).
  const distinctId = posthogAnonymousId || email;

  try {
    const posthog = getPostHogClient();

    posthog.capture({
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
          price: parseFloat(item.price),
          quantity: item.quantity,
          product_id: item.product_id,
          variant_id: item.variant_id,
        })),
        discount_codes: order.discount_codes?.map((d) => d.code) ?? [],
        shipping_city: order.shipping_address?.city,
        shipping_province: order.shipping_address?.province,
        is_repeat_customer:
          order.customer ? order.customer.orders_count > 1 : false,
        $value: parseFloat(order.total_price),
      },
    });

    // Identify links the distinctId (anonymous or email) to the user's
    // email and name, merging the browsing session with the purchase.
    posthog.identify({
      distinctId,
      properties: {
        email,
        first_name: order.customer?.first_name,
        last_name: order.customer?.last_name,
        total_orders: order.customer?.orders_count,
      },
    });

    // If we have both an anonymous ID and an email, create an alias so
    // PostHog merges the anonymous browsing person with the email identity.
    if (posthogAnonymousId && posthogAnonymousId !== email) {
      posthog.alias({ distinctId: posthogAnonymousId, alias: email });
    }

    await posthog.flush();
  } catch (err) {
    console.error("PostHog capture failed for order webhook:", err);
    // Still return 200 so Shopify doesn't retry
  }

  return NextResponse.json({ ok: true });
}
