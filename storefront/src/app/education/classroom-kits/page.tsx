import { getCollectionProducts } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classroom Kits | Education | CREATESPACE",
  description:
    "STEM kits designed for classroom use. Multi-learner kits with bulk pricing for schools and educational institutions.",
  alternates: {
    canonical: "/education/classroom-kits",
  },
};

const benefits = [
  {
    title: "Multi-Learner Kits",
    description:
      "Designed for group work with enough components for multiple learners to participate simultaneously.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Teacher Guides Included",
    description:
      "Comprehensive lesson plans and teacher notes to help educators get the most from each kit.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
  },
  {
    title: "Bulk Pricing",
    description:
      "Special pricing for schools ordering multiple kits. Contact us for quotes on large orders.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
        />
      </svg>
    ),
  },
  {
    title: "Reusable Materials",
    description:
      "Durable components designed to be used year after year, maximising your investment.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
        />
      </svg>
    ),
  },
];

export default async function ClassroomKitsPage() {
  const { products } = await getCollectionProducts("classroom-kits");

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
            <p className="text-xl text-white/80 max-w-xl mb-8">
              Equip your classroom with hands-on STEM kits designed for group
              learning. Bulk pricing available for schools.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-cs-purple hover:bg-cs-purple/90 text-white rounded-lg font-semibold transition-colors"
            >
              Request Bulk Quote
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2">
          <div className="w-64 h-64 border-2 border-cs-purple/30 rounded-full" />
          <div className="w-48 h-48 border-2 border-cs-purple/20 rounded-full absolute top-8 left-8" />
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cs-purple font-medium text-sm uppercase tracking-wider">
              Why Choose Classroom Kits
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              Designed for Education
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our classroom kits are specifically designed for educational
              settings, with everything teachers need to deliver engaging STEM
              lessons.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-16 h-16 bg-cs-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-cs-purple">{benefit.icon}</div>
                </div>
                <h3 className="font-semibold text-navy mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cs-purple font-medium text-sm uppercase tracking-wider">
              Our Selection
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              Classroom Kits
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our range of classroom-ready STEM kits. Contact us for bulk
              pricing on orders of 10+ units.
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Classroom kits are coming soon. Contact us for more information.
              </p>
            </div>
          )}
        </div>
      </section>

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
                  pricing. Get in touch for a customised quote based on your
                  requirements.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Volume discounts on 10+ units",
                    "Custom kit configurations available",
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
                  Tell us about your school&apos;s needs and we&apos;ll prepare a
                  customised quote with bulk pricing.
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
              Looking for tutors or teacher training? We have more options for your school.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              href="/education/stem-tutors"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-navy group-hover:text-cs-orange transition-colors mb-2">
                STEM Tutors
              </h3>
              <p className="text-gray-600 text-sm">
                Expert facilitators bring STEM education directly to your school.
              </p>
            </Link>
            <Link
              href="/education/curriculum"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-navy group-hover:text-cs-blue transition-colors mb-2">
                Curriculum for Teachers
              </h3>
              <p className="text-gray-600 text-sm">
                Training and resources to empower your educators.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
