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
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "micro-bit-wearable-x-10";

export default async function MicroBitWearableX10Page() {
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
        tagline="Give every learner a wearable micro:bit, ready for class in seconds"
        highlights={[
          "Pack of 10, equips a full group simultaneously",
          "Official micro:bit Foundation product, compatible with V1 and V2",
          "No tools or soldering required, assembly instructions on the box",
          "Enables 30+ wearable coding activities including CreateAI gesture projects",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Add Wearables */}
      <NumberedSteps
        title="Why Add Wearables to Your Classroom?"
        subtitle="The micro:bit is already a powerful learning tool. Strap it to the wrist and suddenly every lesson becomes active, visible, and personally relevant to your learners."
        steps={[
          {
            title: "Code Meets the Real World",
            description:
              "When learners wear what they code, abstract concepts become tangible. A step counter on the wrist means the accelerometer is no longer theory, it's a lived experience.",
          },
          {
            title: "Built for Group Use",
            description:
              "Ten units in one pack means your whole group works simultaneously, with identical setups and no waiting for shared equipment. Cost-effective at classroom scale.",
          },
          {
            title: "Extends What You Already Have",
            description:
              "This accessory unlocks wearable projects without replacing your existing micro:bits. No new platform to learn, just more of what your learners can do with their boards.",
          },
        ]}
        background="navy-card"
      />

      {/* Classroom Use ImageTextBlock */}
      <ImageTextBlock
        image="/images/products/micro-bit-wearable-x-10/child-looking-at-microbit-strapped-to-arm.jpg"
        imageAlt="Learner examining their BBC micro:bit strapped to their wrist"
        title="From the Desk to the Wrist"
        body="The micro:bit wearable turns any coding lesson into a physical computing experience. Learners program a step counter, strap it on, and test it by walking around the room. They fix their code, run it again, and understand, not because they were told, but because they felt it. That kind of learning sticks. The official TPE holder keeps the board and battery pack secure during movement, so lessons stay focused rather than troubleshooting fallen boards."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="What Makes This Kit Classroom-Ready"
        subtitle="Designed for group use from the ground up, not a consumer product repurposed for schools."
        features={[
          {
            icon: "brain",
            title: "10 Units Per Pack",
            description:
              "Equip a full group simultaneously. Every learner gets identical equipment, making group activities and comparisons straightforward.",
          },
          {
            icon: "badget-check",
            title: "Official BBC micro:bit Product",
            description:
              "Manufactured by the Micro:bit Educational Foundation, the same organisation behind the board itself. Maximum compatibility guaranteed.",
          },
          {
            icon: "puzzle",
            title: "Compatible with All Projects",
            description:
              "Works with every micro:bit project, from beginner step counters to advanced CreateAI gesture recognition and IoT activities.",
          },
          {
            icon: "tools",
            title: "No Setup Required",
            description:
              "Assembly instructions are printed on the box. No tools, no soldering, no pre-class preparation beyond pairing with micro:bits.",
          },
          {
            icon: "star",
            title: "Durable and Reusable",
            description:
              "TPE rubber holder and hook-and-loop strap withstand repeated classroom use. Suitable for years of lessons across multiple terms.",
          },
          {
            icon: "bluetooth",
            title: "V1 and V2 Compatible",
            description:
              "Works with both the original micro:bit and the newer V2 and V2.2 boards. No hardware upgrade needed to use these in your classroom.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Movement Learning ImageTextBlock */}
      <ImageTextBlock
        image="/images/products/micro-bit-wearable-x-10/kids-running-with-strapped-microbit.jpg"
        imageAlt="Children running in a group with BBC micro:bit wearables strapped to their wrists"
        title="Movement-Based Learning That Works Cross-Curricular"
        body="Wearable micro:bit activities connect naturally to science, health, and technology learning areas. Learners build fitness trackers tied to health goals, walking-for-water step counters linked to global citizenship, and gesture controllers that demonstrate Newton's laws. Research published in the Journal of Science Education and Technology confirms that wearable STEM projects are particularly effective at improving attitudes toward computing, especially among female learners, because they blend personal relevance with technical challenge."
        layout="image-right"
        background="white"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="Learners wearing what they code, from fitness trackers to gesture controllers."
        images={[
          {
            src: "/images/products/micro-bit-wearable-x-10/kids-in-circle-with-straps-on-wrists.jpeg",
            alt: "Group of children in a circle each wearing a micro:bit wearable strap on their wrists",
          },
          {
            src: "/images/products/micro-bit-wearable-x-10/kid-dancing-infront-of-projector-screen.jpg",
            alt: "Child dancing in front of a projector screen with a micro:bit wearable on their wrist",
          },
          {
            src: "/images/products/micro-bit-wearable-x-10/kid-pointing-at-screen-with-strap-on-wrist.jpg",
            alt: "Child pointing at a screen with a micro:bit wearable strapped to their wrist",
          },
          {
            src: "/images/products/micro-bit-wearable-x-10/hands-holding-microbit-with-strap-attached.jpg",
            alt: "Hands holding a BBC micro:bit with the wearable strap attached",
          },
          {
            src: "/images/products/micro-bit-wearable-x-10/hands-clapping-with-strapped-on-microbit-with-soudnwaves.webp",
            alt: "Hands clapping with a micro:bit wearable strapped on, showing sound wave animation on the LED display",
          },
          {
            src: "/images/products/micro-bit-wearable-x-10/microbit-wearable-on-arm.jpg",
            alt: "BBC micro:bit wearable fitted securely on an arm",
          },
          {
            src: "/images/products/micro-bit-wearable-x-10/hand-holding-micro-bit-with-strap-attached-infront-of-box.jpg",
            alt: "Hand holding a micro:bit with the wearable strap attached, box visible in background",
          },
          {
            src: "/images/products/micro-bit-wearable-x-10/microbit-on-arm.jpg",
            alt: "BBC micro:bit mounted on an arm using the official wearable strap",
          },
        ]}
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* FAQ */}
      <ProductFAQ
        title="Educator Questions"
        faqs={[
          {
            question: "Does this cover skills from the national curriculum?",
            answer:
              "The micro:bit covers physical computing, data handling, and computational thinking, skills that feature prominently in South African curricula across Technology, Natural Sciences, and Life Orientation. Learners work with real sensor data, measurement, and design iteration. The micro:bit platform's official lesson library includes activities linked to STEM curriculum standards, suitable for Grades 4 through 12. However, we don't provide a formal CAPS mapping document for this product.",
          },
          {
            question: "How many learners can use this pack simultaneously?",
            answer:
              "The pack of 10 equips 10 learners simultaneously, ideal for a group or half-class rotation. For full-class use of 30 learners, three packs are recommended. Each learner needs their own micro:bit board and battery pack (sold separately), paired with one wearable unit from this pack.",
          },
          {
            question: "Do I need a STEM background to use this in my classroom?",
            answer:
              "Not at all. The wearable itself requires no technical setup, learners simply slot their micro:bit into the TPE holder and fasten the strap. Coding activities come from the free micro:bit project library at microbit.org, where lessons are written with educators in mind, including step-by-step guides and learning objectives. No STEM background is required to run introductory wearable lessons.",
          },
          {
            question: "Are the micro:bits included?",
            answer:
              "No, this pack contains only the wearable holders and straps. BBC micro:bit boards and battery packs are sold separately. This is an accessory designed to extend micro:bit kits your school may already have, or to pair with new BBC micro:bit boards when purchasing for the first time.",
          },
          {
            question: "How durable are these for repeated classroom use?",
            answer:
              "Both components are built for classroom durability. The TPE (thermoplastic elastomer) holder is a flexible, resilient rubber that securely grips without cracking or deforming over repeated use. The hook-and-loop strap is the same material used in school-grade sporting equipment. The Micro:bit Educational Foundation designed this accessory for group and institutional use, not single-use consumer applications.",
          },
          {
            question: "What preparation is needed before a lesson?",
            answer:
              "Minimal. Assemble each unit by sliding the micro:bit and battery pack into the holder and threading the strap, instructions are on the box and take under a minute per unit. If your micro:bits are already charged and programmed, learners can be wearing and testing their code within the first five minutes of class.",
          },
          {
            question: "Is bulk or school pricing available?",
            answer:
              "Yes, CREATESPACE offers school and education pricing for multi-pack orders. Contact us through our Education section for a quote tailored to your school's needs.",
          },
        ]}
        background="gray"
      />

      {/* What's Included */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/micro-bit-wearable-x-10/whats-in-the-box.jpeg"
        imageAlt="BBC micro:bit Wearable x 10 box contents laid out"
        items={[
          "10× Flexible TPE micro:bit holder",
          "10× Adjustable hook-and-loop wearable strap",
          "Assembly instructions (printed on box)",
          "Note: BBC micro:bit boards, battery packs, and batteries are sold separately",
        ]}
        background="white"
      />

      {/* CTA */}
      <CallToAction
        title="Equip Your Classroom for Wearable Coding"
        subtitle="Trusted by schools and coding clubs across South Africa."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse Classroom Kits"
        secondaryHref="/education/classroom-kits"
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
      "Official BBC micro:bit wearable pack of 10. Enables wearable coding activities for your classroom. Compatible with all micro:bit boards, no tools required.",
    alternates: {
      canonical: "/product/micro-bit-wearable-x-10",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
