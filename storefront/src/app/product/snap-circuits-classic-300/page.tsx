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
  ProductFAQ,
  ProductReviews,
  WhatsIncluded,
  Specifications,
  CallToAction,
} from "@/components/product-sections";
import { CustomerShowcase } from "@/components/product-sections/CustomerShowcase";

const PRODUCT_HANDLE = "snap-circuits-classic-300";

export default async function SnapCircuitsClassic300Page() {
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
        tagline="305 guided electronics projects — no tools, no soldering, no experience needed"
        highlights={[
          "305 guided projects from a simple light switch to a working AM radio",
          "No tools and no soldering — just snap the pieces together",
          "Two full-colour project manuals included",
          "Expandable — compatible with all Snap Circuits sets",
        ]}
        addons={addons}
      />

      {/* At a Glance */}
      <QuickInfoBadges product={product} />

      {/* Why Snap Circuits */}
      <NumberedSteps
        title="Why Snap Circuits?"
        subtitle="Most electronics kits are either too simple to be interesting or too complex to start. Snap Circuits hits the sweet spot."
        steps={[
          {
            title: "Snap to Life",
            description:
              "The unique snap-together system means your child is building real circuits within minutes of opening the box. No tools, no glue, no frustration — just click the numbered modules into place on the grid.",
          },
          {
            title: "Real Electronics",
            description:
              "This isn't pretend play. Build a working AM radio, a lie detector, a burglar alarm. Every component is a real electronic part — the same ones inside the devices we use every day.",
          },
          {
            title: "Grows With Them",
            description:
              "From project 1 (a simple light switch) to project 305 (complex multi-component circuits), there are hundreds of hours of challenges. When they're ready, upgrade to Snap Circuits SC-500 for even more.",
          },
        ]}
        background="navy-card"
      />

      {/* Lifestyle: Child with kit */}
      <ImageTextBlock
        image="/images/products/snap-circuits-classic-300/girl-smiling-with-kit.jpg"
        imageAlt="Girl smiling with completed Snap Circuits kit"
        title="Built to Be Rebuilt, Again and Again"
        body="Snap Circuits was designed for hands-on exploration, not one-time use. The 60+ colour-coded modules snap on and off hundreds of times without wearing out — so your child can build a project, take it apart, and start something new in minutes. No sticky fingers, no lost screws, no broken pieces. Each component is numbered to match the circuit diagrams in the manual, so even a first-time builder can follow along independently."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="What Makes Snap Circuits Different"
        subtitle="Designed to make real electronics accessible to anyone aged 8 and up."
        features={[
          {
            icon: "puzzle",
            title: "305 Guided Projects",
            description:
              "Two full-colour project manuals take your child from a simple light switch all the way to a working AM radio.",
          },
          {
            icon: "tools",
            title: "No Tools Needed",
            description:
              "Components snap together on a grid board — no soldering, no glue, no special tools of any kind.",
          },
          {
            icon: "shield",
            title: "CircuitSafe® Technology",
            description:
              "Patented overcurrent protection means incorrect wiring won't damage components or frustrate your child.",
          },
          {
            icon: "book",
            title: "Full-Colour Manuals",
            description:
              "Every project includes a circuit diagram, step-by-step instructions, and an explanation of what the circuit does and why.",
          },
          {
            icon: "star",
            title: "Award-Winning Quality",
            description:
              "Toy of the Year, Good Housekeeping's Best Toy, and NAPPA Gold — among more than a dozen industry awards.",
          },
          {
            icon: "globe",
            title: "Expandable Ecosystem",
            description:
              "Compatible with all Snap Circuits sets. Upgrade to SC-500 or SC-750 when your child is ready for even more.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Lifestyle: Close-up of pieces */}
      <ImageTextBlock
        image="/images/products/snap-circuits-classic-300/close-up-of-pieces-together.jpg"
        imageAlt="Close-up of Snap Circuits modules snapped together on the grid board"
        title="How Electronics Actually Work"
        body="Every component in Snap Circuits is a real electronic part — resistors, capacitors, transistors, relays, and integrated circuits that work exactly the way they do in everyday devices. Your child builds each circuit by connecting these parts in the pattern shown in the manual, and when it works — when the alarm beeps, the fan spins, or the radio tunes in to a real station — they're seeing real physics in action. Questions like 'how does a radio work?' stop being abstract and start having tangible answers."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="305 Projects to Build"
        highlight="305 guided electronics projects in two full-colour manuals"
        subtitle="Projects are arranged in order of difficulty — your child builds knowledge step by step, starting from a simple light switch and working up to a fully functioning AM radio."
        projects={[
          {
            name: "Musical Doorbell",
            description: "Build a working electronic doorbell using an oscillator circuit",
            concepts: "Oscillators, sound circuits",
            image: "/images/products/snap-circuits-classic-300/project-musical-doorbell.jpeg",
          },
          {
            name: "Police Siren",
            description: "Create a two-tone alternating siren with realistic sound",
            concepts: "Waveforms, timing circuits",
            image: "/images/products/snap-circuits-classic-300/project-police-siren.png",
          },
          {
            name: "AM Radio",
            description: "Build a working AM radio that picks up real broadcast stations",
            concepts: "Amplification, antenna principles",
            image: "/images/products/snap-circuits-classic-300/project-am-radio.jpeg",
          },
          {
            name: "Lie Detector",
            description: "Detect skin conductance changes — it actually works",
            concepts: "Sensors, signal processing",
            image: "/images/products/snap-circuits-classic-300/project-lie-detector.jpeg",
          },
          {
            name: "Burglar Alarm",
            description: "Wire up a working security alarm with a sensor trigger",
            concepts: "Alarm circuits, switches",
            image: "/images/products/snap-circuits-classic-300/project-burglar-alarm.jpeg",
          },
          {
            name: "Photosensitive Electronic Organ",
            description: "Play music by moving your hand over a light sensor",
            concepts: "Photoresistors, oscillation",
            image: "/images/products/snap-circuits-classic-300/project-photosensitive-organ.png",
          },
        ]}
        moreText="Plus 299 more projects — alarms, motor controllers, light displays, logic gates, and complex multi-component systems"
        background="gray"
      />

      {/* Customer Showcase — all end-user images */}
      <CustomerShowcase
        title="What Families Are Building"
        subtitle="From the first project to the full 305 — real circuits built by real kids"
        images={[
          {
            src: "/images/products/snap-circuits-classic-300/child-building-circuit.jpg",
            alt: "Child's hands actively building a Snap Circuits project on a wooden table",
            label: "Building",
            description: "Hands-on from the very first snap",
          },
          {
            src: "/images/products/snap-circuits-classic-300/open-box-with-pieces-full.png",
            alt: "Snap Circuits Classic 300 open box with all 60+ modules laid out",
            label: "Unboxed",
            description: "All 60+ modules ready to go",
          },
          {
            src: "/images/products/snap-circuits-classic-300/circuits-built-on-the-floor.jpg",
            alt: "Completed Snap Circuits AM radio project built on the floor",
            label: "AM Radio",
            description: "One of the most impressive builds — a real working radio",
          },
          {
            src: "/images/products/snap-circuits-classic-300/hand-holding-piece-above-circuit-board.jpg",
            alt: "Hand placing a Snap Circuits module onto the grid board on a wooden table",
            label: "Snapping In",
            description: "The satisfying click of a module locking into place",
          },
          {
            src: "/images/products/snap-circuits-classic-300/fan-spinning.jpg",
            alt: "Snap Circuits fan circuit with spinning motor",
            label: "Fan Circuit",
            description: "Electrical energy converted to motion",
          },
          {
            src: "/images/products/snap-circuits-classic-300/board-circuit-on-desk.jpg",
            alt: "Large completed Snap Circuits project spread across a white desk",
            label: "Big Build",
            description: "More advanced projects fill the whole board",
          },
          {
            src: "/images/products/snap-circuits-classic-300/box-standing-against-wall.jpg",
            alt: "Snap Circuits Classic 300 box standing against a wall",
            label: "The Kit",
            description: "Everything your child needs in one box",
          },
          {
            src: "/images/products/snap-circuits-classic-300/open-box-with-pieces.jpg",
            alt: "Snap Circuits Classic 300 components spread out on a surface",
            label: "The Components",
            description: "Colour-coded and numbered — every piece has its place",
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
            question: "Do I need any prior electronics knowledge to start?",
            answer:
              "Not at all. The project manual begins with the most basic circuit — a light and a switch — and explains every concept from scratch. The numbered, colour-coded components match the diagrams exactly, so most children can work through the early projects completely independently.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "The kit is designed for ages 8 and up. Most children from about age 8 can work through the foundational projects on their own. Parents with younger children (ages 6–7) may enjoy working through the first few projects together.",
          },
          {
            question: "Are batteries included?",
            answer:
              "No — the kit requires 4 × AA batteries, which are sold separately. Batteries aren't included because they may drain during storage. Once you pop in four AAs, your child is ready to start project 1.",
          },
          {
            question: "Is this safe? Does my child need adult supervision?",
            answer:
              "Yes, Snap Circuits is designed with safety as a priority. The low-voltage battery-powered circuits are safe for children, with no sharp edges and no soldering involved. The built-in CircuitSafe® system prevents any component damage from incorrect wiring. Most children aged 8+ can build independently.",
          },
          {
            question: "What does my child do after finishing all 305 projects?",
            answer:
              "There's plenty of life left in the kit. They can revisit favourite projects, experiment with their own circuit combinations, or upgrade to Snap Circuits SC-500 — which uses the same components and adds another 200+ projects. Individual replacement parts are also available from Elenco directly.",
          },
          {
            question: "Does this require a computer or any app?",
            answer:
              "No. Snap Circuits Classic is entirely hardware-based. No computer, no tablet, no app, no software of any kind. This makes it one of the few meaningful STEM toys that genuinely doesn't involve a screen.",
          },
        ]}
        background="white"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/snap-circuits-classic-300/whats-in-the-box.jpeg"
        imageAlt="Snap Circuits Classic 300 project manuals fanned out alongside the box"
        items={[
          "60+ snap-together electronic modules",
          "Snap wires (1-snap, 2-snap, 3-snap, and 6-snap lengths)",
          "Slide switch",
          "Press switches (momentary)",
          "Resistors",
          "Capacitors (including variable capacitor)",
          "Transistors (NPN)",
          "Integrated circuits (amplifier IC and logic gates)",
          "Motor",
          "LEDs (light-emitting diodes)",
          "Incandescent lamp",
          "Speaker",
          "Microphone",
          "Relay",
          "Photoresistor (light sensor)",
          "2 × battery holder modules",
          "Plastic snap grid board",
          "Project Manual 1: Projects 1–101 (full colour, printed)",
          "Project Manual 2: Projects 102–305 (full colour, printed)",
          "Note: 4 × AA batteries required, not included",
        ]}
        background="gray"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Model", value: "SC-300" },
          { label: "Manufacturer", value: "Elenco Electronics" },
          { label: "Recommended Age", value: "8+ years" },
          { label: "Parts Included", value: "60+ snap-together modules" },
          { label: "Total Projects", value: "305" },
          { label: "Manuals", value: "Two full-colour printed project books (1–101 and 102–305)" },
          { label: "Power Source", value: "4 × AA batteries (not included)" },
          { label: "Soldering Required", value: "No" },
          { label: "Tools Required", value: "None" },
          { label: "Box Dimensions", value: "Approx. 35 × 48 × 7.5 cm" },
          { label: "Compatible With", value: "Snap Circuits SC-500, SC-750, and all other Snap Circuits sets" },
        ]}
        background="white"
      />

      {/* CTA */}
      <CallToAction
        title="Get Snapping"
        subtitle="305 projects. No tools. No soldering. Just real electronics waiting to be built."
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
      "Build 305 guided electronics projects with Snap Circuits Classic. No tools, no soldering, two full-colour manuals included. For ages 8+.",
    alternates: {
      canonical: "/product/snap-circuits-classic-300",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
