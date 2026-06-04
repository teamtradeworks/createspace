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

const PRODUCT_HANDLE =
  "national-geographic-amazing-reactions-chemistry-set";

export default async function NatGeoAmazingReactionsPage() {
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
        tagline="Make glow-in-the-dark worms, fizzing reactions, a crystal tree, and more — using real lab equipment."
        highlights={[
          "10 guided experiments all focused on chemical reactions",
          "Real lab equipment: test tubes, beaker, pipette, and measuring scoops",
          "Ages 8 and up",
          "Safety glasses and gloves included · NAPPA Award Winner 2025",
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
            icon: "temperature",
            title: "10 Different Reactions",
            description:
              "Every experiment covers a different type of chemical reaction — polymers, acid-base, crystallisation, and fluorescence. The variety is what makes this kit so memorable: there's always another kind of chemistry to discover.",
          },
          {
            icon: "tool",
            title: "Real Lab Equipment",
            description:
              "You get genuine test tubes, a beaker, a pipette, and measuring scoops — sized for small hands but built to work properly. Your child won't just play at science; they'll actually do it.",
          },
          {
            icon: "star",
            title: "NAPPA Award Winner 2025",
            description:
              "Independently evaluated and recommended by the National Parenting Product Awards. Parents described it as \"extremely fun\" with \"well written\" instructions that children could complete on their own.",
          },
          {
            icon: "book",
            title: "20 Experiments Total",
            description:
              "10 guided experiments using the included materials, plus a bonus guide with 10 more experiments using common household items — so the chemistry keeps going long after the kit supplies run out.",
          },
        ]}
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/national-geographic-amazing-reactions-chemistry-set/hand-holding-glowing-worms.jpg"
        imageAlt="Hand holding glowing polymer worms made in a chemistry experiment"
        title="The Experiment Everyone Talks About"
        body="Drip a solution into a chemical bath and watch it solidify into spaghetti-like worms that glow in the dark. It's the experiment that sends kids running to show the whole house — and the one they'll want to repeat. What makes it stick isn't just the spectacle; it's that the guide explains exactly what's happening, turning a wow moment into a genuine understanding of how polymers work."
        layout="image-left"
        background="gray"
      />

      {/* white */}
      <ProjectShowcase
        title="10 Amazing Reactions"
        highlight="10 guided experiments using real lab equipment"
        subtitle="All focused on chemical reactions — work through them all, or pick whichever one looks most exciting first."
        background="white"
        projects={[
          {
            name: "Glow-in-the-Dark Worms",
            description:
              "Drip polymer solution into a chemical bath to form squishy, glowing worms you can hold in your hands.",
            concepts: "Polymer chemistry, cross-linking",
          },
          {
            name: "Fizzing Reactions",
            description:
              "Mix chemicals to create a dramatic fizz — CO₂ gas bubbles out visibly before your eyes.",
            concepts: "Acid-base reactions, gas production",
          },
          {
            name: "Colour-Changing Solutions",
            description:
              "Add drops of indicator to a solution and watch it shift through a range of vivid colours.",
            concepts: "pH indicators, acid-base chemistry",
          },
          {
            name: "Change Colour with Your Breath",
            description:
              "Blow through a straw into a solution and change its colour using nothing but your own exhaled breath.",
            concepts: "CO₂, carbonic acid, pH",
          },
          {
            name: "Glowing Test Tube",
            description:
              "Make a test tube light up — a glowing liquid reaction that looks straight out of a science film.",
            concepts: "Fluorescence, UV-reactive chemistry",
          },
          {
            name: "Bouncy Ball",
            description:
              "Mix two chemicals together and shape them into a colourful ball that actually bounces.",
            concepts: "Polymer chemistry, elasticity",
          },
          {
            name: "Crystal Tree",
            description:
              "Pour a solution over a tree-shaped base and check back over the next day as crystals slowly grow.",
            concepts: "Supersaturation, crystallisation",
          },
          {
            name: "Secret Message",
            description:
              "Write a hidden message that's invisible until you apply the right chemical to reveal it.",
            concepts: "pH-sensitive inks, indicators",
          },
          {
            name: "Colour-Changing Water",
            description:
              "Add a chemical to plain water and watch it dramatically change colour in an instant.",
            concepts: "Indicator chemistry, dilution",
          },
          {
            name: "Bubbling Reaction",
            description:
              "Create a vigorous foaming reaction — bubbles form fast, spill over the edge, and keep going.",
            concepts: "Acid-base reactions, CO₂ gas formation",
          },
        ]}
        moreText="Plus a bonus guide with 10 more experiments using household items!"
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
              "The kit is designed for children aged 8 and up. At that age, kids can follow multi-step instructions, understand cause-and-effect, and handle the lab equipment with a little care. Most children from age 8 can work through the experiments independently once they've read the guide.",
          },
          {
            question: "Is it messy? Will anything stain?",
            answer:
              "Some experiments produce coloured liquids, so it's worth setting up on a tray or over a sink — especially for the colour-change and fizzing experiments. The easy-clean experiment tray is included for exactly this purpose. The glow-in-the-dark worms experiment involves dripping a solution, so a clear workspace helps. Cleanup is generally straightforward with a damp cloth.",
          },
          {
            question: "How long does each experiment take?",
            answer:
              "Most experiments take around 15 to 30 minutes from setup to result. The crystal tree is the exception — crystals start forming quickly but continue growing over 1 to 2 days, so it's a slow-burn experiment worth checking in on. The bouncy ball and glow worms can be repeated quickly and many children do them more than once.",
          },
          {
            question: "Does my child need adult help?",
            answer:
              "Adult supervision is recommended — some mild chemicals are involved and a light presence is sensible. That said, the NAPPA evaluators noted children could complete the experiments independently, so for children aged 10 and up, most steps are fully self-directed. The guide is clear, well-illustrated, and written for kids.",
          },
          {
            question: "Can the experiments be repeated?",
            answer:
              "Yes — many of the experiments can be repeated using the included materials. Some consumables run out over time, but the bonus guide includes 10 more experiments using household items, so the chemistry keeps going well beyond the included supplies.",
          },
          {
            question: "Are the chemicals safe?",
            answer:
              "The chemicals are mild and designed for safe use by children. Safety glasses and gloves are included — wearing them is part of the experience. As with any chemistry kit, keep chemicals away from eyes and wash hands after handling. Not suitable for children under 3 due to small parts.",
          },
          {
            question: "What will my child get out of this?",
            answer:
              "Beyond the obvious fun, children come away having actually done chemistry — not just watched it. They'll have handled real lab equipment, made real reactions happen, and read the explanations for why. The guide connects each wow moment to the science behind it, so kids leave with genuine curiosity about how everyday materials are made.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-amazing-reactions-chemistry-set/whats-in-the-box.jpg"
        imageAlt="National Geographic Amazing Reactions Chemistry Set contents laid out"
        background="white"
        items={[
          "Test tubes",
          "Beaker",
          "Pipette",
          "Measuring scoops",
          "Easy-clean experiment tray",
          "Safety glasses",
          "Protective gloves",
          "Chemistry materials for all 10 experiments",
          "Illustrated experiment guide (10 guided experiments)",
          "Bonus household experiment guide (10 more experiments)",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="10 Reactions. Real Lab Equipment. One Afternoon."
        subtitle="From glowing worms to fizzing solutions — chemistry that's as hands-on as it gets."
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
      "10 guided chemical reaction experiments using real lab equipment — glow worms, fizzing reactions, crystal tree, bouncy ball, and more. Ages 8+, no batteries needed.",
    alternates: {
      canonical:
        "/product/national-geographic-amazing-reactions-chemistry-set",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
