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
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-motorized-marble-run";

export default async function NatGeoMotorizedMarbleRunPage() {
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
        tagline="Design your track. Switch on the motor. Watch it run forever."
        highlights={[
          "75 pieces — including a motorised elevator that lifts marbles back to the top automatically",
          "Build, take apart, and redesign — endless configurations, no two runs the same",
          "Ages 8+ · 3 × AA batteries required (not included)",
          "Includes a learning guide on the physics of gravity and motion",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=7OzeSscHcFk"
        title="See It in Action"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes This Kit Special"
        columns={2}
        background="gray"
        features={[
          {
            icon: "refresh-cw",
            title: "Runs Without Stopping",
            description:
              "The motorised spiral elevator continuously lifts marbles back to the starting point, so the run keeps going as long as you leave it switched on. No manual resetting. No interruptions. Just endless motion.",
          },
          {
            icon: "building-blocks",
            title: "Endless Configurations",
            description:
              "75 tight-fit pieces, countless ways to build. Straight runs, U-turns, elevated drops, speed sections — rearrange them any time for a completely different run. The instruction manual guides you from simple builds to complex ones.",
          },
          {
            icon: "eye",
            title: "Watch the Physics Happen",
            description:
              "The clear track pieces let you follow every inch of the marble's journey. You can see exactly where it speeds up, where it slows down, and what happens at every curve and drop — physics made visible.",
          },
          {
            icon: "shield",
            title: "Pieces That Stay Put",
            description:
              "Secure snap-fit connections keep the structure stable mid-play — even on tall or complex builds. Build high, build intricate — it won't fall apart on you.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/national-geographic-motorized-marble-run/image-of-marbles-close-up-going-down-run.jpg"
        imageAlt="Close-up of marbles travelling through the clear tube track of the marble run"
        title="Watch It Fly"
        body="Every drop, every curve, every U-turn — all of it visible through the clear track. Watch a marble pick up speed as the slope steepens, carry its momentum around a bend, and fire through a turn at full pace. Then take it apart and build something completely different."
        layout="image-left"
        background="white"
      />

      {/* gray */}
      <CustomerShowcase
        title="See What People Are Building"
        subtitle="75 pieces. Infinite runs. Every builder makes something different."
        background="gray"
        images={[
          {
            src: "/images/products/national-geographic-motorized-marble-run/marble-run-built-with-kids-inthe-background.jpg",
            alt: "A completed marble run configuration with children visible in the background",
            label: "Finished Run",
            description:
              "A completed marble run — the elevator lifts marbles back to the top to keep it going",
          },
          {
            src: "/images/products/national-geographic-motorized-marble-run/kids-playing-with-marble-run.jpg",
            alt: "Children building and playing with the National Geographic Motorized Marble Run",
            label: "Building Together",
            description:
              "Marble runs naturally become a group activity — siblings and parents get drawn in",
          },
          {
            src: "/images/products/national-geographic-motorized-marble-run/close-up-of-marble-run.jpg",
            alt: "Close-up of the clear tube track pieces of the marble run",
            label: "Track Detail",
            description:
              "Clear tube pieces let you watch the marble's full journey through every section",
          },
          {
            src: "/images/products/national-geographic-motorized-marble-run/close-up-spinner-marble-run.jpg",
            alt: "Close-up of a spinner action piece on the marble run",
            label: "Action Pieces",
            description:
              "Action pieces add directional changes and special movements to the marble's path",
          },
          {
            src: "/images/products/national-geographic-motorized-marble-run/hand-holding-marbles.jpg",
            alt: "Hand holding a selection of the 15 marbles included in the kit",
            label: "15 Marbles",
            description: "15 marbles included — enough to keep the run running",
          },
          {
            src: "/images/products/national-geographic-motorized-marble-run/box-unboxed.jpg",
            alt: "National Geographic Motorized Marble Run kit with box and contents",
            label: "Kit Contents",
            description: "Everything that comes in the box — ready to build on day one",
          },
          {
            src: "/images/products/national-geographic-motorized-marble-run/child-holding-box.jpg",
            alt: "Child holding the National Geographic Motorized Marble Run box",
            label: "The Box",
            description: "The complete 75-piece Motorized Marble Run kit",
          },
          {
            src: "/images/products/national-geographic-motorized-marble-run/pieces-on-mat.jpg",
            alt: "All 75 pieces of the National Geographic Motorized Marble Run laid out on a mat",
            label: "All the Pieces",
            description:
              "All 75 pieces laid out — track sections, bases, action pieces, and the motorised elevator",
          },
        ]}
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
              "The kit is designed for ages 8 and up. The building is straightforward enough for an 8-year-old to manage independently, while the open-ended nature of the design keeps older children — and adults — genuinely engaged. Many families find it turns into a group activity once the first run is up and running.",
          },
          {
            question: "Do batteries come included?",
            answer:
              "No, batteries are not included. The motorised elevator requires 3 × AA batteries. Since testing the run is the first thing most kids want to do, it's worth having batteries ready before opening the box.",
          },
          {
            question: "How long does it take to build?",
            answer:
              "A first simple run takes around 20–30 minutes. The motorised elevator assembly takes about 10–15 minutes on its own. More complex, multi-level configurations can take 45 minutes to an hour or more. The kit tends to stay out — children take it apart and redesign it over multiple sessions rather than building it once and putting it away.",
          },
          {
            question: "Can it be taken apart and built differently each time?",
            answer:
              "That's the whole point. The tight-fit pieces connect and disconnect cleanly, so children can completely reconfigure the run as many times as they like. There's no single correct design — the challenge is finding what works, then making it better.",
          },
          {
            question: "Are the pieces durable? Will the structure stay together?",
            answer:
              "Yes. The pieces are made from sturdy plastic with a secure snap-fit system that keeps the structure stable, even on tall or complex builds. Customer feedback consistently highlights the build quality — this isn't a kit where pieces randomly separate mid-run.",
          },
          {
            question: "Can the set be expanded?",
            answer:
              "Yes. This set is compatible with other National Geographic marble run sets, so children can combine them to build bigger, more complex runs. There's also a National Geographic Glowing Marble Run Expansion Pack available that adds glow-in-the-dark marbles and additional construction pieces.",
          },
          {
            question: "What will my child get out of this?",
            answer:
              "Hours of building and experimenting, first and foremost. But there's something more at play: children are naturally drawn into a trial-and-error loop — build, test, spot the problem, fix it, try again. That process of figuring things out, and the satisfaction when the marble completes its first full circuit, is genuinely confidence-building in a way that's hard to manufacture with passive activities.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-motorized-marble-run/whats-in-the-box.jpg"
        imageAlt="National Geographic Motorized Marble Run kit contents laid out"
        background="white"
        items={[
          "46 construction pieces (action pieces, clear tube pieces, base pieces)",
          "14-piece motorised spiral elevator",
          "15 marbles",
          "Storage bag",
          "Learning guide (physics of motion and gravity)",
          "Instruction manual",
          "3 × AA batteries required — not included",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Build Your First Marble Run"
        subtitle="75 pieces, a motorised elevator, and endless configurations to explore. All you need is 3 × AA batteries."
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
      "Build endless marble runs with a motorised elevator that resets itself — 75 pieces, clear track, and a learning guide on gravity and motion. Ages 8+.",
    alternates: {
      canonical: "/product/national-geographic-motorized-marble-run",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
