import { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/shopify";
import ShopGallery from "@/components/ShopGallery";

export const metadata: Metadata = {
  title: "All Products | CREATESPACE",
  description:
    "Browse our complete collection of STEM toys, robotics kits, and educational products for children of all ages.",
};

export default async function AllProductsPage() {
  const products = await getProducts(100);

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/shop" className="text-gray-500 hover:text-gray-700">
              Shop
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-navy font-medium">All Products</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy/90 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">All Products</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Explore our complete collection of STEM toys, robotics kits, and
            educational products designed to inspire young minds.
          </p>
        </div>
      </div>

      {/* Products */}
      <ShopGallery products={products} />
    </main>
  );
}
