import { resolve } from "node:path";

// Playwright's own process doesn't get Next's env loading, so pick up the
// Shopify credentials from storefront/.env.local when running locally. CI sets
// them directly in the environment, which loadEnvFile never overrides.
try {
  process.loadEnvFile(resolve(__dirname, "../../.env.local"));
} catch {
  // No .env.local (e.g. CI) — rely on the surrounding environment.
}

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Product pages whose Add to Cart button opens an add-on upsell modal before
// adding, which the plain add-to-cart flow doesn't drive.
const EXCLUDED_HANDLES = new Set(["bbc-micro-bit-essential-stem-lab-tinker-kit-bundle"]);

type StockNode = {
  handle: string;
  availableForSale: boolean;
  variants: {
    edges: { node: { availableForSale: boolean; currentlyNotInStock: boolean } }[];
  };
};

// Same API version as src/lib/shopify.ts.
const PURCHASABLE_QUERY = `
  query PurchasableProducts($preferred: String!) {
    preferred: product(handle: $preferred) {
      ...Stock
    }
    products(first: 50, query: "available_for_sale:true", sortKey: TITLE) {
      edges {
        node {
          ...Stock
        }
      }
    }
  }
  fragment Stock on Product {
    handle
    availableForSale
    variants(first: 1) {
      edges {
        node {
          availableForSale
          currentlyNotInStock
        }
      }
    }
  }
`;

// Mirrors what a product page needs to render an enabled Add to Cart button
// that adds immediately: the product is for sale and its first variant (the
// one the page adds) is in stock rather than on lead time.
function isPurchasable(product: StockNode | null): product is StockNode {
  const variant = product?.variants.edges[0]?.node;
  return (
    !!product &&
    product.availableForSale &&
    !!variant &&
    variant.availableForSale &&
    !variant.currentlyNotInStock
  );
}

/**
 * Returns the handle of a product that can be added to cart right now:
 * `preferred` when Shopify says it's in stock, otherwise the first in-stock
 * product by title. Returns null when the Shopify credentials are missing or
 * nothing is in stock, so callers can skip rather than fail.
 */
export async function findPurchasableProductHandle(preferred: string): Promise<string | null> {
  if (!domain || !token) return null;

  const response = await fetch(`https://${domain}/api/2025-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query: PURCHASABLE_QUERY, variables: { preferred } }),
  });
  if (!response.ok) {
    throw new Error(`Shopify Storefront API ${response.status} ${response.statusText}`);
  }

  const { data, errors } = (await response.json()) as {
    data?: { preferred: StockNode | null; products: { edges: { node: StockNode }[] } };
    errors?: { message: string }[];
  };
  if (errors?.length) {
    throw new Error(errors.map((e) => e.message).join("\n"));
  }
  if (!data) return null;

  if (isPurchasable(data.preferred)) return data.preferred.handle;

  const fallback = data.products.edges
    .map((edge) => edge.node)
    .find((product) => isPurchasable(product) && !EXCLUDED_HANDLES.has(product.handle));
  return fallback?.handle ?? null;
}
