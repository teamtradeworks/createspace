"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/shopify";

interface ShopGalleryProps {
  products: Product[];
  initialAge?: string;
}

const ageGroups = [
  { id: "all", label: "All Ages", range: null },
  { id: "3-5", label: "Ages 3-5", range: [3, 5] },
  { id: "6-8", label: "Ages 6-8", range: [6, 8] },
  { id: "9-12", label: "Ages 9-12", range: [9, 12] },
  { id: "13+", label: "Ages 13+", range: [13, 99] },
];

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export default function ShopGallery({ products, initialAge }: ShopGalleryProps) {
  const [selectedAge, setSelectedAge] = useState(initialAge || "all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  // Extract unique brands from products
  const brands = useMemo(() => {
    const uniqueBrands = new Set<string>();
    products.forEach((product) => {
      if (product.vendor) {
        uniqueBrands.add(product.vendor);
      }
    });
    return Array.from(uniqueBrands).sort();
  }, [products]);

  // Filter products by age group and brand
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by brand
    if (selectedBrand !== "all") {
      result = result.filter((product) => product.vendor === selectedBrand);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        result.sort(
          (a, b) =>
            parseFloat(a.priceRange.minVariantPrice.amount) -
            parseFloat(b.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-high":
        result.sort(
          (a, b) =>
            parseFloat(b.priceRange.minVariantPrice.amount) -
            parseFloat(a.priceRange.minVariantPrice.amount)
        );
        break;
      case "name-az":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-za":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return result;
  }, [products, selectedAge, selectedBrand, sortBy]);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filters Bar */}
        <div className="flex flex-col gap-4 mb-8 pb-6 border-b">
          {/* Age Group Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Age:</span>
            {ageGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedAge(group.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedAge === group.id
                    ? "bg-navy text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>

          {/* Brand and Sort Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Brand Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Brand:</span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cs-orange bg-white min-w-[160px]"
              >
                <option value="all">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cs-orange bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-az">Name: A to Z</option>
                <option value="name-za">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.handle}`}
                className="group"
              >
                <div className="bg-gray-50 rounded-xl overflow-hidden mb-3 aspect-square relative">
                  {product.images.edges[0] ? (
                    <Image
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-navy group-hover:text-cs-orange transition-colors line-clamp-2 mb-1">
                  {product.title}
                </h3>
                <p className="text-cs-orange font-semibold">
                  {formatPrice(
                    product.priceRange.minVariantPrice.amount,
                    product.priceRange.minVariantPrice.currencyCode
                  )}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              No products found
            </h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to find what you&apos;re looking for.
            </p>
            <button
              onClick={() => {
                setSelectedAge("all");
                setSelectedBrand("all");
              }}
              className="inline-flex items-center px-6 py-3 bg-navy hover:bg-navy/90 text-white rounded-lg font-semibold transition-colors"
            >
              View All Products
            </button>
          </div>
        )}

        {/* Trust Banner */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                ),
                title: "Fast Delivery",
                description: "1-3 business days",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                ),
                title: "Secure Payment",
                description: "100% protected",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                    />
                  </svg>
                ),
                title: "Easy Returns",
                description: "Full refund available",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>
                ),
                title: "Expert Support",
                description: "Here to help",
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-14 h-14 bg-cs-orange/10 rounded-full flex items-center justify-center text-cs-orange mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-navy text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
