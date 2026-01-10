import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "STEM Tutors | Education | CREATESPACE",
  description:
    "Expert STEM facilitators for your school. Partner programme with Robotixkids offering robotics, coding, and electronics education.",
};

const programmes = [
  {
    title: "After-School Clubs",
    description:
      "Weekly sessions that build skills progressively. Learners complete exciting projects while developing problem-solving abilities.",
    duration: "1-2 hours per week",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Workshops",
    description:
      "Single-session or multi-day intensive workshops. Perfect for science weeks, special events, or curriculum enrichment.",
    duration: "Half day to full week",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    title: "Holiday Camps",
    description:
      "Intensive holiday programmes where learners dive deep into STEM projects. A productive and fun way to spend school breaks.",
    duration: "3-5 days",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
        />
      </svg>
    ),
  },
  {
    title: "Curriculum Integration",
    description:
      "STEM sessions integrated into your school timetable. Our tutors work alongside your teachers to deliver curriculum-aligned content.",
    duration: "Ongoing",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    ),
  },
];

const subjects = [
  {
    name: "Robotics",
    description: "Build and program robots using LEGO, Arduino, and more",
    color: "bg-cs-orange",
  },
  {
    name: "Coding",
    description: "From Scratch to Python, age-appropriate programming",
    color: "bg-cs-blue",
  },
  {
    name: "Electronics",
    description: "Circuits, sensors, and hands-on maker projects",
    color: "bg-cs-purple",
  },
  {
    name: "3D Design",
    description: "CAD software and 3D printing fundamentals",
    color: "bg-cs-green",
  },
];

export default function StemTutorsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link
                href="/education"
                className="inline-flex items-center text-white/60 hover:text-white mb-4 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Education
              </Link>
              <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
                Partner Programme
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 leading-tight">
                Expert STEM Tutors for Your School
              </h1>
              <p className="text-xl text-white/80 max-w-xl mb-8">
                Bring hands-on robotics and coding education to your learners
                with trained facilitators from our partner, Robotixkids.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 text-white rounded-lg font-semibold transition-colors"
                >
                  Book a Session
                </Link>
                <a
                  href="https://robotixkids.co.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-lg font-semibold transition-colors"
                >
                  Visit Robotixkids
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-80 h-80 bg-cs-orange/20 rounded-full absolute -top-10 -right-10" />
                <div className="w-64 h-64 bg-cs-blue/20 rounded-full absolute bottom-0 left-0" />
                <div className="relative z-10 bg-white/10 backdrop-blur rounded-2xl p-8">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center">
                      <Image
                        src="/images/illustrations/robot-orange.png"
                        alt="Robotics"
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-white/60 text-sm">Powered by</p>
                    <p className="text-2xl font-bold">Robotixkids</p>
                    <p className="text-white/80 mt-2">
                      South Africa&apos;s leading STEM education provider
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Robotixkids */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
                Our Partner
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-6">
                About Robotixkids
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Robotixkids is a leading STEM education provider in South
                Africa, specialising in robotics and coding programmes for
                schools. Their trained facilitators bring engaging, hands-on
                learning experiences directly to your classroom.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Through our partnership, CREATESPACE connects schools with
                Robotixkids&apos; expert tutors and proven curriculum, making it
                easy to bring quality STEM education to your learners.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "500+", label: "Schools served" },
                  { value: "50,000+", label: "Learners trained" },
                  { value: "10+", label: "Years experience" },
                  { value: "100%", label: "SA developed" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-gray-50 rounded-xl p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-cs-orange">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-navy rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-semibold mb-6">What&apos;s Included</h3>
              <ul className="space-y-4">
                {[
                  "Trained STEM facilitators at your school",
                  "All equipment and materials provided",
                  "Age-appropriate curriculum (Grade R to 12)",
                  "Progress reports for learners",
                  "Certificates of completion",
                  "Flexible scheduling options",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-cs-orange flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Types */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              Programme Options
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              Choose Your Format
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From once-off workshops to ongoing programmes, we have options to
              suit every school&apos;s schedule and budget.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programmes.map((programme) => (
              <div
                key={programme.title}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <div className="w-16 h-16 bg-cs-orange/10 rounded-2xl flex items-center justify-center mb-6">
                  <div className="text-cs-orange">{programme.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">
                  {programme.title}
                </h3>
                <p className="text-cs-orange text-sm font-medium mb-3">
                  {programme.duration}
                </p>
                <p className="text-gray-600">{programme.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              Curriculum
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              What Learners Will Explore
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our programmes cover a range of STEM disciplines, tailored to
              different age groups and skill levels.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <div
                key={subject.name}
                className="text-center"
              >
                <div
                  className={`w-20 h-20 ${subject.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <span className="text-3xl text-white font-bold">
                    {subject.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  {subject.name}
                </h3>
                <p className="text-gray-600 text-sm">{subject.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cs-orange">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white mb-4">
                Ready to Bring Expert Tutors to Your School?
              </h2>
              <p className="text-white/90">
                Contact us to discuss your requirements and get a customised
                quote for your school.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-navy hover:bg-navy/90 text-white rounded-lg font-semibold transition-colors"
              >
                Get a Quote
              </Link>
              <a
                href="https://robotixkids.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-lg font-semibold transition-colors"
              >
                Learn More
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
