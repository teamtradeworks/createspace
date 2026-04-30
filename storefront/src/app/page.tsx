import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { getCollectionProducts, Product } from "@/lib/shopify";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturedProductsSkeleton from "@/components/FeaturedProductsSkeleton";
import AgeGroups from "@/components/AgeGroups";
import TrustBadges from "@/components/TrustBadges";
import EducationSection from "@/components/EducationSection";
import HeroCarousel from "@/components/HeroCarousel";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import TrackedSection from "@/components/TrackedSection";
import BrandLink from "@/components/BrandLink";
import HomeTestimonials from "@/components/HomeTestimonials";

export const metadata: Metadata = {
  title: "CREATESPACE | STEM Toys & Educational Kits for Kids in South Africa",
  description:
    "South Africa's specialist STEM toy store. Curated robotics kits, coding toys, and science sets for ages 3-13+. Free delivery over R1,500. Shop online or equip your school.",
  alternates: {
    canonical: "/",
  },
};

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

  // "All ages" tab shows every product that has an age metafield
  productsByAge["all"] = allProducts.filter((product) => {
    const minAge = product.minAge?.value ? parseInt(product.minAge.value, 10) : null;
    return minAge !== null;
  });

  for (const [groupId, [minRange, maxRange]] of Object.entries(ageRanges)) {
    productsByAge[groupId] = allProducts.filter((product) => {
      const minAge = product.minAge?.value ? parseInt(product.minAge.value, 10) : null;
      if (minAge === null) return false;
      const maxAge = product.maxAge?.value ? parseInt(product.maxAge.value, 10) : null;
      const productMax = maxAge ?? Infinity;
      return minAge <= maxRange && productMax >= minRange;
    });
  }

  return <FeaturedProducts productsByAge={productsByAge} />;
}

export default function Home() {
  return (
    <>
      <ScrollDepthTracker event="home_page_scroll_depth" />

      {/* Hero Carousel - Renders immediately, no data dependency */}
      <TrackedSection name="HeroCarousel" page="home">
        <HeroCarousel />
      </TrackedSection>

      {/* Age Groups - Visual Cards */}
      <TrackedSection name="AgeGroups" page="home">
        <AgeGroups />
      </TrackedSection>

      {/* Featured Products with Age Group Tabs - Streamed after hero */}
      <TrackedSection name="FeaturedProducts" page="home">
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProductsLoader />
        </Suspense>
      </TrackedSection>

      {/* Why STEM Section */}
      <TrackedSection name="WhyStem" page="home">
        <section className="py-16 relative overflow-hidden">
          {/* Decorative illustrations */}
          <div className="hidden lg:block absolute -left-16 top-1/4 w-32 h-32 opacity-20">
            <Image
              src="/images/illustrations/robot-orange.png"
              alt=""
              width={128}
              height={128}
              className="object-contain"
              loading="lazy"
            />
          </div>
          <div className="hidden lg:block absolute -right-8 bottom-1/4 w-24 h-24 opacity-20">
            <Image
              src="/images/illustrations/atom.png"
              alt=""
              width={96}
              height={96}
              className="object-contain"
              loading="lazy"
            />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
                The Numbers Don&apos;t Lie
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
                Why Early STEM Exposure Matters
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Research shows that early hands-on STEM experience builds the foundation for
                academic confidence, logical thinking, and future career success.
              </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  number: "75%",
                  label:
                    "of the fastest-growing careers require STEM skills. Hands-on experience now builds confidence for later.",
                  color: "text-cs-red",
                  border: "border-cs-red/30",
                },
                {
                  number: "3x",
                  label: "faster job growth in STEM fields compared to other industries worldwide.",
                  color: "text-cs-blue",
                  border: "border-cs-blue/30",
                },
                {
                  number: "2x",
                  label:
                    "higher earning potential for STEM graduates compared to non-STEM careers.",
                  color: "text-cs-green",
                  border: "border-cs-green/30",
                },
                {
                  number: "80%",
                  label:
                    "of jobs in the next decade will require some form of tech or science literacy.",
                  color: "text-cs-purple",
                  border: "border-cs-purple/30",
                },
              ].map((stat) => (
                <div
                  key={stat.number}
                  className={`bg-gray-50 rounded-xl p-5 md:p-6 text-center border-2 ${stat.border}`}
                >
                  <p className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-3 ${stat.color}`}>
                    {stat.number}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </TrackedSection>

      {/* Our Brands Section */}
      <TrackedSection name="OurBrands" page="home">
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
                Our Brands
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
                Trusted Names in STEM
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We are official, registered suppliers of trusted STEM brands — bringing you
                authentic, quality products backed by full manufacturer support.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                {
                  name: "MatataStudio",
                  logo: "/images/brands/matatastudio.png",
                  vendor: "MatataStudio",
                },
                { name: "Makerzoid", logo: "/images/brands/makerzoid.png", vendor: "Makerzoid" },
                {
                  name: "BBC micro:bit",
                  logo: "/images/brands/bbc-microbit.png",
                  vendor: "micro:bit",
                },
                { name: "ELECFREAKS", logo: "/images/brands/elecfreaks.png", vendor: "ELECFREAKS" },
                {
                  name: "Snap Circuits",
                  logo: "/images/brands/snap-circuits.png",
                  vendor: "Snap Circuits",
                },
                { name: "Arduino", logo: "/images/brands/arduino.png", vendor: "Arduino" },
                {
                  name: "National Geographic",
                  logo: "/images/brands/national-geographic.png",
                  comingSoon: true,
                },
                { name: "Blockaroo", logo: "/images/brands/blockaroo.png", comingSoon: true },
                { name: "NASA", logo: "/images/brands/nasa.png", comingSoon: true },
                { name: "Robotico", logo: "/images/brands/robotico.png", vendor: "Robotico" },
              ].map((brand) => {
                const card = (
                  <div className="relative bg-white rounded-xl p-6 flex flex-col items-center justify-center aspect-square shadow-sm">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={160}
                      height={160}
                      className={`object-contain w-full h-full max-w-[140px] max-h-[140px] ${brand.comingSoon ? "opacity-40" : ""}`}
                    />
                    {brand.comingSoon && (
                      <span className="absolute bottom-3 text-[11px] font-semibold text-navy/50 uppercase tracking-wider">
                        Coming Soon
                      </span>
                    )}
                  </div>
                );

                if (brand.vendor) {
                  return (
                    <BrandLink key={brand.name} brand={brand.name} vendor={brand.vendor}>
                      {card}
                    </BrandLink>
                  );
                }

                return <div key={brand.name}>{card}</div>;
              })}
            </div>
          </div>
        </section>
      </TrackedSection>

      {/* Testimonials Section */}
      <TrackedSection name="Testimonials" page="home">
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Decorative illustrations */}
          <div className="hidden lg:block absolute right-12 top-16 w-28 h-28 opacity-15">
            <Image
              src="/images/illustrations/robot-blue.png"
              alt=""
              width={112}
              height={112}
              className="object-contain"
              loading="lazy"
            />
          </div>
          <div className="hidden lg:block absolute left-8 bottom-24 w-20 h-20 opacity-15">
            <Image
              src="/images/illustrations/lightbulb.png"
              alt=""
              width={80}
              height={80}
              className="object-contain"
              loading="lazy"
            />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
                What Parents & Educators Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from the families and schools who love what we do.
              </p>
            </div>

            {/* Testimonials Row */}
            <HomeTestimonials />

          </div>
        </section>
      </TrackedSection>

      {/* Trust Badges */}
      <TrackedSection name="TrustBadges" page="home">
        <TrustBadges />
      </TrackedSection>

      {/* Education Section */}
      <TrackedSection name="Education" page="home">
        <EducationSection />
      </TrackedSection>
    </>
  );
}
