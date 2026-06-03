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
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-epic-circuits-science-kit";

export default async function NatGeoEpicCircuitsPage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    notFound();
  }

  const resolvedAddons = await resolveAddonsForHandle(PRODUCT_HANDLE);
  const addons = serializeAddons(resolvedAddons);

  return (
    <ProductTrackingProvider handle={PRODUCT_HANDLE}>
      <ProductJsonLd product={product} />

      <HeroSection
        product={product}
        tagline="Power lights, launch a copter, and levitate a ball — 40+ hands-on circuit projects included"
        highlights={[
          "40+ circuit projects — lights, fans, a flying copter, bubbles and more",
          "Plug-and-play components — no tools or soldering needed",
          "Ages 8–14 · 3 AAA batteries required · full-colour illustrated guide included",
          "NAPPA Awards 2024 winner",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=cMRLyEDo39Y"
        title="See It in Action"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes This Kit Special"
        columns={2}
        background="gray"
        features={[
          {
            icon: "zap",
            title: "Plug In and Play",
            description:
              "No tools, no fuss. Every component connects with snap-in wires — just plug in and your circuit comes alive. New projects set up in minutes, so the experimenting starts right away.",
          },
          {
            icon: "star",
            title: "Real Wow Moments",
            description:
              "A ball that floats on a column of air. A copter that launches across the room with a flick of a switch. Colour-changing bubbles that glow and drift. These are real effects powered by real circuits — built by your child.",
          },
          {
            icon: "puzzle",
            title: "Enough for Weeks of Discovery",
            description:
              "Forty-plus projects covering lights, fans, vacuums, flying devices, and bubble machines — plus open-ended Design Your Own Circuit pages when the guide runs out. There's always something new to try.",
          },
          {
            icon: "book",
            title: "A Guide That Does the Teaching",
            description:
              "Step-by-step illustrated instructions, plus QR-code video tutorials for every project. 'Did You Know?' facts connect each circuit to the technology your child sees every day — doorbells, volume knobs, TV remotes.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/national-geographic-epic-circuits-science-kit/diagram-from-manual.png"
        imageAlt="Illustrated circuit diagram from the National Geographic Epic Circuits guide"
        title="Every Project, Step by Step"
        body="The full-colour illustrated guide walks through every single project with clear circuit diagrams and connection instructions — no guessing, no frustration. Scan the QR code inside to follow along with video tutorials. Between projects, 'Did You Know?' facts explain the real-world technology behind what your child just built: why a doorbell rings, how a volume knob works, what powers a flying copter."
        layout="image-left"
        background="white"
      />

      {/* gray */}
      <ProjectShowcase
        title="40+ Hands-On Circuit Projects"
        highlight="36 circuit-building projects and 7 creative activities in one illustrated guide"
        subtitle="From a glowing RGB light to a levitating ball and a launching copter — there's something new to build every session."
        columns={3}
        background="gray"
        projects={[
          {
            name: "Float a Ball",
            description:
              "Use the multifunction module to blow a controlled column of air and hold the foam ball suspended mid-air — without touching it.",
            concepts: "Airflow, Bernoulli's principle, balance",
          },
          {
            name: "Launch a Copter",
            description:
              "Flip the toggle switch and watch the copter detach from the spinner module and fly up into the air.",
            concepts: "Electric motors, switches, lift",
          },
          {
            name: "Create a Vacuum Cleaner",
            description:
              "Attach the vacuum tube and switch the module to suction mode — powerful enough to pick up scraps of paper across the table.",
            concepts: "Air pressure, suction, vacuum mechanics",
          },
          {
            name: "Build the Ultimate Bubble Turbine",
            description:
              "Combine the fan, RGB light, and bubble wand into a single circuit — bubbles glow and shift colour as they float through the light.",
            concepts: "Parallel circuits, light and colour",
          },
          {
            name: "Make White Light",
            description:
              "Connect all four ports of the RGB light at maximum power — red, green, and blue light combine to produce pure white.",
            concepts: "Additive colour model, RGB light",
          },
          {
            name: "Design Your Own Circuit",
            description:
              "Write down what you want your circuit to do, draw the diagram, then build and test your own original invention.",
            concepts: "Creative engineering, circuit design",
          },
        ]}
        moreText="Plus 30 more projects inside — a bubble machine, a traffic light, a two-switch copter launch, fan art, circuit puzzles, and mazes"
      />

      {/* white */}
      <CustomerShowcase
        title="Young Engineers at Work"
        subtitle="Real kids, real circuits"
        background="white"
        images={[
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-building-circuits.jpg",
            alt: "Child building circuits with the Epic Circuits Science Kit",
            label: "Building Circuits",
          },
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-child-playing.jpg",
            alt: "Child experimenting with the National Geographic Epic Circuits kit",
            label: "Young Engineer",
          },
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-hands-connecting.jpg",
            alt: "Hands connecting circuit components with snap-in wires",
            label: "Plug and Play",
          },
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-hands-buttons.jpg",
            alt: "Hands pressing switches on the circuit kit",
            label: "Learning by Doing",
          },
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-circuit-building.jpg",
            alt: "Circuit projects laid out on a table",
            label: "Projects in Action",
          },
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-unboxing.jpg",
            alt: "Unboxing the National Geographic Epic Circuits Science Kit",
            label: "Unboxing Day",
          },
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-box-opened.jpg",
            alt: "Epic Circuits Science Kit box opened showing all components",
            label: "What's Inside",
          },
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-box-on-table.jpg",
            alt: "National Geographic Epic Circuits Science Kit box on a table",
            label: "In the Box",
          },
        ]}
      />

      {/* gray */}
      <ProductReviews productId={product.id} background="gray" />

      {/* white */}
      <ProductFAQ
        title="Common Questions"
        background="white"
        faqs={[
          {
            question: "What age is this best for?",
            answer:
              "The kit is designed for ages 8–14. Children aged 8–9 may enjoy having a parent alongside for the first few projects while they get used to how the components snap together. Children 10 and up can usually work independently from the very first project. Older kids often find the more complex projects — like the multi-switch copter launch and logic gate circuits — surprisingly challenging and satisfying.",
          },
          {
            question: "Do I need any tools or soldering?",
            answer:
              "None at all. Every component connects via snap-in wires — no tools required for any of the 40+ projects. The only exception is opening the battery compartment on the power block, which needs a small Phillips-head screwdriver. No soldering, cutting, or assembly beyond plugging wires together.",
          },
          {
            question: "What batteries does it need?",
            answer:
              "Three AAA 1.5V alkaline batteries (not included). You'll need a small Phillips-head screwdriver to open the battery compartment — that's it. If a project stops working mid-session, fresh batteries are usually the fix.",
          },
          {
            question: "Can my child do this independently?",
            answer:
              "For most of the kit, yes. The illustrated guide and QR-code video tutorials are designed so children can follow along without adult guidance. Younger children (8–9) may want company for the first session, but the projects are clearly laid out and self-contained. The Design Your Own Circuit pages are fully open-ended — children can invent and test their own ideas without any instructions at all.",
          },
          {
            question: "Is it safe?",
            answer:
              "Yes. The kit runs on three AAA batteries — low voltage, completely safe for children. It carries FCC Class B certification and is designed specifically for young hands. Note that it contains small parts, so keep it away from children under 3 years old. No chemicals, no soldering, no sharp edges.",
          },
          {
            question: "How much play time does it offer?",
            answer:
              "The 36 structured projects and 7 activities provide many sessions of play — individual projects typically take 5–15 minutes to set up and experiment with. Beyond the guided projects, the Design Your Own Circuit pages are open-ended, so children can keep inventing new circuits as long as they want. The components are all reusable, so nothing runs out.",
          },
          {
            question: "What will my child actually get out of this?",
            answer:
              "They'll understand how electricity flows, what different switches do, and why everyday gadgets — doorbells, volume knobs, TV remotes — work the way they do. Beyond the science, the troubleshooting involved in getting circuits to work builds patience and a quiet confidence in their own problem-solving. Most parents notice their children approaching other challenges with more curiosity and less frustration.",
          },
        ]}
      />

      {/* gray */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-epic-circuits-science-kit/whats-in-the-box.jpg"
        imageAlt="National Geographic Epic Circuits Science Kit contents laid out"
        background="gray"
        items={[
          "Power block (battery-powered electrical power source)",
          "RGB light (multi-colour LED module — red, green, and blue)",
          "Toggle switch",
          "Dial switch",
          "Button switch",
          "Multi-function module (blows air through funnel or creates suction via vacuum tube)",
          "Spinner module with fan attachment",
          "Copter (launches from the spinner module)",
          "Bubble wand",
          "Foam ball",
          "Funnel",
          "Vacuum filter",
          "Vacuum tube",
          "Vacuum tube connector",
          "2 T-wires (split the circuit to power two components at once)",
          "6 Wires",
          "40+ Projects Guide (full-colour illustrated step-by-step instructions)",
          "Learning Guide with colour illustrations",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Flip the Switch"
        subtitle="40+ hands-on circuit projects — lights, fans, a flying copter, bubble machines, and more. No tools, no fuss, just electricity in action."
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
      "Build 40+ hands-on circuit projects — power lights, launch a flying copter, levitate a ball. Plug-and-play, no tools needed. Ages 8–14.",
    alternates: {
      canonical: "/product/national-geographic-epic-circuits-science-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
