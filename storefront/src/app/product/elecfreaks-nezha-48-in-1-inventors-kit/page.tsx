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
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "elecfreaks-nezha-48-in-1-inventors-kit";
const BASE_IMG = "/images/products/elecfreaks-nezha-48-in-1-inventors-kit";

export default async function NezhaInventorsKitPage() {
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
        tagline="Build robots, cars and smart gadgets from 400+ bricks, then code them with a BBC micro:bit to move and react."
        highlights={[
          "48 projects and activities with free step-by-step guides and ready-made code",
          "8 sensors and lights, 2 motors and a servo that plug straight in",
          "No soldering and no batteries to buy: the controller recharges by USB",
          "Needs a BBC micro:bit (not included, add one below)",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Video */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=ITt6iFOPbQk"
        title="See the Nezha Inventor's Kit in action"
        background="white"
      />

      {/* Kit contents ImageTextBlock */}
      <ImageTextBlock
        image={`${BASE_IMG}/nezha-kit-sensors-motors-and-bricks.jpg`}
        imageAlt="Nezha Inventor's Kit sensors, motors, servo, expansion board and bags of building bricks laid out on a white surface"
        title="Machines your child builds and codes"
        body="Your child builds something they can hold, like a crab that scuttles away when a hand comes close or a car that follows a black line on the floor. Then they write the code that makes it work. The ultrasonic sensor, line tracker, soil moisture sensor and motors are the same kinds of parts found in robot vacuums, automatic doors and smart irrigation."
        layout="image-left"
        background="gray"
      />

      {/* Features Grid */}
      <FeatureGrid
        title="What's special about the Nezha kit"
        subtitle="A building set and an electronics kit in one box, designed so children can focus on inventing rather than wiring."
        features={[
          {
            icon: "puzzle",
            title: "400+ LEGO Technic-compatible bricks",
            description:
              "Beams, gears, axles and wheels that fit the LEGO Technic pieces your child may already own.",
          },
          {
            icon: "plug",
            title: "Colour-coded plug-in ports",
            description:
              "Each sensor's plug colour matches its port on the controller, so there's no wiring diagram to decode and nothing to solder.",
          },
          {
            icon: "battery",
            title: "Built-in rechargeable battery",
            description:
              "The Nezha controller charges over USB and lasts around three lessons per charge. No AA batteries to keep buying.",
          },
          {
            icon: "code",
            title: "Blocks first, then real code",
            description:
              "Start with drag-and-drop Microsoft MakeCode blocks, the same free editor used in schools, and switch to JavaScript or Python when ready.",
          },
          {
            icon: "sensor",
            title: "Sensors that react to the world",
            description:
              "Distance, line tracking, soil moisture, a knob and a crash button, plus the micro:bit's own light, temperature, tilt and sound sensors.",
          },
          {
            icon: "layers",
            title: "Expandable with PlanetX sensors",
            description:
              "The controller works with 40+ add-on PlanetX sensors, which unlock another 28 builds on the ELECFREAKS project site.",
          },
        ]}
        columns={3}
        background="white"
      />

      {/* Expansion board ImageTextBlock */}
      <ImageTextBlock
        image={`${BASE_IMG}/nezha-breakout-board-ports-diagram.jpg`}
        imageAlt="Diagram of the Nezha breakout board showing its four servo ports, four motor ports, three I2C ports and four colour-coded sensor ports"
        imageObjectPosition="center 75%"
        title="One controller runs every build"
        body="The micro:bit slots into the top of the Nezha controller, which has ports for up to four motors, four servos and seven sensors. Your child plugs a part into the port with the matching colour and it's ready to code. Because the battery is built in, builds can roam around the floor without a cable trailing behind."
        layout="image-right"
        background="gray"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="48 projects, from blinking lights to walking robots"
        highlight="34 builds, 10 coding activities and 4 challenges, each with a free online guide and ready-made code"
        subtitle="Every project stands alone, so your child can jump to whatever grabs them. Some of the builds below use an add-on PlanetX sensor, sold separately; we've noted which."
        projects={[
          {
            name: "micro:bit Crawlers",
            description:
              "A brick caterpillar that inches forward using a servo and a ratchet, the same idea behind a socket wrench.",
            concepts: "Ratchet mechanisms, servo control",
            image: `${BASE_IMG}/projects/micro-bit-crawlers.jpg`,
          },
          {
            name: "An Oscillating Fan",
            description:
              "A desk fan whose head swings from side to side, with the micro:bit buttons switching the fan and the swing on and off.",
            concepts: "Combining a motor and servo, button events",
            image: `${BASE_IMG}/projects/oscillating-fan.jpg`,
          },
          {
            name: "Colours of the Emotions",
            description:
              "Hold up a coloured card and the micro:bit shows a happy, sad or cross face depending on whether it likes the colour. Needs a colour sensor.",
            concepts: "Colour sensing, if/else decisions",
            image: `${BASE_IMG}/projects/colours-of-the-emotions.jpg`,
          },
          {
            name: "The Dazzling Car",
            description:
              "A car with a light show: press A to drive off with flashing red and blue lights, B to stop. Needs a colour sensor and rainbow LED ring.",
            concepts: "Motor control, LED effects, button events",
            image: `${BASE_IMG}/projects/the-dazzling-car.jpg`,
          },
          {
            name: "The Rotary Password Door",
            description:
              "Dial in a two-part code with the knob and press the button to confirm. Get it right and the door swings open. Needs an OLED screen.",
            concepts: "Variables, checking conditions, servo control",
            image: `${BASE_IMG}/projects/the-rotary-password-door.jpg`,
          },
          {
            name: "Gesture Recognition Car",
            description:
              "Steer a car by waving your hand over it. Needs a gesture sensor.",
            concepts: "Gesture sensing, steering logic",
            image: `${BASE_IMG}/projects/gesture-recognition-car.jpg`,
          },
        ]}
        moreText="With the kit and one micro:bit, your child can make 46 of the 48, including a line-following car, a walking robot, a mechanical crab and a forklift. The other two, a moon rover and a washing machine, use a second micro:bit as a remote control."
        background="white"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="Nezha builds in the classroom"
        images={[
          {
            src: `${BASE_IMG}/kids-classroom-nezha-builds-smart-city-mat.jpg`,
            alt: "Children testing their Nezha robot cars on a smart city mat, with the kit box and MakeCode open on a tablet",
          },
          {
            src: `${BASE_IMG}/kids-coding-micro-bit-makecode.jpg`,
            alt: "Two children coding a micro:bit project in Microsoft MakeCode on a laptop",
          },
          {
            src: `${BASE_IMG}/kids-building-nezha-kit-classroom.jpg`,
            alt: "Two boys building Nezha kit projects at a classroom table",
          },
        ]}
        background="gray"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* FAQ Section */}
      <ProductFAQ
        title="Common questions"
        faqs={[
          {
            question: "Does my child need any coding or electronics experience?",
            answer:
              "No. The early projects use one sensor or light at a time, and each one has picture-by-picture assembly steps, a wiring diagram and ready-made code to open and try. Many have short assembly videos too. Once something works, your child can start changing the code to see what happens.",
          },
          {
            question: "Is a micro:bit included?",
            answer:
              "No, you'll need a BBC micro:bit (V1 or V2). We recommend a V2, because a few projects use its built-in microphone and speaker. You can add a micro:bit at a discount above.",
          },
          {
            question: "What age is it suitable for?",
            answer:
              "ELECFREAKS recommends it from age 8. Children aged 8 to 10 may want a hand with the bigger mechanical builds at first. From about 10, most can follow the guides on their own and start inventing their own machines.",
          },
          {
            question: "What else do we need?",
            answer:
              "A computer or tablet with a web browser to run the free Microsoft MakeCode editor, and a micro USB cable to send code to the micro:bit. There are no batteries to buy: the Nezha controller has a built-in rechargeable battery and comes with a USB charging cable.",
          },
          {
            question: "Where are the instructions?",
            answer:
              "All 48 guides live on the free ELECFREAKS project site, so you'll want a screen nearby while building. Each guide shows the parts you need, the build steps and the code.",
          },
          {
            question: "Are all the projects on the ELECFREAKS site buildable with this kit?",
            answer:
              "48 of them are. The site lists 76 in total, and the other 28 need add-on sensors such as a colour sensor, rainbow LED ring or gesture sensor. Two of the 48 (the moon rover and washing machine) also use a second micro:bit as a remote control.",
          },
          {
            question: "What happens after they've done all 48?",
            answer:
              "The bricks work with LEGO Technic, so they can mix them with sets they already have and design their own machines. They can also move from blocks to Python, or add PlanetX sensors for the extra projects.",
          },
        ]}
        background="gray"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the box"
        image={`${BASE_IMG}/whats-in-the-box.jpg`}
        imageAlt="Nezha 48-in-1 Inventor's Kit packing list showing the expansion board, sensors, motors, servo, cables and every brick"
        items={[
          "Nezha expansion board with built-in rechargeable battery",
          "Ultrasonic distance sensor",
          "Line-tracking sensor",
          "Soil moisture sensor",
          "Crash sensor (push button)",
          "Potentiometer (turning knob)",
          "Red, yellow and green LED modules",
          "2 × motors",
          "1 × 360° servo",
          "2 × wheels and 1 × ball caster wheel",
          "6 × RJ11 connecting cables (3 long, 3 short)",
          "1 × USB charging cable",
          "400+ LEGO Technic-compatible bricks, gears and axles in 11 bags",
          "1 × line-tracking map",
          "Plastic storage box with sorting tray",
          "Note: BBC micro:bit sold separately",
        ]}
        background="white"
      />

      {/* Specifications */}
      <Specifications
        title="Technical details"
        specs={[
          { label: "SKU", value: "EF08232" },
          { label: "Compatible boards", value: "BBC micro:bit V1 and V2 (V2 recommended)" },
          { label: "Programming", value: "Microsoft MakeCode blocks, JavaScript and Python" },
          { label: "Power", value: "Built-in 900mAh rechargeable lithium battery" },
          { label: "Charging", value: "USB, 5V 1A" },
          { label: "Controller ports", value: "4 motor, 4 servo, 4 sensor, 3 I2C" },
          { label: "Connectors", value: "RJ11 plug-in, colour-coded" },
          { label: "Electronic modules", value: "8 sensors and lights, 2 motors, 1 servo" },
          { label: "Building bricks", value: "400+ LEGO Technic-compatible pieces" },
          { label: "Controller size", value: "60 × 82 × 28 mm" },
          { label: "Soldering", value: "Not required" },
          { label: "Certifications", value: "CE, RoHS" },
          { label: "Recommended age", value: "8+" },
        ]}
        background="gray"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get inventing"
        subtitle="48 projects, 400+ bricks and a rechargeable controller. Add a micro:bit and your child is ready to start."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse More Kits"
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
      "48 coding projects: build robots, cars and gadgets from 400+ LEGO Technic-compatible bricks, sensors and motors. No soldering, ages 8+. micro:bit not included.",
    alternates: {
      canonical: "/product/elecfreaks-nezha-48-in-1-inventors-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
