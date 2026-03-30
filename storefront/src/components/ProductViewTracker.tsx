"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { gtmViewItem } from "@/lib/gtm";

interface ProductViewTrackerProps {
  handle: string;
  title: string;
  sku?: string;
  price: number;
  currencyCode: string;
  vendor?: string;
}

export default function ProductViewTracker({
  handle,
  title,
  sku,
  price,
  currencyCode,
  vendor,
}: ProductViewTrackerProps) {
  useEffect(() => {
    posthog.capture("product_viewed", {
      product_handle: handle,
      product_title: title,
      product_sku: sku,
      product_price: price,
      currency_code: currencyCode,
      vendor,
    });
    gtmViewItem({
      item_id: sku || handle,
      item_name: title,
      price,
      currency: currencyCode,
      quantity: 1,
      item_brand: vendor,
    });
  }, [handle, title, sku, price, currencyCode, vendor]);

  return null;
}
