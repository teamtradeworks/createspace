export default function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CREATESPACE",
    url: "https://thecreatespace.co.za",
    logo: "https://thecreatespace.co.za/images/brand/logo-dark.png",
    description:
      "South Africa's specialist STEM toy store. Curated robotics kits, coding toys, and science sets to inspire young minds.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@thecreatespace.co.za",
      contactType: "customer service",
      areaServed: "ZA",
      availableLanguage: "English",
    },
    areaServed: {
      "@type": "Country",
      name: "South Africa",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
