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
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-crystal-garden";

export default async function NatGeoCrystalGardenPage() {
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
        tagline="Colour your trees. Pour the solution. Watch crystals bloom in the colours you chose."
        highlights={[
          "You'll see the first crystals in minutes, trees fully covered in as little as 6 hours",
          "You choose the colours: crystals grow in whatever you paint on the trees",
          "Ages 8–15 · everything included",
          "Comes with a genuine geode specimen to keep",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=u-kfwE6uwB8"
        title="See the Crystal Garden in Action"
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
            title: "You Choose the Colours",
            description:
              "Colour each tree any way you'd like with the 5 watercolour pens, and the crystals grow in exactly those colours. Because the crystals absorb the ink from the markers, every garden is completely unique.",
          },
          {
            icon: "clock",
            title: "Results in Hours, Not Days",
            description:
              "You'll see the first crystals in minutes, and the trees will be fully covered in as little as 6 hours. The watching is half the fun.",
          },
          {
            icon: "star",
            title: "A Real Piece of the Earth",
            description:
              "A genuine geode specimen is included in the kit, not a plastic replica. Children can compare what they grew to what nature built, and keep the geode long after the crystal trees are gone.",
          },
          {
            icon: "book",
            title: "National Geographic Learning Guide",
            description:
              "The full-colour learning guide explains what crystals are, how they form in nature, and where they appear in everyday life.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/national-geographic-crystal-garden/boys-colouring-in-tree.jpg"
        imageAlt="Boy colouring in a cardboard tree with washable markers"
        title="Art and Earth Science in the Same Kit"
        body="Before a single crystal appears, your child is already in charge: picking colours, deciding patterns, claiming their trees. That creative ownership is what makes the payoff so satisfying. When the crystals bloom hours later in exactly the shades they chose, science doesn't feel like a lesson. It feels like magic they made themselves."
        layout="image-left"
        background="white"
        imageObjectPosition="50% 75%"
      />

      {/* gray */}
      <CustomerShowcase
        title="Growing Crystals in Action"
        subtitle="From setup to sparkling finish: see what the crystal garden looks like in real hands"
        background="gray"
        images={[
          {
            src: "/images/products/national-geographic-crystal-garden/boy-holding-pen-to-colour-tree.jpg",
            alt: "Boy holding a marker, about to colour his crystal tree",
            label: "Designing",
            description:
              "Choosing your colours is half the fun: your crystals will grow in whatever you paint",
          },
          {
            src: "/images/products/national-geographic-crystal-garden/box-unpacked.jpg",
            alt: "National Geographic Crystal Garden kit contents laid out",
            label: "Kit Contents",
            description: "Everything you need to grow your crystal garden, included in one box",
          },
          {
            src: "/images/products/national-geographic-crystal-garden/crystal-tree-starting-to-grow.jpg",
            alt: "Crystal tree with first crystals beginning to form on the branches",
            label: "First Crystals",
            description: "Crystals start appearing within minutes of pouring the solution",
          },
          {
            src: "/images/products/national-geographic-crystal-garden/some-pieces-unpacked-in-packaging.jpg",
            alt: "Crystal Garden kit pieces laid out showing the trees, markers, and solution",
            label: "Unboxing",
            description: "Everything arrives neatly packaged and ready to use",
          },
          {
            src: "/images/products/national-geographic-crystal-garden/trees-growing.jpg",
            alt: "Two crystal trees covered in growing crystals in their chosen colours",
            label: "Crystal Trees",
            description:
              "The trees take on the colours you chose: a completely personal crystal garden",
          },
          {
            src: "/images/products/national-geographic-crystal-garden/two-trees-starting-to-grow.jpg",
            alt: "Two crystal trees in the early stages of crystal growth",
            label: "Growing Together",
            description:
              "Both trees in the early stages of crystal growth, results visible in minutes",
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
              "The kit is designed for ages 8–15. Children at the younger end can work through it independently once the solution is poured: the colouring and assembly steps are fully self-directed. The included learning guide gives older children plenty to explore beyond the experiment itself.",
          },
          {
            question: "Is it messy? Will anything stain?",
            answer:
              "The colouring step uses washable watercolour markers, so stray marks are easy to wipe away. The crystal-growing liquid is a clear solution, unlikely to stain if handled carefully. We recommend doing the pouring step over a tray or sink. The crystals themselves are dry and odourless once grown.",
          },
          {
            question: "How long does the activity take?",
            answer:
              "Setup takes around 15 minutes: colouring the trees and assembling them on their bases. The first crystals appear in minutes, and children typically check in throughout the day as they grow. Trees will be fully covered in as little as 6 hours. The anticipation is part of the experience.",
          },
          {
            question: "Does my child need adult help?",
            answer:
              "A light adult presence is recommended when pouring the crystal-growing liquid. It's a simple step, but worth supervising for younger children. The colouring, assembly, and observation stages are entirely self-directed. Most children aged 10 and up can manage the whole process independently.",
          },
          {
            question: "Can the experiment be repeated?",
            answer:
              "The kit includes enough solution for one full grow. Fallen crystals can be re-grown by adding a little water to the base, which is great for extending the experiment. The genuine geode specimen is a lasting keepsake once the crystal trees have run their course.",
          },
          {
            question: "Is the crystal-growing liquid safe?",
            answer:
              "Yes. The solution is safe when used as directed: handle with care, keep away from eyes, and wash hands after contact. The kit is not suitable for children under 3 due to small parts. Adult supervision is recommended throughout.",
          },
          {
            question: "What will my child get out of this?",
            answer:
              "Beyond the fun, kids come away with a genuine understanding of how crystals form in nature. The learning guide connects what they grew to how minerals form inside geodes. The process naturally builds patience and careful observation. And there's real pride in creating something beautiful from scratch.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-crystal-garden/whats-in-the-box.jpg"
        imageAlt="National Geographic Crystal Garden kit contents laid out"
        background="white"
        items={[
          "2 tree bases",
          "1 evergreen tree (cardboard cutout)",
          "1 cherry tree (cardboard cutout)",
          "5 washable watercolour markers",
          "2 packs of crystal growing liquid",
          "1 instruction booklet",
          "1 genuine geode specimen",
          "Full-colour learning guide packed with crystal science facts",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Grow Your Own Crystal Garden"
        subtitle="Colour your trees, pour the solution, and watch crystals bloom in the colours you chose. All in one afternoon."
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
      "Grow sparkling crystal trees at home: crystals bloom in the colours you choose. Includes a genuine geode specimen. Ages 8–15, results in as little as 6 hours.",
    alternates: {
      canonical: "/product/national-geographic-crystal-garden",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
