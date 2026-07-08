import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getPostHogClient } from "@/lib/posthog-server";

const CONTACT_EMAIL = "info@thecreatespace.co.za";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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

  if (!name || !email || !subject) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const isEducation = schoolName || position;

    const detailRows = [
      { label: "Name", value: name },
      { label: "Email", value: email },
      phone ? { label: "Phone", value: phone } : null,
      schoolName ? { label: "School", value: schoolName } : null,
      position ? { label: "Position", value: position } : null,
      { label: "Subject", value: subject },
    ].filter((row): row is { label: string; value: string } => row !== null);

    const accentColour = isEducation ? "#3CC7F7" : "#FF8B00";

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background-color:#0C1446;padding:24px 32px;">
            <span style="color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:1px;">CREATESPACE</span>
            <span style="color:${accentColour};font-size:14px;float:right;line-height:28px;">${isEducation ? "Education Enquiry" : "Contact Form"}</span>
          </td>
        </tr>
        <!-- Accent bar -->
        <tr><td style="height:4px;background-color:${accentColour};"></td></tr>
        <!-- Details -->
        <tr>
          <td style="padding:28px 32px 12px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${detailRows
                .map(
                  (row) => `<tr>
                <td style="padding:6px 0;color:#6b7280;font-size:13px;width:90px;vertical-align:top;">${row.label}</td>
                <td style="padding:6px 0;color:#0C1446;font-size:14px;font-weight:500;">${escapeHtml(row.value)}</td>
              </tr>`,
                )
                .join("")}
            </table>
          </td>
        </tr>
        <!-- Divider -->
        <tr><td style="padding:0 32px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:8px 0;" /></td></tr>
        <!-- Message -->
        <tr>
          <td style="padding:16px 32px 28px;">
            <p style="margin:0 0 8px;color:#6b7280;font-size:13px;">Message</p>
            <p style="margin:0;color:#0C1446;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message || "—")}</p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background-color:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">Sent from the CREATESPACE website contact form. Reply directly to respond to <strong>${escapeHtml(name)}</strong>.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

    const plainText = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      schoolName ? `School: ${schoolName}` : null,
      position ? `Position: ${position}` : null,
      `Subject: ${subject}`,
      ``,
      `Message:`,
      message || "—",
    ]
      .filter((line) => line !== null)
      .join("\n");

    const { error } = await getResend().emails.send({
      from:
        process.env.RESEND_FROM_EMAIL || `CREATESPACE Contact Form <no-reply@thecreatespace.co.za>`,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `[Contact Form] ${subject} | ${name}${schoolName ? ` (${schoolName})` : ""}`,
      html,
      text: plainText,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 },
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
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
