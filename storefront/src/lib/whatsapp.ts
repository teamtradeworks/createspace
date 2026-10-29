// WhatsApp support contact. The number is configured in site.json; edit it
// there and every link on the site (floating button, contact page, footer,
// structured data) picks it up.

import siteConfig from "@/config/site.json";

/** The number as people read it, e.g. "+27 82 123 4567". */
export const WHATSAPP_NUMBER = siteConfig.whatsapp.number;

const DEFAULT_MESSAGE = "Hi CREATESPACE, I have a question.";

/**
 * Builds a click-to-chat link (https://wa.me/...) that opens WhatsApp with a
 * message already typed.
 *
 * wa.me wants the full international number as digits only, so spaces, dashes,
 * brackets and the leading `+` are stripped. A local South African number
 * (starting with 0) is rewritten with the 27 country code.
 */
export function whatsappLink(number: string, message: string = DEFAULT_MESSAGE): string {
  let digits = number.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `27${digits.slice(1)}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/**
 * The opening message for a chat started on `pathname`. Product pages include
 * the page link so we know which kit the question is about.
 */
export function whatsappMessageFor(pathname: string): string {
  return pathname.startsWith("/product/")
    ? `Hi CREATESPACE, I have a question about https://thecreatespace.co.za${pathname}`
    : DEFAULT_MESSAGE;
}
