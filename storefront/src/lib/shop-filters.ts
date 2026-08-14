import { Product, getStockStatus } from "@/lib/shopify";
import { categoryMatchTags } from "@/config/categories";

// Age bands used for shop filtering. `range` is [min, max] inclusive; the top
// band's max is an open-ended cap. The shop UI layers colours/labels on top of
// these ids — the ranges live here as the single source of truth for matching.
type AgeBand = { id: string; range: [number, number] };
export const AGE_BANDS: AgeBand[] = [
  { id: "3-5", range: [3, 5] },
  { id: "6-8", range: [6, 8] },
  { id: "9-12", range: [9, 12] },
  { id: "13+", range: [13, 99] },
];

const productPrice = (p: Product) => parseFloat(p.priceRange.minVariantPrice.amount);

// Per-axis matchers. An empty selection means "no constraint" (match all).

// A product with no minimum age is excluded from any explicit age filter. The
// test is an interval overlap: the product's [minAge, maxAge] intersects the
// band's [lo, hi], with an absent maxAge treated as open-ended (Infinity).
export function matchAge(p: Product, ages: string[]): boolean {
  if (ages.length === 0) return true;
  const minAge = p.minAge?.value ? parseInt(p.minAge.value, 10) : null;
  if (minAge === null) return false;
  const productMax = p.maxAge?.value ? parseInt(p.maxAge.value, 10) : Infinity;
  return ages.some((id) => {
    const band = AGE_BANDS.find((a) => a.id === id);
    return band ? minAge <= band.range[1] && productMax >= band.range[0] : false;
  });
}

// Category ids can be merged (e.g. "robotics-coding" expands to robotics + coding
// tags); a product matches if it carries any of the expanded `category:<tag>` tags.
export function matchCategory(p: Product, cats: string[]): boolean {
  if (cats.length === 0) return true;
  return cats.some((c) => categoryMatchTags(c).some((t) => p.tags?.includes(`category:${t}`)));
}

export function matchBrand(p: Product, brands: string[]): boolean {
  if (brands.length === 0) return true;
  return brands.some((b) => b.toLowerCase() === p.vendor.toLowerCase());
}

type Selection = { ages: string[]; categories: string[]; brands: string[] };

// Filter across all three axes, then sort. Out-of-stock kits always sink to the
// end whatever the sort — this relies on a stable sort to preserve the primary
// order within the in-stock and out-of-stock groups. The input array is never
// mutated (filter() returns a fresh array that is sorted in place).
export function filterAndSortProducts(
  products: Product[],
  selection: Selection,
  sortBy: string,
): Product[] {
  const result = products.filter(
    (p) =>
      matchAge(p, selection.ages) &&
      matchCategory(p, selection.categories) &&
      matchBrand(p, selection.brands),
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
      break; // "featured" keeps the fetched (collection default) order
  }

  result.sort((a, b) => {
    const aOut = getStockStatus(a) === "out-of-stock" ? 1 : 0;
    const bOut = getStockStatus(b) === "out-of-stock" ? 1 : 0;
    return aOut - bOut;
  });

  return result;
}
