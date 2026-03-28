import Link from "next/link";
import { Metadata } from "next";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Coding & Robotics Curriculum for Schools | Education | CREATESPACE",
  description:
    "A complete coding and robotics programme for schools — CAPS-aligned, Grade R–12 lesson plans, SACE-accredited teacher training, and micro:bit robotics. Powered by Inspire Africa.",
  alternates: {
    canonical: "/education/curriculum",
  },
};

const curriculumPhases = [
  {
    phase: "Foundation Phase",
    grades: "Grade R–3",
    color: "bg-cs-green",
    description:
      "Introduce young learners to computational thinking through unplugged coding activities — no devices needed. Curriculum-aligned workbooks cover algorithms, sequencing, patterns, and early robotics concepts through hands-on play.",
    highlights: [
      "Unplugged coding workbooks",
      "Algorithmic and sequential thinking",
      "Collaborative problem-solving activities",
      "No devices or hardware required",
    ],
  },
  {
    phase: "Intermediate Phase",
    grades: "Grade 4–6",
    color: "bg-cs-blue",
    description:
      "Learners begin block-based coding with visual programming environments like Scratch and MakeCode. They progress to hands-on robotics using micro:bit-compatible kits, building and programming their first robots.",
    highlights: [
      "Block-based coding (Scratch, MakeCode)",
      "Introduction to micro:bit hardware",
      "Build and program simple robots",
      "Sensors, inputs, and outputs",
    ],
  },
  {
    phase: "Senior Phase",
    grades: "Grade 7–9",
    color: "bg-cs-purple",
    description:
      "Coding advances from block-based to text-based programming. Learners tackle more complex robotics projects with micro:bit, exploring real-world applications of computational thinking, data handling, and automation.",
    highlights: [
      "Transition to text-based coding",
      "Advanced micro:bit robotics projects",
      "Data handling and automation",
      "Real-world problem-solving challenges",
    ],
  },
  {
    phase: "FET Phase",
    grades: "Grade 10–12",
    color: "bg-cs-orange",
    description:
      "Senior learners work with advanced programming concepts including Python, IoT applications, and AI fundamentals. Projects integrate coding with robotics hardware to solve complex, interdisciplinary challenges.",
    highlights: [
      "Python and text-based programming",
      "IoT and AI fundamentals",
      "Advanced robotics integration",
      "Interdisciplinary STEM projects",
    ],
  },
];

const platformFeatures = [
  {
    title: "Self-Paced Video Training",
    description:
      "Teachers train through short, focused video tutorials they can pause, rewatch, and practise alongside — fitting around their existing teaching schedule.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
        />
      </svg>
    ),
  },
  {
    title: "Ready-to-Use Lesson Plans",
    description:
      "Complete, structured lesson plans with activities, worksheets, and assessments. Teachers walk into the classroom ready to deliver — no preparation from scratch.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
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
    title: "CAPS-Aligned Curriculum",
    description:
      "Every lesson, activity, and assessment maps directly to the South African CAPS curriculum. It fits straight into your school's existing timetable — no extra planning needed.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
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
    title: "SACE-Accredited Certification",
    description:
      "Your teachers earn SACE-accredited professional development points upon completion — recognised certification that counts towards their CPD requirements.",
    icon: (
      <svg
        className="w-8 h-8"
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
  },
  {
    title: "Interactive LMS Platform",
    description:
      "Your school accesses everything through the Inspire Campus — a dedicated learning management system with progress tracking, certificates, and a community of educators.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
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
    title: "No Experience Needed",
    description:
      "Designed for all skill levels — whether your teachers have never touched a micro:bit or are already teaching coding. The training meets them where they are.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
        />
      </svg>
    ),
  },
];

const LOGO_PATH = "/images/education/inspire-africa/school-logos";

const testimonials = [
  {
    quote:
      "The course provided a good balance between hands-on learning and theoretical learning. The layout and concise nature of the modules allowed me to explore the codes with ease as the instructor was explaining said code.",
    name: "Clio Peters",
    school: "Westcott Primary School",
    logo: `${LOGO_PATH}/westcott-primary.png`,
  },
  {
    quote:
      "I teach Foundation Phase and this was my first experience with the micro:bit. The course was easy to follow and it was good to work hands-on alongside the video tutorials.",
    name: "Michelle Adams",
    school: "Sweet Valley Primary",
    logo: `${LOGO_PATH}/sweet-valley-primary.png`,
  },
  {
    quote:
      "Easy to follow. I like that the videos are short — you can then practise what was shown and continue.",
    name: "Ninette Alberts",
    school: "Thomas More College",
    logo: `${LOGO_PATH}/thomas-more-college.png`,
  },
  {
    quote:
      "I\u2019ve been using the micro:bit prior to taking this course, however completing this course introduced me to some aspects I haven\u2019t quite used yet and others I didn\u2019t know were available. I found it very useful.",
    name: "Jared Botham",
    school: "Sweet Valley Primary",
    logo: `${LOGO_PATH}/sweet-valley-primary.png`,
  },
  {
    quote:
      "The course was simple and the lessons were detailed, every theoretical concept explored in an interactive manner. Excellent job.",
    name: "Christopher Hoy",
    school: "St John\u2019s College",
    logo: `${LOGO_PATH}/st-johns-college.png`,
  },
  {
    quote:
      "As a Grade R teacher I found it very useful to be introduced to the basics.",
    name: "Nastashia Schenck",
    school: "Greenfield Girls Primary School",
    logo: `${LOGO_PATH}/greenfield-girls-primary.png`,
  },
  {
    quote: "I really enjoyed it, very easy to navigate.",
    name: "Nicholas Tshukuku",
    school: "Frans du Toit High School",
    logo: `${LOGO_PATH}/frans-du-toit-high.png`,
  },
  {
    quote:
      "The course was informational and easy to follow. I learned a lot and I am inspired to let my kids start designing.",
    name: "Charl van den Berg",
    school: "Felixton College",
    logo: `${LOGO_PATH}/felixton-college.png`,
  },
  {
    quote:
      "What worked well is the clear distinction between hardware types (Microcontrollers vs. SBCs) and coding approaches (Block vs. Text), which firmly aligns the choice of tool with the appropriate educational phase.",
    name: "Lufuno Mufamadi",
    school: "SPARK School",
    logo: `${LOGO_PATH}/spark-school.png`,
  },
  {
    quote:
      "A good experience. It was great to be able to pause videos and see the notes.",
    name: "Tasmin Strydom",
    school: "Wings Discovery Centre",
    logo: `${LOGO_PATH}/wings-discovery-centre.png`,
  },
];

const steps = [
  {
    number: "1",
    title: "Get in Touch",
    description:
      "Contact us to discuss your school's needs. We'll help you choose the right curriculum pathway and hardware.",
  },
  {
    number: "2",
    title: "Teachers Train Online",
    description:
      "Educators complete self-paced video micro-courses on the Inspire Campus platform — earning SACE-accredited certification.",
  },
  {
    number: "3",
    title: "Access Lesson Plans",
    description:
      "Download ready-to-use, CAPS-aligned lesson plans, worksheets, and assessment materials for your phase.",
  },
  {
    number: "4",
    title: "Teach with Confidence",
    description:
      "Deliver engaging coding and robotics lessons using the tools and support provided. Your school builds lasting STEM capacity.",
  },
];

export default function CurriculumPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-cs-blue font-medium text-sm uppercase tracking-wider">
                In Partnership with Inspire Africa
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 leading-tight">
                Coding &amp; Robotics Curriculum for Schools
              </h1>
              <p className="text-xl text-white/80 mb-4">
                Unlike hiring external facilitators, this programme empowers
                your own teachers to deliver coding and robotics — from Grade R
                to 12. Once trained, your educators have the skills, lesson
                plans, and confidence to teach STEM year after year.
              </p>
              <p className="text-white/60 mb-6">
                The training is self-paced and CAPS-aligned, so it slots
                directly into your school timetable. No prior coding experience
                needed.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Teach coding and robotics without hiring specialist staff",
                  "Meet CAPS requirements for Coding & Robotics",
                  "Give teachers SACE-accredited professional development",
                  "Build a sustainable, long-term STEM programme",
                ].map((item) => (
                  <li key={item} className="flex items-start text-white/80">
                    <svg
                      className="w-5 h-5 text-cs-blue mr-2 mt-0.5 shrink-0"
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
              <a
                href="#contact-form"
                className="inline-flex items-center px-8 py-4 bg-cs-blue hover:bg-cs-blue/90 text-white rounded-lg font-semibold transition-colors"
              >
                Contact Us
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  stat: "Grade R–12",
                  label: "Full curriculum coverage",
                },
                {
                  stat: "CAPS",
                  label: "Fully aligned to national curriculum",
                },
                {
                  stat: "SACE",
                  label: "Accredited teacher certification",
                },
                {
                  stat: "Self-Paced",
                  label: "Teachers train on their own schedule",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/10 border border-white/20 rounded-xl p-6 text-center"
                >
                  <p className="text-2xl font-bold text-cs-blue mb-1">
                    {item.stat}
                  </p>
                  <p className="text-white/70 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cs-blue font-medium text-sm uppercase tracking-wider">
              What Your School Gets
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              A Complete Programme, Not Just Resources
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your school gets access to the Inspire Campus — an online platform
              where teachers train at their own pace, download lesson plans, and
              earn accredited certification. Everything is managed from one
              dashboard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
              >
                <div className="w-12 h-12 bg-cs-blue/10 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-cs-blue">{feature.icon}</div>
                </div>
                <h3 className="font-semibold text-navy mb-2 text-lg">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum by Phase */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cs-blue font-medium text-sm uppercase tracking-wider">
              Grade R–12 Curriculum
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
              A Clear Progression from Unplugged to Advanced Coding
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The curriculum builds skills progressively — starting with
              unplugged activities in Foundation Phase, introducing block-based
              coding and micro:bit robotics in Intermediate, and advancing to
              text-based programming and IoT in the senior grades.
            </p>
          </div>

          <div className="space-y-6">
            {curriculumPhases.map((phase) => (
              <div
                key={phase.phase}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="md:flex">
                  <div
                    className={`${phase.color} text-white p-6 md:w-64 md:shrink-0 flex flex-col justify-center`}
                  >
                    <p className="text-white/80 text-sm font-medium">
                      {phase.grades}
                    </p>
                    <h3 className="text-xl font-semibold mt-1">
                      {phase.phase}
                    </h3>
                  </div>
                  <div className="p-6 flex-1">
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {phase.description}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {phase.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <svg
                            className="w-4 h-4 text-cs-blue mr-2 shrink-0"
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
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cs-blue font-medium text-sm uppercase tracking-wider">
              From Schools Like Yours
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-4">
              Trusted by Schools Across South Africa
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Educators from primary schools, high schools, and colleges have
              completed the Inspire Africa training. Here is what they had to
              say.
            </p>
          </div>

          <TestimonialCarousel testimonials={testimonials} />
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
              Getting your school set up with the Inspire Africa coding and
              robotics curriculum is straightforward.
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

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-cs-blue scroll-mt-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-white/70 font-medium text-sm uppercase tracking-wider">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mt-2 mb-4">
              Ready to Bring Coding &amp; Robotics to Your School?
            </h2>
            <p className="text-white/80">
              Get in touch and we&apos;ll help you find the right curriculum
              pathway, hardware, and training plan for your school.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <ContactForm showEducationFields />
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
              Looking for tutors, classroom kits, or online courses? We have more
              options for your school.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/education/stem-tutors"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-navy group-hover:text-cs-orange transition-colors mb-2">
                STEM Tutors
              </h3>
              <p className="text-gray-600 text-sm">
                Expert facilitators bring STEM education directly to your school.
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
