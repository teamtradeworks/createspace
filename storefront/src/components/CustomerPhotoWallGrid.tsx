"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { capture } from "@/lib/analytics";
import { BRANDS } from "@/config/brands";

export type WallPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  href: string;
  name: string;
  age: string | null;
  brand: string;
  productImage: string | null;
  price: string | null;
};

function handleFromHref(href: string): string {
  return href.split("/").pop() ?? href;
}

// Displayed tile aspect ratio (width / height). Photos keep varied heights, but
// clamped so no tile is extreme, which keeps the balanced columns tidy and
// leaves room for the flip side. Smaller number = taller tile.
const ASPECT_MIN = 0.62;
const ASPECT_MAX = 1.1;
function cardAspect(width: number, height: number): number {
  return Math.min(ASPECT_MAX, Math.max(ASPECT_MIN, width / height));
}

// Greedy balanced masonry: drop each photo (in order) into the currently
// shortest column, so columns bottom out at a similar level while the tiles
// keep their varied heights.
function balanceColumns(items: WallPhoto[], columnCount: number) {
  const cols = Array.from({ length: columnCount }, () => ({
    items: [] as { photo: WallPhoto; aspect: number }[],
    height: 0,
  }));
  // Place the tallest tiles first (longest-processing-time heuristic) so the
  // greedy fill lands the columns at a noticeably more even bottom.
  const ordered = [...items].sort(
    (a, b) => cardAspect(a.width, a.height) - cardAspect(b.width, b.height),
  );
  for (const photo of ordered) {
    const aspect = cardAspect(photo.width, photo.height);
    const target = cols.reduce((min, c) => (c.height < min.height ? c : min), cols[0]);
    target.items.push({ photo, aspect });
    target.height += 1 / aspect; // taller tiles add more height at equal width
  }
  return cols;
}

export default function CustomerPhotoWallGrid({
  photos,
  limit = 12,
}: {
  photos: WallPhoto[];
  limit?: number;
}) {
  // Which card is currently showing its kit side, plus every card that has
  // flipped at least once (their backs stay mounted so unflips animate).
  const [flippedSrc, setFlippedSrc] = useState<string | null>(null);
  const [everFlipped, setEverFlipped] = useState<Set<string>>(new Set());
  // Mirrors flippedSrc so the auto-reveal interval can read the current card
  // without re-subscribing on every flip.
  const flippedRef = useRef<string | null>(null);
  // Auto-reveal only arms once the wall has scrolled into view (plus a beat).
  const [armed, setArmed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Show ~`limit` photos from the brand-interleaved pool.
  const shown = useMemo(() => photos.slice(0, limit), [photos, limit]);

  // Column count follows the breakpoint so the masonry balances per layout.
  // Defaults to 4 for SSR (matches the desktop-first render, no hydration jump).
  const [columns, setColumns] = useState(4);
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () => setColumns(lg.matches ? 4 : sm.matches ? 3 : 2);
    update();
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);

  const columnBuckets = useMemo(() => balanceColumns(shown, columns), [shown, columns]);

  function toggleFlip(photo: WallPhoto) {
    setFlippedSrc((prev) => {
      const next = prev === photo.src ? null : photo.src;
      if (next !== null) {
        capture("home_page_wall_card_flipped", { handle: handleFromHref(photo.href) });
        setEverFlipped((set) => {
          if (set.has(photo.src)) return set;
          const grown = new Set(set);
          grown.add(photo.src);
          return grown;
        });
      }
      return next;
    });
  }

  useEffect(() => {
    flippedRef.current = flippedSrc;
  }, [flippedSrc]);

  // Arm the auto-reveal 1s after the wall first scrolls into view. Skipped for
  // reduced-motion users, who reveal by tapping.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setArmed(true);
      return;
    }
    let delay: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          delay = setTimeout(() => setArmed(true), 1000);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      clearTimeout(delay);
    };
  }, []);

  // Ambient auto-reveal: reveal a random card now, then every 4s, each reset the
  // previously revealed one (flippedSrc holds a single card).
  useEffect(() => {
    if (!armed) return;
    const pool = photos.slice(0, limit);
    if (pool.length < 2) return;
    const revealRandom = () => {
      const candidates = pool.filter((p) => p.src !== flippedRef.current);
      const pick = candidates[Math.floor(Math.random() * candidates.length)] ?? pool[0];
      setFlippedSrc(pick.src);
      setEverFlipped((set) => {
        if (set.has(pick.src)) return set;
        const grown = new Set(set);
        grown.add(pick.src);
        return grown;
      });
    };
    revealRandom();
    const timer = setInterval(revealRandom, 4000);
    return () => clearInterval(timer);
  }, [armed, photos, limit]);

  return (
    <div ref={rootRef}>
      {/* Balanced masonry: varied tile heights, columns bottom out at a similar level */}
      {shown.length > 0 && (
        <div className="wall-fade-bottom flex items-start gap-3 sm:gap-4">
          {columnBuckets.map((bucket, ci) => (
            <div key={ci} className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
              {bucket.items.map(({ photo, aspect }, index) => {
                const isFlipped = flippedSrc === photo.src;
                const brand = BRANDS.find((b) => b.key === photo.brand);
                return (
                  <Reveal key={photo.src} delay={(index % 4) * 60}>
                    <div
                      className="wall-flip w-full"
                      data-flipped={isFlipped}
                      style={{ aspectRatio: String(aspect) }}
                    >
                  <div className="wall-flip-inner">
                    {/* Front: the build photo */}
                    <button
                      type="button"
                      onClick={() => toggleFlip(photo)}
                      aria-expanded={isFlipped}
                      aria-label={`Show the kit behind this photo: ${photo.name}`}
                      className="wall-flip-front group relative block w-full h-full rounded-xl overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      {brand && (
                        <span className="absolute top-2 right-2 rounded-md bg-white/95 px-1.5 py-1 shadow-sm">
                          <Image
                            src={brand.logo}
                            alt={brand.name}
                            width={120}
                            height={48}
                            className="h-4 w-auto max-w-[80px] object-contain"
                          />
                        </span>
                      )}
                      <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy/85 via-navy/25 to-transparent p-3 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 group-focus-visible:opacity-100">
                        <span className="text-sm font-semibold text-white leading-snug">{photo.name}</span>
                        {photo.age && <span className="text-xs text-white/80 mt-0.5">{photo.age}</span>}
                      </span>
                    </button>

                    {/* Back: the kit card (mounted after first flip so unflips animate) */}
                    {everFlipped.has(photo.src) && (
                      <div
                        className="wall-flip-back rounded-xl bg-white ring-1 ring-gray-200 p-3 flex flex-col cursor-pointer"
                        onClick={() => toggleFlip(photo)}
                        aria-hidden={!isFlipped}
                      >
                        <div className="relative flex-1 min-h-0">
                          {photo.productImage && (
                            <Image
                              src={photo.productImage}
                              alt=""
                              fill
                              className="object-contain p-1"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                          )}
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-semibold text-navy leading-snug line-clamp-2">
                            {photo.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {photo.age}
                            {photo.price ? ` · ${photo.price}` : ""}
                          </p>
                          <Link
                            href={photo.href}
                            onClick={(event) => {
                              event.stopPropagation();
                              capture("home_page_wall_product_clicked", {
                                handle: handleFromHref(photo.href),
                              });
                            }}
                            tabIndex={isFlipped ? 0 : -1}
                            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-navy px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
                          >
                            See the kit
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
