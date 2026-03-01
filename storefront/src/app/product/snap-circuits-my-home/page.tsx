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
  VideoEmbed,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "snap-circuits-my-home";

export default async function SnapCircuitsMyHomePage() {
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
        tagline="Turn your home's circuits from mystery to mastery"
        highlights={[
          "30+ home-themed circuit projects — no experience needed",
          "Build real doorbells, alarms, fans, and more",
          "No tools, no soldering — everything snaps together",
          "2022 Toy of the Year Finalist",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Choose This */}
      <NumberedSteps
        title="Why Snap Circuits My Home?"
        subtitle="Most children live surrounded by electrical systems they don't understand. This kit changes that."
        steps={[
          {
            title: "Make It Personal",
            description:
              "Every project is based on your child's actual home — the doorbell, the fan, the alarm. When electricity makes personal sense, it sticks.",
          },
          {
            title: "Safe by Design",
            description:
              "Elenco's patented Circuit Safe® technology means no live electricity — ever. All power comes from AA batteries, and incorrect connections cannot cause harm.",
          },
          {
            title: "Depth, Not Just Fun",
            description:
              "Projects start simply and build in complexity. By the final builds, children are combining circuits to create multi-system homes — the same way real homes are actually wired.",
          },
        ]}
        background="navy-card"
      />

      {/* Your Home in Their Hands */}
      <ImageTextBlock
        image="/images/products/snap-circuits-my-home/boy-playing-with-my-home.jpg"
        imageAlt="Boy playing with Snap Circuits My Home kit"
        title="Your Home, Your Power — Know How It Works"
        body="Through 30+ guided projects, your child builds each household system from scratch — learning exactly how electricity gets from a battery to the light bulb, the fan motor, or the doorbell chime. The result isn't just electronics knowledge. It's genuine mastery of the built environment they call home. Most children finish a project and immediately go find the equivalent in their house to show you what they've learned."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="What Makes This Kit Special"
        subtitle="Snap Circuits My Home combines physical construction with electronics for a uniquely hands-on learning experience."
        features={[
          {
            icon: "puzzle",
            title: "7 Coloured Base Grids",
            description:
              "Build a house or city tower and wire it up. The 3-D structure turns a flat circuit board into a real building your child designed.",
          },
          {
            icon: "book",
            title: "30+ Home-Themed Projects",
            description:
              "From light switches to generators, every project mirrors a real household circuit. Start simple, build confidence, tackle complexity.",
          },
          {
            icon: "shield",
            title: "Circuit Safe® Technology",
            description:
              "Elenco's patented safety system is built in. No live electricity — just battery-powered, worry-free exploration for ages 8+.",
          },
          {
            icon: "tools",
            title: "Snap-Together Design",
            description:
              "No tools, no soldering, no frustration. Colour-coded and numbered parts snap together easily so your child can focus on learning.",
          },
          {
            icon: "lightbulb",
            title: "Full-Colour Project Manual",
            description:
              "The illustrated guide explains not just how to build each circuit — but why electricity behaves that way in real homes.",
          },
          {
            icon: "star",
            title: "Reusable Components",
            description:
              "Nothing is consumed. Your child rebuilds projects, invents new circuits, and keeps exploring — long after the last guided project.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Skills That Transfer */}
      <ImageTextBlock
        image="/images/products/snap-circuits-my-home/girl-playing-with-home.jpg"
        imageAlt="Girl focused on building with Snap Circuits My Home"
        title="Skills That Transfer Far Beyond the Toy Box"
        body="Every time a circuit doesn't work, your child faces a choice: give up or figure it out. Most choose to figure it out. That debugging mindset — asking what could be wrong and systematically trying different answers — is one of the most valuable habits a child can develop. It's the foundation of engineering, smart home technology, and renewable energy careers. Parents regularly report children becoming noticeably more patient and persistent in other areas of life after spending time with Snap Circuits."
        layout="image-right"
        background="white"
      />

      {/* Video */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=6LwVQaEjQUM"
        title="See Snap Circuits My Home in Action"
        background="gray"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="30+ Real-World Circuit Projects"
        highlight="30+ home-themed projects in a full-colour illustrated project manual"
        subtitle="Projects are ordered from simplest to most complex — building confidence with every build."
        projects={[
          {
            name: "Light Switch",
            description:
              "Build a basic on/off circuit that controls a light — the same principle behind every switch in your house.",
            concepts: "Switches, current flow, basic circuits",
            image: "/images/products/snap-circuits-my-home/project-building-house.jpg",
          },
          {
            name: "Doorbell",
            description:
              "Wire a working doorbell with a button and buzzer — press it and hear it ring.",
            concepts: "Momentary switches, series circuits, sound",
            image: "/images/products/snap-circuits-my-home/project-doorbell-v2.jpg",
          },
          {
            name: "Dimmer Switch",
            description:
              "Control light brightness using a variable resistor — just like the dimmers in your lounge.",
            concepts: "Potentiometers, resistance, light control",
            image: "/images/products/snap-circuits-my-home/project-dimmer-switch.jpg",
          },
          {
            name: "Security Alarm",
            description:
              "Build an alarm that triggers when a circuit is broken — the same logic real burglar alarms use.",
            concepts: "Alarm circuits, security logic, series circuits",
            image: "/images/products/snap-circuits-my-home/project-assembling-roof.jpg",
          },
          {
            name: "Motion Detector Light",
            description:
              "Build a light that activates automatically when motion is detected — like outdoor security lights.",
            concepts: "Motion sensors, automation, relay circuits",
            image: "/images/products/snap-circuits-my-home/project-fan-collage.jpg",
          },
          {
            name: "Ceiling Fan (Multi-Speed)",
            description:
              "Build a fan with multiple speed settings using different circuit configurations.",
            concepts: "Parallel circuits, motor control, current variation",
            image: "/images/products/snap-circuits-my-home/project-fan-parts.jpg",
          },
        ]}
        moreText="Plus doorbells with custom melodies, automatic night lights, generators, smoke alarms, power distribution systems, combined multi-circuit builds, and more"
        background="gray"
      />

      {/* Customer Showcase — all end-user photos */}
      <CustomerShowcase
        title="What Families Are Building"
        subtitle="Real Snap Circuits My Home builds from our community"
        images={[
          {
            src: "/images/products/snap-circuits-my-home/close-up-of-inside-home.jpg",
            alt: "Close up of completed Snap Circuits My Home interior wiring",
            label: "Wired Up",
          },
          {
            src: "/images/products/snap-circuits-my-home/close-up-of-side-of-home.jpeg",
            alt: "Side view of a Snap Circuits My Home build",
            label: "Side View",
          },
          {
            src: "/images/products/snap-circuits-my-home/hands-snapping-pieces-together.jpeg",
            alt: "Hands snapping circuit pieces together on the board",
            label: "Building",
          },
          {
            src: "/images/products/snap-circuits-my-home/my-home-box-on-floor.jpg",
            alt: "Snap Circuits My Home box laid out on floor ready to build",
            label: "Ready to Build",
          },
          {
            src: "/images/products/snap-circuits-my-home/my-home-box-open.jpg",
            alt: "Snap Circuits My Home box open showing contents",
            label: "Unboxed",
          },
          {
            src: "/images/products/snap-circuits-my-home/my-home-built-with-box.jpg",
            alt: "Completed Snap Circuits My Home build alongside the box",
            label: "Completed Build",
          },
          {
            src: "/images/products/snap-circuits-my-home/my-home-built.jpg",
            alt: "Fully built Snap Circuits My Home structure",
            label: "Finished",
          },
          {
            src: "/images/products/snap-circuits-my-home/two-stacked-my-home-boxes.jpg",
            alt: "Two stacked Snap Circuits My Home boxes",
            label: "Stacked Up",
          },
        ]}
        background="white"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="gray" />

      {/* FAQ */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "Does my child need any prior experience with electronics?",
            answer:
              "Not at all. The kit is designed for complete beginners aged 8 and up. The project manual starts from the simplest possible circuit and builds step by step — no technical background required from your child or from you.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "The kit is recommended for ages 8 and up. Children aged 8–10 may appreciate having a parent nearby for the first couple of projects, while children 10+ can typically work independently from the start. Older children and teenagers will still find meaningful challenge in the more complex builds.",
          },
          {
            question: "Are batteries included?",
            answer:
              "No. The kit requires 3 × AA batteries which are not included. These are standard batteries available at any supermarket.",
          },
          {
            question: "Is it safe for children to use on their own?",
            answer:
              "Yes. The kit uses Elenco's patented Circuit Safe® technology — all power comes from AA batteries and the system is designed so that incorrect connections cannot cause harm. There is no live mains electricity involved at any point.",
          },
          {
            question: "Is soldering required? Do I need any tools?",
            answer:
              "No soldering and no tools of any kind. All parts snap together using a colour-coded, numbered system. Your child can start building straight from the box.",
          },
          {
            question: "What happens once they've completed all 30+ projects?",
            answer:
              "The components are fully reusable — your child can rebuild any project, combine circuits in new ways, or invent their own builds. The Snap Circuits ecosystem is also expandable: the parts are compatible with many other Snap Circuits kits (SC-100, SC-300, SC-750) for hundreds more projects.",
          },
          {
            question: "Does this need a computer, phone, or app?",
            answer:
              "Fully standalone — no computer, phone, app, or internet connection required. Everything works straight from the box with just the included manual and AA batteries.",
          },
        ]}
        background="white"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/snap-circuits-my-home/whats-in-the-box.jpg"
        imageAlt="Snap Circuits My Home box contents showing all components and coloured base grids"
        items={[
          "60+ colour-coded snap-together electronic parts",
          "7 coloured base grid tiles (for building the house or tower)",
          "Full-colour illustrated project manual (~60 pages)",
          "Battery holder (3 × AA batteries not included)",
          "LED lights",
          "Switches (various types including momentary and slide)",
          "Motion sensor",
          "Fan motor",
          "Speaker / buzzer",
          "Resistors and capacitors",
          "Transistors",
          "Wires and conductors",
          "Circuit Safe® safety device (built into the system)",
        ]}
        background="gray"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Brand", value: "Elenco Electronics" },
          { label: "Model Number", value: "SCMYH7" },
          { label: "Recommended Age", value: "8+" },
          { label: "Number of Projects", value: "30+" },
          { label: "Number of Parts", value: "60+" },
          { label: "Batteries", value: "3 × AA (not included)" },
          { label: "Soldering Required", value: "No" },
          { label: "Tools Required", value: "No" },
          { label: "Safety System", value: "Circuit Safe® patented technology" },
          { label: "Safety Certification", value: "ASTM F963, CE" },
          { label: "Award", value: "2022 Toy of the Year Finalist" },
        ]}
        background="white"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started"
        subtitle="Join thousands of families who've discovered how electricity powers their home — one snap at a time."
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
      "Build real doorbells, alarms, fans, and more with the Snap Circuits My Home kit. 30+ home-themed circuit projects for ages 8+. No tools or soldering needed.",
    alternates: {
      canonical: "/product/snap-circuits-my-home",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
