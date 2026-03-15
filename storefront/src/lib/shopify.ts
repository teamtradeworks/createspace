const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2025-10/graphql.json`;

type ShopifyResponse<T> = {
  data: T;
  errors?: { message: string }[];
};

export async function shopifyFetch<T>({
  query,
  variables,
  cache,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    ...(cache ? { cache } : { next: { revalidate: 60 } }),
  });

  const json: ShopifyResponse<T> = await response.json();

  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join("\n"));
  }

  return json.data;
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
          images(first: 3) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                sku
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

const PRODUCTS_BY_TAG_QUERY = `
  query ProductsByTag($first: Int!, $query: String!) {
    products(first: $first, query: $query, sortKey: RELEVANCE) {
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
          images(first: 3) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                sku
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
  query CollectionProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
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
            images(first: 3) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
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
export async function getCollectionProducts(
  handle: string,
  first: number = 50
): Promise<{ collection: Collection | null; products: Product[] }> {
  const data = await shopifyFetch<{
    collection:
      | (Collection & { products: { edges: { node: Product }[] } })
      | null;
  }>({
    query: COLLECTION_PRODUCTS_QUERY,
    variables: { handle, first },
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

// Search products by text query
export async function searchProducts(
  query: string,
  first: number = 20
): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: Product }[] };
  }>({
    query: PRODUCTS_BY_TAG_QUERY,
    variables: { first, query },
  });

  return data.products.edges.map((edge) => edge.node);
}

// Helper to format price consistently (avoids hydration mismatch)
// Uses manual formatting to ensure identical output on server and client
export function formatPrice(amount: string | number, currencyCode: string): string {
  const num = typeof amount === "number" ? amount : parseFloat(amount);
  const [whole, decimal = "00"] = num.toFixed(2).split(".");
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Format as R1,234.56 per CLAUDE.md spec
  return currencyCode === "ZAR"
    ? `R${withCommas}.${decimal}`
    : `${currencyCode} ${withCommas}.${decimal}`;
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
      variants(first: 10) {
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
export async function getProductByHandle(
  handle: string
): Promise<ProductDetail | null> {
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
  ratingCount: Metafield
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
      (f) => f.key === "label" || f.key === "name" || f.key === "title" || f.key === "type"
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

// Stock status for product detail pages
type StockStatus = "in-stock" | "lead-time" | "out-of-stock";

export function getStockStatus(product: ProductDetail): StockStatus {
  if (!product.availableForSale) return "out-of-stock";

  const availableVariants = product.variants.edges.filter(
    (e) => e.node.availableForSale
  );

  if (
    availableVariants.length > 0 &&
    availableVariants.every((e) => e.node.currentlyNotInStock)
  ) {
    return "lead-time";
  }

  return "in-stock";
}
