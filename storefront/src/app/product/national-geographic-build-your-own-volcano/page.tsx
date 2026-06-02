import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  FeatureGrid,
  ImageTextBlock,
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-build-your-own-volcano";

export default async function NatGeoVolcanoPage() {
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
        tagline="Cast it, paint it, then make it erupt"
        highlights={[
          "A three-stage project: cast it, paint it, erupt it",
          "Real chemical reaction — actual fizzing, bubbling lava",
          "Includes 2 genuine volcanic rock specimens to keep",
          "Ages 8 and up — no batteries, no screen time",
        ]}
        addons={addons}
      />

      <QuickInfoBadges product={product} />

      <FeatureGrid
        title="What Makes This Kit Special"
        columns={3}
        background="white"
        features={[
          {
            icon: "sparkles",
            title: "A Real Eruption",
            description:
              "The included eruption powders create a bubbling, flowing eruption — enough powder is included for multiple goes.",
          },
          {
            icon: "refresh",
            title: "Erupt It Again and Again",
            description:
              "The volcano model is reusable. Once the kit powders run out, keep going with household vinegar and baking soda — there's no limit to the eruptions.",
          },
          {
            icon: "star",
            title: "Two Real Volcanic Specimens",
            description:
              "A genuine piece of pumice and a geode fragment come in the box — not replicas. Examine them, compare them against the guide, and start a rock collection.",
          },
          {
            icon: "book",
            title: "Full-Colour Learning Guide",
            description:
              "The included booklet covers plate tectonics, the Ring of Fire, types of volcanoes, volcanic winter, geothermal energy, and the science of amazing rocks.",
          },
          {
            icon: "palette",
            title: "Paint It Your Way",
            description:
              "Paints and a paintbrush are included to decorate the dried volcano however your child imagines it — realistic, wild, or somewhere in between.",
          },
          {
            icon: "time",
            title: "A Project That Spans Days",
            description:
              "Cast the plaster, wait for it to set, decorate it, then erupt it. The patience and build-up make that first eruption genuinely exciting.",
          },
        ]}
      />

      <ImageTextBlock
        image="/images/products/national-geographic-build-your-own-volcano/3-kids-boy-puring-liquid-into-bubbling-volcano.jpg"
        imageAlt="Three children watching their volcano erupt with fizzing lava"
        title="The Payoff Is Worth the Wait"
        body="This is not a one-afternoon kit. Your child mixes plaster, fills the mould, and waits for the volcano to set — a day of anticipation before they even pick up a paintbrush. Then comes decorating: their volcano, their colours. And then, finally, the moment they've been building toward: mix the powders, add the water, and watch real chemistry happen right in front of them. That sequence — the patience, the creativity, the payoff — is what makes this more than just a science experiment."
        layout="image-left"
        background="gray"
        imageObjectPosition="50% 75%"
      />

      <CustomerShowcase
        title="Builders, Painters, Scientists"
        subtitle="See what kids are making with the National Geographic Volcano Kit"
        background="white"
        images={[
          {
            src: "/images/products/national-geographic-build-your-own-volcano/boy-stirring-volcano-mix.jpg",
            alt: "Boy stirring volcano plaster mix",
            label: "Mixing Day",
            description: "Mixing the plaster — the first step of the build.",
          },
          {
            src: "/images/products/national-geographic-build-your-own-volcano/child-painting-volcano-with-box-in-front.jpg",
            alt: "Child painting their volcano with the kit box in front",
            label: "Painting Time",
            description: "Decorating the dried volcano with the included paints.",
          },
          {
            src: "/images/products/national-geographic-build-your-own-volcano/girl-painting-volcano.jpg",
            alt: "Girl carefully painting her volcano",
            label: "Their Volcano",
            description: "Every volcano looks a little different — painted their own way.",
          },
        ]}
      />

      <ProductReviews productId={product.id} background="gray" />

      <ProductFAQ
        title="Common Questions"
        background="white"
        faqs={[
          {
            question: "What age is this kit best for?",
            answer:
              "The kit is recommended for ages 8 and up. The plaster mixing and chemical powders mean younger children should have a grown-up closely involved throughout. Kids around 8–11 will find it most rewarding with a bit of help — older children can tackle most of it independently.",
          },
          {
            question: "How long does the whole project take?",
            answer:
              "The project unfolds over a couple of days. After casting the plaster you'll need to let it set fully before moving on to painting, and the paint needs to dry before the eruption. That build-up is part of what makes the final eruption so satisfying.",
          },
          {
            question: "Is it messy? Will it stain?",
            answer:
              "Plaster can be messy during the casting step — cover your work surface before you start. The eruption powders are unlikely to stain if handled carefully. We recommend doing the eruption somewhere easy to wipe down.",
          },
          {
            question: "Does my child need adult help?",
            answer:
              "Adult supervision is recommended throughout, particularly for the plaster mixing and eruption steps. The kit is designed with advice for supervising adults to ensure a fun and positive experience.",
          },
          {
            question: "Can they erupt it more than once?",
            answer:
              "Yes — the volcano model is built to last and can be erupted repeatedly. The included powders are good for multiple eruptions. Once they're used up, household baking soda and vinegar work just as well, so the fun doesn't stop when the kit runs out.",
          },
          {
            question: "Is it safe?",
            answer:
              "The kit contains chemicals that should be used as directed and kept away from eyes. The volcanic rock specimens are genuine geological samples. Adult supervision is recommended, and the kit should be kept out of reach of children under 3.",
          },
          {
            question: "What does the learning guide cover?",
            answer:
              "The full-colour learning guide covers what volcanoes are, the structure of the Earth, plate tectonics, the Ring of Fire, different types of volcanoes, the world's largest eruptions, volcanic winter, geothermal energy, and how amazing rocks like pumice and geodes form. It's something your child can read and return to well after the experiment is done.",
          },
        ]}
      />

      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-build-your-own-volcano/whats-in-the-box.jpg"
        imageAlt="National Geographic Build Your Own Volcano Kit contents laid out"
        background="gray"
        items={[
          "Plaster — for casting the volcano",
          "Volcano mould",
          "Eruption powder (enough for multiple eruptions)",
          "Paint set and paintbrush",
          "Genuine pumice specimen",
          "Genuine geode fragment",
          "Instruction booklet",
          "Full-colour learning guide",
        ]}
      />

      <CallToAction
        title="Ready for the Big Eruption?"
        subtitle="Everything you need to build, decorate, and erupt — right in the box."
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
      "Make your own erupting volcano — cast it from plaster, paint it your way, and trigger a bubbling eruption. Includes 2 genuine volcanic specimens and a full-colour guide. Ages 8+.",
    alternates: {
      canonical: "/product/national-geographic-build-your-own-volcano",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
