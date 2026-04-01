"use client";

import { useEffect, useRef } from "react";
import { capture } from "@/lib/analytics";

interface ScrollDepthTrackerProps {
  event: string;
  thresholds?: number[];
}

const DEFAULT_THRESHOLDS = [25, 50, 75, 100];

export default function ScrollDepthTracker({
  event,
  thresholds = DEFAULT_THRESHOLDS,
}: ScrollDepthTrackerProps) {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const fired = firedRef.current;
    fired.clear();

    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const threshold of thresholds) {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          capture(event, { depth: threshold });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [event, thresholds]);

  return null;
}
