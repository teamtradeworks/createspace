const STAR_PATH =
  "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z";

const sizeClasses = {
  sm: { star: "w-3.5 h-3.5", gap: "gap-0.5" },
  md: { star: "w-5 h-5", gap: "gap-1" },
  lg: { star: "w-6 h-6", gap: "gap-1" },
};

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export function StarRating({ rating, size = "md" }: StarRatingProps) {
  const { star, gap } = sizeClasses[size];

  return (
    <div className={`flex ${gap}`}>
      {[1, 2, 3, 4, 5].map((star_index) => {
        const fill = Math.min(1, Math.max(0, rating - (star_index - 1)));

        if (fill >= 1) {
          // Full star
          return (
            <svg
              key={star_index}
              className={`${star} text-cs-orange`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={STAR_PATH} />
            </svg>
          );
        }

        if (fill <= 0) {
          // Empty star
          return (
            <svg
              key={star_index}
              className={`${star} text-gray-300`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={STAR_PATH} />
            </svg>
          );
        }

        // Partial star
        const clipId = `star-clip-${star_index}`;
        return (
          <svg
            key={star_index}
            className={`${star}`}
            viewBox="0 0 24 24"
          >
            <defs>
              <clipPath id={clipId}>
                <rect x="0" y="0" width={24 * fill} height="24" />
              </clipPath>
            </defs>
            {/* Gray background star */}
            <path d={STAR_PATH} fill="currentColor" className="text-gray-300" />
            {/* Orange filled portion */}
            <path
              d={STAR_PATH}
              fill="currentColor"
              className="text-cs-orange"
              clipPath={`url(#${clipId})`}
            />
          </svg>
        );
      })}
    </div>
  );
}
