import PageHeader from "@/components/PageHeader";

// The default /shop header band — shared PageHeader (a minimal take on the
// home hero). A live promo can replace it (config/promo.ts `sections.shopHeader`).
export default function ShopHeader() {
  return (
    <PageHeader
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      title={
        <>
          STEM kits for <span className="text-cs-orange">curious kids</span>
        </>
      }
      subtitle="From first circuits to advanced coding, sorted by age and skill."
    />
  );
}
