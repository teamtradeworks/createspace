import { Suspense } from "react";
import type { Metadata } from "next";
import ThankYouContent from "./ThankYouContent";

export const metadata: Metadata = {
  title: "Order Confirmed | CREATESPACE",
  description: "Your order has been placed successfully. Delivery updates will be sent by email.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  );
}
