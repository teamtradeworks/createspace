import type { ComponentType, ReactNode } from "react";
import { activePromoSection, type PromoSlot as Slot } from "@/config/promo";
import { PROMO_SECTIONS } from "@/components/promo-sections/registry";
import type { PromoSectionProps } from "@/components/promo-sections/types";

// Renders the live promo's section for `slot`, or `children` (the page's
// default section) when no live promo takes that slot over. Server component:
// the choice is made per request / revalidation, so it switches by date alone.
export default function PromoSlot({ slot, children }: { slot: Slot; children: ReactNode }) {
  const active = activePromoSection(slot);
  if (!active) return <>{children}</>;
  const sections = PROMO_SECTIONS[slot] as Record<string, ComponentType<PromoSectionProps>>;
  const Section = sections[active.id];
  return Section ? <Section promo={active.promo} /> : <>{children}</>;
}
