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

const PRODUCT_HANDLE = "national-geographic-dino-fossil-dig-kit";

export default async function NatGeoDinoFossilDigKitPage() {
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
        tagline="Chip away the rock. Uncover a 50-million-year-old secret."
        highlights={[
          "Dig up 3 fossil specimens — including a REAL prehistoric coprolite",
          "T-Rex tooth replica cast from an actual fossil",
          "All excavation tools included — just add curiosity",
          "Ages 8–12",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <ImageTextBlock
        image="/images/products/national-geographic-dino-fossil-dig-kit/girl-digging-dino-fossil.jpg"
        imageAlt="Girl carefully excavating a fossil from a dig brick"
        title="Feel What It&rsquo;s Like to Be a Palaeontologist"
        body="Inside a T-Rex-shaped dig brick, three fossil specimens are waiting. Armed with a real dig tool and brush — the same types used by scientists in the field — your child chips away carefully, brushes away the dust, and watches each discovery emerge from the rock. There&rsquo;s no rushing this. The slower and more careful the approach, the better the result."
        layout="image-left"
        imageObjectPosition="50% 80%"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes This Dig Special"
        columns={2}
        background="gray"
        features={[
          {
            icon: "sparkles",
            title: "A Genuine Fossil Inside",
            description:
              "The coprolite is real. Not a replica — an actual prehistoric specimen that existed over 50 million years ago. Your child will hold something that was alive during the age of the dinosaurs. That's not a gimmick.",
          },
          {
            icon: "tools",
            title: "Tools Like a Real Scientist",
            description:
              "The dig tool and brush are designed to work the same way as those used by palaeontologists in the field. Children chip, scrape, and brush — proper technique, proper process, actual science.",
          },
          {
            icon: "star",
            title: "Gold Medal, Independent Toy Awards",
            description:
              "Winner of the Gold Medal in the education category of the Independent Toy Awards. Trusted, recognised, and recommended by educators and parents alike.",
          },
          {
            icon: "book",
            title: "A Learning Guide Worth Keeping",
            description:
              "The full-colour learning guide explains what each specimen is, how fossils form, and why palaeontologists care about dino poop. It's the kind of reference a curious kid will come back to.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/national-geographic-dino-fossil-dig-kit/hands-scraping-and-brushing-fossil.jpg"
        imageAlt="Close-up of hands carefully scraping and brushing a fossil specimen from a dig brick"
        title="Hold Something Real"
        body="The coprolite — fossilised dinosaur dung — is a genuine prehistoric specimen, over 50 million years old and safe to handle. The T-Rex tooth is a high-quality cast taken from an actual fossil, accurate in shape and texture. When your child examines each discovery under the magnifying glass and opens the learning guide to find out what they&rsquo;ve just uncovered, the excitement is real because the science is real."
        layout="image-right"
        imageObjectPosition="50% 80%"
        background="white"
      />

      {/* gray */}
      <CustomerShowcase
        title="Dino Diggers in Action"
        subtitle="From the first chip to the final find"
        background="gray"
        images={[
          {
            src: "/images/products/national-geographic-dino-fossil-dig-kit/kids-scraping-at-fossil.png",
            alt: "Kids carefully scraping at a fossil dig brick",
            label: "On the Dig",
            description: "Taking it slow and getting it right",
          },
          {
            src: "/images/products/national-geographic-dino-fossil-dig-kit/box-unpacked.png",
            alt: "National Geographic Dino Fossil Dig Kit contents laid out",
            label: "Unboxed",
            description: "Everything you need, right out of the box",
          },
          {
            src: "/images/products/national-geographic-dino-fossil-dig-kit/fossil-smashed.png",
            alt: "Excavated fossil specimen from the dig kit",
            label: "The Find",
            description: "The reward for patience and precision",
          },
        ]}
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
              "The kit is designed for ages 8–12. Most 8-year-olds can work through the excavation independently — the tools are kid-safe and the dig brick is made from gypsum and clay, which is softer than stone and designed to be manageable for children. Older kids in the range tend to take their time and get more into the detail.",
          },
          {
            question: "Is it messy? Is cleanup easy?",
            answer:
              "The dig brick produces a fine gypsum and clay dust as it&rsquo;s chipped away. Work on a table covered with newspaper or an old cloth and the mess stays contained. The dust brushes up easily and the kit doesn&rsquo;t involve any liquids, paints, or staining materials. It&rsquo;s one of the tidier excavation activities you&rsquo;ll find.",
          },
          {
            question: "How long does the activity take?",
            answer:
              "Around 30 minutes for the excavation itself. Some children move faster, others slow right down and really savour the process — which is entirely the point. The learning guide keeps things going after the dig is done, and the specimens themselves tend to get pulled out for show-and-tell more than once.",
          },
          {
            question: "Does my child need adult help?",
            answer:
              "Not really. The instructions are clear and the tools are straightforward — most kids aged 8+ can set up and work through the activity independently. A light presence is useful for younger children on the lower end of the age range, but the design is deliberately self-directed. Part of the satisfaction comes from doing it alone.",
          },
          {
            question: "Is the coprolite really a real fossil?",
            answer:
              "Yes. The coprolite — fossilised dinosaur dung — is a genuine prehistoric specimen over 50 million years old. It has been tested and is safe to handle. The T-Rex tooth is a high-quality replica cast taken directly from an actual T-Rex tooth fossil, so it&rsquo;s accurate in shape and texture. You&rsquo;re getting one real fossil and one scientifically accurate replica.",
          },
          {
            question: "Can the dig brick be reused?",
            answer:
              "The dig brick is a single-use activity — once the specimens are uncovered, the brick is done. But the specimens themselves are keepers: they make great display pieces and conversation starters. National Geographic produces a range of dig kits (gemstones, shark teeth, bugs) so children who enjoy this one often want to add to their collection.",
          },
          {
            question: "What does my child actually get out of this?",
            answer:
              "A real sense of what palaeontologists do — careful, methodical work that rewards patience. They&rsquo;ll learn how fossils form, what coprolite tells scientists about dinosaur diet, and why the T-Rex tooth matters. More than the facts, they&rsquo;ll finish with something tangible: three specimens they uncovered themselves, and a story to tell about how they found them.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What&rsquo;s in the Box"
        image="/images/products/national-geographic-dino-fossil-dig-kit/whats-in-the-box.jpg"
        imageAlt="National Geographic Dino Fossil Dig Kit contents laid out"
        background="white"
        items={[
          "T-Rex-shaped dig brick (containing all 3 specimens)",
          "T-Rex tooth replica — cast from a genuine T-Rex tooth fossil",
          "Dinosaur bone replica",
          "Genuine coprolite — real dinosaur fossil, 50+ million years old",
          "Double-ended dig tool",
          "Brush",
          "Magnifying glass",
          "Full-colour learning guide",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Dig In. Discover Something Real."
        subtitle="A T-Rex tooth, a dinosaur bone, and a 50-million-year-old genuine fossil — all hidden inside one dig brick."
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
      "Excavate 3 fossil specimens — including a real 50-million-year-old coprolite. Real tools, real science, ages 8–12. Everything included.",
    alternates: {
      canonical: "/product/national-geographic-dino-fossil-dig-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
