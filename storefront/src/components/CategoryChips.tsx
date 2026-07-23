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
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-navy hover:border-cs-orange hover:shadow-sm active:translate-y-px transition-all"
        >
          <Image src={category.icon} alt="" width={18} height={18} />
          {category.label}
        </Link>
      ))}
    </div>
  );
}
