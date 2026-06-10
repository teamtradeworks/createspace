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

const PRODUCT_HANDLE = "blockaroo-magnetic-foam-builders-airplane";

export default async function BlockarooAirplanePage() {
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
        tagline="Soft blocks that click together like magic — build the airplane, then build anything."
        highlights={[
          "10 soft magnetic foam blocks — build the airplane, take it apart, start again",
          "Magnets always attract, never repel — connects first try, every time",
          "Bath-safe, dishwasher-safe, and mold-free — cleans easily",
          "Ages 3+",
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
              "Once two blocks connect, they rotate a full 360 degrees with a satisfying click at each position. Children naturally explore every angle — spinning, repositioning, building taller or wider — which is where spatial thinking really happens.",
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
              "The same blocks engage an 18-month-old (stacking, connecting) and a 6-year-old (complex builds and imaginary worlds). Every Blockaroo set is fully compatible, so the Airplane set can be combined with the Robot, Critter, Castle, or any larger set for bigger creations.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/blockaroo-magnetic-foam-builders-airplane/young-boy-playing-with-blocks.jpg"
        imageAlt="Young boy playing and building with Blockaroo magnetic foam blocks"
        title="There's Something About That Click"
        body="Building with the Blockaroo Airplane set gives toddlers and young children something immediate — the audible, tactile click as two foam pieces lock together. The soft foam is safe in small hands from age 3, the magnetic system works first time every time, and the 360-degree rotation invites children to explore every angle of their build. It's the kind of toy that quietly holds attention for far longer than expected."
        layout="image-left"
        background="white"
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
              "The Blockaroo Airplane set is designed for children from age 3 and up. From age 3, children start building deliberately and begin creating imagined scenes and stories around their airplane. The open-ended format keeps it interesting well into the primary school years.",
          },
          {
            question: "Is it safe for young children?",
            answer:
              "Yes. The blocks are made from soft, non-toxic foam with no sharp edges — safe even for children who still mouth toys. The internal magnets are fully encased in foam and are not accessible. Blockaroo blocks are safety tested to exceed international toy standards. The soft material is also gentle if blocks are knocked or thrown, which toddlers are known to do.",
          },
          {
            question: "Does my child need help to get started?",
            answer:
              "No. The magnetic system is specifically designed for independent play from age 3. The blocks connect on the first try without needing to find a correct orientation, so young children can build on their own without adult help. Many parents report their child playing independently for extended periods — it's that self-contained.",
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
              "Yes — every Blockaroo set is 100% compatible with every other. The 10-piece Airplane set can be combined with the Robot set, Critter set, Castle set, or any of the larger 50-piece or 100-piece sets to create bigger and more complex builds. It's a great reason to expand the collection one set at a time as birthdays and holidays come around.",
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
        image="/images/products/blockaroo-magnetic-foam-builders-airplane/whats-in-the-box.jpg"
        imageAlt="Blockaroo Magnetic Foam Builders Airplane set contents — 10 soft magnetic foam blocks"
        background="white"
        items={[
          "10 soft magnetic foam building blocks (assorted 3D shapes and colours)",
          "Instruction and inspiration guide",
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
      "10 soft magnetic foam blocks that always connect, never repel. Build an airplane, then build anything. Bath-safe and dishwasher-safe. Ages 3+.",
    alternates: {
      canonical: "/product/blockaroo-magnetic-foam-builders-airplane",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
