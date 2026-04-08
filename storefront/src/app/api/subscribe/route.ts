import { NextRequest, NextResponse } from "next/server";
import { getPostHogClient } from "@/lib/posthog-server";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;

const ADMIN_ENDPOINT = `https://${domain}/admin/api/2025-10/customers.json`;

export async function POST(request: NextRequest) {
  let email: string;
  try {
    ({ email } = (await request.json()) as { email: string });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  try {
    const res = await fetch(ADMIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": adminAccessToken,
      },
      body: JSON.stringify({
        customer: {
          email,
          email_marketing_consent: {
            state: "subscribed",
            opt_in_level: "single_opt_in",
          },
          send_email_welcome: false,
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      // If the customer already exists, treat it as a success
      const errors = data.errors;
      if (errors?.email?.[0] === "has already been taken") {
        try {
          const posthog = getPostHogClient();
          posthog.capture({
            distinctId: email,
            event: "newsletter_signup",
            properties: { already_subscribed: true },
          });
          await posthog.flush();
        } catch {
          // Don't let analytics errors affect the user response
        }
        return NextResponse.json({ success: true, alreadySubscribed: true });
      }

      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 400 },
      );
    }

    try {
      const posthog = getPostHogClient();
      posthog.capture({
        distinctId: email,
        event: "newsletter_signup",
        properties: { already_subscribed: false },
      });
      posthog.identify({
        distinctId: email,
        properties: {
          email,
          newsletter_subscriber: true,
        },
      });
      await posthog.flush();
    } catch {
      // Don't let analytics errors affect the user response
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
