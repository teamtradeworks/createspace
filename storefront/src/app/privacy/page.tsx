import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CREATESPACE",
  description:
    "Read the CREATESPACE privacy policy to understand how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-semibold text-navy mb-12">
          Privacy Policy
        </h1>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              What Do We Do With Your Information?
            </h2>
            <p className="mb-3">
              When you purchase something from our store, as part of the buying
              and selling process, we collect the personal information you give
              us such as your name, address and email address.
            </p>
            <p className="mb-3">
              When you browse our store, we also automatically receive your
              computer&apos;s internet protocol (IP) address in order to provide
              us with information that helps us learn about your browser and
              operating system.
            </p>
            <p>
              <strong>Email marketing (if applicable):</strong> With your
              permission, we may send you emails about our store, new products
              and other updates.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">Consent</h2>
            <p className="mb-3">
              <strong>How do you get my consent?</strong> When you provide us
              with personal information to complete a transaction, verify your
              credit card, place an order, arrange for a delivery or return a
              purchase, we imply that you consent to our collecting it and using
              it for that specific reason only. If we ask for your personal
              information for a secondary reason, like marketing, we will either
              ask you directly for your expressed consent, or provide you with an
              opportunity to say no.
            </p>
            <p>
              <strong>How do I withdraw my consent?</strong> If after you opt-in,
              you change your mind, you may withdraw your consent for us to
              contact you, for the continued collection, use or disclosure of
              your information, at any time, by contacting us at{" "}
              <a
                href="mailto:info@thecreatespace.co.za"
                className="text-navy underline hover:text-blue"
              >
                info@thecreatespace.co.za
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Disclosure
            </h2>
            <p>
              We may disclose your personal information if we are required by law
              to do so or if you violate our Terms of Service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Third-Party Services
            </h2>
            <p className="mb-3">
              In general, the third-party providers used by us will only collect,
              use and disclose your information to the extent necessary to allow
              them to perform the services they provide to us.
            </p>
            <p className="mb-3">
              However, certain third-party service providers, such as payment
              gateways and other payment transaction processors, have their own
              privacy policies in respect to the information we are required to
              provide to them for your purchase-related transactions. For these
              providers, we recommend that you read their privacy policies so you
              can understand the manner in which your personal information will
              be handled by these providers.
            </p>
            <p className="mb-3">
              In particular, remember that certain providers may be located in or
              have facilities that are located in a different jurisdiction than
              either you or us. So if you elect to proceed with a transaction
              that involves the services of a third-party service provider, then
              your information may become subject to the laws of the
              jurisdiction(s) in which that service provider or its facilities
              are located.
            </p>
            <p>
              Once you leave our store&apos;s website or are redirected to a
              third-party website or application, you are no longer governed by
              this Privacy Policy or our website&apos;s Terms of Service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">Links</h2>
            <p>
              When you click on links on our store, they may direct you away from
              our site. We are not responsible for the privacy practices of other
              sites and encourage you to read their privacy statements.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">Security</h2>
            <p className="mb-3">
              To protect your personal information, we take reasonable
              precautions and follow industry best practices to make sure it is
              not inappropriately lost, misused, accessed, disclosed, altered or
              destroyed.
            </p>
            <p>
              If you provide us with your credit card information, the
              information is encrypted using secure socket layer technology (SSL)
              and stored with AES-256 encryption. Although no method of
              transmission over the Internet or electronic storage is 100%
              secure, we follow all PCI-DSS requirements and implement additional
              generally accepted industry standards.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">Cookies</h2>
            <p>
              Our website uses cookies. By using our website and agreeing to this
              policy, you consent to our use of cookies in accordance with the
              terms of this policy.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Age of Consent
            </h2>
            <p>
              By using this site, you represent that you are at least the age of
              majority in your province of residence, or that you are the age of
              majority in your province of residence and you have given us your
              consent to allow any of your minor dependents to use this site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Changes to This Privacy Policy
            </h2>
            <p className="mb-3">
              We reserve the right to modify this privacy policy at any time, so
              please review it frequently. Changes and clarifications will take
              effect immediately upon their posting on the website. If we make
              material changes to this policy, we will notify you here that it
              has been updated, so that you are aware of what information we
              collect, how we use it, and under what circumstances, if any, we
              use and/or disclose it.
            </p>
            <p>
              If our store is acquired or merged with another company, your
              information may be transferred to the new owners so that we may
              continue to sell products to you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
