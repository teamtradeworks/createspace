"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type SlideType = "hero" | "product" | "lifestyle";

interface Slide {
  id: string;
  type: SlideType;
  tag?: string;
  headline: string;
  description: string;
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  productImage?: string;
  heroImage?: string;
  lifestyleImages?: string[];
  bgColor: string;
  textColor?: "light" | "dark";
}

const slides: Slide[] = [
  {
    id: "main",
    type: "hero",
    headline: "Build. Play. Learn.",
    description:
      "Curated STEM kits that ignite innovation and creativity. Inspire the next generation of scientists, engineers, and creators.",
    cta: { label: "Shop Now", href: "/shop" },
    ctaSecondary: { label: "For Educators", href: "/education" },
    heroImage: "/images/hero-illustration.jpg",
    bgColor: "bg-navy",
    textColor: "light",
  },
  {
    id: "makerzoid",
    type: "product",
    tag: "Makerzoid - STEM Building Blocks",
    headline: "Build, Code, Create!",
    description:
      "Makerzoid combines building blocks with coding to create an engaging STEM learning experience. Perfect for ages 6-12 to explore robotics and programming.",
    cta: { label: "Shop Makerzoid", href: "/shop?brand=makerzoid" },
    productImage: "https://www.makerzoid.com/cdn/shop/files/20230309194446.jpg?v=1699611326&width=533",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    textColor: "dark",
  },
  {
    id: "tutoring",
    type: "lifestyle",
    tag: "STEM Tutoring Programme",
    headline: "Expert STEM Tutors for Your School",
    description:
      "Bring hands-on robotics and coding education to your learners. Our trained facilitators run engaging workshops and after-school programmes tailored to your curriculum.",
    cta: { label: "Book a Session", href: "/education/tutors" },
    lifestyleImages: [
      "https://robotixkids.co.za/wp-content/uploads/elementor/thumbs/4-pgrp75uk4n1og08hqbwv16z5xjgtw8rbwivv1c37x2.png",
      "https://robotixkids.co.za/wp-content/uploads/elementor/thumbs/RobotiX-Kids-fotos-6-qgp4jdmjfuahknp1m6cv27xb59nb4q0s19pvkwpcd2.png",
      "https://robotixkids.co.za/wp-content/uploads/elementor/thumbs/9-pgrp7lttctnjxdla50tipky013a2j3irmpz471fiza.png",
    ],
    bgColor: "bg-gradient-to-br from-orange-50 to-yellow-50",
    textColor: "dark",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];
  const isLight = slide.textColor === "light";

  return (
    <section className={`relative overflow-hidden min-h-[500px] ${slide.bgColor} transition-colors duration-500`}>
      {/* Hero type - full width image on right */}
      {slide.type === "hero" && (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="py-12 lg:py-20">
              <div className={`max-w-xl ${isLight ? "text-white" : "text-navy"}`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
                  {slide.headline}
                </h1>
                <p className={`text-lg md:text-xl mb-8 max-w-lg ${isLight ? "text-white/80" : "text-gray-600"}`}>
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={slide.cta.href}
                    className="inline-flex items-center px-8 py-4 bg-cs-red hover:bg-cs-red/90 text-white rounded-lg font-semibold transition-colors"
                  >
                    {slide.cta.label}
                    <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  {slide.ctaSecondary && (
                    <Link
                      href={slide.ctaSecondary.href}
                      className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold transition-colors ${
                        isLight
                          ? "bg-white/10 hover:bg-white/20 border border-white/20"
                          : "bg-navy/10 hover:bg-navy/20 border border-navy/20"
                      }`}
                    >
                      {slide.ctaSecondary.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute top-0 right-0 h-full w-1/2">
            <Image
              src={slide.heroImage!}
              alt="STEM Education"
              fill
              className="object-cover object-right"
              priority
            />
          </div>
        </>
      )}

      {/* Product or Lifestyle type */}
      {(slide.type === "product" || slide.type === "lifestyle") && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px] py-12 lg:py-0">
            {/* Left content */}
            <div className="z-10">
              {slide.tag && (
                <span className="inline-block text-cs-orange font-medium text-sm uppercase tracking-wider mb-3">
                  {slide.tag}
                </span>
              )}
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight ${isLight ? "text-white" : "text-navy"}`}>
                {slide.headline}
              </h1>
              <p className={`text-lg md:text-xl mb-8 max-w-lg ${isLight ? "text-white/80" : "text-gray-600"}`}>
                {slide.description}
              </p>
              <Link
                href={slide.cta.href}
                className="inline-flex items-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 text-white rounded-full font-semibold transition-colors"
              >
                {slide.cta.label}
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Right content */}
            <div className="relative h-[350px] lg:h-[450px]">
              {slide.type === "product" && slide.productImage && (
                <div className="relative h-full">
                  {/* Decorative shapes */}
                  <div className="absolute top-10 right-10 w-32 h-32 bg-cs-yellow rounded-full opacity-60" />
                  <div className="absolute bottom-20 right-32 w-20 h-20 bg-cs-green rounded-full opacity-50" />
                  <div className="absolute top-1/2 right-0 w-16 h-16 bg-cs-blue rounded-full opacity-40" />

                  {/* Product image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full max-w-md">
                      <Image
                        src={slide.productImage}
                        alt="Makerzoid STEM Kit"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>
              )}

              {slide.type === "lifestyle" && slide.lifestyleImages && (
                <div className="relative h-full">
                  {/* Decorative shapes */}
                  <div className="absolute top-0 right-20 w-24 h-24 bg-cs-orange rounded-full opacity-30" />
                  <div className="absolute bottom-10 left-10 w-16 h-16 bg-cs-blue rounded-full opacity-30" />

                  {/* Photo collage */}
                  <div className="absolute top-0 right-0 w-48 h-36 rounded-2xl overflow-hidden shadow-lg transform rotate-3">
                    <Image
                      src={slide.lifestyleImages[0]}
                      alt="Kids learning robotics"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-24 left-8 w-52 h-40 rounded-2xl overflow-hidden shadow-lg transform -rotate-2">
                    <Image
                      src={slide.lifestyleImages[1]}
                      alt="STEM education workshop"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-8 right-12 w-44 h-32 rounded-2xl overflow-hidden shadow-lg transform rotate-1">
                    <Image
                      src={slide.lifestyleImages[2]}
                      alt="Robotics class"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
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
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors z-20 ${
          isLight ? "bg-white/20 hover:bg-white/40" : "bg-white/80 hover:bg-white"
        }`}
        aria-label="Previous slide"
      >
        <svg className={`w-5 h-5 ${isLight ? "text-white" : "text-navy"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors z-20 ${
          isLight ? "bg-white/20 hover:bg-white/40" : "bg-white/80 hover:bg-white"
        }`}
        aria-label="Next slide"
      >
        <svg className={`w-5 h-5 ${isLight ? "text-white" : "text-navy"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
