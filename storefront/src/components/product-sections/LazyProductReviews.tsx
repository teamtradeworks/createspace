"use client";

import dynamic from "next/dynamic";

const ProductReviews = dynamic(
  () => import("./ProductReviews").then((mod) => ({ default: mod.ProductReviews })),
  { ssr: false },
);

interface LazyProductReviewsProps {
  productId: string;
  background?: "white" | "gray" | "navy";
}

export function LazyProductReviews(props: LazyProductReviewsProps) {
  return <ProductReviews {...props} />;
}
