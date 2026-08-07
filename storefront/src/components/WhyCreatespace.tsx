import Image from "next/image";
import TrackedLink from "@/components/TrackedLink";
import BrandDecor from "@/components/BrandDecor";

const points = [
  {
    icon: "/images/icons/lightbulb-on.svg",
    title: "Only STEM, nothing else",
    text: "We choose every product on our shelves for what it teaches.",
  },
  {
    icon: "/images/icons/ballot.svg",
    title: "Learning built into the play",
    text: "Every kit turns real STEM into something kids build, wire, or experiment with, so the learning comes straight from the doing.",
  },
  {
    icon: "/images/icons/handshake.svg",
    title: "Stocked and packed in Cape Town",
    text: "Our team holds its own stock, packs every order, and answers every question.",
  },
];

export default function WhyCreatespace() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 bg-white">
      <BrandDecor
        src="/images/illustrations/code-1.svg"
        className="-left-6 bottom-6 w-28 -rotate-6 opacity-[0.06] lg:w-36"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-4 text-balance">
              A specialist store, not a toy aisle
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10 max-w-lg">
              General stores sell everything. We sell one thing: STEM kits that are worth your
              child&apos;s time.
            </p>

            <ul className="space-y-6">
              {points.map((point) => (
                <li key={point.title} className="flex gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center">
                    {/* SVG brand icon: served as-is, not optimised */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={point.icon} alt="" width={20} height={20} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy">{point.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mt-1 max-w-md">
                      {point.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <TrackedLink
              href="/about"
              event="home_page_about_link_clicked"
              className="inline-flex items-center mt-10 text-cs-orange hover:text-cs-orange/80 font-medium transition-colors"
            >
              More about us
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </TrackedLink>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-gray-200">
              <Image
                src="/images/about/team-createspace-larger.jpg"
                alt="The CREATESPACE team in their Cape Town warehouse: Dave, Dylan, Larize, and Hayley"
                width={1600}
                height={1131}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p className="mt-3 text-sm text-gray-500">
              The CREATESPACE team in our Cape Town warehouse.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
