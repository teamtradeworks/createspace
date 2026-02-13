/**
 * Extract the numeric Shopify product ID from a Shopify GID.
 * Fera uses the numeric portion: "gid://shopify/Product/7654321" -> "7654321"
 */
export function shopifyIdToFeraId(shopifyGid: string): string {
  const parts = shopifyGid.split("/");
  return parts[parts.length - 1];
}
