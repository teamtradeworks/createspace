"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

interface PageViewTrackerProps {
  event: string;
  properties?: Record<string, string | number | boolean>;
}

export default function PageViewTracker({ event, properties }: PageViewTrackerProps) {
  useEffect(() => {
    posthog.capture(event, properties);
  }, [event, properties]);

  return null;
}
