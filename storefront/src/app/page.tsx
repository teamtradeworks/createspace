import type { Metadata } from "next";
import { Suspense } from "react";
import { getCollectionProducts, Product } from "@/lib/shopify";
import Hero from "@/components/Hero";
import AgeGroups from "@/components/AgeGroups";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturedProductsSkeleton from "@/components/FeaturedProductsSkeleton";
import WhyCreatespace from "@/components/WhyCreatespace";
import CustomerPhotoWall from "@/components/CustomerPhotoWall";
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

// Async component that fetches the whole catalogue in best-selling order.
// We pass every product (not just the top N) so the section can offer a filter
// toggle for every brand we stock — low-volume brands like NASA and Snap
// Circuits only appear well down the best-selling list. Out-of-stock kits are
// kept (the cards show a "Sold out" state) so a brand's lineup matches the
// shop's, but they're ordered last so the default teaser leads with kits you
// can actually buy. `description` is stripped because the cards never render it
// and it is ~half the payload; the component shows a top-N teaser until a brand
// is selected.
async function FeaturedProductsLoader() {
  let allProducts: Product[] = [];

  try {
    ({ products: allProducts } = await getCollectionProducts("shop-all-headless", 100, "BEST_SELLING"));
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  const products = allProducts
    .map((product) => ({ ...product, description: "" }))
    // Stable sort keeps best-selling order within each group; in-stock first.
    .sort((a, b) => Number(b.availableForSale) - Number(a.availableForSale));

  return <FeaturedProducts products={products} />;
}

export default function Home() {
  return (
    <>
      <ScrollDepthTracker event="home_page_scroll_depth" />

      {/* Static hero - renders immediately, no data dependency */}
      <TrackedSection name="Hero" page="home">
        <Hero />
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

      {/* Genuine builds with the kits we stock */}
      <TrackedSection name="CustomerPhotoWall" page="home">
        <CustomerPhotoWall />
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
