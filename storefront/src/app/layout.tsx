import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { getProducts, Product } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "CREATESPACE | Build. Play. Learn.",
  description:
    "Curated STEM educational products and programmes to inspire and educate young minds in science, technology, engineering and mathematics.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch products for the navigation menu
  let menuProducts: Product[] = [];
  try {
    menuProducts = await getProducts(15);
  } catch (error) {
    console.error("Failed to fetch menu products:", error);
  }

  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <Header products={menuProducts} />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
