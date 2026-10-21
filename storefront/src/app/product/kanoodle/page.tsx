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

const PRODUCT_HANDLE = "kanoodle";

export default async function KanoodlePage() {
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
        tagline="Twelve pieces, one board and only one way to fill it."
        highlights={[
          "228 puzzles, from quick wins to real head-scratchers",
          "Two ways to play: flat puzzles and 3D pyramids",
          "Ages 7 to adult · No batteries, no screens",
          "Pocket-size case that doubles as the game board",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=UG-oIcEhxAo"
        title="See How Kanoodle Works"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="Why Kanoodle Is So Hard to Put Down"
        columns={2}
        background="gray"
        features={[
          {
            icon: "puzzle",
            title: "228 Puzzles in Your Pocket",
            description:
              "Pick a puzzle from the book, place the pieces shown in the picture, then work out where the rest go. The early levels are quick wins for 7-year-olds. By Genius level, grown-ups are scratching their heads too.",
          },
          {
            icon: "layers",
            title: "Flat Puzzles and 3D Pyramids",
            description:
              "Solve the flat puzzles on the board inside the case. Then flip it over and stack the same 12 pieces into a five-layer pyramid on the lid. The pyramids are a good deal harder, so save them for when the flat ones start to feel easy.",
          },
          {
            icon: "octagon-check",
            title: "Only One Answer Fits",
            description:
              "There are hundreds of ways to try the pieces, but only one fills every last space. So it's a proper puzzle: turn a piece, flip it, try another, until it all clicks into place.",
          },
          {
            icon: "users",
            title: "Kids and Adults Both Get Hooked",
            description:
              "Puzzles start at easy and go up to Genius, so a 7-year-old and a parent can each find a level that suits them. Once you've done the book, try making up your own puzzles for someone else to solve.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/kanoodle/lifestyle-girl-playing-with-kanoodle.jpg"
        imageAlt="Smiling girl fitting colourful Kanoodle pieces into the board"
        title="Sounds Simple. Then It Gets Tricky."
        body="Each puzzle in the book shows where to put some of the pieces. Your child sets those up, then tries to squeeze the rest into the gaps that are left. The first ones are easy, with just one piece to place. Further into the book, more of the board is empty and there are more pieces left over. They'll rotate a piece, flip it, try it somewhere else and suddenly see where it goes. That's the moment that has them turning to the next page."
        layout="image-right"
        background="white"
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/kanoodle/lifestyle-boy-playing-with-kanoodle.jpg"
        imageAlt="Boy playing Kanoodle at a table with the puzzle book beside him"
        title="Kanoodle Anywhere"
        body="All 12 pieces pack into a pocket-size case, and the case is the game board. Throw it in a school bag, the car or a handbag for long drives, flights, waiting rooms and restaurants. There's nothing to charge and no screen, just a puzzle book and a handful of pieces."
        layout="image-left"
        background="gray"
      />

      {/* white */}
      <CustomerShowcase
        title="Kanoodle in Real Life"
        subtitle="At the kitchen table, on the couch and out for dinner"
        background="white"
        images={[
          {
            src: "/images/products/kanoodle/end-user-boy-playing-with-kanoodle-at-restaurant-table.jpg",
            alt: "Boy solving a Kanoodle puzzle at a restaurant table with the puzzle book open",
            label: "Dinner Out",
            description: "Something to do while you wait for the food",
          },
          {
            src: "/images/products/kanoodle/end-user-child-playing-with-kanoodle-on-lap.jpg",
            alt: "Child fitting the last Kanoodle pieces into the case on their lap",
            label: "On the Couch",
            description: "The case sits on a lap, no table needed",
          },
          {
            src: "/images/products/kanoodle/end-user-pieces-built-into-pyramid.jpg",
            alt: "Kanoodle pieces stacked into a finished pyramid on top of the case",
            label: "Pyramid Done",
            description: "A finished 3D pyramid on the lid of the case",
          },
          {
            src: "/images/products/kanoodle/end-user-kanoodle-with-open-booklet.jpg",
            alt: "Solved Kanoodle board below the open puzzle book at Level 3",
            label: "Level 3",
            description: "Puzzle solved, on to the next one",
          },
          {
            src: "/images/products/kanoodle/end-user-image-of-booklet.jpg",
            alt: "Open Kanoodle puzzle book showing Level 1 puzzles",
            label: "The Book",
            description: "Colour-coded pictures show where each piece starts",
          },
          {
            src: "/images/products/kanoodle/end-user-image-showing-kanoodle-pieces.jpg",
            alt: "Completed flat Kanoodle puzzle filling the whole board",
            label: "Every Space Filled",
            description: "All 12 pieces in, not a gap left",
          },
          {
            src: "/images/products/kanoodle/end-user-close-up-of-pieces.jpg",
            alt: "Close-up of colourful Kanoodle puzzle pieces piled in the case",
            label: "The Pieces",
            description: "Twelve pieces, each a different shape and colour",
          },
        ]}
      />

      {/* gray */}
      <ProductReviews productId={product.id} background="gray" />

      {/* white */}
      <ProductFAQ
        title="Common Questions"
        background="white"
        faqs={[
          {
            question: "What age is Kanoodle best for?",
            answer:
              "It's made for ages 7 to adult. The first levels are easy enough for young kids, and the top levels and the 3D pyramids challenge adults. It has small parts, so it isn't suitable for children under 3.",
          },
          {
            question: "How do you play?",
            answer:
              "Choose a puzzle from the book. The picture shows where to put some of the pieces, so set those up first and don't move them. Then use the pieces that are left to fill every empty space on the board. Each puzzle has only one solution.",
          },
          {
            question: "Will it be too easy, or too hard?",
            answer:
              "Probably neither for long. The levels run from easy (Pro) up to Genius, and every new level leaves more of the board empty. Start with the flat puzzles, then move to the pyramids once the flat ones feel easy.",
          },
          {
            question: "Does my child need help?",
            answer:
              "Not usually. Once they've seen how the first puzzle works, the colour-coded pictures make it easy to set up the rest on their own. It's a solo game, but you might find yourself borrowing it.",
          },
          {
            question: "Does it need batteries or a screen?",
            answer:
              "No. There are no batteries, apps or screens. Open the case, pick a puzzle and start.",
          },
          {
            question: "Are the pieces easy to lose?",
            answer:
              "They're small, so it's worth packing them back into the case when you're done. All 12 fit inside, so there's one place to look for them.",
          },
          {
            question: "What happens when we've finished all the puzzles?",
            answer:
              "Go back and try them faster, or make up your own puzzles and challenge someone else to solve them. If it's become a favourite, Kanoodle Genius has a harder set of puzzles.",
          },
        ]}
      />

      {/* gray */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/kanoodle/whats-in-the-box.jpg"
        imageAlt="Kanoodle box beside the open case with coloured puzzle pieces"
        background="gray"
        items={[
          "12 Kanoodle puzzle pieces",
          "Illustrated puzzle book with 228 puzzles",
          "Pocket-size carrying case with built-in boards for flat and pyramid puzzles",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Can You Kanoodle?"
        subtitle="Start with puzzle one and see how far you get."
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
      "Fill the board with 12 colourful pieces. 228 flat and 3D pyramid puzzles in a pocket-size case. A screen-free brain teaser for ages 7 to adult.",
    alternates: {
      canonical: "/product/kanoodle",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
