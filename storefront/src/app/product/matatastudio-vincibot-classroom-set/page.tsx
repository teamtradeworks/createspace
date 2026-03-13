import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  NumberedSteps,
  VideoEmbed,
  FeatureGrid,
  ImageTextBlock,
  SkillTags,
  ProjectShowcase,
  CustomerShowcase,
  WhatsIncluded,
  ProductFAQ,
  ProductReviews,
  Specifications,
  CallToAction,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "matatastudio-vincibot-classroom-set";

export default async function VinciBotClassroomSetPage() {
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
        tagline="Complete coding, robotics, and AI classroom solution for Grades 3–7"
        highlights={[
          "Supports up to 24 learners simultaneously — 6 robots, groups of 4",
          "75 structured activities aligned with DBE Coding and Robotics curriculum",
          "Scratch and Python on one robot — no equipment change needed",
          "On-device AI and TinyML — works without internet connectivity",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Choose VinciBot Section */}
      <NumberedSteps
        title="Why Choose VinciBot for Your Classroom?"
        subtitle="VinciBot is built for real classroom conditions — mixed abilities, limited prep time, and the need to demonstrate curriculum value."
        steps={[
          {
            title: "Curriculum-Aligned from Day One",
            description:
              "VinciBot's 75-activity curriculum maps directly to the DBE Coding and Robotics Curriculum for Grades 3–7. Activities cover sequencing, loops, conditionals, functions, and variables — every concept required by the national framework.",
          },
          {
            title: "Designed for Group Learning",
            description:
              "Each robot supports 2–4 learners working collaboratively. Six robots in the classroom set means your full class engages simultaneously — no rotation, no waiting, no disruption.",
          },
          {
            title: "Works for Any Educator",
            description:
              "No STEM background required. The included teacher guide, challenge booklet, and free online professional development course give you everything needed to deliver confident, effective lessons from your first session.",
          },
        ]}
        background="navy-card"
      />

      {/* Video */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=DRPoDKsBkyM"
        title="See the VinciBot Classroom Set in Action"
        background="gray"
      />

      {/* A Full Class, Learning Together */}
      <ImageTextBlock
        image="/images/products/matatastudio-vincibot-classroom-set/teacher-with-kids-playing-with-vincibot-new.jpg"
        imageAlt="Teacher with learners playing with VinciBot coding robots"
        title="A Full Class, Learning Together"
        body="Six robots. Up to 24 learners. No rotation, no waiting. Groups of 2–4 learners share a robot — deciding together who codes, who observes, and who records results. Collaboration is built into every activity, not bolted on. Stronger coders naturally support peers, and educators report spontaneous peer teaching emerging within the first few sessions."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="Classroom-Ready Features"
        subtitle="Every aspect of VinciBot is engineered with the realities of a South African classroom in mind."
        features={[
          {
            icon: "code",
            title: "Scratch to Python Progression",
            description:
              "Learners begin with block-based Scratch and advance to text-based Python — on the same robot, in the same term, with no equipment change.",
          },
          {
            icon: "wifi",
            title: "On-Device AI — No Internet Needed",
            description:
              "TinyML features (gesture recognition, voice commands, handwriting recognition) run entirely on the robot. Works reliably in schools with limited connectivity.",
          },
          {
            icon: "sensor",
            title: "8+ Built-In Sensors",
            description:
              "Distance, light, sound, colour, and line-following sensors give learners real data to work with — turning abstract coding concepts into tangible, physical outcomes.",
          },
          {
            icon: "robot",
            title: "LEGO-Compatible and Expandable",
            description:
              "Compatible with LEGO bricks, Technic motors, and expansion kits. Scales from foundational activities to advanced engineering projects as your programme grows.",
          },
          {
            icon: "book",
            title: "Complete Teacher Resources",
            description:
              "Challenge booklet, user guide, and a full 6-lesson online professional development course (Course 5) give educators the confidence to teach without prior STEM experience.",
          },
          {
            icon: "puzzle",
            title: "Storage and Organisation Included",
            description:
              "A purpose-built plastic storage bin keeps all six sets organised. Setup and pack-away are fast — reducing lesson prep overhead for busy educators.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Scratch to Python on One Robot */}
      <ImageTextBlock
        image="/images/products/matatastudio-vincibot-classroom-set/kids-with-teacher-looking-at-tablet.jpg"
        imageAlt="Kids and teacher working with VinciBot through a tablet interface"
        title="From Scratch to Python — No Equipment Change"
        body="VinciBot bridges visual and text-based coding on a single robot. Learners begin with Scratch's block-based interface and progress to Python — with no new hardware, no new setup, and no interruption to the lesson. This progression happens on the same device your class already uses, making it practical for schools managing multiple grade levels with one set of equipment."
        layout="image-right"
        background="white"
      />

      {/* Activity Showcase */}
      <ProjectShowcase
        title="Classroom Activities"
        highlight="75 curriculum-aligned activities across 5 progressive modules"
        subtitle="Activities progress from foundational sequences to multi-robot communication and AI — suitable for mixed-ability classrooms at Grades 3–7. Each fits a standard 45-minute lesson period."
        projects={[
          {
            name: "Hello, I am VinciBot!",
            description: "Learners write their first sequence to make VinciBot introduce itself via movement and LED display.",
            concepts: "Sequences, basic commands",
            image: "/images/products/matatastudio-vincibot-classroom-set/projects/vincibot-close-up-on-line-following-map.jpg",
          },
          {
            name: "The Rainbow Light",
            description: "Programme the 16×8 LED matrix to display a colour sequence — learners discover the power of loops.",
            concepts: "Loops, LED programming",
            image: "/images/products/matatastudio-vincibot-classroom-set/projects/led-matrix-display.jpg",
          },
          {
            name: "Invisible Ruler",
            description: "Use the ToF distance sensor to measure objects accurately — combines maths and coding in one activity.",
            concepts: "Loops, sensor data, measurement",
            image: "/images/products/matatastudio-vincibot-classroom-set/projects/eight-built-in-sensors.jpg",
          },
          {
            name: "Eye Guard",
            description: "VinciBot uses obstacle detection to respond to objects — learners write their first if/then logic.",
            concepts: "Conditionals, sensor response",
            image: "/images/products/matatastudio-vincibot-classroom-set/projects/avoid-obstacles.jpg",
          },
          {
            name: "Dance for Two",
            description: "Two robots communicate via infrared and perform synchronised movement — a multi-robot collaboration challenge.",
            concepts: "IR communication, multi-robot coordination",
            image: "/images/products/matatastudio-vincibot-classroom-set/projects/vincitbot-with-lights-dancing-music.jpg",
          },
          {
            name: "Gesture Control",
            description: "Train VinciBot to recognise hand gestures using on-device TinyML — no internet required. Learners experience real AI running on the robot itself.",
            concepts: "TinyML, gesture recognition, on-device AI",
            image: "/images/products/matatastudio-vincibot-classroom-set/projects/artificial-intelligence.jpg",
          },
        ]}
        moreText="Plus 69 more activities covering functions, variables, line following, TinyML, IoT, and creative drawing — and 3 extended PBL engineering projects"
        background="gray"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="VinciBot in Action"
        subtitle="From home learning to coding clubs and classrooms — VinciBot engages learners wherever they are."
        images={[
          {
            src: "/images/products/matatastudio-vincibot-classroom-set/kids-watching-vincibot-draw.jpeg",
            alt: "Kids watching VinciBot draw with a marker",
            label: "Drawing Activity",
          },
          {
            src: "/images/products/matatastudio-vincibot-classroom-set/kids-on-tablet-with-vincibot-and-blocks.jpg",
            alt: "Kids using tablet with VinciBot and building blocks",
            label: "Coding Session",
          },
          {
            src: "/images/products/matatastudio-vincibot-classroom-set/child-using-remote-with-vincibot.jpeg",
            alt: "Child using IR remote to control VinciBot",
            label: "Remote Control",
          },
          {
            src: "/images/products/matatastudio-vincibot-classroom-set/girl-playing-with-vincibot.jpg",
            alt: "Girl playing with VinciBot robot",
            label: "Hands-On",
          },
          {
            src: "/images/products/matatastudio-vincibot-classroom-set/kids-looking-at-tablet-together.jpg",
            alt: "Kids collaborating on tablet together",
            label: "Collaboration",
          },
          {
            src: "/images/products/matatastudio-vincibot-classroom-set/father-homeschooling-kids-with-vicibot.jpg",
            alt: "Father homeschooling kids with VinciBot",
            label: "Home Learning",
          },
          {
            src: "/images/products/matatastudio-vincibot-classroom-set/matatastudio-vincibot-at-conference.jpg",
            alt: "MatataStudio VinciBot display at education conference",
            label: "Conference",
          },
          {
            src: "/images/products/matatastudio-vincibot-classroom-set/men-talking-about-matatastudio-at-booth-at-conference.jpg",
            alt: "Educators discussing MatataStudio at a conference booth",
            label: "Educator Community",
          },
        ]}
        background="white"
      />

      {/* Skill Tags */}
      <SkillTags
        title="Skills Your Learners Will Develop"
        tags={[
          "Coding",
          "Robotics",
          "Problem Solving",
          "Logical Thinking",
        ]}
        background="gray"
      />

      {/* FAQ Section */}
      <ProductFAQ
        title="Educator Questions"
        faqs={[
          {
            question: "Does VinciBot align with the South African CAPS or DBE curriculum?",
            answer:
              "Yes. VinciBot's 75-activity curriculum covers the core computational thinking concepts mandated by the DBE Coding and Robotics Curriculum: sequencing, loops, events, conditionals, functions, and variables. The progression maps directly to Grades 3–7 requirements, and the curriculum holds ISTE certification. A formal CAPS-specific mapping document is not currently published, but the content alignment is strong.",
          },
          {
            question: "How many learners can use the classroom set simultaneously?",
            answer:
              "The classroom set includes 6 VinciBot robots. With groups of 2–4 learners per robot, the set supports 12–24 learners working simultaneously — typically a full class with no rotation required. Groups of 3 work particularly well, with clear roles for each learner.",
          },
          {
            question: "Do I need a STEM background to teach with VinciBot?",
            answer:
              "No STEM expertise is needed. The classroom set comes with a user guide and challenge booklet with structured lessons. MatataStudio also offers a free 6-lesson online professional development course (Course 5) that walks educators through the curriculum, activities, and teaching strategies. Most educators are lesson-ready after completing it.",
          },
          {
            question: "How much preparation time is needed per lesson?",
            answer:
              "Very little. Robots charge overnight via the included 10-port USB station. The activity cards and challenge booklet are self-contained — each activity includes the objective, instructions, and expected outcomes. Most educators report being ready in under 10 minutes. Storage in the included bin keeps all components organised between lessons.",
          },
          {
            question: "How durable are the robots for repeated classroom use?",
            answer:
              "VinciBot is built from ABS plastic and passes 20+ professional quality and safety tests in manufacture. The rechargeable 1500mAh battery lasts 4+ hours per charge. Washable markers are used for drawing activities — no permanent marks. The high-precision motors are designed for extended service life compared to the previous generation.",
          },
          {
            question: "Does VinciBot require internet connectivity?",
            answer:
              "A web browser or the MatataCode app is needed for coding (Windows, Mac, iOS, Android are all supported). However, VinciBot's AI and TinyML features — including gesture recognition, voice recognition, and handwriting recognition — run entirely on-device with no internet required. This makes it reliable in schools with inconsistent connectivity.",
          },
          {
            question: "What happens after learners complete the 75 activities?",
            answer:
              "VinciBot scales with your learners. After the core activities, learners can tackle the 3 extended Project-Based Learning projects (Fruit Sorting Machine, Basketball Shooting Machine, Auto Card Issuing Machine) and access 75+ additional cases on vinci.matatastudio.com. Optional add-on kits (Creator Kit, Inventor Kit, AI Vision Kit, 3-in-1 Smart Sports Kit) extend the curriculum across multiple years.",
          },
        ]}
        background="white"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="gray" />

      {/* What's in the Kit */}
      <WhatsIncluded
        title="What's in the Kit"
        image="/images/products/matatastudio-vincibot-classroom-set/whats-in-the-box.jpg"
        imageAlt="VinciBot Classroom Set contents laid out — 6 robots, activity cards, maps, markers, and storage bin"
        items={[
          "VinciBot coding robot × 6",
          "IR remote control × 6",
          "Double-sided activity map (blank + line-following) × 6",
          "Washable markers (for robot drawing) × 6",
          "USB-C charging cables × 6",
          "10-port USB charging station × 1",
          "75 activity cards (full curriculum set) × 1",
          "Challenge booklet × 1",
          "User guide × 1",
          "Plastic storage bin × 1",
        ]}
        background="white"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Age Range", value: "8–12 years (Grades 3–7)" },
          { label: "Robots per Set", value: "6 VinciBots" },
          { label: "Learner Capacity", value: "12–24 learners (2–4 per robot)" },
          { label: "Battery", value: "1500mAh rechargeable, 4+ hours per charge" },
          { label: "Charging", value: "USB-C; 10-port station included" },
          { label: "Sensors", value: "8+ (ToF LiDAR, 5-channel line/colour, 2× light, sound, IR)" },
          { label: "LED Display", value: "16×8 programmable matrix (128 LEDs) + 6 RGB LEDs" },
          { label: "Audio", value: "Speaker with 21 instrument sounds (WAV and MP3)" },
          { label: "Coding Platforms", value: "Scratch (block-based) and Python (text-based)" },
          { label: "App Compatibility", value: "Windows, Mac, iOS, Android; web browser supported" },
          { label: "Connectivity", value: "Bluetooth; LEGO and Technic motor compatible" },
          { label: "AI Capability", value: "On-device TinyML (gesture, voice, handwriting recognition)" },
          { label: "Curriculum Standards", value: "ISTE certified; aligns with CSTA, NGSS, DBE Coding & Robotics" },
          { label: "Storage Bin Dimensions", value: "41 × 30 × 14 cm" },
          { label: "Material", value: "ABS plastic; safety certified" },
          { label: "Activities Included", value: "75 core + 18+ challenge activities" },
        ]}
        background="gray"
      />

      {/* Final CTA */}
      <CallToAction
        title="Equip Your Classroom"
        subtitle="Trusted by schools and coding clubs across South Africa. VinciBot grows with your learners from Grade 3 to Grade 8."
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
      "Complete coding and robotics classroom set for Grades 3–7. 6 robots, 75 DBE-aligned activities, Scratch and Python. Supports 24 learners simultaneously.",
    alternates: {
      canonical: "/product/matatastudio-vincibot-classroom-set",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
