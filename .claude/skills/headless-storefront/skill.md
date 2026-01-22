---
name: headless-storefront
description: Headless Shopify storefront development using the Storefront API. Use for React/Next.js customer-facing storefronts, cart management, product pages, collections, and checkout flows. This is the primary skill for the CREATESPACE storefront.
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, WebFetch
---

# Headless Shopify Storefront

## Purpose

Build customer-facing headless storefronts using Shopify's Storefront API. This skill covers product display, cart management, collections, and checkout - everything needed for the `storefront/` application.

## When to Use

Invoke when working with:
- **Products** - Fetching and displaying product data, variants, images
- **Collections** - Product collections, filtering, sorting
- **Cart** - Add to cart, update quantities, remove items
- **Checkout** - Redirecting to Shopify checkout
- **Customer accounts** - Login, registration, order history
- **Search** - Product search and filtering

## Authentication

Headless storefronts use a **Storefront Access Token** (public token), not OAuth.

```typescript
// Environment variable
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

// GraphQL client setup
const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors[0].message);
  }

  return data;
}
```

## Storefront API Queries

### Fetch Single Product

```graphql
query GetProduct($handle: String!) {
  product(handle: $handle) {
    id
    title
    handle
    description
    descriptionHtml
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
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
          }
        }
      }
    }
    options {
      name
      values
    }
  }
}
```

### Fetch Products (Collection or All)

```graphql
query GetProducts($first: Int!, $after: String) {
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
        availableForSale
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  }
}
```

### Fetch Collection

```graphql
query GetCollection($handle: String!, $first: Int!) {
  collection(handle: $handle) {
    id
    title
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
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
}
```

### Search Products

```graphql
query SearchProducts($query: String!, $first: Int!) {
  search(query: $query, first: $first, types: [PRODUCT]) {
    edges {
      node {
        ... on Product {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
}
```

## Cart Management

### Create Cart

```graphql
mutation CreateCart($lines: [CartLineInput!]!) {
  cartCreate(input: { lines: $lines }) {
    cart {
      id
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                  handle
                }
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

**Variables:**
```json
{
  "lines": [
    {
      "merchandiseId": "gid://shopify/ProductVariant/123456789",
      "quantity": 1
    }
  ]
}
```

### Get Cart

```graphql
query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              product {
                title
                handle
              }
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
}
```

### Add to Cart

```graphql
mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

### Update Cart Line

```graphql
mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      id
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

**Variables:**
```json
{
  "cartId": "gid://shopify/Cart/abc123",
  "lines": [
    {
      "id": "gid://shopify/CartLine/xyz789",
      "quantity": 2
    }
  ]
}
```

### Remove from Cart

```graphql
mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      id
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

## React/Next.js Patterns

### Cart Context

```typescript
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartContextType {
  cartId: string | null;
  cart: Cart | null;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  checkoutUrl: string | null;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem('cartId');
    if (savedCartId) {
      setCartId(savedCartId);
      fetchCart(savedCartId);
    }
  }, []);

  async function addToCart(variantId: string, quantity: number) {
    if (!cartId) {
      // Create new cart
      const newCart = await createCart([{ merchandiseId: variantId, quantity }]);
      setCartId(newCart.id);
      setCart(newCart);
      localStorage.setItem('cartId', newCart.id);
    } else {
      // Add to existing cart
      const updatedCart = await addCartLines(cartId, [{ merchandiseId: variantId, quantity }]);
      setCart(updatedCart);
    }
  }

  async function updateQuantity(lineId: string, quantity: number) {
    if (!cartId) return;

    if (quantity === 0) {
      await removeItem(lineId);
      return;
    }

    const updatedCart = await updateCartLines(cartId, [{ id: lineId, quantity }]);
    setCart(updatedCart);
  }

  async function removeItem(lineId: string) {
    if (!cartId) return;
    const updatedCart = await removeCartLines(cartId, [lineId]);
    setCart(updatedCart);
  }

  return (
    <CartContext.Provider value={{
      cartId,
      cart,
      addToCart,
      updateQuantity,
      removeItem,
      checkoutUrl: cart?.checkoutUrl ?? null,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
```

### Product Page

```typescript
// app/products/[handle]/page.tsx
import { getProduct } from '@/lib/shopify';
import { ProductForm } from '@/components/ProductForm';
import { formatPrice } from '@/lib/utils';

interface Props {
  params: { handle: string };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        {/* Product images */}
        <img
          src={product.images.edges[0]?.node.url}
          alt={product.images.edges[0]?.node.altText || product.title}
        />
      </div>

      <div>
        <h1>{product.title}</h1>
        <p>{formatPrice(product.priceRange.minVariantPrice)}</p>

        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

        <ProductForm product={product} />
      </div>
    </div>
  );
}
```

### Add to Cart Button

```typescript
'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface Props {
  variantId: string;
  availableForSale: boolean;
}

export function AddToCartButton({ variantId, availableForSale }: Props) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      await addToCart(variantId, 1);
    } finally {
      setLoading(false);
    }
  }

  if (!availableForSale) {
    return <button disabled>Out of Stock</button>;
  }

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
```

## Price Formatting

```typescript
// Format prices with South African Rand
export function formatPrice(price: { amount: string; currencyCode: string }): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(parseFloat(price.amount));
}

// Example: formatPrice({ amount: "299.00", currencyCode: "ZAR" })
// Returns: "R 299,00"
```

## Checkout Flow

Shopify handles checkout on their hosted checkout page. Redirect the customer:

```typescript
function goToCheckout() {
  if (cart?.checkoutUrl) {
    window.location.href = cart.checkoutUrl;
  }
}
```

The `checkoutUrl` from the cart automatically includes all cart items and handles:
- Payment processing
- Shipping address collection
- Delivery options
- Order confirmation

## Error Handling

```typescript
async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const { data, errors } = await response.json();

    if (errors?.length) {
      // Log for debugging
      console.error('Shopify GraphQL errors:', errors);
      throw new Error(errors[0].message);
    }

    return data;
  } catch (error) {
    console.error('Shopify fetch error:', error);
    throw error;
  }
}
```

## Common Patterns

### Pagination

```typescript
async function getAllProducts() {
  let products: Product[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;

  while (hasNextPage) {
    const data = await shopifyFetch(GET_PRODUCTS, { first: 50, after: cursor });
    products = [...products, ...data.products.edges.map(e => e.node)];
    hasNextPage = data.products.pageInfo.hasNextPage;
    cursor = data.products.pageInfo.endCursor;
  }

  return products;
}
```

### Metafields

```graphql
query GetProductWithMetafields($handle: String!) {
  product(handle: $handle) {
    id
    title
    # Custom metafields for CREATESPACE product info
    ageRange: metafield(namespace: "custom", key: "age_range") {
      value
    }
    skillLevel: metafield(namespace: "custom", key: "skill_level") {
      value
    }
    learningOutcomes: metafield(namespace: "custom", key: "learning_outcomes") {
      value
    }
    requiresSupervision: metafield(namespace: "custom", key: "requires_supervision") {
      value
    }
    extrasRequired: metafield(namespace: "custom", key: "extras_required") {
      value
    }
  }
}
```

## Security Notes

1. **Storefront Access Token** is safe to expose client-side (it's a public token with limited scope)
2. **Never expose** Admin API credentials in frontend code
3. **Validate** all user inputs before sending to Shopify
4. **Rate limits** apply - implement retry logic with backoff

## Resources

- **Storefront API Reference:** https://shopify.dev/docs/api/storefront
- **GraphiQL Explorer:** https://shopify.dev/docs/apps/tools/graphiql-storefront-api
- **Hydrogen (Shopify's React framework):** https://hydrogen.shopify.dev
