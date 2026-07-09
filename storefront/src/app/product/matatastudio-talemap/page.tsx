import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  ExtensionBanner,
  QuickInfoBadges,
  FeatureGrid,
  ImageTextBlock,
  WhatsIncluded,
  ProductFAQ,
  ProductReviews,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "matatastudio-talemap";
const PARENT_PRODUCT_HANDLE = "matatastudio-tale-bot-pro";

export default async function TaleMatPage() {
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
    <ProductTrackingProvider handle={PRODUCT_HANDLE}>
      <ProductJsonLd product={product} />

      {/* Hero Section */}
      <HeroSection
        product={product}
        tagline="Give your Tale-Bot Pro a whole new world to explore"
        highlights={[
          "106 themed clip cards — maths, language, geography, animals, and more",
          "Build unlimited story maps — no two sessions need to be the same",
          "100% screen-free once loaded — set up once, play again and again",
          "Free design software with a ready-made map library included",
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

      {/* Collaboration */}
      <ImageTextBlock
        image="/images/products/matatastudio-talemap/kids-playing-together.jpg"
        imageAlt="Children playing together with TaleMap and Tale-Bot Pro"
        title="Built for Playing Together"
        body="When children build a story map side by side, the learning doubles. One decides which cards go where; another codes the route. TaleMap is designed for this kind of collaborative play — a tool for conversation, negotiation, and shared celebration when the robot does exactly what they planned."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="How TaleMap Works"
        subtitle="A customisable 6×6 coding map that turns the Tale-Bot Pro into a storytelling machine."
        features={[
          {
            icon: "map",
            title: "6×6 OID Map",
            description:
              "36 pockets hold clip cards to define your coding world — each position triggers a programmed robot response",
          },
          {
            icon: "puzzle",
            title: "106 Clip Cards",
            description:
              "Double-sided cards covering maths, language, geography, animals, fruit, and more",
          },
          {
            icon: "code",
            title: "Design Your TaleMap",
            description:
              "Free MatataCode software (Windows, Mac, Chrome OS, iOS & Android) lets you assign movements and voice responses to every grid position",
          },
          {
            icon: "book",
            title: "TaleMap Library",
            description:
              "Download ready-made map scenarios instantly — no design experience needed to get started",
          },
          {
            icon: "star",
            title: "Screen-Free Once Loaded",
            description:
              "Transfer the map file to the robot via USB once, then your child plays completely without a screen",
          },
          {
            icon: "lightbulb",
            title: "Cross-Curricular",
            description:
              "Every scenario connects coding to a real subject — reading, maths, geography, and science all in one activity",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* 106 Cards */}
      <ImageTextBlock
        image="/images/products/matatastudio-talemap/different-cards.jpg"
        imageAlt="Selection of TaleMap clip cards showing different subjects and themes"
        title="106 Ways to Change the World"
        body="Each of TaleMap's 106 double-sided clip cards represents a different scene element — a number, an animal, a place, a letter. Slot them into any of the 36 grid pockets and the map becomes entirely yours. Mix and match across themes, repeat cards to build bigger scenes, or leave pockets empty to create open space. No two sessions need to look the same."
        layout="image-right"
        background="white"
      />

      {/* FAQ */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: `Do I need the ${parentProductName}?`,
            answer:
              "Yes — TaleMap is an add-on that requires a Tale-Bot Pro robot to use. The robot is what moves, talks, and responds as it navigates the map. TaleMap provides the coding world; the Tale-Bot Pro brings it to life. The robot is sold separately.",
          },
          {
            question: "Do I need to be technical to set it up?",
            answer:
              "Not at all! Download the free MatataCode software, choose or design a map, and transfer it to the robot via USB. After that, your child plays completely screen-free. The TaleMap Library has ready-made maps if you'd rather skip the design step entirely.",
          },
          {
            question: "What devices does MatataCode run on?",
            answer:
              "MatataCode is available on Windows, macOS, Chrome OS, and as a mobile app on iOS and Android — so you can set up maps from most devices. Once the map is loaded onto the Tale-Bot Pro, no screen is needed during play.",
          },
          {
            question: "What age is TaleMap suitable for?",
            answer:
              "TaleMap is designed for ages 3–8. Younger children enjoy simple navigation challenges on short routes; older children can take on complex multi-step sequences and design their own maps from scratch using the free software.",
          },
          {
            question: "Can my child design their own maps?",
            answer:
              "That's TaleMap's superpower! The free MatataCode software includes a 'Design Your TaleMap' tool where you assign a movement and voice response to each of the 36 grid positions. Saved maps can be reused, shared, and built on across many sessions.",
          },
          {
            question: "What's the difference between TaleMap and the Activity Box?",
            answer:
              "The Activity Box is a structured add-on with 10 preset themed maps and 42 guided coding challenges — ideal if you want ready-made activities. TaleMap is an open-ended creative platform where you design your own maps from scratch — ideal for children who want to create, not just follow instructions.",
          },
        ]}
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/matatastudio-talemap/whats-in-the-box.jpg"
        imageAlt="TaleMap contents — OID interactive map and clip cards"
        items={[
          "1× 6×6 Definable OID Interactive Map",
          "106× Double-sided clip cards (mathematics, language, geography, animals, fruit, and more)",
        ]}
        background="gray"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Grid Format", value: "6×6 OID map, 36 card pockets" },
          { label: "Clip Cards", value: "106 double-sided" },
          {
            label: "Card Themes",
            value: "Mathematics, language, geography, animals, fruit, and more",
          },
          { label: "Dimensions", value: "30 × 10 × 18 cm" },
          { label: "Weight", value: "0.7 kg" },
          {
            label: "Software",
            value: "MatataCode — Windows, macOS, Chrome OS, iOS & Android (free)",
          },
          { label: "Compatible With", value: "MatataStudio Tale-Bot Pro" },
          { label: "Connection", value: "USB (for .imap file transfer to robot)" },
        ]}
        background="white"
      />

      {/* Call to Action */}
      <CallToAction
        title="Unlock Unlimited Story Maps"
        subtitle="106 themed clip cards, free design software, and a ready-made map library — everything you need to give your Tale-Bot Pro a new adventure."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel={`View the ${parentProductName}`}
        secondaryHref={parentProductHref}
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
      "Expand your Tale-Bot Pro with TaleMap — 106 themed clip cards, unlimited custom story maps, and free design software. Screen-free coding for ages 3–8.",
    alternates: {
      canonical: "/product/matatastudio-talemap",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
