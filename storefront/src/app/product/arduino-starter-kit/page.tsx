import { notFound } from "next/navigation";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import {
  HeroSection,
  FeatureGrid,
  QuickInfoBadges,
  NumberedSteps,
  LearningOutcomes,
  WhatsIncluded,
  ImageTextBlock,
  ProductFAQ,
  VideoEmbed,
  Specifications,
  ProductTestimonials,
  ProjectShowcase,
  CallToAction,
  RelatedProducts,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "arduino-starter-kit";

export default async function ArduinoStarterKitPage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    notFound();
  }

  // Get related products and add-ons in parallel
  const [allProducts, resolvedAddons] = await Promise.all([
    getProducts(8),
    resolveAddonsForHandle(PRODUCT_HANDLE),
  ]);

  const relatedProducts = allProducts.filter((p) => p.handle !== product.handle).slice(0, 4);
  const addons = serializeAddons(resolvedAddons);

  return (
    <>
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
      <QuickInfoBadges
        age="10+"
        skill="beginner"
        supervision={false}
        batteries="9V battery"
        badges={[
          { icon: "projects", label: "Projects", value: "15 Included" },
          { icon: "no-soldering", label: "Soldering", value: "Not Required" },
          { icon: "guide", label: "Guide", value: "170-page book" },
        ]}
      />

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

      {/* Learn Together Section */}
      <ImageTextBlock
        image="/images/products/arduino-starter-kit/kids_working_on_project.jpg"
        imageAlt="Children working together on an Arduino project"
        title="Learn Together, Build Together"
        body="Arduino projects are perfect for collaborative learning. Work through the projects with a friend, sibling, or parent. Share ideas, solve problems together, and celebrate when your creation comes to life."
        layout="image-left"
        background="white"
      />

      {/* Features Grid */}
      <FeatureGrid
        title="Everything You Need to Get Started"
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

      {/* Everything Included Section */}
      <ImageTextBlock
        image="/images/products/arduino-starter-kit/kit-unboxed.jpg"
        imageAlt="Arduino Starter Kit unboxed showing all components including Arduino board, breadboard, LCD display, motors, sensors, and project book"
        title="Everything You Need in One Box"
        body="Open the box and you're ready to start. The Arduino Starter Kit includes the Arduino UNO board, a full-colour 170-page project book, breadboard, jumper wires, LCD display, motors, sensors, LEDs, and over 100 components. No hunting for parts - just unbox and build."
        layout="image-left"
        background="white"
      />

      {/* Learning Outcomes */}
      <LearningOutcomes
        title="Skills They'll Develop"
        subtitle="The Arduino Starter Kit builds foundational STEM skills that prepare learners for future studies and careers."
        outcomes={[
          "Basic electronics - circuits, voltage, current, and resistance",
          "Programming fundamentals - variables, loops, conditionals, and functions",
          "Computational thinking and problem-solving",
          "Reading schematics and technical documentation",
          "Debugging and troubleshooting skills",
          "Creative design and iteration",
        ]}
        background="white"
      />

      {/* What's Included */}
      <WhatsIncluded
        title="What's in the Box"
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

      {/* Guided Learning Section */}
      <ImageTextBlock
        image="/images/products/arduino-starter-kit/booklet_open_with_arduino_breadboard_on_top.jpg"
        imageAlt="Arduino project book open with breadboard and components on top"
        title="Your Guide to Every Project"
        body="The 170-page project book isn't just instructions - it's a complete learning resource. Each project explains the 'why' behind every step, introducing electronics concepts and coding principles as you build. Clear diagrams show exactly where every wire goes."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Projects You'll Build"
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

      {/* Hands-On Experience Section */}
      <ImageTextBlock
        image="/images/products/arduino-starter-kit/arduino_boardboard_led_finger_press.jpg"
        imageAlt="Finger pressing button on Arduino breadboard with LED circuit"
        title="The Magic of Making It Work"
        body="There's nothing quite like pressing a button and watching your LED light up for the first time. Each project brings that moment of discovery - the instant your code becomes something real you can see, hear, and touch."
        layout="image-left"
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

      {/* From Beginner to Maker Section */}
      <ImageTextBlock
        image="/images/products/arduino-starter-kit/kit-iso.jpg"
        imageAlt="Arduino Starter Kit box"
        title="From Beginner to Maker"
        body="Whether you're 10 or 60, the Arduino Starter Kit meets you where you are. The structured projects build confidence progressively - by the time you finish, you'll have the skills and creativity to design your own inventions."
        layout="image-right"
        background="gray"
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

      {/* Testimonials */}
      <ProductTestimonials
        title="What Parents & Educators Say"
        testimonials={[
          {
            quote:
              "My 12-year-old went from knowing nothing about electronics to building his own projects independently. The book explains everything perfectly.",
            author: "Sarah M.",
            role: "Parent",
            rating: 5,
          },
          {
            quote:
              "We use these kits in our after-school STEM club. The structured projects make it easy to teach, and kids love the hands-on building.",
            author: "David K.",
            role: "STEM Educator",
            rating: 5,
          },
          {
            quote:
              "As a complete beginner adult, I found this kit approachable and rewarding. Each project builds confidence for the next one.",
            author: "Michelle T.",
            role: "Hobbyist",
            rating: 5,
          },
        ]}
        background="white"
      />

      {/* Final CTA */}
      <CallToAction
        title="Ready to Start Building?"
        subtitle="Join millions of makers worldwide. The Arduino Starter Kit has everything you need to begin your journey into electronics and programming."
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
  const product = await getProductByHandle("arduino-starter-kit");

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | CREATESPACE`,
    description:
      "Learn electronics and coding with the official Arduino Starter Kit. Includes 15 hands-on projects, 170-page guide, and 100+ components. Perfect for beginners aged 10+.",
  };
}
