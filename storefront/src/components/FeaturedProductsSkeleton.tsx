export default function FeaturedProductsSkeleton() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-3">Shop our kits</h2>
          <p className="text-gray-600">Filter by brand, or browse the lot.</p>
        </div>

        {/* Scroll-row skeleton */}
        <div className="-mx-4 flex gap-4 overflow-hidden px-4 sm:-mx-6 sm:gap-6 sm:px-6 lg:-mx-8 lg:px-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-[72vw] flex-none sm:w-[46%] md:w-[31%] lg:w-[23%]">
              <div className="overflow-hidden rounded-2xl border-2 border-gray-100">
                <div className="aspect-square w-full animate-pulse bg-gray-200" />
                <div className="p-5">
                  <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="mb-4 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
                    <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
