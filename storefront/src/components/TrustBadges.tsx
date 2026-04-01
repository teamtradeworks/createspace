import Image from "next/image";
import { DELIVERY_CONFIG } from "@/config/delivery";

type TrustBadge = {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
};

const ALL_BADGES: TrustBadge[] = [
  {
    id: "fast-delivery",
    icon: "/images/icons/fast-delivery.png",
    title: "Fast Delivery",
    description: `${DELIVERY_CONFIG.estimatedDays}`,
    color: "bg-cs-orange",
  },
  {
    id: "free-delivery",
    icon: "/images/icons/free-delivery.png",
    title: "Free Delivery",
    description: `For orders over R${DELIVERY_CONFIG.freeDeliveryThreshold.toLocaleString()}`,
    color: "bg-cs-green",
  },
  {
    id: "easy-returns",
    icon: "/images/icons/easy-returns.png",
    title: "Easy Returns",
    description: "30-day hassle-free returns",
    color: "bg-cs-blue",
  },
  {
    id: "quality-curated",
    icon: "/images/icons/stem-specialists.png",
    title: "Play With Purpose",
    description: "Handpicked educational STEM toys",
    color: "bg-cs-red",
  },
  {
    id: "secure-checkout",
    icon: "/images/icons/secure-checkout.png",
    title: "Secure Checkout",
    description: "Protected by Stitch Payments",
    color: "bg-cs-green",
  },
];

const BAR_DEFAULTS = [
  "fast-delivery",
  "free-delivery",
  "easy-returns",
  "quality-curated",
];
const COMPACT_DEFAULTS = ["secure-checkout", "free-delivery"];
const INLINE_DEFAULTS = ["secure-checkout", "fast-delivery"];

function getBadges(ids: string[]): TrustBadge[] {
  return ids
    .map((id) => ALL_BADGES.find((b) => b.id === id))
    .filter((b): b is TrustBadge => b !== undefined);
}

interface TrustBadgesProps {
  variant?: "bar" | "compact" | "inline";
  badges?: string[];
  className?: string;
}

export default function TrustBadges({
  variant = "bar",
  badges: badgeIds,
  className = "",
}: TrustBadgesProps) {
  const defaults =
    variant === "bar" ? BAR_DEFAULTS : variant === "compact" ? COMPACT_DEFAULTS : INLINE_DEFAULTS;
  const badges = getBadges(badgeIds ?? defaults);

  if (variant === "compact") {
    return (
      <div className={`space-y-2 ${className}`}>
        {badges.map((badge) => (
          <div key={badge.id} className="flex items-center gap-2 text-sm text-gray-600">
            <Image
              src={badge.icon}
              alt={badge.title}
              width={20}
              height={20}
              className="flex-shrink-0"
            />
            <span>
              <span className="font-medium text-navy">{badge.title}</span>
              {badge.description && (
                <span className="text-gray-500"> &middot; {badge.description}</span>
              )}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`flex items-center justify-center gap-4 text-xs text-gray-500 ${className}`}>
        {badges.map((badge) => (
          <div key={badge.id} className="flex items-center gap-1">
            <Image src={badge.icon} alt={badge.title} width={16} height={16} />
            {badge.title}
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className={`py-16 border-y border-gray-100 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex md:flex-wrap md:justify-center gap-8 md:gap-10 lg:gap-14 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-4 sm:-mx-6 md:mx-0 px-4 sm:px-6 md:px-0 pb-4 md:pb-0 scrollbar-none">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex-none flex flex-col items-center text-center min-w-[130px] md:min-w-[150px] snap-start"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${badge.color} mb-3`}
              >
                <Image src={badge.icon} alt={badge.title} width={42} height={42} />
              </div>
              <h3 className="font-semibold text-navy text-base">{badge.title}</h3>
              <p className="text-sm text-gray-500">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
