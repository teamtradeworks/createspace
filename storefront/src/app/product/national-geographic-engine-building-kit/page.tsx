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
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-engine-building-kit";

export default async function NatGeoEngineBuildingKitPage() {
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
        tagline="Build a see-through car engine, press start, and watch it run."
        highlights={[
          "175+ pieces make a clear 4-cylinder engine you can see right into",
          "Pistons, valves and gears really move, and the spark plugs flash",
          "Magnetic screwdriver, illustrated instructions and a getting-started video included",
          "Ages 10+ · 3 × AA batteries required (not included)",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=HF2OsoLaXgo"
        title="Watch the Engine Come Together"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes This Engine Special"
        columns={2}
        background="gray"
        features={[
          {
            icon: "eye",
            title: "See-Through Engine",
            description:
              "The whole casing is clear, so nothing is hidden. You can watch each piston rise and fall and see how the gears and valves keep time with it, which is exactly what stays hidden under a real car bonnet.",
          },
          {
            icon: "zap",
            title: "It Actually Moves",
            description:
              "Pop in 3 AA batteries and press start. The pistons pump, the valves open and close, the gears turn and the spark plug lights flash in sequence. Getting it running for the first time is the best bit.",
          },
          {
            icon: "tools",
            title: "175+ Pieces to Build",
            description:
              "This is a proper build, with pistons, a crankshaft, valves, gears and the clear casing all going together by hand. Illustrated step-by-step instructions take you through it, and a video link helps you get going.",
          },
          {
            icon: "book",
            title: "Full-Colour Learning Guide",
            description:
              "Find out how real combustion engines work, what the four strokes of an engine do, and how engines developed over hundreds of years. Then look at your model and spot it happening.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/national-geographic-engine-building-kit/clear-engine-model-finished-build.jpg"
        imageAlt="Finished National Geographic clear 4-cylinder engine model with red valve covers on a blue table"
        title="Your Own Engine on the Desk"
        body="When the last piece goes on, you have a working four-cylinder engine that you built yourself. Press the button and the whole thing comes to life: four pistons pumping, valves rocking, spark plugs flashing. It makes a great talking point on a shelf, and you can start it up again whenever someone asks how a car engine works."
        layout="image-left"
        background="white"
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/national-geographic-engine-building-kit/screwing-pistons-onto-crankshaft.jpg"
        imageAlt="Hands using a screwdriver to attach pistons to the crankshaft of the engine model"
        title="Hands-On, Screw by Screw"
        body="Kids fit the pistons to the crankshaft, add the valves and gears, then close everything up in the clear casing. The magnetic screwdriver holds each small screw in place, so it doesn't end up rolling under the couch. Getting each stage right and seeing it move takes patience, and that's a big part of the fun."
        layout="image-right"
        background="gray"
      />

      {/* white */}
      <ProductReviews productId={product.id} background="white" />

      {/* gray */}
      <ProductFAQ
        title="Common Questions"
        background="gray"
        faqs={[
          {
            question: "What age is this best for?",
            answer:
              "The kit is made for ages 10 and up. It's a big build with lots of small screws, so it suits kids who enjoy a longer, focused project. It's a satisfying build for teens and adult car fans too.",
          },
          {
            question: "Do batteries come included?",
            answer:
              "No. The engine needs 3 × AA batteries, which aren't in the box. Have them ready before you start, because the first thing everyone wants to do after the last screw goes in is press start.",
          },
          {
            question: "Will my child need help building it?",
            answer:
              "The illustrated step-by-step instructions are clear, and there's a link to a video that shows you how to get started. The magnetic screwdriver makes the small screws much easier to handle. Some kids will want a parent nearby for the fiddlier steps, and building it together is a great way to spend an afternoon.",
          },
          {
            question: "How long does it take to build?",
            answer:
              "There's no official build time. With 175+ pieces it isn't a quick job, so give it a free afternoon or split it across a couple of sessions. The instructions break it into steps, which makes it easy to stop and pick up again later.",
          },
          {
            question: "Does it use real fuel?",
            answer:
              "No. A battery-powered motor drives the moving parts, and flashing LED spark plugs stand in for the ignition. You see how a real engine moves without any fuel, heat or mess.",
          },
          {
            question: "Is it safe?",
            answer:
              "The kit contains small parts, so it isn't suitable for children under 3. Keep the pieces away from little brothers and sisters while the build is in progress.",
          },
          {
            question: "What will my child get out of it?",
            answer:
              "Mostly, the satisfaction of building something big that really works. Along the way they'll see what pistons, valves and spark plugs do, and start asking how the family car works. Every purchase also helps support the National Geographic Society's work in exploration, research and education.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-engine-building-kit/whats-in-the-box.jpg"
        imageAlt="All 175+ parts of the National Geographic Engine Building Kit laid out, with the magnetic screwdriver"
        background="white"
        items={[
          "175+ engine pieces, including pistons, valves, gears and a clear casing",
          "LED spark plugs",
          "Magnetic screwdriver",
          "Illustrated step-by-step instructions",
          "Link to a getting-started video",
          "Full-colour Learning Guide",
          "3 × AA batteries required (not included)",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Start Your Engine"
        subtitle="175+ pieces, a magnetic screwdriver and a full-colour Learning Guide. Just add 3 × AA batteries."
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
      "Build a clear 4-cylinder engine from 175+ pieces, then press start to watch the pistons, valves and gears move. Includes a Learning Guide. Ages 10+.",
    alternates: {
      canonical: "/product/national-geographic-engine-building-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
