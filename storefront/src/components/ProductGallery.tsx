"use client";

import Image from "next/image";
import { useState } from "react";

export type GalleryItem =
  | { type: "image"; url: string; altText: string }
  | { type: "video"; url: string; mimeType: string; previewUrl: string; altText: string };

interface ProductGalleryProps {
  images?: { url: string; altText: string }[];
  items?: GalleryItem[];
  title: string;
}

export default function ProductGallery({ images, items, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Support both legacy `images` prop and new `items` prop
  const galleryItems: GalleryItem[] =
    items ??
    (images ?? []).map((img) => ({
      type: "image",
      url: img.url,
      altText: img.altText || title,
    }));

  if (galleryItems.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  const selected = galleryItems[selectedIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Display */}
      <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
        {selected.type === "video" ? (
          <video
            key={selected.url}
            controls
            playsInline
            className="w-full h-full object-contain"
            poster={selected.previewUrl}
          >
            <source src={selected.url} type={selected.mimeType} />
          </video>
        ) : (
          <Image
            src={selected.url}
            alt={selected.altText || title}
            fill
            className="object-contain p-4"
            priority
          />
        )}

        {/* Navigation Arrows */}
        {galleryItems.length > 1 && (
          <>
            <button
              onClick={() =>
                setSelectedIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedIndex((prev) => (prev + 1) % galleryItems.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {galleryItems.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {galleryItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedIndex === index
                  ? "border-cs-orange"
                  : "border-transparent hover:border-gray-300"
              }`}
              aria-label={item.type === "video" ? `Video ${index + 1}` : `Image ${index + 1}`}
            >
              {item.type === "video" ? (
                <>
                  <Image
                    src={item.previewUrl}
                    alt={item.altText || `${title} video thumbnail`}
                    fill
                    className="object-cover"
                  />
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-navy ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <Image
                  src={item.url}
                  alt={item.altText || `${title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
