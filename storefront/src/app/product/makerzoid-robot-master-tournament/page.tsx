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

const PRODUCT_HANDLE = "makerzoid-robot-master-tournament";

export default async function MakerzoidRobotMasterTournamentPage() {
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
        tagline="From first build to competition-ready — a robotics kit that grows with your child"
        highlights={[
          "640+ building blocks to build and programme",
          "4 video lessons to get you started",
          "Learn Scratch 3.0 coding — no experience needed",
          "LEGO-compatible blocks expand any existing collection",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Makerzoid Tournament */}
      <NumberedSteps
        title="Why the Tournament Edition?"
        subtitle="This isn't just a robotics kit — it's a training system designed to take your child from complete beginner to competition-ready."
        steps={[
          {
            title: "Built for Competitions",
            description:
              "The Tournament edition is purpose-built for robotics tournament training. Your child learns the specific challenges — line following, obstacle avoidance, colour detection — that real competitions test.",
          },
          {
            title: "A Progressive Learning Journey",
            description:
              "Start with basic mechanics and construction, build toward powered models with motors and electronics, and progress to full Scratch 3.0 autonomous programming. Video lessons and 16 guided PDF lessons help your child advance at their own pace.",
          },
          {
            title: "Real Engineering Inside",
            description:
              "Closed-loop servo motors with encoder feedback are the same technology used in professional robotics. Your child isn't just playing — they're learning how real robots work.",
          },
        ]}
        background="navy-card"
      />

      {/* Coding on Phone ImageTextBlock */}
      <ImageTextBlock
        image="/images/products/makerzoid-robot-master-tournament/servo-motors-coding-on-phone.png"
        imageAlt="Makerzoid app showing servo motor programming on a smartphone"
        title="Code from Your Phone or Laptop"
        body="The free Makerzoid App (iOS and Android) puts programming in your child's hands from day one. Beginners start with visual Blockly drag-and-drop blocks, then advance to Scratch 3.0 for full control over their robot's behaviour. No complicated setup — download the app, connect via Bluetooth, and start building and coding straight away."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="What Makes This Kit Different"
        subtitle="Competition-grade hardware and a structured curriculum — not just a box of bricks."
        features={[
          {
            icon: "cpu",
            title: "Smart Programmable Hub",
            description:
              "Stores up to 7 programmes simultaneously. Built-in gyroscope detects tilt and orientation in three directions.",
          },
          {
            icon: "zap",
            title: "Three Smart Sensors",
            description:
              "Colour sensor, grayscale sensor for line tracking, and a built-in gyroscope — the exact sensors used in competition challenges.",
          },
          {
            icon: "puzzle",
            title: "640+ Building Blocks",
            description:
              "Build anything from simple mechanical models to complex autonomous robots — LEGO-compatible for endless combinations.",
          },
          {
            icon: "book",
            title: "Video Lessons Included",
            description:
              "Introductory video lessons help your child get started. The app and online platform guide the rest with step-by-step instructions.",
          },
          {
            icon: "layers",
            title: "LEGO-Compatible",
            description:
              "All 640+ blocks are LEGO-compatible — they click straight into any LEGO collection for unlimited building possibilities.",
          },
          {
            icon: "code",
            title: "Dual Coding Pathways",
            description:
              "Start with visual Blockly blocks in the app, then graduate to full Scratch 3.0 programming on the web platform.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Colour Sensor ImageTextBlock */}
      <ImageTextBlock
        image="/images/products/makerzoid-robot-master-tournament/colour-sensor-feature.png"
        imageAlt="Makerzoid colour sensor component for robotics programming"
        title="Sensors That Teach Real Concepts"
        body="The colour sensor, grayscale sensor, and built-in gyroscope aren't just accessories — each one teaches your child a real engineering principle. Colour detection, infrared distance measurement, and orientation data are the building blocks of how self-driving cars, warehouse robots, and industrial machines work. Your child won't just read about these ideas in school — they'll programme them."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Challenges, Courses & Builds"
        highlight="16 guided lessons to take you from first build to competition-ready"
        subtitle="From your first gear assembly to programming a robot that navigates an obstacle course on its own."
        projects={[
          {
            name: "Programmable Hub",
            description:
              "Learn to store and switch between multiple programmes on the central controller",
            concepts: "Programme storage, Bluetooth control",
            image:
              "/images/products/makerzoid-robot-master-tournament/projects/programmable-hub.png",
          },
          {
            name: "Servo Drive",
            description: "Build and control robots with precision closed-loop servo motors",
            concepts: "Motor control, feedback loops",
            image: "/images/products/makerzoid-robot-master-tournament/projects/servo-drive.png",
          },
          {
            name: "Colour Detection",
            description: "Programme a robot to identify colours and respond differently to each",
            concepts: "Colour sensor, conditional logic",
            image: "/images/products/makerzoid-robot-master-tournament/projects/colour-sensor.png",
          },
          {
            name: "Line Following",
            description: "Master the core competition skill — programming a robot to follow a line",
            concepts: "Grayscale sensor, algorithm tuning",
            image:
              "/images/products/makerzoid-robot-master-tournament/projects/greyscale-sensor.png",
          },
          {
            name: "Precision Steering",
            description: "Navigate exact distances and angles using the built-in gyroscope",
            concepts: "Gyroscope data, calibration",
            image:
              "/images/products/makerzoid-robot-master-tournament/projects/smart-gyroscope.png",
          },
          {
            name: "Graphical Programming",
            description: "Build complete autonomous programmes using Scratch 3.0's visual editor",
            concepts: "Scratch 3.0, event-driven code",
            image:
              "/images/products/makerzoid-robot-master-tournament/projects/graphical-programming.png",
          },
        ]}
        moreText="Plus 640+ LEGO-compatible blocks to build freely — from simple mechanical structures to fully autonomous competition machines"
        background="gray"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="Real robots, real code, real results."
        images={[
          {
            src: "/images/products/makerzoid-robot-master-tournament/hands-unboxing.png",
            alt: "Hands unboxing the Makerzoid Robot Master Tournament kit",
          },
          {
            src: "/images/products/makerzoid-robot-master-tournament/robot-on-track-competition.png",
            alt: "Makerzoid robot positioned on a competition track",
          },
          {
            src: "/images/products/makerzoid-robot-master-tournament/screenshot-of-coding-screen.png",
            alt: "Scratch 3.0 coding screen showing a Makerzoid robot programme",
          },
        ]}
        background="white"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="gray" />

      {/* FAQ */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "Does my child need any coding or robotics experience?",
            answer:
              "Not at all. The kit starts from zero — early builds focus on basic mechanics with no electronics involved. Your child builds up knowledge gradually through the 16 guided lessons, video lessons, and the Makerzoid App, progressing naturally toward Scratch 3.0 programming.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "The Tournament edition is designed for ages 10 and up. The competition-specific training and advanced Scratch 3.0 programming suit older children who are ready for a serious challenge. Younger children (8–10) can start with the mechanical builds, but the full curriculum is designed with 10+ in mind.",
          },
          {
            question: "Do I need to help my child with this?",
            answer:
              "Most children aged 10+ can work through the kit independently using the Makerzoid App and the included video lessons. The structured progression means they always know what to do next. Adult support is welcome but not required.",
          },
          {
            question: "What do we need to get started?",
            answer:
              "A Bluetooth-enabled smartphone or tablet (iOS or Android) for the free Makerzoid App, and AA batteries (not included — Duracell recommended). No tools required and no soldering. For Scratch 3.0 programming, a computer with internet access is needed to use lab.makerzoid.com.",
          },
          {
            question: "We already have LEGO — does this work with it?",
            answer:
              "Yes! All 640+ building blocks are LEGO-compatible, so your child can combine them with any LEGO collection they already have. This dramatically expands the variety of robots they can build.",
          },
          {
            question: "Can my child actually compete in robotics tournaments with this?",
            answer:
              "Yes — that's exactly what the Tournament edition is designed for. It trains the specific skills tested in competitions: line following, obstacle avoidance, colour detection, and precision movement. The challenges align with formats like the World Robot Olympiad (WRO) and similar youth robotics competitions.",
          },
          {
            question: "What happens once my child finishes the video lessons?",
            answer:
              "There are still competition challenges to practise and improve, and an online community at lab.makerzoid.com. The 640+ LEGO-compatible blocks also open up endless original builds. This kit is designed for months of sustained engagement, not a one-time experience.",
          },
        ]}
        background="white"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        items={[
          "640+ LEGO-compatible building block components",
          "Programmable Hub Controller (built-in gyroscope, 2 LED indicators, 7 cross-ports)",
          "Closed-loop servo motor(s)",
          "Colour sensor",
          "Grayscale sensor",
          "Paper instruction manual",
          "Makerzoid App access (free — iOS and Android)",
          "4 video lessons + 16 guided PDF lessons (via app or lab.makerzoid.com)",
          "AA batteries NOT included — Duracell recommended",
        ]}
        background="gray"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Parts Count", value: "640+ LEGO-compatible components" },
          { label: "Box Dimensions", value: "40 × 29 × 19 cm" },
          { label: "Weight", value: "2.3 kg" },
          { label: "Programmable Hub", value: "Stores up to 7 programmes simultaneously" },
          { label: "Hub Sensors", value: "Built-in 3-axis gyroscope" },
          {
            label: "Hub Ports",
            value:
              "7 cross-ports (supports up to 4 servo motors, 4 colour sensors, 4 grayscale sensors)",
          },
          { label: "Connectivity", value: "Bluetooth (for Makerzoid App)" },
          { label: "Coding Platforms", value: "Blockly (app) and Scratch 3.0 (lab.makerzoid.com)" },
          { label: "App Compatibility", value: "iOS and Android" },
          { label: "Batteries", value: "AA required, not included" },
          { label: "Soldering Required", value: "No" },
          {
            label: "Warranty",
            value: "12 months (30-day quality warranty on motors, hub, and sensors)",
          },
        ]}
        background="white"
      />

      {/* Final CTA */}
      <CallToAction
        title="Start the Journey"
        subtitle="From first build to competition training — everything your child needs to explore, create, and compete."
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
      "Competition-grade robotics kit for ages 10+. Build with 640+ LEGO-compatible blocks, learn Scratch 3.0 coding, and train for robotics tournaments.",
    alternates: {
      canonical: "/product/makerzoid-robot-master-tournament",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
