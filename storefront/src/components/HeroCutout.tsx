"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// The hero cutouts crossfade in sequence. The first is the LCP image and sits
// in normal flow (it sizes the frame); the rest are stacked over it and fade
// in/out. With a single entry there's no crossfade — just the static cutout.
//
// To add a second theme, drop in another entry. It MUST be a single-subject
// photo on a clean/soft background (like the astronaut) so it isolates into a
// clean silhouette — group photos leave hard crop edges and stray limbs.
const CUTOUTS = [
  {
    src: "/images/home/astronaut-hero.png",
    alt: "A child wearing a NASA astronaut helmet and suit, hands on hips",
    width: 843,
    height: 1143,
  },
];

export default function HeroCutout() {
  const count = CUTOUTS.length;
  const [index, setIndex] = useState(0);

  // Crossfade to the next cutout every 5s. Skipped for a single cutout or for
  // reduced-motion users (they keep the first, LCP image).
  useEffect(() => {
    if (count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="relative flex items-end justify-center">
      {CUTOUTS.map((cut, i) => (
        <Image
          key={cut.src}
          src={cut.src}
          alt={i === index ? cut.alt : ""}
          width={cut.width}
          height={cut.height}
          priority={i === 0}
          sizes="(max-width: 1024px) 60vw, 40vw"
          className={`h-72 w-auto object-contain object-bottom drop-shadow-2xl transition-opacity duration-1000 ease-in-out sm:h-80 lg:h-[27rem] ${
            i === 0 ? "relative" : "absolute bottom-0 left-1/2 -translate-x-1/2"
          } ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}
