"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { StarRating } from "@/components/StarRating";
import { shopifyIdToFeraId } from "@/lib/fera";
import SectionTracker from "./SectionTracker";

interface ProductReviewsProps {
  productId: string;
  background?: "white" | "gray" | "navy";
}

export function ProductReviews({ productId, background = "white" }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<FeraReview[]>([]);
  const [rating, setRating] = useState<FeraProductRating | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<FeraReview | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const feraId = shopifyIdToFeraId(productId);

  const fetchReviews = useCallback(async () => {
    if (!window.fera?.api) return;

    try {
      const response = await new Promise<FeraReviewsResponse>((resolve, reject) => {
        window.fera!.api!.getReviews(
          { product_id: feraId, page: 1, per_page: 50 },
          (result) => resolve(result),
          (err) => reject(err),
        );
      });
      const reviewData: FeraReview[] = Array.isArray(response) ? response : response.reviews || [];
      setReviews(reviewData);
    } catch (err) {
      console.error("Failed to fetch Fera reviews:", err);
    }
  }, [feraId]);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const waitForFera = (): Promise<boolean> => {
        return new Promise((resolve) => {
          if (window.fera?.api) {
            resolve(true);
            return;
          }

          const interval = setInterval(() => {
            if (window.fera?.api) {
              clearInterval(interval);
              resolve(true);
            }
          }, 500);

          setTimeout(() => {
            clearInterval(interval);
            resolve(false);
          }, 8000);
        });
      };

      const ready = await waitForFera();
      if (cancelled || !ready) {
        setLoading(false);
        return;
      }

      try {
        const [ratingResult] = await Promise.all([
          new Promise<FeraProductRating>((resolve, reject) => {
            try {
              window.fera!.api!.getRating(feraId, (result) => resolve(result));
            } catch (err) {
              reject(err);
            }
          }),
          fetchReviews(),
        ]);
        if (!cancelled) {
          setRating(ratingResult);
        }
      } catch (err) {
        console.error("Failed to fetch Fera data:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [feraId, fetchReviews]);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [reviews, updateScrollButtons]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 340 + 24; // card width + gap
    el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  if (loading) return null;
  if (!rating || rating.count === 0) return null;
  if (reviews.length === 0) return null;

  const bgClass = {
    white: "bg-white",
    gray: "bg-gray-50",
    navy: "bg-navy",
  }[background];
  const textClass = background === "navy" ? "text-white" : "text-navy";
  const subtextClass = background === "navy" ? "text-white/70" : "text-gray-500";
  const cardBg = background === "navy" ? "bg-white/10" : "bg-white";
  const cardBorder = background === "navy" ? "" : "border border-gray-200";
  const bodyTextClass = background === "navy" ? "text-white/80" : "text-gray-600";

  return (
    <SectionTracker name="ProductReviews">
      <section id="reviews" className={`py-16 ${bgClass}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-semibold ${textClass} text-center mb-4`}>
            Customer Reviews
          </h2>

          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <StarRating rating={rating.average} size="md" />
            <span className={`text-lg font-bold ${textClass}`}>{rating.average.toFixed(1)}</span>
            <span className={`text-sm ${subtextClass}`}>
              ({rating.count} {rating.count === 1 ? "review" : "reviews"})
            </span>
          </div>

          {/* Review Cards Carousel */}
          <div className="relative">
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-navy hover:bg-gray-50 transition-colors"
                aria-label="Scroll reviews left"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-none">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  cardBg={cardBg}
                  cardBorder={cardBorder}
                  textClass={textClass}
                  subtextClass={subtextClass}
                  bodyTextClass={bodyTextClass}
                  onReadMore={() => setSelectedReview(review)}
                />
              ))}
            </div>
            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-navy hover:bg-gray-50 transition-colors"
                aria-label="Scroll reviews right"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Review Modal */}
        {selectedReview && (
          <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
        )}
      </section>
    </SectionTracker>
  );
}

function ReviewCard({
  review,
  cardBg,
  cardBorder,
  textClass,
  subtextClass,
  bodyTextClass,
  onReadMore,
}: {
  review: FeraReview;
  cardBg: string;
  cardBorder: string;
  textClass: string;
  subtextClass: string;
  bodyTextClass: string;
  onReadMore: () => void;
}) {
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) {
      setIsClamped(el.scrollHeight > el.clientHeight);
    }
  }, [review.body]);

  return (
    <div
      className={`${cardBg} ${cardBorder} rounded-xl p-6 min-w-[340px] max-w-[340px] flex-shrink-0`}
    >
      {/* Header: avatar, name, date, stars */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {review.customer_avatar_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={review.customer_avatar_url}
              alt={review.customer_name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-cs-blue/20 rounded-full flex items-center justify-center">
              <span className="text-cs-blue font-semibold">{review.customer_name.charAt(0)}</span>
            </div>
          )}
          <div>
            <p className={`font-semibold text-sm ${textClass}`}>{review.customer_name}</p>
            <p className={`text-xs ${subtextClass}`}>{formatReviewDate(review.created_at)}</p>
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>

      {/* Review heading */}
      {review.heading && <h3 className={`font-semibold ${textClass} mb-2`}>{review.heading}</h3>}

      {/* Review body - clamped to 5 lines */}
      <p ref={bodyRef} className={`${bodyTextClass} line-clamp-5`}>
        {review.body}
      </p>
      {isClamped && (
        <button
          onClick={onReadMore}
          className="text-cs-blue text-sm font-medium mt-2 hover:underline"
        >
          Read more
        </button>
      )}

      {/* Review photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="flex gap-2 mt-4">
          {review.photos.slice(0, 4).map((photo) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={photo.id}
              src={photo.url}
              alt={`Review photo by ${review.customer_name}`}
              className="w-20 h-20 rounded-lg object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewModal({ review, onClose }: { review: FeraReview; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close review"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          {review.customer_avatar_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={review.customer_avatar_url}
              alt={review.customer_name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-cs-blue/20 rounded-full flex items-center justify-center">
              <span className="text-cs-blue font-semibold text-lg">
                {review.customer_name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <p className="font-semibold text-navy">{review.customer_name}</p>
            <p className="text-xs text-gray-500">{formatReviewDate(review.created_at)}</p>
          </div>
          <div className="ml-auto">
            <StarRating rating={review.rating} size="md" />
          </div>
        </div>

        {/* Heading */}
        {review.heading && (
          <h3 className="font-semibold text-navy text-lg mb-3">{review.heading}</h3>
        )}

        {/* Full body */}
        <p className="text-gray-600 whitespace-pre-line">{review.body}</p>

        {/* Photos */}
        {review.photos && review.photos.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {review.photos.map((photo) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={photo.id}
                src={photo.url}
                alt={`Review photo by ${review.customer_name}`}
                className="w-24 h-24 rounded-lg object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatReviewDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
