"use client";

import { useProductHandle } from "./ProductTrackingContext";
import useSectionTracking from "@/hooks/useSectionTracking";

interface SectionTrackerProps {
  name: string;
  children: React.ReactNode;
}

export default function SectionTracker({ name, children }: SectionTrackerProps) {
  const handle = useProductHandle();
  const ref = useSectionTracking(name, handle ?? "");

  if (!handle) {
    return <>{children}</>;
  }

  return <div ref={ref}>{children}</div>;
}
