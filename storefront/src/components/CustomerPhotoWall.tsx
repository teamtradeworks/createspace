import { getProductByHandle, formatAgeRange, formatPrice } from "@/lib/shopify";
import CustomerPhotoWallGrid, { type WallPhoto } from "@/components/CustomerPhotoWallGrid";
import { WALL_PHOTOS, type WallPhotoSource } from "@/config/wall-photos";

// Shopify CDN serves resized variants via the width param; the source images
// can be multi-MB, so cap what the Next.js optimizer has to fetch.
function shopifyWidth(url: string | null | undefined, width: number): string | null {
  if (!url) return null;
  return `${url}${url.includes("?") ? "&" : "?"}width=${width}`;
}

// Derive a readable name from a handle, used only if a Shopify fetch fails.
function titleFromHandle(handle: string): string {
  return handle
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Round-robin the pool by brand so the capped wall spans as many brands as
// possible instead of front-loading whichever brand has the most photos.
// Deterministic (pure) — no shuffling, so it's safe to run during render.
function interleaveByBrand(items: WallPhotoSource[]): WallPhotoSource[] {
  const groups = new Map<string, WallPhotoSource[]>();
  for (const item of items) {
    const group = groups.get(item.brand);
    if (group) group.push(item);
    else groups.set(item.brand, [item]);
  }
  const lists = [...groups.values()];
  const result: WallPhotoSource[] = [];
  for (let i = 0; result.length < items.length; i++) {
    let addedThisRound = false;
    for (const list of lists) {
      if (i < list.length) {
        result.push(list[i]);
        addedThisRound = true;
      }
    }
    if (!addedThisRound) break;
  }
  return result;
}

// How many photos the wall renders. The masonry scrolls vertically, so this can
// be generous — enough to make "scroll to reveal more" worthwhile.
const WALL_LIMIT = 30;

export default async function CustomerPhotoWall() {
  // Pass the full pool (interleaved by brand) to the grid; it slices to
  // WALL_LIMIT for the default view and again for each brand-filtered view,
  // so both land near ~12 rather than the filtered view showing a thin slice.
  const pool = interleaveByBrand(WALL_PHOTOS);

  // A product can appear more than once (different photos), so fetch each
  // handle once and share the result across its photos.
  const handles = [...new Set(pool.map((photo) => photo.handle))];
  const entries = await Promise.all(
    handles.map(async (handle) => [handle, await getProductByHandle(handle).catch(() => null)] as const),
  );
  const productByHandle = new Map(entries);

  const wallPhotos: WallPhoto[] = pool.map((photo) => {
    const product = productByHandle.get(photo.handle) ?? null;
    return {
      src: photo.src,
      width: photo.width,
      height: photo.height,
      alt: photo.alt,
      href: `/product/${photo.handle}`,
      name: product?.title ?? titleFromHandle(photo.handle),
      age: product ? formatAgeRange(product.minAge, product.maxAge) : null,
      brand: photo.brand,
      productImage: shopifyWidth(product?.images?.edges?.[0]?.node?.url, 800),
      price: product
        ? formatPrice(
            product.priceRange.minVariantPrice.amount,
            product.priceRange.minVariantPrice.currencyCode,
          )
        : null,
    };
  });

  return (
    <section id="builds" className="py-16 md:py-20 bg-gray-50 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-3">
            Built by kids like yours
          </h2>
          <p className="text-gray-600">At home and in the classroom.</p>
        </div>

        <div className="relative">
          {/* "Tap to reveal!" cue floated above the wall, top-right (desktop).
              Absolute, so it takes no vertical space above the grid. */}
          <span className="pointer-events-none absolute bottom-full left-[55%] z-10 mb-6 hidden -translate-x-1/2 items-end gap-1.5 text-cs-purple lg:inline-flex">
            <span className="-rotate-2 whitespace-nowrap text-base font-bold md:text-lg">
              Tap to reveal!
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 48 44"
              fill="none"
              stroke="currentColor"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 flex-none md:h-9 md:w-9"
            >
              <path d="M6 6 C 26 4, 40 14, 30 34" />
              <path d="M20 28 L 30 37 L 40 27" />
            </svg>
          </span>
          {/* Mobile: inline cue (the floating desktop cue would overlap the
              wall on small screens). */}
          <div className="mb-3 flex items-end gap-1.5 text-cs-purple lg:hidden">
            <span className="-rotate-2 text-base font-bold">Tap to reveal!</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 48 44"
              fill="none"
              stroke="currentColor"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7 flex-none"
            >
              <path d="M6 6 C 26 4, 40 14, 30 34" />
              <path d="M20 28 L 30 37 L 40 27" />
            </svg>
          </div>
          <CustomerPhotoWallGrid photos={wallPhotos} limit={WALL_LIMIT} />
        </div>
      </div>
    </section>
  );
}
