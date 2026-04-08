import Link from "next/link";
import { formatPrice } from "@/lib/shopify";

interface BundleComparisonProps {
  foundationPrice: string | null;
  inventionPrice: string | null;
}

const foundationCourses = [
  {
    title: "Intro to STEAM, Coding & Robotics",
    shortTitle: "Intro to STEAM",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    ),
  },
  {
    title: "How to Get Started with Coding & Robotics",
    shortTitle: "Getting Started",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
        />
      </svg>
    ),
  },
  {
    title: "ScratchJr Training",
    shortTitle: "ScratchJr",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
        />
      </svg>
    ),
  },
];

const essentialCourse = {
  title: "Essential STEM Lab",
  shortTitle: "STEM Lab",
  icon: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
      />
    </svg>
  ),
};

function CourseThumbnail({
  title,
  shortTitle,
  icon,
  dimmed = false,
  highlighted = false,
  accent = false,
}: {
  title: string;
  shortTitle: string;
  icon: React.ReactNode;
  dimmed?: boolean;
  highlighted?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`relative rounded-lg p-3 text-center transition-all ${
        highlighted
          ? "bg-cs-green/20 border-2 border-cs-green ring-1 ring-cs-green/30"
          : accent
            ? "bg-cs-blue/15 border border-cs-blue/30"
            : dimmed
              ? "bg-white/5 border border-white/10 opacity-60"
              : "bg-white/10 border border-white/20"
      }`}
      title={title}
    >
      <div
        className={`mx-auto mb-1.5 ${highlighted ? "text-cs-green" : accent ? "text-cs-blue" : dimmed ? "text-white/40" : "text-white/70"}`}
      >
        {icon}
      </div>
      <p
        className={`text-xs font-medium leading-tight ${highlighted ? "text-cs-green" : accent ? "text-white" : dimmed ? "text-white/40" : "text-white/70"}`}
      >
        {shortTitle}
      </p>
      {highlighted && (
        <span className="absolute -top-2 -right-2 bg-cs-green text-navy text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          NEW
        </span>
      )}
    </div>
  );
}

export default function BundleComparison({
  foundationPrice,
  inventionPrice,
}: BundleComparisonProps) {
  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
        <div className="absolute bottom-20 right-20 w-60 h-60 border border-white rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 border border-white rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/education"
            className="inline-flex items-center text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Education
          </Link>
        </div>

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-cs-green font-medium text-sm uppercase tracking-wider">
            Education Bundles
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mt-2 mb-4">
            Choose Your Starting Point
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Two bundles designed for educators. Start with the Foundation Phase to get up and
            running, or go all-in with the Invention Phase for specialist training and more courses.
          </p>
        </div>

        {/* Bundle cards */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Foundation Phase Card */}
          <div className="relative rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-sm overflow-hidden flex flex-col">
            <div className="p-8 flex flex-col flex-1">
              {/* Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-cs-blue/20 text-cs-blue text-xs font-semibold uppercase tracking-wider">
                  Foundation
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-white mb-2">Foundation Phase</h3>
              <p className="text-white/50 text-sm mb-6">
                The essentials to start teaching Coding and Robotics with confidence.
              </p>

              {/* Courses */}
              <div className="mb-8 flex-1">
                <p className="text-xs text-cs-blue uppercase tracking-wider font-semibold mb-3">
                  3 Courses Included
                </p>
                <div className="rounded-xl bg-cs-blue/10 border border-cs-blue/25 p-3">
                  <div className="grid grid-cols-3 gap-2">
                    {foundationCourses.map((course) => (
                      <CourseThumbnail
                        key={course.shortTitle}
                        title={course.title}
                        shortTitle={course.shortTitle}
                        icon={course.icon}
                        accent
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="border-t border-white/10 pt-6">
                {foundationPrice && (
                  <p className="text-3xl font-semibold text-white mb-1">
                    {formatPrice(foundationPrice, "ZAR")}
                  </p>
                )}
                <p className="text-white/40 text-xs mb-5">VAT included</p>
                <Link
                  href="/product/how-to-get-started-with-coding-and-robotics"
                  className="block w-full text-center py-3.5 px-6 rounded-lg bg-cs-green hover:bg-cs-green/90 text-navy font-semibold transition-colors"
                >
                  View Bundle
                </Link>
              </div>
            </div>
          </div>

          {/* Invention Phase Card */}
          <div className="relative rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-sm overflow-hidden flex flex-col">
            <div className="p-8 flex flex-col flex-1">
              {/* Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-cs-purple/20 text-cs-purple text-xs font-semibold uppercase tracking-wider">
                  Invention
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-white mb-2">Invention Phase</h3>
              <p className="text-white/50 text-sm mb-6">
                Everything in Foundation, plus specialist STEM Lab training.
              </p>

              {/* Foundation base (included) */}
              <div className="mb-4">
                <p className="text-xs text-cs-purple/60 uppercase tracking-wider font-semibold mb-3">
                  Foundation Phase Included
                </p>
                <div className="rounded-xl bg-cs-purple/5 border border-cs-purple/15 p-3">
                  <div className="grid grid-cols-3 gap-2">
                    {foundationCourses.map((course) => (
                      <CourseThumbnail
                        key={course.shortTitle}
                        title={course.title}
                        shortTitle={course.shortTitle}
                        icon={course.icon}
                        dimmed
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Plus divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 border-t border-dashed border-white/20" />
                <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <div className="flex-1 border-t border-dashed border-white/20" />
              </div>

              {/* Additional course */}
              <div className="mb-8 flex-1">
                <p className="text-xs text-cs-purple uppercase tracking-wider font-semibold mb-3">
                  Additional Specialist Course
                </p>
                <div className="rounded-xl bg-cs-purple/10 border border-cs-purple/25 p-3">
                  <div className="max-w-[8rem]">
                    <CourseThumbnail
                      title={essentialCourse.title}
                      shortTitle={essentialCourse.shortTitle}
                      icon={essentialCourse.icon}
                      highlighted
                    />
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="border-t border-white/10 pt-6">
                {inventionPrice && (
                  <p className="text-3xl font-semibold text-white mb-1">
                    {formatPrice(inventionPrice, "ZAR")}
                  </p>
                )}
                <p className="text-white/40 text-xs mb-5">VAT included</p>
                <Link
                  href="/product/bbc-micro-bit-essential-stem-lab-tinker-kit-bundle"
                  className="block w-full text-center py-3.5 px-6 rounded-lg bg-cs-green hover:bg-cs-green/90 text-navy font-semibold transition-colors"
                >
                  View Bundle
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-white/30 text-xs mt-10 max-w-lg mx-auto">
          Both bundles include access to the Inspire Africa learning platform. Courses are
          self-paced with certificates on completion.
        </p>
      </div>
    </section>
  );
}
