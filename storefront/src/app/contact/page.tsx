import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import PageHeader from "@/components/PageHeader";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";
import WhatsAppLink, { WHATSAPP_ICON } from "@/components/WhatsAppLink";
import { PHONE_NUMBER, phoneLink } from "@/lib/phone";

export const metadata: Metadata = {
  title: "Contact Us | CREATESPACE",
  description:
    "Get in touch with CREATESPACE. We help with product questions, choosing the right kit, school partnerships, and STEM education enquiries.",
  alternates: {
    canonical: "/contact",
  },
};

const linkClass =
  "inline-block max-w-full py-1 text-navy font-medium break-words underline decoration-2 decoration-cs-orange underline-offset-4 hover:decoration-navy transition-colors";

/** Small outlined icons for the "other ways" list, drawn in one 1.5 stroke. */
const ICONS = {
  phone:
    "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
  email:
    "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  pin: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
  social:
    "M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z",
};

function LineIcon({ d }: { d: string }) {
  return (
    <svg
      className="h-5 w-5 text-cs-orange"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

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
  const otherWays = [
    {
      label: "WhatsApp",
      icon: (
        <svg
          className="h-5 w-5 text-cs-orange"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={WHATSAPP_ICON} />
        </svg>
      ),
      content: <WhatsAppLink location="contact_page_list" className={linkClass} />,
    },
    {
      label: "Phone",
      icon: <LineIcon d={ICONS.phone} />,
      content: (
        <a href={phoneLink(PHONE_NUMBER)} className={linkClass}>
          {PHONE_NUMBER}
        </a>
      ),
    },
    {
      label: "Email",
      icon: <LineIcon d={ICONS.email} />,
      content: (
        <a href="mailto:info@thecreatespace.co.za" className={linkClass}>
          info@thecreatespace.co.za
        </a>
      ),
    },
    {
      label: "Where we are",
      icon: <LineIcon d={ICONS.pin} />,
      content: <p className="text-navy">Cape Town, South Africa</p>,
    },
    {
      label: "Social",
      icon: <LineIcon d={ICONS.social} />,
      content: <SocialLinks location="contact" />,
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
      <FaqJsonLd items={faqs} />

      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title={
          <>
            Get <span className="text-cs-orange">in touch</span>
          </>
        }
        subtitle="A question about a kit, help choosing for a certain age, or a school order? WhatsApp us, give us a call or drop us an email."
      />

      {/* Ways to reach us. WhatsApp is the main channel, so it leads with the
          page's one orange action; the rest sit in a plain ruled list. */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-navy md:text-3xl">
              Got a question? Chat to us
            </h2>
            <div className="mt-6">
              <WhatsAppLink
                location="contact_page"
                className="inline-flex items-center gap-2 rounded-lg bg-cs-orange px-6 py-4 font-semibold text-navy transition-colors hover:bg-navy hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 active:translate-y-px"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={WHATSAPP_ICON} />
                </svg>
                Chat on WhatsApp
              </WhatsAppLink>
            </div>
          </div>

          <div>
            <h2 className="sr-only">Other ways to reach us</h2>
            <dl className="divide-y divide-navy/10 border-y border-navy/10">
              {otherWays.map((way) => (
                <div
                  key={way.label}
                  className="grid grid-cols-[1.25rem_5.5rem_1fr] items-center gap-x-3 py-2 sm:grid-cols-[1.25rem_7rem_1fr] sm:gap-x-4"
                >
                  <span>{way.icon}</span>
                  <dt className="text-sm text-gray-600">{way.label}</dt>
                  {/* min-w-0 lets the email address wrap instead of widening the row. */}
                  <dd className="min-w-0">{way.content}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Form and FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-8 text-2xl font-semibold text-navy">Send us a message</h2>
              <ContactForm />
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-navy">Frequently asked questions</h2>
              <div className="divide-y divide-navy/10 border-y border-navy/10">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-navy hover:text-navy/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy [&::-webkit-details-marker]:hidden">
                      <span className="font-medium">{faq.question}</span>
                      <svg
                        className="h-5 w-5 shrink-0 text-cs-orange transition-transform duration-200 group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="max-w-prose pb-5 pr-9 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
