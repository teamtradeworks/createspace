"use client";

import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { capture } from "@/lib/analytics";
import { PROMOS, type Promo } from "@/config/promo";

// Flatten a heading (string or segments) to plain text for analytics/labels.
function headingToText(heading: Promo["heading"]): string {
  if (typeof heading === "string") return heading;
  return heading.map((seg) => (typeof seg === "string" ? seg : seg.text)).join("");
}

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
  const headingText = headingToText(promo.heading);
  const headingSegments = typeof promo.heading === "string" ? [promo.heading] : promo.heading;

  const arrow =
    "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy transition-colors hover:bg-navy/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:h-8 sm:w-8";

  return (
    <section
      className="promo-band relative overflow-hidden text-navy"
      aria-roledescription="carousel"
      aria-label="Promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Light sweep: a periodic sheen crossing the strip (decorative). */}
      <div
        aria-hidden="true"
        className="promo-shine pointer-events-none absolute inset-y-0 left-0 w-1/3"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 py-2.5 sm:gap-3 sm:py-3">
          {count > 1 && (
            <button type="button" onClick={() => go(-1)} aria-label="Previous promotion" className={arrow}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* No buttons: the whole strip is the link. Badge/eyebrow stay on
              one line; the message wraps rather than truncating, so nothing is
              cut off on mobile. */}
          <Link
            key={index}
            href={promo.cta.href}
            onClick={() =>
              capture("home_promo_band_clicked", { heading: headingText, position: index })
            }
            aria-label={promo.cta.label}
            className="promo-in group flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3"
          >
            {promo.badge && (
              <span className="promo-badge-pulse inline-flex flex-shrink-0 items-center whitespace-nowrap rounded-md bg-cs-red px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm sm:text-sm">
                {promo.badge}
              </span>
            )}
            {promo.eyebrow && (
              <span className="hidden flex-shrink-0 items-center whitespace-nowrap rounded-full bg-navy px-2.5 py-0.5 text-xs font-bold text-white sm:inline-flex">
                {promo.eyebrow}
              </span>
            )}
            <span className="min-w-0 flex-1 text-sm font-semibold leading-snug sm:text-base">
              {headingSegments.map((seg, i) =>
                typeof seg === "string" ? (
                  <Fragment key={i}>{seg}</Fragment>
                ) : (
                  <span
                    key={i}
                    className="underline decoration-2 decoration-navy/50 underline-offset-2 group-hover:decoration-navy"
                  >
                    {seg.text}
                  </span>
                ),
              )}
              {promo.body && <span className="font-normal text-navy/70"> {promo.body}</span>}
            </span>
          </Link>

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
