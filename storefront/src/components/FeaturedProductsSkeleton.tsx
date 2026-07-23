export default function FeaturedProductsSkeleton() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-3">Most loved kits</h2>
          <p className="text-gray-600">The kits our customers buy most.</p>
        </div>

        {/* Products Row Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group">
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl overflow-hidden">
                {/* Image Skeleton */}
                <div className="aspect-square relative overflow-hidden">
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                </div>

                {/* Product Info Skeleton */}
                <div className="p-5">
                  <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse mb-4" />

                  <div className="flex items-center justify-between">
                    <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
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
