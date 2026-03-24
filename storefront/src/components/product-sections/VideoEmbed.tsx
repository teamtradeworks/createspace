import SectionTracker from "./SectionTracker";

interface VideoEmbedProps {
  url: string;
  title?: string;
  aspectRatio?: "16:9" | "4:3" | "1:1";
  background?: "white" | "gray" | "navy";
}

function getVideoEmbedUrl(url: string): string | null {
  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  // If it's already an embed URL, return as-is
  if (url.includes("embed") || url.includes("player")) {
    return url;
  }

  return null;
}

export function VideoEmbed({
  url,
  title,
  aspectRatio = "16:9",
  background = "white",
}: VideoEmbedProps) {
  const embedUrl = getVideoEmbedUrl(url);

  if (!embedUrl) {
    return null;
  }

  const bgClass = {
    white: "bg-white",
    gray: "bg-gray-50",
    navy: "bg-navy",
  }[background];

  const textClass = background === "navy" ? "text-white" : "text-navy";

  const aspectClass = {
    "16:9": "aspect-video",
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
  }[aspectRatio];

  return (
    <SectionTracker name="VideoEmbed">
      <section className={`py-16 ${bgClass}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className={`text-3xl font-semibold ${textClass} text-center mb-8`}>
            {title}
          </h2>
        )}

        <div className={`${aspectClass} rounded-2xl overflow-hidden shadow-lg`}>
          <iframe
            src={embedUrl}
            title={title || "Product video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
    </SectionTracker>

  );
}
