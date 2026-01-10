/**
 * Delivery configuration for CREATESPACE
 *
 * Values are loaded from site.json - edit that file to change delivery pricing.
 */

import siteConfig from "./site.json";

export const DELIVERY_CONFIG = siteConfig.delivery;

/**
 * Check if an order qualifies for free delivery
 */
export function qualifiesForFreeDelivery(subtotal: number): boolean {
  return subtotal >= DELIVERY_CONFIG.freeDeliveryThreshold;
}

/**
 * Calculate delivery cost for an order
 */
export function calculateDeliveryCost(subtotal: number): number {
  return qualifiesForFreeDelivery(subtotal) ? 0 : DELIVERY_CONFIG.standardDeliveryCost;
}

/**
 * Calculate amount needed to reach free delivery threshold
 */
export function amountToFreeDelivery(subtotal: number): number {
  if (qualifiesForFreeDelivery(subtotal)) return 0;
  return DELIVERY_CONFIG.freeDeliveryThreshold - subtotal;
}
