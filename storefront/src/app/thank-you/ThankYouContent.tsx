"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ThankYouContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const cleared = useRef(false);

  useEffect(() => {
    if (!cleared.current) {
      cleared.current = true;
      clearCart();
    }
  }, [clearCart]);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Success icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-cs-green/10">
          <svg
            className="h-10 w-10 text-cs-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold text-navy mb-4">
          Thank You for Your Order!
        </h1>

        {orderNumber && (
          <p className="text-lg text-gray-600 mb-2">
            Order number: <span className="font-semibold text-navy">{orderNumber}</span>
          </p>
        )}

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Your order has been placed successfully. You&apos;ll receive a confirmation email
          shortly with your order details and delivery updates.
        </p>

        <div className="rounded-xl bg-gray-50 p-6 mb-8 text-left max-w-md mx-auto">
          <h2 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">
            What happens next?
          </h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <svg
                className="h-5 w-5 text-cs-orange flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <span>A confirmation email is on its way to your inbox.</span>
            </li>
            <li className="flex gap-3">
              <svg
                className="h-5 w-5 text-cs-orange flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125V14.25m0 0V5.625c0-.621.504-1.125 1.125-1.125h3.026a2.999 2.999 0 012.426 1.244l.307.41a.75.75 0 00.614.321H19.5a1.125 1.125 0 011.125 1.125V14.25m-17.25 0h17.25"
                />
              </svg>
              <span>
                We&apos;ll dispatch your order as quickly as possible. Delivery
                updates will be sent to you by email via The Courier Guy.
              </span>
            </li>
            <li className="flex gap-3">
              <svg
                className="h-5 w-5 text-cs-orange flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              <span>
                Have a question?{" "}
                <Link href="/contact" className="text-cs-orange hover:underline">
                  Get in touch
                </Link>{" "}
                — we&apos;re happy to help.
              </span>
            </li>
          </ul>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-navy/90"
        >
          Continue Shopping
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
