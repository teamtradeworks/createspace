import { Button, Heading, Img, Section, Text } from "@react-email/components";
import { formatPrice, getProductByHandle, type ProductDetail } from "../src/lib/shopify";
import { EmailLayout } from "./components/EmailLayout";

const TALE_BOT_HANDLE = "matatastudio-tale-bot-pro";
const VINCIBOT_HANDLE = "matatastudio-vincibot-coding-robot-set";
const DEFAULT_BASE_URL = "https://www.thecreatespace.co.za";

export const metadata = {
  name: "MatataStudio 20% off — May 2026",
  subject: "20% off MatataStudio — this week only",
  previewText:
    "From storytelling robots to coding sets — every MatataStudio kit, 20% off until 5 June.",
};

type Props = {
  baseUrl: string;
  taleBotPro: ProductDetail;
  vinciBot: ProductDetail;
};

export async function loadProps(): Promise<Props> {
  const baseUrl = process.env.EMAIL_ASSET_BASE_URL ?? DEFAULT_BASE_URL;
  const [taleBotPro, vinciBot] = await Promise.all([
    getProductByHandle(TALE_BOT_HANDLE),
    getProductByHandle(VINCIBOT_HANDLE),
  ]);
  if (!taleBotPro) {
    throw new Error(
      `Featured product "${TALE_BOT_HANDLE}" not found in Shopify. Update TALE_BOT_HANDLE in matatastudio-20-off-may-2026.tsx.`,
    );
  }
  if (!vinciBot) {
    throw new Error(
      `Featured product "${VINCIBOT_HANDLE}" not found in Shopify. Update VINCIBOT_HANDLE in matatastudio-20-off-may-2026.tsx.`,
    );
  }
  return { baseUrl, taleBotPro, vinciBot };
}

type ProductCardProps = {
  product: ProductDetail;
  baseUrl: string;
  tagline: string;
};

function ProductCard({ product, baseUrl, tagline }: ProductCardProps) {
  const productImage = product.images.edges[0]?.node;
  const productUrl = `${baseUrl}/product/${product.handle}`;
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode,
  );
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const compareAtPrice =
    compareAt && parseFloat(compareAt.amount) > parseFloat(product.priceRange.minVariantPrice.amount)
      ? formatPrice(compareAt.amount, compareAt.currencyCode)
      : null;

  return (
    <Section className="mt-6 overflow-hidden rounded-xl border border-solid border-gray-200">
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
        <Heading as="h2" className="m-0 text-2xl font-semibold text-navy">
          {product.title}
        </Heading>
        <Text className="mt-2 text-base leading-relaxed text-gray-700">{tagline}</Text>
        <Section className="mt-4">
          <Text className="m-0 text-2xl font-semibold text-navy">
            {price}
            {compareAtPrice ? (
              <span className="ml-2 text-base font-normal text-gray-400 line-through">
                {compareAtPrice}
              </span>
            ) : null}
          </Text>
        </Section>
        <Section className="mt-5">
          <Button
            href={productUrl}
            className="rounded-md bg-orange px-6 py-3 text-base font-semibold text-white"
          >
            View product
          </Button>
        </Section>
      </Section>
    </Section>
  );
}

export default function MatataStudio20OffMay2026({ baseUrl, taleBotPro, vinciBot }: Props) {
  return (
    <EmailLayout previewText={metadata.previewText} baseUrl={baseUrl}>
      <Section className="text-center">
        <Img
          src={`${baseUrl}/images/illustrations/robot-blue.png`}
          width="80"
          height="163"
          alt=""
          className="mx-auto"
        />
        <Heading className="mb-2 mt-4 text-3xl font-semibold leading-tight text-navy">
          20% off MatataStudio. This week only.
        </Heading>
        <Text className="m-0 text-base leading-relaxed text-gray-700">
          From first stories to first lines of code, every MatataStudio kit is 20% off until 5 June.
        </Text>
      </Section>

      <Section className="mt-6 text-center">
        <Text className="m-0 inline-block rounded-full bg-brand-yellow px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy">
          29 May – 5 June
        </Text>
      </Section>

      <ProductCard
        product={taleBotPro}
        baseUrl={baseUrl}
        tagline="Screen-free storytelling and play for ages 3+."
      />
      <ProductCard
        product={vinciBot}
        baseUrl={baseUrl}
        tagline="Coding and robotics that grow with the child, 6+."
      />

      <Section className="mt-10">
        <Heading as="h2" className="m-0 text-xl font-semibold text-navy">
          Plus every other MatataStudio kit
        </Heading>
        <Text className="mt-2 text-base leading-relaxed text-gray-700">
          AI Vision, Inventor &amp; Creator add-ons, the Activity Box, classroom sets and more — all 20% off.
        </Text>
      </Section>

      <Section className="mt-6 text-center">
        <Button
          href={`${baseUrl}/shop?brand=MatataStudio`}
          className="rounded-md border border-solid border-navy bg-white px-6 py-3 text-base font-semibold text-navy"
        >
          Browse all MatataStudio
        </Button>
      </Section>

      <Section className="mb-2 mt-8 text-center">
        <Text className="m-0 text-xs text-gray-500">
          Offer ends Friday 5 June. Discount applied automatically at checkout — no code needed.
        </Text>
      </Section>
    </EmailLayout>
  );
}

const PREVIEW_TALE_BOT: ProductDetail = {
  id: "preview-tale-bot",
  title: "MatataStudio Tale-Bot Pro",
  handle: TALE_BOT_HANDLE,
  description: "Screen-free storytelling robot for early learners.",
  descriptionHtml: "",
  vendor: "MatataStudio",
  productType: "",
  tags: [],
  availableForSale: true,
  priceRange: {
    minVariantPrice: { amount: "2399.00", currencyCode: "ZAR" },
    maxVariantPrice: { amount: "2399.00", currencyCode: "ZAR" },
  },
  compareAtPriceRange: {
    minVariantPrice: { amount: "2999.00", currencyCode: "ZAR" },
  },
  images: {
    edges: [
      {
        node: {
          url: "https://placehold.co/540x360/0C1446/FFFFFF/png?text=Tale-Bot+Pro",
          altText: "Tale-Bot Pro",
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

const PREVIEW_VINCIBOT: ProductDetail = {
  id: "preview-vincibot",
  title: "MatataStudio VinciBot Coding Robot Set",
  handle: VINCIBOT_HANDLE,
  description: "Coding and robotics that grow with the child.",
  descriptionHtml: "",
  vendor: "MatataStudio",
  productType: "",
  tags: [],
  availableForSale: true,
  priceRange: {
    minVariantPrice: { amount: "3599.00", currencyCode: "ZAR" },
    maxVariantPrice: { amount: "3599.00", currencyCode: "ZAR" },
  },
  compareAtPriceRange: {
    minVariantPrice: { amount: "4499.00", currencyCode: "ZAR" },
  },
  images: {
    edges: [
      {
        node: {
          url: "https://placehold.co/540x360/0C1446/FFFFFF/png?text=VinciBot",
          altText: "VinciBot",
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

MatataStudio20OffMay2026.PreviewProps = {
  baseUrl: DEFAULT_BASE_URL,
  taleBotPro: PREVIEW_TALE_BOT,
  vinciBot: PREVIEW_VINCIBOT,
} satisfies Props;
