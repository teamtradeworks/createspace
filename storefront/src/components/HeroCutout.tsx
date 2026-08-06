"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// The hero cutouts crossfade in sequence. Each cutout carries its own orbiting
// brand illustrations, so the figure and its illustrations fade in and out
// together. The first cutout is the LCP image and sits in normal flow (it sizes
// the frame); the rest overlay it and cross-fade.
//
// To add another theme, drop in a new entry: a single-subject cutout (clean/soft
// background so it isolates into a clean silhouette) plus its own illustrations.
type Illustration = { src: string; className: string };
type Cutout = {
  src: string;
  alt: string;
  width: number;
  height: number;
  illustrations: Illustration[];
};

const CUTOUTS: Cutout[] = [
  {
    src: "/images/home/astronaut-hero.png",
    alt: "A child wearing a NASA astronaut helmet and suit, hands on hips",
    width: 843,
    height: 1143,
    illustrations: [
      {
        src: "/images/illustrations/planet-1.svg",
        className:
          "pointer-events-none absolute -left-5 top-4 w-16 sm:w-20 lg:-left-10 lg:top-6 lg:w-24",
      },
      {
        src: "/images/illustrations/planet-2.svg",
        className:
          "pointer-events-none absolute -right-3 top-0 w-10 rotate-90 sm:w-12 lg:-right-6 lg:w-16",
      },
      {
        src: "/images/illustrations/atom-1.svg",
        className:
          "pointer-events-none absolute -left-3 bottom-20 w-10 opacity-60 lg:-left-6 lg:bottom-24 lg:w-14",
      },
    ],
  },
  {
    src: "/images/home/chemist-hero.png",
    alt: "A girl in a lab coat and safety goggles holding a conical flask of blue liquid",
    width: 731,
    height: 900,
    illustrations: [
      {
        src: "/images/illustrations/beaker.svg",
        className:
          "pointer-events-none absolute -left-4 top-2 w-14 sm:w-16 lg:-left-9 lg:top-4 lg:w-20",
      },
      {
        src: "/images/illustrations/atom-1.svg",
        className:
          "pointer-events-none absolute -right-3 top-4 w-11 opacity-90 sm:w-12 lg:-right-7 lg:top-6 lg:w-16",
      },
      {
        src: "/images/illustrations/lightbulb.svg",
        className:
          "pointer-events-none absolute -left-3 bottom-10 w-10 opacity-70 lg:-left-6 lg:bottom-16 lg:w-14",
      },
    ],
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
        <div
          key={cut.src}
          aria-hidden={i !== index}
          className={`transition-opacity duration-1000 ease-in-out ${
            i === 0 ? "relative" : "absolute inset-0 flex items-end justify-center"
          } ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={cut.src}
            alt={i === index ? cut.alt : ""}
            width={cut.width}
            height={cut.height}
            priority={i === 0}
            sizes="(max-width: 1024px) 60vw, 40vw"
            className="h-72 w-auto object-contain object-bottom drop-shadow-2xl sm:h-80 lg:h-[27rem]"
          />
          {cut.illustrations.map((ill) => (
            // eslint-disable-next-line @next/next/no-img-element -- decorative inline SVG
            <img key={ill.src} src={ill.src} alt="" aria-hidden="true" className={ill.className} />
          ))}
        </div>
      ))}
    </div>
  );
}
