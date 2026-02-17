import { searchProducts } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import SearchInput from "@/components/SearchInput";
import Link from "next/link";

export const metadata = {
  title: "Search | CREATESPACE",
  description: "Search for STEM kits, robots, electronics, and more.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() || "";
  const products = query ? await searchProducts(query) : [];

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-bold text-navy mb-6 text-center">
            Search
          </h1>
          <SearchInput defaultValue={query} autoFocus={!query} />
        </div>

        {/* Results */}
        {query ? (
          <>
            <p className="text-sm text-gray-500 mb-6">
              {products.length} result{products.length !== 1 ? "s" : ""} for
              &ldquo;{query}&rdquo;
            </p>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                  No results found
                </h2>
                <p className="text-gray-600 mb-6">
                  We couldn&apos;t find anything matching &ldquo;{query}&rdquo;.
                  Try a different search or browse our full range.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center px-6 py-3 bg-navy hover:bg-navy/90 text-white rounded-lg font-semibold transition-colors"
                >
                  Browse All Products
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">
              Type a search term above to find STEM kits, robots, electronics,
              and more.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
