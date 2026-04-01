"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductCardImageProps {
  primarySrc: string;
  primaryAlt: string;
  secondarySrc?: string;
  secondaryAlt?: string;
  priority?: boolean;
  sizes?: string;
}

export default function ProductCardImage({
  primarySrc,
  primaryAlt,
  secondarySrc,
  secondaryAlt,
  priority = false,
  sizes = "(max-width: 880px) 50vw, 33vw",
}: ProductCardImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const showSecondary = isHovered && secondarySrc;

  return (
    <div
      className="w-full h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={primarySrc}
        alt={primaryAlt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover transition-opacity duration-300 ${showSecondary ? "opacity-0" : "opacity-100"}`}
      />
      {secondarySrc && (
        <Image
          src={secondarySrc}
          alt={secondaryAlt || primaryAlt}
          fill
          className={`object-cover transition-opacity duration-300 ${showSecondary ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
