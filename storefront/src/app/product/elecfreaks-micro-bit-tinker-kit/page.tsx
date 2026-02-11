import { notFound } from "next/navigation";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
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
  ProjectShowcase,
  CallToAction,
  RelatedProducts,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "elecfreaks-micro-bit-tinker-kit";

export default async function ElecfreaksTinkerKitPage() {
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
        tagline="Discover creative ways to learn coding and electronics with micro:bit"
        highlights={[
          "39 hands-on projects with online tutorials",
          "Block coding with MakeCode - no text coding required",
          "Plug-and-play sensors - no breadboard needed",
          "Build real-world projects: games, alarms, plant monitors",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why micro:bit Section */}
      <NumberedSteps
        title="Why Learn with micro:bit?"
        subtitle="The BBC micro:bit is one of the world's most popular educational microcontrollers. Used in classrooms across 60+ countries to teach coding and electronics."
        steps={[
          {
            title: "Visual Block Coding",
            description: "Start with drag-and-drop blocks in MakeCode. See your code run instantly on real hardware - no complicated setup required.",
          },
          {
            title: "Real Sensors & Outputs",
            description: "Go beyond the screen. Control LEDs, read sensors, make sounds, and build projects that interact with the physical world.",
          },
          {
            title: "Grow Your Skills",
            description: "Ready for more? Switch from blocks to JavaScript or Python anytime. The same projects, more powerful code.",
          },
        ]}
        background="navy-card"
      />

      {/* Video Section */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=SXRV5hiZTlY"
        title="See the Tinker Kit in Action"
        background="gray"
      />

      {/* What Is the Tinker Kit Section */}
      <ImageTextBlock
        image="/images/products/elecfreaks-micro-bit-tinker-kit/makecode-screenshot.jpg"
        imageAlt="MakeCode block coding interface showing a micro:bit program"
        title="An Accessory Pack That Unlocks Your micro:bit"
        body="The ELECFREAKS Tinker Kit is a sensor and component pack that expands what you can do with a BBC micro:bit. It includes 14 plug-and-play modules — from a PIR motion sensor and soil moisture probe to an OLED display and servo motor — all connected through the Octopus:bit breakout board. Every component uses simple colour-coded 3-pin connectors that click into place, so there's no breadboard, no loose wiring, and no confusion. You program everything with Microsoft MakeCode's drag-and-drop blocks, and custom blocks for every Tinker Kit sensor are included."
        layout="image-left"
        background="white"
      />

      {/* Features Grid */}
      <FeatureGrid
        title="Everything Connects in Seconds"
        subtitle="The Tinker Kit uses ELECFREAKS' Octopus sensor system - colour-coded connectors that plug directly into the breakout board. No breadboard, no loose wires, no confusion."
        features={[
          {
            icon: "puzzle",
            title: "Plug-and-Play Design",
            description: "Every sensor has a 3-pin connector that clicks into place. Colour-coded for easy identification",
          },
          {
            icon: "code",
            title: "MakeCode Compatible",
            description: "All components work with Microsoft MakeCode's drag-and-drop editor. Custom blocks included",
          },
          {
            icon: "book",
            title: "39 Project Tutorials",
            description: "Step-by-step online guides walk you through every project from simple LEDs to games",
          },
          {
            icon: "lightbulb",
            title: "Real-World Sensors",
            description: "PIR motion sensor, soil moisture sensor, and more - build projects that solve real problems",
          },
          {
            icon: "globe",
            title: "Expandable Platform",
            description: "Compatible with hundreds of other Octopus sensors and micro:bit accessories",
          },
          {
            icon: "shield",
            title: "Safe & Durable",
            description: "Low voltage components on sturdy PCBs. Designed for classroom and home use",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Hands-On Interaction Section */}
      <ImageTextBlock
        image="/images/products/elecfreaks-micro-bit-tinker-kit/microbit_expansion_project_with_interacting_hand.jpg"
        imageAlt="Hand interacting with a micro:bit expansion project showing LEDs and sensors"
        title="See Your Code Come to Life"
        body="There's something magical about writing code that controls real hardware. LEDs light up, sensors respond, servos move - every project creates a tangible result you can touch and show off."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Projects You'll Build"
        highlight="39 hands-on projects with step-by-step online tutorials"
        subtitle="Start simple and progress to more complex builds. Each project teaches new concepts while creating something useful or fun."
        projects={[
          {
            name: "Music Machine",
            description: "Create your own musical instrument with the buzzer and buttons",
            concepts: "Sound output, button input",
          },
          {
            name: "Smart Light",
            description: "Build a motion-activated light using the PIR sensor",
            concepts: "Motion detection, conditionals",
          },
          {
            name: "Plant Monitor",
            description: "Check if your plants need water with the soil moisture sensor",
            concepts: "Analog sensors, thresholds",
          },
          {
            name: "Electro-Theremin",
            description: "Wave your hand to make music with this light-based instrument",
            concepts: "Analog input, sound mapping",
          },
          {
            name: "Flappy Bird Game",
            description: "Build the classic game on the OLED display",
            concepts: "Game logic, displays",
          },
          {
            name: "Servo Controller",
            description: "Control a servo motor with the rotation potentiometer",
            concepts: "Motor control, mapping values",
          },
        ]}
        moreText="Plus 33 more projects including Snake Game, intruder alarms, and interactive displays"
        background="white"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Breakout Board", value: "Octopus:bit (3.3V/5V switchable)" },
          { label: "Compatibility", value: "micro:bit V1 and V2" },
          { label: "Programming", value: "MakeCode, Scratch, JavaScript, Python" },
          { label: "Power", value: "2x AAA batteries or USB" },
          { label: "Servo Torque", value: "1.6kg/cm" },
          { label: "Display", value: "0.96\" OLED (128x64)" },
          { label: "Sensors", value: "PIR, Soil Moisture, Crash, Rotation" },
          { label: "Outputs", value: "Buzzer, Servo, RGB LEDs, OLED" },
        ]}
        background="white"
      />

      {/* FAQ Section */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "Is a micro:bit board included?",
            answer:
              "No, this kit contains accessories and sensors that work WITH a micro:bit. You'll need to purchase a BBC micro:bit board separately. Both V1 and V2 micro:bit boards are compatible.",
          },
          {
            question: "Do I need any coding experience?",
            answer:
              "Not at all! The kit uses Microsoft MakeCode, which features drag-and-drop block coding. If you can drag puzzle pieces together, you can code. More advanced users can switch to JavaScript or Python.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "We recommend ages 12+ for independent use. Younger children (8-11) can enjoy it with adult guidance. The block-based coding makes it accessible while the projects remain engaging for teens and adults.",
          },
          {
            question: "Is soldering required?",
            answer:
              "No soldering needed! All components use plug-and-play 3-pin connectors that click into the breakout board. This makes it safe and easy to experiment with different configurations.",
          },
          {
            question: "Where can I find the project tutorials?",
            answer:
              "All 39 project tutorials are available free online at the ELECFREAKS Wiki. Each tutorial includes step-by-step instructions, code examples, and explanations of the concepts involved.",
          },
          {
            question: "Can I use this with Scratch?",
            answer:
              "Yes! The micro:bit works with Scratch via the Scratch Link extension. You can also use MakeCode (recommended for beginners), JavaScript, or Python.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/elecfreaks-micro-bit-tinker-kit/microbit_expansion_project_with_interacting_hand.jpg"
        imageAlt="ELECFREAKS Tinker Kit components and expansion board"
        items={[
          "Octopus:bit Breakout Board",
          "Crystal Battery Box (2x AAA)",
          "Micro-USB Cable",
          "OLED Display Module",
          "Mini Servo Motor (1.6kg)",
          "PIR Motion Sensor",
          "Soil Moisture Sensor",
          "ADKeypad (5 Buttons)",
          "Crash Sensor",
          "Passive Buzzer",
          "Red LED Brick",
          "Green LED Brick",
          "Blue LED Brick",
          "Analog Rotation Potentiometer",
        ]}
        background="white"
      />

      {/* Final CTA */}
      <CallToAction
        title="Ready to Start Tinkering?"
        subtitle="Expand your micro:bit with sensors, displays, and motors. Build real projects that respond to the world around you."
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
  const product = await getProductByHandle("elecfreaks-micro-bit-tinker-kit");

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | CREATESPACE`,
    description:
      "Expand your micro:bit with the ELECFREAKS Tinker Kit. Includes 14 plug-and-play sensors and components with 39 project tutorials. Block coding compatible. Ages 12+.",
  };
}
