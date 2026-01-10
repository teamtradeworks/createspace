import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import HeaderSkeleton from "@/components/HeaderSkeleton";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { getProducts } from "@/lib/shopify";

const outfit = localFont({
  src: "../../public/fonts/Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CREATESPACE | Build. Play. Learn.",
  description:
    "Curated STEM educational products and programmes to inspire and educate young minds in science, technology, engineering and mathematics.",
};

// Async component that fetches products for the header
async function HeaderWithProducts() {
  const menuProducts = await getProducts(15).catch((error) => {
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
        </CartProvider>
      </body>
    </html>
  );
}
