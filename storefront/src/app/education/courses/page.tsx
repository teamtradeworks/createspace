import { getProductByHandle } from "@/lib/shopify";
import BundleComparison from "@/components/BundleComparison";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Short Courses | Education | CREATESPACE",
  description:
    "Online STEAM short courses hosted on Inspire Africa's learning platform. Purchase a course and receive a QR code for instant access to hands-on digital learning.",
  alternates: {
    canonical: "/education/courses",
  },
};

const benefits = [
  {
    title: "Learn at Your Own Pace",
    description:
      "Self-paced online modules that fit around your schedule. Complete lessons whenever it suits you.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Practical STEAM Skills",
    description:
      "Hands-on content you can apply directly in the classroom or in your own learning journey.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743"
        />
      </svg>
    ),
  },
  {
    title: "Expert Content",
    description:
      "Courses developed by Inspire Africa education specialists with real-world STEAM expertise.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    ),
  },
  {
    title: "Instant Access",
    description:
      "Start learning as soon as you receive your QR code. No waiting for delivery — it's all digital.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
        />
      </svg>
    ),
  },
];

export default async function CoursesPage() {
  const [foundationProduct, inventionProduct] = await Promise.all([
    getProductByHandle("how-to-get-started-with-coding-and-robotics"),
    getProductByHandle("bbc-micro-bit-essential-stem-lab-tinker-kit-bundle"),
  ]);

  const foundationPrice = foundationProduct?.variants.edges[0]?.node.price.amount ?? null;
  const inventionPrice = inventionProduct?.variants.edges[0]?.node.price.amount ?? null;

  return (
    <>
      {/* Bundle Comparison */}
      <BundleComparison foundationPrice={foundationPrice} inventionPrice={inventionPrice} />

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cs-green font-medium text-sm uppercase tracking-wider">
              Why Short Courses
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              Flexible Digital Learning
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our short courses on the Inspire Africa platform offer a flexible way to build STEAM
              skills.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-16 h-16 bg-cs-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-cs-green">{benefit.icon}</div>
                </div>
                <h3 className="font-semibold text-navy mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cs-green">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-navy mb-4">Ready to Upskill?</h2>
          <p className="text-navy/80 mb-8 max-w-xl mx-auto">
            Contact us for group bookings or custom course packages for your school or organisation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-navy hover:bg-navy/90 text-white rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </Link>
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
              Looking for tutors, teacher training, or classroom kits? We have more options for your
              school.
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
                Expert facilitators bring STEM education directly to your school.
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
                CAPS-aligned training and lesson plans for your teachers.
              </p>
            </Link>
            <Link
              href="/education/classroom-kits"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-navy group-hover:text-cs-purple transition-colors mb-2">
                Classroom Kits
              </h3>
              <p className="text-gray-600 text-sm">
                Hands-on STEM kits designed for group learning in the classroom.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
