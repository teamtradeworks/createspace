import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  FeatureGrid,
  VideoEmbed,
  ImageTextBlock,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-metal-detector-starter-kit";

export default async function NatGeoMetalDetectorPage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    notFound();
  }

  const resolvedAddons = await resolveAddonsForHandle(PRODUCT_HANDLE);
  const addons = serializeAddons(resolvedAddons);

  return (
    <ProductTrackingProvider handle={PRODUCT_HANDLE}>
      <ProductJsonLd product={product} />

      <HeroSection
        product={product}
        tagline="Sweep, beep, dig. Real treasure is hiding underground."
        highlights={[
          "18.8 cm waterproof coil — detects metal up to 10 cm underground",
          "Lightweight at 545 g — built for all-day exploring",
          "Adjustable arm fits kids aged 8 and up — folds to 33 cm for travel",
          "Full-colour Learning Guide: the science and history of metal detecting",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=kGnt6tBT_I8"
        title="National Geographic Metal Detector Starter Kit"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes This Kit Special"
        columns={3}
        background="gray"
        features={[
          {
            icon: "target",
            title: "It Actually Works",
            description:
              "This isn&rsquo;t a toy that beeps randomly — the 18.8 cm dual coil detects real metal objects up to 10 cm underground. Kids find actual coins, jewellery, relics, and buried curiosities. The thrill of a genuine find changes everything.",
          },
          {
            icon: "eye",
            title: "Instant Alert, Every Time",
            description:
              "When the coil passes over something metallic, a bright LED flashes and an audible beep fires. No second-guessing — kids know immediately when they&rsquo;ve found something and can pinpoint exactly where to dig.",
          },
          {
            icon: "compass",
            title: "Go Anywhere",
            description:
              "The waterproof coil works in wet grass, dry sand, and shallow water — making it just as useful at the beach as in the backyard. It collapses to just 33 cm for tossing in a bag, and the ergonomic arm keeps it comfortable for hours.",
          },
          {
            icon: "book",
            title: "Full-Colour Learning Guide",
            description:
              "Comes with a detailed guide covering the history of metal detecting (first portable patent: 1925), how electromagnetic induction works, and responsible detecting ethics — the kind of depth that makes kids want to know more.",
          },
          {
            icon: "tools",
            title: "Heavy-Duty Trowel Included",
            description:
              "A sturdy digging trowel is in the box — purpose-built for excavating finds without damaging them. No hunting for a spade or improvising with sticks. Everything needed to detect, dig, and recover is in the kit.",
          },
          {
            icon: "age",
            title: "Designed for Young Explorers",
            description:
              "At 545 g with an adjustable arm (85–103 cm), the detector is genuinely comfortable for kids. Setup takes under 10 minutes and the controls are simple enough for an 8-year-old to figure out independently.",
          },
        ]}
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/national-geographic-metal-detector-starter-kit/kids-searching-with-metal-detector.jpg"
        imageAlt="Children using a National Geographic metal detector to search for buried treasure outdoors"
        title="The Garden Has Secrets. So Does Every Beach."
        body="Every outing with this detector is a fresh hunt — a coin that&rsquo;s been underground for decades, a piece of jewellery from who-knows-when, or just a satisfying collection of found relics. Kids who detect regularly start looking at outdoor spaces differently: every park becomes a site worth investigating, every beach a question waiting to be answered. It&rsquo;s the kind of curiosity that doesn&rsquo;t switch off when the detector goes back in the bag."
        layout="image-left"
        background="gray"
      />

      {/* white */}
      <ProductReviews productId={product.id} background="white" />

      {/* gray */}
      <ProductFAQ
        title="Common Questions"
        background="gray"
        faqs={[
          {
            question: "What age is this suitable for?",
            answer:
              "Recommended for ages 8 and up. The controls are simple — power on, adjust sensitivity, sweep — and setup takes under 10 minutes. Most 8-year-olds can get the hang of it immediately and use it independently from the first outing.",
          },
          {
            question: "Does the battery come included?",
            answer:
              "No — the detector requires one 9V alkaline battery which is not included in the box. It&rsquo;s a standard battery available at any supermarket or hardware store. Stock one up before gifting.",
          },
          {
            question: "How deep can it detect?",
            answer:
              "The 18.8 cm dual coil detects metal objects buried up to 10 cm below the surface. That covers most coins, jewellery, small relics, and buried items in parks and beaches. Detection depth can vary based on ground mineralisation and the size of the object.",
          },
          {
            question: "Can it be used at the beach?",
            answer:
              "Yes — the coil is waterproof, making it suitable for wet sand, shallow water edges, and rain. The handle and control box are not waterproof, so keep those dry. Beach detecting near tide lines is one of the most productive environments for beginners.",
          },
          {
            question: "Is it easy to set up?",
            answer:
              "Very. Slide the armrest into the handle, extend the telescoping shaft to a comfortable height, insert the battery, and you&rsquo;re ready. The whole process takes under 10 minutes and no tools are needed. The included guide walks through everything clearly.",
          },
          {
            question: "What might they actually find?",
            answer:
              "It varies by location — but coins (including older ones), lost jewellery, metal buttons, buckles, keys, and small relics are common finds. Parks, old school grounds, and beaches near activity areas tend to be most rewarding. Part of the excitement is that every outing is different.",
          },
          {
            question: "Are there any restrictions on where to detect?",
            answer:
              "Yes — some public parks, heritage sites, and national monuments prohibit metal detecting. Always check local rules before heading out. Private land requires the landowner&rsquo;s permission. The included Learning Guide covers responsible detecting ethics, including respecting property and filling all holes after digging.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What&rsquo;s in the Box"
        image="/images/products/national-geographic-metal-detector-starter-kit/whats-in-the-box.jpg"
        imageAlt="National Geographic Metal Detector Starter Kit contents laid out"
        background="white"
        items={[
          "Metal detector unit with adjustable telescoping arm and armrest",
          "18.8 cm waterproof dual coil (attached)",
          "Heavy-duty trowel",
          "Full-colour Learning Guide (science and history of metal detecting)",
          "Not included: 1 × 9V alkaline battery",
        ]}
      />

      {/* gray */}
      <Specifications
        title="Specifications"
        background="gray"
        specs={[
          { label: "Coil Size", value: "18.8 cm (waterproof dual coil)" },
          { label: "Detection Depth", value: "Up to 10 cm" },
          { label: "Weight", value: "~545 g" },
          { label: "Adjustable Length", value: "85 cm to 103 cm" },
          { label: "Folded Length", value: "33 cm" },
          { label: "Battery", value: "1 × 9V alkaline (not included)" },
          { label: "Alert System", value: "LED light + audible beep" },
          { label: "Coil Waterproofing", value: "Yes (handle is not waterproof)" },
          { label: "Recommended Age", value: "8+" },
          {
            label: "Suitable Environments",
            value: "Parks, backyards, beaches, hiking trails",
          },
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Time to Start the Hunt"
        subtitle="Pack the trowel, grab a 9V battery, and pick a spot to search."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse More Kits"
        secondaryHref="/shop"
        background="navy"
      />
    </ProductTrackingProvider>
  );
}

export async function generateMetadata() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | CREATESPACE`,
    description:
      "A real metal detector for kids aged 8+. 18.8 cm waterproof coil detects objects up to 10 cm deep. Includes trowel and full-colour Learning Guide.",
    alternates: {
      canonical: "/product/national-geographic-metal-detector-starter-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
