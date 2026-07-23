import type { Metadata } from "next";
import { Suspense } from "react";
import { getCollectionProducts, Product } from "@/lib/shopify";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import AgeGroups from "@/components/AgeGroups";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturedProductsSkeleton from "@/components/FeaturedProductsSkeleton";
import WhyCreatespace from "@/components/WhyCreatespace";
import CustomerPhotoWall from "@/components/CustomerPhotoWall";
import HomeTestimonials from "@/components/HomeTestimonials";
import BrandStrip from "@/components/BrandStrip";
import EducationBanner from "@/components/EducationBanner";
import FinalCta from "@/components/FinalCta";
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

// Interleave products round-robin by vendor so the same brand never clusters together
function interleaveByVendor(products: Product[]): Product[] {
  const byVendor = new Map<string, Product[]>();
  for (const product of products) {
    const key = product.vendor || "unknown";
    if (!byVendor.has(key)) byVendor.set(key, []);
    byVendor.get(key)!.push(product);
  }
  const groups = Array.from(byVendor.values());
  const result: Product[] = [];
  let i = 0;
  while (result.length < products.length) {
    for (const group of groups) {
      if (i < group.length) result.push(group[i]);
    }
    i++;
  }
  return result;
}

// Async component that fetches and renders featured products
async function FeaturedProductsLoader() {
  let allProducts: Product[] = [];

  try {
    ({ products: allProducts } = await getCollectionProducts("shop-all-headless", 100));
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  // Filter products by age metafields — show if the product's age range overlaps with the group's range
  const ageRanges: Record<string, [number, number]> = {
    "3-5": [3, 5],
    "6-8": [6, 8],
    "9-12": [9, 12],
    "13+": [13, 99],
  };

  const productsByAge: Record<string, Product[]> = {};

  const inStockProducts = allProducts.filter((product) => product.availableForSale);

  // "All ages" tab shows every product that has an age metafield
  productsByAge["all"] = interleaveByVendor(
    inStockProducts.filter((product) => {
      const minAge = product.minAge?.value ? parseInt(product.minAge.value, 10) : null;
      return minAge !== null;
    })
  );

  for (const [groupId, [minRange, maxRange]] of Object.entries(ageRanges)) {
    productsByAge[groupId] = interleaveByVendor(
      inStockProducts.filter((product) => {
        const minAge = product.minAge?.value ? parseInt(product.minAge.value, 10) : null;
        if (minAge === null) return false;
        const maxAge = product.maxAge?.value ? parseInt(product.maxAge.value, 10) : null;
        const productMax = maxAge ?? Infinity;
        return minAge <= maxRange && productMax >= minRange;
      })
    );
  }

  return <FeaturedProducts productsByAge={productsByAge} />;
}

function AgeGroupsSkeleton() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <div className="h-9 w-48 bg-gray-200 rounded-lg animate-pulse mb-3" />
          <div className="h-5 w-80 max-w-full bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <ScrollDepthTracker event="home_page_scroll_depth" />

      {/* Static hero + trust strip - renders immediately, no data dependency */}
      <TrackedSection name="Hero" page="home">
        <Hero />
      </TrackedSection>

      <TrackedSection name="TrustStrip" page="home">
        <TrustStrip />
      </TrackedSection>

      {/* Shop by age - photo cards, streamed once product images resolve */}
      <TrackedSection name="AgeGroups" page="home">
        <Suspense fallback={<AgeGroupsSkeleton />}>
          <AgeGroups />
        </Suspense>
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
    </>
  );
}
