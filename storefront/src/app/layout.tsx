import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import EmailPopup from "@/components/EmailPopup";
import PostHogPageview from "@/components/PostHogPageview";
import GTMPageview from "@/components/GTMPageview";
import GoogleTagManager from "@/components/GoogleTagManager";
import ScrollToTop from "@/components/ScrollToTop";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        {/* Facebook Pixel stub — must be synchronous so it's defined before GTM fires */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(!window.fbq){window.fbq=function(){window.fbq.callMethod?window.fbq.callMethod.apply(window.fbq,arguments):window.fbq.queue.push(arguments)};window._fbq=window.fbq;window.fbq.push=window.fbq;window.fbq.loaded=!0;window.fbq.version='2.0';window.fbq.queue=[]}`,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <OrganizationJsonLd />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Suspense fallback={null}>
            <ScrollToTop />
            <PostHogPageview />
            <GTMPageview />
          </Suspense>
          <EmailPopup />
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
