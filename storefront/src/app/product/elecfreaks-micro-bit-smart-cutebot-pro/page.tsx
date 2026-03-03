import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  NumberedSteps,
  VideoEmbed,
  FeatureGrid,
  ImageTextBlock,
  ProjectShowcase,
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  CallToAction,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "elecfreaks-micro-bit-smart-cutebot-pro";

export default async function CutebotProPage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    notFound();
  }

  const resolvedAddons = await resolveAddonsForHandle(PRODUCT_HANDLE);
  const addons = serializeAddons(resolvedAddons);

  return (
    <>
      <ProductJsonLd product={product} />

      {/* Hero Section */}
      <HeroSection
        product={product}
        tagline="The robot car that grows with your child — from first code to autonomous navigation"
        highlights={[
          "19 guided projects from beginner driving to AI road sign detection",
          "Precision encoder motors for accurate, repeatable movement",
          "USB rechargeable — no disposable batteries ever needed",
          "Programmes with free MakeCode blocks, upgrades to Python",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why the Cutebot Pro */}
      <NumberedSteps
        title="Why the Cutebot Pro?"
        subtitle="Most robot cars for kids stop at basics. The Cutebot Pro is built to go further."
        steps={[
          {
            title: "Code That Does Something Real",
            description:
              "Your child writes code that physically moves, senses, and responds in the real world — not just on a screen. There's nothing quite like watching a robot you programmed dodge an obstacle.",
          },
          {
            title: "Precision Most Kits Can't Match",
            description:
              "Encoder motors measure exactly how far and how many degrees the robot has turned. Your child can programme it to drive a perfect square, navigate a grid, or follow a line using the same algorithm that guides real autonomous vehicles.",
          },
          {
            title: "A Platform That Keeps Challenging",
            description:
              "Start with block coding in MakeCode and progress to Python text code. Add a claw, build a forklift, or connect an AI camera module. The Cutebot Pro is a platform that grows with your child for years.",
          },
        ]}
        background="navy-card"
      />

      {/* Video Section */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=imFVpJpXn3k"
        title="See the Cutebot Pro in Action"
        background="gray"
      />

      {/* From Beginner to Autonomous - lifestyle image */}
      <ImageTextBlock
        image="/images/products/elecfreaks-micro-bit-smart-cutebot-pro/course-case-on-laptop-introduction-obstacle-avoidance.jpg"
        imageAlt="Cutebot Pro robot car displayed next to a laptop showing the obstacle avoidance tutorial"
        title="Step-by-Step from First Drive to Obstacle Avoidance"
        body="The 19 official tutorial cases are designed to build on each other. Your child starts by programming the robot to drive forward, then gradually takes on more complex challenges — controlling exact distances, responding to sound, following lines, and finally implementing a real PID control algorithm. Every step has sample code and clear explanations on the free ELECFREAKS wiki, so they can learn independently without needing you to be a coding expert."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="What Makes the Cutebot Pro Different"
        subtitle="Engineered for learners who are ready for more than basic driving."
        features={[
          {
            icon: "robot",
            title: "Encoder Motors",
            description:
              "Precise control of distance and turning angle — your child can programme the robot to drive exactly 50cm or turn precisely 90°. This opens up grid navigation, geometric paths, and accurate autonomous driving.",
          },
          {
            icon: "sensor",
            title: "4-Way Line Sensors",
            description:
              "Four infrared sensors detect complex intersections like crossroads and T-junctions. They also unlock PID line inspection — a real-world algorithm used in robotics and automation.",
          },
          {
            icon: "compass",
            title: "Ultrasonic Distance Sensor",
            description:
              "Measures distance to objects in real time, enabling autonomous obstacle avoidance and follow-me behaviour. The same technology used in parking sensors and self-driving cars.",
          },
          {
            icon: "battery",
            title: "USB Rechargeable",
            description:
              "Built-in 18650 battery box charges via any USB cable in about 2 hours. No disposable batteries ever needed — just plug in, charge, and keep coding.",
          },
          {
            icon: "bluetooth",
            title: "4 Ways to Control",
            description:
              "Control by Bluetooth, infrared remote, Joystick:bit gamepad, or by tilting a second micro:bit. Your child can start with a remote and work up to fully autonomous programmes.",
          },
          {
            icon: "puzzle",
            title: "Fully Assembled",
            description:
              "No building required — attach the ultrasonic sensor, add the battery, and start coding in under 10 minutes. The focus is on programming, not assembly.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Built to Grow - cutebot-pro-black-background */}
      <ImageTextBlock
        image="/images/products/elecfreaks-micro-bit-smart-cutebot-pro/cutebot-pro-black-background.jpg"
        imageAlt="ELECFREAKS Smart Cutebot Pro robot car on a dark background showing the aerodynamic design"
        title="A Platform, Not Just a Product"
        body="Four servo ports, four GPIO outputs, an I2C connector, and mounting holes for building blocks make the Cutebot Pro a proper platform. Your child can attach a mechanical claw to pick up objects, build a forklift with Lego-compatible blocks, connect an AI camera to recognise road signs, or create a ball-launching vehicle. These aren't hypothetical — ELECFREAKS provides complete tutorials for every one of these builds. When your child runs out of challenges, there's always a next level."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="19 Guided Projects"
        highlight="From 'Drive Forward' to autonomous obstacle avoidance and AI vision"
        subtitle="The core projects progress from basic motor control to advanced sensor integration. Here are six that show the range."
        projects={[
          {
            name: "Drive Forward",
            description:
              "Write your first programme to move the robot forward at a set speed and duration.",
            concepts: "Motor control, speed, timing",
            image:
              "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/projects/closed-loop-encoded-precise-driving.jpg",
          },
          {
            name: "Voice Control",
            description:
              "The robot responds to clapping or noise — louder sounds make it go faster.",
            concepts: "Sensor input, conditional logic, real-time data",
            image:
              "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/projects/voice-controlled.jpg",
          },
          {
            name: "Rainbow Lights",
            description:
              "Programme dynamic colour effects across the onboard RGB LEDs while the robot drives.",
            concepts: "RGB control, colour theory, synchronisation",
            image:
              "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/projects/light-show.jpg",
          },
          {
            name: "Seek the Light",
            description:
              "The robot uses its light sensors to detect a light source and steer towards it.",
            concepts: "Light sensing, conditionals, sensor-driven navigation",
            image:
              "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/projects/seeking-the-light.jpg",
          },
          {
            name: "Intelligent Obstacle Avoidance",
            description:
              "The robot detects obstacles with its ultrasonic sensor and steers around them autonomously.",
            concepts: "Ultrasonic sensor, autonomy, decision-making",
            image:
              "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/projects/ultrasonic-obstacle-avoidance.jpg",
          },
          {
            name: "PID Line Inspection",
            description:
              "Advanced smooth line-following using a proportional-integral-derivative control algorithm.",
            concepts: "PID algorithm, 4-way sensors, parameter tuning",
            image:
              "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/projects/line-tracking-sensors.jpg",
          },
        ]}
        moreText="Plus 13 more projects including Automatic Headlights, Follow the Car at a Fixed Distance, Walk the Grid, and extended builds like a Mechanical Claw, Forklift, and AI Road Signs Cart"
        background="gray"
      />

      {/* Customer Showcase — ALL end-user images */}
      <CustomerShowcase
        title="The Cutebot Pro in the Wild"
        subtitle="Real builds from real learners."
        images={[
          {
            src: "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/close-up-cutebot-pro-on-box.jpg",
            alt: "Close-up of the ELECFREAKS Smart Cutebot Pro robot on its packaging box",
          },
          {
            src: "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/close-up-microbit-sonar-bot.jpg",
            alt: "Close-up of the Cutebot Pro with BBC micro:bit and ultrasonic sonar sensor attached",
          },
          {
            src: "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/cutebot-on-line-following-map-with-manual.jpg",
            alt: "Cutebot Pro on a line-following track map with the user manual beside it",
          },
          {
            src: "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/mans-hand-holding-cutebot-pro-above-box.jpg",
            alt: "Hand holding the assembled Cutebot Pro above its packaging box",
          },
          {
            src: "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/cutebot-vs-cutebot-pro.jpg",
            alt: "Side-by-side comparison of the original Cutebot and the upgraded Cutebot Pro",
          },
          {
            src: "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/hand-plugging-in-microbit-with-cutebot-behind.jpg",
            alt: "Hand plugging a BBC micro:bit into the Cutebot Pro robot car",
          },
          {
            src: "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/mans-hand-holding-cutebot-base-with-box-underneath.jpg",
            alt: "Hand holding the underside of the Cutebot Pro chassis with the box underneath",
          },
          {
            src: "/images/products/elecfreaks-micro-bit-smart-cutebot-pro/underneith-cutebot-pro.jpg",
            alt: "Underneath view of the Cutebot Pro showing the four line-following sensors and wider tires",
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
            question: "Does my child need a BBC micro:bit to use this?",
            answer:
              "Yes — the Cutebot Pro is a robot chassis that needs a BBC micro:bit to act as its brain. The micro:bit is not included, but you can add a BBC micro:bit Go bundle at a discounted price directly from this page. If you already have one at home, any micro:bit V1 or V2 will work.",
          },
          {
            question: "What age is the Cutebot Pro for?",
            answer:
              "ELECFREAKS recommends ages 9 and up. Children who've done a little coding before will get the most out of it. That said, complete beginners can absolutely start here — the first projects are beginner-friendly and the free step-by-step tutorials walk through everything.",
          },
          {
            question: "Does my child need coding experience?",
            answer:
              "No prior experience is needed. The first projects introduce programming concepts from scratch using MakeCode's visual block editor — no typing required. As confidence grows, your child can progress to Python text coding using the same robot.",
          },
          {
            question: "What else do they need to get started?",
            answer:
              "You'll need a BBC micro:bit (not included — see above), a 18650 flat-topped lithium battery (not included), and any device with a web browser for MakeCode — laptop, tablet, or Chromebook all work. MakeCode is free with nothing to install.",
          },
          {
            question: "Do I need to help my child, or can they work independently?",
            answer:
              "Most children aged 10+ can work through the beginner projects independently using the free ELECFREAKS wiki tutorials, which include sample code for every project. Having a parent nearby for the first session is useful, but the kit is designed for independent use.",
          },
          {
            question: "What can they do after the 19 projects?",
            answer:
              "Plenty. Your child can modify and combine the projects, add hardware expansions (a claw, forklift, AI camera, OLED display), work up to Python programming, or join robotics competitions. The Cutebot Pro has active MakeCode library support and a large community wiki — there's always a next challenge.",
          },
        ]}
        background="white"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/elecfreaks-micro-bit-smart-cutebot-pro/whats-in-the-box.jpg"
        imageAlt="ELECFREAKS Smart Cutebot Pro unboxed showing the robot, ultrasonic sensor, track card, and guide"
        items={[
          "1x Smart Cutebot Pro robot car (fully assembled)",
          "1x Ultrasonic distance sensor (HC-SR04+)",
          "1x Line-following track card",
          "1x USB charging cable",
          "1x English user guide",
        ]}
        background="gray"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Dimensions", value: "132 × 114 × 50 mm" },
          { label: "Weight", value: "138 g" },
          { label: "Compatibility", value: "BBC micro:bit V1 & V2" },
          { label: "Motor Type", value: "N20 metal-geared encoder motors, 300 RPM max" },
          { label: "Line Sensors", value: "4× infrared (supports PID line inspection)" },
          { label: "Distance Sensor", value: "Ultrasonic HC-SR04+" },
          { label: "Lighting", value: "4× RGB LEDs (2 headlights + 2 NeoPixel underlights)" },
          { label: "Wireless", value: "Bluetooth + infrared receiver" },
          { label: "Battery", value: "18650 Li-ion, 2000 mAh (not included)" },
          { label: "Charging", value: "USB, ~120 minutes" },
          { label: "Expansion", value: "4× servo ports, 4× GPIO, I2C, extra DC motor output" },
          { label: "Programming", value: "MakeCode (blocks) & MicroPython (text)" },
          { label: "Soldering Required", value: "No" },
          { label: "Assembly Required", value: "Minimal — sensor and battery only, no tools needed" },
        ]}
        background="white"
      />

      {/* Call to Action */}
      <CallToAction
        title="Get Started with the Cutebot Pro"
        subtitle="19 guided projects. Precision motors. A platform that challenges your child for years."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse More Kits"
        secondaryHref="/shop"
        background="navy"
      />
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
      "A programmable robot car for BBC micro:bit with 19 guided projects, precision encoder motors, and USB charging. Ages 9+. No soldering required.",
    alternates: {
      canonical: "/product/elecfreaks-micro-bit-smart-cutebot-pro",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
