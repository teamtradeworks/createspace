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

const PRODUCT_HANDLE = "blockaroo-magnetic-foam-builders-roadster";

export default async function BlockarooRoadsterPage() {
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
        tagline="Soft magnetic foam blocks that click together and build anything, even in the bath."
        highlights={[
          "13 chunky foam blocks. Build the roadster or invent something entirely your own.",
          "Ages 3 - 6 years, sized for young hands with no fiddly pieces",
          "Magnets always attract and never push apart, frustration-free from block one",
          "Floats in the bath and sticks to the tub. A toy for everywhere.",
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
        title="What Makes Blockaroo Different"
        columns={2}
        background="gray"
        features={[
          {
            icon: "sparkles",
            title: "Magnets That Never Push Apart",
            description:
              "Most magnetic toys have one frustrating flaw: the pieces push away from each other as often as they connect. Blockaroo's patent-pending design means every piece always attracts every other piece, in any orientation. There's no wrong way to pick up a block and try to stick it on.",
          },
          {
            icon: "touch",
            title: "A Click You Can Feel and Hear",
            description:
              "The moment two blocks connect, there's a satisfying click and a subtle snap of resistance as the magnets lock in. Then the pieces rotate freely through 360 degrees. Spin one block against another and the connection holds. It's the kind of tactile feedback that keeps little hands busy for a very long time.",
          },
          {
            icon: "refresh",
            title: "Waterproof, Dishwasher-Safe, and Mould-Free",
            description:
              "The foam is fully waterproof. Blocks float in the bath and stick to most metal-lined tubs, so kids can build on the wall while sitting in the water. When play is done, the whole set goes in the top rack of the dishwasher. The mould-free construction means repeated bath use never becomes a hygiene problem.",
          },
          {
            icon: "layers",
            title: "A Starter Set That Grows",
            description:
              "The Roadster is 13 pieces, enough to build a vehicle or free-form creation and compact enough to fit in a bag. Every Blockaroo set is cross-compatible, so if the building bug takes hold, you can add the Airplane, Robot, or Castle sets and combine them into one much bigger collection.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/blockaroo-magnetic-foam-builders-roadster/three-kids-playing-with-blockaroo.jpg"
        imageAlt="Three children playing with Blockaroo magnetic foam blocks together"
        title="The Build That Gets Better Every Time"
        body="What stands out about the Blockaroo Roadster isn't the first build. It's the tenth. The same 13 pieces keep turning up in new arrangements: a car becomes a tower, then a rocket, then whatever their imagination lands on next. The blocks come apart with a satisfying pop and click back together with just as much enthusiasm. On the floor, in the bath, sorted by colour, stacked as high as possible: the possibilities keep going."
        layout="image-left"
        background="white"
      />

      {/* gray */}
      <ProductReviews productId={product.id} background="gray" />

      {/* white (after gray ProductReviews) */}
      <ProductFAQ
        title="Common Questions"
        background="white"
        faqs={[
          {
            question: "What age is this best for?",
            answer:
              "The Roadster set is designed for children aged 3 to 6. At 3 and 4, children love connecting the pieces and discovering what they can build: vehicles, towers, anything. From age 5, builds get more deliberate and imaginative. The open-ended nature means the same set keeps feeling fresh as they grow.",
          },
          {
            question: "Can we really use these in the bath?",
            answer:
              "Yes, and it's one of the genuine standout features. The foam floats, so blocks don't sink to the bottom. And the magnetic backing means pieces stick to the metal-lined wall of most standard bathtubs, so kids can build vertically while sitting in the water. When bath time ends, rinse the blocks off or pop them in the top rack of the dishwasher. They're mould-free by design.",
          },
          {
            question: "Are the magnets safe for young children?",
            answer:
              "The magnets are embedded inside the foam and not removable during normal play. There's no exposed magnetic surface. The blocks exceed all international safety testing standards and are made from non-toxic EVA foam. As with any toy, adult supervision is recommended for children under 3, and the packaging includes a standard choking hazard notice.",
          },
          {
            question: "Does my child need help to get started?",
            answer:
              "Not much. The instruction guide shows how to build the roadster, but the blocks are intuitive enough that toddlers figure out the connecting system almost immediately. The magnet does most of the work. The first few minutes are usually picking up a block, discovering it sticks to another block, and going from there. An adult showing the guide illustration once is usually enough to kick things off.",
          },
          {
            question: "Can we add more Blockaroo pieces later?",
            answer:
              "Yes, every Blockaroo set is cross-compatible. The Roadster (13 pieces) combines seamlessly with the Airplane, Robot, Castle, and larger trunk sets. Adding another set significantly expands what can be built without doubling the complexity. The Roadster is a good starting point: compact enough to be a first set, versatile enough to stay relevant as a larger collection grows around it.",
          },
          {
            question: "How do we clean the blocks?",
            answer:
              "The easiest option is the top rack of the dishwasher. The foam and magnets are both water-safe and dishwasher-safe. For quick cleanup between uses, a damp cloth wipes them down in seconds. The mould-free foam construction means bath use doesn't create hygiene problems over time.",
          },
        ]}
      />

      {/* gray */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/blockaroo-magnetic-foam-builders-roadster/whats-in-the-box.jpg"
        imageAlt="Blockaroo Roadster set contents: 13 magnetic foam blocks and inspiration guide"
        background="gray"
        items={[
          "13 soft foam magnetic building blocks (vehicle-themed shapes including wheels and body panels)",
          "Instruction / inspiration guide",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Ready to Build?"
        subtitle="13 pieces for ages 3 - 6 years. Take them anywhere."
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
      "13 soft magnetic foam blocks for ages 3 - 6 years. Waterproof, dishwasher-safe, and mould-free. Magnets always attract, never repel, for frustration-free building.",
    alternates: {
      canonical: "/product/blockaroo-magnetic-foam-builders-roadster",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
