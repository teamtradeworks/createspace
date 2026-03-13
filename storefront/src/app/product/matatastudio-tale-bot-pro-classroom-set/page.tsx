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
  ProjectShowcase,
  CustomerShowcase,
  CallToAction,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "matatastudio-tale-bot-pro-classroom-set";

export default async function TaleBotProClassroomSetPage() {
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
        tagline="Bring screen-free coding to every learner in your Foundation Phase classroom"
        highlights={[
          "6 robots — serves groups of 3–4 learners simultaneously across a full class",
          "42 Activity Cards across 4 curriculum categories — from basic commands to complex programmes",
          "10-port USB charging station and storage bin included for full classroom management",
          "Reusable term after term — durable, rechargeable, and built for repeated daily use",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Choose for Your Classroom */}
      <NumberedSteps
        title="Why Tale-Bot Pro for Your Classroom?"
        subtitle="The leading screen-free coding robot for Foundation Phase. Purpose-built for group learning, with everything educators need to teach coding confidently from day one."
        steps={[
          {
            title: "Curriculum Aligned",
            description:
              "Supports the CAPS Technology and Natural Sciences curriculum for Grades R–3. Activities develop computational thinking, sequencing, and algorithmic reasoning — foundational skills embedded in the Technology learning area.",
          },
          {
            title: "Teacher-Ready",
            description:
              "No STEM background needed. The 42 Activity Cards provide a complete, structured curriculum — from basic command activities to open-ended cross-curricular challenges. Educators can pick it up and deliver a quality lesson with minimal preparation.",
          },
          {
            title: "Built for Group Learning",
            description:
              "Six robots means your full class can engage simultaneously in small groups. Learners collaborate, take turns programming, and peer-teach — developing communication and teamwork alongside coding skills.",
          },
        ]}
        background="navy-card"
      />

      {/* How It Works in the Classroom */}
      <ImageTextBlock
        image="/images/products/matatastudio-tale-bot-pro-classroom-set/teacher-teaching-kids.jpg"
        imageAlt="Teacher demonstrating Tale-Bot Pro to a group of young learners in a classroom"
        title="Screen-Free Coding That Works for Every Learner"
        body="Research consistently shows that screen-free, tangible coding robots are more effective than screen-based tools for developing computational thinking in Foundation Phase learners. Tale-Bot Pro uses physical command buttons directly on the robot — learners press, plan, and observe results in real time. No reading skills are required, making this accessible to Grades R, 1, 2, and 3 regardless of literacy level. Colour-coded LED indicators help learners debug their code independently, reducing the burden on the educator to troubleshoot every group."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="Everything Your Classroom Needs"
        subtitle="The Tale-Bot Pro Classroom Set includes six complete robots and a full suite of teaching materials — no additional purchases required to get started."
        features={[
          {
            icon: "book",
            title: "42 Activity Cards",
            description:
              "Structured cross-curricular curriculum in 4 categories — basic commands, exploration, patterns, and comprehensive challenges",
          },
          {
            icon: "users",
            title: "Serves a Full Class",
            description:
              "Six robots support groups of 3–4 learners simultaneously across a class of 18–24",
          },
          {
            icon: "globe",
            title: "11 Languages Supported",
            description:
              "Speaks English, Afrikaans context, French, Mandarin, and more — ideal for multilingual South African classrooms",
          },
          {
            icon: "map",
            title: "Cross-Curricular Maps",
            description:
              "Double-sided interactive maps cover frog life cycles, plant growth, and more — linking coding to Natural Sciences",
          },
          {
            icon: "battery",
            title: "Rechargeable Batteries",
            description:
              "Built-in 1500mAh batteries last up to 4 hours — USB-C charging, no disposable batteries to manage",
          },
          {
            icon: "shield",
            title: "Classroom Durable",
            description:
              "Eco-friendly, food-grade materials with fall-resistant construction — built to withstand repeated daily use",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Storytelling Integration */}
      <ImageTextBlock
        image="/images/products/matatastudio-tale-bot-pro-classroom-set/teacher-with-kids.jpg"
        imageAlt="Teacher working alongside young learners using Tale-Bot Pro in a group setting"
        title="Cross-Curricular Learning in Every Lesson"
        body="Tale-Bot Pro connects coding to the rest of your curriculum. Learners navigate the frog life cycle map to reinforce Natural Sciences concepts. They code the robot through plant growth stages, connecting programming to Life and Living. The voice recording feature develops oral language skills in Home Language, while the drawing capability links to Arts and Crafts. One tool — multiple learning areas. Educators consistently report that learners engage more deeply with subject content when they're coding it rather than reading it."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Classroom Activities"
        highlight="42 Activity Cards plus a Challenge Booklet — a complete cross-curricular coding curriculum for Grades R–3"
        subtitle="Activities progress from basic movement sequences to complex coding challenges, supporting mixed-ability classrooms and differentiated instruction."
        projects={[
          {
            name: "Basic Movement Commands",
            description: "Sequence forward, backward, left, and right commands",
            concepts: "Sequential thinking, cause and effect, spatial reasoning",
            image:
              "/images/products/matatastudio-tale-bot-pro-classroom-set/boy-pressing-button-on-talebot.jpeg",
          },
          {
            name: "Frog Life Cycle Map",
            description: "Navigate the stages from egg to adult frog",
            concepts: "Natural Sciences — Life and Living, sequencing, observation",
            image:
              "/images/products/matatastudio-tale-bot-pro/tale-bot-on-frog-cycle-board.png",
          },
          {
            name: "Plant Growth Map",
            description: "Code the robot through the stages of a sunflower's life",
            concepts: "Natural Sciences — Life and Living, sequential ordering",
            image:
              "/images/products/matatastudio-tale-bot-pro-classroom-set/two-kids-playing-with-growing-map.jpg",
          },
          {
            name: "Drawing with Markers",
            description: "Programme the robot to draw shapes and patterns on paper",
            concepts: "Geometry, spatial reasoning, fine motor, creative expression",
            image:
              "/images/products/matatastudio-tale-bot-pro/tale-bot-drawing-front-view.png",
          },
          {
            name: "Dancing & Music Coding",
            description: "Programme sequences of movement and sound",
            concepts: "Pattern recognition, rhythm, creative coding, sequencing",
            image:
              "/images/products/matatastudio-tale-bot-pro/tale-bot-singing-and-dancing.png",
          },
          {
            name: "LEGO Construction Challenges",
            description: "Combine building and coding in open-ended design tasks",
            concepts: "Engineering design, Technology — Structures, problem-solving",
            image:
              "/images/products/matatastudio-tale-bot-pro/tale-bot-compatible-with-lego-blocks.png",
          },
        ]}
        moreText="Plus blank maps for open-ended investigation, voice recording storytelling activities, and optional Scratch programming extension tasks for advanced learners"
        background="gray"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="Tale-Bot Pro in Schools"
        subtitle="See how educators and learners around the world are using Tale-Bot Pro to bring coding to life in the classroom."
        images={[
          {
            src: "/images/products/matatastudio-tale-bot-pro-classroom-set/lots-of-kids-gathered-around-playing.jpeg",
            alt: "Large group of young learners gathered around Tale-Bot Pro robots in a classroom",
          },
          {
            src: "/images/products/matatastudio-tale-bot-pro-classroom-set/teach-with-kids-handing-out-cards.jpeg",
            alt: "Teacher handing out activity cards to learners before a coding lesson",
          },
          {
            src: "/images/products/matatastudio-tale-bot-pro-classroom-set/kids-playing-on-the-floor-.jpeg",
            alt: "Children sitting on the floor working with Tale-Bot Pro on interactive maps",
          },
          {
            src: "/images/products/matatastudio-tale-bot-pro-classroom-set/two-kids-playing-with-growing-map.jpg",
            alt: "Two young learners coding Tale-Bot Pro through the plant growing interactive map",
          },
          {
            src: "/images/products/matatastudio-tale-bot-pro-classroom-set/three-kids-playing-with-kit.jpg",
            alt: "Three learners collaborating on a Tale-Bot Pro coding activity",
          },
          {
            src: "/images/products/matatastudio-tale-bot-pro-classroom-set/boy-pressing-button-on-talebot.jpeg",
            alt: "Boy pressing command buttons on Tale-Bot Pro robot during a lesson",
          },
          {
            src: "/images/products/matatastudio-tale-bot-pro-classroom-set/talebot-with-arms-going-towards-figure.jpeg",
            alt: "Tale-Bot Pro with arm attachments approaching a figure on an activity mat",
          },
          {
            src: "/images/products/matatastudio-tale-bot-pro-classroom-set/all-parts-displayed.jpg",
            alt: "All components of the Tale-Bot Pro Classroom Set displayed together",
          },
        ]}
        background="white"
      />

      {/* FAQ */}
      <ProductFAQ
        title="Educator Questions"
        faqs={[
          {
            question: "Does this align with the CAPS curriculum?",
            answer:
              "Yes. Tale-Bot Pro supports the CAPS Technology curriculum for Foundation Phase (Grades R–3), specifically developing computational thinking, sequencing, and algorithmic reasoning. The interactive maps also link to Natural Sciences (Life and Living) and the drawing activities connect to Arts and Crafts. We recommend mapping activities to your specific term plan using the included teacher guide.",
          },
          {
            question: "How many learners can use the classroom set simultaneously?",
            answer:
              "With 6 robots, the classroom set supports groups of 3–4 learners per robot — meaning 18–24 learners can engage simultaneously in small group rotations. This is ideal for a standard Foundation Phase class, and the group format naturally encourages peer learning and collaboration.",
          },
          {
            question: "Do I need a STEM background to teach with this?",
            answer:
              "Not at all. The classroom set includes a complete teacher guide with step-by-step lesson plans, learning objectives, and assessment rubrics. Educators without any STEM background consistently deliver effective lessons using the provided materials. The robot's physical interface is intuitive — if you can follow a lesson plan, you can teach this.",
          },
          {
            question: "How durable are the robots for repeated daily classroom use?",
            answer:
              "Tale-Bot Pro is built from eco-friendly, food-grade materials with a fall-resistant design — specifically to withstand the rigours of young learners. The built-in rechargeable battery eliminates the cost of disposable batteries, and the robots are designed to be reused across multiple terms and multiple cohorts of learners.",
          },
          {
            question: "What preparation is needed before lessons?",
            answer:
              "Minimal. Ensure all robots are charged (up to 4 hours of use per charge), lay out the relevant interactive maps, and review the lesson plan. Most educators report preparation time of under 10 minutes per lesson. The robots require no software installation or screen setup for standard use.",
          },
          {
            question: "Is bulk or school pricing available?",
            answer:
              "The classroom set is already priced for school procurement and represents significant savings over individual robot purchases. For multiple classroom sets, school-wide orders, or ongoing supply arrangements, please contact us via the Education section of our website.",
          },
          {
            question: "What structured curriculum comes with the set?",
            answer:
              "The classroom set includes 42 Activity Cards in four progressive categories: basic commands (10 activities), exploration activities linking coding to health, science, social studies, and language (15 activities), pattern recognition introducing loops (7 activities), and comprehensive challenges that combine all programming concepts (10 activities). This is a complete, ready-to-teach curriculum — educators can follow it as written or use it as a framework to develop their own lessons.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Kit */}
      <WhatsIncluded
        title="What's in the Kit"
        image="/images/products/matatastudio-tale-bot-pro-classroom-set/whats-in-the-box.jpg"
        imageAlt="Tale-Bot Pro Classroom Set contents laid out showing all 6 robots and teaching materials"
        items={[
          "6x Tale-Bot Pro Robots",
          "12x Assembly accessories (wings & arms — 2 sets per robot)",
          "12x Washable markers (2 per robot)",
          "6x Command card sets (1 per robot)",
          "6x USB-C charging cables",
          "18x Double-sided interactive maps (shared across groups)",
          "1x Activity Cards set (42 structured activities in 4 categories)",
          "1x Challenge booklet",
          "1x Configuration card (11 languages)",
          "1x User guide",
          "3x Callout sticker sheets",
          "1x Callout stickers quick guide",
          "2x Paper craft materials",
          "1x 10-port USB charging station",
          "1x Plastic storage bin",
        ]}
        background="white"
      />

      {/* Final CTA */}
      <CallToAction
        title="Equip Your Classroom"
        subtitle="Trusted by schools across South Africa. Give your Foundation Phase learners a hands-on coding experience they'll remember."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse Classroom Kits"
        secondaryHref="/education/classroom-kits"
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
      "Screen-free coding classroom kit with 6 robots. CAPS-aligned for Grades R–3, complete teacher guide included. Serves 18–24 learners per session.",
    alternates: {
      canonical: "/product/matatastudio-tale-bot-pro-classroom-set",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
