import { getProducts } from "@/lib/shopify";
import Link from "next/link";
import { Metadata } from "next";
import ShopGallery from "@/components/ShopGallery";

export const metadata: Metadata = {
  title: "Shop | CREATESPACE",
  description:
    "Browse our curated collection of STEM educational products. Filter by age, discipline, or brand to find the perfect kit.",
};

type Props = {
  searchParams: Promise<{ age?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const { age } = await searchParams;
  const products = await getProducts(100);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-navy font-medium">Shop</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy/90 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Explore Our STEM Collection
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Carefully curated educational kits to inspire curiosity and build
            future-ready skills. Use the filters below to find the perfect fit.
          </p>
        </div>
      </div>

      {/* Products with inline filters */}
      <ShopGallery products={products} initialAge={age} key={age || "all"} />
    </main>
  );
}
