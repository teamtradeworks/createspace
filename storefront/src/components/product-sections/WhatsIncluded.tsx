"use client";

import { useState } from "react";
import Image from "next/image";
import SectionTracker from "./SectionTracker";

interface WhatsIncludedProps {
  title?: string;
  items: string[];
  image?: string;
  imageAlt?: string;
  background?: "white" | "gray";
}

export function WhatsIncluded({
  title = "What's in the Box",
  items,
  image,
  imageAlt = "Box contents",
  background = "gray",
}: WhatsIncludedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const bgClass = background === "gray" ? "bg-gray-50" : "bg-white";

  return (
    <SectionTracker name="WhatsIncluded">
      <section className={`${bgClass} lg:py-16`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Mobile: collapsible toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-full flex items-center justify-between px-5 py-4 my-3 text-left bg-navy rounded-xl shadow-sm"
          >
            <span className="text-base font-semibold text-white">{title}</span>
            <svg
              className={`w-5 h-5 text-cs-orange flex-shrink-0 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Desktop: static heading */}
          <h2 className="hidden lg:block text-3xl font-semibold text-navy mb-8">{title}</h2>

          {/* Content: collapsible on mobile, always visible on desktop */}
          <div
            className={`overflow-hidden transition-all duration-300 lg:overflow-visible lg:max-h-none lg:pb-0 ${
              isOpen ? "max-h-[3000px] pb-6" : "max-h-0"
            }`}
          >
            <div className={`grid gap-12 items-center ${image ? "lg:grid-cols-2" : ""}`}>
              {image && (
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white">
                  <Image src={image} alt={imageAlt} fill className="object-contain p-8" />
                </div>
              )}

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm"
                  >
                    <svg
                      className="w-5 h-5 text-cs-green flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SectionTracker>
  );
}
