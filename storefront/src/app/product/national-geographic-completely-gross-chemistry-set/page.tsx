import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  FeatureGrid,
  ImageTextBlock,
  ProjectShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-completely-gross-chemistry-set";

export default async function NatGeoCompletelyGrossChemistrySetPage() {
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
        tagline="10 totally gross experiments: real chemistry, real reactions, real disgusting fun"
        highlights={[
          "20 experiments total: 10 gross-themed + 10 bonus using household items",
          "Ages 8–12 · everything included · no extra shopping needed",
          "Real chemical compounds: make eyeballs, glowing worms, slime and more",
          "Illustrated guide explains the science behind every reaction",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <FeatureGrid
        title="What Makes This Kit Special"
        columns={2}
        background="white"
        features={[
          {
            icon: "sparkles",
            title: "Actually Gross. Actually Science.",
            description:
              "Every experiment has a genuine chemical explanation: polymer cross-linking, phosphorescence, acid-base reactions, non-Newtonian fluids. Kids think they're being disgusting. They're doing real chemistry.",
          },
          {
            icon: "lightbulb",
            title: "Reactions Kids Actually Remember",
            description:
              "The gross factor isn't a gimmick, it works. The emotional response to something disgusting makes the science far more memorable than a textbook exercise. First they laugh. Then they ask why it happened.",
          },
          {
            icon: "book",
            title: "The Science Behind the Slime",
            description:
              "The full-colour illustrated guide doesn't just tell you what to do. It explains why it works. After dissecting a brain-shaped gel, kids learn what agar agar is and why heat causes it to set.",
          },
          {
            icon: "refresh-cw",
            title: "20 Experiments in Total",
            description:
              "The 10 core experiments use the kit's included chemical compounds. A separate bonus guide adds 10 more using everyday household items, extending the fun well after the kit chemicals run out.",
          },
        ]}
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/national-geographic-completely-gross-chemistry-set/four-different-experiments.jpg"
        imageAlt="Four different gross chemistry experiments in progress"
        title="Real Chemicals. Real Reactions."
        body="This kit uses actual chemical compounds: sodium alginate, calcium chloride, agar agar, zinc sulfide, phenol red. When your child drops sodium alginate into calcium chloride and watches it form a wobbly eyeball, that's spherification: the same technique used by Michelin-starred chefs in molecular gastronomy. The guide teaches the name, explains the reaction, and connects it to the real world. Gross is just the gateway."
        layout="image-left"
        background="gray"
      />

      {/* white */}
      <ProjectShowcase
        title="10 Gross Experiments"
        highlight="10 completely gross chemistry experiments, all materials included"
        subtitle="Mix, measure, pour, and observe. Each experiment uses the included chemicals and equipment. No extra shopping required."
        columns={3}
        background="white"
        projects={[
          {
            name: "Vomiting Test Tube",
            description:
              "A chemical reaction sends foam erupting out of a test tube in an unmistakably vomit-like overflow.",
            concepts: "Acid-base reactions, carbon dioxide gas production",
          },
          {
            name: "Jar of Eyeballs",
            description:
              "Drop sodium alginate solution into calcium chloride and watch it skin over into wobbly, squishy eyeballs.",
            concepts: "Spherification, polymer cross-linking",
          },
          {
            name: "Dissect a Squishy Brain",
            description:
              "Mix agar agar to set a brain-shaped gel mould, then peel it out and dissect it like a real specimen.",
            concepts: "Gels and colloids, basic biology",
          },
          {
            name: "Glowing Worms & Fungus",
            description:
              "Mix zinc sulfide into an alginate solution, shape it into worms, and watch them glow green in the dark.",
            concepts: "Phosphorescence, polymer shaping",
          },
          {
            name: "Atomic Pee & Farting Slime",
            description:
              "Use the phenol red pH indicator to make colour-changing 'pee', then add bicarbonate for gas-releasing slime.",
            concepts: "pH indicators, acid-base science, gas reactions",
          },
          {
            name: "Bursting Blood Cells",
            description:
              "Use chemical reactions to simulate cell rupture in a liquid medium, complete with satisfying colour change.",
            concepts: "Cell biology, osmosis, polymer reactions",
          },
        ]}
        moreText="Plus Glorious Guts, Boiled Boogers, Goo Defying Gravity, and Bubble Goop Swamp. All 10 inside the kit!"
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
              "The kit is designed for ages 8–12. At 8–9, some children enjoy having a parent join for the first experiment or two to get started. Children 10 and up can typically work through all 10 core experiments independently. The activities are engaging enough that older siblings often want in too.",
          },
          {
            question: "Is it messy? Does anything stain?",
            answer:
              "Yes, some experiments produce slime and coloured liquids that can stain surfaces. Work on a protected or covered table. The safety goggles are included for a reason: wear them. Cleanup is straightforward with soap and water for most experiments.",
          },
          {
            question: "Are the chemicals safe?",
            answer:
              "Yes, the amounts and concentrations in this kit are selected for safe home use by children ages 8+. Adult supervision is recommended throughout. All chemical components are consumer-safe; a California Prop 65 warning appears on the packaging as is standard for chemistry sets.",
          },
          {
            question: "How long does each experiment take?",
            answer:
              "Each experiment takes approximately 20–40 minutes from setup to completion. The 10 core experiments can be spread across multiple sessions. There's no need to do them all at once.",
          },
          {
            question: "Can the experiments be repeated?",
            answer:
              "The 10 core experiments use the included chemical compounds, which are limited in quantity: once used, they're used. The 10 bonus experiments in the separate guide use common household items and can be repeated as many times as your child likes. The equipment (test tubes, beaker, moulds, goggles) is reusable.",
          },
          {
            question: "What will my child actually get out of this?",
            answer:
              "Beyond an afternoon of disgusting fun, children absorb real chemistry and biology concepts (polymers, phosphorescence, pH indicators, non-Newtonian fluids) without it feeling like a lesson. Most parents notice their child asking 'why did that happen?' after each experiment. That curiosity is the real outcome.",
          },
        ]}
      />

      {/* gray */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-completely-gross-chemistry-set/whats-in-the-box.jpg"
        imageAlt="National Geographic Completely Gross Chemistry Set contents laid out"
        background="gray"
        items={[
          "Red sodium alginate",
          "White sodium alginate",
          "Calcium chloride",
          "Citric acid",
          "Agar agar powder",
          "Sodium bicarbonate",
          "Psyllium husk powder",
          "Zinc sulfide",
          "Phenol red",
          "Green food colouring",
          "Yellow food colouring",
          "2 vials",
          "Test tube",
          "Beaker",
          "2 pipettes",
          "Brain mould",
          "Mushroom mould",
          "Paper straw",
          "2 stir sticks",
          "2 measuring scoops",
          "2 experiment cups",
          "4 resealable bags",
          "Experiment bowl",
          "Safety goggles",
          "Sticker sheet",
          "Bonus experiment guide (10 extra experiments using household items)",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Ready for Some Disgusting Fun?"
        subtitle="20 experiments, real chemical compounds, and the science behind every reaction. The grossest chemistry set your child will ever love."
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
      "20 gross chemistry experiments for ages 8–12: make eyeballs, glowing worms, slime and more with real chemical compounds. Everything included.",
    alternates: {
      canonical: "/product/national-geographic-completely-gross-chemistry-set",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
