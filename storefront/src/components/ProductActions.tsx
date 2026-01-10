"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface ProductActionsProps {
  productId: string;
  variantId: string;
  available: boolean;
  title: string;
  price: number;
  currencyCode: string;
  image?: string;
  handle: string;
}

export default function ProductActions({
  productId,
  variantId,
  available,
  title,
  price,
  currencyCode,
  image,
  handle,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = async () => {
    if (!available) return;

    setIsAddingToCart(true);

    // Add item to cart
    addItem({
      id: productId,
      variantId,
      title,
      price,
      currencyCode,
      image,
      handle,
    }, quantity);

    // Show success state briefly
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsAddingToCart(false);
    setAddedToCart(true);

    // Reset success state after 2 seconds
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = async () => {
    if (!available) return;

    setIsBuyingNow(true);

    // Add item to cart first
    addItem({
      id: productId,
      variantId,
      title,
      price,
      currencyCode,
      image,
      handle,
    }, quantity);

    // Redirect to cart/checkout
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsBuyingNow(false);
    window.location.href = "/cart";
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Qty:</span>
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!available || isAddingToCart}
          className={`w-full py-4 px-6 border-2 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 ${
            addedToCart
              ? "border-cs-green bg-cs-green text-white"
              : "border-navy text-navy hover:bg-navy hover:text-white"
          }`}
        >
          {isAddingToCart ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Adding...
            </>
          ) : addedToCart ? (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              ADDED TO CART
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              ADD TO CART
            </>
          )}
        </button>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          disabled={!available || isBuyingNow}
          className="w-full py-4 px-6 bg-navy text-white font-semibold rounded-lg hover:bg-navy/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isBuyingNow ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing...
            </>
          ) : (
            "BUY IT NOW"
          )}
        </button>
      </div>

      {/* Trust badges */}
      <div className="pt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          Secure Checkout
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          SSL Encrypted
        </div>
      </div>
    </div>
  );
}
