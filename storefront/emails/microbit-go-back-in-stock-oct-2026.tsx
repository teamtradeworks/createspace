import { Button, Heading, Img, Section, Text } from "@react-email/components";
import { formatPrice, getProductByHandle, type ProductDetail } from "../src/lib/shopify";
import { EmailLayout } from "./components/EmailLayout";

const MICROBIT_GO_HANDLE = "bbc-micro-bit-go";
const RING_BIT_HANDLE = "elecfreaks-micro-bit-6-in-1-ring-bit-kit";
const CUTEBOT_PRO_HANDLE = "elecfreaks-micro-bit-smart-cutebot-pro";
const TINKER_KIT_HANDLE = "elecfreaks-micro-bit-tinker-kit";
const DEFAULT_BASE_URL = "https://www.thecreatespace.co.za";

export const metadata = {
  name: "BBC micro:bit Go back in stock (October 2026)",
  subject: "The BBC micro:bit Go is back in stock",
  previewText:
    "The pocket-sized computer kids code in their browser is back on our shelves, plus three kits to pair it with.",
};

type Props = {
  baseUrl: string;
  microbitGo: ProductDetail;
  ringBit: ProductDetail;
  cutebotPro: ProductDetail;
  tinkerKit: ProductDetail;
};

export async function loadProps(): Promise<Props> {
  const baseUrl = process.env.EMAIL_ASSET_BASE_URL ?? DEFAULT_BASE_URL;
  const handles = [MICROBIT_GO_HANDLE, RING_BIT_HANDLE, CUTEBOT_PRO_HANDLE, TINKER_KIT_HANDLE];
  const products = await Promise.all(handles.map((handle) => getProductByHandle(handle)));
  products.forEach((product, i) => {
    if (!product) {
      throw new Error(
        `Product "${handles[i]}" not found in Shopify. Update the handle in microbit-go-back-in-stock-oct-2026.tsx.`,
      );
    }
  });
  const [microbitGo, ringBit, cutebotPro, tinkerKit] = products as ProductDetail[];
  return { baseUrl, microbitGo, ringBit, cutebotPro, tinkerKit };
}

function priceOf(product: ProductDetail) {
  return formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode,
  );
}

type AccentTone = "blue" | "orange" | "green";

const ACCENT_BAR: Record<AccentTone, string> = {
  blue: "bg-brand-blue",
  orange: "bg-orange",
  green: "bg-brand-green",
};

type PairCardProps = {
  product: ProductDetail;
  baseUrl: string;
  ageBadge: string;
  tagline: string;
  tone: AccentTone;
};

function PairCard({ product, baseUrl, ageBadge, tagline, tone }: PairCardProps) {
  const productImage = product.images.edges[0]?.node;

  return (
    <Section className="mt-6 overflow-hidden rounded-xl border border-solid border-gray-200">
      <Section className={`${ACCENT_BAR[tone]} h-2 leading-none`}>&nbsp;</Section>
      {productImage ? (
        <Img
          src={productImage.url}
          alt={productImage.altText ?? product.title}
          width="540"
          height="360"
          className="block h-auto w-full object-cover"
        />
      ) : null}
      <Section className="px-6 py-6">
        <Text className="m-0 inline-block rounded-full bg-[#f5f6fb] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy">
          {ageBadge}
        </Text>
        <Heading as="h3" className="mb-0 mt-3 text-xl font-semibold text-navy">
          {product.title}
        </Heading>
        <Text className="mt-2 text-base leading-relaxed text-gray-700">{tagline}</Text>
        <Text className="m-0 text-xl font-semibold text-navy">{priceOf(product)}</Text>
        <Section className="mt-4">
          <Button
            href={`${baseUrl}/product/${product.handle}`}
            className="rounded-md bg-navy px-6 py-3 text-base font-semibold text-white"
          >
            View kit
          </Button>
        </Section>
      </Section>
    </Section>
  );
}

export default function MicrobitGoBackInStockOct2026({
  baseUrl,
  microbitGo,
  ringBit,
  cutebotPro,
  tinkerKit,
}: Props) {
  const microbitGoUrl = `${baseUrl}/product/${microbitGo.handle}`;

  return (
    <EmailLayout previewText={metadata.previewText} baseUrl={baseUrl} headerVariant="white">
      {/* Navy hero band */}
      <Section className="overflow-hidden rounded-2xl bg-navy px-6 py-8 text-center">
        <Text className="m-0 text-xs font-semibold uppercase tracking-widest text-brand-yellow">
          Back in stock
        </Text>
        <Heading className="mb-3 mt-3 text-4xl font-semibold leading-tight text-white">
          The BBC micro:bit Go<br />is back.
        </Heading>
        <Text className="m-0 text-base leading-relaxed text-gray-300">
          Fresh stock has landed. Order today and it ships with The Courier Guy.
        </Text>
        <Section className="mt-6">
          <Button
            href={microbitGoUrl}
            className="rounded-full bg-orange px-7 py-3 text-base font-semibold text-white"
          >
            Get yours · {priceOf(microbitGo)}
          </Button>
        </Section>
      </Section>

      {/* Lifestyle photo */}
      <Section className="mt-6 overflow-hidden rounded-2xl">
        <Img
          src={`${baseUrl}/images/products/bbc-micro-bit-go/kids-holding-microbits.jpg`}
          alt="Two children holding BBC micro:bit boards and smiling"
          width="536"
          height="350"
          className="block h-auto w-full"
        />
      </Section>

      {/* Brief description */}
      <Section className="mt-8">
        <Heading as="h2" className="m-0 text-2xl font-semibold text-navy">
          Code it, shake it, watch it light up
        </Heading>
        <Text className="mt-3 text-base leading-relaxed text-gray-700">
          The micro:bit is a pocket-sized computer with lights, sound, a motion sensor and a compass
          built in. Kids snap coding blocks together in their browser, send the code across, and
          their game or gadget comes to life in their hand. The Go pack includes the board, a USB
          cable, a battery holder and batteries, so they can start the day it arrives. Ages 8+.
        </Text>
        <Section className="mt-4">
          <Button
            href={microbitGoUrl}
            className="rounded-md bg-orange px-6 py-3 text-base font-semibold text-white"
          >
            Shop the micro:bit Go
          </Button>
        </Section>
      </Section>

      {/* Pairings intro */}
      <Section className="mt-10 rounded-2xl bg-brand-yellow px-6 py-6 text-center">
        <Heading as="h2" className="m-0 text-2xl font-semibold text-navy">
          What to pair with the BBC micro:bit Go?
        </Heading>
        <Text className="m-0 mt-2 text-base leading-relaxed text-navy">
          These ELECFREAKS kits don&apos;t come with a micro:bit, so the Go is the missing piece.
          Plug it in and their code starts driving motors, lights and sensors.
        </Text>
      </Section>

      <PairCard
        product={ringBit}
        baseUrl={baseUrl}
        ageBadge="Ages 7 to 12 · Build & code"
        tagline="Over 200 LEGO-compatible bricks, two servos and a rainbow LED strip. Build six models, from a brick car to a working trebuchet, then code them to move."
        tone="orange"
      />
      <PairCard
        product={cutebotPro}
        baseUrl={baseUrl}
        ageBadge="Ages 8 to 14 · Robotics"
        tagline="A ready-built robot car. Slot in the micro:bit and code it to follow lines, dodge obstacles and drive by Bluetooth remote control."
        tone="blue"
      />
      <PairCard
        product={tinkerKit}
        baseUrl={baseUrl}
        ageBadge="Ages 8 to 16 · Electronics"
        tagline="Plug-and-play sensors, a servo, lights and more, with 39 guided projects. Build a plant monitor, a smart light or a security door. No soldering needed."
        tone="green"
      />

      {/* Closing */}
      <Section className="mb-2 mt-8 text-center">
        <Text className="m-0 text-xs text-gray-500">
          The Ring:bit Bricks Pack, Cutebot Pro and Tinker Kit each need a micro:bit, sold
          separately. Batteries for the ELECFREAKS kits are not included.
        </Text>
      </Section>
    </EmailLayout>
  );
}

function previewProduct(handle: string, title: string, amount: string): ProductDetail {
  return {
    id: `preview-${handle}`,
    title,
    handle,
    description: "",
    descriptionHtml: "",
    vendor: "",
    productType: "",
    tags: [],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount, currencyCode: "ZAR" },
      maxVariantPrice: { amount, currencyCode: "ZAR" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "0.00", currencyCode: "ZAR" },
    },
    images: {
      edges: [
        {
          node: {
            url: `https://placehold.co/540x360/0C1446/FFFFFF/png?text=${encodeURIComponent(title)}`,
            altText: title,
          },
        },
      ],
    },
    media: { edges: [] },
    variants: { edges: [] },
    minAge: null,
    maxAge: null,
    batteriesRequired: null,
    batteriesIncluded: null,
    batteriesList: null,
    projects: null,
    guide: null,
    soldering: null,
    codingPlatform: null,
    rating: null,
    ratingCount: null,
  };
}

MicrobitGoBackInStockOct2026.PreviewProps = {
  baseUrl: DEFAULT_BASE_URL,
  microbitGo: previewProduct(MICROBIT_GO_HANDLE, "BBC micro:bit Go", "599.00"),
  ringBit: previewProduct(RING_BIT_HANDLE, "ELECFREAKS micro:bit 6-in-1 Ring:bit Bricks Pack", "899.00"),
  cutebotPro: previewProduct(CUTEBOT_PRO_HANDLE, "ELECFREAKS micro:bit Smart Cutebot Pro", "1199.00"),
  tinkerKit: previewProduct(TINKER_KIT_HANDLE, "ELECFREAKS micro:bit Tinker Kit", "999.00"),
} satisfies Props;
