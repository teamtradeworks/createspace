import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  ProductFAQ,
  CallToAction,
  CourseTabs,
  StepPath,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "bbc-micro-bit-essential-stem-lab-tinker-kit-bundle";

export default async function MicrobitEssentialStemLabBundlePage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    notFound();
  }

  const resolvedAddons = await resolveAddonsForHandle(PRODUCT_HANDLE);
  const addons = serializeAddons(resolvedAddons);

  return (
    <ProductTrackingProvider handle={PRODUCT_HANDLE}>
      <ProductJsonLd product={product} />
      <HeroSection
        product={product}
        tagline="Five SACE-accredited courses covering Scratch coding, micro:bit programming, and sensor-driven STEAM lab projects for Intermediate and Senior Phase"
        highlights={[
          "5 self-paced educator onboarding courses",
          "SACE-accredited professional development",
          "For educators teaching ages 9–18",
          "No prior STEAM experience required",
        ]}
        addons={addons}
        addonUpsellModal
        vendorOverride="InspireAfrica"
      />
      <QuickInfoBadges
        badges={[
          { icon: "time", label: "Duration", value: "Self-Paced" },
          { icon: "age", label: "Learner Ages", value: "9–18" },
          { icon: "tag", label: "SACE Accredited", value: "CPD Points" },
          { icon: "scratch", label: "Coding Platforms", value: "Scratch & MakeCode" },
          { icon: "guide", label: "Phases", value: "Intermediate & Senior" },
          { icon: "award", label: "Certificate", value: "On Completion" },
          {
            icon: "app",
            label: "Access",
            value: "Computer, Tablet & Mobile",
          },
        ]}
      />

      <section className="py-5 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-sm text-gray-400">
            <span className="font-medium text-gray-500">Requirements:</span>
            <span>Internet Access</span>
            <span>·</span>
            <span>Computer or Tablet</span>
            <span>·</span>
            <span>A Willingness to Learn</span>
          </div>
        </div>
      </section>
      <CourseTabs
        tabs={[
          {
            label: "Course 1",
            title: "Coding & Robotics: How to Get Started",
            subtitle:
              "A SACE-accredited micro course with practical, jargon-free guidance to confidently launch a Coding and Robotics programme at your school.",
            steps: [
              {
                title: "Understand the Curriculum",
                description:
                  "Explore how Coding and Robotics fits into the CAPS curriculum and align your programme with 4IR requirements.",
              },
              {
                title: "Set Up Your Classroom",
                description:
                  "Get real-world advice on configuring a STEAM lab, choosing the right devices, and preparing the infrastructure you actually need.",
              },
              {
                title: "Choose the Right Tools",
                description:
                  "Navigate coding platforms like Scratch, MakeCode, and DroneBlocks, and identify which hardware is worth the investment.",
              },
              {
                title: "Build Confidence to Begin",
                description:
                  "Walk away with clear, actionable takeaways you can use in your very next lesson, designed for educators at any experience level.",
              },
            ],
          },
          {
            label: "Course 2",
            title: "Introduction to STEAM Education",
            subtitle:
              "Understand how STEAM, Coding and Robotics integrates with the curriculum. Apply simple, real-world STEAM activities in your classroom, no hardware or software required.",
            steps: [
              {
                title: "Understand STEAM & Coding Foundations",
                description:
                  "Learn what STEAM really means in schools and how Coding and Robotics connects Science, Technology, Engineering, Arts, and Mathematics through real-world learning.",
              },
              {
                title: "Plan & Structure Integrated Lessons",
                description:
                  "Turn ideas into structured, practical STEAM lessons. Includes a free lesson plan template to help you hit the ground running.",
              },
              {
                title: "Set Up Your STEAM Learning Space",
                description:
                  "Understand the requirements for establishing an effective STEAM learning environment, and how CAPS curriculum strands translate into practical classroom implementation.",
              },
              {
                title: "Apply Real-World STEAM Activities",
                description:
                  "Move from theory to practice, confidently facilitate learner-led, hands-on problem solving as part of your everyday teaching.",
              },
            ],
          },
          {
            label: "Course 3",
            title: "Scratch Coding and Animation",
            subtitle:
              "Teach creative block-based coding using Scratch projects. Build engaging problem-solving classroom activities through sequencing, logic, and animation.",
            steps: [
              {
                title: "Get Started with Scratch",
                description:
                  "Explore the Scratch coding environment and understand how block-based coding makes programming accessible and engaging for your learners.",
              },
              {
                title: "Sequencing & Logic",
                description:
                  "Build foundational coding skills through guided exercises in sequencing, loops, conditionals, and logical thinking.",
              },
              {
                title: "Creative Animation Projects",
                description:
                  "Guide learners through interactive animation and storytelling projects that reinforce computational thinking through creative expression.",
              },
              {
                title: "Classroom Problem-Solving Activities",
                description:
                  "Develop engaging, hands-on Scratch activities that turn your classroom into a space for creative problem solving and collaboration.",
              },
            ],
          },
          {
            label: "Course 4",
            title: "Micro:bit Level 1",
            subtitle:
              "Hands-on micro:bit implementation. From unboxing and setup to coding classroom projects and delivering robotics lessons in MakeCode.",
            steps: [
              {
                title: "Setup & Getting Started",
                description:
                  "Learn how to set up your BBC micro:bit, connect it to your computer, and navigate the MakeCode coding environment step by step.",
              },
              {
                title: "Guided Coding Exercises",
                description:
                  "Work through foundational and intermediate coding exercises with clear, step-by-step instructions, building your skills progressively.",
              },
              {
                title: "Classroom Projects & Robotics",
                description:
                  "Apply what you've learnt through practical classroom projects that bring micro:bit coding to life for your learners.",
              },
              {
                title: "Lesson Plan & Worksheets",
                description:
                  "Receive comprehensive lesson plans and worksheet materials so you can deliver micro:bit lessons with confidence.",
              },
            ],
          },
          {
            label: "Course 5",
            title: "Essential STEAM Lab Kit",
            subtitle:
              "Explore the ELECFREAKS Tinker Kit with sensor projects, hardware applications, and real-world STEAM tasks. Take your micro:bit skills further with interactive, sensor-driven classroom projects.",
            steps: [
              {
                title: "Integrate External Sensors",
                description:
                  "Learn how to connect and programme the Tinker Kit's sensors, PIR motion, soil moisture, light, temperature, and more, through the Octopus:bit breakout board.",
              },
              {
                title: "Build Interactive Projects",
                description:
                  "Create hands-on STEAM projects that respond to the real world, from plant monitors and intruder alarms to automated devices your learners will love.",
              },
              {
                title: "Deliver CAPS-Aligned Lessons",
                description:
                  "Every project maps to the Coding and Robotics curriculum. Teach with confidence knowing your lessons meet national education standards.",
              },
              {
                title: "From Coding to Innovation",
                description:
                  "Move beyond basic programming into creative, sensor-driven robotics. Give your learners the tools to design their own solutions to real-world problems.",
              },
            ],
          },
        ]}
      />

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-navy mb-4">Who Is This Pathway For?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Whether you&apos;re just getting started or ready to run a full STEAM lab, this pathway
            takes you from beginner to confident, with the training to match.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Intermediate & Senior Phase Teachers",
                description:
                  "Five courses that take you from curriculum understanding to delivering hands-on, sensor-driven Coding and Robotics lessons.",
              },
              {
                title: "Schools Setting Up a STEAM Lab",
                description:
                  "Get the training to equip your first STEAM lab, from Scratch coding through to micro:bit sensors. Add the hardware as an optional extra.",
              },
              {
                title: "HODs Rolling Out Coding & Robotics",
                description:
                  "Five courses covering curriculum, STEAM foundations, Scratch, micro:bit, and advanced sensors, everything your department needs.",
              },
              {
                title: "Homeschool Educators",
                description:
                  "A structured, self-paced programme to deliver engaging STEAM lessons at home. Add the hardware when you're ready.",
              },
            ].map((persona, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-left"
              >
                <h3 className="text-sm font-semibold text-navy mb-2">{persona.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{persona.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CallToAction
        title="Get the Complete Pathway"
        subtitle="Five courses and zero guesswork. Everything you need to teach Coding and Robotics from Scratch coding to sensor-driven STEAM projects."
        primaryLabel="Get the Bundle"
        primaryHref="#product-actions"
        background="navy"
      />
      <StepPath
        title="How the Inspire Campus Works"
        subtitle="All five courses are hosted on the Inspire Africa learning platform, a dedicated LMS built for STEAM education in South Africa."
        steps={[
          {
            title: "Purchase & Get Your Coupon Code",
            description:
              "Complete your purchase through CREATESPACE and receive a coupon code via email.",
          },
          {
            title: "Redeem on Inspire Africa",
            description:
              "Head to the Inspire Africa educator platform and redeem your coupon code to unlock access to all five courses.",
          },
          {
            title: "Work Through the Courses",
            description:
              "Video lessons, downloadable notes, and quizzes, all self-paced. Start with the curriculum overview and progress through Scratch, micro:bit, and sensor-driven projects.",
          },
          {
            title: "Earn Your Certificates",
            description:
              "Complete courses and quizzes for SACE-accredited professional development certificates.",
          },
        ]}
        background="white"
      />
      <ProductFAQ
        title="Common Questions"
        background="gray"
        faqs={[
          {
            question: "What exactly is included in this bundle?",
            answer:
              "You get five Inspire Africa courses, Coding & Robotics: How to Get Started, Introduction to STEAM Education, Scratch Coding and Animation, Micro:bit Level 1, and Essential STEAM Lab Kit. You can also add a BBC micro:bit Go and ELECFREAKS Tinker Kit as optional extras.",
          },
          {
            question: "How do I access the courses?",
            answer:
              "After purchase, you'll receive a coupon code via email. Redeem it on the Inspire Africa educator platform to unlock access to all five courses.",
          },
          {
            question: "Do I need any prior STEAM or coding knowledge?",
            answer:
              "Not at all. The courses take you from zero experience to delivering sensor-driven lessons. You'll start with curriculum foundations, progress through Scratch block-based coding, and build up to micro:bit programming and STEAM lab sensor projects.",
          },
          {
            question: "Is this SACE-accredited?",
            answer:
              "Yes, this pathway is SACE-accredited for professional development points. All five courses provide a certificate on completion.",
          },
          {
            question: "What's the difference between this and the Early Years pathway?",
            answer:
              "The Early Years pathway includes 3 courses designed for Foundation Phase educators (ages 5–9), focusing on unplugged STEAM and ScratchJr. This Advanced pathway includes 5 courses for Intermediate and Senior Phase educators (ages 9–18), covering Scratch coding, micro:bit programming, and sensor-driven STEAM lab projects.",
          },
          {
            question: "Which ages and grades does this cover?",
            answer:
              "This pathway is designed for educators teaching learners aged 9 to 18, covering the Intermediate Phase (Grade 4–6) and Senior Phase (Grade 7–9 and beyond).",
          },
          {
            question: "How long do the courses take to complete?",
            answer:
              "All five courses are self-paced and compact. Most educators complete everything within two to three weeks alongside their regular schedule.",
          },
          {
            question: "What is the Scratch Coding and Animation course?",
            answer:
              "It teaches creative block-based coding using Scratch projects. You'll learn to build engaging problem-solving classroom activities through sequencing, logic, and animation, perfect for introducing coding to Intermediate Phase learners.",
          },
          {
            question: "What is the Essential STEAM Lab Kit course?",
            answer:
              "It's an advanced course that teaches you how to integrate the ELECFREAKS Tinker Kit's external sensors into interactive, CAPS-aligned classroom projects, moving from basic coding into creative, sensor-driven robotics.",
          },
          {
            question: "Do I need hardware to complete the courses?",
            answer:
              "The first three courses (Getting Started, STEAM Education, and Scratch Coding) don't require hardware. The Micro:bit Level 1 and Essential STEAM Lab Kit courses are designed to be used with a BBC micro:bit and ELECFREAKS Tinker Kit, which you can add as optional extras.",
          },
          {
            question: "Is this suitable for a whole school or department?",
            answer:
              "Absolutely. Contact us for group bookings if you'd like to enrol multiple educators. This bundle is ideal for upskilling an entire department or staff team.",
          },
          {
            question: "What are the terms of access?",
            answer:
              "Access to the Inspire Africa learning platform is provided as an annual educator license. Your license gives you full access to all five courses for 12 months from the date of purchase.",
          },
        ]}
      />
      <CallToAction
        title="Ready to Run a Full STEAM Lab?"
        subtitle="Five courses and zero guesswork. Everything you need to teach Coding and Robotics, from Scratch coding to sensor-driven STEAM projects."
        primaryLabel="Get the Bundle"
        primaryHref="#product-actions"
        secondaryLabel="Browse All Courses"
        secondaryHref="/education/courses"
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
      "Advanced Coding & Robotics training: 5 SACE-accredited courses for Intermediate & Senior Phase educators (ages 9–18). Scratch, micro:bit, and STEAM lab projects.",
    alternates: {
      canonical: "/product/bbc-micro-bit-essential-stem-lab-tinker-kit-bundle",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
