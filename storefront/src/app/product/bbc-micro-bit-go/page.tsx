import { notFound } from "next/navigation";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import {
  HeroSection,
  FeatureGrid,
  QuickInfoBadges,
  NumberedSteps,
  LearningOutcomes,
  WhatsIncluded,
  ImageTextBlock,
  ProductFAQ,
  VideoEmbed,
  Specifications,
  ProjectShowcase,
  CallToAction,
  RelatedProducts,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "bbc-micro-bit-go";

export default async function MicrobitGoPage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    notFound();
  }

  // Get related products and add-ons in parallel
  const [allProducts, resolvedAddons] = await Promise.all([
    getProducts(8),
    resolveAddonsForHandle(PRODUCT_HANDLE),
  ]);

  const relatedProducts = allProducts.filter((p) => p.handle !== product.handle).slice(0, 4);
  const addons = serializeAddons(resolvedAddons);

  return (
    <>
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
      <QuickInfoBadges
        age="8+"
        skill="beginner"
        supervision={false}
        batteries="2x AAA (included)"
        badges={[
          { icon: "projects", label: "Projects", value: "200+ Free" },
          { icon: "no-soldering", label: "Soldering", value: "Not Required" },
          { icon: "scratch", label: "Coding", value: "Block & Text" },
        ]}
      />

      {/* Why micro:bit Section */}
      <NumberedSteps
        title="Why micro:bit?"
        subtitle="The BBC micro:bit is designed to make coding fun and accessible. Used in classrooms across 60+ countries, it's one of the world's most popular educational microcontrollers."
        steps={[
          {
            title: "Code in Minutes",
            description: "Open your browser, drag some blocks, and flash your code. No downloads, no setup, no complicated configurations.",
          },
          {
            title: "Real Hardware, Real Results",
            description: "See your code come to life instantly. Light up LEDs, play sounds, detect motion - it's coding you can touch.",
          },
          {
            title: "Grow at Your Own Pace",
            description: "Start with visual blocks, progress to JavaScript or Python. The micro:bit grows with you from first project to advanced maker.",
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

      {/* Code in Your Browser Section */}
      <ImageTextBlock
        image="/images/products/bbc-micro-bit-go/blocks-coding-example-in-makecode.png"
        imageAlt="MakeCode block-based coding interface showing a micro:bit program"
        title="Code in Your Browser"
        body="No software to install - just open MakeCode in any web browser and start coding. Drag colourful blocks to create programs, then flash them to your micro:bit with one click. When you're ready, switch to JavaScript or Python to see real code."
        layout="image-left"
        background="white"
      />

      {/* Features Grid */}
      <FeatureGrid
        title="Packed with Possibilities"
        subtitle="The micro:bit V2 has everything built-in to create amazing projects - no extra components needed to get started."
        features={[
          {
            icon: "lightbulb",
            title: "25 LED Display",
            description: "Show images, animations, text, and numbers. The LEDs also work as light sensors",
          },
          {
            icon: "music",
            title: "Built-in Speaker",
            description: "Play sounds, music, and speech without connecting any external components",
          },
          {
            icon: "microphone",
            title: "Microphone",
            description: "Respond to sounds and voices. Create sound-activated projects and voice commands",
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
        title="Learn Together, Build Together"
        body="The micro:bit's built-in radio lets devices talk to each other wirelessly. Create multiplayer games, send secret messages, or build collaborative projects. Learning is always more fun with friends."
        layout="image-right"
        background="white"
      />

      {/* Learning Outcomes */}
      <LearningOutcomes
        title="Skills They'll Develop"
        subtitle="Research shows 80% of students feel anyone can learn to code after using micro:bit. Here's what they'll learn along the way."
        outcomes={[
          "Computational thinking and problem-solving",
          "Programming fundamentals - loops, variables, conditionals",
          "Understanding inputs, outputs, and sensors",
          "Debugging and iterative development",
          "Creative design and project planning",
          "Collaboration through wireless projects",
        ]}
        background="white"
      />

      {/* What's Included */}
      <WhatsIncluded
        title="What's in the Box"
        items={[
          "BBC micro:bit V2 Board",
          "Micro USB Cable",
          "Battery Holder with JST Connector",
          "2x AAA Batteries",
          "Quick Start Guide",
        ]}
        background="gray"
      />

      {/* Expand Your Projects Section */}
      <ImageTextBlock
        image="/images/products/bbc-micro-bit-go/board-connected-wires-with-hand.jpg"
        imageAlt="Hands connecting wires to a micro:bit board on a breadboard"
        title="Expand When You're Ready"
        body="Start with the built-in features, then grow. The edge connector lets you add motors, sensors, and LEDs. Use crocodile clips for quick experiments, or connect to breakout boards for more advanced projects."
        layout="image-left"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Projects to Get Started"
        subtitle="No extra parts needed - these projects use only what's built into the micro:bit."
        projects={[
          {
            name: "Flashing Heart",
            description: "Your first program - animate a beating heart on the LED display",
            concepts: "Loops, timing, LED control",
          },
          {
            name: "Digital Dice",
            description: "Shake to roll a random number from 1 to 6",
            concepts: "Random numbers, accelerometer",
          },
          {
            name: "Rock Paper Scissors",
            description: "Play against a friend using shake to choose",
            concepts: "Variables, conditionals, random",
          },
          {
            name: "Step Counter",
            description: "Build a pedometer that counts your steps",
            concepts: "Accelerometer, variables, math",
          },
          {
            name: "Noise Meter",
            description: "Display how loud your environment is",
            concepts: "Microphone input, mapping values",
          },
          {
            name: "Reaction Game",
            description: "Test your reflexes with this timing challenge",
            concepts: "Buttons, timing, comparison",
          },
        ]}
        moreText="Plus 200+ free projects on microbit.org including games, music makers, and science experiments"
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
        background="white"
      />

      {/* Young Makers Section */}
      <ImageTextBlock
        image="/images/products/bbc-micro-bit-go/boy-holding-microbit.jpg"
        imageAlt="Young boy proudly holding his micro:bit creation"
        title="From First Program to Proud Maker"
        body="There's nothing quite like seeing your code come to life. The micro:bit transforms abstract concepts into tangible results - LEDs light up, sounds play, and sensors respond. Every project builds confidence and sparks curiosity for the next challenge."
        layout="image-right"
        background="gray"
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

      {/* Final CTA */}
      <CallToAction
        title="Ready to Start Coding?"
        subtitle="Join millions of makers, students, and educators worldwide. The micro:bit Go has everything you need to begin your coding journey today."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse More Kits"
        secondaryHref="/shop"
        background="navy"
      />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} background="gray" />
    </>
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
  };
}
