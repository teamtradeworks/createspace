/**
 * Extract the numeric Shopify product ID from a Shopify GID.
 * Fera uses the numeric portion: "gid://shopify/Product/7654321" -> "7654321"
 */
export function shopifyIdToFeraId(shopifyGid: string): string {
  const parts = shopifyGid.split("/");
  return parts[parts.length - 1];
}

/**
 * Decode the HTML entities Fera returns in review headings and bodies
 * (e.g. "&amp;" -> "&").
 *
 * Fera returns `null` for the body of rating-only reviews and for missing
 * headings, so nullish input is accepted and decoded to an empty string.
 * `&amp;` is decoded last so an escaped entity like "&amp;lt;" is not
 * double-decoded into "<".
 */
export function decodeHtmlEntities(str: string | null | undefined): string {
  if (!str) return "";
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}
