import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  NumberedSteps,
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

const PRODUCT_HANDLE = "matatastudio-digital-microscope-mt3-2";

export default async function MatastaStudioDigitalMicroscopeMT32Page() {
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
        tagline="The microscopic world is waiting — and now your child can see it"
        highlights={[
          "400× optical magnification displayed on a 7-inch live screen",
          "10 prepared slides included — start exploring in minutes",
          "WiFi, USB-C, and HDMI for sharing discoveries with the whole family",
          "No assembly or setup — plug in, switch on, and observe",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why the MT3-2 */}
      <NumberedSteps
        title="Why the MT3-2 is Different"
        subtitle="Most microscopes are toys in disguise. The MT3-2 bridges the gap between a child's curiosity and real scientific exploration."
        steps={[
          {
            title: "See It Together",
            description:
              "The 7-inch rotatable screen replaces the tiny eyepiece — so your child, you, and the whole family can watch the same magnified view in real time. Discovery becomes a shared experience.",
          },
          {
            title: "Built Like a Real Lab",
            description:
              "A professional 3D metal stage with precision coaxial knobs mirrors genuine laboratory microscopes. Your child isn't just playing at science — they're practising it.",
          },
          {
            title: "Unlimited Specimens",
            description:
              "Start with the 10 included slides, then explore anything: salt crystals, fabric fibres, pond water, insects, plant cells, cheek cells. The whole world becomes a specimen collection.",
          },
        ]}
        background="navy-card"
      />

      {/* Video Section */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=0VpxSVow7pE"
        title="See the MatataStudio Digital Microscope MT3-2 in Action"
        background="gray"
      />

      {/* Family Discovery Section */}
      <ImageTextBlock
        image="/images/products/matatastudio-digital-microscope-mt3-2/father-and-son-smiling-at-microscope.png"
        imageAlt="Father and son smiling together while using the MatataStudio microscope"
        title="A Discovery They'll Want to Share"
        body="The 7-inch screen changes everything about how microscopy feels. Instead of one child squinting through a tiny eyepiece, observations play out on a display everyone can see. Stream live to a phone or tablet over WiFi, or plug into your TV via HDMI for a whole-room viewing experience. Discoveries become conversations — and 'What's that?' becomes the most exciting question in the house."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="What Makes It Special"
        subtitle="Professional-grade features designed to grow with your child's scientific curiosity."
        features={[
          {
            icon: "sensor",
            title: "2MP HD Camera",
            description:
              "Captures sharp photos and videos of every specimen so your child can document and revisit their discoveries",
          },
          {
            icon: "wifi",
            title: "WiFi Streaming",
            description:
              "Connect wirelessly to phones, tablets, and PCs via the free MatataXplore app on iOS, Android, Windows, and macOS",
          },
          {
            icon: "lightbulb",
            title: "Dual LED Lighting",
            description:
              "Top light for solid objects like coins and insects; bottom light for transparent specimens like cells and tissue — independently adjustable",
          },
          {
            icon: "tools",
            title: "Precision Metal Stage",
            description:
              "Professional X-Y mechanical stage with coaxial adjustment knobs for smooth, accurate specimen positioning",
          },
          {
            icon: "compass",
            title: "Built-In Measurements",
            description:
              "On-screen measurement tool paired with an included calibration ruler to measure real specimen dimensions",
          },
          {
            icon: "battery",
            title: "Rechargeable Battery",
            description:
              "2000mAh built-in battery provides 2.5–3 hours of cord-free exploration — no external batteries needed",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Life Skills Section */}
      <ImageTextBlock
        image="/images/products/matatastudio-digital-microscope-mt3-2/boy-looking-at-camera-smiling-with-microscope.png"
        imageAlt="Boy smiling confidently next to the MatataStudio Digital Microscope"
        title="More Than a Science Toy"
        body="Getting a clear image under a microscope takes patience, precision, and a willingness to try different approaches — all without anyone telling you the answer. Your child learns to observe carefully, form hypotheses, test them, and adjust. Research shows that students who learn this way retain 50% more information than those taught through textbooks alone. The microscope doesn't just teach biology — it teaches how to think like a scientist."
        layout="image-right"
        background="white"
      />

      {/* Exploration Activities */}
      <ProjectShowcase
        title="What Your Child Will Explore"
        highlight="Start with 10 prepared specimens, then investigate anything"
        subtitle="The included slide prep kit means every household item is a potential discovery. Here are a few to get started:"
        projects={[
          {
            name: "Onion Cell Observation",
            description:
              "Peel a thin layer from an onion and observe the rectangular cell walls up close",
            concepts: "Cell biology, plant anatomy",
            image:
              "/images/products/matatastudio-digital-microscope-mt3-2/projects/onion-cell-observation.png",
          },
          {
            name: "Salt vs Sugar Crystals",
            description:
              "Discover why salt forms perfect cubes and sugar forms jagged diamonds under magnification",
            concepts: "Chemistry, crystallography, scientific comparison",
            image:
              "/images/products/matatastudio-digital-microscope-mt3-2/projects/salt-vs-sugar-crystals.png",
          },
          {
            name: "Leaf Surface Study",
            description:
              "Find the stomata — tiny pores on a leaf's surface that allow plants to breathe",
            concepts: "Plant biology, photosynthesis, environmental science",
            image:
              "/images/products/matatastudio-digital-microscope-mt3-2/projects/leaf-surface-study.png",
          },
          {
            name: "Fabric Fibre Investigation",
            description:
              "Compare threads from different fabrics — cotton, denim, wool — and see how they differ up close",
            concepts: "Materials science, textile technology",
            image:
              "/images/products/matatastudio-digital-microscope-mt3-2/projects/fabric-fibre-investigation.png",
          },
          {
            name: "Cheek Cell Smear",
            description:
              "Gently collect and observe your own human epithelial cells under the lens",
            concepts: "Human biology, animal vs plant cell comparison",
            image:
              "/images/products/matatastudio-digital-microscope-mt3-2/projects/cheek-cell-smear.png",
          },
          {
            name: "Pond Water Exploration",
            description:
              "Collect a drop of pond water and discover the microscopic life living inside it",
            concepts: "Microbiology, ecology, environmental science",
            image:
              "/images/products/matatastudio-digital-microscope-mt3-2/projects/pond-water-exploration.png",
          },
        ]}
        moreText="Plus feather structures, hair cross-sections, insect anatomy, chemical reactions, and anything else your child is curious about"
        background="gray"
      />

      {/* Customer Showcase */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="Real observations and discoveries from curious young scientists."
        images={[
          {
            src: "/images/products/matatastudio-digital-microscope-mt3-2/microscope-screening-petridish.png",
            alt: "Microscope observing a petri dish specimen",
            label: "Petri Dish",
            description: "Observing a petri dish specimen at high magnification",
          },
          {
            src: "/images/products/matatastudio-digital-microscope-mt3-2/screening-bug.png",
            alt: "Insect specimen magnified under the microscope",
            label: "Insect Study",
            description: "Examining the fine detail of an insect under the lens",
          },
          {
            src: "/images/products/matatastudio-digital-microscope-mt3-2/microscope-screening-sand.png",
            alt: "Sand grains magnified and displayed on the microscope screen",
            label: "Sand Grains",
            description: "Discovering the surprising shape and colour of individual sand grains",
          },
          {
            src: "/images/products/matatastudio-digital-microscope-mt3-2/different-screens.png",
            alt: "Multiple microscope screen views showing different specimens",
            label: "Screen Views",
            description: "The 7-inch screen showing sharp, detailed specimen images",
          },
          {
            src: "/images/products/matatastudio-digital-microscope-mt3-2/microscope-with-slides-displayed-neatly-withhand-reaching.png",
            alt: "Microscope with prepared slides neatly arranged beside it",
            label: "Prepared Slides",
            description: "10 prepared slides included — ready to explore straight from the box",
          },
          {
            src: "/images/products/matatastudio-digital-microscope-mt3-2/screening-something-with-hand-holding-base.png",
            alt: "Hand holding a specimen base while observing under the microscope",
            label: "Hands-On",
            description: "The mechanical stage makes it easy to position specimens precisely",
          },
          {
            src: "/images/products/matatastudio-digital-microscope-mt3-2/box-open-with-things-inside.png",
            alt: "Open box showing the microscope and all included accessories",
            label: "Unboxed",
            description: "Everything included — ready to use from the moment it arrives",
          },
          {
            src: "/images/products/matatastudio-digital-microscope-mt3-2/product-open-displaying-whats-inside.png",
            alt: "Product packaging open displaying the microscope and components inside",
            label: "Full Kit",
            description: "A complete scientific exploration kit in one well-packaged box",
          },
        ]}
        background="white"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="gray" />

      {/* FAQ Section */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "What age is this suitable for?",
            answer:
              "The MT3-2 is designed for ages 11–16. Younger children (9–10) can also enjoy it with a parent present for the first few sessions. Adults find it just as fascinating — it's a genuinely powerful scientific instrument.",
          },
          {
            question: "Do we need batteries or any extra equipment?",
            answer:
              "No external batteries needed — the microscope has a built-in 2000mAh rechargeable battery that lasts 2.5–3 hours, charged via the included USB-C cable. No additional equipment is required to get started.",
          },
          {
            question: "Does my child need any science experience?",
            answer:
              "Not at all. The 10 prepared slides included in the box mean your child can start observing real specimens within minutes of unboxing, with no preparation required. The user manual guides them through the basics, and the natural curiosity of discovering an unseen world does the rest.",
          },
          {
            question: "Can it connect to our TV or tablet?",
            answer:
              "Yes! You can connect via HDMI directly to a TV or monitor for a big-screen display, USB-C to a laptop or computer, or stream wirelessly to any phone or tablet over WiFi using the free MatataXplore app (available on iOS, Android, Windows, and macOS).",
          },
          {
            question: "What can they look at with it?",
            answer:
              "Almost anything! The 10 included slides cover plant tissue and biological specimens to get started. The included slide preparation kit then lets your child make their own slides from everyday materials — onion skin, salt crystals, fabric fibres, pond water, feathers, insects, and even their own cheek cells. The possibilities are genuinely open-ended.",
          },
          {
            question: "Will they outgrow it quickly?",
            answer:
              "Unlikely. Unlike project kits with a fixed number of activities, a microscope is an open-ended instrument — there's always a new specimen to investigate. As your child's scientific knowledge grows, so does the depth of their observations. It also compatible with standard prepared slide sets, which can extend the experience further.",
          },
        ]}
        background="white"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/matatastudio-digital-microscope-mt3-2/whats-in-the-box.png"
        imageAlt="MatataStudio Digital Microscope MT3-2 kit contents laid out"
        items={[
          "MatataStudio Digital Microscope MT3-2 unit",
          "7-inch 135° rotatable IPS display (built-in)",
          "3 objective lenses: 4×, 10×, 40× (pre-installed)",
          "10 prepared slides (plant and biological specimens)",
          "Slide preparation kit (tools for making custom slides)",
          "8GB SD card",
          "USB-C charging cable",
          "Calibration ruler",
          "Cleaning cloth",
          "Protective storage case",
          "User manual",
        ]}
        background="gray"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Camera sensor", value: "2MP Aptina CMOS" },
          { label: "Optical magnification", value: "40× – 400×" },
          { label: "Screen magnification", value: "Up to ~1,200×" },
          { label: "Objective lenses", value: "3 lenses: 4×, 10×, 40×" },
          { label: "Display", value: "7-inch IPS, 135° rotatable" },
          { label: "Battery", value: "2,000mAh rechargeable built-in" },
          { label: "Battery life", value: "2.5–3 hours" },
          { label: "Storage", value: "8GB SD card included" },
          { label: "Connectivity", value: "WiFi, USB-C, HDMI" },
          { label: "App compatibility", value: "iOS, Android, Windows, macOS" },
          { label: "Image format", value: "JPG" },
          { label: "Dimensions", value: "15 × 30 × 20 cm" },
          { label: "Weight", value: "1.5 kg" },
          { label: "Languages supported", value: "10 (EN, FR, ES, DE, IT, CN, JP, RU, TH, KR)" },
        ]}
        background="white"
      />

      {/* Final CTA */}
      <CallToAction
        title="Get Started"
        subtitle="Give your child a window into the world invisible to the naked eye."
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
      "Explore the microscopic world with the MT3-2 digital microscope. 400× magnification, 7-inch screen, 10 prepared slides, and WiFi connectivity. Ages 11–16.",
    alternates: {
      canonical: "/product/matatastudio-digital-microscope-mt3-2",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
