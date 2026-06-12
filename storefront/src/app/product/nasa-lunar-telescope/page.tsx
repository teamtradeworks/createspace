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
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "nasa-lunar-telescope";

export default async function NasaLunarTelescopePage() {
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
        tagline="Discover craters, mountains, and volcanic plains."
        highlights={[
          "90x magnification — lunar craters and ridges in remarkable detail",
          "Complete kit: telescope, two eyepieces, tripod, and full-colour learning guide",
          "Ages 8+ · No batteries, no apps, sets up in minutes",
          "Official NASA-licensed telescope by Blue Marble",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=BqZvG4j7gi8"
        title="NASA Lunar Telescope for Kids"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes This Special"
        columns={2}
        background="gray"
        features={[
          {
            icon: "eye",
            title: "A Front-Row Seat to the Moon",
            description:
              "First you use the finder scope to locate the moon. Then you switch to the high-power eyepiece and zoom in. The craters, ridges, dark maria, and mountain shadows waiting there are nothing like what you see with the naked eye — and completely impossible to unsee.",
          },
          {
            icon: "time",
            title: "Up and Running in Minutes",
            description:
              "The tabletop tripod clicks into place, the eyepiece drops in, and you're ready to point it at the sky. No tools, no complicated assembly — just open the box, follow the quick-start, and go. Even kids who've never used a telescope before are up and running on their own within minutes.",
          },
          {
            icon: "book",
            title: "The Moon, Decoded",
            description:
              "The included full-colour learning guide names and explains what you're actually looking at through the eyepiece — craters, maria, mountain ranges, volcanic plains. It turns a beautiful view into something you can identify, compare across nights, and talk about.",
          },
          {
            icon: "rocket",
            title: "NASA-Licensed, Award-Winning",
            description:
              "Made by Blue Marble — winner of the Toy Association's Toy of the Year Award — and officially licensed by NASA. Not a toy that looks like a telescope. A telescope that's designed to be used by children.",
          },
        ]}
      />

      {/* white */}
      <ImageTextBlock
        image="/images/products/nasa-lunar-telescope/lifestyle-child-looking-through-telescope.jpg"
        imageAlt="Child looking through the NASA Lunar Telescope"
        title="The Moon Up Close"
        body="Through the low-power eyepiece, the full moon fills the view — bright, round, familiar. Switch to high-power and zoom in on the terminator line where sunlight meets shadow, and suddenly you're looking at something else entirely: crater walls casting sharp shadows, ridges cutting across volcanic plains, mountain ranges rising from an ancient surface. Kids who see this tend to come back for another look. And another."
        layout="image-right"
        background="white"
      />

      {/* white */}
      <CustomerShowcase
        title="Astronomer's-Eye View"
        subtitle="What it looks like when you look through the eyepiece — and who's doing the looking"
        background="white"
        images={[
          {
            src: "/images/products/nasa-lunar-telescope/end-user-child-looking-through-telescope.jpg",
            alt: "Child looking through the NASA Lunar Telescope",
            label: "First Look",
            description: "The moment a lunar crater comes into focus for the very first time",
          },
          {
            src: "/images/products/nasa-lunar-telescope/end-user-close-up-of-moon.jpg",
            alt: "Close-up view of the moon's surface through the telescope",
            label: "Moon Surface",
            description:
              "Craters, ridges, and volcanic plains visible through the high-power eyepiece",
          },
          {
            src: "/images/products/nasa-lunar-telescope/end-user-girl-looking-through-scope.jpg",
            alt: "Girl independently using the NASA Lunar Telescope",
            label: "Young Astronomer",
            description: "Set up solo and exploring the night sky on her own",
          },
          {
            src: "/images/products/nasa-lunar-telescope/end-user-scope-set-up.jpg",
            alt: "NASA Lunar Telescope set up and ready for use",
            label: "Ready to Go",
            description: "Telescope on the tabletop tripod, eyepiece in, pointed at the sky",
          },
          {
            src: "/images/products/nasa-lunar-telescope/end-user-small-boy-looking-through.jpg",
            alt: "Small boy looking through the NASA Lunar Telescope",
            label: "Stargazing",
            description: "A clear night and a young astronomer — all that's needed",
          },
          {
            src: "/images/products/nasa-lunar-telescope/end-user-moon-view.jpg",
            alt: "Moon viewed through the telescope eyepiece",
            label: "In Focus",
            description: "Lunar surface detail through the eyepiece",
          },
          {
            src: "/images/products/nasa-lunar-telescope/end-user-telescope-set-up-on-counter.jpg",
            alt: "NASA Lunar Telescope set up on a counter indoors",
            label: "Indoor Setup",
            description: "The complete kit ready for an evening observation session",
          },
          {
            src: "/images/products/nasa-lunar-telescope/end-user-moon-view-further-away.jpg",
            alt: "Full moon viewed at lower magnification through the telescope",
            label: "Full Moon",
            description: "The moon at lower magnification — wide and bright",
          },
        ]}
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
              "The telescope is designed for ages 8 and up. Confident 8-year-olds can set it up and use it independently — the assembly is straightforward and the learning guide is child-friendly. Children aged 6–7 can absolutely use it with a little adult help for the initial setup and focus adjustment. Note that the tripod legs are fairly short, so younger children may need a stool or to use it at floor level.",
          },
          {
            question: "Is it easy enough for a child to set up themselves?",
            answer:
              "Yes — the assembly is deliberately simple. Attach the tripod, insert the eyepiece, and you're done. No tools required. The finder scope is pre-aligned from the factory, so most children can go from unboxed to viewing in under five minutes. The learning guide includes setup instructions written for young astronomers.",
          },
          {
            question: "What will my child actually be able to see?",
            answer:
              "The moon is the main event — and the views are genuinely impressive. At 90x magnification, children can identify individual craters, ridges, mountain ranges, and the dark flat plains called maria (the Sea of Tranquility, where Apollo 11 landed, is clearly visible). They may also be able to see bright planets like Venus, Jupiter, and Mars on a clear night, though this telescope is primarily built for lunar observation.",
          },
          {
            question: "Does it need batteries, an app, or a computer?",
            answer:
              "Nothing else at all. This is a purely optical instrument — no power source, no Bluetooth, no downloads. Just light through a glass lens. That's also what makes it so immediate and satisfying to use: point it at the sky, adjust the focus, and see.",
          },
          {
            question: "Can it be used indoors through a window?",
            answer:
              "Yes — on a clear night, the telescope works perfectly well through an open window or from a balcony. Note that the glass in most windows will reduce image quality slightly, so an open window or outdoor use gives the clearest views. The tabletop tripod makes it easy to set up on a windowsill or table.",
          },
          {
            question: "What's actually in the learning guide?",
            answer:
              "The included full-colour guide covers the features visible on the lunar surface — named craters, the maria, mountain ranges, and what formed them. It gives children the vocabulary to describe what they're seeing and the context to understand it. Think of it as a field guide to the moon: practical enough to use alongside the telescope, interesting enough to read on its own.",
          },
          {
            question: "Is this only useful for the moon?",
            answer:
              "The NASA Lunar Telescope is designed primarily for lunar observation, and the moon is what it does best. With a 25mm objective lens and 90x magnification, it's well-suited for bright, nearby targets. On a clear night, children can also observe bright planets — Venus shows phases, Jupiter shows cloud bands, Mars shows its reddish colour — though faint deep-sky objects like nebulae or distant galaxies are beyond its reach. For a beginner's first telescope, the moon is more than enough to spark a lasting interest.",
          },
        ]}
      />

      {/* gray */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/nasa-lunar-telescope/kit-with-parts.jpg"
        imageAlt="NASA Lunar Telescope kit showing telescope, tripod, eyepieces, finder scope, and learning guide"
        background="gray"
        items={[
          "Lunar Telescope",
          "Tabletop Tripod",
          "Low-Power Eyepiece (wide-angle viewing)",
          "High-Power Eyepiece (up to 90x magnification)",
          "Finder Scope",
          "Lens Dust Cap",
          "Full-Colour Learning Guide with Instructions",
        ]}
      />

      {/* white */}
      <Specifications
        title="Specifications"
        background="white"
        specs={[
          { label: "Maximum Magnification", value: "90x" },
          { label: "Objective Lens Diameter", value: "25mm" },
          { label: "Eyepieces", value: "2 (low-power and high-power)" },
          { label: "Mount", value: "Tabletop tripod" },
          { label: "Focus", value: "Manual" },
          { label: "Weight", value: "Approx. 1 kg (2.27 lbs)" },
          { label: "Power", value: "None required" },
          { label: "Recommended Age", value: "8 and up" },
          { label: "Brand", value: "Blue Marble (NASA-licensed)" },
        ]}
      />

      {/* navy */}
      <CallToAction
        title="The Moon Is Waiting."
        subtitle="All you need is a clear night and somewhere to point it."
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
      "See real craters on the Moon with 90x magnification. NASA-licensed telescope for kids ages 8+. Includes two eyepieces, tripod, finder scope, and full-colour learning guide.",
    alternates: {
      canonical: "/product/nasa-lunar-telescope",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
