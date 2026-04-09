import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getPostHogClient } from "@/lib/posthog-server";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

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
    const resend = getResend();
    const { error } = await resend.contacts.create({
      email: email.trim(),
      unsubscribed: false,
    });

    if (error) {
      // Resend returns an error if the contact already exists — treat as success
      if (error.message?.toLowerCase().includes("already exists")) {
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

      console.error("[subscribe] Resend error:", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
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
