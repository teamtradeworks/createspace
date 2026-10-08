import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  FeatureGrid,
  QuickInfoBadges,
  WhatsIncluded,
  ImageTextBlock,
  ProductFAQ,
  VideoEmbed,
  Specifications,
  ProductReviews,
  ProjectShowcase,
  CustomerShowcase,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "bbc-micro-bit-go";

export default async function MicrobitGoPage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    notFound();
  }

  const resolvedAddons = await resolveAddonsForHandle(PRODUCT_HANDLE);
  const addons = serializeAddons(resolvedAddons);

  return (
    <ProductTrackingProvider handle={PRODUCT_HANDLE}>
      <ProductJsonLd product={product} />

      {/* Hero Section */}
      <HeroSection
        product={product}
        tagline="A pocket-sized computer kids can code on day one"
        highlights={[
          "Board, cable, batteries and battery holder in the box",
          "Code in your web browser, with nothing to install",
          "Sensors, a speaker and an LED display built into the board",
          "Used in primary and high school classrooms around the world",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Video Section */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=u2u7UJSRuko"
        title="Meet the micro:bit"
        background="white"
      />

      {/* What Is micro:bit Section */}
      <ImageTextBlock
        image="/images/products/bbc-micro-bit-go/blocks-coding-example-in-makecode.png"
        imageAlt="MakeCode block-based coding interface showing a micro:bit program"
        title="A Pocket-Sized Programmable Computer"
        body="The BBC micro:bit V2 is a small computer (roughly credit-card sized) made for learning to code. On the board you'll find a 25-LED display, a speaker, a microphone, an accelerometer, a compass, a temperature sensor and wireless radio. Kids program it in a web browser with Microsoft MakeCode, snapping drag-and-drop blocks together, so there's no software to install. The Go bundle adds a USB cable, a battery holder and batteries, which means you can plug in and write your first program the day it arrives."
        layout="image-left"
        background="gray"
      />

      {/* Features Grid */}
      <FeatureGrid
        title="Key Features"
        subtitle="All of this is on the board itself, so you don't need extra parts for your first projects."
        features={[
          {
            icon: "lightbulb",
            title: "25 LED Display",
            description:
              "Scroll text, show numbers or draw little pictures. The LEDs can also sense light",
          },
          {
            icon: "music",
            title: "Built-in Speaker",
            description:
              "Play sounds, tunes and even speech without plugging anything in",
          },
          {
            icon: "microphone",
            title: "Microphone",
            description:
              "Make projects that react to a clap, a shout or a whisper",
          },
          {
            icon: "running",
            title: "Motion Sensors",
            description: "The accelerometer and compass know when it's tilted, shaken or pointed a new direction",
          },
          {
            icon: "touch",
            title: "Touch Sensitive Logo",
            description: "Tap the gold logo on the front to start a program or trigger a reaction",
          },
          {
            icon: "bluetooth",
            title: "Wireless Communication",
            description: "Radio and Bluetooth let micro:bits send messages to each other and to phones",
          },
        ]}
        columns={3}
        background="white"
      />

      {/* Learn Together Section */}
      <ImageTextBlock
        image="/images/products/bbc-micro-bit-go/kids-holding-microbits.jpg"
        imageAlt="Two children holding micro:bit boards and smiling"
        title="Code Games to Play with Friends"
        body="Each micro:bit has a radio, so two or more boards can talk to each other without any wires. Kids use it to build multiplayer games, pass secret messages across the room, or team up on a bigger project where every board has its own job."
        layout="image-right"
        background="gray"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Projects to Get Started"
        highlight="200+ free projects available on microbit.org"
        subtitle="These projects only use what's on the board, so you can try them straight out of the box."
        projects={[
          {
            name: "Beating Heart",
            description: "A good first program: make a heart pulse on the LED display",
            concepts: "Loops, timing, LED control",
            image: "/images/products/bbc-micro-bit-go/projects/beating-heart.png",
          },
          {
            name: "Digital Dice",
            description: "Shake to roll a random number from 1 to 6",
            concepts: "Random numbers, accelerometer",
            image: "/images/products/bbc-micro-bit-go/projects/digital-dice.png",
          },
          {
            name: "Rock Paper Scissors",
            description: "Play against a friend using shake to choose",
            concepts: "Variables, conditionals, random",
            image: "/images/products/bbc-micro-bit-go/projects/rock-paper-scissors.png",
          },
          {
            name: "Compass",
            description: "Turn your micro:bit into a working compass that points North",
            concepts: "Compass sensor, mapping values",
            image: "/images/products/bbc-micro-bit-go/projects/compass.png",
          },
          {
            name: "Display Messages",
            description: "Scroll custom text and messages across the LED display",
            concepts: "Strings, loops, LED display",
            image: "/images/products/bbc-micro-bit-go/projects/display-messages.png",
          },
          {
            name: "Displaying Images",
            description: "Draw and animate your own pixel art on the 5x5 LED grid",
            concepts: "LED grid, arrays, animation",
            image: "/images/products/bbc-micro-bit-go/projects/displaying-images.png",
          },
        ]}
        moreText="When these are done, microbit.org has 200+ more free projects, from games to music makers and science experiments"
        background="white"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="Kids at home and in classrooms, mid-project with their micro:bits."
        background="gray"
        images={[
          {
            src: "/images/products/bbc-micro-bit-go/end-user/kids-looking-at-amkecode-screen-holding-microbit.jpg",
            alt: "Two boys in a classroom looking at MakeCode on a laptop, one holding a micro:bit",
          },
          {
            src: "/images/products/bbc-micro-bit-go/end-user/hand-holding-microbit-device-with-coding-screen-in-the-back.jpg",
            alt: "Hand holding a micro:bit in front of a MakeCode block-coding screen",
          },
          {
            src: "/images/products/bbc-micro-bit-go/end-user/two-kids-helping-eachother-with-makecode.jpg",
            alt: "A girl and boy sitting together at laptops, both working on MakeCode",
          },
          {
            src: "/images/products/bbc-micro-bit-go/end-user/child-working-on-computer-on-microbit-app.png",
            alt: "Young girl coding with MakeCode blocks on a laptop",
          },
          {
            src: "/images/products/bbc-micro-bit-go/end-user/holding-microbit-with-battery-holder-in-front-of-screen.jpeg",
            alt: "Hands holding a micro:bit with battery holder in front of a large monitor",
          },
          {
            src: "/images/products/bbc-micro-bit-go/end-user/girls-hand-holding-microbit-infront-of-computer.png",
            alt: "Hand holding a micro:bit in front of a computer showing the micro:bit interface",
          },
          {
            src: "/images/products/bbc-micro-bit-go/end-user/displaying-messages.png",
            alt: "micro:bit board with glowing red LEDs displaying a message",
          },
          {
            src: "/images/products/bbc-micro-bit-go/end-user/kids-on-computers-Python-and-block-based-learning.png",
            alt: "Two girls at desktop computers coding with MakeCode in a school computer lab",
          },
        ]}
      />

      {/* FAQ Section */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "What's the difference between micro:bit Go and just the board?",
            answer:
              "The Go bundle comes with the micro:bit V2 board plus a USB cable, a battery holder and two batteries. If you buy the board on its own, you'll need to get those separately.",
          },
          {
            question: "Do I need to install any software?",
            answer:
              "No. You write code in your web browser using MakeCode or Python, plug the micro:bit in with the USB cable, and click download. It works on Windows, Mac, Chromebook and Linux.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "It's designed for ages 8 and up. Younger kids can still have a go with the MakeCode blocks if an adult sits with them. Schools use it with learners from primary through to high school.",
          },
          {
            question: "Can I use it without a computer?",
            answer:
              "Yes, once a program is loaded. The micro:bit runs on the included batteries, so kids can carry a project around the house or take it to school. You'll still need a computer to write new programs or change old ones.",
          },
          {
            question: "What can I connect to it?",
            answer:
              "The edge connector along the bottom has 25 pins for motors, sensors, LEDs and more. Crocodile clips are fine for simple circuits, and an edge connector breakout board makes bigger builds easier.",
          },
          {
            question: "Is this compatible with other micro:bit accessories?",
            answer:
              "Yes. There are lots of micro:bit add-ons, including robot kits, expansion boards and sensor packs. Check that an accessory says it supports V2 so you get all of its features.",
          },
        ]}
        background="white"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/bbc-micro-bit-go/whats-in-the-box.jpeg"
        imageAlt="BBC micro:bit Go box contents: micro:bit V2 board, USB cable, battery holder, and AAA batteries"
        items={[
          "BBC micro:bit V2 Board",
          "Micro USB Cable",
          "Battery Holder with JST Connector",
          "2x AAA Batteries",
          "Quick Start Guide",
        ]}
        background="gray"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Processor", value: "ARM Cortex-M4 @ 64MHz" },
          { label: "Memory", value: "512KB Flash, 128KB RAM" },
          { label: "Display", value: "25 LEDs (5x5 grid)" },
          { label: "Audio", value: "Built-in speaker and microphone" },
          { label: "Sensors", value: "Accelerometer, compass, temperature, light, touch" },
          { label: "Connectivity", value: "Bluetooth LE, Radio, USB" },
          { label: "I/O Pins", value: "25 edge connector pins" },
          { label: "Power", value: "USB or 2x AAA batteries" },
          { label: "Dimensions", value: "4cm x 5cm" },
          { label: "Programming", value: "MakeCode, Python, Scratch" },
        ]}
        background="white"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="gray" />

      {/* Final CTA */}
      <CallToAction
        title="Start Coding with micro:bit"
        subtitle="The board, USB cable, batteries and battery holder all come in the box, so your first program is only a few minutes away."
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
  const product = await getProductByHandle("bbc-micro-bit-go");

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | CREATESPACE`,
    description:
      "The BBC micro:bit Go comes with the micro:bit V2, a USB cable, batteries and a battery holder. Kids aged 8+ code it in a browser without installing anything.",
    alternates: {
      canonical: "/product/bbc-micro-bit-go",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
