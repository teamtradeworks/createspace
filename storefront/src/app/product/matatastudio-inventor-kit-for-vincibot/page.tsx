import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  ExtensionBanner,
  QuickInfoBadges,
  NumberedSteps,
  VideoEmbed,
  FeatureGrid,
  ImageTextBlock,
  ProjectShowcase,
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "matatastudio-inventor-kit-for-vincibot";
const PARENT_PRODUCT_HANDLE = "matatastudio-vincibot-coding-robot-set";

export default async function VinciBotInventorKitPage() {
  const [product, parentProduct] = await Promise.all([
    getProductByHandle(PRODUCT_HANDLE),
    getProductByHandle(PARENT_PRODUCT_HANDLE),
  ]);

  if (!product) {
    notFound();
  }

  const resolvedAddons = await resolveAddonsForHandle(PRODUCT_HANDLE);
  const addons = serializeAddons(resolvedAddons);

  const parentProductName = parentProduct?.title ?? "VinciBot";
  const parentProductHref = `/product/${PARENT_PRODUCT_HANDLE}`;

  return (
    <ProductTrackingProvider handle={PRODUCT_HANDLE}>
      <ProductJsonLd product={product} />

      {/* Hero Section */}
      <HeroSection
        product={product}
        tagline="5 real electronic sensors and 7 guided projects — add electronics to your VinciBot"
        highlights={[
          "7 step-by-step projects: Intelligent Fan, Waste Bin, Rock Paper Scissors, and more",
          "Real sensors: temperature, joystick, 360° servo, LED strip, and rotary angle",
          "Module Link Unit connects VinciBot to Arduino and Micro:bit sensors",
          "No soldering, no extra tools — plugs directly into VinciBot",
        ]}
        addons={addons}
      />

      {/* Extension Banner */}
      <ExtensionBanner
        parentProductName={parentProductName}
        parentProductHref={parentProductHref}
        message={
          <>
            This is an expansion for{" "}
            <Link
              href={parentProductHref}
              className="font-semibold text-[#3CC7F7] underline underline-offset-2 hover:text-[#0C1446]"
            >
              {parentProductName}
            </Link>
            . You&apos;ll need VinciBot to use it — already have one? This is your next step.
          </>
        }
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* What This Adds */}
      <NumberedSteps
        title="What the Inventor Kit Adds"
        subtitle="Your child already codes with VinciBot. Now they can connect real electronic sensors and see their code control the physical world."
        steps={[
          {
            title: "Real Sensors — Not Toy Approximations",
            description:
              "The DHT11 measures actual temperature and humidity. The joystick is the same analog input used in game controllers. The 360° servo opens a bin lid or spins a fan with precision. These are genuine electronic components used in professional prototyping, not simplified toy versions. Your child learns electronics on the real thing.",
          },
          {
            title: "7 Guided Projects that Bridge Code and the Physical World",
            description:
              "The building manual walks through 7 structured electronics projects: an Intelligent Fan that responds to conditions, a Waste Bin that opens on command, a joystick-powered Rock Paper Scissors game, an Ambient Light display, a Game Designer challenge, a Fun Activities collection, and more. Each project teaches a different aspect of physical computing.",
          },
          {
            title: "A Gateway to Limitless Electronics Experimentation",
            description:
              "The Module Link Unit connects VinciBot to third-party sensors — including the entire Arduino and Micro:bit ecosystems. Once your child has finished the 7 guided projects, they can explore thousands of additional sensors and design their own electronics experiments from scratch. This kit never runs out of possibilities.",
          },
        ]}
        background="navy-card"
      />

      {/* Video */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=CR5bxhghgTk&t=76s"
        title="Inventor Kit for VinciBot — All 7 Projects"
        background="white"
      />

      {/* Physical computing storytelling */}
      <ImageTextBlock
        image="/images/products/matatastudio-inventor-kit-for-vincibot/inventor-kit-builds.jpg"
        imageAlt="MatataStudio Inventor Kit builds — LED tree, displays, and components in action"
        title="The Moment Electronics Clicks"
        body="Your child writes a condition: if temperature is above 25°C, turn on the fan. They press run. The servo motor whirrs. The fan spins. What was abstract code is now a physical response to the real world. That's physical computing — and it's the same principle behind every smart device, IoT sensor, and home automation system ever built. The Inventor Kit makes this moment tangible, playful, and completely within reach of a child aged 8."
        layout="image-left"
        background="gray"
      />

      {/* Electronic modules feature breakdown */}
      <FeatureGrid
        title="5 Programmable Electronic Modules"
        subtitle="Each module teaches a different type of physical computing — from sensing the environment to controlling movement to creating light displays."
        features={[
          {
            icon: "/images/icons/brand/atom.png",
            title: "Temperature & Humidity Sensor",
            description:
              "Measure real temperature and humidity values. Write code that reacts to data — activate a fan when it's hot, display readings on VinciBot's screen.",
          },
          {
            icon: "/images/icons/brand/lightning.png",
            title: "Joystick",
            description:
              "A 2-axis analog controller with push-button. Control VinciBot, build game interfaces, and create directional inputs — the same mechanism in every game controller.",
          },
          {
            icon: "/images/icons/brand/gear.png",
            title: "360° Digital Servo",
            description:
              "Precise continuous rotation for opening lids, spinning fans, and raising arms. Write code that translates directly into reliable, repeatable mechanical motion.",
          },
          {
            icon: "/images/icons/brand/lightbulb.png",
            title: "LED Strip",
            description:
              "Programmable colour LEDs for visual feedback, lighting effects, and data displays. Map sensor values to colours for instant, intuitive visualisation.",
          },
          {
            icon: "/images/icons/brand/rotation.png",
            title: "Rotary Angle Sensor",
            description:
              "A physical knob that outputs 0–270° of input. Control speed, brightness, or direction with a dial — satisfying, intuitive, and great for learning analog input.",
          },
          {
            icon: "/images/icons/brand/plug.png",
            title: "Module Link Unit",
            description:
              "Connect VinciBot to any Arduino or Micro:bit-compatible sensor. One adapter opens the door to thousands of third-party modules and self-directed experiments.",
          },
        ]}
        columns={3}
        background="white"
      />

      {/* Module Link Unit / expandability storytelling */}
      <ImageTextBlock
        image="/images/products/matatastudio-inventor-kit-for-vincibot/five-programmable-electronic-modules.png"
        imageAlt="The five programmable electronic modules included in the Inventor Kit for VinciBot"
        title="Beyond the Kit: Open-Ended Electronics"
        body="Most STEM kits are closed systems — use what's in the box, nothing more. The Inventor Kit's Module Link Unit breaks that barrier. Once your child has completed the 7 guided projects, they can connect third-party DC motors, servos, and sensors from the Arduino and Micro:bit ecosystems. Soil moisture sensor, ultrasonic distance meter, colour detector — if it exists in the maker world, VinciBot can work with it. The 7 projects are the start. What comes next is limited only by curiosity."
        layout="image-right"
        background="gray"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="7 Electronics Projects to Build and Code"
        highlight="7 guided build-and-code projects in a step-by-step building manual"
        subtitle="Each project introduces a different electronic component and a new programming concept — from conditional logic to game design."
        columns={3}
        projects={[
          {
            name: "Intelligent Fan",
            description:
              "Construct a fan from building bricks, connect the servo, and program it to activate based on a real temperature reading.",
            concepts: "Servo control, conditional logic, temperature sensing",
            image:
              "/images/products/matatastudio-inventor-kit-for-vincibot/project-intelligent-fan.png",
          },
          {
            name: "Intelligent Waste Bin",
            description:
              "Build a bin with a servo-operated lid and code it to open on command using the joystick or a sensor trigger.",
            concepts: "Servo actuation, user input, event-driven programming",
            image:
              "/images/products/matatastudio-inventor-kit-for-vincibot/project-intelligent-waste-bin.png",
          },
          {
            name: "Rock, Paper, Scissors",
            description:
              "Build a joystick controller and program a fully playable Rock, Paper, Scissors game using VinciBot's display and LED strip.",
            concepts: "Joystick input, conditionals, random number generation, game logic",
            image:
              "/images/products/matatastudio-inventor-kit-for-vincibot/project-rock-paper-scissors.png",
          },
          {
            name: "Game Designer",
            description:
              "An open-ended creative challenge: design and build your own interactive game using the joystick and LED outputs.",
            concepts: "Creative coding, game design thinking, variables, conditionals",
            image:
              "/images/products/matatastudio-inventor-kit-for-vincibot/project-game-designer.png",
          },
          {
            name: "Ambient Light",
            description:
              "Program the LED strip to respond to a rotary dial — build a mood lamp your child controls with a physical knob.",
            concepts: "Analog input, LED programming, value mapping, visual output",
            image:
              "/images/products/matatastudio-inventor-kit-for-vincibot/project-ambient-light.png",
          },
          {
            name: "Fun Activities",
            description:
              "A collection of shorter, exploratory activities using all five modules — perfect for experimenting and getting comfortable with each component.",
            concepts: "Component exploration, basic programming, experimentation",
            image:
              "/images/products/matatastudio-inventor-kit-for-vincibot/project-fun-activities.png",
          },
        ]}
        moreText="Plus a 7th project in the building manual — and unlimited possibilities with the Module Link Unit."
        background="white"
      />

      {/* FAQ */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: `Do I need ${parentProductName} to use this kit?`,
            answer: `Yes — the Inventor Kit is an expansion that requires VinciBot to function. The electronic modules connect to VinciBot via USB-C, and all programming is done through VinciBot's coding platform. Without VinciBot, the Inventor Kit has no power source and no way to run code. If you don't have VinciBot yet, start there — the Inventor Kit is the perfect next step once your child has found their footing with the base robot.`,
          },
          {
            question: "What age is the Inventor Kit best suited to?",
            answer:
              "The Inventor Kit is designed for ages 8 and up — the same as VinciBot. Children who've already spent time coding with VinciBot will find this a natural and exciting next step. The projects progress from simpler single-module builds to more complex, multi-component creations. Most children will complete a project in 30–60 minutes, with the open-ended Game Designer project taking as long as they want.",
          },
          {
            question: "What's different from the Creator Kit?",
            answer:
              "The Creator Kit is about physical and mechanical engineering — 434+ building blocks and a DC motor for constructing moving structures like fairground rides and cranes. The Inventor Kit is about electronics — 5 sensor and output modules for building projects that sense, respond, and react to the real world. They complement each other: one teaches mechanical engineering, the other teaches physical computing. Many families will eventually want both.",
          },
          {
            question: "Does it need batteries or extra tools?",
            answer:
              "No batteries and no tools. The electronic modules draw power directly from VinciBot's onboard rechargeable battery via a USB-C cable — no separate power source needed. All connections are plug-and-play. There's no soldering, no screwdrivers, and nothing sharp. Everything needed to start building is in the box.",
          },
          {
            question: "What can my child do after finishing the 7 projects?",
            answer:
              "Plenty. The Module Link Unit included in the kit connects VinciBot to third-party Arduino and Micro:bit sensors — giving your child access to a huge range of additional modules available online (distance sensors, soil sensors, gas detectors, and more). The 7 projects in the manual are a starting point, not a limit. Many children are back designing their own experiments before they've finished all seven.",
          },
        ]}
        background="gray"
      />

      {/* What's Included */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/matatastudio-inventor-kit-for-vincibot/whats-in-the-box.jpg"
        imageAlt="Inventor Kit for VinciBot box contents laid out"
        items={[
          "1× Rotary Angle Sensor",
          "1× Temperature & Humidity Sensor (DHT11)",
          "1× Joystick",
          "1× 360° Digital Servo",
          "1× LED Strip",
          "1× Module Link Unit for VinciBot",
          "1× USB-C cable",
          "128 building bricks (3 bags)",
          "Building manual with 7 guided study cases",
          "User guide",
          "Paper craft elements",
          "Note: VinciBot robot not included — required separately",
        ]}
        background="white"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Age Range", value: "8+" },
          { label: "Soldering Required", value: "No" },
          { label: "Batteries Required", value: "No — powered through VinciBot via USB-C" },
          { label: "Coding Platform", value: "coding.matatalab.com (Scratch blocks + Python)" },
          { label: "Compatible OS", value: "Windows, Mac, iOS, Android" },
          { label: "Internet Required", value: "Yes (for coding platform — browser-based)" },
          { label: "Building Bricks", value: "128 pieces (3 bags)" },
          { label: "Box Dimensions", value: "10.2 × 13.2 × 2.1 inches" },
          { label: "Material", value: "ABS plastic (LEGO-compatible)" },
          {
            label: "Third-Party Compatibility",
            value: "Arduino, Micro:bit (via Module Link Unit)",
          },
          { label: "LEGO Compatible", value: "Yes" },
          { label: "VinciBot Required", value: "Yes (sold separately)" },
        ]}
        background="gray"
      />

      {/* Call to Action */}
      <CallToAction
        title="Add Electronics to Your VinciBot"
        subtitle="7 guided projects, 5 real sensors, and a gateway to Arduino. The next chapter in your child's VinciBot journey."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel={`View ${parentProductName}`}
        secondaryHref={parentProductHref}
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
      "Add real electronics to your VinciBot with 5 programmable modules, 7 guided projects, and a Module Link Unit for Arduino expansion. Ages 8+.",
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
