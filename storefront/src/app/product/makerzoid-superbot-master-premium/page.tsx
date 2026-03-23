import { notFound } from "next/navigation";
import { getProductByHandle, getProducts } from "@/lib/shopify";
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
  RelatedProducts,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "makerzoid-superbot-master-premium";

export default async function MakerzoidSuperbotMasterPremiumPage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    notFound();
  }

  const [allProducts, resolvedAddons] = await Promise.all([
    getProducts(8),
    resolveAddonsForHandle(PRODUCT_HANDLE),
  ]);

  const relatedProducts = allProducts
    .filter((p) => p.handle !== product.handle)
    .slice(0, 4);
  const addons = serializeAddons(resolvedAddons);

  return (
    <>
      <ProductJsonLd product={product} />

      {/* Hero Section */}
      <HeroSection
        product={product}
        tagline="72+ robot builds that grow with your child — from first creation to sensor-driven, autonomous machines"
        highlights={[
          "72+ guided models across beginner, intermediate, and advanced levels",
          "Programs in Scratch 3.0 — used in schools in 150+ countries",
          "Six smart sensors included: gyroscope, colour, IR, and greyscale",
          "No soldering, no wiring — everything plugs into one hub",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Your Child Will Love This */}
      <NumberedSteps
        title="Why Your Child Will Love This"
        subtitle="The Superbot Master Premium isn't just a robot kit — it's a robotics platform your child will keep coming back to."
        steps={[
          {
            title: "Never the Same Kit Twice",
            description:
              "With 72+ guided models and three difficulty levels, there's always a new challenge. From their first remote-controlled car to a fully autonomous obstacle-avoiding robot — one kit, years of builds.",
          },
          {
            title: "Code It, Watch It Move",
            description:
              "Scratch 3.0 turns programming into something your child can see and feel. They write the code, the robot does exactly what they told it to. That moment of \"I made this happen\" never gets old.",
          },
          {
            title: "Real Robotics, Not Toys",
            description:
              "Smart sensors, precision servo motors, and Bluetooth control — the same technology used in competition robotics. A great foundation for STEM clubs, coding challenges, and future engineering.",
          },
        ]}
        background="navy-card"
      />

      {/* Getting Started Is Easy */}
      <ImageTextBlock
        image="/images/products/makerzoid-superbot-master-premium/hands-putting-bot-together-with-instructions-on-tablet.jpg"
        imageAlt="Child assembling the Makerzoid Superbot with step-by-step app instructions on a tablet beside them"
        title="Getting Started Is Easy"
        body="The free Makerzoid Kit app (iOS and Android) guides every build step by step with clear, illustrated instructions. Your child can follow along independently from their very first model — no robotics experience needed, and no need for you to hover over their shoulder. The paper manual is included too, so there's always a backup when the tablet needs charging."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="What's Inside the Hub"
        subtitle="The all-in-one smart controller does things most kids' kits only pretend to do. Six distinct sensors and motors, all integrated into one plug-and-play hub."
        features={[
          {
            icon: "robot",
            title: "All-in-One Controller",
            description:
              "Motor, gyroscope, LED matrix, microphone, and speaker built into a single hub. No loose wiring — every sensor and motor connects directly.",
          },
          {
            icon: "sensor",
            title: "Smart Gyroscope",
            description:
              "Detects tilt in three directions. Build bots that balance, tilt-steer, and respond to how they're being held.",
          },
          {
            icon: "sensor",
            title: "Colour Sensor",
            description:
              "Sees and reacts to different colours. Enable line-following robots, colour-sorting machines, and interactive games.",
          },
          {
            icon: "sensor",
            title: "IR + Greyscale Sensors",
            description:
              "Two IR sensors for obstacle detection and two greyscale sensors for contrast tracking — the building blocks of autonomous navigation.",
          },
          {
            icon: "bluetooth",
            title: "Bluetooth + App Control",
            description:
              "Drive builds from the free app or the included physical remote. Then upgrade to full Scratch 3.0 programming for autonomous control.",
          },
          {
            icon: "puzzle",
            title: "LEGO Compatible",
            description:
              "All 230 bricks work with LEGO. Mix in existing collections to extend designs and make every build more personal.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Drive It, Then Code It */}
      <ImageTextBlock
        image="/images/products/makerzoid-superbot-master-premium/remote-controlling-robot.jpg"
        imageAlt="Child using the Bluetooth remote control with the assembled Makerzoid Superbot robot"
        title="Drive It, Then Code It"
        body="Every build starts in remote-control mode — your child can drive and test their creation before writing a single line of code. Once they're ready, Scratch 3.0 opens up a whole new level: autonomous robots that react to sensors, follow lines, and avoid obstacles on their own. Two completely different ways to interact with every model."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="72+ Builds to Discover"
        highlight="72+ guided robot models across beginner, intermediate, and advanced levels"
        subtitle="Each build introduces a different sensor or motor concept. Here are some highlights — all guides are in the free app."
        projects={[
          {
            name: "Smart Gyroscope",
            description:
              "Build a self-balancing bot or tilt-controlled vehicle using 3-axis orientation sensing",
            concepts: "Gyroscope, feedback loops, balance",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/smart-gyroscope.jpg",
          },
          {
            name: "IR Sensors",
            description:
              "Programme a robot that detects obstacles and navigates around them independently",
            concepts: "IR sensing, conditionals, autonomy",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/ir-sensor.jpg",
          },
          {
            name: "Greyscale Sensors",
            description:
              "Create a line-following robot that tracks contrast patterns on the floor",
            concepts: "Greyscale detection, loops",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/greyscale-sensor.jpg",
          },
          {
            name: "Servo Drive",
            description:
              "Build robotic arms, grippers, and steerable mechanisms with precise angular control",
            concepts: "Servo motor, mechanical engineering",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/servo-drive.jpg",
          },
          {
            name: "Motorised Builds",
            description:
              "Drive vehicles and moving models at variable speeds — all controlled through code",
            concepts: "Motor control, speed, variables",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/the-motor.jpg",
          },
          {
            name: "Universal Wheel",
            description:
              "Build vehicles that move in any direction — code multi-directional navigation",
            concepts: "Omnidirectional motion, navigation",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/universal-wheel.jpg",
          },
        ]}
        moreText="Plus dozens more guided builds in the app — from Sumo Robots and Football Robots to Batmobile-inspired racers and LED expression bots."
        background="gray"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="What Kids Are Building"
        subtitle="Real photos from families exploring the Superbot Master Premium."
        images={[
          {
            src: "/images/products/makerzoid-superbot-master-premium/hands-putting-bot-together-with-instructions-on-tablet.jpg",
            alt: "Child assembling the Makerzoid Superbot following app instructions on a tablet",
            label: "Guided Assembly",
          },
          {
            src: "/images/products/makerzoid-superbot-master-premium/distance-sensor-hand-in-front-of-robot.jpg",
            alt: "Hand testing the Superbot's distance sensor",
            label: "Testing Sensors",
          },
          {
            src: "/images/products/makerzoid-superbot-master-premium/remote-controlling-robot.jpg",
            alt: "Child using the remote control with the assembled Makerzoid Superbot",
            label: "Remote Control Mode",
          },
          {
            src: "/images/products/makerzoid-superbot-master-premium/hands-showing-box.jpg",
            alt: "Hands holding the Makerzoid Superbot Master Premium complete kit",
            label: "Complete Kit",
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
            question: "What age is this suitable for?",
            answer:
              "The kit is designed for ages 6 and up. Younger children (6–8) may want a parent nearby for the first few builds — the app instructions are visual and clear, but some fine motor steps are easier with a helping hand. From about age 9, most children can work fully independently.",
          },
          {
            question: "Does my child need coding experience?",
            answer:
              "Not at all. Every build starts in remote-control mode, so they can drive and test their robot straight away. Scratch 3.0 programming is visual and block-based — no typing required — and the app explains each step. It's a natural, gentle progression from play to programming.",
          },
          {
            question: "What does the free app include?",
            answer:
              "The Makerzoid Kit app (free for iOS and Android) includes graphical step-by-step build guides for all 72+ models, Bluetooth remote control, and access to Scratch 3.0 programming. It's the primary instruction manual for the kit.",
          },
          {
            question: "Do we need a computer for Scratch?",
            answer:
              "Scratch 3.0 runs free in any web browser — no download needed. You'll need a computer (Windows or macOS) or a tablet to write programmes. The Makerzoid app handles everything else from a smartphone or tablet.",
          },
          {
            question: "What battery does it use?",
            answer:
              "The kit requires a 3.7V lithium battery. Please check the box contents on arrival to confirm whether the battery is included, or contact us before purchasing and we'll confirm.",
          },
          {
            question: "How long does a typical build take?",
            answer:
              "Simple beginner models take about 20–30 minutes. Intermediate builds typically take 45–90 minutes, and advanced models can run 90 minutes to 3 hours — programming adds extra time on top. Great for weekend projects or school holiday sessions.",
          },
          {
            question: "What can they do after finishing the guided models?",
            answer:
              "Quite a lot! Your child can revisit earlier builds and write more complex programmes, design their own robots from scratch, or mix Superbot pieces with their LEGO collection. The combination of sensors and motors gives them everything they need to invent something completely original.",
          },
        ]}
        background="white"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/makerzoid-superbot-master-premium/hands-showing-box.jpg"
        imageAlt="Hands holding the Makerzoid Superbot Master Premium complete kit box"
        items={[
          "1× All-in-One Smart Controller (motor, gyroscope, LED matrix, microphone, and speaker integrated)",
          "1× Smart Gyroscope module",
          "2× IR Sensors",
          "2× Greyscale Sensors",
          "1× Motor",
          "1× Servo Motor",
          "1× 360-degree universal rotating wheel",
          "1× Bluetooth Remote Control",
          "230 building block pieces (LEGO-compatible plastic)",
          "Storage box with sorting tray",
          "Paper manual with step-by-step instructions",
          "Free Makerzoid Kit app (iOS & Android)",
          "Free Scratch 3.0 access (browser-based, no download required)",
        ]}
        background="gray"
      />

      {/* Technical Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Total Pieces", value: "230" },
          { label: "Guided Models", value: "72+" },
          { label: "Coding Platform", value: "Scratch 3.0" },
          { label: "App", value: "Makerzoid Kit (iOS & Android, free)" },
          { label: "Connectivity", value: "Bluetooth" },
          { label: "Battery", value: "3.7V Lithium (required)" },
          { label: "Weight", value: "1.75 kg" },
          { label: "Box Dimensions", value: "31 × 42 × 12 cm" },
          { label: "LEGO Compatible", value: "Yes" },
          { label: "Soldering Required", value: "No" },
          { label: "Warranty", value: "12 months" },
        ]}
        background="white"
      />

      {/* Call to Action */}
      <CallToAction
        title="Get Building"
        subtitle="72+ robot builds. Real sensors. Scratch 3.0 programming. One kit that keeps growing as they do."
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
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | CREATESPACE`,
    description:
      "Build 72+ robots with smart sensors and Scratch 3.0 coding. LEGO-compatible, no soldering needed. Perfect for curious kids aged 6+.",
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
