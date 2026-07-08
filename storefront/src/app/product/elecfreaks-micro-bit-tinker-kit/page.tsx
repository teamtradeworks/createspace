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
  Specifications,
  ProductReviews,
  ProjectShowcase,
  CustomerShowcase,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "elecfreaks-micro-bit-tinker-kit";

export default async function ElecfreaksTinkerKitPage() {
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
        tagline="Turn your micro:bit into a real electronics lab, no breadboard, no mess, no experience needed"
        highlights={[
          "39 hands-on projects from simple alarms to games and robots",
          "Plug-and-play sensors, colour-coded, no breadboard required",
          "Starts with drag-and-drop blocks, grows to Python",
          "No soldering, safe for home and classroom use",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why micro:bit Tinker Kit */}
      <NumberedSteps
        title="Why the Tinker Kit?"
        subtitle="The BBC micro:bit is one of the most used coding tools in classrooms worldwide. The Tinker Kit gives your child the sensors and components to go further, without the frustration of tangled wires."
        steps={[
          {
            title: "Real Hardware, Real Results",
            description:
              "Write code and watch something physical happen, a light turns on, a servo moves, a buzzer sounds. The feedback loop is instant and deeply satisfying.",
          },
          {
            title: "Designed to Be Accessible",
            description:
              "Colour-coded 3-pin connectors replace messy breadboards. Custom MakeCode blocks mean your child codes sensors by name, not by memory. It just works.",
          },
          {
            title: "A Full Coding Pathway",
            description:
              "Start with drag-and-drop blocks in MakeCode. When your child is ready, the same kit runs in JavaScript or Python, no new hardware needed.",
          },
        ]}
        background="navy-card"
      />

      {/* What the Tinker Kit adds */}
      <ImageTextBlock
        image="/images/products/elecfreaks-micro-bit-tinker-kit/microbit_expansion_buttons_in_both_hands.jpg"
        imageAlt="Hands interacting with a micro:bit Tinker Kit expansion project showing the Octopus:bit board and sensors"
        title="What the Tinker Kit Adds to Your micro:bit"
        body="The micro:bit on its own is a powerful little computer, but the Tinker Kit is what turns it into a proper electronics lab. The included Octopus:bit expansion board breaks out all of the micro:bit's ports into colour-coded connectors, so your child simply plugs in a sensor and starts coding. No breadboard. No jumper wire diagrams. No confusion. The 13 included modules, from a PIR motion sensor and soil moisture probe to a servo motor, buzzer, and OLED display, connect the same way every time, leaving your child free to focus on what they're building, not how to hook it up."
        layout="image-left"
        background="white"
      />

      {/* Features Grid */}
      <FeatureGrid
        title="Key Features"
        subtitle="Everything about the Tinker Kit is designed to reduce friction and maximise learning time."
        features={[
          {
            icon: "puzzle",
            title: "Plug-and-Play Sensors",
            description:
              "Colour-coded 3-pin connectors click into the breakout board. No breadboard, no wiring diagrams.",
          },
          {
            icon: "code",
            title: "MakeCode Blocks Included",
            description:
              "Custom MakeCode extensions for every sensor. Drag in a block labelled 'read soil moisture' and it works.",
          },
          {
            icon: "book",
            title: "39 Online Tutorials",
            description:
              "Free step-by-step guides for all 39 projects at the ELECFREAKS Wiki, no printed book to lose.",
          },
          {
            icon: "lightbulb",
            title: "Beginner to Advanced",
            description:
              "Projects range from a simple alarm box to a self-driving car and a Morse code transmitter.",
          },
          {
            icon: "layers",
            title: "Expandable Ecosystem",
            description:
              "The Octopus platform has hundreds of compatible sensors. Add ultrasonic, colour, or temperature modules as skills grow.",
          },
          {
            icon: "shield",
            title: "No Soldering Required",
            description:
              "All connections are plug-in. Safe for children to use at home, no specialist tools needed.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* From code to working project */}
      <ImageTextBlock
        image="/images/products/elecfreaks-micro-bit-tinker-kit/microbit_expansion_project_with_interacting_hand.jpg"
        imageAlt="Hand interacting with a completed micro:bit Tinker Kit project showing sensors and outputs responding to touch"
        title="From Code to Working Project"
        body="There's a moment every maker remembers, the first time their code made something in the real world happen. A light turned on. A buzzer sounded. A servo moved exactly as intended. The Tinker Kit is full of those moments. Your child writes a few blocks of code, presses download, and watches their plant monitor check moisture levels, or their intruder alarm trigger when someone enters the room. The projects are designed to be useful, not just instructional, which is exactly why children keep coming back."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Projects You'll Build"
        highlight="39 hands-on projects with step-by-step online tutorials"
        subtitle="Projects progress from beginner automations to games to advanced engineering builds. Start wherever your child is, there's no set order."
        projects={[
          {
            name: "Smart Light",
            description:
              "Build a motion-activated light using the PIR sensor, turns on automatically when someone enters a room.",
            concepts: "Motion sensing, conditionals",
            image: "/images/products/elecfreaks-micro-bit-tinker-kit/projects/smart-light.jpg",
          },
          {
            name: "Plant Monitor",
            description:
              "Read soil moisture levels and display alerts when your plant needs water, a real IoT device.",
            concepts: "Analog sensors, OLED display, thresholds",
            image: "/images/products/elecfreaks-micro-bit-tinker-kit/projects/plant-monitoring.jpg",
          },
          {
            name: "Intruder Detection",
            description:
              "Set up a PIR-based alarm that sounds when motion is detected in a defined area.",
            concepts: "Event-driven programming, alarm output",
            image:
              "/images/products/elecfreaks-micro-bit-tinker-kit/projects/intruder-detection.jpg",
          },
          {
            name: "Lie Detector",
            description:
              "Repurpose the moisture sensor as a galvanic skin response detector, the micro:bit measures nervousness.",
            concepts: "Data comparison, statistics, biology meets electronics",
            image: "/images/products/elecfreaks-micro-bit-tinker-kit/projects/lie-detector.jpg",
          },
          {
            name: "Automated Fish Feeder",
            description:
              "Program the servo to rotate at timed intervals, a genuinely useful automated feeder.",
            concepts: "Servo control, time-based programming, automation",
            image: "/images/products/elecfreaks-micro-bit-tinker-kit/projects/fish-feeder.jpg",
          },
          {
            name: "Remote Control Car",
            description:
              "Assemble an acrylic car chassis with two servo motors and program it to drive autonomously.",
            concepts: "Motor control, hardware assembly, directional programming",
            image:
              "/images/products/elecfreaks-micro-bit-tinker-kit/projects/remote-control-car.jpg",
          },
        ]}
        moreText="Plus 33 more: Music Machine, Electro-Theremin, Flappy Bird, Snake Game, Space Shooter, Security Door, Morse Code Transmitter, and more"
        background="gray"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="Real projects built with the Tinker Kit, from classroom first builds to DIY home sensors."
        images={[
          {
            src: "/images/products/elecfreaks-micro-bit-tinker-kit/micro-bit-connected-to-board.jpg",
            alt: "micro:bit connected to the Octopus:bit expansion board with sensors attached",
            label: "First Build",
          },
          {
            src: "/images/products/elecfreaks-micro-bit-tinker-kit/plant-monitoring-device-example.jpg",
            alt: "Plant monitoring device built with the Tinker Kit showing moisture sensor in soil",
            label: "Plant Monitor",
          },
          {
            src: "/images/products/elecfreaks-micro-bit-tinker-kit/moisture-water-testing-build.jpg",
            alt: "Moisture and water testing build using the soil sensor and Tinker Kit components",
            label: "Moisture Tester",
          },
          {
            src: "/images/products/elecfreaks-micro-bit-tinker-kit/micro-bit-remote-control-car.jpg",
            alt: "micro:bit remote control car built using the Tinker Kit servo motors and chassis",
            label: "Remote Car",
          },
          {
            src: "/images/products/elecfreaks-micro-bit-tinker-kit/kids-in-classroom.jpeg",
            alt: "Kids in a classroom learning to code with micro:bit and Tinker Kit components",
            label: "Classroom",
          },
          {
            src: "/images/products/elecfreaks-micro-bit-tinker-kit/open-kit.jpeg",
            alt: "ELECFREAKS Tinker Kit opened showing all the sensors and modules included",
            label: "In the Box",
          },
          {
            src: "/images/products/elecfreaks-micro-bit-tinker-kit/display-box-open.webp",
            alt: "Tinker Kit display box open with the manual visible and micro:bit connected to a laptop",
            label: "Getting Started",
          },
          {
            src: "/images/products/elecfreaks-micro-bit-tinker-kit/makecode-screenshot.jpg",
            alt: "Microsoft MakeCode block coding interface showing a micro:bit Tinker Kit program",
            label: "MakeCode",
          },
        ]}
        background="white"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="gray" />

      {/* FAQ Section */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "Is a micro:bit board included?",
            answer:
              "No, the Tinker Kit is an expansion pack that works with a BBC micro:bit board, which is sold separately. You can add a micro:bit Go Bundle as an add-on when purchasing this kit. Both V1 and V2 micro:bit boards are fully compatible.",
          },
          {
            question: "Do I need any coding experience?",
            answer:
              "Not at all! The kit is designed for beginners. You program everything with Microsoft MakeCode, which uses drag-and-drop blocks, no typing required. Custom blocks for every Tinker Kit sensor are built in, so your child just clicks and connects. When they're ready, they can switch to JavaScript or Python, same kit, more power.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "We recommend ages 10 and up for independent use. Younger children (8-9) can enjoy it comfortably with a parent or older sibling helping with the initial setup. The block-based coding is genuinely beginner-friendly, and the projects stay engaging well into the teen years.",
          },
          {
            question: "Is soldering required?",
            answer:
              "No soldering at all. Every sensor and module uses a simple 3-pin connector that plugs into the Octopus:bit breakout board. Components click in and out with no tools needed, making it safe and mess-free.",
          },
          {
            question: "Do I need a computer?",
            answer:
              "Yes, you'll need a computer, tablet, or iPad to write code. Microsoft MakeCode is entirely browser-based (no installation needed) and works on Windows, Mac, iOS, Android, and ChromeOS. Any modern device with a browser and a USB or Bluetooth connection will work.",
          },
          {
            question: "Are batteries included?",
            answer:
              "No. The kit includes a battery box that takes 2 × AAA batteries, which you'll need to supply separately. You can also power the micro:bit via the included USB cable connected to a computer.",
          },
          {
            question: "What can my child do after finishing the 39 projects?",
            answer:
              "Plenty! Each project is a starting point, not an endpoint, your child can modify the code, combine sensors from different projects, or invent something entirely new. The Octopus platform has hundreds of compatible sensors to expand with, and the ELECFREAKS Wiki is regularly updated with new guides. MakeCode also connects to a large global community of maker projects.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/elecfreaks-micro-bit-tinker-kit/whats-in-the-box.jpeg"
        imageAlt="ELECFREAKS micro:bit Tinker Kit components laid out showing all 13 modules and accessories"
        items={[
          "Octopus:bit Breakout Board (connects micro:bit to sensors)",
          "Crystal Battery Box (2 × AAA, batteries not included)",
          "Micro-B USB Cable",
          "OLED Display Module",
          "Mini Servo Motor (1.6kg torque)",
          "PIR Motion Sensor",
          "Soil Moisture Sensor",
          "ADKeypad (5-button analog gamepad)",
          "Crash Sensor",
          "Passive Buzzer",
          "Analog Rotation Brick (potentiometer)",
          "Red 5mm LED Brick",
          "Green 5mm LED Brick",
          "Blue 5mm LED Brick",
          "Jumper Wires",
          "Note: BBC micro:bit board not included",
        ]}
        background="white"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Compatibility", value: "BBC micro:bit V1 and V2" },
          { label: "Breakout Board", value: "Octopus:bit (EF03405)" },
          { label: "Voltage", value: "3.3V / 5V switchable via hardware switch" },
          { label: "Programming", value: "MakeCode (blocks), JavaScript, MicroPython" },
          { label: "Power", value: "2 × AAA batteries or USB (5V)" },
          { label: "Electronic Modules", value: "13 (plus jumper wires)" },
          { label: "Project Cases", value: "39 (free online wiki tutorials)" },
          { label: "Servo Torque", value: "1.6 kg/cm" },
          { label: "Display", value: '0.96" OLED (128 × 64 pixels)' },
          {
            label: "Package Dimensions",
            value: "192 × 135 × 38 mm",
          },
          { label: "Weight", value: "~250g" },
          { label: "Soldering Required", value: "No" },
        ]}
        background="gray"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started with the Tinker Kit"
        subtitle="39 projects. Real sensors. Code that does something. Give your child the kit that grows with them."
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
      "Expand your micro:bit with 13 plug-and-play sensors and 39 projects. Build alarms, games, robots and more. No soldering. Ages 10+.",
    alternates: {
      canonical: "/product/elecfreaks-micro-bit-tinker-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
