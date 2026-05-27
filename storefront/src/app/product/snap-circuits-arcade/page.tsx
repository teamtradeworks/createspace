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

const PRODUCT_HANDLE = "snap-circuits-arcade";

export default async function SnapCircuitsArcadePage() {
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
        tagline="Build real circuits. Play games you made."
        highlights={[
          "200+ projects — from a single blinking LED to 21 fully playable arcade games",
          "No soldering, no tools — components snap together like building blocks",
          "Circuit Safe® design — Elenco's patented protection for worry-free building",
          "Ages 8–14 — step-by-step instructions for independent builders",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Snap Circuits Arcade */}
      <NumberedSteps
        title="Why Snap Circuits Arcade?"
        subtitle="Electronics kits often feel like homework. The Arcade is different — it gives your child a reason to finish every circuit."
        steps={[
          {
            title: "Build Real Electronics",
            description:
              "Your child isn't pressing buttons on a screen — they're assembling genuine circuits with resistors, capacitors, transistors, and a programmable microcontroller. When the LED lights up, it's because the circuit they built is working.",
          },
          {
            title: "Play Games They Built",
            description:
              "The Arcade's superpower is a pre-programmed microcontroller with 21 mini games — electronic dice, timing challenges, Baseball, Memory, and Blackjack. Build the circuit, then play the game. That 'I made this' moment is irreplaceable.",
          },
          {
            title: "Confidence That Compounds",
            description:
              "When a circuit fails, your child learns to troubleshoot — a genuine engineering skill. When it works, they feel it. That cycle of challenge and success builds resilience and a growth mindset that shows up in everything they tackle.",
          },
        ]}
        background="navy-card"
      />

      {/* The Motivation Loop */}
      <ImageTextBlock
        image="/images/products/snap-circuits-arcade/boy-playing-with-circuit.jpg"
        imageAlt="Boy engaged with the Snap Circuits Arcade, assembling components on the grid"
        title="The Motivation Loop Other Kits Miss"
        body="Most electronics kits ask your child to build something and then put it away. The Arcade is built differently. Every circuit is also a game — dice games, a baseball challenge, memory sequences, even Blackjack. Build the circuit, then play what you made. It's a loop that's genuinely hard to get bored of, and it's the reason the Arcade keeps children coming back to the board long after other kits have been shelved."
        layout="image-left"
        background="gray"
      />

      {/* Key Features */}
      <FeatureGrid
        title="What Makes the Arcade Special"
        subtitle="Over two decades of awards. Millions of kits sold. One very clever twist on learning electronics."
        features={[
          {
            icon: "puzzle",
            title: "21 Built-In Arcade Games",
            description:
              "Baseball, dice games, memory sequences, timing challenges, and Blackjack — all pre-programmed on the included microcontroller module.",
          },
          {
            icon: "book",
            title: "200+ Projects to Build",
            description:
              "61 projects in the full-colour printed manual, plus 142 more in the free online supplemental guide. Months of builds.",
          },
          {
            icon: "star",
            title: "Programmable Word Fan",
            description:
              "A spinning LED fan that displays messages using persistence of vision. Your child programs it with custom phrases — powered by circuits they built.",
          },
          {
            icon: "shield",
            title: "Circuit Safe® Protected",
            description:
              "Elenco's patented safety device prevents dangerous configurations. Built specifically for children — no sharp edges, no soldering, no risk.",
          },
          {
            icon: "lightbulb",
            title: "Self-Teaching Components",
            description:
              "Every module is numbered, colour-coded, and printed with its own schematic symbol. The finished circuit looks just like the diagram.",
          },
          {
            icon: "layers",
            title: "Expandable System",
            description:
              "Components work across all Snap Circuits kits. This kit is an entry point into an entire product family — add kits as confidence grows.",
          },
        ]}
        columns={3}
        background="white"
      />

      {/* Real Electronics. Real Skills. */}
      <ImageTextBlock
        image="/images/products/snap-circuits-arcade/top-view-board-in-dark-with-lights-with-kids-hands.jpg"
        imageAlt="Top-down view of an illuminated Snap Circuits Arcade board with a child's hands at work"
        title="Real Electronics. Real Skills."
        body="Each snap-together component teaches something genuine — not a simulation of electronics, but actual resistors, capacitors, transistors, and a programmable microcontroller. The board is designed to mirror a real printed circuit board. Every component shows its own schematic symbol. When your child finishes a project, they're not just proud — they understand why it worked. That understanding is the foundation for coding, engineering, and any career requiring logical thinking."
        layout="image-right"
        background="gray"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Projects You'll Build"
        highlight="200+ projects — from basic circuits to fully playable arcade games"
        subtitle="Projects progress from a single LED in the first session to multi-component game circuits. Here are a few from the kit."
        projects={[
          {
            name: "Alarm System",
            description: "Build a working burglar alarm using the alarm IC and light sensor",
            concepts: "Integrated circuits, light sensors, alarm logic",
            image: "/images/products/snap-circuits-arcade/projects/alarm-system.jpg",
          },
          {
            name: "Disco Siren",
            description:
              "Combine the spinning disco motor with siren sounds for a light and sound show",
            concepts: "Motor circuits, sound, combined outputs",
            image: "/images/products/snap-circuits-arcade/projects/disco-siren.jpg",
          },
          {
            name: "Fire Engine Symphony",
            description: "Create a two-tone siren effect using speaker circuits and the alarm IC",
            concepts: "Sound circuits, frequency, alarm ICs",
            image: "/images/products/snap-circuits-arcade/projects/fire-engine-symphony.jpg",
          },
          {
            name: "Machine Lights",
            description: "Wire up a multi-LED light pattern using transistors and resistors",
            concepts: "Transistors, parallel circuits, LED control",
            image: "/images/products/snap-circuits-arcade/projects/machine-lights.jpg",
          },
          {
            name: "Programmable Word Fan",
            description: "Connect the spinning LED fan and program it to display a custom message",
            concepts: "Persistence of vision, circuit wiring, personalisation",
            image: "/images/products/snap-circuits-arcade/projects/programmable-word-fan.jpg",
          },
          {
            name: "Lucky Doubles",
            description:
              "Build the circuit that powers the electronic dice — then try to roll matching doubles",
            concepts: "Microcontrollers, pre-programmed logic, game interaction",
            image: "/images/products/snap-circuits-arcade/projects/lucky-doubles.jpg",
          },
        ]}
        moreText="Plus 194+ more — including 21 fully playable arcade games, timing challenges, and alarm circuits"
        background="white"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="A closer look at the Snap Circuits Arcade — the kit, the components, and the builds."
        images={[
          {
            src: "/images/products/snap-circuits-arcade/child-playing-with-arcade.jpeg",
            alt: "Child engaged and playing with the assembled Snap Circuits Arcade",
          },
          {
            src: "/images/products/snap-circuits-arcade/arcade-built-on-counter.jpg",
            alt: "Snap Circuits Arcade fully assembled on a kitchen counter",
          },
          {
            src: "/images/products/snap-circuits-arcade/spinning-lights.jpg",
            alt: "Snap Circuits Arcade spinning lights display in action",
          },
          {
            src: "/images/products/snap-circuits-arcade/kid-reading-arcade-manual.jpg",
            alt: "Child reading the Snap Circuits Arcade full-colour instruction manual",
          },
          {
            src: "/images/products/snap-circuits-arcade/open-box-parts.jpg",
            alt: "Snap Circuits Arcade components laid out from the opened box",
          },
          {
            src: "/images/products/snap-circuits-arcade/open-arcade-box-kit.jpg",
            alt: "Snap Circuits Arcade box opened showing the kit inside",
          },
          {
            src: "/images/products/snap-circuits-arcade/close-up-box-projects.jpg",
            alt: "Close-up of the Snap Circuits Arcade box highlighting the 200+ projects",
          },
          {
            src: "/images/products/snap-circuits-arcade/close-up-box-age.jpg",
            alt: "Close-up of the Snap Circuits Arcade box showing age 8+ recommendation",
          },
        ]}
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* FAQs */}
      <ProductFAQ
        title="Common Questions"
        background="gray"
        faqs={[
          {
            question: "Does my child need any prior experience?",
            answer:
              "Not at all. The very first project is just lighting up a single LED — it takes two minutes. From there, each project adds one new idea at a time. The instructions are illustrated and written for complete beginners. Most children aged 8–14 can work through the early projects entirely on their own.",
          },
          {
            question: "What do we need to buy separately?",
            answer:
              "Just 3 × AA batteries — that's it. No computer, no software, no tools, no additional parts. Everything else is in the box, including the printed instruction manual and access to the online supplemental guide.",
          },
          {
            question: "Is this safe for children?",
            answer:
              "Yes. Snap Circuits products feature the patented Circuit Safe® protection device — a unique safety mechanism that prevents dangerous circuit configurations. Components have rounded plastic housings with no sharp edges, and no soldering is involved at any stage. Elenco has designed this system specifically for children learning electronics.",
          },
          {
            question: "How does the programmable word fan work?",
            answer:
              "The fan spins at high speed while LED lights flash in a pattern. Because of how the eye perceives fast movement, this creates the illusion of floating text — a phenomenon called persistence of vision. Your child connects the fan in a circuit and programs which message it displays using the selector module. It can be reprogrammed with new messages as many times as they like.",
          },
          {
            question: "What age is this best suited for?",
            answer:
              "The kit is designed for ages 8–14. Younger children (6–7) may enjoy it with a parent alongside. The 200+ project count and 21 arcade games keep children and teens engaged for a long time.",
          },
          {
            question: "What happens when they finish all the projects?",
            answer:
              "First — that takes a while! Most children spend months working through the 200+ projects. Once they have, the 21 arcade games remain endlessly replayable, the word fan can be reprogrammed with new messages, and the kit integrates with other Snap Circuits sets to unlock more advanced projects. The system grows with your child.",
          },
          {
            question: "Is the Arcade different from other Snap Circuits kits?",
            answer:
              "Yes — the Arcade is the only Snap Circuits kit with a built-in pre-programmed microcontroller and dual LED display. Every other Snap Circuits kit teaches circuits. The Arcade adds a powerful twist: the circuits you build become game controllers. It's a significantly more motivating learning loop.",
          },
        ]}
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/snap-circuits-arcade/whats-in-the-box.jpeg"
        imageAlt="Snap Circuits Arcade components laid out showing all included parts"
        background="white"
        items={[
          "Battery pack snap module",
          "Slide switch",
          "Push button",
          "Red LED",
          "Green LED",
          "Yellow LED",
          "Tri-colour light orb",
          "Resistors (multiple values)",
          "Capacitors",
          "NPN transistor",
          "Speaker module",
          "Alarm IC module (siren)",
          "Disco Motor",
          "Programmable Word Fan",
          "LED-MC module (21 arcade games)",
          "Selector/dial module",
          "Base grid (assembly board)",
          "Full-colour 80-page printed manual (Projects 1–61)",
          "Online access: Projects 62–203",
          "3 × AA batteries — NOT included",
        ]}
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        background="gray"
        specs={[
          { label: "Brand", value: "Snap Circuits by Elenco Electronics" },
          { label: "Model", value: "SCA-200" },
          { label: "Age Range", value: "8–14" },
          { label: "Projects", value: "200+ (61 printed + 142 online)" },
          { label: "Built-In Games", value: "21 mini arcade games (pre-programmed)" },
          { label: "Components", value: "35+ snap modules" },
          { label: "Batteries Required", value: "3 × AA (not included)" },
          { label: "Soldering Required", value: "No" },
          { label: "Tools Required", value: "None" },
          { label: "Printed Manual", value: "80 pages, full colour" },
          { label: "Safety", value: "Circuit Safe® patented protection" },
          { label: "Compatible With", value: "Other Snap Circuits kits" },
          { label: "Manufacturer", value: "Elenco Electronics (founded 1957)" },
        ]}
      />

      {/* Final CTA */}
      <CallToAction
        title="Build Your First Circuit"
        subtitle="Real electronics. Real games. Real satisfaction. Everything your child needs is in the box — minus the 3 AA batteries."
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
      "Build real circuits and play 21 arcade games with the Snap Circuits Arcade. 200+ projects, no soldering needed. Perfect for curious kids aged 8–14.",
    alternates: {
      canonical: "/product/snap-circuits-arcade",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
