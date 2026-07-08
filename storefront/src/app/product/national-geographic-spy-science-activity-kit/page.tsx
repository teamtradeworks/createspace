import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  VideoEmbed,
  FeatureGrid,
  ProjectShowcase,
  ProductFAQ,
  WhatsIncluded,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "national-geographic-spy-science-activity-kit";

export default async function NatGeoSpyScienceKitPage() {
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
        tagline="Crack codes, write invisible messages, and spy around corners, 10 secret missions await"
        highlights={[
          "10 guided spy missions, sealed in a real mission envelope",
          "Real gadgets: UV light, invisible ink pen, periscope & decoder wheels",
          "Ages 8–12 · screen-free · no coding or tools needed",
          "National Geographic quality, real science behind every gadget",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=zyKkC0V-aeU"
        title="See the Kit in Action"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes This Kit Special"
        features={[
          {
            icon: "eye",
            title: "Real Gadgets That Actually Work",
            description:
              "The periscope sees around corners. The UV light reveals hidden ink. The decoder wheels crack actual ciphers. These aren't toy imitations, they're functional tools modelled on real spycraft equipment.",
          },
          {
            icon: "lightbulb",
            title: "The Science Behind the Secrets",
            description:
              "UV fluorescence, mirror optics, substitution ciphers, every gadget is grounded in real science. The guidebook explains the how and the why, including the history of spying from ancient times to today.",
          },
          {
            icon: "book",
            title: "National Geographic Quality",
            description:
              "NatGeo's curiosity-first approach runs through everything, from the quality of the gadgets to the depth of the guidebook. It's the trusted exploration brand, applied to your child's backyard.",
          },
          {
            icon: "puzzle",
            title: "10 Missions, Hours of Play",
            description:
              "Each mission takes 10–30 minutes of screen-free, independent fun. Once the last mission is done, the blank decoder wheel and spy notebook keep the adventure going, children invent new codes and recruit friends.",
          },
        ]}
        columns={2}
        background="gray"
      />

      {/* white */}
      <ProjectShowcase
        title="10 Secret Missions"
        highlight="10 guided spy missions, sealed inside a real mission envelope"
        subtitle="Open the envelope and begin. Each mission puts a different gadget to work, cracking codes, gathering intel, writing messages only a UV light can reveal."
        projects={[
          {
            name: "Gather and Analyse Intel",
            description:
              "Use your spy notebook to observe and document surroundings, nature, animals, and everyday objects become your first surveillance targets.",
            concepts: "Observation, data collection, note-taking",
          },
          {
            name: "Create Your Secret Identity",
            description:
              "Design your spy persona using stickers and the official badge, invent a name, a cover story, and a disguise worthy of an elite agent.",
            concepts: "Creative thinking, narrative development",
          },
          {
            name: "Decode a Secret Message",
            description:
              "The mission envelope contains an encrypted message. Use the pre-filled decoder wheel to translate it, and discover your first assignment.",
            concepts: "Substitution ciphers, logical reasoning",
          },
          {
            name: "Build a Custom Decoder Wheel",
            description:
              "Use the blank decoder wheel to create an original cipher, then encode a message for another agent to crack. Your code, your rules.",
            concepts: "Cipher design, pattern making, cryptography",
          },
          {
            name: "Write and Reveal an Invisible Message",
            description:
              "Write a hidden message with the invisible ink pen, invisible to the naked eye, then watch it reappear under UV light.",
            concepts: "UV light, fluorescence, light science",
          },
        ]}
        moreText="Plus 5 more missions inside the envelope, including periscope surveillance, rearview observation, and spycraft history challenges"
        columns={3}
        background="white"
      />

      {/* gray */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "What age is this best for?",
            answer:
              "The kit is designed for ages 8–12. Children aged 8–9 may enjoy having a parent join for their first mission or two, while children 10 and up can typically work through all 10 missions independently. The missions are engaging enough that older siblings often get drawn in too.",
          },
          {
            question: "Can my child do this on their own?",
            answer:
              "Yes, the missions are designed for independent play. The mission envelope and guidebook provide clear, step-by-step instructions for each mission. There's no setup required from a parent beyond handing over the kit.",
          },
          {
            question: "How long does each mission take?",
            answer:
              "Each mission takes roughly 10–30 minutes depending on your child's pace. The full kit provides 3–6 hours of guided activity across all 10 missions. Beyond that, the blank decoder wheel and spy notebook support open-ended play that extends well past the last mission.",
          },
          {
            question: "Is the invisible ink safe?",
            answer:
              "Yes. The pen uses UV-reactive ink, non-toxic and safe for children. The UV light is a small, low-power torch, safe for normal use, but avoid shining it directly into eyes.",
          },
          {
            question: "Can the missions be repeated or replayed?",
            answer:
              "The spy gadgets are all reusable. The blank decoder wheel in particular invites children to invent new ciphers and run code-breaking challenges with friends or siblings. The ink pen has a limited supply like any pen, but everything else lasts indefinitely.",
          },
          {
            question: "What will my child actually get out of this?",
            answer:
              "Beyond the fun, the missions naturally build observation skills, logical thinking, and patience. Code-breaking requires systematic reasoning. Intel-gathering trains attention to detail. Most parents notice their children becoming more curious about how things work, and more confident tackling problems independently.",
          },
        ]}
        background="gray"
      />

      {/* white */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/national-geographic-spy-science-activity-kit/whats-in-the-box.jpg"
        imageAlt="National Geographic Spy Science Activity Kit contents laid out"
        items={[
          "2 decoder wheels (1 pre-filled cipher, 1 blank for custom codes)",
          "Periscope (see around corners without being spotted)",
          "Rearview spy glasses (mirrored lenses let you see behind you)",
          "Invisible ink pen (UV-reactive ink invisible to the naked eye)",
          "UV light (reveals hidden messages instantly)",
          "Secret mission notebook",
          "2 sticker sheets (spy identity and mission tracking)",
          "Official spy badge",
          "Mission envelope with 10 missions and spy science information",
          "Mission guidebook with step-by-step instructions and spycraft history",
        ]}
        background="white"
      />

      {/* navy */}
      <CallToAction
        title="Accept the Mission"
        subtitle="10 guided spy missions, real working gadgets, and the science behind the secrets, no screens, no coding, just adventure."
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
      "Complete 10 guided spy missions with real gadgets, UV light, invisible ink, periscope & decoder wheels. National Geographic quality for ages 8–12. No screens needed.",
    alternates: {
      canonical: "/product/national-geographic-spy-science-activity-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
