import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  VideoEmbed,
  FeatureGrid,
  ProjectShowcase,
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-mega-bug-habitat";

export default async function NatGeoMegaBugHabitatPage() {
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
        tagline="Catch real bugs. See them up close. Return them to the wild."
        highlights={[
          "Real tools for real bug-catching, net, catcher, and tweezers included",
          "Dual magnifiers let you see bugs in incredible detail, even while they move",
          "Ages 4+, ready to use the moment you step outside",
          "Field guide with achievement stickers, a new sticker for every bug you find",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=ZVFT0M8Fu9Y"
        title="See It in Action"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes This Kit Special"
        features={[
          {
            icon: "eye",
            title: "Dual Magnification System",
            description:
              "Two magnifiers built right into the lid, a large stationary viewer for close-up detail, and a 360° rotating telescoping magnifier that follows your bug as it moves. Kids can watch legs, antennae, and wings in action.",
          },
          {
            icon: "compass",
            title: "See Everything, Miss Nothing",
            description:
              "The fully clear cylindrical habitat gives a 360° view of every angle. The removable base makes it easy to get bugs in and out. No fumbling, no dark corners, just an unobstructed window into a tiny world.",
          },
          {
            icon: "star",
            title: "Collect, Identify, Earn Stickers",
            description:
              "The full-colour field guide is packed with bug facts and comes loaded with achievement stickers, one for every type of bug caught and logged. It turns the backyard into a collection challenge that kids want to come back to.",
          },
          {
            icon: "handshake",
            title: "Catch-and-Release by Design",
            description:
              "The scissor-style bug catcher, net, and tweezers are built for gentle handling. The learning guide teaches kids from the start that bugs are living creatures that need to go back home, observation with respect baked in.",
          },
        ]}
        columns={2}
        background="gray"
      />

      {/* white */}
      <ProjectShowcase
        title="What You'll Do"
        highlight="10 open-ended bug adventures, no two sessions are ever the same"
        subtitle="From the garden to under rocks to the flower bed, bugs are everywhere once you start looking."
        projects={[
          {
            name: "Bug Hunt",
            description:
              "Head outside and search for insects in grass, under rocks, in soil, and around plants. Every environment holds something different.",
            concepts: "Observation, patience, habitat awareness",
          },
          {
            name: "Capture & Observe",
            description:
              "Use the bug catcher, net, or tweezers to safely pick up a live insect and transfer it to the habitat without harming it.",
            concepts: "Fine motor skills, tool use, gentle handling",
          },
          {
            name: "Close-Up Study",
            description:
              "Peer through the stationary magnifier to examine your bug in extraordinary detail, legs, eyes, wings, and body segments revealed.",
            concepts: "Scientific observation, vocabulary",
          },
          {
            name: "Motion Tracking",
            description:
              "Use the rotating telescoping magnifier to follow your bug as it moves, zooming in and out, swivelling to stay on target.",
            concepts: "Visual processing, focus, coordination",
          },
          {
            name: "Bug Identification",
            description:
              "Flip through the field guide and match what you caught to the real species inside. Is it an insect or an arachnid? How many legs?",
            concepts: "Classification, non-fiction reading, comparison",
          },
          {
            name: "Habitat Study",
            description:
              "Think about where you found your bug and why. The learning guide explains what different bugs need to survive, and why your garden is full of them.",
            concepts: "Ecology, environmental science, cause and effect",
          },
        ]}
        moreText="Plus glow-in-the-dark play with the 3 collectible figures, bug logging with achievement stickers, and the most important step of all, returning your bugs safely to where they came from"
        columns={3}
        background="white"
      />

      {/* gray */}
      <CustomerShowcase
        title="Bug Scientists in the Wild"
        subtitle="Real kids, real backyards, real bugs, the discovery starts the moment the kit is opened"
        images={[
          {
            src: "/images/products/national-geographic-mega-bug-habitat/girl-in-garden-looking-through-magnifying-glass.png",
            alt: "Girl in garden looking through magnifying glass at insects",
            label: "Garden Explorer",
            description: "Every patch of garden becomes a bug-hunting ground",
          },
          {
            src: "/images/products/national-geographic-mega-bug-habitat/girl-looking-through-magnifying-glass.png",
            alt: "Girl looking closely through the habitat magnifying glass",
            label: "Up Close",
            description: "The dual magnifier turns tiny into enormous",
          },
          {
            src: "/images/products/national-geographic-mega-bug-habitat/bugs-caught-in-bug-habitat.png",
            alt: "Bugs caught and observed inside the clear habitat",
            label: "Caught!",
            description: "A successful catch, ready for close-up study",
          },
          {
            src: "/images/products/national-geographic-mega-bug-habitat/moth-captured.png",
            alt: "Moth inside the bug habitat being observed",
            label: "Moth Study",
            description: "Wings, patterns, and antennae all visible through the 360° walls",
          },
          {
            src: "/images/products/national-geographic-mega-bug-habitat/top-down-view-of-habitat-with-glow-in-the-dark-bug-toys.png",
            alt: "Top-down view of habitat showing glow-in-the-dark bug figures",
            label: "Glow Bugs",
            description: "The 3 glow-in-the-dark figures bring the habitat to life after dark",
          },
          {
            src: "/images/products/national-geographic-mega-bug-habitat/child-on-floor-looking-at-unboxed-parts.png",
            alt: "Child sitting on floor exploring the unboxed kit contents",
            label: "Unboxed",
            description: "Exploring all the tools before heading outside",
          },
          {
            src: "/images/products/national-geographic-mega-bug-habitat/unboxed-parts.png",
            alt: "All unboxed parts of the National Geographic Mega Bug Habitat laid out",
            label: "The Full Kit",
            description: "Every tool needed for a proper bug-catching expedition",
          },
          {
            src: "/images/products/national-geographic-mega-bug-habitat/whats-included-displayed.png",
            alt: "Kit contents displayed showing the habitat and accessories",
            label: "Kit Contents",
            description: "Habitat, catcher, net, tweezers, field guide and more",
          },
        ]}
        background="gray"
      />

      {/* white */}
      <ProductReviews productId={product.id} background="white" />

      {/* gray */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "What age is this best for?",
            answer:
              "The kit is designed for ages 4 and up. Younger children (4–6) will love the hands-on tools and the thrill of the catch, and may need a little help from a parent at first. Children 7 and older can typically run a full bug-catching session independently, from hunting to identifying to logging their find. The field guide and achievement stickers keep older kids engaged and coming back for more.",
          },
          {
            question: "Do we need to find real bugs, what if we can't catch anything?",
            answer:
              "Bugs are everywhere once you start looking, under rocks, in grass, near plant pots, in soil, and around lights at night. Most children catch something on their first try. The kit also includes 3 glow-in-the-dark bug figures for play on the days when the bugs aren't cooperating, so the habitat is always in use.",
          },
          {
            question: "Can bugs be kept in the habitat overnight?",
            answer:
              "The kit is designed for same-day observation and release. Bugs can survive for a few hours in the habitat but need their natural environment for food, water, and shelter. The learning guide encourages children to return bugs to where they were found after observation, which is also part of the lesson about treating living creatures with care.",
          },
          {
            question: "Can my child do this independently?",
            answer:
              "Yes, the tools are designed for child-safe, independent use. The bug catcher has a clear plastic bulb tip for safe handling, the net is lightweight, and the habitat lid latches securely. The field guide provides clear guidance on catching, observing, and identifying bugs. Younger children may enjoy having company for the adventure, but the kit is fully self-contained.",
          },
          {
            question: "Is it safe? Are there small parts to worry about?",
            answer:
              "The kit is designed for children from age 4 and uses durable, child-safe materials with no sharp edges or toxic components. There are no chemicals, batteries, or electrical components of any kind. The tools (tweezers, catcher, net) are proportioned for small hands. As with any outdoor play, normal supervision is recommended for the youngest children.",
          },
          {
            question: "How long does a typical session last?",
            answer:
              "A bug-catching session typically runs between 20 minutes and an hour, though many children spend much longer once they get going. The field guide and achievement sticker system extend engagement back indoors, children identify their catches, log them, and plan what to find next. Because the backyard changes with the seasons, the kit keeps producing new discoveries all year round.",
          },
          {
            question: "What do children actually get out of this?",
            answer:
              "Beyond the fun, children develop genuine observation skills, patience, and curiosity, the same mindset real field scientists use. Using the tools builds fine motor skills and hand-eye coordination. Matching bugs to the field guide introduces classification and non-fiction reading. And the catch-and-release ethos builds empathy for small living things. Most parents notice their child spending more time outside, asking more questions, and looking at the world a little differently.",
          },
        ]}
        background="gray"
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-mega-bug-habitat/whats-in-the-box.jpg"
        imageAlt="National Geographic Mega Bug Habitat contents laid out"
        items={[
          "Bug habitat, cylindrical clear housing with 360° view and removable base",
          "Easy-open lid with latches and two built-in magnifying glasses",
          "Scissor-style bug catcher with clear plastic bulb tip",
          "Net (for catching flying or fast-moving insects)",
          "Plastic tweezers (for gentle, precise handling)",
          "3 glow-in-the-dark bug figures",
          "Full-colour field guide with bug-catching achievement stickers",
          "Learning guide (facts about bugs, insects, spiders, and their habitats)",
          "Easy-to-follow instructions",
        ]}
        background="white"
      />

      {/* navy */}
      <CallToAction
        title="The Backyard Is Bigger Than You Think"
        subtitle="Real tools, real bugs, real discovery, all in one kit designed to get kids outside and curious."
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
      "Catch, observe, and identify real backyard bugs with dual magnifiers, a bug catcher, net, and tweezers. Field guide with stickers included. Ages 4+. No batteries needed.",
    alternates: {
      canonical: "/product/national-geographic-mega-bug-habitat",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
