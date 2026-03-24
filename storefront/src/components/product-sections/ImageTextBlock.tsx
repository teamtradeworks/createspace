import Image from "next/image";
import SectionTracker from "./SectionTracker";

interface ImageTextBlockProps {
  image: string;
  imageAlt?: string;
  title: string;
  body: string | React.ReactNode;
  layout?: "image-left" | "image-right";
  background?: "white" | "gray" | "navy";
}

export function ImageTextBlock({
  image,
  imageAlt = "",
  title,
  body,
  layout = "image-left",
  background = "white",
}: ImageTextBlockProps) {
  const bgClass = {
    white: "bg-white",
    gray: "bg-gray-50",
    navy: "bg-navy",
  }[background];

  const textClass = background === "navy" ? "text-white" : "text-navy";
  const bodyClass = background === "navy" ? "text-white/80" : "text-gray-600";

  return (
    <SectionTracker name="ImageTextBlock">
      <section className={`py-16 ${bgClass}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`grid lg:grid-cols-2 gap-12 items-center ${
              layout === "image-right" ? "lg:[direction:rtl]" : ""
            }`}
          >
            {/* Image */}
            <div
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${layout === "image-right" ? "lg:[direction:ltr]" : ""}`}
            >
              <Image src={image} alt={imageAlt || title} fill className="object-cover" />
            </div>

            {/* Content */}
            <div className={layout === "image-right" ? "lg:[direction:ltr]" : ""}>
              <h2 className={`text-3xl font-semibold ${textClass} mb-6`}>{title}</h2>
              {typeof body === "string" ? (
                <p className={`${bodyClass} text-lg leading-relaxed`}>{body}</p>
              ) : (
                <div className={`${bodyClass} text-lg leading-relaxed space-y-4`}>{body}</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </SectionTracker>
  );
}
