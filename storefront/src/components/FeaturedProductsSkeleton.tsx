export default function FeaturedProductsSkeleton() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-3">Most loved kits</h2>
          <p className="text-gray-600">The kits our customers buy most.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl bg-gray-200 animate-pulse" />
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-xl bg-gray-200 animate-pulse" />
              <div className="aspect-square rounded-xl bg-gray-200 animate-pulse" />
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="w-40 h-5 bg-gray-200 rounded animate-pulse mb-6" />
            <div className="space-y-3 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-2/3 h-4 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
            <div className="w-28 h-8 bg-gray-200 rounded animate-pulse mb-6" />
            <div className="w-40 h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
