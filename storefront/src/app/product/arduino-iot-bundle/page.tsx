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
} from "@/components/product-sections";

const PRODUCT_HANDLE = "arduino-iot-bundle";

export default async function ArduinoIoTBundlePage() {
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
        tagline="Build 5 real IoT devices and connect them to the internet — no experience needed"
        highlights={[
          "5 imaginative step-by-step projects with full online tutorials",
          "Built-in Wi-Fi & Bluetooth — no extra parts to buy",
          "Works with the free Arduino IoT Cloud plan",
          "No soldering, no prior coding experience required",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why IoT Section */}
      <NumberedSteps
        title="Why Start with IoT?"
        subtitle="The Internet of Things is one of the fastest-growing fields in tech. This bundle makes it accessible from day one."
        steps={[
          {
            title: "Build Real Connected Devices",
            description:
              "These aren't toy circuits. Your teenager builds projects that connect to the internet, respond to real-world inputs, and do something meaningful — all from scratch.",
          },
          {
            title: "Industry-Ready Skills",
            description:
              "IoT engineering jobs grew 32% in a single year. The Arduino Nano RP2040 Connect is a professional board used by engineers worldwide — skills earned here are the real deal.",
          },
          {
            title: "Five Genuinely Fun Projects",
            description:
              "From training a cat with sound to building a living digital pet, each tutorial is creative, surprising, and deeply satisfying to complete.",
          },
        ]}
        background="navy-card"
      />

      {/* From Consumer to Creator */}
      <ImageTextBlock
        image="/images/products/arduino-iot-bundle/group-of-friends-gathered-playing-with-iot-bundle.jpg"
        imageAlt="Group of friends gathered around an Arduino IoT Bundle project"
        title="From Screen Time to Build Time"
        body="There's a big difference between using technology and understanding it. The IoT Bundle flips that switch — turning your teenager from a passive consumer into someone who builds the things that connect the world. These projects run on the same board used by professional makers and engineers. It's not a toy. It's a real toolkit."
        layout="image-left"
        background="white"
      />

      {/* Key Features Grid */}
      <FeatureGrid
        title="What Makes This Kit Special"
        subtitle="Everything your teenager needs to build their first connected devices — hardware, software, and step-by-step guidance included."
        features={[
          {
            icon: "wifi",
            title: "Wi-Fi & Bluetooth Built In",
            description:
              "The Arduino Nano RP2040 Connect has wireless connectivity on-board — no extra shields or modules to buy.",
          },
          {
            icon: "globe",
            title: "Free Cloud Platform",
            description:
              "All 5 projects work with the free Arduino IoT Cloud plan. Build dashboards, monitor sensors, and control devices remotely.",
          },
          {
            icon: "app",
            title: "Mobile Dashboard App",
            description:
              "Use the free Arduino IoT Remote app (iOS or Android) to interact with projects from anywhere in the house.",
          },
          {
            icon: "shield",
            title: "No Soldering Required",
            description:
              "Safe breadboard connections throughout — no hot tools, no specialist equipment, just building.",
          },
          {
            icon: "code",
            title: "Real Programming Skills",
            description:
              "Write actual Arduino code — the same language used in professional embedded systems and IoT products.",
          },
          {
            icon: "book",
            title: "Full Online Tutorials",
            description:
              "Every project has a complete Arduino-published tutorial with circuit diagrams, full code, and concept explanations.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Learn Online, Build in Real Life */}
      <ImageTextBlock
        image="/images/products/arduino-iot-bundle/online-tutorial-platform.jpg"
        imageAlt="Arduino IoT Bundle online tutorial platform showing step-by-step project guide"
        title="Learn Online, Build in Real Life"
        body="Each of the five projects is supported by Arduino's official step-by-step tutorials, complete with wiring diagrams, full code, and plain-English explanations of every concept. Your teenager can work through them completely independently — no technical knowledge required on your end. Once the tutorials are done, the board and components are theirs to build anything they can imagine."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="5 Projects You'll Build"
        highlight="5 guided IoT projects with complete online tutorials"
        subtitle="Each project teaches different skills — from cloud dashboards and motor control to sensor data and mobile apps."
        projects={[
          {
            name: "I Love You Pillow",
            description: "Build a hug-sensing pillow that sends emoji messages to a loved one's device via the Arduino IoT Cloud",
            concepts: "Capacitive sensing, IoT Cloud, real-time data",
            image: "/images/products/arduino-iot-bundle/i-love-you-pillow.avif",
          },
          {
            name: "Puzzle Box",
            description: "Lock a cardboard box with a servo motor and build a potentiometer combination lock with colour-coded hints",
            concepts: "Servo motors, analog input, IoT dashboard",
            image: "/images/products/arduino-iot-bundle/puzzle-box.jpg",
          },
          {
            name: "Pavlov's Cat",
            description: "Train a pet to respond to a melody using a servo-powered food dispenser — track training progress in the cloud",
            concepts: "Motor control, light sensing, cloud logging",
            image: "/images/products/arduino-iot-bundle/built-project-for-pet-training.avif",
          },
          {
            name: "The Nerd",
            description: "Create a desktop electronic pet that needs food and light to survive, monitored live on an IoT dashboard",
            concepts: "State machines, cloud variables, RGB LED",
            image: "/images/products/arduino-iot-bundle/digital-pet-project.jpg",
          },
          {
            name: "Plant Communicator",
            description: "Monitor a plant's soil moisture, temperature, and light levels in real time via a cloud dashboard with alerts",
            concepts: "Sensor calibration, data visualisation, alerting",
            image: "/images/products/arduino-iot-bundle/plant-moisture-communicator.jpg",
          },
        ]}
        background="gray"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="What You'll Be Building"
        subtitle="From cloud-connected pets to smart plant monitors — all made from scratch."
        images={[
          {
            src: "/images/products/arduino-iot-bundle/arduiino-iot-connected.jpg",
            alt: "Arduino IoT Bundle board connected and sending data to the cloud",
          },
          {
            src: "/images/products/arduino-iot-bundle/i-love-you-pillow.avif",
            alt: "I Love You Pillow project — a huggable pillow that sends emojis via Arduino IoT Cloud",
          },
          {
            src: "/images/products/arduino-iot-bundle/nano-connected-to-breadboard.jpg",
            alt: "Arduino Nano RP2040 Connect plugged into a breadboard with components wired up",
          },
          {
            src: "/images/products/arduino-iot-bundle/puzzle-box.jpg",
            alt: "Puzzle Box project — a cardboard box locked by a potentiometer combination",
          },
          {
            src: "/images/products/arduino-iot-bundle/board-connected-with-light-on.jpg",
            alt: "Arduino IoT Bundle board connected with LED indicator lit up",
          },
          {
            src: "/images/products/arduino-iot-bundle/built-project-for-pet-training.avif",
            alt: "Pavlov's Cat project — an IoT pet training device with melody and food dispenser",
          },
          {
            src: "/images/products/arduino-iot-bundle/plant-moisture-communicator.jpg",
            alt: "Plant Communicator project — monitoring soil moisture, temperature and light via IoT dashboard",
          },
          {
            src: "/images/products/arduino-iot-bundle/digital-pet-project.jpg",
            alt: "The Nerd project — a desktop IoT digital pet monitored via the Arduino Cloud",
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
            question: "Do I need any electronics or coding experience?",
            answer:
              "Not at all! The IoT Bundle is designed for complete beginners. Each project has a full online tutorial that explains everything from scratch — what each component does, how to write the code, and how to connect to the cloud. Most people complete their first project within a couple of hours.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "We recommend this for ages 16 and up. The projects involve cloud setup, Arduino programming, and some problem-solving that suits older teenagers and adults. A younger teen with a strong interest in tech can also enjoy it — they may want a parent nearby for initial software setup.",
          },
          {
            question: "Do I need a computer?",
            answer:
              "Yes, you'll need a computer (Windows, macOS, or Linux) to install the free Arduino Create Agent and access the Arduino IoT Cloud web editor. The free plan covers all five included projects — no subscription needed.",
          },
          {
            question: "What batteries do I need?",
            answer:
              "Two of the five projects — the Puzzle Box and Pavlov's Cat — use a servo motor that requires a 9V battery, which is not included in the bundle. The other three projects run from USB power with no batteries needed.",
          },
          {
            question:
              "Some projects mention household items. What do I need to provide?",
            answer:
              "The I Love You Pillow project requires a physical pillow and some aluminium foil (used as a DIY sensor). The Puzzle Box and Pavlov's Cat use a cardboard box as the enclosure. Everything else — all the electronics — is in the box.",
          },
          {
            question: "What can my teenager do after finishing the 5 projects?",
            answer:
              "Plenty! The Arduino Nano RP2040 Connect is a full production board — not a toy. With the skills from these tutorials, your teenager will be equipped to build their own smart home devices, environmental monitors, custom dashboards, and much more. The global Arduino community offers thousands of free project ideas.",
          },
          {
            question: "Is the Arduino IoT Cloud really free?",
            answer:
              "Yes — all five included projects can be completed on the free plan, which supports up to 2 connected devices. That's more than enough to work through everything in this bundle. Paid plans exist for more advanced or larger-scale projects, but you won't need them here.",
          },
        ]}
        background="white"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/arduino-iot-bundle/whats-in-the-box.webp"
        imageAlt="Arduino IoT Bundle contents laid out showing all components"
        items={[
          "Arduino Nano RP2040 Connect (Wi-Fi, Bluetooth, IMU, microphone built-in)",
          "Micro USB cable",
          "400-point breadboard",
          "70× solid-core jumper wires",
          "2× stranded jumper wires",
          "6× phototransistors",
          "3× potentiometers (10 kΩ)",
          "10× pushbuttons",
          "1× temperature sensor (TMP36)",
          "1× tilt sensor",
          "1× alphanumeric LCD (16 × 2 characters)",
          "28× LEDs (1 RGB, 8 red, 8 green, 8 yellow, 3 blue)",
          "1× piezoelectric buzzer",
          "1× small DC motor",
          "1× servo motor",
          "Assorted resistors, capacitors, and diodes",
        ]}
        background="gray"
      />

      {/* Technical Details */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Board", value: "Arduino Nano RP2040 Connect" },
          {
            label: "Processor",
            value: "Raspberry Pi RP2040 (dual-core Arm Cortex-M0+, 133 MHz)",
          },
          {
            label: "Connectivity",
            value: "Wi-Fi 802.11b/g/n, Bluetooth 4.2 / BLE",
          },
          {
            label: "Wireless Module",
            value: "u-blox NINA-W102",
          },
          {
            label: "Built-in Sensors",
            value: "6-axis IMU (accelerometer + gyroscope), digital MEMS microphone",
          },
          { label: "Memory", value: "264 KB SRAM, 16 MB flash" },
          { label: "Digital I/O Pins", value: "20 (all PWM + interrupt capable)" },
          { label: "Analog Inputs", value: "8" },
          { label: "Operating Voltage", value: "3.3 V DC" },
          { label: "Power", value: "Micro-USB" },
          { label: "Security", value: "Hardware authentication coprocessor (ATECC608A)" },
          { label: "Software", value: "Arduino IDE / Arduino IoT Cloud (free plan)" },
          { label: "OS Compatibility", value: "Windows, macOS, Linux (browser); iOS, Android (remote app)" },
          { label: "SKU", value: "AKX00042" },
        ]}
        background="white"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started with IoT"
        subtitle="Everything needed to build 5 real connected devices — and the skills to keep building long after."
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
      "Build 5 real IoT projects with the Arduino IoT Bundle. Includes Arduino Nano RP2040 Connect with built-in Wi-Fi, Bluetooth, and full online tutorials. Ages 16+.",
    alternates: {
      canonical: "/product/arduino-iot-bundle",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
