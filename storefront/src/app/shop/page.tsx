import {
  getCollectionProducts,
  slimProductForCard,
  SHOP_COLLECTION_HANDLE,
  SHOP_PRODUCT_LIMIT,
} from "@/lib/shopify";
import { Metadata } from "next";
import ShopGallery from "@/components/ShopGallery";
import ShopHeader from "@/components/ShopHeader";
import PromoSlot from "@/components/promo-sections/PromoSlot";
import PageViewTracker from "@/components/PageViewTracker";

export const metadata: Metadata = {
  title: "Shop | CREATESPACE",
  description:
    "Browse our curated collection of STEM educational products. Filter by age, category, or brand to find the perfect kit.",
  alternates: {
    canonical: "/shop",
  },
};

type Props = {
  searchParams: Promise<{
    age?: string;
    category?: string;
    brand?: string;
    sale?: string;
    sort?: string;
  }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const { age, category, brand, sale, sort } = await searchParams;
  // Fetch in collection default order to respect manual ordering set in Shopify admin.
  const { products: fullProducts } = await getCollectionProducts(
    SHOP_COLLECTION_HANDLE,
    SHOP_PRODUCT_LIMIT,
    "COLLECTION_DEFAULT",
  );
  // Slim to card fields before crossing to the client grid — descriptions
  // alone are a large chunk of the serialized payload. Tags stay: the
  // category filter matches on them.
  const products = fullProducts.map((product) => slimProductForCard(product, { keepTags: true }));

  return (
    <main className="min-h-screen bg-gray-50">
      <PageViewTracker event="shop_all_viewed" />

      {/* Header band. A live promo can swap in its own header
          (config/promo.ts `sections.shopHeader`). */}
      <PromoSlot slot="shopHeader">
        <ShopHeader />
      </PromoSlot>

      {/* Products with inline filters */}
      <ShopGallery
        products={products}
        initialAge={age}
        initialCategory={category}
        initialBrand={brand}
        initialSale={sale}
        initialSort={sort}
        key={`${age || "all"}-${category || "all"}-${brand || "all"}-${sale || "off"}-${sort || "featured"}`}
      />
    </main>
  );
}
