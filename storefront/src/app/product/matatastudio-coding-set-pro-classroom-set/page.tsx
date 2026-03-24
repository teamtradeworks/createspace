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
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "matatastudio-coding-set-pro-classroom-set";

export default async function MatataStudioCodingSetProClassroomSetPage() {
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
        tagline="Bring screen-free coding to every learner in your Foundation Phase classroom"
        highlights={[
          "Serves up to 24 learners simultaneously — 6 kits, 4 learners per group",
          "Complete teacher guides included — no STEM background required",
          "Aligns with CAPS Foundation Phase: Technology, Mathematics & Life Skills",
          "Fully rechargeable — no disposable batteries, no apps, no screens",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Choose This For Your Classroom */}
      <NumberedSteps
        title="Why Choose This for Your Classroom?"
        subtitle="The MatataStudio Coding Set Pro Classroom Set gives Foundation Phase educators everything needed to run structured, evidence-based coding lessons — from day one."
        steps={[
          {
            title: "Curriculum Aligned",
            description:
              "Structured 12-lesson curriculum with 4 progressive units covers sequencing, loops, functions, and creative integration. Cross-curricular tie-ins to Mathematics (spatial reasoning, geometry), Life Skills (collaboration, problem-solving), and Arts & Culture (music and drawing) align with CAPS Foundation Phase outcomes for Grades R–3.",
          },
          {
            title: "Teacher-Ready",
            description:
              "Three printed teacher manuals — Coding, Artist, and Musician — include lesson plans, learning objectives, and step-by-step guidance. No prior STEM experience needed. Lessons are structured with time references and adaptable goals, so you spend less time preparing and more time teaching.",
          },
          {
            title: "Built for Groups",
            description:
              "Each kit supports a group of 4 learners working collaboratively. Six kits run simultaneously, reaching a full class of 24. Research confirms that collaborative learning in groups is the most effective approach for developing computational thinking in young learners — this set is designed around that evidence.",
          },
        ]}
        background="navy-card"
      />

      {/* Teacher-led learning image */}
      <ImageTextBlock
        image="/images/products/matatastudio-coding-set-pro-classroom-set/teacher-explaining-to-kids-in-class.jpg"
        imageAlt="Teacher explaining coding concepts to young learners in a Foundation Phase classroom"
        title="No STEM Background? No Problem."
        body="The Coding Set Pro Classroom Set is built for educators of all backgrounds. The Command Tower's image recognition camera does the technical work — reading the coding blocks learners place on the Control Board and transmitting instructions wirelessly to the MatataBot. Your role is facilitation: guiding groups through the challenge booklets and teacher manuals that come with the set. The printed Coding, Artist, and Musician teacher manuals give you lesson plans, learning objectives, and assessment guidance for all 12 lessons."
        layout="image-left"
        background="white"
      />

      {/* Key Features for Educators */}
      <FeatureGrid
        title="Designed Around How Young Learners Learn Best"
        subtitle="Six Coding Set Pro kits plus complete teacher resources — everything your classroom needs for hands-on coding, right out of the box."
        features={[
          {
            icon: "shield",
            title: "Fully Screen-Free",
            description:
              "No tablets, apps, computers, or internet required. Learners programme the MatataBot using physical coding blocks — no reading skills needed from age 4.",
          },
          {
            icon: "book",
            title: "3 Printed Teacher Manuals",
            description:
              "Coding, Artist, and Musician manuals include 12 lessons across 4 units. Lesson plans cover time references, learning objectives, and cross-curricular links.",
          },
          {
            icon: "robot",
            title: "Full-Class Capacity",
            description:
              "Six kits run simultaneously for groups of 4, serving up to 24 learners in a single lesson period without rotation or waiting.",
          },
          {
            icon: "tools",
            title: "Reusable Across Terms",
            description:
              "Durable ABS plastic construction, rechargeable via USB-C, and three progressive challenge booklets per kit mean the set can be used term after term.",
          },
          {
            icon: "music",
            title: "Cross-Curricular by Design",
            description:
              "The Pro upgrade includes music blocks for composing melodies and angle blocks for drawing geometric shapes — extending coding into Arts, Culture, and Mathematics.",
          },
          {
            icon: "puzzle",
            title: "Strawbees Engineering Extension",
            description:
              "The included Strawbees School Kit adds connectors, building straws, and clips for engineering challenges that extend the curriculum into design and construction.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Classroom Activities */}
      <ProjectShowcase
        title="Classroom Activities Across 4 Progressive Units"
        highlight="12 CAPS-aligned lessons with complete teacher guides — from basic sequencing to creative coding"
        subtitle="Activities progress from foundational concepts to advanced challenges, suitable for mixed-ability Foundation Phase classrooms."
        projects={[
          {
            name: "Navigation Challenges",
            description:
              "Programme the MatataBot to travel a route on the game map using directional blocks.",
            concepts: "Sequencing, spatial reasoning, route planning",
            image: "/images/products/matatastudio-coding-set-pro/projects/map-forest-park-tour.jpg",
          },
          {
            name: "Obstacle Courses",
            description:
              "Navigate around flags and barriers — adjust the programme when the first attempt fails.",
            concepts: "Debugging, problem decomposition, conditional thinking",
            image:
              "/images/products/matatastudio-coding-set-pro/projects/maps-and-other-things.jpg",
          },
          {
            name: "Loop Exercises",
            description:
              "Use Loop blocks to shorten repetitive code and draw geometric shapes with fewer blocks.",
            concepts: "Loops, pattern recognition, computational efficiency",
            image: "/images/products/matatastudio-coding-set-pro/projects/coding-blocks.jpg",
          },
          {
            name: "Function Challenges",
            description:
              "Define reusable code blocks and call them multiple times to solve complex tasks.",
            concepts: "Functions, abstraction, code reusability",
            image: "/images/products/matatastudio-coding-set-pro/projects/tower-with-booklet.png",
          },
          {
            name: "Drawing Activities",
            description:
              "Attach the washable marker and programme the robot to draw shapes using angle blocks.",
            concepts: "Angles, geometry, measurement, mathematical thinking",
            image: "/images/products/matatastudio-coding-set-pro/projects/bot-with-pen.jpg",
          },
          {
            name: "Music Composition",
            description:
              "Sequence music note blocks to compose a melody — then use loops to repeat musical phrases.",
            concepts: "Creative coding, rhythm, musical patterns, STEAM",
            image:
              "/images/products/matatastudio-coding-set-pro/projects/bot-singing-and-dancing.png",
          },
        ]}
        moreText="Plus storytelling missions, open-ended creative challenges, and Strawbees engineering activities. All 12 lessons include lesson plans, time references, and learning objectives in the printed teacher manuals."
        background="white"
      />

      {/* Classroom collaboration image */}
      <ImageTextBlock
        image="/images/products/matatastudio-coding-set-pro-classroom-set/kids-sitting-at-table-with-teacher-playing.jpg"
        imageAlt="Young learners sitting at a table working together on MatataStudio coding challenges with their teacher"
        title="Collaboration Is Built Into Every Challenge"
        body="Each group of four learners works together to plan routes, arrange coding blocks, debug programmes, and run challenges. Learners negotiate turns, explain their thinking, and coach each other — skills that extend well beyond the coding lesson. Research across 22 studies confirms that collaborative learning is the single most effective approach for developing computational thinking in Foundation Phase learners. The Coding Set Pro Classroom Set puts that evidence into practice every lesson."
        layout="image-right"
        background="gray"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See It in Your Learners' Hands"
        subtitle="MatataStudio in action — hands-on, screen-free, and genuinely engaging."
        background="white"
        images={[
          {
            src: "/images/products/matatastudio-coding-set-pro-classroom-set/kids-playing-together.jpg",
            alt: "Two learners working together on a MatataStudio coding challenge",
          },
          {
            src: "/images/products/matatastudio-coding-set-pro-classroom-set/girl-playing.jpg",
            alt: "Girl independently placing coding blocks on the control board",
          },
          {
            src: "/images/products/matatastudio-coding-set-pro-classroom-set/child-playing-with-set.jpeg",
            alt: "Young child engaged with the MatataStudio Coding Set Pro",
          },
          {
            src: "/images/products/matatastudio-coding-set-pro-classroom-set/girl-looking-at-blocks.jpeg",
            alt: "Girl examining coding blocks and planning her programme",
          },
          {
            src: "/images/products/matatastudio-coding-set-pro-classroom-set/top-view-of-chlid-placing-coding-blocks-down.jpg",
            alt: "Top-down view of a child carefully placing coding blocks in sequence",
          },
          {
            src: "/images/products/matatastudio-coding-set-pro-classroom-set/top-view-of-parts-and-pieces.jpeg",
            alt: "Top-down view of Coding Set Pro components spread out on a table",
          },
          {
            src: "/images/products/matatastudio-coding-set-pro-classroom-set/close-up-of-coding-blocks.jpeg",
            alt: "Close-up of MatataStudio coding blocks showing directional symbols",
          },
          {
            src: "/images/products/matatastudio-coding-set-pro-classroom-set/young-boy-playing-with-kit.jpg",
            alt: "Young boy concentrating on his MatataStudio coding programme",
          },
        ]}
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="gray" />

      {/* FAQ for Educators */}
      <ProductFAQ
        title="Educator Questions"
        faqs={[
          {
            question: "Does this align with the CAPS curriculum?",
            answer:
              "Yes. The 12-lesson curriculum covers computational thinking and coding concepts that align with CAPS Foundation Phase outcomes across Technology, Mathematics, and Life Skills. Coding activities link to spatial reasoning, number concepts, and geometry in Mathematics. Collaborative group activities support Life Skills outcomes around teamwork, problem-solving, and communication. The Musician and Artist add-ons integrate with Arts & Culture. While MatataStudio does not carry a formal CAPS endorsement stamp, the content maps naturally to Grade R–3 learning areas.",
          },
          {
            question: "How many learners can use the set simultaneously?",
            answer:
              "The classroom set supports up to 24 learners at the same time — 6 groups of 4. All six kits run independently of each other, so every group is coding simultaneously without waiting for a turn. This makes it practical for standard Foundation Phase class sizes in a single lesson period.",
          },
          {
            question: "Do I need a STEM background to teach with this?",
            answer:
              "Not at all. Three printed teacher manuals — Coding, Artist, and Musician — provide complete lesson plans with learning objectives, time references, and step-by-step instructions for each activity. The system is designed so that the materials guide both educator and learner. Many teachers report being able to run their first lesson after a single read-through of the Coding Teacher Manual.",
          },
          {
            question: "How durable is this for repeated classroom use?",
            answer:
              "The Coding Set Pro is built for institutional use from the ground up. ABS plastic construction is durable and safe. Coding blocks have been tested for repeated handling and are safe even if placed in the mouth (food-grade, washable, lead-free materials). MatataBot and the Command Tower recharge via USB-C — no batteries to replace. The set meets EN71 European toy safety standards and has passed drop testing.",
          },
          {
            question: "How much preparation is needed before each lesson?",
            answer:
              "Minimal. Charge the MatataBots and Command Towers beforehand (USB-C, one per kit), set out the control boards and coding blocks, and distribute the appropriate challenge booklet. The teacher manuals include a quick overview at the start of each lesson. Most educators report preparation times of under 10 minutes once familiar with the set.",
          },
          {
            question: "What does the 12-lesson curriculum cover?",
            answer:
              "The curriculum is divided into 4 progressive units: Unit 1 introduces robot movement and sequencing; Unit 2 covers loops using Loop Begin/End blocks; Unit 3 introduces functions and code reusability; Unit 4 integrates drawing (Artist) and music (Musician) for creative cross-curricular applications. Each unit builds on the previous, progressing from introduction to understanding to application. Two curriculum formats are included — Learning Station (classroom group work) and Extracurricular (after-school or club settings).",
          },
          {
            question: "Are replacement parts or additional kits available?",
            answer:
              "Yes. Individual Coding Set Pro units can be purchased separately to expand the classroom set or replace damaged kits. Optional add-ons — Animation and Sensor — are also available to extend the curriculum further. Contact CREATESPACE for bulk and school pricing enquiries.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Kit */}
      <WhatsIncluded
        title="What's in the Kit"
        image="/images/products/matatastudio-coding-set-pro-classroom-set/whats-in-the-box.jpg"
        imageAlt="MatataStudio Coding Set Pro Classroom Set contents laid out showing all 6 kits and teacher resources"
        items={[
          "6 × MatataBot programmable robot",
          "6 × Command Tower with image recognition camera",
          "6 × Control Board",
          "6 × Double-Sided Map",
          "594 × Coding Blocks (99 per kit — directional, loop, number, condition, angle, music note, and function blocks)",
          "18 × Challenge Booklets (3 per kit, beginner to advanced)",
          "18 × Artist Drawing Warm-Up Cards (3 per kit)",
          "18 × Musician Warm-Up Cards (3 per kit)",
          "18 × Flags (3 per kit)",
          "6 × Washable Marker (for drawing activities)",
          "6 × USB-C Charging Cable",
          "6 × Obstacles set",
          "1 × Coding Teacher Manual (printed, 99 pages, 12 lessons)",
          "1 × Artist Teacher Manual (printed)",
          "1 × Musician Teacher Manual (printed)",
          "3 × Paper Craft sets",
          "1 × Strawbees School Kit (connectors, building straws, clips)",
        ]}
        background="white"
      />

      {/* Technical Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Age Range", value: "4–9 years (Foundation Phase: Grades R–3)" },
          { label: "Learner Capacity", value: "24 learners (6 groups of 4)" },
          {
            label: "Curriculum",
            value: "12 lessons, 4 units (Learning Station + Extracurricular formats)",
          },
          { label: "Kits Included", value: "6 × Coding Set Pro" },
          {
            label: "Coding Blocks per Kit",
            value: "99 pieces (directional, loop, number, condition, angle, music, function)",
          },
          {
            label: "Power",
            value: "USB-C rechargeable (built-in battery, no disposable batteries)",
          },
          { label: "Connectivity", value: "Bluetooth (Command Tower to MatataBot)" },
          { label: "Software Required", value: "None — fully screen-free, no apps or devices" },
          { label: "LEGO® Compatible", value: "Yes" },
          { label: "Materials", value: "ABS plastic, food-grade washable coding blocks" },
          { label: "Safety", value: "EN71 compliant, drop tested" },
          { label: "SKU", value: "201500096" },
        ]}
        background="gray"
      />

      {/* Call to Action */}
      <CallToAction
        title="Equip Your Foundation Phase Classroom"
        subtitle="Trusted by 1,000+ educational institutions worldwide. Bring structured, screen-free coding to every learner in your classroom."
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
      "Screen-free coding for Foundation Phase classrooms. Serves 24 learners, 12 CAPS-aligned lessons, 3 teacher manuals included. No STEM background required. Grades R–3.",
    alternates: {
      canonical: "/product/matatastudio-coding-set-pro-classroom-set",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
