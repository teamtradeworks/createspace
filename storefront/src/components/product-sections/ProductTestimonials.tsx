import Image from "next/image";

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

interface ProductTestimonialsProps {
  title?: string;
  testimonials: Testimonial[];
  background?: "white" | "gray" | "navy";
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? "text-cs-orange" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
    </div>
  );
}

export function ProductTestimonials({
  title = "What Parents Are Saying",
  testimonials,
  background = "white",
}: ProductTestimonialsProps) {
  const bgClass = {
    white: "bg-white",
    gray: "bg-gray-50",
    navy: "bg-navy",
  }[background];

  const textClass = background === "navy" ? "text-white" : "text-navy";
  const cardBg = background === "navy" ? "bg-white/10" : "bg-white";
  const cardBorder = background === "navy" ? "" : "border border-gray-200";
  const quoteClass = background === "navy" ? "text-white/90" : "text-gray-600";
  const roleClass = background === "navy" ? "text-white/60" : "text-gray-500";

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-semibold ${textClass} text-center mb-12`}>
          {title}
        </h2>

        <div
          className={`grid ${
            testimonials.length === 1
              ? "max-w-2xl mx-auto"
              : testimonials.length === 2
              ? "md:grid-cols-2 max-w-4xl mx-auto"
              : "md:grid-cols-2 lg:grid-cols-3"
          } gap-6`}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${cardBg} ${cardBorder} rounded-xl p-6`}
            >
              {/* Rating */}
              {testimonial.rating && (
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>
              )}

              {/* Quote */}
              <blockquote className={`${quoteClass} mb-6`}>
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                {testimonial.avatar ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-cs-blue/20 rounded-full flex items-center justify-center">
                    <span className="text-cs-blue font-semibold">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className={`font-semibold text-sm ${textClass}`}>
                    {testimonial.author}
                  </p>
                  {testimonial.role && (
                    <p className={`text-xs ${roleClass}`}>{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
