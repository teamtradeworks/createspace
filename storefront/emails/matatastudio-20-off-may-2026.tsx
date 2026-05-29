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

type AgeBadgeTone = "blue" | "orange";

type ProductCardProps = {
  product: ProductDetail;
  baseUrl: string;
  tagline: string;
  ageBadge: string;
  badgeTone: AgeBadgeTone;
};

function ProductCard({ product, baseUrl, tagline, ageBadge, badgeTone }: ProductCardProps) {
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
  const badgeClasses =
    badgeTone === "blue"
      ? "bg-brand-blue text-navy"
      : "bg-orange text-white";
  const accentBarColor = badgeTone === "blue" ? "bg-brand-blue" : "bg-orange";

  return (
    <Section className="mt-6 overflow-hidden rounded-xl border border-solid border-gray-200">
      <Section className={`${accentBarColor} h-2 leading-none`}>&nbsp;</Section>
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
        <Text
          className={`m-0 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${badgeClasses}`}
        >
          {ageBadge}
        </Text>
        <Heading as="h2" className="mb-0 mt-3 text-2xl font-semibold text-navy">
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
            <span className="ml-2 inline-block rounded bg-brand-yellow px-2 py-1 text-xs font-semibold uppercase tracking-wide text-navy">
              Save 20%
            </span>
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

type FeatureProps = {
  baseUrl: string;
  icon: string;
  title: string;
  body: string;
};

function Feature({ baseUrl, icon, title, body }: FeatureProps) {
  return (
    <Section className="mt-4 text-center">
      <Img
        src={`${baseUrl}/images/illustrations/${icon}`}
        width="40"
        height="40"
        alt=""
        className="mx-auto"
      />
      <Heading as="h3" className="mb-1 mt-2 text-base font-semibold text-navy">
        {title}
      </Heading>
      <Text className="m-0 text-sm leading-relaxed text-gray-700">{body}</Text>
    </Section>
  );
}

export default function MatataStudio20OffMay2026({ baseUrl, taleBotPro, vinciBot }: Props) {
  return (
    <EmailLayout previewText={metadata.previewText} baseUrl={baseUrl} headerVariant="white">
      {/* Navy hero band */}
      <Section className="overflow-hidden rounded-2xl bg-navy px-6 py-8 text-center">
        <Text className="m-0 text-xs font-semibold uppercase tracking-widest text-brand-yellow">
          MatataStudio Week · 29 May – 5 June
        </Text>
        <Heading className="mb-3 mt-3 text-4xl font-semibold leading-tight text-white">
          20% off every<br />MatataStudio kit.
        </Heading>
        <Text className="m-0 text-base leading-relaxed text-gray-300">
          From storytelling robots to coding sets — one week only.
        </Text>
        <Section className="mt-6">
          <Button
            href={`${baseUrl}/shop?brand=MatataStudio`}
            className="rounded-full bg-orange px-7 py-3 text-base font-semibold text-white"
          >
            Browse the deals
          </Button>
        </Section>
      </Section>

      {/* Wide lifestyle photo */}
      <Section className="mt-6 overflow-hidden rounded-2xl">
        <Img
          src={`${baseUrl}/images/products/matatastudio-tale-bot-pro/two-girls-sitting-on-floor-playing-with-tale-bot-on-board.jpg`}
          alt="Children playing with a MatataStudio Tale-Bot Pro"
          width="536"
          height="403"
          className="block h-auto w-full"
        />
      </Section>

      {/* Yellow Save band — bold callout */}
      <Section className="mt-4 rounded-xl bg-brand-yellow px-6 py-5 text-center">
        <Text className="m-0 text-xl font-semibold uppercase tracking-wider text-navy">
          ★ Save 20% on every kit ★
        </Text>
        <Text className="m-0 mt-1 text-sm text-navy">
          Discount applied automatically at checkout. No code needed.
        </Text>
      </Section>

      {/* Section intro */}
      <Section className="mt-10 text-center">
        <Heading as="h2" className="m-0 text-2xl font-semibold text-navy">
          Meet your two new favourites
        </Heading>
        <Text className="mt-2 text-base leading-relaxed text-gray-700">
          Whether they&apos;re just starting to make up stories or already writing their first
          programs, MatataStudio has a kit waiting.
        </Text>
      </Section>

      <ProductCard
        product={taleBotPro}
        baseUrl={baseUrl}
        tagline="A storytelling robot for early learners — screen-free play that brings tales to life."
        ageBadge="Ages 3+ · Screen-free"
        badgeTone="blue"
      />
      <ProductCard
        product={vinciBot}
        baseUrl={baseUrl}
        tagline="An AI-powered coding robot that grows from block coding to Python as kids level up."
        ageBadge="Ages 6+ · Coding & AI"
        badgeTone="orange"
      />

      {/* Why MatataStudio? — yellow band */}
      <Section className="mt-10 rounded-2xl bg-brand-yellow px-6 py-6">
        <Heading as="h2" className="m-0 text-center text-xl font-semibold text-navy">
          Why parents pick MatataStudio
        </Heading>
        <Feature
          baseUrl={baseUrl}
          icon="lightbulb.png"
          title="Screen-free where it matters"
          body="Coding and creativity that don't tie kids to a tablet."
        />
        <Feature
          baseUrl={baseUrl}
          icon="code.png"
          title="Grows with the child"
          body="Same brand, deeper skills — from first patterns to real Python."
        />
        <Feature
          baseUrl={baseUrl}
          icon="atom.png"
          title="Award-winning design"
          body="Loved by families and schools across South Africa."
        />
      </Section>

      {/* Browse-all band */}
      <Section className="mt-10 overflow-hidden rounded-2xl bg-navy px-6 py-8 text-center">
        <Img
          src={`${baseUrl}/images/products/matatastudio-vincibot-coding-robot-set/child-coding-on-laptop-with-vincibot-next-to-her-on-built-pathway.png`}
          alt="Child coding with a MatataStudio VinciBot"
          width="488"
          height="319"
          className="mx-auto mb-6 block h-auto w-full max-w-full rounded-xl"
        />
        <Heading as="h2" className="m-0 text-xl font-semibold text-white">
          Plus every other MatataStudio kit
        </Heading>
        <Text className="mt-2 text-base leading-relaxed text-gray-300">
          AI Vision, Inventor &amp; Creator add-ons, the Activity Box, classroom sets — all 20%
          off.
        </Text>
        <Section className="mt-5">
          <Button
            href={`${baseUrl}/shop?brand=MatataStudio`}
            className="rounded-full bg-brand-yellow px-7 py-3 text-base font-semibold text-navy"
          >
            Browse all MatataStudio
          </Button>
        </Section>
      </Section>

      {/* Closing */}
      <Section className="mb-2 mt-8 text-center">
        <Text className="m-0 text-xs text-gray-500">
          Offer ends Friday 5 June. Prices shown reflect the 20% discount applied automatically at
          checkout.
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
