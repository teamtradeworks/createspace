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
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "gears-gears-gears-deluxe-building-set-set-of-100";
const IMAGE_DIR = `/images/products/${PRODUCT_HANDLE}`;

export default async function GearsDeluxeBuildingSetPage() {
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
        tagline="Snap the gears together, turn the crank and watch the whole build spin."
        highlights={[
          "100 chunky pieces: 46 gears plus pillars, axles, bases and a crank",
          "Build flat, build tall or build sideways, and it all still turns",
          "Activity guide with starter builds and two simple gear experiments",
          "No batteries or screens. Ages 3–8",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=hfd3IRL8NUY"
        title="See the Gears in Action"
        background="white"
      />

      {/* gray */}
      <ImageTextBlock
        image={`${IMAGE_DIR}/boy-smiling-with-gear-towers.jpg`}
        imageAlt="Smiling boy building towers of colourful gears on green interlocking bases"
        title="From Flat Base to Spinning Tower"
        body="The activity guide starts small. Your child clicks the bases together and pops gears onto the pegs, then adds pillars and six-way axles to build upwards and out to the side. Every step ends with something that spins. Put the crank on, give it a turn, and the whole build moves at once. If one gear sits still, they get to work out why (usually its teeth aren't quite touching the next gear) and fix it."
        layout="image-left"
        background="gray"
      />

      {/* white */}
      <FeatureGrid
        title="How the Gears Work"
        columns={2}
        background="white"
        features={[
          {
            icon: "refresh-cw",
            title: "One Turn Moves the Lot",
            description:
              "The gears pop onto pegs on the bases and spin freely. Line them up so their teeth touch, and turning one gear turns the next, and the next. The crank drives the whole chain, so even a long row of gears moves together.",
          },
          {
            icon: "layers",
            title: "Build Up, Out and Around Corners",
            description:
              "Square pillars and six-way axles take builds upwards and sideways. A gear on a tower meets the gear below it at a right angle, so the spin turns a corner and climbs. Your child sees for themselves how motion travels through a machine.",
          },
          {
            icon: "lightbulb",
            title: "Two Gear Experiments to Try",
            description:
              "The activity guide asks two simple questions. Do two gears side by side spin the same way? Spin the first gear in a long row slowly: does the last one start moving straight away? Your child guesses first, then tests it.",
          },
          {
            icon: "math",
            title: "Counting, Sorting and Patterns",
            description:
              "Six gear colours make it easy to sort, count and build patterns while playing. Pushing gears onto pegs and joining the bases also gives small fingers a good workout, useful practice for holding a pencil later on.",
          },
        ]}
      />

      {/* gray */}
      <ImageTextBlock
        image={`${IMAGE_DIR}/girl-and-boy-building-gear-towers.jpg`}
        imageAlt="A girl and a boy building colourful gear towers together"
        title="Made for Classrooms, Great at Home"
        body="Learning Resources has made Gears! Gears! Gears! since 1994, and you'll find it in preschool and school classrooms around the world. The chunky plastic pieces are made for daily use by lots of little hands. With 100 pieces there's enough for up to four children to build together, each starting their own tower before linking them up with a row of gears."
        layout="image-right"
        background="gray"
      />

      {/* white */}
      <ProductReviews productId={product.id} background="white" />

      {/* gray */}
      <ProductFAQ
        title="Common Questions"
        background="gray"
        faqs={[
          {
            question: "What age is this set best for?",
            answer:
              "It's made for ages 3 to 8. Three-year-olds usually start by filling the bases with gears and turning the crank, while older children build tall towers and bigger machines. Because it's open-ended, the set grows with your child through those years. It has small parts, so it isn't suitable for children under 3.",
          },
          {
            question: "Will my child need my help?",
            answer:
              "Not much. Most young children can pop gears onto the pegs and turn the crank on their own straight away. Joining and pulling apart the bases is the stiffest part, so you might help with that at first. The activity guide is short and picture-led, and after that it's free building.",
          },
          {
            question: "Do I need anything else?",
            answer:
              "No. There are no batteries, tools, apps or screens. Everything your child needs to build is in the box.",
          },
          {
            question: "What will my child learn?",
            answer:
              "How gears pass movement from one to the next, why neighbouring gears turn opposite ways, and how a crank can drive a whole machine. Along the way they practise counting, sorting by colour, building patterns and fine motor control. Building also exercises spatial thinking: research with three-year-olds has found that children who are better at copying block models also tend to do better at early maths, like counting.",
          },
          {
            question: "Is it safe?",
            answer:
              "Yes, for children aged 3 and up. The pieces are made from sturdy plastic and the set meets the US CPSIA toy safety standard. It contains small parts, so keep it away from babies and toddlers under 3.",
          },
          {
            question: "Can I add more gears later?",
            answer:
              "Yes. This set works with every other Gears! Gears! Gears! set from Learning Resources, including the 150-piece Super Building Set and themed sets with motors, monkeys and cranes. Adding a set means bigger machines and more children building at once.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image={`${IMAGE_DIR}/whats-in-the-box.jpg`}
        imageAlt="Gears! Gears! Gears! Deluxe Building Set box with gears, pillars, axles, bases and crank laid out"
        background="white"
        items={[
          "46 gears in six colours: red, orange, yellow, green, blue and purple",
          "26 square pillars",
          "21 six-way axles",
          "6 interlocking bases",
          "1 crank handle",
          "Activity guide",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Get the Gears Turning"
        subtitle="100 pieces, one crank and no batteries needed."
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
      "100 chunky pieces to build gear machines that spin with one turn of the crank. Activity guide included, no batteries or screens. For ages 3–8.",
    alternates: {
      canonical: "/product/gears-gears-gears-deluxe-building-set-set-of-100",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
