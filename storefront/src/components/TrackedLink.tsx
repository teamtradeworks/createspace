"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { capture } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: string;
  eventProps?: Record<string, unknown>;
  children: ReactNode;
};

// A next/link that fires a PostHog event on click. Lets server components keep
// their static, above-the-fold markup while still tracking CTA clicks.
export default function TrackedLink({
  event,
  eventProps,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        capture(event, eventProps);
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
