import { getProductByHandle, ProductDetail, formatPrice } from "./shopify";
import addonsConfig from "@/config/product-addons.json";

interface AddonConfig {
  parentHandle: string;
  addonHandle: string;
  discountPercent: number;
  quantity?: number;
  description?: string;
  viewProductLink?: boolean;
}

export interface ResolvedAddon {
  product: ProductDetail;
  variantId: string;
  discountPercent: number;
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
  currencyCode: string;
  formattedOriginalPrice: string;
  formattedDiscountedPrice: string;
  savings: number;
  formattedSavings: string;
  description?: string;
  viewProductLink: boolean;
}

/**
 * Get add-on configurations for a product by its handle
 */
export function getAddonConfigsForHandle(parentHandle: string): AddonConfig[] {
  return (addonsConfig.addons as AddonConfig[]).filter(
    (addon) => addon.parentHandle === parentHandle,
  );
}

/**
 * Resolve add-on configs to full product data with pricing
 */
export async function resolveAddonsForHandle(parentHandle: string): Promise<ResolvedAddon[]> {
  const configs = getAddonConfigsForHandle(parentHandle);

  if (configs.length === 0) {
    return [];
  }

  const resolvedAddons: ResolvedAddon[] = [];

  for (const config of configs) {
    const product = await getProductByHandle(config.addonHandle);

    if (!product) {
      console.warn(`Add-on product not found for handle: ${config.addonHandle}`);
      continue;
    }

    // Use the first available variant
    const variant = product.variants.edges[0]?.node;

    if (!variant) {
      console.warn(`No variant found for add-on: ${config.addonHandle}`);
      continue;
    }

    const qty = config.quantity ?? 1;
    const unitPrice = parseFloat(variant.price.amount);
    const originalPrice = unitPrice * qty;
    const discountedPrice = originalPrice * (1 - config.discountPercent / 100);
    const savings = originalPrice - discountedPrice;

    resolvedAddons.push({
      product,
      variantId: variant.id,
      discountPercent: config.discountPercent,
      quantity: qty,
      originalPrice,
      discountedPrice,
      currencyCode: variant.price.currencyCode,
      formattedOriginalPrice: formatPrice(originalPrice.toString(), variant.price.currencyCode),
      formattedDiscountedPrice: formatPrice(discountedPrice.toFixed(2), variant.price.currencyCode),
      savings,
      formattedSavings: formatPrice(savings.toFixed(2), variant.price.currencyCode),
      description: config.description,
      viewProductLink: config.viewProductLink ?? true,
    });
  }

  return resolvedAddons;
}

/**
 * Serializable add-on data to pass to client components
 */
export interface SerializedAddon {
  productId: string;
  variantId: string;
  title: string;
  productTitle: string;
  handle: string;
  image: string | null;
  discountPercent: number;
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
  currencyCode: string;
  formattedOriginalPrice: string;
  formattedDiscountedPrice: string;
  savings: number;
  formattedSavings: string;
  available: boolean;
  description?: string;
  viewProductLink: boolean;
}

/**
 * Serialize resolved add-ons for client component props
 */
export function serializeAddons(addons: ResolvedAddon[]): SerializedAddon[] {
  return addons.map((addon) => ({
    productId: addon.product.id,
    variantId: addon.variantId,
    title: addon.quantity > 1 ? `${addon.quantity} x ${addon.product.title}` : addon.product.title,
    productTitle: addon.product.title,
    handle: addon.product.handle,
    image: addon.product.images.edges[0]?.node.url || null,
    discountPercent: addon.discountPercent,
    quantity: addon.quantity,
    originalPrice: addon.originalPrice,
    discountedPrice: addon.discountedPrice,
    currencyCode: addon.currencyCode,
    formattedOriginalPrice: addon.formattedOriginalPrice,
    formattedDiscountedPrice: addon.formattedDiscountedPrice,
    savings: addon.savings,
    formattedSavings: addon.formattedSavings,
    available: addon.product.availableForSale,
    description: addon.description,
    viewProductLink: addon.viewProductLink,
  }));
}
