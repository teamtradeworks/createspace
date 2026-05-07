// Path patterns where the email popup must not fire. These are pages where
// the visitor has explicit intent (a PDP, the cart, checkout, account) or is
// an existing customer (downloads), and an interruption hurts conversion.
const EXCLUDED_PATTERNS: RegExp[] = [
  /^\/product\//,
  /^\/cart$/,
  /^\/checkout(\/|$)/,
  /^\/account(\/|$)/,
  /^\/downloads$/,
];

export function isPopupExcludedPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return EXCLUDED_PATTERNS.some((p) => p.test(pathname));
}

// Pages where reaching 50% scroll counts as engagement (browsing intent).
export function isPopupScrollTriggerPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return pathname === "/" || pathname === "/shop";
}
