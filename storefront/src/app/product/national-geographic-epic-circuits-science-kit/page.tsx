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

      {/* Hero */}
      <HeroSection
        product={product}
        tagline="From a basic closed circuit to logic gates, with a levitating ball and launching copter along the way"
        highlights={[
          "43 projects: from simple switches to AND/OR logic gates",
          "Snap-together components, no tools or soldering needed",
          "Full-colour illustrated guide and QR video tutorials for every project",
          "Ages 8-14, 3 AAA batteries required (not included), NAPPA Awards 2024",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=cMRLyEDo39Y"
        title="See it in action"
        background="white"
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/national-geographic-epic-circuits-science-kit/diagram-from-manual.png"
        imageAlt="Circuit diagram from the National Geographic Epic Circuits illustrated guide"
        title="Every project, step by step"
        body="The full-colour guide covers every project with circuit diagrams and clear connection instructions. Scan the QR code on any page to watch a video tutorial if reading isn't clicking. Between projects, 'Did You Know?' facts explain the real-world technology behind what was just built: a doorbell, a TV remote, the combination lock on a school locker."
        layout="image-left"
        background="gray"
      />

      {/* white */}
      <FeatureGrid
        title="What makes it work"
        columns={2}
        background="white"
        features={[
          {
            icon: "zap",
            title: "Snap in, switch on",
            description:
              "Components connect with snap-in wires and no tools are needed at any point. A new project is usually ready to test within a few minutes.",
          },
          {
            icon: "star",
            title: "Projects with memorable results",
            description:
              "The kit is built around moments that stick: a ball floating on a column of air, a copter that launches when your child flips a switch. Children tend to remember circuits that do something unexpected.",
          },
          {
            icon: "puzzle",
            title: "Enough for weeks of sessions",
            description:
              "Thirty-six guided circuit projects, seven activities including crosswords and mazes, and two open-ended Design Your Own Circuit pages at the end. Every component is reusable.",
          },
          {
            icon: "book",
            title: "A guide that goes beyond instructions",
            description:
              "The main guide has step-by-step circuit diagrams and QR code video tutorials. There's also a separate Learning Guide with Circuit Science explainers and history facts about the components being used.",
          },
        ]}
      />

      {/* gray */}
      <ProjectShowcase
        title="40+ hands-on circuit projects"
        highlight="36 guided circuit builds and 7 activities in a full-colour illustrated guide"
        subtitle="Projects are ordered by complexity across five stages. Here are a few from different points in the sequence."
        columns={3}
        background="gray"
        projects={[
          {
            name: "Float a ball",
            description:
              "Use controlled airflow from the multifunction module to hold the foam ball suspended mid-air above the funnel.",
            concepts: "Airflow, Bernoulli's principle",
          },
          {
            name: "Launch a copter",
            description:
              "Attach the copter to the spinner module, flip the toggle switch, and watch it launch off the base and into the air.",
            concepts: "Electric motors, switches, lift",
          },
          {
            name: "Build the ultimate bubble turbine",
            description:
              "Combine the RGB light, fan, and bubble wand into one circuit. Bubbles glow and shift colour as they float through the light.",
            concepts: "Parallel circuits, light and colour",
          },
          {
            name: "Create a vacuum cleaner",
            description:
              "Attach the vacuum tube and switch the module to suction mode. It's strong enough to pull paper scraps across the table.",
            concepts: "Air pressure, vacuum mechanics",
          },
          {
            name: "Build an AND logic gate",
            description:
              "Both the toggle switch AND the button must be activated at the same time for the RGB light to come on.",
            concepts: "Boolean logic, AND gate",
          },
          {
            name: "Design your own circuit",
            description:
              "Write down what you want your circuit to do, draw the diagram, then build and test your own original idea.",
            concepts: "Circuit design, creative engineering",
          },
        ]}
        moreText="Plus 30 more projects including a traffic light, a two-switch copter launch, a vacuum cleaner with adjustable power, fan art, and circuit puzzles"
      />

      {/* white */}
      <CustomerShowcase
        title="Young engineers at work"
        subtitle="See what they build"
        background="white"
        images={[
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-child-playing.jpg",
            alt: "Child experimenting with the National Geographic Epic Circuits kit",
            label: "Young engineer",
          },
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-circuit-building.jpg",
            alt: "Circuit projects laid out on a table",
            label: "Projects in action",
          },
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-building-circuits.jpg",
            alt: "Child building circuits with the Epic Circuits kit",
            label: "Building circuits",
          },
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-hands-buttons.jpg",
            alt: "Hands pressing switches on the circuit kit",
            label: "Learning by doing",
          },
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-hands-connecting.jpg",
            alt: "Hands connecting circuit components with snap-in wires",
            label: "Plug and play",
          },
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-box-opened.jpg",
            alt: "Epic Circuits kit box opened showing all components",
            label: "What's inside",
          },
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-box-on-table.jpg",
            alt: "National Geographic Epic Circuits kit box on a table",
            label: "In the box",
          },
          {
            src: "/images/products/national-geographic-epic-circuits-science-kit/end-user-unboxing.jpg",
            alt: "Unboxing the National Geographic Epic Circuits Science Kit",
            label: "Unboxing day",
          },
        ]}
      />

      {/* gray */}
      <ProductReviews productId={product.id} background="gray" />

      {/* white */}
      <ProductFAQ
        title="Common questions"
        background="white"
        faqs={[
          {
            question: "What age is this best for?",
            answer:
              "The kit is designed for ages 8-14. Children aged 8-9 will likely want a parent nearby for the first project or two while they get used to how the snap-in wires work. From age 10 upwards, most children can work through the guide independently. The more complex projects at the end, like multi-logic-gate circuits, are genuinely challenging for older kids in the 12-14 range.",
          },
          {
            question: "Does my child need any experience with electronics?",
            answer:
              "None at all. The kit starts with the most basic concept possible: connecting a power block to an RGB light with two wires to make a closed circuit. Each project introduces one new thing. By the end, your child will have worked through series circuits, parallel circuits, and logic gates without any prior knowledge.",
          },
          {
            question: "Can my child do this without my help?",
            answer:
              "For most of the kit, yes. The illustrated guide and QR video tutorials are designed so children can follow along on their own. Younger children (8-9) may want company for the first session. Once they've completed two or three projects, they usually take over independently. You will need to help with the initial battery installation, which requires a small Phillips-head screwdriver.",
          },
          {
            question: "What batteries does it need?",
            answer:
              "Three AAA 1.5V alkaline batteries, not included. You'll need a small Phillips-head screwdriver to open the battery compartment. If a project stops working mid-session, fresh batteries usually fix it.",
          },
          {
            question: "Is it safe?",
            answer:
              "Yes. The kit runs on three AAA batteries, which is a very low voltage. It carries FCC Class B certification and is designed for young hands. The only safety note is that it contains small parts, so keep it away from children under 3 years old.",
          },
          {
            question: "How many sessions will it last?",
            answer:
              "Individual projects take 5-15 minutes to set up and experiment with. The 36 guided projects and 7 activities will take several sessions to get through. Beyond the structured guide, the two Design Your Own Circuit pages at the end have no instructions at all. All components are reusable.",
          },
          {
            question: "What will my child actually learn?",
            answer:
              "They'll understand how electricity flows, what different switches do, and how series and parallel circuits work differently. The logic gate projects at the end introduce the same AND and OR conditions used in every computer ever built. Beyond the electronics, the troubleshooting that comes with getting circuits to work teaches children to check their work methodically and try again rather than give up.",
          },
        ]}
      />

      {/* gray */}
      <WhatsIncluded
        title="What's in the box"
        image="/images/products/national-geographic-epic-circuits-science-kit/whats-in-the-box.jpg"
        imageAlt="National Geographic Epic Circuits kit contents laid out"
        background="gray"
        items={[
          "Power block (battery-powered electrical power source)",
          "RGB light (multi-colour LED module with red, green, and blue channels)",
          "Toggle switch",
          "Dial switch",
          "Button switch",
          "Multi-function module (blows air through funnel or creates suction via vacuum tube)",
          "Spinner module with fan attachment",
          "Copter (launches from spinner module)",
          "Bubble wand",
          "Foam ball",
          "Funnel",
          "Vacuum filter",
          "Vacuum tube",
          "Vacuum tube connector",
          "2 T-wires (split the circuit to power two components at once)",
          "6 wires",
          "40+ Projects Guide (full-colour illustrated step-by-step instructions)",
          "Learning Guide with colour illustrations",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Build your first circuit"
        subtitle="43 projects from a basic closed circuit to logic gates. Snap-together components, no tools needed. Ages 8-14."
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
      "Build 43 circuit projects from simple switches to logic gates. Snap-together components, no tools needed. Illustrated guide and video tutorials included. Ages 8-14.",
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
