import Fuse, { type IFuseOptions, type FuseResult } from "fuse.js";
import synonymsConfig from "@/config/search-synonyms.json";
import type { Product } from "./shopify";

const SYNONYMS: { match: string; aliases: string[] }[] = synonymsConfig.synonyms;

/**
 * How a query resolved against the catalogue:
 *  - `match`   — we stock what was asked for; show these as results.
 *  - `related` — the distinctive part of the query matched nothing, but some of
 *                its words did. Show these as suggestions, not as results.
 *  - `none`    — nothing matched at all.
 */
export type SearchResultKind = "match" | "related" | "none";

export interface CatalogueSearchResult {
  kind: SearchResultKind;
  products: Product[];
}

// Words that carry no product meaning, so they never count as a query term
// ("kit" and "set" are deliberately absent — they discriminate here).
const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "for",
  "with",
  "of",
  "in",
  "on",
  "to",
  "my",
  "by",
  "from",
]);

// A word shorter than this is too generic to pull products in on its own —
// "pi" would otherwise match "Epic", and "tv" would match "v2".
const MIN_TOKEN_LENGTH = 3;

/**
 * How many of a query's words a product must carry to count as a result rather
 * than a suggestion. Half the query, and never fewer than two words — matching
 * one word out of six is how "national geographic glow-in-the-dark crystal lab"
 * used to drag in every product that merely said "national".
 */
function requiredTokenHits(tokenCount: number): number {
  if (tokenCount <= 1) return 1;
  return Math.max(2, Math.ceil(tokenCount / 2));
}

// `related` is a suggestion tier, not a result set, so keep it short.
const RELATED_LIMIT = 8;

/**
 * Reduce a string to letters and digits only, so punctuation and spacing stop
 * mattering: "micro:bit", "micro bit" and "microbit" all collapse to
 * "microbit", and "esp 32" collapses to "esp32".
 */
function squash(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Collect synonym aliases for a product when any searchable field mentions
// the canonical term. Gives Fuse extra indexed strings to match against so
// searches like "MatataLabs" can find products branded "MatataStudio".
function aliasesFor(product: Product): string[] {
  const haystack = `${product.title} ${product.vendor} ${product.tags.join(" ")}`.toLowerCase();
  const out: string[] = [];
  for (const { match, aliases } of SYNONYMS) {
    if (haystack.includes(match.toLowerCase())) {
      out.push(...aliases);
    }
  }
  return out;
}

// Every searchable field with punctuation and spacing removed, indexed as one
// string, so a squashed query can match a title that spaces or hyphenates the
// same term.
function squashedFor(product: Product): string {
  return squash(`${product.title} ${product.vendor} ${product.tags.join(" ")}`);
}

// `description` is deliberately NOT indexed. Descriptions name adjacent
// hardware and generic words, so indexing them buried exact title matches under
// a page of loosely-related products — a search for "esp32" returned around 11
// results when only one product is an ESP32 kit.
const FUSE_OPTIONS: IFuseOptions<Product> = {
  keys: [
    { name: "title", weight: 0.45 },
    { name: "tags", weight: 0.15 },
    { name: "vendor", weight: 0.15 },
    { name: "aliases", weight: 0.15, getFn: aliasesFor },
    { name: "squashed", weight: 0.1, getFn: squashedFor },
  ],
  // 0.3 rather than Fuse's looser default: at 0.4, three-letter queries like
  // "oil" and "clean" matched 10-16 unrelated products. 0.3 still tolerates
  // real typos ("ardiuno", "talebots", "Elekfreaks").
  threshold: 0.3,
  ignoreLocation: true,
  minMatchCharLength: 2,
  includeScore: true,
};

/** Query words worth matching individually, in the order they were typed. */
function meaningfulTokens(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\s+/)
    .map(squash)
    .filter((token) => token.length >= MIN_TOKEN_LENGTH && !STOP_WORDS.has(token));
}

/**
 * How many query words appear in the title as whole words. Used to rank a real
 * word match above a coincidental substring: without this, "robot" put vendor
 * "Robotico" above every product that is actually a robot.
 */
function wholeWordHits(product: Product, tokens: string[]): number {
  const words = new Set(product.title.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean));
  return tokens.filter((token) => words.has(token)).length;
}

interface Candidate {
  product: Product;
  /** Best (lowest) Fuse score seen for this product. */
  score: number;
  /** How many of the query's words matched this product. */
  tokenHits: number;
  /** Whether the query as typed matched this product. */
  wholeMatch: boolean;
}

export function fuzzySearchProducts(products: Product[], query: string): CatalogueSearchResult {
  const trimmed = query.trim();
  if (!trimmed) return { kind: "none", products: [] };

  const fuse = new Fuse(products, FUSE_OPTIONS);
  const tokens = meaningfulTokens(trimmed);
  const candidates = new Map<string, Candidate>();

  const record = (
    results: FuseResult<Product>[],
    update: (candidate: Candidate) => void,
    penalty = 0,
  ) => {
    for (const { item, score } of results) {
      const candidate = candidates.get(item.title) ?? {
        product: item,
        score: Number.POSITIVE_INFINITY,
        tokenHits: 0,
        wholeMatch: false,
      };
      candidate.score = Math.min(candidate.score, (score ?? 1) + penalty);
      update(candidate);
      candidates.set(item.title, candidate);
    }
  };

  // The query as typed. Also try it squashed, so "vinci bot" and "esp 32" reach
  // titles that write those as one word; the squashed pass is scored a hair
  // worse so an as-typed match wins a tie.
  record(fuse.search(trimmed), (c) => {
    c.wholeMatch = true;
  });
  const squashedQuery = squash(trimmed);
  if (squashedQuery && squashedQuery !== trimmed.toLowerCase()) {
    record(
      fuse.search(squashedQuery),
      (c) => {
        c.wholeMatch = true;
      },
      0.01,
    );
  }

  // Then each word on its own. This is what rescues long queries: "robotico 37
  // sensor module kit" scores too poorly as one string, because the words the
  // catalogue does carry are outweighed by the ones it doesn't.
  let headMatched = false;
  tokens.forEach((token, index) => {
    const results = fuse.search(token);
    if (index === 0 && results.length > 0) headMatched = true;
    record(results, (c) => {
      c.tokenHits += 1;
    });
  });

  if (candidates.size === 0) return { kind: "none", products: [] };

  const ranked = [...candidates.values()].sort(
    (a, b) =>
      wholeWordHits(b.product, tokens) - wholeWordHits(a.product, tokens) ||
      b.tokenHits - a.tokenHits ||
      Number(b.wholeMatch) - Number(a.wholeMatch) ||
      a.score - b.score,
  );

  // Results are products that matched the query as typed, or carried enough of
  // its words to be what was asked for. Everything else is at best a suggestion.
  const needed = requiredTokenHits(tokens.length);
  const results = ranked.filter((c) => c.wholeMatch || c.tokenHits >= needed);

  // A multi-word query only counts as a result if the word the customer led with
  // matched something. That is what separates "robot master standard" (we stock
  // Robot Masters) from "raspberry pi pico starter kit" — we do sell starter
  // kits, but calling that a Raspberry Pi result would be a lie.
  const leadWordFound = tokens.length <= 1 || headMatched || results.some((c) => c.wholeMatch);

  if (results.length > 0 && leadWordFound) {
    return { kind: "match", products: results.map((c) => c.product) };
  }

  return { kind: "related", products: ranked.slice(0, RELATED_LIMIT).map((c) => c.product) };
}
