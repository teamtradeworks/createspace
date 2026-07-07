import { notFound } from "next/navigation";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  ExtensionBanner,
  QuickInfoBadges,
  FeatureGrid,
  ImageTextBlock,
  VideoEmbed,
  WhatsIncluded,
  ProductFAQ,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "matatastudio-creator-kit-for-vincibot";
const PARENT_PRODUCT_HANDLE = "matatastudio-vincibot-coding-robot-set";

export default async function VinciBotCreatorKitPage() {
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
        tagline="434+ building blocks and a DC motor to take VinciBot from coding to creating"
        highlights={[
          "20 guided building cases — from Smart Fan to Mechanical Claw",
          "Real mechanical engineering: crankshafts, cams, and linkages",
          "Bring your VinciBot code to life with motorised builds",
          "No soldering, no extra tools — just build and code",
        ]}
        addons={addons}
      />

      {/* Extension Banner */}
      <ExtensionBanner
        parentProductName={parentProductName}
        parentProductHref={parentProductHref}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Storytelling image */}
      <ImageTextBlock
        image="/images/products/matatastudio-creator-kit-for-vincibot/creator-kit-build-with-coding-on-the-side.png"
        imageAlt="VinciBot Creator Kit motorised build with coding interface on the side"
        title="Code Makes It Move"
        body="This is the moment STEM clicks. Your child writes code in Scratch or Python, presses run — and their physical creation moves. The Smart Fan spins faster when they change the speed variable. The Automatic Sensor Door opens when VinciBot's sensor detects movement. The Mechanical Claw grips and releases on command. The Creator Kit transforms abstract coding exercises into tangible, cause-and-effect engineering. That's not just fun — it's the same feedback loop that professional robotics engineers experience every day."
        layout="image-left"
        background="white"
      />

      {/* Video */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=_p1H77Oyp_s"
        title="VinciBot Creator Kit in Action"
        background="gray"
      />

      {/* Feature Grid — key build themes */}
      <FeatureGrid
        title="20 Builds Across 6 Engineering Themes"
        subtitle="The guided cases span real-world mechanisms, each teaching different concepts and skills."
        features={[
          {
            icon: "zap",
            title: "Motorised Machines",
            description:
              "Smart Fan, Helicopter, and Rocking Car introduce DC motor control and variable speed coding",
          },
          {
            icon: "refresh-cw",
            title: "Rotary Mechanisms",
            description:
              "Wheel of Fortune, Gyroscope Transmitter, and Flying Chair Ride teach rotary-to-linear motion and cam structures",
          },
          {
            icon: "cpu",
            title: "Sensor-Triggered Builds",
            description:
              "Automatic Sensor Door and Induction Door combine VinciBot's sensors with mechanical responses — real automation",
          },
          {
            icon: "tool",
            title: "Mechanical Engineering",
            description:
              "Mechanical Claw, Soar High, and Aerial Working Platform demonstrate crankshafts, linkages, and structural engineering",
          },
          {
            icon: "target",
            title: "Action & Play",
            description:
              "Paper Airplane Launcher, Shooting Practice, and VinciBot Pet make learning feel like play",
          },
          {
            icon: "layers",
            title: "Creative Builds",
            description:
              "VinciBot is a Dancer and VinciBot Pet invite kids to go beyond the manual and design their own creations",
          },
        ]}
        columns={3}
        background="white"
      />

      {/* Variety of builds image */}
      <ImageTextBlock
        image="/images/products/matatastudio-creator-kit-for-vincibot/variety-of-builds-with-labels.png"
        imageAlt="Variety of Creator Kit builds including helicopter, claw, and fairground rides with labels"
        title="From the Manual to Their Imagination"
        body="The 20 guided cases are the starting point. With 434+ building blocks — compatible with LEGO Technic connections — your child can go further and design their own mechanisms once they've mastered the basics. Many kids are back inventing new machines before they've finished all 20 cases. The kit is designed to grow with them: simpler builds (Smart Fan, Rocking Car) take 15–20 minutes; more complex structures like the Helicopter or Aerial Working Platform can take an hour or more. Every session builds something new."
        layout="image-right"
        background="gray"
      />

      {/* FAQ */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: `Do I need the ${parentProductName} to use this kit?`,
            answer: `Yes — the Creator Kit is an expansion that requires VinciBot to function. The DC motor and building blocks are controlled through VinciBot's programming platform. Without VinciBot, the Creator Kit has no power source and no way to programme the motor. If you don't have VinciBot yet, pick it up first and come back to the Creator Kit when your child is ready for the next step.`,
          },
          {
            question: "What's different from what VinciBot already includes?",
            answer:
              "VinciBot comes with 8 sensors, an LED matrix, speaker, and 93+ coding activities focused on programming and robotics. The Creator Kit adds the physical engineering side — 434+ building blocks, a DC motor, and 20 guided construction cases. It's the difference between programming a robot to move and building the machine that moves. Together, they cover both coding and mechanical engineering.",
          },
          {
            question: "What will my child build with the 20 guided cases?",
            answer:
              "The 20 cases span fairground rides (Flying Chair Ride, Big Pendulum, Wheel of Fortune), vehicles (Helicopter, Guide Vehicle), everyday machines (Smart Fan, Smartphone Holder), and interactive robotics builds (Automatic Sensor Door, Mechanical Claw, Paper Airplane Launcher). Each one teaches a specific mechanical principle — cam structures, crankshafts, linkage systems — while being coded and controlled through VinciBot.",
          },
          {
            question: "What age is the Creator Kit best suited to?",
            answer:
              "The Creator Kit is designed for ages 8 and up — the same as VinciBot. Children who've already spent time coding with VinciBot will find the Creator Kit a natural and exciting next step. The builds progress from straightforward (15–30 minutes) to more complex multi-part structures (60–90 minutes), so there's always an appropriate challenge regardless of where your child is in their learning journey.",
          },
          {
            question: "Does it need batteries or extra tools?",
            answer:
              "No batteries and no tools needed. The Creator Kit's DC motor is powered directly through VinciBot's onboard battery — no separate power source required. All connections click together without screwdrivers, soldering, or glue. Everything needed to start building is in the box.",
          },
        ]}
        background="white"
      />

      {/* What's Included */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/matatastudio-creator-kit-for-vincibot/whats-in-the-box.png"
        imageAlt="Creator Kit for VinciBot box contents laid out"
        items={[
          "434+ building bricks (multiple types, organised by type)",
          "1× DC electric motor (9V, 380 RPM)",
          "1× power adapter (9V, 1.5A — connects to VinciBot)",
          "Building manual with 20 guided study cases",
          "User guide",
          "Storage tray",
          "Note: VinciBot robot not included — required separately",
        ]}
        background="gray"
      />

      {/* Call to Action */}
      <CallToAction
        title="Expand What VinciBot Can Do"
        subtitle="Your child codes. Now let them build. The Creator Kit turns VinciBot into a platform for real mechanical engineering."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel={`View the ${parentProductName}`}
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
      "Expand your VinciBot with 434+ building blocks, a DC motor, and 20 guided engineering builds. Construct crankshafts, cams, and motorised machines. Ages 8+.",
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
