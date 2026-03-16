import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us | CREATESPACE",
  description:
    "Get in touch with CREATESPACE. We're here to help with product questions, school partnerships, and STEM education enquiries.",
  alternates: {
    canonical: "/contact",
  },
};

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
    title: "Email Us",
    description: "We'll respond within 24 hours",
    value: "info@thecreatespace.co.za",
    href: "mailto:info@thecreatespace.co.za",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
    title: "Location",
    description: "Cape Town, South Africa",
    value: "Somerset West, 7130",
    href: "https://maps.google.com/?q=Somerset+West,+Cape+Town",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Business Hours",
    description: "Online orders 24/7",
    value: "Mon-Fri: 9am-5pm",
    href: null,
  },
];

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "We dispatch orders within 1 business day (or next day if ordered after 3pm). Delivery typically takes 1-3 business days via The Courier Guy.",
  },
  {
    question: "Do you offer school or bulk discounts?",
    answer:
      "Yes! We partner with schools across South Africa and offer special pricing for bulk orders. Contact us to discuss your requirements.",
  },
  {
    question: "What ages are your products suitable for?",
    answer:
      "Our products range from ages 3-18+. Each product page clearly indicates the recommended age range. Browse by age group in our shop to find the perfect fit.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Absolutely. We offer hassle-free returns within 30 days of delivery. Products must be unused and in original packaging. Contact us to arrange a return.",
  },
  {
    question: "Do you offer after-school programmes or workshops?",
    answer:
      "Yes, we run STEM clubs and workshops. Visit our Education page or contact us to learn about programmes in your area.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              Get In Touch
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mt-2 mb-4">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-white/70 text-lg">
              Whether you have a question about our products, need help choosing
              the right kit, or want to discuss a school partnership—we&apos;re here
              to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-cs-orange/10 rounded-lg flex items-center justify-center text-cs-orange mb-4">
                  {info.icon}
                </div>
                <h3 className="font-semibold text-navy mb-1">{info.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{info.description}</p>
                {info.href ? (
                  <a
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-cs-orange hover:underline font-medium"
                  >
                    {info.value}
                  </a>
                ) : (
                  <span className="text-navy font-medium">{info.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Form & FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold text-navy mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as
                possible.
              </p>
              <ContactForm />
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-semibold text-navy mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 mb-8">
                Quick answers to common questions. Can&apos;t find what you&apos;re
                looking for? Send us a message.
              </p>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-gray-50 rounded-xl overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                      <span className="font-medium text-navy pr-4">
                        {faq.question}
                      </span>
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cs-orange/10 flex items-center justify-center text-cs-orange group-open:rotate-180 transition-transform">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-gray-600">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-16 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
                For Schools & Educators
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold mt-2 mb-4">
                Bring STEM to Your Classroom
              </h2>
              <p className="text-white/70 mb-6">
                We partner with schools across South Africa to deliver engaging
                STEM programmes. From curriculum-aligned kits to teacher training
                and after-school clubs—let&apos;s build the future together.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Bulk pricing for schools",
                  "Curriculum-aligned resources",
                  "Teacher training & support",
                  "After-school STEM clubs",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-cs-green flex-shrink-0"
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
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/education"
                className="inline-flex items-center px-6 py-3 bg-cs-orange hover:bg-cs-orange/90 text-white rounded-lg font-semibold transition-colors"
              >
                Learn About Education Programmes
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
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-cs-orange/20 rounded-full absolute -top-4 -left-4" />
                <div className="w-64 h-64 bg-cs-blue/20 rounded-full relative flex items-center justify-center">
                  <svg
                    className="w-32 h-32 text-white/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-semibold text-navy mb-4">
            Follow Us on Social Media
          </h3>
          <p className="text-gray-600 mb-6">
            Stay updated with the latest products, STEM tips, and educational content.
          </p>
          <SocialLinks location="contact" />
        </div>
      </section>
    </>
  );
}
