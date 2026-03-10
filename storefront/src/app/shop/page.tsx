import { getProducts } from "@/lib/shopify";
import Link from "next/link";
import { Metadata } from "next";
import ShopGallery from "@/components/ShopGallery";

export const metadata: Metadata = {
  title: "Shop | CREATESPACE",
  description:
    "Browse our curated collection of STEM educational products. Filter by age, category, or brand to find the perfect kit.",
  alternates: {
    canonical: "/shop",
  },
};

type Props = {
  searchParams: Promise<{ age?: string; category?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const { age, category } = await searchParams;
  const products = await getProducts(100);

  return (
    <main className="min-h-screen bg-gray-50">
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
      <ShopGallery products={products} initialAge={age} initialCategory={category} key={`${age || "all"}-${category || "all"}`} />
    </main>
  );
}
