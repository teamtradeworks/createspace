"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Product, getStockStatus } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";
import { capture } from "@/lib/analytics";
import { CATEGORIES } from "@/config/categories";
import { BRANDS } from "@/config/brands";

interface ShopGalleryProps {
  products: Product[];
  initialAge?: string;
  initialCategory?: string;
  initialBrand?: string;
  initialPrice?: string;
  initialSort?: string;
}

const ageGroups = [
  { id: "3-5", label: "Ages 3-5", range: [3, 5] as [number, number] },
  { id: "6-8", label: "Ages 6-8", range: [6, 8] as [number, number] },
  { id: "9-12", label: "Ages 9-12", range: [9, 12] as [number, number] },
  { id: "13+", label: "Ages 13+", range: [13, 99] as [number, number] },
];

// Price bands in ZAR. `max` is exclusive; the last band is open-ended.
const priceBands = [
  { id: "0-500", label: "Under R500", min: 0, max: 500 },
  { id: "500-1000", label: "R500 to R1,000", min: 500, max: 1000 },
  { id: "1000-2000", label: "R1,000 to R2,000", min: 1000, max: 2000 },
  { id: "2000+", label: "Over R2,000", min: 2000, max: Infinity },
];

const sortOptions = [
  { value: "featured", label: "Most loved" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "name-az", label: "Name: A to Z" },
  { value: "name-za", label: "Name: Z to A" },
];

const productPrice = (p: Product) => parseFloat(p.priceRange.minVariantPrice.amount);

/* Per-axis matchers. An empty selection means "no constraint" (match all). */
function matchAge(p: Product, ages: string[]): boolean {
  if (ages.length === 0) return true;
  const minAge = p.minAge?.value ? parseInt(p.minAge.value, 10) : null;
  if (minAge === null) return false;
  const productMax = p.maxAge?.value ? parseInt(p.maxAge.value, 10) : Infinity;
  return ages.some((id) => {
    const g = ageGroups.find((a) => a.id === id);
    return g ? minAge <= g.range[1] && productMax >= g.range[0] : false;
  });
}

function matchCategory(p: Product, cats: string[]): boolean {
  if (cats.length === 0) return true;
  return cats.some((c) => p.tags?.includes(`category:${c}`));
}

function matchBrand(p: Product, brands: string[]): boolean {
  if (brands.length === 0) return true;
  return brands.some((b) => b.toLowerCase() === p.vendor.toLowerCase());
}

function matchPrice(p: Product, bands: string[]): boolean {
  if (bands.length === 0) return true;
  const price = productPrice(p);
  return bands.some((id) => {
    const b = priceBands.find((band) => band.id === id);
    return b ? price >= b.min && price < b.max : false;
  });
}

type Axis = "age" | "category" | "brand" | "price";

export default function ShopGallery({
  products,
  initialAge,
  initialCategory,
  initialBrand,
  initialPrice,
  initialSort,
}: ShopGalleryProps) {
  const parseParam = (v?: string) =>
    v && v !== "all" ? v.split(",").filter(Boolean) : [];

  const [selectedAges, setSelectedAges] = useState<string[]>(parseParam(initialAge));
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    parseParam(initialCategory?.toLowerCase()),
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(parseParam(initialBrand));
  const [selectedPrices, setSelectedPrices] = useState<string[]>(parseParam(initialPrice));
  const [sortBy, setSortBy] = useState(initialSort || "featured");
  const [sheetOpen, setSheetOpen] = useState(false);

  const selectionByAxis: Record<Axis, string[]> = {
    age: selectedAges,
    category: selectedCategories,
    brand: selectedBrands,
    price: selectedPrices,
  };

  // Brands present in the catalogue, in canonical order, labelled from config.
  const brandFacets = useMemo(() => {
    const present = new Set(products.map((p) => p.vendor));
    const known = BRANDS.filter((b) => present.has(b.vendor)).map((b) => ({
      value: b.vendor,
      label: b.name,
    }));
    // Any vendor not in the canonical list still gets a chip.
    const extra = [...present]
      .filter((v) => !BRANDS.some((b) => b.vendor === v))
      .sort()
      .map((v) => ({ value: v, label: v }));
    return [...known, ...extra];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const result = products.filter(
      (p) =>
        matchAge(p, selectedAges) &&
        matchCategory(p, selectedCategories) &&
        matchBrand(p, selectedBrands) &&
        matchPrice(p, selectedPrices),
    );

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => productPrice(a) - productPrice(b));
        break;
      case "price-high":
        result.sort((a, b) => productPrice(b) - productPrice(a));
        break;
      case "name-az":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-za":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break; // "featured" keeps the fetched (best-selling) order
    }

    // Out-of-stock always sinks to the end, whatever the sort.
    result.sort((a, b) => {
      const aOut = getStockStatus(a) === "out-of-stock" ? 1 : 0;
      const bOut = getStockStatus(b) === "out-of-stock" ? 1 : 0;
      return aOut - bOut;
    });
    return result;
  }, [products, selectedAges, selectedCategories, selectedBrands, selectedPrices, sortBy]);

  // Faceted count: how many products a value would yield given the OTHER active
  // axes. Counting an axis ignores its own current selection.
  const facetCount = (axis: Axis, value: string): number =>
    products.filter(
      (p) =>
        (axis === "age" || matchAge(p, selectedAges)) &&
        (axis === "category" || matchCategory(p, selectedCategories)) &&
        (axis === "brand" || matchBrand(p, selectedBrands)) &&
        (axis === "price" || matchPrice(p, selectedPrices)) &&
        (axis === "age"
          ? matchAge(p, [value])
          : axis === "category"
            ? matchCategory(p, [value])
            : axis === "brand"
              ? matchBrand(p, [value])
              : matchPrice(p, [value])),
    ).length;

  // Sync filter state to the URL without triggering a navigation.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const set = (key: string, vals: string[]) =>
      vals.length > 0 ? params.set(key, vals.join(",")) : params.delete(key);
    set("age", selectedAges);
    set("category", selectedCategories);
    set("brand", selectedBrands);
    set("price", selectedPrices);
    if (sortBy !== "featured") params.set("sort", sortBy);
    else params.delete("sort");
    const query = params.toString();
    window.history.replaceState(null, "", query ? `${window.location.pathname}?${query}` : window.location.pathname);
  }, [selectedAges, selectedCategories, selectedBrands, selectedPrices, sortBy]);

  // Lock body scroll while the mobile filter sheet is open.
  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  const setterByAxis: Record<Axis, React.Dispatch<React.SetStateAction<string[]>>> = {
    age: setSelectedAges,
    category: setSelectedCategories,
    brand: setSelectedBrands,
    price: setSelectedPrices,
  };

  const toggle = (axis: Axis, value: string) => {
    const selected = !selectionByAxis[axis].includes(value);
    capture("shop_filter_applied", { filter: axis, value, selected });
    setterByAxis[axis]((prev) =>
      selected ? [...prev, value] : prev.filter((v) => v !== value),
    );
  };

  const handleSortChange = (value: string) => {
    capture("shop_filter_applied", { filter: "sort", value, selected: value !== "featured" });
    setSortBy(value);
  };

  const activeCount =
    selectedAges.length + selectedCategories.length + selectedBrands.length + selectedPrices.length;
  const hasActiveFilters = activeCount > 0;

  const clearFilters = () => {
    setSelectedAges([]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPrices([]);
  };

  // Flat list of active selections for the removable-chip row.
  const labelFor = (axis: Axis, value: string): string => {
    if (axis === "age") return ageGroups.find((g) => g.id === value)?.label ?? value;
    if (axis === "category") return CATEGORIES.find((c) => c.id === value)?.label ?? value;
    if (axis === "price") return priceBands.find((b) => b.id === value)?.label ?? value;
    return brandFacets.find((b) => b.value === value)?.label ?? value;
  };
  const activeChips: { axis: Axis; value: string }[] = [
    ...selectedAges.map((v) => ({ axis: "age" as const, value: v })),
    ...selectedCategories.map((v) => ({ axis: "category" as const, value: v })),
    ...selectedPrices.map((v) => ({ axis: "price" as const, value: v })),
    ...selectedBrands.map((v) => ({ axis: "brand" as const, value: v })),
  ];

  const filterGroups = (
    <>
      <FilterGroup
        title="Age"
        axis="age"
        options={ageGroups.map((g) => ({ value: g.id, label: g.label }))}
        selected={selectedAges}
        facetCount={facetCount}
        onToggle={toggle}
      />
      <FilterGroup
        title="Category"
        axis="category"
        options={CATEGORIES.map((c) => ({ value: c.id, label: c.label, icon: c.icon }))}
        selected={selectedCategories}
        facetCount={facetCount}
        onToggle={toggle}
      />
      <FilterGroup
        title="Price"
        axis="price"
        options={priceBands.map((b) => ({ value: b.id, label: b.label }))}
        selected={selectedPrices}
        facetCount={facetCount}
        onToggle={toggle}
      />
      <FilterGroup
        title="Brand"
        axis="brand"
        options={brandFacets}
        selected={selectedBrands}
        facetCount={facetCount}
        onToggle={toggle}
      />
    </>
  );

  return (
    <section className="pt-4 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile / tablet control bar */}
        <div className="lg:hidden sticky top-[92px] z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-gray-50 border-b-2 border-navy/10 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-navy/20 bg-white px-4 py-2.5 text-sm font-semibold text-navy active:scale-95 transition-transform"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 4h14M4 9h10M7 14h4" />
            </svg>
            Filters
            {activeCount > 0 && (
              <span className="ml-0.5 inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-cs-orange text-white text-xs font-bold">
                {activeCount}
              </span>
            )}
          </button>
          <div className="ml-auto">
            <SortMenu value={sortBy} onChange={handleSortChange} options={sortOptions} />
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[248px_1fr] lg:gap-10 lg:mt-6">
          {/* Desktop filter rail */}
          <aside className="hidden lg:block">
            <div className="sticky top-[104px] max-h-[calc(100vh-124px)] overflow-y-auto pr-2 pb-6 scrollbar-thin">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-navy">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm font-medium text-navy/50 hover:text-cs-red transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>
              {filterGroups}
            </div>
          </aside>

          {/* Results column */}
          <div>
            {/* Desktop top bar: count + sort */}
            <div className="hidden lg:flex items-center justify-between mb-5">
              <p className="text-sm text-navy/60 font-medium">
                Showing <span className="text-navy font-semibold">{filteredProducts.length}</span> of{" "}
                {products.length} products
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-navy/50">Sort</span>
                <SortMenu value={sortBy} onChange={handleSortChange} options={sortOptions} />
              </div>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {activeChips.map(({ axis, value }) => (
                  <button
                    key={`${axis}:${value}`}
                    type="button"
                    onClick={() => toggle(axis, value)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 hover:bg-navy/10 pl-3 pr-2 py-1.5 text-sm font-medium text-navy transition-colors"
                  >
                    {labelFor(axis, value)}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 3l6 6M9 3l-6 6" />
                    </svg>
                  </button>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-navy/50 hover:text-cs-red transition-colors ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Mobile result count */}
            <p className="lg:hidden text-sm text-navy/60 font-medium mb-4 mt-4">
              Showing <span className="text-navy font-semibold">{filteredProducts.length}</span> of{" "}
              {products.length} products
            </p>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} priority={index < 6} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h2 className="text-xl font-medium text-gray-900 mb-2">No products match those filters</h2>
                <p className="text-gray-600 mb-6">Try removing a filter to see more.</p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-6 py-3 bg-navy hover:bg-navy/90 text-white rounded-xl font-semibold transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16">
          <TrustBadges />
        </div>
      </div>

      {/* Mobile filter sheet */}
      {sheetOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-navy/40"
            onClick={() => setSheetOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm bg-white shadow-xl flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-navy">Filters</h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close filters"
                className="p-1.5 text-navy/60 hover:text-navy"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">{filterGroups}</div>
            <div className="border-t border-gray-100 px-5 py-4 flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-navy/50 hover:text-cs-red transition-colors"
                >
                  Clear all
                </button>
              )}
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="ml-auto flex-1 inline-flex items-center justify-center px-6 py-3 bg-navy hover:bg-navy/90 text-white rounded-xl font-semibold transition-colors"
              >
                Show {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

type FacetOption = { value: string; label: string; icon?: string };

function FilterGroup({
  title,
  axis,
  options,
  selected,
  facetCount,
  onToggle,
}: {
  title: string;
  axis: Axis;
  options: FacetOption[];
  selected: string[];
  facetCount: (axis: Axis, value: string) => number;
  onToggle: (axis: Axis, value: string) => void;
}) {
  return (
    <div className="mb-7">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          const count = facetCount(axis, opt.value);
          const disabled = count === 0 && !isSelected;
          return (
            <button
              key={opt.value}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              onClick={() => onToggle(axis, opt.value)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
                isSelected
                  ? "border-navy bg-navy text-white"
                  : disabled
                    ? "border-gray-100 text-gray-300 cursor-not-allowed"
                    : "border-gray-200 text-navy hover:border-navy/40 active:scale-95"
              }`}
            >
              {opt.icon && (
                <Image
                  src={opt.icon}
                  alt=""
                  width={16}
                  height={16}
                  className={isSelected ? "brightness-0 invert" : ""}
                />
              )}
              {opt.label}
              <span className={isSelected ? "text-white/60" : "text-navy/35"}>{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SortMenu({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const currentLabel = options.find((o) => o.value === value)?.label ?? "Sort";

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative z-40 flex items-center gap-2 rounded-xl bg-white font-semibold text-navy border-2 px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-navy/20 ${
          isOpen ? "border-navy" : "border-navy/20"
        }`}
      >
        {currentLabel}
        <svg
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-40 right-0 min-w-[190px] mt-1 bg-white rounded-xl border-2 border-navy/15 shadow-lg overflow-hidden">
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
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                    isActive ? "bg-navy/5 text-navy font-bold" : "text-navy/70 hover:bg-gray-50"
                  }`}
                >
                  {isActive ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 7l3.5 3.5L12 4" />
                    </svg>
                  ) : (
                    <span className="w-[14px]" />
                  )}
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
