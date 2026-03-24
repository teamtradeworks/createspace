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
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "makerzoid-robot-master-tournament";

export default async function MakerzoidRobotMasterTournamentPage() {
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
        tagline="Equip your classroom with competition-ready robotics and Scratch 3.0 programming"
        highlights={[
          "47 structured video courses across 3 skill levels — Structural, Dynamics, and Coding",
          "Aligns with CAPS Technology curriculum for Grades 7–9",
          "No STEM background needed — learners follow the built-in curriculum independently",
          "Competition-grade kit: trains learners for real robotics tournament challenges",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Choose for Your Classroom */}
      <NumberedSteps
        title="Why Choose for Your Classroom?"
        subtitle="The Makerzoid Robot Master Tournament is built for educators who want to deliver real STEM outcomes — without needing a robotics background."
        steps={[
          {
            title: "Curriculum-Aligned",
            description:
              "47 courses structured across mechanics, electronics, and programming map directly to CAPS Technology for Grades 7–9. Learners work through real engineering concepts — gears, motors, sensors, and Scratch code — supported by video lessons at every step.",
          },
          {
            title: "Competition-Ready",
            description:
              "The Tournament edition goes beyond basic building. It trains learners in line-following, obstacle avoidance, colour detection, and precision movement — the exact challenges featured in youth robotics competitions like the World Robot Olympiad.",
          },
          {
            title: "Self-Directed Learning",
            description:
              "47 video courses and the online coding platform at lab.makerzoid.com mean learners can progress independently. Less preparation time for you, more active learning for them — even without a STEM specialist in the room.",
          },
        ]}
        background="navy-card"
      />

      {/* Key Features */}
      <FeatureGrid
        title="What This Kit Brings to Your Classroom"
        subtitle="Purpose-built for structured STEM education, with hardware and curriculum designed to work together."
        features={[
          {
            icon: "book",
            title: "47-Course Curriculum",
            description:
              "Three skill levels — Structural, Dynamics, and Programmable — give learners a clear progression from basic builds to autonomous robots.",
          },
          {
            icon: "code",
            title: "Scratch 3.0 Programming",
            description:
              "The world's most widely used visual programming language. Learners drag and drop code blocks — no prior coding experience needed.",
          },
          {
            icon: "sensor",
            title: "3 Smart Sensors",
            description:
              "Colour sensor, grayscale sensor, and built-in gyroscope enable real competition challenges: line tracking, obstacle avoidance, and precision movement.",
          },
          {
            icon: "shield",
            title: "No Soldering Required",
            description:
              "Safe for classroom use. No additional tools, safety equipment, or specialist setup needed — just blocks and Bluetooth.",
          },
          {
            icon: "puzzle",
            title: "LEGO-Compatible",
            description:
              "640+ blocks work with existing LEGO collections, extending the value of resources your school may already own.",
          },
          {
            icon: "robot",
            title: "Tournament Training",
            description:
              "Explicitly designed for competition preparation. Learners master the exact challenges — line following, colour tasks, autonomous programming — that feature in youth robotics tournaments.",
          },
        ]}
        columns={3}
        background="white"
      />

      {/* Scratch Programming Visual */}
      <ImageTextBlock
        image="/images/products/makerzoid-robot-master-tournament/servo-motors-coding-displayed-on-phone.png"
        imageAlt="Scratch 3.0 programming interface displayed on a smartphone with servo motor robot"
        title="Programme Robots Directly from a Smartphone"
        body="Using Scratch 3.0 — the same visual platform used in CS classrooms worldwide — learners drag and drop code blocks to control real physical robots. When they hit run, servo motors respond immediately. That instant physical feedback makes abstract programming concepts concrete and memorable. No complex setup: the Makerzoid App is free to download on iOS and Android, and programming is also available via any browser at lab.makerzoid.com."
        layout="image-left"
        background="gray"
      />

      {/* Competition Challenges */}
      <ProjectShowcase
        title="Competition Challenges Your Learners Will Master"
        highlight="47 structured courses · 200+ buildable models · 9 competition challenge types"
        subtitle="Challenges progress from basic mechanical builds through to fully autonomous robot programming — the same skills assessed in youth robotics competitions."
        columns={3}
        background="white"
        projects={[
          {
            name: "Programmable Hub",
            description:
              "Learn to connect and configure the central hub that stores up to 7 programmes simultaneously.",
            concepts: "Systems thinking, hardware setup, programme logic",
            image:
              "/images/products/makerzoid-robot-master-tournament/projects/programmable-hub.png",
          },
          {
            name: "Servo Drive",
            description:
              "Build and program closed-loop servo motors for precise, repeatable robot movement.",
            concepts: "Motor control, feedback loops, mechanical precision",
            image: "/images/products/makerzoid-robot-master-tournament/projects/servo-drive.png",
          },
          {
            name: "Smart Gyroscope",
            description:
              "Use the built-in gyroscope to detect orientation and program directionally-aware robot behaviour.",
            concepts: "Sensor data, conditionals, spatial reasoning",
            image:
              "/images/products/makerzoid-robot-master-tournament/projects/smart-gyroscope.png",
          },
          {
            name: "Colour Sensor Tasks",
            description:
              "Programme the robot to detect and react to different colours — a core competition challenge.",
            concepts: "Colour sensor, event-driven programming, conditionals",
            image: "/images/products/makerzoid-robot-master-tournament/projects/colour-sensor.png",
          },
          {
            name: "Greyscale Sensor",
            description:
              "Use infrared sensing for line tracking and obstacle avoidance — two of the most common competition challenges.",
            concepts: "Infrared sensing, line following, obstacle avoidance",
            image:
              "/images/products/makerzoid-robot-master-tournament/projects/greyscale-sensor.png",
          },
          {
            name: "Graphical Programming",
            description:
              "Build full Scratch 3.0 programmes that integrate multiple sensors and motors into autonomous robot behaviour.",
            concepts: "Scratch 3.0, loops, multi-sensor integration, autonomy",
            image:
              "/images/products/makerzoid-robot-master-tournament/projects/graphical-programming.png",
          },
        ]}
        moreText="Plus 41 more structured lessons — all accessible via the free Makerzoid app and lab.makerzoid.com"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="Real Results, Real Classrooms"
        subtitle="Learners building and competing with the Makerzoid Robot Master Tournament."
        background="gray"
        images={[
          {
            src: "/images/products/makerzoid-robot-master-tournament/hands-unboxing.png",
            alt: "Hands unboxing the Makerzoid Robot Master Tournament kit",
            label: "First Unboxing",
            description: "Everything in the box, ready for first lesson",
          },
          {
            src: "/images/products/makerzoid-robot-master-tournament/robot-on-track-competition.jpg",
            alt: "Makerzoid robot positioned on a competition track",
            label: "Competition Ready",
            description: "A learner-built robot on a competition line-following track",
          },
          {
            src: "/images/products/makerzoid-robot-master-tournament/screenshot-of-coding-screen.png",
            alt: "Screenshot of Scratch 3.0 coding interface on screen",
            label: "Coding in Progress",
            description: "Scratch 3.0 programming on the Makerzoid platform",
          },
        ]}
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* FAQ Section */}
      <ProductFAQ
        title="Educator Questions"
        background="gray"
        faqs={[
          {
            question: "Does this align with the CAPS curriculum?",
            answer:
              "Yes. The kit covers CAPS Technology for Grades 7–9: engineering design, basic electronics, and computational thinking. The three-level course structure (Structural → Dynamics → Programmable) mirrors the CAPS design process framework, and Scratch 3.0 programming aligns with the Technology learning area's coding and robotics requirements.",
          },
          {
            question: "How many learners can use one kit simultaneously?",
            answer:
              "The kit is designed for 1–2 learners working collaboratively per kit. For a class of 30, we recommend 15 kits. With rotational group work, a smaller number of kits can serve larger groups — 10 kits supporting groups of 3 in rotation works well in practice. Contact us for school pricing on bulk orders.",
          },
          {
            question: "Do I need a STEM background to teach with this?",
            answer:
              "No. The 47 structured video courses guide learners step by step — learners work independently while you facilitate. The three-level curriculum progression (Structural → Dynamics → Programmable) makes lesson planning straightforward without specialist robotics knowledge. No STEM expertise required to deliver effective lessons.",
          },
          {
            question: "What devices are needed in the classroom?",
            answer:
              "Each group needs a Bluetooth-enabled smartphone or tablet (iOS or Android) with the free Makerzoid App installed. Alternatively, learners can programme via any web browser at lab.makerzoid.com — no app required. No additional computers or specialised software are needed.",
          },
          {
            question: "How durable is this for repeated classroom use?",
            answer:
              "The 640+ LEGO-compatible ABS blocks are robust and built for repeated use. The kit includes a 12-month product warranty with a 30-day quality guarantee on all electronic components (hub, motors, sensors). With organised storage, the kit maintains quality across multiple terms and class groups.",
          },
          {
            question: "What preparation is needed before a lesson?",
            answer:
              "Minimal. Download the Makerzoid App on classroom devices once, ensure Bluetooth is enabled, and insert AA batteries into the hub. The video courses handle lesson delivery — learners follow along on the app independently. First-time setup takes approximately 15 minutes.",
          },
          {
            question: "Is bulk or school pricing available?",
            answer:
              "Yes — contact us for school and bulk pricing on orders of 10 or more kits. We offer competitive rates for schools and can assist with procurement documentation.",
          },
        ]}
      />

      {/* What's in the Kit */}
      <WhatsIncluded
        title="What's in the Kit"
        image="/images/products/makerzoid-robot-master-tournament/colour-sensor.png"
        imageAlt="Makerzoid Robot Master Tournament colour sensor component"
        background="white"
        items={[
          "640+ LEGO-compatible building blocks (ABS plastic)",
          "Programmable Hub Controller (built-in gyroscope, 2 LEDs, 7 cross-ports)",
          "Closed-loop Servo Motor with encoder feedback chips",
          "Colour Sensor — detects and reacts to colours",
          "Grayscale Sensor — line tracking and obstacle avoidance via infrared",
          "Paper instruction manual",
          "Access to Makerzoid App (iOS and Android — free download)",
          "47 structured video courses (via app or lab.makerzoid.com)",
          "NOTE: AA batteries required — not included",
        ]}
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        background="gray"
        specs={[
          { label: "Total Pieces", value: "640+ blocks" },
          { label: "Robot Models", value: "200+ designs" },
          { label: "Video Courses", value: "47 (3 levels: Structural, Dynamics, Programmable)" },
          { label: "Box Dimensions", value: "40 × 29 × 19 cm" },
          { label: "Weight", value: "2.3 kg" },
          { label: "Material", value: "LEGO-compatible ABS plastic" },
          { label: "Batteries", value: "AA (not included; Duracell recommended)" },
          { label: "Connectivity", value: "Bluetooth" },
          { label: "Programming", value: "Scratch 3.0 / Blockly" },
          { label: "App Compatibility", value: "iOS and Android" },
          { label: "Web Platform", value: "lab.makerzoid.com" },
          { label: "Hub Storage", value: "7 programmes simultaneously" },
          {
            label: "Sensor Ports",
            value: "7 cross-ports (up to 4 servos, 4 colour sensors, 4 grayscale sensors)",
          },
          { label: "Warranty", value: "12 months (30-day quality guarantee on electronics)" },
        ]}
      />

      {/* CTA */}
      <CallToAction
        title="Equip Your Classroom"
        subtitle="Trusted by educators across South Africa. Give your learners a head start in robotics and coding with the competition-grade kit built for classroom success."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse Classroom Kits"
        secondaryHref="/education/classroom-kits"
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
      "Competition-ready robotics kit for Grades 7–9. 47 structured video courses, Scratch 3.0 programming, 200+ builds. CAPS Technology aligned. No STEM background needed.",
    alternates: {
      canonical: "/product/makerzoid-robot-master-tournament",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
