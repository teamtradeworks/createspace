import { getCollectionProducts, slimProductForCard } from "@/lib/shopify";
import Link from "next/link";
import Image from "next/image";
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

      {/* Header band */}
      <header className="relative bg-navy text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10 relative z-10">
          <nav className="flex text-sm text-white/60 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">Shop</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-semibold">STEM Kits &amp; Educational Toys</h1>
          <p className="mt-2 text-white/70 max-w-xl">
            A curated range of hands-on STEM kits, hand-picked by our team in Cape Town.
          </p>
        </div>
        {/* Decorative brand robot */}
        <div className="hidden md:block absolute right-8 lg:right-20 top-1/2 -translate-y-1/2 w-24 h-24 lg:w-32 lg:h-32 pointer-events-none">
          <Image
            src="/images/illustrations/robot-green.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </header>

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
