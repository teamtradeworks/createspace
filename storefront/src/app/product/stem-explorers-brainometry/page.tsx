import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  VideoEmbed,
  ImageTextBlock,
  FeatureGrid,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "stem-explorers-brainometry";

export default async function StemExplorersBrainometryPage() {
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
        tagline="Can you solve the secrets of the shapes?"
        highlights={[
          "10 building challenges, from a flat triangle to a castle wall",
          "24 patterned pieces in 6 shapes and 4 colours",
          "Ages 5 to 9 · No batteries, no screens",
          "Made for solo play, at the table or on the go",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=_gxrItB5SVY"
        title="See It in Action"
        background="white"
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/stem-explorers-brainometry/girl-building-brainometry-tower.jpg"
        imageAlt="Smiling girl adding a green piece to a tower of patterned Brainometry shapes"
        title="From a Flat Picture to a Real Build"
        body="Each card shows a flat picture. Your child works out how to turn it into something they can hold: which pieces to use, which way round they go, and what sits on top of what. They try a piece, take it off and try another until it fits. That's spatial reasoning, and it's the same thinking they'll use later in geometry and engineering."
        layout="image-left"
        background="gray"
        imageObjectPosition="50% 90%"
      />

      {/* white */}
      <FeatureGrid
        title="Solve the Secrets of the Shapes"
        columns={2}
        background="white"
        features={[
          {
            icon: "puzzle",
            title: "10 Building Challenges",
            description:
              "Each numbered card asks a question, like \"Can you build a large triangle?\" or \"Can you make an arch?\" It shows which pieces to use and whether the build should lie flat or stand up. Card 1 is a gentle start. By the last cards, your child is doing more of the working out.",
          },
          {
            icon: "blocks",
            title: "Shapes With Patterns",
            description:
              "There's an L, a T, a zigzag, a cross, a cube and a triangle in green, purple, blue and orange. Every piece has its own printed pattern too, and some challenges use it. Can you build a castle wall where no two matching patterns touch?",
          },
          {
            icon: "award",
            title: "A Toy of the Year Finalist",
            description:
              "Brainometry was a finalist for STEAM Toy of the Year at the 2022 Toy of the Year awards in the US.",
          },
          {
            icon: "lightbulb",
            title: "Then Make Up Your Own",
            description:
              "Once the cards are done, the pieces are just as much fun for free building. Houses with triangle roofs, towers, long walls. Build something and dare a brother, sister or parent to copy it.",
          },
        ]}
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/stem-explorers-brainometry/girl-reading-brainometry-challenge-card.jpg"
        imageAlt="Girl lying on the floor holding up a Brainometry challenge card, with patterned pieces scattered beside her"
        title="Quiet Play, No Screen Needed"
        body="Everything fits in one small box, with no batteries or app. It's easy to take along when you go out, and kids can play on their own, one card at a time. Each card has a clear goal, so they can tell when they've solved it."
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
            question: "What age is Brainometry best for?",
            answer:
              "It's made for ages 5 to 9. The first cards are a good fit for 5-year-olds, and the harder cards and free building keep older kids busy too. It has small parts, so it isn't suitable for children under 3.",
          },
          {
            question: "How do you play?",
            answer:
              "Choose a challenge card, gather the pieces it shows, then build the shape. Some builds lie flat on the table, like the big triangle on card 1. Others stand up, like the arch on card 2.",
          },
          {
            question: "Does my child need help?",
            answer:
              "It's made for solo play. Each card shows a picture of the pieces to use, so kids can see what they need. The question on each card is written, though, so a child who isn't reading yet may want someone to read it out.",
          },
          {
            question: "What language are the cards in?",
            answer:
              "English on one side. The other side has the same challenge in Spanish, French and German.",
          },
          {
            question: "How big are the pieces?",
            answer:
              "They're small and light. The biggest piece, the cross, is about 3.8 cm across. That makes them easy for small hands to turn and stack, and easy to pack away. Keep them in the box when you're done so none go missing.",
          },
          {
            question: "Does it need batteries or a screen?",
            answer:
              "No. There are no batteries, apps or screens. Open the box, pick a card and start building.",
          },
          {
            question: "What happens when we've finished all 10 cards?",
            answer:
              "Go back and try them faster, or use the pieces for free building. Kids can also make up their own challenges and set them for someone else.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/stem-explorers-brainometry/whats-in-the-box.jpg"
        imageAlt="STEM Explorers Brainometry box with patterned shape pieces stacked into a wall and a tower beside a challenge card"
        background="white"
        items={[
          "24 patterned 3-D shapes: an L, T, zigzag, cross, cube and triangle in each of 4 colours",
          "10 double-sided challenge cards (English on one side, Spanish, French and German on the other)",
          "Storage box",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Ready for Card One?"
        subtitle="Build the triangle, then the arch, and see how far they get."
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
      "24 patterned shapes and 10 building challenges, from a flat triangle to a castle wall. A screen-free shape puzzle for ages 5 to 9 from Learning Resources.",
    alternates: {
      canonical: "/product/stem-explorers-brainometry",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
