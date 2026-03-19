import Image from "next/image";
import Link from "next/link";

const educationOptions = [
  {
    id: "stem-tutors",
    title: "STEM Tutors",
    description:
      "Expert facilitators from our partner Robotixkids bring robotics and coding programmes directly to your school. After-school clubs, workshops, and holiday camps available.",
    image: "/images/education/stem-tutors-classroom.jpg",
    link: "/education/stem-tutors",
    linkText: "Learn More",
  },
  {
    id: "curriculum",
    title: "Curriculum for Schools",
    description:
      "Empower your educators with our partner Inspire Africa's comprehensive training platform. CAPS-aligned lesson plans and ongoing support included.",
    image: "/images/education/teacher-curriculum-training.jpg",
    link: "/education/curriculum",
    linkText: "View Training",
  },
  {
    id: "classroom-kits",
    title: "Classroom Kits",
    description:
      "Equip your classroom with multi-learner STEM kits designed for group work. Teacher guides included with bulk pricing for schools.",
    image: "/images/education/classroom-kits-students.jpg",
    link: "/education/classroom-kits",
    linkText: "Shop Kits",
  },
  {
    id: "courses",
    title: "Short Courses",
    description:
      "Online STEM short courses hosted on Inspire Africa's learning platform. Purchase a course and receive a QR code for instant access.",
    image: "/images/education/teacher-curriculum-training.jpg",
    link: "/education/courses",
    linkText: "View Courses",
  },
];

export default function EducationSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
            For Educators
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-4">
            Resources for Every Teaching Need
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you need equipment, expertise, or training, we&apos;re here to
            support STEM education in your school.
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {educationOptions.map((option) => (
            <div key={option.id} className="group">
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5">
                <Image
                  src={option.image}
                  alt={option.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-300" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-navy mb-2">
                {option.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {option.description}
              </p>
              <Link
                href={option.link}
                className="inline-flex items-center text-cs-orange hover:text-cs-red font-medium transition-colors"
              >
                {option.linkText}
                <svg
                  className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">
            Not sure what your school needs? Let&apos;s chat.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-navy hover:bg-navy/90 text-white rounded-lg font-medium transition-colors"
          >
            Contact Our Education Team
            <svg
              className="w-5 h-5 ml-2"
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
    </section>
  );
}
