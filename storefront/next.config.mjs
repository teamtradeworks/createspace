import { withSentryConfig } from "@sentry/nextjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_IS_CI: process.env.GITHUB_ACTIONS || "",
  },
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      { source: "/shop/all", destination: "/shop", permanent: true },
      { source: "/shop/age/3-5", destination: "/shop?age=3-5", permanent: true },
      { source: "/shop/age/6-8", destination: "/shop?age=6-8", permanent: true },
      { source: "/shop/age/9-12", destination: "/shop?age=9-12", permanent: true },
      { source: "/shop/age/13-plus", destination: "/shop?age=13%2B", permanent: true },
      { source: "/shop/discipline/:slug", destination: "/shop", permanent: true },
      {
        source: "/product/arduino%C2%AE-student-kit",
        destination: "/product/arduino-student-kit",
        permanent: true,
      },
      {
        source: "/products/:slug",
        destination: "/product/:slug",
        permanent: true,
      },

      // Dead product URLs → closest live destination.
      // Identified via PostHog: /product/{handle} pageviews that never fire product_viewed.
      // Typos / renames that have a 1:1 live equivalent
      {
        source: "/product/makerzoid-robot-master-premi",
        destination: "/product/makerzoid-robot-master-premium",
        permanent: true,
      },
      {
        source: "/product/elecfreak-micro-bit-smart-cutebot-pro-without-micro-bit-board",
        destination: "/product/elecfreaks-micro-bit-smart-cutebot-pro",
        permanent: true,
      },
      {
        source: "/product/bbc-micro-bit-go-elecfreaks-smart-cutebot-elecfreaks-mechanical-catch",
        destination: "/product/bbc-micro-bit-go",
        permanent: true,
      },
      {
        source: "/product/bbc-micro-bit-go-elecfreaks-starter-kit",
        destination: "/product/bbc-micro-bit-go",
        permanent: true,
      },

      // Discontinued Makerzoid SKUs → Makerzoid brand filter
      {
        source: "/product/makerzoid-robot-master-standard",
        destination: "/shop?brand=Makerzoid",
        permanent: true,
      },
      {
        source: "/product/makerzoid-fun-building-blocks",
        destination: "/shop?brand=Makerzoid",
        permanent: true,
      },
      {
        source: "/product/makerzoid-big-blocks-future-mechanic",
        destination: "/shop?brand=Makerzoid",
        permanent: true,
      },
      {
        source: "/product/makerzoid-big-blocks-mechanical-engineer-team",
        destination: "/shop?brand=Makerzoid",
        permanent: true,
      },
      {
        source: "/product/makerzoid-happy-farms-bountiful-fields",
        destination: "/shop?brand=Makerzoid",
        permanent: true,
      },
      {
        source: "/product/makerzoid-smart-robot-building-blocks",
        destination: "/shop?brand=Makerzoid",
        permanent: true,
      },

      // Discontinued ELECFREAKS SKUs → ELECFREAKS brand filter
      {
        source: "/product/elecfreaks-micro-bit-smart-science-iot-kit",
        destination: "/shop?brand=ELECFREAKS",
        permanent: true,
      },
      {
        source: "/product/elecfreaks-micro-bit-smart-science-iot-kit-without-micro-bit-board",
        destination: "/shop?brand=ELECFREAKS",
        permanent: true,
      },
      {
        source: "/product/elecfreaks-micro-bit-smart-agriculture-kit",
        destination: "/shop?brand=ELECFREAKS",
        permanent: true,
      },
      {
        source: "/product/elecfreaks-smart-home-kit-for-micro-bit-without-micro-bit-board",
        destination: "/shop?brand=ELECFREAKS",
        permanent: true,
      },
      {
        source: "/product/elecfreaks-bbc-micro-bit-starter-kit-without-micro-bit-board",
        destination: "/shop?brand=ELECFREAKS",
        permanent: true,
      },

      // Robotico — old SKUs and missing route
      {
        source: "/product/upgraded-uno-r3-starter-kit",
        destination: "/shop?brand=Robotico",
        permanent: true,
      },
      {
        source: "/product/37-sensor-kit-v2-0",
        destination: "/shop?brand=Robotico",
        permanent: true,
      },
      {
        source: "/product/37-sensor-module-kit",
        destination: "/shop?brand=Robotico",
        permanent: true,
      },

      // Discontinued Arduino SKUs → Arduino brand filter
      {
        source: "/product/arduino-uno-wifi-rev2",
        destination: "/shop?brand=Arduino",
        permanent: true,
      },
      {
        source: "/product/arduino%C2%AE-plug-and-make-kit",
        destination: "/shop?brand=Arduino",
        permanent: true,
      },

      // Brands no longer stocked → /shop fallback
      {
        source: "/product/acebott-esp32-max-1-0-development-board",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/product/acebott-esp32-tank-robot-car-expansion-pack",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/product/acebott-smart-car-starter-kit-qd001",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/product/acebott-intelligent-transport-education-kit-level-1",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/product/acebott-iot-smart-home-basic-starter-kit-for-esp32-qe004",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/product/acebott-iot-smart-home-starter-qe007",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/product/acebott-iot-smart-farm-starter-kit-qe010",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/product/acebott-smart-home-basic-starter-kit-with-micro-bit-qe005",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/product/acebott-education-solution-series-smart-home-education-kit-level-1",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/product/easy-plug-acebott-iot-smart-home-starter-kit-for-esp32",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/product/dfrobot-gravity-starter-kit-for-arduino",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/product/raspberry-pi-pico-starter-kit",
        destination: "/shop",
        permanent: true,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "tradeworks",

  project: "createspace",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
