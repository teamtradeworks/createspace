"use client";

import { useState } from "react";
import { CallToAction } from "@/components/product-sections/CallToAction";
import { FeatureGrid } from "@/components/product-sections/FeatureGrid";
import { ImageTextBlock } from "@/components/product-sections/ImageTextBlock";
import { LearningOutcomes } from "@/components/product-sections/LearningOutcomes";
import { NumberedSteps } from "@/components/product-sections/NumberedSteps";
import { ProductFAQ } from "@/components/product-sections/ProductFAQ";
import { ProductTestimonials } from "@/components/product-sections/ProductTestimonials";
import { ProjectShowcase } from "@/components/product-sections/ProjectShowcase";
import { QuickInfoBadges } from "@/components/product-sections/QuickInfoBadges";
import { SkillTags } from "@/components/product-sections/SkillTags";
import { Specifications } from "@/components/product-sections/Specifications";
import { VideoEmbed } from "@/components/product-sections/VideoEmbed";
import { WhatsIncluded } from "@/components/product-sections/WhatsIncluded";
import { CustomerShowcase } from "@/components/product-sections/CustomerShowcase";

interface ComponentWrapperProps {
  name: string;
  description: string;
  children: React.ReactNode;
}

function ComponentWrapper({ name, description, children }: ComponentWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      <div
        className={`absolute top-4 left-4 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl max-w-sm transition-all duration-200 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <p className="font-mono font-bold text-sm text-cs-orange">{name}</p>
        <p className="text-xs text-gray-300 mt-1">{description}</p>
      </div>

      {/* Hover indicator border */}
      <div
        className={`transition-all duration-200 ${
          isHovered ? "ring-2 ring-cs-orange ring-inset" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function KitchenSinkPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-900 text-white py-8 px-4">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold mb-2">Product Components</h1>
          <p className="text-gray-400 text-sm">
            Hover over any section to see component name and description
          </p>
        </div>
      </div>

      {/* QuickInfoBadges */}
      <ComponentWrapper
        name="QuickInfoBadges"
        description="Displays key product info at a glance: age, skill level, supervision, batteries, and custom badges"
      >
        <QuickInfoBadges
          age="10+"
          skill="beginner"
          supervision={false}
          batteries="4x AA (not included)"
          badges={[
            { icon: "time", label: "Build Time", value: "2-3 hours" },
            { icon: "projects", label: "Projects", value: "15+" },
          ]}
        />
      </ComponentWrapper>

      {/* SkillTags */}
      <ComponentWrapper
        name="SkillTags"
        description="STEM and life skill tags with color-coded styling based on skill type"
      >
        <SkillTags
          title="Skills Developed"
          tags={[
            "Circuits",
            "Coding",
            "Robotics",
            "Problem Solving",
            "Creativity",
            "Patience & Focus",
          ]}
        />
      </ComponentWrapper>

      {/* ImageTextBlock - Image Left */}
      <ComponentWrapper
        name="ImageTextBlock (image-left)"
        description="Split section with image and text. Props: layout, background (white/gray/navy)"
      >
        <ImageTextBlock
          image="/images/products/kitchen-sink/kids-building-project.jpg"
          imageAlt="Kids building a project"
          title="Perfect for Young Inventors"
          body="This kit is designed to spark curiosity and inspire creativity. Children will learn fundamental STEM concepts through hands-on building and experimentation. Each project builds on the previous one, creating a progressive learning journey."
          layout="image-left"
          background="white"
        />
      </ComponentWrapper>

      {/* ImageTextBlock - Image Right */}
      <ComponentWrapper
        name="ImageTextBlock (image-right)"
        description="Split section with image on the right. Supports string or JSX body content"
      >
        <ImageTextBlock
          image="/images/products/kitchen-sink/child-coding-with-robot.jpg"
          imageAlt="Child coding with robot"
          title="Real-World Applications"
          body={
            <>
              <p>
                Learn the same principles used by professional engineers and
                scientists. Build projects that actually work and demonstrate real
                physics and engineering concepts.
              </p>
              <p>
                From simple circuits to complex robots, each project teaches
                valuable skills that can be applied in school and beyond.
              </p>
            </>
          }
          layout="image-right"
          background="gray"
        />
      </ComponentWrapper>

      {/* LearningOutcomes */}
      <ComponentWrapper
        name="LearningOutcomes"
        description="Checklist of learning outcomes with green checkmarks. Optional image and subtitle"
      >
        <LearningOutcomes
          title="What They'll Learn"
          subtitle="Skills developed through hands-on building and experimentation"
          outcomes={[
            "Understand basic electronics and circuit design",
            "Learn programming fundamentals through visual coding",
            "Develop problem-solving and critical thinking skills",
            "Gain hands-on experience with mechanical engineering",
            "Build confidence through completing projects",
          ]}
          background="white"
        />
      </ComponentWrapper>

      {/* LearningOutcomes with Image */}
      <ComponentWrapper
        name="LearningOutcomes (with image, navy)"
        description="Learning outcomes with accompanying image. Navy background uses orange checkmarks"
      >
        <LearningOutcomes
          title="Skills for the Future"
          outcomes={[
            "Computational thinking and logic",
            "Creative problem-solving approaches",
            "Patience and attention to detail",
            "Following instructions accurately",
          ]}
          image="/images/products/kitchen-sink/kids-with-electronics.jpg"
          imageAlt="Kids with electronics"
          background="navy"
        />
      </ComponentWrapper>

      {/* FeatureGrid - 3 columns */}
      <ComponentWrapper
        name="FeatureGrid (3 columns)"
        description="Grid of features with icons. Supports 2, 3, or 4 columns. Icons: code, robot, book, tools, wifi, lightbulb, sensor, battery, bluetooth, app, etc."
      >
        <FeatureGrid
          title="Why Choose This Kit"
          subtitle="Everything you need for an amazing learning experience"
          columns={3}
          background="gray"
          features={[
            {
              icon: "code",
              title: "Visual Coding",
              description: "Block-based programming makes coding accessible for beginners",
            },
            {
              icon: "robot",
              title: "Build Robots",
              description: "Construct real working robots with motors and sensors",
            },
            {
              icon: "book",
              title: "Guided Learning",
              description: "Step-by-step instructions with clear explanations",
            },
            {
              icon: "tools",
              title: "No Tools Needed",
              description: "Everything snaps together without special tools",
            },
            {
              icon: "wifi",
              title: "App Control",
              description: "Control your creations from a smartphone or tablet",
            },
            {
              icon: "lightbulb",
              title: "Creative Freedom",
              description: "Unlimited possibilities for custom builds",
            },
          ]}
        />
      </ComponentWrapper>

      {/* FeatureGrid - 4 columns, navy background */}
      <ComponentWrapper
        name="FeatureGrid (4 columns, navy)"
        description="Feature grid with navy background. Cards have white/10 background"
      >
        <FeatureGrid
          title="Technical Features"
          columns={4}
          background="navy"
          features={[
            { icon: "sensor", title: "Multiple Sensors", description: "Touch, color, and distance" },
            { icon: "battery", title: "Rechargeable", description: "Built-in battery pack" },
            { icon: "bluetooth", title: "Bluetooth", description: "Wireless connectivity" },
            { icon: "app", title: "Free App", description: "iOS and Android support" },
          ]}
        />
      </ComponentWrapper>

      {/* NumberedSteps */}
      <ComponentWrapper
        name="NumberedSteps"
        description="Sequential steps with orange numbered circles. Supports 2, 3, or 4 columns"
      >
        <NumberedSteps
          title="How It Works"
          subtitle="Getting started is easy"
          columns={3}
          background="white"
          steps={[
            {
              title: "Unbox & Explore",
              description: "Open the kit and familiarise yourself with all the components",
            },
            {
              title: "Build Your First Project",
              description: "Follow the guided instructions to build your first creation",
            },
            {
              title: "Program & Play",
              description: "Download the app and bring your creation to life with code",
            },
          ]}
        />
      </ComponentWrapper>

      {/* NumberedSteps - Navy Card */}
      <ComponentWrapper
        name="NumberedSteps (navy-card)"
        description="Steps in a navy card container on white background. Great for visual emphasis"
      >
        <NumberedSteps
          title="Learning Journey"
          columns={4}
          background="navy-card"
          steps={[
            { title: "Discover", description: "Explore STEM concepts" },
            { title: "Build", description: "Construct projects" },
            { title: "Code", description: "Program behavior" },
            { title: "Create", description: "Invent your own" },
          ]}
        />
      </ComponentWrapper>

      {/* ProjectShowcase */}
      <ComponentWrapper
        name="ProjectShowcase"
        description="Grid of project cards with numbered badges and 'Learn:' concepts. Supports 2 or 3 columns"
      >
        <ProjectShowcase
          title="Sample Projects"
          subtitle="Just a few of the many projects you can build"
          columns={3}
          background="gray"
          projects={[
            {
              name: "Line-Following Robot",
              description: "Build a robot that follows a black line on the floor",
              concepts: "Sensors, loops, conditionals",
            },
            {
              name: "Remote Control Car",
              description: "Create a car you can drive using your phone",
              concepts: "Motors, Bluetooth, controls",
            },
            {
              name: "Alarm System",
              description: "Design a motion-detecting security system",
              concepts: "Sensors, sounds, events",
            },
          ]}
          moreText="Plus 12 more projects included in the guidebook!"
        />
      </ComponentWrapper>

      {/* CustomerShowcase - 5 images */}
      <ComponentWrapper
        name="CustomerShowcase (5 images)"
        description="End-user photo gallery with labels and hover descriptions. 5 images: 2 top row (4:3), 3 bottom row (squares)"
      >
        <CustomerShowcase
          title="Customer Creations"
          subtitle="See what our community has built"
          background="white"
          images={[
            {
              src: "/images/products/kitchen-sink/end-user-builds.jpg",
              alt: "Robot and crane builds",
              label: "Project Showcase",
              description: "A customer built both the robot and crane projects from our kit in a single weekend!",
            },
            {
              src: "/images/products/kitchen-sink/end-user-led-press.jpg",
              alt: "LED circuit with finger press",
              label: "First Circuit",
              description: "Testing the LED circuit - the moment it lights up is always exciting!",
            },
            {
              src: "/images/products/kitchen-sink/end-user-booklet.jpg",
              alt: "Guidebook with breadboard",
              label: "Learning",
              description: "Following along with the step-by-step guidebook.",
            },
            {
              src: "/images/products/kitchen-sink/end-user-unboxing.jpg",
              alt: "Boy with new kit",
              label: "Unboxing",
              description: "The excitement of opening a new STEM kit!",
            },
            {
              src: "/images/products/kitchen-sink/end-user-plant.jpg",
              alt: "Plant monitoring project",
              label: "Advanced Project",
              description: "An automated plant monitoring system built with sensors.",
            },
          ]}
        />
      </ComponentWrapper>

      {/* CustomerShowcase - Standard Layout (2 images) */}
      <ComponentWrapper
        name="CustomerShowcase (2 images)"
        description="Smaller image counts use equal-sized grid. Works with 2-7+ images"
      >
        <CustomerShowcase
          title="More Customer Projects"
          background="gray"
          images={[
            {
              src: "/images/products/kitchen-sink/end-user-led-press.jpg",
              alt: "LED circuit",
              label: "Electronics",
              description: "First successful LED circuit!",
            },
            {
              src: "/images/products/kitchen-sink/end-user-unboxing.jpg",
              alt: "New kit",
              label: "Unboxing",
              description: "Ready to start building!",
            },
          ]}
        />
      </ComponentWrapper>

      {/* WhatsIncluded */}
      <ComponentWrapper
        name="WhatsIncluded"
        description="Checklist of box contents in a responsive grid. Optional image on left"
      >
        <WhatsIncluded
          title="What's in the Box"
          background="gray"
          items={[
            "Main controller unit",
            "2x DC motors",
            "Touch sensor",
            "Color sensor",
            "Distance sensor",
            "300+ building blocks",
            "USB charging cable",
            "Project guidebook",
            "Quick start guide",
          ]}
        />
      </ComponentWrapper>

      {/* WhatsIncluded with Image */}
      <ComponentWrapper
        name="WhatsIncluded (with image)"
        description="Box contents with product image. Image uses object-contain with padding"
      >
        <WhatsIncluded
          title="Kit Contents"
          background="white"
          image="/images/products/kitchen-sink/kit-contents.jpg"
          imageAlt="Kit contents"
          items={[
            "Arduino UNO board",
            "USB cable",
            "Breadboard",
            "LED lights",
            "Resistors",
            "Sensors",
            "Project book",
          ]}
        />
      </ComponentWrapper>

      {/* VideoEmbed */}
      <ComponentWrapper
        name="VideoEmbed"
        description="YouTube or Vimeo embed. Supports 16:9, 4:3, and 1:1 aspect ratios"
      >
        <VideoEmbed
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          title="See It in Action"
          aspectRatio="16:9"
          background="white"
        />
      </ComponentWrapper>

      {/* Specifications */}
      <ComponentWrapper
        name="Specifications"
        description="Product specs in alternating row table. Background: white or gray"
      >
        <Specifications
          title="Technical Specifications"
          background="gray"
          specs={[
            { label: "Recommended Age", value: "10+ years" },
            { label: "Number of Pieces", value: "358 components" },
            { label: "Battery", value: "Rechargeable Li-ion (included)" },
            { label: "Connectivity", value: "Bluetooth 5.0" },
            { label: "Compatible Devices", value: "iOS 12+, Android 8+" },
            { label: "Dimensions", value: "32 x 24 x 8 cm (boxed)" },
            { label: "Weight", value: "1.2 kg" },
            { label: "Warranty", value: "1 year manufacturer warranty" },
          ]}
        />
      </ComponentWrapper>

      {/* ProductTestimonials */}
      <ComponentWrapper
        name="ProductTestimonials"
        description="Customer reviews with star ratings and avatars. Auto-adjusts grid for 1, 2, or 3+ testimonials"
      >
        <ProductTestimonials
          title="What Parents Are Saying"
          background="white"
          testimonials={[
            {
              quote: "My son hasn't put it down since we got it. He's learned so much about coding and robotics!",
              author: "Sarah M.",
              role: "Parent",
              rating: 5,
            },
            {
              quote: "Great quality and the instructions are clear enough for kids to follow independently.",
              author: "David K.",
              role: "Parent",
              rating: 5,
            },
            {
              quote: "Perfect gift for curious kids. The projects are challenging but achievable.",
              author: "Lisa T.",
              role: "Grandmother",
              rating: 4,
            },
          ]}
        />
      </ComponentWrapper>

      {/* ProductTestimonials - Navy */}
      <ComponentWrapper
        name="ProductTestimonials (navy)"
        description="Testimonials with navy background. Cards have white/10 background"
      >
        <ProductTestimonials
          title="Loved by Kids and Parents"
          background="navy"
          testimonials={[
            {
              quote: "The best educational toy we've ever bought. Worth every cent!",
              author: "James R.",
              rating: 5,
            },
            {
              quote: "My daughter built her first robot and couldn't stop showing it to everyone.",
              author: "Michelle S.",
              rating: 5,
            },
          ]}
        />
      </ComponentWrapper>

      {/* ProductFAQ */}
      <ComponentWrapper
        name="ProductFAQ"
        description="Accordion-style FAQ with expand/collapse. Background: white or gray"
      >
        <ProductFAQ
          title="Frequently Asked Questions"
          background="white"
          faqs={[
            {
              question: "What age is this suitable for?",
              answer: "This kit is designed for children aged 10 and above. Younger children may need adult supervision to complete some projects.",
            },
            {
              question: "Are batteries included?",
              answer: "Yes, the kit includes a rechargeable battery pack. Simply charge via the included USB cable before first use.",
            },
            {
              question: "Do I need to download any software?",
              answer: "Yes, you'll need to download our free app (available on iOS and Android) to program your creations. The app is easy to use and includes tutorials.",
            },
            {
              question: "Is this compatible with other building systems?",
              answer: "Our blocks are designed to work with most major brick-building systems, giving you even more creative possibilities.",
            },
          ]}
        />
      </ComponentWrapper>

      {/* CallToAction - Navy */}
      <ComponentWrapper
        name="CallToAction (navy)"
        description="CTA with primary (orange) and optional secondary button. Background: navy, gray, or white"
      >
        <CallToAction
          title="Ready to Start the STEM Journey?"
          subtitle="Order now and inspire a love of learning that lasts a lifetime"
          primaryLabel="Add to Cart"
          primaryHref="#"
          secondaryLabel="View All STEM Kits"
          secondaryHref="/shop"
          background="navy"
        />
      </ComponentWrapper>

      {/* CallToAction - Gray */}
      <ComponentWrapper
        name="CallToAction (gray)"
        description="CTA with gray background. Secondary button has navy border"
      >
        <CallToAction
          title="Questions? We're Here to Help"
          subtitle="Our STEM specialists can help you choose the perfect kit"
          primaryLabel="Contact Us"
          primaryHref="/contact"
          background="gray"
        />
      </ComponentWrapper>

      {/* CallToAction - White */}
      <ComponentWrapper
        name="CallToAction (white)"
        description="CTA with white background and both buttons"
      >
        <CallToAction
          title="Explore Our Full Range"
          subtitle="Find the perfect STEM kit for every age and interest"
          primaryLabel="Shop Now"
          primaryHref="/shop"
          secondaryLabel="Learn More"
          secondaryHref="/about"
          background="white"
        />
      </ComponentWrapper>

      {/* Footer Notes */}
      <div className="bg-gray-900 text-white py-8 px-4">
        <div className="mx-auto max-w-7xl text-sm text-gray-400">
          <p className="mb-2">
            <strong className="text-white">Not shown:</strong> HeroSection and RelatedProducts (require Shopify product data)
          </p>
          <p>
            <strong className="text-white">Source:</strong>{" "}
            <code className="bg-gray-800 px-2 py-0.5 rounded text-xs">
              src/components/product-sections/
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}
