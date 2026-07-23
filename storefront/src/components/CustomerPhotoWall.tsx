import { getProductByHandle, formatAgeRange } from "@/lib/shopify";
import CustomerPhotoWallGrid, { type WallPhoto } from "@/components/CustomerPhotoWallGrid";

type PhotoDef = Omit<WallPhoto, "name" | "age" | "href" | "minAge" | "maxAge" | "productImage"> & {
  handle: string;
  fallbackName: string;
  fallbackMinAge: number;
  fallbackMaxAge: number | null;
};

const photos: PhotoDef[] = [
  {
    src: "/images/home/customer-wall/marble-run-kids.jpg",
    width: 1200,
    height: 1200,
    alt: "Kids playing with their finished marble run",
    handle: "national-geographic-motorized-marble-run",
    fallbackName: "National Geographic Motorized Marble Run",
    brand: "national-geographic",
    fallbackMinAge: 8,
    fallbackMaxAge: 12,
  },
  {
    src: "/images/home/customer-wall/talebot-girls.jpg",
    width: 1200,
    height: 902,
    alt: "Two girls guiding a Tale-Bot across its map",
    handle: "matatastudio-tale-bot-pro",
    fallbackName: "MatataStudio Tale-Bot Pro",
    brand: "matatastudio",
    fallbackMinAge: 3,
    fallbackMaxAge: 6,
  },
  {
    src: "/images/home/customer-wall/kids-tablet-build.jpg",
    width: 541,
    height: 1200,
    alt: "Children building a robot guided by a tablet",
    handle: "makerzoid-smart-robot",
    fallbackName: "Makerzoid Smart Robot",
    brand: "makerzoid",
    fallbackMinAge: 5,
    fallbackMaxAge: 8,
  },
  {
    src: "/images/home/customer-wall/rockets-park.jpg",
    width: 1200,
    height: 1090,
    alt: "Kids launching stomp rockets in the park",
    handle: "national-geographic-light-up-sky-rockets",
    fallbackName: "National Geographic Light Up Sky Rockets",
    brand: "national-geographic",
    fallbackMinAge: 6,
    fallbackMaxAge: 12,
  },
  {
    src: "/images/home/customer-wall/makerzoid-robot-build.jpg",
    width: 1200,
    height: 710,
    alt: "A child assembling a Makerzoid robot",
    handle: "makerzoid-smart-robot-premium",
    fallbackName: "Makerzoid Smart Robot Premium",
    brand: "makerzoid",
    fallbackMinAge: 6,
    fallbackMaxAge: 12,
  },
  {
    src: "/images/home/customer-wall/arduino-workbench.jpg",
    width: 900,
    height: 1200,
    alt: "A teen testing their Arduino circuit at a workbench",
    handle: "arduino-starter-kit",
    fallbackName: "Arduino Starter Kit",
    brand: "arduino",
    fallbackMinAge: 10,
    fallbackMaxAge: null,
  },
  {
    src: "/images/home/customer-wall/telescope-child.jpg",
    width: 675,
    height: 1200,
    alt: "A child looking through their telescope",
    handle: "nasa-lunar-telescope",
    fallbackName: "NASA Lunar Telescope",
    brand: "nasa",
    fallbackMinAge: 8,
    fallbackMaxAge: 12,
  },
  {
    src: "/images/home/customer-wall/snap-circuits-light.jpg",
    width: 1200,
    height: 1159,
    alt: "A child lighting up their Snap Circuits build",
    handle: "snap-circuits-beginner",
    fallbackName: "Snap Circuits Beginner",
    brand: "snap-circuits",
    fallbackMinAge: 5,
    fallbackMaxAge: 9,
  },
  {
    src: "/images/home/customer-wall/blockaroo-bath.jpg",
    width: 900,
    height: 1200,
    alt: "Foam building blocks stuck to the side of a bath",
    handle: "blockaroo-magnetic-foam-builders-trunk-set",
    fallbackName: "Blockaroo Magnetic Foam Builders Trunk Set",
    brand: "blockaroo",
    fallbackMinAge: 3,
    fallbackMaxAge: 6,
  },
  {
    src: "/images/home/customer-wall/coding-set-kids.jpg",
    width: 1200,
    height: 810,
    alt: "Three kids planning a route with the coding set",
    handle: "matatastudio-coding-set-pro",
    fallbackName: "MatataStudio Coding Set Pro",
    brand: "matatastudio",
    fallbackMinAge: 4,
    fallbackMaxAge: 9,
  },
  {
    src: "/images/home/customer-wall/chemistry-pour.jpg",
    width: 1200,
    height: 1200,
    alt: "Hands pouring coloured liquids for a chemistry experiment",
    handle: "national-geographic-amazing-reactions-chemistry-set",
    fallbackName: "National Geographic Amazing Reactions Chemistry Set",
    brand: "national-geographic",
    fallbackMinAge: 8,
    fallbackMaxAge: 12,
  },
  {
    src: "/images/home/customer-wall/circuits-child.jpg",
    width: 1200,
    height: 1200,
    alt: "A child playing with the circuits kit they built",
    handle: "national-geographic-epic-circuits-science-kit",
    fallbackName: "National Geographic Epic Circuits Science Kit",
    brand: "national-geographic",
    fallbackMinAge: 8,
    fallbackMaxAge: 14,
  },
  {
    src: "/images/home/customer-wall/microbit-dance.jpg",
    width: 1200,
    height: 1113,
    alt: "A child dancing with a micro:bit strapped to their wrist",
    handle: "micro-bit-wearable-x-10",
    fallbackName: "micro:bit Wearable",
    brand: "bbc-microbit",
    fallbackMinAge: 8,
    fallbackMaxAge: 14,
  },
];

function parseAge(value: string | undefined, fallback: number | null): number | null {
  const parsed = value ? parseInt(value, 10) : NaN;
  return Number.isNaN(parsed) ? fallback : parsed;
}

// Shopify CDN serves resized variants via the width param; the source images
// can be multi-MB, so cap what the Next.js optimizer has to fetch.
function shopifyWidth(url: string | null | undefined, width: number): string | null {
  if (!url) return null;
  return `${url}${url.includes("?") ? "&" : "?"}width=${width}`;
}

export default async function CustomerPhotoWall() {
  const products = await Promise.all(
    photos.map((photo) => getProductByHandle(photo.handle).catch(() => null)),
  );

  const wallPhotos: WallPhoto[] = photos.map((photo, index) => {
    const product = products[index];
    const ageLabel = product ? formatAgeRange(product.minAge, product.maxAge) : null;
    return {
      src: photo.src,
      width: photo.width,
      height: photo.height,
      alt: photo.alt,
      href: `/product/${photo.handle}`,
      name: product?.title ?? photo.fallbackName,
      age:
        ageLabel ??
        (photo.fallbackMaxAge
          ? `Ages ${photo.fallbackMinAge}-${photo.fallbackMaxAge}`
          : `Ages ${photo.fallbackMinAge}+`),
      brand: photo.brand,
      minAge: parseAge(product?.minAge?.value, photo.fallbackMinAge),
      maxAge: parseAge(product?.maxAge?.value, photo.fallbackMaxAge),
      productImage: shopifyWidth(product?.images?.edges?.[0]?.node?.url, 800),
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
            Every photo shows a kit we stock, built by kids at home and in class. Tap one to see
            the kit.
          </p>
        </div>

        <CustomerPhotoWallGrid photos={wallPhotos} />
      </div>
    </section>
  );
}
