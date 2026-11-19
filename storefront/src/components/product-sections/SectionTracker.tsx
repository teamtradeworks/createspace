"use client";

import { useProductHandle } from "./ProductTrackingContext";
import useSectionTracking from "@/hooks/useSectionTracking";

interface SectionTrackerProps {
  name: string;
  /** Visible fraction that counts as a view; lower it for sections taller than a phone screen. */
  threshold?: number;
  children: React.ReactNode;
}

export default function SectionTracker({ name, threshold, children }: SectionTrackerProps) {
  const handle = useProductHandle();
  const ref = useSectionTracking(name, handle ?? "", { threshold });

  if (!handle) {
    return <>{children}</>;
  }

  return <div ref={ref}>{children}</div>;
}
