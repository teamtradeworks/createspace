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

// The wall shows at most this many photos, chosen for brand spread.
const WALL_LIMIT = 20;

export default async function CustomerPhotoWall() {
  const selected = interleaveByBrand(WALL_PHOTOS).slice(0, WALL_LIMIT);

  // A product can appear more than once (different photos), so fetch each
  // handle once and share the result across its photos.
  const handles = [...new Set(selected.map((photo) => photo.handle))];
  const entries = await Promise.all(
    handles.map(async (handle) => [handle, await getProductByHandle(handle).catch(() => null)] as const),
  );
  const productByHandle = new Map(entries);

  const wallPhotos: WallPhoto[] = selected.map((photo) => {
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
          <p className="text-gray-600">
            Every photo shows a kit we stock, built by kids at home and in class.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-gray-200 px-3.5 py-1.5 text-sm font-medium text-navy">
            <svg
              className="w-4 h-4 text-cs-orange"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9 3a1 1 0 0 1 2 0v8.4l1.3-1.3a1 1 0 0 1 1.5 0l3.9 3.9c.4.4.6 1 .5 1.6l-.7 3.6a2 2 0 0 1-2 1.6H11a2 2 0 0 1-1.5-.7l-4.2-4.8a1 1 0 0 1 .1-1.5l.6-.4a1 1 0 0 1 1-.1L9 12V3Z" />
            </svg>
            Tap a photo to reveal the product
          </span>
        </div>

        <CustomerPhotoWallGrid photos={wallPhotos} />
      </div>
    </section>
  );
}
