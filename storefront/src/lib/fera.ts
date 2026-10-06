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

/**
 * Open Fera's own "Write Review" form for a product.
 *
 * On a Shopify theme Fera detects the product from the page; on this headless
 * site it can't, so the product must be passed explicitly or the review is
 * saved as a store review. Returns false when the Fera SDK hasn't loaded.
 */
export function openWriteReview(feraProductId: string): boolean {
  if (typeof window === "undefined" || !window.fera?.writeReview) return false;
  window.fera.writeReview({ product_id: feraProductId });
  return true;
}
