import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  NumberedSteps,
  FeatureGrid,
  ProjectShowcase,
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";


const PRODUCT_HANDLE = "makerzoid-superbot-master-premium";

export default async function MakerzoidSuperbotMasterPremiumPage() {
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
        tagline="Hands-on robotics and coding for your classroom — 72+ models, zero wiring complexity"
        highlights={[
          "72+ buildable robotic models across three difficulty levels",
          "Scratch 3.0 programming — used in school curricula in 150+ countries",
          "No soldering, no prior STEM experience required",
          "Colour, IR, greyscale sensors and gyroscope included — real robotics, real learning",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
        <QuickInfoBadges product={product} />

      {/* Why Choose This for Your Classroom */}
        <NumberedSteps
        title="Built for the Classroom"
        subtitle="The Superbot Master Premium gives educators a complete platform for hands-on STEM — from the first simple build to autonomous sensor-driven robots."
        steps={[
          {
            title: "Curriculum Aligned",
            description:
              "Scratch 3.0 is a recognised coding platform aligned with computational thinking frameworks in South African DBE and CAPS Technology curriculum. Learners develop sequencing, conditionals, loops, and debugging skills — core ICT competencies for Grades 4–9.",
          },
          {
            title: "No Expertise Required",
            description:
              "Step-by-step graphical assembly guides in the free Makerzoid app walk learners through every build. Each model is self-directed, reducing preparation burden and enabling even STEM-hesitant educators to run effective sessions.",
          },
          {
            title: "Grows With Your Learners",
            description:
              "Three progressive difficulty levels take learners from simple remote-controlled vehicles to fully autonomous, sensor-programmed robots. One kit sustains meaningful challenge across multiple terms and grade levels.",
          },
        ]}
        background="navy-card"
      />

      {/* Sensor & Technology Features */}
        <FeatureGrid
        title="Advanced Sensing Technology"
        subtitle="The Superbot Master Premium includes six distinct sensing and control modules that learners integrate into their builds — the same technology used in real-world robotics."
        features={[
          {
            icon: "sensor",
            title: "Smart Gyroscope",
            description:
              "Detects tilt angles in three directions. Learners build balance bots and tilt-controlled vehicles, exploring orientation sensing and physical feedback loops.",
          },
          {
            icon: "sensor",
            title: "Colour Sensor",
            description:
              "Identifies and reacts to different colours. Enables line-following robots, colour-sorting machines, and interactive art projects that connect programming to visual input.",
          },
          {
            icon: "sensor",
            title: "Greyscale Sensors ×2",
            description:
              "Recognise shades and contrast patterns for line tracking and boundary detection — core skills in autonomous robotics programming.",
          },
          {
            icon: "sensor",
            title: "IR Sensors ×2",
            description:
              "Infrared proximity detection for obstacle avoidance. Learners program robots that navigate independently, introducing them to autonomous decision-making.",
          },
          {
            icon: "robot",
            title: "All-in-One Controller",
            description:
              "A single hub integrates the motor, gyroscope, LED matrix, microphone, and speaker. No wiring — every component plugs in directly, keeping lessons focused on programming and building.",
          },
          {
            icon: "bluetooth",
            title: "Dual Control Modes",
            description:
              "Learners can control robots via the free Makerzoid app (iOS/Android) or the included Bluetooth remote, and then progress to fully autonomous Scratch 3.0 programming.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* What Learners Will Explore */}
        <ProjectShowcase
        title="What Learners Will Explore"
        highlight="72+ guided robotic builds spanning three difficulty levels — from first builds to fully sensor-driven autonomous robots."
        subtitle="Each model integrates a different combination of sensors and programming concepts, giving learners a new challenge every session."
        projects={[
          {
            name: "Smart Gyroscope",
            description:
              "Build balance bots and tilt-controlled vehicles using 3-axis orientation sensing",
            concepts: "Gyroscope, feedback loops, physics",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/smart-gyroscope.png",
          },
          {
            name: "IR Sensors",
            description:
              "Programme obstacle-avoidance robots that navigate without human input",
            concepts: "IR sensing, conditionals, autonomous navigation",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/ir-sensor.png",
          },
          {
            name: "Greyscale Sensors",
            description:
              "Create line-following robots that detect and track contrast patterns on the floor",
            concepts: "Greyscale sensing, loops, sensor input",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/greyscale-sensor.png",
          },
          {
            name: "Servo Drive",
            description:
              "Engineer robotic arms, grippers, and steerable mechanisms using precise angular control",
            concepts: "Servo motor, mechanical engineering, precision control",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/servo-drive.png",
          },
          {
            name: "Motorised Builds",
            description:
              "Drive vehicles and moving models at variable speeds — learners control power through code",
            concepts: "Motor control, variables, speed programming",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/the-motor.png",
          },
          {
            name: "Universal Wheel",
            description:
              "Enable omnidirectional movement for complex vehicles — coding multi-directional navigation",
            concepts: "Omnidirectional motion, movement programming",
            image:
              "/images/products/makerzoid-superbot-master-premium/projects/universal-wheel.png",
          },
        ]}
        moreText="Plus dozens more models across beginner, intermediate, and advanced levels — all accessible through the free Makerzoid Kit app."
        background="white"
      />

      {/* In-Classroom Gallery */}
        <CustomerShowcase
        title="The Superbot in Action"
        subtitle="Learners building, programming, and competing with the Makerzoid Superbot Master Premium."
        images={[
          {
            src: "/images/products/makerzoid-superbot-master-premium/hands-putting-bot-together-with-instructions-on-tablet.png",
            alt: "Learner assembling the Makerzoid Superbot with step-by-step app instructions on a tablet",
            label: "Guided Assembly",
            description:
              "The Makerzoid app displays graphical step-by-step build instructions alongside the physical kit.",
          },
          {
            src: "/images/products/makerzoid-superbot-master-premium/distance-sensor-hand-in-front-of-robot.png",
            alt: "Hand testing the Superbot's distance sensor",
            label: "Sensor Testing",
            description:
              "Learners test sensor responses in real time — programming reacts to the physical world.",
          },
          {
            src: "/images/products/makerzoid-superbot-master-premium/remote-controlling-robot.png",
            alt: "Learner remote-controlling the assembled Makerzoid Superbot robot",
            label: "Remote Control Mode",
            description:
              "Before adding autonomous code, learners test builds in remote-control mode via the app.",
          },
          {
            src: "/images/products/makerzoid-superbot-master-premium/hands-showing-box.png",
            alt: "Hands holding the Makerzoid Superbot Master Premium box",
            label: "Complete Kit",
            description: "Everything needed for 72+ robot builds in one box.",
          },
        ]}
        background="gray"
      />

      {/* Reviews */}
        <ProductReviews productId={product.id} background="white" />

      {/* Educator FAQ */}
        <ProductFAQ
        title="Educator Questions"
        faqs={[
          {
            question: "Does this align with the CAPS curriculum?",
            answer:
              "Yes. The kit covers CAPS Technology curriculum concepts for Grades 4–9, including mechanisms, structures, and electronics. The Scratch 3.0 coding platform addresses computational thinking objectives in the ICT and Technology learning areas. Learners develop sequencing, conditionals, loops, variables, and debugging — core skills across multiple CAPS strands.",
          },
          {
            question: "How many learners can use one kit simultaneously?",
            answer:
              "Each kit supports one active build at a time. For classroom use, we recommend one kit per group of 2–4 learners, with groups rotating builds each session. For a class of 30, a set of 8–10 kits is typical. Contact us about school pricing for multiple units.",
          },
          {
            question: "Do I need a STEM background to use this in my classroom?",
            answer:
              "Not at all. The free Makerzoid Kit app provides complete graphical, step-by-step assembly and programming guides for every model. Learners can follow along independently, and the app's visual programming interface requires no prior coding knowledge. The kit is designed for self-directed learning within a supervised classroom setting.",
          },
          {
            question: "What devices and software are required?",
            answer:
              "The free Makerzoid Kit app (iOS and Android) is required for assembly guides and Bluetooth control. For Scratch 3.0 programming, learners need access to a computer (Windows or macOS) or tablet with a web browser — Scratch runs in-browser at no cost. Both platforms are free.",
          },
          {
            question: "Is this durable enough for repeated classroom use?",
            answer:
              "The kit is designed for repeated assembly and disassembly. Plastic construction blocks are robust, LEGO-compatible, and built for frequent handling. The all-in-one controller is a single solid unit — no loose wiring to break or disconnect. A storage box with sorting tray is included to keep components organised between sessions.",
          },
          {
            question: "What preparation is required before a lesson?",
            answer:
              "Minimal. Sort and verify components using the included paper manual before the first session. After that, learners access build guides directly from the app. No lesson plans need to be printed — the app guides learners through each build with graphical instructions. Typical setup time is under 10 minutes.",
          },
          {
            question: "Is school or bulk pricing available?",
            answer:
              "Yes. CREATESPACE offers school pricing for orders of multiple units. Visit our education page or contact us directly to discuss classroom quantities, delivery, and invoicing for schools.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Kit */}
        <WhatsIncluded
        title="What's in the Kit"
        image="/images/products/makerzoid-superbot-master-premium/hands-showing-box.png"
        imageAlt="Makerzoid Superbot Master Premium box showing all kit contents"
        items={[
          "1× All-in-One Smart Controller (motor, gyroscope, LED matrix, microphone, speaker integrated)",
          "1× Smart Gyroscope module",
          "2× IR Sensors",
          "2× Greyscale Sensors",
          "1× Motor",
          "1× Servo Motor",
          "1× 360-degree universal rotating wheel",
          "1× Bluetooth Remote Control",
          "230 building block pieces (plastic, LEGO-compatible)",
          "Storage box with sorting tray",
          "Paper manual with step-by-step assembly instructions",
          "Free Makerzoid Kit app access (iOS & Android)",
          "Free Scratch 3.0 access (web-based, no download required)",
        ]}
        background="white"
      />

      {/* Technical Specifications */}
        <Specifications
        title="Technical Details"
        specs={[
          { label: "SKU", value: "MKZ-SPB-MS" },
          { label: "Total Pieces", value: "230" },
          { label: "Models Supported", value: "72+" },
          { label: "Coding Platform", value: "Scratch 3.0 (drag-and-drop)" },
          { label: "App", value: "Makerzoid Kit (iOS & Android, free)" },
          { label: "Connectivity", value: "Bluetooth" },
          { label: "Battery", value: "3.7V Lithium Battery (required)" },
          { label: "Weight", value: "1.75 kg" },
          { label: "Box Dimensions", value: "31 × 42 × 12 cm" },
          { label: "LEGO Compatible", value: "Yes" },
          { label: "Soldering Required", value: "No" },
          { label: "Warranty", value: "12 months" },
          { label: "Country of Origin", value: "China" },
        ]}
        background="gray"
      />

      {/* Call to Action */}
        <CallToAction
        title="Equip Your Classroom"
        subtitle="Trusted by educators. Backed by research. 72+ builds that keep learners challenged across every term."
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
      "Hands-on robotics and Scratch 3.0 coding for classrooms. 72+ models, 6 sensor modules, CAPS-aligned. Suitable for Grades 4–9. No STEM expertise required.",
    alternates: {
      canonical: "/product/makerzoid-superbot-master-premium",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
