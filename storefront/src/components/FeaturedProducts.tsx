"use client";

import Link from "next/link";
import { capture } from "@/lib/analytics";
import { Product } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import BrandDecor from "@/components/BrandDecor";

type FeaturedProductsProps = {
  products: Product[];
};

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="relative overflow-hidden py-16 md:py-20 bg-white">
      <BrandDecor
        src="/images/illustrations/planet-1.svg"
        className="right-0 top-10 w-32 rotate-3 opacity-[0.06] lg:w-44"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-3">Most loved kits</h2>
          <p className="text-gray-600">The kits our customers buy most.</p>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden -mx-4 sm:-mx-6">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 sm:px-6 pb-4 scrollbar-none">
            {products.map((product) => (
              <div key={product.id} className="flex-none w-[72vw] snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: single row */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
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
