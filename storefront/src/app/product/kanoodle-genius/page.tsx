import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  FeatureGrid,
  ImageTextBlock,
  VideoEmbed,
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "kanoodle-genius";

export default async function KanoodleGeniusPage() {
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
        tagline="Fit the pieces onto the board. It sounds easy until you try it."
        highlights={[
          "204 puzzles, from flat 2D boards to 3D pyramids",
          "Ages 8 to 108, and hard enough to stump the grown-ups",
          "The case is the board, so it fits in a bag",
          "One player, no batteries, no screens",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=4I7Pjh91pJI"
        title="See Kanoodle Genius in Action"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="Kanoodle, Turned Up a Notch"
        columns={2}
        background="gray"
        features={[
          {
            icon: "puzzle",
            title: "For Kids Who've Cracked the Original",
            description:
              "Kanoodle Genius picks up where the original Kanoodle gets tricky. The further into the book you go, the fewer pieces the puzzle gives you to start with, so there's more left for you to figure out.",
          },
          {
            icon: "layers",
            title: "Flat Puzzles, Then Pyramids",
            description:
              "The first puzzles are flat: fill every hole on the board. After that come the 3D puzzles, where you stack the pieces into a pyramid. Most people warm up on the flat ones first.",
          },
          {
            icon: "/images/icons/box-open.svg",
            title: "Goes Wherever You Go",
            description:
              "The little clamshell case opens up into the board, and the pieces and puzzle book pack away inside it. Throw it in a school bag for car trips or a long flight.",
          },
          {
            icon: "users",
            title: "Hard for Grown-Ups Too",
            description:
              "The box says ages 8 to 108, and it means it. Grown-ups who pick it up to help can end up just as stuck, so don't be surprised if it gets passed around the house.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/kanoodle-genius/lifestyle-man-playing-on-rug.jpg"
        imageAlt="Man lying on a rug working on a Kanoodle Genius puzzle, holding the puzzle book in one hand and a piece in the other"
        title="Three Steps, Then the Thinking Starts"
        body="Pick a puzzle from the book, place the starting pieces exactly as shown, then fill the rest of the board with the pieces you have left. The first few pieces usually drop in easily. Then one won't fit anywhere, so you turn it over, take two others out and try again. Eventually the last piece clicks into place, and there are still a couple of hundred more to go."
        layout="image-right"
        background="white"
      />

      {/* gray */}
      <CustomerShowcase
        title="Kanoodle Genius at Home"
        subtitle="Photos from families playing the previous edition of the game"
        background="gray"
        images={[
          {
            src: "/images/products/kanoodle-genius/end-user-pieces-filling-board.jpg",
            alt: "Kanoodle Genius case open with every coloured piece fitted onto the board",
            label: "Solved",
            description: "Every hole on the board filled",
          },
          {
            src: "/images/products/kanoodle-genius/end-user-pyramid-puzzle-page.jpg",
            alt: "Pink Kanoodle piece resting on a page of 3D pyramid puzzles with handwritten notes",
            label: "Pyramid Page",
            description: "Working through the 3D puzzles, pencil notes and all",
          },
          {
            src: "/images/products/kanoodle-genius/end-user-puzzle-book-open.jpg",
            alt: "Kanoodle Genius puzzle book open at a page of numbered 2D puzzles",
            label: "Puzzle Book",
            description: "Each puzzle shows where the starting pieces go",
          },
          {
            src: "/images/products/kanoodle-genius/end-user-pyramid-on-case.jpg",
            alt: "Kanoodle Genius pieces stacked into a 3D pyramid on top of the closed case",
            label: "3D Pyramid",
            description: "A finished pyramid on top of the case",
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
            question: "What age is Kanoodle Genius best for?",
            answer:
              "It's made for ages 8 and up, and the box says 8 to 108. It's the harder follow-up to the original Kanoodle, so a child who's new to these puzzles might find the original a gentler place to start. The pieces are small, so keep it away from children under 3.",
          },
          {
            question: "How hard is it?",
            answer:
              "Properly hard, especially later in the book. The early flat puzzles make a good warm-up. As the levels go up you get fewer starting pieces, and the 3D pyramid puzzles are the toughest of the lot.",
          },
          {
            question: "How do you play?",
            answer:
              "Choose a puzzle from the book and set up the board to match the picture. Then fit the rest of the pieces in until there are no gaps. For the 3D puzzles, you do the same thing but build up into a pyramid.",
          },
          {
            question: "Can my child play on their own?",
            answer:
              "Yes. It's a one-player game, so it works well for quiet time or a long car trip. Families can also take turns trying the same puzzle to see who cracks it first.",
          },
          {
            question: "Does it need batteries or a screen?",
            answer:
              "No. It's plastic pieces, a puzzle book and a case that doubles as the board. There's nothing to charge, and nothing to download.",
          },
          {
            question: "Why do some listings say 202 puzzles?",
            answer:
              "Kanoodle Genius has been updated. The older edition had 202 puzzles, and the current one, which is the one we stock, has 204. You still get the same 7 puzzle pieces.",
          },
          {
            question: "What will my child get out of it?",
            answer:
              "Mostly the satisfaction of beating a puzzle that had them stuck. Along the way they get plenty of practice picturing how a shape looks when it's turned or flipped, and in sticking with something until it works.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/kanoodle-genius/whats-in-the-box.jpg"
        imageAlt="Kanoodle Genius box beside the open case with coloured pieces on the board and loose pieces in front"
        background="white"
        items={[
          "7 puzzle pieces",
          "Puzzle book with 204 2D and 3D puzzles",
          "Carry case that doubles as the game board",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Up for a Real Brain Teaser?"
        subtitle="204 puzzles in a case small enough for a school bag. For ages 8 and up."
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
      "The step up from Kanoodle: 7 pieces and 204 puzzles, from flat 2D boards to 3D pyramids, in a travel case. Screen-free, one player, ages 8+.",
    alternates: {
      canonical: "/product/kanoodle-genius",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
