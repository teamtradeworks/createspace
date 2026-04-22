import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  NumberedSteps,
  FeatureGrid,
  ImageTextBlock,
  ProjectShowcase,
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "makerzoid-superbot-master-premium";

export default async function MakerzoidSuperbotMasterPremiumPage() {
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
        tagline="Build, program, and compete with 72+ robot models"
        highlights={[
          "72+ guided robot builds across three difficulty levels",
          "Program with Scratch 3.0 — no prior coding experience needed",
          "All-in-one smart controller: motors, sensors, and LED display built in",
          "LEGO compatible — mix with your child's existing collection",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges
        badges={[
          { icon: "age", label: "Age", value: "6–14" },
          { icon: "projects", label: "Models", value: "72+" },
          { icon: "scratch", label: "Coding", value: "Scratch 3.0" },
          { icon: "battery", label: "Battery", value: "3.7V lithium (included)" },
          { icon: "no-soldering", label: "Soldering", value: "Not Required" },
        ]}
      />

      {/* Why Superbot Master Premium */}
      <NumberedSteps
        title="Why the Superbot Master Premium?"
        subtitle="This isn't just another building kit. It's a complete robotics platform designed to grow with your child."
        steps={[
          {
            title: "Built to Last for Years",
            description:
              "With 72+ models across beginner, intermediate, and advanced levels, there's always a new challenge. Simple vehicles take 20 minutes. Advanced autonomous robots take 3+ hours. The challenge grows as your child does.",
          },
          {
            title: "Real Programming Skills",
            description:
              "Scratch 3.0 is used in schools across 150+ countries. Your child builds genuine computational thinking — sequences, loops, conditionals, and event-driven logic — while watching their code make a real robot move.",
          },
          {
            title: "Competition-Ready",
            description:
              "Designed as a competition-grade kit, it includes Sumo Robot and Football Robot challenge modes. Your child can test their builds against others — or just challenge themselves to go faster, smarter, further.",
          },
        ]}
        background="navy-card"
      />

      {/* Smart Sensors */}
      <FeatureGrid
        title="Smart Sensors, Smarter Robots"
        subtitle="The Superbot Master Premium packs more intelligence into a single hub than most kits twice its size."
        features={[
          {
            icon: "robot",
            title: "All-in-One Smart Controller",
            description:
              "Built-in motors, gyroscope, 25-LED matrix, microphone, and speaker in one hub — no wiring tangles, just build and code.",
          },
          {
            icon: "palette",
            title: "Colour Sensor",
            description:
              "Detects and reacts to colours in the real world. Build a colour-sorting machine or a robot that stops at a red line.",
          },
          {
            icon: "refresh",
            title: "3-Axis Gyroscope",
            description:
              "Measures tilt and orientation in three directions. Make balance bots, tilt-steered vehicles, and self-correcting platforms.",
          },
          {
            icon: "wave",
            title: "Infrared Sensors (×2)",
            description:
              "Detect obstacles and proximity. Program a robot that navigates a room on its own — no joystick required.",
          },
          {
            icon: "lightbulb",
            title: "25-LED Matrix Display",
            description:
              "Give your robot a face. Program expressions, patterns, and messages — it makes the coding feel personal and rewarding.",
          },
          {
            icon: "bluetooth",
            title: "Bluetooth Remote & App",
            description:
              "Control every build via the included physical remote or free Makerzoid app on iOS and Android. Two ways to play.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Coding section */}
      <ImageTextBlock
        title="Real Code. Real Results."
        body="Scratch 3.0 is the same platform used in schools across 150+ countries — not a toy language, but a genuine entry point into programming. Your child drags and drops blocks to control motors, read sensors, and trigger sounds. When they're ready, they can switch to the text-based version and start learning Python-style syntax. Every build teaches real computational thinking: sequences, loops, conditionals, and events."
        image="/images/products/makerzoid-superbot-master-premium/scratch-3-0-and-coding-on-makerzoid-lab.jpg"
        imageAlt="Scratch 3.0 coding interface on the Makerzoid Lab app"
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Projects, Challenges & Activities"
        highlight="72+ guided builds across beginner, intermediate, and advanced levels"
        subtitle="Every build is guided step-by-step through the free Makerzoid app. Here are some of the challenges waiting for your child:"
        projects={[
          {
            name: "Obstacle Avoidance",
            description: "Build an autonomous robot that detects and steers around obstacles",
            concepts: "IR sensing, conditionals, autonomous navigation",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/obstacle-avoidance.png",
          },
          {
            name: "Patrol Vehicle",
            description: "A robot that surveys and patrols an area on its own",
            concepts: "Motor control, loops, sensor-triggered decisions",
            image: "/images/products/makerzoid-superbot-master-premium/projects/patrol-vehicle.png",
          },
          {
            name: "Racing Competition",
            description: "Build for speed — tune your robot to win a head-to-head race",
            concepts: "Motor tuning, speed optimisation, competitive strategy",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/racing-competition.png",
          },
          {
            name: "Cargo Transport",
            description: "Design a robot that picks up and delivers cargo to a target zone",
            concepts: "Servo control, precision movement, task planning",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/cargo-transport-competition.png",
          },
          {
            name: "Smart Recognition",
            description: "Program a robot to detect and respond to colours and lines",
            concepts: "Colour sensing, greyscale detection, conditional logic",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/smart-recognition.png",
          },
          {
            name: "Sumo Competition",
            description: "Battle-test your build — last robot in the ring wins",
            concepts: "Strategy, push mechanics, sensor-driven reactions",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/sumo-competition.png",
          },
        ]}
        moreText="Plus 66+ more builds including the Batmobile, Sumo Robot, Dragon Tiger Chariot, colour sorters, LED displays, and fully custom designs"
        background="gray"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="Real moments from kids building and programming their Superbots."
        images={[
          {
            src: "/images/products/makerzoid-superbot-master-premium/distance-sensor-hand-in-front-of-robot.jpg",
            alt: "Child testing the distance sensor on an assembled Makerzoid Superbot",
          },
          {
            src: "/images/products/makerzoid-superbot-master-premium/hands-putting-bot-together-with-instructions-on-tablet.jpg",
            alt: "Hands assembling the Superbot with step-by-step instructions on a tablet",
          },
          {
            src: "/images/products/makerzoid-superbot-master-premium/hands-showing-box.jpg",
            alt: "Hands holding the Makerzoid Superbot Master Premium box",
          },
          {
            src: "/images/products/makerzoid-superbot-master-premium/remote-controlling-robot.jpg",
            alt: "Child using the Bluetooth remote to control an assembled Superbot robot",
          },
        ]}
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* FAQ */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "Does my child need any prior experience with coding or robotics?",
            answer:
              "Not at all. The Superbot Master Premium is designed for beginners. The free Makerzoid app provides step-by-step graphical assembly guides, and Scratch 3.0 is a drag-and-drop language — no typing required. Most children aged 6–14 can get started independently.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "We recommend ages 6–14. The three difficulty levels mean younger children can start with simple vehicle builds while older kids tackle autonomous robots and sensor programming. It grows with your child rather than being outgrown quickly.",
          },
          {
            question: "Does my child need a phone, tablet, or computer?",
            answer:
              "A phone or tablet (iOS or Android) is needed to access the build guides in the free Makerzoid app, and to use app-based Bluetooth control. Scratch 3.0 programming works in any web browser on a phone, tablet, or computer — it's free and requires no installation.",
          },
          {
            question: "Does the kit include a battery?",
            answer:
              "Yes — a 3.7V rechargeable lithium battery is included in the box. No need to source one separately.",
          },
          {
            question: "Is this compatible with LEGO?",
            answer:
              "Yes! The Superbot Master Premium uses standard building blocks fully compatible with LEGO. Your child can mix in pieces from existing sets to create custom designs that go beyond the 72 guided builds.",
          },
          {
            question: "What can my child do after completing all 72+ models?",
            answer:
              "The guided builds are just the start. After mastering the official models, children can design their own robots by combining the sensors, motors, and LED matrix in new ways. The LEGO compatibility also means their Superbot can expand alongside any new building sets they receive.",
          },
          {
            question: "Is adult supervision required?",
            answer:
              "No soldering and no tools are required — construction is fully tool-free. The small parts mean supervision is sensible for children under 6. For children 6 and up, the step-by-step app instructions are clear enough that most kids can work independently.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        items={[
          "All-in-One Smart Controller (with built-in motors, gyroscope, 25-LED matrix, microphone, speaker)",
          "Smart Gyroscope module",
          "Colour Sensor",
          "2× IR Sensors",
          "2× Greyscale Sensors",
          "Motor",
          "Servo Motor",
          "360-degree universal rotating wheel",
          "Bluetooth Remote Control",
          "230 LEGO-compatible building block pieces",
          "Storage box with sorting tray",
          "3.7V rechargeable lithium battery",
          "Paper manual with step-by-step building instructions",
        ]}
        background="white"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Total Pieces", value: "230" },
          { label: "Models Supported", value: "72+" },
          { label: "Coding Platform", value: "Scratch 3.0" },
          { label: "App", value: "Makerzoid Kit (iOS & Android, free)" },
          { label: "Battery", value: "3.7V lithium (included)" },
          { label: "Connectivity", value: "Bluetooth" },
          { label: "LEGO Compatible", value: "Yes" },
          { label: "Weight", value: "1.75 kg" },
          { label: "Box Dimensions", value: "31 × 42 × 12 cm" },
          { label: "Warranty", value: "12 months" },
          { label: "Country of Origin", value: "China" },
        ]}
        background="gray"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started with the Superbot"
        subtitle="72+ builds. Real programming. A kit your child won't outgrow in a hurry."
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
      "Build 72+ robot models and program with Scratch 3.0. Advanced sensors, LEGO-compatible, no soldering. Perfect for ages 6–14.",
    alternates: {
      canonical: "/product/makerzoid-superbot-master-premium",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
