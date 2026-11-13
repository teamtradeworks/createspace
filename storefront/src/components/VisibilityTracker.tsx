"use client";

import { useEffect, useRef } from "react";
import { capture } from "@/lib/analytics";

interface VisibilityTrackerProps {
  /** Event captured once, the first time the wrapper is at least `threshold` visible. */
  event: string;
  properties?: Record<string, unknown>;
  threshold?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Fires one analytics event the first time its children come into view.
 * Used on the product hero to record whether a visitor ever saw the price
 * and the add-to-cart button, which scroll depth alone cannot tell us.
 */
export default function VisibilityTracker({
  event,
  properties,
  threshold = 0.5,
  className,
  children,
}: VisibilityTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const propertiesRef = useRef(properties);

  useEffect(() => {
    propertiesRef.current = properties;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        capture(event, propertiesRef.current);
        observer.disconnect();
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [event, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
