import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts, Product } from "@/lib/shopify";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturedProductsSkeleton from "@/components/FeaturedProductsSkeleton";
import AgeGroups from "@/components/AgeGroups";
import TrustBadges from "@/components/TrustBadges";
import EducationSection from "@/components/EducationSection";
import HeroCarousel from "@/components/HeroCarousel";

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
    allProducts = await getProducts(100);
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
      {/* Hero Carousel - Renders immediately, no data dependency */}
      <HeroCarousel />

      {/* Age Groups - Visual Cards */}
      <AgeGroups />

      {/* Featured Products with Age Group Tabs - Streamed after hero */}
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProductsLoader />
      </Suspense>

      {/* Why STEM Section */}
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
              The Numbers
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              Why Early STEM Exposure Matters
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The future belongs to problem-solvers, inventors, and creative
              thinkers. Here&apos;s why starting early makes all the difference.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            {[
              {
                number: "85%",
                label:
                  "Of the jobs that will exist in 2030 haven\u2019t been invented yet. STEM prepares kids for the unknown.",
                color: "border-cs-red",
              },
              {
                number: "3x",
                label:
                  "Faster growth in STEM careers compared to non-STEM jobs worldwide.",
                color: "border-cs-blue",
              },
              {
                number: "2x",
                label:
                  "Higher earnings for STEM graduates compared to non-STEM careers.",
                color: "border-cs-green",
              },
              {
                number: "4.2M",
                label:
                  "Open tech positions globally \u2014 and growing 22% every year. STEM skills open doors worldwide.",
                color: "border-cs-purple",
              },
            ].map((stat) => (
              <div
                key={stat.number}
                className={`bg-gray-50 rounded-xl p-5 md:p-6 border-l-4 ${stat.color}`}
              >
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-2">
                  {stat.number}
                </p>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Two-column: narrative + image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-navy mb-6">
                Give Them a Head Start
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Children&apos;s brains develop fastest in their earliest years.
                Early exposure to STEM builds curiosity, problem-solving skills,
                and a foundation that lasts a lifetime.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Early maths skills predict academic success better than early reading",
                  "Kids exposed to STEM young are far more likely to pursue STEM careers",
                  "Birth to age 5 is the most critical window for STEM brain development",
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-cs-green mt-0.5 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/shop"
                className="inline-flex items-center text-cs-orange hover:text-cs-red font-medium transition-colors"
              >
                Explore Our STEM Kits
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src="/images/home/children-robotics-workshop.jpg"
                  alt="Children building robots in a STEM workshop"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-cs-orange/20 rounded-full -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-cs-blue/20 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Education Section */}
      <EducationSection />

      {/* Testimonials Section */}
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
              Join thousands of families and schools who trust CREATESPACE to inspire
              the next generation of innovators.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "My son couldn't put down the Robotico kit! He's learned more about circuits in a week than I could have taught him in months. The instructions were clear and age-appropriate.",
                author: "Sarah M.",
                role: "Parent of 10-year-old",
                rating: 5,
              },
              {
                quote:
                  "We've equipped our entire Grade 5-7 programme with CREATESPACE kits. The curriculum alignment and teacher resources make STEM integration seamless.",
                author: "David K.",
                role: "Head of Technology, Redhill School",
                rating: 5,
              },
              {
                quote:
                  "Finally, STEM products that actually work! Fast delivery to Cape Town and the quality exceeded expectations. Already ordered our second kit.",
                author: "Nomvula P.",
                role: "Parent of 7 & 9-year-olds",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 relative"
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-cs-orange/20">
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-cs-yellow"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div>
                  <p className="font-semibold text-navy">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap justify-center items-center gap-8 text-center">
              <div>
                <p className="text-3xl font-semibold text-navy">2,500+</p>
                <p className="text-sm text-gray-500">Happy Families</p>
              </div>
              <div className="w-px h-12 bg-gray-200 hidden sm:block" />
              <div>
                <p className="text-3xl font-semibold text-navy">100+</p>
                <p className="text-sm text-gray-500">Partner Schools</p>
              </div>
              <div className="w-px h-12 bg-gray-200 hidden sm:block" />
              <div>
                <p className="text-3xl font-semibold text-navy">4.9/5</p>
                <p className="text-sm text-gray-500">Average Rating</p>
              </div>
              <div className="w-px h-12 bg-gray-200 hidden sm:block" />
              <div>
                <p className="text-3xl font-semibold text-navy">15,000+</p>
                <p className="text-sm text-gray-500">Kits Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy py-16 relative overflow-hidden">
        {/* Decorative illustration */}
        <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 w-32 h-32 opacity-10">
          <Image
            src="/images/illustrations/robot-green.png"
            alt=""
            width={128}
            height={128}
            className="object-contain"
            loading="lazy"
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Ready to Spark Curiosity?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Browse our collection of STEM kits and find the perfect gift for the
            young innovator in your life.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 text-white rounded-lg font-semibold transition-colors"
          >
            Explore All Products
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
