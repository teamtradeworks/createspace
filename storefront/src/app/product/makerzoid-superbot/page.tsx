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
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  ProductReviews,
  CallToAction,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "makerzoid-superbot";

export default async function MakerzoidSuperbotPage() {
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
        tagline="Your child's first programmable robot — build it, code it, race it"
        highlights={[
          "26+ motorised models with 400+ bricks",
          "Drag-and-drop coding from age 6 — no experience needed",
          "Lego-compatible bricks for endless building",
          "Bluetooth racing battle mode — race a friend's Superbot",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Superbot Section */}
      <NumberedSteps
        title="Why Start with Superbot?"
        subtitle="Designed for curious kids aged 6 and up, the Superbot builds coding and engineering confidence one model at a time — no screen-staring, no passive watching. Just building, programming, and playing."
        steps={[
          {
            title: "Build Something Real",
            description:
              "Follow graphical step-by-step instructions in the free Makerzoid app to assemble one of 26+ motorised models — from muscle cars and trucks to a robot that draws pictures.",
          },
          {
            title: "Make It Come Alive",
            description:
              "Connect via Bluetooth and take control. Drive it with a joystick, program it to follow a path, set it to dodge obstacles, or write a full drag-and-drop coding sequence.",
          },
          {
            title: "Grow as They Go",
            description:
              "Start simple, get more adventurous. The Superbot grows with your child — and when they're ready for the next challenge, the Makerzoid Superbot Master Premium is waiting.",
          },
        ]}
        background="navy-card"
      />

      {/* Video */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=uL_Tg9VPyS0"
        title="See the Makerzoid Superbot in Action"
        background="gray"
      />

      {/* 26 Models section */}
      <ImageTextBlock
        image="/images/products/makerzoid-superbot/rows-of-superbot-robot-builds.jpg"
        imageAlt="Multiple Makerzoid Superbot model builds lined up showing the variety of vehicles and robots"
        title="26 Models, One Kit"
        body="Every single model comes apart and rebuilds into something new. Today it's a racing muscle car — tomorrow it's a drawing machine that scribbles patterns as it drives. With 26+ distinct model configurations in one box, your child won't run out of builds anytime soon. And with Lego-compatible bricks, they can mix in pieces from their existing collection to invent models that aren't even in the app."
        layout="image-left"
        background="white"
      />

      {/* Key Features Grid */}
      <FeatureGrid
        title="Key Features"
        subtitle="Everything your child needs to start building, programming, and playing — right out of the box."
        features={[
          {
            icon: "lightbulb",
            title: "400+ Bricks, 26+ Models",
            description:
              "Enough pieces to build over 26 distinct motorised creations — from racing cars to trucks to a robot that actually draws patterns.",
          },
          {
            icon: "code",
            title: "Drag-and-Drop Coding",
            description:
              "No typing, no syntax. Kids snap code blocks together in the Makerzoid app to create motion sequences — the same intuitive approach used by millions of young learners.",
          },
          {
            icon: "puzzle",
            title: "Four Control Modes",
            description:
              "Remote control, path programming, sensor-reactive mode, and full drag-and-drop coding. Each mode teaches something new — from basic directions to real algorithmic thinking.",
          },
          {
            icon: "book",
            title: "App-Guided Building",
            description:
              "The free Makerzoid app (iOS & Android) includes illustrated build instructions for every model — no paper manual to lose, always up to date.",
          },
          {
            icon: "globe",
            title: "Race Your Friends",
            description:
              "Two Superbots can go head-to-head in battle racing mode — making this the perfect toy for playdates and holidays. Build yours, race theirs.",
          },
          {
            icon: "shield",
            title: "Lego-Compatible Bricks",
            description:
              "The Superbot's bricks work with existing Lego collections, extending what your child can create far beyond the 26 included model configurations.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* App control section */}
      <ImageTextBlock
        image="/images/products/makerzoid-superbot/car-tablet-phone.jpg"
        imageAlt="Makerzoid Superbot racing car model alongside a tablet and phone showing the app control interface"
        title="Four Ways to Take Control"
        body="Once your child's model is built, the Makerzoid app unlocks four distinct ways to play. Start with the joystick for instant drive-it-right-now fun. Then try path mode — draw a route on screen and watch the robot follow it. Progress to IR sensor mode where the robot reacts to the world around it. Finally, the full drag-and-drop coding mode lets your child write their own motion sequences. It's a natural coding progression that never feels like homework."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="What They'll Build"
        highlight="26+ guided model builds — with new coding possibilities every time"
        subtitle="Models range from simple vehicles for first-time builders to complex creations that challenge older kids. Each one can be coded in completely different ways."
        projects={[
          {
            name: "Batmobile",
            description:
              "Build a sleek, low-slung racing car and drive it using the app's joystick — your child's first taste of building something that actually moves.",
            concepts: "Motor control, directions, basic app control",
            image:
              "/images/products/makerzoid-superbot/projects/batmobile.jpg",
          },
          {
            name: "Tiger",
            description:
              "Construct an animal-shaped robot with a fun mechanical form — a favourite for kids who want something a little different from the vehicle builds.",
            concepts: "Construction, structural design, creative building",
            image: "/images/products/makerzoid-superbot/projects/tiger.jpg",
          },
          {
            name: "Drawing Machine",
            description:
              "Build a robot that holds a pen and draws geometric patterns as it moves — where coding meets art in a genuinely surprising way.",
            concepts: "Motion programming, sequencing, STEAM crossover",
            image:
              "/images/products/makerzoid-superbot/projects/drawing-machine.jpg",
          },
          {
            name: "Forklift",
            description:
              "Build a working forklift with a lifting mechanism — introduces more complex construction and real-world engineering concepts.",
            concepts: "Mechanical engineering, gear systems, load-bearing",
            image:
              "/images/products/makerzoid-superbot/projects/forklift.jpg",
          },
          {
            name: "Intelligent Gate",
            description:
              "Build an automated barrier that opens and closes — a great introduction to sensor-triggered behaviour and conditional logic.",
            concepts: "Conditionals, sensor-based logic, automation",
            image:
              "/images/products/makerzoid-superbot/projects/intelligent-gate.jpg",
          },
          {
            name: "Racing Car",
            description:
              "A streamlined speed build for head-to-head racing against a friend's Superbot — the competitive element that makes playdates unforgettable.",
            concepts: "Construction, Bluetooth control, multiplayer play",
            image: "/images/products/makerzoid-superbot/projects/2.jpg",
          },
        ]}
        moreText="Plus 20+ more model builds in the app — trucks, elastic robots, sumo bots, and more."
        background="gray"
      />

      {/* Customer Photos */}
      <CustomerShowcase
        title="See It in Action"
        subtitle="Real builds from families who've set theirs loose around the house."
        images={[
          {
            src: "/images/products/makerzoid-superbot/boy-smiling-at-camera-with-tablet-and-robot-build-in-front-of-him.jpg",
            alt: "Boy smiling at camera with his Makerzoid Superbot build and tablet in front of him",
          },
          {
            src: "/images/products/makerzoid-superbot/hands-holding-phone-with-app-and-robot-in-front.jpg",
            alt: "Hands holding a phone with the Makerzoid app open, robot build in the foreground",
          },
          {
            src: "/images/products/makerzoid-superbot/robot-following-line.jpg",
            alt: "Makerzoid Superbot robot following a line on the floor",
          },
          {
            src: "/images/products/makerzoid-superbot/boy-with-superbot-kit-infront-of-him.jpg",
            alt: "Young boy with the Makerzoid Superbot kit laid out in front of him",
          },
          {
            src: "/images/products/makerzoid-superbot/superbot-box-standing-on-table.jpg",
            alt: "Makerzoid Superbot box standing upright on a table",
          },
          {
            src: "/images/products/makerzoid-superbot/all-parts-packaged-in-box.jpeg",
            alt: "All Makerzoid Superbot parts neatly packaged inside the storage box",
          },
          {
            src: "/images/products/makerzoid-superbot/built-forklift-robot.jpg",
            alt: "Makerzoid Superbot built as a forklift robot",
          },
          {
            src: "/images/products/makerzoid-superbot/car-built-with-pieces-around-it.jpg",
            alt: "Makerzoid Superbot car model built with spare pieces laid out around it",
          },
        ]}
        background="white"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="gray" />

      {/* FAQ Section */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "Does my child need any coding experience?",
            answer:
              "Not at all. The Superbot is designed for complete beginners. Start in remote control mode — no coding required — and graduate to drag-and-drop programming at whatever pace feels right. The app guides everything.",
          },
          {
            question: "What age is the Superbot suitable for?",
            answer:
              "We recommend it for ages 6 and up. Younger children (6–8) may want a bit of help with building at first, but most quickly become independent. Older kids (up to 14) will enjoy the challenge of the coding modes.",
          },
          {
            question: "Do we need to buy anything else?",
            answer:
              "Just 3 × AA batteries — they're not included but are easy to find. The Makerzoid app is free to download on iOS and Android. Everything else comes in the box.",
          },
          {
            question: "Does my child need a phone or tablet?",
            answer:
              "Yes — the free Makerzoid app is needed for both building instructions and to control the robot. It works on any Bluetooth-enabled iOS or Android smartphone or tablet.",
          },
          {
            question: "Can my child use it independently?",
            answer:
              "Mostly, yes. The app's graphical building instructions are clear enough for most kids aged 7+ to follow on their own. A bit of parental involvement for the first build is helpful — after that, they'll fly.",
          },
          {
            question: "What happens after they've built all 26 models?",
            answer:
              "The fun doesn't stop — each model can be coded in completely different ways, so there's no single 'finished' outcome. The Superbot's Lego-compatible bricks also let your child invent entirely new creations. When they're ready for more, the Makerzoid Superbot Master Premium adds Scratch 3.0 programming and smart sensors.",
          },
          {
            question: "Does it work with our Lego bricks?",
            answer:
              "Yes! The Superbot uses Lego-compatible bricks, so your child can combine it with any existing Lego collection to build something completely unique.",
          },
        ]}
        background="white"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/makerzoid-superbot/whats-in-the-box.jpeg"
        imageAlt="Makerzoid Superbot contents laid out showing all components"
        items={[
          "400+ plastic building bricks",
          "Motor control hub with 4 LED indicator lights",
          "2 IR/distance sensors",
          "Storage box (all pieces fit back inside neatly)",
          "Free Makerzoid app — iOS & Android (download from App Store or Google Play)",
        ]}
        background="gray"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Piece Count", value: "400+" },
          { label: "Buildable Models", value: "26+" },
          { label: "Motors", value: "2 integrated motors" },
          { label: "Sensors", value: "2 IR/distance sensors" },
          { label: "Connectivity", value: "Bluetooth 2.4GHz" },
          { label: "App", value: "Makerzoid (free, iOS & Android)" },
          { label: "Power", value: "3 × AA batteries (not included)" },
          { label: "Brick Compatibility", value: "Lego-compatible" },
          { label: "Dimensions", value: "22 × 32 × 6 cm" },
          { label: "Weight", value: "0.9 kg" },
          { label: "Recommended Age", value: "6–14 years" },
        ]}
        background="white"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started with Superbot"
        subtitle="26+ models. 4 coding modes. Endless builds. The Superbot is the kit that grows with your child — from their first build to their first real programme."
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
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | CREATESPACE`,
    description:
      "Build, code, and race with the Makerzoid Superbot. 26+ motorised models, 400+ Lego-compatible bricks, drag-and-drop coding. Perfect for beginners aged 6+.",
    alternates: {
      canonical: "/product/makerzoid-superbot",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
