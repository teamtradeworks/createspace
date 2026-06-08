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
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-break-open-5-geodes";

export default async function NatGeoBreakOpen5GeodesPage() {
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
        tagline="Crack open a real rock and discover the crystals that have been waiting inside for millions of years."
        highlights={[
          "5 real geodes to break open — every reveal a genuine surprise",
          "Safety goggles, magnifying glass, display stand and learning guide included",
          "Ages 8+",
          "All you need to add is a hammer",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=H8g6XI-gcAM"
        title="See the Geodes in Action"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes This Kit Special"
        columns={2}
        background="gray"
        features={[
          {
            icon: "sparkles",
            title: "Every Geode Is a Surprise",
            description:
              "The crystals inside vary from rock to rock — same kit, five completely different reveals. You won't know what you've got until the moment it cracks open.",
          },
          {
            icon: "star",
            title: "Real Geological Specimens",
            description:
              "These aren't plastic replicas. Each geode is a genuine rock that formed underground. Crack one open and you're holding a piece of the Earth that no one has ever seen before.",
          },
          {
            icon: "time",
            title: "Millions of Years in the Making",
            description:
              "The crystals inside started growing long before there were dinosaurs. That context — cracking open something truly ancient — makes a simple activity feel extraordinary.",
          },
          {
            icon: "book",
            title: "Learn What You're Holding",
            description:
              "The full-colour learning guide explains how geodes form, how crystals grow, and how to identify what's inside. Science that comes with a thrill attached.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/national-geographic-break-open-5-geodes/kids-breaking-open-geodes-with-hammer.jpg"
        imageAlt="Child using a hammer to crack open a geode wearing safety goggles"
        title="The Moment the Rock Cracks Open"
        body="Put on the goggles, set the geode on a hard surface, and strike. The rock splits into two halves — and inside is a hollow cavity lined with crystals that have been growing there for thousands of years. Use the magnifying glass to examine the crystal shapes up close, then check the learning guide to figure out what mineral you're looking at. Each of the five geodes is a separate reveal — and because they're real geological specimens, no two are the same."
        layout="image-right"
        background="white"
        imageObjectPosition="50% 80%"
      />

      {/* gray */}
      <ProductFAQ
        title="Common Questions"
        background="gray"
        faqs={[
          {
            question: "What age is this best for?",
            answer:
              "The kit is designed for ages 8 and up. Younger children in that range will love the excitement of breaking open the geodes, though the hammering step benefits from adult support. Children aged 10 and up can largely work through it independently once set up. The learning guide gives curious older kids plenty to dig into.",
          },
          {
            question: "Is a hammer included?",
            answer:
              "No — a hammer or similar striking tool is not included and will need to be sourced separately. A regular household hammer works well. The learning guide includes tips on the best techniques for cracking geodes cleanly.",
          },
          {
            question: "Does my child need adult help?",
            answer:
              "Adult supervision is recommended, especially for the hammering step. The kit includes safety goggles to protect eyes during breaking. Once the geode is open, examining the crystals and reading the guide are fully child-led.",
          },
          {
            question: "What crystals might be inside?",
            answer:
              "Geodes can contain a variety of minerals — quartz and calcite are the most common in starter kits like this. Crystal formations vary in shape, size, and colour from rock to rock. Some reveal a hollow cavity lined with sparkling white druzy quartz; others have more compact calcite deposits. Every geode is genuinely different.",
          },
          {
            question: "What if a geode turns out to be mostly solid?",
            answer:
              "It does happen — not every geode has a large crystal-filled hollow. This is a natural property of geological specimens, not a manufacturing defect. The variability is part of what makes each break genuine rather than guaranteed. The learning guide addresses this and helps children understand why it occurs.",
          },
          {
            question: "Can we display the crystals once opened?",
            answer:
              "Yes — the kit includes a display stand so children can show off their best crystal halves. Many children are inspired to start a rock and mineral collection after this kit. The crystals are permanent keepsakes that last indefinitely.",
          },
          {
            question: "What will my child get out of this?",
            answer:
              "Beyond the sheer excitement of the break, children come away understanding how rocks and crystals form in the Earth — and why each one is unique. They'll practise careful observation using the magnifying glass, and the experience of not knowing what's inside before they break it open is a genuine lesson in scientific uncertainty. The crystals they keep are a reminder of that discovery long after the kit is finished.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-break-open-5-geodes/whats-in-the-box.jpg"
        imageAlt="National Geographic Break Open 5 Geodes kit contents laid out"
        background="white"
        items={[
          "5 premium-quality, unopened geodes",
          "1 pair of safety goggles",
          "1 magnifying glass",
          "1 display stand",
          "1 full-colour learning guide with instructions",
        ]}
      />

      {/* white */}
      <ProductReviews productId={product.id} background="white" />

      {/* navy */}
      <CallToAction
        title="Crack Open Something Extraordinary"
        subtitle="Five real rocks. Five genuine surprises. Crystals that have been waiting millions of years to be found."
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
      "Crack open 5 real geodes and discover the crystals hidden inside. Includes safety goggles, magnifying glass, display stand, and learning guide. Ages 8+.",
    alternates: {
      canonical: "/product/national-geographic-break-open-5-geodes",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
