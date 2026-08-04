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
  image: string;
  alt: string;
  event: string;
};

export default function AgeGroupCard({
  range,
  label,
  color,
  darkText = false,
  href,
  image,
  alt,
  event,
}: AgeGroupCardProps) {
  const textColor = darkText ? "text-navy" : "text-white";

  return (
    <Link
      href={href}
      onClick={() => capture(event)}
      className="group relative aspect-square overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover object-bottom transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <span className={`absolute inset-x-0 bottom-0 ${color} px-4 py-3 md:px-5 md:py-3.5`}>
        <span className={`block text-2xl md:text-3xl font-bold leading-tight ${textColor}`}>
          {range}
        </span>
        <span className={`block text-xs md:text-sm font-medium ${textColor} opacity-90`}>
          {label}
        </span>
      </span>
    </Link>
  );
}
