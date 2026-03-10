"use client";

import { useState, useMemo, useRef } from "react";
import { Product } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";

interface ShopGalleryProps {
  products: Product[];
  initialAge?: string;
  initialCategory?: string;
}

const BRAND_COLORS = {
  navy: "#0C1446",
  red: "#F70B28",
  blue: "#3CC7F7",
  purple: "#AC4DFF",
  orange: "#FF8B00",
  green: "#93DB21",
  yellow: "#FFD500",
};

const TRACK_COLORS = {
  age: BRAND_COLORS.blue,
  discipline: BRAND_COLORS.red,
  brand: BRAND_COLORS.orange,
};

const ageGroups = [
  { id: "all", label: "All Ages", range: null as [number, number] | null },
  { id: "3-5", label: "3-5", range: [3, 5] as [number, number] },
  { id: "6-8", label: "6-8", range: [6, 8] as [number, number] },
  { id: "9-12", label: "9-12", range: [9, 12] as [number, number] },
  { id: "13+", label: "13+", range: [13, 99] as [number, number] },
];

const categories = [
  { id: "all", label: "All" },
  { id: "robotics", label: "Robotics" },
  { id: "electricity", label: "Electricity" },
  { id: "building-mechanics", label: "Building & Mechanics" },
  { id: "earth-sciences", label: "Earth Sciences" },
  { id: "astronomy", label: "Astronomy" },
];

export default function ShopGallery({ products, initialAge, initialCategory }: ShopGalleryProps) {
  const [selectedAge, setSelectedAge] = useState(initialAge || "all");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "all");
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

    // Filter by category (using Shopify tags with "category:" prefix)
    if (selectedCategory !== "all") {
      result = result.filter((product) =>
        product.tags?.includes(`category:${selectedCategory}`)
      );
    }

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
  }, [products, selectedAge, selectedCategory, selectedBrand, sortBy]);

  const hasActiveFilters =
    selectedAge !== "all" ||
    selectedCategory !== "all" ||
    selectedBrand !== "all";

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile Filter Dropdowns */}
        <div className="flex flex-col gap-4 mb-8 pb-6 border-b-2 border-navy/10 sm:hidden">
          <FilterDropdown
            label="Age"
            color={TRACK_COLORS.age}
            value={selectedAge}
            onChange={setSelectedAge}
            options={ageGroups.map((g) => ({ value: g.id, label: g.label }))}
          />
          <FilterDropdown
            label="Category"
            color={TRACK_COLORS.discipline}
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categories.map((c) => ({ value: c.id, label: c.label }))}
          />
          <FilterDropdown
            label="Brand"
            color={TRACK_COLORS.brand}
            value={selectedBrand}
            onChange={setSelectedBrand}
            options={[
              { value: "all", label: "All Brands" },
              ...brands.map((b) => ({ value: b, label: b })),
            ]}
          />
          <div className="flex items-center justify-between">
            <FilterDropdown
              label="Sort"
              color={BRAND_COLORS.navy}
              value={sortBy}
              onChange={setSortBy}
              options={[
                { value: "featured", label: "Featured" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
                { value: "name-az", label: "Name: A to Z" },
                { value: "name-za", label: "Name: Z to A" },
              ]}
            />
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedAge("all");
                  setSelectedCategory("all");
                  setSelectedBrand("all");
                }}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wide text-navy/50 hover:text-cs-red border-2 border-navy/10 hover:border-cs-red/30 rounded-xl transition-all"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Desktop Game-Style Filter Tokens */}
        <div className="hidden sm:flex flex-col gap-6 mb-10 pb-8 border-b-2 border-navy/10">
          {/* Age Group Track */}
          <FilterTrack label="Age" color={TRACK_COLORS.age}>
            {ageGroups.map((group) => (
              <FilterToken
                key={group.id}
                label={group.label}
                color={TRACK_COLORS.age}
                isSelected={selectedAge === group.id}
                onClick={() => setSelectedAge(group.id)}
              />
            ))}
          </FilterTrack>

          {/* Discipline Track */}
          <FilterTrack label="Category" color={TRACK_COLORS.discipline}>
            {categories.map((category) => (
              <FilterToken
                key={category.id}
                label={category.label}
                color={TRACK_COLORS.discipline}
                isSelected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </FilterTrack>

          {/* Brand Track */}
          <FilterTrack label="Brand" color={TRACK_COLORS.brand}>
            <FilterToken
              label="All Brands"
              color={TRACK_COLORS.brand}
              isSelected={selectedBrand === "all"}
              onClick={() => setSelectedBrand("all")}
            />
            {brands.map((brand) => (
              <FilterToken
                key={brand}
                label={brand}
                color={TRACK_COLORS.brand}
                isSelected={selectedBrand === brand}
                onClick={() => setSelectedBrand(brand)}
              />
            ))}
          </FilterTrack>

          {/* Sort Control */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-navy/50">
                Sort
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border-2 border-navy/20 rounded-xl text-sm font-semibold bg-white text-navy focus:outline-none focus:border-cs-orange focus:ring-2 focus:ring-cs-orange/30 transition-all"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-az">Name: A to Z</option>
                <option value="name-za">Name: Z to A</option>
              </select>
            </div>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedAge("all");
                  setSelectedCategory("all");
                  setSelectedBrand("all");
                }}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wide text-navy/50 hover:text-cs-red border-2 border-navy/10 hover:border-cs-red/30 rounded-xl transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-navy/50 font-medium mb-6">
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
                  setSelectedCategory("all");
                  setSelectedBrand("all");
                }}
                className="inline-flex items-center px-6 py-3 bg-navy hover:bg-navy/90 text-white rounded-xl font-semibold transition-colors"
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

/* ── Sub-components ─────────────────────────────────────── */

function FilterTrack({
  label,
  color,
  children,
}: {
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="text-sm font-extrabold uppercase tracking-widest"
        style={{ color: `${color}90` }}
      >
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {children}
      </div>
    </div>
  );
}

function FilterToken({
  label,
  color,
  isSelected,
  onClick,
}: {
  label: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    onClick();
    btnRef.current?.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.35)" },
        { transform: "scale(0.9)" },
        { transform: "scale(1.05)" },
      ],
      { duration: 400, easing: "ease-out" }
    );
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={`
        relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-sm font-bold tracking-wide
        border-2 transition-all duration-200 cursor-pointer select-none
        ${isSelected ? "text-white" : "hover:scale-105"}
      `}
      style={{
        borderColor: isSelected ? color : `${color}40`,
        backgroundColor: isSelected ? color : `${color}12`,
        color: isSelected ? "#fff" : color,
        boxShadow: isSelected
          ? `0 0 20px ${color}50, 0 4px 14px ${color}25`
          : "none",
        transform: isSelected ? "scale(1.05)" : undefined,
      }}
    >
      {label}
    </button>
  );
}

function FilterDropdown({
  label,
  color,
  value,
  onChange,
  options,
}: {
  label: string;
  color: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="text-sm font-extrabold uppercase tracking-widest"
        style={{ color: `${color}90` }}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold bg-white transition-all focus:outline-none focus:ring-2"
        style={{
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: `${color}40`,
          color: color,
          // @ts-expect-error -- CSS custom property for focus ring
          "--tw-ring-color": `${color}30`,
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
