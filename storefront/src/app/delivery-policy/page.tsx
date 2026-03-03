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

        <div className="prose prose-navy max-w-none text-gray-700 leading-relaxed">
          <h2 className="text-xl font-semibold text-navy mt-0">
            Delivery Costs
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Standard delivery: R115</li>
            <li>
              Free delivery on orders over R1,500
            </li>
            <li>
              Next day delivery is available at checkout at an additional cost
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-navy">Delivery Area</h2>
          <p>
            We currently deliver within South Africa only. All deliveries are
            handled by The Courier Guy.
          </p>

          <h2 className="text-xl font-semibold text-navy">
            Delivery Timeframes
          </h2>
          <p>
            Delivery time may vary depending on which area items are being
            delivered to, but typical delivery times are between 1 and 3 working
            days.
          </p>
          <p>
            For next day delivery, orders must be placed before 3PM on a
            business day. Orders placed after 3PM will be dispatched the
            following business day.
          </p>
          <p>
            We will ensure your order is delivered to you as timeously as
            possible but shall not be held liable for any losses or damages of
            any kind incurred due to late delivery.
          </p>

          <h2 className="text-xl font-semibold text-navy">
            Failed Deliveries
          </h2>
          <p>
            The Courier Guy will attempt delivery up to 3 times. After the third
            attempt, the package will be returned to us and we will contact you
            to make further arrangements. If the failed delivery is proven to be
            the fault of CREATESPACE, we will dispatch your order again free of
            charge.
          </p>

          <h2 className="text-xl font-semibold text-navy">
            Tracking & Confirmation
          </h2>
          <p>
            Once your package has been sent you will receive an email confirming
            postal details including tracking and delivery information.
          </p>
          <p>
            Items are well packaged and protected. We reserve the right to
            charge our customers per the pricing structure mentioned above as
            well as change the pricing structure without prior notice.
          </p>
        </div>
      </div>
    </section>
  );
}
