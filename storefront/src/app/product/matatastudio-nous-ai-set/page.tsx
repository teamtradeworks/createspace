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
  ProductFAQ,
  ProductReviews,
  WhatsIncluded,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "matatastudio-nous-ai-set";

export default async function NousAISetPage() {
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
        tagline="Your child's gateway to real-world artificial intelligence"
        highlights={[
          "18+ hands-on AI projects from beginner to advanced",
          "Chat with AI using ChatGPT-4o integration",
          "Learn Python and block coding with TinyML",
          "Award-winning: EdTech Digest Cool Tool Winner 2025",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Video Section */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=2JSvgJYo6L8&list=PLCtoqhowu_HKX-cdy_b6KWBZgDDmOw3eD&index=1"
        title="See Nous AI in Action"
        background="white"
      />

      {/* What Makes It Special */}
      <ImageTextBlock
        image="/images/products/matatastudio-nous-ai-set/child-with-nous.jpg"
        imageAlt="Child interacting with Nous AI robot"
        title="AI That Feels Like Magic"
        body="Your child can have actual conversations with Nous AI using MatataChat, powered by ChatGPT-4o. They can ask the robot to draw pictures, train it to recognise their face, or program it to respond to voice commands. It's not just following instructions — they're experiencing how AI systems learn, adapt, and interact with the real world. Every project builds understanding of concepts like machine learning, computer vision, and natural language processing."
        layout="image-left"
        background="gray"
      />

      {/* Key Features Grid */}
      <FeatureGrid
        title="What Makes Nous AI Different"
        subtitle="This isn't a toy robot — it's a complete AI education platform built around professional-grade concepts, made accessible for children aged 12+."
        features={[
          {
            icon: "sparkles",
            title: "ChatGPT-4o Powered",
            description:
              "Natural conversations with AI using MatataChat — ask questions, get responses, explore language understanding",
          },
          {
            icon: "code",
            title: "Dual Programming",
            description:
              "Start with block coding (Scratch-style) and progress to Python as skills grow",
          },
          {
            icon: "camera",
            title: "Computer Vision",
            description:
              "Face detection, object recognition, and AprilTag tracking with built-in camera and sensors",
          },
          {
            icon: "microphone",
            title: "Speech Recognition",
            description:
              "Train voice models, build voice-controlled systems, explore natural language processing",
          },
          {
            icon: "robot",
            title: "TinyML Edge AI",
            description:
              "Run AI models directly on the robot without cloud connectivity — learn edge computing concepts",
          },
          {
            icon: "building-blocks",
            title: "Expandable Design",
            description:
              "Metal construction compatible with building blocks for endless customisation and creative projects",
          },
        ]}
        columns={3}
        background="white"
      />

      {/* Skills Development Section */}
      <ImageTextBlock
        image="/images/products/matatastudio-nous-ai-set/collage-of-nous-activities.jpg"
        imageAlt="Collage showing various Nous AI activities"
        title="More Than Technical Skills"
        body="When your child trains an AI model and watches it work — or doesn't work — they're building resilience. They're learning that debugging isn't failure; it's part of the process. They're developing patience as they collect data, confidence as they solve problems independently, and curiosity as they ask &quot;what if I try this?&quot; These are the skills that transfer far beyond robotics: persistence, logical thinking, and the confidence to tackle unfamiliar challenges."
        layout="image-right"
        background="gray"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="Projects You'll Build"
        highlight="18+ hands-on AI projects, challenges, and activities"
        subtitle="Each project introduces new concepts and skills. Your child starts with the basics and progresses to training custom AI models."
        projects={[
          {
            name: "MatataChat Conversation",
            description: "Chat with the robot using ChatGPT-4o integration",
            concepts: "Natural language processing, conversational AI",
            image: "/images/products/matatastudio-nous-ai-set/matata-chat-conversation.png",
          },
          {
            name: "Face Recognition System",
            description: "Train Nous to recognise faces and respond to identity",
            concepts: "Computer vision, biometric technology, AI ethics",
            image: "/images/products/matatastudio-nous-ai-set/face-recognition-system.png",
          },
          {
            name: "Voice-Controlled Light",
            description: "Build a system that responds to voice commands",
            concepts: "Speech recognition, command logic, IoT",
            image: "/images/products/matatastudio-nous-ai-set/voice-controlled.png",
          },
          {
            name: "Object Recognition",
            description: "Train models to identify everyday objects",
            concepts: "Image classification, machine learning, data collection",
            image: "/images/products/matatastudio-nous-ai-set/object-recognition.png",
          },
          {
            name: "Animal Identifier",
            description: "Create an AI that recognises different animals",
            concepts: "Computer vision, model training, classification",
            image: "/images/products/matatastudio-nous-ai-set/animal-identifier.png",
          },
          {
            name: "Python & Scratch Programming",
            description: "Learn block coding and progress to Python",
            concepts: "Algorithm design, computational thinking",
            image: "/images/products/matatastudio-nous-ai-set/phython-and-scratch-programming.png",
          },
        ]}
        moreText="Plus 12 more projects including line-following robot, AIGC drawing, smart temperature monitor, recyclable material sorter, autonomous driving, and more"
        background="white"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="See what students are building and learning with Nous AI"
        images={[
          {
            src: "/images/products/matatastudio-nous-ai-set/booklets.jpg",
            alt: "Nous AI curriculum booklets and materials",
          },
          {
            src: "/images/products/matatastudio-nous-ai-set/image-of-bot.jpg",
            alt: "Nous AI robot on desk",
          },
          {
            src: "/images/products/matatastudio-nous-ai-set/image-of-cam-face-recognition.jpg",
            alt: "Nous AI camera performing face recognition",
          },
          {
            src: "/images/products/matatastudio-nous-ai-set/laptop-with-coding-programme.jpg",
            alt: "Student coding with Nous AI platform on laptop",
          },
          {
            src: "/images/products/matatastudio-nous-ai-set/nous-ai-bot-with-booklet.jpg",
            alt: "Nous AI robot with instruction booklet",
          },
          {
            src: "/images/products/matatastudio-nous-ai-set/open-packaged-kit.jpg",
            alt: "Nous AI Set unboxed showing all components",
          },
        ]}
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* FAQ Section */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "Is this suitable for beginners?",
            answer:
              "Yes! While Nous AI is recommended for ages 12+, the curriculum starts with basic concepts and gradually builds to advanced AI topics. No prior coding or robotics experience is needed — the online platform includes step-by-step tutorials from beginner to advanced.",
          },
          {
            question: "What makes this different from other coding robots?",
            answer:
              "Nous AI teaches the complete AI lifecycle — data collection, model training, and deployment. Your child doesn't just code; they train machine learning models, build speech recognition, and program computer vision. It's one of the few educational robots that teaches TinyML (edge AI) concepts.",
          },
          {
            question: "Do I need a computer or internet connection?",
            answer:
              "You'll need a computer or tablet with internet to access the MatataCode programming platform and initially train AI models. However, once models are trained using TinyML, they run directly on the robot without needing internet — teaching important edge computing concepts.",
          },
          {
            question: "Can my child work independently?",
            answer:
              "Most children aged 12+ can work through projects independently using the online curriculum. Younger children (ages 10-12) may benefit from occasional adult support, especially when learning new AI concepts. The platform provides clear tutorials and guidance throughout.",
          },
          {
            question: "What will my child learn?",
            answer:
              "Your child will learn AI fundamentals (machine learning, neural networks), computer vision, speech recognition, Python and block coding, robotics, IoT, and critical thinking skills. They'll understand how real AI systems work and gain skills directly applicable to future tech careers.",
          },
          {
            question: "Is it compatible with other building systems?",
            answer:
              "Yes! Nous AI features a metal construction compatible with building block structures, allowing creative customisation beyond the structured projects. The modular design encourages experimentation and engineering thinking.",
          },
          {
            question: "What happens after they complete all the projects?",
            answer:
              "The learning never stops! Your child can create custom AI projects, train new models for unique applications, and explore the continuously updated MatataCode platform with new tutorials and activities. The robot's expandable design allows for limitless creative projects.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/matatastudio-nous-ai-set/whats-in-the-box.png"
        imageAlt="Nous AI Set components and what's included"
        items={[
          "Nous Hub (main control unit)",
          "Nous Camera module with fill lights and ToF sensor",
          "Nous Servo module (motor/servo modes)",
          "Line-following map",
          "Autopilot map",
          "Recognition cards for image and AprilTag detection",
          "Card holder",
          "USB-C cable for charging and data transfer",
          "User guide",
          "Free lifetime access to MatataCode online platform",
          "Comprehensive curriculum with tutorials and lessons",
        ]}
        background="white"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Recommended Age", value: "12+ years" },
          { label: "Programming Languages", value: "Block coding (Scratch-style) and Python" },
          {
            label: "AI Technologies",
            value: "TinyML, ChatGPT-4o, Computer Vision, Speech Recognition",
          },
          { label: "Platform", value: "MatataCode online (web-based, free lifetime access)" },
          { label: "Connectivity", value: "USB-C, WiFi for IoT features" },
          { label: "Camera", value: "Built-in camera with fill lights and ToF ranging sensor" },
          { label: "Motors", value: "Servo module with motor/servo modes" },
          { label: "Construction", value: "Metal frame, compatible with building blocks" },
          { label: "Battery", value: "Built-in rechargeable battery, USB-C charging" },
          { label: "Assembly Time", value: "Approximately 20 minutes" },
          {
            label: "Certifications",
            value: "ISTE certified curriculum, EdTech Digest Cool Tool Winner 2025",
          },
        ]}
        background="gray"
      />

      {/* Final CTA */}
      <CallToAction
        title="Start Your AI Journey"
        subtitle="18+ hands-on AI projects, ChatGPT-4o integration, and on-device machine learning. Built for ages 12+."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse More Robots"
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
      "Advanced AI robot for ages 12+. Learn machine learning, computer vision, and Python programming with ChatGPT-4o. 18+ projects, TinyML, award-winning curriculum.",
    alternates: {
      canonical: "/product/matatastudio-nous-ai-set",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
