import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  ExtensionBanner,
  QuickInfoBadges,
  FeatureGrid,
  WhatsIncluded,
  ProductFAQ,
  ProductReviews,
  CallToAction,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "matatastudio-activity-box";
const PARENT_PRODUCT_HANDLE = "matatastudio-tale-bot-pro";

export default async function ActivityBoxPage() {
  const [product, parentProduct] = await Promise.all([
    getProductByHandle(PRODUCT_HANDLE),
    getProductByHandle(PARENT_PRODUCT_HANDLE),
  ]);

  if (!product) {
    notFound();
  }

  const resolvedAddons = await resolveAddonsForHandle(PRODUCT_HANDLE);
  const addons = serializeAddons(resolvedAddons);

  const parentProductName = parentProduct?.title || "MatataStudio Tale-Bot Pro";
  const parentProductHref = `/product/${PARENT_PRODUCT_HANDLE}`;

  return (
    <>
      <ProductJsonLd product={product} />

      {/* Hero Section */}
      <HeroSection
        product={product}
        tagline="10 new themed worlds and 42 coding challenges for your Tale-Bot Pro"
        highlights={[
          "10 interactive themed scenarios — from solar systems to treasure hunts",
          "42 guided activity cases with progressive difficulty",
          "98 interactive stickers and a blank map for creative play",
          "100% screen-free — works with your existing Tale-Bot Pro or Tale-Bot Basic",
        ]}
        addons={addons}
      />

      {/* Extension Banner */}
      <ExtensionBanner
        parentProductName={parentProductName}
        parentProductHref={parentProductHref}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* What This Adds */}
      <FeatureGrid
        title="What This Adds to Your Tale-Bot Pro"
        subtitle="The Activity Box introduces new themes, subjects, and challenges that go beyond what's included with the robot."
        features={[
          {
            icon: "map",
            title: "10 Themed Worlds",
            description:
              "Five double-sided interactive maps with voice guidance, error feedback, and milestone celebrations — from Supermarkets to the Solar System",
          },
          {
            icon: "puzzle",
            title: "42 Guided Challenges",
            description:
              "Activity cards with structured coding cases that progress in difficulty across all 10 themes",
          },
          {
            icon: "star",
            title: "98 Interactive Stickers",
            description:
              "Themed stickers plus function stickers (signals and traps) that add new interactive elements to coding play",
          },
          {
            icon: "lightbulb",
            title: "Cross-Curricular Learning",
            description:
              "Covers science, maths, literacy, social studies, and fine arts — not just coding",
          },
          {
            icon: "pencil",
            title: "Blank Map for Creativity",
            description:
              "A double-sided blank map where your child creates their own coding scenarios from scratch",
          },
          {
            icon: "book",
            title: "32 Command Cards",
            description:
              "Colour-coded cards that help children plan and record their programmes before pressing buttons",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* FAQ */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: `Do I need the ${parentProductName}?`,
            answer:
              "Yes — the Activity Box is an add-on that provides maps, stickers, and activity cards, but it requires a Tale-Bot Pro or Tale-Bot Basic robot to use. The robot is sold separately.",
          },
          {
            question: "What's different from what comes with the Tale-Bot Pro?",
            answer:
              "The Tale-Bot Pro includes 5 interactive maps and a challenge booklet with 14 missions. The Activity Box adds 10 completely new themed scenarios, 42 additional activity cases, 98 interactive stickers, and a blank map — significantly expanding the content available for your robot.",
          },
          {
            question: "Does it work with the Tale-Bot Basic too?",
            answer:
              "Yes! The Activity Box is compatible with both the Tale-Bot Pro and the Tale-Bot Basic robot.",
          },
          {
            question: "What subjects does it cover?",
            answer:
              "The 10 themes span science (Solar System, Farm, Harvest), maths (counting, sequencing), English language arts (Antonyms), social studies (Profession, Supermarket, Patrol Car), and creative play (Saving the Princess, Treasure Hunting). It's genuinely cross-curricular.",
          },
          {
            question: "Is this suitable for the same age range?",
            answer:
              "Yes — the Activity Box is designed for ages 3-5, the same as the Tale-Bot Pro. The progressive difficulty means younger children can start with simpler scenarios and grow into the more complex ones.",
          },
        ]}
        background="white"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        items={[
          "5× Double-sided interactive maps (10 themed scenarios)",
          "1× Double-sided blank map",
          "1× Sticker booklet (79 interactive stickers across 10 themes)",
          "1× Callout stickers sheet (signals and traps)",
          "32× Command cards",
          "Activity cards with 42 cases",
          "3× Paper crafts",
          "1× Configuration setting card",
          "1× Quick guide",
        ]}
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* Call to Action */}
      <CallToAction
        title="Expand Your Tale-Bot Pro"
        subtitle="10 new themed worlds, 42 challenges, and endless creative possibilities — all screen-free."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel={`View the ${parentProductName}`}
        secondaryHref={parentProductHref}
        background="navy"
      />
    </>
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
      "Expand your Tale-Bot Pro with 10 new themed maps, 42 coding challenges, and 98 interactive stickers. Screen-free add-on for ages 3-5.",
    alternates: {
      canonical: "/product/matatastudio-activity-box",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
