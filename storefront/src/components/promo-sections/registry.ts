import type { ComponentType } from "react";
import type { PromoSectionId, PromoSlot } from "@/config/promo";
import type { PromoSectionProps } from "@/components/promo-sections/types";
import BlackFridayHomeHero from "@/components/promo-sections/BlackFridayHomeHero";
import BlackFridayShopHeader from "@/components/promo-sections/BlackFridayShopHeader";

// Section id (as used in a promo's `sections`) -> component, per page slot.
// The types make this exhaustive: an id listed in PROMO_SECTION_IDS without a
// component here, or a component under an unknown id, fails the build.
export const PROMO_SECTIONS: {
  [S in PromoSlot]: Record<PromoSectionId<S>, ComponentType<PromoSectionProps>>;
} = {
  homeHero: {
    "black-friday-home-hero": BlackFridayHomeHero,
  },
  shopHeader: {
    "black-friday-shop-header": BlackFridayShopHeader,
  },
};
