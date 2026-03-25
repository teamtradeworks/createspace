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
  ProductFAQ,
  ProductReviews,
  WhatsIncluded,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "ultimate-mega-2560-starter-kit";

export default async function UltimateMega2560StarterKitPage() {
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
        tagline="Your complete electronics and coding lab — 33 lessons, no experience needed"
        highlights={[
          "33 step-by-step lessons with a 223-page downloadable guide",
          "No soldering, no experience needed — plug in and start building",
          "18 sensor and actuator modules including RFID, gyroscope, and motors",
          "More powerful than a standard Arduino board — bigger projects, more possibilities",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why the Mega 2560 */}
      <NumberedSteps
        title="Why the Mega 2560?"
        subtitle="Not all electronics kits are created equal. The Mega 2560 board gives your child the power to build projects that smaller boards simply can't run."
        steps={[
          {
            title: "More Power, More Projects",
            description:
              "The Mega 2560 packs 54 programmable pins and 256KB of memory — far more than a standard Arduino Uno. That extra headroom means your child can tackle more complex, creative projects without hitting a ceiling.",
          },
          {
            title: "Real-World Technology",
            description:
              "With 18 modules including a gyroscope, RFID reader, real-time clock, and motion sensor, your child learns to work with the same technology found inside smartphones, security systems, and smart home devices.",
          },
          {
            title: "Skills That Last a Lifetime",
            description:
              "Arduino is the world's most popular electronics learning platform. The programming and circuit skills learned here translate directly to university-level coursework and careers in engineering, robotics, and IoT development.",
          },
        ]}
        background="navy-card"
      />

      {/* Components Overview */}
      <ImageTextBlock
        image="/images/products/ultimate-mega-2560-starter-kit/mega-2560-components-collage.jpg"
        imageAlt="Assorted components from the Mega 2560 kit including colourful LEDs, resistors, capacitors, and transistors organised in a storage box"
        title="200+ Components, Endless Possibilities"
        body="Everything your child needs to experiment with electronics is packed into one kit. From 120 resistors and 25 LEDs to servo motors, stepper motors, and a real-time clock module — the variety means no two lessons feel the same. Once the 33 guided lessons are complete, those same components become building blocks for their own inventions."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="What Makes This Kit Different"
        subtitle="Designed for serious learners who want to build real things — not just blink a few LEDs."
        features={[
          {
            icon: "book",
            title: "223-Page Guide",
            description:
              "Step-by-step instructions with circuit diagrams and complete code for every one of the 33 lessons — all available as a free PDF download.",
          },
          {
            icon: "puzzle",
            title: "33 Guided Lessons",
            description:
              "Progress naturally from a single blinking LED to controlling stepper motors with a remote — every lesson building on the last.",
          },
          {
            icon: "lightbulb",
            title: "18 Sensor Modules",
            description:
              "Motion, temperature, sound, water, RFID, gyroscope, and more — your child interacts with the real world through code.",
          },
          {
            icon: "code",
            title: "Real C/C++ Programming",
            description:
              "No block-based shortcuts. Your child writes actual code using the Arduino IDE — the same language used by professional embedded systems engineers.",
          },
          {
            icon: "shield",
            title: "No Soldering Required",
            description:
              "All modules are pre-soldered. Just connect with jumper wires and start building — no extra tools, no safety concerns.",
          },
          {
            icon: "globe",
            title: "Arduino Compatible",
            description:
              "Every component works with any Arduino board, unlocking access to thousands of free community projects and tutorials online.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Guide Section */}
      <ImageTextBlock
        image="/images/products/ultimate-mega-2560-starter-kit/mega-2560-lessons-guide.jpg"
        imageAlt="Mega 2560 starter kit guide and code samples alongside kit components"
        title="A Lesson for Every Level"
        body="The 223-page guide takes complete beginners from installing the Arduino IDE all the way to controlling stepper motors with a rotary encoder — at their own pace. Each lesson builds naturally on the last, with clear circuit diagrams and working code included. Whether your child completes one lesson a day or spends an entire weekend on a run, the guide keeps them moving forward independently."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Lessons You'll Build"
        highlight="33 hands-on lessons across a 223-page downloadable guide"
        subtitle="Lessons are ordered from simplest to most complex — each one building on what came before."
        projects={[
          {
            name: "Colour-Mixing LED",
            description: "Mix red, green, and blue to produce any colour using PWM",
            concepts: "PWM, analogWrite, colour theory",
            image: "/images/products/ultimate-mega-2560-starter-kit/project-led-components.jpg",
          },
          {
            name: "Servo Motor",
            description: "Command a servo to sweep precisely to any angle",
            concepts: "Servo library, angle control",
            image: "/images/products/ultimate-mega-2560-starter-kit/project-servo-motor.jpg",
          },
          {
            name: "LCD Display",
            description: "Show live text and sensor data on a 16×2 screen",
            concepts: "LiquidCrystal library, display output",
            image: "/images/products/ultimate-mega-2560-starter-kit/project-lcd-display.jpg",
          },
          {
            name: "LED Dot Matrix",
            description: "Drive an 8×8 LED matrix from just 3 pins using the MAX7219 chip",
            concepts: "SPI communication, matrix addressing",
            image: "/images/products/ultimate-mega-2560-starter-kit/project-dot-matrix-display.jpg",
          },
          {
            name: "Digital Counter",
            description: "Build a 4-digit counter or timer on a 7-segment display",
            concepts: "Multiplexing, timer logic, display cycling",
            image:
              "/images/products/ultimate-mega-2560-starter-kit/project-seven-segment-display.jpg",
          },
          {
            name: "RFID Access System",
            description: "Build a contactless key card reader — tap to unlock",
            concepts: "SPI protocol, RFID module, access control",
            image: "/images/products/ultimate-mega-2560-starter-kit/project-rfid-keypad.jpg",
          },
        ]}
        moreText="Plus 27 more lessons covering ultrasonic distance measurement, temperature gauges, motion alarms, DC fan control, real-time clocks, and stepper motor control"
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* FAQ */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "Does my child need any experience with electronics or coding?",
            answer:
              "Not at all. The guide starts from scratch — Lesson 0 walks through installing the free Arduino IDE step by step. By Lesson 2, they'll have their first LED blinking. No prior knowledge is required.",
          },
          {
            question: "What age is this kit suitable for?",
            answer:
              "We recommend the Mega 2560 kit for ages 13 and up. The lessons involve reading circuit diagrams and writing code, so it suits teens and adults best. Children aged 10–12 who are already comfortable with technology may manage well with some adult support.",
          },
          {
            question: "Does my child need a computer?",
            answer:
              "Yes — they'll need a computer (Windows, Mac, or Linux) with the free Arduino IDE installed to write and upload code. Lesson 0 in the guide covers the full setup process, so there's nothing to figure out on your own.",
          },
          {
            question: "Is soldering required?",
            answer:
              "No. Every module in this kit comes pre-soldered. Your child simply connects components using jumper wires on the breadboard — no heat, no soldering iron, no fuss.",
          },
          {
            question: "What can they do after finishing all 33 lessons?",
            answer:
              "The components don't go back in the box. After completing the guide, your child can mix and match components to build their own projects. The Arduino community has thousands of free tutorials online, and every component in this kit works with any Arduino board for future projects.",
          },
          {
            question: "Do I need to buy batteries?",
            answer:
              "The kit includes a 9V 1A mains power adapter, so your child can use the kit plugged in. A 9V battery connector is also included for portable use — but the battery itself is not included.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/ultimate-mega-2560-starter-kit/mega-2560-whats-in-the-box.jpg"
        imageAlt="Robotico Ultimate Mega 2560 R3 Starter Kit unboxed showing board, modules, and components"
        items={[
          "Mega 2560 R3 Controller Board",
          "Prototype Expansion Board",
          "830 Tie-Points Breadboard",
          "Power Supply Module (3.3V & 5V)",
          "PIR Motion Sensor",
          "Ultrasonic Distance Sensor",
          "DHT11 Temperature & Humidity Sensor",
          "Gyroscope & Accelerometer Module (GY-521)",
          "Real Time Clock Module (DS3231)",
          "Sound Sensor Module",
          "Water Level Detection Sensor",
          "IR Receiver Module",
          "RC522 RFID Module",
          "Joystick Module",
          "Rotary Encoder Module",
          "Membrane Keypad (4×4)",
          "LCD 1602 Display Module",
          "MAX7219 LED Dot Matrix Module",
          "1-Digit 7-Segment Display",
          "4-Digit 7-Segment Display",
          "Servo Motor (SG90)",
          "Stepper Motor & Driver Board (ULN2003)",
          "3V DC Motor with Fan Blade",
          "5V Relay",
          "Active Buzzer",
          "Passive Buzzer",
          "Remote Control (IR)",
          "25 LEDs (red, yellow, blue, green, white)",
          "RGB LED",
          "2× Potentiometer (10K)",
          "5× Button",
          "2× Photoresistor",
          "Thermistor",
          "Tilt Ball Switch",
          "120 Resistors (assorted values)",
          "14 Capacitors (electrolytic and ceramic)",
          "10 NPN Transistors",
          "5 Diode Rectifiers",
          "74HC595 Shift Register IC",
          "L293D Motor Driver IC",
          "65 Jumper Wires",
          "20 Female-to-Male DuPont Wires",
          "USB Cable",
          "9V Battery Connector with DC Jack",
          "9V 1A Power Adapter",
          "223-page downloadable PDF guide (33 lessons)",
        ]}
        background="white"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Microcontroller", value: "ATmega 2560" },
          { label: "Operating Voltage", value: "5V" },
          { label: "Input Voltage", value: "7–12V recommended" },
          { label: "Digital I/O Pins", value: "54 (15 provide PWM output)" },
          { label: "Analog Input Pins", value: "16" },
          { label: "Flash Memory", value: "256 KB" },
          { label: "SRAM", value: "8 KB" },
          { label: "EEPROM", value: "4 KB" },
          { label: "Coding Platform", value: "Arduino IDE (free download)" },
          { label: "OS Compatibility", value: "Windows / Mac OS X / Linux" },
          { label: "Guide", value: "223-page downloadable PDF (33 lessons)" },
          { label: "Soldering Required", value: "No" },
        ]}
        background="gray"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started with Electronics"
        subtitle="33 lessons, 200+ components, one complete kit. Everything your child needs to start building real things."
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
      "Learn electronics and coding with 33 step-by-step lessons. Includes 200+ components, RFID, gyroscope, motors and a 223-page guide. Ages 13+, no soldering required.",
    alternates: {
      canonical: "/product/ultimate-mega-2560-starter-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
