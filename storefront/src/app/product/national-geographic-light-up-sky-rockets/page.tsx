import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  FeatureGrid,
  ImageTextBlock,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-light-up-sky-rockets";

export default async function NatGeoLightUpSkyRocketsPage() {
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
        tagline="Stomp the pad, watch them fly — up to 100 feet in the air."
        highlights={[
          "3 LED-lit rockets that glow for spectacular evening launches",
          "Air-powered stomp launch — no setup, just run outside and go",
          "Adjustable launch angle to experiment with distance and trajectory",
          "Ages 8+",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <FeatureGrid
        title="What Makes These Rockets Special"
        columns={2}
        background="white"
        features={[
          {
            icon: "rocket",
            title: "100 Feet of Pure Excitement",
            description:
              "A firm two-foot stomp on the extra-large launch pad sends a rocket shooting up to 100 feet into the sky. The height is immediate and dramatic — the kind of launch that makes siblings stop what they're doing and sprint outside to have a turn.",
          },
          {
            icon: "sun",
            title: "LED Rockets That Glow",
            description:
              "Each rocket has a switchable LED light built in. Flip them on as the sun goes down and watch glowing rockets arc against the darkening sky. Night launches become a completely different experience — and they extend play well past daylight hours.",
          },
          {
            icon: "target",
            title: "Aim It Anywhere",
            description:
              "The launch tube adjusts, so children can angle it straight up for maximum height, or tilt it to fire rockets across the garden. Changing the angle and watching what happens is where the real exploration starts — angle, distance, and height are all connected.",
          },
          {
            icon: "book",
            title: "The Science Behind the Flight",
            description:
              "The included Learning Guide covers the physics that makes the rockets fly — air pressure, trajectory, and the forces acting on every launch. Children who want to go deeper have somewhere to go; those who just want to stomp and launch can do that too.",
          },
        ]}
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/national-geographic-light-up-sky-rockets/dad-and-kids-playing-excited.jpg"
        imageAlt="A dad and children playing excitedly with the National Geographic Light-Up Air Rockets"
        title="The Toy That Gets Everyone Outside"
        body="Someone stomps. A rocket disappears into the sky. Within seconds, everyone in the garden wants a turn. These rockets have a way of pulling people in — siblings, friends, neighbours — because watching something fly that high, powered by nothing but a stomp, is genuinely hard to walk past."
        layout="image-left"
        background="gray"
      />

      {/* gray */}
      <ProductReviews productId={product.id} background="gray" />

      {/* white */}
      <ProductFAQ
        title="Common Questions"
        background="white"
        faqs={[
          {
            question: "What age is this best for?",
            answer:
              "The kit is rated for ages 8 and up, and that's a good guide. An 8-year-old can set it up and launch independently without help. Younger children (5–7) can absolutely join in and stomp the pad, but may need an adult to handle setup and to help angle the launch tube. The activity itself has no age ceiling — adults and teens get just as competitive about launch height.",
          },
          {
            question: "Are batteries included?",
            answer:
              "Yes. Each rocket comes with LR41 button cell batteries pre-installed — the LEDs are ready to switch on straight out of the box. No last-minute battery run needed.",
          },
          {
            question: "Is it safe?",
            answer:
              "Yes. The rockets are foam-tipped with no sharp edges, and the launch mechanism uses air pressure — there's no flammable propellant or explosive charge of any kind. As with any outdoor activity, launch in an open space away from windows and overhead obstacles, and keep young children clear of the launch area when the pad is being stomped.",
          },
          {
            question: "Does it need to be used outdoors?",
            answer:
              "Outdoors is strongly recommended. At up to 100 feet high, these rockets need open sky. A large garden, park, or open field is ideal. Indoors is not suitable — the rockets are designed for proper outdoor launches.",
          },
          {
            question: "How long does setup take?",
            answer:
              "Under two minutes. Unfold the base legs, slot the launch tube in, place a rocket on top, and you're ready to go. There's no tools, no assembly, and nothing to figure out — children can set it up themselves.",
          },
          {
            question: "Can it be used at night?",
            answer:
              "That's one of the best things about this kit. Flip the LED switch on each rocket before launch and watch glowing rockets arc against the night sky. Evening and after-dark launches are a genuinely different experience — and they make the rockets look spectacular.",
          },
          {
            question: "What will my child get out of this?",
            answer:
              "Firstly, a lot of fun. But watch what happens after the first few launches: children naturally start experimenting — stomping harder, tilting the angle, comparing results. That instinct to test, observe, and try differently is exactly how scientists think. The learning guide gives curious kids somewhere to take those questions, with the physics behind what they're already watching happen in real time.",
          },
        ]}
      />

      {/* gray */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-light-up-sky-rockets/whats-in-the-box.jpg"
        imageAlt="National Geographic Light-Up Air Rockets kit contents laid out"
        background="gray"
        items={[
          "3 × LED-equipped, foam-tipped air rockets (batteries pre-installed)",
          "Rocket launch base with foldable legs",
          "Adjustable launch tube",
          "Extra-large stomp foot pump",
          "Learning Guide (science of flight, aerodynamics, and motion)",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Ready for Liftoff?"
        subtitle="3 glowing rockets, a stomp pad, and 100 feet of sky. Batteries included."
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
      "Stomp to launch 3 LED-lit rockets up to 100 feet high. Air-powered, foam-tipped, and ready in under 2 minutes. Includes Learning Guide. Ages 8+.",
    alternates: {
      canonical: "/product/national-geographic-light-up-sky-rockets",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
