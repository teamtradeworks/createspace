"use client";

import { useState, useEffect, ReactNode } from "react";

interface HeroCarouselClientProps {
  children: ReactNode;
  slideCount: number;
}

export default function HeroCarouselClient({ children, slideCount }: HeroCarouselClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLight, setIsLight] = useState(true);

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 6000);
    return () => clearInterval(timer);
  }, [slideCount]);

  // Update isLight based on current slide (slide 0 is light, others are dark)
  useEffect(() => {
    setIsLight(currentSlide === 0);
  }, [currentSlide]);

  return (
    <div
      className="hero-carousel-wrapper"
      data-current-slide={currentSlide}
      style={{ "--current-slide": currentSlide } as React.CSSProperties}
    >
      {children}

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: slideCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? `${isLight ? "bg-white" : "bg-cs-orange"} w-8`
                : `${isLight ? "bg-white/40 hover:bg-white/60" : "bg-gray-300 hover:bg-gray-400"}`
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount)}
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors z-20 ${
          isLight ? "bg-white/20 hover:bg-white/40" : "bg-white/80 hover:bg-white"
        }`}
        aria-label="Previous slide"
      >
        <svg
          className={`w-5 h-5 ${isLight ? "text-white" : "text-navy"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slideCount)}
        className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors z-20 ${
          isLight ? "bg-white/20 hover:bg-white/40" : "bg-white/80 hover:bg-white"
        }`}
        aria-label="Next slide"
      >
        <svg
          className={`w-5 h-5 ${isLight ? "text-white" : "text-navy"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
