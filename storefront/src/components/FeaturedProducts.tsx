"use client";

import { useRef } from "react";
import Link from "next/link";
import { capture } from "@/lib/analytics";
import { Product } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import BrandDecor from "@/components/BrandDecor";

type FeaturedProductsProps = {
  products: Product[];
};

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  const scrollByPage = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-20 bg-white">
      <BrandDecor
        src="/images/illustrations/planet-1.svg"
        className="right-0 top-10 w-32 rotate-3 opacity-[0.06] lg:w-44"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header + scroll controls */}
        <div className="mb-10 flex items-end justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-3">Most loved kits</h2>
            <p className="text-gray-600">The kits our customers buy most.</p>
          </div>
          <div className="hidden flex-shrink-0 gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              aria-label="Scroll left"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-navy transition-all hover:border-navy/40 active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              aria-label="Scroll right"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-navy transition-all hover:border-navy/40 active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable product row (all breakpoints) */}
        <div
          ref={scrollRef}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 scrollbar-none sm:-mx-6 sm:gap-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[72vw] flex-none snap-start sm:w-[46%] md:w-[31%] lg:w-[23%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            onClick={() => capture("featured_products_view_all_clicked")}
            className="inline-flex items-center text-navy hover:text-cs-orange font-medium transition-colors"
          >
            View all products
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
