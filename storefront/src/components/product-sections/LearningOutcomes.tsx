import Image from "next/image";

interface LearningOutcomesProps {
  title?: string;
  subtitle?: string;
  outcomes: string[];
  image?: string;
  imageAlt?: string;
  background?: "white" | "gray" | "navy";
}

export function LearningOutcomes({
  title = "What They'll Learn",
  subtitle,
  outcomes,
  image,
  imageAlt = "Learning outcomes illustration",
  background = "white",
}: LearningOutcomesProps) {
  const bgClass = {
    white: "bg-white",
    gray: "bg-gray-50",
    navy: "bg-navy",
  }[background];

  const textClass = background === "navy" ? "text-white" : "text-navy";
  const subtitleClass = background === "navy" ? "text-white/70" : "text-gray-600";
  const checkColor = background === "navy" ? "text-cs-orange" : "text-cs-green";

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid ${image ? "lg:grid-cols-2" : ""} gap-12 items-center`}>
          {/* Content */}
          <div>
            <h2 className={`text-3xl font-semibold ${textClass} mb-4`}>{title}</h2>
            {subtitle && (
              <p className={`${subtitleClass} mb-8`}>{subtitle}</p>
            )}

            <ul className="space-y-4">
              {outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className={`w-6 h-6 ${checkColor} flex-shrink-0 mt-0.5`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className={`${background === "navy" ? "text-white/90" : "text-gray-700"} text-lg`}>
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          {image && (
            <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
