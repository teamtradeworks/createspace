import { DELIVERY_CONFIG } from "@/config/delivery";

export default function HeaderSkeleton() {
  return (
    <header className="bg-navy sticky top-0 z-50">
      {/* Promo banner - same as real header */}
      <div className="bg-cs-orange text-white text-center py-2 text-sm font-medium">
        Free delivery on orders over R{DELIVERY_CONFIG.freeDeliveryThreshold.toLocaleString()}
      </div>

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo placeholder */}
          <div className="w-[120px] h-6 bg-white/20 rounded animate-pulse" />

          {/* Desktop navigation placeholders */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-16 h-4 bg-white/20 rounded animate-pulse"
              />
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 bg-white/20 rounded animate-pulse" />
            <div className="w-6 h-6 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
      </nav>
    </header>
  );
}
