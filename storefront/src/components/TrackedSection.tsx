"use client";

import useSectionTracking from "@/hooks/useSectionTracking";

interface TrackedSectionProps {
  name: string;
  productHandle: string;
  children: React.ReactNode;
}

export default function TrackedSection({
  name,
  productHandle,
  children,
}: TrackedSectionProps) {
  const ref = useSectionTracking(name, productHandle);

  return <div ref={ref}>{children}</div>;
}
