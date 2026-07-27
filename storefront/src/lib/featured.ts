import {
  type ProductDetail,
  type Metafield,
  formatPrice,
  formatAgeRange,
  getProductRating,
} from "@/lib/shopify";

// A ready-to-render featured kit for the homepage carousel. Built on the server
// from a ProductDetail so the client component gets plain, serialisable data.
export type FeaturedKit = {
  handle: string;
  title: string;
  vendor: string;
  href: string;
  images: { url: string; alt: string }[];
  price: string;
  compareAtPrice: string | null; // formatted, only when on sale
  discountPercent: number; // 0 when not on sale
  ageLabel: string | null;
  rating: { average: number; count: number } | null;
  tagline: string | null;
  points: string[]; // compelling, fact-based highlights (max 4)
};

// Shopify CDN serves resized variants via the width param; cap what the Next.js
// optimizer has to fetch from the (often multi-MB) source.
function withWidth(url: string, width: number): string {
  return `${url}${url.includes("?") ? "&" : "?"}width=${width}`;
}

function metaText(m: Metafield): string | null {
  const v = m?.value?.trim();
  return v ? v : null;
}

function metaBool(m: Metafield): boolean | null {
  if (!m?.value) return null;
  return m.value === "true";
}

// First clean sentence of the description, used as a short lead line. Skipped
// (null) when there's no tidy short sentence, rather than truncating awkwardly.
export function leadSentence(text: string, maxLen = 140): string | null {
  const clean = (text ?? "").replace(/\s+/g, " ").trim();
  if (!clean) return null;
  const dot = clean.indexOf(". ");
  const sentence = dot > 0 ? clean.slice(0, dot + 1) : clean;
  return sentence.length <= maxLen ? sentence : null;
}

// Fact-based highlights drawn straight from product metafields, in priority
// order, capped at 4. Nothing is invented — a kit only gets the points it has.
export function buildPoints(p: ProductDetail): string[] {
  const points: string[] = [];
  const projects = metaText(p.projects);
  // The metafield is sometimes a bare count ("200+") and sometimes already
  // names the unit ("33 lessons", "200+ models"). Only add "projects" when it
  // is a bare count, so we never get "33 lessons projects".
  if (projects) points.push(/[a-z]/i.test(projects) ? projects : `${projects} projects`);
  const platform = metaText(p.codingPlatform);
  if (platform) points.push(`Code with ${platform}`);
  if (metaBool(p.soldering) === false) points.push("No soldering needed");
  const guide = metaText(p.guide);
  if (guide) points.push(`Includes ${guide}`);
  if (metaBool(p.batteriesIncluded) === true) points.push("Batteries included");
  return points.slice(0, 4);
}

export function buildFeaturedKit(p: ProductDetail): FeaturedKit {
  const price = p.priceRange.minVariantPrice;
  const compareAt = p.compareAtPriceRange?.minVariantPrice;
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);
  const discountPercent = hasDiscount
    ? Math.round(
        ((parseFloat(compareAt.amount) - parseFloat(price.amount)) / parseFloat(compareAt.amount)) *
          100,
      )
    : 0;
  const images = (p.images?.edges ?? []).slice(0, 3).map((edge, i) => ({
    url: withWidth(edge.node.url, i === 0 ? 1200 : 800),
    alt: edge.node.altText || p.title,
  }));

  return {
    handle: p.handle,
    title: p.title,
    vendor: p.vendor,
    href: `/product/${p.handle}`,
    images,
    price: formatPrice(price.amount, price.currencyCode),
    compareAtPrice: hasDiscount ? formatPrice(compareAt.amount, compareAt.currencyCode) : null,
    discountPercent,
    ageLabel: formatAgeRange(p.minAge, p.maxAge),
    rating: getProductRating(p.rating, p.ratingCount),
    tagline: leadSentence(p.description),
    points: buildPoints(p),
  };
}
