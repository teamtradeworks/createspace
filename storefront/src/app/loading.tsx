export default function Loading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="w-32 h-4 bg-white/20 rounded animate-pulse mb-4" />
          <div className="w-2/3 h-10 bg-white/20 rounded animate-pulse mb-4" />
          <div className="w-1/2 h-10 bg-white/20 rounded animate-pulse mb-6" />
          <div className="w-3/4 h-5 bg-white/20 rounded animate-pulse mb-2" />
          <div className="w-1/2 h-5 bg-white/20 rounded animate-pulse" />
        </div>
      </section>

      {/* Content skeleton */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse" />
                <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse" />
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
