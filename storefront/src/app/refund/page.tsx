import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | CREATESPACE",
  description:
    "Learn about the CREATESPACE refund policy, including returns, exchanges, and how to request a refund.",
  alternates: {
    canonical: "/refund",
  },
};

export default function RefundPolicyPage() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-semibold text-navy mb-12">Refund Policy</h1>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <div>
            <p className="mb-3">
              At CREATESPACE we want to make sure that your shopping experience is a positive one!
              That is why we offer a 30-day return policy on items purchased through our store.
            </p>
            <p>
              If there has been a mistake on our part, or if the product was damaged during
              delivery, we will be happy to arrange a repair, replacement, or full refund at your
              choice.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">Cooling-Off Period</h2>
            <p>
              In terms of section 44 of the Electronic Communications and Transactions Act (Act 25
              of 2002), you may cancel your order without reason within 7 days of receiving the
              goods. The only charge that may apply is the direct cost of returning the goods to us.
              We will process your refund within 30 days of receiving the cancellation notice.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">Voluntary Return Policy</h2>
            <p>
              In addition to your statutory rights, we offer a 30-day return window on unopened and
              unused products. You have 30 days from the delivery date to return an item and receive
              a full refund for the value of the product. In order to be eligible, the product must
              be in a sellable condition and returned in its original packaging, untampered with.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">Defective Goods</h2>
            <p className="mb-3">
              In terms of section 56 of the Consumer Protection Act (Act 68 of 2008), you may return
              defective goods within 6 months of delivery, without penalty and at our risk and
              expense. Defective goods include products that are not in good working order, not free
              of defects, or not reasonably suitable for their intended purpose.
            </p>
            <p>
              For defective goods, you have the right to choose whether we repair the product,
              replace it, or provide a full refund. This applies even if the packaging has been
              opened and the product has been used.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">Refund Process</h2>
            <p>
              Once we receive the returned product, we will process your refund within 24 hours. The
              full amount, excluding any original delivery charges (unless the return is due to a
              defect or our error), will be charged back to your card.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">How to Submit a Return</h2>
            <p>
              To submit a return, please contact us at{" "}
              <a
                href="mailto:info@thecreatespace.co.za"
                className="text-navy underline hover:text-cs-blue"
              >
                info@thecreatespace.co.za
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
