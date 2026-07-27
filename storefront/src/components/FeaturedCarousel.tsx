"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { capture } from "@/lib/analytics";
import { StarRating } from "@/components/StarRating";
import type { FeaturedKit } from "@/lib/featured";

export default function FeaturedCarousel({ kits }: { kits: FeaturedKit[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Advance on a timer; reset whenever the slide changes or playback pauses.
  useEffect(() => {
    if (paused || reducedMotion || kits.length < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % kits.length), 6500);
    return () => clearTimeout(t);
  }, [index, paused, reducedMotion, kits.length]);

  if (kits.length === 0) return null;

  const safeIndex = index % kits.length;
  const kit = kits[safeIndex];
  const go = (next: number) => setIndex((next + kits.length) % kits.length);

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-3">Most loved kits</h2>
          <p className="text-gray-600">The kits our customers buy most.</p>
        </div>

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Featured kits"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div key={safeIndex} className="motion-safe:animate-fade-up">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Images */}
              <div className="space-y-3 sm:space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 ring-1 ring-gray-200/70">
                  {kit.images[0] && (
                    <Image
                      src={kit.images[0].url}
                      alt={kit.images[0].alt}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  )}
                  {kit.discountPercent > 0 && (
                    <span className="absolute top-4 left-4 bg-cs-red text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                      Save {kit.discountPercent}%
                    </span>
                  )}
                  {kit.ageLabel && (
                    <span className="absolute top-4 right-4 bg-navy/85 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                      {kit.ageLabel}
                    </span>
                  )}
                </div>
                {kit.images.length > 1 && (
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {kit.images.slice(1, 3).map((img) => (
                      <div
                        key={img.url}
                        className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 ring-1 ring-gray-200/70"
                      >
                        <Image
                          src={img.url}
                          alt={img.alt}
                          fill
                          className="object-contain p-3"
                          sizes="(max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div>
                <p className="text-sm font-medium text-gray-500">{kit.vendor}</p>
                <h3 className="mt-1 text-2xl md:text-3xl font-semibold text-navy leading-tight text-balance">
                  {kit.title}
                </h3>

                {kit.rating && (
                  <div className="mt-3 flex items-center gap-2">
                    <StarRating rating={kit.rating.average} size="md" />
                    <span className="text-sm text-gray-500">
                      {kit.rating.average} ({kit.rating.count} reviews)
                    </span>
                  </div>
                )}

                {kit.tagline && (
                  <p className="mt-4 text-gray-600 leading-relaxed max-w-prose">{kit.tagline}</p>
                )}

                {kit.points.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {kit.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <svg
                          className="w-5 h-5 text-cs-green flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 flex items-baseline gap-3">
                  <span
                    className={`text-2xl font-bold ${kit.compareAtPrice ? "text-cs-red" : "text-navy"}`}
                  >
                    {kit.price}
                  </span>
                  {kit.compareAtPrice && (
                    <span className="text-lg text-gray-400 line-through">{kit.compareAtPrice}</span>
                  )}
                </div>

                <div className="mt-6">
                  <Link
                    href={kit.href}
                    onClick={() =>
                      capture("product_clicked", { product_handle: kit.handle, source: "featured_carousel" })
                    }
                    className="inline-flex items-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 active:translate-y-px text-white rounded-lg font-semibold transition-all"
                  >
                    See the kit
                    <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          {kits.length > 1 && (
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2" role="tablist" aria-label="Choose a featured kit">
                {kits.map((k, i) => (
                  <button
                    key={k.handle}
                    type="button"
                    role="tab"
                    aria-label={`Show ${k.title}`}
                    aria-selected={i === safeIndex}
                    onClick={() => go(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === safeIndex ? "w-6 bg-navy" : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(safeIndex - 1)}
                  aria-label="Previous kit"
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-navy hover:border-navy/40 active:scale-95 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => go(safeIndex + 1)}
                  aria-label="Next kit"
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-navy hover:border-navy/40 active:scale-95 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/shop"
            onClick={() => capture("featured_products_view_all_clicked")}
            className="inline-flex items-center text-navy hover:text-cs-orange font-medium transition-colors"
          >
            View all products
            <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
