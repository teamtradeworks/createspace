import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "STEM Tutors | Education | CREATESPACE",
  description:
    "Hands-on STEM education at your school. Our partner Robotixkids brings robotics, coding, and creative problem-solving to learners from Grade R to 12.",
  alternates: {
    canonical: "/education/stem-tutors",
  },
};

const phases = [
  {
    title: "Foundation Phase",
    grades: "Grade RRR – 3",
    description:
      "Young learners are introduced to STEM concepts through creative, play-based activities. They build collaboration skills while exploring how things work, no screens required at this stage.",
    color: "bg-cs-orange",
    image: "/images/education/stem-tutors/toddlers-exploring-robotics-kit.jpg",
    imageAlt: "Young children exploring a robotics kit on the floor",
  },
  {
    title: "Intermediate Phase",
    grades: "Grade 4 – 7",
    description:
      "Learners get hands-on with Makerzoid robotics kits and intuitive block-based coding. Designed to develop critical thinking at every learning level.",
    color: "bg-cs-blue",
    image: "/images/education/stem-tutors/two-children-robotics-kits.jpg",
    imageAlt: "Two children in school uniform working with robotics kits",
  },
  {
    title: "Secondary Phase",
    grades: "Grade 8 – 12",
    description:
      "Older learners tackle pattern recognition, algorithmic thinking, robotics, and electronic communication, building real 21st-century skills for the world ahead.",
    color: "bg-cs-purple",
    image: "/images/education/stem-tutors/boy-coding-robot-at-event.jpg",
    imageAlt: "Boy in school uniform coding a robot with a tablet at an event",
  },
];

export default function StemTutorsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/education"
            className="inline-flex items-center text-white/60 hover:text-white mb-4 transition-colors"
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
                Partner Programme
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 leading-tight">
                STEM Education, Delivered to Your School
              </h1>
              <p className="text-xl text-white/80 max-w-xl mb-8">
                Robotixkids brings trained facilitators, all the equipment, and a proven curriculum
                directly to your classroom, from Grade R all the way to Matric.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact-form"
                  className="inline-flex items-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 text-white rounded-lg font-semibold transition-colors"
                >
                  Book a Session
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-80 h-80 bg-cs-orange/20 rounded-full absolute -top-10 -right-10" />
                <div className="w-64 h-64 bg-cs-blue/20 rounded-full absolute bottom-0 left-0" />
                <div className="relative z-10 bg-white/10 backdrop-blur rounded-2xl p-8">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/images/education/stem-tutors/robotix-kids-logo.png"
                      alt="Robotix Kids logo"
                      width={220}
                      height={220}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-6">
                They Come to You
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Robotixkids runs as an extramural or curriculum programme at your school. Their
                trained facilitators arrive with everything they need, kits, tablets, lesson plans,
                so your school doesn&apos;t have to invest in equipment or train existing staff.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Learners explore robotics, coding, and creative problem-solving through hands-on
                activities using Makerzoid kits. Every session is designed to be fun first and
                educational by design.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Through our partnership with Robotixkids, CREATESPACE makes it easy to bring quality
                STEM education to your school, just get in touch and we&apos;ll handle the rest.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "R800", label: "Per term (primary)" },
                  { value: "R875", label: "Per term (pre-primary)" },
                  { value: "0", label: "Registration fees" },
                  { value: "0", label: "Catch-up fees" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-cs-orange">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/education/stem-tutors/girl-holding-robot-classroom.jpg"
                    alt="Girl smiling while holding a robot she built in class"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-[2/1] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/education/stem-tutors/girl-coding-with-robotics-kit.jpg"
                    alt="Girl using a tablet to code alongside her robotics kit"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-[2/1] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/education/stem-tutors/boys-building-lego-kits.jpg"
                    alt="Boys collaborating on building a Makerzoid robotics kit"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/images/education/stem-tutors/facilitator-helping-child-kit.jpg"
                    alt="Robotixkids facilitator helping a child with their robotics kit"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-8">What&apos;s Included</h2>
              <ul className="space-y-5">
                {[
                  "Trained STEM facilitators at your school",
                  "All equipment and materials provided",
                  "Age-appropriate curriculum (Grade R to 12)",
                  "No registration or catch-up fees",
                  "6–8 lessons per term",
                  "Flexible scheduling as an extramural",
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
                    <span className="text-white/90 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
              <Image
                src="/images/education/stem-tutors/classroom-session-setup.jpg"
                alt="STEM classroom session with children working on robotics kits"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Age Groups / Phases */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              Age Groups
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              Programmes for Every Phase
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Robotixkids tailors their curriculum to three developmental phases, so every learner
              gets the right level of challenge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {phases.map((phase) => (
              <div key={phase.title} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={phase.image}
                    alt={phase.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-8">
                  <div className={`inline-block px-3 py-1 ${phase.color} rounded-full mb-4`}>
                    <span className="text-white font-semibold text-sm">{phase.grades}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-3">{phase.title}</h3>
                  <p className="text-gray-600">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">In Action</h2>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 scrollbar-none">
          {[
            {
              src: "/images/education/stem-tutors/boy-sitting-lego-kit-floor.jpg",
              alt: "Boy sitting on the floor focused on his Makerzoid robotics kit",
            },
            {
              src: "/images/education/stem-tutors/boy-building-robot-tablet-event.jpg",
              alt: "Boy building a robot alongside a tablet at a STEM event",
            },
            {
              src: "/images/education/stem-tutors/children-building-with-tablet.jpg",
              alt: "Two children collaborating on a robotics build with a tablet",
            },
            {
              src: "/images/education/stem-tutors/two-children-robotics-kits.jpg",
              alt: "Two children in school uniform working with Makerzoid robotics kits",
            },
            {
              src: "/images/education/stem-tutors/girl-standing-robotics-kit.jpg",
              alt: "Girl standing at a table engaged with her robotics kit",
            },
            {
              src: "/images/education/stem-tutors/wro-robotics-competition.jpg",
              alt: "Students competing at a WRO robotics competition",
            },
            {
              src: "/images/education/stem-tutors/boys-testing-robot-car.jpg",
              alt: "Boys building and testing a robot car on the floor",
            },
            {
              src: "/images/education/stem-tutors/girl-coding-with-robotics-kit.jpg",
              alt: "Girl using a tablet to code alongside her robotics kit",
            },
          ].map((photo) => (
            <div
              key={photo.src}
              className="relative h-64 w-64 flex-shrink-0 rounded-xl overflow-hidden"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="512px"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              Who It&apos;s For
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              Is This Right for Your School?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Schools Without STEM Staff",
                description:
                  "No need to hire or train, Robotixkids provides the facilitators and all the equipment. Your school just provides the space.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342"
                    />
                  </svg>
                ),
              },
              {
                title: "Parents Looking for After-School Activities",
                description:
                  "A productive extramural that builds real skills. Learners explore robotics and coding right at school, no extra transport needed.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                ),
              },
              {
                title: "Schools That Want to Stand Out",
                description:
                  "Offering STEM education sets your school apart. It signals innovation and gives learners skills they won&apos;t get in a standard curriculum.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm text-center">
                <div className="w-16 h-16 bg-cs-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="text-cs-orange">{item.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-navy mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-navy text-white scroll-mt-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-4">
              Get STEM Education at Your School
            </h2>
            <p className="text-white/70">
              Get in touch and we&apos;ll connect you with Robotixkids to set up a programme that
              works for your school.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg text-navy">
            <ContactForm showEducationFields educationSource="STEM Tutors" />
          </div>
        </div>
      </section>

      {/* Other Education Options */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-navy mb-4">
              Explore Other Education Solutions
            </h2>
            <p className="text-gray-600">
              Looking for curriculum, classroom kits, or online courses? We have more options for
              your school.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/education/curriculum"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-navy group-hover:text-cs-blue transition-colors mb-2">
                Curriculum for Schools
              </h3>
              <p className="text-gray-600 text-sm">
                CAPS-aligned training and lesson plans for your teachers.
              </p>
            </Link>
            <Link
              href="/education/classroom-kits"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-navy group-hover:text-cs-purple transition-colors mb-2">
                Classroom Kits
              </h3>
              <p className="text-gray-600 text-sm">
                Hands-on STEM kits designed for group learning in the classroom.
              </p>
            </Link>
            <Link
              href="/education/courses"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-navy group-hover:text-cs-green transition-colors mb-2">
                Short Courses
              </h3>
              <p className="text-gray-600 text-sm">
                Online STEM courses hosted on the Inspire Africa platform.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
