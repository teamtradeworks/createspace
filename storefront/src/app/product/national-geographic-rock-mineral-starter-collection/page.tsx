import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  FeatureGrid,
  ProjectShowcase,
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-rock-mineral-starter-collection";

export default async function NatGeoRockMineralStarterCollectionPage() {
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
        tagline="Ten real specimens from around the world, hold Earth's history in your hands."
        highlights={[
          "10 authentic rocks, gemstones, and crystals, including pyrite (fool's gold), tiger's eye, and rose quartz",
          "Ages 8+",
          "Acrylic display case with a separate compartment for every specimen",
          "Full-colour learning guide and magnifying glass included",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <FeatureGrid
        title="What Makes This Collection Special"
        columns={2}
        background="white"
        features={[
          {
            icon: "globe",
            title: "Real Specimens, Not Replicas",
            description:
              "Every piece in this collection is a genuine rock, gemstone, or crystal, not a model or a cast. Children are holding the actual thing: volcanic glass formed from cooling lava, iron minerals that ancient civilisations used as pigment, crystals that took thousands of years to grow.",
          },
          {
            icon: "sparkles",
            title: "There Is Always a Wow Moment",
            description:
              "Pyrite glitters like real gold. Tiger's eye shimmers as you rotate it under the light. A geode hides a sparkling crystal interior beneath a plain outer shell. Green fluorite shows multiple shades in a single piece. Every specimen has something that makes a child stop and say: wait, how does that work?",
          },
          {
            icon: "refresh",
            title: "A Collection That Lasts Forever",
            description:
              "No consumables, no batteries, nothing to replace. Once these specimens are in the display case, they stay, growing in interest as children learn more about each one. Many children add outdoor finds alongside them and keep the collection for years.",
          },
          {
            icon: "eye",
            title: "Organised, Displayed, and Shown Off",
            description:
              "The sealed acrylic case keeps every specimen in its own compartment and lets you see all 10 at once. It sits on a shelf, on a desk, or on a windowsill, part display, part conversation starter, and something a child can genuinely call their own.",
          },
        ]}
      />

      {/* gray */}
      <ProjectShowcase
        title="Meet the Collection"
        highlight="10 incredible specimens from around the world"
        subtitle="Each one tells a different story about how the Earth works. Here are a few highlights."
        columns={3}
        background="gray"
        projects={[
          {
            name: "Pyrite, Fool's Gold",
            description:
              "Cubic crystals with a metallic gold shine that has fooled people for centuries. Compare it to descriptions of real gold and see if you can spot the difference.",
            concepts: "Mineral identification, crystal systems",
          },
          {
            name: "Tiger's Eye",
            description:
              "Slowly rotate this gemstone under a light and watch a silky golden shimmer move across the surface, an optical effect caused by fibrous mineral inclusions inside the stone.",
            concepts: "Optical mineralogy, light reflection",
          },
          {
            name: "Rose Quartz",
            description:
              "One of the most recognisable crystals in the world, a soft pink variety of quartz coloured by trace minerals. Hold it up to a light to see its gentle translucency.",
            concepts: "Quartz varieties, crystal formation",
          },
          {
            name: "Geode",
            description:
              "A hollow rock lined with crystals on the inside, what looks plain on the outside hides a sparkling interior. A perfect introduction to how crystals grow in nature.",
            concepts: "Crystal growth, geological cavities",
          },
          {
            name: "Pumice",
            description:
              "Drop it in water and watch it float, it's the only rock that does. Formed from lava packed with trapped gas bubbles, it's so porous it's lighter than water even after it solidifies.",
            concepts: "Volcanic rocks, density, porosity",
          },
          {
            name: "Green Fluorite",
            description:
              "Often banded with multiple shades of green in a single piece. One of the most visually striking specimens in the collection, and a classic for studying crystal structure and cleavage.",
            concepts: "Crystal structure, cleavage, colour in minerals",
          },
        ]}
        moreText="Plus Agate, Blue Calcite, Dalmatian Jasper, and Desert Rose!"
      />

      {/* white */}
      <CustomerShowcase
        title="The Collection Up Close"
        subtitle="Real specimens, real colours, straight out of the box."
        background="white"
        images={[
          {
            src: "/images/products/national-geographic-rock-mineral-starter-collection/box-open-with-identification-sheet-and-case.jpeg",
            alt: "National Geographic Rock and Mineral Starter Collection box opened, showing the identification sheet and acrylic display case",
            label: "Unboxed",
            description:
              "The collection laid out, identification sheet, display case, and all 10 specimens",
          },
          {
            src: "/images/products/national-geographic-rock-mineral-starter-collection/close-up-of-box.jpeg",
            alt: "Close-up of the National Geographic Rock and Mineral Starter Collection box",
            label: "The Box",
            description: "The complete Rock and Mineral Starter Collection, ready to open",
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
              "The collection is designed for ages 8 and up. An 8-year-old can use the learning guide and magnifying glass independently. Younger children can enjoy it with a parent alongside them, the specimens are safe to handle but do have small parts, so they're not for children under 3.",
          },
          {
            question: "Are the rocks real, or are they models?",
            answer:
              "They are real. Every one of the 10 specimens is an authentic geological sample, not a cast, replica, or painted rock. The pyrite genuinely has a metallic gold shine. The tiger's eye genuinely shimmers. The geode genuinely hides crystals inside. That is what makes this collection engaging in a way that pictures simply cannot replicate.",
          },
          {
            question: "Will the specimens last? Are they fragile?",
            answer:
              "Natural rock and mineral specimens are very durable under normal handling. The display case keeps each one in its own compartment to prevent knocking and scratching. Treat them with reasonable care and they will last indefinitely, many collectors keep their first sets for decades.",
          },
          {
            question: "Is there any setup, mess, or safety concern?",
            answer:
              "No setup, no mess, no chemicals. The specimens come ready to place in the case. The only thing to be mindful of is the small size of some pieces, not suitable for children under 3. Otherwise, it is as straightforward as it gets: open the box, place the specimens, start exploring.",
          },
          {
            question: "Does my child need any help getting started?",
            answer:
              "Not really. The full-colour learning guide explains each specimen clearly enough for a child to work through independently. The magnifying glass is all the equipment needed. Many children start identifying specimens on their own within minutes of opening the box.",
          },
          {
            question: "Can the collection be expanded?",
            answer:
              "Yes, in two ways. The display case can accommodate informal additions as children find interesting rocks outdoors. And National Geographic produces a wide range of geology and earth science products (larger rock collections, geode kits, fossil sets, rock tumblers) that pair naturally with this starter collection as a next step.",
          },
          {
            question: "What will my child actually get out of this?",
            answer:
              "Mostly, a genuine fascination with the natural world. Children who spend time with a rock collection start noticing stones on hikes, asking questions about mountains and volcanoes, and using vocabulary, crystal, obsidian, volcanic, lustre, that comes from direct experience rather than a classroom. The satisfaction of identifying a real specimen from its properties is a different kind of confidence-building than any screen-based activity.",
          },
        ]}
      />

      {/* gray */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-rock-mineral-starter-collection/back-of-the-box.jpg"
        imageAlt="Back of the National Geographic Rock and Mineral Starter Collection box showing the included specimens"
        background="gray"
        items={[
          "10 authentic rock and mineral specimens: Tiger's Eye, Geode, Pyrite, Rose Quartz, Blue Calcite, Dalmatian Jasper, Green Fluorite, Desert Rose, Agate, and Pumice",
          "Magnifying glass for detailed specimen inspection",
          "Full-colour learning and identification guide",
          "Acrylic display case with individual compartment for each specimen",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Start the Collection"
        subtitle="15 real specimens. A magnifying glass. A guide to identify them all. Everything they need to begin exploring geology."
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
      "10 real rocks, gemstones, and crystals from around the world, including pyrite, tiger's eye, rose quartz, and green fluorite. Includes display case, magnifying glass, and learning guide. Ages 8+.",
    alternates: {
      canonical: "/product/national-geographic-rock-mineral-starter-collection",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
