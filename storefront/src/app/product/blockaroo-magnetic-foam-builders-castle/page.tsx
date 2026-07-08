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

const PRODUCT_HANDLE = "blockaroo-magnetic-foam-builders-castle";

export default async function BlockarooCastlePage() {
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
        tagline="35 soft magnetic pieces. Build a castle. Build a kingdom. Build whatever comes next."
        highlights={[
          "35 soft magnetic foam pieces, towers, turrets, arches, and more",
          "Magnets always attract, never repel: connects first try, every time",
          "Bath-safe, dishwasher-safe, and mold-free: plays everywhere, cleans easily",
          "Ages 3–6",
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
        title="What Makes the Blockaroo Castle Special"
        columns={2}
        background="gray"
        features={[
          {
            icon: "sparkles",
            title: "Always Attract, Never Repel",
            description:
              "The Blockaroo's patented magnet design means every block connects to every other block, every time, no flipping, no fiddling, no frustration. For children from 18 months onwards, that reliability changes everything. The build works on the first try, and so does the next one, and the one after that.",
          },
          {
            icon: "building-blocks",
            title: "35 Pieces, Towers, Arches, Turrets and More",
            description:
              "Cylinders, cones, domes, triangles, cubes, elbows, caps, and quarter pieces: the Castle set has more shape variety than any smaller Blockaroo set. Each shape naturally suggests a different part of a castle, the cones become turrets, the domes become rooftops, the elbows become arched gateways. And once the castle is built, all 35 pieces can become something completely different.",
          },
          {
            icon: "smile",
            title: "Plays Anywhere, Including the Bath",
            description:
              "Foam blocks that float. Pieces that cling to the metal liner in most bathtubs. A building toy that goes in the dishwasher when it needs a clean. The Blockaroo works on the bedroom floor, the kitchen table, and in the bath, with no damage, no mould, and no fuss.",
          },
          {
            icon: "layers",
            title: "Every Blockaroo Set Connects to Every Other",
            description:
              "The Castle set is fully compatible with the entire Blockaroo range, the 10-piece Robot, Airplane, and Submarine sets, the Critter set, and the larger 50-piece and 100-piece sets. Mix them all together for bigger and wilder builds, or expand the collection one set at a time as birthdays and holidays come around.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/blockaroo-magnetic-foam-builders-castle/inspire-creativity.jpg"
        imageAlt="Child building imaginatively with colourful Blockaroo magnetic foam blocks"
        title="A Castle Today. Something Completely Different Tomorrow."
        body="With 35 pieces, the Blockaroo Castle set puts the building firmly in your child's hands. The included idea book shows one way to build a castle, but the shapes invite far more than that. Towers become rocket ships. Turrets become robot heads. Arches become cave entrances. No right answer, no finished state."
        layout="image-left"
        background="white"
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/blockaroo-magnetic-foam-builders-castle/kids-laughing-and-playing.jpg"
        imageAlt="Children laughing and playing together with Blockaroo magnetic foam blocks"
        title="The Click That Makes Them Come Back"
        body="Soft foam, an audible click, a satisfying 360-degree rotation, Blockaroo blocks hold attention longer than most toys manage. When two kids build together, the pieces become a shared project: deciding who holds what, figuring out what to build next, adding on to each other's ideas. And when the castle eventually comes apart, that's not the end, it's the start of the next build."
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
            question: "What age is the Castle set best for?",
            answer:
              "The Castle set is suitable from 18 months and up, though the experience changes a lot as children grow. Toddlers enjoy connecting, stacking, and feeling the foam. Children from around 3 years start building intentionally, towers, enclosures, imagined castles. Older children create more complex structures and weave narrative play around their builds. The open-ended format means the set stays interesting long after other toys have been outgrown.",
          },
          {
            question: "What can you build besides a castle?",
            answer:
              "Anything. The castle is just one idea in the included idea book, the 35 pieces lend themselves to rockets, robots, houses, imaginary creatures, or whatever your child comes up with. The variety of shapes (cylinders, domes, cones, triangles, elbows, cubes) means the same set looks completely different from one play session to the next.",
          },
          {
            question: "Is it safe for young children?",
            answer:
              "Yes. The blocks are made from soft, non-toxic EVA foam with no sharp edges, safe even for toddlers who still mouth toys. The internal magnets are fully encased in foam and are not accessible to little hands. Blockaroo blocks are safety tested to exceed international toy standards.",
          },
          {
            question: "Can the blocks be used in the bath?",
            answer:
              "Absolutely. The foam blocks float in water and cling to the metal liner inside most standard bathtubs, so children can build on the side of the tub or float pieces across the water. The blocks are fully waterproof and mold-free, leaving them in the bath causes no damage. Bath time becomes building time.",
          },
          {
            question: "How do I clean the blocks?",
            answer:
              "Pop them in the top rack of the dishwasher. They come out clean and completely undamaged by the wash cycle. For a quick rinse, they can also be washed under the tap, there's nothing inside the foam that's harmed by water.",
          },
          {
            question: "Can the Castle set be combined with other Blockaroo sets?",
            answer:
              "Yes, every Blockaroo set is 100% compatible with every other. The Castle set works seamlessly with the 10-piece Robot, Airplane, and Submarine sets, and with the larger 50-piece and 100-piece sets. Mixing sets together unlocks bigger builds and more variety in shapes and colours.",
          },
          {
            question: "What does my child actually get out of open-ended building like this?",
            answer:
              "Quite a lot, quietly. Block play is one of the most researched activities in early childhood development, it builds spatial reasoning, shape recognition, fine motor control, and the early mathematical thinking that comes from figuring out how pieces relate to each other. Beyond the cognitive side, building independently builds confidence: completing a structure, deciding it's done, and showing it to someone is a small but genuine achievement. The open-ended format also means there's no wrong answer, which takes pressure off the play entirely.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/blockaroo-magnetic-foam-builders-castle/whats-in-the-box.jpg"
        imageAlt="Blockaroo Magnetic Foam Builders Castle, 35 soft magnetic foam blocks laid out showing all shapes"
        background="white"
        items={[
          "35 soft magnetic foam building blocks (assorted 3D shapes and colours)",
          "Idea book with build inspiration",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Build the Castle. Then Build Everything Else."
        subtitle="35 magnetic foam blocks. No batteries, no apps, no setup, just building."
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
      "35 soft magnetic foam blocks that always connect, never repel. Build a castle, then build anything. Bath-safe and dishwasher-safe. Ages 3–6.",
    alternates: {
      canonical: "/product/blockaroo-magnetic-foam-builders-castle",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
