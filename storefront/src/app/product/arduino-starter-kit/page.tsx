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
  VideoEmbed,
  Specifications,
  ProductReviews,
  ProjectShowcase,
  CallToAction,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "arduino-starter-kit";

export default async function ArduinoStarterKitPage() {
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
        tagline="Your gateway to electronics, coding, and endless creativity"
        highlights={[
          "15 hands-on projects with step-by-step instructions",
          "170-page project book included",
          "No prior experience needed",
          "Learn real-world electronics and programming",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Arduino Section */}
      <NumberedSteps
        title="Why Start with Arduino?"
        subtitle="Arduino is the world's most popular platform for learning electronics and coding. Used by millions of makers, educators, and professionals worldwide."
        steps={[
          {
            title: "Build Real Things",
            description: "Move beyond screen-based coding. Create physical projects that light up, move, and respond to the real world.",
          },
          {
            title: "Industry Standard",
            description: "Arduino skills transfer directly to careers in engineering, robotics, IoT, and product development.",
          },
          {
            title: "Massive Community",
            description: "Join millions of makers. Find tutorials, get help, and share your creations with a supportive global community.",
          },
        ]}
        background="navy-card"
      />

      {/* Video Section */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=_2O_IhdJNJ4"
        title="See the Arduino Starter Kit in Action"
        background="gray"
      />

      {/* What Is Arduino Section */}
      <ImageTextBlock
        image="/images/products/arduino-starter-kit/kids_working_on_project.jpg"
        imageAlt="Children working together on an Arduino project"
        title="Your First Electronics Lab"
        body="The official Arduino Starter Kit is built around the Arduino UNO — the world's most popular learning board for electronics and coding. Inside you'll find over 100 components including LEDs, sensors, motors, a breadboard, and jumper wires, along with a 170-page printed guidebook that walks you through 15 real projects. Each project teaches actual C/C++ programming and hands-on circuit building, starting from absolute basics and gradually introducing more advanced concepts. No prior experience with electronics or coding is needed — the book explains everything from what a resistor does to how to write your first loop."
        layout="image-left"
        background="white"
      />

      {/* Features Grid */}
      <FeatureGrid
        title="What's Included"
        subtitle="The Arduino Starter Kit is designed for complete beginners. No soldering, no complex setup - just unbox and start building."
        features={[
          {
            icon: "book",
            title: "170-Page Project Book",
            description: "Clear, illustrated instructions guide you through each project step by step",
          },
          {
            icon: "puzzle",
            title: "15 Complete Projects",
            description: "From blinking LEDs to motorised projects, each one teaches new concepts",
          },
          {
            icon: "code",
            title: "Learn Real Coding",
            description: "Write actual C/C++ code that controls your creations",
          },
          {
            icon: "lightbulb",
            title: "100+ Components",
            description: "LEDs, sensors, motors, buttons, and more - all quality components included",
          },
          {
            icon: "globe",
            title: "Free Online Resources",
            description: "Access additional tutorials, community forums, and project ideas",
          },
          {
            icon: "shield",
            title: "Safe & Durable",
            description: "Low voltage electronics safe for learning. Quality components that last",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Life Skills Section */}
      <ImageTextBlock
        image="/images/products/arduino-starter-kit/arduino_board_laptop_on_desk_guidebook_open.jpg"
        imageAlt="Arduino setup with laptop and open guidebook on desk"
        title="Skills They'll Develop"
        body="When your child works through Arduino projects, they're building character alongside circuits. They'll develop resilience by learning that mistakes aren't failures - just opportunities to try a different approach. They'll build confidence as each completed project proves they can tackle unfamiliar challenges. And they'll experience the satisfaction that comes from creating something real with their own hands."
        layout="image-right"
        background="gray"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Projects You'll Build"
        highlight="15 real-world projects in a 170-page printed guidebook"
        subtitle="Each project builds on the last, gradually introducing new concepts and components."
        projects={[
          {
            name: "Spaceship Interface",
            description: "Create a control panel with buttons and LEDs",
            concepts: "Digital I/O, conditionals",
          },
          {
            name: "Love-O-Meter",
            description: "Build a temperature-sensing love tester",
            concepts: "Analog input, sensors",
          },
          {
            name: "Colour Mixing Lamp",
            description: "Mix RGB colours with light sensors",
            concepts: "PWM, analog sensors",
          },
          {
            name: "Mood Cue",
            description: "Create a servo-powered mood indicator",
            concepts: "Servo motors, potentiometers",
          },
          {
            name: "Light Theremin",
            description: "Make a musical instrument controlled by light",
            concepts: "Piezo buzzer, light sensors",
          },
          {
            name: "Motorised Pinwheel",
            description: "Build a wind-powered spinning display",
            concepts: "DC motors, transistors",
          },
        ]}
        moreText="Plus 9 more projects covering LCD displays, keyboards, and more advanced concepts"
        background="white"
      />

      {/* FAQ Section */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "Do I need any prior experience with electronics or coding?",
            answer:
              "Not at all! The Arduino Starter Kit is designed for complete beginners. The project book starts from the absolute basics and gradually builds your knowledge with each project.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "We recommend the kit for ages 10 and up. Younger children (8-10) can also enjoy it with adult supervision. It's also perfect for adults who want to learn electronics.",
          },
          {
            question: "Do I need a computer?",
            answer:
              "Yes, you'll need a computer (Windows, Mac, or Linux) to program the Arduino board. The free Arduino IDE software is easy to install and use.",
          },
          {
            question: "Is soldering required?",
            answer:
              "No soldering is required. All projects use a breadboard and jumper wires for easy, safe connections that can be reconfigured.",
          },
          {
            question: "What can I do after completing the 15 projects?",
            answer:
              "The possibilities are endless! You can modify the projects, combine concepts to create your own inventions, or explore thousands of community projects online. The components are reusable for any Arduino project.",
          },
          {
            question: "Is this compatible with other Arduino accessories?",
            answer:
              "Yes! The Arduino UNO is compatible with hundreds of shields, sensors, and modules. Once you've mastered the basics, you can expand with additional components.",
          },
        ]}
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/arduino-starter-kit/kit-unboxed.jpg"
        imageAlt="Arduino Starter Kit unboxed showing all components"
        items={[
          "Arduino UNO R3 Board",
          "170-page full-colour project book",
          "USB cable for programming",
          "Wooden base for building",
          "Breadboard for prototyping",
          "Jumper wires (70+ pieces)",
          "LEDs (various colours)",
          "Resistors (various values)",
          "Pushbuttons and switches",
          "Potentiometers",
          "Light sensor (photoresistor)",
          "Temperature sensor",
          "Tilt sensor",
          "LCD display",
          "DC motor with propeller",
          "Servo motor",
          "Piezo buzzer",
          "And many more components...",
        ]}
        background="gray"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Microcontroller", value: "ATmega328P" },
          { label: "Operating Voltage", value: "5V" },
          { label: "Input Voltage", value: "7-12V recommended" },
          { label: "Digital I/O Pins", value: "14 (6 provide PWM output)" },
          { label: "Analog Input Pins", value: "6" },
          { label: "Flash Memory", value: "32 KB" },
          { label: "Clock Speed", value: "16 MHz" },
          { label: "USB Connection", value: "Type-B" },
          { label: "Dimensions", value: "68.6 x 53.4 mm" },
          { label: "Book Languages", value: "English (multi-language available)" },
        ]}
        background="white"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started"
        subtitle="Join millions of makers worldwide. The Arduino Starter Kit has everything you need to begin your journey into electronics and programming."
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
  const product = await getProductByHandle("arduino-starter-kit");

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | CREATESPACE`,
    description:
      "Learn electronics and coding with the official Arduino Starter Kit. Includes 15 hands-on projects, 170-page guide, and 100+ components. Perfect for beginners aged 10+.",
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
