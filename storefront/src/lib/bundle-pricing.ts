import addonsConfig from "@/config/product-addons.json";
import type { CartItem } from "@/context/CartContext";

/**
 * Bundle (add-on) discounts in the cart.
 *
 * The website only displays these. Checkout prices come from Shopify, where
 * each discounted add-on needs a matching Buy X get Y automatic discount
 * (e.g. "15% off BBC micro:bit Go": buy any listed kit, get 1 micro:bit Go
 * R 67.50 off, no limit per order). The rules here mirror that: every parent
 * kit in the cart unlocks the discount on one add-on unit (or the configured
 * add-on quantity), so a second micro:bit with only one kit is full price.
 */

export interface BundleRule {
  parentHandle: string;
  addonHandle: string;
  discountPercent: number;
  quantity?: number;
}

export interface BundleSaving {
  /** How many units of the line get the bundle price. */
  units: number;
  /** Total rand off the line. */
  amount: number;
}

const DEFAULT_RULES: BundleRule[] = (addonsConfig.addons as BundleRule[]).filter(
  (rule) => rule.discountPercent > 0,
);

function roundCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/** Handles of products that can be discounted as part of a bundle. */
export function getBundleAddonHandles(rules: BundleRule[] = DEFAULT_RULES): Set<string> {
  return new Set(rules.map((rule) => rule.addonHandle));
}

/**
 * Carts saved before bundle savings were calculated stored the add-on at its
 * discounted price with the full price as compareAtPrice. Restore the full
 * unit price so the saving is only counted once, by getBundleSavings.
 * Only run this on carts saved before CART_FORMAT_VERSION (see
 * migrateStoredCart): a micro:bit Go on a genuine Shopify sale looks the same.
 */
export function normaliseBundleLine(
  item: CartItem,
  rules: BundleRule[] = DEFAULT_RULES,
): CartItem {
  if (
    getBundleAddonHandles(rules).has(item.handle) &&
    item.compareAtPrice !== undefined &&
    item.compareAtPrice > item.price
  ) {
    return { ...item, price: item.compareAtPrice, compareAtPrice: undefined };
  }
  return item;
}

/**
 * Version of the cart saved in localStorage. Version 2 stores bundle add-ons at
 * full price; carts with no version are from before that.
 */
export const CART_FORMAT_VERSION = "2";

/** Repair a cart read from localStorage, if it was saved in the old format. */
export function migrateStoredCart(
  items: CartItem[],
  storedVersion: string | null,
  rules: BundleRule[] = DEFAULT_RULES,
): CartItem[] {
  if (storedVersion === CART_FORMAT_VERSION) return items;
  return items.map((item) => normaliseBundleLine(item, rules));
}

/**
 * Work out the bundle saving on each cart line, keyed by variantId.
 * Unavailable lines neither get a saving nor unlock one.
 */
export function getBundleSavings(
  items: CartItem[],
  rules: BundleRule[] = DEFAULT_RULES,
): Map<string, BundleSaving> {
  const available = items.filter((item) => item.available !== false);
  const qtyByHandle = new Map<string, number>();
  for (const item of available) {
    qtyByHandle.set(item.handle, (qtyByHandle.get(item.handle) ?? 0) + item.quantity);
  }

  const savings = new Map<string, BundleSaving>();
  for (const line of available) {
    // Highest discount first, in case kits give different discounts on the same add-on
    const lineRules = rules
      .filter((rule) => rule.addonHandle === line.handle)
      .sort((a, b) => b.discountPercent - a.discountPercent);
    if (lineRules.length === 0) continue;

    let remaining = line.quantity;
    let units = 0;
    let amount = 0;
    for (const rule of lineRules) {
      if (remaining === 0) break;
      const kits = qtyByHandle.get(rule.parentHandle) ?? 0;
      const ruleUnits = Math.min(remaining, kits * (rule.quantity ?? 1));
      if (ruleUnits === 0) continue;
      units += ruleUnits;
      amount += ruleUnits * roundCents((line.price * rule.discountPercent) / 100);
      remaining -= ruleUnits;
    }

    if (units > 0) {
      savings.set(line.variantId, { units, amount: roundCents(amount) });
    }
  }
  return savings;
}

/** Total bundle saving across the cart. */
export function getTotalBundleSaving(savings: Map<string, BundleSaving>): number {
  let total = 0;
  for (const saving of savings.values()) total += saving.amount;
  return roundCents(total);
}
