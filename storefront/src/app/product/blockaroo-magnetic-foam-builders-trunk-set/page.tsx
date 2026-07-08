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

const PRODUCT_HANDLE = "blockaroo-magnetic-foam-builders-trunk-set";

export default async function BlockarooTrunkSetPage() {
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
        tagline="50 soft magnetic foam blocks — build anything, anywhere, even the bath."
        highlights={[
          "50 blocks in a variety of 3D shapes and colours",
          "Magnets always attract, never repel — connects every time, first try",
          "Storage trunk included — all 50 pieces organised and ready to go",
          "Bath-safe, dishwasher-safe, and mold-free — ages 3 - 6 years",
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
      <ImageTextBlock
        image="/images/products/blockaroo-magnetic-foam-builders-trunk-set/kids-laughing-and-playing.jpg"
        imageAlt="Children laughing and playing together with Blockaroo magnetic foam blocks"
        title="50 Pieces. Build Together."
        body="Enough blocks for robots, castles, trucks, animals, whole scenes — then pull it apart and start again. The Trunk Set is large enough for two children to build at the same time, making it as much a social toy as a solo one. The soft foam floats in water too, so the fun carries straight into bath time. Everything fits back in the trunk when play is done."
        layout="image-left"
        background="gray"
      />

      {/* white */}
      <FeatureGrid
        title="What Makes the Blockaroo Special"
        columns={2}
        background="white"
        features={[
          {
            icon: "sparkles",
            title: "Always Attract, Never Repel",
            description:
              "Most magnetic toys frustrate young children when pieces push each other away. Blockaroo's patented magnet design means every block connects to every other block, every time — no fiddling, no flipping, no frustration. That reliability makes a real difference for 3 and 4-year-olds who are just finding their building confidence.",
          },
          {
            icon: "refresh-cw",
            title: "Click-and-Spin 360°",
            description:
              "Once connected, blocks rotate a full 360 degrees with a satisfying click at each position. Children naturally spin, reposition, and reconfigure — exploring every angle of their build. That physical tinkering is where spatial thinking quietly develops, one click at a time.",
          },
          {
            icon: "smile",
            title: "Bath-Safe and Dishwasher-Safe",
            description:
              "The soft foam floats in water and clings to the metal liner in most bathtubs. Every block is 100% dishwasher-safe and mold-free, so cleaning up is no effort at all. Pop them in the top rack and they come out ready for the next session.",
          },
          {
            icon: "building-blocks",
            title: "50 Pieces, Infinite Combinations",
            description:
              "The Trunk Set is the biggest single Blockaroo set for home use — enough shapes and sizes to build complex, multi-story structures and entire scenes. Every block is also fully compatible with all other Blockaroo sets, so the collection can grow over birthdays and holidays.",
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
              "The Trunk Set is designed for children from age 3. At 3, children start building with intention and making up stories around their creations. The open-ended format keeps it genuinely interesting well into the primary school years — a 6-year-old with 50 pieces and an imagination has a lot of building to do.",
          },
          {
            question: "Is it safe for young children?",
            answer:
              "Yes. The blocks are made from soft, non-toxic foam with no sharp edges — safe even for children who still mouth toys. The internal magnets are fully encased in foam and not accessible. Blockaroo blocks are safety tested to exceed international toy standards.",
          },
          {
            question: "Can more than one child play at the same time?",
            answer:
              "Absolutely — that's one of the best things about a 50-piece set. There are enough blocks for two children to build their own structures simultaneously, or to work together on a single large build. The blocks are designed to encourage collaborative play, and children naturally start negotiating, sharing, and planning together.",
          },
          {
            question: "Can the blocks be used in the bath?",
            answer:
              "Yes — the foam blocks float in water and cling magnetically to the metal liner inside most standard bathtubs. Children can build on the side of the tub, float pieces across the surface, and generally turn bath time into building time. The blocks are fully waterproof and mold-free — leaving them wet causes no damage.",
          },
          {
            question: "How do I clean them?",
            answer:
              "Top rack of the dishwasher. The blocks come out clean and completely undamaged by the wash cycle. For a quick rinse between sessions, a tap works fine too.",
          },
          {
            question: "What does the storage trunk do?",
            answer:
              "The trunk holds all 50 pieces securely with a lid. It makes cleanup a single step — children can collect the blocks and place them in the trunk themselves, which is a great independence habit to build. The trunk is also compact enough to take to a friend's house, on holiday, or to a classroom.",
          },
          {
            question: "Can we add more Blockaroo pieces later?",
            answer:
              "Yes — every Blockaroo set is 100% compatible with every other. The Trunk Set can be combined with the Robot, Airplane, Critter, Castle, or the 100-piece set for even larger builds. It's a great reason to keep expanding the collection one set at a time.",
          },
          {
            question: "What will my child actually get out of these?",
            answer:
              "Mostly: a lot of building, rebuilding, and playing. Block play is one of the most research-backed activities in early childhood development — children develop spatial awareness, shape and colour recognition, fine motor control, and early maths thinking through the simple act of figuring out how pieces fit together. The independence and confidence that come from building something on their own are harder to measure, but just as real.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/blockaroo-magnetic-foam-builders-trunk-set/whats-in-the-box.jpg"
        imageAlt="Blockaroo Trunk Set contents — 50 magnetic foam blocks, idea book, and storage trunk"
        background="white"
        items={[
          "50 soft magnetic foam building blocks (assorted 3D shapes and colours — cylinders, cones, cubes, domes, triangles, elbows, and more)",
          "Idea book with building inspiration and activity suggestions",
          "Storage trunk with lid",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="50 Pieces. Endless Builds."
        subtitle="No batteries. No app. No setup. Just blocks that always click."
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
      "50 soft magnetic foam blocks that always connect, never repel. Comes with a storage trunk and idea book. Bath-safe and dishwasher-safe. Ages 3 - 6 years.",
    alternates: {
      canonical: "/product/blockaroo-magnetic-foam-builders-trunk-set",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
