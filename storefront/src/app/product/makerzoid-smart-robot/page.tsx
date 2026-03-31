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
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "makerzoid-smart-robot";

export default async function MakerzoidSmartRobotPage() {
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
        tagline="72+ moving robots your child builds without writing a single line of code"
        highlights={[
          "72+ robots to build across music, sports, agriculture, and more",
          "Robots move and react on their own — no coding or app required",
          "Two control modes: button control and sensor-driven reactions",
          "2D and 3D building instructions — most builds done in under an hour",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why This Kit */}
      <NumberedSteps
        title="Why the Smart Robot is Different"
        subtitle="Most building kits just sit still. The Makerzoid Smart Robot is designed to move, react, and surprise — without needing any programming."
        steps={[
          {
            title: "Robots That Actually React",
            description:
              "The Intelligent Motor has logic built directly into it. Your child builds the robot, switches it to Intelligent Mode, and watches it respond to light and movement — no screen, no coding, no setup.",
          },
          {
            title: "72+ Builds to Explore",
            description:
              "From a drumming robot to a cycling athlete to a rice-hulling farmer, there are 72+ different models to discover. Each one teaches something new about gears, levers, and mechanical movement.",
          },
          {
            title: "The Perfect First Step",
            description:
              "Designed as a logic training kit, the Smart Robot introduces cause-and-effect thinking before coding. It's the ideal preparation for more advanced STEM kits — and a rewarding standalone toy in its own right.",
          },
        ]}
        background="navy-card"
      />

      {/* Building for Real */}
      <ImageTextBlock
        image="/images/products/makerzoid-smart-robot/boy-in-background-with-four-robot-builds-in-front-of-him.jpg"
        imageAlt="Boy surrounded by four completed robot builds he assembled himself"
        title="A New Build Every Time"
        body="The 300+ building blocks are used and reused across every single model. Your child disassembles one robot, and those exact same pieces become the next one. With 72+ different designs waiting in the instruction guides, there's always another challenge to try — from a drumming musician to a rowing athlete to an agricultural machine. It's the kind of toy that stays interesting for months."
        layout="image-left"
        background="gray"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="What Makes It Work"
        subtitle="No coding knowledge needed. The Intelligent Motor does the thinking so your child can focus entirely on building and experimenting."
        features={[
          {
            icon: "robot",
            title: "Intelligent Motor",
            description:
              "Logic adjustments built into the motor allow robots to react to their environment — no external controller or programming required",
          },
          {
            icon: "sensor",
            title: "Infrared & Light Sensors",
            description:
              "Onboard sensors detect nearby objects and light levels, enabling different robot behaviours and reactions",
          },
          {
            icon: "puzzle",
            title: "300+ Building Blocks",
            description:
              "Large, chunky ABS bricks in varied shapes let your child assemble complex mechanical structures with ease",
          },
          {
            icon: "book",
            title: "2D & 3D Instructions",
            description:
              "Rotating 3D step-by-step guides help your child visualise how each piece fits together, building spatial reasoning as they build",
          },
          {
            icon: "lightbulb",
            title: "Two Control Modes",
            description:
              "Electric Mode for hands-on button control; Intelligent Mode for sensor-driven autonomy — two different play experiences from every build",
          },
          {
            icon: "shield",
            title: "Safe by Design",
            description:
              "Smooth rounded edges on every brick, low-voltage battery operation, and all electronics safely enclosed — designed for ages 6 and up",
          },
        ]}
        columns={3}
        background="white"
      />

      {/* Categories */}
      <ImageTextBlock
        image="/images/products/makerzoid-smart-robot/band-of-robots.jpg"
        imageAlt="A band of music robots — pianist, guitarist, bassist, drummer, and violinist"
        title="Three Worlds to Explore"
        body="The 72+ robots span three themed categories, each teaching different mechanical concepts. The Music collection — pianists, guitarists, bassists, drummers, violinists — teaches rhythmic motion and arm articulation. Sports robots like the boxer, cyclist, and high-bar gymnast explore balance and propulsion. And the Agriculture series (harvester, rice huller, sawing machine) introduces repetitive mechanical work. Each category connects to something real, sparking curiosity about how things in the world actually move."
        layout="image-right"
        background="gray"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="72+ Robots to Build"
        highlight="Three themed collections — music, sports, and agriculture — plus more models beyond"
        subtitle="Each robot is a new engineering puzzle. Here's a taste of what your child will build:"
        projects={[
          {
            name: "Pianist",
            description: "A robot that plays piano with rhythmic, repeating key strikes",
            concepts: "Motor sequencing, timing, arm mechanics",
            image: "/images/products/makerzoid-smart-robot/projects/pianist.jpg",
          },
          {
            name: "Guitarist",
            description: "A guitar-playing robot with realistic strumming arm motion",
            concepts: "Oscillating motion, rhythm, mechanical design",
            image: "/images/products/makerzoid-smart-robot/projects/guitarist.jpg",
          },
          {
            name: "Singer",
            description: "A vocalist robot with expressive upper body movement",
            concepts: "Articulated motion, character mechanics",
            image: "/images/products/makerzoid-smart-robot/projects/singer.jpg",
          },
          {
            name: "Boxing Man",
            description: "A robot that throws punches with articulated arms",
            concepts: "Arm mechanics, impact motion, lever systems",
            image: "/images/products/makerzoid-smart-robot/projects/boxer.jpg",
          },
          {
            name: "Runner",
            description: "A bipedal robot with realistic running leg movement",
            concepts: "Leg mechanics, gait, balance, rotary drive",
            image: "/images/products/makerzoid-smart-robot/projects/runner.jpg",
          },
          {
            name: "Weight Lifter",
            description: "A robot that performs a weightlifting exercise with arm motion",
            concepts: "Lever systems, mechanical advantage, vertical motion",
            image: "/images/products/makerzoid-smart-robot/projects/weight-lifter.jpg",
          },
        ]}
        moreText="Plus 66+ more robots including farmers, harvesters, cyclists, violinists, drummers, and many more across multiple themed series"
        background="white"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="Real builds from the Makerzoid Smart Robot community"
        images={[
          {
            src: "/images/products/makerzoid-smart-robot/build-car-robot.jpg",
            alt: "Completed car robot build",
            label: "Car Robot",
          },
          {
            src: "/images/products/makerzoid-smart-robot/close-up-of-robot-build.jpg",
            alt: "Close-up detail of a completed robot build",
            label: "Detail Shot",
          },
          {
            src: "/images/products/makerzoid-smart-robot/close-up-of-build.jpg",
            alt: "Close-up of building block connections",
            label: "Build Close-Up",
          },
          {
            src: "/images/products/makerzoid-smart-robot/book-manual-open.jpg",
            alt: "Instruction manual open showing 3D building guides",
            label: "Instructions",
          },
          {
            src: "/images/products/makerzoid-smart-robot/app-on-phone-with-building-blocks-around-it.jpg",
            alt: "Phone displaying building instructions surrounded by blocks",
            label: "Digital Guide",
          },
          {
            src: "/images/products/makerzoid-smart-robot/box-sealed-on-table.jpg",
            alt: "Makerzoid Smart Robot box on a table",
            label: "The Box",
          },
        ]}
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="gray" />

      {/* FAQ Section */}
      <ProductFAQ
        title="Common Questions"
        background="white"
        faqs={[
          {
            question: "Does my child need any experience with robotics or coding?",
            answer:
              "Not at all. The Smart Robot is designed for complete beginners aged 6 and up. No coding, no app, no prior knowledge needed — just follow the 3D instructions and start building. It's one of the most accessible robotics kits available.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "We recommend ages 6 and up. Children aged 6–8 may need a bit of help with more complex builds, while children 9+ can usually work independently. The clear 3D instructions and chunky bricks are specifically designed for small hands and developing readers.",
          },
          {
            question: "Do I need a phone or computer?",
            answer:
              "No. The Smart Robot is entirely screen-free. Robots move and react through the Intelligent Motor's built-in logic — no app download, no Bluetooth setup, no computer required. Everything you need is in the box.",
          },
          {
            question: "What batteries do I need?",
            answer:
              "2 x AAA batteries are required and are not included in the kit. Standard alkaline AAA batteries will work fine.",
          },
          {
            question: "How long does it take to build a robot?",
            answer:
              "Most robots can be built in under an hour. Simpler models take 20–30 minutes, while more complex ones take 45–60 minutes. The instruction guides are designed to keep children engaged through to completion.",
          },
          {
            question: "What's the difference between this and the Smart Robot Premium?",
            answer:
              "The Smart Robot is a no-code logic training kit — robots react through built-in sensor logic, with no programming required. It's the ideal starting point for younger children or beginners. The Smart Robot Premium adds Bluetooth programming with Scratch Junior coding and 200+ models, making it the natural next step for children ready to explore coding.",
          },
          {
            question: "Can they build all 72+ robots with the same pieces?",
            answer:
              "Yes. The 300+ building blocks are used and reused across all 72+ models. Your child disassembles one robot and the pieces become the next build. The kit grows with them — there's always another model to try.",
          },
          {
            question: "Is this safe for young children?",
            answer:
              "Yes. All bricks have smooth, rounded edges with no sharp points. The motor operates on low-voltage AAA batteries, and all electronic components are safely enclosed. The kit has been designed with young children's safety in mind.",
          },
        ]}
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/makerzoid-smart-robot/whats-in-the-box.jpg"
        imageAlt="Makerzoid Smart Robot kit contents laid out"
        items={[
          "300+ construction blocks in various shapes, sizes, and colours",
          "Intelligent Motor module with integrated logic and button controls",
          "Infrared (IR) sensor module",
          "Light sensor module",
          "2D and 3D step-by-step graphical instruction manuals",
          "Storage box for organising blocks",
          "Note: 2 x AAA batteries required (not included)",
        ]}
        background="gray"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Building Blocks", value: "300+ pieces" },
          { label: "Robot Models", value: "72+" },
          { label: "Control Modes", value: "Electric (button), Intelligent (sensor-driven)" },
          { label: "Sensors", value: "Infrared (IR) sensor, Light sensor" },
          { label: "Battery Requirements", value: "2 x AAA (not included)" },
          { label: "Coding Required", value: "None — no-code kit" },
          { label: "App Required", value: "No" },
          { label: "Instructions", value: "2D and 3D graphical step-by-step guides" },
          { label: "Build Time", value: "Most builds under 1 hour" },
          { label: "Recommended Age", value: "6 years and older" },
          { label: "Skill Level", value: "Beginner" },
          { label: "Materials", value: "ABS plastic bricks with smooth, rounded edges" },
        ]}
        background="white"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started"
        subtitle="A building kit with robots that actually move — no coding, no apps, no fuss. Just 72+ models waiting to be built."
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
      "Build 72+ moving robots with no coding required. The Makerzoid Smart Robot uses a built-in Intelligent Motor so robots react on their own. Ages 6+.",
    alternates: {
      canonical: "/product/makerzoid-smart-robot",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
