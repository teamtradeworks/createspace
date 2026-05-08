import { Button, Heading, Img, Section, Text } from "@react-email/components";
import { formatPrice, getProductByHandle, type ProductDetail } from "../src/lib/shopify";
import { EmailLayout } from "./components/EmailLayout";

const FEATURED_PRODUCT_HANDLE = "snap-circuits-classic-300";
const DEFAULT_BASE_URL = "https://www.thecreatespace.co.za";

export const metadata = {
  name: "Welcome to spring 2026",
  subject: "Spring into STEM — a kit worth a closer look",
  previewText: "We've picked one project worth your weekend, plus a few new arrivals.",
};

type Props = {
  baseUrl: string;
  product: ProductDetail;
};

export async function loadProps(): Promise<Props> {
  const baseUrl = process.env.EMAIL_ASSET_BASE_URL ?? DEFAULT_BASE_URL;
  const product = await getProductByHandle(FEATURED_PRODUCT_HANDLE);
  if (!product) {
    throw new Error(
      `Featured product "${FEATURED_PRODUCT_HANDLE}" not found in Shopify. Update FEATURED_PRODUCT_HANDLE in welcome-spring-2026.tsx.`,
    );
  }
  return { baseUrl, product };
}

export default function WelcomeSpring2026({ baseUrl, product }: Props) {
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
    <EmailLayout previewText={metadata.previewText} baseUrl={baseUrl}>
      <Section className="text-center">
        <Img
          src={`${baseUrl}/images/illustrations/robot-orange.png`}
          width="80"
          height="163"
          alt=""
          className="mx-auto"
        />
        <Heading className="mb-2 mt-4 text-3xl font-semibold leading-tight text-navy">
          Spring is for building things.
        </Heading>
        <Text className="m-0 text-base leading-relaxed text-gray-700">
          Longer days mean more time for hands-on projects. Here&apos;s one worth a closer look this
          season.
        </Text>
      </Section>

      <Section className="mt-8">
        <Text className="m-0 inline-block rounded-full bg-brand-yellow px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy">
          Featured this month
        </Text>
      </Section>

      <Section className="mt-3 overflow-hidden rounded-xl border border-solid border-gray-200">
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
          <Text className="mt-3 text-base leading-relaxed text-gray-700">
            {truncate(product.description, 220)}
          </Text>
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

      <Section className="mt-10">
        <Heading as="h2" className="m-0 text-xl font-semibold text-navy">
          Also new this season
        </Heading>
        <Text className="mt-2 text-base leading-relaxed text-gray-700">
          Fresh arrivals from Makerzoid and Elenco are landing this month, and our classroom kit
          and STEM tutor programmes are open for term bookings.
        </Text>
      </Section>

      <Section className="mb-8 mt-6 text-center">
        <Button
          href={`${baseUrl}/shop`}
          className="rounded-md border border-solid border-navy bg-white px-6 py-3 text-base font-semibold text-navy"
        >
          Browse the shop
        </Button>
      </Section>
    </EmailLayout>
  );
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

WelcomeSpring2026.PreviewProps = {
  baseUrl: DEFAULT_BASE_URL,
  product: {
    id: "preview",
    title: "Snap Circuits Classic 300",
    handle: "snap-circuits-classic-300",
    description:
      "Build over 300 electronic projects with full-colour, easy-to-follow instructions. The classic introduction to circuits — no soldering, no tools, just snap-together fun for hours.",
    descriptionHtml: "",
    vendor: "Elenco",
    productType: "",
    tags: [],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: "1499.00", currencyCode: "ZAR" },
      maxVariantPrice: { amount: "1499.00", currencyCode: "ZAR" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "1799.00", currencyCode: "ZAR" },
    },
    images: {
      edges: [
        {
          node: {
            url: "https://placehold.co/540x360/0C1446/FFFFFF/png?text=Snap+Circuits+Classic+300",
            altText: "Snap Circuits Classic 300",
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
  },
} satisfies Props;
