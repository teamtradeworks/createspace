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
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "ultimate-uno-r3-starter-kit";

export default async function UltimateUnoR3StarterKitPage() {
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
        tagline="The complete kit for learning electronics, coding, and building things that actually work"
        highlights={[
          "33 lessons covering circuits, sensors, motors, and more",
          "50+ components, RFID, gyroscope, motors, LCD, and beyond",
          "No soldering, no tools needed, start building immediately",
          "Compatible with the entire Arduino ecosystem",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Choose This Kit */}
      <NumberedSteps
        title="Why the Ultimate Kit?"
        subtitle="There are plenty of Arduino starter kits out there. Here's what makes this one worth it."
        steps={[
          {
            title: "Build Real Projects",
            description:
              "From motion-triggered alarms to RFID access systems, each of the 33 lessons produces something that actually does something. No throwaway demos.",
          },
          {
            title: "Every Major Sensor Included",
            description:
              "Gyroscope, real-time clock, RFID, ultrasonic, PIR motion, water level, sound, the sensors that make the best projects are already in the box.",
          },
          {
            title: "Skills That Transfer",
            description:
              "Electronics and programming are foundational skills. What your child learns here connects directly to robotics, IoT, engineering, and software careers.",
          },
        ]}
        background="navy-card"
      />

      {/* What's Inside */}
      <ImageTextBlock
        image="/images/products/ultimate-uno-r3-starter-kit/collage-of-components.jpg"
        imageAlt="Robotico Ultimate UNO R3 Starter Kit components spread out showing sensors, modules and the board"
        title="Everything in One Box"
        body="Most starter kits give you a board and a handful of LEDs. The Ultimate UNO R3 Kit goes further, much further. Inside you'll find over 50 individual components including sensors that detect motion, sound, temperature, humidity, water level, and acceleration; motors that spin, step, and sweep to precise angles; a real-time clock, an LCD display, RFID tags, a dot matrix display, and a gyroscope. All pre-soldered, all ready to wire up in minutes."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="33 Lessons. Zero Experience Needed."
        subtitle="The downloadable guide walks through every component in the kit, step by step. Your child can work through it in order, or jump straight to whatever looks most exciting."
        features={[
          {
            icon: "book",
            title: "Downloadable Guide",
            description:
              "33 illustrated lessons covering every component in the kit, from LED basics to RFID access systems",
          },
          {
            icon: "no-solder",
            title: "No Soldering Required",
            description:
              "All modules are pre-soldered and ready to use. Connect components with jumper wires and start building",
          },
          {
            icon: "code",
            title: "Learn Real Code",
            description:
              "Write C++ in the free Arduino IDE, the same language used in professional electronics and product development",
          },
          {
            icon: "lightbulb",
            title: "Advanced Sensors Included",
            description:
              "RFID, gyroscope, PIR motion, ultrasonic, real-time clock, components that unlock genuinely impressive projects",
          },
          {
            icon: "community",
            title: "Massive Community",
            description:
              "Once the guide is done, millions of free projects, tutorials, and forums open up, the learning never has to stop",
          },
          {
            icon: "badget-check",
            title: "Full Arduino Compatibility",
            description:
              "Every component is 100% Arduino-compatible. Add more sensors, shields, and modules as your child's skills grow",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* The Learning Angle */}
      <ImageTextBlock
        image="/images/products/ultimate-uno-r3-starter-kit/guide-lessons-and-code-sample.jpg"
        imageAlt="Robotico Ultimate UNO R3 Starter Kit guide showing lesson pages and code samples"
        title="Where Electronics Meets Code"
        body="Circuits and code aren't two separate things, each lesson in the guide teaches them together. Your child wires up a component, writes the code to control it, and sees the result immediately. That feedback loop is powerful: it makes abstract concepts like loops, variables, and conditionals click in a way that screen-based coding alone never can. Studies show that hands-on electronics learning improves STEM test scores by up to 36%, and the engagement speaks for itself."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Lessons You'll Build"
        highlight="33 guided lessons, from a blinking LED to a fully working RFID access system"
        subtitle="Each lesson builds on the last, introducing new components and concepts in a logical progression."
        projects={[
          {
            name: "LED Circuits",
            description: "Build and control LED circuits with buttons and code",
            concepts: "Digital output, loops, conditionals",
            image: "/images/products/ultimate-uno-r3-starter-kit/projects/project-led-circuit.jpg",
          },
          {
            name: "Sensor Readings",
            description: "Read temperature, humidity, and light from real sensors",
            concepts: "Analog input, sensor libraries, data display",
            image: "/images/products/ultimate-uno-r3-starter-kit/projects/project-sensors.jpg",
          },
          {
            name: "LCD Display",
            description: "Show text and live sensor data on a 16-character display",
            concepts: "I2C communication, LiquidCrystal library",
            image: "/images/products/ultimate-uno-r3-starter-kit/projects/project-lcd-display.jpg",
          },
          {
            name: "RFID Access System",
            description: "Build a contactless access system using RFID cards and tags",
            concepts: "SPI communication, RFID protocol, access control",
            image: "/images/products/ultimate-uno-r3-starter-kit/projects/project-rfid-access.jpg",
          },
          {
            name: "Motor Control",
            description: "Drive DC and stepper motors with precision speed and direction",
            concepts: "H-bridge, PWM, stepper sequences",
            image:
              "/images/products/ultimate-uno-r3-starter-kit/projects/project-motor-control.jpg",
          },
          {
            name: "Motion Sensor Alarm",
            description: "Detect movement with a PIR sensor and trigger a buzzer alarm",
            concepts: "PIR sensing, digital input, event-driven logic",
            image:
              "/images/products/ultimate-uno-r3-starter-kit/projects/project-motion-sensor.jpg",
          },
        ]}
        moreText="Plus 27 more lessons covering RGB LEDs, servo motors, joystick control, dot matrix displays, real-time clocks, relay switching, gyroscope sensing, and full remote control projects"
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* FAQ */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "Do I need any prior experience with electronics or coding?",
            answer:
              "Not at all. The guide starts from absolute zero, Lesson 0 is literally installing the software. Every lesson explains the concepts and the code, so your child can work through it independently without any background knowledge.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "We recommend the Ultimate kit for ages 12 and up for independent use. Curious 10–11 year olds can also tackle it well with some parental involvement, especially in the early lessons. The components and guide are all clearly labelled, this isn't a fiddly kit.",
          },
          {
            question: "Do I need a computer?",
            answer:
              "Yes, a computer running Windows, macOS, or Linux is needed to write and upload code using the free Arduino IDE. The board connects via the included USB cable. Most family laptops or desktops will work perfectly.",
          },
          {
            question: "Is soldering required?",
            answer:
              "No. All modules in this kit come pre-soldered. Components connect to the breadboard and UNO R3 board using jumper wires, so there are no hot tools, no exposed solder joints, and no risk of burning anything.",
          },
          {
            question: "Do I need batteries?",
            answer:
              "A 9V power adapter (EU plug) is included in the kit for standalone use. When connected to a computer for programming, the board is powered via USB, no battery needed. A 9V battery connector is also included if you want to run the kit away from a power point.",
          },
          {
            question: "What can they build once they've finished the 33 lessons?",
            answer:
              "That's where it gets exciting. Once the guide is done, every component is still there, reusable, reconfigurable, and waiting to be combined. Your child can build their own projects from scratch, explore millions of free Arduino community projects, or expand the kit with additional sensors and modules from any electronics supplier.",
          },
          {
            question: "How is this different from the Basic UNO R3 Starter Kit?",
            answer:
              "The Basic kit is a stripped-down introduction with LEDs, resistors, and a handful of components. The Ultimate kit adds a full suite of advanced sensors, RFID, gyroscope, ultrasonic, PIR motion, real-time clock, water level, plus motors, a dot matrix display, and an LCD screen. It's significantly more capable and supports far more ambitious projects.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/ultimate-uno-r3-starter-kit/whats-in-the-box.jpg"
        imageAlt="Robotico Ultimate UNO R3 Starter Kit unboxed showing all components and sensors"
        items={[
          "Arduino-compatible UNO R3 development board",
          "400-point breadboard",
          "Breadboard power supply module (3.3V & 5V)",
          "Prototype expansion board",
          "25× LEDs (mixed colours) + 1× RGB LED",
          "120× Resistors + 14× Capacitors",
          "2× Photoresistors + 1× Thermistor",
          "10× NPN transistors + 5× Diode rectifiers",
          "5× Push buttons + 1× Tilt switch",
          "DHT11 temperature & humidity sensor",
          "HC-SR501 PIR motion sensor",
          "HC-SR04 ultrasonic distance sensor",
          "GY-521 gyroscope & accelerometer module",
          "DS3231 Real Time Clock (RTC) module",
          "Water level detection sensor",
          "Sound sensor module",
          "RC522 RFID module + RFID card + key ring",
          "1602 LCD display module",
          "MAX7219 dot matrix LED display",
          "1-digit & 4-digit 7-segment displays",
          "Active buzzer + passive buzzer",
          "Servo motor",
          "Stepper motor + ULN2003 driver",
          "3V DC motor + IC L293D H-bridge",
          "5V relay module",
          "IC 74HC595 shift register",
          "Keypad module (4×4 membrane switch)",
          "Joystick module",
          "2× Potentiometers + 1× Rotary encoder",
          "IR remote control + IR receiver module",
          "65× Jumper wires + 20× Male-to-female DuPont wires",
          "USB cable",
          "9V 1A power adapter (EU plug)",
          "9V battery connector",
          "Downloadable PDF guide (33 lessons)",
        ]}
        background="white"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Microcontroller", value: "ATmega328P" },
          { label: "Compatible Platform", value: "Arduino UNO R3" },
          { label: "Operating Voltage", value: "5V (USB) or 9V (adapter/battery)" },
          { label: "Digital I/O Pins", value: "14 (6 support PWM)" },
          { label: "Analog Input Pins", value: "6" },
          { label: "Communication Protocols", value: "I2C, SPI, UART, PWM, IR" },
          { label: "Programming Language", value: "C/C++ via Arduino IDE" },
          { label: "Software", value: "Arduino IDE (free, Windows, macOS, Linux)" },
          { label: "Guide Format", value: "Downloadable PDF, 33 lessons" },
          { label: "Soldering Required", value: "No, all modules pre-soldered" },
        ]}
        background="gray"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started"
        subtitle="33 lessons. 50+ components. One kit that teaches real electronics and real code."
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
      "Learn electronics and coding with 33 hands-on lessons. Includes RFID, gyroscope, motors, LCD, and 50+ components. No soldering required. Ages 12+.",
    alternates: {
      canonical: "/product/ultimate-uno-r3-starter-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
