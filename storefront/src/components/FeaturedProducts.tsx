"use client";

import { useState } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import { Product } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";

type AgeGroup = {
  id: string;
  label: string;
  range: string;
};

const ageGroups: AgeGroup[] = [
  { id: "all", label: "All Ages", range: "All" },
  { id: "3-5", label: "Early Explorers", range: "3-5" },
  { id: "6-8", label: "Junior Innovators", range: "6-8" },
  { id: "9-12", label: "Budding Engineers", range: "9-12" },
  { id: "13+", label: "Advanced Creators", range: "13+" },
];

type FeaturedProductsProps = {
  productsByAge: Record<string, Product[]>;
};

export default function FeaturedProducts({
  productsByAge,
}: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState(ageGroups[0].id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const products = productsByAge[activeTab] || [];
  const totalProducts = products.length;
  const visibleProducts = products.slice(currentIndex, currentIndex + 3);

  // Pad with empty slots if less than 3 products
  while (visibleProducts.length < 3 && products.length > 0) {
    visibleProducts.push(products[visibleProducts.length % products.length]);
  }

  const canGoNext = currentIndex + 3 < totalProducts;
  const canGoPrev = currentIndex > 0;

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentIndex(0);
  };

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-navy mb-3">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular STEM kits, organised by age group
          </p>
        </div>

        {/* Age Group Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            {ageGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => handleTabChange(group.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === group.id
                    ? "bg-navy text-white shadow-md"
                    : "text-gray-600 hover:text-navy"
                }`}
              >
                {group.id === "all" ? "All ages" : `${group.range} yrs`}
              </button>
            ))}
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          {canGoPrev && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-navy hover:bg-gray-50 transition-colors"
              aria-label="Previous products"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {canGoNext && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-navy hover:bg-gray-50 transition-colors"
              aria-label="Next products"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleProducts.map((product, index) => (
                <ProductCard key={`${product.id}-${index}`} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">
                No products found for this age group yet.
              </p>
            </div>
          )}

          {/* Progress Indicator */}
          {totalProducts > 3 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: Math.ceil(totalProducts / 3) }).map(
                (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx * 3)}
                    className={`h-1.5 rounded-full transition-all ${
                      Math.floor(currentIndex / 3) === idx
                        ? "w-8 bg-navy"
                        : "w-4 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to page ${idx + 1}`}
                  />
                )
              )}
            </div>
          )}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href={activeTab === "all" ? "/shop" : `/shop?age=${activeTab}`}
            onClick={() => {
              const group = ageGroups.find((g) => g.id === activeTab);
              posthog.capture("featured_products_view_all_clicked", {
                age_group: activeTab,
                label: group?.label,
              });
            }}
            className="inline-flex items-center text-navy hover:text-cs-orange font-medium transition-colors"
          >
            {activeTab === "all"
              ? "View all products"
              : `View products for ages ${ageGroups.find((g) => g.id === activeTab)?.range}`}
            <svg
              className="w-5 h-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
