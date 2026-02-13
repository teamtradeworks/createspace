"use client";

import { useCart } from "@/context/CartContext";

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
  const { addItem, openCart } = useCart();

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
        openCart();
      }}
      className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy text-white text-xs font-medium rounded-lg hover:bg-cs-orange transition-colors"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
      Add to Cart
    </button>
  );
}
