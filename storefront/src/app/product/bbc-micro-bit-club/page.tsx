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
        tagline="Ten micro:bits, so a whole group can code in the first lesson"
        highlights={[
          "10 complete kits in one box, so each learner has their own board",
          "Runs in a web browser, so there's nothing to install on school computers",
          "Free lesson plans and teacher resources from microbit.org",
          "The same boards can be reused with new groups each term",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Video Section */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=Wuza5WXiMkc"
        title="See the BBC micro:bit Club in Action"
        background="white"
      />

      {/* Activities Section */}
      <ImageTextBlock
        image="/images/products/bbc-micro-bit-club/child-holding-up-microbit-to-camera.jpg"
        imageAlt="Child holding up a micro:bit board to the camera, enthusiastically showing their project"
        title="60+ Activities for Coding, Maths, Science and Music"
        body="The free project library on microbit.org covers computing, maths, science, music and design. Beginners start by animating the LEDs, while more confident learners log science data or build wireless games for the whole group. If you'd rather not plan lessons from scratch, the Micro:bit Educational Foundation's Make it: Code it series gives you ready-to-teach lessons with learning objectives already written."
        layout="image-left"
        background="gray"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="Why the Club Pack Works in a Classroom"
        subtitle="You don't need specialist equipment or any coding experience to run your first session."
        features={[
          {
            icon: "brain",
            title: "10 Simultaneous Learners",
            description:
              "Each board comes with its own cable and batteries, so all 10 learners can code at once instead of taking turns.",
          },
          {
            icon: "cross-device",
            title: "Works from Any Browser",
            description:
              "MakeCode and MicroPython run online, so you don't install apps or pay for licences. Open a browser on Windows, Mac, Chromebook or a tablet and start.",
          },
          {
            icon: "book",
            title: "Free Lesson Plans",
            description:
              "microbit.org has hundreds of free lesson plans, each with learning objectives, activity sheets and assessment guidance.",
          },
          {
            icon: "shield",
            title: "No Soldering Required",
            description:
              "Accessories connect to the edge connector with crocodile clips. There are no tools or sharp parts to hand out in class.",
          },
          {
            icon: "tools",
            title: "Reusable Term After Term",
            description:
              "The boards are sturdy and have no moving parts. One Club pack can serve several groups over a few years, which keeps the cost per learner low.",
          },
          {
            icon: "wifi",
            title: "Built-in Wireless for Group Work",
            description:
              "Every board has Bluetooth 5.0 and a 2.4 GHz radio. Learners can run class polls, multiplayer games and shared experiments with no extra hardware.",
          },
        ]}
        columns={3}
        background="white"
      />

      {/* Research-Backed Section */}
      <ImageTextBlock
        image="/images/products/bbc-micro-bit-club/two-girls-holding-microbits-talking-together.jpg"
        imageAlt="Two girls holding micro:bit boards and talking together during a coding lesson"
        title="What the Micro:bit Foundation's Research Found"
        body="In research by the Micro:bit Educational Foundation, 80% of learners taught with micro:bit said computing is easier to understand than other subjects. Among learners who hadn't used it, the figure was 52%. After micro:bit lessons, 80% of girls agreed that coding is a useful skill to learn, and 84% of educators said they felt more confident teaching computing."
        layout="image-right"
        background="gray"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Activities Your Learners Will Complete"
        highlight="60+ free activities in computing, science, music and design, each with its own learning objectives"
        subtitle="The activities start with first coding tutorials and build up to wireless and data projects, so the Club pack suits mixed-ability groups from Grade 4 to Grade 12."
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
        moreText="microbit.org has 40+ more, including science experiments, music projects, wearables and machine learning with CreateAI"
        background="white"
      />

      {/* Learners in Action */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="Learners and teachers using micro:bit in classrooms and coding clubs."
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
            question: "Does this cover skills from the national curriculum?",
            answer:
              "The micro:bit covers coding, algorithms, physical computing and data handling. These skills come up in South African Technology, Natural Sciences and Mathematics from Grade 4 to Grade 12. The free lesson plans on microbit.org each list their learning outcomes. We don't provide a formal CAPS mapping document for this product, though.",
          },
          {
            question: "How many learners can use the kit at the same time?",
            answer:
              "All 10 boards can be used at once, because every learner has their own board, cable and batteries. Nobody waits for a turn, and the group can work through a lesson together.",
          },
          {
            question: "Do I need a coding or STEM background to teach with this?",
            answer:
              "No. The Micro:bit Educational Foundation's free lesson plans walk you through each step, whatever your experience. MakeCode's drag-and-drop editor is easy for first-time coders to pick up, and plenty of teachers learn alongside their class.",
          },
          {
            question: "What equipment does the school need to provide?",
            answer:
              "Each learner needs a computer, tablet or Chromebook with an up-to-date web browser. The kit supplies the boards, cables and batteries, and you won't need any tools, software installs or specialist equipment.",
          },
          {
            question: "How durable are the boards for repeated classroom use?",
            answer:
              "The micro:bit V2 was made for schools. The boards have no moving or fragile parts, and the edge connector is reinforced for repeated use. Stored properly, one Club pack should last several groups over a few years.",
          },
          {
            question: "How much preparation time does a lesson require?",
            answer:
              "Very little. Learners can finish their first interactive project in one 45-minute period. The lesson plans on microbit.org come with objectives and activity sheets, so you don't have to write your own.",
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
        title="Bring micro:bit into Your Classroom"
        subtitle="Ten boards, ten cables and enough batteries for all of them. Your group can start coding in the first lesson."
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
