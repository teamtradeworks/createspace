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

const PRODUCT_HANDLE = "national-geographic-junior-chemistry-lab-kit";

export default async function NatGeoJuniorChemistryPage() {
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
        tagline="Goggles on, beaker ready — hands-on chemistry experiments your child can run right now"
        highlights={[
          "25 awesome experiments: make underwater fireworks, trigger volcanic reactions, change the colour of celery",
          "20+ piece set: beakers, flasks, test tubes, measuring spoons, droppers, and more",
          "Safety goggles included — every experiment, scientist-style",
          "Ages 4 and up · National Parenting Product Awards winner 2025",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=gaxvXf-DyBs"
        title="See It in Action"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes This Kit Special"
        columns={2}
        background="gray"
        features={[
          {
            icon: "sparkles",
            title: "Experiments That Actually Wow",
            description:
              "Underwater fireworks, expanding balloons, volcanic reactions, capillary action with celery — experiments designed to surprise and delight, using household items like vinegar, baking soda, and food colouring.",
          },
          {
            icon: "tools",
            title: "Real Lab Tools for Little Hands",
            description:
              "Round-bottom flask, Erlenmeyer flask, beakers, test tube rack, funnel, measuring spoons, pipettes, magnifying glass, and safety goggles — 20+ child-safe tools built for small hands.",
          },
          {
            icon: "book",
            title: "Easy-to-Follow Illustrated Instructions",
            description:
              "Every experiment has its own fully illustrated, step-by-step spread showing exactly what to get from the kit and what to grab from home — designed so children can follow along independently.",
          },
          {
            icon: "globe",
            title: "Your Purchase Has Purpose",
            description:
              "Every purchase helps support the National Geographic Society — a global nonprofit dedicated to protecting and illuminating our world through exploration, research, and education.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/national-geographic-junior-chemistry-lab-kit/selection-of-different-experiments.jpg"
        imageAlt="Three chemistry experiments: mixing in a beaker, balloon expanding on a flask, and a foamy reaction"
        title="A Lab They Can Set Up in Minutes"
        body="Open the box, set up the tools, and your child is already in scientist mode — safety goggles on, beaker in hand. Every experiment shows exactly what to grab from the kit and what to find in the kitchen, so there's no prep work and no special shopping. The 20+ lab tools are built for small hands, and the illustrated instructions are designed so children can follow along without needing a parent to read over their shoulder. You're there to watch. They're the ones doing the science."
        layout="image-left"
        background="white"
        imageObjectPosition="0% 50%"
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
              "The kit is designed for ages 4 and up. The illustrated instructions are specifically made so that early readers and even pre-readers can follow along independently — though an adult presence is always recommended when little scientists are at work.",
          },
          {
            question: "Do I need to buy anything extra?",
            answer:
              "No special chemistry supplies are needed. Each experiment shows exactly what to collect from home — things like fresh celery, milk, liquid dish soap, water, and food colouring. The kit includes all the lab tools. Most households already have everything else.",
          },
          {
            question: "Is it messy? Will anything stain?",
            answer:
              "The experiments use household ingredients, so there's nothing dangerous or particularly staining involved. A covered work surface and a cloth nearby is all you need. Some experiments use food colouring, so it's worth covering the table for those.",
          },
          {
            question: "Can my child do the experiments on their own?",
            answer:
              "The illustrated instructions are designed so children can follow along without needing a parent to read each step aloud — each experiment clearly shows what to get from the kit and what to source from home. Adult supervision is still recommended throughout, but your child genuinely leads each experiment themselves.",
          },
          {
            question: "How long does each experiment take?",
            answer:
              "Most experiments are self-contained and take around 10–20 minutes. Some, like changing the colour of celery through capillary action, involve an observation period of a few hours. The kit works well as an afternoon activity or spread across multiple sessions.",
          },
          {
            question: "Can the experiments be repeated?",
            answer:
              "Yes. The lab tools last indefinitely, and all the consumables are easy to restock from any grocery store. Your child can repeat favourites as many times as they like.",
          },
          {
            question: "Is it safe for young children?",
            answer:
              "All experiments use household-grade ingredients only — no dangerous chemicals are included. Safety goggles are included and should be worn. The kit contains small parts and is not suitable for children under 3. Adult supervision is recommended throughout.",
          },
        ]}
      />

      {/* gray */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-junior-chemistry-lab-kit/lab-tools-whats-in-the-box.jpg"
        imageAlt="National Geographic Junior Chemistry Lab Kit — 20+ lab tools laid out including flasks, beakers, test tubes, droppers, and measuring spoons"
        background="gray"
        items={[
          "Round-bottom flask",
          "Erlenmeyer flask",
          "2 beakers (different sizes)",
          "3 test tubes with caps and rack",
          "Yellow funnel",
          "Set of coloured measuring spoons",
          "3 coloured pipette droppers",
          "Food colouring bottles",
          "Safety goggles",
          "Magnifying glass",
          "Illustrated learning guide with experiments",
          "Household items required per experiment (not included) — e.g. water, vinegar, celery, milk",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Real Experiments. Real Tools. Real Fun."
        subtitle="Everything a young scientist needs — just add things from the kitchen cupboard."
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
      "Hands-on chemistry experiments for ages 4+: underwater fireworks, volcanic reactions, capillary action and more. 20+ real lab tools and safety goggles included.",
    alternates: {
      canonical: "/product/national-geographic-junior-chemistry-lab-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
