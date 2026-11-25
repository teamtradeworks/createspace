"use client";

import { capture } from "@/lib/analytics";

export const GOOGLE_REVIEW_URL = "https://g.page/r/CUyt6FQiOY1FEAI/review";

export const GOOGLE_ICON =
  "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z";

/** Inline "Please review us!" link with the Google icon, styled to match SocialLinks. */
export default function GoogleReviewLink({ location }: { location: string }) {
  return (
    <a
      href={GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 py-1 font-medium text-navy"
      onClick={() =>
        capture("social_link_clicked", {
          platform: "google_review",
          location,
        })
      }
    >
      <svg
        className="h-4 w-4 text-navy/70 transition-colors group-hover:text-navy"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d={GOOGLE_ICON} />
      </svg>
      <span className="underline decoration-cs-orange decoration-2 underline-offset-4 transition-colors group-hover:decoration-navy">
        Please review us!
      </span>
    </a>
  );
}
