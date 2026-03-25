import { MetadataRoute } from "next";
import { getProducts } from "@/lib/shopify";

const BASE_URL = "https://thecreatespace.co.za";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts(250);

  const productEntries: MetadataRoute.Sitemap = products
    .filter((product) => product.handle !== "kitchen-sink")
    .map((product) => ({
      url: `${BASE_URL}/product/${product.handle}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Use the most recent product update as a proxy for dynamic page freshness
  const latestProductUpdate = products.reduce((latest, product) => {
    if (!product.updatedAt) return latest;
    const date = new Date(product.updatedAt);
    return date > latest ? date : latest;
  }, new Date(0));
  const shopLastModified = latestProductUpdate.getTime() > 0 ? latestProductUpdate : new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: shopLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: shopLastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/education`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/education/stem-tutors`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/education/curriculum`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/education/classroom-kits`,
      lastModified: shopLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/education/courses`,
      lastModified: shopLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date("2026-03-03"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/refund`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/delivery-policy`,
      lastModified: new Date("2026-03-03"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/downloads`,
      lastModified: new Date("2026-03-25"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticPages, ...productEntries];
}
