import Link from "next/link";
import { formatPrice } from "@/lib/shopify";

interface BundleComparisonProps {
  earlyYearsPrice: string | null;
  advancedPrice: string | null;
}

const earlyYearsCourses = [
  {
    title: "Coding & Robotics: How to Get Started",
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
    title: "Early STEAM, Coding and Robotics Foundations",
    shortTitle: "Early STEAM",
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
    title: "Foundation Phase: ScratchJr Coding",
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

const advancedCourses = [
  {
    title: "Coding & Robotics: How to Get Started",
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
    title: "Introduction to STEAM Education",
    shortTitle: "STEAM Education",
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
    title: "Scratch Coding and Animation",
    shortTitle: "Scratch Coding",
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
  {
    title: "Micro:bit Level 1",
    shortTitle: "Micro:bit",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Z"
        />
      </svg>
    ),
  },
  {
    title: "Essential STEAM Lab Kit",
    shortTitle: "STEAM Lab",
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
  },
];

function CourseThumbnail({
  title,
  shortTitle,
  icon,
  accent = "blue",
}: {
  title: string;
  shortTitle: string;
  icon: React.ReactNode;
  accent?: "blue" | "purple";
}) {
  const styles =
    accent === "purple"
      ? "bg-cs-purple/15 border border-cs-purple/30 text-cs-purple"
      : "bg-cs-blue/15 border border-cs-blue/30 text-cs-blue";

  const textStyle = accent === "purple" ? "text-white" : "text-white";

  return (
    <div className={`rounded-lg p-3 text-center ${styles}`} title={title}>
      <div className="mx-auto mb-1.5">{icon}</div>
      <p className={`text-xs font-medium leading-tight ${textStyle}`}>{shortTitle}</p>
    </div>
  );
}

export default function BundleComparison({
  earlyYearsPrice,
  advancedPrice,
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
            Training Pathways
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mt-2 mb-4">
            Choose Your Training Pathway
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Two SACE-accredited training pathways designed for educators. Start with the Early Years
            pathway for Foundation Phase, or choose the Advanced pathway for Intermediate and Senior
            Phase.
          </p>
        </div>

        {/* Bundle cards */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Early Years Card */}
          <div className="relative rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-sm overflow-hidden flex flex-col">
            <div className="p-8 flex flex-col flex-1">
              {/* Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-cs-blue/20 text-cs-blue text-xs font-semibold uppercase tracking-wider">
                  Early Years
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-white mb-1">
                Early Years Coding &amp; Robotics
              </h3>
              <p className="text-white/40 text-xs font-medium mb-4">
                Foundation Phase &middot; Ages 5&ndash;9
              </p>
              <p className="text-white/50 text-sm mb-6">
                Introductory Coding and Robotics educator onboarding. Covers unplugged STEAM
                foundations, screen-free learning, and beginner ScratchJr coding.
              </p>

              {/* Courses */}
              <div className="mb-8 flex-1">
                <p className="text-xs text-cs-blue uppercase tracking-wider font-semibold mb-3">
                  3 Courses Included
                </p>
                <div className="rounded-xl bg-cs-blue/10 border border-cs-blue/25 p-3">
                  <div className="grid grid-cols-3 gap-2">
                    {earlyYearsCourses.map((course) => (
                      <CourseThumbnail
                        key={course.shortTitle}
                        title={course.title}
                        shortTitle={course.shortTitle}
                        icon={course.icon}
                        accent="blue"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="border-t border-white/10 pt-6">
                <p className="text-sm text-white/40 line-through mb-1">R&nbsp;1,999</p>
                {earlyYearsPrice && (
                  <p className="text-3xl font-semibold text-white mb-1">
                    {formatPrice(earlyYearsPrice, "ZAR")}
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

          {/* Advanced Card */}
          <div className="relative rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-sm overflow-hidden flex flex-col">
            <div className="p-8 flex flex-col flex-1">
              {/* Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-cs-purple/20 text-cs-purple text-xs font-semibold uppercase tracking-wider">
                  Advanced
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-white mb-1">
                Advanced Coding &amp; Robotics
              </h3>
              <p className="text-white/40 text-xs font-medium mb-4">
                Intermediate &amp; Senior Phase &middot; Ages 9&ndash;18
              </p>
              <p className="text-white/50 text-sm mb-6">
                Advanced Coding and Robotics educator onboarding. Covers Scratch coding, micro:bit
                programming, and sensor-driven STEAM lab projects.
              </p>

              {/* Courses */}
              <div className="mb-8 flex-1">
                <p className="text-xs text-cs-purple uppercase tracking-wider font-semibold mb-3">
                  5 Courses Included
                </p>
                <div className="rounded-xl bg-cs-purple/10 border border-cs-purple/25 p-3">
                  <div className="grid grid-cols-3 gap-2">
                    {advancedCourses.map((course) => (
                      <CourseThumbnail
                        key={course.shortTitle}
                        title={course.title}
                        shortTitle={course.shortTitle}
                        icon={course.icon}
                        accent="purple"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="border-t border-white/10 pt-6">
                <p className="text-sm text-white/40 line-through mb-1">R&nbsp;3,595</p>
                {advancedPrice && (
                  <p className="text-3xl font-semibold text-white mb-1">
                    {formatPrice(advancedPrice, "ZAR")}
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
          Both pathways include access to the Inspire Africa learning platform. Courses are
          self-paced and SACE-accredited with certificates on completion. Access is provided as an
          annual educator license.
        </p>
      </div>
    </section>
  );
}
