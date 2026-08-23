"use client";

import { useEffect } from "react";
import { capture } from "@/lib/analytics";
import { gtmSearch } from "@/lib/gtm";
import type { SearchResultKind } from "@/lib/fuzzy-search";

interface SearchResultsTrackerProps {
  query: string;
  resultCount: number;
  resultKind: SearchResultKind;
}

export default function SearchResultsTracker({
  query,
  resultCount,
  resultKind,
}: SearchResultsTrackerProps) {
  useEffect(() => {
    if (query) {
      capture("search_results_viewed", {
        query,
        result_count: resultCount,
        // "match" | "related" | "none" — lets us separate a real result set
        // from a near-miss suggestion, which a bare count can't distinguish.
        result_kind: resultKind,
      });
      gtmSearch(query);
    }
  }, [query, resultCount, resultKind]);

  return null;
}
