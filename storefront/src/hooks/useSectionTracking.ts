"use client";

import { useEffect, useRef } from "react";
import { capture } from "@/lib/analytics";

const MIN_DURATION_MS = 1500;

interface TrackingState {
  visibleSince: number | null;
  accumulatedMs: number;
  isIntersecting: boolean;
}

interface SectionTrackingOptions {
  /**
   * Fraction of the section that must be on screen before it counts as viewed.
   * Sections taller than a phone screen (the hero) can never reach the 0.5
   * default, so they pass a lower value.
   */
  threshold?: number;
}

export default function useSectionTracking(
  sectionName: string,
  page: string,
  { threshold = 0.5 }: SectionTrackingOptions = {},
) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef<TrackingState>({
    visibleSince: null,
    accumulatedMs: 0,
    isIntersecting: false,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const s = state.current;

    function flush() {
      if (s.visibleSince) {
        s.accumulatedMs += Date.now() - s.visibleSince;
        s.visibleSince = null;
      }

      if (s.accumulatedMs >= MIN_DURATION_MS) {
        capture("section_viewed", {
          section_name: sectionName,
          page,
          duration_seconds: Math.round(s.accumulatedMs / 100) / 10,
        });
      }

      s.accumulatedMs = 0;
    }

    function onVisibilityChange() {
      if (document.hidden) {
        // Tab hidden — pause timer
        if (s.visibleSince) {
          s.accumulatedMs += Date.now() - s.visibleSince;
          s.visibleSince = null;
        }
      } else {
        // Tab visible again — resume if section is intersecting
        if (s.isIntersecting) {
          s.visibleSince = Date.now();
        }
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          s.isIntersecting = true;
          s.visibleSince = Date.now();
        } else {
          s.isIntersecting = false;
          flush();
        }
      },
      { threshold },
    );

    observer.observe(el);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("beforeunload", flush);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("beforeunload", flush);
      flush();
    };
  }, [sectionName, page, threshold]);

  return ref;
}
