import { notFound } from "next/navigation";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import {
  HeroSection,
  QuickInfoBadges,
  NumberedSteps,
  VideoEmbed,
  FeatureGrid,
  ImageTextBlock,
  ProjectShowcase,
  CustomerShowcase,
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  CallToAction,
  RelatedProducts,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "matatastudio-vincibot-coding-robot-set";

export default async function VinciBotPage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    notFound();
  }

  // Get related products and add-ons in parallel
  const [allProducts, resolvedAddons] = await Promise.all([
    getProducts(8),
    resolveAddonsForHandle(PRODUCT_HANDLE),
  ]);

  const relatedProducts = allProducts.filter((p) => p.handle !== product.handle).slice(0, 4);
  const addons = serializeAddons(resolvedAddons);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        product={product}
        tagline="Smart robot that grows from block-based coding to Python and AI"
        highlights={[
          "93+ hands-on activities from beginner to expert",
          "Block-based coding AND Python in one robot",
          "On-device AI and machine learning (no internet required)",
          "8 sensors for advanced robotics projects",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why VinciBot Section */}
      <NumberedSteps
        title="Why VinciBot?"
        subtitle="VinciBot is one of the most comprehensive coding robots for children aged 8-12. From simple block-based coding to Python programming and AI, it grows with your child for years."
        steps={[
          {
            title: "93+ Activities Mean Years of Learning",
            description:
              "Most coding robots include 5-10 projects. VinciBot includes 93+ structured activities plus unlimited creative projects. That's months of learning before your child even explores on their own.",
          },
          {
            title: "From Scratch to Python to AI",
            description:
              "VinciBot is the only robot in this price range that seamlessly progresses from visual block-based coding (like Scratch) to real Python programming. Then it goes further with on-device AI and IoT projects.",
          },
          {
            title: "Used by 20,000+ Schools Worldwide",
            description:
              "Created by MatataStudio, a leader in educational robotics since 2017. VinciBot is trusted by educators globally and aligns with international STEM standards (CSTA, NGSS, ISTE).",
          },
        ]}
        background="navy-card"
      />

      {/* Video Section */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=OfsxgAjj2Do&t=5s"
        title="See VinciBot in Action"
        background="gray"
      />

      {/* AI & Machine Learning */}
      <ImageTextBlock
        image="/images/products/matatastudio-vincibot-coding-robot-set/vincibot-with-coding-tablet.jpg"
        imageAlt="Child programming VinciBot on tablet with block-based coding"
        title="Real AI Your Child Can Touch"
        body="VinciBot includes Tiny Machine Learning — artificial intelligence that runs directly on the robot without needing the internet. Your child will train the robot to recognise hand gestures, identify handwritten letters, and respond to real-world conditions. This isn't simulated AI or a simplified demo — it's the same machine learning technology used in smartphones and self-driving cars, just made accessible for kids. When they program VinciBot to wave when it sees a thumbs-up gesture, they're learning the foundations of computer vision and neural networks. That's an incredible head start for future careers in AI, data science, and robotics."
        layout="image-left"
        background="white"
      />

      {/* Features Grid */}
      <FeatureGrid
        title="8 Sensors Power Real-World Robotics"
        subtitle="VinciBot isn't just programmable — it's aware. Eight built-in sensors let it see, hear, and respond to its environment like a real robot."
        features={[
          {
            icon: "eye",
            title: "Ultrasonic Sensor",
            description: "Measures distance to objects for obstacle avoidance and navigation",
          },
          {
            icon: "palette",
            title: "Colour Sensor",
            description: "Detects colours to sort objects, follow lines, and play colour-based games",
          },
          {
            icon: "sun",
            title: "2x Light Sensors",
            description: "Respond to brightness for light-following and environmental projects",
          },
          {
            icon: "volume-2",
            title: "Sound Sensor",
            description: "Detects claps, voices, and music for sound-activated programs",
          },
          {
            icon: "radio",
            title: "Infrared Sensors",
            description: "1 transmitter + 2 receivers for remote control and robot-to-robot communication",
          },
          {
            icon: "activity",
            title: "Line Follower Sensor",
            description: "Precisely tracks lines for maze challenges and drawing projects",
          },
        ]}
        background="gray"
      />

      {/* Block-Based to Python */}
      <ImageTextBlock
        image="/images/products/matatastudio-vincibot-coding-robot-set/coding-interface-tablet.png"
        imageAlt="MatataCode programming interface showing block-based coding on tablet"
        title="Starts Simple, Goes Deep"
        body="VinciBot uses MatataCode — a free programming app for Windows, Mac, iPad, and Android tablets. Beginners start with colourful drag-and-drop blocks (just like Scratch) to make the robot move, light up, and play sounds. As your child gains confidence, they transition to Python — a professional programming language used at Google, NASA, and universities worldwide. The same robot, the same app, but now they're writing real code. By age 12, they could be programming AI models, building IoT weather stations, or creating games — skills that put them years ahead of their peers."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="93+ Projects from Beginner to Expert"
        subtitle="VinciBot includes 75 online lessons organised into 5 progressive levels (A through E) plus an 18-challenge activity booklet in the box. Here are some favourites:"
        moreText="After completing the 93 core activities, your child can create unlimited projects: AI gesture recognition, IoT smart home systems, algorithmic art, autonomous vehicles, and more."
        projects={[
          {
            name: "AI Technology",
            description:
              "Train VinciBot to recognise hand gestures and respond with custom actions using on-device machine learning",
            image: "/images/products/matatastudio-vincibot-coding-robot-set/ai-technology.png",
          },
          {
            name: "Line Following & Navigation",
            description:
              "Program VinciBot to follow lines precisely and navigate complex paths using sensors",
            image: "/images/products/matatastudio-vincibot-coding-robot-set/line-following-project.jpeg",
          },
          {
            name: "LED Animations",
            description:
              "Create custom pixel art, animations, and emoji on the 18x6 LED matrix display",
            image: "/images/products/matatastudio-vincibot-coding-robot-set/led-display.jpg",
          },
          {
            name: "Precision Drawing",
            description:
              "Use loops and geometry to draw shapes, patterns, and algorithmic art with a pen attachment",
            image: "/images/products/matatastudio-vincibot-coding-robot-set/vincibot-drawing.png",
          },
          {
            name: "Music & Dance",
            description:
              "Compose songs with 21 instrument sounds and choreograph dance routines with RGB lights",
            image: "/images/products/matatastudio-vincibot-coding-robot-set/vincitbot-with-lights-dancing-music.png",
          },
          {
            name: "Block-Based Coding",
            description:
              "Program VinciBot using visual drag-and-drop blocks — no typing required for beginners",
            image: "/images/products/matatastudio-vincibot-coding-robot-set/coding-project.png",
          },
        ]}
        background="gray"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="Real Families, Real Learning"
        subtitle="See how children around the world are exploring coding, robotics, and creativity with VinciBot."
        images={[
          {
            src: "/images/products/matatastudio-vincibot-coding-robot-set/child-coding-on-laptop-with-vincibot-next-to-her-on-built-pathway.png",
            alt: "Child coding on laptop with VinciBot on a pathway",
          },
          {
            src: "/images/products/matatastudio-vincibot-coding-robot-set/vincibot-on-track.jpeg",
            alt: "VinciBot following a line on the activity map",
          },
          {
            src: "/images/products/matatastudio-vincibot-coding-robot-set/vincibot-playing-soccer.png",
            alt: "VinciBot playing soccer with a small ball",
          },
          {
            src: "/images/products/matatastudio-vincibot-coding-robot-set/vincibot-with-lit-up-bunny-ears.jpeg",
            alt: "VinciBot with bunny ears attachment and LED lights",
          },
          {
            src: "/images/products/matatastudio-vincibot-coding-robot-set/vincibot-with-pen-on-paper.jpeg",
            alt: "VinciBot drawing with a pen attachment",
          },
          {
            src: "/images/products/matatastudio-vincibot-coding-robot-set/vincibot-in-hand-with-remote-pointing-at-it.jpeg",
            alt: "Hand holding VinciBot with IR remote control",
          },
          {
            src: "/images/products/matatastudio-vincibot-coding-robot-set/box-unpacked-on-floor-to-display-whats-inside.jpeg",
            alt: "VinciBot box unpacked showing all components",
          },
        ]}
        background="white"
      />

      {/* LEGO Compatibility */}
      <ImageTextBlock
        image="/images/products/matatastudio-vincibot-coding-robot-set/lego-compatibility.jpeg"
        imageAlt="Four VinciBots with different LEGO creations attached"
        title="Build Beyond the Box with LEGO"
        body="VinciBot is fully compatible with LEGO bricks, Technic motors, and thousands of third-party electronic modules. Your child can transform VinciBot into a crane, a drawing machine, a soccer robot, or anything they imagine. Multiple VinciBots can even connect and communicate with each other for collaborative projects and competitions. This expandability means VinciBot grows with your child's creativity — it's not a toy they'll outgrow in six months. It's a platform for years of experimentation."
        layout="image-left"
        background="gray"
      />

      {/* FAQ Section */}
      <ProductFAQ
        title="Your Questions Answered"
        faqs={[
          {
            question: "Does my child need prior coding experience?",
            answer:
              "No! VinciBot is designed for complete beginners aged 8+. The 75 online lessons start with the absolute basics (like 'what is a loop?') and gradually introduce more advanced concepts. The first activities use simple drag-and-drop blocks — no typing required. VinciBot also has 3 preset modes (line following, drawing, and remote control) that work immediately without any programming, so your child can start having fun straight out of the box.",
          },
          {
            question: "What's the difference between this and cheaper coding robots?",
            answer:
              "VinciBot offers three major advantages: (1) Activity depth — 93+ structured lessons vs. 5-10 projects in most robots, (2) Progression to real Python code and AI/ML, not just block-based coding, and (3) 8 sensors for sophisticated projects instead of basic movement. VinciBot is built for long-term learning, not just a few weekends of fun. It's used by 20,000+ schools globally because it delivers curriculum-grade STEM education.",
          },
          {
            question: "What devices and software does VinciBot need?",
            answer:
              "VinciBot works with the free MatataCode app, available for Windows (10/11), Mac (macOS 11+), iPad (iOS 13+), and Android tablets (Android 8+). A computer or tablet is required for programming — smartphones have limited support. The robot connects via Bluetooth. System requirements are modest: 8GB RAM and 500MB storage. The 75 online lessons are accessed through coding.matatalab.com. Internet is needed to download the app and access lessons, but VinciBot's AI features work offline.",
          },
          {
            question: "How long does the battery last, and how is it charged?",
            answer:
              "VinciBot has a built-in 1500mAh rechargeable lithium battery that provides over 4 hours of continuous use on a single charge. It charges via USB cable (included). Unlike some robots that require constant battery replacements, VinciBot's rechargeable battery means lower long-term costs and less environmental waste. Charging takes approximately 2-3 hours.",
          },
          {
            question: "Is this suitable for girls as well as boys?",
            answer:
              "Absolutely! VinciBot is designed for all children regardless of gender. Research shows that early exposure to coding and robotics is crucial for building confidence in STEM subjects — especially for girls, who are often underrepresented in technology fields. VinciBot's creative activities (music, art, storytelling) and collaborative projects appeal to diverse interests. The robot itself has a friendly, neutral design rather than stereotypically 'boyish' styling.",
          },
          {
            question: "Can my child use VinciBot for school projects or competitions?",
            answer:
              "Yes! VinciBot is used in over 20,000 schools worldwide and aligns with CSTA, NGSS, Common Core, and ISTE educational standards. It's suitable for science fairs, robotics competitions, and classroom demonstrations. The curriculum covers grades 3-8 (ages 8-14) content. Many teachers use VinciBot for group projects, coding clubs, and STEM enrichment programmes. The compatibility with LEGO and third-party modules makes it competition-ready.",
          },
        ]}
        background="white"
      />

      {/* What's Included */}
      <WhatsIncluded
        title="Everything in the Box"
        image="/images/products/matatastudio-vincibot-coding-robot-set/whats-in-box.jpg"
        items={[
          "VinciBot robot (fully assembled with 8 sensors, LED matrix, speaker, motors)",
          "IR remote control (for out-of-the-box play)",
          "Challenge booklet (18 hands-on coding challenges)",
          "Double-sided activity map (line-following track on one side, blank canvas on the other)",
          "USB charging cable",
          "Access to 75 online lessons at coding.matatalab.com",
          "Free MatataCode app (Windows, Mac, iPad, Android)",
        ]}
        background="gray"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Specifications"
        specs={[
          { label: "Age Range", value: "8-12 years (Grades 3-8)" },
          { label: "Programming Languages", value: "Block-based (Scratch-style) and Python" },
          { label: "Sensors", value: "8 total: Ultrasonic, Colour, 2x Light, Sound, IR (1 transmitter + 2 receivers), Line Follower" },
          { label: "Display", value: "18x6 LED matrix (128 white LEDs) + 6 programmable RGB LEDs" },
          { label: "Audio", value: "High-quality speaker with 21 musical instrument sounds" },
          { label: "Battery", value: "1500mAh rechargeable lithium, 4+ hours runtime, USB charging" },
          { label: "Connectivity", value: "Bluetooth 4.0+ for device connection, IoT cloud capabilities" },
          { label: "Software Compatibility", value: "Windows 10/11, macOS 11+, iOS 13+, Android 8+" },
          { label: "Expandability", value: "Compatible with LEGO bricks, Technic motors, third-party modules" },
          { label: "Activities Included", value: "75 online lessons + 18 challenge booklet = 93+ total" },
          { label: "Educational Standards", value: "CSTA, NGSS, Common Core, ISTE certified" },
          { label: "Dimensions", value: "Compact robot design (approx. 10cm x 10cm)" },
        ]}
        background="white"
      />

      {/* Call to Action */}
      <CallToAction
        title="Give Your Child the Gift of Future-Ready Skills"
        subtitle="VinciBot delivers years of learning in coding, AI, and robotics. Invest in your child's future today."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse More STEM Kits"
        secondaryHref="/shop"
        background="navy"
      />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} background="gray" />
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
      "93+ coding activities from block-based to Python and AI. 8 sensors, LEGO-compatible, used by 20,000+ schools. The smart robot that grows with your child aged 8-12.",
  };
}
