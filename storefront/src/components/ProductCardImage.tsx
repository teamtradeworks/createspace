"use client";

import { useEffect, useState } from "react";
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
  // The hover-swap image is deferred: rendering it eagerly downloads it for
  // every card in view (opacity-0 does not stop native lazy loading), which
  // is pure waste on touch devices where hover never fires and competes with
  // the initial load on desktop.
  const [mountSecondary, setMountSecondary] = useState(false);
  const [secondaryLoaded, setSecondaryLoaded] = useState(false);

  const canHover = () => window.matchMedia("(hover: hover)").matches;

  // On hover-capable devices, mount the swap image once the page has settled
  // (after window load, in an idle slot) so it never competes with
  // above-the-fold work. Touch devices never mount it.
  useEffect(() => {
    if (!secondarySrc || !canHover()) return;

    let cancel = () => {};
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        const id = window.requestIdleCallback(() => setMountSecondary(true), {
          timeout: 3000,
        });
        cancel = () => window.cancelIdleCallback(id);
      } else {
        const id = window.setTimeout(() => setMountSecondary(true), 1500);
        cancel = () => window.clearTimeout(id);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
      cancel = () => window.removeEventListener("load", schedule);
    }
    return () => cancel();
  }, [secondarySrc]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Hover intent beats the idle timer: start the fetch immediately.
    if (secondarySrc && !mountSecondary && canHover()) {
      setMountSecondary(true);
    }
  };

  // Keep the primary visible until the swap image has actually loaded, so an
  // early hover crossfades late rather than to a blank tile.
  const showSecondary = isHovered && mountSecondary && secondaryLoaded;

  return (
    <div
      className="w-full h-full relative"
      onMouseEnter={handleMouseEnter}
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
      {secondarySrc && mountSecondary && (
        <Image
          src={secondarySrc}
          alt={secondaryAlt || primaryAlt}
          fill
          // Same sizes as the primary: without it, fill defaults to 100vw and
          // every card in view lazy-loads a viewport-sized hover image.
          sizes={sizes}
          onLoad={() => setSecondaryLoaded(true)}
          className={`object-cover transition-opacity duration-300 ${showSecondary ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
