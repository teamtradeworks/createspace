"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();
  const isMounted = useRef(false);
  // Counter incremented on every popstate event. The pathname effect compares
  // against lastPopCounter to detect back/forward navigations deterministically,
  // with no timing dependency (handles slow RSC transitions correctly).
  const popCounter = useRef(0);
  const lastPopCounter = useRef(0);

  useEffect(() => {
    const handlePopState = () => {
      popCounter.current += 1;
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    // Skip initial mount — let browser handle hash anchors on first load
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    // Skip back/forward navigation — let browser restore scroll position
    if (popCounter.current !== lastPopCounter.current) {
      lastPopCounter.current = popCounter.current;
      return;
    }
    // Skip hash navigation — browser will scroll to the anchor
    if (window.location.hash) {
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
