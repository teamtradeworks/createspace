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
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-glow-in-the-dark-human-body";

export default async function NatGeoHumanBodyPage() {
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
        tagline="Piece together a skeleton. Examine every organ. Watch it glow in the dark."
        highlights={[
          "32-piece interactive anatomy model — organs, bones, and muscles",
          "Glow-in-the-dark skeleton that comes to life when the lights go off",
          "Ages 8–12 · No apps, everything included",
          "2025 NAPPA Award Winner · National Geographic",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=-_E4I-Rv9MM"
        title="National Geographic Glow-in-the-Dark Human Body Kit"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes This Kit Special"
        columns={2}
        background="gray"
        features={[
          {
            icon: "touch",
            title: "Squishy Organs You Can Actually Hold",
            description:
              "Nine anatomically correct organs — each one removable from the body shell by hand or with the included forceps. The heart. The brain. The lungs. Picking them up one at a time is what makes them real.",
          },
          {
            icon: "sparkles",
            title: "Glow-in-the-Dark Bones",
            description:
              "Eighteen bones that absorb light and glow in the dark. Charge them under a lamp, carry the model to a dark room, and watch the skeleton light up. It never gets old.",
          },
          {
            icon: "tool",
            title: "Forceps Included",
            description:
              "The same kind of instrument used in real labs. Precise enough to lift out a tiny kidney, satisfying enough to make every examination feel like the genuine article.",
          },
          {
            icon: "star",
            title: "A Finished Model Worth Displaying",
            description:
              "Once built, the body stands on its own display stand. Building it is the activity — displaying it is the reward. A 2025 NAPPA Award Winner, independently evaluated for educational quality.",
          },
        ]}
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/national-geographic-glow-in-the-dark-human-body/body-on-stand-with-forceps.jpg"
        imageAlt="Human body anatomy model on display stand with forceps"
        title="Not Just a Diagram"
        body="This is different from reading about the human body — it&rsquo;s picking up each organ, turning it over, and fitting it back into exactly the right spot. The liver is bigger than expected. The intestines take up more room than they should. The trachea is oddly light. These are the kinds of discoveries that stick with kids long after the model is back on the shelf."
        layout="image-left"
        background="white"
      />

      {/* gray */}
      <CustomerShowcase
        title="From the Box to the Display Stand"
        subtitle="See what building it actually looks like"
        background="gray"
        images={[
          {
            src: "/images/products/national-geographic-glow-in-the-dark-human-body/child-playing.jpg",
            alt: "Child exploring the anatomy model components",
            label: "Exploring",
            description:
              "Getting familiar with every piece before assembly begins",
          },
          {
            src: "/images/products/national-geographic-glow-in-the-dark-human-body/childs-hands-putting-body-together.jpg",
            alt: "Child's hands carefully assembling the human body model",
            label: "Assembly",
            description:
              "Using the forceps to position each organ and bone precisely",
          },
          {
            src: "/images/products/national-geographic-glow-in-the-dark-human-body/body-lying-on-chart.jpg",
            alt: "Human body model lying on the identification chart",
            label: "Step by Step",
            description:
              "The identification chart makes it clear where each piece belongs",
          },
          {
            src: "/images/products/national-geographic-glow-in-the-dark-human-body/organising-parts-on-guide.jpg",
            alt: "Anatomy parts organised on the learning guide",
            label: "Organising",
            description:
              "Matching each piece to the guide before placing it in the body",
          },
          {
            src: "/images/products/national-geographic-glow-in-the-dark-human-body/body-with-body-parts-around-it.jpg",
            alt: "Human body shell surrounded by organs and bones ready for assembly",
            label: "All the Parts",
            description:
              "The body shell with every organ, bone, and muscle ready to place",
          },
          {
            src: "/images/products/national-geographic-glow-in-the-dark-human-body/body-on-stand-built.jpg",
            alt: "Fully assembled human body model on the display stand",
            label: "Built",
            description: "Fully assembled — every organ and bone in place",
          },
          {
            src: "/images/products/national-geographic-glow-in-the-dark-human-body/close-up-of-body.jpg",
            alt: "Close-up of the anatomically detailed human body model",
            label: "Close Up",
            description:
              "Anatomically accurate detail — organs and bones that look the part",
          },
          {
            src: "/images/products/national-geographic-glow-in-the-dark-human-body/glowing-in-the-dark.jpg",
            alt: "Human body skeleton glowing in the dark",
            label: "Glowing",
            description:
              "The glow-in-the-dark reveal — the moment every build works toward",
          },
        ]}
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
              "The kit is designed for ages 8–12. Confident 8-year-olds can work through most of the assembly independently using the identification chart — the guide is clear and child-friendly. Children aged 10 and up will typically manage the whole thing on their own. Note that the kit contains small parts, so younger siblings (under 3) should not have unsupervised access to the pieces.",
          },
          {
            question: "Does it need batteries or an app?",
            answer:
              "No — nothing extra is needed. The glow-in-the-dark bones charge passively under any light source: a lamp, a window, sunlight, or even a bright classroom. No cables, no downloads, no screens. Switch off the lights and the skeleton glows.",
          },
          {
            question: "How long does it take to build?",
            answer:
              "The first assembly with the identification chart takes around 20–30 minutes. Subsequent assemblies are quicker — 10–15 minutes once children know where everything goes. Reading through the illustrated learning guide adds another 20–30 minutes if they want to go deeper. Most kids end up rebuilding it multiple times.",
          },
          {
            question: "Can it be taken apart and rebuilt?",
            answer:
              "Yes, as many times as they like. There are no consumables, no glue, and no fragile parts that wear out. The glow-in-the-dark bones recharge every time they&rsquo;re left in the light. Many kids move from guided assembly (using the chart) to building entirely from memory — which is a natural sign of how much they&rsquo;ve absorbed.",
          },
          {
            question: "Does the glow-in-the-dark actually work well?",
            answer:
              "Yes — the glow is clearly visible in a dark room. The brighter the light source beforehand, the stronger the glow. A few minutes under a good lamp is enough; direct sunlight works especially well. The effect is dramatic enough to genuinely surprise kids who haven&rsquo;t seen it before.",
          },
          {
            question: "Is it messy or difficult to set up?",
            answer:
              "No preparation needed at all — everything comes in the box ready to use. No paint, no glue, no water. Just open it, read the chart, and start assembling. The forceps make it easy to handle smaller pieces without fumbling.",
          },
          {
            question: "What will my child get out of it?",
            answer:
              "A real familiarity with the human body — the names of major organs and bones, where they live, and roughly what they do. Having physically held and placed each piece makes the information stick in a way that reading about it never quite does. Kids who&rsquo;ve built this model tend to use words like \"diaphragm\" and \"trachea\" in ordinary conversation shortly afterwards, and approach biology topics at school with noticeably more confidence.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What&rsquo;s in the Box"
        image="/images/products/national-geographic-glow-in-the-dark-human-body/whats-in-the-box.jpg"
        imageAlt="National Geographic Glow-in-the-Dark Human Body kit contents laid out"
        background="white"
        items={[
          "Human body shell (9\" / 25cm tall)",
          "Display stand",
          "9 squishy removable organs: heart, lungs, liver, stomach, diaphragm, kidneys & bladder, trachea, brain, large & small intestines",
          "Arm muscles piece",
          "18 glow-in-the-dark bones (including spine, sacrum, hip bones, scapula, clavicle, hand, arm, leg, and foot bones)",
          "Pair of forceps",
          "Organiser / identification chart",
          "Illustrated learning guide",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="A Human Body. Right in Their Hands."
        subtitle="Build it, examine it, and watch it glow."
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
      "Build a 32-piece human body model with squishy organs, glow-in-the-dark bones, and real forceps. Ages 8–12. 2025 NAPPA Award Winner.",
    alternates: {
      canonical: "/product/national-geographic-glow-in-the-dark-human-body",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
