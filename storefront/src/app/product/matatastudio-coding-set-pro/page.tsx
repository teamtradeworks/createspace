import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  NumberedSteps,
  VideoEmbed,
  ImageTextBlock,
  FeatureGrid,
  ProjectShowcase,
  CustomerShowcase,
  WhatsIncluded,
  ProductFAQ,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "matatastudio-coding-set-pro";

export default async function MatataStudioCodingSetProPage() {
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
        tagline="Screen-free coding that puts real programming in little hands"
        highlights={[
          "100+ hands-on coding challenges with zero screen time",
          "No reading required — visual symbols make coding accessible from age 4",
          "Teaches real programming concepts: loops, functions, debugging",
          "3 challenge booklets progress from beginner to advanced",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Screen-Free Coding */}
      <NumberedSteps
        title="Why Screen-Free Coding Works Better"
        subtitle="Research shows children using tangible coding robots perform 27% better on computational thinking than those using screen-based tools. Here's why physical coding blocks make all the difference."
        steps={[
          {
            title: "See It Move",
            description:
              "When your child places coding blocks and watches the robot instantly respond, abstract concepts become concrete. MatataBot executes commands in real time, making cause-and-effect vivid and memorable.",
          },
          {
            title: "No Reading Needed",
            description:
              "Directional symbols on coding blocks eliminate the reading barrier. Children as young as 4 can start coding independently — no reading skills or screen literacy required.",
          },
          {
            title: "Hands Build Brains",
            description:
              "Young children learn best through tactile play. Physical coding blocks engage fine motor skills and spatial reasoning while teaching computational thinking — screen-free and developmentally appropriate.",
          },
        ]}
        background="navy-card"
      />

      {/* Video Section */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=zdRpcJHmKZw&t=1s"
        title="See MatataStudio Coding Set Pro in Action"
        background="gray"
      />

      {/* Hands-On Learning */}
      <ImageTextBlock
        image="/images/products/matatastudio-coding-set-pro/child-playing-with-kit.png"
        imageAlt="Child independently placing coding blocks on the control board"
        title="Learning Through Play, Not Screens"
        body="MatataStudio Coding Set Pro makes coding tangible. Your child arranges physical coding blocks on the Control Board, and the Command Tower's camera reads the sequence. MatataBot executes the program instantly — moving, turning, and responding to the code they've written. This immediate feedback loop makes abstract programming concepts concrete and memorable, while keeping screen time at zero."
        layout="image-left"
        background="white"
      />

      {/* Key Features */}
      <FeatureGrid
        title="Everything Your Child Needs to Start Coding"
        subtitle="No computers, tablets, apps, or reading skills required. MatataStudio Coding Set Pro is designed for complete independence from ages 4-9."
        features={[
          {
            icon: "brain",
            title: "Real Programming Concepts",
            description:
              "Teaches authentic coding fundamentals — sequencing, loops, functions, parameters, and debugging. Not simplified toy versions, but real computational thinking.",
          },
          {
            icon: "blocks",
            title: "37 Physical Coding Blocks",
            description:
              "Motion, loop, function, number, and fun blocks let children write increasingly complex programs. Place blocks on the Control Board, and the robot reads and executes the code.",
          },
          {
            icon: "music",
            title: "Music & Art Programming",
            description:
              "Pro Set exclusive: program melodies with music blocks and draw geometric patterns with angle blocks. Turn coding into creative expression.",
          },
          {
            icon: "battery",
            title: "Rechargeable Design",
            description:
              "5-hour battery life for MatataBot and Command Tower. USB-C charging included — no disposable batteries to buy or replace.",
          },
          {
            icon: "compatible",
            title: "LEGO® Compatible",
            description:
              "Integrate with your child's existing building blocks. Transform MatataBot into custom creations and add obstacles for endless new coding challenges.",
          },
          {
            icon: "shield",
            title: "Safe & Durable",
            description:
              "Food-grade, washable, lead-free materials. Passed EN71 safety assessment and drop test. Built for repeated use by ages 4-9.",
          },
        ]}
        background="white"
      />

      {/* Grows with Your Child */}
      <ImageTextBlock
        image="/images/products/matatastudio-coding-set-pro/group-of-children-with-parents-playing-together.jpg"
        imageAlt="Family working together on coding challenges with MatataStudio"
        title="Five Years of Learning in One Kit"
        body="MatataStudio Coding Set Pro grows with your child from ages 4 to 9. The three progressive challenge booklets start with simple forward movement and build to advanced functions, loops, and creative music programming. Younger children grasp cause-and-effect and sequencing, while older children tackle computational efficiency and abstraction. It's not a toy they'll outgrow in months — it's a learning companion that evolves with their abilities."
        layout="image-right"
        background="gray"
      />

      {/* 100+ Challenges Breakdown */}
      <ProjectShowcase
        title="100+ Coding Challenges That Grow with Your Child"
        highlight="Navigate mazes, create music, draw patterns, and solve puzzles — all screen-free"
        subtitle="Three progressive challenge booklets guide learners from basic movement to advanced functions. Each challenge builds on the last, developing computational thinking step by step."
        projects={[
          {
            name: "Navigation Challenges",
            description: "Program MatataBot to reach destinations on the game map.",
            concepts: "Sequencing, spatial reasoning, planning, debugging",
            image:
              "/images/products/matatastudio-coding-set-pro/projects/maps-and-other-things.png",
          },
          {
            name: "Obstacle Courses",
            description: "Navigate around flags and barriers on increasingly complex maps.",
            concepts: "Problem decomposition, conditional thinking, route optimization",
            image: "/images/products/matatastudio-coding-set-pro/projects/map-forest-park-tour.jpg",
          },
          {
            name: "Loop Exercises",
            description: "Use Loop blocks to create efficient code with repetition.",
            concepts: "Pattern recognition, computational efficiency, optimization",
            image: "/images/products/matatastudio-coding-set-pro/projects/coding-blocks.jpg",
          },
          {
            name: "Function Challenges",
            description: "Define and call functions to solve complex multi-step tasks.",
            concepts: "Abstraction, code reusability, modular thinking",
            image: "/images/products/matatastudio-coding-set-pro/projects/tower-with-booklet.png",
          },
          {
            name: "Geometry Activities",
            description: "Draw shapes and patterns using angle blocks for precision.",
            concepts: "Mathematical concepts, geometric reasoning, spatial accuracy",
            image: "/images/products/matatastudio-coding-set-pro/projects/bot-with-pen.jpg",
          },
          {
            name: "Music Programming",
            description: "Compose melodies and rhythms using music blocks (Pro feature).",
            concepts: "Creative coding, rhythm, musical patterns, STEAM",
            image:
              "/images/products/matatastudio-coding-set-pro/projects/bot-singing-and-dancing.png",
          },
        ]}
        moreText="Plus story-based missions, art projects, and open-ended creative challenges. Activities span 5 age groups (4-5, 6-7, 8-9) with appropriate difficulty for each stage."
        background="gray"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        images={[
          {
            src: "/images/products/matatastudio-coding-set-pro/2-boys-playing-together-on-floor.jpg",
            alt: "Two boys collaborating on coding challenges",
          },
          {
            src: "/images/products/matatastudio-coding-set-pro/3-kids-playing-together.jpeg",
            alt: "Three children working together with MatataStudio",
          },
          {
            src: "/images/products/matatastudio-coding-set-pro/boy-placing-pieces-down.jpg",
            alt: "Child placing coding blocks on the control board",
          },
          {
            src: "/images/products/matatastudio-coding-set-pro/top-dow-hands-holding-on-part-with-board.jpg",
            alt: "Close-up of hands arranging coding blocks",
          },
          {
            src: "/images/products/matatastudio-coding-set-pro/two-boys-playing-with-kit-together.jpg",
            alt: "Brothers coding together screen-free",
          },
          {
            src: "/images/products/matatastudio-coding-set-pro/two-young-boys-playing-together.jpg",
            alt: "Young boys collaborating on a coding challenge",
          },
          {
            src: "/images/products/matatastudio-coding-set-pro/boy-placing-piece-into-tray-top-down.jpg",
            alt: "Top-down view of child placing coding blocks into the tray",
          },
          {
            src: "/images/products/matatastudio-coding-set-pro/child-playing-with-set.jpeg",
            alt: "Child engaged in hands-on coding with MatataStudio",
          },
        ]}
        background="white"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/matatastudio-coding-set-pro/whats-in-the-box.jpeg"
        imageAlt="MatataStudio Coding Set Pro components laid out showing MatataBot, Command Tower, Control Board, coding blocks, and challenge booklets"
        items={[
          "1 × MatataBot programmable robot",
          "1 × Command Tower with image recognition camera",
          "1 × Control Board",
          "37 × Coding Blocks (motion, loop, function, number, fun)",
          "3 × Challenge Booklets (beginner to advanced)",
          "1 × Two-Sided Game Map (Nature theme)",
          "Obstacles and Flags",
          "1 × USB-C Charging Cable",
        ]}
        background="white"
      />

      {/* FAQs */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "What age is this suitable for?",
            answer:
              "Ages 4-9. The set is designed for complete beginners and grows with your child through three challenge booklets. Younger children (4-5) start with basic movement and sequencing, while older children (8-9) tackle advanced loops, functions, and creative coding. No reading skills required — visual symbols on blocks make coding accessible from age 4.",
          },
          {
            question: "Does my child need any coding or reading experience?",
            answer:
              "Not at all. MatataStudio Coding Set Pro is designed for complete beginners with zero coding or reading experience. Coding blocks use directional symbols instead of words, making programming intuitive and accessible. The three challenge booklets guide children step-by-step from absolute basics to advanced concepts.",
          },
          {
            question: "Do we need a computer, tablet, or app?",
            answer:
              "No. This is a truly screen-free coding experience. No computer, tablet, smartphone, app, or internet connection required. The Command Tower's image recognition camera reads physical coding blocks, and MatataBot executes the program. Everything works offline, eliminating screen time concerns while teaching authentic programming fundamentals.",
          },
          {
            question: "How does it work without a screen?",
            answer:
              "Children place physical coding blocks on the Control Board in the sequence they want. The Command Tower's built-in camera reads the blocks and wirelessly transmits the program to MatataBot. The robot executes the code, moving and responding in real time. This tangible approach makes abstract programming concepts concrete and immediate.",
          },
          {
            question: "What will my child actually learn?",
            answer:
              "Your child will learn real programming fundamentals: sequencing (ordering commands), loops (repetition for efficiency), functions (reusable code), debugging (fixing errors), parameters (variables), and algorithms (step-by-step problem-solving). Beyond coding, they develop spatial reasoning, logical thinking, problem decomposition, patience, and resilience. Research shows tangible coding robots improve computational thinking 27% more than screen-based tools.",
          },
          {
            question: "Can they use it independently, or do I need to help?",
            answer:
              "Most children work independently after initial setup. The visual symbols on blocks eliminate reading barriers, and the challenge booklets provide clear guidance. Parents may help with the first few challenges (5-10 minutes) to explain the pairing process, but children typically take ownership quickly. Younger children (ages 4-5) benefit from occasional guidance, while ages 6+ usually work solo.",
          },
          {
            question: "Are batteries included?",
            answer:
              "Yes — rechargeable batteries are built into both MatataBot and the Command Tower. A USB-C charging cable is included. MatataBot charges in 1.5 hours and runs for 5 hours. Command Tower charges in 3.5 hours and runs for 5 hours. No disposable batteries to buy or replace.",
          },
          {
            question: "What happens after they complete all the challenges?",
            answer:
              "MatataStudio Coding Set Pro has exceptional replayability. Beyond the 100+ included challenges, children create their own coding adventures using the game map, obstacles, and flags. They can also expand with four optional add-ons: Musician (music composition), Artist (drawing patterns), Animation (physical animations), and Sensor (obstacle detection and LED control). The set is also LEGO® compatible for infinite customisation.",
          },
          {
            question: "Is this safe for young children?",
            answer:
              "Yes. MatataStudio Coding Set Pro uses food-grade, washable, lead-free materials and has passed EN71 safety assessment (European toy safety standards) and drop testing. The coding blocks are safe even if placed in the mouth. The set is designed for ages 4-9 with durable construction for repeated use.",
          },
          {
            question: "What's the difference between the Pro Set and standard Coding Set?",
            answer:
              "The Pro Set includes music blocks (for programming melodies) and angle blocks (for drawing geometric patterns) — exclusive features not available in the standard Coding Set. The Pro Set is designed for advanced learning and classroom use, while the standard set is ideal for homeschool beginners without prior coding experience.",
          },
        ]}
        background="gray"
      />

      {/* Technical Specifications */}
      <Specifications
        title="Technical Specifications"
        specs={[
          { label: "Age Range", value: "4-9 years" },
          { label: "Skill Level", value: "Beginner (no experience required)" },
          {
            label: "Battery (MatataBot)",
            value: "500mAh Li-ion, 1.5hr charge, 5hr runtime",
          },
          {
            label: "Battery (Command Tower)",
            value: "2000mAh Li-ion, 3.5hr charge, 5hr runtime",
          },
          { label: "Charging", value: "USB-C cable (included)" },
          { label: "Connectivity", value: "Bluetooth (MatataBot ↔ Command Tower)" },
          { label: "Coding Blocks", value: "37 pieces (5 types)" },
          { label: "Challenges Included", value: "100+ stories and activities" },
          {
            label: "Materials",
            value: "Food-grade, washable, lead-free plastic",
          },
          {
            label: "Safety Certifications",
            value: "EN71 compliant, drop tested",
          },
          {
            label: "LEGO® Compatibility",
            value: "Yes (integrate with standard LEGO® bricks)",
          },
          {
            label: "Internet Required",
            value: "No (works completely offline)",
          },
        ]}
        background="white"
      />

      {/* Call to Action */}
      <CallToAction
        title="Give Your Child a Head Start in Coding"
        subtitle="Join 8,000+ schools worldwide using MatataStudio to teach computational thinking through screen-free play"
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse More Coding Kits"
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
      "Screen-free coding robot for ages 4-9. 100+ hands-on challenges teach real programming with zero screen time. No reading or experience needed. Rechargeable, LEGO® compatible.",
    alternates: {
      canonical: "/product/matatastudio-coding-set-pro",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
