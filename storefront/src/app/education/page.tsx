import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import PageViewTracker from "@/components/PageViewTracker";

export const metadata: Metadata = {
  title: "Education | CREATESPACE",
  description:
    "STEM education solutions for schools and homeschool families. Expert tutors, full curriculum training, classroom kits, and online courses.",
  alternates: {
    canonical: "/education",
  },
};

const schoolLogos = [
  {
    src: "/images/education/inspire-africa/school-logos/felixton-college.png",
    alt: "Felixton College",
  },
  {
    src: "/images/education/inspire-africa/school-logos/st-johns-college.png",
    alt: "St John's College",
  },
  { src: "/images/education/inspire-africa/school-logos/spark-school.png", alt: "Spark School" },
  {
    src: "/images/education/inspire-africa/school-logos/sweet-valley-primary.png",
    alt: "Sweet Valley Primary",
  },
  {
    src: "/images/education/inspire-africa/school-logos/thomas-more-college.png",
    alt: "Thomas More College",
  },
  {
    src: "/images/education/inspire-africa/school-logos/westcott-primary.png",
    alt: "Westcott Primary",
  },
  {
    src: "/images/education/inspire-africa/school-logos/wings-discovery-centre.png",
    alt: "Wings Discovery Centre",
  },
  {
    src: "/images/education/inspire-africa/school-logos/greenfield-girls-primary.png",
    alt: "Greenfield Girls Primary",
  },
];

export default function EducationPage() {
  return (
    <>
      <PageViewTracker event="education_page_viewed" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-navy text-white pt-16 pb-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-cs-orange font-semibold text-sm uppercase tracking-widest mb-4">
              STEM Education
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              The right STEM programme for your situation
            </h1>
            <p className="text-xl text-white/75 max-w-2xl leading-relaxed">
              Every school and family is different. Tell us about yourself and we&apos;ll point you
              in the right direction.
            </p>
          </div>
        </div>

        {/* Decorative illustration */}
        <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 w-52 h-52 opacity-15 pointer-events-none">
          <Image
            src="/images/illustrations/robot-orange.png"
            alt=""
            width={208}
            height={208}
            className="object-contain"
          />
        </div>
      </section>

      {/* ── Path Chooser ─────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Path 1 — Tutors */}
            <a
              href="#tutors"
              className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all border-t-4 border-cs-orange flex flex-col"
            >
              <div className="w-14 h-14 bg-cs-orange/10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-cs-orange"
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
              </div>
              <p className="text-xs font-semibold text-cs-orange uppercase tracking-widest mb-1">
                For Schools
              </p>
              <h2 className="text-xl font-semibold text-navy mb-3 leading-snug">
                We run the programme, you open the doors
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                Expert facilitators visit your school with all equipment. Ideal for after-school
                robotics, coding clubs, and holiday camps.
              </p>
              <span className="mt-5 inline-flex items-center text-cs-orange font-semibold text-sm group-hover:gap-2 transition-all">
                Explore tutors
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
            </a>

            {/* Path 2 — Curriculum */}
            <a
              href="#curriculum"
              className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all border-t-4 border-cs-blue flex flex-col"
            >
              <div className="w-14 h-14 bg-cs-blue/10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-cs-blue"
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
              </div>
              <p className="text-xs font-semibold text-cs-blue uppercase tracking-widest mb-1">
                For Schools
              </p>
              <h2 className="text-xl font-semibold text-navy mb-3 leading-snug">
                Embed STEM into your existing teaching
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                Train your teachers to deliver CAPS-aligned STEM lessons confidently. Ready-to-use
                lesson plans, resources, and ongoing support included.
              </p>
              <span className="mt-5 inline-flex items-center text-cs-blue font-semibold text-sm group-hover:gap-2 transition-all">
                Explore curriculum
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
            </a>

            {/* Path 3 — Homeschool */}
            <a
              href="#homeschool"
              className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all border-t-4 border-cs-purple flex flex-col"
            >
              <div className="w-14 h-14 bg-cs-purple/10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-cs-purple"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
              <p className="text-xs font-semibold text-cs-purple uppercase tracking-widest mb-1">
                For Homeschoolers
              </p>
              <h2 className="text-xl font-semibold text-navy mb-3 leading-snug">
                Flexible, quality STEM learning at home
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                Classroom-grade STEM kits and online courses designed to work at home. No classroom
                required, just curiosity.
              </p>
              <span className="mt-5 inline-flex items-center text-cs-purple font-semibold text-sm group-hover:gap-2 transition-all">
                Explore options
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
            </a>
          </div>
        </div>
      </section>

      {/* ── Section: Tutors & Extramural ─────────────────────── */}
      <section id="tutors" className="py-24 bg-white scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <Image
                src="/images/education/stem-tutors/facilitator-helping-child-kit.jpg"
                alt="A facilitator helping a child with a robotics kit in the classroom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-cs-orange uppercase tracking-widest mb-4">
                <span className="w-6 h-0.5 bg-cs-orange" />
                For Schools: Tutors &amp; Extramural
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-5 leading-tight">
                World-class robotics &amp; coding, delivered straight to your school
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our partner <strong className="text-navy">Robotixkids</strong> provides trained,
                passionate facilitators who arrive at your school fully equipped, all kits,
                tablets, and materials included. Your learners get hands-on STEM without any prep
                burden on your teachers.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Trained facilitators, all equipment provided",
                  "After-school programmes and holiday camps",
                  "Foundation Phase through High School",
                  "Robotics, coding, and engineering activities",
                  "WRO robotics competition preparation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <svg
                      className="w-5 h-5 text-cs-orange flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/education/stem-tutors"
                  className="inline-flex items-center px-6 py-3 bg-cs-orange hover:bg-cs-orange/90 text-white rounded-xl font-semibold transition-colors"
                >
                  Learn more
                  <svg
                    className="ml-2 w-4 h-4"
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
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>In partnership with</span>
                  <Image
                    src="/images/education/stem-tutors/robotix-kids-logo.png"
                    alt="Robotixkids"
                    width={100}
                    height={32}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Photo grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                src: "/images/education/stem-tutors/children-in-stem-classroom.jpg",
                alt: "Children in a STEM classroom",
              },
              {
                src: "/images/education/stem-tutors/boys-testing-robot-car.jpg",
                alt: "Boys testing a robot car",
              },
              {
                src: "/images/education/stem-tutors/girl-holding-robot-classroom.jpg",
                alt: "Girl holding a robot in class",
              },
              {
                src: "/images/education/stem-tutors/wro-robotics-competition.jpg",
                alt: "Learners at a robotics competition",
              },
            ].map((img) => (
              <div key={img.src} className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section: Curriculum for Schools ─────────────────── */}
      <section id="curriculum" className="py-24 bg-gray-50 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-cs-blue uppercase tracking-widest mb-4">
                <span className="w-6 h-0.5 bg-cs-blue" />
                For Schools: Full Curriculum
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-5 leading-tight">
                Give your teachers the tools to own STEM, not outsource it
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our partner <strong className="text-navy">Inspire Africa</strong> provides
                comprehensive online teacher training and CAPS-aligned curriculum resources. Once
                trained, your educators can deliver engaging STEM lessons independently, building
                lasting capability in your school.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "CAPS-aligned lesson plans and resources",
                  "Online teacher training platform",
                  "Ready-to-use activities, no planning required",
                  "Ongoing curriculum support and updates",
                  "Trusted by schools across South Africa",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <svg
                      className="w-5 h-5 text-cs-blue flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/education/curriculum"
                  className="inline-flex items-center px-6 py-3 bg-cs-blue hover:bg-cs-blue/90 text-white rounded-xl font-semibold transition-colors"
                >
                  Learn more
                  <svg
                    className="ml-2 w-4 h-4"
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
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>In partnership with</span>
                  <Image
                    src="/images/education/inspire-africa/inspire-africa-logo.png"
                    alt="Inspire Africa"
                    width={110}
                    height={28}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <Image
                src="/images/education/teacher-curriculum-training.jpg"
                alt="Teacher going through curriculum training materials"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Trusted by schools */}
          <div className="mt-16 pt-10 border-t border-gray-200">
            <p className="text-center text-sm text-gray-400 font-medium uppercase tracking-widest mb-8">
              Trusted by schools across South Africa
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {schoolLogos.map((logo) => (
                <div
                  key={logo.src}
                  className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={130}
                    height={64}
                    className="object-contain h-14 w-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section: Homeschool ───────────────────────────────── */}
      <section id="homeschool" className="py-24 bg-white scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <Image
                src="/images/education/classroom-kits/microbit-kids-collaborating.jpg"
                alt="Children collaborating on coding with micro:bit kits"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-cs-purple uppercase tracking-widest mb-4">
                <span className="w-6 h-0.5 bg-cs-purple" />
                For Homeschoolers &amp; Parents
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-5 leading-tight">
                Flexible STEM learning built for home
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                You don&apos;t need a classroom to deliver exceptional STEM education. Our
                self-paced online courses on the{" "}
                <strong className="text-navy">Inspire Africa</strong> platform let your child learn
                coding, robotics, and engineering at their own pace, from anywhere.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Self-paced, learn at your own speed",
                  "Practical, project-based content",
                  "Instant digital access on purchase",
                  "No classroom or teacher needed",
                  "Age-appropriate for all levels",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <svg
                      className="w-5 h-5 text-cs-purple flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/education/courses"
                className="inline-flex items-center px-6 py-3 bg-cs-purple hover:bg-cs-purple/90 text-white rounded-xl font-semibold transition-colors"
              >
                Browse courses
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      </section>

      {/* ── Why Early STEM Exposure Matters ────────────────── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              The Numbers Don&apos;t Lie
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              Why Early STEM Exposure Matters
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Research shows that early hands-on STEM experience builds the foundation for academic
              confidence, logical thinking, and future career success.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                number: "75%",
                label:
                  "of the fastest-growing careers require STEM skills. Hands-on experience now builds confidence for later.",
                color: "text-cs-red",
                border: "border-cs-red/30",
              },
              {
                number: "3x",
                label: "faster job growth in STEM fields compared to other industries worldwide.",
                color: "text-cs-blue",
                border: "border-cs-blue/30",
              },
              {
                number: "2x",
                label: "higher earning potential for STEM graduates compared to non-STEM careers.",
                color: "text-cs-green",
                border: "border-cs-green/30",
              },
              {
                number: "80%",
                label:
                  "of jobs in the next decade will require some form of tech or science literacy.",
                color: "text-cs-purple",
                border: "border-cs-purple/30",
              },
            ].map((stat) => (
              <div
                key={stat.number}
                className={`bg-gray-50 rounded-xl p-5 md:p-6 text-center border-2 ${stat.border}`}
              >
                <p className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-3 ${stat.color}`}>
                  {stat.number}
                </p>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Not Sure? CTA ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-50 rounded-3xl p-12 border border-gray-100">
            <div className="w-16 h-16 bg-cs-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-cs-orange"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-navy mb-4">
              Not sure which option is right for you?
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto">
              Our team can help you assess your school&apos;s needs and find the perfect fit. Get in
              touch for a free, no-obligation conversation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-navy hover:bg-navy/90 text-white rounded-xl font-semibold transition-colors"
            >
              Get advice
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      </section>
    </>
  );
}
