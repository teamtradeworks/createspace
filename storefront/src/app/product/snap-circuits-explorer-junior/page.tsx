import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
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
} from "@/components/product-sections";

const PRODUCT_HANDLE = "snap-circuits-explorer-junior";

export default async function SnapCircuitJuniorPage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    notFound();
  }

  const resolvedAddons = await resolveAddonsForHandle(PRODUCT_HANDLE);
  const addons = serializeAddons(resolvedAddons);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        product={product}
        tagline="Build 101 real electronic circuits without any soldering or tools"
        highlights={[
          "101 hands-on projects from simple lights to logic gates",
          "No experience needed—snap-together design is safe and easy",
          "46-page full-colour manual with step-by-step instructions",
          "Award-winning kit used by educators worldwide",
        ]}
        addons={addons}
        canonicalPath="/product/snap-circuits-explorer-junior"
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Snap Circuits Section */}
      <NumberedSteps
        title="Why Snap Circuits?"
        subtitle="Snap Circuits is trusted by millions of families, schools, and educators worldwide. Here's why it's the perfect introduction to electronics for curious kids."
        steps={[
          {
            title: "Safe & Simple",
            description:
              "Large colour-coded pieces snap together like LEGO—no soldering, small wires, or tools. The patented Circuit Safe® technology prevents incorrect connections from causing damage.",
          },
          {
            title: "Real Circuits, Real Learning",
            description:
              "Not a toy simulation. Your child builds actual working circuits with real electronic components—resistors, LEDs, motors, and integrated circuits—just like those inside radios and computers.",
          },
          {
            title: "Builds Confidence & Skills",
            description:
              "101 projects arranged from simple to complex. As your child completes each one, they build technical skills alongside resilience, problem-solving, and pride in creating something real.",
          },
        ]}
        background="navy-card"
      />

      {/* What Is Snap Circuits */}
      <ImageTextBlock
        image="/images/products/snap-circuit-junior/child-sitting-at-table-playing-with-circuits.jpg"
        imageAlt="Child building circuits with Snap Circuits Explorer Junior"
        title="Electronics Made Easy for Young Builders"
        body="Snap Circuits Explorer Junior takes the intimidation out of electronics. Instead of tangled wires and soldering irons, your child gets large, colour-coded plastic modules that snap together securely on a clear grid base. Each piece is numbered and labelled—battery holders, switches, LEDs, motors, and more—making it easy to follow along with the illustrated manual. Within minutes of opening the box, they'll have built their first working circuit. No technical knowledge required from you or them."
        layout="image-left"
        background="white"
      />

      {/* Features Grid */}
      <FeatureGrid
        title="What Makes It Special"
        subtitle="Snap Circuits Explorer Junior is designed for children aged 8+ who are ready to explore how electronics work through hands-on discovery."
        features={[
          {
            icon: "puzzle",
            title: "101 Exciting Projects",
            description:
              "From blinking lights to working doorbells, flying saucers to water alarms—each project teaches new concepts",
          },
          {
            icon: "shield",
            title: "Circuit Safe® Technology",
            description:
              "Patented safety device prevents damage from incorrect connections, so kids can experiment freely",
          },
          {
            icon: "book",
            title: "Full-Colour Manual",
            description:
              "46-page guidebook with large illustrations and clear instructions—no confusing jargon",
          },
          {
            icon: "lightbulb",
            title: "30+ Real Components",
            description:
              "LEDs, motors, speakers, switches, sensors—all the building blocks of real electronics",
          },
          {
            icon: "award",
            title: "Award-Winning",
            description:
              "Toy of the Year, NAPPA Gold, Parent's Choice Recommended, and used in schools worldwide",
          },
          {
            icon: "rocket",
            title: "Expandable System",
            description:
              "Upgrade to more advanced Snap Circuits kits as skills grow—all components are compatible",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="101 Projects to Explore"
        highlight="From blinking lights to logic gates"
        subtitle="Projects are arranged from simple to complex—your child builds confidence with every circuit they complete."
        columns={3}
        background="white"
        projects={[
          {
            name: "Electric Light & Switch",
            description: "Build your very first working circuit—flip a switch and watch a light come on. The perfect starting point.",
            concepts: "Basic circuits, electricity flow, switches",
            image: "/images/products/snap-circuit-junior/projects/electric-light-and-switch.jpg",
          },
          {
            name: "Flying Saucer",
            description: "Spin a motor and modulate the sound to create an eerie flying saucer effect. Lights, motion, and audio combined.",
            concepts: "Motors, sound modulation, circuit integration",
            image: "/images/products/snap-circuit-junior/projects/flying-saucer.jpg",
          },
          {
            name: "Musical Doorbell",
            description: "Wire up a push-button doorbell that plays music when pressed—a project kids love to show off at home.",
            concepts: "Push-button switches, music ICs",
            image: "/images/products/snap-circuit-junior/projects/musical-doorbell-play.jpeg",
          },
          {
            name: "Race Game",
            description: "Build a two-player reaction-speed game. Who can press the button fastest? A firm favourite.",
            concepts: "Game circuits, timing, competition",
            image: "/images/products/snap-circuit-junior/projects/race-game.png",
          },
          {
            name: "Logic Gates (AND, OR, NOR, NAND)",
            description: "Hands-on introduction to digital logic—the building blocks of every computer and microcontroller.",
            concepts: "Boolean logic, digital circuits",
            image: "/images/products/snap-circuit-junior/projects/logic-gates.jpeg",
          },
          {
            name: "Water Space War",
            description: "Dip two contacts in water and trigger space-battle sound effects. Water conducts electricity—now they know why.",
            concepts: "Water detection, conductivity, sensors",
            image: "/images/products/snap-circuit-junior/projects/water-space-war.jpg",
          },
        ]}
        moreText="Plus 95 more projects—doorbells, alarms, strobe lights, pencil resistors, touch sensors, and much more."
      />

      {/* Learning Outcomes Section */}
      <ImageTextBlock
        image="/images/products/snap-circuit-junior/top-down-of-child-playing-with-zoom-in-of-snap-pieces.jpg"
        imageAlt="Close-up of child's hands snapping circuit pieces together"
        title="What They'll Learn"
        body="Your child will discover how electricity flows through circuits, what makes LEDs light up, how motors spin, and how sensors detect sound and light. They'll learn the difference between series and parallel circuits, experiment with logic gates (AND, OR, NOR, NAND), and understand concepts like voltage, resistance, and polarity. But beyond the technical skills, they'll develop problem-solving abilities, learn to troubleshoot when things don't work, and build the confidence that comes from creating something real with their own hands."
        layout="image-right"
        background="white"
      />

      {/* Customer Showcase - ALL end-user photos */}
      <CustomerShowcase
        title="What Families Are Building"
        subtitle="Real projects from real kids. Snap Circuits inspires creativity and experimentation beyond the manual."
        images={[
          {
            src: "/images/products/snap-circuits-explorer-junior/child-building-circuit.jpg",
            alt: "Child building a Snap Circuits project",
          },
          {
            src: "/images/products/snap-circuits-explorer-junior/child-building-board-with-manual-in-front-of-him.jpg",
            alt: "Child following manual while building Snap Circuits project",
          },
          {
            src: "/images/products/snap-circuits-explorer-junior/junior-parts-in-box-neat.jpg",
            alt: "Snap Circuits components organized in storage box",
          },
          {
            src: "/images/products/snap-circuits-explorer-junior/kid-playing-with-board-with-open-box-in-front-of-him.jpg",
            alt: "Child building circuits with components and box visible",
          },
          {
            src: "/images/products/snap-circuits-explorer-junior/refelction-detection.jpg",
            alt: "Reflection detector circuit project",
          },
          {
            src: "/images/products/snap-circuits-explorer-junior/close-up-of-board.jpg",
            alt: "Close-up of a Snap Circuits board with components snapped in place",
          },
          {
            src: "/images/products/snap-circuits-explorer-junior/open-box-with-booklet-and-board.jpg",
            alt: "Snap Circuits box open showing the booklet and board",
          },
          {
            src: "/images/products/snap-circuits-explorer-junior/water-space-war.jpg",
            alt: "Water-activated space war circuit project",
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
            question: "Do I or my child need any prior experience with electronics?",
            answer:
              "Not at all! Snap Circuits Explorer Junior is designed for complete beginners. The manual starts with the absolute basics (how to turn a light on and off) and gradually introduces new concepts with each project. No technical knowledge is required from you or your child.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "The kit is recommended for ages 8 and up. Most children aged 8-12 can work through the projects independently after the first few. Younger children (ages 5-7) can enjoy it with adult guidance. It's also great for adults who want to learn electronics!",
          },
          {
            question: "Is it safe?",
            answer:
              "Yes. Snap Circuits uses low-voltage power (2 AA batteries), and the patented Circuit Safe® device prevents damage from incorrect connections. There are no sharp edges, small parts that could be swallowed, or soldering required. All components meet safety standards.",
          },
          {
            question: "Do I need to buy anything else to get started?",
            answer:
              "You'll need 2 AA batteries (not included). Everything else—the components, manual, and base board—comes in the box. No computer, app, or additional tools are required.",
          },
          {
            question: "What happens after they finish all 101 projects?",
            answer:
              "The components are reusable, so your child can rebuild favourites, modify projects, or invent their own circuits. The kit is also compatible with other Snap Circuits sets, so they can upgrade to more advanced kits (SC-300, SC-500, or specialised sets) as their skills grow.",
          },
          {
            question: "Does this teach coding or programming?",
            answer:
              "No, this kit focuses on electronics and circuits—how electricity works, what different components do, and how to build working devices. It doesn't involve computer programming. If you're looking for coding, consider kits like Arduino or micro:bit.",
          },
          {
            question: "How long does it take to complete a project?",
            answer:
              "Simple projects (the first 20) take about 5-10 minutes. Medium-complexity projects take 10-20 minutes, and more advanced projects can take 15-30 minutes. Most children work through the manual over several weeks or months at their own pace.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/snap-circuits-explorer-junior/whats-in-the-box.jpeg"
        imageAlt="Child snapping Snap Circuits components onto the base board"
        items={[
          "1 × Clear plastic snap-grid base board",
          "1 × Battery holder (requires 2 × AA batteries, not included)",
          "Slide switches",
          "Press switches / push buttons",
          "DC motor with fan blade",
          "Speaker",
          "LED (light-emitting diode)",
          "Lamp",
          "Photoresistor (light sensor)",
          "Alarm circuit (integrated circuit)",
          "Music integrated circuit",
          "Whistle integrated circuit",
          "Resistors (various values)",
          "Snap wires (various lengths: 1-snap, 2-snap, 3-snap, etc.)",
          "2 × Jumper wires",
          "1 × Full-colour project manual (46 pages, Projects 1–101)",
          "30+ components total",
        ]}
        background="white"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Model Number", value: "SC-100" },
          { label: "Manufacturer", value: "Elenco Electronics" },
          { label: "Age Range", value: "8+ years (Grades 3-8)" },
          { label: "Projects Included", value: "101" },
          { label: "Components", value: "30+ pieces" },
          { label: "Manual", value: "46-page full-colour guidebook" },
          { label: "Power Requirements", value: "2 × AA batteries (not included)" },
          { label: "Soldering Required", value: "No" },
          { label: "Tools Required", value: "None" },
          {
            label: "Package Dimensions",
            value: '15" × 9.75" × 2" (38 × 25 × 5 cm)',
          },
          { label: "Weight", value: "2 lbs (0.9 kg)" },
          {
            label: "Safety Certifications",
            value: "ASTM F963 compliant, Circuit Safe® certified",
          },
        ]}
        background="gray"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started with Snap Circuits"
        subtitle="Join millions of young builders worldwide. Everything you need to start exploring electronics is in the box."
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
      "Build 101 real electronic circuits with Snap Circuits Explorer Junior. No soldering or tools needed—perfect for kids aged 8+ to learn electronics hands-on.",
    alternates: {
      canonical: "/product/snap-circuits-explorer-junior",
    },
  };
}
