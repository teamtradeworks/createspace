"use client";

import Image from "next/image";
import Link from "next/link";
import { capture } from "@/lib/analytics";
import { CATEGORIES } from "@/config/categories";

interface CategoryChipsProps {
  /** Analytics event fired on click. Override so each surface is distinguishable. */
  event?: string;
  /** Container classes, for surfaces that need different alignment or spacing. */
  className?: string;
}

export default function CategoryChips({
  event = "home_page_category_clicked",
  className = "mt-8 flex flex-wrap gap-2 md:gap-3",
}: CategoryChipsProps = {}) {
  return (
    <div className={className}>
      {CATEGORIES.map((category) => (
        <Link
          key={category.id}
          href={`/shop?category=${category.id}`}
          onClick={() => capture(event, { category: category.id })}
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white py-1.5 pl-1.5 pr-2.5 text-xs font-medium text-navy transition-all hover:border-cs-orange hover:shadow-sm active:translate-y-px sm:gap-2.5 sm:pr-4 sm:text-sm"
        >
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-50 sm:h-11 sm:w-11">
            <Image
              src={category.illustration}
              alt=""
              width={36}
              height={36}
              unoptimized
              className="h-6 w-6 object-contain sm:h-9 sm:w-9"
            />
          </span>
          {category.label}
        </Link>
      ))}
    </div>
  );
}
