"use client";

import { useMemo, useState, useEffect, useRef } from "react";
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
  productImage: string | null;
  price: string | null;
};

function handleFromHref(href: string): string {
  return href.split("/").pop() ?? href;
}

export default function CustomerPhotoWallGrid({ photos }: { photos: WallPhoto[] }) {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  // Which card is currently showing its kit side, plus every card that has
  // flipped at least once (their backs stay mounted so unflips animate).
  const [flippedSrc, setFlippedSrc] = useState<string | null>(null);
  const [everFlipped, setEverFlipped] = useState<Set<string>>(new Set());
  // Mirrors flippedSrc so the auto-reveal interval can read the current card
  // without re-subscribing on every flip.
  const flippedRef = useRef<string | null>(null);

  // Only show brand toggles for brands actually present in the wall
  const wallBrands = useMemo(
    () => BRANDS.filter((brand) => photos.some((photo) => photo.brand === brand.key)),
    [photos],
  );

  const spotlight = activeBrand ? (wallBrands.find((b) => b.key === activeBrand) ?? null) : null;

  const filtered = activeBrand ? photos.filter((photo) => photo.brand === activeBrand) : photos;

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

  useEffect(() => {
    flippedRef.current = flippedSrc;
  }, [flippedSrc]);

  // Ambient auto-reveal: every 4s flip a random card to its product side, which
  // resets the previously revealed one (flippedSrc holds a single card). Skipped
  // for reduced-motion users, who reveal by tapping.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pool = activeBrand ? photos.filter((p) => p.brand === activeBrand) : photos;
    if (pool.length < 2) return;
    const timer = setInterval(() => {
      const candidates = pool.filter((p) => p.src !== flippedRef.current);
      const pick = candidates[Math.floor(Math.random() * candidates.length)] ?? pool[0];
      setFlippedSrc(pick.src);
      setEverFlipped((set) => {
        if (set.has(pick.src)) return set;
        const grown = new Set(set);
        grown.add(pick.src);
        return grown;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [activeBrand, photos]);

  return (
    <div>
      {/* Brand logo toggles (single-select: tapping a brand opens its spotlight) */}
      <div
        className="mb-8 flex flex-wrap items-center gap-2 md:gap-3"
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
          <p className="text-gray-600 mb-3">No builds for this brand yet.</p>
          <button
            type="button"
            onClick={() => setActiveBrand(null)}
            className="text-cs-orange font-medium hover:underline"
          >
            Show all builds
          </button>
        </div>
      )}
    </div>
  );
}
