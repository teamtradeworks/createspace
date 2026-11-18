import type { Promo } from "@/config/promo";

// Every promo section receives the live promo, so its button can use the
// promo's CTA and stay in step with the strip and the nav pill.
export type PromoSectionProps = { promo: Promo };
