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
  VideoEmbed,
  Specifications,
  ProductTestimonials,
  ProjectShowcase,
  CustomerShowcase,
  CallToAction,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "matatastudio-tale-bot-pro";

export default async function TaleBotProPage() {
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
        tagline="Screen-free coding robot that sparks creativity and storytelling in preschoolers"
        highlights={[
          "100% screen-free — no tablets or apps required for basic coding",
          "14 challenge missions plus 5 interactive themed maps",
          "Voice recording for storytelling and creative expression",
          "Grows with your child — supports Scratch programming for advanced learners",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why Tale-Bot Pro Section */}
      <NumberedSteps
        title="Why Tale-Bot Pro?"
        subtitle="The perfect first coding robot for young learners. Designed specifically for preschoolers, Tale-Bot Pro makes learning to code as simple and playful as building blocks."
        steps={[
          {
            title: "Screen-Free Learning",
            description:
              "No tablets, no apps, no screen time. Young children learn best through tactile, hands-on play. Tale-Bot Pro uses physical command buttons right on the robot, making coding concepts tangible and age-appropriate.",
          },
          {
            title: "Grows with Your Child",
            description:
              "Start with simple button coding at age 3, then progress to Scratch programming when they're ready. One robot supports years of learning, from basic sequences to complex loops and functions.",
          },
          {
            title: "Coding Meets Storytelling",
            description:
              "Built-in microphone lets your child record voices, create narratives, and bring their imagination to life. Interactive maps turn coding challenges into adventures through frog life cycles, plant growth, and more.",
          },
        ]}
        background="navy-card"
      />

      {/* Why Screen-Free Matters */}
      <ImageTextBlock
        image="/images/products/matatastudio-tale-bot-pro/finger-pressing-button-on-tale-bot-pro.png"
        imageAlt="Child's finger pressing command button on Tale-Bot Pro robot"
        title="Hands-On Coding That Makes Sense"
        body="Research shows that screen-free programmable robots are more effective than screen-based coding for developing computational thinking in preschoolers. Children benefit from connecting programming concepts to concrete, physical objects — pressing a button to make the robot move forward reinforces cause-and-effect learning in a way that touching a screen cannot. Tale-Bot Pro is designed for children as young as 3, with colour-coded command buttons and LED indicators that make debugging intuitive and visual, no reading required."
        layout="image-left"
        background="white"
      />

      {/* Features Grid */}
      <FeatureGrid
        title="Everything a Young Learner Needs"
        subtitle="Tale-Bot Pro is packed with features designed to engage, educate, and inspire creativity in preschoolers and early learners."
        features={[
          {
            icon: "microphone",
            title: "Voice Recording",
            description:
              "Record up to 30 seconds of storytelling per file — develop language skills and creative expression",
          },
          {
            icon: "globe",
            title: "11 Languages Supported",
            description:
              "Speaks English, French, German, Spanish, Mandarin, and more — perfect for multilingual learning",
          },
          {
            icon: "pencil",
            title: "Draws & Creates",
            description:
              "Includes washable markers — code the robot to draw shapes, patterns, and artwork",
          },
          {
            icon: "puzzle",
            title: "LEGO Compatible",
            description:
              "Build and customise with LEGO/DUPLO blocks — extend creative play beyond coding",
          },
          {
            icon: "map",
            title: "Interactive Maps",
            description:
              "5 double-sided themed maps with real educational content — life cycles, plant growth, and more",
          },
          {
            icon: "battery",
            title: "Rechargeable Battery",
            description:
              "Built-in 1500mAh battery lasts up to 4 hours — USB-C charging, no disposable batteries needed",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Storytelling & Creativity */}
      <ImageTextBlock
        image="/images/products/matatastudio-tale-bot-pro/robot-holding-pens-and-drawing.jpeg"
        imageAlt="Tale-Bot Pro robot holding markers and drawing on paper"
        title="Where Coding Meets Imagination"
        body="Tale-Bot Pro isn't just a coding robot — it's a storytelling companion. Your child can transform the robot with replaceable sides, attach wings and arms, and use the built-in microphone to record imaginative narratives. Pair the robot with double-sided interactive maps featuring themes like frog life cycles and growing plants, or use the blank maps for open-ended exploration. The drawing feature lets children code the robot to create artwork, combining STEM learning with creative expression. Research shows that this kind of cross-curricular play strengthens both computational thinking and communication skills."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Challenges, Maps & Activities"
        highlight="14 challenge missions plus 5 double-sided interactive maps"
        subtitle="Progressive activities guide children from simple movement commands to complex coding sequences. Each challenge builds on the last, introducing new concepts at a developmentally appropriate pace."
        projects={[
          {
            name: "Basic Movement Commands",
            description: "Learn forward, backward, left, and right",
            concepts: "Sequential thinking, cause and effect",
            image: "/images/products/matatastudio-tale-bot-pro/young-girls-pressing-buttons-on-talebot-pro.png",
          },
          {
            name: "Frog Life Cycle Map",
            description: "Navigate the stages from tadpole to frog",
            concepts: "Science concepts, sequencing life stages",
            image: "/images/products/matatastudio-tale-bot-pro/tale-bot-on-frog-cycle-board.png",
          },
          {
            name: "Plant Growth Map",
            description: "Code the robot through the stages of plant development",
            concepts: "Biology concepts, sequential ordering",
            image: "/images/products/matatastudio-tale-bot-pro/tale-bot-on-sunflower-plant-growing-map.png",
          },
          {
            name: "Drawing with Markers",
            description: "Code the robot to draw shapes and patterns",
            concepts: "Fine motor skills, spatial awareness, geometry",
            image: "/images/products/matatastudio-tale-bot-pro/tale-bot-drawing-front-view.png",
          },
          {
            name: "Dancing & Music Coding",
            description: "Programme the robot to sing and dance",
            concepts: "Pattern recognition, rhythm, creative coding",
            image: "/images/products/matatastudio-tale-bot-pro/tale-bot-singing-and-dancing.png",
          },
          {
            name: "LEGO Building + Coding",
            description: "Combine construction with programming challenges",
            concepts: "Engineering design, creative problem-solving",
            image: "/images/products/matatastudio-tale-bot-pro/tale-bot-compatible-with-lego-blocks.png",
          },
        ]}
        moreText="Plus blank maps for open-ended creativity, voice recording activities, multi-language exploration, and advanced Scratch programming when they're ready"
        background="gray"
      />

      {/* Video Section */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=THeGYKwX_8k"
        title="See Tale-Bot Pro in Action"
        background="white"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="Real Families, Real Learning"
        subtitle="See how children around the world are learning to code, tell stories, and explore with Tale-Bot Pro."
        images={[
          {
            src: "/images/products/matatastudio-tale-bot-pro/kids-in-hall-afterclass-playing-with-talebot-pro.png",
            alt: "Children playing with Tale-Bot Pro in a classroom setting",
          },
          {
            src: "/images/products/matatastudio-tale-bot-pro/two-girls-sitting-on-floor-playing-with-tale-bot-on-board.jpg",
            alt: "Two young girls sitting on floor coding with Tale-Bot Pro on interactive map",
          },
          {
            src: "/images/products/matatastudio-tale-bot-pro/kids-playing-wth-bot-with-arms-on-board.png",
            alt: "Children coding Tale-Bot Pro with custom arm attachments",
          },
          {
            src: "/images/products/matatastudio-tale-bot-pro/kids-playing-with-talebot-pro-on-board.avif",
            alt: "Young children playing with Tale-Bot Pro on interactive board",
          },
          {
            src: "/images/products/matatastudio-tale-bot-pro/young-girls-pressing-buttons-on-talebot-pro.png",
            alt: "Girls pressing command buttons on Tale-Bot Pro robot",
          },
        ]}
        background="gray"
      />

      {/* Testimonials */}
      <ProductTestimonials
        title="What Parents & Educators Say"
        testimonials={[
          {
            quote:
              "My 4-year-old loves the microphone feature and creates new stories every day. The screen-free design means I don't have to worry about screen time, and she's learning to code without even realising it.",
            author: "Emma L.",
            role: "Parent",
            rating: 5,
          },
          {
            quote:
              "As an early childhood educator, I appreciate how Tale-Bot Pro makes coding developmentally appropriate for preschoolers. The interactive maps tie coding to science concepts, and the progression from buttons to Scratch is brilliant.",
            author: "Hannah Garcia",
            role: "Purdue University Engineering Educator",
            rating: 5,
          },
          {
            quote:
              "Our 6-year-old found the advanced challenges in the booklet engaging, while our 3-year-old enjoys the simple movement and storytelling. One robot works for both children at different skill levels.",
            author: "Good Play Guide Testers",
            role: "Family Review",
            rating: 5,
          },
        ]}
        background="white"
      />

      {/* FAQ Section */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "What age is this suitable for?",
            answer:
              "The manufacturer recommends ages 3-5, though many children aged 3-7 enjoy Tale-Bot Pro. Younger children (3-4) benefit from guided play, while older children (5+) can work independently with the challenge booklet. The Scratch programming feature extends use for older learners.",
          },
          {
            question: "Do we need a tablet or computer?",
            answer:
              "No! Basic coding requires zero screens — children use physical command buttons on the robot itself. The Scratch programming feature is optional and requires a tablet or computer, but it's designed for older or more advanced learners who are ready for that next step.",
          },
          {
            question: "Does it require batteries?",
            answer:
              "Tale-Bot Pro has a built-in 1500mAh rechargeable lithium battery that lasts up to 4 hours between charges. Simply charge via the included USB-C cable — no disposable batteries needed.",
          },
          {
            question: "Do I need prior experience to help my child?",
            answer:
              "Not at all! Tale-Bot Pro is designed for complete beginners. The challenge booklet starts from the basics with clear instructions. Most children aged 5+ can work independently, while younger children enjoy collaborative play with a parent or sibling.",
          },
          {
            question: "Is it safe for young children?",
            answer:
              "Yes. Tale-Bot Pro is made from eco-friendly, food-grade materials and is lead-free. It features a sturdy, fall-resistant design. Important: Contains small parts — not suitable for children under 3 years due to choking hazard.",
          },
          {
            question: "What can they do after finishing the challenges?",
            answer:
              "Tale-Bot Pro has excellent replayability. The blank maps allow for open-ended creativity, the voice recording feature enables new storytelling adventures, LEGO compatibility offers limitless building combinations, and the Scratch programming support provides years of advanced learning. You can also add the MatataStudio Activity Box for additional maps and activities.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/matatastudio-tale-bot-pro/3-bots-with-different-arm-attachments.png"
        imageAlt="Tale-Bot Pro robot with different accessory attachments showing customization options"
        items={[
          "1x Tale-Bot Pro Robot",
          "2x Wings",
          "2x Arms",
          "2x Drawing & building block arms",
          "2x Washable markers",
          "1x USB-C charging cable",
          "32x Command cards",
          "5x Double-sided interactive maps",
          "1x Double-sided blank map",
          "1x Double-sided activity map (interactive map & blank map)",
          "1x Configuration card (11 languages)",
          "1x Challenge booklet (14 missions)",
          "1x Quick guide with callout stickers",
          "2x User guides",
          "1x Sticker booklet",
          "3x Paper craft items",
        ]}
        background="white"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Battery", value: "Built-in 1500mAh rechargeable lithium battery" },
          { label: "Battery Life", value: "Up to 4 hours between charges" },
          { label: "Charging", value: "USB-C cable (included)" },
          { label: "Recommended Charger", value: "5V/2A adapter" },
          { label: "Maximum Commands", value: "Supports up to 256 commands" },
          { label: "Audio Recording", value: "Up to 30 seconds per recording file" },
          {
            label: "Languages Supported",
            value: "11 languages (English, French, German, Spanish, Mandarin, Thai, and more)",
          },
          { label: "Compatibility", value: "LEGO/DUPLO block compatible via accessory sets" },
          { label: "Material", value: "Eco-friendly, food-grade material" },
          { label: "Safety", value: "Lead-free, sturdy and fall-resistant design" },
          { label: "Technology", value: "Smart OID interactive technology" },
          { label: "Scratch Support", value: "Yes — compatible with Scratch programming" },
        ]}
        background="gray"
      />

      {/* Final CTA */}
      <CallToAction
        title="Ready to Start Their Coding Journey?"
        subtitle="Give your child the gift of screen-free STEM learning. Tale-Bot Pro makes coding playful, tangible, and age-appropriate for preschoolers."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse More Coding Toys"
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
      "Screen-free coding robot for ages 3-5. Includes 14 challenge missions, 5 interactive maps, voice recording, and Scratch support. No tablets or apps required.",
  };
}
