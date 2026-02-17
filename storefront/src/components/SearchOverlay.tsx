"use client";

import { useEffect, useCallback } from "react";
import SearchInput from "@/components/SearchInput";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <div
      className={`absolute top-full left-0 right-0 z-50 transition-all duration-200 ${
        isOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-2 pointer-events-none"
      }`}
    >
      <div className="bg-navy border-t border-white/10 shadow-xl">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <SearchInput autoFocus={isOpen} onSubmit={onClose} />
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2"
              aria-label="Close search"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
