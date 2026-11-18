import TrackedLink from "@/components/TrackedLink";
import HeroCutout from "@/components/HeroCutout";
import type { PromoSectionProps } from "@/components/promo-sections/types";
import SaleStamp from "@/components/promo-sections/SaleStamp";

// Black Friday Sale homepage hero (promo section id "black-friday-home-hero").
// Shown in place of the default <Hero /> only while the "Black Friday Sale"
// promo is live (see config/promo.ts). Same navy, astronaut, planets and glows
// as the default hero, so the page keeps its size and feel; it leads with the
// sale instead. The copy lives here, not in the promo register: keep the
// "ends 30 November" line in step with the promo's `endsAt`.
const COPY = {
  name: "Black Friday",
  highlight: "Sale",
  body: "Robotics, coding and science kits that teach through play.",
  ends: "Up to 20% off, ends 30 November.",
  stamp: { top: "Up to", big: "20%", bottom: "off" },
};

export default function BlackFridayHomeHero({ promo }: PromoSectionProps) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Copy */}
          <div className="max-w-xl py-8 pt-12 animate-fade-up sm:pt-14 lg:py-14 lg:pt-16">
            {/* The everyday tagline, kept as a kicker above the sale. */}
            <p className="mb-3 text-2xl font-semibold tracking-tight sm:text-[1.75rem] xl:text-3xl">
              Build. <span className="text-cs-orange">Play.</span>{" "}
              <span className="text-cs-blue">Learn.</span>
            </p>
            <h1 className="whitespace-nowrap text-[2rem] font-semibold leading-[1.1] tracking-tight min-[375px]:text-[2.5rem] sm:text-6xl lg:text-[3.5rem] xl:text-[4.25rem]">
              {/* "Black Friday Sale" on one line: the name in white, the last
                  word on a tilted Spark Yellow highlight (as in the sale ads
                  and the nav's yellow Sale pill), raised like a toy brick with a
                  darker yellow bottom edge. The 20% sticker overlaps its
                  top-right corner on purpose, as on the sale ads. */}
              {COPY.name}{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="mb-2 inline-block -rotate-2 rounded-xl bg-cs-yellow px-3 pb-1.5 pt-0.5 text-navy shadow-[inset_0_2px_0_rgba(255,255,255,0.6),0_5px_0_#B89A00,0_10px_18px_-6px_rgba(0,0,0,0.6)] sm:px-4 sm:shadow-[inset_0_2px_0_rgba(255,255,255,0.6),0_7px_0_#B89A00,0_14px_22px_-6px_rgba(0,0,0,0.6)]">
                  {COPY.highlight}
                </span>
                <SaleStamp
                  stamp={COPY.stamp}
                  className="absolute -right-4 -top-[4.125rem] flex min-[375px]:-right-[1.625rem] sm:-right-[3.75rem] sm:-top-14 lg:-right-14 lg:-top-[3.375rem] xl:-right-[4.25rem] xl:-top-16"
                />
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white leading-relaxed">
              {COPY.body}
              <span className="block font-semibold">{COPY.ends}</span>
            </p>
            {/* One action, a size up and without the arrow. */}
            <div className="mt-8 flex flex-wrap gap-4">
              <TrackedLink
                href={promo.cta.href}
                event="home_page_hero_cta_clicked"
                eventProps={{ cta: "sale" }}
                className="inline-flex items-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 active:translate-y-px text-white rounded-lg font-semibold text-lg sm:text-xl transition-all"
              >
                {promo.cta.label}
              </TrackedLink>
            </div>
          </div>

          {/* Astronaut cutout with its glows and orbiting illustrations, as in
              the default hero (see Hero.tsx for why the wrapper is `isolate`). */}
          <div className="flex justify-center self-end lg:justify-end">
            <div className="relative isolate lg:-translate-x-8 lg:translate-y-4">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[115%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cs-blue/25 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[75%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cs-purple/20 blur-3xl"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative inline SVG */}
              <img
                src="/images/illustrations/planet-1.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -left-5 top-4 w-16 sm:w-20 lg:-left-10 lg:top-6 lg:w-24"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative inline SVG */}
              <img
                src="/images/illustrations/planet-2.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 top-0 w-10 rotate-90 sm:w-12 lg:-right-6 lg:w-16"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative inline SVG */}
              <img
                src="/images/illustrations/atom-1.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -left-3 bottom-20 w-10 opacity-60 lg:-left-6 lg:bottom-24 lg:w-14"
              />
              <HeroCutout />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
