import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import PageViewTracker from "@/components/PageViewTracker";

export const metadata: Metadata = {
  title: "About Us | CREATESPACE",
  description:
    "CREATESPACE is South Africa's specialist STEM store. We curate robotics, coding, and science kits for kids and schools, matched to the right age and stage.",
  alternates: {
    canonical: "/about",
  },
};

const beliefs = [
  "Play is one of the most powerful ways kids learn.",
  "Getting hands-on with STEM early builds curiosity that lasts.",
  "Science isn't boring. The right kit makes that obvious.",
  "STEM is for every kid, whatever their background, gender, or ability.",
  "Parents and teachers are the ones who make it click at home and in class.",
];

export default function AboutPage() {
  return (
    <>
      <PageViewTracker event="about_page_viewed" />

      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-balance">
              South Africa&apos;s specialist STEM store
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              We find hands-on science, coding, and robotics kits, put them through their paces, and
              match each one to the right age and stage. If a kit doesn&apos;t earn its place, we
              don&apos;t stock it.
            </p>
          </div>
        </div>
      </section>

      {/* Why we do this */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-navy leading-tight">
              Why we do this
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              We want to ignite a passion for science, technology, engineering, and maths in kids
              across South Africa. Not with a lecture, but with something they can build, break,
              and figure out for themselves.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              So we curate a range of kits and school programmes that teach by doing. That kind of
              learning tends to stick, mostly because it doesn&apos;t feel like learning at all.
            </p>
          </div>
        </div>
      </section>

      {/* The team */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-navy leading-tight">
              The people behind the kits
            </h2>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              We&apos;re a small Cape Town team of educators and engineers who think STEM should be
              hands-on, genuinely fun, and within reach of every kid in the country.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/images/about/team-createspace-larger.jpg"
              alt="The CREATESPACE team in their Cape Town warehouse"
              width={1600}
              height={1131}
              quality={90}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="py-16 md:py-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-10 max-w-2xl">
            What we believe
          </h2>
          <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
            {beliefs.map((belief) => (
              <li key={belief} className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-cs-green flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-white/85 leading-relaxed">{belief}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Specialist, not a toy aisle */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-navy leading-tight">
              A specialist store, not a toy aisle
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              We don&apos;t try to stock everything. We know each product&apos;s age range, skill
              level, and what a child actually gets out of it before it goes on the site. Fun comes
              first. The learning is built in, not bolted on.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-navy mb-4">Find something to build</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto text-lg">
            Browse the range by age, brand, or category, or get in touch about programmes for your
            school.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 active:translate-y-px text-white rounded-lg font-semibold transition-all"
            >
              Shop the range
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-navy hover:bg-navy/90 active:translate-y-px text-white rounded-lg font-semibold transition-all"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
