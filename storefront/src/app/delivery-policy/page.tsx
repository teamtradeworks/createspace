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
        <h1 className="text-3xl lg:text-4xl font-semibold text-navy mb-12">Delivery Policy</h1>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">Delivery Costs</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Standard delivery: R128</li>
              <li>Next day delivery: R218</li>
              <li>Free delivery on orders over R1,500</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">Delivery Area</h2>
            <p>
              We currently deliver within South Africa only. All deliveries are handled by The
              Courier Guy.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">Delivery Timeframes</h2>
            <p className="mb-3">
              Delivery time may vary depending on which area items are being delivered to, but
              typical delivery times are between 1 and 3 working days.
            </p>
            <p className="mb-3">
              For next day delivery, orders must be placed before 3PM on a business day. Orders
              placed after 3PM will be dispatched the following business day.
            </p>
            <p>
              We will ensure your order is delivered to you as timeously as possible but shall not
              be held liable for any losses or damages of any kind incurred due to late delivery.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">Failed Deliveries</h2>
            <p>
              The Courier Guy will attempt delivery up to 3 times. After the third attempt, the
              package will be returned to us and we will contact you to make further arrangements.
              If the failed delivery is proven to be the fault of CREATESPACE, we will dispatch your
              order again free of charge.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">Tracking &amp; Confirmation</h2>
            <p className="mb-3">
              Once your package has been sent you will receive an email confirming postal details
              including tracking and delivery information.
            </p>
            <p>
              Items are well packaged and protected. We reserve the right to charge our customers
              per the pricing structure mentioned above as well as change the pricing structure
              without prior notice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
