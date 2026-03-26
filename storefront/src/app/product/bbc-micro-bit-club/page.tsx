import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  NumberedSteps,
  VideoEmbed,
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

const PRODUCT_HANDLE = "bbc-micro-bit-club";

export default async function BbcMicroBitClubPage() {
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
        tagline="Get your entire group coding from the very first lesson"
        highlights={[
          "10 complete kits in one box — one board per learner, no sharing",
          "No software installs — works from any web browser on any device",
          "Free lesson plans and teacher resources from microbit.org",
          "Reusable hardware across multiple groups, terms, and years",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why micro:bit for Your Classroom */}
      <NumberedSteps
        title="Why Choose micro:bit for Your Classroom?"
        subtitle="The world's most widely adopted physical computing platform — used in 60+ countries by over 20 million learners."
        steps={[
          {
            title: "Built for Group Work",
            description:
              "10 independent boards mean every learner codes simultaneously — no rotation, no waiting. Multiplayer radio activities and collaborative experiments are only possible when the whole group has boards at once.",
          },
          {
            title: "Zero Barriers to Entry",
            description:
              "No software installation. No STEM background required. Learners code from any web browser using MakeCode's intuitive drag-and-drop editor — your group can be up and running in under five minutes.",
          },
          {
            title: "A Platform, Not Just a Product",
            description:
              "The Micro:bit Educational Foundation provides continuously-updated free lesson plans, curriculum resources, assessment tools, and teacher training. The value of this kit grows over time — at no additional cost.",
          },
        ]}
        background="navy-card"
      />

      {/* Video Section */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=Wuza5WXiMkc"
        title="See the BBC micro:bit Club in Action"
        background="gray"
      />

      {/* Activities Section */}
      <ImageTextBlock
        image="/images/products/bbc-micro-bit-club/child-holding-up-microbit-to-camera.jpg"
        imageAlt="Child holding up a micro:bit board to the camera, enthusiastically showing their project"
        title="60+ Activities Across Every Learning Area"
        body="The micro:bit's free online project library spans computing, mathematics, science, music, and design. From first LED animations to data-logging science experiments and multiplayer wireless challenges, there is a structured activity for every ability level. The Micro:bit Educational Foundation's Make it: Code it series provides ready-to-teach lessons with defined learning objectives — no lesson planning from scratch required."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="Classroom-Ready from Day One"
        subtitle="Everything an educator needs to run a successful coding session — no specialist equipment, no prior experience required."
        features={[
          {
            icon: "brain",
            title: "10 Simultaneous Learners",
            description:
              "Every board is fully self-contained with cable and batteries. All 10 learners code at the same time — no rotation, no sharing.",
          },
          {
            icon: "cross-device",
            title: "Works from Any Browser",
            description:
              "MakeCode and MicroPython run entirely online. No app installs, no software licences — just open a browser on Windows, Mac, Chromebook, or tablet.",
          },
          {
            icon: "book",
            title: "Free Lesson Plans",
            description:
              "microbit.org offers hundreds of free, structured lesson plans with clear learning objectives, activity sheets, and assessment guidance.",
          },
          {
            icon: "shield",
            title: "No Soldering Required",
            description:
              "Crocodile clips connect accessories safely to the edge connector. No tools, no sharp components — completely safe for any school environment.",
          },
          {
            icon: "tools",
            title: "Reusable Term After Term",
            description:
              "Robust hardware with no moving parts. One Club pack serves multiple cohorts across multiple years — low total cost of ownership per learner.",
          },
          {
            icon: "wifi",
            title: "Built-in Wireless for Group Work",
            description:
              "Bluetooth 5.0 and 2.4 GHz radio are built into every board. Run class polls, multiplayer games, and collaborative experiments without extra hardware.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Research-Backed Section */}
      <ImageTextBlock
        image="/images/products/bbc-micro-bit-club/two-girls-holding-microbits-talking-together.jpg"
        imageAlt="Two girls holding micro:bit boards and talking together during a coding lesson"
        title="Research-Backed Learning Outcomes"
        body="Research from the Micro:bit Educational Foundation shows that 80% of learners taught with micro:bit agree computing is easier to understand than other subjects, versus just 52% of those who hadn't used it. After lessons with micro:bit, 80% of girls agreed coding is a useful skill to learn. And 84% of educators reported increased confidence in teaching computing after using micro:bit resources. These are measurable outcomes documented across thousands of classrooms worldwide."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Activities Your Learners Will Complete"
        highlight="60+ free activities spanning computing, science, music, and design — with defined learning objectives for every lesson"
        subtitle="Activities progress from first-time coding tutorials to advanced wireless and data-science projects, making the Club pack suitable for mixed-ability groups across Grades 4–12."
        projects={[
          {
            name: "Compass",
            description:
              "Build a working compass that points north using the built-in magnetometer",
            concepts: "Magnetometer, conditionals, compass bearing",
            image: "/images/products/bbc-micro-bit-club/projects/compass.png",
          },
          {
            name: "Graphical Dice",
            description: "Shake the board to roll a random number with a graphical display",
            concepts: "Accelerometer input, random numbers, LED graphics",
            image: "/images/products/bbc-micro-bit-club/projects/graphical-dice.png",
          },
          {
            name: "Magic 8 Ball",
            description: "Ask a question, shake the board, and get a random answer",
            concepts: "Accelerometer, random numbers, strings",
            image: "/images/products/bbc-micro-bit-club/projects/magic-8-ball.png",
          },
          {
            name: "Sunlight Sensor",
            description: "Measure ambient light levels using the built-in light sensor",
            concepts: "Light sensor, analog input, data display",
            image: "/images/products/bbc-micro-bit-club/projects/sunlight-sensor.png",
          },
          {
            name: "Tell a Secret",
            description: "Send a secret message wirelessly to a classmate's board",
            concepts: "2.4 GHz radio, strings, wireless communication",
            image: "/images/products/bbc-micro-bit-club/projects/tell-a-secret.png",
          },
          {
            name: "Thermometer",
            description: "Read and display the room temperature using the onboard sensor",
            concepts: "Temperature sensor, variables, data display",
            image: "/images/products/bbc-micro-bit-club/projects/thermometer.png",
          },
        ]}
        moreText="Plus 40+ more activities at microbit.org — beginner tutorials, science experiments, music projects, wearables, and advanced AI/machine learning with CreateAI"
        background="gray"
      />

      {/* Learners in Action */}
      <CustomerShowcase
        title="Learners in Action"
        subtitle="How micro:bit looks in real classrooms and coding clubs."
        images={[
          {
            src: "/images/products/bbc-micro-bit-club/kids-in-class-at-computers-with-microbit.jpg",
            alt: "Learners at computers in a classroom using micro:bit",
          },
          {
            src: "/images/products/bbc-micro-bit-club/two-kids-helping-each-other-makecode.jpg",
            alt: "Two learners helping each other with MakeCode on a micro:bit",
          },
          {
            src: "/images/products/bbc-micro-bit-club/teacher-pointing-to-screen.jpg",
            alt: "Teacher pointing to a screen during a micro:bit coding lesson",
          },
          {
            src: "/images/products/bbc-micro-bit-club/kids-looking-at-makecode-screen.jpg",
            alt: "Learners looking at the MakeCode screen while holding their micro:bit boards",
          },
          {
            src: "/images/products/bbc-micro-bit-club/child-working-on-computer-on-microbit-app.jpg",
            alt: "Child working on a computer with the micro:bit coding application",
          },
          {
            src: "/images/products/bbc-micro-bit-club/girls-hand-holding-microbit-infront-of-computer.jpg",
            alt: "Girl holding a micro:bit board in front of a computer screen",
          },
          {
            src: "/images/products/bbc-micro-bit-club/holding-microbit-with-battery-holder.jpeg",
            alt: "Learner holding a micro:bit with battery holder attached",
          },
          {
            src: "/images/products/bbc-micro-bit-club/kids-on-computers-python-and-block-coding.jpg",
            alt: "Learners on computers exploring Python and block-based programming",
          },
        ]}
        background="gray"
      />

      {/* Product Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* FAQ Section */}
      <ProductFAQ
        title="Educator FAQs"
        faqs={[
          {
            question: "Does this align with the CAPS curriculum?",
            answer:
              "The micro:bit supports CAPS Technology, Natural Sciences, and Mathematics learning areas across Grades 4–12. Coding, algorithms, physical computing, and data handling align directly with CAPS Technology curriculum goals. The free lesson plans on microbit.org include structured activities with defined learning outcomes that can be mapped to specific CAPS content areas.",
          },
          {
            question: "How many learners can use the kit at the same time?",
            answer:
              "All 10 boards can be used simultaneously — every learner has their own board, cable, and batteries. This eliminates rotation and allows the entire group to progress together at the same pace.",
          },
          {
            question: "Do I need a coding or STEM background to teach with this?",
            answer:
              "No. The Micro:bit Educational Foundation provides free, structured lesson plans with step-by-step guidance for educators at all experience levels. MakeCode's drag-and-drop editor is intuitive for first-time coders — many educators find they learn alongside their learners.",
          },
          {
            question: "What equipment does the school need to provide?",
            answer:
              "Each learner needs a device with a modern web browser — a computer, tablet, or Chromebook. No additional tools, software installations, or specialist equipment are needed. The kit includes boards, cables, and batteries — everything else is provided.",
          },
          {
            question: "How durable are the boards for repeated classroom use?",
            answer:
              "The micro:bit V2 is purpose-built for educational environments. The boards have no moving parts, no fragile components, and a reinforced edge connector for repeated use. With proper storage, one Club pack will comfortably serve multiple cohorts over several years.",
          },
          {
            question: "How much preparation time does a lesson require?",
            answer:
              "Very little. Learners can complete their first interactive project in a single 45-minute period. Lesson plans on microbit.org are ready to use, with defined objectives and activity sheets — no lesson planning from scratch required.",
          },
          {
            question: "Is school or bulk pricing available?",
            answer:
              "Yes. Contact CREATESPACE directly for school and institutional pricing on multiple Club packs. We work with schools and coding clubs across South Africa.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Kit */}
      <WhatsIncluded
        title="What's in the Kit"
        image="/images/products/bbc-micro-bit-club/whats-in-the-box.jpeg"
        imageAlt="BBC micro:bit Club pack contents including 10 boards, cables, and battery holders laid out"
        items={[
          "10× BBC micro:bit V2 board (assorted colours)",
          "10× micro-USB cable (for programming and power)",
          "10× AAA battery holder",
          "20× AAA batteries (2 per board, included)",
          "10× Quick start user guide",
          "Safety leaflets",
          "Cardboard battery pack holders",
          "Stickers",
          "Free: 60+ structured activities at microbit.org",
          "Free: teacher lesson plans, assessment guides, and professional development from the Micro:bit Educational Foundation",
        ]}
        background="white"
      />

      {/* Technical Details */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Processor", value: "Nordic nRF52833 ARM Cortex-M4F at 64 MHz" },
          { label: "Flash Memory", value: "512 KB" },
          { label: "RAM", value: "128 KB" },
          { label: "Display", value: "5×5 LED matrix (25 programmable LEDs)" },
          { label: "Inputs", value: "2 programmable buttons + touch-sensitive logo" },
          { label: "Audio", value: "Built-in speaker and MEMS microphone" },
          {
            label: "Sensors",
            value: "Accelerometer, magnetometer (compass), temperature, light level",
          },
          { label: "Wireless", value: "Bluetooth 5.0 + 2.4 GHz radio" },
          { label: "Edge Connector", value: "20-pin interface + 5 ring I/O pads" },
          { label: "USB", value: "Micro-USB (programming and power)" },
          { label: "Dimensions", value: "4 cm × 5 cm per board" },
          { label: "Coding Platforms", value: "MakeCode, MicroPython, JavaScript, Scratch" },
          {
            label: "Compatible Devices",
            value: "Windows, Mac, Chromebook, Linux, iOS, Android",
          },
          { label: "Kit Contents", value: "10 complete Go bundles" },
        ]}
        background="gray"
      />

      {/* Final CTA */}
      <CallToAction
        title="Equip Your Classroom with micro:bit"
        subtitle="Trusted by educators in 60+ countries. One Club pack gets your entire group coding from day one."
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
      "10-board classroom coding kit for ages 8+. Every learner gets their own micro:bit. Free lesson plans, no soldering, works from any browser.",
    alternates: {
      canonical: "/product/bbc-micro-bit-club",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
