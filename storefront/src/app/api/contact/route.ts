import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getPostHogClient } from "@/lib/posthog-server";

const CONTACT_EMAIL = "info@thecreatespace.co.za";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  let body: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    schoolName?: string;
    position?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, subject, phone, message, schoolName, position } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  if (!email.includes("@")) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    const { error } = await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || `CREATESPACE Contact Form <no-reply@thecreatespace.co.za>`,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        schoolName ? `School: ${schoolName}` : null,
        position ? `Position: ${position}` : null,
        `Subject: ${subject}`,
        ``,
        `Message:`,
        message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    try {
      const posthog = getPostHogClient();
      posthog.capture({
        distinctId: email,
        event: "contact_form_submitted",
        properties: { subject },
      });
      posthog.identify({
        distinctId: email,
        properties: { email, name },
      });
      await posthog.flush();
    } catch {
      // Don't let analytics errors affect the user response
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
