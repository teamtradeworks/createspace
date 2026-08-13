import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/search", "/product/kitchen-sink", "/account/unsubscribe"],
    },
    sitemap: "https://thecreatespace.co.za/sitemap.xml",
  };
}
