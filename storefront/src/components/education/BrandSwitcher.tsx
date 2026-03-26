"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";

type Brand = "matata" | "microbit";

interface BrandSwitcherProps {
  matataProducts: Product[];
  microbitProducts: Product[];
}

const CHECK_ICON = (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M5 13l4 4L19 7"
  />
);

const brands = {
  matata: {
    name: "MatataStudio",
    ages: "Ages 3 – 12",
    phases: "Foundation – Intermediate Phase",
    color: "cs-orange",
    image: "/images/products/matatastudio-coding-set-pro/child-playing-with-kit.png",
    imageAlt:
      "Child placing physical coding blocks on MatataStudio Coding Set Pro board",
    tags: ["Screen-Free Coding", "Tangible Blocks", "No Literacy Needed", "Robotics"],
    intro:
      "MatataStudio makes coding tangible. Young learners place physical coding blocks on a board to programme a robot \u2014 no screens, no apps, no reading required. It\u2019s as intuitive as building with blocks.",
    background:
      "Founded in 2017, MatataStudio serves over 20,000 schools and institutions worldwide. Their products are ISTE-certified and have won Red Dot, iF, and Good Design awards for their thoughtful, child-friendly design.",
    reasons: [
      "Screen-free coding for young children \u2014 eliminates screen time concerns",
      "No literacy needed \u2014 symbol-based blocks work for pre-readers",
      "Grows with learners: from button-press robots (age 3) to AI and Python (age 12+)",
      "Cross-curricular: integrates maths, science, storytelling, art, and music",
      "LEGO-compatible \u2014 extends with building blocks children already know",
    ],
    images: [
      {
        src: "/images/education/classroom-kits/matata-talebot-classroom.jpg",
        alt: "Teacher using MatataStudio Tale-Bot Pro with young learners in classroom",
      },
      {
        src: "/images/education/classroom-kits/matata-vincibot-classroom.jpg",
        alt: "Students working with MatataStudio VinciBot coding robot",
      },
    ],
    productLines: [
      {
        ages: "Ages 3 \u2013 5",
        name: "Tale-Bot Pro",
        description:
          "A button-press coding robot that walks, draws, sings, dances, and records voice. Children learn commands, sequences, and loops through play. Comes with interactive story maps and building block accessories.",
      },
      {
        ages: "Ages 4 \u2013 9",
        name: "Coding Set Pro",
        description:
          "Physical coding blocks with directional symbols control a robot car \u2014 completely screen-free and word-free. Children plan routes, execute programmes, and debug their code. Expandable with Artist, Musician, and Sensor add-ons.",
      },
      {
        ages: "Ages 8 \u2013 12",
        name: "VinciBot",
        description:
          "Dual programming in Scratch (blocks) and Python (text) with 8 built-in sensors, LED matrix display, and LEGO/Technic compatibility. Expandable with AI Vision Kit for machine learning projects.",
      },
    ],
    productsTitle: "MatataStudio Classroom Kits",
  },
  microbit: {
    name: "BBC micro:bit",
    ages: "Ages 8 \u2013 14",
    phases: "Intermediate \u2013 Senior Phase",
    color: "cs-blue",
    image: "/images/products/bbc-micro-bit-go/boy-holding-microbit.jpg",
    imageAlt:
      "Boy holding a BBC micro:bit board showing the LED matrix and sensors",
    tags: ["Physical Computing", "Block & Python Coding", "Built-in Sensors", "Expandable"],
    intro:
      "The BBC micro:bit is a pocket-sized computer (5cm \u00d7 4cm) packed with sensors, LEDs, buttons, a speaker, and a microphone. Learners write real code and see it come to life instantly on the hardware.",
    background:
      "Created by the Micro:bit Educational Foundation (a non-profit), the micro:bit is used in over 60 countries. All programming tools are free and browser-based \u2014 no software installation needed.",
    reasons: [
      "Free coding tools \u2014 MakeCode and Python editors run in any browser",
      "Built-in sensors: accelerometer, compass, temperature, light, and microphone",
      "Instant feedback \u2014 code makes real LEDs light up, real speakers play sound",
      "From blocks to Python \u2014 learners progress at their own pace",
      "Massive ecosystem: 100+ expansion kits for robotics, IoT, smart home, and more",
    ],
    images: [
      {
        src: "/images/education/classroom-kits/microbit-kids-collaborating.jpg",
        alt: "Two students collaborating on a BBC micro:bit project in MakeCode",
      },
      {
        src: "/images/education/classroom-kits/microbit-teacher-screen.jpg",
        alt: "Teacher demonstrating BBC micro:bit programming to classroom",
      },
    ],
    productLines: [
      {
        ages: "Hardware",
        name: "Packed with Sensors",
        description:
          "5\u00d75 LED matrix, 2 programmable buttons, touch-sensitive logo, accelerometer, compass, temperature sensor, light sensor, microphone, and speaker \u2014 all built in. No extra parts needed to start exploring.",
      },
      {
        ages: "Software",
        name: "Free Coding Platforms",
        description:
          "Microsoft MakeCode for drag-and-drop block coding, plus a browser-based Python editor for text coding. Both are free, require no installation, and work on any device with a browser.",
      },
      {
        ages: "Expandable",
        name: "Grow Your Programme",
        description:
          "Start with the micro:bit board, then expand with robot cars, smart home kits, agriculture sensors, IoT kits, and more. The edge connector supports hundreds of compatible accessories.",
      },
    ],
    productsTitle: "BBC micro:bit Kits",
  },
} as const;

const colorMap = {
  "cs-orange": {
    tagBg: "bg-cs-orange/10",
    tagText: "text-cs-orange",
    checkText: "text-cs-orange",
    cardBg: "bg-cs-orange/5",
    cardBorder: "border-cs-orange/20",
    labelText: "text-cs-orange",
    ageBadgeBg: "bg-cs-orange",
    ring: "ring-cs-orange",
    borderActive: "border-cs-orange",
  },
  "cs-blue": {
    tagBg: "bg-cs-blue/10",
    tagText: "text-cs-blue",
    checkText: "text-cs-blue",
    cardBg: "bg-cs-blue/5",
    cardBorder: "border-cs-blue/20",
    labelText: "text-cs-blue",
    ageBadgeBg: "bg-cs-blue",
    ring: "ring-cs-blue",
    borderActive: "border-cs-blue",
  },
};

export default function BrandSwitcher({
  matataProducts,
  microbitProducts,
}: BrandSwitcherProps) {
  const [active, setActive] = useState<Brand>("matata");

  const brand = brands[active];
  const products = active === "matata" ? matataProducts : microbitProducts;
  const colors = colorMap[brand.color];

  return (
    <div>
      {/* Brand Selector Tabs */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
        {(["matata", "microbit"] as const).map((key) => {
          const b = brands[key];
          const c = colorMap[b.color];
          const isActive = active === key;

          return (
            <button
              key={key}
              onMouseEnter={() => setActive(key)}
              onClick={() => setActive(key)}
              className={`text-left bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 group ${
                isActive
                  ? `${c.borderActive} shadow-lg`
                  : "border-gray-100 hover:shadow-md opacity-70 hover:opacity-100"
              }`}
            >
              <div className="relative h-44 sm:h-52 overflow-hidden">
                <Image
                  src={b.image}
                  alt={b.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span
                    className={`${c.ageBadgeBg} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                  >
                    {b.ages}
                  </span>
                  {isActive && (
                    <span className="bg-white/90 text-navy text-xs font-semibold px-3 py-1 rounded-full">
                      Viewing
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-navy mb-2">
                  {b.name}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {b.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`${c.tagBg} ${c.tagText} text-xs font-medium px-2 py-0.5 rounded-full`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Brand Content */}
      <div className="max-w-7xl mx-auto">
        {/* Brand Detail */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span
              className={`${colors.labelText} font-medium text-sm uppercase tracking-wider`}
            >
              {brand.ages} &middot; {brand.phases}
            </span>
            <h3 className="text-3xl md:text-4xl font-semibold text-navy mt-2 mb-6">
              {brand.name}
            </h3>
            <p className="text-gray-600 mb-6 text-lg">{brand.intro}</p>
            <p className="text-gray-600 mb-6">{brand.background}</p>

            <div className="space-y-4">
              <h4 className="font-semibold text-navy">
                Why teachers choose {brand.name}:
              </h4>
              <ul className="space-y-3">
                {brand.reasons.map((item) => (
                  <li key={item} className="flex items-start text-gray-600">
                    <svg
                      className={`w-5 h-5 ${colors.checkText} mr-3 mt-0.5 flex-shrink-0`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {CHECK_ICON}
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {brand.images.map((img) => (
              <div
                key={img.src}
                className="relative h-48 md:h-64 rounded-xl overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Line Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {brand.productLines.map((line) => (
            <div
              key={line.name}
              className={`${colors.cardBg} rounded-xl p-6 border ${colors.cardBorder}`}
            >
              <span className={`${colors.labelText} font-semibold text-sm`}>
                {line.ages}
              </span>
              <h4 className="font-semibold text-navy mt-1 mb-2">
                {line.name}
              </h4>
              <p className="text-gray-600 text-sm">{line.description}</p>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        {products.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-navy mb-6">
              {brand.productsTitle}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
