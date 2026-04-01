"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useSyncExternalStore } from "react";
import { Product } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";
import { DELIVERY_CONFIG } from "@/config/delivery";
import SearchOverlay from "@/components/SearchOverlay";

// Age group configuration with hardcoded product handles
const ageGroups = [
  {
    id: "3-5",
    label: "Age 3-5",
    href: "/shop?age=3-5",
    handles: ["matatastudio-tale-bot-pro", "matatastudio-coding-set-pro", "snap-circuits-beginner"],
  },
  {
    id: "6-8",
    label: "Age 6-8",
    href: "/shop?age=6-8",
    handles: [
      "makerzoid-smart-robot-premium",
      "elecfreaks-micro-bit-6-in-1-ring-bit-kit",
      "makerzoid-robot-master-premium",
    ],
  },
  {
    id: "9-12",
    label: "Age 9-12",
    href: "/shop?age=9-12",
    handles: [
      "matatastudio-vincibot-coding-robot-set",
      "bbc-micro-bit-go",
      "elecfreaks-micro-bit-smart-cutebot-pro",
    ],
  },
  {
    id: "13+",
    label: "Age 13+",
    href: "/shop?age=13%2B",
    handles: ["ultimate-mega-2560-starter-kit", "arduino-starter-kit", "matatastudio-nous-ai-set"],
  },
];

// Education options configuration
const educationOptions = [
  {
    id: "stem-tutors",
    title: "STEM Tutors",
    description: "Expert facilitators from Robotixkids deliver programmes at your school",
    href: "/education/stem-tutors",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    ),
  },
  {
    id: "curriculum",
    title: "Curriculum for Schools",
    description: "Training platform and resources from Inspire Africa",
    href: "/education/curriculum",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
  },
  {
    id: "classroom-kits",
    title: "Classroom Kits",
    description: "Multi-learner STEM kits with bulk pricing for schools",
    href: "/education/classroom-kits",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    ),
  },
  {
    id: "courses",
    title: "Short Courses",
    description: "Online STEM courses on the Inspire Africa platform",
    href: "/education/courses",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
        />
      </svg>
    ),
  },
];

const navigation = [
  { name: "Home", href: "/", dropdown: null },
  { name: "Shop", href: "/shop", dropdown: "shop" },
  { name: "Education", href: "/education", dropdown: "education" },
  { name: "About Us", href: "/about", dropdown: null },
  { name: "Downloads", href: "/downloads", dropdown: null },
  { name: "Contact", href: "/contact", dropdown: null },
];

interface HeaderProps {
  products?: Product[];
}

export default function Header({ products = [] }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileEducationOpen, setMobileEducationOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { itemCount, cartAnimKey } = useCart();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const closeDropdown = () => setActiveDropdown(null);

  const handleMenuEnter = (dropdown: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const handleMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header className="bg-navy sticky top-0 z-50">
      {/* Promo banner */}
      <div className="bg-cs-orange text-white text-center py-2 text-sm font-medium">
        <span className="inline-flex items-center gap-1.5">
          <Image
            src="/images/brand/flag-za.svg"
            alt="South African flag"
            width={18}
            height={12}
            className="rounded-sm"
          />
          Free delivery on orders over R{DELIVERY_CONFIG.freeDeliveryThreshold.toLocaleString()}
        </span>
      </div>

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/brand/logo-dark.png"
              alt="CREATESPACE"
              width={600}
              height={73}
              className="h-6 w-auto"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMenuEnter(item.dropdown)}
                onMouseLeave={() => item.dropdown && handleMenuLeave()}
              >
                <Link
                  href={item.href}
                  className="text-white hover:text-cs-orange transition-colors text-sm font-medium flex items-center gap-1"
                  onClick={closeDropdown}
                >
                  {item.name}
                  {item.dropdown && (
                    <svg
                      className={`w-4 h-4 transition-transform ${activeDropdown === item.dropdown ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Right side - Search & Cart */}
          <div className="flex items-center space-x-4">
            {/* Search button */}
            <button
              className="text-white hover:text-cs-orange transition-colors"
              aria-label="Search"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>

            {/* Cart button */}
            <Link
              key={cartAnimKey}
              href="/cart"
              className={`text-white hover:text-cs-orange transition-colors relative ${cartAnimKey > 0 ? "animate-bounce-pop" : ""}`}
              aria-label="Cart"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cs-orange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown === "education" ? (
                  <>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="py-2 text-white hover:text-cs-orange transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <button
                        className="py-2 pl-4 text-white hover:text-cs-orange transition-colors"
                        onClick={() => setMobileEducationOpen(!mobileEducationOpen)}
                        aria-label="Toggle education menu"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${mobileEducationOpen ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                    {mobileEducationOpen && (
                      <div className="pl-4 pb-2 space-y-2">
                        {educationOptions.map((option) => (
                          <Link
                            key={option.id}
                            href={option.href}
                            className="block py-1 text-white/80 hover:text-cs-orange transition-colors text-sm"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {option.title}
                          </Link>
                        ))}
                        <Link
                          href="/education"
                          className="block py-1 text-cs-orange hover:text-cs-orange/80 transition-colors text-sm font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          View All
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-2 text-white hover:text-cs-orange transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Shop Mega Menu Dropdown */}
      <div
        className={`absolute top-full left-0 right-0 z-50 transition-all duration-200 ${
          activeDropdown === "shop"
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onMouseEnter={() => handleMenuEnter("shop")}
        onMouseLeave={handleMenuLeave}
      >
        <div className="bg-white shadow-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-4 gap-8">
              {ageGroups.map((group) => {
                // Look up hardcoded products by handle, preserving order
                const groupProducts = group.handles
                  .map((handle) => products.find((p) => p.handle === handle))
                  .filter(Boolean) as Product[];

                return (
                  <div key={group.id}>
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                      <span className="font-semibold text-navy">{group.label}</span>
                      <Link
                        href={group.href}
                        className="text-sm text-gray-500 hover:text-cs-orange transition-colors flex items-center"
                        onClick={closeDropdown}
                      >
                        Shop All
                        <svg
                          className="w-3 h-3 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>

                    {/* Products List */}
                    <ul className="space-y-3">
                      {groupProducts.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/product/${product.handle}`}
                            className="flex items-center gap-3 group/item"
                            onClick={closeDropdown}
                          >
                            {/* Product Thumbnail */}
                            <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              {product.images.edges[0]?.node.url && (
                                <Image
                                  src={product.images.edges[0].node.url}
                                  alt={product.images.edges[0].node.altText || product.title}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <span className="text-sm text-gray-700 group-hover/item:text-cs-orange transition-colors line-clamp-2">
                              {product.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Bottom Banner */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cs-orange/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-cs-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-navy">Need help choosing?</p>
                    <p className="text-sm text-gray-500">
                      Our team can recommend the perfect kit for any age or skill level.
                    </p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="px-5 py-2.5 bg-navy hover:bg-navy/90 text-white text-sm font-medium rounded-lg transition-colors"
                  onClick={closeDropdown}
                >
                  Get Advice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Education Dropdown */}
      <div
        className={`absolute top-full left-0 right-0 z-50 transition-all duration-200 ${
          activeDropdown === "education"
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onMouseEnter={() => handleMenuEnter("education")}
        onMouseLeave={handleMenuLeave}
      >
        <div className="bg-white shadow-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid md:grid-cols-4 gap-6">
              {educationOptions.map((option) => (
                <Link
                  key={option.id}
                  href={option.href}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  onClick={closeDropdown}
                >
                  <div className="w-12 h-12 bg-cs-orange/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-cs-orange/20 transition-colors">
                    <div className="text-cs-orange">{option.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy group-hover:text-cs-orange transition-colors">
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom Banner */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-navy">Looking for something else?</p>
                  <p className="text-sm text-gray-500">
                    View all our education solutions and find the right fit for your school.
                  </p>
                </div>
                <Link
                  href="/education"
                  className="px-5 py-2.5 bg-navy hover:bg-navy/90 text-white text-sm font-medium rounded-lg transition-colors"
                  onClick={closeDropdown}
                >
                  View All Options
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
