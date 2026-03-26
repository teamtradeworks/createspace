import { getCollectionProducts } from "@/lib/shopify";
import { Product } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import BrandSwitcher from "@/components/education/BrandSwitcher";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classroom Kits | Education | CREATESPACE",
  description:
    "STEM kits from MatataStudio and BBC micro:bit designed for classroom use. Screen-free coding for young learners, physical computing for older students, and bulk pricing for schools.",
  alternates: {
    canonical: "/education/classroom-kits",
  },
};

function filterProductsByBrand(products: Product[], brand: string): Product[] {
  const brandLower = brand.toLowerCase();
  return products.filter(
    (p) =>
      p.vendor?.toLowerCase().includes(brandLower) ||
      p.title.toLowerCase().includes(brandLower)
  );
}

export default async function ClassroomKitsPage() {
  const { products } = await getCollectionProducts("classroom-kits");

  const matataProducts = filterProductsByBrand(products, "matata");
  const microbitProducts = filterProductsByBrand(products, "micro");

  // Fallback: products that don't match either brand
  const otherProducts = products.filter(
    (p) => !matataProducts.includes(p) && !microbitProducts.includes(p)
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Link
              href="/education"
              className="inline-flex items-center text-white/60 hover:text-white mb-4 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Education
            </Link>
            <span className="text-cs-purple font-medium text-sm uppercase tracking-wider">
              For Schools
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 leading-tight">
              Classroom STEM Kits
            </h1>
            <p className="text-xl text-white/80 max-w-xl mb-4">
              Hands-on coding and robotics kits built for classroom learning.
              Choose from two world-class brands, each designed for different
              ages and teaching approaches.
            </p>
            <p className="text-white/60 mb-8">
              Bulk pricing available for schools ordering 10+ units.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#brands"
                className="inline-flex items-center px-8 py-4 bg-cs-purple hover:bg-cs-purple/90 text-white rounded-lg font-semibold transition-colors"
              >
                Explore Brands
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white rounded-lg font-semibold transition-colors"
              >
                Request Bulk Quote
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2">
          <div className="w-64 h-64 border-2 border-cs-purple/30 rounded-full" />
          <div className="w-48 h-48 border-2 border-cs-purple/20 rounded-full absolute top-8 left-8" />
        </div>
      </section>

      {/* Brand Switcher Section */}
      <section id="brands" className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cs-purple font-medium text-sm uppercase tracking-wider">
              Two Trusted Brands
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              Which Brand Suits Your Classroom?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We carry classroom kits from two globally recognised STEM
              education brands. Hover over a brand to explore its approach, age
              focus, and product range.
            </p>
          </div>

          <BrandSwitcher
            matataProducts={matataProducts}
            microbitProducts={microbitProducts}
          />
        </div>
      </section>

      {/* Other Products (if any don't match either brand) */}
      {otherProducts.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-cs-purple font-medium text-sm uppercase tracking-wider">
                More Options
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
                Other Classroom Kits
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {otherProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bulk Order CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-semibold text-white mb-4">
                  Need Bulk Pricing?
                </h2>
                <p className="text-white/80 mb-6">
                  Schools ordering 10 or more kits qualify for special bulk
                  pricing. Not sure which brand or kit is right for your school?
                  We&apos;ll help you choose.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Volume discounts on 10+ units",
                    "Mix and match across brands and age groups",
                    "Dedicated support for schools",
                    "Flexible payment terms for institutions",
                  ].map((item) => (
                    <li key={item} className="flex items-center text-white/90">
                      <svg
                        className="w-5 h-5 text-cs-purple mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Request a Quote
                </h3>
                <p className="text-white/70 mb-6">
                  Tell us about your school&apos;s needs — grade levels, number
                  of learners, and budget — and we&apos;ll prepare a customised
                  quote with bulk pricing.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center w-full justify-center px-8 py-4 bg-cs-purple hover:bg-cs-purple/90 text-white rounded-lg font-semibold transition-colors"
                >
                  Contact Us
                  <svg
                    className="w-5 h-5 ml-2"
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
            </div>
          </div>
        </div>
      </section>

      {/* Other Education Options */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-navy mb-4">
              Explore Other Education Solutions
            </h2>
            <p className="text-gray-600">
              Looking for tutors, teacher training, or online courses? We have
              more options for your school.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/education/stem-tutors"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-navy group-hover:text-cs-orange transition-colors mb-2">
                STEM Tutors
              </h3>
              <p className="text-gray-600 text-sm">
                Expert facilitators bring STEM education directly to your
                school.
              </p>
            </Link>
            <Link
              href="/education/curriculum"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-navy group-hover:text-cs-blue transition-colors mb-2">
                Curriculum for Schools
              </h3>
              <p className="text-gray-600 text-sm">
                Training and resources to empower your educators.
              </p>
            </Link>
            <Link
              href="/education/courses"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-navy group-hover:text-cs-green transition-colors mb-2">
                Short Courses
              </h3>
              <p className="text-gray-600 text-sm">
                Online STEM courses hosted on the Inspire Africa platform.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
