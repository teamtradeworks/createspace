import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  ExtensionBanner,
  QuickInfoBadges,
  ImageTextBlock,
  VideoEmbed,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "matatastudio-ai-vision-kit-for-vincibot";
const PARENT_PRODUCT_HANDLE = "matatastudio-vincibot-coding-robot-set";

export default async function AIVisionKitPage() {
  const [product, parentProduct] = await Promise.all([
    getProductByHandle(PRODUCT_HANDLE),
    getProductByHandle(PARENT_PRODUCT_HANDLE),
  ]);

  if (!product) {
    notFound();
  }

  const resolvedAddons = await resolveAddonsForHandle(PRODUCT_HANDLE);
  const addons = serializeAddons(resolvedAddons);

  const parentProductName = parentProduct?.title || "VinciBot Coding Robot Set";
  const parentProductHref = `/product/${PARENT_PRODUCT_HANDLE}`;

  return (
    <ProductTrackingProvider handle={PRODUCT_HANDLE}>
      <ProductJsonLd product={product} />

      {/* Hero Section */}
      <HeroSection
        product={product}
        tagline="Teach your VinciBot to see, recognise, and respond to the real world"
        highlights={[
          "7 built-in AI vision functions — ready to use instantly",
          "Train your own custom AI model with one click",
          "40 activity cards plus 75+ online challenges",
          "Snaps onto VinciBot — no tools needed",
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

      {/* Video Section */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=Ou2r0Q6cvks"
        title="See the AI Vision Kit in Action"
        background="white"
      />

      {/* The 7 AI Functions */}
      <ImageTextBlock
        image="/images/products/matatastudio-ai-vision-kit-for-vincibot/seven-visual-functions.png"
        imageAlt="MatataStudio AI Vision Kit showing all seven visual functions including face recognition and colour tracking"
        title="Seven Ways to See the World"
        body="The AI Vision Kit comes pre-loaded with seven computer vision capabilities your child can use immediately: face recognition and tracking, image classification, visual line following, colour recognition and tracking, colour block detection, AprilTag marker recognition, and handwriting recognition (0–9). Each function is a hands-on window into how real AI systems work — from the face unlock on your phone to the object detection in self-driving cars. Combine multiple functions in a single programme and something exciting happens: your child isn't just using AI anymore — they're thinking like an AI engineer."
        layout="image-left"
        background="gray"
      />

      {/* Custom AI Training */}
      <ImageTextBlock
        image="/images/products/matatastudio-ai-vision-kit-for-vincibot/graphical-programming.png"
        imageAlt="Graphical block-based programming interface for the MatataStudio AI Vision Kit"
        title="Build Your Own AI — Not Just Use One"
        body="Most AI kits give children pre-built models to experiment with. The AI Vision Kit goes further: your child can collect their own image data, train a model from scratch, and deploy it onto VinciBot with a single click. They decide what the robot learns to recognise — their face, a favourite toy, a hand signal, a drawn shape. Every attempt teaches them something real about how AI thinks, fails, and improves. It's the difference between pressing a button and understanding the button — and it's the kind of hands-on AI literacy that will matter for decades."
        layout="image-right"
        background="white"
      />

      {/* FAQ Section */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: `Do I need the ${parentProductName} to use this kit?`,
            answer:
              "Yes — the AI Vision Kit is an expansion that attaches to the VinciBot robot. It requires a VinciBot to function and is not a standalone product. If you don't yet have a VinciBot, you'll need to get one first.",
          },
          {
            question: "What's different from what VinciBot can already do?",
            answer:
              "VinciBot's built-in AI uses TinyML for gesture and letter recognition via its existing sensors. The AI Vision Kit adds a dedicated flip camera module, a programmable LCD screen, and seven new computer vision functions — face recognition, image classification, line following, colour tracking, colour block detection, AprilTag recognition, and handwriting recognition. It's a significant upgrade in what VinciBot can perceive and respond to.",
          },
          {
            question: "What new projects will my child be able to build?",
            answer:
              "With the AI Vision Kit your child can programme VinciBot to follow their face around the room, navigate a colour-line maze, sort objects by colour, respond to handwritten numbers, create their own face or object recognition system, and much more. The 40 activity cards guide them from beginner challenges to advanced custom AI experiments. There are also 75+ online tutorials at coding.matatalab.com.",
          },
          {
            question: "Can my child still use the same Matatalab coding app?",
            answer:
              "Yes — the AI Vision Kit works with the same free Matatalab coding app your child already knows (Windows, Mac, iPad, Android). AI vision functions appear as new blocks in the graphical coding interface, so there's no new software to learn. As they progress, they can also incorporate Python.",
          },
          {
            question: "Is this suitable for the same age group as VinciBot?",
            answer:
              "Yes — the AI Vision Kit is designed for the same age range of 8–12. Children who have spent some time with VinciBot will be well-positioned to explore the AI functions confidently, though the beginner activity cards make it accessible even for newer users.",
          },
        ]}
        background="gray"
      />

      {/* What's Included */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/matatastudio-ai-vision-kit-for-vincibot/whats-in-the-box.png"
        imageAlt="MatataStudio AI Vision Kit box contents laid out"
        items={[
          "AI vision module with 180° flip camera",
          "1.5-inch full-colour LCD screen (240×240 resolution)",
          "Dual fill lights for reliable detection",
          "LEGO-compatible building blocks (for mounting)",
          "Activity cards × 40",
          "Quick guide",
          "USB-C cable",
          "Access to 75+ online tutorials at coding.matatalab.com",
        ]}
        background="white"
      />

      {/* Call to Action */}
      <CallToAction
        title="Add AI Vision to Your VinciBot"
        subtitle="The next step in your child's STEM journey — from coding a robot to building their own AI."
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
      "Add AI vision to your VinciBot. 7 built-in functions, custom model training, 40 activity cards. Train your robot to see, recognise, and respond. Ages 8–12.",
    alternates: {
      canonical: "/product/matatastudio-ai-vision-kit-for-vincibot",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
