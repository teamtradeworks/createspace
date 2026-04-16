"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

interface HeroCarouselClientProps {
  children: ReactNode;
  slideCount: number;
  slideTextColors: ("light" | "dark")[];
}

export default function HeroCarouselClient({ children, slideCount, slideTextColors }: HeroCarouselClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  // Prevent scroll listener from fighting programmatic scrollTo
  const isScrollingProgrammatically = useRef(false);

  const isLight = slideTextColors[currentSlide] === "light";

  // Auto-rotate slides, pausing on hover
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 7000);
    return () => clearInterval(timer);
  }, [slideCount, paused]);

  // Scroll track to current slide on mobile (track only scrolls when it's a flex container)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Only scrollable on mobile (scrollWidth > clientWidth means flex overflow is active)
    if (track.scrollWidth > track.clientWidth + 10) {
      isScrollingProgrammatically.current = true;
      track.scrollTo({ left: currentSlide * track.clientWidth, behavior: "smooth" });
      const t = setTimeout(() => { isScrollingProgrammatically.current = false; }, 700);
      return () => clearTimeout(t);
    }
  }, [currentSlide]);

  // Update currentSlide when user swipes on mobile
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let scrollTimer: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      if (isScrollingProgrammatically.current) return;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const width = track.clientWidth;
        if (width === 0) return;
        const index = Math.round(track.scrollLeft / width);
        setCurrentSlide(Math.min(Math.max(index, 0), slideCount - 1));
      }, 100);
    };
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
  }, [slideCount]);

  return (
    <div
      className="hero-carousel-wrapper"
      data-current-slide={currentSlide}
      style={{ "--current-slide": currentSlide } as React.CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Carousel track: scroll container on mobile, positioning context on desktop */}
      <div ref={trackRef} className="hero-carousel-track">
        {children}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: slideCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="relative flex items-center justify-center w-11 h-11"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`block h-3 rounded-full transition-all ${
                index === currentSlide
                  ? `${isLight ? "bg-white" : "bg-cs-orange"} w-8`
                  : `${isLight ? "bg-white/40 hover:bg-white/60" : "bg-gray-300 hover:bg-gray-400"} w-3`
              }`}
            />
          </button>
        ))}
      </div>

      {/* Navigation arrows - hidden on mobile */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount)}
        className={`hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-lg items-center justify-center transition-colors z-20 ${
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
        className={`hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-lg items-center justify-center transition-colors z-20 ${
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
