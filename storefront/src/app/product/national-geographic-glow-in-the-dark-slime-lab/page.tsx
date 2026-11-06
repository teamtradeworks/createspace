import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  FeatureGrid,
  ImageTextBlock,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-glow-in-the-dark-slime-lab";

export default async function NatGeoGlowSlimeLabPage() {
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
        tagline="Make gooey green slime at home, then switch off the lights and watch it glow."
        highlights={[
          "Just add water to the slime powder and stir",
          "Charge it under a bright light and it glows in the dark",
          "Learning guide on hagfish, snails and slime molds",
          "Ages 8+ · Adult supervision required",
        ]}
        addons={addons}
      />


      {/* white */}
      <FeatureGrid
        title="Why Kids Love This Slime"
        columns={2}
        background="white"
        features={[
          {
            icon: "sparkles",
            title: "It Glows in the Dark",
            description:
              "Hold the slime under a lamp or in the sun for a few minutes, then turn off the lights. The longer it charges, the brighter it glows. Kids will be trying out every torch in the house.",
          },
          {
            icon: "time",
            title: "Just Add Water",
            description:
              "No glue and no activator to measure out. Tip the slime powder into water, stir with the wooden stick and watch it thicken into slime in a few minutes.",
          },
          {
            icon: "touch",
            title: "Stretchy and Squishy",
            description:
              "Pull it slowly and it stretches a long way. Tug it fast and it can snap. Slime acts a bit like a liquid and a bit like a solid, and kids can feel the difference in their hands.",
          },
          {
            icon: "globe",
            title: "Slime in the Wild",
            description:
              "The National Geographic learning guide shows how real animals use slime. Hagfish use it to fight off predators, and snails glide along on it. There's a section on slime molds too.",
          },
        ]}
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/national-geographic-glow-in-the-dark-slime-lab/boy-stretching-green-slime.jpg"
        imageAlt="Boy in glasses stretching a long strand of bright green slime above his head"
        title="Mix It, Squish It, Stretch It"
        body="Making the slime takes a few minutes. After that, kids can stretch it as far as it goes, squish it flat and see how slowly it oozes back. Seeing it change from dry powder into goo in front of them is half the fun, and there's real chemistry going on in the bowl."
        layout="image-left"
        background="gray"
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/national-geographic-glow-in-the-dark-slime-lab/child-watching-slime-glow-in-the-dark.jpg"
        imageAlt="Child resting their chin on their arms in a dark room, watching a blob of slime glow green on the table"
        imageObjectPosition="center 85%"
        title="Lights Off, Slime On"
        body="Once the slime has soaked up some light, it gives that light back slowly as a green glow in the dark. Kids can find out which light charges it best: sunlight, a lamp or a torch. Then they can time how long the glow lasts. It's an easy experiment to run again and again."
        layout="image-right"
        background="white"
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
              "It's best for ages 8 and up. Younger kids can join in with an adult doing the mixing. The box says the kit should only be used with adult supervision.",
          },
          {
            question: "Is it safe?",
            answer:
              "The kit contains chemicals that can be harmful if misused, so an adult should be there while the slime is made and played with. Read the cautions on the powder sachet before you start. Don't put slime in your mouth, and wash your hands afterwards. It also contains small parts, so it isn't suitable for children under 3.",
          },
          {
            question: "How do you make the slime?",
            answer:
              "Add water to the slime powder and stir with the wooden stick until it thickens. The instructions in the learning guide take you through each step.",
          },
          {
            question: "How do I get it to glow?",
            answer:
              "Hold the slime under a bright light for a few minutes, then go somewhere dark. Sunlight or a strong lamp works well. The longer it charges, the brighter and longer it glows, and you can charge it again whenever the glow fades.",
          },
          {
            question: "Is it messy?",
            answer:
              "It's slime, so expect a little goo. Mix it on a table you can wipe down, and keep it off carpets and clothes. Put it back in the storage container when you're finished.",
          },
          {
            question: "Can we play with it more than once?",
            answer:
              "Yes. The slime goes back in its storage container between play sessions, so kids can take it out, stretch it and charge it up again later. The kit makes one batch of slime.",
          },
          {
            question: "What will my child get out of it?",
            answer:
              "Mostly a lot of fun. Along the way they'll see powder turn into slime, find out why things glow in the dark, and pick up some strange facts about animals that use slime to survive.",
          },
        ]}
      />

      {/* gray */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-glow-in-the-dark-slime-lab/whats-in-the-box.jpg"
        imageAlt="Contents of the National Geographic Slime Lab: learning guide, slime storage container, glow-in-the-dark slime powder sachet and wooden stir stick"
        background="gray"
        items={[
          "Green glow-in-the-dark slime powder",
          "Slime storage container",
          "Wooden stirring stick",
          "National Geographic instructions and learning guide",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Get Ready to Glow"
        subtitle="Slime powder, a storage container, a stir stick and a National Geographic learning guide. Just add water."
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
      "Make green slime that glows in the dark. Just add water and stir. Includes a National Geographic guide to slime in nature. Ages 8+.",
    alternates: {
      canonical: "/product/national-geographic-glow-in-the-dark-slime-lab",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
