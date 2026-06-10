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

const PRODUCT_HANDLE = "nasa-moon-sand-activity-kit";

export default async function NasaMoonSandActivityKitPage() {
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
        tagline="Soft, moldable, officially NASA — explore the surface of the Moon without leaving the table."
        highlights={[
          "1.5 lbs (680g) of Moon Sand — non-sticky, holds its shape, never dries out",
          "Astronaut figure with embossed boots leaves real lunar footprints",
          "3 space molds, activity booklet, and learning guide included",
          "Ages 3+",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=tb7TYLsvwNg"
        title="See It in Action"
        background="white"
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/nasa-moon-sand-activity-kit/moon-sand-box-on-the-moon.jpg"
        imageAlt="NASA Moon Sand Activity Kit box against a lunar landscape backdrop"
        title="Sand That Doesn't Behave Like Sand"
        body="Pick it up and it holds its shape. Squeeze it and it molds to your hand. Press the astronaut figure's feet into it and you get perfect boot prints — just like the ones left on the actual lunar surface. This isn't playground sand or kinetic sand. It sticks only to itself, not to hands or clothes, and because it never dries out the kit is ready for the next mission whenever they are."
        layout="image-left"
        background="gray"
      />

      {/* white */}
      <FeatureGrid
        title="What Makes This Kit Special"
        columns={2}
        background="white"
        features={[
          {
            icon: "touch",
            title: "A Texture Like Nothing Else",
            description:
              "The Moon Sand holds its shape, sticks only to itself, and never dries out. It doesn't crumble like beach sand or clump like wet clay — it does something altogether different, and children can't stop squeezing it.",
          },
          {
            icon: "sparkles",
            title: "Real Lunar Footprints",
            description:
              "The astronaut figure has embossed moon boot soles. Press them into the sand and you get the same style of footprint left on the actual lunar surface. The detail is enough to make children stop and ask questions.",
          },
          {
            icon: "rocket",
            title: "Officially Licensed by NASA",
            description:
              "This is a genuine NASA-licensed product by Blue Marble Toys, winner of the Toy Association's Toy of the Year Award. The activity booklet and learning guide draw on authentic NASA information about the Moon, astronauts, and space exploration.",
          },
          {
            icon: "book",
            title: "Activity Booklet and Learning Guide",
            description:
              "The activity booklet provides structured play prompts; the learning guide covers Moon facts, astronaut history, and space exploration. Together they extend the play into real discovery — enough to keep a curious child asking questions long after the sand is put away.",
          },
        ]}
      />

      {/* gray */}
      <CustomerShowcase
        title="Moon Missions in Progress"
        subtitle="Children exploring the lunar surface from home"
        background="gray"
        images={[
          {
            src: "/images/products/nasa-moon-sand-activity-kit/boy-sitting-with-sand-box-in-front-of-him-holding-sand.jpg",
            alt: "Boy sitting with the NASA Moon Sand kit in front of him, holding moon sand",
            label: "Deep Focus",
            description: "Fully absorbed in the lunar surface",
          },
          {
            src: "/images/products/nasa-moon-sand-activity-kit/astronaut-with-foot-prints-on-sand.jpg",
            alt: "Astronaut figure leaving footprints in the moon sand",
            label: "One Small Step",
            description: "Embossed boots leave real lunar footprints",
          },
          {
            src: "/images/products/nasa-moon-sand-activity-kit/hand-holding-moon-sand-above-sand-box.jpg",
            alt: "Hand holding a ball of moon sand above the play tray",
            label: "Holds Its Shape",
            description: "It molds and holds — every time",
          },
          {
            src: "/images/products/nasa-moon-sand-activity-kit/sand-box-with-moulded-sands.jpg",
            alt: "Play tray filled with moon sand and shaped mold creations",
            label: "Lunar Landscape",
            description: "Planet, rocket, and astronaut molds at work",
          },
          {
            src: "/images/products/nasa-moon-sand-activity-kit/child-playing-with-sand.jpg",
            alt: "Child playing with the NASA Moon Sand activity kit",
            label: "Mission Time",
            description: "Open-ended play, every session different",
          },
          {
            src: "/images/products/nasa-moon-sand-activity-kit/hand-holding-stretchy-sand.jpg",
            alt: "Hand stretching and feeling the moon sand texture",
            label: "The Texture",
            description: "Soft, moldable, unlike anything else",
          },
          {
            src: "/images/products/nasa-moon-sand-activity-kit/hand-holding-astronaut.jpg",
            alt: "Child's hand holding the astronaut figure",
            label: "The Astronaut",
            description: "Ready to explore the lunar surface",
          },
          {
            src: "/images/products/nasa-moon-sand-activity-kit/sand-mould-creation.jpg",
            alt: "Moon sand shaped using the space molds",
            label: "Mold Play",
            description: "Three molds: planet, rocket, astronaut",
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
              "The kit is rated 3+ and works well across a wide age range. Younger children (3–5) focus on the sensory experience — squeezing, molding, and creating prints. Older children (6–8) tend to engage more with the activity booklet, the astronaut figure's storytelling possibilities, and the lunar science in the learning guide. The Good Play Guide tested it with 6–8 year olds and gave it 4 out of 5 for fun.",
          },
          {
            question: "Is it messy? Is cleanup easy?",
            answer:
              "One of the nicest things about Moon Sand is that it sticks only to itself — not to hands, clothes, or surfaces. It brushes off easily and the included play tray contains the sand during use. It's one of the least messy sensory activities you'll find. One child tester summed it up: 'I love the texture and it's not too messy.'",
          },
          {
            question: "Does the sand dry out?",
            answer:
              "No — Moon Sand never dries out. You can put it back in the tray, leave it for weeks, and it will be just as moldable when your child comes back to it. The only note: on first use, allow about an hour for the sand to settle and reach its best texture.",
          },
          {
            question: "How long does a play session last?",
            answer:
              "Play sessions typically run 20–60 minutes, though children often return to the sand repeatedly rather than in one long stretch. The open-ended nature means there's no fixed endpoint — new scenes, new missions, and new questions emerge each time. The sand's longevity means the kit stays playable for months.",
          },
          {
            question: "Does my child need adult help?",
            answer:
              "The kit is designed to be self-directed — children can set it up and play independently once the sand has had its initial settling hour. Adult supervision is recommended for children under 6, and the activity booklet and learning guide give adults an easy way to join in if they want to.",
          },
          {
            question: "Is it safe?",
            answer:
              "The Moon Sand is non-toxic and hypoallergenic. It is not suitable for children under 3 years due to small parts. This is an official NASA-licensed product by Blue Marble Toys, winner of the Toy Association's Toy of the Year Award.",
          },
          {
            question: "What does my child get out of it?",
            answer:
              "Play sessions with the Moon Sand are genuinely calming — the repetitive, tactile nature of molding and building has a well-documented soothing effect on children. Beyond the sensory experience, children encounter real science: the Moon's geology, the work of astronauts, and the history of space exploration through the learning guide. Most parents find their children asking more questions about the Moon and space after playing — and that curiosity is the real win.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/nasa-moon-sand-activity-kit/whats-in-the-box.jpg"
        imageAlt="NASA Moon Sand Activity Kit contents laid out"
        background="white"
        items={[
          "1.5 lbs (680g) of Moon Sand — non-toxic, hypoallergenic, never dries out",
          "Play tray",
          "Shovel / scoop",
          "Astronaut figure (with embossed moon boot soles)",
          "3 space-themed molds (planet, rocket, astronaut)",
          "NASA sticker",
          "Activity booklet",
          "Learning guide",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="The Moon Is Closer Than You Think"
        subtitle="Soft, moldable, officially NASA — ready for the next mission whenever they are."
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
      "Official NASA-licensed Moon Sand kit for ages 3+. Moldable, non-sticky sand with astronaut figure, 3 space molds, activity booklet, and learning guide.",
    alternates: {
      canonical: "/product/nasa-moon-sand-activity-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
