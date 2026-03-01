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
        <h1 className="text-3xl lg:text-4xl font-semibold text-navy mb-8">
          Privacy Policy
        </h1>
        <p className="text-gray-500">This page is coming soon.</p>
      </div>
    </section>
  );
}
