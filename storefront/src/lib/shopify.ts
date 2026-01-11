const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

type ShopifyResponse<T> = {
  data: T;
  errors?: { message: string }[];
};

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
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
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
};

export type Collection = {
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
        }
      }
    }
  }
`;

const PRODUCTS_BY_TAG_QUERY = `
  query ProductsByTag($first: Int!, $query: String!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          description
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
        }
      }
    }
  }
`;

const COLLECTIONS_QUERY = `
  query Collections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
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

export async function getCollections(
  first: number = 10
): Promise<Collection[]> {
  const data = await shopifyFetch<{
    collections: { edges: { node: Collection }[] };
  }>({
    query: COLLECTIONS_QUERY,
    variables: { first },
  });

  return data.collections.edges.map((edge) => edge.node);
}

// Get products by tag (for age groups)
export async function getProductsByTag(
  tag: string,
  first: number = 12
): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: Product }[] };
  }>({
    query: PRODUCTS_BY_TAG_QUERY,
    variables: { first, query: `tag:${tag}` },
  });

  return data.products.edges.map((edge) => edge.node);
}

// Helper to format price consistently (avoids hydration mismatch)
// Uses manual formatting to ensure identical output on server and client
export function formatPrice(amount: string, currencyCode: string): string {
  const num = parseFloat(amount);
  const [whole, decimal = "00"] = num.toFixed(2).split(".");
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Format as R1,234.56 per CLAUDE.md spec
  return currencyCode === "ZAR"
    ? `R${withCommas}.${decimal}`
    : `${currencyCode} ${withCommas}.${decimal}`;
}

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
        availableForSale: boolean;
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
            availableForSale
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

// Product type for SKU lookup (includes SKU in variants)
export type ProductWithSku = Omit<ProductDetail, "variants"> & {
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        sku: string | null;
        availableForSale: boolean;
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
};

const PRODUCTS_WITH_SKU_QUERY = `
  query ProductsWithSku($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
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
        }
      }
    }
  }
`;

type ProductsWithSkuResponse = {
  products: {
    pageInfo: { hasNextPage: boolean; endCursor: string };
    edges: { node: ProductWithSku }[];
  };
};

// Get single product by SKU (exact match)
// Note: Shopify's SKU search is unreliable, so we fetch products and filter by exact SKU
export async function getProductBySku(
  sku: string
): Promise<ProductWithSku | null> {
  let hasNextPage = true;
  let cursor: string | null = null;

  while (hasNextPage) {
    const response: ProductsWithSkuResponse = await shopifyFetch<ProductsWithSkuResponse>({
      query: PRODUCTS_WITH_SKU_QUERY,
      variables: { first: 50, after: cursor },
    });

    // Find product with matching SKU in variants
    for (const edge of response.products.edges) {
      const product = edge.node;
      const hasMatchingSku = product.variants.edges.some(
        (variantEdge) => variantEdge.node.sku === sku
      );
      if (hasMatchingSku) {
        return product;
      }
    }

    hasNextPage = response.products.pageInfo.hasNextPage;
    cursor = response.products.pageInfo.endCursor;
  }

  return null;
}
