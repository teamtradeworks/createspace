import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education | CREATESPACE",
  description:
    "STEM education solutions for schools. Expert tutors, teacher training, and classroom kits to bring hands-on learning to your learners.",
  alternates: {
    canonical: "/education",
  },
};

const educationOptions = [
  {
    title: "STEM Tutors",
    description:
      "Expert facilitators bring robotics and coding programmes directly to your school. Our partner Robotixkids provides trained tutors with a proven STEM curriculum.",
    href: "/education/stem-tutors",
    color: "cs-orange",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    ),
    features: [
      "Trained STEM facilitators",
      "Robotics & coding curriculum",
      "After-school programmes",
      "Holiday camps",
    ],
  },
  {
    title: "Curriculum for Teachers",
    description:
      "Empower your educators to teach STEM with confidence. Our partner Inspire Africa provides comprehensive training and curriculum materials for teachers.",
    href: "/education/curriculum",
    color: "cs-blue",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
    features: [
      "Teacher training platform",
      "Ready-to-use lesson plans",
      "CAPS-aligned content",
      "Ongoing support",
    ],
  },
  {
    title: "Classroom Kits",
    description:
      "Equip your classroom with hands-on STEM kits designed for group learning. Bulk pricing available for schools and educational institutions.",
    href: "/education/classroom-kits",
    color: "cs-purple",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    ),
    features: [
      "Multi-learner kits",
      "Bulk pricing",
      "Teacher guides included",
      "Reusable materials",
    ],
  },
];

export default function EducationPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              STEM Education
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 leading-tight">
              Bring STEM to Your School
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mb-8">
              Whether you need expert tutors, teacher training, or classroom
              equipment, we have solutions to ignite a passion for STEM in your
              learners.
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
            src="/images/illustrations/code.png"
            alt=""
            width={96}
            height={96}
            className="object-contain"
          />
        </div>
      </section>

      {/* Education Options */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              Our Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              Choose Your Path
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every school is different. Select the option that best fits your
              needs and resources.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {educationOptions.map((option) => (
              <Link
                key={option.title}
                href={option.href}
                className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all hover:border-gray-200"
              >
                <div
                  className={`w-20 h-20 bg-${option.color}/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <div className={`text-${option.color}`}>{option.icon}</div>
                </div>
                <h3 className="text-2xl font-semibold text-navy mb-3">
                  {option.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {option.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {option.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <svg
                        className={`w-5 h-5 text-${option.color} mr-2 flex-shrink-0`}
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
                      {feature}
                    </li>
                  ))}
                </ul>
                <span
                  className={`inline-flex items-center text-${option.color} font-semibold group-hover:gap-2 transition-all`}
                >
                  Learn More
                  <svg
                    className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why STEM Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
                Why STEM Matters
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-6">
                Preparing Learners for Tomorrow
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                South Africa faces a growing skills gap in technology and
                engineering. By introducing STEM education early, we can inspire
                the next generation of innovators and problem-solvers.
              </p>
              <div className="space-y-4">
                {[
                  {
                    stat: "75%",
                    label:
                      "of future jobs will require STEM skills",
                  },
                  {
                    stat: "2x",
                    label:
                      "higher earning potential for STEM graduates",
                  },
                  {
                    stat: "100%",
                    label:
                      "of learners benefit from hands-on problem solving",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-cs-orange rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {item.stat}
                      </span>
                    </div>
                    <p className="text-gray-700">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-navy rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-semibold mb-4">
                  Not sure where to start?
                </h3>
                <p className="text-white/80 mb-6">
                  Our team can help you assess your school&apos;s needs and
                  recommend the best solution. Get in touch for a free
                  consultation.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-cs-orange hover:bg-cs-orange/90 text-white rounded-lg font-semibold transition-colors"
                >
                  Get Advice
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cs-orange">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Ready to Bring STEM to Your School?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Join hundreds of schools across South Africa who are already
            inspiring the next generation of innovators.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-navy hover:bg-navy/90 text-white rounded-lg font-semibold transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}
