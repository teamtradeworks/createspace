"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import SectionTracker from "./SectionTracker";

interface CustomerImage {
  src: string;
  alt: string;
  label?: string;
  description?: string;
  /** Path to an mp4 video that plays on hover. The static image acts as the poster frame. */
  animation?: string;
}

interface CustomerShowcaseProps {
  title?: string;
  subtitle?: string;
  images: CustomerImage[];
  background?: "white" | "gray";
}

function ImageCard({
  image,
  isHovered,
  onHover,
  onLeave,
  className = "",
}: {
  image: CustomerImage;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!image.animation || !videoRef.current) return;
    if (isHovered) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, image.animation]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-300 hover:scale-105"
      />

      {/* Animation video overlay — plays on hover */}
      {image.animation && (
        <video
          ref={videoRef}
          src={image.animation}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Label badge */}
      {image.label && (
        <div className="absolute top-3 left-3 px-3 py-1 bg-navy/80 text-white text-xs font-medium rounded-full backdrop-blur-sm z-10">
          {image.label}
        </div>
      )}

      {/* Hover overlay with description */}
      {image.description && (
        <div
          className={`absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent flex items-end p-4 transition-opacity duration-300 z-10 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-white text-sm leading-relaxed">
            {image.description}
          </p>
        </div>
      )}
    </div>
  );
}

export function CustomerShowcase({
  title = "Customer Creations",
  subtitle,
  images,
  background = "white",
}: CustomerShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const bgClass = background === "gray" ? "bg-gray-50" : "bg-white";
  const count = images.length;

  const renderImages = () => {
    // 1 image: full width
    if (count === 1) {
      return (
        <SectionTracker name="CustomerShowcase">
          <div className="aspect-[16/9]">
          <ImageCard
            image={images[0]}
            isHovered={hoveredIndex === 0}
            onHover={() => setHoveredIndex(0)}
            onLeave={() => setHoveredIndex(null)}
            className="h-full"
          />
        </div>
        </SectionTracker>
      );
    }

    // 2 images: equal side by side
    if (count === 2) {
      return (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <ImageCard
              key={index}
              image={image}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              className="aspect-[4/3]"
            />
          ))}
        </div>
      );
    }

    // 3 images: 1 large left, 2 stacked right (using flex for perfect height alignment)
    if (count === 3) {
      return (
        <div className="flex gap-4">
          <div className="w-1/2">
            <ImageCard
              image={images[0]}
              isHovered={hoveredIndex === 0}
              onHover={() => setHoveredIndex(0)}
              onLeave={() => setHoveredIndex(null)}
              className="aspect-square h-full"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <ImageCard
              image={images[1]}
              isHovered={hoveredIndex === 1}
              onHover={() => setHoveredIndex(1)}
              onLeave={() => setHoveredIndex(null)}
              className="flex-1"
            />
            <ImageCard
              image={images[2]}
              isHovered={hoveredIndex === 2}
              onHover={() => setHoveredIndex(2)}
              onLeave={() => setHoveredIndex(null)}
              className="flex-1"
            />
          </div>
        </div>
      );
    }

    // 4 images: 2x2 grid
    if (count === 4) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <ImageCard
              key={index}
              image={image}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              className="aspect-square"
            />
          ))}
        </div>
      );
    }

    // 5 images: 2 on top, 3 on bottom
    if (count === 5) {
      return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <ImageCard
              image={images[0]}
              isHovered={hoveredIndex === 0}
              onHover={() => setHoveredIndex(0)}
              onLeave={() => setHoveredIndex(null)}
              className="aspect-[4/3]"
            />
            <ImageCard
              image={images[1]}
              isHovered={hoveredIndex === 1}
              onHover={() => setHoveredIndex(1)}
              onLeave={() => setHoveredIndex(null)}
              className="aspect-[4/3]"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <ImageCard
              image={images[2]}
              isHovered={hoveredIndex === 2}
              onHover={() => setHoveredIndex(2)}
              onLeave={() => setHoveredIndex(null)}
              className="aspect-square"
            />
            <ImageCard
              image={images[3]}
              isHovered={hoveredIndex === 3}
              onHover={() => setHoveredIndex(3)}
              onLeave={() => setHoveredIndex(null)}
              className="aspect-square"
            />
            <ImageCard
              image={images[4]}
              isHovered={hoveredIndex === 4}
              onHover={() => setHoveredIndex(4)}
              onLeave={() => setHoveredIndex(null)}
              className="aspect-square"
            />
          </div>
        </div>
      );
    }

    // 6 images: 3x2 grid
    if (count === 6) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <ImageCard
              key={index}
              image={image}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              className="aspect-square"
            />
          ))}
        </div>
      );
    }

    // 7+ images: responsive grid that fills rows
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <ImageCard
            key={index}
            image={image}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            className="aspect-square"
          />
        ))}
      </div>
    );
  };

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className="text-3xl font-semibold text-navy mb-3">{title}</h2>
            )}
            {subtitle && (
              <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {/* Images */}
        {renderImages()}
      </div>
    </section>
  );
}
