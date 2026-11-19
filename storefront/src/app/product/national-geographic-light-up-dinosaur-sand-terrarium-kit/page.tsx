import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
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

const PRODUCT_HANDLE = "national-geographic-light-up-dinosaur-sand-terrarium-kit";
const IMAGE_DIR = `/images/products/${PRODUCT_HANDLE}`;

export default async function NatGeoLightUpDinosaurSandTerrariumPage() {
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
        tagline="Sculpt a prehistoric world in sand, then watch it glow."
        highlights={[
          "4 dinosaur figures, real gemstones and 2 colours of play sand that never dries out",
          "Light-up lid runs off the included USB cable, so there are no batteries to buy",
          "No soil, seeds or water: just build, decorate and switch it on",
          "Doubles as a night light once the dinosaurs are settled in",
        ]}
        addons={addons}
      />


      {/* white */}
      <VideoEmbed
        url="https://www.youtube.com/watch?v=7lDmmPd41yY"
        title="See It in Action"
        background="white"
      />

      {/* gray */}
      <FeatureGrid
        title="What Makes This Terrarium Special"
        features={[
          {
            icon: "layers",
            title: "Play Sand That Never Dries Out",
            description:
              "Green sand for grassy plains, natural sand for riverbanks and dunes. Kids press, pile and shape it into whatever landscape they like, and because it never dries out, the whole world can be scooped up and built again tomorrow.",
          },
          {
            icon: "sparkles",
            title: "Real Gemstones, Not Plastic",
            description:
              "Two pieces of rose quartz, a chunk of blue calcite and a green aventurine specimen sit among the dinosaurs. They're genuine minerals, and the Learning Guide explains what each one is.",
          },
          {
            icon: "lightbulb",
            title: "A Lid That Lights Up",
            description:
              "Plug the lid in with the USB cable and the whole scene glows. It looks great on a shelf during the day and makes a soft night light at bedtime.",
          },
          {
            icon: "eye",
            title: "Wide Open for Small Hands",
            description:
              "The big opening at the top makes it easy to reach in and move things around, and the clear sides give a panoramic view of the finished habitat.",
          },
        ]}
        columns={2}
        background="gray"
      />

      {/* white */}
      <ImageTextBlock
        image={`${IMAGE_DIR}/hand-placing-dinosaur-in-terrarium.jpg`}
        imageAlt="Hand placing a red dinosaur figure on green play sand inside the terrarium"
        title="Their World, Their Rules"
        body="First they pick one of two prehistoric scenes on the reversible backdrop. Then comes a layer of coloured pebbles, the sand on top, and the fun part: deciding where the gemstones go, where the river stone sits and which dinosaur gets the best spot. There's no right answer, and a few dinosaur stories tend to appear along the way."
        layout="image-left"
        background="white"
      />

      {/* gray */}
      <CustomerShowcase
        title="Dino Worlds in Real Homes"
        subtitle="From a pile of bags on the table to a glowing prehistoric scene"
        images={[
          {
            src: `${IMAGE_DIR}/box-unboxed.jpg`,
            alt: "National Geographic Light-Up Dinosaur Sand Terrarium Kit box opened with parts laid out",
            label: "Unboxed",
            description: "Sand, pebbles, gems and dinosaurs, all bagged and ready",
          },
          {
            src: `${IMAGE_DIR}/pieces-unpacked.jpg`,
            alt: "Bags of green and natural play sand, pebbles and dinosaur figures beside the terrarium",
            label: "Ready to Build",
            description: "Everything out of the box before the first scoop of sand",
          },
          {
            src: `${IMAGE_DIR}/dinosaur-figures-in-hand.jpg`,
            alt: "Four small dinosaur figures held in an open hand",
            label: "Meet the Dinos",
            description: "Four dinosaur figures, each waiting for a home",
          },
          {
            src: `${IMAGE_DIR}/child-placing-dinosaur-in-terrarium.jpg`,
            alt: "Child's hand placing a dinosaur figure into the sand terrarium",
            label: "Moving In",
            description: "Choosing exactly where each dinosaur lives",
          },
          {
            src: `${IMAGE_DIR}/terrarium-build-close-up.jpg`,
            alt: "Close-up of a finished terrarium with green sand, gemstones, a faux succulent and dinosaurs",
            label: "Finished Scene",
            description: "Gemstones, river stone and succulent all in place",
          },
          {
            src: `${IMAGE_DIR}/top-down-view-of-terrarium.jpg`,
            alt: "Top-down view of a terrarium sculpted with natural and green play sand",
            label: "From Above",
            description: "Paths, dunes and hiding spots shaped in the sand",
          },
          {
            src: `${IMAGE_DIR}/terrarium-lit-up-1.jpg`,
            alt: "Dinosaur sand terrarium with its light-up lid switched on, on a kitchen counter",
            label: "Lights On",
            description: "The lid lights up the whole habitat",
          },
          {
            src: `${IMAGE_DIR}/terrarium-lit-up-2.jpg`,
            alt: "Glowing dinosaur terrarium with the prehistoric backdrop behind the figures",
            label: "Glowing",
            description: "The backdrop and dinosaurs lit up from above",
          },
        ]}
        background="gray"
      />

      {/* white */}
      <ImageTextBlock
        image={`${IMAGE_DIR}/terrarium-lit-up-in-dark-room.jpg`}
        imageAlt="Dinosaur sand terrarium glowing in a dark room"
        title="A Little Dinosaur World That Glows at Bedtime"
        body="Once the building is done, the terrarium keeps going. Switch on the lid in a dark room and the dinosaurs, gems and backdrop light up from above. Next to the bed, it makes a gentle night light. And when they're ready for a new scene, flip the backdrop, reshape the sand and start again."
        layout="image-right"
        background="white"
      />

      {/* gray */}
      <ProductReviews productId={product.id} background="gray" />

      {/* white */}
      <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "What age is this best for?",
            answer:
              "The manufacturer lists it for ages 4 and up. Younger builders may want a hand opening the bags and pouring the pebbles, but arranging the sand, gems and dinosaurs is easy for small hands. It contains small parts, so it isn't suitable for children under 3.",
          },
          {
            question: "Is it messy?",
            answer:
              "Much less than a normal terrarium. There's no soil, no water and nothing to grow, and the play sand never dries out. Building on a tray or table makes cleaning up any stray sand quick.",
          },
          {
            question: "Does it need batteries?",
            answer:
              "No. The light-up lid is powered by the USB cable in the box. Plug it into a USB wall plug or a computer and it's ready to go.",
          },
          {
            question: "Can my child build it on their own?",
            answer:
              "Mostly, yes. The steps are simple: choose a backdrop, add the pebbles, shape the sand, then decorate. The instructions walk through each one. An adult might help with the USB plug and the first setup, and after that the habitat is theirs to arrange.",
          },
          {
            question: "Can it be rebuilt?",
            answer:
              "Yes. The sand doesn't dry out, so kids can scoop everything out and build a new scene whenever they like. The backdrop is reversible too, which gives them two prehistoric settings to choose from.",
          },
          {
            question: "Are the gemstones real?",
            answer:
              "They are. The kit includes blue calcite, rose quartz (two pieces) and green aventurine, plus a smooth river stone. The Learning Guide shares facts about each gemstone and about dinosaurs, so curious kids can find out what they're holding.",
          },
          {
            question: "What will my child get out of it?",
            answer:
              "A good time making something that's all theirs. Along the way they get to handle real minerals, shape a landscape with their hands, think about where animals live, and invent stories for their dinosaurs. It's a great fit for kids who are already dinosaur-mad, and it gives them a calm, hands-on project to come back to.",
          },
        ]}
        background="white"
      />

      {/* gray */}
      <WhatsIncluded
        title="What's in the Box"
        image={`${IMAGE_DIR}/whats-in-the-box.jpg`}
        imageAlt="National Geographic Light-Up Dinosaur Sand Terrarium Kit contents laid out"
        items={[
          "1 x Light-up terrarium",
          "1 x USB power cable",
          "1 x Bag of coloured pebbles",
          "2 x Bags of play sand (green and natural)",
          "1 x Blue calcite specimen",
          "2 x Rose quartz specimens",
          "1 x Green aventurine specimen",
          "1 x River stone",
          "4 x Decorative dinosaur figures",
          "1 x Faux succulent",
          "1 x Laminated reversible backdrop",
          "1 x Learning Guide and instructions",
        ]}
        showIcons={false}
        background="gray"
      />

      {/* navy */}
      <CallToAction
        title="Every Dinosaur Needs a Home"
        subtitle="Sand, gems, four dinosaurs and a lid that lights up. Everything they need to build their own prehistoric world."
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
      "Build a glowing dinosaur world with never-dry play sand, real gemstones, 4 dino figures and a USB light-up lid. No batteries, soil or water needed. Ages 4+.",
    alternates: {
      canonical: "/product/national-geographic-light-up-dinosaur-sand-terrarium-kit",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
