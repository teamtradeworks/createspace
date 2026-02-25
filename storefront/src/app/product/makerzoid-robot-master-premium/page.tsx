import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import {
  HeroSection,
  FeatureGrid,
  QuickInfoBadges,
  NumberedSteps,
  WhatsIncluded,
  ImageTextBlock,
  ProductFAQ,
  Specifications,
  ProductReviews,
  CallToAction,
  VideoEmbed,
  ProjectShowcase,
  CustomerShowcase,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "makerzoid-robot-master-premium";

export default async function MakerzoidRobotMasterPremiumPage() {
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
        tagline="Build, code, and create over 200 robots with drag-and-drop Scratch programming"
        highlights={[
          "200+ robot models to build - from simple to complex",
          "47 video lessons across 3 skill levels",
          "Scratch 3.0 programming - no coding experience needed",
          "Works with LEGO bricks and Technic pieces",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Makerzoid Section */}
      <NumberedSteps
        title="Why Robot Master?"
        subtitle="Designed by robotics experts, this kit combines building and coding in one comprehensive learning experience."
        steps={[
          {
            title: "Build Real Robots",
            description:
              "Over 600 blocks let your child build more than 200 different robots - from dinosaurs and helicopters to cars and walking machines. Each build teaches engineering fundamentals like gears, structures, and transmission.",
          },
          {
            title: "Learn to Code with Scratch",
            description:
              "Scratch 3.0 makes programming accessible for children. Simply drag and drop code blocks to program robot movements, sensor responses, and LED controls. No typing required.",
          },
          {
            title: "Progress at Their Own Pace",
            description:
              "47 video lessons span three skill levels: Structural, Dynamics, and Programmable. Your child builds confidence as they master each level before advancing to the next.",
          },
        ]}
        background="navy-card"
      />

      {/* Video */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=dSGwumD4w5A"
        title="See It in Action"
        background="gray"
      />

      {/* What Is Makerzoid Section */}
      <ImageTextBlock
        image="/images/products/makerzoid-robot-master-premium/boy-coding-on-tablet-with-robot-on-floor.jpg"
        imageAlt="Child programming a Makerzoid robot using a tablet"
        title="What's Inside the System"
        body="The Makerzoid Robot Master Premium is a programmable robotics kit with over 600 building blocks that lets your child build and code more than 200 different robot designs. From simple mechanical structures to Bluetooth-controlled robots with sensors, the kit spans three skill levels — Structural, Dynamics, and Programmable — each with dedicated video lessons. Children program their robots using Scratch 3.0, a visual drag-and-drop language designed for young learners, and see their code come to life instantly as their robot responds. The blocks are fully compatible with LEGO and LEGO Technic, so your child can combine them with pieces they already own."
        layout="image-left"
        background="white"
      />

      {/* Features Grid */}
      <FeatureGrid
        title="What's Included"
        subtitle="A complete robotics learning system with premium components and structured lessons."
        features={[
          {
            icon: "robot",
            title: "200+ Robot Designs",
            description: "Build dinosaurs, helicopters, cars, cranes, and more with detailed instructions for each",
          },
          {
            icon: "code",
            title: "Scratch 3.0 Programming",
            description: "Drag-and-drop coding that children can master in minutes, not months",
          },
          {
            icon: "sensor",
            title: "Dual Sensors",
            description: "Two precision sensors enable line-following, obstacle avoidance, and distance detection",
          },
          {
            icon: "battery",
            title: "Dual Motors",
            description: "Two powerful motors bring robots to life with dynamic movement",
          },
          {
            icon: "bluetooth",
            title: "Bluetooth Control",
            description: "Wireless app control from any smartphone or tablet",
          },
          {
            icon: "puzzle",
            title: "LEGO Compatible",
            description: "Combine with existing LEGO bricks and Technic pieces for unlimited creativity",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Building with Guide Section */}
      <ImageTextBlock
        image="/images/products/makerzoid-robot-master-premium/kids-playing-with-pieces-with-tablet-instructions.png"
        imageAlt="Kids building with Makerzoid pieces following tablet instructions"
        title="Learn Together or Independently"
        body="Choose your learning style. The detailed paper manual guides step-by-step building with clear diagrams. Or use the free Makerzoid app for interactive video instructions. Most children can build independently from age 6 — the instructions are designed for success without adult help. But when you do sit down together, it's genuinely fun for parents too."
        layout="image-right"
        background="gray"
      />

      {/* Projects Section */}
      <ProjectShowcase
        title="47 Lessons. 3 Skill Levels."
        highlight="200+ robot models to build — from simple structures to fully programmable machines"
        subtitle="The curriculum progresses through three levels, each building on the last."
        columns={3}
        background="white"
        projects={[
          {
            name: "Basic Structures",
            description: "Start with foundational builds that teach balance, stability, and structural integrity.",
            concepts: "Structural design, spatial reasoning",
            image: "/images/products/makerzoid-robot-master-premium/projects/basic-structure.png",
          },
          {
            name: "Gear Systems",
            description: "Discover how gears transfer motion and create mechanical advantage in real robots.",
            concepts: "Gears, transmission, mechanical advantage",
            image: "/images/products/makerzoid-robot-master-premium/projects/gear-machines.png",
          },
          {
            name: "Walking Machines",
            description: "Build multi-legged walkers that move using motors and linkage mechanisms.",
            concepts: "Linkages, motion, dynamics",
            image: "/images/products/makerzoid-robot-master-premium/projects/walking-machines.png",
          },
          {
            name: "Line-Following Robot",
            description: "Program your robot to detect and follow a black line using its sensors.",
            concepts: "Sensors, loops, conditionals",
            image: "/images/products/makerzoid-robot-master-premium/projects/line-following-robot.png",
          },
          {
            name: "Obstacle Avoider",
            description: "Use distance sensors to detect obstacles and automatically navigate around them.",
            concepts: "Sensors, if/then logic, autonomous behaviour",
            image: "/images/products/makerzoid-robot-master-premium/projects/obstacle-avoider.png",
          },
          {
            name: "Remote Control Car",
            description: "Build a driveable car and control it wirelessly from your phone via Bluetooth.",
            concepts: "Bluetooth, motors, app control",
            image: "/images/products/makerzoid-robot-master-premium/projects/remote-control-car.png",
          },
        ]}
        moreText="Plus 41 more lessons — all included in the free Makerzoid app"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="What Our Community Has Built"
        subtitle="Real families, real robots — see what your child could create"
        background="white"
        images={[
          {
            src: "/images/products/makerzoid-robot-master-premium/two-kids-playing-together-building-and-with-app-on-phone.png",
            alt: "Two kids building together with Makerzoid and app on phone",
            label: "Building Together",
            description: "Collaborative fun for siblings and friends",
          },
          {
            src: "/images/products/makerzoid-robot-master-premium/crane-built-sitting-on-box-with-tablet-behind.png",
            alt: "Makerzoid crane build sitting on box with tablet behind",
            label: "Crane Build",
            description: "A fully functional crane — one of 200+ models",
          },
          {
            src: "/images/products/makerzoid-robot-master-premium/close-up-hand-holding-built-car.png",
            alt: "Close-up of hand holding a built Makerzoid car",
            label: "Remote Car",
            description: "Built and ready to drive via Bluetooth",
          },
          {
            src: "/images/products/makerzoid-robot-master-premium/build-car-on-box-with-app-phone.png",
            alt: "Makerzoid car build on box with app open on phone",
            label: "App Control",
            description: "Drive and program from your phone",
          },
          {
            src: "/images/products/makerzoid-robot-master-premium/car-on-box-with-tablet-app-open-behind.png",
            alt: "Makerzoid car on box with tablet app open behind",
            label: "Tablet Mode",
            description: "Use a tablet for a bigger screen experience",
          },
          {
            src: "/images/products/makerzoid-robot-master-premium/robot-and-crane-builds.jpg",
            alt: "Robot and crane builds made with Makerzoid",
            label: "Two Builds",
            description: "Mix and match parts across different models",
          },
          {
            src: "/images/products/makerzoid-robot-master-premium/box-open-on-floor-with-all-included-shown.jpg",
            alt: "Makerzoid box open on floor showing all included pieces",
            label: "Unboxed",
            description: "Everything laid out and ready to build",
          },
          {
            src: "/images/products/makerzoid-robot-master-premium/makerzoid-at-robotics-conference.png",
            alt: "Makerzoid at a robotics conference",
            label: "In the Wild",
            description: "Spotted at a local robotics event",
          },
        ]}
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="gray" />

      {/* FAQ Section */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "Does my child need prior coding or building experience?",
            answer:
              "Not at all. The 47 video lessons start from absolute basics and progress gradually. Level 1 focuses on simple structures before moving to motors and then programming. Most 6-year-olds can follow the instructions independently.",
          },
          {
            question: "What devices work with the Makerzoid app?",
            answer:
              "The free Makerzoid app works on iOS (version 9+), Android (version 5+), and any computer via lab.makerzoid.com. You'll need a smartphone, tablet, or computer for programming - the robot connects via Bluetooth.",
          },
          {
            question: "Is this compatible with LEGO?",
            answer:
              "Yes! Makerzoid blocks work with standard LEGO bricks and LEGO Technic pieces. Your child can combine existing LEGO collections with their Makerzoid robots for unlimited building possibilities.",
          },
          {
            question: "How long will the kit keep my child engaged?",
            answer:
              "With 200+ robot designs across three skill levels and 47 video lessons, most children spend months exploring. The open-ended nature means they can design original robots long after completing the courses.",
          },
          {
            question: "Is adult supervision required?",
            answer:
              "The kit is designed for independent learning. Clear instructions and video tutorials mean most children 6+ can build and code without help. Adults are welcome to join in, but it's not necessary.",
          },
          {
            question: "What's the difference between the Premium and Standard versions?",
            answer:
              "The Premium version includes 600+ blocks (vs 370 in Standard), supports 200+ robot models (vs 100+), has 47 video lessons (vs 23), and includes dual motors and sensors for more complex builds and programming.",
          },
        ]}
        background="white"
      />

      {/* What's Included */}
      <WhatsIncluded
        title="What's in the Box"
        items={[
          "600+ high-quality ABS building blocks",
          "Upgraded main controller unit",
          "2 Robot Master motors",
          "2 precision sensors",
          "Assorted gears and mechanical parts",
          "Storage box with sorting plate",
          "Parts list with block quantities",
          "Detailed paper instruction manual",
          "Access to Makerzoid APP with 47 video courses",
        ]}
        image="/images/products/makerzoid-robot-master-premium/whats-in-the-box.png"
        imageAlt="Makerzoid Robot Master Premium box contents laid out"
        background="gray"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Total Pieces", value: "600+ blocks" },
          { label: "Robot Models", value: "200+ designs" },
          { label: "Video Lessons", value: "47 courses (3 levels)" },
          { label: "Dimensions", value: "42 x 30 x 11 cm" },
          { label: "Weight", value: "1.7 kg" },
          { label: "Material", value: "ABS plastic (safe, non-toxic)" },
          { label: "Batteries", value: "2 x AA (not included)" },
          { label: "Connectivity", value: "Bluetooth" },
          { label: "Programming", value: "Scratch 3.0 / Blockly" },
          { label: "App Compatibility", value: "iOS 9+, Android 5+" },
          { label: "Web Platform", value: "lab.makerzoid.com" },
        ]}
        background="white"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started"
        subtitle="600+ blocks, 200+ designs, and 47 video lessons. The Makerzoid Robot Master Premium has everything your young engineer needs to start building and coding."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse More Robotics Kits"
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
      "Build and code over 200 robots with the Makerzoid Robot Master Premium. 600+ blocks, 47 video lessons, Scratch programming, and LEGO compatibility. Perfect for ages 6+.",
  };
}
