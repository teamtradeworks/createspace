import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCollectionProducts,
  slimProductForCard,
  SHOP_COLLECTION_HANDLE,
  SHOP_PRODUCT_LIMIT,
} from "@/lib/shopify";
import { BLACK_FRIDAY, isPromoActive } from "@/config/promo";
import { BLACK_FRIDAY_HANDLES } from "@/config/black-friday";
import PageHeader from "@/components/PageHeader";
import PageViewTracker from "@/components/PageViewTracker";
import ShopGallery from "@/components/ShopGallery";

// Gated here too, so outside the sale the 404 carries no sale title.
export async function generateMetadata(): Promise<Metadata> {
  if (!isPromoActive(BLACK_FRIDAY, new Date())) notFound();
  return {
    title: "Black Friday Sale | CREATESPACE",
    description:
      "Black Friday deals on STEM kits: up to 20% off coding robots, Snap Circuits, science kits and more. Sale ends 30 November.",
    alternates: {
      canonical: "/black-friday",
    },
  };
}

type Props = {
  searchParams: Promise<{
    age?: string;
    category?: string;
    brand?: string;
    sort?: string;
  }>;
};

export default async function BlackFridayPage({ searchParams }: Props) {
  // Read the filters before the date check: it keeps the page rendering per
  // request, so it opens and closes on the exact minute. (Checked first, an
  // out-of-sale build would prerender a static 404 that fails to revalidate.)
  const { age, category, brand, sort } = await searchParams;
  if (!isPromoActive(BLACK_FRIDAY, new Date())) notFound();
  const { products: shopProducts } = await getCollectionProducts(
    SHOP_COLLECTION_HANDLE,
    SHOP_PRODUCT_LIMIT,
  );
  // Kept in the shop collection's order, so the default "Most loved" sort
  // matches the shop page. Tags stay: the category filter matches on them.
  const saleHandles = new Set(BLACK_FRIDAY_HANDLES);
  const products = shopProducts
    .filter((product) => saleHandles.has(product.handle))
    .map((product) => slimProductForCard(product, { keepTags: true }));

  return (
    <main className="min-h-screen bg-gray-50">
      <PageViewTracker event="black_friday_viewed" />

      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Black Friday Sale" }]}
        title={
          <>
            Black Friday: <span className="text-cs-yellow">up to 20% off</span>
          </>
        }
        subtitle="Coding robots, circuits, telescopes and science kits, all on sale until 30 November."
      />

      <ShopGallery
        products={products}
        initialAge={age}
        initialCategory={category}
        initialBrand={brand}
        initialSort={sort}
        hideSaleFilter
        source="black_friday"
        key={`${age || "all"}-${category || "all"}-${brand || "all"}-${sort || "featured"}`}
      />
    </main>
  );
}
