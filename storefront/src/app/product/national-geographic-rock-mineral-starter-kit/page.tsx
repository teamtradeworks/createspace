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

const PRODUCT_HANDLE = "national-geographic-rock-mineral-starter-kit";

export default async function NatGeoRockMineralStarterKitPage() {
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
        tagline="Fifteen real specimens. Fool&rsquo;s gold, volcanic glass, rose quartz, all in one box."
        highlights={[
          "15 authentic rock and mineral specimens, genuine geological finds",
          "Acrylic display case with individual compartments for each specimen",
          "Magnifying glass for up-close inspection",
          "Full-colour identification guide with facts on every specimen",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <FeatureGrid
        title="What Makes This Kit Special"
        columns={3}
        background="white"
        features={[
          {
            icon: "star",
            title: "Real Rocks, Not Replicas",
            description:
              "Every specimen in this kit is a genuine geological sample, not plastic, not painted. Hematite with its metallic sheen, snowflake obsidian from volcanic glass, desert rose formed grain by grain in an arid desert. The real thing is always more interesting than a model.",
          },
          {
            icon: "eye",
            title: "Fool's Gold Steals the Show",
            description:
              "Pyrite, iron sulfide with a cubic crystal structure and a gleaming gold lustre, is the specimen every kid reaches for first. Why does it look like gold but isn't? That question alone will send them straight to the identification guide, and they'll be talking about it for days.",
          },
          {
            icon: "puzzle",
            title: "Two States of the Same Mineral",
            description:
              "The kit includes two samples each of rose quartz and green aventurine, one polished, one rough. Holding both at once and noticing how the same mineral looks completely different depending on how it&rsquo;s treated is one of those small moments that sparks a big question.",
          },
          {
            icon: "layers",
            title: "A Case Worth Displaying",
            description:
              "The clear acrylic case has individual compartments moulded for each specimen. It seals securely and the lid is transparent so the whole collection is always on show, on a desk, a shelf, or a windowsill. It's organised from day one and stays that way.",
          },
          {
            icon: "book",
            title: "The Guide Does the Work",
            description:
              "The included full-colour identification guide pairs facts with each specimen, where it forms, what makes it unique, and how to identify it by colour, texture, and lustre. Kids can use it independently to work through each rock at their own pace.",
          },
          {
            icon: "compass",
            title: "A Hobby That Grows",
            description:
              "Rock collecting is one of the most popular naturalist hobbies in the world, and this kit is the perfect start. Once the collection is identified and displayed, the instinct to add to it kicks in. Parks, beaches, hiking trails, and gem shows all start to look different.",
          },
        ]}
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/national-geographic-rock-mineral-starter-kit/three-kids-looking-at-rocks-together.jpeg"
        imageAlt="Three children examining rocks and minerals together outdoors"
        title="15 Rocks With a Story Each"
        body="Pumice is so light it floats, it's basically hardened volcanic foam. Pyrite fooled gold miners for centuries with its metallic gleam. Snowflake obsidian is volcanic glass that cooled so fast it never had time to form crystals. Desert rose isn't a plant, it's a gypsum crystal that grew grain by grain in an ancient desert. Each specimen in this kit comes with facts like these in the guide, which makes identifying them half the fun."
        layout="image-left"
        background="gray"
        imageObjectPosition="50% 100%"
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
              "Recommended for ages 8 and up. The identification guide is written clearly enough for most 8-year-olds to work through independently, and the specimens are large enough to handle comfortably. Younger children (6–7) can enjoy it with a little adult guidance, but note that some specimens are small, supervision is recommended for children under 6.",
          },
          {
            question: "Are the specimens real rocks and minerals, or are they plastic?",
            answer:
              "They&rsquo;re real. All 15 specimens are genuine geological samples, authentic rocks and minerals, not painted plastic or synthetic reproductions. That&rsquo;s part of the National Geographic promise: the same credibility behind their documentaries and magazines goes into what ends up in the box.",
          },
          {
            question: "How are the specimens stored?",
            answer:
              "The kit includes a clear acrylic display and storage case with individual moulded compartments, one for each specimen. The lid seals securely to keep everything in place and is transparent so the full collection is always visible. It&rsquo;s both functional storage and a display worth keeping out.",
          },
          {
            question: "Can my child identify the specimens on their own?",
            answer:
              "Yes, that&rsquo;s exactly what the full-colour identification guide is for. It covers each specimen with key identification details and interesting facts. Most children aged 8 and up will be able to work through it independently. Matching a specimen to its guide entry is genuinely satisfying, and a lot of the learning happens in the process.",
          },
          {
            question: "Does it need batteries, an app, or a screen?",
            answer:
              "None of the above. No batteries, no software, no device required. Just the specimens, the magnifying glass, and the guide. It&rsquo;s entirely hands-on and screen-free.",
          },
          {
            question: "Is it safe for younger children?",
            answer:
              "The specimens are natural materials, non-toxic rock and mineral samples. Some are small, so adult supervision is recommended for children under 6. For children aged 8 and up, it&rsquo;s designed to be used independently.",
          },
          {
            question: "What if my child wants more specimens after this?",
            answer:
              "That&rsquo;s the intended outcome. Rock collecting is one of the most popular naturalist hobbies worldwide and this kit is designed as a starting point. National Geographic offers other mineral and geology kits, and field collecting (picking up interesting rocks on hikes, at beaches, or in parks) is free. The acrylic case can be supplemented with additional cases as the collection grows.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What&rsquo;s in the Box"
        image="/images/products/national-geographic-rock-mineral-starter-kit/whats-in-the-box.png"
        imageAlt="National Geographic Rock and Mineral Starter Kit contents laid out"
        background="white"
        items={[
          "Hematite",
          "Rose quartz × 2 samples",
          "Snowflake obsidian",
          "Tiger&rsquo;s eye",
          "Red jasper",
          "Green aventurine × 2 samples",
          "Green zebra jasper",
          "Desert rose",
          "Pumice",
          "Pyrite (&ldquo;fool&rsquo;s gold&rdquo;)",
          "Blue quartz",
          "Blue calcite",
          "Fluorite",
          "Magnifying glass",
          "Clear acrylic display and storage case with individual compartments",
          "Full-colour identification guide",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Start the Collection"
        subtitle="Everything needed to turn any curious kid into a rock collector."
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
      "15 real rock and mineral specimens including pyrite, rose quartz and obsidian. Includes magnifying glass, display case and full-colour identification guide. Ages 8+.",
    alternates: {
      canonical: "/product/national-geographic-rock-mineral-starter-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
