"use client";

import Image from "next/image";
import Link from "next/link";
import { capture } from "@/lib/analytics";
import { CATEGORIES } from "@/config/categories";

export default function CategoryChips() {
  return (
    <div className="mt-8 flex flex-wrap gap-2 md:gap-3">
      {CATEGORIES.map((category) => (
        <Link
          key={category.id}
          href={`/shop?category=${category.id}`}
          onClick={() => capture("home_page_category_clicked", { category: category.id })}
          className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white py-1.5 pl-1.5 pr-4 text-sm font-medium text-navy hover:border-cs-orange hover:shadow-sm active:translate-y-px transition-all"
        >
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-50">
            <Image
              src={category.illustration}
              alt=""
              width={24}
              height={24}
              unoptimized
              className="h-6 w-6 object-contain"
            />
          </span>
          {category.label}
        </Link>
      ))}
    </div>
  );
}
