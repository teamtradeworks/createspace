import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  FeatureGrid,
  QuickInfoBadges,
  NumberedSteps,
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
        tagline="The pocket-sized computer that teaches coding through play"
        highlights={[
          "Everything included to start coding immediately",
          "No software installation - code in your browser",
          "Built-in sensors, speaker, and LED display",
          "Used by millions of students worldwide",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why micro:bit Section */}
      <NumberedSteps
        title="Why micro:bit?"
        subtitle="The BBC micro:bit is designed to make coding fun and accessible. Used in classrooms across 60+ countries, it's one of the world's most popular educational microcontrollers."
        steps={[
          {
            title: "Code in Minutes",
            description:
              "Open your browser, drag some blocks, and flash your code. No downloads, no setup, no complicated configurations.",
          },
          {
            title: "Real Hardware, Real Results",
            description:
              "See your code come to life instantly. Light up LEDs, play sounds, detect motion - it's coding you can touch.",
          },
          {
            title: "Grow at Your Own Pace",
            description:
              "Start with visual blocks, progress to JavaScript or Python. The micro:bit grows with you from first project to advanced maker.",
          },
        ]}
        background="navy-card"
      />

      {/* Video Section */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=u2u7UJSRuko"
        title="Meet the micro:bit"
        background="gray"
      />

      {/* What Is micro:bit Section */}
      <ImageTextBlock
        image="/images/products/bbc-micro-bit-go/blocks-coding-example-in-makecode.png"
        imageAlt="MakeCode block-based coding interface showing a micro:bit program"
        title="A Pocket-Sized Programmable Computer"
        body="The BBC micro:bit V2 is a tiny computer — about the size of a credit card — designed from the ground up to teach coding. Despite its size, the board packs a 25-LED display, built-in speaker, microphone, accelerometer, compass, temperature sensor, and wireless connectivity. You program it directly in your web browser using Microsoft MakeCode's drag-and-drop blocks — no software to install. The Go bundle includes the micro:bit V2 board, a USB cable, battery holder, and batteries, so everything you need to start coding is right in the box."
        layout="image-left"
        background="white"
      />

      {/* Features Grid */}
      <FeatureGrid
        title="Key Features"
        subtitle="The micro:bit V2 has everything built-in to create amazing projects - no extra components needed to get started."
        features={[
          {
            icon: "lightbulb",
            title: "25 LED Display",
            description:
              "Show images, animations, text, and numbers. The LEDs also work as light sensors",
          },
          {
            icon: "music",
            title: "Built-in Speaker",
            description:
              "Play sounds, music, and speech without connecting any external components",
          },
          {
            icon: "microphone",
            title: "Microphone",
            description:
              "Respond to sounds and voices. Create sound-activated projects and voice commands",
          },
          {
            icon: "compass",
            title: "Motion Sensors",
            description: "Accelerometer and compass detect movement, tilt, shaking, and direction",
          },
          {
            icon: "touch",
            title: "Touch Sensitive Logo",
            description: "The gold logo is a touch sensor - create projects that respond to touch",
          },
          {
            icon: "bluetooth",
            title: "Wireless Communication",
            description: "Bluetooth and radio let micro:bits talk to each other and to phones",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Learn Together Section */}
      <ImageTextBlock
        image="/images/products/bbc-micro-bit-go/kids-holding-microbits.jpg"
        imageAlt="Two children holding micro:bit boards and smiling"
        title="Built for Group Learning"
        body="The micro:bit's built-in radio lets devices talk to each other wirelessly. Create multiplayer games, send secret messages, or build collaborative projects. Learning is always more fun with friends."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Projects to Get Started"
        highlight="200+ free projects available on microbit.org"
        subtitle="No extra parts needed - these projects use only what's built into the micro:bit."
        projects={[
          {
            name: "Beating Heart",
            description: "Your first program - animate a beating heart on the LED display",
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
        moreText="Plus 200+ free projects on microbit.org including games, music makers, and science experiments"
        background="white"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="Real kids, real projects, real fun — from first-timers to confident coders."
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
              "The Go bundle includes everything you need: the micro:bit V2 board, USB cable, battery holder, and batteries. If you buy the board alone, you'll need to purchase these accessories separately.",
          },
          {
            question: "Do I need to install any software?",
            answer:
              "No! You can code your micro:bit directly in your web browser using MakeCode or Python. Just connect via USB, write your code, and click download. It works on any computer - Windows, Mac, Chromebook, or Linux.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "The micro:bit is designed for ages 8 and up. Younger children can enjoy it with adult guidance using the block-based MakeCode editor. It's used in schools worldwide from primary through to secondary level.",
          },
          {
            question: "Can I use it without a computer?",
            answer:
              "Once you've loaded a program, the micro:bit runs independently using the included batteries. You can take your projects anywhere! You'll need a computer to write and update your programs though.",
          },
          {
            question: "What can I connect to it?",
            answer:
              "The edge connector has 25 pins for connecting motors, sensors, LEDs, and more. Use crocodile clips for simple connections or an edge connector breakout board for larger projects.",
          },
          {
            question: "Is this compatible with other micro:bit accessories?",
            answer:
              "Yes! The micro:bit V2 works with the vast ecosystem of micro:bit accessories including robot kits, expansion boards, and sensor packs. Just check that accessories are V2 compatible for full feature support.",
          },
        ]}
        background="gray"
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
        background="white"
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
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="gray" />

      {/* Final CTA */}
      <CallToAction
        title="Get Started with micro:bit"
        subtitle="Join millions of makers, students, and educators worldwide. The micro:bit Go has everything you need to begin your coding journey today."
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
      "Get started with coding using the BBC micro:bit Go. Complete starter kit with micro:bit V2, USB cable, batteries, and battery holder. Perfect for beginners aged 8+.",
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
