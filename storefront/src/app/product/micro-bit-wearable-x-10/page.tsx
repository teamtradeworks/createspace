import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
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
        tagline="Strap a micro:bit to each learner's wrist in about a minute"
        highlights={[
          "10 holders and straps for a group of 10 learners",
          "Made by the Micro:bit Educational Foundation and fits V1 and V2 boards",
          "No tools or soldering, and the assembly steps are printed on the box",
          "Opens up 30+ wearable coding activities, including CreateAI gesture projects",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Classroom Use ImageTextBlock */}
      <ImageTextBlock
        image="/images/products/micro-bit-wearable-x-10/child-looking-at-microbit-strapped-to-arm.jpg"
        imageAlt="Learner examining their BBC micro:bit strapped to their wrist"
        title="From the Desk to the Wrist"
        body="With the wearable, learners can take their code off the desk. They program a step counter, strap it on and walk around the room to test it. If the count is wrong, they fix the code and walk again, and they can feel whether it worked. The rubber holder keeps the board and battery pack in place while they move, so you spend the lesson on code instead of picking up dropped boards."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="Why This Pack Suits a Classroom"
        subtitle="The Micro:bit Educational Foundation designed these holders for groups of learners."
        features={[
          {
            icon: "brain",
            title: "10 Units Per Pack",
            description:
              "A whole group can wear one at the same time. Because everyone has the same holder, it's easy to compare results across the group.",
          },
          {
            icon: "badget-check",
            title: "Official BBC micro:bit Product",
            description:
              "Made by the Micro:bit Educational Foundation, the organisation that makes the board, so the fit is exact.",
          },
          {
            icon: "puzzle",
            title: "Compatible with All Projects",
            description:
              "Use it with any micro:bit project, whether that's a first step counter or CreateAI gesture recognition and IoT activities.",
          },
          {
            icon: "tools",
            title: "No Setup Required",
            description:
              "The assembly steps are printed on the box. You don't need tools or soldering, and the only prep is putting a micro:bit in each holder.",
          },
          {
            icon: "star",
            title: "Durable and Reusable",
            description:
              "The TPE rubber holder and hook-and-loop strap hold up to regular classroom use and can be reused term after term.",
          },
          {
            icon: "bluetooth",
            title: "V1 and V2 Compatible",
            description:
              "Fits the original micro:bit as well as the newer V2 and V2.2 boards, so you can use the boards your school already has.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Movement Learning ImageTextBlock */}
      <ImageTextBlock
        image="/images/products/micro-bit-wearable-x-10/kids-running-with-strapped-microbit.jpg"
        imageAlt="Children running in a group with BBC micro:bit wearables strapped to their wrists"
        title="Wearable Projects for Science, Health and Technology"
        body="Wearable activities fit into science, health and technology lessons. Learners build fitness trackers to go with health goals, step counters for a walking-for-water project on global citizenship, and gesture controllers that show Newton's laws at work. A study in the Journal of Science Education and Technology found that wearable STEM projects improve attitudes toward computing, especially among girls, because the projects are personal as well as technical."
        layout="image-right"
        background="white"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="Learners wearing the fitness trackers and gesture controllers they coded."
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
              "The micro:bit covers physical computing, data handling and computational thinking. These skills come up in South African Technology, Natural Sciences and Life Orientation. Learners collect real sensor data, take measurements and improve their designs. The official micro:bit lesson library has activities linked to STEM curriculum standards for Grades 4 to 12. We don't provide a formal CAPS mapping document for this product, though.",
          },
          {
            question: "How many learners can use this pack at once?",
            answer:
              "Ten learners can use it at once, which works for a group or for half a class at a time. For a class of 30, we recommend three packs. Each learner also needs a micro:bit board and battery pack (sold separately) to go into their holder.",
          },
          {
            question: "Do I need a STEM background to use this in my classroom?",
            answer:
              "No. The wearable needs no technical setup: learners slot their micro:bit into the holder and fasten the strap. The coding activities come from the free project library at microbit.org, where the lessons are written for teachers and include step-by-step guides and learning objectives. You can run the introductory wearable lessons without any STEM background.",
          },
          {
            question: "Are the micro:bits included?",
            answer:
              "No. The pack has only the holders and straps, and BBC micro:bit boards and battery packs are sold separately. It's an add-on for micro:bits your school already has, or you can order it with new boards.",
          },
          {
            question: "How durable are these for repeated classroom use?",
            answer:
              "Both parts are made for classroom use. The holder is TPE (thermoplastic elastomer), a flexible rubber that grips the board and doesn't crack or lose its shape with repeated use. The hook-and-loop strap is the same material used in school-grade sporting equipment. The Micro:bit Educational Foundation designed the wearable for schools and groups.",
          },
          {
            question: "What preparation is needed before a lesson?",
            answer:
              "Very little. To assemble a unit, slide the micro:bit and battery pack into the holder and thread the strap through. The steps are on the box, and each unit takes less than a minute. If your micro:bits are charged and programmed before class, learners can be wearing them and testing their code within five minutes.",
          },
          {
            question: "Is bulk or school pricing available?",
            answer:
              "Yes. CREATESPACE offers school pricing when you order several packs. Contact us through our Education section and we'll put together a quote for your school.",
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
        title="Get Your Class Coding Wearables"
        subtitle="Ten holders and straps for the micro:bits your school already has."
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
      "Pack of 10 official BBC micro:bit wearables for classroom coding projects. Fits every micro:bit board, and you don't need tools to put them together.",
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
