/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF/WebP formats enabled for production builds
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
};

export default nextConfig;
