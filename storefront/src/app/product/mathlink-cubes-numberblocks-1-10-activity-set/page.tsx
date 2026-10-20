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
  ProjectShowcase,
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "mathlink-cubes-numberblocks-1-10-activity-set";
const IMG = "/images/products/mathlink-cubes-numberblocks-1-10-activity-set";

export default async function MathLinkNumberblocksPage() {
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
        tagline="Build numbers you can see, stack and pull apart."
        highlights={[
          "100 MathLink Cubes that click together and twist apart",
          "30 hands-on maths activities on wipe-clean cards",
          "Build ten friendly number characters, One to Ten",
          "Ages 3+ · No batteries needed",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <FeatureGrid
        title="Numbers They Can Hold"
        columns={2}
        background="white"
        features={[
          {
            icon: "blocks",
            title: "Ten Number Characters to Build",
            description:
              "Each Numberblock is made of exactly as many cubes as its number, so One is a single cube and Ten is ten. Clip on the faceplates and pop a number on top. Four can turn into a square and Ten into a rocket.",
          },
          {
            icon: "puzzle",
            title: "30 Hands-On Activities",
            description:
              "Count, compare, share and take away, all with the cubes. Children see which Numberblocks can hide behind each other, follow colour patterns to Pattern Palace and use magic mirrors to double a number.",
          },
          {
            icon: "pencil",
            title: "Write-and-Wipe Cards",
            description:
              "The 15 double-sided cards are made for drawing on. Children match shapes to characters, fill in sums and draw groups of sheep, then wipe it all off and play again.",
          },
          {
            icon: "layers",
            title: "Two Colour-Coded Levels",
            description:
              "The red cards stick to numbers 1 to 5, so they're a good place for little ones to start. The orange cards cover 6 to 10, with bigger numbers, odds and evens, and pairs that make ten.",
          },
        ]}
      />

      {/* gray */}
      <ImageTextBlock
        image={`${IMG}/lifestyle-girl-holding-four-and-five.jpg`}
        imageAlt="Child holding Numberblocks Four and Five above an activity card"
        title="Maths They Can See"
        body="Every Numberblock is made of exactly that many blocks. Hold Four next to Five and it's obvious which is bigger. Pull Five apart and there's a Two and a Three inside. Children find this out by building it themselves, not by being told. Most of the time they'll just think they're playing."
        layout="image-right"
        background="gray"
      />

      {/* white */}
      <ProjectShowcase
        title="30 Fun Maths Activities"
        highlight="30 activities on 15 double-sided write-and-wipe cards"
        subtitle="Pick any card your child likes. Here are a few favourites."
        columns={3}
        background="white"
        projects={[
          {
            name: "Holes",
            description:
              "One falls off Five and down a sparkly hole. Keep going until nobody is left standing.",
            concepts: "Adding and taking away 1",
          },
          {
            name: "Stampolines",
            description:
              "Match each trampoline print to the Numberblock that made it, then draw a line to join them.",
            concepts: "Spotting amounts at a glance",
          },
          {
            name: "Blockzilla",
            description:
              "Blockzilla always wants the bigger number. Set up the characters so his mouth points the right way.",
            concepts: "Bigger, smaller, equal",
          },
          {
            name: "Fruit Salad",
            description:
              "Feed cube fruit through Three's fruit factory, share it out and write the sum.",
            concepts: "Splitting numbers up",
          },
          {
            name: "Counting Sheep",
            description:
              "Six has six sheep that won't settle. Split her into Threes, Twos and Ones to round them all up.",
            concepts: "Equal groups",
          },
          {
            name: "Odds and Evens",
            description:
              "Line the Numberblocks up two blocks wide and sort the flat tops from the ones with an odd block.",
            concepts: "Odd and even numbers",
          },
          {
            name: "Blast Off",
            description:
              "Count Ten the rocket down to lift-off, then find the pairs that make ten and send them home.",
            concepts: "Counting back, pairs to 10",
          },
          {
            name: "Numberblock Rally",
            description:
              "Ten's race car loses a block on every bump. Keep swapping drivers until One wins.",
            concepts: "Taking away",
          },
          {
            name: "The Legend of Big Tum",
            description:
              "Big Tum has swallowed a Numberblock. Work out which one is missing from the sum.",
            concepts: "Finding the missing number",
          },
        ]}
        moreText="Plus 21 more, from Hiccups and Flatland to The Wrong Number"
      />

      {/* gray */}
      <ImageTextBlock
        image={`${IMG}/lifestyle-girl-and-boy-playing-together.jpg`}
        imageAlt="Two children building Numberblocks Four and Five from MathLink Cubes on the Numberblock Express activity card"
        title="Already a Numberblocks Fan?"
        body="If your child watches Numberblocks on TV, they'll recognise every character in the box. Each activity links to an episode from Series 1 to 3, so they can watch the story and then play it out. In The Numberblock Express, Five falls off her train and only Five can stop it. On the card, your child teams up Two and Three, or Four and One, to make Five again and bring the train to a halt. New to the show? Every activity works with just the cubes and cards."
        layout="image-left"
        background="gray"
      />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=RthZr5YIQ00"
        title="See the Set in Action"
        background="white"
      />

      {/* gray */}
      <CustomerShowcase
        title="Numberblocks at Home"
        subtitle="Building, counting and writing sums"
        background="gray"
        images={[
          {
            src: `${IMG}/end-user-child-with-staircase-zero-to-ten.jpg`,
            alt: "Child beside Numberblocks Zero to Ten built from MathLink Cubes and lined up like a staircase",
            label: "Zero to Ten",
            description: "The whole gang, lined up as a staircase",
          },
          {
            src: `${IMG}/end-user-numberblocks-one-to-ten-lined-up.jpg`,
            alt: "Numberblocks Two to Ten built from MathLink Cubes and lined up in order on a table",
            label: "All in Order",
            description: "Two to Ten, each in their own shape",
          },
          {
            src: `${IMG}/end-user-numberblocks-on-activity-card.jpg`,
            alt: "Numberblocks One to Five built on top of an activity card",
            label: "On the Card",
            description: "Characters built right on top of an activity",
          },
          {
            src: `${IMG}/end-user-child-writing-sums.jpg`,
            alt: "Child writing sums in a notebook with Numberblocks Two and Four beside the page",
            label: "Sums Time",
            description: "Building a sum, then writing it down",
          },
          {
            src: `${IMG}/end-user-child-building-from-the-box.jpg`,
            alt: "Child building with MathLink Cubes next to the open Numberblocks box and sticker sheet",
            label: "Out of the Box",
            description: "Getting the characters ready for the first time",
          },
          {
            src: `${IMG}/end-user-child-playing-alongside-tablet.jpg`,
            alt: "Child building with MathLink Cubes at a table next to a tablet",
            label: "Playing Along",
            description: "Building alongside the Numberblocks on a tablet",
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
            question: "What age is this set for?",
            answer:
              "It's made for ages 3 and up. The red cards stay with numbers 1 to 5, which suits younger children. The orange cards go up to 10, so there's more to do as they get older. It has small parts, so it isn't suitable for children under 3.",
          },
          {
            question: "What is Numberblocks?",
            answer:
              "It's a children's TV series from the BBC's CBeebies channel, where every number is a character made of that many blocks. It was made with maths teaching experts from England's National Centre for Excellence in the Teaching of Mathematics, and won a BAFTA in 2019. This set lets your child build the characters for real.",
          },
          {
            question: "Do we need to watch the show?",
            answer:
              "No. Every activity works with just the cubes and cards. If you'd like to watch along, each card links to a named episode from Series 1 to 3, and episodes are free on the official Numberblocks YouTube channel.",
          },
          {
            question: "Does my child need help?",
            answer:
              "For the first few activities, yes. The guide is written for the grown-up. It tells you what to set out and gives you questions to ask as you play. Once the characters are built, children can happily stack, swap and count them on their own.",
          },
          {
            question: "Is there any setup?",
            answer:
              "A little, the first time. You'll put the stickers onto the faceplates, then build the characters from One to Ten using the Character Cards as a guide. After that, it's ready to go whenever they are.",
          },
          {
            question: "Is there anything else we need?",
            answer:
              "There are no batteries or apps. Some activities ask you to draw or write on the cards, so keep a whiteboard marker handy, as one isn't included. A couple of games also use a bag or a sheet of card to hide the blocks under.",
          },
          {
            question: "Will it keep them busy for long?",
            answer:
              "There are 30 activities, and the cards wipe clean so each one can be played again. The cubes also work with other MathLink Cube sets, and the characters can be rebuilt in new shapes long after the cards are done.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image={`${IMG}/whats-in-the-box.jpg`}
        imageAlt="MathLink Cubes Numberblocks 1-10 box with cubes, Numberlings, Character Cards and activity cards laid out"
        background="white"
        items={[
          "100 Numberblocks MathLink Cubes",
          "59 faceplates",
          "54 stickers",
          "11 Numberlings",
          "11 Character Cards, Zero to Ten",
          "15 double-sided write-and-wipe activity cards (30 activities)",
          "1 stand for Zero",
          "Multilingual activity guide",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Bring the Numberblocks Home"
        subtitle="Build One to Ten, then pick your first activity."
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
      "Build Numberblocks One to Ten from 100 MathLink Cubes and play 30 hands-on maths activities on wipe-clean cards. Maths you can hold, for ages 3+.",
    alternates: {
      canonical: "/product/mathlink-cubes-numberblocks-1-10-activity-set",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
