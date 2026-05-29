"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SerializedAddon } from "@/lib/product-addons";

interface AddonUpsellModalProps {
  addons: SerializedAddon[];
  onConfirm: (selectedHandles: Set<string>) => void;
  onSkip: () => void;
}

export default function AddonUpsellModal({ addons, onConfirm, onSkip }: AddonUpsellModalProps) {
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSkip();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onSkip]);

  const toggleAddon = (handle: string) => {
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(handle)) {
        next.delete(handle);
      } else {
        next.add(handle);
      }
      return next;
    });
  };

  const availableAddons = addons.filter((a) => a.available);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onSkip} />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-navy">Complete your purchase</h3>
          <p className="text-sm text-gray-500 mt-1">These go great with your order:</p>
        </div>

        {/* Add-ons list */}
        <div className="space-y-3 mb-6 max-h-[50vh] overflow-y-auto">
          {availableAddons.map((addon) => (
            <label
              key={addon.handle}
              className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selectedAddons.has(addon.handle)
                  ? "border-cs-orange bg-orange-50/50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedAddons.has(addon.handle)}
                onChange={() => toggleAddon(addon.handle)}
                className="mt-1 w-4 h-4 text-cs-orange border-gray-300 rounded focus:ring-cs-orange"
              />
              {addon.image && (
                <div className="relative w-14 h-14 flex-shrink-0 rounded overflow-hidden bg-white border">
                  <Image src={addon.image} alt={addon.title} fill className="object-contain p-1" />
                </div>
              )}
              <div className="flex-grow min-w-0">
                <span className="text-sm font-medium text-navy line-clamp-2">
                  {addon.quantity > 1 ? `${addon.quantity} x ${addon.title}` : addon.title}
                </span>
                {addon.description && (
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{addon.description}</p>
                )}
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
                <div className="flex items-center gap-2 mt-1">
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
                  {addon.discountPercent > 0 && (
                    <span className="px-1.5 py-0.5 text-xs font-semibold bg-cs-green/10 text-cs-green rounded">
                      Save {addon.discountPercent}%
                    </span>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onConfirm(selectedAddons)}
            disabled={selectedAddons.size === 0}
            className="w-full py-3 px-6 bg-navy text-white font-semibold rounded-lg hover:bg-navy/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {selectedAddons.size > 0
              ? `ADD TO CART WITH ${selectedAddons.size === 1 ? "EXTRA" : "EXTRAS"}`
              : "SELECT AN EXTRA ABOVE"}
          </button>
          <button
            onClick={onSkip}
            className="w-full py-3 px-6 text-gray-500 hover:text-navy font-medium rounded-lg transition-colors text-sm"
          >
            No thanks, just add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
