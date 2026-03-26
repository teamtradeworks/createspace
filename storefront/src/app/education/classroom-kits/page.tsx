import { getCollectionProducts } from "@/lib/shopify";
import { Product } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
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

      {/* Why Classroom Kits */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cs-purple font-medium text-sm uppercase tracking-wider">
              Why Classroom Kits
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              Everything You Need to Teach STEM
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our classroom kits come ready to use with teacher guides, enough
              materials for group work, and durable components that last year
              after year.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Multi-Learner Kits",
                description:
                  "Classroom sets with enough components for groups of learners to participate simultaneously.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                ),
              },
              {
                title: "Teacher Guides Included",
                description:
                  "Lesson plans and teacher notes so educators can deliver engaging STEM lessons with confidence.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                ),
              },
              {
                title: "Bulk Pricing",
                description:
                  "Special pricing for schools ordering 10 or more kits. Contact us for a customised quote.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                ),
              },
              {
                title: "Built to Last",
                description:
                  "Durable, reusable components designed for daily classroom use, maximising your investment.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                  />
                ),
              },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-16 h-16 bg-cs-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-cs-purple"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {benefit.icon}
                  </svg>
                </div>
                <h3 className="font-semibold text-navy mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Comparison Quick Guide */}
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
              education brands. Each has a different approach and age focus to
              help you find the right fit.
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* MatataStudio Card */}
            <a
              href="#matatastudio"
              className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/images/education/classroom-kits/matata-classroom-teaching.jpg"
                  alt="MatataStudio classroom set with young learners using screen-free coding blocks"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-cs-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Ages 3 – 12
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-navy mb-3">
                  MatataStudio
                </h3>
                <p className="text-gray-600 mb-4">
                  Screen-free, tangible coding for young learners. Children
                  programme robots using physical blocks — no screens, no apps,
                  no reading required. Perfect for Foundation Phase through
                  Intermediate Phase.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    "Screen-Free Coding",
                    "Tangible Blocks",
                    "No Literacy Needed",
                    "Robotics",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="bg-cs-orange/10 text-cs-orange text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-cs-purple font-semibold text-sm group-hover:underline">
                  View MatataStudio kits &darr;
                </span>
              </div>
            </a>

            {/* BBC micro:bit Card */}
            <a
              href="#microbit"
              className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/images/education/classroom-kits/microbit-classroom-kids.jpg"
                  alt="BBC micro:bit classroom with students programming on computers"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-cs-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Ages 8 – 14
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-navy mb-3">
                  BBC micro:bit
                </h3>
                <p className="text-gray-600 mb-4">
                  A pocket-sized programmable computer with built-in sensors,
                  LEDs, and speaker. Learners code in block-based MakeCode or
                  Python — ideal for Intermediate Phase through Senior Phase.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    "Physical Computing",
                    "Block & Python Coding",
                    "Built-in Sensors",
                    "Expandable",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="bg-cs-blue/10 text-cs-blue text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-cs-purple font-semibold text-sm group-hover:underline">
                  View micro:bit kits &darr;
                </span>
              </div>
            </a>
          </div>

          {/* Quick Comparison Table */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-navy text-center mb-8">
              At a Glance
            </h3>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="text-left py-4 px-6 font-semibold">&nbsp;</th>
                      <th className="text-left py-4 px-6 font-semibold">
                        MatataStudio
                      </th>
                      <th className="text-left py-4 px-6 font-semibold">
                        BBC micro:bit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-6 font-medium text-navy">
                        Best for ages
                      </td>
                      <td className="py-3 px-6">3 – 12 years</td>
                      <td className="py-3 px-6">8 – 14 years</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="py-3 px-6 font-medium text-navy">
                        School phases
                      </td>
                      <td className="py-3 px-6">
                        Foundation – Intermediate
                      </td>
                      <td className="py-3 px-6">
                        Intermediate – Senior
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-6 font-medium text-navy">
                        Coding approach
                      </td>
                      <td className="py-3 px-6">
                        Physical coding blocks (screen-free)
                      </td>
                      <td className="py-3 px-6">
                        Block-based (MakeCode) &amp; Python
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="py-3 px-6 font-medium text-navy">
                        Screens required
                      </td>
                      <td className="py-3 px-6">
                        No (ages 3–9), Yes (ages 8+)
                      </td>
                      <td className="py-3 px-6">Yes (computer or tablet)</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-6 font-medium text-navy">
                        Key strength
                      </td>
                      <td className="py-3 px-6">
                        Tangible, hands-on learning without screens
                      </td>
                      <td className="py-3 px-6">
                        Real-world sensors &amp; physical computing
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="py-3 px-6 font-medium text-navy">
                        Subjects covered
                      </td>
                      <td className="py-3 px-6">
                        Coding, robotics, maths, storytelling, art, music
                      </td>
                      <td className="py-3 px-6">
                        Coding, electronics, science, maths, design
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 font-medium text-navy">
                        Expansion options
                      </td>
                      <td className="py-3 px-6">
                        Artist, Musician, Sensor, AI Vision add-ons
                      </td>
                      <td className="py-3 px-6">
                        100+ expansion kits, sensors, robot cars
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MatataStudio Section */}
      <section id="matatastudio" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
                Ages 3 – 12
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-6">
                MatataStudio
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                MatataStudio makes coding tangible. Young learners place
                physical coding blocks on a board to programme a robot —
                no screens, no apps, no reading required. It&apos;s as intuitive
                as building with blocks.
              </p>
              <p className="text-gray-600 mb-6">
                Founded in 2017, MatataStudio serves over 20,000 schools and
                institutions worldwide. Their products are ISTE-certified and
                have won Red Dot, iF, and Good Design awards for their
                thoughtful, child-friendly design.
              </p>

              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-navy">
                  Why teachers choose MatataStudio:
                </h3>
                <ul className="space-y-3">
                  {[
                    "Screen-free coding for young children — eliminates screen time concerns",
                    "No literacy needed — symbol-based blocks work for pre-readers",
                    "Grows with learners: from button-press robots (age 3) to AI and Python (age 12+)",
                    "Cross-curricular: integrates maths, science, storytelling, art, and music",
                    "LEGO-compatible — extends with building blocks children already know",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start text-gray-600"
                    >
                      <svg
                        className="w-5 h-5 text-cs-orange mr-3 mt-0.5 flex-shrink-0"
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
                <Image
                  src="/images/education/classroom-kits/matata-talebot-classroom.jpg"
                  alt="Teacher using MatataStudio Tale-Bot Pro with young learners in classroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
                <Image
                  src="/images/education/classroom-kits/matata-vincibot-classroom.jpg"
                  alt="Students working with MatataStudio VinciBot coding robot"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>

          {/* MatataStudio Product Line Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-cs-orange/5 rounded-xl p-6 border border-cs-orange/20">
              <span className="text-cs-orange font-semibold text-sm">
                Ages 3 – 5
              </span>
              <h4 className="font-semibold text-navy mt-1 mb-2">
                Tale-Bot Pro
              </h4>
              <p className="text-gray-600 text-sm">
                A button-press coding robot that walks, draws, sings, dances,
                and records voice. Children learn commands, sequences, and
                loops through play. Comes with interactive story maps and
                building block accessories.
              </p>
            </div>
            <div className="bg-cs-orange/5 rounded-xl p-6 border border-cs-orange/20">
              <span className="text-cs-orange font-semibold text-sm">
                Ages 4 – 9
              </span>
              <h4 className="font-semibold text-navy mt-1 mb-2">
                Coding Set Pro
              </h4>
              <p className="text-gray-600 text-sm">
                Physical coding blocks with directional symbols control a robot
                car — completely screen-free and word-free. Children plan
                routes, execute programmes, and debug their code. Expandable
                with Artist, Musician, and Sensor add-ons.
              </p>
            </div>
            <div className="bg-cs-orange/5 rounded-xl p-6 border border-cs-orange/20">
              <span className="text-cs-orange font-semibold text-sm">
                Ages 8 – 12
              </span>
              <h4 className="font-semibold text-navy mt-1 mb-2">VinciBot</h4>
              <p className="text-gray-600 text-sm">
                Dual programming in Scratch (blocks) and Python (text) with 8
                built-in sensors, LED matrix display, and LEGO/Technic
                compatibility. Expandable with AI Vision Kit for machine
                learning projects.
              </p>
            </div>
          </div>

          {/* MatataStudio Products Grid */}
          {matataProducts.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-navy mb-6">
                MatataStudio Classroom Kits
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {matataProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* BBC micro:bit Section */}
      <section id="microbit" className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
                <Image
                  src="/images/education/classroom-kits/microbit-kids-collaborating.jpg"
                  alt="Two students collaborating on a BBC micro:bit project in MakeCode"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
                <Image
                  src="/images/education/classroom-kits/microbit-teacher-screen.jpg"
                  alt="Teacher demonstrating BBC micro:bit programming to classroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-cs-blue font-medium text-sm uppercase tracking-wider">
                  Ages 8 – 14
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-6">
                BBC micro:bit
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                The BBC micro:bit is a pocket-sized computer (5cm &times; 4cm)
                packed with sensors, LEDs, buttons, a speaker, and a
                microphone. Learners write real code and see it come to life
                instantly on the hardware.
              </p>
              <p className="text-gray-600 mb-6">
                Created by the Micro:bit Educational Foundation (a non-profit),
                the micro:bit is used in over 60 countries. All programming
                tools are free and browser-based — no software installation
                needed.
              </p>

              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-navy">
                  Why teachers choose BBC micro:bit:
                </h3>
                <ul className="space-y-3">
                  {[
                    "Free coding tools — MakeCode and Python editors run in any browser",
                    "Built-in sensors: accelerometer, compass, temperature, light, and microphone",
                    "Instant feedback — code makes real LEDs light up, real speakers play sound",
                    "From blocks to Python — learners progress at their own pace",
                    "Massive ecosystem: 100+ expansion kits for robotics, IoT, smart home, and more",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start text-gray-600"
                    >
                      <svg
                        className="w-5 h-5 text-cs-blue mr-3 mt-0.5 flex-shrink-0"
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
            </div>
          </div>

          {/* micro:bit Built-in Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 border border-cs-blue/20">
              <span className="text-cs-blue font-semibold text-sm">
                Hardware
              </span>
              <h4 className="font-semibold text-navy mt-1 mb-2">
                Packed with Sensors
              </h4>
              <p className="text-gray-600 text-sm">
                5&times;5 LED matrix, 2 programmable buttons, touch-sensitive
                logo, accelerometer, compass, temperature sensor, light sensor,
                microphone, and speaker — all built in. No extra parts needed
                to start exploring.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-cs-blue/20">
              <span className="text-cs-blue font-semibold text-sm">
                Software
              </span>
              <h4 className="font-semibold text-navy mt-1 mb-2">
                Free Coding Platforms
              </h4>
              <p className="text-gray-600 text-sm">
                Microsoft MakeCode for drag-and-drop block coding, plus a
                browser-based Python editor for text coding. Both are free,
                require no installation, and work on any device with a
                browser.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-cs-blue/20">
              <span className="text-cs-blue font-semibold text-sm">
                Expandable
              </span>
              <h4 className="font-semibold text-navy mt-1 mb-2">
                Grow Your Programme
              </h4>
              <p className="text-gray-600 text-sm">
                Start with the micro:bit board, then expand with robot cars,
                smart home kits, agriculture sensors, IoT kits, and more.
                The edge connector supports hundreds of compatible accessories.
              </p>
            </div>
          </div>

          {/* micro:bit Products Grid */}
          {microbitProducts.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-navy mb-6">
                BBC micro:bit Kits
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {microbitProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
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
