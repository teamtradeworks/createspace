"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

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
  }, [handle, title, sku, price, currencyCode, vendor]);

  return null;
}
