import Image from "next/image";
import { DELIVERY_CONFIG } from "@/config/delivery";

const items = [
  {
    icon: "/images/icons/fast-delivery.png",
    title: "Fast delivery",
    text: "1-3 days",
  },
  {
    icon: "/images/icons/free-delivery.png",
    title: "Free delivery",
    text: `Over R${DELIVERY_CONFIG.freeDeliveryThreshold.toLocaleString("en-US")}`,
  },
  {
    icon: "/images/icons/easy-returns.png",
    title: "Easy returns",
    text: "30 days",
  },
  {
    icon: "/images/icons/secure-checkout.png",
    title: "Secure checkout",
    text: "Stitch Payments",
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {items.map((item) => (
            <li key={item.title} className="flex items-center gap-2.5">
              <Image src={item.icon} alt="" width={22} height={22} className="flex-shrink-0" />
              <span className="text-sm text-gray-600 whitespace-nowrap">
                <span className="font-semibold text-navy">{item.title}</span>
                <span className="hidden lg:inline"> &middot; {item.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
