import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify";
import { getPostHogClient } from "@/lib/posthog-server";

const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]!, $attributes: [AttributeInput!]) {
    cartCreate(input: { lines: $lines, attributes: $attributes }) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function POST(request: NextRequest) {
  const { lines } = (await request.json()) as {
    lines: { variantId: string; quantity: number }[];
  };

  if (!lines?.length) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const phCookie = cookieStore
    .getAll()
    .find((c) => c.name.startsWith("ph_") && c.name.endsWith("_posthog"));
  let distinctId: string | undefined;
  try {
    distinctId = phCookie?.value ? JSON.parse(phCookie.value).distinct_id : undefined;
  } catch {
    // Ignore malformed PostHog cookie
  }

  const attributes: { key: string; value: string }[] = [];
  if (distinctId) {
    attributes.push({ key: "_posthog_distinct_id", value: distinctId });
  }

  const data = await shopifyFetch<{
    cartCreate: {
      cart: { checkoutUrl: string } | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>({
    query: CART_CREATE_MUTATION,
    cache: "no-store",
    variables: {
      lines: lines.map((line) => ({
        merchandiseId: line.variantId,
        quantity: line.quantity,
      })),
      attributes,
    },
  });

  if (data.cartCreate.userErrors.length > 0) {
    return NextResponse.json({ error: data.cartCreate.userErrors[0].message }, { status: 400 });
  }

  if (!data.cartCreate.cart) {
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }

  if (distinctId) {
    try {
      const posthog = getPostHogClient();
      posthog.capture({
        distinctId,
        event: "checkout_created",
        properties: {
          item_count: lines.length,
          line_items: lines,
        },
      });
      await posthog.flush();
    } catch {
      // Don't let analytics errors break checkout
    }
  }

  return NextResponse.json({ checkoutUrl: data.cartCreate.cart.checkoutUrl });
}
