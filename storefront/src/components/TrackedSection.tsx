"use client";

import useSectionTracking from "@/hooks/useSectionTracking";

interface TrackedSectionProps {
  name: string;
  page: string;
  children: React.ReactNode;
}

export default function TrackedSection({ name, page, children }: TrackedSectionProps) {
  const ref = useSectionTracking(name, page);

  return <div ref={ref}>{children}</div>;
}
