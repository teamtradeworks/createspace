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
  ProductReviews,
  ProjectShowcase,
  CustomerShowcase,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "snap-circuits-beginner";

export default async function SnapCircuitsBeginnerPage() {
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
        tagline="Your child's first electronics adventure — working circuits, flashing lights, and hours of fun"
        highlights={[
          "21 step-by-step projects with a picture-based manual",
          "Snap together in seconds — no tools, no wires, no soldering",
          "Designed for ages 5–9 with no reading required",
          "Award-winning Circuit Safe® design — safe for young hands",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Snap Together, Light Up — lifestyle image */}
      <ImageTextBlock
        image="/images/products/snap-circuits-beginner/girl-playing-with-kit-in-front-of-her.jpg"
        imageAlt="Girl playing with Snap Circuits Beginner kit"
        title="Snap Together. Light Up. Learn."
        body="With Snap Circuits, there are no tiny wires to wrestle with and no frustrating connections that never quite work. Every component snaps firmly onto the base grid in seconds. Your child follows the pictures in the manual, places the parts step by step, and then — flip the switch — something lights up, spins, or makes a sound. That moment of real, self-made success is what builds a love of learning that lasts long after the kit is packed away."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="What Makes It Click"
        subtitle="14 snap-together parts. 21 guided projects. One very clever design."
        features={[
          {
            icon: "shield",
            title: "Circuit Safe® Technology",
            description:
              "Elenco's patented safety device prevents dangerous connections. Parents can trust young builders to explore freely.",
          },
          {
            icon: "book",
            title: "No Reading Required",
            description:
              "The picture-only manual guides children through each project with diagrams alone — perfect for pre-readers and early readers.",
          },
          {
            icon: "lightbulb",
            title: "Real Results Every Time",
            description:
              "Every project produces actual lights, sound, or motion. The satisfaction is instant and deeply motivating for young builders.",
          },
          {
            icon: "puzzle",
            title: "Snap Together in Seconds",
            description:
              "Large, colour-coded snap connectors are easy for small hands. No tools, no loose wires, no frustration.",
          },
          {
            icon: "award",
            title: "Award-Winning Trust",
            description:
              "Winner of Toy of the Year, NAPPA Gold, Parent's Choice, and more. Trusted by parents and educators around the world.",
          },
          {
            icon: "code",
            title: "21 Guided Projects",
            description:
              "From a simple lamp to a colour-changing fan, projects grow in complexity to keep children engaged and challenged.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Fan spinning — project journey */}
      <ImageTextBlock
        image="/images/products/snap-circuits-beginner/finger-pressing-switch-on-board-fan-spinning.jpg"
        imageAlt="Finger pressing a switch on Snap Circuits board with the colour-changing fan spinning"
        title="From Simple to Satisfying — 21 Projects"
        body="The manual takes your child on a journey — starting with a single lamp in project 1 and building all the way to multi-switch circuits with colour-changing lights, sound, and motion together. Each project uses the same snap-together parts in fresh combinations, so the challenge grows without ever feeling overwhelming. Once all 21 are done, the real creativity begins: children can combine parts freely to invent circuits of their own."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Projects You'll Build"
        highlight="21 guided circuit projects in a picture-based manual"
        subtitle="Each project introduces a new concept — starting with a single component and building to multi-switch combinations."
        projects={[
          {
            name: "Light Motor",
            description:
              "Connect the motor to make the colour-changing fan spin for the first time.",
            concepts: "Motor, electrical energy → motion",
            image: "/images/products/snap-circuits-beginner/projects-light-motor.jpg",
          },
          {
            name: "Light & Sound with Egg",
            description:
              "Add the egg component to produce light and sound together in one circuit.",
            concepts: "Series circuit, multiple outputs",
            image: "/images/products/snap-circuits-beginner/projects-light-and-sound-with-egg.jpg",
          },
          {
            name: "2-Speed Fan",
            description:
              "Configure the motor to run at two different speeds using the circuit layout.",
            concepts: "Variable load, motor speed",
            image: "/images/products/snap-circuits-beginner/projects-2-speed-fan.jpg",
          },
          {
            name: "Either Switch Lamp",
            description: "Turn the lamp on using either of two switches independently.",
            concepts: "Parallel switching, circuit logic",
            image: "/images/products/snap-circuits-beginner/projects-either-switch-lamp.jpg",
          },
          {
            name: "Sound or Motion",
            description: "Build a circuit that produces either a sound or movement — your choice.",
            concepts: "Switch choice, circuit branching",
            image: "/images/products/snap-circuits-beginner/projects-sound-or-motion.jpg",
          },
          {
            name: "Lots of Lights",
            description:
              "Get all available lights working at once in a satisfyingly complex circuit.",
            concepts: "Parallel output, circuit complexity",
            image: "/images/products/snap-circuits-beginner/projects-lots-of-lights.jpg",
          },
        ]}
        moreText="Plus 15 more projects — Horn, Dim Lights, 2-Switch Everything, Egg Horn, and more"
        background="gray"
      />

      {/* Customer Showcase — ALL end-user photos, immediately after ProjectShowcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="Snap Circuits in action — first circuits, favourite toys, and plenty of proud moments."
        images={[
          {
            src: "/images/products/snap-circuits-beginner/fingers-pressing-switches-in-dark-with-lights.jpg",
            alt: "Fingers pressing switches on Snap Circuits board with coloured lights glowing in the dark",
          },
          {
            src: "/images/products/snap-circuits-beginner/fingers-snapping-down-pieces.jpg",
            alt: "Fingers snapping circuit pieces onto the Snap Circuits base grid",
          },
          {
            src: "/images/products/snap-circuits-beginner/hand-holding-switch.jpg",
            alt: "Hand holding a Snap Circuits switch component",
          },
          {
            src: "/images/products/snap-circuits-beginner/kid-playing-with-board.jpg",
            alt: "Child playing with the Snap Circuits Beginner board",
          },
          {
            src: "/images/products/snap-circuits-beginner/kit-unboxes-with-kids-hands-in-the-back.jpg",
            alt: "Snap Circuits Beginner kit unboxed with children's hands in the background",
          },
          {
            src: "/images/products/snap-circuits-beginner/open-manual-project2.jpg",
            alt: "Open Snap Circuits Beginner manual showing illustrated project instructions",
          },
          {
            src: "/images/products/snap-circuits-beginner/two-snap-circuit-beginner-boards-with-kids-hands.jpg",
            alt: "Two Snap Circuits Beginner boards with children's hands building circuits side by side",
          },
          {
            src: "/images/products/snap-circuits-beginner/finger-pressing-switch-with-colourful-light-fan-spinning.jpg",
            alt: "Finger pressing a switch on Snap Circuits board with the colourful light fan spinning",
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
            question: "Is this suitable for a 5-year-old?",
            answer:
              "Yes, with a little initial guidance. The large snap connectors and picture-based manual are designed for young children. Most 5–6 year olds start with a parent alongside them and quickly build the confidence to try projects on their own. By 7+, most children work through the manual independently.",
          },
          {
            question: "Do I need electronics experience to help my child?",
            answer:
              "Not at all. No electronics background is required — for you or your child. The picture manual guides anyone through each project without any prior knowledge. If the fan spins, the circuit is correct — it really is that straightforward.",
          },
          {
            question: "What batteries does it need, and are they included?",
            answer:
              "The kit requires 3 × AA batteries, which are NOT included. You can add a pack of batteries to your order above — that's the only thing you'll need before your child can get started.",
          },
          {
            question: "Is it safe for young children?",
            answer:
              "Absolutely. Snap Circuits uses Elenco's Circuit Safe® patented technology, which means the circuit can never be connected in a way that creates a hazard. All components have smooth, rounded edges and the kit runs on just 4.5V — completely safe for children aged 5 and up.",
          },
          {
            question: "Does my child need to be able to read?",
            answer:
              "No. The manual uses pictures and step-by-step diagrams instead of written instructions — one of this kit's standout features. Pre-readers and early readers can follow along completely independently.",
          },
          {
            question: "What can my child do after completing the 21 projects?",
            answer:
              "Once they've finished the guided projects, they can combine components freely to invent their own circuits — the experimentation is half the fun. When they're ready for more, the Snap Circuits Jr. (SC-100) uses the same snap system and unlocks 100+ additional projects, with even larger kits beyond that.",
          },
        ]}
        background="white"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/snap-circuits-beginner/whats-in-the-box.jpg"
        imageAlt="Snap Circuits Beginner kit laid out showing all components"
        items={[
          "Mini base grid",
          "Battery holder (3 × AA — batteries not included)",
          "Slide switch",
          "Press switch",
          "Lamp",
          "Red/Yellow LED",
          "Light motor with colour-changing fan",
          "Horn / buzzer",
          "Light & sound egg",
          "Snap connector wires (×4)",
          "28-page full-colour illustrated manual",
        ]}
        background="gray"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started"
        subtitle="21 hands-on projects that light up, make noise, and keep young builders coming back for more."
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
  const product = await getProductByHandle("snap-circuits-beginner");

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | CREATESPACE`,
    description:
      "Real electronics for ages 5–9. Build 21 snap-together circuit projects — lights, sounds, and motion. No tools, no soldering, no reading required.",
    alternates: {
      canonical: "/product/snap-circuits-beginner",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
