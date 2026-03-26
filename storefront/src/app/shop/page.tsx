import { getCollectionProducts } from "@/lib/shopify";
import Link from "next/link";
import { Metadata } from "next";
import ShopGallery from "@/components/ShopGallery";
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
  searchParams: Promise<{ age?: string; category?: string; brand?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const { age, category, brand } = await searchParams;

  const [
    { products },
    { products: age35Products },
    { products: age68Products },
    { products: age912Products },
    { products: age13Products },
  ] = await Promise.all([
    getCollectionProducts("shop-all-headless", 100),
    getCollectionProducts("age-3-5", 100),
    getCollectionProducts("age-6-8", 100),
    getCollectionProducts("ages-9-12", 100),
    getCollectionProducts("ages-13", 100),
  ]);

  const ageCollectionOrder: Record<string, string[]> = {
    "3-5": age35Products.map((p) => p.handle),
    "6-8": age68Products.map((p) => p.handle),
    "9-12": age912Products.map((p) => p.handle),
    "13+": age13Products.map((p) => p.handle),
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <PageViewTracker event="shop_all_viewed" />
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-cs-orange">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-navy font-medium">Shop</span>
          </nav>
        </div>
      </div>

      {/* Products with inline filters */}
      <ShopGallery
        products={products}
        ageCollectionOrder={ageCollectionOrder}
        initialAge={age}
        initialCategory={category}
        initialBrand={brand}
        key={`${age || "all"}-${category || "all"}-${brand || "all"}`}
      />
    </main>
  );
}
