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
        <h1 className="text-3xl lg:text-4xl font-semibold text-navy mb-8">
          Refund Policy
        </h1>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
          <p>
            At CREATESPACE we want to make sure that your shopping experience is
            a positive one! That is why we offer a 30-day return policy on items
            purchased through our store.
          </p>

          <p>
            If there has been a mistake on our part, or if the product was
            damaged during shipping, we will be happy to send you a replacement
            product.
          </p>

          <p>
            If the product is unopened and unused, you have 30 days from the
            delivery date to return it and receive a full refund for the value of
            the product. In order to be eligible for a refund or replacement, the
            product you are sending back to us must be in a sellable condition.
            All products that are returned to us must be sent back in their
            original packaging and not tampered with.
          </p>

          <p>
            To submit a return, please contact us at{" "}
            <a
              href="mailto:info@thecreatespace.co.za"
              className="text-cs-orange hover:underline font-medium"
            >
              info@thecreatespace.co.za
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
