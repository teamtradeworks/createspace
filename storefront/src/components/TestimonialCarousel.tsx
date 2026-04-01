"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Testimonial {
  quote: string;
  name: string;
  school: string;
  logo?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(":scope > div")?.offsetWidth ?? 360;
    const gap = 24;
    const distance = direction === "left" ? -(cardWidth + gap) : cardWidth + gap;
    el.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="flex-none w-[320px] sm:w-[380px] snap-start bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm flex flex-col"
          >
            <svg
              className="w-8 h-8 text-cs-blue mb-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
            </svg>
            <p className="text-white/90 text-sm leading-relaxed mb-6 flex-1">{testimonial.quote}</p>
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              {testimonial.logo && (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 shrink-0">
                  <Image
                    src={testimonial.logo}
                    alt={`${testimonial.school} logo`}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="min-w-0">
                <p className="font-semibold text-white text-sm truncate">{testimonial.school}</p>
                <p className="text-white/50 text-xs truncate">{testimonial.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className={`absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all z-10 ${
          canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Previous reviews"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className={`absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all z-10 ${
          canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Next reviews"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Fade edges */}
      <div
        className={`absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-navy to-transparent pointer-events-none transition-opacity ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-navy to-transparent pointer-events-none transition-opacity ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
