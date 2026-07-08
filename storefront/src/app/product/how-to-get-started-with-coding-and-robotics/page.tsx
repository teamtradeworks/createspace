import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
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

  return (
    <ProductTrackingProvider handle={PRODUCT_HANDLE}>
      <ProductJsonLd product={product} />
      <HeroSection
        product={product}
        tagline="Introductory Coding and Robotics educator onboarding, three self-paced courses to confidently teach Foundation Phase learners"
        highlights={[
          "3 self-paced educator onboarding courses",
          "SACE-accredited professional development",
          "For educators teaching ages 5–9",
          "No prior STEM experience required",
        ]}
        vendorOverride="InspireAfrica"
      />
      <QuickInfoBadges
        badges={[
          { icon: "time", label: "Duration", value: "Self-Paced" },
          { icon: "age", label: "Learner Ages", value: "5–9" },
          { icon: "tag", label: "SACE Accredited", value: "CPD Points" },
          { icon: "scratch", label: "Coding Platform", value: "ScratchJr" },
          { icon: "guide", label: "Phase", value: "Foundation Phase" },
          { icon: "award", label: "Certificate", value: "On Completion" },
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
                  "Navigate coding platforms and identify which hardware is worth the investment, from ScratchJr to micro:bit and beyond.",
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
            title: "Early STEAM, Coding and Robotics Foundations",
            subtitle:
              "A screen-free, unplugged approach to early STEAM education. Aligned with CAPS Foundation Phase requirements, this course helps educators teach sequencing, patterns, and algorithms through play.",
            steps: [
              {
                title: "CAPS Foundation Phase Alignment",
                description:
                  "Understand how Coding and Robotics integrates with the CAPS Foundation Phase curriculum, and where unplugged activities fit naturally into your teaching.",
              },
              {
                title: "Screen-Free Learning Activities",
                description:
                  "Teach sequencing, patterns, and algorithms through hands-on play using simple, reusable classroom materials, no devices or expensive kits required.",
              },
              {
                title: "Build Computational Thinking",
                description:
                  "Introduce the building blocks of computational thinking, pattern recognition, decomposition, and logical reasoning, through age-appropriate activities.",
              },
              {
                title: "Practical Unplugged STEAM",
                description:
                  "Walk away with structured, ready-to-use unplugged activities that bring STEAM to life in your Foundation Phase classroom.",
              },
            ],
          },
          {
            label: "Course 3",
            title: "Foundation Phase: ScratchJr Coding",
            subtitle:
              "Teach coding through stories and animation. See where ScratchJr fits within the curriculum, master the visual coding interface, and implement it in a single session.",
            steps: [
              {
                title: "Strategic Curriculum Integration",
                description:
                  "Understand where ScratchJr fits within the Foundation Phase curriculum and how it connects to sequencing, patterns, and storytelling.",
              },
              {
                title: "Master the Visual Coding Interface",
                description:
                  "Learn each block type, Trigger, Motion, Looks, Sound, Control, and End blocks, through creative sequencing exercises.",
              },
              {
                title: "Create Stories & Animations",
                description:
                  "Guide learners to build their own stories and animations, reinforcing cause-and-effect thinking through creative, hands-on projects.",
              },
              {
                title: "Complete Implementation",
                description:
                  "Everything you need to deliver ScratchJr coding in your classroom, designed to be implemented in a single session.",
              },
            ],
          },
        ]}
      />

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-navy mb-4">Who Is This Pathway For?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Whether you&apos;re just getting started or looking to bring structure to your early
            years STEM teaching, this pathway meets you where you are.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Foundation Phase Teachers New to STEM",
                description:
                  "Start with unplugged activities and build up to ScratchJr coding at your own pace.",
              },
              {
                title: "Pre-School Educators",
                description:
                  "Screen-free activities designed for the youngest learners, teach computational thinking through play.",
              },
              {
                title: "HODs Rolling Out Coding & Robotics",
                description:
                  "Equip your Foundation Phase team with curriculum knowledge and practical training.",
              },
              {
                title: "Homeschool Educators",
                description:
                  "A structured, self-paced programme you can deliver at home, no expensive hardware required.",
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
        subtitle="Three courses and everything you need to introduce Coding and Robotics to your Foundation Phase learners."
        primaryLabel="Get the Bundle"
        primaryHref="#product-actions"
        background="navy"
      />
      <StepPath
        title="How the Inspire Campus Works"
        subtitle="All three courses are hosted on the Inspire Africa learning platform, a dedicated LMS built for STEM education in South Africa."
        steps={[
          {
            title: "Purchase & Get Your Coupon Code",
            description:
              "Complete your purchase through CREATESPACE and receive a coupon code via email.",
          },
          {
            title: "Redeem on Inspire Africa",
            description:
              "Head to the Inspire Africa educator platform and redeem your coupon code to unlock access to all three courses.",
          },
          {
            title: "Work Through the Courses",
            description:
              "Video lessons, downloadable notes, and quizzes, all self-paced. Download the free ScratchJr app to follow along with the coding course.",
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
              "You get three Inspire Africa micro courses, Coding & Robotics: How to Get Started, Early STEAM, Coding and Robotics Foundations, and Foundation Phase: ScratchJr Coding.",
          },
          {
            question: "How do I access the courses?",
            answer:
              "After purchase, you'll receive a coupon code via email. Redeem it on the Inspire Africa educator platform to unlock access to all three courses.",
          },
          {
            question: "Do I need any prior STEM or coding knowledge?",
            answer:
              "Not at all. The courses are designed specifically for educators who are new to Coding and Robotics. Everything is explained in plain, jargon-free language, from curriculum understanding to visual block-based coding with ScratchJr.",
          },
          {
            question: "Is this SACE-accredited?",
            answer:
              "Yes, this pathway is SACE-accredited for professional development points. All three courses provide a certificate on completion.",
          },
          {
            question: "Which ages and grades does this cover?",
            answer:
              "This pathway is designed for educators teaching learners aged 5 to 9, covering the Foundation Phase (Grade R to Grade 3).",
          },
          {
            question: "How long do the courses take to complete?",
            answer:
              "All three courses are self-paced and compact. Most educators complete everything within a week or two alongside their regular schedule.",
          },
          {
            question: "Is this suitable for a whole school or department?",
            answer:
              "Absolutely. Contact us for group bookings if you'd like to enrol multiple educators. This bundle is ideal for upskilling your Foundation Phase team.",
          },
          {
            question: "Do I need hardware to complete the courses?",
            answer:
              "No hardware is required. The ScratchJr Coding course uses the free ScratchJr app (available on tablets), and the other two courses are completely screen-free and unplugged.",
          },
          {
            question: "What's the difference between this and the Advanced pathway?",
            answer:
              "This Early Years pathway focuses on Foundation Phase (ages 5–9) with unplugged activities and ScratchJr. The Advanced pathway targets Intermediate and Senior Phase (ages 9–18) and includes Scratch coding, micro:bit programming, and sensor-driven STEAM lab projects.",
          },
          {
            question: "What are the terms of access?",
            answer:
              "Access to the Inspire Africa learning platform is provided as an annual educator license. Your license gives you full access to all three courses for 12 months from the date of purchase.",
          },
        ]}
      />
      <CallToAction
        title="Ready to Launch Coding and Robotics?"
        subtitle="Three courses, zero guesswork. Everything you need to start teaching Coding and Robotics in Foundation Phase."
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
      "Early Years Coding & Robotics training: 3 SACE-accredited courses for Foundation Phase educators (ages 5–9). Unplugged STEAM and ScratchJr coding.",
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
