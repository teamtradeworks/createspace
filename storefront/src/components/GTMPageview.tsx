"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { gtmPageView } from "@/lib/gtm";

export default function GTMPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + "?" + searchParams.toString();
      }
      gtmPageView(url);
    }
  }, [pathname, searchParams]);

  return null;
}
