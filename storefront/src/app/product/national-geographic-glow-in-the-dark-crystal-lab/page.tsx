import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  FeatureGrid,
  ImageTextBlock,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-glow-in-the-dark-crystal-lab";

export default async function NatGeoGlowCrystalLabPage() {
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
        tagline="Grow an awesome glowing crystal — ready to display in just a few days"
        highlights={[
          "Crystal grows in as little as 3 days",
          "Real fluorite specimen included",
          "Full-colour adventure guide + 10 games, puzzles & challenges",
          "Ages 8 and up",
        ]}
        addons={addons}
      />

      <QuickInfoBadges product={product} />

      <FeatureGrid
        title="What Makes This Kit Special"
        columns={3}
        background="gray"
        features={[
          {
            icon: "sparkles",
            title: "Glow-in-the-Dark Seed Rock",
            description:
              "Seed rock is glow-in-the-dark element. You'll get about 1 minute of bright glow with a good charge from the sun or a strong lamp.",
          },
          {
            icon: "clock",
            title: "Crystal Grows in as Little as 3 Days",
            description:
              "Mix the crystal growing powder into water, add your seed rock, and watch your glow-in-the-dark crystal grow before your eyes!",
          },
          {
            icon: "eye",
            title: "Inspect Every Detail",
            description:
              "The included magnifying glass lets your child observe crystal structure up close as it develops — tiny formations visible day by day.",
          },
          {
            icon: "star",
            title: "Real Fluorite Specimen",
            description:
              "A genuine fluorite crystal to compare to the crystals you grow and to add to your rock collection.",
          },
          {
            icon: "book",
            title: "Full-Colour Learning Guide",
            description:
              "The full-color learning guide has fascinating insight into the science of crystal growth.",
          },
          {
            icon: "puzzle",
            title: "10 Games, Puzzles & Challenges",
            description:
              "The activity booklet extends the fun beyond the experiment with 10 games, mazes, and challenges covering crystals and geology.",
          },
        ]}
      />

      <ImageTextBlock
        image="/images/products/national-geographic-glow-in-the-dark-crystal-lab/boy-looking-at-glowing-crystal-in-the-dark.jpg"
        imageAlt="Boy looking at a glowing crystal in the dark"
        title="The Moment the Lights Go Out"
        body="Grow an awesome glowing crystal with the National Geographic Glow-in-the-Dark Crystal Lab! Easy-to-follow instructions lead you through the crystal growing process, and in as little as 3 days your crystal will be ready for display. Show off your crystal on the included display stand and learn more about crystals in the full-color learning guide. You'll even receive a genuine fluorite crystal specimen. There's no better way to inspire a lifelong love of science and geology!"
        layout="image-left"
        background="white"
        imageObjectPosition="50% 100%"
      />

      <ProductFAQ
        title="Common Questions"
        background="gray"
        faqs={[
          {
            question: "What age is this kit best for?",
            answer:
              "The kit is recommended for ages 8 and up. Younger children can enjoy it too, but should have an adult closely involved throughout — particularly for the boiling water step.",
          },
          {
            question: "Does my child need adult help to set it up?",
            answer:
              "An adult is needed for the initial mixing step, which requires boiling water. You'll also need a standard glass or jar (not included). After mixing, your child places the crystal solution in a safe spot and observes it daily — it's very much a kid-led activity once it's set up.",
          },
          {
            question: "Is it messy? Will the powder stain?",
            answer:
              "The setup is fairly tidy — the crystal powder mixes into water and is unlikely to stain if handled carefully. We recommend doing the initial mixing over a sink. Once the crystals have grown, they're solid and sit cleanly on the display stand.",
          },
          {
            question: "What exactly glows in the dark?",
            answer:
              "Seed rock is glow-in-the-dark element. You'll get about 1 minute of bright glow with a good charge from the sun or a strong lamp.",
          },
          {
            question: "How long does the experiment take?",
            answer:
              "The initial setup takes around 10–15 minutes. After that, crystals form gradually over 3–4 days while your child checks in daily. Once grown, the crystals are a permanent display piece — the waiting and watching is all part of the experience.",
          },
          {
            question: "Can the experiment be done again?",
            answer:
              "The crystal-growing powder is used in one batch, so the main growing experiment is single-use. The seed rock, magnifying glass, display stand, and fluorite specimen are permanent keepsakes. If your child wants to grow more, National Geographic makes larger crystal kits — including a Jumbo Crystal Growing Kit for much bigger results.",
          },
          {
            question: "Is it safe?",
            answer:
              "Yes — the crystal powder is safe when used as directed and the fluorite specimen is a genuine natural mineral. Small parts mean the kit is not suitable for children under 3. Adult supervision is required for the boiling water step.",
          },
        ]}
      />

      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-glow-in-the-dark-crystal-lab/whats-in-the-box.jpg"
        imageAlt="National Geographic Glow-in-the-Dark Crystal Lab contents laid out"
        background="white"
        items={[
          "Glow-in-the-dark seed rock",
          "Crystal growing powder",
          "Wooden spoon",
          "Magnifying glass",
          "Genuine fluorite crystal specimen",
          "Display stand",
          "Full-colour adventure learning guide",
          "Activity booklet with 10 games, puzzles & challenges",
        ]}
      />

      <ProductReviews productId={product.id} background="gray" />

      <CallToAction
        title="Ready to Watch Crystals Come to Life?"
        subtitle="There's no better way to inspire a lifelong love of science and geology!"
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
      "Grow your own glow-in-the-dark crystals in just a few days. Includes a real fluorite specimen, magnifying glass, and National Geographic adventure guide. Ages 8+.",
    alternates: {
      canonical: "/product/national-geographic-glow-in-the-dark-crystal-lab",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
