import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import HeaderSkeleton from "@/components/HeaderSkeleton";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { getProducts } from "@/lib/shopify";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const outfit = localFont({
  src: "../../public/fonts/Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thecreatespace.co.za"),
  title: "CREATESPACE | Build. Play. Learn.",
  description:
    "Curated STEM educational products and programmes to inspire and educate young minds in science, technology, engineering and mathematics.",
  openGraph: {
    type: "website",
    siteName: "CREATESPACE",
    locale: "en_ZA",
    images: [
      {
        url: "/images/home/hero-stem-education.jpg",
        width: 1200,
        height: 630,
        alt: "CREATESPACE - Build. Play. Learn.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

// Async component that fetches products for the header
async function HeaderWithProducts() {
  const menuProducts = await getProducts(50).catch((error) => {
    console.error("Failed to fetch menu products:", error);
    return [];
  });
  return <Header products={menuProducts} />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        {/* Preload hero image for faster LCP */}
        <link
          rel="preload"
          href="/images/home/hero-stem-education.jpg"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
      </head>
      <body className="antialiased">
        <CartProvider>
          <Suspense fallback={<HeaderSkeleton />}>
            <HeaderWithProducts />
          </Suspense>
          <main>{children}</main>
          <Footer />
          <SpeedInsights />
          <Analytics />
        </CartProvider>
        {process.env.NEXT_PUBLIC_FERA_PUBLIC_KEY && (
          <Script
            id="fera-init"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  window.fera = window.fera || [];
                  window.fera.push("configure", { store_pk: "${process.env.NEXT_PUBLIC_FERA_PUBLIC_KEY}" });
                  var s = document.createElement("script");
                  s.type = "text/javascript";
                  s.async = true;
                  s.src = "https://cdn.fera.ai/js/fera.js";
                  document.body.appendChild(s);
                })();
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
