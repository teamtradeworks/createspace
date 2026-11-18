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
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "elecfreaks-tpbot-car-kit";
const IMAGE_DIR = "/images/products/elecfreaks-tpbot-car-kit";

export default async function TPBotCarKitPage() {
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
        tagline="A friendly robot car that drives itself straight out of the box, then becomes your child's first coding robot when they add a micro:bit"
        highlights={[
          "23 free online projects, and the first 11 need only the car and a micro:bit",
          "Arrives fully built: add batteries, press the button, and it follows a line on its own",
          "Starts with drag-and-drop MakeCode blocks and moves up to Python",
          "LEGO-compatible studs and side joints for building your own attachments",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Video */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=TvZCncVOuf4"
        title="See TPBot in action"
        background="white"
      />

      {/* Two ways to play */}
      <ImageTextBlock
        image={`${IMAGE_DIR}/child-inserting-microbit-into-tpbot.jpg`}
        imageAlt="Child slotting a BBC micro:bit into the top of a blue TPBot robot car"
        title="It drives on day one, with or without a micro:bit"
        body="TPBot has a built-in self-driving mode. Pop in four AAA batteries, press the power button twice, and it follows the black track on the included map, stopping with red headlights when something blocks its way. When your child is ready to take charge, they slot a BBC micro:bit into the top and the car does whatever they programme it to do."
        layout="image-left"
        background="gray"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="What's built into TPBot"
        subtitle="The sensors and lights are already inside, so your child can start coding without wiring anything."
        features={[
          {
            icon: "sensor",
            title: "Ultrasonic distance sensor",
            description:
              "The two round 'eyes' on the front measure how far away things are, from 2 cm up to 4 m. Your child uses them to dodge obstacles and follow another car.",
          },
          {
            icon: "compass",
            title: "Two line-tracking sensors",
            description:
              "Infrared sensors underneath spot dark lines on the floor. That's how TPBot follows a track, parks on a line, or stops itself from driving off the edge of a table.",
          },
          {
            icon: "lightbulb",
            title: "Colour-changing headlights",
            description:
              "RGB headlights can be set to any colour. Kids use them to make flashing police lights or headlights that switch on when the room gets dark.",
          },
          {
            icon: "building-blocks",
            title: "LEGO-compatible body",
            description:
              "Studs on top and joints on both sides take standard building bricks, so your child can add bumpers, trailers, or a sweeper arm of their own design.",
          },
          {
            icon: "plug",
            title: "Ports for add-ons",
            description:
              "Four sensor ports and four servo connectors mean TPBot can grow with extra modules like a gesture sensor, a colour sensor, or an AI camera.",
          },
          {
            icon: "puzzle",
            title: "No assembly or soldering",
            description:
              "The car comes fully built in a tough, enclosed plastic shell with no exposed circuit board. Unbox it and play.",
          },
        ]}
        columns={3}
        background="white"
      />

      {/* Coding progression */}
      <ImageTextBlock
        image={`${IMAGE_DIR}/makecode-blocks-on-laptop-with-tpbot.jpg`}
        imageAlt="Laptop showing MakeCode coding blocks with the TPBot robot car parked beside it on a wooden floor"
        title="Drag-and-drop blocks first, Python when they're ready"
        body="Coding happens in Microsoft MakeCode, a free website where your child snaps together colourful blocks like puzzle pieces. There's nothing to install. The tutorials on the ELECFREAKS website come with sample code that opens in one click, so they can see how it works and then change the numbers to make TPBot faster or more cautious. Older kids can switch to Python and write the same programmes as text."
        layout="image-right"
        background="gray"
      />

      {/* Project Showcase */}
      <ProjectShowcase
        title="23 projects, from first drive to AI tracking"
        highlight="23 step-by-step projects with free online tutorials and sample code"
        subtitle="The projects get harder as they go. The first 11 need only TPBot and one micro:bit. Here are six favourites."
        projects={[
          {
            name: "Line Tracking",
            description:
              "Teach TPBot to follow the black track on the included map by stopping one wheel whenever a sensor sees the line.",
            concepts: "Sensors, if/else decisions, steering",
            image: `${IMAGE_DIR}/projects/line-tracking.jpg`,
          },
          {
            name: "Obstacle Avoidance",
            description:
              "When something comes within 15 cm, TPBot stops, flashes its lights, reverses and turns away.",
            concepts: "Distance sensing, variables, loops",
            image: `${IMAGE_DIR}/projects/obstacle-avoidance.jpg`,
          },
          {
            name: "Automatic Headlights",
            description:
              "Drive under a bed or into a dark room and watch the headlights switch on by themselves.",
            concepts: "Light sensing, thresholds",
            image: `${IMAGE_DIR}/projects/automatic-headlights.jpg`,
          },
          {
            name: "Follow the Car",
            description:
              "TPBot keeps a set gap behind the car in front, speeding up, stopping or backing off as needed.",
            concepts: "Distance ranges, feedback, cruise control",
            image: `${IMAGE_DIR}/projects/follow-the-car.jpg`,
          },
          {
            name: "Gesture Control",
            description:
              "Wave a hand over a gesture sensor to drive forward, back, left and right. Needs the add-on gesture sensor.",
            concepts: "Gesture sensing, add-on modules",
            image: `${IMAGE_DIR}/projects/gesture-control.jpg`,
          },
          {
            name: "Ball Tracking",
            description:
              "Fit the Smart AI Lens camera and TPBot spots a ball and chases it across the floor.",
            concepts: "Computer vision, AI",
            image: `${IMAGE_DIR}/projects/ai-ball-tracking.jpg`,
          },
        ]}
        moreText="Plus 17 more, including Here Comes the Police, Fall-arrest TPBot (it won't drive off the table), Seeking Light, and remote control with a second micro:bit you tilt to steer"
        background="white"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="white" />

      {/* FAQ */}
      <ProductFAQ
        title="Common questions"
        background="gray"
        faqs={[
          {
            question: "Does my child need a BBC micro:bit?",
            answer:
              "Not to start playing. TPBot's built-in mode follows lines and avoids obstacles without one. To code it, though, you'll need a BBC micro:bit (V1 or V2), which isn't included. You can add a BBC micro:bit Go at a discount from this page, or use one you already have.",
          },
          {
            question: "What age is TPBot for?",
            answer:
              "ELECFREAKS recommends ages 8 and up. The early projects are short and beginner-friendly, and older kids can move on to the sensor projects and Python.",
          },
          {
            question: "Does my child need coding experience?",
            answer:
              "No. The first project simply makes the car drive forward, and each one after that adds a new idea. MakeCode uses drag-and-drop blocks, so there's no typing to get stuck on.",
          },
          {
            question: "What else do we need to get started?",
            answer:
              "Four AAA batteries (not included), a BBC micro:bit with a USB cable, and any computer or tablet with a web browser. MakeCode is free and runs in the browser. If you add the micro:bit Go from this page, the USB cable comes with it.",
          },
          {
            question: "Can my child use it on their own?",
            answer:
              "Mostly, yes. The car comes fully built, and every project has an online tutorial with sample code to start from. Sitting with them for the first session helps, especially for copying code onto the micro:bit the first time.",
          },
          {
            question: "Is it sturdy?",
            answer:
              "TPBot has an enclosed ABS plastic body with no exposed circuit board for little fingers to poke. Keep it away from water, don't hold the wheels while they're spinning, and take the batteries out when it's packed away.",
          },
          {
            question: "What happens after the first 11 projects?",
            answer:
              "There are 12 more. Two use a second micro:bit as a remote, and the rest add extras like a Joystick:bit, plug-in sensors, a servo, or the Smart AI Lens camera. Your child can also build onto the LEGO-compatible body or rewrite their projects in Python.",
          },
        ]}
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the box"
        image={`${IMAGE_DIR}/whats-in-the-box.jpg`}
        imageAlt="TPBot packing list showing the TPBot smart car, manual book, line-tracking map and number sticker sheet"
        background="white"
        items={[
          "1x TPBot smart car (fully assembled)",
          "1x Line-tracking map",
          "1x Sticker sheet",
          "1x Manual book",
        ]}
      />

      {/* Specifications */}
      <Specifications
        title="Technical details"
        background="gray"
        specs={[
          { label: "Dimensions", value: "128 × 113 × 90 mm (without micro:bit)" },
          { label: "Weight", value: "363 g (without batteries or micro:bit)" },
          { label: "Compatibility", value: "BBC micro:bit V1 & V2 (not included)" },
          { label: "Power", value: "4× AAA batteries (not included)" },
          { label: "Battery Life", value: "About 1.5 hours of continuous driving" },
          { label: "Motors", value: "2× 130 DC motors with 62 mm wheels" },
          { label: "Distance Sensor", value: "Ultrasonic, 2 to 400 cm" },
          { label: "Line Sensors", value: "2× infrared" },
          { label: "Lighting", value: "RGB headlights" },
          { label: "Expansion", value: "2× sensor ports, 2× IIC ports, 4× servo connectors" },
          { label: "Building Bricks", value: "LEGO-compatible studs and side joints" },
          { label: "Programming", value: "MakeCode (blocks) & MicroPython (text)" },
          { label: "Assembly Required", value: "None" },
          { label: "Soldering Required", value: "No" },
        ]}
      />

      {/* Call to Action */}
      <CallToAction
        title="Get started with TPBot"
        subtitle="Drives itself out of the box, with 23 free projects for when your child wants to take the wheel."
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
      "A micro:bit robot car that drives itself out of the box. 23 free coding projects, LEGO-compatible body, no assembly needed. Ages 8+.",
    alternates: {
      canonical: "/product/elecfreaks-tpbot-car-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
