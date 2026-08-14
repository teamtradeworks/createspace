import { getCollectionProducts, slimProductForCard } from "@/lib/shopify";
import { Metadata } from "next";
import ShopGallery from "@/components/ShopGallery";
import PageHeader from "@/components/PageHeader";
import PageViewTracker from "@/components/PageViewTracker";

export const metadata: Metadata = {
  title: "Shop | CREATESPACE",
  description:
    "Browse our curated collection of STEM educational products. Filter by age, category, or brand to find the perfect kit.",
  alternates: {
    canonical: "/shop",
  },
};

type Props = {
  searchParams: Promise<{ age?: string; category?: string; brand?: string; sort?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const { age, category, brand, sort } = await searchParams;
  // Fetch in collection default order to respect manual ordering set in Shopify admin.
  const { products: fullProducts } = await getCollectionProducts(
    "shop-all-headless",
    100,
    "COLLECTION_DEFAULT",
  );
  // Slim to card fields before crossing to the client grid — descriptions
  // alone are a large chunk of the serialized payload. Tags stay: the
  // category filter matches on them.
  const products = fullProducts.map((product) => slimProductForCard(product, { keepTags: true }));

  return (
    <main className="min-h-screen bg-gray-50">
      <PageViewTracker event="shop_all_viewed" />

      {/* Header band — shared PageHeader (a minimal take on the home hero). */}
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
        title={
          <>
            STEM kits for <span className="text-cs-orange">curious kids</span>
          </>
        }
        subtitle="From first circuits to advanced coding, sorted by age and skill."
      />

      {/* Products with inline filters */}
      <ShopGallery
        products={products}
        initialAge={age}
        initialCategory={category}
        initialBrand={brand}
        initialSort={sort}
        key={`${age || "all"}-${category || "all"}-${brand || "all"}-${sort || "featured"}`}
      />
    </main>
  );
}
