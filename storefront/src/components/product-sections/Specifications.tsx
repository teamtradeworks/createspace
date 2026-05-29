"use client";

import { useState } from "react";
import SectionTracker from "./SectionTracker";

interface Spec {
  label: string;
  value: string;
}

interface SpecificationsProps {
  title?: string;
  specs: Spec[];
  background?: "white" | "gray";
}

export function Specifications({
  title = "Specifications",
  specs,
  background = "gray",
}: SpecificationsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const bgClass = background === "gray" ? "bg-gray-50" : "bg-white";

  return (
    <SectionTracker name="Specifications">
      <section className={`${bgClass} lg:py-16`}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
          <h2 className="hidden lg:block text-3xl font-semibold text-navy text-center mb-10">
            {title}
          </h2>

          {/* Content: collapsible on mobile, always visible on desktop */}
          <div
            className={`overflow-hidden transition-all duration-300 lg:overflow-visible lg:max-h-none lg:pb-0 ${
              isOpen ? "max-h-[2000px] pb-6" : "max-h-0"
            }`}
          >
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <tbody>
                  {specs.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-6 py-4 text-sm font-medium text-navy w-1/3">
                        {spec.label}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </SectionTracker>
  );
}
