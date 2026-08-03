import TrackedLink from "@/components/TrackedLink";
import HeroCutout from "@/components/HeroCutout";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Sparse brand illustrations arranged around the astronaut (decorative).
            They sit behind the figure, so they can peek out from around it. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative inline SVG */}
        <img
          src="/images/illustrations/planet-1.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[57%] top-16 hidden w-20 lg:block lg:w-24"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative inline SVG */}
        <img
          src="/images/illustrations/planet-2.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[11%] top-4 hidden w-12 lg:block lg:w-16"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative inline SVG */}
        <img
          src="/images/illustrations/atom-1.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-20 left-[59%] hidden w-12 opacity-60 lg:block lg:w-14"
        />
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Copy */}
          <div className="max-w-xl py-8 lg:py-14 animate-fade-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-balance">
              Build. <span className="text-cs-orange">Play.</span> Learn.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed">
              Robotics, coding and science kits that teach real skills through play. Because
              today&apos;s curious kid could be tomorrow&apos;s engineer, doctor or scientist. Ages
              3 to 13+.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <TrackedLink
                href="/shop"
                event="home_page_hero_cta_clicked"
                eventProps={{ cta: "shop" }}
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
              </TrackedLink>
              <TrackedLink
                href="/education"
                event="home_page_hero_cta_clicked"
                eventProps={{ cta: "schools" }}
                className="inline-flex items-center px-8 py-4 rounded-lg font-semibold text-white border border-white/30 hover:bg-white/10 active:translate-y-px transition-all"
              >
                For schools
              </TrackedLink>
            </div>
          </div>

          {/* Astronaut cutout — grounded at the bottom edge of the hero. The
              glows live inside this wrapper (centred on the figure and sized in
              %), so they track the astronaut at every viewport width. The
              wrapper transform nudges the whole group left and down. */}
          <div className="flex justify-center self-end lg:justify-end">
            <div className="relative lg:-translate-x-8 lg:translate-y-4">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[115%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cs-blue/25 blur-3xl lg:block"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[38%] -z-10 hidden h-[75%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cs-purple/20 blur-3xl lg:block"
              />
              <HeroCutout />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
