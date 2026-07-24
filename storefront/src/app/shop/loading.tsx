// Route-level loading state for /shop. Mirrors the real layout (header band,
// filter rail, product grid) so the page has a shaped skeleton while the
// Shopify collection fetch resolves, rather than a blank flash.
export default function ShopLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header band (matches page.tsx) */}
      <header className="bg-navy text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="h-4 w-24 bg-white/15 rounded mb-4 animate-pulse" />
          <div className="h-9 w-80 max-w-full bg-white/15 rounded-lg animate-pulse" />
          <div className="h-4 w-96 max-w-full bg-white/10 rounded mt-3 animate-pulse" />
        </div>
      </header>

      <section className="pt-4 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Mobile control bar placeholder */}
          <div className="lg:hidden flex items-center gap-3 py-3 border-b-2 border-navy/10 mb-4">
            <div className="h-11 w-28 bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-11 w-28 bg-gray-200 rounded-xl animate-pulse ml-auto" />
          </div>

          <div className="lg:grid lg:grid-cols-[248px_1fr] lg:gap-10 lg:mt-6">
            {/* Filter rail skeleton */}
            <aside className="hidden lg:block">
              <div className="bg-white rounded-2xl ring-1 ring-gray-200/70 shadow-sm p-5">
                <div className="h-5 w-20 bg-gray-200 rounded mb-5 animate-pulse" />
                {[...Array(3)].map((_, g) => (
                  <div key={g} className="mb-7">
                    <div className="h-3 w-16 bg-gray-200 rounded mb-3 animate-pulse" />
                    <div className="flex flex-wrap gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-9 w-20 bg-gray-100 rounded-full animate-pulse" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Product grid skeleton */}
            <div>
              <div className="hidden lg:flex items-center justify-between mb-5">
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-32 bg-gray-200 rounded-xl animate-pulse" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl sm:rounded-2xl border-2 border-gray-100 overflow-hidden"
                  >
                    <div className="aspect-square bg-gray-100 animate-pulse" />
                    <div className="p-3 sm:p-5">
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse mb-3" />
                      <div className="flex items-center justify-between">
                        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                        <div className="h-9 w-9 bg-gray-200 rounded-lg animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
