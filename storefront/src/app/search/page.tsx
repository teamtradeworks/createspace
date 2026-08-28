import { searchProducts } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import SearchInput from "@/components/SearchInput";
import SearchResultsTracker from "@/components/SearchResultsTracker";
import CategoryChips from "@/components/CategoryChips";
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
  const { kind, products } = query
    ? await searchProducts(query)
    : { kind: "none" as const, products: [] };

  const grid = (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          searchQuery={query}
          searchPosition={index + 1}
          source="search_results"
        />
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-bold text-navy mb-6 text-center">Search</h1>
          <SearchInput defaultValue={query} autoFocus={!query} />
        </div>

        {/* Results */}
        {query ? (
          <>
            <SearchResultsTracker query={query} resultCount={products.length} resultKind={kind} />

            {kind === "match" && (
              <>
                <p className="text-sm text-gray-500 mb-6">
                  {products.length} result{products.length !== 1 ? "s" : ""} for &ldquo;{query}
                  &rdquo;
                </p>
                {grid}
              </>
            )}

            {/* Nothing matched the whole query, but some of its words did. Show
                those as suggestions so the search isn't a dead end. */}
            {kind === "related" && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-xl font-medium text-navy mb-2">
                    No exact match for &ldquo;{query}&rdquo;
                  </h2>
                  <p className="text-gray-600">Here&apos;s the closest thing we stock.</p>
                </div>
                {grid}
                <div className="text-center mt-10">
                  <Link
                    href="/shop"
                    className="inline-flex items-center px-6 py-3 bg-navy hover:bg-navy/90 text-white rounded-lg font-semibold transition-colors"
                  >
                    Browse All Products
                  </Link>
                </div>
              </>
            )}

            {kind === "none" && (
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
                  Nothing matched &ldquo;{query}&rdquo;
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Try a different spelling, or pick a category to browse.
                </p>
                <CategoryChips
                  event="search_category_clicked"
                  className="flex flex-wrap justify-center gap-2 md:gap-3"
                />
                <div className="mt-8">
                  <Link
                    href="/shop"
                    className="inline-flex items-center px-6 py-3 bg-navy hover:bg-navy/90 text-white rounded-lg font-semibold transition-colors"
                  >
                    Browse All Products
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-8">
              Type a search term above to find STEM kits, robots, electronics, and more.
            </p>
            <CategoryChips
              event="search_category_clicked"
              className="flex flex-wrap justify-center gap-2 md:gap-3"
            />
          </div>
        )}
      </div>
    </main>
  );
}
