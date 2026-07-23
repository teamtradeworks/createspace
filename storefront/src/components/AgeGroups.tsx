import { getProductByHandle } from "@/lib/shopify";
import AgeGroupCard from "@/components/AgeGroupCard";

const ageGroups = [
  {
    range: "3-5",
    label: "Early explorers",
    color: "bg-cs-red",
    darkText: false,
    href: "/shop?age=3-5",
    handle: "blockaroo-magnetic-foam-builders-castle",
    event: "home_page_3to5_clicked",
  },
  {
    range: "6-8",
    label: "Junior innovators",
    color: "bg-cs-green",
    darkText: true,
    href: "/shop?age=6-8",
    handle: "national-geographic-motorized-marble-run",
    event: "home_page_6to8_clicked",
  },
  {
    range: "9-12",
    label: "Budding engineers",
    color: "bg-cs-blue",
    darkText: true,
    href: "/shop?age=9-12",
    handle: "matatastudio-vincibot-coding-robot-set",
    event: "home_page_9to12_clicked",
  },
  {
    range: "13+",
    label: "Advanced creators",
    color: "bg-cs-purple",
    darkText: false,
    href: "/shop?age=13%2B",
    handle: "arduino-starter-kit",
    event: "home_page_13plus_clicked",
  },
];

// Shopify CDN serves resized variants via the width param; the source images
// can be multi-MB, so cap what the Next.js optimizer has to fetch.
function shopifyWidth(url: string | null | undefined, width: number): string | null {
  if (!url) return null;
  return `${url}${url.includes("?") ? "&" : "?"}width=${width}`;
}

export default async function AgeGroups() {
  const products = await Promise.all(
    ageGroups.map((group) => getProductByHandle(group.handle).catch(() => null)),
  );

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-3">Shop by age</h2>
          <p className="text-gray-600">
            Every kit shows a clear age range, so it&apos;s easy to pick one that fits.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {ageGroups.map((group, index) => (
            <AgeGroupCard
              key={group.range}
              range={group.range}
              label={group.label}
              color={group.color}
              darkText={group.darkText}
              href={group.href}
              image={shopifyWidth(products[index]?.images?.edges?.[0]?.node?.url, 1000)}
              event={group.event}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
