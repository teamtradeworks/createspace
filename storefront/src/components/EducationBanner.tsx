import Image from "next/image";
import TrackedLink from "@/components/TrackedLink";

export default function EducationBanner() {
  return (
    <section className="py-16 md:py-20 bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/15 aspect-[4/3]">
            <Image
              src="/images/education/classroom-kits/microbit-kids-collaborating.jpg"
              alt="Learners collaborating on a micro:bit project in a classroom"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-balance">
              STEM programmes for schools
            </h2>
            <p className="text-white/80 leading-relaxed mb-8">
              Trained tutors, classroom kits, teacher training, and short courses for schools across
              South Africa.
            </p>
            <TrackedLink
              href="/education"
              event="home_page_education_cta_clicked"
              className="inline-flex items-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 active:translate-y-px text-white rounded-lg font-semibold transition-all"
            >
              Explore education
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
          </div>
        </div>
      </div>
    </section>
  );
}
