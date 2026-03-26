import { ProductDetail, getProductAgeRange, getProductBatteryInfo } from "@/lib/shopify";
import SectionTracker from "./SectionTracker";

type IconName =
  | "age"
  | "battery"
  | "time"
  | "projects"
  | "no-soldering"
  | "guide"
  | "no-tools"
  | "app"
  | "scratch"
  | "tag"
  | "award";

interface BadgeConfig {
  icon: IconName;
  label: string;
  value: string;
}

interface ManualBadge {
  icon: IconName;
  label: string;
  value: string;
}

interface QuickInfoBadgesProps {
  /** Product to read metafields from (all badges are derived automatically) */
  product?: ProductDetail;
  /** Manual badges to display instead of (or in addition to) metafield-derived ones */
  badges?: ManualBadge[];
}

const icons: Record<IconName, React.ReactNode> = {
  age: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  ),
  battery: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z"
      />
    </svg>
  ),
  time: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  projects: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M6 6h.008v.008H6V6z"
      />
    </svg>
  ),
  "no-soldering": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  guide: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  ),
  "no-tools": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
      />
    </svg>
  ),
  app: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
      />
    </svg>
  ),
  scratch: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
      />
    </svg>
  ),
  tag: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M6 6h.008v.008H6V6z"
      />
    </svg>
  ),
  award: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  ),
};

export function QuickInfoBadges({ product, badges: manualBadges }: QuickInfoBadgesProps) {
  const allBadges: BadgeConfig[] = manualBadges ? [...manualBadges] : [];

  // Only derive from metafields if no manual badges were provided
  if (!manualBadges && product) {
    const age = getProductAgeRange(product);
    const batteries = getProductBatteryInfo(product);
    const projects = product.projects?.value;
    const guide = product.guide?.value;
    const soldering = product.soldering?.value;
    const codingPlatform = product.codingPlatform?.value;

    if (age) {
      allBadges.push({ icon: "age", label: "Age", value: age });
    }
    if (batteries) {
      allBadges.push({ icon: "battery", label: "Batteries", value: batteries });
    }
    if (projects) {
      allBadges.push({ icon: "projects", label: "Projects", value: projects });
    }
    if (guide) {
      allBadges.push({ icon: "guide", label: "Guide", value: guide });
    }
    if (soldering !== undefined) {
      allBadges.push({
        icon: "no-soldering",
        label: "Soldering",
        value: soldering === "true" ? "Required" : "Not Required",
      });
    }
    if (codingPlatform) {
      allBadges.push({ icon: "scratch", label: "Coding", value: codingPlatform });
    }
  }

  if (allBadges.length === 0) return null;

  return (
    <SectionTracker name="QuickInfoBadges">
      <section className="py-10 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
            At a Glance
          </h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {allBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-5 py-4 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-cs-blue/10 flex items-center justify-center text-cs-blue">
                  {icons[badge.icon]}
                </div>
                <div>
                  <p className="text-xs text-gray-500">{badge.label}</p>
                  <p className="font-semibold text-navy">{badge.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionTracker>
  );
}
