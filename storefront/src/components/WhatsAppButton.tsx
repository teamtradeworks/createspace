"use client";

import { usePathname } from "next/navigation";
import WhatsAppLink, { WHATSAPP_ICON } from "@/components/WhatsAppLink";

/** Floating chat button, fixed to the bottom-right corner of every page. */
export default function WhatsAppButton() {
  const pathname = usePathname();
  // The cart has a sticky checkout bar along the bottom on mobile; sit above it.
  const bottom = pathname === "/cart" ? "bottom-24 lg:bottom-6" : "bottom-6";

  return (
    <WhatsAppLink
      location="floating_button"
      aria-label="Chat to us on WhatsApp"
      className={`group fixed right-4 sm:right-6 ${bottom} z-40 flex items-center rounded-full bg-[#25D366] p-3.5 text-white shadow-lg shadow-navy/20 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 print:hidden`}
    >
      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d={WHATSAPP_ICON} />
      </svg>
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap font-semibold transition-all duration-300 sm:inline group-hover:max-w-40 group-hover:px-2 group-focus-visible:max-w-40 group-focus-visible:px-2">
        Chat with us
      </span>
    </WhatsAppLink>
  );
}
