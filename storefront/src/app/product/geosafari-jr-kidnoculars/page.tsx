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

const PRODUCT_HANDLE = "geosafari-jr-kidnoculars";

export default async function GeoSafariJrKidnocularsPage() {
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
        tagline="Birds, treetops and the whole backyard, twice as close."
        highlights={[
          "2x magnification with no focus knob, so there's nothing to adjust",
          "Extra-large goggle eyepieces that are easy for little ones to look through",
          "Ages 3+ · No batteries, no screens, ready to use out of the box",
          "Breakaway neck strap for safe, easy carrying",
        ]}
        addons={addons}
      />

      {/* gray (fixed) */}
      <QuickInfoBadges product={product} />

      {/* white */}
      <FeatureGrid
        title="Binoculars Made for Little Kids"
        columns={2}
        background="white"
        features={[
          {
            icon: "touch",
            title: "Big Eyepieces, Easy Viewing",
            description:
              "Regular binoculars expect you to line your eyes up with two tiny holes. Kidnoculars have eyepieces more than three times bigger, shaped like goggles with a placement guide. Your child presses them to their face and they're looking, without squinting or fiddling.",
          },
          {
            icon: "octagon-check",
            title: "Focus-Free Means Frustration-Free",
            description:
              "The 2x magnification is fixed, so there's no wheel to turn and no blurry first attempt. Hand them over and your child gets a closer view right away. It makes them easy for toddlers and preschoolers to enjoy.",
          },
          {
            icon: "shield",
            title: "Tough Enough for Toddlers",
            description:
              "The chunky plastic body is built kid-tough for garden and park adventures. The breakaway neck strap comes apart if it gets pulled hard, then clips straight back together.",
          },
          {
            icon: "sun",
            title: "A Reason to Head Outside",
            description:
              "Bird watching in the backyard, trips to the park or playground, camping and stargazing. With no batteries to charge and nothing to download, they're always ready to go in the bag.",
          },
        ]}
      />

      {/* gray */}
      <ImageTextBlock
        image="/images/products/geosafari-jr-kidnoculars/lifestyle-boy-laughing-with-kidnoculars.jpg"
        imageAlt="Laughing boy holding GeoSafari Jr. Kidnoculars up to his eyes outdoors"
        title="Every Garden Becomes a Safari"
        body="Give a three-year-old a pair of Kidnoculars and the backyard turns into somewhere to explore. The bird on the fence gets a closer look. So does the dog next door, and the very top of the tallest tree. Because there's nothing to focus, they're straight into it, pointing things out and asking what everything is. Lots of reviewers say their kids reach for them every day."
        layout="image-right"
        background="gray"
      />

      {/* white */}
      <CustomerShowcase
        title="Little Explorers in Action"
        subtitle="Kidnoculars out in the garden, on the rocks and around the house"
        background="white"
        images={[
          {
            src: "/images/products/geosafari-jr-kidnoculars/end-user-boy-looking-through-kidnoculars.jpg",
            alt: "Toddler looking through Kidnoculars across a garden patio",
            label: "Backyard Lookout",
            description: "Scanning the garden for anything that moves",
          },
          {
            src: "/images/products/geosafari-jr-kidnoculars/end-user-boy-smiling-looking-at-camera-through-kidnoculars.jpg",
            alt: "Smiling boy looking at the camera through Kidnoculars indoors",
            label: "Got You!",
            description: "Big goggle eyepieces make it easy to see",
          },
          {
            src: "/images/products/geosafari-jr-kidnoculars/end-user-boy-in-nature-with-kidnoculars.jpg",
            alt: "Young boy exploring rocks outdoors with Kidnoculars around his neck",
            label: "On the Trail",
            description: "Strap on, hands free for climbing and exploring",
          },
          {
            src: "/images/products/geosafari-jr-kidnoculars/end-user-child-holding-kidnoculars.jpg",
            alt: "Child holding a pair of Kidnoculars on their lap",
            label: "Kid-Sized",
            description: "Chunky and easy for small hands to hold",
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
            question: "What age are Kidnoculars best for?",
            answer:
              "They're made for ages 3 and up, and Educational Insights recommends them for roughly 3 to 7. The sweet spot is 3 to 5, when the big eyepieces and no-focus design make the biggest difference. Older kids who want more power may find the 2x magnification a bit gentle. They aren't suitable for children under 3 because of small parts.",
          },
          {
            question: "How strong is the magnification?",
            answer:
              "Kidnoculars magnify 2x, so things look about twice as close. That's deliberately gentle. It's easy for small children to use and gives them a clear, closer view without any adjusting. If you're expecting adult birding binoculars, these aren't that. They're a first pair for little explorers.",
          },
          {
            question: "Why isn't there a focus wheel?",
            answer:
              "Focus wheels are tricky for young children, and a blurry first look is often where they give up. Kidnoculars are focus-free, so your child just lifts them up and looks. There's nothing to adjust.",
          },
          {
            question: "Do they need batteries?",
            answer:
              "No. There are no batteries, no screens and no apps. Take them out of the box, pop the strap over your child's head and go.",
          },
          {
            question: "The strap keeps coming apart. Is it broken?",
            answer:
              "No, that's on purpose. It's a breakaway neck strap, designed to come apart if it gets pulled or caught, which keeps little necks safe. Just clip it back together and carry on exploring.",
          },
          {
            question: "Can they get wet?",
            answer:
              "Kidnoculars aren't water resistant, so keep them out of the pool and the rain. If they get splashed, wipe them dry.",
          },
          {
            question: "What will my child actually do with them?",
            answer:
              "Spot birds in the backyard, take them to the park or playground, pack them for camping and look up at the night sky. Mostly, they'll start noticing things they'd usually walk straight past, and asking questions about them. That habit of looking closely and asking why is where science begins.",
          },
        ]}
      />

      {/* gray */}
      <WhatsIncluded
        title="What's in the Box"
        image="/images/products/geosafari-jr-kidnoculars/whats-in-the-box.jpg"
        imageAlt="GeoSafari Jr. Kidnoculars next to their retail box"
        background="gray"
        items={[
          "GeoSafari Jr. Kidnoculars with extra-large goggle eyepieces",
          "Breakaway neck strap",
        ]}
      />

      {/* white */}
      <Specifications
        title="Specifications"
        background="white"
        specs={[
          { label: "Magnification", value: "2x (fixed)" },
          { label: "Focus", value: "Focus-free, no adjustment needed" },
          { label: "Eyepieces", value: "Extra-large, goggle-style with placement guide" },
          { label: "Strap", value: "Breakaway neck strap" },
          { label: "Material", value: "Plastic" },
          { label: "Dimensions", value: "Approx. 12 x 14.6 x 7 cm" },
          { label: "Weight", value: "Approx. 200 g" },
          { label: "Water Resistance", value: "Not water resistant" },
          { label: "Power", value: "None required" },
          { label: "Recommended Age", value: "3 and up" },
          { label: "Brand", value: "Educational Insights (GeoSafari Jr.)" },
        ]}
      />

      {/* navy */}
      <CallToAction
        title="Ready, Set, Explore"
        subtitle="Strap them on, head outside and see what turns up."
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
      "Focus-free 2x binoculars made for little kids, with extra-large goggle eyepieces, a breakaway strap and no batteries. For curious explorers aged 3+.",
    alternates: {
      canonical: "/product/geosafari-jr-kidnoculars",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
