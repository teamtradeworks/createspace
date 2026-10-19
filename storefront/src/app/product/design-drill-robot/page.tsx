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

const PRODUCT_HANDLE = "design-drill-robot";

export default async function DesignDrillRobotPage() {
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
        tagline="A toy robot your preschooler puts together with a kid-sized screwdriver."
        highlights={[
          "A 20 cm robot, 15 coloured bolts, a screwdriver and a sheet of stickers",
          "For ages 3+",
          "No batteries: you turn the screwdriver by hand",
          "It all unscrews again, so they can rebuild it as often as they like",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <FeatureGrid
        title="A Robot Built for Little Hands"
        columns={2}
        background="white"
        features={[
          {
            icon: "tools",
            title: "An Easy-Grip Screwdriver",
            description:
              "The screwdriver is short and chunky, so small hands can hold it properly. If your child can't get the twist right yet, they can tighten the bolts with their fingers instead.",
          },
          {
            icon: "palette",
            title: "Stickers and Coloured Bolts",
            description:
              "The robot comes plain, with a full-colour sheet of stickers to decorate it. The bolts are different colours too, which gives younger kids something to sort and match.",
          },
          {
            icon: "refresh",
            title: "It Comes Apart Again",
            description:
              "Once the arms are on and the bolts are in, everything unscrews again. Plenty of kids like the taking apart as much as the building.",
          },
          {
            icon: "smile",
            title: "No Lights or Sounds",
            description:
              "There's nothing electronic in it. When it's built, the head, arms and upper body swivel, so it can join in with whatever game is going on.",
          },
        ]}
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/design-drill-robot/lifestyle-child-screwing-robot-arm.jpg"
        imageAlt="Child's hand using the red kid-sized screwdriver to fasten a bolt on the Design & Drill Robot's arm"
        title="Getting the Hang of a Screwdriver"
        body="At three, getting a bolt to catch takes a bit of practice. Your child holds the robot with one hand and turns the screwdriver with the other, and the bolt usually slips out a few times before it goes in. Plenty of three-year-olds manage the whole build on their own. Younger ones might want you to start the first couple of bolts for them."
        layout="image-right"
        background="gray"
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/design-drill-robot/lifestyle-girl-tea-party-with-robot.jpg"
        imageAlt="Girl holding a toy teacup up to the Design & Drill Robot at a tea party, with the screwdriver on the table"
        title="After the Build, It's a Toy"
        body="When the bolts are in, the robot still gets played with. Its head, arms and upper body swivel, so kids can pose it and bring it into their games, whether that's a tea party or a block city on the carpet."
        layout="image-left"
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
            question: "What age is the Design & Drill Robot best for?",
            answer:
              "It's made for ages 3 and up, and Educational Insights originally listed it for 3 to 6. Three and four-year-olds usually get the most out of it, and some five-year-olds find it a bit easy. It isn't suitable for children under 3 because of the small parts.",
          },
          {
            question: "Does it need batteries?",
            answer:
              "No. You turn the screwdriver by hand, so there's nothing to charge. Some other Design & Drill sets come with a battery-powered toy drill, but this one doesn't.",
          },
          {
            question: "Will my child need help?",
            answer:
              "Lots of 3-year-olds build it on their own after a go or two. Younger kids sometimes need a hand with the screwdriver at first. They can also twist the bolts in with their fingers while they get used to it.",
          },
          {
            question: "Does the whole robot come apart?",
            answer:
              "The arms and the 15 bolts come off. The head and body stay in one piece, but they swivel, so the robot can still move once it's built. Kids snap the arms on, then bolt everything in place with the screwdriver.",
          },
          {
            question: "Can it be built more than once?",
            answer:
              "Yes. A build takes a few minutes, and the arms and bolts come off again afterwards, so they can do it over and over. The stickers only go on once, so it's worth letting your child pick where they go.",
          },
          {
            question: "Is it safe for little ones?",
            answer:
              "It's plastic and CE marked. The bolts count as small parts, so keep the set away from children under 3. A tub for the bolts between builds helps stop them going missing.",
          },
          {
            question: "What will my child get out of it?",
            answer:
              "Mostly, practice with a screwdriver. Twisting the bolts in works on their grip and hand-eye coordination. They can also sort the bolts by colour or line them up in patterns.",
          },
        ]}
      />

      {/* gray */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/design-drill-robot/whats-in-the-box.jpg"
        imageAlt="Design & Drill Robot with stickers applied, three loose bolts and the red kid-sized screwdriver"
        background="gray"
        items={[
          "Design & Drill Robot (20 cm tall) with swivelling head, arms and upper body",
          "15 multicoloured bolts",
          "Kid-friendly screwdriver",
          "Full-colour sheet of decorative stickers",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Ready to Build?"
        subtitle="No batteries needed. Made for ages 3 and up."
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
      "A 20 cm robot preschoolers build with a kid-sized screwdriver, 15 colourful bolts and stickers. No batteries needed. For little builders aged 3+.",
    alternates: {
      canonical: "/product/design-drill-robot",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
