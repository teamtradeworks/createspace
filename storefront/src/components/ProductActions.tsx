"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { useCart } from "@/context/CartContext";
import { SerializedAddon } from "@/lib/product-addons";
import AddonUpsellModal from "./AddonUpsellModal";

interface ProductActionsProps {
  productId: string;
  variantId: string;
  available: boolean;
  currentlyNotInStock?: boolean;
  title: string;
  price: number;
  currencyCode: string;
  image?: string;
  handle: string;
  digital?: boolean;
  addons?: SerializedAddon[];
  defaultSelectedAddons?: string[];
  addonUpsellModal?: boolean;
}

export default function ProductActions({
  productId,
  variantId,
  available,
  currentlyNotInStock,
  title,
  price,
  currencyCode,
  image,
  handle,
  digital,
  addons = [],
  defaultSelectedAddons = [],
  addonUpsellModal = false,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set(defaultSelectedAddons));
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [upsellAction, setUpsellAction] = useState<"cart" | "buy">("cart");
  const { addItem } = useCart();

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const toggleAddon = (addonHandle: string) => {
    const isAdding = !selectedAddons.has(addonHandle);
    const addon = addons.find((a) => a.handle === addonHandle);

    setSelectedAddons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(addonHandle)) {
        newSet.delete(addonHandle);
      } else {
        newSet.add(addonHandle);
      }
      return newSet;
    });

    posthog.capture("addon_selected", {
      product_handle: handle,
      product_title: title,
      addon_handle: addonHandle,
      addon_title: addon?.title,
      addon_action: isAdding ? "added" : "removed",
    });
  };

  const performAddToCart = useCallback(async (addonHandles: Set<string>) => {
    setIsAddingToCart(true);

    // Add main product to cart
    addItem(
      {
        id: productId,
        variantId,
        title,
        price,
        currencyCode,
        image,
        handle,
        available,
        currentlyNotInStock,
        digital,
      },
      quantity
    );

    // Add selected add-ons to cart (with discounted price)
    const selectedAddonsData = addons.filter((addon) => addonHandles.has(addon.handle));
    for (const addon of selectedAddonsData) {
      const addonPrice = addon.discountPercent > 0
        ? addon.discountedPrice / addon.quantity
        : addon.originalPrice / addon.quantity;
      addItem(
        {
          id: addon.productId,
          variantId: addon.variantId,
          title: addon.title,
          price: addonPrice,
          currencyCode: addon.currencyCode,
          image: addon.image || undefined,
          handle: addon.handle,
          available: addon.available,
        },
        addon.quantity * quantity
      );
    }

    posthog.capture("product_added_to_cart", {
      product_handle: handle,
      product_title: title,
      product_price: price,
      currency_code: currencyCode,
      quantity,
      digital: digital ?? false,
      addon_count: selectedAddonsData.length,
      addon_handles: selectedAddonsData.map((a) => a.handle),
      $value: price * quantity,
    });

    // Show success state briefly
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsAddingToCart(false);
    setAddedToCart(true);

    // Reset success state after 2 seconds
    setTimeout(() => setAddedToCart(false), 2000);
  }, [addItem, productId, variantId, title, price, currencyCode, image, handle, available, currentlyNotInStock, digital, quantity, addons]);

  const handleAddToCart = async () => {
    if (!available) return;

    // If upsell modal is enabled, addons exist, and none are selected, show the modal
    const hasAvailableAddons = addons.some((a) => a.available);
    if (addonUpsellModal && hasAvailableAddons && selectedAddons.size === 0) {
      setUpsellAction("cart");
      setShowUpsellModal(true);
      return;
    }

    await performAddToCart(selectedAddons);
  };

  const handleUpsellConfirm = async (modalSelectedAddons: Set<string>) => {
    setShowUpsellModal(false);
    setSelectedAddons(modalSelectedAddons);
    if (upsellAction === "buy") {
      await performBuyNow(modalSelectedAddons);
    } else {
      await performAddToCart(modalSelectedAddons);
    }
  };

  const handleUpsellSkip = async () => {
    setShowUpsellModal(false);
    if (upsellAction === "buy") {
      await performBuyNow(new Set());
    } else {
      await performAddToCart(new Set());
    }
  };

  const performBuyNow = useCallback(async (addonHandles: Set<string>) => {
    setIsBuyingNow(true);

    // Add main product to cart first
    addItem(
      {
        id: productId,
        variantId,
        title,
        price,
        currencyCode,
        image,
        handle,
        available,
        currentlyNotInStock,
        digital,
      },
      quantity
    );

    // Add selected add-ons to cart (with discounted price)
    const selectedAddonsData = addons.filter((addon) => addonHandles.has(addon.handle));
    for (const addon of selectedAddonsData) {
      const addonPrice = addon.discountPercent > 0
        ? addon.discountedPrice / addon.quantity
        : addon.originalPrice / addon.quantity;
      addItem(
        {
          id: addon.productId,
          variantId: addon.variantId,
          title: addon.title,
          price: addonPrice,
          currencyCode: addon.currencyCode,
          image: addon.image || undefined,
          handle: addon.handle,
          available: addon.available,
        },
        addon.quantity * quantity
      );
    }

    posthog.capture("product_buy_now_clicked", {
      product_handle: handle,
      product_title: title,
      product_price: price,
      currency_code: currencyCode,
      quantity,
      digital: digital ?? false,
      addon_count: selectedAddonsData.length,
      addon_handles: selectedAddonsData.map((a) => a.handle),
      $value: price * quantity,
    });

    // Redirect to cart/checkout
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsBuyingNow(false);
    window.location.href = "/cart";
  }, [addItem, productId, variantId, title, price, currencyCode, image, handle, available, currentlyNotInStock, digital, quantity, addons]);

  const handleBuyNow = async () => {
    if (!available) return;

    const hasAvailableAddons = addons.some((a) => a.available);
    if (addonUpsellModal && hasAvailableAddons && selectedAddons.size === 0) {
      setUpsellAction("buy");
      setShowUpsellModal(true);
      return;
    }

    await performBuyNow(selectedAddons);
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
            aria-label="Decrease quantity"
            className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            aria-label="Increase quantity"
            className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Add-ons Section */}
      {addons.length > 0 && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="text-sm font-semibold text-navy mb-3">Complete your purchase:</p>
          <div className="space-y-3">
            {addons.map((addon) => (
              <label
                key={addon.handle}
                className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedAddons.has(addon.handle)
                    ? "border-cs-orange bg-white shadow-sm"
                    : "border-transparent bg-white hover:border-gray-200"
                } ${!addon.available ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={selectedAddons.has(addon.handle)}
                  onChange={() => addon.available && toggleAddon(addon.handle)}
                  disabled={!addon.available}
                  className="mt-1 w-4 h-4 text-cs-orange border-gray-300 rounded focus:ring-cs-orange"
                />
                {addon.image && (
                  <div className="relative w-14 h-14 flex-shrink-0 rounded overflow-hidden bg-white border">
                    <Image
                      src={addon.image}
                      alt={addon.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                )}
                <div className="flex-grow min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-navy line-clamp-2">
                          {addon.title}
                        </span>
                        {addon.description && (
                          <div className="relative group">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              onClick={(e) => e.preventDefault()}
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-navy text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48 text-center z-10 pointer-events-none">
                              {addon.description}
                              <div className="absolute top-full right-4 border-4 border-transparent border-t-navy" />
                            </div>
                          </div>
                        )}
                      </div>
                      {addon.viewProductLink && (
                        <Link
                          href={`/product/${addon.handle}`}
                          className="text-xs text-cs-orange hover:underline mt-0.5 inline-block"
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View product
                        </Link>
                      )}
                      {!addon.available && (
                        <p className="text-xs text-cs-red mt-0.5">Out of stock</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-2">
                        {addon.discountPercent > 0 && (
                          <span className="text-xs text-gray-400 line-through">
                            {addon.formattedOriginalPrice}
                          </span>
                        )}
                        <span className="text-sm font-bold text-navy">
                          {addon.discountPercent > 0
                            ? addon.formattedDiscountedPrice
                            : addon.formattedOriginalPrice}
                        </span>
                      </div>
                      {addon.discountPercent > 0 && (
                        <span className="inline-block mt-0.5 px-1.5 py-0.5 text-xs font-semibold bg-cs-green/10 text-cs-green rounded whitespace-nowrap">
                          Save {addon.discountPercent}%
                        </span>
                      )}
                    </div>
                  </div>
                  {quantity > 1 && selectedAddons.has(addon.handle) && (
                    <p className="text-xs text-gray-500 mt-1">
                      {quantity}x @ {addon.discountPercent > 0
                        ? addon.formattedDiscountedPrice
                        : addon.formattedOriginalPrice} each
                    </p>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

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

      {/* Addon Upsell Modal */}
      {showUpsellModal && (
        <AddonUpsellModal
          addons={addons}
          onConfirm={handleUpsellConfirm}
          onSkip={handleUpsellSkip}
        />
      )}
    </div>
  );
}
