import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | CREATESPACE",
  description:
    "Read the CREATESPACE terms of service governing your use of our website and purchases.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-semibold text-navy mb-12">
          Terms of Service
        </h1>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <div>
            <p className="mb-3">
              This website is operated and hosted by Tradeworks Online (Pty) Ltd,
              company registration number 2021/432299/07, VAT number
              4450302973, trading as CREATESPACE.
              It is assumed that the terms &ldquo;we&rdquo;, &ldquo;us&rdquo;
              and &ldquo;our&rdquo; refers to CREATESPACE throughout the
              entirety of this document. We offer all information, tools and
              services available from this site to you, the user, conditioned
              upon your acceptance of all terms, conditions, policies and notices
              stated here.
            </p>
            <p className="mb-3">
              By visiting our site and/or purchasing something from us, you
              engage in our &ldquo;Service&rdquo; and agree to be bound by the
              following &ldquo;Terms and conditions of use&rdquo;, including
              those additional terms and conditions and policies referenced
              herein and/or available by hyperlink. These Terms of Service apply
              to all users of this site.
            </p>
            <p>
              Any new features or tools which are added to the current store
              shall also be subject to the Terms of Service. You can review the
              most current version of the Terms of Service at any time on this
              page. We reserve the right to update, change or replace any part of
              these Terms of Service by posting updates and/or changes to our
              website. It is your responsibility to check this page periodically
              for changes. Your continued use of or access to the website
              following the posting of any changes constitutes acceptance of
              those changes.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">General</h2>
            <p>
              By accessing the website, you warrant and represent to the website
              owner that you are legally entitled to do so and to make use of
              information made available via the website.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Trademarks
            </h2>
            <p>
              The trademarks, names, logos and service marks (collectively
              &ldquo;trademarks&rdquo;) displayed on this website are registered
              and unregistered trademarks of the website owner. Nothing contained
              on this website should be construed as granting any license or
              right to use any trademark without the prior written permission of
              the website owner.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              General Conditions
            </h2>
            <p className="mb-3">
              We reserve the right to refuse service to anyone for any reason at
              any time.
            </p>
            <p className="mb-3">
              You understand that your content (not including credit card
              information), may be transferred unencrypted and involve (a)
              transmissions over various networks; and (b) changes to conform and
              adapt to technical requirements of connecting networks or devices.
              Credit card information is always encrypted during transfer over
              networks.
            </p>
            <p>
              You agree not to reproduce, duplicate, copy, sell, resell or
              exploit any portion of the Service, use of the Service, or access
              to the Service or any contact on the website through which the
              service is provided, without express written permission by us. The
              headings used in this agreement are included for convenience only
              and will not limit or otherwise affect these Terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Accuracy, Completeness and Timeliness of Information
            </h2>
            <p className="mb-3">
              We are not responsible if information made available on this site
              is not accurate, complete or current. The material on this site is
              provided for general information only and should not be relied upon
              or used as the sole basis for making decisions without consulting
              primary, more accurate, more complete or more timely sources of
              information. Any reliance on the material on this site is at your
              own risk.
            </p>
            <p>
              This site may contain certain historical information. Historical
              information, necessarily, is not current and is provided for your
              reference only. We reserve the right to modify the contents of this
              site at any time, but we have no obligation to update any
              information on our site. You agree that it is your responsibility
              to monitor changes to our site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Modifications to the Service and Prices
            </h2>
            <p className="mb-3">
              Prices for our products are subject to change without notice. We
              reserve the right at any time to modify or discontinue the Service
              (or any part or content thereof) without notice at any time.
            </p>
            <p>
              We shall not be liable to you or to any third-party for any
              modification, price change, suspension or discontinuance of the
              Service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Products or Services
            </h2>
            <p className="mb-3">
              Certain products or services may be available exclusively online
              through the website. These products or services may have limited
              quantities and are subject to return or exchange only according to
              our Return Policy. We have made every effort to display as
              accurately as possible the colours and images of our products that
              appear at the store and cannot guarantee that you will receive
              exactly what is displayed on your screen.
            </p>
            <p className="mb-3">
              We reserve the right, but are not obligated, to limit the sales of
              our products or Services to any person, geographic region or
              jurisdiction. We may exercise this right on a case-by-case basis.
              We reserve the right to limit the quantities of any products or
              services that we offer. All descriptions of products or product
              pricing are subject to change at any time without notice, at the
              sole discretion of us. We reserve the right to discontinue any
              product at any time. Any offer for any product or service made on
              this site is void where prohibited.
            </p>
            <p>
              We do not warrant that the quality of any products, services,
              information, or other material purchased or obtained by you will
              meet your expectations, or that any errors in the Service will be
              corrected.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">Payments</h2>
            <p>
              Payment is accepted via credit card (Visa or Mastercard). Online
              credit card transactions will be acquired for CREATESPACE via
              Stitch. Stitch has robust Security &amp; Fraud Prevention by way
              of Extended Validation SSL with 2048-bit encryption, 3D secure and
              no credit card details are stored on the website. Customer details
              will be stored by CREATESPACE separately from card details which
              are entered by the client on Stitch&apos;s secure site. CREATESPACE
              takes all reasonable steps to scrutinise all transactions to
              prevent attempted fraud and a transaction may be refused if we are
              not satisfied with its legitimacy.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Accuracy of Billing and Account Information
            </h2>
            <p className="mb-3">
              We reserve the right to refuse any order you place with us. We
              may, in our sole discretion, limit or cancel quantities purchased
              per person, per household or per order. These restrictions may
              include orders placed by or under the same customer account, the
              same credit card, and/or orders that use the same billing and/or
              delivery address. In the event that we make a change to or cancel
              an order, we may attempt to notify you by contacting the e-mail
              and/or billing address/phone number provided at the time the order
              was made.
            </p>
            <p>
              You agree to provide current, complete and accurate purchase and
              account information for all purchases made at our store. You agree
              to promptly update your account and other information, including
              your email address and credit card numbers and expiration dates, so
              that we can complete your transactions and contact you as needed.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              User Comments, Feedback and Other Submissions
            </h2>
            <p className="mb-3">
              If, at our request, you send certain specific submissions (for
              example contest entries) or without a request from us you send
              creative ideas, suggestions, proposals, plans, or other materials,
              whether online, by email, by postal mail, or otherwise
              (collectively, &ldquo;comments&rdquo;), you agree that we may, at
              any time, without restriction, edit, copy, publish, distribute,
              translate and otherwise use in any medium any comments that you
              forward to us. We are and shall be under no obligation (1) to
              maintain any comments in confidence; (2) to pay compensation for
              any comments; or (3) to respond to any comments.
            </p>
            <p className="mb-3">
              We may, but have no obligation to, monitor, edit or remove content
              that we determine in our sole discretion are unlawful, offensive,
              threatening, libellous, defamatory, pornographic, obscene or
              otherwise objectionable or violates any party&apos;s intellectual
              property or these Terms of Service.
            </p>
            <p>
              You agree that your comments will not violate any right of any
              third-party, including copyright, trademark, privacy, personality
              or other personal or proprietary right. You further agree that
              your comments will not contain libellous or otherwise unlawful,
              abusive or obscene material, or contain any computer virus or
              other malware that could in any way affect the operation of the
              Service or any related website. You may not use a false e-mail
              address, pretend to be someone other than yourself, or otherwise
              mislead us or third-parties as to the origin of any comments. You
              are solely responsible for any comments you make and their
              accuracy. We take no responsibility and assume no liability for
              any comments posted by you or any third-party.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Errors, Inaccuracies and Omissions
            </h2>
            <p className="mb-3">
              Occasionally there may be information on our site or in the
              Service that contains typographical errors, inaccuracies or
              omissions that may relate to product descriptions, pricing,
              promotions, offers, product delivery charges, transit times and
              availability. We reserve the right to correct any errors,
              inaccuracies or omissions, and to change or update information or
              cancel orders if any information in the Service or on any related
              website is inaccurate at any time without prior notice (including
              after you have submitted your order).
            </p>
            <p>
              We undertake no obligation to update, amend or clarify information
              in the Service or on any related website, including without
              limitation, pricing information, except as required by law. No
              specified update or refresh date applied in the Service or on any
              related website, should be taken to indicate that all information
              in the Service or on any related website has been modified or
              updated.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Prohibited Uses
            </h2>
            <p>
              In addition to other prohibitions as set forth in the Terms of
              Service, you are prohibited from using the site or its content:
              (a) for any unlawful purpose; (b) to solicit others to perform or
              participate in any unlawful acts; (c) to violate any
              international, federal, provincial or state regulations, rules,
              laws, or local ordinances; (d) to infringe upon or violate our
              intellectual property rights or the intellectual property rights of
              others; (e) to harass, abuse, insult, harm, defame, slander,
              disparage, intimidate, or discriminate based on gender, sexual
              orientation, religion, ethnicity, race, age, national origin, or
              disability; (f) to submit false or misleading information; (g) to
              upload or transmit viruses or any other type of malicious code that
              will or may be used in any way that will affect the functionality
              or operation of the Service or of any related website, other
              websites, or the Internet; (h) to collect or track the personal
              information of others; (i) to spam, phish, pharm, pretext, spider,
              crawl, or scrape; (j) for any obscene or immoral purpose; or (k)
              to interfere with or circumvent the security features of the
              Service or any related website, other websites, or the Internet. We
              reserve the right to terminate your use of the Service or any
              related website for violating any of the prohibited uses.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              External Links
            </h2>
            <p>
              External links may be provided for your convenience, but they are
              beyond the control of the website owner and no representation is
              made as to their content. Use or reliance on any external links and
              the content thereon provided is at your own risk.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Warranties
            </h2>
            <p>
              CREATESPACE makes no warranties, representations, statements or
              guarantees (whether express, implied in law or residual) regarding
              the website.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Disclaimer of Liability
            </h2>
            <p>
              CREATESPACE, our directors, officers, employees, affiliates,
              agents, contractors, interns, suppliers, service providers shall
              not be responsible for and disclaims all liability for any loss,
              liability, damage (whether direct, indirect or consequential),
              personal injury or expense of any nature whatsoever which may be
              suffered by you or any third party (including your company), as a
              result of or which may be attributable, directly or indirectly, to
              your access and use of the website, any information contained on
              the website, your or your company&apos;s personal information or
              material and information transmitted over our system. In
              particular, neither the website owner nor any third party or data
              or content provider shall be liable in any way to you or to any
              other person, firm or corporation whatsoever for any loss,
              liability, damage (whether direct or consequential), personal
              injury or expense of any nature whatsoever arising from any delays,
              inaccuracies, errors in, or omission of any share price
              information or the transmission thereof, or for any actions taken
              in reliance thereon or occasioned thereby or by reason of
              non-performance or interruption, or termination thereof.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Conflict of Terms
            </h2>
            <p>
              If there is a conflict or contradiction between the provisions of
              these website terms and conditions and any other relevant terms and
              conditions, policies or notices, the other relevant terms and
              conditions, policies or notices which relate specifically to a
              particular section or module of the website shall prevail in
              respect of your use of the relevant section or module of the
              website.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Severability
            </h2>
            <p>
              Any provision of any relevant terms and conditions, policies and
              notices, which is or becomes unenforceable in any jurisdiction,
              whether due to being void, invalidity, illegality, unlawfulness or
              for any reason whatever, shall, in such jurisdiction only and only
              to the extent that it is so unenforceable, be treated as void and
              the remaining provisions of any relevant terms and conditions,
              policies and notices shall remain in full force and effect.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Consumer Rights
            </h2>
            <p className="mb-3">
              Nothing in these Terms of Service is intended to limit or override
              your statutory rights under the Consumer Protection Act (Act 68 of
              2008) or the Electronic Communications and Transactions Act (Act
              25 of 2002). Where any provision of these Terms conflicts with
              your rights under those Acts, the relevant legislation shall
              prevail.
            </p>
            <p>
              In particular, your rights in respect of defective goods (section
              56 of the CPA), the implied warranty of quality (section 55 of the
              CPA), and the cooling-off period for online purchases (section 44
              of the ECTA) are non-waivable and apply in full. For details on
              returns and refunds, please see our{" "}
              <Link
                href="/refund"
                className="text-navy underline hover:text-cs-blue"
              >
                Refund Policy
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Applicable Laws (Choice of Venue and Forum)
            </h2>
            <p className="mb-3">
              Use of this website shall in all respects be governed by the laws
              of the Republic of South Africa, including but not limited to the
              Consumer Protection Act (Act 68 of 2008), the Electronic
              Communications and Transactions Act (Act 25 of 2002), and the
              Protection of Personal Information Act (Act 4 of 2013), regardless
              of the laws that might be applicable under principles of conflicts
              of law.
            </p>
            <p>
              The parties agree that the South African courts of law shall have
              exclusive jurisdiction over all controversies arising under this
              agreement and agree that venue is proper in those courts.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">
              Changes of Terms of Service
            </h2>
            <p>
              You can review the most current version of the Terms of Service at
              any time at this page. We reserve the right, at our sole
              discretion, to update, change or replace any part of these Terms of
              Service by posting updates and changes to our website. It is your
              responsibility to check our website periodically for changes. Your
              continued use of or access to our website or the Service following
              the posting of any changes to these Terms of Service constitutes
              acceptance of those changes.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-3">Delivery</h2>
            <p>
              For full details on delivery timeframes, costs, and procedures,
              please refer to our{" "}
              <Link
                href="/delivery-policy"
                className="text-navy underline hover:text-cs-blue"
              >
                Delivery Policy
              </Link>
              . All delivery terms form part of these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
