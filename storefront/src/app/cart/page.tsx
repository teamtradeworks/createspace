"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { capture } from "@/lib/analytics";
import { useCart, getAvailableItems } from "@/context/CartContext";
import { gtmViewCart, gtmBeginCheckout } from "@/lib/gtm";
import { formatPrice } from "@/lib/shopify";
import {
  DELIVERY_CONFIG,
  qualifiesForFreeDelivery,
  calculateDeliveryCost,
  amountToFreeDelivery,
} from "@/config/delivery";
import TrustBadges from "@/components/TrustBadges";
import siteConfig from "@/config/site.json";

export default function CartPage() {
  const { items, itemCount, subtotal, currencyCode, isHydrated, updateQuantity, removeItem } =
    useCart();

  const totalDiscount = getAvailableItems(items).reduce((sum, item) => {
    if (item.compareAtPrice && item.compareAtPrice > item.price) {
      return sum + (item.compareAtPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const viewCartFired = useRef(false);

  // Reset the checkout button if the user returns via the browser's bfcache
  // (e.g. clicking back from Shopify checkout) — otherwise it stays stuck on
  // "Redirecting to Checkout..."
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setIsCheckingOut(false);
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  useEffect(() => {
    if (isHydrated && items.length > 0 && !viewCartFired.current) {
      viewCartFired.current = true;
      const available = getAvailableItems(items);
      gtmViewCart(
        available.map((item, index) => ({
          item_id: item.handle,
          item_name: item.title,
          price: item.price,
          currency: item.currencyCode,
          quantity: item.quantity,
          index,
        })),
        subtotal,
        currencyCode,
      );
      capture("cart_viewed", {
        item_count: available.length,
        subtotal,
        currency_code: currencyCode,
        qualifies_for_free_delivery: qualifiesForFreeDelivery(subtotal),
        product_handles: available.map((item) => item.handle),
      });
    }
  }, [isHydrated, items, subtotal, currencyCode]);

  // Sort items: available first, then unavailable
  const sortedItems = [...items].sort((a, b) => {
    const aUnavailable = a.available === false ? 1 : 0;
    const bUnavailable = b.available === false ? 1 : 0;
    return aUnavailable - bUnavailable;
  });

  const handleCheckout = async () => {
    const available = getAvailableItems(items);
    if (available.length === 0) return;

    capture("checkout_initiated", {
      item_count: available.length,
      subtotal,
      currency_code: currencyCode,
      qualifies_for_free_delivery: qualifiesForFreeDelivery(subtotal),
      product_handles: available.map((item) => item.handle),
      $value: subtotal,
    });

    gtmBeginCheckout(
      available.map((item, index) => ({
        item_id: item.handle,
        item_name: item.title,
        price: item.price,
        currency: item.currencyCode,
        quantity: item.quantity,
        index,
      })),
      subtotal,
      currencyCode,
    );
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: available.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
            handle: item.handle,
          })),
        }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error("Checkout error:", data.error);
        setIsCheckingOut(false);
      }
    } catch (e) {
      console.error("Checkout failed:", e);
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-cs-orange">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-navy font-medium">Your Shopping Cart</span>
          </nav>
        </div>
      </div>

      {/* Cart Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-navy mb-8">Your Shopping Cart</h1>

          {!isHydrated ? (
            /* Loading State */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="animate-spin h-10 w-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              </div>
              <p className="text-gray-500">Loading your cart...</p>
            </div>
          ) : items.length === 0 ? (
            /* Empty Cart State */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                Your cart is currently empty.
              </h2>
              <p className="text-gray-600 mb-8">
                Continue browsing{" "}
                <Link href="/shop" className="text-cs-orange hover:underline">
                  here
                </Link>
                .
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center px-6 py-3 bg-navy hover:bg-navy/90 text-white rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            /* Cart with Items */
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-8">
                {/* Table Header */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-medium text-gray-500">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-gray-200">
                  {sortedItems.map((item) => {
                    const isUnavailable = item.available === false;
                    return (
                      <div
                        key={item.variantId}
                        className={`py-6 grid grid-cols-12 gap-4 items-center${isUnavailable ? " opacity-50" : ""}`}
                      >
                        {/* Product Image & Info */}
                        <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                          <Link
                            href={`/product/${item.handle}`}
                            className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden"
                          >
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.title}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg
                                  className="w-8 h-8 text-gray-300"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                  />
                                </svg>
                              </div>
                            )}
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/product/${item.handle}`}
                              className="text-navy font-medium hover:text-cs-orange transition-colors line-clamp-2"
                            >
                              {item.title}
                            </Link>
                            {isUnavailable ? (
                              <span className="inline-flex items-center gap-1 text-xs text-cs-red mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-cs-red" />
                                Out of Stock — excluded from order
                              </span>
                            ) : item.digital ? (
                              <span className="inline-flex items-center gap-1 text-xs text-cs-green mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-cs-green" />
                                Online Course
                              </span>
                            ) : item.currentlyNotInStock ? (
                              <span className="inline-flex items-center gap-1 text-xs text-cs-orange mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-cs-orange" />
                                Delivery in {siteConfig.leadTime.estimatedDays}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs text-cs-green mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-cs-green" />
                                In Stock
                              </span>
                            )}
                            <button
                              onClick={() => {
                                capture("product_removed_from_cart", {
                                  product_handle: item.handle,
                                  product_title: item.title,
                                  price: item.price,
                                  currency_code: item.currencyCode,
                                  quantity: item.quantity,
                                });
                                removeItem(item.variantId);
                              }}
                              className="mt-1 text-sm text-gray-500 hover:text-cs-red transition-colors flex items-center gap-1 block"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-4 md:col-span-2 text-center">
                          <span className="md:hidden text-sm text-gray-500 mr-2">Price:</span>
                          {item.compareAtPrice && item.compareAtPrice > item.price && !isUnavailable ? (
                            <span className="flex flex-col items-center gap-0.5">
                              <span className="text-gray-400 line-through text-sm">
                                {formatPrice(item.compareAtPrice, item.currencyCode, { showCents: true })}
                              </span>
                              <span className="text-cs-red font-medium">
                                {formatPrice(item.price, item.currencyCode, { showCents: true })}
                              </span>
                            </span>
                          ) : (
                            <span
                              className={
                                isUnavailable ? "text-gray-400 line-through" : "text-gray-700"
                              }
                            >
                              {formatPrice(item.price, item.currencyCode, { showCents: true })}
                            </span>
                          )}
                        </div>

                        {/* Quantity */}
                        <div className="col-span-4 md:col-span-2 flex justify-center">
                          {isUnavailable ? (
                            <span className="text-sm text-gray-400">—</span>
                          ) : (
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() => {
                                  capture("cart_quantity_changed", {
                                    product_handle: item.handle,
                                    product_title: item.title,
                                    previous_quantity: item.quantity,
                                    new_quantity: item.quantity - 1,
                                    direction: "decrease",
                                  });
                                  updateQuantity(item.variantId, item.quantity - 1);
                                }}
                                disabled={item.quantity <= 1}
                                className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 12H4"
                                  />
                                </svg>
                              </button>
                              <span className="w-10 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => {
                                  capture("cart_quantity_changed", {
                                    product_handle: item.handle,
                                    product_title: item.title,
                                    previous_quantity: item.quantity,
                                    new_quantity: item.quantity + 1,
                                    direction: "increase",
                                  });
                                  updateQuantity(item.variantId, item.quantity + 1);
                                }}
                                className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Line Total */}
                        <div className="col-span-4 md:col-span-2 text-right">
                          <span className="md:hidden text-sm text-gray-500 mr-2">Total:</span>
                          <span
                            className={
                              isUnavailable
                                ? "text-gray-400 line-through"
                                : "font-semibold text-navy"
                            }
                          >
                            {formatPrice(item.price * item.quantity, item.currencyCode, { showCents: true })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-navy mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>{formatPrice(subtotal + totalDiscount, currencyCode, { showCents: true })}</span>
                    </div>
                    {totalDiscount > 0 && (
                      <div className="flex justify-between text-cs-red">
                        <span>Discount</span>
                        <span>-{formatPrice(totalDiscount, currencyCode, { showCents: true })}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-1">
                        Delivery
                        <span className="relative group">
                          <svg
                            className="w-4 h-4 text-gray-400 cursor-help"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-navy text-white text-xs rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                            We dispatch your order today, or tomorrow if placed after 3PM.
                            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy"></span>
                          </span>
                        </span>
                      </span>
                      {qualifiesForFreeDelivery(subtotal) ? (
                        <span className="text-cs-green font-semibold">FREE</span>
                      ) : (
                        <span>
                          {formatPrice(DELIVERY_CONFIG.standardDeliveryCost, currencyCode, { showCents: true })}
                        </span>
                      )}
                    </div>
                    {!qualifiesForFreeDelivery(subtotal) && subtotal > 0 && (
                      <p className="text-xs text-cs-orange">
                        Add {formatPrice(amountToFreeDelivery(subtotal), currencyCode, { showCents: true })} more for
                        FREE delivery!
                      </p>
                    )}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-lg font-semibold text-navy">
                      <span>Total</span>
                      <span>
                        {formatPrice(subtotal + calculateDeliveryCost(subtotal), currencyCode, { showCents: true })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">VAT included.</p>
                    <p className="text-xs text-cs-blue mt-2 flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Next day delivery option available at checkout
                    </p>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut || itemCount === 0}
                    className="w-full py-4 bg-cs-orange hover:bg-cs-orange/90 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Redirecting to Checkout...
                      </>
                    ) : (
                      <>
                        Proceed to Checkout
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* Continue Shopping */}
                  <Link
                    href="/shop"
                    className="w-full mt-3 py-3 border border-navy text-navy font-medium rounded-lg hover:bg-navy hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    Continue Shopping
                  </Link>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm">
                      <svg
                        className="w-5 h-5 text-cs-green flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                        />
                      </svg>
                      <span>
                        <span className="font-medium text-navy">Secure Checkout</span>
                        <span className="text-gray-500">
                          {" "}
                          &middot; Protected by Stitch Payments
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3 ml-7">
                      {["Mastercard", "Visa", "Apple Pay", "Capitec Pay", "Buy Now Pay Later"].map(
                        (method) => (
                          <span
                            key={method}
                            className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded"
                          >
                            {method}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges Section */}
      <TrustBadges />
    </>
  );
}
