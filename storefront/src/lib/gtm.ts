declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

type GA4Item = {
  item_id: string;
  item_name: string;
  price: number;
  currency: string;
  quantity: number;
  item_brand?: string;
  index?: number;
};

function pushEcommerceEvent(event: string, ecommerce: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // Clear previous ecommerce data (Google recommendation)
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({ event, ecommerce });
}

export function gtmPageView(url: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "page_view", page_location: url });
}

export function gtmViewItem(item: GA4Item) {
  pushEcommerceEvent("view_item", {
    currency: item.currency,
    value: item.price,
    items: [item],
  });
}

export function gtmViewCart(items: GA4Item[], value: number, currency: string) {
  pushEcommerceEvent("view_cart", {
    currency,
    value,
    items,
  });
}

export function gtmAddToCart(items: GA4Item[], value: number, currency: string) {
  pushEcommerceEvent("add_to_cart", {
    currency,
    value,
    items,
  });
}

export function gtmBeginCheckout(items: GA4Item[], value: number, currency: string) {
  pushEcommerceEvent("begin_checkout", {
    currency,
    value,
    items,
  });
}

export function gtmSearch(searchTerm: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "search", search_term: searchTerm });
}
