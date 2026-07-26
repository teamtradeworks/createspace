"use client";

import Link from "next/link";
import { capture } from "@/lib/analytics";

type BrandLinkProps = {
  brand: string;
  vendor: string;
  children: React.ReactNode;
};

export default function BrandLink({ brand, vendor, children }: BrandLinkProps) {
  return (
    <Link
      href={`/shop?brand=${encodeURIComponent(vendor)}`}
      onClick={() => {
        capture("brand_clicked", { brand });
      }}
      className="block rounded-xl px-4 py-3 hover:shadow-md transition-shadow"
    >
      {children}
    </Link>
  );
}
