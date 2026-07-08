import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  VideoEmbed,
  FeatureGrid,
  ImageTextBlock,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-mega-space-activity-kit";

export default async function NatGeoMegaSpaceActivityKitPage() {
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
        tagline="Launch a rocket. Paint the planets. Turn off the lights and watch it all glow."
        highlights={[
          "100+ pieces across three space adventures, rocket, constellations, and solar system",
          "Glow-in-the-dark paints and 76 glow stars included",
          "Ages 8+",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=xldA9FqDtLU"
        title="National Geographic Mega Space Activity Kit"
        background="white"
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/national-geographic-mega-space-activity-kit/painted-planets-and-girl-sticking-on-window.jpg"
        imageAlt="Child sticking a hand-painted glow-in-the-dark solar system onto a window"
        title="A Solar System Your Child Paints Themselves"
        body="Kids paint each planet using stencils, glow-in-the-dark paints, and metallic silver and gold, then stick the finished solar system straight onto the window with the included suction cups. It&rsquo;s one of those activities that keeps them busy for a whole afternoon and leaves something genuinely cool on the window when it&rsquo;s done."
        layout="image-left"
        background="gray"
      />

      {/* white */}
      <FeatureGrid
        title="Three Space Adventures. One Big Box."
        columns={2}
        background="white"
        features={[
          {
            icon: "rocket",
            title: "Launch a Foam Rocket",
            description:
              "The quickest win in the box, launch the foam rocket and see how far it flies. A hands-on introduction to force and flight that gets everyone moving before settling in for the longer activities.",
          },
          {
            icon: "sparkles",
            title: "Build a Glowing Constellation",
            description:
              "76 glow-in-the-dark stars and 4 constellation cards turn any ceiling or wall into a night sky. Kids place the stars to recreate real constellation patterns, then charge them under a lamp and switch off the lights.",
          },
          {
            icon: "palette",
            title: "Paint the Solar System",
            description:
              "Stencils, glow-in-the-dark paints, and metallic silver and gold, kids paint each planet, the Sun, and the whole solar system onto a display that hangs in the window with the included suction cups.",
          },
          {
            icon: "book",
            title: "Learning Guide Packed with Space Facts",
            description:
              "The included Learning Guide goes beyond the activities, it&rsquo;s full of interstellar facts about the planets, constellations, and the universe that keep kids curious long after the painting is dry.",
          },
        ]}
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/national-geographic-mega-space-activity-kit/night-glow-in-the-dark-and-day.jpg"
        imageAlt="Side-by-side comparison of the solar system window display in daylight and glowing in the dark"
        title="The Best Part? Turn Off the Lights."
        body="The glow-in-the-dark reveal is the moment that makes this kit unforgettable. Glow stars on the ceiling. A solar system that lights up the window. The paints charge under any lamp or window light during the day, then do their thing at night. It&rsquo;s not a one-off experiment, it&rsquo;s a bedroom feature that stays there for weeks."
        layout="image-right"
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
            question: "What age is this best for?",
            answer:
              "The kit is designed for ages 8 and up. Most 8-year-olds can work through all three activities independently, the instructions are clear and the steps are manageable. The rocket launch is quick and exciting, while the constellation building and solar system painting give older kids something to really dig into.",
          },
          {
            question: "Is it messy? Will the paint stain?",
            answer:
              "The paints are small-volume craft paints made for kids. Work on a covered surface, and the process is no messier than any standard painting activity. The glow-in-the-dark and metallic paints are water-based. Normal care applies, cover the surface, wipe hands before touching furniture.",
          },
          {
            question: "How long does it take?",
            answer:
              "The rocket launch takes 10–15 minutes and is a great way to kick off the session. The constellation display takes around 30–45 minutes to plan and place. The solar system painting is the longest activity, around 1–2 hours including drying time between coats. Many kids split it across two sessions: painting one afternoon, assembly and hanging the next.",
          },
          {
            question: "Does my child need adult help?",
            answer:
              "Not really, the instructions are kid-friendly and most children aged 8+ can follow them independently. A light presence is useful for the first setup, but this is a kit designed for kids to work through on their own. The satisfaction of doing it themselves is part of the point.",
          },
          {
            question: "Does this need batteries or an app?",
            answer:
              "No batteries, no app, no downloads. The glow-in-the-dark paints and stars charge passively under any light source, a lamp, daylight through a window, and then glow in the dark. Nothing extra to buy or set up.",
          },
          {
            question: "How does the glow-in-the-dark work?",
            answer:
              "The stars and paints contain phosphorescent pigments that absorb light and slowly release it in the dark. Leave them near a lamp or in a sunny window for a few minutes, then switch off the lights. The brighter the light source and the longer the charge, the stronger the glow.",
          },
          {
            question: "What will my child get out of this?",
            answer:
              "A genuine feel for the solar system and the night sky, the planets, their colours, their order, real constellation patterns. The hands-on nature of painting and placing means kids spend real time with each part, not just reading. Beyond the space content, they&rsquo;ll finish with three things they actually made: a launched rocket, a glowing constellation display, and a solar system hanging in the window.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What&rsquo;s in the Box"
        image="/images/products/national-geographic-mega-space-activity-kit/whats-in-the-box.jpg"
        imageAlt="National Geographic Mega Space Activity Kit contents laid out"
        background="white"
        items={[
          "76 glow-in-the-dark stars",
          "4 constellation cards",
          "7 double-sided sticker sheets",
          "Planet and sun stencils",
          "5 glow-in-the-dark paints (orange, yellow, blue, red, green)",
          "2 metallic paints (silver, gold)",
          "9 suction cups",
          "1 foam rocket",
          "1 test tube",
          "Kid-friendly step-by-step instructions",
          "Learning Guide packed with interstellar facts",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Launch. Paint. Glow."
        subtitle="Three space adventures, 100+ pieces, and one room that lights up in the dark."
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
      "Launch a rocket, build glowing constellations, and paint a glow-in-the-dark solar system. 100+ pieces, ages 8+. Everything included.",
    alternates: {
      canonical: "/product/national-geographic-mega-space-activity-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
