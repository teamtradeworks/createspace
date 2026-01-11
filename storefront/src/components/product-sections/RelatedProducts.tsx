import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/shopify";

interface RelatedProduct {
  id: string;
  handle: string;
  title: string;
  images: {
    edges: Array<{
      node: {
        url: string;
        altText?: string | null;
      };
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface RelatedProductsProps {
  title?: string;
  products: RelatedProduct[];
  background?: "white" | "gray" | "navy";
}

export function RelatedProducts({
  title = "You May Also Like",
  products,
  background = "gray",
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  const bgClass = {
    white: "bg-white",
    gray: "bg-gray-50",
    navy: "bg-navy",
  }[background];

  const titleClass = background === "navy" ? "text-white" : "text-navy";
  const cardBgClass = background === "navy" ? "bg-white/10" : "bg-white";
  const productTitleClass = background === "navy" ? "text-white" : "text-navy";

  return (
    <section className={`py-12 ${bgClass}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className={`text-2xl font-semibold ${titleClass} mb-8`}>{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.handle}`}
              className="group"
            >
              <div className={`aspect-square ${cardBgClass} rounded-xl overflow-hidden mb-3`}>
                {product.images.edges[0] && (
                  <Image
                    src={product.images.edges[0].node.url}
                    alt={product.images.edges[0].node.altText || product.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <h3 className={`font-medium ${productTitleClass} group-hover:text-cs-orange transition-colors line-clamp-2`}>
                {product.title}
              </h3>
              <p className="text-cs-orange font-semibold mt-1">
                {formatPrice(
                  product.priceRange.minVariantPrice.amount,
                  product.priceRange.minVariantPrice.currencyCode
                )}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
