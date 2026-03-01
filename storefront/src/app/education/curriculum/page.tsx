import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curriculum for Teachers | Education | CREATESPACE",
  description:
    "Teacher training and STEM curriculum resources. Partner programme with Inspire Africa offering comprehensive educator support.",
  alternates: {
    canonical: "/education/curriculum",
  },
};

const features = [
  {
    title: "Online Learning Platform",
    description:
      "Access comprehensive training modules, lesson plans, and resources through Inspire Africa's digital platform.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
        />
      </svg>
    ),
  },
  {
    title: "CAPS-Aligned Content",
    description:
      "All materials are designed to integrate with the South African curriculum, making implementation seamless.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
        />
      </svg>
    ),
  },
  {
    title: "Ready-to-Use Lesson Plans",
    description:
      "Complete lesson plans with activities, assessments, and extension work—everything you need to teach confidently.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
    ),
  },
  {
    title: "Ongoing Support",
    description:
      "Access to expert support and a community of educators sharing best practices and experiences.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
  },
];

const subjects = [
  {
    name: "Robotics",
    grades: "Grade 4-12",
    description: "Build and program robots, learn computational thinking",
  },
  {
    name: "Coding",
    grades: "Grade 1-12",
    description: "From block-based coding to text-based programming",
  },
  {
    name: "Electronics",
    grades: "Grade 7-12",
    description: "Circuits, microcontrollers, and maker projects",
  },
  {
    name: "Design Thinking",
    grades: "Grade 4-12",
    description: "Problem-solving methodology and innovation",
  },
];

const steps = [
  {
    number: "1",
    title: "Register Your School",
    description:
      "Contact us to set up your school's account on the Inspire Africa platform.",
  },
  {
    number: "2",
    title: "Teacher Training",
    description:
      "Teachers complete online training modules at their own pace.",
  },
  {
    number: "3",
    title: "Access Resources",
    description:
      "Download lesson plans, worksheets, and assessment materials.",
  },
  {
    number: "4",
    title: "Teach with Confidence",
    description:
      "Deliver engaging STEM lessons with ongoing support from experts.",
  },
];

export default function CurriculumPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
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
            <span className="text-cs-blue font-medium text-sm uppercase tracking-wider">
              Partner Programme
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 leading-tight">
              Curriculum &amp; Training for Teachers
            </h1>
            <p className="text-xl text-white/80 max-w-xl mb-8">
              Empower your educators to teach STEM with confidence. Our partner
              Inspire Africa provides comprehensive training and curriculum
              materials.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-cs-blue hover:bg-cs-blue/90 text-white rounded-lg font-semibold transition-colors"
              >
                Get Started
              </Link>
              <a
                href="https://inspire.africa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-lg font-semibold transition-colors"
              >
                Visit Inspire Africa
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
        {/* Decorative elements */}
        <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2">
          <div className="w-64 h-64 border-2 border-cs-blue/30 rounded-full" />
          <div className="w-48 h-48 border-2 border-cs-blue/20 rounded-full absolute top-8 left-8" />
        </div>
      </section>

      {/* About Inspire Africa */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-cs-blue font-medium text-sm uppercase tracking-wider">
                Our Partner
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-6">
                About Inspire Africa
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Inspire Africa is dedicated to transforming education across the
                continent. Their teacher training platform and curriculum
                resources make it possible for any educator to deliver quality
                STEM education.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Through our partnership, schools can access Inspire Africa&apos;s
                comprehensive STEM curriculum, complete with training, lesson
                plans, and ongoing support for teachers.
              </p>
              <div className="bg-cs-blue/10 rounded-xl p-6">
                <h4 className="font-semibold text-navy mb-2">
                  Perfect for schools who want to:
                </h4>
                <ul className="space-y-2">
                  {[
                    "Build internal STEM teaching capacity",
                    "Integrate STEM into existing timetables",
                    "Provide ongoing professional development",
                    "Reduce dependency on external facilitators",
                  ].map((item) => (
                    <li key={item} className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 text-cs-blue mr-2"
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
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
                >
                  <div className="w-12 h-12 bg-cs-blue/10 rounded-xl flex items-center justify-center mb-4">
                    <div className="text-cs-blue">{feature.icon}</div>
                  </div>
                  <h3 className="font-semibold text-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Covered */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cs-blue font-medium text-sm uppercase tracking-wider">
              Curriculum
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              Subjects Covered
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive curriculum resources for a range of STEM subjects,
              aligned with South African education standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <div
                key={subject.name}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-navy mb-1">
                  {subject.name}
                </h3>
                <p className="text-cs-blue text-sm font-medium mb-3">
                  {subject.grades}
                </p>
                <p className="text-gray-600 text-sm">{subject.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cs-blue font-medium text-sm uppercase tracking-wider">
              Getting Started
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A simple process to get your teachers trained and ready to deliver
              STEM education.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200" />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-cs-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-semibold text-navy mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cs-blue">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white mb-4">
                Ready to Train Your Teachers?
              </h2>
              <p className="text-white/90">
                Contact us to learn more about the Inspire Africa curriculum and
                how to get your school started.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-navy hover:bg-navy/90 text-white rounded-lg font-semibold transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="https://inspire.africa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-lg font-semibold transition-colors"
              >
                Visit Inspire Africa
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
