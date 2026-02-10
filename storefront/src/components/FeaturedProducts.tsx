"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/shopify";

type AgeGroup = {
  id: string;
  label: string;
  range: string;
};

const ageGroups: AgeGroup[] = [
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
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

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
                {group.range} yrs
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
              {visibleProducts.map((product, index) => {
                const isHovered = hoveredProduct === `${product.id}-${index}`;
                const primaryImage = product.images.edges[0]?.node;
                const hoverImage =
                  product.images.edges[1]?.node ||
                  product.images.edges[2]?.node ||
                  primaryImage;
                const price = product.priceRange.minVariantPrice;

                return (
                  <div
                    key={`${product.id}-${index}`}
                    className="group"
                    onMouseEnter={() =>
                      setHoveredProduct(`${product.id}-${index}`)
                    }
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
                      {/* Image Container */}
                      <Link href={`/product/${product.handle}`}>
                        <div className="aspect-square relative overflow-hidden">
                          {primaryImage && (
                            <>
                              {/* Primary Image */}
                              <Image
                                src={primaryImage.url}
                                alt={primaryImage.altText || product.title}
                                fill
                                className={`object-contain p-6 transition-all duration-500 ${
                                  isHovered
                                    ? "opacity-0 scale-105"
                                    : "opacity-100 scale-100"
                                }`}
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                              {/* Hover Image */}
                              <Image
                                src={hoverImage.url}
                                alt={hoverImage.altText || product.title}
                                fill
                                className={`object-contain p-6 transition-all duration-500 ${
                                  isHovered
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-95"
                                }`}
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </>
                          )}
                          {!primaryImage && (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <svg
                                className="w-20 h-20"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1}
                                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="p-5">
                        <Link href={`/product/${product.handle}`}>
                          <h3 className="font-semibold text-navy text-lg mb-1 line-clamp-1 group-hover:text-cs-orange transition-colors">
                            {product.title}
                          </h3>
                        </Link>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                          {product.description || "STEM learning kit"}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-navy">
                            {formatPrice(price.amount, price.currencyCode)}
                          </span>
                          <button className="inline-flex items-center text-cs-orange hover:text-cs-red font-medium text-sm transition-colors">
                            Add to Cart
                            <svg
                              className="w-4 h-4 ml-1"
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
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
            href={`/shop?age=${activeTab}`}
            className="inline-flex items-center text-navy hover:text-cs-orange font-medium transition-colors"
          >
            View all {ageGroups.find((g) => g.id === activeTab)?.label} products
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
