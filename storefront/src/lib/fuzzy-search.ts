import Fuse, { type IFuseOptions } from "fuse.js";
import synonymsConfig from "@/config/search-synonyms.json";
import type { Product } from "./shopify";

const SYNONYMS: { match: string; aliases: string[] }[] = synonymsConfig.synonyms;

// Collect synonym aliases for a product when any searchable field mentions
// the canonical term. Gives Fuse extra indexed strings to match against so
// searches like "MatataLabs" can find products branded "MatataStudio".
function aliasesFor(product: Product): string[] {
  const haystack =
    `${product.title} ${product.vendor} ${product.tags.join(" ")}`.toLowerCase();
  const out: string[] = [];
  for (const { match, aliases } of SYNONYMS) {
    if (haystack.includes(match.toLowerCase())) {
      out.push(...aliases);
    }
  }
  return out;
}

const FUSE_OPTIONS: IFuseOptions<Product> = {
  keys: [
    { name: "title", weight: 0.45 },
    { name: "tags", weight: 0.15 },
    { name: "vendor", weight: 0.15 },
    { name: "description", weight: 0.1 },
    { name: "aliases", weight: 0.15, getFn: aliasesFor },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

export function fuzzySearchProducts(products: Product[], query: string): Product[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const fuse = new Fuse(products, FUSE_OPTIONS);
  return fuse.search(trimmed).map((result) => result.item);
}
