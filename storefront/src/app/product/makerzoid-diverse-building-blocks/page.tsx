import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  NumberedSteps,
  SkillTags,
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
  ProductTrackingProvider,
} from "@/components/product-sections";


const PRODUCT_HANDLE = "makerzoid-diverse-building-blocks";

export default async function MakerzoidDiverseBuildingBlocksPage() {
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
        tagline="100+ models, endless builds — no batteries, no coding, just imagination"
        highlights={[
          "100+ official models to build and rebuild",
          "370+ pieces in a single versatile set",
          "No coding or batteries needed — pure hands-on building",
          "Free 3D guidance app for independent building",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
        <QuickInfoBadges product={product} />

      {/* Why Diverse Building Blocks */}
        <NumberedSteps
        title="Why Diverse Building Blocks?"
        subtitle="Most STEM toys teach one thing. This set teaches spatial reasoning, physics, and engineering — all through the joy of building."
        steps={[
          {
            title: "100+ Models in One Box",
            description:
              "Cars, aircraft, Star Wars favourites, and the new Dancing Man series — your child can build something new every single time they open the box.",
          },
          {
            title: "No Batteries, No Screens",
            description:
              "Purely physical, mechanical construction. When models move, it's because gravity and gears made them — a powerful lesson in real physics.",
          },
          {
            title: "Built to Share",
            description:
              "With 370+ pieces, there's enough for siblings or friends to build together. Older children naturally guide younger ones — everyone learns.",
          },
        ]}
        background="navy-card"
      />

      {/* Video */}
        <VideoEmbed
        url="https://www.youtube.com/watch?v=sCKREXeJqg8"
        title="See the Makerzoid Diverse Building Blocks in Action"
        background="gray"
      />

      {/* Lifestyle: close-up build */}
        <ImageTextBlock
        image="/images/products/makerzoid-diverse-building-blocks/close-up-of-robot-build-with-girl-in-background.jpeg"
        imageAlt="Close-up of a completed Makerzoid build with a girl in the background"
        title="Real Builds, Real Pride"
        body="There's something special about a child standing back and saying 'I built that.' The Diverse Building Blocks set is designed with real mechanical detail — proper gears, axles, and moving joints — so finished models look genuinely impressive. When your child completes their first helicopter or dancing figure, it's not just a toy they've made. It's proof that they can figure things out."
        layout="image-left"
        background="white"
      />

      {/* Skill Tags */}
        <SkillTags
        title="Skills Developed"
        tags={[
          "Mechanical Engineering",
          "Mathematics",
          "Problem Solving",
          "Creativity",
        ]}
        background="gray"
      />

      {/* Feature Grid */}
        <FeatureGrid
        title="What Makes It Special"
        subtitle="Everything your child needs to start building — and keep building — for months."
        features={[
          {
            icon: "puzzle",
            title: "100+ Official Models",
            description:
              "From beginner-friendly vehicles to complex moving figures — the variety keeps building exciting as skills grow.",
          },
          {
            icon: "tools",
            title: "370+ Quality Pieces",
            description:
              "Cubes, gears, axles, and connectors made from smooth-edged, non-toxic ABS plastic built to last through years of play.",
          },
          {
            icon: "shield",
            title: "No Coding or Batteries",
            description:
              "Accessible from the start. Your child builds, assembles, and watches mechanics come alive — no tech knowledge needed.",
          },
          {
            icon: "app",
            title: "Free 3D Guidance App",
            description:
              "The Makerzoid app (iOS & Android) offers step-by-step 3D instructions so children can build independently with confidence.",
          },
          {
            icon: "globe",
            title: "LEGO Compatible",
            description:
              "Works with LEGO-compatible sets your family may already own — extending play possibilities beyond the 100+ official models.",
          },
          {
            icon: "brain",
            title: "Spatial & Physics Skills",
            description:
              "Research shows block play is one of the strongest predictors of early maths performance. Every build is learning in disguise.",
          },
        ]}
        columns={3}
        background="white"
      />

      {/* Lifestyle: girl using app guidance */}
        <ImageTextBlock
        image="/images/products/makerzoid-diverse-building-blocks/girl-with-blocks-looking-at-tablet-screen.jpg"
        imageAlt="Girl at a desk following 3D building instructions on a tablet screen with Makerzoid blocks in front of her"
        title="Build Independently with the Free App"
        body="The free Makerzoid app (iOS & Android) turns building into a guided adventure. Step-by-step 3D instructions walk your child through each model at their own pace — no parent hovering required. Children who prefer paper can use the included instruction guide instead. Either way, they're building confidently from the very first model."
        layout="image-right"
        background="gray"
      />

      {/* Model Showcase */}
        <ProjectShowcase
        title="What They'll Build"
        highlight="100+ official mechanical models across 4 themed series"
        subtitle="Start with simpler builds and work up to complex moving models — there's always a next challenge."
        projects={[
          {
            name: "Helicopter",
            description:
              "Build a detailed helicopter with spinning rotors and a characterful face.",
            concepts: "Balance, structural symmetry, spatial reasoning",
            image: "/images/products/makerzoid-diverse-building-blocks/projects/project-1.png",
          },
          {
            name: "Dancing Man",
            description:
              "An articulated figure with swinging arms that moves via gravity and kinetic energy.",
            concepts: "Gravity, joints & linkages, mechanical motion",
            image: "/images/products/makerzoid-diverse-building-blocks/projects/project-2.png",
          },
          {
            name: "Carousel",
            description:
              "A spinning merry-go-round structure with hanging elements — satisfying to build and watch move.",
            concepts: "Rotational mechanics, load distribution",
            image: "/images/products/makerzoid-diverse-building-blocks/projects/project-3.png",
          },
          {
            name: "Chef Figure",
            description:
              "A playful figure build from the Dancing Man series with articulated posing.",
            concepts: "Character assembly, fine motor coordination",
            image: "/images/products/makerzoid-diverse-building-blocks/projects/project-4.png",
          },
          {
            name: "Crane",
            description:
              "A mechanical crane with a working arm that demonstrates leverage and load principles.",
            concepts: "Levers, load distribution, structural engineering",
            image: "/images/products/makerzoid-diverse-building-blocks/projects/project-5.png",
          },
          {
            name: "Kicking Dancer",
            description:
              "A dynamic dancing figure mid-kick — a more complex moving build for advanced builders.",
            concepts: "Balance, mechanical articulation, gravity",
            image: "/images/products/makerzoid-diverse-building-blocks/projects/project-6.png",
          },
        ]}
        moreText="Plus 90+ more models — vehicles, aircraft, Star Wars designs, and more"
        background="white"
      />

      {/* Customer Showcase */}
        <CustomerShowcase
        title="See It in Action"
        subtitle="Real builds and real moments from the Makerzoid community."
        images={[
          {
            src: "/images/products/makerzoid-diverse-building-blocks/hands-clicking-on-tablet-screen-with-box-in-front.jpg",
            alt: "Child using the Makerzoid app on a tablet with the product box in front",
            label: "App Guided",
          },
          {
            src: "/images/products/makerzoid-diverse-building-blocks/box-on-pink-background-with-parts-around-it.jpg",
            alt: "Makerzoid box on a pink background with building pieces arranged around it",
            label: "The Kit",
          },
          {
            src: "/images/products/makerzoid-diverse-building-blocks/hand-holding-blocks-above-box-filled-with-blocks.jpg",
            alt: "Hand holding building blocks above a box filled with more pieces",
            label: "The Pieces",
          },
          {
            src: "/images/products/makerzoid-diverse-building-blocks/hands-holding-a-robot-build.jpg",
            alt: "Two hands holding a completed robot build",
            label: "First Build",
          },
          {
            src: "/images/products/makerzoid-diverse-building-blocks/dancing-man.jpg",
            alt: "Completed Dancing Man model build",
            label: "Dancing Man",
          },
          {
            src: "/images/products/makerzoid-diverse-building-blocks/hand-turning-handle-and-lifting-parts.jpg",
            alt: "Hand turning a handle mechanism on a Makerzoid build, demonstrating moving parts",
            label: "Moving Parts",
          },
          {
            src: "/images/products/makerzoid-diverse-building-blocks/robot-man-in-car-driving-past-tablet-screen.jpg",
            alt: "Robot man figure in a car build next to a tablet showing the Makerzoid app",
            label: "In Action",
          },
          {
            src: "/images/products/makerzoid-diverse-building-blocks/display-of-many-makerzoid-robots-at-conference.jpg",
            alt: "Display of many different Makerzoid builds at a conference or showcase",
            label: "100+ Models",
          },
        ]}
        background="gray"
      />

      {/* Reviews */}
        <ProductReviews productId={product.id} background="white" />

      {/* FAQ */}
        <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "What ages is this suitable for?",
            answer:
              "The set is ideal for children aged 4 to 8. Younger children (4–5) will enjoy it most with a parent building alongside them, while children from age 6 can typically follow the app and paper instructions independently.",
          },
          {
            question: "Does my child need any prior experience?",
            answer:
              "Not at all. The Diverse Building Blocks set is designed for complete beginners. Instructions start with simple models and progress to more complex builds at your child's own pace — no building experience needed.",
          },
          {
            question: "Do we need a phone or tablet to use it?",
            answer:
              "No — the set includes paper instructions so your child can build straight out of the box without any device. The free Makerzoid app (iOS & Android) adds 3D step-by-step guidance and is a great option for children who prefer visual instructions.",
          },
          {
            question: "Are batteries required?",
            answer:
              "No batteries are required at any point. This is a purely mechanical construction set — models move through gravity, gears, and physical mechanics. It's screen-free and battery-free building.",
          },
          {
            question: "Is it compatible with LEGO?",
            answer:
              "Yes — the pieces are LEGO-compatible, meaning they connect with most standard LEGO bricks your family may already own. This opens up even more building possibilities beyond the 100+ official models.",
          },
          {
            question: "What happens once they've built all 100+ models?",
            answer:
              "The real fun often starts here. After completing the official models, children are naturally inspired to invent their own creations using all 370+ pieces. The set can be rebuilt endlessly — models are taken apart and reassembled, keeping it fresh for months.",
          },
          {
            question: "Is it safe for young children?",
            answer:
              "Yes. Pieces are made from high-quality, non-toxic ABS plastic with smooth edges — the same material standard used in premium building block sets. The set carries a 12-month manufacturer warranty.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Box */}
        <WhatsIncluded
        title="What's in the Box"
        image="/images/products/makerzoid-diverse-building-blocks/whats-in-the-box.jpg"
        imageAlt="Makerzoid Diverse Building Blocks box surrounded by completed models including crane, helicopter, dancer and more"
        items={[
          "370+ ABS plastic building pieces (cubes, gears, axles, connectors)",
          "Spacious storage box (organises all pieces neatly)",
          "Paper instruction guide with official models",
          "Free Makerzoid app access — iOS & Android (3D step-by-step instructions)",
        ]}
        background="white"
      />

      {/* Specifications */}
        <Specifications
        title="Technical Details"
        specs={[
          { label: "Total Pieces", value: "370+" },
          { label: "Number of Models", value: "100+" },
          { label: "Recommended Age", value: "4–8 years" },
          { label: "Material", value: "Non-toxic ABS plastic" },
          { label: "Batteries Required", value: "No" },
          { label: "Coding Required", value: "No" },
          { label: "LEGO Compatible", value: "Yes" },
          { label: "App", value: "Free Makerzoid app — iOS & Android" },
          { label: "Box Dimensions", value: "32 × 22 × 6 cm" },
          { label: "Weight", value: "1 kg" },
          { label: "SKU", value: "MKZ-BK-DB" },
          { label: "Warranty", value: "12 months" },
        ]}
        background="gray"
      />

      {/* Final CTA */}
        <CallToAction
        title="Start Building"
        subtitle="100+ models, 370+ pieces, and limitless free-build possibilities — all in one box."
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
      "Build 100+ mechanical models with 370+ pieces. No batteries, no coding — pure hands-on STEM fun for ages 4–8. Free 3D guidance app included.",
    alternates: {
      canonical: "/product/makerzoid-diverse-building-blocks",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
