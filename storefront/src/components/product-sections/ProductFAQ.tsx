"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  title?: string;
  faqs: FAQ[];
  background?: "white" | "gray";
}

export function ProductFAQ({
  title = "Frequently Asked Questions",
  faqs,
  background = "white",
}: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const bgClass = background === "gray" ? "bg-gray-50" : "bg-white";

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-navy text-center mb-10">
          {title}
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-navy pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-cs-orange flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
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

              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
