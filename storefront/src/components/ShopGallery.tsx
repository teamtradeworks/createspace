"use client";

import { useState, useMemo } from "react";
import { Product } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";

interface ShopGalleryProps {
  products: Product[];
  initialAge?: string;
}

const ageGroups = [
  { id: "all", label: "All Ages", range: null as [number, number] | null },
  { id: "3-5", label: "Ages 3-5", range: [3, 5] as [number, number] },
  { id: "6-8", label: "Ages 6-8", range: [6, 8] as [number, number] },
  { id: "9-12", label: "Ages 9-12", range: [9, 12] as [number, number] },
  { id: "13+", label: "Ages 13+", range: [13, 99] as [number, number] },
];

const disciplines = [
  { id: "all", label: "All" },
  { id: "robotics", label: "Robotics" },
  { id: "electronics", label: "Electronics" },
  { id: "nature", label: "Nature" },
  { id: "building", label: "Building" },
  { id: "mathematics", label: "Mathematics" },
];

export default function ShopGallery({ products, initialAge }: ShopGalleryProps) {
  const [selectedAge, setSelectedAge] = useState(initialAge || "all");
  const [selectedDiscipline, setSelectedDiscipline] = useState("all");
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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by age group
    if (selectedAge !== "all") {
      const ageGroup = ageGroups.find((g) => g.id === selectedAge);
      if (ageGroup?.range) {
        const [minRange, maxRange] = ageGroup.range;
        result = result.filter((product) => {
          const minAge = product.minAge?.value
            ? parseInt(product.minAge.value, 10)
            : null;
          if (minAge === null) return false;
          const maxAge = product.maxAge?.value
            ? parseInt(product.maxAge.value, 10)
            : null;
          const productMax = maxAge ?? Infinity;
          return minAge <= maxRange && productMax >= minRange;
        });
      }
    }

    // TODO: Filter by discipline when Shopify metafields are configured
    // if (selectedDiscipline !== "all") {
    //   result = result.filter((product) => product.discipline?.value === selectedDiscipline);
    // }

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
        break;
    }

    return result;
  }, [products, selectedAge, selectedDiscipline, selectedBrand, sortBy]);

  const hasActiveFilters =
    selectedAge !== "all" ||
    selectedDiscipline !== "all" ||
    selectedBrand !== "all";

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

          {/* Discipline Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">
              Discipline:
            </span>
            {disciplines.map((discipline) => (
              <button
                key={discipline.id}
                onClick={() => setSelectedDiscipline(discipline.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDiscipline === discipline.id
                    ? "bg-navy text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {discipline.label}
              </button>
            ))}
          </div>

          {/* Brand Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Brand:</span>
            <button
              onClick={() => setSelectedBrand("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedBrand === "all"
                  ? "bg-navy text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Brands
            </button>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedBrand === brand
                    ? "bg-navy text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Sort Row */}
          <div className="flex items-center justify-between">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedAge("all");
                  setSelectedDiscipline("all");
                  setSelectedBrand("all");
                }}
                className="inline-flex items-center px-6 py-3 bg-navy hover:bg-navy/90 text-white rounded-lg font-semibold transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Trust Banner */}
        <div className="mt-16">
          <TrustBadges />
        </div>
      </div>
    </section>
  );
}
