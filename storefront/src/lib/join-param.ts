// One-click newsletter signup from a link. Any page can be opened with
// `?join={email}` (e.g. from an order email or a printed QR code) and the
// visitor is added to the mailing list without filling in a form.

export const JOIN_PARAM = "join";

// Deliberately loose: the server does its own check, and Resend rejects
// anything it can't deliver to. This only filters out obvious junk so we
// never fire a request (or show a toast) for `?join=` or `?join=hello`.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Returns the email carried by a `join` query value, or null when the value is
 * missing or isn't an email address.
 *
 * A literal `+` in a query string decodes to a space, so a link like
 * `?join=dave+kits@example.com` arrives as `dave kits@example.com`. Spaces can
 * never be part of an address, so they are restored to `+` before validating.
 */
export function parseJoinEmail(value: string | null | undefined): string | null {
  if (!value) return null;
  const email = value.trim().replace(/ /g, "+");
  return EMAIL_PATTERN.test(email) ? email : null;
}
