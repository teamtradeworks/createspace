import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  FeatureGrid,
  ImageTextBlock,
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "geosafari-jr-talking-microscope";
const IMAGE_PATH = "/images/products/geosafari-jr-talking-microscope";

export default async function GeoSafariJrTalkingMicroscopePage() {
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
        tagline="Peek at a butterfly wing up close, then hear all about it from Bindi Irwin."
        highlights={[
          "60 magnified photos of animals, plants and everyday things, with over 100 facts and quiz questions",
          "Fact Mode and Quiz Mode, in English, Spanish, French or German",
          "Two eyepieces and nothing to focus, so little ones see the picture straight away",
          "All 20 slides tuck away in a drawer inside the microscope",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <ImageTextBlock
        image={`${IMAGE_PATH}/girl-looking-through-microscope-at-dandelion-slide.jpg`}
        imageAlt="Girl looking through the Talking Microscope at a dandelion slide, with a speech bubble sharing a dandelion fact"
        title="Tiny Details, Up Close"
        body="Each of the 20 slides holds three full-colour photos, 60 in all, covering animals, plants and things from around the house, magnified five times. Look at a butterfly wing and it turns out to be covered in thousands of tiny, shiny scales. Look at a dandelion puff and Bindi explains that it's full of seeds that will grow into yellow flowers. Small facts like these tend to come up again at the dinner table."
        layout="image-right"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes It Special"
        features={[
          {
            icon: "microphone",
            title: "Look, Listen and Learn",
            description:
              "This microscope talks. Pop in a slide, press a button, and Bindi Irwin from Australia Zoo tells your child about the picture in front of them. Pre-readers get the facts without needing a book.",
          },
          {
            icon: "thought-bubble",
            title: "Fact Mode and Quiz Mode",
            description:
              "Fact Mode explains what's on the slide. Switch to Quiz Mode and the microscope asks the questions instead, so your child gets to show off what they remember.",
          },
          {
            icon: "eye",
            title: "Both Eyes, No Focusing",
            description:
              "Lots of young children find it hard to close one eye. Here they don't have to: two eyepieces let them look with both eyes, and the pictures are already in focus, so there's nothing to adjust.",
          },
          {
            icon: "language",
            title: "Hello, Hola, Bonjour, Guten Tag",
            description:
              "Every fact and question is available in English, Spanish, French and German. Handy for bilingual homes, or for a first taste of another language.",
          },
        ]}
        columns={2}
        background="gray"
      />

      {/* white */}
      <ImageTextBlock
        image={`${IMAGE_PATH}/child-picking-up-microscope-slides.jpg`}
        imageAlt="Child picking up Talking Microscope slides spread across a wooden table"
        title="Their Own Science Station"
        body="There's no setup beyond batteries and a language choice, after which young scientists can run the whole show themselves. They pick a slide, push it into place and press a button to hear about it. When they're done, every slide goes back into the drawer in the base, so nothing ends up lost under the couch."
        layout="image-left"
        background="white"
      />

      {/* gray */}
      <CustomerShowcase
        title="Little Scientists at Home"
        subtitle="Photos from families using the Talking Microscope"
        images={[
          {
            src: `${IMAGE_PATH}/girl-looking-through-microscope-with-slides.jpg`,
            alt: "Girl on the floor looking through the Talking Microscope with slides spread out beside her",
            label: "Slide Spread",
            description: "Every slide out on the carpet, ready to look through",
          },
          {
            src: `${IMAGE_PATH}/child-looking-through-microscope.jpg`,
            alt: "Child looking through both eyepieces of the Talking Microscope",
            label: "Both Eyes In",
            description: "Two eyepieces, so there's no squinting",
          },
          {
            src: `${IMAGE_PATH}/boy-looking-through-microscope-at-table.jpg`,
            alt: "Boy leaning over the Talking Microscope at a dining table",
            label: "Table Time",
            description: "Taking a closer look at the dining table",
          },
          {
            src: `${IMAGE_PATH}/microscope-set-up-with-box-and-guide.jpg`,
            alt: "GeoSafari Jr. Talking Microscope set up next to its box and guide",
            label: "Just Unboxed",
            description: "Out of the box and ready for slides",
          },
        ]}
        background="gray"
      />

      {/* white */}
      <ProductReviews productId={product.id} background="white" />

      {/* gray */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "What age is it best for?",
            answer:
              "The box says 3+, and it's designed with preschoolers in mind. Children from about 3 to 7 tend to get the most out of it. Younger ones love hearing the facts, while older ones enjoy beating the quiz.",
          },
          {
            question: "Can my child use it without help?",
            answer:
              "Yes, once it's set up. You'll need to put the batteries in and pick a language. After that, choosing a slide, sliding it in and pressing a button is easy for small hands, and the slides store in the microscope's own drawer when playtime is over.",
          },
          {
            question: "What batteries does it need?",
            answer:
              "It takes 3 AAA batteries, which aren't included. You can add a set of three to your order at the top of this page, so it's ready to use the day it arrives.",
          },
          {
            question: "Can my child look at their own bits and pieces with it?",
            answer:
              "It's designed for its 20 prepared photo slides rather than things you collect. That's how it knows what to say about each picture, and why everything is already in focus. If your child starts bringing you leaves and bugs to look at, that's a good sign they're ready for a microscope that takes real specimens.",
          },
          {
            question: "Is it safe for younger siblings?",
            answer:
              "It carries a small-parts warning, so it isn't suitable for children under 3. Keep it, and especially the slides, out of reach of babies and toddlers.",
          },
          {
            question: "Won't they get bored once they've seen all the slides?",
            answer:
              "With 60 pictures and more than 100 facts and questions there's a lot to get through, and Quiz Mode gives them a reason to go back. Young children also love repeating what they've heard. One grandparent's review mentioned their 5-year-old grandson was memorising the facts in no time.",
          },
        ]}
        background="gray"
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image={`${IMAGE_PATH}/whats-in-the-box.jpg`}
        imageAlt="GeoSafari Jr. Talking Microscope next to its box, with three prepared slides in front"
        items={[
          "GeoSafari Jr. Talking Microscope with two eyepieces",
          "20 prepared slides with 3 full-colour images each (60 images)",
          "Slide storage drawer that fits inside the microscope",
          "Instructions, plus an activity guide on the packaging",
          "Batteries not included (needs 3 AAA)",
        ]}
        background="white"
      />

      {/* gray */}
      <Specifications
        title="Specifications"
        specs={[
          { label: "Magnification", value: "5x, fixed focus" },
          { label: "Eyepieces", value: "2" },
          { label: "Slides", value: "20 prepared slides, 60 images" },
          { label: "Audio", value: "100+ facts and quiz questions" },
          { label: "Modes", value: "Fact Mode and Quiz Mode" },
          { label: "Languages", value: "English, Spanish, French and German" },
          { label: "Narrator", value: "Bindi Irwin" },
          { label: "Power", value: "3 x AAA batteries (not included)" },
          { label: "Size", value: "Approx. 14 x 20 x 25 cm" },
          { label: "Material", value: "Plastic" },
        ]}
        background="gray"
      />

      {/* navy */}
      <CallToAction
        title="A Closer Look at the World"
        subtitle="A talking microscope that's simple enough for preschoolers to use on their own, with plenty to see and hear."
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
      "A talking microscope for preschoolers: 60 magnified images of animals, plants and everyday things, with 100+ facts and quizzes voiced by Bindi Irwin.",
    alternates: {
      canonical: "/product/geosafari-jr-talking-microscope",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
