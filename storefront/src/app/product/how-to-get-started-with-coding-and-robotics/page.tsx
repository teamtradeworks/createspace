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

const PRODUCT_HANDLE = "how-to-get-started-with-coding-and-robotics";

export default async function HowToGetStartedWithCodingAndRoboticsPage() {
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
        tagline="Everything an educator needs to start teaching Coding and Robotics — three professional courses in one bundle"
        highlights={[
          "3 Inspire Africa micro courses included",
          "SACE-accredited professional development",
          "Covers Grade R through Grade 9",
          "No prior STEM experience required",
        ]}
        addons={addons}
      />
      <QuickInfoBadges
        badges={[
          { icon: "time", label: "Duration", value: "6-8 Hours" },
          { icon: "age", label: "Audience", value: "Educators" },
          { icon: "tag", label: "SACE Accredited", value: "CPD Points" },
          { icon: "app", label: "Coding Platform", value: "MakeCode" },
          { icon: "guide", label: "Phases", value: "Grade R – Grade 9" },
          { icon: "tag", label: "Certificate", value: "On Completion" },
          { icon: "app", label: "Access", value: "Computer, Tablet & Mobile" },
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
        ]}
      />

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-navy mb-4">Who Is This Bundle For?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Whether you&apos;re just getting started or looking to formalise your school&apos;s STEM
            programme, this bundle meets you where you are.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Foundation Phase Teachers New to STEM",
                description:
                  "Start with unplugged activities and build up to hands-on coding at your own pace.",
              },
              {
                title: "Homeschool Educators",
                description:
                  "A structured, self-paced programme you can deliver at home. Add the hardware when you're ready.",
              },
              {
                title: "HODs Rolling Out Coding & Robotics",
                description:
                  "Get the curriculum knowledge and practical training to lead your department with confidence.",
              },
              {
                title: "Schools Without a Dedicated STEM Lab",
                description:
                  "Everything you need fits in a laptop bag — no special classroom setup required.",
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
        title="Get Started Today"
        subtitle="Three courses and everything you need to teach Coding and Robotics with confidence."
        primaryLabel="Get the Bundle"
        primaryHref="#product-actions"
        background="navy"
      />
      <StepPath
        title="How the Inspire Campus Works"
        subtitle="All three courses are hosted on the Inspire Africa learning platform — a dedicated LMS built for STEM education in South Africa."
        steps={[
          {
            title: "Purchase & Get Your QR Code",
            description:
              "Complete your purchase and receive a QR code via email for instant access.",
          },
          {
            title: "Work Through the Courses",
            description: "Video lessons, downloadable notes, and quizzes — all self-paced.",
          },
          {
            title: "Practise What You Learn",
            description:
              "Follow along with the Micro:bit Level 1 course. Add the hardware as an optional extra when you're ready to go hands-on.",
          },
          {
            title: "Earn Your Certificates",
            description: "Complete courses and quizzes for professional development certificates.",
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
              "You get three Inspire Africa micro courses — How to Get Started with Coding and Robotics, Introduction to STEAM, Coding & Robotics, and Micro:bit Level 1. You can also add a BBC micro:bit Go as an optional extra.",
          },
          {
            question: "How do I access the courses?",
            answer:
              "After purchase, you'll receive a QR code via email that gives you instant access to all three courses on the Inspire Africa learning platform.",
          },
          {
            question: "Do I need any prior STEM or coding knowledge?",
            answer:
              "Not at all. The courses are designed specifically for educators who are new to Coding and Robotics. Everything is explained in plain, jargon-free language — from curriculum understanding to hands-on micro:bit coding.",
          },
          {
            question: "Is this bundle SACE-accredited?",
            answer:
              "The How to Get Started with Coding and Robotics course is SACE-accredited for professional development points. All three courses provide a certificate on completion.",
          },
          {
            question: "Which grades and phases does this cover?",
            answer:
              "Between the three courses, you're covered from pre-school and Foundation Phase (with the unplugged STEAM course) through to Intermediate and Senior Phase (with the starter course and micro:bit training). That's Grade R through Grade 9.",
          },
          {
            question: "How long do the courses take to complete?",
            answer:
              "All three courses are self-paced. The Micro:bit Level 1 course takes under two hours, and the other two are similarly compact. Most educators complete everything within a week or two alongside their regular schedule.",
          },
          {
            question: "Is this suitable for a whole school or department?",
            answer:
              "Absolutely. Contact us for group bookings if you'd like to enrol multiple educators. This bundle is ideal for upskilling an entire department or staff team.",
          },
          {
            question: "Do I need hardware to complete the courses?",
            answer:
              "The Micro:bit Level 1 course is designed to be used with a BBC micro:bit. You can add one as an optional extra when purchasing. The first two courses don't require any hardware.",
          },
        ]}
      />
      <CallToAction
        title="Ready to Launch Coding and Robotics?"
        subtitle="Three courses, zero guesswork. Get everything you need to start teaching Coding and Robotics at your school."
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
      "Educator starter bundle: 3 Inspire Africa micro courses covering curriculum, STEAM foundations, and micro:bit coding. SACE-accredited.",
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
