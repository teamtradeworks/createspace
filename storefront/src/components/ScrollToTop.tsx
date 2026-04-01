"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();
  const isMounted = useRef(false);
  const isPopNavigation = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      isPopNavigation.current = true;
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
    if (isPopNavigation.current) {
      isPopNavigation.current = false;
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
