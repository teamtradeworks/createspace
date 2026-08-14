import { fuzzySearchProducts } from "@/lib/fuzzy-search";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2025-10/graphql.json`;

type ShopifyResponse<T> = {
  data: T;
  errors?: { message: string }[];
};

const SHOPIFY_TIMEOUT_MS = 8000;

function isRetriableNetworkError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  // Common transient causes from undici on Vercel: ConnectTimeoutError,
  // UND_ERR_SOCKET, ECONNRESET, fetch failed wrapping any of the above.
  const message = `${err.message} ${err.cause instanceof Error ? err.cause.message : ""}`;
  return (
    err.name === "AbortError" ||
    /ConnectTimeoutError|UND_ERR_|ECONNRESET|ETIMEDOUT|ENETUNREACH|EAI_AGAIN|fetch failed|socket hang up/i.test(
      message,
    )
  );
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}): Promise<T> {
  const body = JSON.stringify({ query, variables });
  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body,
    ...(cache ? { cache } : { next: { revalidate: 60 } }),
  };

  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(endpoint, {
        ...init,
        signal: AbortSignal.timeout(SHOPIFY_TIMEOUT_MS),
      });

      if (!response.ok) {
        // Retry once on 5xx; surface a useful message that won't be a stray
        // HTML page parsed as JSON downstream.
        if (response.status >= 500 && attempt === 0) {
          lastError = new Error(`Shopify ${response.status} ${response.statusText}`);
          continue;
        }
        const snippet = (await response.text()).slice(0, 200);
        throw new Error(`Shopify ${response.status} ${response.statusText}: ${snippet}`);
      }

      const json: ShopifyResponse<T> = await response.json();

      if (json.errors) {
        // GraphQL-level errors are not retriable.
        throw new Error(json.errors.map((e) => e.message).join("\n"));
      }

      return json.data;
    } catch (err) {
      lastError = err;
      if (attempt === 0 && isRetriableNetworkError(err)) {
        continue;
      }
      throw err;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Shopify request failed");
}

// Types
export type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  vendor: string;
  tags: string[];
  availableForSale: boolean;
  updatedAt: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string | null;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        sku: string | null;
        availableForSale: boolean;
        currentlyNotInStock: boolean;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
  minAge: Metafield;
  maxAge: Metafield;
  rating: Metafield;
  ratingCount: Metafield;
};

type Collection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
};

// Queries
const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          vendor
          tags
          availableForSale
          updatedAt
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 3) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                id
                title
                sku
                availableForSale
                currentlyNotInStock
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
          minAge: metafield(namespace: "custom", key: "minimum_age") {
            value
          }
          maxAge: metafield(namespace: "custom", key: "maximum_age") {
            value
          }
          rating: metafield(namespace: "reviews", key: "rating") {
            value
          }
          ratingCount: metafield(namespace: "reviews", key: "rating_count") {
            value
          }
        }
      }
    }
  }
`;

const COLLECTION_PRODUCTS_QUERY = `
  query CollectionProducts($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys = COLLECTION_DEFAULT) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
      products(first: $first, sortKey: $sortKey) {
        edges {
          node {
            id
            title
            handle
            description
            vendor
            tags
            availableForSale
            updatedAt
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 3) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  sku
                  availableForSale
                  currentlyNotInStock
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            minAge: metafield(namespace: "custom", key: "minimum_age") {
              value
            }
            maxAge: metafield(namespace: "custom", key: "maximum_age") {
              value
            }
            rating: metafield(namespace: "reviews", key: "rating") {
              value
            }
            ratingCount: metafield(namespace: "reviews", key: "rating_count") {
              value
            }
          }
        }
      }
    }
  }
`;

// API Functions
export async function getProducts(first: number = 8): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: Product }[] };
  }>({
    query: PRODUCTS_QUERY,
    variables: { first },
  });

  return data.products.edges.map((edge) => edge.node);
}

// Get products within a specific collection by handle
type CollectionSortKey = "COLLECTION_DEFAULT" | "BEST_SELLING" | "CREATED" | "PRICE" | "TITLE";

export async function getCollectionProducts(
  handle: string,
  first: number = 50,
  sortKey: CollectionSortKey = "COLLECTION_DEFAULT",
): Promise<{ collection: Collection | null; products: Product[] }> {
  const data = await shopifyFetch<{
    collection: (Collection & { products: { edges: { node: Product }[] } }) | null;
  }>({
    query: COLLECTION_PRODUCTS_QUERY,
    variables: { handle, first, sortKey },
  });

  if (!data.collection) {
    return { collection: null, products: [] };
  }

  const { products, ...collectionData } = data.collection;
  return {
    collection: collectionData,
    products: products.edges.map((edge) => edge.node),
  };
}

// Search products by text query using client-side fuzzy matching.
// Fetches the full product catalogue (Shopify caches the response) and ranks
// matches with Fuse.js so typos like "microbit" → "micro:bit" still resolve.
export async function searchProducts(query: string, limit: number = 20): Promise<Product[]> {
  const products = await getProducts(250);
  return fuzzySearchProducts(products, query).slice(0, limit);
}

// Helper to format price consistently (avoids hydration mismatch)
// Uses manual formatting to ensure identical output on server and client
export function formatPrice(
  amount: string | number,
  currencyCode: string,
  { showCents = false }: { showCents?: boolean } = {},
): string {
  const num = typeof amount === "number" ? amount : parseFloat(amount);
  const [whole, decimal = "00"] = num.toFixed(2).split(".");
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const suffix = showCents ? `.${decimal}` : "";
  return currencyCode === "ZAR"
    ? `R\u00a0${withCommas}${suffix}`
    : `${currencyCode}\u00a0${withCommas}${suffix}`;
}

export function formatAgeRange(minAge: Metafield, maxAge: Metafield): string | null {
  if (!minAge?.value) return null;
  const min = parseInt(minAge.value, 10);
  if (isNaN(min)) return null;
  if (!maxAge?.value) return `Ages ${min}+`;
  const max = parseInt(maxAge.value, 10);
  if (isNaN(max)) return `Ages ${min}+`;
  return `Ages ${min}-${max}`;
}

// Metafield type
export type Metafield = {
  value: string;
} | null;

// Metaobject reference for battery type
export type BatteryMetaobject = {
  type: string;
  fields: {
    key: string;
    value: string | null;
  }[];
} | null;

// Extended product type for product detail page
export type ProductDetail = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string | null;
      };
    }[];
  };
  media: {
    edges: {
      node: {
        mediaContentType: string;
        previewImage: {
          url: string;
          altText: string | null;
        } | null;
        sources?: {
          url: string;
          mimeType: string;
          format: string;
        }[];
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        sku: string | null;
        availableForSale: boolean;
        currentlyNotInStock: boolean;
        requiresShipping: boolean;
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice: {
          amount: string;
          currencyCode: string;
        } | null;
      };
    }[];
  };
  // Metafields for QuickInfoBadges
  minAge: Metafield;
  maxAge: Metafield;
  batteriesRequired: Metafield;
  batteriesIncluded: Metafield;
  batteriesList: {
    reference: BatteryMetaobject;
  } | null;
  projects: Metafield;
  guide: Metafield;
  soldering: Metafield;
  codingPlatform: Metafield;
  rating: Metafield;
  ratingCount: Metafield;
};

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      vendor
      productType
      tags
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      media(first: 10) {
        edges {
          node {
            mediaContentType
            previewImage {
              url
              altText
            }
            ... on Video {
              sources {
                url
                mimeType
                format
              }
            }
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            sku
            availableForSale
            currentlyNotInStock
            requiresShipping
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
      minAge: metafield(namespace: "custom", key: "minimum_age") {
        value
      }
      maxAge: metafield(namespace: "custom", key: "maximum_age") {
        value
      }
      batteriesRequired: metafield(namespace: "custom", key: "batteries_required") {
        value
      }
      batteriesIncluded: metafield(namespace: "custom", key: "batteries_included") {
        value
      }
      batteriesList: metafield(namespace: "custom", key: "batteries_list") {
        reference {
          ... on Metaobject {
            type
            fields {
              key
              value
            }
          }
        }
      }
      projects: metafield(namespace: "custom", key: "projects") {
        value
      }
      guide: metafield(namespace: "custom", key: "guide") {
        value
      }
      soldering: metafield(namespace: "custom", key: "soldering") {
        value
      }
      codingPlatform: metafield(namespace: "custom", key: "coding_platform") {
        value
      }
      rating: metafield(namespace: "reviews", key: "rating") {
        value
      }
      ratingCount: metafield(namespace: "reviews", key: "rating_count") {
        value
      }
    }
  }
`;

// Get single product by handle
export async function getProductByHandle(handle: string): Promise<ProductDetail | null> {
  const data = await shopifyFetch<{
    product: ProductDetail | null;
  }>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  });

  return data.product;
}

// Helper to parse Fera review rating from Shopify metafields
export function getProductRating(
  rating: Metafield,
  ratingCount: Metafield,
): { average: number; count: number } | null {
  if (!rating?.value || !ratingCount?.value) return null;

  try {
    const parsed = JSON.parse(rating.value);
    const average = parseFloat(parsed.value);
    const count = parseInt(ratingCount.value, 10);

    if (isNaN(average) || isNaN(count) || count === 0) return null;

    return { average, count };
  } catch {
    return null;
  }
}

// Helper function to format age range from product metafields
export function getProductAgeRange(product: ProductDetail): string | undefined {
  const minAge = product.minAge?.value;
  const maxAge = product.maxAge?.value;

  if (!minAge) return undefined;

  // If no maxAge, format as "X+"
  if (!maxAge) {
    return `${minAge}+`;
  }

  // Format as "X-Y"
  return `${minAge}-${maxAge}`;
}

// Helper function to format battery info from product metafields
export function getProductBatteryInfo(product: ProductDetail): string | undefined {
  // If the metafield doesn't exist at all, don't show the badge
  if (product.batteriesRequired === null) return undefined;

  const batteriesRequired = product.batteriesRequired?.value === "true";
  const batteriesIncluded = product.batteriesIncluded?.value === "true";
  const batteryMetaobject = product.batteriesList?.reference;

  // If batteries not required
  if (!batteriesRequired) return "No batteries required";

  // Get battery type label from metaobject if available
  let batteryType = "";
  if (batteryMetaobject?.fields) {
    const labelField = batteryMetaobject.fields.find(
      (f) => f.key === "label" || f.key === "name" || f.key === "title" || f.key === "type",
    );
    batteryType = labelField?.value || "";
  }

  // Format: "{battery type} (included)" or "{battery type} (not included)"
  const suffix = batteriesIncluded ? "(included)" : "(not included)";

  if (batteryType) {
    return `${batteryType} ${suffix}`;
  }

  // Fallback if no battery type specified
  return batteriesIncluded ? "Included" : "Required";
}

// Stock status for product pages and product cards
type StockStatus = "in-stock" | "lead-time" | "out-of-stock";

type StockStatusProduct = Pick<Product | ProductDetail, "availableForSale"> & {
  variants: { edges: { node: { availableForSale: boolean; currentlyNotInStock: boolean } }[] };
};

export function getStockStatus(product: StockStatusProduct): StockStatus {
  if (!product.availableForSale) return "out-of-stock";

  const availableVariants = product.variants.edges.filter((e) => e.node.availableForSale);

  if (availableVariants.length > 0 && availableVariants.every((e) => e.node.currentlyNotInStock)) {
    return "lead-time";
  }

  return "in-stock";
}

// Trim a product to what the card grids render before handing it to a client
// component — full products otherwise serialize into the page payload.
// Drops `description` (the single heaviest field), keeps only the two images
// the card shows, and (unless kept for filtering) drops `tags`. Variants are
// left intact: getStockStatus reads ALL of them, so slicing could flip a
// lead-time badge to in-stock.
export function slimProductForCard(product: Product, opts?: { keepTags?: boolean }): Product {
  return {
    ...product,
    description: "",
    tags: opts?.keepTags ? product.tags : [],
    images: { edges: product.images.edges.slice(0, 2) },
  };
}

// Returns true when no variant requires shipping (i.e. digital/non-inventory product)
export function isDigitalProduct(product: ProductDetail): boolean {
  const { edges } = product.variants;
  return edges.length > 0 && edges.every((e) => !e.node.requiresShipping);
}
