"use client";

import Link from "next/link";
import { Product, formatPrice, formatAgeRange, getProductRating } from "@/lib/shopify";
import QuickAddButton from "@/components/QuickAddButton";
import ProductCardImage from "@/components/ProductCardImage";
import { StarRating } from "@/components/StarRating";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const ageRange = formatAgeRange(product.minAge, product.maxAge);
  const ratingData = getProductRating(product.rating, product.ratingCount);
  const price = product.priceRange.minVariantPrice;

  return (
    <Link
      href={`/product/${product.handle}`}
      className="group bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
    >
      <div className="bg-gray-50 aspect-square relative overflow-hidden">
        {product.images.edges[0] ? (
          <ProductCardImage
            primarySrc={product.images.edges[0].node.url}
            primaryAlt={product.images.edges[0].node.altText || product.title}
            secondarySrc={product.images.edges[1]?.node.url}
            secondaryAlt={product.images.edges[1]?.node.altText || product.title}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {ageRange && (
          <span className="absolute top-3 right-3 bg-navy/80 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
            {ageRange}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-navy group-hover:text-cs-orange transition-colors line-clamp-2 leading-snug mb-2">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {product.description || "Hands-on STEM learning kit"}
        </p>
        {ratingData && (
          <div className="flex items-center gap-1.5 mb-3">
            <StarRating rating={ratingData.average} size="sm" />
            <span className="text-xs text-gray-500">({ratingData.count})</span>
          </div>
        )}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-cs-orange font-bold">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          <QuickAddButton
            variantId={product.variants.edges[0]?.node.id}
            productId={product.id}
            title={product.title}
            price={parseFloat(price.amount)}
            currencyCode={price.currencyCode}
            handle={product.handle}
            image={product.images.edges[0]?.node.url}
            available={product.availableForSale}
          />
        </div>
      </div>
    </Link>
  );
}
