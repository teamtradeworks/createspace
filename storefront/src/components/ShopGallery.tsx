"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Product, getStockStatus } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";
import { capture } from "@/lib/analytics";
import { CATEGORIES } from "@/config/categories";

interface ShopGalleryProps {
  products: Product[];
  initialAge?: string;
  initialCategory?: string;
  initialBrand?: string;
  initialSort?: string;
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
  age: BRAND_COLORS.navy,
  category: BRAND_COLORS.red,
  brand: BRAND_COLORS.orange,
};

const ageGroups = [
  { id: "3-5", label: "3-5", range: [3, 5] as [number, number] },
  { id: "6-8", label: "6-8", range: [6, 8] as [number, number] },
  { id: "9-12", label: "9-12", range: [9, 12] as [number, number] },
  { id: "13+", label: "13+", range: [13, 99] as [number, number] },
];

// Category list comes from the shared config so the shop filter, homepage
// chips, and Shopify tags can't drift apart.
const categories = CATEGORIES;

export default function ShopGallery({
  products,
  initialAge,
  initialCategory,
  initialBrand,
  initialSort,
}: ShopGalleryProps) {
  const [selectedAges, setSelectedAges] = useState<string[]>(
    initialAge && initialAge !== "all" ? initialAge.split(",").filter(Boolean) : [],
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory && initialCategory !== "all"
      ? initialCategory.toLowerCase().split(",").filter(Boolean)
      : [],
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialBrand ? initialBrand.split(",").filter(Boolean) : [],
  );
  const [sortBy, setSortBy] = useState(initialSort || "featured");

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

    // Filter by age groups (union — product matches if it overlaps ANY selected age range)
    if (selectedAges.length > 0) {
      const selectedRanges = selectedAges
        .map((id) => ageGroups.find((g) => g.id === id)?.range)
        .filter((r): r is [number, number] => r !== undefined);

      if (selectedRanges.length > 0) {
        result = result.filter((product) => {
          const minAge = product.minAge?.value ? parseInt(product.minAge.value, 10) : null;
          if (minAge === null) return false;
          const maxAge = product.maxAge?.value ? parseInt(product.maxAge.value, 10) : null;
          const productMax = maxAge ?? Infinity;
          return selectedRanges.some(
            ([minRange, maxRange]) => minAge <= maxRange && productMax >= minRange,
          );
        });
      }
    }

    // Filter by categories (union — product matches if it has ANY selected category tag)
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.some((cat) => product.tags?.includes(`category:${cat}`)),
      );
    }

    // Filter by brands (union — product matches if its vendor is ANY selected brand)
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.some((b) => b.toLowerCase() === product.vendor.toLowerCase()),
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        result.sort(
          (a, b) =>
            parseFloat(a.priceRange.minVariantPrice.amount) -
            parseFloat(b.priceRange.minVariantPrice.amount),
        );
        break;
      case "price-high":
        result.sort(
          (a, b) =>
            parseFloat(b.priceRange.minVariantPrice.amount) -
            parseFloat(a.priceRange.minVariantPrice.amount),
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

    // Always push out-of-stock products to the end, regardless of sort
    result.sort((a, b) => {
      const aOut = getStockStatus(a) === "out-of-stock" ? 1 : 0;
      const bOut = getStockStatus(b) === "out-of-stock" ? 1 : 0;
      return aOut - bOut;
    });

    return result;
  }, [products, selectedAges, selectedCategories, selectedBrands, sortBy]);

  // Sync filter state to URL query parameters without triggering Next.js navigation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (selectedAges.length > 0) params.set("age", selectedAges.join(","));
    else params.delete("age");
    if (selectedCategories.length > 0) params.set("category", selectedCategories.join(","));
    else params.delete("category");
    if (selectedBrands.length > 0) params.set("brand", selectedBrands.join(","));
    else params.delete("brand");
    if (sortBy !== "featured") params.set("sort", sortBy);
    else params.delete("sort");

    const query = params.toString();
    const newUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  }, [selectedAges, selectedCategories, selectedBrands, sortBy]);

  const hasActiveFilters =
    selectedAges.length > 0 || selectedCategories.length > 0 || selectedBrands.length > 0;

  const clearFilters = () => {
    setSelectedAges([]);
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  const toggleAge = (id: string) => {
    const selected = !selectedAges.includes(id);
    capture("shop_filter_applied", { filter: "age", value: id, selected });
    setSelectedAges((prev) => (selected ? [...prev, id] : prev.filter((v) => v !== id)));
  };

  const toggleCategory = (id: string) => {
    const selected = !selectedCategories.includes(id);
    capture("shop_filter_applied", { filter: "category", value: id, selected });
    setSelectedCategories((prev) => (selected ? [...prev, id] : prev.filter((v) => v !== id)));
  };

  const toggleBrand = (brand: string) => {
    const selected = !selectedBrands.includes(brand);
    capture("shop_filter_applied", { filter: "brand", value: brand, selected });
    setSelectedBrands((prev) => (selected ? [...prev, brand] : prev.filter((v) => v !== brand)));
  };

  const handleSortChange = (value: string) => {
    capture("shop_filter_applied", { filter: "sort", value, selected: value !== "featured" });
    setSortBy(value);
  };

  return (
    <section className="pt-4 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile Filters */}
        <div className="sticky top-[100px] z-30 bg-gray-50 flex flex-col gap-2.5 mb-6 pb-3 pt-4 border-b-2 border-navy/10 sm:hidden">
          {/* Row 1: Age pills */}
          <AgePills selected={selectedAges} onToggle={toggleAge} color={TRACK_COLORS.age} stretch />
          {/* Row 2: Category, Brand dropdowns + Sort icon */}
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <MultiSelect
                label="Category"
                color={TRACK_COLORS.category}
                selected={selectedCategories}
                onToggle={toggleCategory}
                options={categories.map((c) => ({
                  value: c.id,
                  label: c.label,
                }))}
                placeholder="All"
              />
            </div>
            <div className="flex-1">
              <MultiSelect
                label="Brand"
                color={TRACK_COLORS.brand}
                selected={selectedBrands}
                onToggle={toggleBrand}
                options={brands.map((b) => ({ value: b, label: b }))}
                placeholder="All"
              />
            </div>
            <div className="shrink-0 self-end">
              <SortButton
                value={sortBy}
                onChange={handleSortChange}
                options={[
                  { value: "featured", label: "Featured" },
                  { value: "price-low", label: "Low → High" },
                  { value: "price-high", label: "High → Low" },
                  { value: "name-az", label: "A → Z" },
                  { value: "name-za", label: "Z → A" },
                ]}
              />
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                title="Clear Filters"
                className="shrink-0 self-end min-w-[44px] min-h-[44px] flex items-center justify-center text-navy/50 active:text-cs-red transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 4L12 12M12 4L4 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Desktop Filters */}
        <div className="sticky top-[100px] z-30 bg-gray-50 hidden sm:flex items-end gap-4 mb-10 pb-4 pt-4 border-b-2 border-navy/10">
          <AgePills
            selected={selectedAges}
            onToggle={toggleAge}
            color={TRACK_COLORS.age}
            size="lg"
          />
          <MultiSelect
            label="Category"
            color={TRACK_COLORS.category}
            selected={selectedCategories}
            onToggle={toggleCategory}
            options={categories.map((c) => ({
              value: c.id,
              label: c.label,
            }))}
            placeholder="All"
            size="lg"
          />
          <MultiSelect
            label="Brand"
            color={TRACK_COLORS.brand}
            selected={selectedBrands}
            onToggle={toggleBrand}
            options={brands.map((b) => ({ value: b, label: b }))}
            placeholder="All"
            size="lg"
          />
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              title="Clear Filters"
              className="shrink-0 self-end pb-3 p-1.5 text-navy/50 hover:text-cs-red transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 4L12 12M12 4L4 12" />
              </svg>
            </button>
          )}
          <div className="ml-auto">
            <SortButton
              value={sortBy}
              onChange={handleSortChange}
              options={[
                { value: "featured", label: "Featured" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
                { value: "name-az", label: "Name: A to Z" },
                { value: "name-za", label: "Name: Z to A" },
              ]}
              size="lg"
            />
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-navy/50 font-medium mb-6">
          Showing {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 min-[880px]:grid-cols-3 gap-3 min-[880px]:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 6} />
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
            <h2 className="text-xl font-medium text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to find what you&apos;re looking for.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
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

function AgePills({
  selected,
  onToggle,
  color,
  size = "default",
  stretch = false,
}: {
  selected: string[];
  onToggle: (id: string) => void;
  color: string;
  size?: "default" | "lg";
  stretch?: boolean;
}) {
  const isLg = size === "lg";
  return (
    <div className={stretch ? "" : "shrink-0"}>
      <span
        className={`block font-extrabold uppercase tracking-widest mb-1 text-xs`}
        style={{ color }}
      >
        Age Groups
      </span>
      <div className="flex gap-1.5">
        {ageGroups.map((group) => {
          const isSelected = selected.includes(group.id);
          return (
            <button
              key={group.id}
              onClick={() => onToggle(group.id)}
              className={`rounded-lg font-bold transition-all duration-150 active:scale-95 text-center ${stretch ? "flex-1" : ""} ${isLg ? "px-6 py-3 text-sm min-w-[90px]" : "px-3 py-3.5 text-xs"}`}
              style={{
                border: `2px solid ${color}`,
                backgroundColor: isSelected ? color : "transparent",
                color: isSelected ? "#fff" : color,
              }}
            >
              {group.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MultiSelect({
  label,
  color,
  selected,
  onToggle,
  options,
  placeholder,
  size = "default",
}: {
  label: string;
  color: string;
  selected: string[];
  onToggle: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  size?: "default" | "lg";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLg = size === "lg";

  // Close on outside click
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, handleClickOutside]);

  // Close on escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Build display label
  const displayLabel =
    selected.length === 0
      ? placeholder
      : selected.length <= 2
        ? selected.map((v) => options.find((o) => o.value === v)?.label ?? v).join(", ")
        : `${selected.length} selected`;

  return (
    <div className="relative" ref={containerRef}>
      <span
        className={`block font-extrabold uppercase tracking-widest mb-1 text-xs`}
        style={{ color }}
      >
        {label}
      </span>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative w-full text-left appearance-none rounded-xl bg-white font-semibold text-navy transition-all focus:outline-none focus:ring-2 ${isLg ? "pl-4 pr-10 py-3 text-sm" : "pl-3 pr-8 py-3 text-sm"}`}
        style={{
          borderWidth: 2,
          borderStyle: "solid",
          borderTopColor: isOpen ? color : `${color}35`,
          borderRightColor: isOpen ? color : `${color}35`,
          borderBottomColor: isOpen ? color : `${color}35`,
          borderLeftWidth: 4,
          borderLeftColor: color,
          // @ts-expect-error -- CSS custom property for focus ring
          "--tw-ring-color": `${color}30`,
        }}
      >
        <span className={selected.length === 0 ? "text-navy/40" : ""}>{displayLabel}</span>
        <svg
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 transition-transform ${isOpen ? "rotate-180" : ""} ${isLg ? "right-3.5" : "right-2.5"}`}
          style={{ marginTop: isLg ? 12 : 10 }}
          width={isLg ? 14 : 12}
          height={isLg ? 14 : 12}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute z-40 left-0 min-w-[200px] mt-1 bg-white rounded-xl border-2 shadow-lg overflow-hidden"
          style={{ borderColor: `${color}30` }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="max-h-60 overflow-y-auto py-1">
            {options.map((opt) => {
              const isChecked = selected.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onToggle(opt.value)}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gray-50 active:bg-gray-100"
                >
                  <span
                    className="shrink-0 flex items-center justify-center rounded border-2 transition-all"
                    style={{
                      width: 18,
                      height: 18,
                      borderColor: isChecked ? color : `${color}40`,
                      backgroundColor: isChecked ? color : "transparent",
                    }}
                  >
                    {isChecked && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5.5L4 7.5L8 3"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function SortButton({
  value,
  onChange,
  options,
  size = "default",
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  size?: "default" | "lg";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLg = size === "lg";

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const currentLabel = options.find((o) => o.value === value)?.label ?? "Sort";

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        title={`Sort: ${currentLabel}`}
        className={`flex items-center gap-1.5 rounded-xl bg-white font-semibold text-navy border-2 transition-all focus:outline-none focus:ring-2 focus:ring-navy/20 ${isOpen ? "border-navy" : "border-navy/20"} ${isLg ? "px-3 py-3 text-sm" : "px-2.5 py-3 text-sm"}`}
      >
        {/* Sort icon: 3 horizontal lines of decreasing width */}
        <svg
          width={isLg ? 18 : 16}
          height={isLg ? 18 : 16}
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M3 5h12" />
          <path d="M3 9h8" />
          <path d="M3 13h4" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-40 right-0 min-w-[180px] mt-1 bg-white rounded-xl border-2 border-navy/15 shadow-lg overflow-hidden">
          <div className="py-1">
            {options.map((opt) => {
              const isActive = value === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${isActive ? "bg-navy/5 text-navy font-bold" : "text-navy/70 hover:bg-gray-50"}`}
                >
                  {isActive && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 7l3.5 3.5L12 4" />
                    </svg>
                  )}
                  <span className={isActive ? "" : "ml-[22px]"}>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
