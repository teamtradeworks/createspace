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

const PRODUCT_HANDLE = "code-go-robot-mouse-activity-set";
const IMG = "/images/products/code-go-robot-mouse-activity-set";

export default async function CodeGoRobotMousePage() {
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
        tagline="Build a maze, plan the route and send Colby racing to the cheese."
        highlights={[
          "20 maze challenges, plus endless mazes of your own",
          "Colby lights up, squeaks and has two speeds",
          "Made for ages 4 to 8 · No screens or apps",
          "Colour-matched buttons and cards, easy for pre-readers",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <FeatureGrid
        title="Why Kids Love Colby"
        columns={2}
        background="white"
        features={[
          {
            icon: "map",
            title: "Build Your Maze",
            description:
              "Snap the 16 green squares together into a board about 50 cm across, then slot in walls and tunnels. Pick one of the activity cards to copy, or make up a layout of your own. Every maze ends the same way: Colby needs to reach the cheese.",
          },
          {
            icon: "puzzle",
            title: "Plan It With Cards",
            description:
              "Each coding card shows one move: forward, back, turn left, turn right or a surprise action. Kids lay the cards out in a row to map Colby's route before pressing a single button. The colours match the buttons on Colby's back, so even kids who can't read yet can follow along.",
          },
          {
            icon: "zap",
            title: "Press Go and Watch",
            description:
              "Tap in the moves, press the green button and Colby sets off, one square at a time. The red action button adds a random surprise: a little wiggle, a loud squeak, or a chirp with flashing eyes.",
          },
          {
            icon: "target",
            title: "Missed the Cheese? Try Again",
            description:
              "If Colby turns the wrong way, kids check their row of cards, spot the move that went wrong and fix it. Clearing his memory takes one press, so a fresh try is only seconds away.",
          },
        ]}
      />

      {/* gray */}
      <ImageTextBlock
        image={`${IMG}/lifestyle-close-up-of-mouse-on-track.jpg`}
        imageAlt="Close-up of Colby the robot mouse on the maze board, next to an orange tunnel and the cheese wedge"
        imageObjectPosition="center 30%"
        title="Will He Make It?"
        body="The first maze is just a straight hallway: two steps forward and Colby's at the cheese. From there the cards add turns, then squares where he has to do his action trick, then tunnels he has to pass under on the way. Each of the 20 mazes is a little puzzle to work out before pressing go. Then comes the best part, watching him trundle along and hoping you counted right."
        layout="image-right"
        background="gray"
      />

      {/* white */}
      <ImageTextBlock
        image={`${IMG}/lifestyle-girl-and-boy-playing-together-in-classroom.jpg`}
        imageAlt="Two children at a table with the maze board, one holding up an activity card"
        title="Make a Maze for Someone Else"
        body="Once the activity cards are done, the walls and tunnels are theirs to rearrange. Kids love building a tricky maze and challenging a sibling, a friend or a parent to get Colby through it. Switch him to his faster speed and he can also roam on the floor or a table, so a maze can be made out of books and blocks too."
        layout="image-left"
        background="white"
      />

      {/* gray */}
      <CustomerShowcase
        title="Colby at Home and in Class"
        subtitle="On the floor, at the table and in the classroom"
        background="gray"
        images={[
          {
            src: `${IMG}/end-user-mouse-on-board-child-holding-card.jpg`,
            alt: "Child lining up arrow coding cards beside a maze with Colby and the cheese",
            label: "Planning the Route",
            description: "One card for every move",
          },
          {
            src: `${IMG}/end-user-girl-laying-out-cards-next-to-board.jpg`,
            alt: "Girl laying a row of coding cards along the edge of the maze board",
            label: "Checking the Code",
            description: "Reading the row of cards before pressing go",
          },
          {
            src: `${IMG}/end-user-three-kids-playing-together.jpg`,
            alt: "Three children on the floor building a maze together while one holds Colby",
            label: "Team Build",
            description: "Building the maze together",
          },
          {
            src: `${IMG}/end-user-top-view-mouse-on-board.jpg`,
            alt: "Colby the robot mouse inside a maze with orange tunnels and purple walls",
            label: "Through the Tunnels",
            description: "Tunnels Colby has to pass under",
          },
          {
            src: `${IMG}/end-user-boy-playing-on-floor-with-mouse.jpg`,
            alt: "Child sorting coding cards on the floor next to a custom-shaped maze",
            label: "Floor Play",
            description: "A maze in any shape you like",
          },
          {
            src: `${IMG}/end-user-kids-in-class-playing-one-writing.jpg`,
            alt: "Two children at a classroom table, one programming Colby while the other writes",
            label: "In the Classroom",
            description: "One programs, one writes down the moves",
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
            question: "What age is it best for?",
            answer:
              "It's made for ages 4 to 8. Four-year-olds can start with the simplest mazes, and the later cards have enough walls and tunnels to keep older kids thinking. It has small parts, so it isn't suitable for children under 3.",
          },
          {
            question: "Does my child need to read or know anything about coding?",
            answer:
              "No. Each button on Colby is a different colour, and each coding card matches one of them, so kids find the move by colour. The first maze only needs the forward button.",
          },
          {
            question: "Will they need my help?",
            answer:
              "Probably at first. Sit with them for the first few mazes while they learn what each button does and how to count the squares. Once the colours click, most kids are happy to carry on by themselves.",
          },
          {
            question: "Does it need batteries or a screen?",
            answer:
              "There's no screen, app or device. Colby runs on 3 AAA batteries, which aren't included, and you'll need a small Phillips screwdriver to open the battery cover.",
          },
          {
            question: "What happens after the 20 mazes?",
            answer:
              "Kids can build their own mazes from the walls and tunnels, set challenges for each other, or take Colby off the board and onto the floor. For two players, Jack, a second robot mouse, is sold separately.",
          },
          {
            question: "Is it easy to set up?",
            answer:
              "Yes. The board squares clip together and the walls slot into the gaps between them. Each activity card shows where the walls, tunnels, cheese and Colby go, so setting up a maze takes a few minutes.",
          },
          {
            question: "Any tips for keeping Colby working well?",
            answer:
              "Use him on a smooth, hard surface and set him squarely on a square before he starts. Don't push him along by hand, because that can damage his wheels. If he drifts off course or stops turning fully, it's usually time for new batteries.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        background="white"
        items={[
          "Colby, the robot mouse",
          "16 maze grid squares that join into one big board",
          "22 maze walls",
          "3 tunnels",
          "1 cheese wedge",
          "30 double-sided coding cards",
          "10 double-sided activity cards with 20 mazes",
          "Activity guide",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Ready, Set, Squeak!"
        subtitle="Build the first maze and see if Colby finds the cheese."
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
      "Build a maze, lay out the coding cards and send Colby the robot mouse to the cheese. 20 maze challenges, no screens. For ages 4 to 8.",
    alternates: {
      canonical: "/product/code-go-robot-mouse-activity-set",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
