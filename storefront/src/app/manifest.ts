import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CREATESPACE",
    short_name: "CREATESPACE",
    description:
      "South Africa's specialist STEM toy store. Curated robotics kits, coding toys, and science sets for kids.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0C1446",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "32x32 16x16",
        type: "image/x-icon",
      },
    ],
  };
}
