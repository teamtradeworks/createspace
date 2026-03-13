import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  FeatureGrid,
  ProductFAQ,
  CallToAction,
  CourseTabs,
  StepPath,
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
    <>
      <ProductJsonLd product={product} />

      <HeroSection
        product={product}
        tagline="Master sensor-driven robotics with the BBC micro:bit and Elecfreaks Tinker Kit. Includes all hardware plus CAPS-aligned specialist training to turn coding into innovation. (Prerequisite: Micro:bit Level 1)"
        highlights={[
          "4 Inspire Africa courses included",
          "BBC micro:bit Go hardware included",
          "ELECFREAKS Tinker Kit with 13 sensors included",
          "SACE-accredited professional development",
          "No prior STEM experience required",
        ]}
        addons={addons}
        defaultSelectedAddons={[
          "bbc-micro-bit-go",
          "elecfreaks-micro-bit-tinker-kit",
        ]}
      />

      <QuickInfoBadges
        badges={[
          { icon: "time", label: "Duration", value: "8-12 Hours" },
          { icon: "age", label: "Audience", value: "Educators" },
          { icon: "tag", label: "SACE Accredited", value: "CPD Points" },
          { icon: "app", label: "Coding Platform", value: "MakeCode" },
          { icon: "guide", label: "Phases", value: "Grade R – Grade 9" },
          { icon: "tag", label: "Certificate", value: "On Completion" },
          {
            icon: "app",
            label: "Access",
            value: "Computer, Tablet & Mobile",
          },
        ]}
      />

      <section className="py-10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-navy mb-4">
            Requirements
          </h2>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
            <span>Internet Access</span>
            <span className="text-gray-300">|</span>
            <span>Computer or Tablet</span>
            <span className="text-gray-300">|</span>
            <span>USB Port (cable included)</span>
            <span className="text-gray-300">|</span>
            <span>2 x AAA Batteries</span>
            <span className="text-gray-300">|</span>
            <span>A Willingness to Learn</span>
          </div>
        </div>
      </section>

      <FeatureGrid
        title="What's in This Bundle"
        subtitle="Four professional development courses, a BBC micro:bit Go, and a full ELECFREAKS Tinker Kit — everything you need to upskill, plan, and deliver hands-on Coding and Robotics lessons."
        features={[
          {
            icon: "lightbulb",
            title: "Course: How to Get Started with Coding and Robotics",
            description:
              "A SACE-accredited overview that demystifies the Coding and Robotics curriculum, walks you through implementation planning, and gives you a clear roadmap from Grade R to Grade 9.",
          },
          {
            icon: "puzzle",
            title: "Course: Introduction to STEAM, Coding & Robotics",
            description:
              "A screen-free, unplugged approach to early STEAM — ideal for pre-school and Foundation Phase classrooms where devices aren't available or age-appropriate.",
          },
          {
            icon: "code",
            title: "Course: Micro:bit Level 1",
            description:
              "Your first hands-on coding experience. Go from unboxing to writing intermediate MakeCode programmes in under two hours, with a lesson plan and worksheets included.",
          },
          {
            icon: "sensor",
            title: "Course: Essential STEAM Lab Kit Training",
            description:
              "Take your micro:bit skills further with sensor-driven robotics lessons. Learn to integrate external sensors from the Tinker Kit into CAPS-aligned classroom projects that emphasise creativity and real-world problem solving.",
          },
          {
            icon: "robot",
            title: "BBC micro:bit Go Kit",
            description:
              "A physical BBC micro:bit v2 board with USB cable and battery pack, ready to use out of the box. Includes LED display, buttons, sensors, speaker, microphone, and Bluetooth.",
          },
          {
            icon: "tools",
            title: "ELECFREAKS micro:bit Tinker Kit",
            description:
              "13 plug-and-play sensor modules including a PIR motion sensor, soil moisture probe, servo motor, buzzer, OLED display, and more — all connecting to the included Octopus:bit breakout board.",
          },
        ]}
        columns={2}
        background="navy"
      />

      <CourseTabs
        tabs={[
          {
            label: "Course 1",
            title: "How to Get Started with Coding and Robotics",
            subtitle:
              "A SACE-accredited micro course with 7 video modules. Practical, jargon-free guidance to confidently launch a Coding and Robotics programme at your school.",
            steps: [
              {
                title: "Understand the Curriculum",
                description:
                  "Decode how Coding and Robotics fits into the CAPS curriculum from Grade R to Grade 9, and align your programme with 4IR requirements.",
              },
              {
                title: "Set Up Your Classroom",
                description:
                  "Get real-world advice on configuring a STEAM lab, choosing the right devices, and preparing the infrastructure you actually need.",
              },
              {
                title: "Choose the Right Tools",
                description:
                  "Navigate coding platforms like Scratch, Python, MakeCode, and DroneBlocks, and identify which hardware is worth the investment.",
              },
              {
                title: "Start Teaching Immediately",
                description:
                  "Walk away with clear, actionable takeaways you can use in your very next lesson — designed for educators at any experience level.",
              },
            ],
          },
          {
            label: "Course 2",
            title: "Introduction to STEAM, Coding & Robotics",
            subtitle:
              "An unplugged, screen-free approach to early STEAM education. Perfect for pre-school and Foundation Phase educators looking to integrate Coding and Robotics into daily teaching.",
            steps: [
              {
                title: "Pattern Recognition & Sequencing",
                description:
                  "Teach learners to identify patterns, arrange steps in order, and build the foundational thinking skills that underpin all coding and robotics.",
              },
              {
                title: "Algorithms Without Screens",
                description:
                  "Introduce algorithmic thinking through hands-on activities using simple, reusable classroom materials — no devices or expensive kits required.",
              },
              {
                title: "CAPS-Aligned Framework",
                description:
                  "Every activity aligns with the CAPS curriculum, giving you confidence that your STEAM teaching meets national education standards.",
              },
              {
                title: "Ready-to-Use Activities",
                description:
                  "Walk away with practical, structured activities you can integrate into your daily teaching — bringing clarity, structure, and confidence to your STEAM lessons.",
              },
            ],
          },
          {
            label: "Course 3",
            title: "Micro:bit Level 1",
            subtitle:
              "A self-paced online course that takes you from initial setup to coding intermediate exercises in MakeCode — in under two hours. Includes a lesson plan and worksheet materials.",
            steps: [
              {
                title: "Setup & Getting Started",
                description:
                  "Learn how to set up your BBC micro:bit, connect it to your computer, and navigate the MakeCode coding environment step by step.",
              },
              {
                title: "Guided Coding Exercises",
                description:
                  "Work through foundational and intermediate coding exercises with clear, step-by-step instructions — building your skills progressively.",
              },
              {
                title: "Lesson Plan & Worksheets",
                description:
                  "Receive a comprehensive lesson plan and worksheet materials so you can take what you've learnt and deliver it directly to your learners.",
              },
              {
                title: "Certificate on Completion",
                description:
                  "Earn a professional development certificate when you complete the course — proof of your new micro:bit skills for your school and portfolio.",
              },
            ],
          },
          {
            label: "Course 4",
            title: "Essential STEAM Lab Kit Training",
            subtitle:
              "An advanced course for educators who have completed Micro:bit Level 1. Learn to create interactive, sensor-driven robotics lessons using the ELECFREAKS Tinker Kit — aligned to CAPS and focused on creativity, innovation, and real-world problem solving.",
            steps: [
              {
                title: "Integrate External Sensors",
                description:
                  "Learn how to connect and programme the Tinker Kit's sensors — PIR motion, soil moisture, light, temperature, and more — through the Octopus:bit breakout board.",
              },
              {
                title: "Build Interactive Projects",
                description:
                  "Create hands-on STEAM projects that respond to the real world — from plant monitors and intruder alarms to automated devices your learners will love.",
              },
              {
                title: "Deliver CAPS-Aligned Lessons",
                description:
                  "Every project maps to the Coding and Robotics curriculum. Teach with confidence knowing your lessons meet national education standards.",
              },
              {
                title: "From Coding to Innovation",
                description:
                  "Move beyond basic programming into creative, sensor-driven robotics. Empower your learners to design their own solutions to real-world problems.",
              },
            ],
          },
        ]}
      />

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-navy mb-4">
            Who Is This Bundle For?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Whether you&apos;re just getting started or ready to run a full
            STEAM lab, this bundle takes you from beginner to confident —
            with the hardware and training to match.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Educators Ready to Go Further",
                description:
                  "You've completed the basics and want the hardware and training to deliver hands-on, sensor-driven Coding and Robotics lessons.",
              },
              {
                title: "Schools Setting Up a STEAM Lab",
                description:
                  "Get the courses, micro:bit, and full electronics kit to equip your first STEAM lab — all in one purchase.",
              },
              {
                title: "HODs Rolling Out Coding & Robotics",
                description:
                  "Four courses covering curriculum, unplugged learning, micro:bit coding, and advanced sensors — everything your department needs.",
              },
              {
                title: "Homeschool Educators",
                description:
                  "A structured, self-paced programme with real hardware. Deliver engaging STEM lessons at home with 39+ projects to explore.",
              },
            ].map((persona, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-left"
              >
                <h3 className="text-sm font-semibold text-navy mb-2">
                  {persona.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {persona.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        title="Get the Complete Bundle"
        subtitle="Four courses, one micro:bit, a full electronics lab, and zero guesswork. Everything you need to teach Coding and Robotics with confidence."
        primaryLabel="Get the Bundle"
        primaryHref="#product-actions"
        background="navy"
      />

      <StepPath
        title="How the Inspire Campus Works"
        subtitle="All four courses are hosted on the Inspire Africa learning platform — a dedicated LMS built for STEM education in South Africa."
        steps={[
          {
            title: "Purchase & Get Your QR Code",
            description:
              "Complete your purchase and receive a QR code via email for instant access to all four courses.",
          },
          {
            title: "Work Through the Courses",
            description:
              "Video lessons, downloadable notes, and quizzes — all self-paced. Start with the curriculum overview and progress to hands-on coding.",
          },
          {
            title: "Practise on Your micro:bit & Tinker Kit",
            description:
              "Follow along with the Micro:bit Level 1 and Essential STEAM Lab Kit Training courses using the included hardware.",
          },
          {
            title: "Earn Your Certificates",
            description:
              "Complete courses and quizzes for professional development certificates — including SACE-accredited CPD points.",
          },
        ]}
        background="gray"
      />

      <ProductFAQ
        title="Common Questions"
        background="gray"
        faqs={[
          {
            question: "What exactly is included in this bundle?",
            answer:
              "You get four Inspire Africa courses — How to Get Started with Coding and Robotics, Introduction to STEAM, Coding & Robotics, Micro:bit Level 1, and Essential STEAM Lab Kit Training — plus a physical BBC micro:bit Go kit and a full ELECFREAKS micro:bit Tinker Kit with 13 sensor modules.",
          },
          {
            question: "How do I access the courses?",
            answer:
              "After purchase, you'll receive a QR code via email that gives you instant access to all four courses on the Inspire Africa learning platform. The BBC micro:bit Go and Tinker Kit will be delivered to your door.",
          },
          {
            question: "Do I need any prior STEM or coding knowledge?",
            answer:
              "Not at all. The courses are designed to take you from zero experience to delivering hands-on, sensor-driven lessons. Course 1 covers the curriculum, Course 2 introduces unplugged STEAM, Course 3 teaches micro:bit coding from scratch, and Course 4 builds on that with the Tinker Kit sensors.",
          },
          {
            question: "Is this bundle SACE-accredited?",
            answer:
              "The How to Get Started with Coding and Robotics course is SACE-accredited for professional development points. All four courses provide a certificate on completion.",
          },
          {
            question: "What's the difference between this and the Coding and Robotics bundle?",
            answer:
              "The Coding and Robotics bundle includes 3 courses and a BBC micro:bit Go. This bundle adds a fourth course (Essential STEAM Lab Kit Training) and a full ELECFREAKS Tinker Kit — giving you the hardware and training to deliver advanced, sensor-driven robotics lessons.",
          },
          {
            question: "Which grades and phases does this cover?",
            answer:
              "Between the four courses, you're covered from pre-school and Foundation Phase (with the unplugged STEAM course) through to Intermediate and Senior Phase (with the starter course, micro:bit training, and advanced sensor-based projects). That's Grade R through Grade 9.",
          },
          {
            question: "How long do the courses take to complete?",
            answer:
              "All four courses are self-paced. The Micro:bit Level 1 course takes under two hours, and the others are similarly compact. Most educators complete everything within two to three weeks alongside their regular schedule.",
          },
          {
            question: "What is the Essential STEAM Lab Kit Training course?",
            answer:
              "It's an advanced course designed for educators who have completed Micro:bit Level 1. It teaches you how to integrate the Tinker Kit's external sensors into interactive, CAPS-aligned classroom projects — moving from basic coding into creative, sensor-driven robotics.",
          },
          {
            question: "Do I need batteries?",
            answer:
              "The BBC micro:bit Go includes batteries and a battery holder. The Tinker Kit's battery box requires 2 x AAA batteries which are not included — but you can also power the setup via USB.",
          },
          {
            question: "Is this suitable for a whole school or department?",
            answer:
              "Absolutely. Contact us for group bookings if you'd like to enrol multiple educators. This bundle is ideal for upskilling an entire department or staff team.",
          },
        ]}
      />

      <CallToAction
        title="Ready to Run a Full STEAM Lab?"
        subtitle="Four courses, one micro:bit, 13 sensors, 39+ projects, and zero guesswork. Get everything you need to teach Coding and Robotics — from curriculum understanding to hands-on sensor-driven lessons."
        primaryLabel="Get the Bundle"
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
      "Master sensor-driven robotics with the BBC micro:bit and Elecfreaks Tinker Kit. Includes all hardware plus CAPS-aligned specialist training to turn coding into innovation. (Prerequisite: Micro:bit Level 1)",
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
