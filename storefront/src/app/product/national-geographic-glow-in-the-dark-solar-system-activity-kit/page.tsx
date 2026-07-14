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

const PRODUCT_HANDLE = "national-geographic-glow-in-the-dark-solar-system-activity-kit";

export default async function NatGeoSolarSystemPage() {
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
        tagline="Paint the planets. Flip off the lights. Watch your solar system glow."
        highlights={[
          "All 8 planets and the Sun to paint and assemble, yours to keep on display",
          "Glow-in-the-dark paint included, every planet lights up in the dark",
          "Ages 8–12",
          "2025 NAPPA Award Winner · National Geographic",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=JTXGEMfwLR0"
        title="National Geographic Glow-in-the-Dark Solar System Activity Kit"
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
            title: "Lights Off, Solar System On",
            description:
              "Glow-in-the-dark paint turns the finished model into a bedroom display that comes alive at night. Charge it under a lamp, switch off the lights, and the planets glow. Every single one.",
          },
          {
            icon: "palette",
            title: "You Paint Every Planet",
            description:
              "Six vibrant paints plus glow-in-the-dark accent. Mix colours, make each planet your own. The painting is what makes this model yours: not a kit off a shelf, but a solar system you built.",
          },
          {
            icon: "arm",
            title: "Movable Arms, Always Rearrangeable",
            description:
              "Each planet arm moves independently. Position them however you like and rearrange whenever the mood strikes. It stays as a display long after the building is done.",
          },
          {
            icon: "book",
            title: "National Geographic Planet Facts",
            description:
              "The included learning guide and solar system poster are packed with facts about each planet and the Sun, the kind of details that make kids look up and ask more questions.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/national-geographic-glow-in-the-dark-solar-system-activity-kit/the-solar-system-guide-diagram.jpg"
        imageAlt="National Geographic solar system guide diagram showing the planets"
        title="A Solar System That's Completely Theirs"
        body="This isn't a model you buy finished off a shelf: your child builds it, paints it, and arranges it themselves. Every planet gets its own coat of colour. The Sun gets its glow. Then it all goes up on the movable arm display, ready to light up the bedroom every night. That ownership is what makes it stick: the pride of pointing at Saturn and saying 'I painted that.'"
        layout="image-left"
        background="white"
      />

      {/* gray */}
      <CustomerShowcase
        title="Build, Paint, Glow"
        subtitle="See what this kit looks like in real hands, from unboxing to glowing display"
        background="gray"
        images={[
          {
            src: "/images/products/national-geographic-glow-in-the-dark-solar-system-activity-kit/child-painting.jpg",
            alt: "Child carefully painting a planet from the solar system kit",
            label: "Painting",
            description: "Mixing colours, choosing shades: the painting stage is deeply absorbing",
          },
          {
            src: "/images/products/national-geographic-glow-in-the-dark-solar-system-activity-kit/planets-being-painted-with-instructions.jpg",
            alt: "Planets being painted alongside the illustrated instruction guide",
            label: "Step by Step",
            description:
              "Colourful instructions make it easy to follow along, even for confident 8-year-olds",
          },
          {
            src: "/images/products/national-geographic-glow-in-the-dark-solar-system-activity-kit/all-parts-unboxed.jpg",
            alt: "All parts of the solar system kit laid out before assembly",
            label: "Unboxing",
            description:
              "All 9 celestial bodies, paints, decals, and display structure. Everything in the box.",
          },
          {
            src: "/images/products/national-geographic-glow-in-the-dark-solar-system-activity-kit/solar-system-finished.jpg",
            alt: "Finished painted solar system model assembled on display arms",
            label: "Finished",
            description: "Fully assembled, fully painted, and ready for the lights to go out",
          },
          {
            src: "/images/products/national-geographic-glow-in-the-dark-solar-system-activity-kit/hand-holding-solar-system.jpg",
            alt: "Hand holding the completed glowing solar system model",
            label: "Glowing",
            description: "The glow-in-the-dark reveal: the payoff every child builds toward",
          },
          {
            src: "/images/products/national-geographic-glow-in-the-dark-solar-system-activity-kit/solar-system-next-to-globe.jpg",
            alt: "Completed solar system model displayed next to a globe",
            label: "On Display",
            description: "A striking bedroom display that sparks curiosity every day",
          },
          {
            src: "/images/products/national-geographic-glow-in-the-dark-solar-system-activity-kit/solar-system-on-display-complete.jpg",
            alt: "Complete solar system model on full display",
            label: "Complete",
            description:
              "The finished solar system: every planet in place, every arm positioned just right",
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
              "The kit is designed for ages 8–12. Children at the younger end of that range can work through most of the painting and assembly independently. The instructions are colourful, clear, and child-friendly. NAPPA Award evaluators specifically noted that an 8-year-old could complete the majority of the project on their own. Children aged 10 and up will manage the whole thing with no help at all.",
          },
          {
            question: "How long does it take?",
            answer:
              "Expect roughly 1–2 hours of active building and painting, which can easily be split across two sessions: one for painting, one for assembly once the paint has dried. The finished model then lives on display, so the experience doesn't really end. The glow reveal happens the first night.",
          },
          {
            question: "Will the paint stain? Is it messy?",
            answer:
              "The paints are small-volume craft paints designed for kids. Work on a covered surface and wipe hands before touching anything else. The palette is included so mixing colours stays contained. A bit of care goes a long way, and the process is no messier than any basic painting activity.",
          },
          {
            question: "Does it need batteries or an app?",
            answer:
              "No batteries, no app, no screen required. The glow-in-the-dark paint charges passively under any light source (a lamp, a window, sunlight) and then glows when the lights go off. No charging cables, no downloads, nothing extra to buy.",
          },
          {
            question: "Does my child need adult help?",
            answer:
              "Not really, and that's one of the things parents love about this kit. The instructions are clear enough for confident 8-year-olds to work through independently. A light presence for the assembly step is useful the first time, but most children aged 9 and up will want to figure it out themselves.",
          },
          {
            question: "Can the planets be rearranged after it's built?",
            answer:
              "Yes, the arms move independently, so planets can be repositioned at any time. Kids often rearrange them to match what they've read, or just experiment with different configurations. The display stays interactive long after the initial build.",
          },
          {
            question: "What will my child get out of it?",
            answer:
              "A genuine sense of the solar system: all eight planets, their colours, their order, and a few facts about each one. The building and painting process means they spend real time with each planet, not just a quick read-through. Beyond the astronomy, it builds patience, fine motor skills, and the satisfaction of finishing something they made entirely themselves.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-glow-in-the-dark-solar-system-activity-kit/whats-in-the-box.jpg"
        imageAlt="National Geographic Solar System Activity Kit contents laid out"
        background="white"
        items={[
          "3D solar system display model with independently movable arms",
          "All 8 planets (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune), unpainted",
          "The Sun, unpainted",
          "6 vibrant paint colours (6 ml each)",
          "Glow-in-the-dark accent paint (6 ml)",
          "Paintbrush",
          "Paint palette",
          "Sheet of model decals",
          "Sheet of glow-in-the-dark planet stickers",
          "Solar system poster with planet facts",
          "Learning guide with step-by-step instructions",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Build Your Own Glowing Solar System"
        subtitle="Paint every planet, flip off the lights, and watch space come to life on your shelf."
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
      "Paint all 8 planets, assemble a 3D solar system with movable arms, and watch it glow in the dark. Ages 8–12. 2025 NAPPA Award Winner.",
    alternates: {
      canonical: "/product/national-geographic-glow-in-the-dark-solar-system-activity-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
