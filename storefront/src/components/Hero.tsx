import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-navy text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 lg:py-20">
          <div className="max-w-xl animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] text-balance">
              Hands-on STEM kits, matched to your child
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed">
              South Africa&apos;s specialist STEM store. Robotics, coding and science kits for ages
              3 to 13+, tested and age-matched by our team in Cape Town.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 active:translate-y-px text-white rounded-lg font-semibold transition-all"
              >
                Browse the range
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
                href="/education"
                className="inline-flex items-center px-8 py-4 rounded-lg font-semibold text-white border border-white/30 hover:bg-white/10 active:translate-y-px transition-all"
              >
                For schools
              </Link>
            </div>
          </div>

          {/* Cluster of genuine build photos; the tall image is the LCP element (preloaded in layout.tsx) */}
          <div className="relative animate-fade-up">
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <div className="relative row-span-2 rounded-2xl overflow-hidden ring-1 ring-white/15">
                <Image
                  src="/images/home/customer-wall/arduino-workbench.jpg"
                  alt="A teenager testing their Arduino circuit at a home workbench"
                  width={900}
                  height={1200}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  priority
                  fetchPriority="high"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/15 aspect-[4/3]">
                <Image
                  src="/images/home/customer-wall/talebot-girls.jpg"
                  alt="Two young girls guiding a Tale-Bot robot across its map"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  priority
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/15 aspect-[4/3]">
                <Image
                  src="/images/education/stem-tutors/girl-coding-with-robotics-kit.jpg"
                  alt="A girl programmes her robotics kit with a tablet"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  priority
                />
              </div>
            </div>
            <Link
              href="#builds"
              className="absolute -bottom-3 left-3 inline-flex items-center gap-2 bg-white text-navy text-sm font-semibold rounded-full px-4 py-2 shadow-lg hover:bg-gray-50 transition-colors"
            >
              Built by kids like yours
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
