import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import PageViewTracker from "@/components/PageViewTracker";

export const metadata: Metadata = {
  title: "About Us | CREATESPACE",
  description:
    "CREATESPACE is South Africa's specialist STEM store — curated robotics kits, coding toys, and science sets for kids and schools.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageViewTracker event="about_page_viewed" />
      {/* Hero Section */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 leading-tight">
              South Africa&apos;s Specialist STEM Store
            </h1>
            <p className="text-xl text-white/80 max-w-2xl">
              We believe every child has the potential to become a scientist, engineer,
              or creator. Our mission is to provide the tools and inspiration to make that happen.
            </p>
          </div>
        </div>
        {/* Decorative illustrations */}
        <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 w-48 h-48 opacity-20">
          <Image
            src="/images/illustrations/robot-orange.png"
            alt=""
            width={192}
            height={192}
            className="object-contain"
          />
        </div>
        <div className="hidden lg:block absolute right-64 bottom-10 w-24 h-24 opacity-15">
          <Image
            src="/images/illustrations/atom.png"
            alt=""
            width={96}
            height={96}
            className="object-contain"
          />
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-cs-orange rounded-full" />
              <div className="pl-8">
                <div className="w-14 h-14 bg-cs-orange/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-cs-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-navy mb-4">Our Vision</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To ignite a passion for science, technology, engineering and mathematics.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-cs-blue rounded-full" />
              <div className="pl-8">
                <div className="w-14 h-14 bg-cs-blue/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-cs-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-navy mb-4">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To provide a curated range of hands-on educational products and programmes
                  in science, technology, engineering and mathematics. We believe that early,
                  playful exposure to STEM builds curiosity, confidence, and a genuine
                  appreciation for how the world works.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              Our People
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              Meet the Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re a team of educators and engineers who believe STEM should be
              hands-on, fun, and available to every kid in South Africa.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/images/about/team-createspace.jpg"
              alt="The CREATESPACE Team"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              What Sets Us Apart
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-6">
              More Than a Toy Store
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We&apos;re not a general toy store. We specialise in STEM education
              and carefully curate products that offer a hands-on, guided experience
              — fun first, genuinely educational by design. We take the time to
              understand each product&apos;s age range, skill level, and learning
              value before adding it to our range.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-navy text-white relative overflow-hidden">
        {/* Decorative illustrations */}
        <div className="hidden lg:block absolute right-10 top-20 w-28 h-28 opacity-10">
          <Image
            src="/images/illustrations/earth.png"
            alt=""
            width={112}
            height={112}
            className="object-contain"
          />
        </div>
        <div className="hidden lg:block absolute left-10 bottom-20 w-20 h-20 opacity-10">
          <Image
            src="/images/illustrations/code.png"
            alt=""
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-4">
              Our Values
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              These principles guide everything we do—from the products we select
              to the way we serve our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "Curiosity",
                description:
                  "We nurture a love for exploration, discovery, and problem-solving. Through hands-on experiences, kids learn to ask questions, think critically, and build with confidence.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ),
                title: "Excellence",
                description:
                  "We test and curate our range carefully — if a product doesn't deliver a great learning experience, it doesn't make the cut. We stand behind the quality of everything we sell.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                title: "Impact",
                description:
                  "We believe STEM education can shape futures. Every product and programme we offer is designed to make a meaningful difference in a child's growth, helping them build confidence and skills in science, technology, engineering, and mathematics.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                title: "Trust",
                description:
                  "We build trust through transparency, reliability, and a passion for education. Parents, educators, and learners can count on us to provide resources that are not only fun, but also genuinely educational and beneficial.",
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-cs-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Believe Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              What We Believe
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Play is a powerful tool for learning and discovery.",
              "Early STEM engagement can spark a lifelong curiosity and appreciation for the sciences.",
              "It's important to challenge the misconception that the sciences are boring; STEM is exciting and engaging.",
              "STEM is for everyone—regardless of background, gender, or ability.",
              "Both parents and educators play a key role in helping kids develop STEM skills.",
            ].map((belief, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl"
              >
                <div className="w-8 h-8 bg-cs-green rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 leading-relaxed">{belief}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-navy mb-4">
            Browse the Range
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Explore our curated collection of STEM products or get in touch to learn
            more about our educational programmes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 text-white rounded-lg font-semibold transition-colors"
            >
              Shop Products
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-navy hover:bg-navy/90 text-white rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
