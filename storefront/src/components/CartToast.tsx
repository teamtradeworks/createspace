"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const show = () => {
      setVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 5000);
    };

    window.addEventListener("cart:item-added", show);
    return () => {
      window.removeEventListener("cart:item-added", show);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 bg-navy text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg whitespace-nowrap">
        <svg className="w-4 h-4 text-cs-green flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Added to your cart
        <Link
          href="/cart"
          onClick={() => setVisible(false)}
          className="text-cs-orange font-semibold hover:underline flex items-center gap-1"
        >
          View cart
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
