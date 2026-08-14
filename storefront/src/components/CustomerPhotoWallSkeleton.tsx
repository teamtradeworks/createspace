export default function CustomerPhotoWallSkeleton() {
  return (
    <section id="builds" className="py-16 md:py-20 bg-gray-50 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-3">
            Built by kids like yours
          </h2>
          <p className="text-gray-600">At home and in the classroom.</p>
        </div>

        {/* Masonry skeleton, clipped to the same height as the real wall */}
        <div className="max-h-[620px] overflow-hidden">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {[0.8, 1.1, 0.9, 1.2, 1.0, 0.85, 1.15, 0.95].map((aspect, i) => (
              <div
                key={i}
                className="w-full animate-pulse rounded-xl bg-gray-200"
                style={{ aspectRatio: String(aspect) }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
