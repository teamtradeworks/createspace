"use client";

import { useMemo, useState } from "react";
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
  price: string | null;
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

function handleFromHref(href: string): string {
  return href.split("/").pop() ?? href;
}

export default function CustomerPhotoWallGrid({ photos }: { photos: WallPhoto[] }) {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [activeBand, setActiveBand] = useState<string>("all");
  // Which card is currently showing its kit side, plus every card that has
  // flipped at least once (their backs stay mounted so unflips animate).
  const [flippedSrc, setFlippedSrc] = useState<string | null>(null);
  const [everFlipped, setEverFlipped] = useState<Set<string>>(new Set());

  // Only show brand toggles for brands actually present in the wall
  const wallBrands = useMemo(
    () => BRANDS.filter((brand) => photos.some((photo) => photo.brand === brand.key)),
    [photos],
  );

  const spotlight = activeBrand ? (wallBrands.find((b) => b.key === activeBrand) ?? null) : null;

  const filtered = photos.filter((photo) => {
    if (activeBrand && photo.brand !== activeBrand) return false;
    if (activeBand !== "all") {
      const band = AGE_BANDS.find((b) => b.key === activeBand);
      if (band && !matchesBand(photo, band)) return false;
    }
    return true;
  });

  function selectBrand(brandKey: string, brandName: string) {
    setFlippedSrc(null);
    setActiveBrand((prev) => {
      const next = prev === brandKey ? null : brandKey;
      capture("home_page_wall_filter_clicked", {
        filter: "brand",
        value: brandName,
        selected: next !== null,
      });
      if (next !== null) {
        capture("home_page_wall_brand_spotlight_opened", { brand: brandName });
      }
      return next;
    });
  }

  function selectBand(bandKey: string) {
    setFlippedSrc(null);
    setActiveBand(bandKey);
    capture("home_page_wall_filter_clicked", {
      filter: "age",
      value: bandKey,
      selected: bandKey !== "all",
    });
  }

  function toggleFlip(photo: WallPhoto) {
    setFlippedSrc((prev) => {
      const next = prev === photo.src ? null : photo.src;
      if (next !== null) {
        capture("home_page_wall_card_flipped", { handle: handleFromHref(photo.href) });
        setEverFlipped((set) => {
          if (set.has(photo.src)) return set;
          const grown = new Set(set);
          grown.add(photo.src);
          return grown;
        });
      }
      return next;
    });
  }

  return (
    <div>
      {/* Brand logo toggles (single-select: tapping a brand opens its spotlight) */}
      <div
        className="mb-4 flex flex-wrap items-center gap-2 md:gap-3"
        role="group"
        aria-label="Filter by brand"
      >
        {wallBrands.map((brand) => {
          const active = activeBrand === brand.key;
          return (
            <button
              key={brand.key}
              type="button"
              aria-pressed={active}
              aria-label={`Filter by ${brand.name}`}
              title={brand.name}
              onClick={() => selectBrand(brand.key, brand.name)}
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

      {/* Brand spotlight: the payoff for tapping a brand chip */}
      {spotlight && (
        <div className="mb-6 rounded-2xl bg-white ring-1 ring-gray-200 p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8">
          <Image
            src={spotlight.logo}
            alt={spotlight.name}
            width={220}
            height={88}
            className="h-10 md:h-12 w-auto max-w-[180px] object-contain flex-shrink-0"
          />
          <div className="flex-1">
            <p className="font-semibold text-navy text-balance">{spotlight.blurb}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
              <svg
                className="w-4 h-4 text-cs-green flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Official South African supplier
            </p>
          </div>
          <Link
            href={`/shop?brand=${encodeURIComponent(spotlight.vendor)}`}
            onClick={() => capture("home_page_wall_brand_shop_clicked", { brand: spotlight.name })}
            className="inline-flex items-center justify-center px-5 py-3 bg-navy hover:bg-navy/90 active:translate-y-px text-white rounded-lg text-sm font-semibold transition-all whitespace-nowrap"
          >
            Shop all {spotlight.name}
            <svg
              className="ml-1.5 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      )}

      {/* Age band tabs + result count */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex overflow-x-auto pb-1 scrollbar-none">
          <div
            className="inline-flex bg-gray-100 rounded-full p-1"
            role="group"
            aria-label="Filter by age"
          >
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

      {/* Photo masonry of flip cards */}
      {filtered.length > 0 ? (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
          {filtered.map((photo, index) => {
            const isFlipped = flippedSrc === photo.src;
            const brand = BRANDS.find((b) => b.key === photo.brand);
            return (
              <Reveal key={photo.src} className="mb-4 break-inside-avoid" delay={(index % 4) * 60}>
                <div className="wall-flip" data-flipped={isFlipped}>
                  <div className="wall-flip-inner">
                    {/* Front: the build photo */}
                    <button
                      type="button"
                      onClick={() => toggleFlip(photo)}
                      aria-expanded={isFlipped}
                      aria-label={`Show the kit behind this photo: ${photo.name}`}
                      className="wall-flip-front group relative block w-full rounded-xl overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        className="w-full h-auto"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      {brand && (
                        <span className="absolute top-2 right-2 rounded-md bg-white/95 px-1.5 py-1 shadow-sm">
                          <Image
                            src={brand.logo}
                            alt={brand.name}
                            width={120}
                            height={48}
                            className="h-3.5 w-auto max-w-[64px] object-contain"
                          />
                        </span>
                      )}
                      <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy/85 via-navy/25 to-transparent p-3 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 group-focus-visible:opacity-100">
                        <span className="text-sm font-semibold text-white leading-snug">{photo.name}</span>
                        {photo.age && <span className="text-xs text-white/80 mt-0.5">{photo.age}</span>}
                      </span>
                    </button>

                    {/* Back: the kit card (mounted after first flip so unflips animate) */}
                    {everFlipped.has(photo.src) && (
                      <div
                        className="wall-flip-back rounded-xl bg-white ring-1 ring-gray-200 p-3 flex flex-col cursor-pointer"
                        onClick={() => toggleFlip(photo)}
                        aria-hidden={!isFlipped}
                      >
                        <div className="relative flex-1 min-h-0">
                          {photo.productImage && (
                            <Image
                              src={photo.productImage}
                              alt=""
                              fill
                              className="object-contain p-1"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                          )}
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-semibold text-navy leading-snug line-clamp-2">
                            {photo.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {photo.age}
                            {photo.price ? ` · ${photo.price}` : ""}
                          </p>
                          <Link
                            href={photo.href}
                            onClick={(event) => {
                              event.stopPropagation();
                              capture("home_page_wall_product_clicked", {
                                handle: handleFromHref(photo.href),
                              });
                            }}
                            tabIndex={isFlipped ? 0 : -1}
                            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-navy px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
                          >
                            See the kit
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-gray-600 mb-3">No builds match those filters.</p>
          <button
            type="button"
            onClick={() => {
              setActiveBrand(null);
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
