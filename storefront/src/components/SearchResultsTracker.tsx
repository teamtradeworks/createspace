"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

interface SearchResultsTrackerProps {
  query: string;
  resultCount: number;
}

export default function SearchResultsTracker({
  query,
  resultCount,
}: SearchResultsTrackerProps) {
  useEffect(() => {
    if (query) {
      posthog.capture("search_results_viewed", {
        query,
        result_count: resultCount,
      });
    }
  }, [query, resultCount]);

  return null;
}
