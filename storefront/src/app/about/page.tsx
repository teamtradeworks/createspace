import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PageViewTracker from "@/components/PageViewTracker";

export const metadata: Metadata = {
  title: "About Us | CREATESPACE",
  description:
    "CREATESPACE is South Africa's specialist STEM store. We curate hands-on robotics, coding and science kits and programmes for kids and schools.",
  alternates: {
    canonical: "/about",
  },
};

const values = [
  {
    title: "Curiosity",
    accent: "bg-cs-orange",
    text: "We back exploring, asking questions, and working things out by doing.",
  },
  {
    title: "Excellence",
    accent: "bg-cs-blue",
    text: "STEM is all we do. We keep our range focused and stand behind everything we sell.",
  },
  {
    title: "Impact",
    accent: "bg-cs-green",
    text: "We want our kits to build real skills and confidence, not just fill an afternoon.",
  },
  {
    title: "Trust",
    accent: "bg-navy",
    text: "We keep things honest and straightforward, and we're here whenever you need us.",
  },
];

const beliefs = [
  "Play is one of the most powerful ways kids learn.",
  "Getting hands-on with STEM early builds curiosity that lasts.",
  "Science isn't boring, and the right kit proves it.",
  "STEM is for every kid, whatever their background, gender, or ability.",
  "Parents and teachers are our partners in raising the next generation of makers.",
];

export default function AboutPage() {
  return (
    <>
      <PageViewTracker event="about_page_viewed" />

      {/* Hero */}
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title={
          <>
            South Africa&apos;s <span className="text-cs-orange">specialist STEM store</span>
          </>
        }
        subtitle="We're a small Cape Town team on a mission to get more kids excited about science, technology, engineering and maths. We curate a focused range of hands-on kits and school programmes that make STEM something kids look forward to."
      />

      {/* Vision & mission */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <div className="h-1 w-12 rounded-full bg-cs-orange mb-5" />
              <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-4">Our vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To ignite a passion for science, technology, engineering and maths.
              </p>
            </div>
            <div>
              <div className="h-1 w-12 rounded-full bg-cs-blue mb-5" />
              <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-4">Our mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To bring young minds a curated range of hands-on STEM products and programmes, and
                to spark a genuine, lasting curiosity about the sciences from an early age.
              </p>
            </div>
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-lg text-white/85 leading-relaxed">{belief}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The team */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-navy leading-tight">
              The team behind CREATESPACE
            </h2>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              We&apos;re a small Cape Town team. We hold our own stock, pack every order ourselves,
              and answer your questions in person.
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

      {/* Values (least central to the story, so it sits near the end) */}
      <section className="py-16 md:py-20 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-10">What we stand for</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="border-l-4 border-gray-100 pl-5">
                <div className={`h-2 w-2 rounded-full ${value.accent} mb-4`} />
                <h3 className="text-lg font-semibold text-navy mb-2">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.text}</p>
              </div>
            ))}
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
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
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
