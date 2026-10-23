import { Button, Column, Heading, Img, Link, Row, Section, Text } from "@react-email/components";
import { formatPrice, getProductByHandle, type ProductDetail } from "../src/lib/shopify";
import { EmailLayout } from "./components/EmailLayout";

const BEGINNER_HANDLE = "snap-circuits-beginner";
const EXPLORER_JUNIOR_HANDLE = "snap-circuits-explorer-junior";
const MY_HOME_HANDLE = "snap-circuits-my-home";
const ARCADE_HANDLE = "snap-circuits-arcade";
const CLASSIC_300_HANDLE = "snap-circuits-classic-300";
const DEFAULT_BASE_URL = "https://www.thecreatespace.co.za";

export const metadata = {
  name: "Snap Circuits back in stock (October 2026)",
  subject: "Snap Circuits are back in stock",
  previewText:
    "All five kits are back on our shelves, from the 21-project Beginner set to the Classic 300.",
};

type Props = {
  baseUrl: string;
  beginner: ProductDetail;
  explorerJunior: ProductDetail;
  myHome: ProductDetail;
  arcade: ProductDetail;
  classic300: ProductDetail;
};

export async function loadProps(): Promise<Props> {
  const baseUrl = process.env.EMAIL_ASSET_BASE_URL ?? DEFAULT_BASE_URL;
  const handles = [
    BEGINNER_HANDLE,
    EXPLORER_JUNIOR_HANDLE,
    MY_HOME_HANDLE,
    ARCADE_HANDLE,
    CLASSIC_300_HANDLE,
  ];
  const products = await Promise.all(handles.map((handle) => getProductByHandle(handle)));
  products.forEach((product, i) => {
    if (!product) {
      throw new Error(
        `Product "${handles[i]}" not found in Shopify. Update the handle in snap-circuits-back-in-stock-oct-2026.tsx.`,
      );
    }
  });
  const [beginner, explorerJunior, myHome, arcade, classic300] = products as ProductDetail[];
  return { baseUrl, beginner, explorerJunior, myHome, arcade, classic300 };
}

function priceOf(product: ProductDetail) {
  return formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode,
  );
}

type AccentTone = "yellow" | "green" | "orange" | "blue" | "purple";

const ACCENT_BORDER: Record<AccentTone, string> = {
  yellow: "border-l-brand-yellow",
  green: "border-l-brand-green",
  orange: "border-l-orange",
  blue: "border-l-brand-blue",
  purple: "border-l-[#AC4DFF]",
};

type KitRowProps = {
  product: ProductDetail;
  baseUrl: string;
  ageBadge: string;
  tagline: string;
  tone: AccentTone;
};

function KitRow({ product, baseUrl, ageBadge, tagline, tone }: KitRowProps) {
  const productImage = product.images.edges[0]?.node;
  const productUrl = `${baseUrl}/product/${product.handle}`;

  return (
    <Section
      className={`mt-4 rounded-xl border-0 border-l-[6px] border-solid bg-[#f5f6fb] ${ACCENT_BORDER[tone]}`}
    >
      <Row>
        <Column className="w-[132px] py-4 pl-4 align-top">
          {productImage ? (
            <Link href={productUrl}>
              <Img
                src={productImage.url}
                alt={productImage.altText ?? product.title}
                width="116"
                height="116"
                className="block rounded-lg bg-white object-contain"
              />
            </Link>
          ) : null}
        </Column>
        <Column className="py-4 pl-4 pr-5 align-top">
          <Text className="m-0 text-xs font-semibold uppercase tracking-wide text-gray-500">
            {ageBadge}
          </Text>
          <Heading as="h3" className="m-0 mt-1 text-lg font-semibold leading-snug text-navy">
            <Link href={productUrl} className="text-navy no-underline">
              {product.title}
            </Link>
          </Heading>
          <Text className="m-0 mt-1 text-sm leading-relaxed text-gray-700">{tagline}</Text>
          <Text className="m-0 mt-2 text-base font-semibold text-navy">
            {priceOf(product)}
            <Link href={productUrl} className="ml-3 text-sm font-semibold text-orange underline">
              View kit
            </Link>
          </Text>
        </Column>
      </Row>
    </Section>
  );
}

export default function SnapCircuitsBackInStockOct2026({
  baseUrl,
  beginner,
  explorerJunior,
  myHome,
  arcade,
  classic300,
}: Props) {
  const shopUrl = `${baseUrl}/shop?brand=snap-circuits`;

  return (
    <EmailLayout previewText={metadata.previewText} baseUrl={baseUrl} headerVariant="white">
      {/* Navy hero band */}
      <Section className="overflow-hidden rounded-2xl bg-navy px-6 py-8 text-center">
        <Text className="m-0 text-xs font-semibold uppercase tracking-widest text-brand-yellow">
          Back in stock
        </Text>
        <Heading className="mb-3 mt-3 text-4xl font-semibold leading-tight text-white">
          Snap Circuits<br />are back.
        </Heading>
        <Text className="m-0 text-base leading-relaxed text-gray-300">
          All five kits have landed again, from the 21-project Beginner set to the Classic 300.
          Order today and The Courier Guy brings it to your door.
        </Text>
        <Section className="mt-6">
          <Button
            href={shopUrl}
            className="rounded-full bg-orange px-7 py-3 text-base font-semibold text-white"
          >
            Shop Snap Circuits
          </Button>
        </Section>
      </Section>

      {/* Lifestyle photo */}
      <Section className="mt-6 overflow-hidden rounded-2xl">
        <Img
          src={`${baseUrl}/images/products/snap-circuits-arcade/top-view-board-in-dark-with-lights-with-kids-hands.jpg`}
          alt="Children's hands on a Snap Circuits board glowing with coloured lights in the dark"
          width="536"
          height="429"
          className="block h-auto w-full"
        />
      </Section>

      {/* Brief description */}
      <Section className="mt-8">
        <Heading as="h2" className="m-0 text-2xl font-semibold text-navy">
          Real circuits that click together
        </Heading>
        <Text className="mt-3 text-base leading-relaxed text-gray-700">
          Each part is a colour-coded piece that snaps onto a plastic board, like a press stud.
          Follow the picture in the manual, flick the switch, and the fan spins, the light glows or
          the siren wails. No tools, no soldering and no loose wires, so kids can build on their
          own and see straight away how electricity gets from the battery to the bulb.
        </Text>
      </Section>

      {/* Kit picker */}
      <Section className="mt-6 rounded-2xl bg-brand-yellow px-6 py-6 text-center">
        <Heading as="h2" className="m-0 text-2xl font-semibold text-navy">
          Which kit is right for your child?
        </Heading>
        <Text className="m-0 mt-2 text-base leading-relaxed text-navy">
          Start small with the Beginner, or go big with hundreds of projects. Each one
          comes with a full-colour manual and pictures for every build.
        </Text>
      </Section>

      <KitRow
        product={beginner}
        baseUrl={baseUrl}
        ageBadge="Ages 5 to 9 · 21 projects"
        tagline="Their very first circuits. Big, easy-to-grip parts make a light, a sound and a spinning fan."
        tone="yellow"
      />
      <KitRow
        product={explorerJunior}
        baseUrl={baseUrl}
        ageBadge="Ages 8 to 12 · 101 projects"
        tagline="The classic starter set. Build a water alarm, a spinning fan and space war sound effects."
        tone="green"
      />
      <KitRow
        product={myHome}
        baseUrl={baseUrl}
        ageBadge="Ages 8 to 14 · 30+ projects"
        tagline="Build a model house, then wire up its doorbell, lights, ceiling fan and alarm."
        tone="orange"
      />
      <KitRow
        product={arcade}
        baseUrl={baseUrl}
        ageBadge="Ages 8 to 14 · 200+ projects"
        tagline="For gamers. Includes 21 mini arcade games and a word fan that spells messages in the air."
        tone="blue"
      />
      <KitRow
        product={classic300}
        baseUrl={baseUrl}
        ageBadge="Ages 8 to 14 · 305 projects"
        tagline="The big one. Over 60 parts for an AM radio, a burglar alarm, a lie detector and more."
        tone="purple"
      />

      <Section className="mt-8 text-center">
        <Button
          href={shopUrl}
          className="rounded-md bg-navy px-6 py-3 text-base font-semibold text-white"
        >
          See all Snap Circuits kits
        </Button>
      </Section>

      {/* Closing */}
      <Section className="mb-2 mt-6 text-center">
        <Text className="m-0 text-xs text-gray-500">
          AA batteries are not included with Snap Circuits kits. You can add a pack on each
          product page before checkout.
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
            url: `https://placehold.co/232x232/0C1446/FFFFFF/png?text=${encodeURIComponent(title)}`,
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

SnapCircuitsBackInStockOct2026.PreviewProps = {
  baseUrl: DEFAULT_BASE_URL,
  beginner: previewProduct(BEGINNER_HANDLE, "Snap Circuits Beginner", "850.00"),
  explorerJunior: previewProduct(EXPLORER_JUNIOR_HANDLE, "Snap Circuits Explorer Junior", "1350.00"),
  myHome: previewProduct(MY_HOME_HANDLE, "Snap Circuits My Home", "2000.00"),
  arcade: previewProduct(ARCADE_HANDLE, "Snap Circuits Arcade", "2500.00"),
  classic300: previewProduct(CLASSIC_300_HANDLE, "Snap Circuits Classic 300", "2500.00"),
} satisfies Props;
