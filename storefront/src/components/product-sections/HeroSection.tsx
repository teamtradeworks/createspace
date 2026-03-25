import Link from "next/link";
import {
  ProductDetail,
  formatPrice,
  getProductRating,
  getStockStatus,
  isDigitalProduct,
} from "@/lib/shopify";
import siteConfig from "@/config/site.json";
import ProductGallery from "@/components/ProductGallery";
import ProductActions from "@/components/ProductActions";
import ProductViewTracker from "@/components/ProductViewTracker";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import { DELIVERY_CONFIG } from "@/config/delivery";
import { SerializedAddon } from "@/lib/product-addons";
import { StarRating } from "@/components/StarRating";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import SectionTracker from "./SectionTracker";

interface HeroSectionProps {
  product: ProductDetail;
  tagline?: string;
  highlights?: string[];
  heroImage?: string;
  addons?: SerializedAddon[];
  defaultSelectedAddons?: string[];
  canonicalPath?: string;
  digital?: boolean;
}

export function HeroSection({
  product,
  tagline,
  highlights,
  heroImage,
  addons,
  defaultSelectedAddons,
  canonicalPath,
  digital,
}: HeroSectionProps) {
  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount =
    compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  const ratingData = getProductRating(product.rating, product.ratingCount);
  const stockStatus = getStockStatus(product);
  const isDigital = digital ?? isDigitalProduct(product);

  const images = product.images.edges.map((edge) => ({
    url: edge.node.url,
    altText: edge.node.altText || product.title,
  }));

  // If a custom hero image is provided, prepend it to the gallery
  const galleryImages = heroImage
    ? [{ url: heroImage, altText: product.title }, ...images]
    : images;

  return (
    <SectionTracker name="HeroSection">
      <>
        <ProductViewTracker
          handle={product.handle}
          title={product.title}
          sku={product.variants.edges[0]?.node.sku || undefined}
          price={parseFloat(price.amount)}
          currencyCode={price.currencyCode}
          vendor={product.vendor || undefined}
        />
        <ScrollDepthTracker event="product_page_scroll_depth" />

        {/* Breadcrumb */}
        <BreadcrumbJsonLd
          items={[
            { name: "Home", href: "/" },
            { name: "Shop", href: "/shop" },
            { name: product.title, href: canonicalPath || `/product/${product.handle}` },
          ]}
        />
        <div className="bg-gray-50 border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex text-sm text-gray-500 min-w-0">
              <Link href="/" className="hover:text-cs-orange flex-shrink-0">
                Home
              </Link>
              <span className="mx-2 flex-shrink-0">/</span>
              <Link href="/shop" className="hover:text-cs-orange flex-shrink-0">
                Shop
              </Link>
              <span className="mx-2 flex-shrink-0">/</span>
              <span className="text-navy font-medium truncate">{product.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 lg:py-12 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left - Image Gallery */}
              <div className="min-w-0">
                <ProductGallery images={galleryImages} title={product.title} />
              </div>

              {/* Right - Product Info */}
              <div className="flex flex-col min-w-0">
                {/* Brand */}
                {product.vendor && (
                  <p className="text-sm text-gray-500 mb-2">
                    Brand: <span className="text-cs-orange font-medium">{product.vendor}</span>
                  </p>
                )}

                {/* Title */}
                <h1 className="text-3xl lg:text-4xl font-semibold text-navy mb-2">
                  {product.title}
                </h1>

                {/* Rating */}
                {ratingData && (
                  <a href="#reviews" className="flex items-center gap-2 mb-2 group w-fit">
                    <StarRating rating={ratingData.average} size="md" />
                    <span className="text-sm text-gray-500 group-hover:text-cs-orange transition-colors">
                      {ratingData.average.toFixed(1)} ({ratingData.count}{" "}
                      {ratingData.count === 1 ? "review" : "reviews"})
                    </span>
                  </a>
                )}

                {/* Tagline */}
                {tagline && <p className="text-lg text-gray-600 mb-4">{tagline}</p>}

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold text-navy">
                    {formatPrice(price.amount, price.currencyCode)}
                  </span>
                  {hasDiscount && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
                    </span>
                  )}
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm ${
                      stockStatus === "out-of-stock" && !isDigital
                        ? "text-cs-red"
                        : isDigital || stockStatus === "in-stock"
                          ? "text-cs-green"
                          : "text-cs-orange"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        stockStatus === "out-of-stock" && !isDigital
                          ? "bg-cs-red"
                          : isDigital || stockStatus === "in-stock"
                            ? "bg-cs-green"
                            : "bg-cs-orange"
                      }`}
                    />
                    {isDigital
                      ? "Available Now"
                      : stockStatus === "in-stock"
                        ? "In Stock"
                        : stockStatus === "lead-time"
                          ? `Delivery in ${siteConfig.leadTime.estimatedDays}`
                          : "Out of Stock"}
                  </span>
                </div>

                {/* Key Highlights */}
                {highlights && highlights.length > 0 && (
                  <ul className="mb-6 space-y-2">
                    {highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <svg
                          className="w-5 h-5 text-cs-green flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tags */}
                {product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.tags.slice(0, 6).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-semibold bg-navy/10 text-navy rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Delivery & Benefits */}
                <div className="border-t border-b py-4 mb-6 space-y-3">
                  {!isDigital && (
                    <div className="flex items-center gap-3 text-sm">
                      <svg
                        className="w-5 h-5 text-cs-orange"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>
                      <span>
                        <strong>
                          {stockStatus === "lead-time"
                            ? `${siteConfig.leadTime.estimatedDays} delivery`
                            : "1-3 days delivery"}
                        </strong>{" "}
                        with The Courier Guy
                      </span>
                    </div>
                  )}
                  {!isDigital && (
                    <div className="flex items-center gap-3 text-sm">
                      <svg
                        className="w-5 h-5 text-cs-orange"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                        />
                      </svg>
                      <span>
                        <strong>FREE delivery</strong> on orders over R
                        {DELIVERY_CONFIG.freeDeliveryThreshold.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <svg
                      className="w-5 h-5 text-cs-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    <span>
                      <strong>Safe and secure payments</strong> with multiple options
                    </span>
                  </div>
                </div>

                {/* Add to Cart Actions */}
                <div id="product-actions">
                  <ProductActions
                    productId={product.id}
                    variantId={product.variants.edges[0]?.node.id}
                    available={product.availableForSale}
                    currentlyNotInStock={product.variants.edges[0]?.node.currentlyNotInStock}
                    title={product.title}
                    price={parseFloat(price.amount)}
                    currencyCode={price.currencyCode}
                    image={images[0]?.url}
                    handle={product.handle}
                    digital={isDigital}
                    addons={addons}
                    defaultSelectedAddons={defaultSelectedAddons}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </SectionTracker>
  );
}
