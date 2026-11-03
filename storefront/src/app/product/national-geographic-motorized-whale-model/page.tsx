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

const PRODUCT_HANDLE = "national-geographic-motorized-whale-model";

export default async function NatGeoMotorizedWhaleModelPage() {
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
        tagline="Build a wooden whale, switch it on, and watch it swim."
        highlights={[
          "32 wooden pieces that slot together with no tools and no glue",
          "A motorised, light-up base makes the finished whale swim in place",
          "8 light settings and a dimmer, so it doubles as a nightlight",
          "Ages 12+ (younger with an adult) · USB powered, no batteries needed",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=2tx55LWaqbY"
        title="Watch It Come Together"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes This Whale Special"
        columns={2}
        background="gray"
        features={[
          {
            icon: "running",
            title: "A Model That Moves",
            description:
              "Mount the finished whale on the motorised base and switch it on. It swims in place, right there on the shelf.",
          },
          {
            icon: "puzzle",
            title: "No Tools, No Glue",
            description:
              "The 32 wooden pieces slot together by following the illustrated steps. The whole build takes about one to two hours.",
          },
          {
            icon: "lightbulb",
            title: "8 Light Settings",
            description:
              "Pick one of seven colours or let the base cycle through them all. Turn the dimmer down and it becomes a nightlight.",
          },
          {
            icon: "book",
            title: "Whale Facts Included",
            description:
              "The National Geographic Learning Guide in the box is full of facts about whales, for reading before, during or after the build.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/national-geographic-motorized-whale-model/hands-fitting-whale-onto-base.jpg"
        imageAlt="Hands fitting the wooden whale model onto its motorised display base"
        title="From Flat Pieces to a Whole Whale"
        body="It starts as a few flat wooden sheets. Piece by piece, a body takes shape, then the flippers and tail go on. Clicking the finished whale onto its base is a proud moment, and switching it on for the first time is even better."
        layout="image-left"
        background="white"
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/national-geographic-motorized-whale-model/whale-model-glowing-green-on-base.jpg"
        imageAlt="The finished wooden whale model glowing green and blue on its light-up base in a dark room"
        title="A Whale That Lights Up the Room"
        body="Once it's built, the whale doesn't go back in a cupboard. Set the base to a favourite colour or let it cycle through all of them, then dim it down at bedtime and let it swim while the lights are off."
        layout="image-right"
        background="gray"
      />

      {/* white */}
      <CustomerShowcase
        title="Whales Built at Home"
        subtitle="From the first pieces out of the pack to a whale swimming in the dark."
        background="white"
        images={[
          {
            src: "/images/products/national-geographic-motorized-whale-model/pieces-laid-out.jpg",
            alt: "Wooden whale pieces, motorised base, USB cord and instructions laid out on a table",
            label: "Out of the Box",
            description: "Wooden sheets, the base, the USB cord and the instructions",
          },
          {
            src: "/images/products/national-geographic-motorized-whale-model/boy-taking-pieces-out-of-pack.jpg",
            alt: "Boy pressing wooden whale pieces out of the sheet at a table",
            label: "Getting Started",
            description: "Pressing out the pieces, with the tail already done",
          },
          {
            src: "/images/products/national-geographic-motorized-whale-model/girl-putting-pieces-together.jpg",
            alt: "Girl slotting wooden whale pieces together with the instruction sheets spread out",
            label: "Building",
            description: "Following the illustrated steps, one piece at a time",
          },
          {
            src: "/images/products/national-geographic-motorized-whale-model/whale-built-on-stand.jpg",
            alt: "Finished wooden whale model mounted on its ocean-print motorised base",
            label: "Finished Whale",
            description: "Built, mounted and ready to swim",
          },
          {
            src: "/images/products/national-geographic-motorized-whale-model/whale-built-on-stand-2.jpg",
            alt: "Finished wooden whale model on its base on a bedroom shelf",
            label: "On the Shelf",
            description: "A display piece for the bedroom",
          },
          {
            src: "/images/products/national-geographic-motorized-whale-model/whale-lit-up-in-the-dark.jpg",
            alt: "Wooden whale model lit from below by its base in a dark room",
            label: "Lights Out",
            description: "Glowing in the dark as a nightlight",
          },
        ]}
      />

      {/* gray */}
      <ProductReviews productId={product.id} background="gray" />

      {/* white */}
      <ProductFAQ
        title="Common Questions"
        background="white"
        faqs={[
          {
            question: "What age is this best for?",
            answer:
              "National Geographic recommends it for ages 12 and up. Younger kids can build it too with an adult nearby to help with the trickier steps. It's also a good pick for teens and grown-ups who like building models.",
          },
          {
            question: "Does it need batteries?",
            answer:
              "No. The base runs on USB power, and the USB cord is in the box. Plug it into a computer, a power bank or a USB wall plug. A wall plug isn't included, so have one handy if you want the whale on a bedside table.",
          },
          {
            question: "How long does it take to build?",
            answer:
              "About one to two hours. The illustrated instructions take you through each step, and you won't need any tools or glue.",
          },
          {
            question: "Can my child build it on their own?",
            answer:
              "It's designed for kids aged 12 and up to build themselves, with step-by-step pictures to follow. For younger builders, it works well as a project to do together, with your child pressing out and slotting the pieces while you check the next step.",
          },
          {
            question: "Is it safe?",
            answer:
              "The kit has small parts, so it isn't suitable for children under 3. Keep loose pieces away from little siblings while the build is in progress.",
          },
          {
            question: "What happens after it's built?",
            answer:
              "It becomes a moving display piece and a nightlight. Choose a solid colour or the colour-cycle mode, and use the dimmer to soften the light at night.",
          },
          {
            question: "What will my child get out of it?",
            answer:
              "Mostly a really satisfying build and a whale they're proud of. Along the way they're working out how flat pieces turn into a 3D animal, and the Learning Guide gives them plenty of whale facts to share. If you're near the coast during whale season, it's a great excuse to go and spot the real thing.",
          },
        ]}
      />

      {/* gray */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-motorized-whale-model/whats-in-the-box.jpg"
        imageAlt="National Geographic Motorized Whale Model kit contents: wooden piece sheets, motorised base and USB cord"
        background="gray"
        items={[
          "32 wooden pieces",
          "Light-up motorised base",
          "USB cord",
          "Decal sticker",
          "Illustrated instructions",
          "National Geographic Learning Guide (whale facts)",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Build a Whale That Swims"
        subtitle="32 wooden pieces, a light-up motorised base and an hour or two of building. No batteries, no tools, no glue."
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
      "Build a 32-piece wooden whale that swims on a motorised, light-up base. No tools or batteries needed, and it doubles as a nightlight. Ages 12+.",
    alternates: {
      canonical: "/product/national-geographic-motorized-whale-model",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
