"use client";

import { useState, useRef } from "react";
import { capture } from "@/lib/analytics";
import { useCart } from "@/context/CartContext";
import { gtmAddToCart } from "@/lib/gtm";

interface QuickAddButtonProps {
  variantId: string;
  productId: string;
  title: string;
  price: number;
  currencyCode: string;
  handle: string;
  image?: string;
  available?: boolean;
}

export default function QuickAddButton({
  variantId,
  productId,
  title,
  price,
  currencyCode,
  handle,
  image,
  available,
}: QuickAddButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
          id: productId,
          variantId,
          title,
          price,
          currencyCode,
          handle,
          image,
          available,
        });
        capture("product_quick_added_to_cart", {
          product_handle: handle,
          product_title: title,
          product_price: price,
          currency_code: currencyCode,
          $value: price,
        });
        gtmAddToCart(
          [{ item_id: handle, item_name: title, price, currency: currencyCode, quantity: 1 }],
          price,
          currencyCode,
        );
        setAdded(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setAdded(false), 1500);
      }}
      className={`grid text-white text-xs font-medium rounded-lg transition-colors duration-300 px-2.5 py-2.5 sm:px-4 sm:py-3 ${
        added ? "bg-green-600" : "bg-navy hover:bg-cs-orange"
      }`}
      aria-label={added ? "Added to cart" : "Add to cart"}
    >
      <span
        className={`col-start-1 row-start-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 ${
          added ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        {/* Mobile: + icon and cart icon */}
        <svg
          className="w-3 h-3 sm:hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        <span className="hidden sm:inline">Add to Cart</span>
      </span>
      <span
        className={`col-start-1 row-start-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 ${
          added ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        <span className="hidden sm:inline">Added</span>
      </span>
    </button>
  );
}
