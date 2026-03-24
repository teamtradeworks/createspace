import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductByHandle, formatPrice, getProductRating, getStockStatus } from "@/lib/shopify";
import siteConfig from "@/config/site.json";
import { StarRating } from "@/components/StarRating";
import ProductGallery from "@/components/ProductGallery";
import ProductActions from "@/components/ProductActions";
import ProductJsonLd from "@/components/ProductJsonLd";
import ProductViewTracker from "@/components/ProductViewTracker";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import { DELIVERY_CONFIG } from "@/config/delivery";
import { ProductReviews, ProductTrackingProvider } from "@/components/product-sections";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount =
    compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
  const ratingData = getProductRating(product.rating, product.ratingCount);
  const stockStatus = getStockStatus(product);

  // Extract images
  const images = product.images.edges.map((edge) => ({
    url: edge.node.url,
    altText: edge.node.altText || product.title,
  }));

  return (
    <ProductTrackingProvider handle={handle}>
      <ProductJsonLd product={product} />
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
      <div className="bg-gray-50 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-cs-orange">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-cs-orange">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-navy font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Hero Section */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Image Gallery */}
            <ProductGallery images={images} title={product.title} />

            {/* Right - Product Info */}
            <div className="flex flex-col">
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
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={ratingData.average} size="md" />
                  <span className="text-sm text-gray-500">
                    {ratingData.average.toFixed(1)} ({ratingData.count}{" "}
                    {ratingData.count === 1 ? "review" : "reviews"})
                  </span>
                </div>
              )}

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
                    stockStatus === "in-stock"
                      ? "text-cs-green"
                      : stockStatus === "lead-time"
                        ? "text-cs-orange"
                        : "text-cs-red"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      stockStatus === "in-stock"
                        ? "bg-cs-green"
                        : stockStatus === "lead-time"
                          ? "bg-cs-orange"
                          : "bg-cs-red"
                    }`}
                  />
                  {stockStatus === "in-stock"
                    ? "In Stock"
                    : stockStatus === "lead-time"
                      ? `Delivery in ${siteConfig.leadTime.estimatedDays}`
                      : "Out of Stock"}
                </span>
              </div>

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
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-cs-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <span><strong>{stockStatus === "lead-time" ? `${siteConfig.leadTime.estimatedDays} delivery` : "1-3 days delivery"}</strong> with The Courier Guy</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-cs-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <span><strong>FREE delivery</strong> on orders over R{DELIVERY_CONFIG.freeDeliveryThreshold.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-cs-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                  <span><strong>Safe and secure payments</strong> with multiple options</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-cs-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                  <span><strong>Easy returns</strong> with a full refund</span>
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
              />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: "6+", label: "Ages", sublabel: "Recommended" },
              { icon: "code", label: "Scratch", sublabel: "Compatible" },
              { icon: "app", label: "Free App", sublabel: "Included" },
              { icon: "book", label: "Guides", sublabel: "Included" },
              { icon: "no-solder", label: "No Soldering", sublabel: "Required" },
              { icon: "tools", label: "No Tools", sublabel: "Needed" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 bg-white rounded-xl"
              >
                <div className="w-12 h-12 bg-cs-blue/10 rounded-full flex items-center justify-center mb-2">
                  {feature.icon === "6+" ? (
                    <span className="text-lg font-bold text-cs-blue">6+</span>
                  ) : feature.icon === "code" ? (
                    <svg className="w-6 h-6 text-cs-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                  ) : feature.icon === "app" ? (
                    <svg className="w-6 h-6 text-cs-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                  ) : feature.icon === "book" ? (
                    <svg className="w-6 h-6 text-cs-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  ) : feature.icon === "no-solder" ? (
                    <svg className="w-6 h-6 text-cs-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-cs-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                    </svg>
                  )}
                </div>
                <span className="font-semibold text-navy text-sm">{feature.label}</span>
                <span className="text-xs text-gray-500">{feature.sublabel}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Description Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-navy mb-6">Product Details</h2>
            <div
              className="prose prose-lg text-gray-600"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
            />
          </div>
        </div>
      </section>

      {/* Why Choose This Product */}
      <section className="py-12 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold mb-4">Why Choose {product.title}?</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              This kit is designed to make learning fun and engaging, combining hands-on building with coding fundamentals.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Learn by Doing",
                description: "Hands-on experience building real projects that work, making abstract concepts tangible and memorable.",
              },
              {
                title: "Curriculum Aligned",
                description: "Designed to complement school STEM curricula, reinforcing key concepts from coding to engineering.",
              },
              {
                title: "Future-Ready Skills",
                description: "Develop problem-solving, critical thinking, and creativity - skills essential for tomorrow's careers.",
              },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-cs-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <ProductReviews
        productId={product.id}
        background="gray"
      />

      {/* Final CTA Section */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-navy mb-4">
            Ready to Start the STEM Journey?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Order now and inspire creativity, problem-solving, and a love for learning.
          </p>
          <Link
            href="#product-actions"
            className="inline-flex items-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 text-white rounded-lg font-semibold transition-colors"
          >
            Add to Cart
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </Link>
        </div>
      </section>
    </ProductTrackingProvider>
  );
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | CREATESPACE`,
    description: product.description.slice(0, 160),
    alternates: {
      canonical: `/product/${handle}`,
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
