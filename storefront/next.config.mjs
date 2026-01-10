/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "robotixkids.co.za",
      },
      {
        protocol: "https",
        hostname: "www.makerzoid.com",
      },
      {
        protocol: "https",
        hostname: "thecreatespace.co.za",
      },
    ],
  },
};

export default nextConfig;
