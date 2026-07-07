import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  FeatureGrid,
  ImageTextBlock,
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  ProjectShowcase,
  VideoEmbed,
  WhatsIncluded,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "arduino-student-kit";

export default async function ArduinoStudentKitPage() {
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
        tagline="Real electronics, real code — a complete semester of structured learning for ages 11 and up"
        highlights={[
          "9 guided lessons plus 2 open-ended projects — up to 25 hours of learning",
          "Build a traffic light, sports robot, musical keyboard, and more",
          "Professional digital multimeter included — a real engineering tool",
          "No prior experience needed for students or parents",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Video */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=t-PZsb9ci9E&t=7s"
        title="See the Arduino Student Kit in Action"
        background="white"
      />

      {/* Online Platform Section */}
      <ImageTextBlock
        image="/images/products/arduino-student-kit/student-kit-connecting-up-with-laptop-infront.jpg"
        imageAlt="Student connecting up the Arduino Student Kit with a laptop in front"
        title="A Platform Built for Home Learning"
        body="The Arduino Student Kit isn't just a box of components — it's built around an exclusive online learning platform. Your child logs in, activates their kit, and follows nine step-by-step lessons with clear instructions, diagrams, and pre-written code when they need a hand. A digital logbook tracks progress and encourages reflection, while the educator dashboard gives parents full visibility into what their child is learning."
        layout="image-left"
        background="gray"
      />

      {/* Features Grid */}
      <FeatureGrid
        title="Everything Included to Get Started"
        subtitle="One kit, one platform, one clear path from complete beginner to confident maker."
        features={[
          {
            icon: "cross-device",
            title: "Online Learning Platform",
            description:
              "Nine lessons and two projects on a dedicated platform — no worksheets, no guesswork, just guided learning.",
          },
          {
            icon: "book",
            title: "Digital Logbook",
            description:
              "Students record observations and progress as they work, building scientific habits alongside their electronics skills.",
          },
          {
            icon: "lightbulb",
            title: "Professional Multimeter",
            description:
              "Measure real voltage, current, and resistance — the same tool electronics engineers use every day.",
          },
          {
            icon: "shield",
            title: "No Soldering Needed",
            description:
              "All circuits are built on a breadboard — safe, easy to reconfigure, and completely beginner-friendly.",
          },
          {
            icon: "code",
            title: "Free Coding Software",
            description:
              "The Arduino IDE is a free download that works on Windows, macOS, Chromebook, and Linux.",
          },
          {
            icon: "puzzle",
            title: "Reusable Components",
            description:
              "Circuits are never permanently soldered — every component can be repurposed for any future project your child imagines.",
          },
        ]}
        columns={3}
        background="white"
      />

      {/* What They'll Build */}
      <ProjectShowcase
        title="9 Lessons. 2 Projects. One Complete Curriculum."
        highlight="Up to 25 hours of guided learning"
        subtitle="Each lesson builds on the last — from reading a circuit diagram to programming a climate control system from scratch."
        projects={[
          {
            name: "Electricity Basics",
            description:
              "Meet the multimeter and learn the language of electronics — current, voltage, and resistance.",
            concepts: "Ohm's Law, multimeter, electrical vocabulary",
            image: "/images/products/arduino-student-kit/projects/electricty-basics.png",
          },
          {
            name: "Schematics",
            description:
              "Learn to read and draw circuit diagrams — the universal language that connects all electronics.",
            concepts: "Circuit symbols, schematic reading",
            image: "/images/products/arduino-student-kit/projects/schematics.png",
          },
          {
            name: "Writing Code",
            description:
              "Write and upload the first Arduino sketch. Meet variables, syntax, and the IDE that powers millions of projects.",
            concepts: "Arduino IDE, code structure, uploading",
            image: "/images/products/arduino-student-kit/projects/learn-to-code.png",
          },
          {
            name: "Traffic Light",
            description:
              "Build a working traffic light with LEDs and write the code to run it — the first real project.",
            concepts: "Digital output, LEDs, timing, conditionals",
            image: "/images/products/arduino-student-kit/projects/traffic-light.png",
          },
          {
            name: "Musical Keyboard",
            description:
              "Build a playable keyboard with pushbuttons and a piezo buzzer. Sound, arrays, and creative code.",
            concepts: "Piezo buzzer, sound frequencies, arrays",
            image: "/images/products/arduino-student-kit/projects/musical-keyboard.png",
          },
          {
            name: "Light Wave Radar",
            description:
              "Use a phototransistor to measure light intensity and explore how information travels as waves.",
            concepts: "Phototransistors, analog input, wave physics",
            image: "/images/products/arduino-student-kit/projects/light-wave-radar.png",
          },
        ]}
        moreText="Plus 3 more lessons and 2 open-ended projects — after the curriculum, all components are theirs to keep."
        background="gray"
        columns={3}
      />

      {/* Character Development Section */}
      <ImageTextBlock
        image="/images/products/arduino-student-kit/opened-box-with-all-parts-displayed-and-laptop.jpg"
        imageAlt="Arduino Student Kit opened box showing all components with a laptop"
        title="Skills That Last Long After the Final Lesson"
        body="When your child debugs a circuit that won't light up or rewrites code to make the servo move just right, they're practising something far bigger than electronics. They're learning to stay calm when things don't go to plan, to think through problems step by step, and to feel the genuine pride that comes from fixing something with their own hands. Resilience, critical thinking, and confidence — skills that follow them into every classroom and career."
        layout="image-right"
        background="white"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="From unboxing to first circuit, every step is guided."
        images={[
          {
            src: "/images/products/arduino-student-kit/teen-working-on-kit-with-workbook-and-laptop.jpg",
            alt: "Teen working on the Arduino Student Kit with workbook and laptop open",
          },
          {
            src: "/images/products/arduino-student-kit/open-box-with-all-parts.jpg",
            alt: "Arduino Student Kit box open showing all included components",
          },
          {
            src: "/images/products/arduino-student-kit/teen-homeschooling-with-student-kit.jpg",
            alt: "Teenager homeschooling with the Arduino Student Kit",
          },
          {
            src: "/images/products/arduino-student-kit/uno-r3-board.jpg",
            alt: "Arduino UNO R3 microcontroller board included in the Student Kit",
          },
          {
            src: "/images/products/arduino-student-kit/lady-and-chlid-working-together-on-kit.jpeg",
            alt: "Parent and child working together on the Arduino Student Kit",
          },
          {
            src: "/images/products/arduino-student-kit/prototyping-tools-in-kit.jpg",
            alt: "Prototyping tools and components included in the Arduino Student Kit",
          },
          {
            src: "/images/products/arduino-student-kit/teen-working-with-student-kit.jpeg",
            alt: "Teenager working with the Arduino Student Kit",
          },
          {
            src: "/images/products/arduino-student-kit/screenshot-online-learning-building-the-circuit-lesson.avif",
            alt: "Screenshot of the Arduino Student Kit online learning platform showing a circuit building lesson",
          },
        ]}
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* FAQ Section */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "What age is the Arduino Student Kit designed for?",
            answer:
              "The kit is designed for ages 11 and up, with the sweet spot at 11–14 (middle school). It's paced for independent learning at that level. Older teens and adults who are new to electronics will find it equally valuable.",
          },
          {
            question: "Does my child need any prior experience with electronics or coding?",
            answer:
              "Not at all. The first lessons start with the basics of electricity — no assumptions made. The online platform guides students step by step, and pre-written code is available if they get stuck. Parents don't need technical knowledge either.",
          },
          {
            question: "How much does a parent need to be involved?",
            answer:
              "The platform is designed for independent learning, so your child can work through lessons on their own. That said, many families enjoy doing it together — the educator dashboard lets parents follow along and the lessons are easy to understand even without a STEM background.",
          },
          {
            question: "What does my child need besides the kit?",
            answer:
              "They'll need a computer (Windows 7+, macOS, Chromebook, or Linux) with a USB port and internet access. The free Arduino IDE software is downloaded during setup. The 9V battery is included in the box.",
          },
          {
            question: "How long will the kit keep them busy?",
            answer:
              "Each of the 9 guided lessons is designed to take about 90 minutes, and the two open-ended projects add more time on top. That's up to 25 hours of structured content — enough for a full semester. After that, the components are theirs to explore thousands of free Arduino community projects.",
          },
          {
            question: "Is soldering required?",
            answer:
              "No soldering at all. Every circuit is built on a breadboard using push-in connections — safe, easy, and completely reversible. Your child can disassemble and rebuild any circuit as many times as they like.",
          },
          {
            question: "Can this kit be used for homeschooling?",
            answer:
              "Yes — it's specifically designed for home and independent learning. The online platform includes an educator dashboard with guidance notes, answer keys, and extension ideas. The curriculum covers electronics and computer science concepts that align with school-level STEM subjects.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/arduino-student-kit/whats-in-the-box.jpeg"
        imageAlt="Arduino Student Kit contents laid out showing all components"
        items={[
          "Arduino UNO R3 microcontroller board",
          "USB cable (A to B)",
          "Board mounting base",
          "Digital multimeter",
          "Breadboard (400 points)",
          "20 × LEDs (5 red, 5 green, 5 yellow, 5 blue)",
          "Resistors (various values: 220Ω, 560Ω, 1kΩ, 4.7kΩ, 10kΩ)",
          "Small servo motor",
          "Potentiometer with knob",
          "5 × Pushbuttons",
          "Temperature sensor",
          "Phototransistor (light sensor)",
          "Piezo buzzer",
          "Capacitor (100μF)",
          "Jumper wires (various)",
          "9V battery and snap connector",
          "Durable, reusable storage box",
          "Activation code for online learning platform (includes 9 lessons, 2 projects, digital logbook, and educator resources)",
        ]}
        background="white"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Product Code", value: "AKX00025" },
          { label: "Age Range", value: "11–14 (ages 11+)" },
          { label: "Learning Time", value: "Up to 25 hours (9 lessons + 2 projects)" },
          { label: "Lesson Duration", value: "~90 minutes each" },
          { label: "Microcontroller", value: "Arduino UNO R3 (ATmega328P)" },
          { label: "Coding Software", value: "Arduino IDE (free download)" },
          { label: "OS Compatibility", value: "Windows 7+, macOS, Chromebook, Linux" },
          { label: "Soldering Required", value: "No" },
          {
            label: "Platform Languages",
            value: "English, French, German, Spanish, Italian, Portuguese, Chinese, Croatian, Thai",
          },
          { label: "Weight", value: "750g" },
        ]}
        background="gray"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started with Arduino"
        subtitle="The official kit trusted by educators worldwide — everything needed for a full semester of electronics and coding."
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
      "Teach electronics and coding with the Arduino Student Kit. 9 guided lessons, 2 projects, professional multimeter included. Up to 25 hours of structured learning for ages 11+.",
    alternates: {
      canonical: "/product/arduino-student-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
