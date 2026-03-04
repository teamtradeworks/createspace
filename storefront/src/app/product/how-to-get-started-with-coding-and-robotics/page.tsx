import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  NumberedSteps,
  FeatureGrid,
  ProductFAQ,
  CallToAction,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "how-to-get-started-with-coding-and-robotics";

export default async function HowToGetStartedWithCodingAndRoboticsPage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    notFound();
  }

  const resolvedAddons = await resolveAddonsForHandle(PRODUCT_HANDLE);
  const addons = serializeAddons(resolvedAddons);

  return (
    <>
      <ProductJsonLd product={product} />

      <HeroSection
        product={product}
        tagline="The essential starter course for educators launching Coding and Robotics at their school"
        highlights={[
          "7 video-based modules with quizzes",
          "SACE-accredited professional development",
          "Covers Foundation Phase through Senior Phase",
          "Instant digital access via QR code",
        ]}
        addons={addons}
        digital
      />

      <NumberedSteps
        title="What You'll Learn"
        subtitle="Practical, jargon-free guidance to confidently launch and run a Coding and Robotics programme at your school."
        steps={[
          {
            title: "Understand the Curriculum",
            description:
              "Decode how Coding and Robotics fits into the CAPS curriculum from Grade R to Grade 9, and align your programme with 4IR requirements.",
          },
          {
            title: "Set Up Your Classroom",
            description:
              "Get real-world advice on configuring a STEAM lab, choosing the right devices, and preparing the infrastructure you need.",
          },
          {
            title: "Choose the Right Tools",
            description:
              "Navigate coding platforms like Scratch, Python, MakeCode, and DroneBlocks, and identify which hardware is worth the investment.",
          },
          {
            title: "Start Teaching Immediately",
            description:
              "Walk away with clear, actionable takeaways so you can begin delivering lessons with confidence — no prior STEM expertise required.",
          },
        ]}
        background="navy-card"
      />

      <FeatureGrid
        title="Course Modules"
        subtitle="Seven self-paced modules, each with a video lesson, downloadable notes, and a quiz to check your understanding."
        features={[
          {
            icon: "guide",
            title: "Module 1: What Is Coding and Robotics?",
            description:
              "Define the key buzzwords — 4IR, computational thinking, robotics — and understand their role in the current curriculum.",
          },
          {
            icon: "guide",
            title: "Module 2: Classroom Setup",
            description:
              "Practical tips on configuring your classroom or STEAM lab, including essential infrastructure and equipment.",
          },
          {
            icon: "guide",
            title: "Module 3: Exploring Curriculum",
            description:
              "Decode how Coding and Robotics fits across Foundation, Intermediate, and Senior Phase in the CAPS framework.",
          },
          {
            icon: "guide",
            title: "Module 4: Coding Languages",
            description:
              "Guidance on choosing the right tools for your learners, including Scratch, Python, and block-based platforms.",
          },
          {
            icon: "guide",
            title: "Module 5: General Software",
            description:
              "Navigate the best free and paid software options, from Scratch and MakeCode to DroneBlocks and beyond.",
          },
          {
            icon: "guide",
            title: "Module 6: Hardware Options",
            description:
              "Identify essential technology — from micro:bits to drones — and learn what's worth the investment and what to skip.",
          },
          {
            icon: "guide",
            title: "Module 7: Conclusion & Next Steps",
            description:
              "Clear, actionable takeaways to start teaching immediately, plus your professional certificate and SACE points.",
          },
        ]}
        columns={2}
        background="gray"
      />

      <NumberedSteps
        title="How the Inspire Campus Works"
        subtitle="This course is hosted on the Inspire Africa learning platform — a dedicated LMS built for STEM education in South Africa."
        steps={[
          {
            title: "Purchase and Receive Your QR Code",
            description:
              "Complete your purchase on CREATESPACE and you'll receive a QR code via email. Scan it to go straight to your course on the Inspire Campus.",
          },
          {
            title: "Watch the Video Lessons",
            description:
              "Each module includes a video lesson that breaks down the topic in clear, practical terms. Watch at your own pace, pause, and revisit anytime.",
          },
          {
            title: "Download Notes and Resources",
            description:
              "Every module comes with downloadable notes and supplementary materials — including the full CAPS Coding and Robotics curriculum documents.",
          },
          {
            title: "Complete the Quizzes",
            description:
              "After each module, take a short quiz to check your understanding. Quizzes reinforce key concepts and track your progress through the course.",
          },
          {
            title: "Earn Your Certificate",
            description:
              "Once you've completed all modules and quizzes, you'll receive a professional certificate and can claim your SACE points.",
          },
        ]}
        background="white"
      />

      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "How do I access the course?",
            answer:
              "After purchase, you'll receive a QR code that gives you instant access to the course on the Inspire Africa learning platform. No waiting for delivery — it's all digital.",
          },
          {
            question: "Do I need any prior STEM or coding knowledge?",
            answer:
              "Not at all. This course is designed specifically for educators who are new to Coding and Robotics. Everything is explained in plain, jargon-free language.",
          },
          {
            question: "Is this course SACE-accredited?",
            answer:
              "Yes. This is a SACE-accredited professional development course. You'll earn SACE points and receive a professional certificate upon completion.",
          },
          {
            question: "Which grades does the course cover?",
            answer:
              "The course covers Coding and Robotics implementation from Grade R through Grade 9, spanning Foundation, Intermediate, and Senior Phase.",
          },
          {
            question: "How long does the course take to complete?",
            answer:
              "The course is self-paced, so you can work through the 7 modules at your own speed. Most educators complete it within a few hours spread over a week or two.",
          },
          {
            question: "Is this suitable for a whole school or department?",
            answer:
              "Absolutely. Contact us for group bookings if you'd like to enrol multiple educators. The course is ideal for upskilling an entire department or staff team.",
          },
        ]}
      />

      <CallToAction
        title="Ready to Launch Coding and Robotics?"
        subtitle="Get instant access via QR code and start building your school's programme today. Hosted on the Inspire Africa learning platform."
        primaryLabel="Enrol Now"
        primaryHref="#product-actions"
        secondaryLabel="Browse All Courses"
        secondaryHref="/education/courses"
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
      "SACE-accredited microcourse for educators launching Coding and Robotics. 7 video modules covering curriculum, classroom setup, tools, and implementation.",
    alternates: {
      canonical: `/product/${PRODUCT_HANDLE}`,
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
