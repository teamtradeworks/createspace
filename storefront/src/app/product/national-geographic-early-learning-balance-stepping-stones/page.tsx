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

const PRODUCT_HANDLE = "national-geographic-early-learning-balance-stepping-stones";

export default async function NatGeoBalanceSteppingStonesPage() {
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
        tagline="Hop your way across a path of colourful stones, in the lounge or out on the lawn."
        highlights={[
          "7 non-slip stepping stones in 6 bright colours",
          "Spin the colour spinner, then jump to the matching stone",
          "Indoors or outdoors, with no batteries and no setup",
          "Ages 3 to 6",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=szaoLvxSp9Q"
        title="See the Stepping Stones in Action"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes These Stones Special"
        columns={2}
        background="gray"
        features={[
          {
            icon: "shield",
            title: "Non-Slip Base",
            description:
              "Each stone has a rubber base that grips the floor, so it stays put when little feet land on it. The top has a bumpy, rock-like texture for extra grip.",
          },
          {
            icon: "running",
            title: "Built for Jumping",
            description:
              "The stones are made from tough, hard plastic, and each one holds up to 68 kg. They're about 21.5 cm across, which is plenty of room for a small foot to land on.",
          },
          {
            icon: "sun",
            title: "Inside or Outside",
            description:
              "Set up a path down the passage on a rainy day, or take the stones out onto the grass when the sun comes out.",
          },
          {
            icon: "layers",
            title: "Stacks Away Neatly",
            description:
              "When playtime is over, the stones stack into a neat pile. Take them to the park, to granny's house or to playschool.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/national-geographic-early-learning-balance-stepping-stones/kids-playing-spinner-game-on-grass.jpg"
        imageAlt="Smiling boy stepping onto a yellow stone on the grass while two friends wait their turn and a hand holds up the colour spinner"
        title="Rainy Day or Sunny Day"
        body="On a wet afternoon, lay a path across the lounge rug and let them hop off some energy. When the weather clears, carry the stones outside and set up a bigger course on the grass. The rubber base keeps them steady on both."
        layout="image-left"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="Ways to Play"
        columns={2}
        background="gray"
        features={[
          {
            icon: "dice",
            title: "The Spinner Game",
            description:
              "Lay out the stones, spin the dial and jump to whichever colour it lands on. Every spin is a new challenge, and little ones practise their colour names as they go.",
          },
          {
            icon: "sparkles",
            title: "The Floor Is Lava",
            description:
              "Scatter the stones around the room and cross from one side to the other without touching the floor. Add a pretend lava monster to make it more dramatic.",
          },
          {
            icon: "puzzle",
            title: "Obstacle Courses",
            description:
              "Mix the stones in with cushions to step over and a table to crawl under. Kids can design their own course, then you have a go at it too.",
          },
          {
            icon: "smile",
            title: "Make It Trickier",
            description:
              "Push the stones further apart, curve the path, or see who can stand on one foot on a stone the longest. The same set stays a challenge as your child gets steadier.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/national-geographic-early-learning-balance-stepping-stones/shoe-landing-on-purple-stepping-stone.jpg"
        imageAlt="Child's sneaker landing on a purple stepping stone on a wooden floor, with a green stone behind"
        title="Steady Feet, Big Grins"
        body="At first there's a fair bit of wobbling. Then one day they land on a stone, hold still and look up to check you saw it. Each time they make it across, they'll want the stones a little further apart."
        layout="image-right"
        background="white"
      />

      {/* gray */}
      <CustomerShowcase
        title="Hopping Around at Home"
        background="gray"
        images={[
          {
            src: "/images/products/national-geographic-early-learning-balance-stepping-stones/bare-feet-on-stones-with-spinner.jpg",
            alt: "Child's bare foot on an orange stepping stone next to the colour spinner on a carpet",
          },
          {
            src: "/images/products/national-geographic-early-learning-balance-stepping-stones/toddlers-playing-on-stones-indoors.jpg",
            alt: "Two toddlers stepping between colourful stones on a living room rug",
          },
          {
            src: "/images/products/national-geographic-early-learning-balance-stepping-stones/boy-jumping-between-stones-in-park.jpg",
            alt: "Boy in a red T-shirt leaping between stepping stones on the grass in a park",
          },
          {
            src: "/images/products/national-geographic-early-learning-balance-stepping-stones/stepping-stone-path-on-grass.jpg",
            alt: "A path of six coloured stepping stones on grass with a bare foot stepping onto the orange stone",
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
              "The stones are made for ages 3 and up, and they're best for kids from about 3 to 6. Toddlers can start with the stones close together and walk across. Older kids can space them out and jump.",
          },
          {
            question: "Is it safe?",
            answer:
              "Each stone has a non-slip rubber base and a textured top to help stop slipping, and each one holds up to 68 kg. As with any jumping game, keep an eye on young children, and check that the stones grip well on your floor before play starts.",
          },
          {
            question: "Can we use them outside?",
            answer:
              "Yes. The stones are made for indoor and outdoor play, so they work on tiles, wooden floors and grass.",
          },
          {
            question: "Is there any setup?",
            answer:
              "None at all. Take the stones out of the box, lay them on the floor and start playing. There's nothing to build and no batteries to find.",
          },
          {
            question: "How do you play the spinner game?",
            answer:
              "Set the stones out in a pattern, spin the dial and jump to the stone that matches the colour. The instructions in the box explain the game, and kids soon start making up their own rules.",
          },
          {
            question: "Will they keep playing with it?",
            answer:
              "There's no set way to play, so the game changes every time. Kids can rearrange the path, invent new games, or use the stones as islands for their toy animals. When they're done, the stones stack away.",
          },
          {
            question: "What will my child get out of it?",
            answer:
              "Mostly lots of active, screen-free fun. Along the way they get steadier on their feet and better at judging how far to jump. And there's real pride in making it all the way across without wobbling off.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-early-learning-balance-stepping-stones/whats-in-the-box.jpg"
        imageAlt="The 7 National Geographic stepping stones: two blue, plus orange, green, purple, red and yellow"
        background="white"
        items={[
          "7 non-slip stepping stones in 6 colours",
          "Colour spinner",
          "Game instructions",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Ready, Steady, Hop"
        subtitle="Seven non-slip stones and a colour spinner for screen-free active play, indoors or out."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse More Toys"
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
      "7 non-slip National Geographic stepping stones and a colour spinner game for active, screen-free play indoors or out. Ages 3 to 6.",
    alternates: {
      canonical: "/product/national-geographic-early-learning-balance-stepping-stones",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
