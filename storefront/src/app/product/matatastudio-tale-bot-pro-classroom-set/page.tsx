import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  FeatureGrid,
  QuickInfoBadges,
  WhatsIncluded,
  ImageTextBlock,
  ProductFAQ,
  ProjectShowcase,
  CustomerShowcase,
  ProductReviews,
  CallToAction,
  VideoEmbed,
  ProductTrackingProvider,
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
    <ProductTrackingProvider handle={PRODUCT_HANDLE}>
      <ProductJsonLd product={product} />

      {/* Hero Section */}
      <HeroSection
        product={product}
        stockQuantity={1}
        tagline="Bring screen-free coding to your Grade R and Grade 1 classroom"
        highlights={[
          "6 robots: 12 learners code in pairs at once, or rotate small groups through a full class",
          "42 step-by-step Activity Cards in four levels, from first button presses to loops and story challenges",
          "Designed for ages 3–5, so it suits Grade R and Grade 1 best. No reading or screens needed",
          "10-port USB charging station and storage bin keep the set ready for daily use, term after term",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Video Section */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=2N-eTbOcWVI"
        title="See Tale-Bot Pro in Action"
        background="white"
      />

      {/* How It Works in the Classroom */}
      <ImageTextBlock
        image="/images/products/matatastudio-tale-bot-pro-classroom-set/teacher-teaching-kids.jpg"
        imageAlt="Teacher demonstrating Tale-Bot Pro to a group of young learners in a classroom"
        title="Coding Without Screens or Reading"
        body="Learners build a programme by pressing the arrow buttons on top of the robot, then press Play and watch it run. A row of coloured lights shows each command in order, so a group can spot where their route went wrong, and the Clear button removes the last command without starting over. Because everything is done with picture buttons, Grade R and Grade 1 learners can take part whatever their reading level."
        layout="image-left"
        background="gray"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="Six Robots and 42 Activity Cards in One Set"
        subtitle="Robots, Activity Cards, 18 maps and a charging station, packed in one storage bin."
        features={[
          {
            icon: "book",
            title: "42 Activity Cards",
            description:
              "Step-by-step activities in four levels: basic commands, cross-curricular exploration, patterns and loops, and themed challenges",
          },
          {
            icon: "users",
            title: "Pairs or Small Groups",
            description:
              "The activities are written for pairs, so six robots serve 12 learners at once. Groups of 3–4 stretch that to 18–24",
          },
          {
            icon: "microphone",
            title: "Record in Any Language",
            description:
              "Learners record up to 30 seconds of their own voice and add it to a programme, so stories can be told in their home language",
          },
          {
            icon: "map",
            title: "Cross-Curricular Maps",
            description:
              "15 interactive maps across 10 themes, including frog and sunflower life cycles, plus 3 blank grid maps for your own activities",
          },
          {
            icon: "battery",
            title: "Rechargeable Batteries",
            description:
              "Each robot runs for 4+ hours and recharges in about 2.5 hours. The 10-port USB station charges all six at once",
          },
          {
            icon: "shield",
            title: "Classroom Durable",
            description:
              "Sturdy, fall-resistant, lead-free robots made from eco-friendly, food-grade material",
          },
        ]}
        columns={3}
        background="white"
      />

      {/* Storytelling Integration */}
      <ImageTextBlock
        image="/images/products/matatastudio-tale-bot-pro-classroom-set/teacher-with-kids.jpg"
        imageAlt="Teacher working alongside young learners using Tale-Bot Pro in a group setting"
        title="Coding Linked to Maths, Life Skills and Language"
        body="Each Activity Card is tagged with the learning area it supports. Learners count strawberries on the Counting Game map, match foods to shapes on Shape Monster, follow the frog and sunflower life cycles, and tell the story of a trip around My Town. The record button lets them narrate in their own words, and the washable markers turn a programmed route into a drawing."
        layout="image-right"
        background="gray"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Classroom Activities"
        highlight="42 step-by-step Activity Cards plus a Challenge Booklet, written for ages 3–5"
        subtitle="Cards progress from single commands to sequences, loops and themed challenges. Each one lists its learning area, the materials needed and a class-time estimate."
        projects={[
          {
            name: "Basic Movement Commands",
            description: "Sequence forward, backward, left and right commands",
            concepts: "Sequencing, cause and effect, spatial reasoning",
            image:
              "/images/products/matatastudio-tale-bot-pro-classroom-set/boy-pressing-button-on-talebot.jpeg",
          },
          {
            name: "Frog Life Cycle Map",
            description: "Navigate the stages from egg to adult frog",
            concepts: "Life Skills (Beginning Knowledge): life cycles, sequencing",
            image: "/images/products/matatastudio-tale-bot-pro/tale-bot-on-frog-cycle-board.png",
          },
          {
            name: "Plant Growth Map",
            description: "Code the robot through the stages of a sunflower's life",
            concepts: "Life Skills (Beginning Knowledge): plant growth, ordering",
            image:
              "/images/products/matatastudio-tale-bot-pro-classroom-set/two-kids-playing-with-growing-map.jpg",
          },
          {
            name: "Drawing with Markers",
            description: "Programme the robot to draw shapes and patterns on paper",
            concepts: "Space and shape, fine motor skills, creative expression",
            image: "/images/products/matatastudio-tale-bot-pro/tale-bot-drawing-front-view.png",
          },
          {
            name: "Dance Routines with Loops",
            description: "Design dance steps with the arrow buttons, then repeat them with the Repeat button",
            concepts: "Loops, patterns, sequencing",
            image: "/images/products/matatastudio-tale-bot-pro/tale-bot-singing-and-dancing.png",
          },
          {
            name: "Zoo Visit Story Map",
            description: "Follow the robot's spoken zoo story, then code the route and invent a new visit",
            concepts: "Storytelling, listening, sequencing",
            image: "/images/products/matatastudio-tale-bot-pro/tale-bot-talking-on-zoo-visit-map.jpg",
          },
        ]}
        moreText="Plus counting, shape and town maps, blank grid maps for your own activities, and voice recording for learner-made stories"
        background="white"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
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
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* FAQ */}
      <ProductFAQ
        title="Educator Questions"
        faqs={[
          {
            question: "Which grades and curriculum areas does this suit?",
            answer:
              "MatataStudio designs Tale-Bot Pro and its Activity Cards for ages 3–5, so the set suits Grade R and Grade 1 best. Grade 2 and 3 learners can use it as an introduction, but it was designed for younger children. The activities practise sequencing, patterns, and position and direction, which link to Foundation Phase Mathematics, and the life cycle and town maps tie in with Life Skills (Beginning Knowledge). We don't provide a formal CAPS mapping, but every Activity Card has a code (A-1 to D-10) and a learning-area tag, which makes it easy to slot cards into your term plan.",
          },
          {
            question: "How many learners can use the classroom set simultaneously?",
            answer:
              "MatataStudio writes the activities for pairs, so six robots let 12 learners code at the same time. In a bigger class, groups of 3–4 per robot or a station rotation let 18–24 learners take part, with learners taking turns to plan, press the buttons and check the route.",
          },
          {
            question: "Do I need a STEM background to teach with this?",
            answer:
              "No. MatataStudio states that no coding or computer science teaching experience is needed. Each Activity Card gives numbered, illustrated steps, the materials you need, a class-time estimate and a bonus idea for extending the activity or starting a class discussion. To build your confidence first, MatataStudio's free, self-guided Tale-Bot Pro educator course (under Professional Development on matatalab.com) walks you through the robot and the Activity Cards, and you get a certificate when you pass the final quiz.",
          },
          {
            question: "How durable are the robots for repeated daily classroom use?",
            answer:
              "Tale-Bot Pro has a sturdy, fall-resistant body made from eco-friendly, food-grade material, and it's lead-free. The built-in rechargeable batteries mean there are no disposable batteries to buy, and the robots and maps can be reused across terms and classes.",
          },
          {
            question: "What preparation is needed before lessons?",
            answer:
              "Charge the robots (about 2.5 hours gives 4+ hours of use), read the Activity Card, and set out the map and any materials it lists. A few cards use everyday items such as paper cups. MatataStudio suggests lessons of 20–30 minutes, and no software, app or screen is needed.",
          },
          {
            question: "Is bulk or school pricing available?",
            answer:
              "The classroom set is priced as a bundle: six robots plus the charging station, storage bin, 42 Activity Cards and 18 maps. For multiple classroom sets or school-wide orders, please contact us via the Education section of our website.",
          },
          {
            question: "What teaching materials come with the set?",
            answer:
              "The set includes 42 Activity Cards in four levels: basic commands (10 activities), exploration linking coding to health, science, social studies and language (15), patterns and loops (7), and themed challenges that combine everything (10). You also get a Challenge Booklet, a user guide and a quick guide. There is no separate teacher guide, lesson plans or assessment rubrics, so plan to record learner progress with your school's own observation tools.",
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
          "18x Accessories (wings, arms and brick adapters)",
          "12x Washable markers (2 per robot)",
          "6x Command card sets (1 per robot)",
          "6x USB-C charging cables",
          "18x Double-sided maps (15 interactive across 10 themes, plus 3 blank grids)",
          "1x Activity Cards set (42 activities in 4 levels)",
          "1x Challenge booklet",
          "1x User guide",
          "1x Configuration card (for changing the robot's language)",
          "3x Sticker booklets",
          "3x Callout sticker sheets",
          "1x Callout stickers quick guide",
          "2x Paper craft sets",
          "1x 10-port USB charging station",
          "1x Storage bin",
        ]}
        background="white"
      />

      {/* Final CTA */}
      <CallToAction
        title="Equip Your Classroom"
        subtitle="Six robots, 42 Activity Cards and a 10-port charging station for screen-free coding in Grade R and Grade 1."
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
      "Screen-free coding classroom set: 6 robots, 42 step-by-step Activity Cards and a 10-port charging station. Designed for ages 3–5, best for Grade R–1.",
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
