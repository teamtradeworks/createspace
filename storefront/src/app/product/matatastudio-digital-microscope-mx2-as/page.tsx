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
  ProjectShowcase,
  ImageTextBlock,
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "matatastudio-digital-microscope-mx2-as";

export default async function MatataStudioMicroscopePage() {
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
        tagline="Give your child a front-row seat to the microscopic world"
        highlights={[
          "2-in-1 design: handheld for outdoor adventures, stand-mounted for slides",
          "100× to 1600× digital magnification on a built-in 1080P screen",
          "5 prepared slides and exploration manual — ready straight out of the box",
          "Connects wirelessly to tablets and computers via the free MatataXplore app",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
      <QuickInfoBadges product={product} />

      {/* Why the MX2-AS */}
      <NumberedSteps
        title="Why the MX2-AS?"
        subtitle="Most children never get to see what's invisible to the naked eye. The MX2-AS changes that — giving your child the tools real scientists use, in a form they can pick up and explore with right away."
        steps={[
          {
            title: "Built for Real Exploration",
            description:
              "The handheld mode means your child isn't stuck at a desk. Take it outside to observe insects and garden plants, then bring it inside to study the included prepared slides. Science happens everywhere.",
          },
          {
            title: "See What Others Miss",
            description:
              "With up to 1600× digital magnification, a grain of salt becomes a geometric crystal, a leaf reveals its cell walls, and an orange peel looks like another planet. These are genuine 'wow' moments children remember.",
          },
          {
            title: "Skills That Last a Lifetime",
            description:
              "Scientific observation, critical thinking, and patience are skills that carry into every subject and career. Your child builds them naturally through the simple act of curious exploration.",
          },
        ]}
        background="navy-card"
      />

      {/* Video */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=8UDRSWKKbNY"
        title="See the MatataStudio Digital Microscope MX2-AS in Action"
        background="gray"
      />

      {/* Indoors & Outdoors */}
      <ImageTextBlock
        image="/images/products/matatastudio-digital-microscope-mx2-as/handheld-garden-vs-stand-petri-dish.jpg"
        imageAlt="Split image: child using the MX2-AS handheld in the garden looking at a flower on the left; boy using the stand-mounted microscope with a petri dish on the right"
        title="From the Garden to the Desk"
        body="One minute your child is crouched over a flower in the garden — handheld microscope in hand, petals filling the screen. The next they're at the desk, microscope clipped onto its stand, carefully placing a specimen in the observation chamber. The MX2-AS is one of very few children's microscopes genuinely designed for both. No swapping accessories, no fiddling with attachments — just pick it up or put it down."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
      <FeatureGrid
        title="Key Features"
        subtitle="Professional microscopy capability in an age-appropriate, portable design — no prior experience required."
        features={[
          {
            icon: "compass",
            title: "2-in-1 Design",
            description:
              "Handheld for outdoor field exploration; clip onto the MX-Stand for studying prepared slides indoors",
          },
          {
            icon: "star",
            title: "1080P Built-in Screen",
            description:
              "4.3-inch LCD with continuous zoom from 100× to 1600× — no phone or computer needed to get started",
          },
          {
            icon: "lightbulb",
            title: "Dual LED Lighting",
            description:
              "Incident light from above for opaque objects; transmitted light from below for prepared slides",
          },
          {
            icon: "wifi",
            title: "MatataXplore App",
            description:
              "Connect wirelessly via Wi-Fi to view live observations on a tablet or laptop and build a digital discovery journal",
          },
          {
            icon: "battery",
            title: "Rechargeable Battery",
            description:
              "Built-in 2600mAh lithium battery provides up to 3 hours of exploration — no loose batteries to manage",
          },
          {
            icon: "touch",
            title: "Capture & Save",
            description:
              "Touch-sensitive buttons save photos and video to the included 8GB microSD card in an instant",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Document & Share */}
      <ImageTextBlock
        image="/images/products/matatastudio-digital-microscope-mx2-as/girl-pointing-to-screen.jpg"
        imageAlt="Young girl pointing excitedly at the MatataStudio microscope screen showing a magnified specimen"
        title="Document Every Discovery"
        body="The MX2-AS isn't just for looking — it's for capturing and sharing. Your child taps the built-in touch buttons to photograph or record what they're observing, saving it directly to the 8GB microSD card. Connect to the free MatataXplore app on a tablet or laptop to view observations on a bigger screen, annotate images, and build a digital science journal. That's exactly how real researchers document their work — and now your child can too."
        layout="image-right"
        background="white"
      />

      {/* Observation Activities */}
      <ProjectShowcase
        title="What Will They Observe?"
        highlight="An open-ended exploration tool — the whole world is a specimen"
        subtitle="The included exploration manual guides beginners through each type of observation. These are just a few places to start."
        projects={[
          {
            name: "Prepared Slides",
            description:
              "Study the 5 included biology specimens using the transmitted light setting",
            concepts: "Biology, cell structure, specimens",
            image:
              "/images/products/matatastudio-digital-microscope-mx2-as/projects/prepared-slides.png",
          },
          {
            name: "Garden Explorer",
            description:
              "Go handheld to observe flowers, insects, and leaves up close in the garden",
            concepts: "Botany, insect biology, outdoor science",
            image:
              "/images/products/matatastudio-digital-microscope-mx2-as/projects/garden-explorer.png",
          },
          {
            name: "Crystal Science",
            description:
              "Watch salt and sugar transform into geometric structures at high magnification",
            concepts: "Chemistry, crystal structure, geometry",
            image:
              "/images/products/matatastudio-digital-microscope-mx2-as/projects/crystal-science.png",
          },
          {
            name: "Nature Detectives",
            description: "Collect soil and rocks from different spots and compare what's inside",
            concepts: "Geology, earth science, particle analysis",
            image:
              "/images/products/matatastudio-digital-microscope-mx2-as/projects/nature-detectives.png",
          },
          {
            name: "Everyday Objects",
            description: "Examine fabric, paper, coins, and household surfaces in a whole new way",
            concepts: "Materials science, observation, comparison",
            image:
              "/images/products/matatastudio-digital-microscope-mx2-as/projects/everyday-objects.png",
          },
          {
            name: "Science Journal",
            description:
              "Photograph every discovery and build a digital collection with the MatataXplore app",
            concepts: "Documentation, digital literacy, scientific method",
            image:
              "/images/products/matatastudio-digital-microscope-mx2-as/projects/science-journal.png",
          },
        ]}
        moreText="Plus any specimen your child can find — pond water, flower pollen, hair, skin, and more"
        background="gray"
      />

      {/* CustomerShowcase — ALL end-user images */}
      <CustomerShowcase
        title="See What Others Are Creating"
        subtitle="Real families exploring the microscopic world"
        images={[
          {
            src: "/images/products/matatastudio-digital-microscope-mx2-as/all-parts-unboxed.jpg",
            alt: "All MatataStudio MX2-AS parts laid out after unboxing",
            label: "Unboxed",
          },
          {
            src: "/images/products/matatastudio-digital-microscope-mx2-as/kit-unboxed-adult-hands.jpg",
            alt: "Adult hands holding the MX2-AS microscope after unboxing with all kit contents on table",
            label: "First Look",
          },
          {
            src: "/images/products/matatastudio-digital-microscope-mx2-as/microscope-scanning-orange-peel.jpg",
            alt: "MX2-AS digital microscope scanning the surface of an orange peel",
            label: "Orange Peel",
          },
          {
            src: "/images/products/matatastudio-digital-microscope-mx2-as/microscope-screening-specimen.jpg",
            alt: "MX2-AS microscope screening a specimen on the observation stand",
            label: "Specimen View",
          },
          {
            src: "/images/products/matatastudio-digital-microscope-mx2-as/microscopic-screen-view.jpg",
            alt: "Magnified microscopic view displayed on the MX2-AS screen",
            label: "Magnified",
          },
          {
            src: "/images/products/matatastudio-digital-microscope-mx2-as/base-that-microscope-stands-on.jpg",
            alt: "MX-Stand base that the MatataStudio microscope clips onto for tabletop use",
            label: "MX-Stand",
          },
          {
            src: "/images/products/matatastudio-digital-microscope-mx2-as/microscope-zipped-case.jpg",
            alt: "MatataStudio MX2-AS in its included fabric zipped storage case",
            label: "Storage Case",
          },
          {
            src: "/images/products/matatastudio-digital-microscope-mx2-as/storage-card-slot.jpg",
            alt: "8GB microSD card inserted into the side slot of the MX2-AS microscope",
            label: "microSD Slot",
          },
        ]}
        background="white"
      />

      {/* Reviews */}
      <ProductReviews productId={product.id} background="gray" />

      {/* FAQ */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "What age is the MX2-AS suitable for?",
            answer:
              "The MX2-AS is designed for ages 5 to 12. The intuitive touch controls and clear built-in screen mean even young children can start observing straight away, without needing to connect to a phone or computer first. Older children can go further with the MatataXplore app.",
          },
          {
            question: "Does my child need any prior experience with microscopes?",
            answer:
              "Not at all. The included exploration manual walks children through a range of observation activities from the very beginning — no experience required. The ready-to-use prepared slides and observation chambers mean they can start exploring immediately after unboxing.",
          },
          {
            question: "Do I need a phone or computer to use it?",
            answer:
              "No. The MX2-AS has a built-in 4.3-inch screen, so your child can observe, zoom, and capture photos or videos directly on the device. The free MatataXplore app (iOS, Android, Windows, macOS) is optional — it extends the experience with a larger view, image analysis, and measurement tools.",
          },
          {
            question: "Does it need batteries?",
            answer:
              "No loose batteries needed. The MX2-AS has a built-in 2600mAh rechargeable lithium battery that provides around 3 hours of use on a full charge. It recharges via the included USB-C cable.",
          },
          {
            question: "Can it be used outdoors?",
            answer:
              "Yes — and that's one of its best features. The handheld mode lets your child carry it into the garden, on a hike, or around the house to observe insects, plants, rocks, and anything else that catches their eye. Just note it isn't waterproof, so keep it away from rain or wet surfaces.",
          },
          {
            question: "What can they observe with it?",
            answer:
              "Almost anything! The 5 included prepared slides get them started with biological specimens. From there, the natural world is the limit — insects, leaves, flower petals, soil, rocks, fabric, coins, sugar crystals, and more. The dual LED lighting system handles both transparent slides and solid, opaque objects.",
          },
        ]}
        background="white"
      />

      {/* What's in the Box */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/matatastudio-digital-microscope-mx2-as/whats-in-the-box.jpg"
        imageAlt="MatataStudio MX2-AS digital microscope kit contents laid out"
        items={[
          "MatataStudio Digital Microscope MX2-AS",
          "MX-Stand",
          "5 prepared slides",
          "2 observation chambers",
          "8GB microSD card (pre-installed)",
          "Exploration manual",
          "USB-C cable",
          "User guides (×2)",
          "Storage bag",
          "Calibration ruler",
        ]}
        background="gray"
      />

      {/* Specifications */}
      <Specifications
        title="Technical Details"
        specs={[
          { label: "Display", value: "4.3-inch LCD, 800×480" },
          { label: "Capture Resolution", value: "1920×1080 (Full HD)" },
          { label: "Frame Rate", value: "30fps" },
          { label: "Image Sensor", value: "2MP CMOS" },
          { label: "Digital Magnification", value: "100×–1600×" },
          { label: "Optical Magnification", value: "9×–72×" },
          { label: "Lighting", value: "Dual LED: incident + transmitted (7-colour)" },
          { label: "Connectivity", value: "USB-C, Wi-Fi (MatataXplore app)" },
          { label: "Battery", value: "2600mAh built-in, ~3 hours" },
          { label: "Charging", value: "5V/2A USB-C" },
          { label: "Storage", value: "8GB microSD (included)" },
          { label: "Screen Rotation", value: "135°" },
          { label: "App Compatibility", value: "Android, iOS, Windows, macOS, Chrome OS" },
        ]}
        background="white"
      />

      {/* Final CTA */}
      <CallToAction
        title="Start Exploring"
        subtitle="Turn everyday curiosity into a love of science. The MX2-AS is ready to go straight out of the box."
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
      "MatataStudio MX2-AS digital microscope for ages 5–12. 2-in-1 handheld and stand design, 1600× magnification, built-in 1080P screen, and MatataXplore app. 5 slides included.",
    alternates: {
      canonical: "/product/matatastudio-digital-microscope-mx2-as",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
