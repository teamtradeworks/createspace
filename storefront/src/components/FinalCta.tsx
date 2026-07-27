import Link from "next/link";
import BrandDecor from "@/components/BrandDecor";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-white">
      <BrandDecor
        src="/images/illustrations/planet-2.svg"
        className="right-6 top-8 w-28 rotate-6 opacity-[0.08] lg:w-40"
      />
      <BrandDecor
        src="/images/illustrations/robot-1.svg"
        className="-left-4 bottom-0 w-24 -rotate-6 opacity-[0.07] lg:w-32"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-4 text-balance">
          Not sure where to start?
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Tell us your child&apos;s age and what they love. We&apos;ll point you to the right kit.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 active:translate-y-px text-white rounded-lg font-semibold transition-all"
          >
            Get in touch
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center px-8 py-4 rounded-lg font-semibold text-navy border border-navy/20 hover:bg-navy/5 active:translate-y-px transition-all"
          >
            Browse the range
          </Link>
        </div>
      </div>
    </section>
  );
}
