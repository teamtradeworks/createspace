"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { capture } from "@/lib/analytics";
import { useCart } from "@/context/CartContext";
import { gtmAddToCart } from "@/lib/gtm";
import { formatPrice } from "@/lib/shopify";
import { SerializedAddon } from "@/lib/product-addons";
import VisibilityTracker from "@/components/VisibilityTracker";
import WhatsAppLink, { WHATSAPP_ICON } from "@/components/WhatsAppLink";

interface ProductActionsProps {
  productId: string;
  variantId: string;
  available: boolean;
  currentlyNotInStock?: boolean;
  title: string;
  price: number;
  compareAtPrice?: number;
  currencyCode: string;
  image?: string;
  handle: string;
  digital?: boolean;
  /** Offered after the item is in the cart, never between the price and the button. */
  addons?: SerializedAddon[];
  /** Shown beside the price in the sticky phone bar, e.g. "Ages 8-12". */
  ageRange?: string | null;
}

/** Body class that lifts the floating WhatsApp button and cart toast above the sticky bar. */
const STICKY_BAR_BODY_CLASS = "sticky-buy";

const CART_ICON = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const TICK_ICON = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const SPINNER = (
  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

function addonUnitPrice(addon: SerializedAddon) {
  return addon.discountPercent > 0
    ? addon.discountedPrice / addon.quantity
    : addon.originalPrice / addon.quantity;
}

export default function ProductActions({
  productId,
  variantId,
  available,
  currentlyNotInStock,
  title,
  price,
  compareAtPrice,
  currencyCode,
  image,
  handle,
  digital,
  addons = [],
  ageRange,
}: ProductActionsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [addedAddons, setAddedAddons] = useState<Set<string>>(new Set());
  const [stickyVisible, setStickyVisible] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const nudgeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { addItem } = useCart();

  const pendingAddons = addons.filter((a) => a.available && !addedAddons.has(a.handle));
  const formattedPrice = formatPrice(price, currencyCode);

  // Sticky bar: show once the hero button has scrolled off the top of the screen.
  useEffect(() => {
    const el = buttonRef.current;
    if (!el || !available || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setStickyVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [available]);

  useEffect(() => {
    document.body.classList.toggle(STICKY_BAR_BODY_CLASS, stickyVisible);
    return () => document.body.classList.remove(STICKY_BAR_BODY_CLASS);
  }, [stickyVisible]);

  useEffect(() => {
    return () => {
      if (nudgeTimer.current) clearTimeout(nudgeTimer.current);
    };
  }, []);

  // Keep the nudge open while there is still an add-on to offer; otherwise let it fade.
  const scheduleNudgeHide = useCallback((hasPending: boolean) => {
    if (nudgeTimer.current) clearTimeout(nudgeTimer.current);
    if (hasPending) return;
    nudgeTimer.current = setTimeout(() => setShowNudge(false), 5000);
  }, []);

  const handleAddToCart = useCallback(
    async (source: "hero" | "sticky_bar") => {
      if (!available || isAdding) return;
      setIsAdding(true);

      addItem(
        {
          id: productId,
          variantId,
          title,
          price,
          compareAtPrice,
          currencyCode,
          image,
          handle,
          available,
          currentlyNotInStock,
          digital,
        },
        1,
      );

      capture("product_added_to_cart", {
        product_handle: handle,
        product_title: title,
        product_price: price,
        currency_code: currencyCode,
        quantity: 1,
        digital: digital ?? false,
        addon_count: 0,
        addon_handles: [],
        source,
        $value: price,
      });

      gtmAddToCart(
        [{ item_id: handle, item_name: title, price, currency: currencyCode, quantity: 1 }],
        price,
        currencyCode,
      );

      // Show success state briefly
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsAdding(false);
      setAdded(true);
      setShowNudge(true);
      scheduleNudgeHide(pendingAddons.length > 0);
      setTimeout(() => setAdded(false), 2000);
    },
    [
      available,
      isAdding,
      addItem,
      productId,
      variantId,
      title,
      price,
      compareAtPrice,
      currencyCode,
      image,
      handle,
      currentlyNotInStock,
      digital,
      pendingAddons.length,
      scheduleNudgeHide,
    ],
  );

  const handleAddAddon = (addon: SerializedAddon) => {
    const unitPrice = addonUnitPrice(addon);
    addItem(
      {
        id: addon.productId,
        variantId: addon.variantId,
        title: addon.title,
        price: unitPrice,
        compareAtPrice: addon.discountPercent > 0 ? addon.originalPrice / addon.quantity : undefined,
        currencyCode: addon.currencyCode,
        image: addon.image || undefined,
        handle: addon.handle,
        available: addon.available,
      },
      addon.quantity,
    );

    capture("addon_selected", {
      product_handle: handle,
      product_title: title,
      addon_handle: addon.handle,
      addon_title: addon.title,
      addon_action: "added",
    });
    gtmAddToCart(
      [
        {
          item_id: addon.handle,
          item_name: addon.title,
          price: unitPrice,
          currency: addon.currencyCode,
          quantity: addon.quantity,
        },
      ],
      unitPrice * addon.quantity,
      addon.currencyCode,
    );

    const next = new Set(addedAddons);
    next.add(addon.handle);
    setAddedAddons(next);
    scheduleNudgeHide(addons.some((a) => a.available && !next.has(a.handle)));
  };

  const buttonLabel = isAdding ? (
    <>
      {SPINNER}
      Adding...
    </>
  ) : added ? (
    <>
      {TICK_ICON}
      Added to cart
    </>
  ) : !available ? (
    "Out of stock"
  ) : (
    <>
      {CART_ICON}
      <span>
        Add to cart <span aria-hidden="true">·</span>{" "}
        <span className="sr-only">for </span>
        {formattedPrice}
      </span>
    </>
  );

  const buttonClass = added
    ? "bg-cs-green text-navy"
    : "bg-cs-orange text-navy hover:bg-navy hover:text-white disabled:bg-gray-100 disabled:text-gray-600";

  return (
    <div className="space-y-3">
      <VisibilityTracker event="product_atc_visible" properties={{ product_handle: handle }}>
        <div ref={buttonRef}>
          <button
            type="button"
            onClick={() => handleAddToCart("hero")}
            disabled={!available || isAdding}
            className={`w-full py-4 px-6 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 transition-colors active:translate-y-px disabled:cursor-not-allowed disabled:active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 ${buttonClass}`}
          >
            {buttonLabel}
          </button>
        </div>
      </VisibilityTracker>

      {/* Out of stock: a way to ask, instead of a dead end */}
      {!available && (
        <WhatsAppLink
          location="product_out_of_stock"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline-offset-4 hover:text-cs-orange hover:underline"
        >
          <svg className="h-5 w-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d={WHATSAPP_ICON} />
          </svg>
          Ask us on WhatsApp when it&apos;s back
        </WhatsAppLink>
      )}

      {/* After adding: confirmation, the cart, and the add-on it needs */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showNudge ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-live="polite"
      >
        <div className="rounded-lg bg-cs-green/10 border border-cs-green/30 px-4 py-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-navy font-medium">
              <svg className="w-4 h-4 text-cs-green flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Added to your cart
            </span>
            <Link
              href="/cart"
              className="text-navy font-semibold underline decoration-cs-orange decoration-2 underline-offset-4 hover:text-cs-orange whitespace-nowrap flex items-center gap-1"
            >
              View cart
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {showNudge &&
            addons
              .filter((addon) => addon.available)
              .map((addon) => {
                const isAdded = addedAddons.has(addon.handle);
                const label = addon.quantity > 1 ? `${addon.quantity} x ${addon.title}` : addon.title;
                return (
                  <div
                    key={addon.handle}
                    className="mt-3 flex items-center justify-between gap-3 border-t border-cs-green/30 pt-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {addon.image && (
                        <div className="relative w-10 h-10 flex-shrink-0 rounded-md overflow-hidden bg-white border border-gray-200">
                          <Image src={addon.image} alt="" fill sizes="40px" className="object-contain p-0.5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-navy font-medium leading-snug">{label}</p>
                        <p className="text-gray-600 text-xs">
                          {addon.description ? `${addon.description} · ` : ""}
                          {addon.discountPercent > 0 ? (
                            <>
                              <span className="line-through">{addon.formattedOriginalPrice}</span>{" "}
                              <span className="font-semibold text-navy">{addon.formattedDiscountedPrice}</span>{" "}
                              (save {addon.discountPercent}%)
                            </>
                          ) : (
                            <span className="font-semibold text-navy">{addon.formattedOriginalPrice}</span>
                          )}
                        </p>
                      </div>
                    </div>
                    {isAdded ? (
                      <span className="flex-shrink-0 inline-flex items-center gap-1 text-navy font-semibold">
                        {TICK_ICON}
                        Added
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddAddon(addon)}
                        className="flex-shrink-0 rounded-lg border-2 border-navy px-3 py-1.5 font-semibold text-navy transition-colors hover:bg-navy hover:text-white active:translate-y-px"
                      >
                        Add
                      </button>
                    )}
                  </div>
                );
              })}
        </div>
      </div>

      {/* Sticky phone bar: the price and the button follow the parent down the page */}
      {available && (
        <div
          className={`lg:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 motion-reduce:transition-none ${
            stickyVisible ? "translate-y-0" : "translate-y-full"
          }`}
          aria-hidden={!stickyVisible}
          inert={!stickyVisible}
        >
          <div className="border-t border-gray-200 bg-white/95 backdrop-blur-sm px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgba(12,20,70,0.25)]">
            <div className="mx-auto flex max-w-7xl items-center gap-3">
              {image && (
                <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
                  <Image src={image} alt="" fill sizes="44px" className="object-contain p-0.5" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-navy">{title}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-navy">{formattedPrice}</span>
                  {ageRange && <> · {ageRange}</>}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleAddToCart("sticky_bar")}
                disabled={isAdding}
                className={`flex-shrink-0 rounded-lg px-4 py-3 text-sm font-semibold transition-colors active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 ${
                  added ? "bg-cs-green text-navy" : "bg-cs-orange text-navy hover:bg-navy hover:text-white"
                }`}
              >
                {added ? "Added" : "Add to cart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
