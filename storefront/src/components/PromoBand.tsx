"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { capture } from "@/lib/analytics";
import { PROMOS } from "@/config/promo";

// A slim, full-bleed promo strip under the hero that rotates through a handful
// of offers. Navigable with the side arrows and a gentle auto-advance (paused
// on hover and for reduced-motion users). Content lives in config/promo.ts.
export default function PromoBand() {
  const count = PROMOS.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (dir: number) => {
    capture("home_promo_band_nav_clicked", { direction: dir > 0 ? "next" : "prev" });
    setIndex((i) => (i + dir + count) % count);
  };

  // Auto-advance — skipped for a single promo, on hover, or under reduced motion.
  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(timer);
  }, [count, paused, index]);

  if (count === 0) return null;
  const promo = PROMOS[index];

  const arrow =
    "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy transition-colors hover:bg-navy/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:h-8 sm:w-8";

  return (
    <section
      className="bg-gradient-to-r from-cs-blue to-cs-purple text-navy"
      aria-roledescription="carousel"
      aria-label="Promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 py-2.5 sm:gap-3 sm:py-3">
          {count > 1 && (
            <button type="button" onClick={() => go(-1)} aria-label="Previous promotion" className={arrow}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* One line, always: badge/eyebrow and CTA never shrink; the heading
              + body run truncates rather than wraps. */}
          <div key={index} className="promo-in flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
            {promo.badge && (
              <span className="inline-flex flex-shrink-0 items-center whitespace-nowrap rounded-md bg-cs-red px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm sm:text-sm">
                {promo.badge}
              </span>
            )}
            {promo.eyebrow && (
              <span className="hidden flex-shrink-0 items-center whitespace-nowrap rounded-full bg-navy px-2.5 py-0.5 text-xs font-bold text-white sm:inline-flex">
                {promo.eyebrow}
              </span>
            )}
            <p className="min-w-0 flex-1 truncate font-semibold leading-snug">
              {promo.heading}
              {promo.body && <span className="font-normal text-navy/70"> {promo.body}</span>}
            </p>
            <Link
              href={promo.cta.href}
              onClick={() =>
                capture("home_promo_band_clicked", { heading: promo.heading, position: index })
              }
              className="inline-flex flex-shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-navy/90 active:translate-y-px sm:px-5 sm:py-2.5"
            >
              {promo.cta.label}
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {count > 1 && (
            <button type="button" onClick={() => go(1)} aria-label="Next promotion" className={arrow}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
