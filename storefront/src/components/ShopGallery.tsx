"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { Product, getStockStatus } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import { capture } from "@/lib/analytics";
import { CATEGORIES, categoryMatchTags } from "@/config/categories";
import { BRANDS } from "@/config/brands";

interface ShopGalleryProps {
  products: Product[];
  initialAge?: string;
  initialCategory?: string;
  initialBrand?: string;
  initialSort?: string;
}

// Age bands carry the site-wide age colours (matching the homepage cards and
// product badges). `darkText` flags the lighter fills that need navy text.
const ageGroups = [
  { id: "3-5", label: "Ages 3-5", range: [3, 5] as [number, number], color: "#F70B28", darkText: false },
  { id: "6-8", label: "Ages 6-8", range: [6, 8] as [number, number], color: "#93DB21", darkText: true },
  { id: "9-12", label: "Ages 9-12", range: [9, 12] as [number, number], color: "#3CC7F7", darkText: true },
  { id: "13+", label: "Ages 13+", range: [13, 99] as [number, number], color: "#AC4DFF", darkText: false },
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
  return cats.some((c) => categoryMatchTags(c).some((t) => p.tags?.includes(`category:${t}`)));
}

function matchBrand(p: Product, brands: string[]): boolean {
  if (brands.length === 0) return true;
  return brands.some((b) => b.toLowerCase() === p.vendor.toLowerCase());
}

type Axis = "age" | "category" | "brand";

export default function ShopGallery({
  products,
  initialAge,
  initialCategory,
  initialBrand,
  initialSort,
}: ShopGalleryProps) {
  const parseParam = (v?: string) => (v && v !== "all" ? v.split(",").filter(Boolean) : []);

  const [selectedAges, setSelectedAges] = useState<string[]>(parseParam(initialAge));
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    parseParam(initialCategory?.toLowerCase()),
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(parseParam(initialBrand));
  const [sortBy, setSortBy] = useState(initialSort || "featured");
  const [sheetOpen, setSheetOpen] = useState(false);

  const selectionByAxis: Record<Axis, string[]> = {
    age: selectedAges,
    category: selectedCategories,
    brand: selectedBrands,
  };

  // Brands present in the catalogue, in canonical order, labelled and badged
  // from config.
  const brandFacets = useMemo(() => {
    const present = new Set(products.map((p) => p.vendor));
    const known = BRANDS.filter((b) => present.has(b.vendor)).map((b) => ({
      value: b.vendor,
      label: b.name,
      icon: b.logo,
    }));
    // Any vendor not in the canonical list still gets a chip (no logo).
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
        matchBrand(p, selectedBrands),
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
  }, [products, selectedAges, selectedCategories, selectedBrands, sortBy]);

  // How many products a value would yield given the OTHER active axes. Used to
  // disable options that would lead to an empty grid (the number isn't shown).
  const facetCount = (axis: Axis, value: string): number =>
    products.filter(
      (p) =>
        (axis === "age" || matchAge(p, selectedAges)) &&
        (axis === "category" || matchCategory(p, selectedCategories)) &&
        (axis === "brand" || matchBrand(p, selectedBrands)) &&
        (axis === "age"
          ? matchAge(p, [value])
          : axis === "category"
            ? matchCategory(p, [value])
            : matchBrand(p, [value])),
    ).length;

  // Sync filter state to the URL without triggering a navigation.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const set = (key: string, vals: string[]) =>
      vals.length > 0 ? params.set(key, vals.join(",")) : params.delete(key);
    set("age", selectedAges);
    set("category", selectedCategories);
    set("brand", selectedBrands);
    if (sortBy !== "featured") params.set("sort", sortBy);
    else params.delete("sort");
    const query = params.toString();
    window.history.replaceState(null, "", query ? `${window.location.pathname}?${query}` : window.location.pathname);
  }, [selectedAges, selectedCategories, selectedBrands, sortBy]);

  // Lock body scroll while the mobile filter sheet is open.
  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  // Keep the results in view when filters change. Scroll the results column to
  // just under the sticky chrome (its scroll-margin-top). `force` always scrolls
  // (mobile "apply"); otherwise only rescue the user when they've scrolled past
  // the results top, so rapid desktop toggling isn't jumpy.
  const resultsTopRef = useRef<HTMLDivElement>(null);
  const didMountRef = useRef(false);
  const pendingSheetScrollRef = useRef(false);

  const scrollToResults = (force: boolean) => {
    const el = resultsTopRef.current;
    if (!el) return;
    const stickyOffset = window.innerWidth < 1024 ? 160 : 104;
    if (!force && el.getBoundingClientRect().top >= stickyOffset) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  // Conditional scroll when filters change outside the mobile sheet.
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (sheetOpen) return;
    scrollToResults(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAges, selectedCategories, selectedBrands]);

  // Always scroll to the results after the mobile sheet is applied.
  useEffect(() => {
    if (sheetOpen || !pendingSheetScrollRef.current) return;
    pendingSheetScrollRef.current = false;
    scrollToResults(true);
  }, [sheetOpen]);

  const setterByAxis: Record<Axis, React.Dispatch<React.SetStateAction<string[]>>> = {
    age: setSelectedAges,
    category: setSelectedCategories,
    brand: setSelectedBrands,
  };

  const toggle = (axis: Axis, value: string) => {
    const selected = !selectionByAxis[axis].includes(value);
    capture("shop_filter_applied", { filter: axis, value, selected });
    setterByAxis[axis]((prev) => (selected ? [...prev, value] : prev.filter((v) => v !== value)));
  };

  const handleSortChange = (value: string) => {
    capture("shop_filter_applied", { filter: "sort", value, selected: value !== "featured" });
    setSortBy(value);
  };

  const activeCount = selectedAges.length + selectedCategories.length + selectedBrands.length;
  const hasActiveFilters = activeCount > 0;

  const clearFilters = () => {
    setSelectedAges([]);
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  // Flat list of active selections for the removable-chip row.
  const labelFor = (axis: Axis, value: string): string => {
    if (axis === "age") return ageGroups.find((g) => g.id === value)?.label ?? value;
    if (axis === "category") return CATEGORIES.find((c) => c.id === value)?.label ?? value;
    return brandFacets.find((b) => b.value === value)?.label ?? value;
  };
  const activeChips: { axis: Axis; value: string }[] = [
    ...selectedAges.map((v) => ({ axis: "age" as const, value: v })),
    ...selectedCategories.map((v) => ({ axis: "category" as const, value: v })),
    ...selectedBrands.map((v) => ({ axis: "brand" as const, value: v })),
  ];

  const filterGroups = (
    <>
      <FilterGroup
        title="Age"
        axis="age"
        options={ageGroups.map((g) => ({
          value: g.id,
          label: g.label,
          color: g.color,
          darkText: g.darkText,
        }))}
        selected={selectedAges}
        facetCount={facetCount}
        onToggle={toggle}
        selectStyle="accent"
      />
      <FilterGroup
        title="Category"
        axis="category"
        options={CATEGORIES.map((c) => ({ value: c.id, label: c.label, icon: c.illustration }))}
        selected={selectedCategories}
        facetCount={facetCount}
        onToggle={toggle}
        iconVariant="illustration"
      />
      <FilterGroup
        title="Brand"
        axis="brand"
        options={brandFacets}
        selected={selectedBrands}
        facetCount={facetCount}
        onToggle={toggle}
        iconVariant="logo"
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
            <div className="sticky top-[104px] max-h-[calc(100vh-124px)] overflow-y-auto bg-white rounded-2xl ring-1 ring-gray-200/70 shadow-sm p-5 scrollbar-thin">
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
            {/* Scroll anchor: sits under the sticky header/control bar */}
            <div ref={resultsTopRef} className="scroll-mt-[160px] lg:scroll-mt-[104px]" aria-hidden="true" />

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
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index < 6}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 max-w-md mx-auto">
                <div className="relative w-28 h-28 mx-auto mb-6">
                  <Image
                    src="/images/illustrations/robot-orange.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <h2 className="text-xl font-semibold text-navy mb-2">No kits match those filters</h2>
                <p className="text-gray-600 mb-6">
                  Nothing matched this combination. Try removing a filter to widen your search.
                </p>
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
                onClick={() => {
                  pendingSheetScrollRef.current = true;
                  setSheetOpen(false);
                }}
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

type FacetOption = {
  value: string;
  label: string;
  icon?: string;
  color?: string;
  darkText?: boolean;
};

const NAVY = "#0C1446";

function FilterGroup({
  title,
  axis,
  options,
  selected,
  facetCount,
  onToggle,
  iconVariant = "illustration",
  selectStyle = "navy",
}: {
  title: string;
  axis: Axis;
  options: FacetOption[];
  selected: string[];
  facetCount: (axis: Axis, value: string) => number;
  onToggle: (axis: Axis, value: string) => void;
  iconVariant?: "logo" | "illustration";
  selectStyle?: "navy" | "accent";
}) {
  return (
    <div className="mb-7">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          const disabled = facetCount(axis, opt.value) === 0 && !isSelected;
          const accent = selectStyle === "accent" && opt.color;

          // Colour is applied via inline style (runtime hex); Tailwind handles
          // the rest. Accent chips fill with their own colour when selected and
          // carry a coloured border when idle.
          let style: React.CSSProperties | undefined;
          let stateClass: string;
          if (disabled) {
            stateClass = "border-gray-100 text-gray-300 cursor-not-allowed";
          } else if (isSelected && accent) {
            style = { backgroundColor: opt.color, borderColor: opt.color, color: opt.darkText ? NAVY : "#fff" };
            stateClass = "shadow-sm active:scale-95";
          } else if (isSelected) {
            stateClass = "border-navy bg-navy text-white shadow-sm active:scale-95";
          } else if (accent) {
            style = { borderColor: opt.color, color: NAVY };
            stateClass = "bg-white hover:shadow-sm active:scale-95";
          } else {
            stateClass = "bg-white border-gray-200 text-navy hover:border-navy/40 active:scale-95";
          }

          return (
            <button
              key={opt.value}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              onClick={() => onToggle(axis, opt.value)}
              style={style}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border-2 px-3 py-2 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${stateClass}`}
            >
              {/* Brand wordmark only (no text label — the logo is the name).
                  Kept on white so it stays legible on the navy selected chip. */}
              {opt.icon && iconVariant === "logo" && (
                <span className={`inline-flex items-center justify-center rounded px-1.5 py-1 ${isSelected ? "bg-white" : ""}`}>
                  <Image
                    src={opt.icon}
                    alt={opt.label}
                    width={104}
                    height={28}
                    className="h-5 w-auto max-w-[92px] object-contain"
                  />
                </span>
              )}
              {/* Category brand illustration on its own circle so it stays
                  legible on both the white (idle) and navy (selected) chip. */}
              {opt.icon && iconVariant === "illustration" && (
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                    isSelected ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <Image
                    src={opt.icon}
                    alt=""
                    width={26}
                    height={26}
                    unoptimized
                    className="h-6 w-6 object-contain"
                  />
                </span>
              )}
              {iconVariant !== "logo" && opt.label}
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
