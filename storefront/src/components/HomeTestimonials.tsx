"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    quote:
      "Our homeschool group have loved working with their Makerzoid kits this term. They have found the builds to be challenging and interesting and have been able to apply creativity in adding on their own ideas.",
    author: "Michelle Edwards",
    role: "Educational Psychologist, Durban",
    rating: 5,
  },
  {
    quote:
      "CREATESPACE is our go to for high quality hardware and accessories. Their extensive range and technical reliability make them an invaluable partner, and their expertise and efficient service allow us to focus on our mission to deliver world class STEAM education. Partnering with the CREATESPACE team has been a game changer for us.",
    author: "Simon Robinson",
    role: "CEO, Inspire Africa",
    rating: 5,
  },
  {
    quote:
      "CREATESPACE has consistently demonstrated exceptional service, setting themselves apart as the best in their field. Their dedication and professionalism have made every interaction a positive experience. It is truly an honour to collaborate with CREATESPACE, and their outstanding support continues to strengthen our working relationship.",
    author: "Erus Pretorius",
    role: "CEO, Robotixkids",
    rating: 5,
  },
  {
    quote:
      "We purchased just over 100 robotics kits last year, and the quality has been excellent. Our school clients really loved them\u2014they\u2019ve been engaging, reliable, and a great addition to the learning experience.",
    author: "Zami Mokhali",
    role: "Founder, JustMi-Kid",
    rating: 5,
  },
];

export default function HomeTestimonials() {
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
    const cardWidth =
      el.querySelector<HTMLElement>(":scope > div")?.offsetWidth ?? 400;
    const gap = 24;
    const distance = direction === "left" ? -(cardWidth + gap) : cardWidth + gap;
    el.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex-none w-[82vw] sm:w-[380px] md:w-[400px] snap-start bg-gray-50 rounded-2xl p-8 relative"
          >
            {/* Quote icon */}
            <div className="absolute top-6 right-6 text-cs-orange/20">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-cs-yellow"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              &ldquo;{testimonial.quote}&rdquo;
            </p>

            {/* Author */}
            <div>
              <p className="font-semibold text-navy">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className={`absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white hover:bg-gray-100 border border-gray-200 shadow-sm flex items-center justify-center transition-all z-10 ${
          canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Previous testimonials"
      >
        <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className={`absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white hover:bg-gray-100 border border-gray-200 shadow-sm flex items-center justify-center transition-all z-10 ${
          canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Next testimonials"
      >
        <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
