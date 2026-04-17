"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import posthog from "posthog-js";
import { getFirstTouchUtm } from "@/lib/utm";

export default function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const utmCaptured = useRef(false);

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + "?" + searchParams.toString();
      }

      // On the first pageview of the session, capture UTM params as user properties
      if (!utmCaptured.current) {
        utmCaptured.current = true;
        const utm = getFirstTouchUtm();
        if (utm) {
          posthog.register(utm);
          posthog.setPersonProperties({
            initial_utm_source: utm.utm_source,
            initial_utm_medium: utm.utm_medium,
            initial_utm_campaign: utm.utm_campaign,
            initial_utm_term: utm.utm_term,
            initial_utm_content: utm.utm_content,
          });
        }
      }

      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams]);

  return null;
}
