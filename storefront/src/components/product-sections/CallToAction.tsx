import Link from "next/link";

interface CallToActionProps {
  title: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  background?: "navy" | "gray" | "white";
}

export function CallToAction({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  background = "navy",
}: CallToActionProps) {
  const bgClass = {
    white: "bg-white",
    gray: "bg-gray-50",
    navy: "bg-navy",
  }[background];

  const titleClass = background === "navy" ? "text-white" : "text-navy";
  const subtitleClass = background === "navy" ? "text-white/70" : "text-gray-600";
  const secondaryButtonClass =
    background === "navy"
      ? "border-white/30 hover:border-white text-white"
      : "border-navy/30 hover:border-navy text-navy";

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`text-3xl font-semibold mb-4 ${titleClass}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`${subtitleClass} max-w-xl mx-auto mb-8`}>
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 text-white rounded-lg font-semibold transition-colors"
          >
            {primaryLabel}
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className={`inline-flex items-center justify-center px-8 py-4 border-2 ${secondaryButtonClass} rounded-lg font-semibold transition-colors`}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
