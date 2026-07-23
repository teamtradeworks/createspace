"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { capture } from "@/lib/analytics";
import { BRANDS } from "@/config/brands";

export type WallPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  href: string;
  name: string;
  age: string | null;
  brand: string;
  minAge: number | null;
  maxAge: number | null;
  productImage: string | null;
};

const AGE_BANDS = [
  { key: "3-5", min: 3, max: 5 },
  { key: "6-8", min: 6, max: 8 },
  { key: "9-12", min: 9, max: 12 },
  { key: "13+", min: 13, max: null as number | null },
];

function matchesBand(photo: WallPhoto, band: (typeof AGE_BANDS)[number]): boolean {
  if (photo.minAge === null) return true;
  const photoMax = photo.maxAge ?? 99;
  const bandMax = band.max ?? 99;
  return photo.minAge <= bandMax && band.min <= photoMax;
}

/**
 * The product-image hover layer only exists on hover-capable viewports (sm+).
 * Gating on matchMedia keeps mobile from downloading packshots it can never see.
 */
function useHoverCapable(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(min-width: 640px)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(min-width: 640px)").matches,
    () => false,
  );
}

export default function CustomerPhotoWallGrid({ photos }: { photos: WallPhoto[] }) {
  const [activeBrands, setActiveBrands] = useState<Set<string>>(new Set());
  const [activeBand, setActiveBand] = useState<string>("all");
  const hoverCapable = useHoverCapable();

  // Only show brand toggles for brands actually present in the wall
  const wallBrands = useMemo(
    () => BRANDS.filter((brand) => photos.some((photo) => photo.brand === brand.key)),
    [photos],
  );

  const filtered = photos.filter((photo) => {
    if (activeBrands.size > 0 && !activeBrands.has(photo.brand)) return false;
    if (activeBand !== "all") {
      const band = AGE_BANDS.find((b) => b.key === activeBand);
      if (band && !matchesBand(photo, band)) return false;
    }
    return true;
  });

  function toggleBrand(brandKey: string, brandName: string) {
    setActiveBrands((prev) => {
      const next = new Set(prev);
      const selected = !next.has(brandKey);
      if (selected) {
        next.add(brandKey);
      } else {
        next.delete(brandKey);
      }
      capture("home_page_wall_filter_clicked", { filter: "brand", value: brandName, selected });
      return next;
    });
  }

  function selectBand(bandKey: string) {
    setActiveBand(bandKey);
    capture("home_page_wall_filter_clicked", {
      filter: "age",
      value: bandKey,
      selected: bandKey !== "all",
    });
  }

  return (
    <div>
      {/* Brand logo toggles */}
      <div className="mb-4 flex flex-wrap items-center gap-2 md:gap-3" role="group" aria-label="Filter by brand">
        {wallBrands.map((brand) => {
          const active = activeBrands.has(brand.key);
          return (
            <button
              key={brand.key}
              type="button"
              aria-pressed={active}
              aria-label={`Filter by ${brand.name}`}
              title={brand.name}
              onClick={() => toggleBrand(brand.key, brand.name)}
              className={`flex items-center justify-center rounded-xl border bg-white px-3 py-2 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
                active
                  ? "border-cs-orange shadow-sm"
                  : "border-gray-200 grayscale opacity-50 hover:opacity-80 hover:grayscale-0"
              }`}
            >
              <Image
                src={brand.logo}
                alt=""
                width={120}
                height={48}
                className="h-6 md:h-7 w-auto max-w-[84px] object-contain"
              />
            </button>
          );
        })}
      </div>

      {/* Age band tabs + result count */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex overflow-x-auto pb-1 scrollbar-none">
          <div className="inline-flex bg-gray-100 rounded-full p-1" role="group" aria-label="Filter by age">
            {[{ key: "all", label: "All ages" }, ...AGE_BANDS.map((b) => ({ key: b.key, label: `${b.key} yrs` }))].map(
              (band) => (
                <button
                  key={band.key}
                  type="button"
                  aria-pressed={activeBand === band.key}
                  onClick={() => selectBand(band.key)}
                  className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeBand === band.key ? "bg-navy text-white shadow-md" : "text-gray-600 hover:text-navy"
                  }`}
                >
                  {band.label}
                </button>
              ),
            )}
          </div>
        </div>
        <p className="text-sm text-gray-500" aria-live="polite">
          {filtered.length === photos.length
            ? `${photos.length} kits`
            : `${filtered.length} of ${photos.length} kits`}
        </p>
      </div>

      {/* Photo masonry */}
      {filtered.length > 0 ? (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
          {filtered.map((photo, index) => (
            <Reveal key={photo.src} className="mb-4 break-inside-avoid" delay={(index % 4) * 60}>
              <Link
                href={photo.href}
                onClick={() =>
                  capture("home_page_wall_product_clicked", { handle: photo.href.split("/").pop() })
                }
                className="group relative block rounded-xl overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="w-full h-auto"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {hoverCapable && photo.productImage && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <Image
                      src={photo.productImage}
                      alt=""
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 33vw, 25vw"
                    />
                  </span>
                )}
                <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy/85 via-navy/25 to-transparent p-3 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="text-sm font-semibold text-white leading-snug">{photo.name}</span>
                  {photo.age && <span className="text-xs text-white/80 mt-0.5">{photo.age}</span>}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-gray-600 mb-3">No builds match those filters.</p>
          <button
            type="button"
            onClick={() => {
              setActiveBrands(new Set());
              setActiveBand("all");
            }}
            className="text-cs-orange font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
