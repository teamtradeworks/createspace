import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  VideoEmbed,
  FeatureGrid,
  ImageTextBlock,
  ProjectShowcase,
  CustomerShowcase,
  ProductFAQ,
  ProductReviews,
  WhatsIncluded,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "elecfreaks-micro-bit-6-in-1-ring-bit-kit";
const BASE_IMG = "/images/products/elecfreaks-micro-bit-6-in-1-ring-bit-kit";

export default async function RingBitBricksPackPage() {
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
        tagline="Build it. Code it. Watch it come to life — 6 ways."
        highlights={[
          "6 hands-on projects with step-by-step assembly and coding guides",
          "200+ LEGO-compatible bricks plus servo motors and LED strip",
          "No soldering — safe and beginner-friendly from age 7",
          "Supports MakeCode block coding and Python for growing learners",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Video Section */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=BeOVFo731LA"
        title="See the Ring:bit Bricks Pack in Action"
        background="white"
      />

      {/* Bricks ImageTextBlock */}
      <ImageTextBlock
        image={`${BASE_IMG}/brick-pieces-scattered-around.jpg`}
        imageAlt="LEGO-compatible building bricks from the Ring:bit Bricks Pack scattered on a surface"
        title="200+ Bricks. Endless Builds."
        body="The 200+ LEGO-compatible bricks aren't just for the 6 guided projects — they're yours to keep building with. Once your child finishes the trebuchet, they can tear it down and build something completely their own. The same bricks, servos, and LED strip become raw materials for whatever they imagine next."
        layout="image-left"
        background="gray"
      />

      {/* Features Grid */}
      <FeatureGrid
        title="What Makes This Kit Different"
        subtitle="Six genuinely different projects. One kit. Everything your child needs to build and code physical machines."
        features={[
          {
            icon: "puzzle",
            title: "200+ Building Bricks",
            description:
              "LEGO-compatible bricks in multiple shapes and sizes — enough for all 6 projects and plenty left for free invention.",
          },
          {
            icon: "robot",
            title: "Two 360° Servo Motors",
            description:
              "Continuous rotation servos power everything from a motorised car to windscreen wipers and a trebuchet launching arm.",
          },
          {
            icon: "lightbulb",
            title: "RGB LED Strip",
            description:
              "A 10-LED NeoPixel strip with individually programmable colours. Used in the Traffic Lights and Smart Desk Lamp projects.",
          },
          {
            icon: "code",
            title: "MakeCode & Python",
            description:
              "Begin with drag-and-drop MakeCode blocks — the same platform used in schools worldwide. Advanced learners can rewrite every project in Python.",
          },
          {
            icon: "shield",
            title: "No Soldering Required",
            description:
              "All connections use colour-coded GVS plug-and-play ports. Safe and clean for children, with no special tools needed.",
          },
          {
            icon: "cloud",
            title: "Free Online Tutorials",
            description:
              "Every project has a full assembly guide and coding program on the ELECFREAKS wiki — always accessible, always free.",
          },
        ]}
        columns={3}
        background="white"
      />

      {/* Ring:bit Board ImageTextBlock */}
      <ImageTextBlock
        image={`${BASE_IMG}/ring-bit-expansion-board.jpg`}
        imageAlt="ELECFREAKS Ring:bit V2 expansion board that plugs onto the BBC micro:bit"
        title="The Bridge Between Code and Hardware"
        body="The Ring:bit V2 expansion board plugs directly onto the BBC micro:bit and converts its GPIO pins into simple 3-pin connectors. Your child doesn't need to know anything about wiring — they just plug in the servo or LED strip and start coding. It's the same principle that makes micro:bit the world's most popular learning board for physical computing."
        layout="image-right"
        background="gray"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="6 Projects to Build & Code"
        highlight="6 guided projects — each a different real-world machine"
        subtitle="Projects progress from beginner to intermediate, introducing new concepts with each build. A bonus Joystick remote-control activity takes things even further."
        projects={[
          {
            name: "Traffic Lights",
            description:
              "Programme a working traffic light that cycles red → yellow → green on a loop, each light staying on for the correct duration.",
            concepts: "Loops, functions, LED control, timing",
            image: `${BASE_IMG}/projects/traffic-lights.png`,
          },
          {
            name: "Bricks Car",
            description:
              "Build a two-wheeled motorised car you control with button presses and micro:bit gestures — tilt to reverse, shake to stop.",
            concepts: "Motor control, gesture input, conditionals",
            image: `${BASE_IMG}/projects/bricks-car.png`,
          },
          {
            name: "Temperature Fan",
            description:
              "Build an automated fan that switches on above 28°C and off below 26°C — your child's first smart home device.",
            concepts: "Temperature sensor, if/else logic, automation",
            image: `${BASE_IMG}/projects/temperature-controlled-fans.png`,
          },
          {
            name: "Smart Desk Lamp",
            description:
              "Create a lamp that reads ambient light and turns itself on when it gets dark — and off when it brightens up.",
            concepts: "Light sensor, NeoPixel LEDs, environment-responsive code",
            image: `${BASE_IMG}/projects/smart-desk-lamp.png`,
          },
          {
            name: "Wipers",
            description:
              "Build a windscreen-wiper mechanism using a parallelogram linkage — the same mechanism used in real cars.",
            concepts: "Mechanical linkages, servo control, event-driven code",
            image: `${BASE_IMG}/projects/wipers.png`,
          },
          {
            name: "Trebuchet",
            description:
              "Build a medieval siege weapon that launches on a button press, with two servos executing a timed sequence before resetting automatically.",
            concepts: "Sequential servo control, physics, timing/delays",
            image: `${BASE_IMG}/projects/trebuchet.png`,
          },
        ]}
        moreText="Plus a bonus Joystick:bit extension activity — use a wireless joystick to remotely drive the Bricks Car"
        background="white"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="From the ELECFREAKS community — real builds and real code."
        images={[
          {
            src: `${BASE_IMG}/hands-playing-with-trebuchet.jpg`,
            alt: "Hands playing with the Ring:bit Bricks Pack trebuchet project",
          },
          {
            src: `${BASE_IMG}/kit-box-open.jpg`,
            alt: "Ring:bit Bricks Pack box open showing all included components",
          },
          {
            src: `${BASE_IMG}/connecting-bot-to-laptop.jpg`,
            alt: "Connecting a Ring:bit project to a laptop to upload a MakeCode program",
          },
          {
            src: `${BASE_IMG}/elecfreaks-wiki-online-tutorial.jpeg`,
            alt: "ELECFREAKS online wiki tutorial showing step-by-step project instructions",
          },
          {
            src: `${BASE_IMG}/coding-example.jpg`,
            alt: "MakeCode block programming example for a Ring:bit project",
          },
          {
            src: `${BASE_IMG}/elecfreaks-seminar.jpg`,
            alt: "ELECFREAKS STEM education seminar with micro:bit and Ring:bit kits",
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
            question: "Do I need any prior experience with coding or electronics?",
            answer:
              "Not at all. The kit is designed for complete beginners. Each project starts from scratch with full assembly instructions, and the MakeCode programming guide is written for first-timers. Most children aged 7+ can get started independently.",
          },
          {
            question: "Does this include the BBC micro:bit?",
            answer:
              "No — the BBC micro:bit board is not included. You'll need one to use this kit. We sell the BBC micro:bit Go separately, and you can add it on at checkout. The Ring:bit V2 expansion board (included) plugs directly onto the micro:bit.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "ELECFREAKS recommends this kit from age 7. Children aged 7–10 will enjoy building and running the guided projects. Older children (10–14) get more from experimenting with the code and tackling the more challenging projects like the Trebuchet.",
          },
          {
            question: "Do I need to buy batteries?",
            answer:
              "Yes — 3 x AAA batteries are required to power the kit but are not included. You can add a pack of Varta Long Life AAA batteries at checkout so you're ready to go from the start.",
          },
          {
            question: "Is a computer required?",
            answer:
              "Yes, you'll need a computer or tablet to write the code using Microsoft MakeCode (makecode.microbit.org), which is free and runs in any web browser. Once programmed, the micro:bit runs the code on its own without being connected to a computer.",
          },
          {
            question: "What can my child do once they've finished all 6 projects?",
            answer:
              "Plenty! The 200+ bricks, 2 servos, and LED strip stay yours for free invention. Children can design their own creations, combine concepts from multiple projects, rewrite the programs in Python, or add a Joystick:bit for wireless remote-control projects. The Ring:bit V2 is also compatible with additional ELECFREAKS sensors.",
          },
          {
            question: "Are these LEGO bricks?",
            answer:
              "They're LEGO-compatible — the same standard stud system — but not official LEGO bricks. They work perfectly alongside any LEGO bricks your child already has at home.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image={`${BASE_IMG}/whats-in-the-box.jpg`}
        imageAlt="ELECFREAKS Ring:bit Bricks Pack contents laid out showing all included components"
        items={[
          "Ring:bit V2 Expansion Board (plugs directly onto BBC micro:bit)",
          "2 × 360° Continuous Rotation Servo Motors",
          "1 × Rainbow LED Strip (10 individually programmable NeoPixel LEDs)",
          "2 × Wheels",
          "6 × Rubber Bands",
          "1 × Screwdriver",
          "1 × Micro USB Cable",
          "200+ LEGO-compatible Building Brick pieces",
          "Note: BBC micro:bit board sold separately. 3 × AAA batteries required but not included.",
        ]}
        background="white"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "SKU", value: "EF08217" },
          { label: "Compatible Boards", value: "BBC micro:bit V1 and V2" },
          { label: "Programming", value: "Microsoft MakeCode (block) and Python" },
          { label: "Servo Motors", value: "2 × 360° continuous rotation" },
          { label: "LED Strip", value: "NeoPixel (10 addressable RGB LEDs)" },
          { label: "Building Bricks", value: "200+ LEGO-compatible pieces" },
          { label: "Batteries", value: "3 × AAA (not included)" },
          { label: "Soldering", value: "Not required" },
          { label: "Kit Weight", value: "500g" },
          { label: "Package Dimensions", value: "278 × 168 × 56 mm" },
          { label: "Connectivity", value: "Bluetooth, IR, Joystick:bit (optional accessories)" },
          { label: "Age Recommendation", value: "7+" },
        ]}
        background="gray"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Building"
        subtitle="Six projects. Two servos. 200+ bricks. One kit that teaches your child to build and code real things."
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
      "Build 6 real STEM projects — a car, traffic lights, smart lamp and more — with 200+ LEGO-compatible bricks, servos and LED strip. Ages 7+, no soldering.",
    alternates: {
      canonical: "/product/elecfreaks-micro-bit-6-in-1-ring-bit-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
