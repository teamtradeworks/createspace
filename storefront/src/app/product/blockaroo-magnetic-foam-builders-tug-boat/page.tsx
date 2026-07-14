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

const PRODUCT_HANDLE = "blockaroo-magnetic-foam-builders-tug-boat";

export default async function BlockarooTugBoatPage() {
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
        tagline="Build a tug boat. Float it in the bath. Start something new."
        highlights={[
          "10 soft magnetic foam blocks. Build the tug boat, take it apart, start something new.",
          "Magnets always attract, never repel, connecting first try every time",
          "Bath-safe, dishwasher-safe, and mold-free. Built for water play.",
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
              "Most magnetic toys frustrate young children when pieces push each other away. Blockaroo's patented magnet design means every block connects to every other block, every time, without any flipping or fiddling. For toddlers, that reliability is everything.",
          },
          {
            icon: "refresh-cw",
            title: "Click-and-Spin in Every Direction",
            description:
              "Once two blocks connect, they rotate a full 360 degrees with a satisfying click at each position. Children naturally explore every angle, spinning and repositioning as they go, which is where spatial thinking develops.",
          },
          {
            icon: "smile",
            title: "The Perfect Bath Toy",
            description:
              "The foam blocks float in water and cling to the metal liner inside most standard bathtubs. A tug boat that actually sails: children can build on the side of the tub and send pieces across the water. Fully waterproof and mold-free, so the bath is exactly where these belong.",
          },
          {
            icon: "layers",
            title: "Grows With Your Child, and Expands",
            description:
              "The same blocks engage a 3-year-old (stacking, connecting) and a 6-year-old (complex builds and imaginary worlds). Every Blockaroo set is fully compatible, so the Tug Boat set can be combined with the Airplane, Robot, Critter, Castle, or any larger set for bigger creations.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/blockaroo-magnetic-foam-builders-tug-boat/kids-laughing-and-playing.jpg"
        imageAlt="Children laughing and playing with Blockaroo magnetic foam blocks"
        title="Ten Pieces, Endless Builds"
        body="The Tug Boat set gives children a starting point: 10 soft magnetic foam blocks that snap together and rotate 360 degrees with a satisfying click. Children build the tug boat, take it apart, and start something new. Each block connects on the first try without needing to find a correct orientation, so children play independently from the very first session, with blocks that just click together."
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
              "The Blockaroo Tug Boat set is ideal for children aged 3 to 6. From age 3, children start building deliberately and begin creating imagined scenes and stories around their tug boat: launching it across the bath, giving it a crew, building a whole harbour. The open-ended format keeps it interesting through age 6 and beyond.",
          },
          {
            question: "Is it safe for young children?",
            answer:
              "Yes. The blocks are made from soft, non-toxic foam with no sharp edges, so they're safe even for children who still mouth toys. The internal magnets are fully encased in foam and are not accessible. Blockaroo blocks exceed international toy safety standards. The soft material is also gentle if blocks are knocked or thrown, which toddlers are known to do.",
          },
          {
            question: "Can the blocks be used in the bath?",
            answer:
              "Absolutely, and the tug boat theme makes bath time even better. The foam blocks float in water and cling magnetically to the metal liner inside most standard bathtubs. Children can build on the side of the tub and float pieces across the water. The blocks are fully waterproof and mold-free, so leaving them in the bath causes no damage and there's no risk of mold building up over time.",
          },
          {
            question: "Does my child need help to get started?",
            answer:
              "No. The magnetic system is specifically designed for independent play. The blocks connect on the first try without needing to find a correct orientation, so children can build on their own without adult help. Many parents find that the Blockaroo keeps kids occupied independently for much longer than expected.",
          },
          {
            question: "How do I clean them?",
            answer:
              "Pop them in the top rack of the dishwasher. The blocks come out clean and completely undamaged by the wash cycle. Just make sure they go on the top rack to avoid high heat. For a quick rinse, they can also just be washed under the tap. The mold-free construction means even regular bath play won't cause hygiene problems.",
          },
          {
            question: "Can we add more Blockaroo pieces later?",
            answer:
              "Yes, every Blockaroo set is 100% compatible with every other. The 10-piece Tug Boat set can be combined with the Airplane set, Robot set, Critter set, Castle set, or any of the larger 50-piece or 100-piece sets to create bigger and more complex builds. It's a great reason to expand the collection one set at a time as birthdays and holidays come around.",
          },
          {
            question: "What will my child actually get out of these?",
            answer:
              "Mostly, a lot of building and rebuilding, and that's genuinely valuable. Block play is one of the most research-supported activities in early childhood development: children develop spatial awareness, shape and colour recognition, fine motor control, and early mathematical thinking through the simple act of figuring out how pieces fit together. The independence and confidence that come from building something on their own are harder to measure but just as real.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/blockaroo-magnetic-foam-builders-tug-boat/whats-in-the-box.jpg"
        imageAlt="Blockaroo Magnetic Foam Builders Tug Boat set contents laid out"
        background="white"
        items={[
          "10 soft magnetic foam building blocks (assorted 3D shapes and colours)",
          "Idea book with building inspiration",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Set Sail"
        subtitle="10 magnetic foam blocks, one tug boat, and endless builds from there."
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
      "10 soft magnetic foam blocks that always connect, never repel. Build a tug boat, then build anything. Bath-safe and dishwasher-safe. Ages 3 - 6 years.",
    alternates: {
      canonical: "/product/blockaroo-magnetic-foam-builders-tug-boat",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
