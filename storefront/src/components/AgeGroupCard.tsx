"use client";

import Image from "next/image";
import Link from "next/link";
import { capture } from "@/lib/analytics";

type AgeGroupCardProps = {
  range: string;
  label: string;
  color: string;
  darkText?: boolean;
  href: string;
  image: string | null;
  event: string;
};

export default function AgeGroupCard({
  range,
  label,
  color,
  darkText = false,
  href,
  image,
  event,
}: AgeGroupCardProps) {
  const textColor = darkText ? "text-navy" : "text-white";

  return (
    <Link
      href={href}
      onClick={() => capture(event)}
      className={`group ${color} rounded-2xl p-5 md:p-6 aspect-square flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy`}
    >
      <div className="relative flex-1 min-h-0">
        {image && (
          <Image
            src={image}
            alt=""
            fill
            className="object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
      </div>
      <div className="mt-4">
        <span className={`block text-3xl md:text-4xl font-bold ${textColor}`}>{range}</span>
        <span className={`block text-sm md:text-base font-medium ${textColor} opacity-90`}>
          {label}
        </span>
      </div>
    </Link>
  );
}
