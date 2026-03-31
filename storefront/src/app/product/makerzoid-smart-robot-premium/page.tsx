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

const PRODUCT_HANDLE = "makerzoid-smart-robot-premium";

export default async function MakerzoidSmartRobotPremiumPage() {
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
        tagline="Build, code, and play with 200+ robot designs"
        highlights={[
          "200+ unique robot models to build and program",
          "3 control modes: manual, sensor-driven, and Bluetooth programming",
          "Scratch Junior coding - perfect for beginners aged 6+",
          "2D and 3D animated building instructions",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Choose This Kit */}
      <NumberedSteps
        title="Why Choose Makerzoid?"
        subtitle="Designed by robotics professors and engineers, Makerzoid kits teach real mechanical engineering through building and play."
        steps={[
          {
            title: "Limitless Creativity",
            description:
              "With 200+ models from musical robots to sports trainers to vehicles, your child will never run out of new challenges to tackle.",
          },
          {
            title: "Grows With Them",
            description:
              "Start with simple button-controlled builds, progress to sensor interactions, then unlock full programming with Bluetooth - perfect for ages 6 to 12+.",
          },
          {
            title: "Real Skills, Real Fun",
            description:
              "Hands-on robotics builds genuine problem-solving abilities, logical thinking, and confidence that carries into school and beyond.",
          },
        ]}
        background="navy-card"
      />

      {/* Learning Through Building */}
      <ImageTextBlock
        image="/images/products/makerzoid-smart-robot-premium/child-building-while-coding-on-tablet.jpg"
        imageAlt="Child building a robot while coding on tablet"
        title="What They'll Build"
        body="Watch your child's confidence grow as they bring their creations to life. The Makerzoid Smart Robot Premium combines hands-on building with intuitive coding on a tablet or phone. Using the free Makerzoid app with 2D and 3D animated instructions, your child can construct robots step-by-step, then program them to move, respond, and interact. This seamless blend of physical and digital learning makes abstract concepts tangible and immediately rewarding."
        layout="image-left"
        background="gray"
      />

      {/* Features Grid */}
      <FeatureGrid
        title="What's Included"
        subtitle="This complete kit includes 400+ building blocks, a Bluetooth motor, sensors, and comprehensive instructions - no additional tools required."
        features={[
          {
            icon: "puzzle",
            title: "400+ Building Blocks",
            description:
              "Large, colourful bricks perfect for developing fine motor skills and spatial reasoning",
          },
          {
            icon: "code",
            title: "Scratch Junior Coding",
            description:
              "Visual drag-and-drop programming that introduces real coding concepts without complexity",
          },
          {
            icon: "lightbulb",
            title: "Three Control Modes",
            description:
              "Electric button control, IR sensor interaction, or full Bluetooth programming",
          },
          {
            icon: "book",
            title: "Animated Instructions",
            description: "2D and 3D step-by-step guides make building intuitive and engaging",
          },
          {
            icon: "mind",
            title: "Cross-Curricular Learning",
            description: "Integrates maths, language, art, and STEM concepts in every project",
          },
          {
            icon: "shield",
            title: "Trusted Quality",
            description:
              "Created by robotics professors and engineers, with durable components built for repeated use",
          },
        ]}
        columns={3}
        background="white"
      />

      {/* Programming Section */}
      <ImageTextBlock
        image="/images/products/makerzoid-smart-robot-premium/childs-hands-holding-a-built-robot.jpg"
        imageAlt="Child's hands proudly holding a completed robot build"
        title="From Idea to Working Robot"
        body="There's nothing quite like the pride on a child's face when they complete their first working robot. With 200+ different models to explore, your child will experience that sense of accomplishment again and again. From simple button-controlled builds to advanced programmable creations, each completed project builds confidence, problem-solving skills, and genuine excitement about learning. The robots they build aren't just toys—they're proof of what they can achieve."
        layout="image-right"
        background="gray"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Projects, Challenges & Activities"
        highlight="200+ robot models across multiple categories"
        subtitle="From musical robots to sports trainers to vehicles, each model teaches new engineering and programming concepts. Here are just a few examples:"
        projects={[
          {
            name: "Pianist",
            description: "Build a robot that plays piano keys",
            concepts: "Motors, mechanical movement, automation",
            image: "/images/products/makerzoid-smart-robot-premium/pianist-robot.jpg",
          },
          {
            name: "Singer Guitarist",
            description: "Create a musical robot that plays guitar",
            concepts: "Sequential actions, timing, mechanical design",
            image: "/images/products/makerzoid-smart-robot-premium/singer-guitarist-robot.jpg",
          },
          {
            name: "Biker",
            description: "Design a robot that rides a bicycle",
            concepts: "Balance, wheel mechanics, propulsion",
            image: "/images/products/makerzoid-smart-robot-premium/biker-robot.jpg",
          },
          {
            name: "Boxer",
            description: "Build a robot that performs boxing moves",
            concepts: "Arm articulation, movement sequences",
            image: "/images/products/makerzoid-smart-robot-premium/boxer-robot.jpg",
          },
          {
            name: "Runner",
            description: "Create a robot with running motion",
            concepts: "Leg mechanics, walking algorithms, balance",
            image: "/images/products/makerzoid-smart-robot-premium/runner-robot.jpg",
          },
          {
            name: "Weight Lifter",
            description: "Build a robot that lifts weights",
            concepts: "Lever systems, mechanical advantage, motion",
            image: "/images/products/makerzoid-smart-robot-premium/weight-lifter-robot.jpg",
          },
        ]}
        moreText="Plus 194+ more models including drummers, farmers, gymnasts, dinosaurs, vehicles, and advanced programmable robots organised by difficulty level in the Makerzoid app"
        background="white"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="See what other children have created with their Makerzoid Smart Robot Premium kits"
        images={[
          {
            src: "/images/products/makerzoid-smart-robot-premium/end-user-1.jpg",
            alt: "Child building a robot with phone app instructions visible",
          },
          {
            src: "/images/products/makerzoid-smart-robot-premium/end-user-2.jpg",
            alt: "Collection of various robot builds created with the kit",
          },
          {
            src: "/images/products/makerzoid-smart-robot-premium/end-user-3.jpg",
            alt: "Phone displaying 3D building instructions with completed build",
          },
          {
            src: "/images/products/makerzoid-smart-robot-premium/end-user-4.jpg",
            alt: "Robot riding bicycle with 3D instruction manual on table",
          },
          {
            src: "/images/products/makerzoid-smart-robot-premium/end-user-5.jpg",
            alt: "Hands sorting and organising building pieces",
          },
          {
            src: "/images/products/makerzoid-smart-robot-premium/end-user-6.jpg",
            alt: "Close-up of building blocks connected together",
          },
        ]}
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="gray" />

      {/* FAQ Section */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "Do I or my child need any prior experience with robotics or coding?",
            answer:
              "Not at all! The Makerzoid Smart Robot Premium is designed for complete beginners. Start with simple button-controlled models, then progress to sensor interactions and Bluetooth programming at your own pace. The visual Scratch Junior coding is specifically designed for young learners.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "We recommend ages 6 and up. Younger children (6-8) may need adult help with more complex builds, while children 9+ can typically work independently. The progressive difficulty means the kit grows with your child for years.",
          },
          {
            question: "What do I need besides the kit?",
            answer:
              "You'll need 2 x AAA batteries (not included) for the motor. To unlock Bluetooth programming features, you'll also need a smartphone, tablet, or computer with the free Makerzoid app installed (available for iOS, Android, and web).",
          },
          {
            question: "How long does it take to build a robot?",
            answer:
              "Simple models take 20-45 minutes, intermediate builds take 45-90 minutes, and complex programmable robots can take 90+ minutes. Build times vary based on your child's age, experience, and whether they're working independently or with help.",
          },
          {
            question: "Can my child really build 200+ different models?",
            answer:
              "Yes! The complete catalogue of 200+ models is accessible through the Makerzoid app, with 2D and 3D animated instructions for each one. Models range from simple structures to advanced programmable robots across multiple categories including music, sports, vehicles, and animals.",
          },
          {
            question: "What happens after they've built everything?",
            answer:
              "The building blocks are fully reusable, so your child can rebuild models multiple times, modify existing designs, or invent entirely new creations. The three control modes also mean they can revisit earlier builds with more advanced programming as their skills grow.",
          },
          {
            question: "Is this safe for my child?",
            answer:
              "Yes. The blocks are appropriately sized for ages 6+, the motor operates on low-voltage AAA batteries, and all electronic components are safely enclosed. No soldering or complex tools required.",
          },
        ]}
        background="white"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/makerzoid-smart-robot-premium/whats-in-the-box.jpg"
        imageAlt="Contents of the Makerzoid Smart Robot Premium kit laid out"
        items={[
          "400+ construction blocks in various shapes, sizes, and colours",
          "Bluetooth motor module",
          "Infrared (IR) sensor module",
          "Pre-assembled motor chassis",
          "Sensor assembly components",
          "Connector pieces and joints",
          "Quick Start Guide with QR code for app access",
          "Access to 2D and 3D instruction manuals via app",
          "Video course access",
          "Note: 2 x AAA batteries required (not included)",
        ]}
        background="gray"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Building Blocks", value: "400+ pieces" },
          { label: "Robot Models", value: "200+ designs" },
          { label: "Programming Language", value: "Scratch Junior (visual drag-and-drop)" },
          { label: "Control Modes", value: "Electric, Intelligent (IR sensor), Bluetooth" },
          { label: "Motor Type", value: "Bluetooth-enabled motor module" },
          { label: "Sensors Included", value: "Infrared (IR) sensor for intelligent mode" },
          { label: "App Compatibility", value: "iOS, Android, Web" },
          { label: "Battery Requirements", value: "2 x AAA (not included)" },
          { label: "Recommended Age", value: "6 years and older" },
          { label: "Skill Level", value: "Beginner to Intermediate" },
        ]}
        background="white"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started"
        subtitle="200+ robot designs, three control modes, and Scratch Junior coding. Everything in the box for ages 6+."
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
      "Build 200+ robots with Scratch Junior coding. Three control modes, 400+ blocks, 2D/3D instructions. Perfect for ages 6+ learning STEM through hands-on play.",
    alternates: {
      canonical: "/product/makerzoid-smart-robot-premium",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
