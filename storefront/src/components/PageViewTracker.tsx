"use client";

import { useEffect } from "react";
import { capture } from "@/lib/analytics";

interface PageViewTrackerProps {
  event: string;
  properties?: Record<string, string | number | boolean>;
}

export default function PageViewTracker({ event, properties }: PageViewTrackerProps) {
  useEffect(() => {
    capture(event, properties);
  }, [event, properties]);

  return null;
}
