import { DELIVERY_CONFIG } from "@/config/delivery";

// Single source of truth for the delivery/trust promises shown in the sticky
// top bar. Free delivery leads (it's the strongest hook and the one shown to
// reduced-motion users, who don't get the mobile rotation).
export const PROMISES: string[] = [
  `Free delivery over R${DELIVERY_CONFIG.freeDeliveryThreshold.toLocaleString("en-US")}`,
  "Fast delivery in 1-3 days",
  "30-day easy returns",
];
