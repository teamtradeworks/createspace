import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  FeatureGrid,
  ImageTextBlock,
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-ultimate-space-dig-kit-collection";

export default async function NatGeoUltimateSpaceDigKitPage() {
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
        tagline="Dig your way through the solar system, one planet at a time."
        highlights={[
          "8 planet-shaped dig bricks, each hiding 2 real rocks or gemstones",
          "16 genuine specimens to uncover, keep and identify",
          "2 dig tools, so two explorers can dig side by side",
          "Ages 4+",
        ]}
        addons={addons}
      />


      {/* white */}
      <ImageTextBlock
        image="/images/products/national-geographic-ultimate-space-dig-kit-collection/planet-dig-bricks-in-box.jpg"
        imageAlt="Eight colourful planet-shaped dig bricks sitting in their box tray"
        title="Eight Planets. Sixteen Hidden Treasures."
        body="Open the box and the whole solar system is looking back at you. Each dig brick is shaped and painted like a planet, right down to Earth with its raised continents. Inside every one, two real rocks or gemstones are waiting. Your child picks a planet, starts chipping, and keeps going until something sparkly peeks through."
        layout="image-left"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes This Dig Special"
        columns={2}
        background="gray"
        features={[
          {
            icon: "rocket",
            title: "Space and Rocks in One Box",
            description:
              "Two of the biggest childhood obsessions in one kit. Kids dig through a model of each planet to find real treasure from Earth, so a chat about the planets can easily turn into one about crystals.",
          },
          {
            icon: "sparkles",
            title: "16 Real Specimens",
            description:
              "These aren't plastic. Expect finds like chevron amethyst, pyrite, sodalite, tiger's eye, green fluorite, black obsidian and dalmatian jasper. Once they're out, they make a proper little rock and gem collection.",
          },
          {
            icon: "users",
            title: "Two Dig Tools in the Box",
            description:
              "Most dig kits come with one tool. This one has two, so siblings, friends or a parent and child can each claim a planet and dig at the same time.",
          },
          {
            icon: "book",
            title: "Planet Facts and a Gem Guide",
            description:
              "One side is packed with solar system facts. The other shows each rock and gemstone, so kids can match what they've found and learn its name.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/national-geographic-ultimate-space-dig-kit-collection/kids-digging-planets-outside.jpg"
        imageAlt="Two children sitting outside chipping away at planet dig bricks on paper plates"
        title="Take the Dig Outside"
        body="The bricks are sturdy, so digging takes a bit of patience, and a splash of water softens them right up. A tray or paper plate on the patio works well. Your explorers chip, brush and splash until a gem appears, then grab the magnifying glass for a closer look."
        layout="image-right"
        background="white"
      />

      {/* gray */}
      <CustomerShowcase
        title="Space Diggers in Action"
        subtitle="From the first chip to a handful of gems"
        background="gray"
        images={[
          {
            src: "/images/products/national-geographic-ultimate-space-dig-kit-collection/child-digging-into-planet-brick.jpg",
            alt: "Child's hand using a dig tool to uncover a specimen inside a planet brick",
            label: "Almost There",
            description: "A gem starts to peek through",
          },
          {
            src: "/images/products/national-geographic-ultimate-space-dig-kit-collection/planet-bricks-lined-up.jpg",
            alt: "Eight planet dig bricks lined up in a row outside",
            label: "Line Them Up",
            description: "The whole solar system, ready to dig",
          },
          {
            src: "/images/products/national-geographic-ultimate-space-dig-kit-collection/hand-holding-rocks-and-gemstones.jpg",
            alt: "Hand holding a pile of rocks and gemstones dug out of the planet bricks",
            label: "The Haul",
            description: "Every planet dug, every gem found",
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
              "It's recommended for ages 4 and up. Four and five year olds usually need a grown-up to help, because the bricks are sturdy and digging takes some effort. Older kids can mostly get on with it by themselves. It contains small parts, so it isn't suitable for children under 3.",
          },
          {
            question: "Is it messy?",
            answer:
              "Yes, a little. The bricks crumble into a chalky dust as kids dig. Work outside, or put down a tray, a baking sheet or some newspaper first. Play clothes are a good idea, and a broom and dustpan make clean-up quick.",
          },
          {
            question: "Is the digging hard? Any tips?",
            answer:
              "The bricks are solid, so it takes patience. Adding a little water softens them and makes digging much easier (and less dusty). Keep a cup of water or a spray bottle nearby and dampen the brick as you go.",
          },
          {
            question: "Are the rocks and gemstones real?",
            answer:
              "Yes. All 16 specimens are genuine rocks and gemstones, two in each planet. Finds include chevron amethyst, pyrite, a geode piece, sodalite, green fluorite, granite, tiger's eye, black obsidian, blue calcite and dalmatian jasper. Some rocks, like obsidian, can have sharper edges, so keep an eye on younger diggers.",
          },
          {
            question: "Can the bricks be reused?",
            answer:
              "Each brick can only be dug once. With eight of them, though, there's plenty of digging to spread over several sessions. The 16 specimens and the poster are yours to keep, and the collection tends to come out again and again.",
          },
          {
            question: "What will my child get out of it?",
            answer:
              "Mostly, a lot of excitement every time a gem appears. Along the way they'll find out what the eight planets look like, learn the names of real rocks and gemstones, and practise slow, careful work with their hands. Plus, they'll have a collection they dug up themselves to show off.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-ultimate-space-dig-kit-collection/whats-in-the-box.jpg"
        imageAlt="National Geographic Ultimate Space Dig Kit contents: planet dig bricks, rocks and gemstones, dig tools, magnifying glass and poster"
        background="white"
        items={[
          "8 planet-shaped dig bricks",
          "16 genuine rock and gemstone specimens (2 inside each planet)",
          "2 dig tools",
          "Magnifying glass",
          "Double-sided learning poster: solar system facts and rock and gemstone guide",
          "Instructions",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Blast Off on a Gem Hunt"
        subtitle="Eight planets to dig through and sixteen real rocks and gemstones to find. Bring a friend, there's a tool for each of you."
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
      "Dig 16 real rocks and gemstones out of 8 planet-shaped bricks. Includes 2 dig tools, a magnifying glass and a solar system poster. For ages 4+.",
    alternates: {
      canonical: "/product/national-geographic-ultimate-space-dig-kit-collection",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
