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

const PRODUCT_HANDLE = "nasa-astronaut-helmet";

export default async function NasaAstronautHelmetPage() {
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
        tagline="Put on the helmet — and launch your own mission."
        highlights={[
          "Realistic wearable helmet with an opening and closing visor — ages 6 to 12",
          "Foam-padded interior for a comfortable fit through any adventure",
          "Customise with the included NASA-style sticker sheet",
          "Full-colour Learning Guide packed with astronaut and space suit facts",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=_ASCsClm4C4"
        title="NASA Astronaut Helmet in Action"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes This Helmet Special"
        columns={2}
        background="gray"
        features={[
          {
            icon: "sparkles",
            title: "A Visor That Actually Opens and Closes",
            description:
              "The hinged visor flips up and down just like the real thing. Whether locked down on an EVA or raised back at base, every move feels like the genuine article.",
          },
          {
            icon: "heart",
            title: "Comfortable Through the Whole Mission",
            description:
              "Foam padding lines the inside of the helmet so it stays comfortable through long play sessions — no pinching, no slipping, just a helmet that stays in place while the adventure keeps going.",
          },
          {
            icon: "star",
            title: "Make It Your Own",
            description:
              "The included NASA-style sticker sheet lets kids design their own mission identity — patches, logos, insignia. Every child's helmet ends up completely unique.",
          },
          {
            icon: "book",
            title: "The Guide That Answers the Big Questions",
            description:
              "The full-colour Learning Guide covers how astronauts train, what they eat in space, how a space suit keeps a person alive, and what life aboard the International Space Station really looks like.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/nasa-astronaut-helmet/boy-wearing-helmet-with-space-scene-in-background.jpg"
        imageAlt="Boy wearing the NASA astronaut helmet with a space scene in the background"
        title="The Mission Starts the Moment It Goes On"
        body="Kids wearing this tend to come with questions. How do astronauts breathe up there? What happens if something breaks on a spacewalk? Could people actually live on Mars? The Learning Guide is included for exactly that — real answers when the curiosity kicks in."
        layout="image-left"
        background="white"
      />

      {/* gray */}
      <CustomerShowcase
        title="Suited Up and Ready"
        subtitle="From unboxing to full mission mode"
        background="gray"
        images={[
          {
            src: "/images/products/nasa-astronaut-helmet/child-dressed-in-astronaut-outfit.jpg",
            alt: "Child in white astronaut suit and NASA helmet giving two thumbs up",
            label: "Mission Ready",
            description: "Thumbs up — suited up and ready to go",
          },
          {
            src: "/images/products/nasa-astronaut-helmet/child-dressed-up-as-astronaut.jpg",
            alt: "Child in orange astronaut suit wearing the NASA helmet",
            label: "Astronaut",
            description: "Ready for launch in full gear",
          },
          {
            src: "/images/products/nasa-astronaut-helmet/close-up-of-helmet.jpg",
            alt: "Close-up of the NASA meatball logo on the helmet with visor open",
            label: "NASA Logo",
            description: "Visor open — showing the NASA logo detail",
          },
          {
            src: "/images/products/nasa-astronaut-helmet/front-of-box.jpg",
            alt: "Blue Marble Astronaut Helmet box showing visor opens and closes",
            label: "The Box",
            description: "Visor opens and closes — one size fits most",
          },
          {
            src: "/images/products/nasa-astronaut-helmet/box-unpacked.jpg",
            alt: "All helmet components laid out including foam pad, sticker sheet and learning guide",
            label: "Everything Inside",
            description: "Helmet parts, foam pad, sticker sheet, and learning guide",
          },
          {
            src: "/images/products/nasa-astronaut-helmet/hand-holding-helmet.jpg",
            alt: "Hand holding the assembled NASA astronaut helmet with visor open",
            label: "Ready to Wear",
            description: "Showing the visor hinge and NASA logo",
          },
          {
            src: "/images/products/nasa-astronaut-helmet/showing-foam-inside.jpg",
            alt: "Looking inside the helmet showing the foam padding insert",
            label: "Foam Padding",
            description: "The foam insert that keeps the helmet comfortable",
          },
          {
            src: "/images/products/nasa-astronaut-helmet/box-opened.jpg",
            alt: "Helmet parts packed inside the opened shipping box",
            label: "Unboxed",
            description: "Parts packed inside — ready to snap together",
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
              "The helmet is designed for ages 6 to 12. Younger children in the range will love the excitement of wearing it and may want an adult nearby for the initial snap-together assembly. By age 8 or 9, most children can work through everything independently — including the Learning Guide and the sticker sheet. Older children in the range will get real mileage from the guide's facts and the questions they'll start asking about space.",
          },
          {
            question: "Does the visor actually open and close?",
            answer:
              "Yes — the visor is hinged and opens and closes by hand. It can be worn closed for full astronaut mode, flipped up when back at base, or adjusted mid-mission as the story demands. It behaves like real space gear, which is a big part of what makes it feel authentic.",
          },
          {
            question: "Is it comfortable for extended wear?",
            answer:
              "The helmet includes foam padding on the inside to improve fit and comfort. It's designed specifically for children in the 6–12 age range, so the proportions are right for the audience — not an adult costume scaled down. Most children find it comfortable for long play sessions.",
          },
          {
            question: "Is any assembly required?",
            answer:
              "Yes — there is some easy snap-together assembly before first use. No tools are needed, and the design is specifically built for quick, straightforward setup. It should take under 5 minutes to put together.",
          },
          {
            question: "What does the Learning Guide cover?",
            answer:
              "The full-colour Learning Guide covers the science and reality of space exploration — how astronauts train and prepare, what they eat and drink in microgravity, how a space suit works and why it is necessary, and facts about the International Space Station and space missions. The activity booklet included alongside it has space-themed activities to work through.",
          },
          {
            question: "Can my child personalise the helmet?",
            answer:
              "Yes — the NASA-style sticker sheet is there specifically for personalisation. Kids can add mission patches, flags, name tags, and insignia to make the helmet completely their own. It is a one-time activity that gives children genuine ownership over their gear before the missions begin.",
          },
          {
            question: "What will my child get out of this?",
            answer:
              "The immediate result is extended, focused imaginative play — children tend to build elaborate missions and scenarios with a helmet that feels like the real thing. Beyond the play itself, the questions usually follow: how do astronauts sleep in zero gravity? Could people live on Mars? The helmet triggers curiosity, and the Learning Guide gives it somewhere to go. Many children come away with a new appetite for space documentaries, books, and science museums.",
          },
        ]}
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/nasa-astronaut-helmet/whats-in-the-box.jpg"
        imageAlt="National Geographic NASA Astronaut Helmet kit contents laid out"
        background="white"
        items={[
          "Wearable astronaut helmet with opening and closing visor",
          "Foam padding insert for a comfortable fit",
          "NASA-style sticker sheet for personalisation",
          "Full-colour Learning Guide with astronaut and space suit facts",
          "Activity booklet with space-themed activities",
        ]}
      />

      {/* navy */}
      <CallToAction
        title="The Mission Starts Here"
        subtitle="Suit up, customise your helmet, and find out just how far your imagination can take you."
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
      "Wearable NASA astronaut helmet with opening visor, foam padding, sticker sheet and Learning Guide. Spark a love of space exploration. Ages 6–12.",
    alternates: {
      canonical: "/product/nasa-astronaut-helmet",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
