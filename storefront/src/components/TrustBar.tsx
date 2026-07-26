import Image from "next/image";
import { DELIVERY_CONFIG } from "@/config/delivery";

// Single source of truth for the site-wide delivery/trust promises. Rendered as
// a slim navy strip directly under the header on every page.
const promises = [
  {
    icon: "/images/icons/fast-delivery.png",
    title: "Fast delivery",
    detail: "1-3 days to your door",
    color: "bg-cs-orange",
  },
  {
    icon: "/images/icons/free-delivery.png",
    title: "Free delivery",
    detail: `Over R${DELIVERY_CONFIG.freeDeliveryThreshold.toLocaleString("en-US")}`,
    color: "bg-cs-green",
  },
  {
    icon: "/images/icons/easy-returns.png",
    title: "Easy returns",
    detail: "30 days, no fuss",
    color: "bg-cs-blue",
  },
  {
    icon: "/images/icons/secure-checkout.png",
    title: "Secure checkout",
    detail: "Powered by Stitch",
    color: "bg-cs-purple",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-navy border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex md:justify-center gap-6 md:gap-12 overflow-x-auto scrollbar-none py-3">
          {promises.map((promise) => (
            <li
              key={promise.title}
              className="flex items-center gap-2.5 flex-none whitespace-nowrap"
            >
              <span
                className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${promise.color} flex-shrink-0`}
              >
                <Image src={promise.icon} alt="" width={20} height={20} />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-white">{promise.title}</span>
                <span className="block text-xs text-white/55">{promise.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
