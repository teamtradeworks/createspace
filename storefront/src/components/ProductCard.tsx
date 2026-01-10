import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/shopify";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;

  return (
    <Link href={`/product/${product.handle}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="aspect-square relative bg-gray-100 overflow-hidden">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg
                className="w-16 h-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-navy line-clamp-2 mb-2 group-hover:text-cs-orange transition-colors">
            {product.title}
          </h3>
          <p className="text-cs-orange font-semibold">
            {formatPrice(price.amount, price.currencyCode)}
          </p>
        </div>
      </div>
    </Link>
  );
}
