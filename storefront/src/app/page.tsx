import type { Metadata } from "next";
import { Suspense } from "react";
import { getCollectionProducts, Product } from "@/lib/shopify";
import Hero from "@/components/Hero";
import AgeGroups from "@/components/AgeGroups";
import PromoBand from "@/components/PromoBand";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturedProductsSkeleton from "@/components/FeaturedProductsSkeleton";
import WhyCreatespace from "@/components/WhyCreatespace";
import CustomerPhotoWall from "@/components/CustomerPhotoWall";
import CustomerPhotoWallSkeleton from "@/components/CustomerPhotoWallSkeleton";
import HomeTestimonials from "@/components/HomeTestimonials";
import BrandStrip from "@/components/BrandStrip";
import EducationBanner from "@/components/EducationBanner";
import FinalCta from "@/components/FinalCta";
import NewsletterBand from "@/components/NewsletterBand";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import TrackedSection from "@/components/TrackedSection";

export const metadata: Metadata = {
  title: "CREATESPACE | STEM Toys & Educational Kits for Kids in South Africa",
  description:
    "South Africa's specialist STEM toy store. Curated robotics kits, coding toys, and science sets for ages 3-13+. Free delivery over R1,500. Shop online or equip your school.",
  alternates: {
    canonical: "/",
  },
};

// Async component that fetches products for the "Shop our kits" section.
// Two collections are fetched in parallel:
//  - "shop-all-headless" (BEST_SELLING): full catalogue used when a brand filter
//    is active, so the brand's complete lineup appears in best-selling order.
//  - "featured-products-homepage-headless" (COLLECTION_DEFAULT): manually curated
//    order set in Shopify admin, used for the default no-brand-selected view.
// Out-of-stock kits are kept so brand lineups are complete, but sorted last.
// `description` is stripped — cards never render it and it halves the payload.
async function FeaturedProductsLoader() {
  let allProducts: Product[] = [];
  let featuredRaw: Product[] = [];

  try {
    [{ products: allProducts }, { products: featuredRaw }] = await Promise.all([
      getCollectionProducts("shop-all-headless", 100, "BEST_SELLING"),
      getCollectionProducts("featured-products-homepage-headless", 50, "COLLECTION_DEFAULT"),
    ]);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  const strip = (p: Product) => ({ ...p, description: "" });

  // All products: best-selling order, in-stock first (for brand filter view).
  const products = allProducts
    .map(strip)
    .sort((a, b) => Number(b.availableForSale) - Number(a.availableForSale));

  // Featured products: preserve Shopify collection order, in-stock first.
  const featuredProducts = featuredRaw
    .map(strip)
    .sort((a, b) => Number(b.availableForSale) - Number(a.availableForSale));

  return <FeaturedProducts products={products} featuredProducts={featuredProducts} />;
}

export default function Home() {
  return (
    <>
      <ScrollDepthTracker event="home_page_scroll_depth" />

      {/* Static hero - renders immediately, no data dependency */}
      <TrackedSection name="Hero" page="home">
        <Hero />
      </TrackedSection>

      {/* Current promotion — full-width strip directly under the hero (config/promo.ts) */}
      <TrackedSection name="Promo" page="home">
        <PromoBand />
      </TrackedSection>

      {/* Find the right kit: age photo cards + category chips, fully static */}
      <TrackedSection name="AgeGroups" page="home">
        <AgeGroups />
      </TrackedSection>

      {/* Bestsellers with age group tabs */}
      <TrackedSection name="Bestsellers" page="home">
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProductsLoader />
        </Suspense>
      </TrackedSection>

      {/* Genuine builds with the kits we stock. Streamed behind Suspense: the
          wall resolves a Shopify lookup per unique product handle, and without
          a boundary those fetches would gate the whole page's first byte
          (including the hero/LCP) on a cold data cache. */}
      <TrackedSection name="CustomerPhotoWall" page="home">
        <Suspense fallback={<CustomerPhotoWallSkeleton />}>
          <CustomerPhotoWall />
        </Suspense>
      </TrackedSection>

      {/* Differentiator - the team behind the store */}
      <TrackedSection name="WhyCreatespace" page="home">
        <WhyCreatespace />
      </TrackedSection>

      {/* Testimonials */}
      <TrackedSection name="Testimonials" page="home">
        <HomeTestimonials />
      </TrackedSection>

      {/* Official supplier strip */}
      <TrackedSection name="BrandStrip" page="home">
        <BrandStrip />
      </TrackedSection>

      {/* Education banner */}
      <TrackedSection name="Education" page="home">
        <EducationBanner />
      </TrackedSection>

      {/* Final CTA */}
      <TrackedSection name="FinalCta" page="home">
        <FinalCta />
      </TrackedSection>

      {/* Newsletter signup, above the footer */}
      <TrackedSection name="Newsletter" page="home">
        <NewsletterBand />
      </TrackedSection>
    </>
  );
}
