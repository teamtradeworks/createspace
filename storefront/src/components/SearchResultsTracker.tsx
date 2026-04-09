"use client";

import { useEffect } from "react";
import { capture } from "@/lib/analytics";
import { gtmSearch } from "@/lib/gtm";

interface SearchResultsTrackerProps {
  query: string;
  resultCount: number;
}

export default function SearchResultsTracker({ query, resultCount }: SearchResultsTrackerProps) {
  useEffect(() => {
    if (query) {
      capture("search_results_viewed", {
        query,
        result_count: resultCount,
      });
      gtmSearch(query);
    }
  }, [query, resultCount]);

  return null;
}
