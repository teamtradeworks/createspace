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

const PRODUCT_HANDLE = "blockaroo-magnetic-foam-builders-robot";

export default async function BlockarooRobotPage() {
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
        tagline="Soft blocks that click together like magic — build your robot, then build anything."
        highlights={[
          "10 soft magnetic foam blocks — build the robot, take it apart, start again",
          "Magnets always attract, never repel — connects first try, every time",
          "Bath-safe, dishwasher-safe, and mold-free — plays everywhere, cleans easily",
          "Ages 3 - 6 years",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=M0jBamLCpJo"
        title="See It in Action"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes the Blockaroo Special"
        columns={2}
        background="gray"
        features={[
          {
            icon: "sparkles",
            title: "Always Attract, Never Repel",
            description:
              "Most magnetic toys frustrate young children when pieces push each other away. Blockaroo's patented magnet design means every block connects to every other block, every time — no fiddling, no flipping, no frustration. For toddlers, that reliability is everything.",
          },
          {
            icon: "refresh-cw",
            title: "Click-and-Spin in Every Direction",
            description:
              "Once two blocks connect, they rotate a full 360 degrees with a satisfying click at each position. Children naturally explore every angle — spinning, repositioning, building taller or wider — which is where the spatial thinking really happens.",
          },
          {
            icon: "smile",
            title: "Plays Anywhere, Including the Bath",
            description:
              "The soft foam floats in water and clings to the metal liner in most bathtubs. Bath time, bedroom floor, or the kitchen table — the Blockaroo goes everywhere. And because every block is dishwasher-safe and mold-free, cleaning up is genuinely no effort.",
          },
          {
            icon: "layers",
            title: "Grows With Your Child — and Expands",
            description:
              "The same blocks keep a 3-year-old busy with simple builds and a 6-year-old absorbed in imagined scenes and characters. Every Blockaroo set is fully compatible, so the Robot set can be combined with the Critter, Airplane, Castle, or any larger set for bigger creations.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/blockaroo-magnetic-foam-builders-robot/kids-laughing-and-playing.jpg"
        imageAlt="Children laughing and playing together with Blockaroo magnetic foam blocks"
        title="There's Something About That Click"
        body="Building with the Blockaroo Robot set gives young children something immediate — the audible, tactile click as two foam pieces lock together. The soft foam is safe and easy to handle, the magnetic system works first time every time, and the 360-degree rotation invites children aged 3 to 6 to explore every angle of their build. It's the kind of toy that quietly holds attention for far longer than expected."
        layout="image-left"
        background="white"
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/blockaroo-magnetic-foam-builders-robot/child-in-the-bath-with-blocks-laughing.jpg"
        imageAlt="Child laughing and playing with Blockaroo magnetic foam blocks in the bath"
        title="A Building Toy That Goes in the Bath"
        body="Blockaroo blocks float in water and cling to the metal liner inside most bathtubs. Bath time becomes building time — children can stack pieces on the side of the tub, float them across the water, and pull them apart to start something new. Blockaroo blocks are completely waterproof, dishwasher-safe, and mold-free."
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
              "The Blockaroo Robot set is designed for children aged 3 to 6. At 3 to 4 years, children love connecting and clicking the blocks together, building simple structures and exploring what they can make. From age 5, builds become more deliberate — imagined characters, scenes, and stories emerge. The open-ended format keeps it engaging all the way to age 6 and beyond.",
          },
          {
            question: "Is it safe for young children?",
            answer:
              "Yes. The blocks are made from soft, non-toxic foam with no sharp edges — safe even for children who still mouth toys. The internal magnets are fully encased in foam and are not accessible. Blockaroo blocks are safety tested to exceed international toy standards. The soft material is also gentle if blocks are knocked or thrown, which toddlers are known to do.",
          },
          {
            question: "Does my child need help to get started?",
            answer:
              "No. The magnetic system is specifically designed for independent play — blocks connect on the first try without needing to find a correct orientation, so children aged 3 and up can build on their own without adult help. Many parents report their child playing independently for extended periods — it's that self-contained.",
          },
          {
            question: "Can the blocks be used in the bath?",
            answer:
              "Absolutely — that's one of the things that makes Blockaroo genuinely different. The foam blocks float in water and cling magnetically to the metal liner inside most standard bathtubs. Children can build on the side of the tub and float pieces across the water. The blocks are fully waterproof and mold-free, so leaving them in the bath causes no damage.",
          },
          {
            question: "How do I clean them?",
            answer:
              "Pop them in the top rack of the dishwasher. The blocks come out clean and are completely undamaged by the wash cycle — just make sure they go on the top rack to avoid high heat. For a quick rinse, they can also just be washed under the tap.",
          },
          {
            question: "Can we add more Blockaroo pieces later?",
            answer:
              "Yes — every Blockaroo set is 100% compatible with every other. The 10-piece Robot set can be combined with the Critter set, Airplane set, Castle set, or any of the larger 50-piece or 100-piece sets to create bigger and more complex builds. It's a great reason to expand the collection one set at a time as birthdays and holidays come around.",
          },
          {
            question: "What will my child actually get out of these?",
            answer:
              "Mostly, a lot of building and rebuilding — and that's genuinely valuable. Block play is one of the most research-supported activities in early childhood development: children develop spatial awareness, shape and colour recognition, fine motor control, and early mathematical thinking through the simple act of figuring out how pieces fit together. The independence and confidence that come from building something on their own are harder to measure but just as real.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/blockaroo-magnetic-foam-builders-robot/whats-in-the-box.jpg"
        imageAlt="Blockaroo Magnetic Foam Builders Robot set contents — 10 soft magnetic foam blocks and idea booklet"
        background="white"
        items={[
          "10 soft magnetic foam building blocks (assorted 3D shapes and colours)",
          "Idea booklet with build inspiration",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Click It Together"
        subtitle="10 magnetic foam blocks. Endless builds. Zero batteries, zero apps, zero setup."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse More Toys"
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
      "10 soft magnetic foam blocks that always connect, never repel. Build a robot, then build anything. Bath-safe and dishwasher-safe. Ages 3 - 6 years.",
    alternates: {
      canonical: "/product/blockaroo-magnetic-foam-builders-robot",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
