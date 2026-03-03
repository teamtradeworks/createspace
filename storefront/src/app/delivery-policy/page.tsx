import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery Policy | CREATESPACE",
  description:
    "Learn about CREATESPACE delivery times, costs, and tracking for orders across South Africa.",
  alternates: {
    canonical: "/delivery-policy",
  },
};

export default function DeliveryPolicyPage() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-semibold text-navy mb-8">
          Delivery Policy
        </h1>

        <div className="prose prose-navy max-w-none space-y-6 text-gray-700 leading-relaxed">
          <p>
            Delivery time may vary depending on which area items are being
            delivered to, but typical delivery times are between 1 and 3 working
            days. A next day delivery option is also available at checkout at an
            additional cost.
          </p>

          <p>
            We will ensure your order is delivered to you as timeously as
            possible but shall not be held liable for any losses or damages of
            any kind incurred due to late delivery. Items are well packaged and
            protected. We reserve the right to charge our customers per the
            pricing structure mentioned in our delivery terms as well as change
            the pricing structure as we please without warning or consent.
          </p>

          <p>
            Once your package has been sent you will receive an email confirming
            postal details including tracking and delivery information.
          </p>
        </div>
      </div>
    </section>
  );
}
