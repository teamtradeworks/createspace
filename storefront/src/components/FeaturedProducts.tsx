"use client";

import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { capture } from "@/lib/analytics";
import { Product } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import BrandDecor from "@/components/BrandDecor";
import { BRANDS } from "@/config/brands";

type FeaturedProductsProps = {
  products: Product[];
  featuredProducts: Product[];
};

// How many kits the row shows before a brand is picked — a "most loved" teaser.
// Selecting a brand then reveals that brand's full in-stock lineup.
const DEFAULT_VISIBLE = 18;

export default function FeaturedProducts({ products, featuredProducts }: FeaturedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  // Offer a toggle for every brand present in the set, in canonical order, so
  // the filter lists all the brands we stock — even low-volume ones.
  const featuredBrands = useMemo(
    () =>
      BRANDS.filter((brand) =>
        products.some((p) => p.vendor?.toLowerCase() === brand.vendor.toLowerCase()),
      ),
    [products],
  );

  if (products.length === 0) return null;

  const activeBrandObj = activeBrand
    ? (featuredBrands.find((b) => b.key === activeBrand) ?? null)
    : null;
  // No brand selected: show the curated featured collection in Shopify order.
  // Brand selected: show that brand's full lineup from the all-products set.
  const shown = activeBrandObj
    ? products.filter((p) => p.vendor?.toLowerCase() === activeBrandObj.vendor.toLowerCase())
    : featuredProducts.slice(0, DEFAULT_VISIBLE);

  const selectBrand = (brand: (typeof BRANDS)[number]) => {
    setActiveBrand((prev) => {
      const next = prev === brand.key ? null : brand.key;
      capture("home_page_featured_filter_clicked", { brand: brand.name, selected: next !== null });
      return next;
    });
    scrollRef.current?.scrollTo({ left: 0 });
  };

  const scrollByPage = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    capture("home_page_featured_carousel_scrolled", {
      direction: direction > 0 ? "next" : "prev",
    });
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-20 bg-white">
      <BrandDecor
        src="/images/illustrations/planet-1.svg"
        className="right-0 top-10 w-32 rotate-3 opacity-[0.06] lg:w-44"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-6 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-3">Shop our kits</h2>
          <p className="text-gray-600">
            Filter by brand, or{" "}
            <Link
              href="/shop"
              onClick={() =>
                capture("home_page_shop_link_clicked", { source: "featured_subtitle" })
              }
              className="font-medium text-navy underline underline-offset-2 transition-colors hover:text-cs-orange"
            >
              browse the lot
            </Link>
            .
          </p>
        </div>

        {/* Mobile: inline "Choose a brand!" cue (desktop uses the floating cue
            above the Nat Geo chip, which would overlap the wrapped rows here) */}
        {featuredBrands.length > 1 && (
          <div className="mb-4 flex items-center gap-1.5 text-cs-purple lg:hidden">
            <span className="-rotate-2 text-base font-bold">Choose a brand!</span>
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
        )}

        {/* Brand filter + carousel scroll controls share one row */}
        {featuredBrands.length > 1 && (
          <div className="mb-8 flex items-center justify-between gap-4">
            <div
              className="flex flex-wrap items-center gap-2 md:gap-3"
              role="group"
              aria-label="Filter by brand"
            >
              {featuredBrands.map((brand) => {
                const active = activeBrand === brand.key;
                return (
                  <div key={brand.key} className="relative">
                    {/* Floating cue pinned above the Nat Geo chip — absolute, so it
                      tracks the chip and takes no layout space (desktop only) */}
                    {brand.key === "national-geographic" && (
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-6 hidden -translate-x-1/2 items-end gap-1.5 text-cs-purple lg:flex">
                        <span className="-rotate-2 whitespace-nowrap text-base font-bold md:text-lg">
                          Choose a brand!
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
                      </div>
                    )}
                    <button
                      type="button"
                      aria-pressed={active}
                      aria-label={`Filter by ${brand.name}`}
                      title={brand.name}
                      onClick={() => selectBrand(brand)}
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
                        className="h-7 w-auto max-w-[96px] object-contain md:h-8"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
            {/* Scroll controls, same row as the brand toggles */}
            <div className="hidden flex-shrink-0 gap-2 md:flex">
              <button
                type="button"
                onClick={() => scrollByPage(-1)}
                aria-label="Scroll left"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-navy transition-all hover:border-navy/40 active:scale-95"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollByPage(1)}
                aria-label="Scroll right"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-navy transition-all hover:border-navy/40 active:scale-95"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Scrollable product row (all breakpoints) */}
        <div
          ref={scrollRef}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 scrollbar-none sm:-mx-6 sm:gap-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {shown.map((product) => (
            <div
              key={product.id}
              className="w-[72vw] flex-none snap-start sm:w-[46%] md:w-[31%] lg:w-[23%]"
            >
              <ProductCard product={product} source="home_featured" />
            </div>
          ))}
        </div>

        {/* View-all: brand-specific when filtered, otherwise the whole shop */}
        <div className="text-center mt-10">
          <Link
            href={
              activeBrandObj ? `/shop?brand=${encodeURIComponent(activeBrandObj.vendor)}` : "/shop"
            }
            onClick={() =>
              activeBrandObj
                ? capture("home_page_featured_brand_shop_clicked", { brand: activeBrandObj.name })
                : capture("featured_products_view_all_clicked")
            }
            className="inline-flex items-center text-navy hover:text-cs-orange font-medium transition-colors"
          >
            {activeBrandObj ? `View all ${activeBrandObj.name} products` : "View all products"}
            <svg
              className="w-5 h-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
