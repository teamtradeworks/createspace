import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: "Contact Us | CREATESPACE",
  description:
    "Get in touch with CREATESPACE. We help with product questions, choosing the right kit, school partnerships, and STEM education enquiries.",
  alternates: {
    canonical: "/contact",
  },
};

const contactInfo = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
    title: "Email",
    description: "We reply within one business day",
    value: "info@thecreatespace.co.za",
    href: "mailto:info@thecreatespace.co.za",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
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
    title: "Where we are",
    description: "Cape Town, South Africa",
    value: "Online store, we deliver countrywide",
    href: null,
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Hours",
    description: "Order online anytime",
    value: "Mon to Fri, 9am to 5pm",
    href: null,
  },
];

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "We dispatch orders within 1 business day (or the next day if you order after 3pm). Delivery usually takes 1 to 3 business days via The Courier Guy.",
  },
  {
    question: "Do you deliver nationwide?",
    answer: "Yes, we deliver to your door anywhere in South Africa via The Courier Guy.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is on its way, you'll get an email with tracking details so you can follow it to your door.",
  },
  {
    question: "Do you offer school or bulk discounts?",
    answer:
      "Yes. We work with schools across South Africa and offer bulk pricing. Get in touch to talk through what you need.",
  },
  {
    question: "What ages are your products suitable for?",
    answer:
      "Our range covers ages 3 to 18+. Every product page shows the recommended age, and you can browse by age group in the shop to find the right fit.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Yes, within 30 days of delivery. Products need to be unused and in their original packaging. Contact us and we'll sort out a return.",
  },
  {
    question: "Are your products safe for young children?",
    answer:
      "Safety comes first. Every product page lists the recommended age range, and our products meet the relevant safety standards for the ages shown.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "If your order hasn't been dispatched yet, we can usually change or cancel it. Contact us as soon as you can and we'll do our best.",
  },
  {
    question: "Do you have a physical shop?",
    answer:
      "Not yet. We're an online store for now, with delivery to your door anywhere in South Africa.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We take secure payments through Stitch, including credit and debit cards and instant EFT.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              Get in touch
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              A question about a kit, help choosing for a certain age, or a school order? Send us a
              message and we&apos;ll get back to you within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-white rounded-xl p-6 ring-1 ring-gray-200/70 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-cs-orange/10 rounded-lg flex items-center justify-center text-cs-orange mb-4">
                  {info.icon}
                </div>
                <h2 className="font-semibold text-navy mb-1">{info.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{info.description}</p>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-cs-orange hover:underline font-medium break-words"
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

      {/* Form and FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="text-2xl font-semibold text-navy mb-2">Send us a message</h2>
              <p className="text-gray-600 mb-8">
                Fill in the form and we&apos;ll get back to you as soon as we can.
              </p>
              <ContactForm />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-navy mb-2">Frequently asked questions</h2>
              <p className="text-gray-600 mb-8">
                Quick answers to what people ask most. Still stuck? Send us a message.
              </p>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group bg-gray-50 rounded-xl overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                      <span className="font-medium text-navy pr-4">{faq.question}</span>
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cs-orange/10 flex items-center justify-center text-cs-orange group-open:rotate-180 transition-transform">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
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
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-lg font-semibold text-navy mb-4">Find us on social</h2>
          <p className="text-gray-600 mb-6">
            New kits, project ideas, and a bit of STEM inspiration.
          </p>
          <SocialLinks location="contact" />
        </div>
      </section>
    </>
  );
}
