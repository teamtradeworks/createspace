import { ProductDetail, getStockStatus, getProductRating } from "@/lib/shopify";

interface ProductJsonLdProps {
  product: ProductDetail;
}

export default function ProductJsonLd({ product }: ProductJsonLdProps) {
  const price = product.priceRange.minVariantPrice;
  const image = product.images.edges[0]?.node.url;
  const stockStatus = getStockStatus(product);
  const ratingData = getProductRating(product.rating, product.ratingCount);

  const availabilityMap = {
    "in-stock": "https://schema.org/InStock",
    "lead-time": "https://schema.org/BackOrder",
    "out-of-stock": "https://schema.org/OutOfStock",
  } as const;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    ...(image && { image: [image] }),
    ...(product.vendor && {
      brand: {
        "@type": "Brand",
        name: product.vendor,
      },
    }),
    ...(ratingData && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: ratingData.average,
        reviewCount: ratingData.count,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    offers: {
      "@type": "Offer",
      url: `https://thecreatespace.co.za/product/${product.handle}`,
      priceCurrency: price.currencyCode,
      price: price.amount,
      availability: availabilityMap[stockStatus],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  );
}
