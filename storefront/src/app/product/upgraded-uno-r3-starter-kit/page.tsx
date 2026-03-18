import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  NumberedSteps,
  ImageTextBlock,
  FeatureGrid,
  ProjectShowcase,
  SkillTags,
  ProductFAQ,
  ProductReviews,
  WhatsIncluded,
  Specifications,
  CallToAction,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "upgraded-uno-r3-starter-kit";

export default async function UpgradedUnoR3StarterKitPage() {
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
        tagline="27 hands-on projects to master electronics and coding — step by step"
        highlights={[
          "27 lessons covering sensors, motors, RFID, displays, and more",
          "No soldering, no tools — pre-soldered modules, just plug and build",
          "Supports both Arduino IDE (C/C++) and Scratch block coding",
          "Downloadable guide with wiring diagrams and ready-to-run code",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why This Kit */}
      <NumberedSteps
        title="Why the Upgraded UNO R3?"
        subtitle="Not all starter kits are created equal. This one goes further — with more sensors, more modules, and more of the components that turn basic circuits into real-world projects."
        steps={[
          {
            title: "Real Electronics, Real Code",
            description:
              "Your child won't just follow recipes — they'll understand how components work and write code that controls them. From LEDs to RFID modules, every lesson explains the why behind the what.",
          },
          {
            title: "27 Lessons That Build On Each Other",
            description:
              "Projects progress from blinking a single LED to building motion-activated alarms and contactless RFID systems. Each lesson adds new concepts so skills compound over time.",
          },
          {
            title: "Two Ways to Code",
            description:
              "Beginners can start with Scratch-style block coding (via ACECode) before transitioning to text-based Arduino C/C++ — so your child grows into the kit rather than outgrowing it.",
          },
        ]}
        background="navy-card"
      />

      {/* UNO Board + RFID ImageTextBlock */}
      <ImageTextBlock
        image="/images/products/upgraded-uno-r3-starter-kit/uno-rfid-board.jpg"
        imageAlt="Arduino-compatible UNO R3 board alongside an RFID module and component diagram"
        title="Meet the Board Behind the Build"
        body="At the heart of every lesson is an Arduino-compatible UNO R3 — the most widely used learning board in electronics education. Alongside it sits an RFID module, one of the components that sets this kit apart. Your child won't just learn to blink an LED — they'll build systems that read key cards, measure distances, control motors, and display real-time data. Real components. Real code. Real results."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="What Makes This Kit Stand Out"
        subtitle="The Upgraded UNO R3 includes components you won't find in entry-level kits — giving your child room to build more ambitious projects."
        features={[
          {
            icon: "book",
            title: "27 Guided Lessons",
            description:
              "Every lesson includes a wiring diagram, sample code, and a clear explanation — no prior experience needed.",
          },
          {
            icon: "sensor",
            title: "9+ Sensors",
            description:
              "Motion, light, sound, flame, ultrasonic, gyroscope, temperature, humidity — a full toolkit for interactive projects.",
          },
          {
            icon: "touch",
            title: "No Soldering Required",
            description:
              "All modules come pre-soldered. Your child can start building within minutes of opening the box.",
          },
          {
            icon: "wifi",
            title: "RFID Technology",
            description:
              "Build real contactless identification systems — the same technology behind access cards and tap-to-pay.",
          },
          {
            icon: "robot",
            title: "Three Motor Types",
            description:
              "Servo, DC, and stepper motors in one kit — covering movement, precision, and automation projects.",
          },
          {
            icon: "puzzle",
            title: "Organised Storage Case",
            description:
              "A sturdy dual-level compartment case keeps every component sorted and ready for the next build.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Sensor Variety ImageTextBlock */}
      <ImageTextBlock
        image="/images/products/upgraded-uno-r3-starter-kit/sensor-modules.jpg"
        imageAlt="Close-up of sensor modules including sound sensor, LCD display, and water level sensor organised in the kit case"
        title="Nine Sensors, Endless Possibilities"
        body="Most basic kits give you a light sensor and call it a day. The Upgraded UNO R3 includes nine: motion (PIR), ultrasonic distance, sound, flame, light (LDR), temperature, humidity, water level, and gyroscope/accelerometer. Each one opens a different category of project — from weather stations and intruder alarms to tilt-sensitive games and fire detectors. Your child picks up a new sensor, learns how it works, and builds something with it. That's what makes the difference between a kit they finish in a weekend and one that keeps them building for months."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="A Sample of What They'll Build"
        highlight="27 lessons — from blinking LEDs to RFID access systems"
        subtitle="Lessons progress from electronics fundamentals all the way to multi-component builds. Here are six to give you a taste."
        projects={[
          {
            name: "Blink & LED Patterns",
            description: "Control LEDs with timing loops — the classic first project that proves they can program hardware.",
            concepts: "Digital output, loops, timing",
            image: "/images/products/upgraded-uno-r3-starter-kit/projects/button-switches-display.jpg",
          },
          {
            name: "Distance Alarm",
            description: "Build an ultrasonic sensor that measures distance and triggers a buzzer when something gets too close.",
            concepts: "Analog input, thresholds, conditionals",
            image: "/images/products/upgraded-uno-r3-starter-kit/projects/sensor-modules.jpg",
          },
          {
            name: "LCD Message Board",
            description: "Display live sensor data — temperatures, distances, custom messages — on a 16x2 LCD screen.",
            concepts: "I2C communication, strings, display control",
            image: "/images/products/upgraded-uno-r3-starter-kit/projects/lcd-keypad-servo.jpg",
          },
          {
            name: "Digital Displays",
            description: "Drive 7-segment and dot matrix displays to show numbers, countdowns, and scrolling text.",
            concepts: "Shift registers, multiplexing, display drivers",
            image: "/images/products/upgraded-uno-r3-starter-kit/projects/display-modules.jpg",
          },
          {
            name: "RFID Access Control",
            description: "Build a contactless door lock that reads key cards and fobs — approve or deny access with code.",
            concepts: "RFID, conditional logic, access control",
            image: "/images/products/upgraded-uno-r3-starter-kit/projects/uno-rfid-board.jpg",
          },
          {
            name: "Servo Motor Control",
            description: "Precisely control a servo motor's angle with a potentiometer — the foundation of robotic arms and locks.",
            concepts: "Servo motors, PWM, analog input",
            image: "/images/products/upgraded-uno-r3-starter-kit/projects/servo-jumper-wires.jpg",
          },
        ]}
        moreText="Plus 21 more lessons including stepper motors, relay switches, IR remote control, joystick input, motion detection, and more."
        background="gray"
      />

      {/* Skill Tags */}
      <SkillTags
        title="Skills Developed"
        tags={["Electronics", "Coding", "Problem Solving", "Logical Thinking"]}
        background="white"
      />

      {/* FAQ */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "Does my child need any prior experience?",
            answer:
              "Not at all. The downloadable guide starts from absolute basics — installing the software, understanding components, and writing a first line of code. No electronics or programming background is needed.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "We recommend this kit for ages 12 and up working independently. Younger children (10–11) can absolutely enjoy it with some adult involvement, especially for the first few lessons. The Scratch block-coding option via ACECode also makes it more accessible for younger beginners.",
          },
          {
            question: "Do I need a computer?",
            answer:
              "Yes — your child will need a computer (Windows, macOS, or Linux) to write and upload code to the board. The Arduino IDE is free to download. No internet connection is needed once everything is set up.",
          },
          {
            question: "Is a 9V battery included?",
            answer:
              "A 9V battery is not included, but one isn't needed for most projects. The kit includes a USB cable and a 9V battery connector — USB power from a computer is sufficient for all 27 lessons. A battery is only needed for standalone, portable projects.",
          },
          {
            question: "Is the guide a printed book or a digital download?",
            answer:
              "The guide is a downloadable PDF — there's no printed book in the box. You'll find the download link on the CREATESPACE guides page after purchase. The guide includes wiring diagrams, circuit photos, step-by-step code, and explanations for all 27 lessons.",
          },
          {
            question: "What can my child build after completing all 27 lessons?",
            answer:
              "The sky's the limit. All components are reusable and fully Arduino-compatible, so your child can combine what they've learned to build their own inventions — weather stations, smart alarms, automated systems, and more. The Arduino community has thousands of free project tutorials to explore next.",
          },
        ]}
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/upgraded-uno-r3-starter-kit/whats-in-the-box.jpg"
        imageAlt="Robotico Upgraded UNO R3 Starter Kit open case showing all components organised in compartments"
        items={[
          "Arduino-compatible UNO R3 development board",
          "USB cable (for programming and power)",
          "9V battery connector (snap lead)",
          "830-point solderless breadboard",
          "Breadboard power supply module (3.3V & 5V)",
          "65 x jumper wires (mixed)",
          "10 x female-to-male DuPont cables",
          "30 x resistors (assorted values)",
          "Capacitors and diodes",
          "NPN transistors",
          "74HC595 shift register IC",
          "15 x LEDs (red, green, yellow)",
          "RGB three-colour LED module",
          "5 x button switches with caps",
          "Potentiometer, rotary encoder, joystick module",
          "16-button matrix keypad",
          "IR remote control",
          "Photoresistors (LDR), flame sensor, sound sensor",
          "DHT11 temperature & humidity sensor",
          "LM35DZ temperature sensor",
          "Water level sensor, PIR motion sensor",
          "Ultrasonic distance sensor (HC-SR04)",
          "Gyroscope and accelerometer module",
          "LCD1602 display",
          "1-digit and 4-digit 7-segment LED displays",
          "8x8 dot matrix LED display",
          "RFID module with key fob and card",
          "Servo motor, DC motor with driver",
          "Stepper motor and driver module",
          "5V relay module, active and passive buzzers",
          "RTC (real-time clock) module",
          "Prototype expansion board",
          "Sturdy dual-level compartmentalised storage case",
        ]}
        background="gray"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Board", value: "Arduino-compatible UNO R3 (ATmega328P)" },
          { label: "Operating Voltage", value: "5V" },
          { label: "Power Options", value: "USB (via computer) or 9V battery (connector included)" },
          { label: "Digital I/O Pins", value: "14 (6 with PWM output)" },
          { label: "Analogue Input Pins", value: "6" },
          { label: "Coding Software", value: "Arduino IDE (C/C++) + ACECode (Scratch block coding)" },
          { label: "OS Compatibility", value: "Windows, macOS, Linux" },
          { label: "Guide", value: "Downloadable PDF — all 27 lessons with wiring diagrams and code" },
          { label: "Soldering Required", value: "No — all modules pre-soldered" },
          { label: "Dimensions", value: "230 × 163 × 60 mm" },
          { label: "Weight", value: "0.6 kg" },
          { label: "Warranty", value: "6 months" },
        ]}
        background="white"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started with Electronics"
        subtitle="27 lessons. 60+ components. One kit that takes your child from complete beginner to confident maker."
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
      "27 hands-on electronics and coding projects for beginners aged 12+. Includes RFID, sensors, motors, displays, and a downloadable guide. No soldering required.",
    alternates: {
      canonical: "/product/upgraded-uno-r3-starter-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
