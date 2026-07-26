"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import { useCart } from "@/context/CartContext";
import { PROMISES } from "@/config/promises";
import { CATEGORIES } from "@/config/categories";
import { BRANDS } from "@/config/brands";
import { capture } from "@/lib/analytics";
import SearchOverlay from "@/components/SearchOverlay";

// Shop dropdown routes by our three axes: age, category, and brand.
const ageLinks = [
  { id: "3-5", label: "Age 3-5", sub: "Early explorers", href: "/shop?age=3-5" },
  { id: "6-8", label: "Age 6-8", sub: "Junior innovators", href: "/shop?age=6-8" },
  { id: "9-12", label: "Age 9-12", sub: "Budding engineers", href: "/shop?age=9-12" },
  { id: "13+", label: "Age 13+", sub: "Advanced creators", href: "/shop?age=13%2B" },
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

export default function Header() {
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

  // The top bar shows all promises in a row on desktop; on mobile it rotates
  // through them one at a time (paused for reduced-motion users, who see the
  // first / free-delivery promise statically).
  const [promoIndex, setPromoIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % PROMISES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const closeDropdown = () => setActiveDropdown(null);

  const trackShopNav = (axis: "age" | "category" | "brand" | "all", value: string) => {
    capture("nav_shop_link_clicked", { axis, value });
    closeDropdown();
  };

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
      {/* Promo bar: trust promises. Row on desktop, rotating below lg. */}
      <div className="bg-cs-orange text-white text-sm font-medium">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
          {/* Desktop: all promises in a row */}
          <ul className="hidden lg:flex items-center justify-center gap-x-10">
            {PROMISES.map((promise) => (
              <li key={promise} className="inline-flex items-center gap-2 whitespace-nowrap">
                <CheckBadge />
                {promise}
              </li>
            ))}
          </ul>
          {/* Mobile / tablet: one rotating promise */}
          <div
            className="lg:hidden flex items-center justify-center gap-2 whitespace-nowrap"
            aria-live="polite"
          >
            <CheckBadge />
            {PROMISES[promoIndex]}
          </div>
        </div>
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
            <div className="grid grid-cols-3 gap-8">
              {/* By age */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 pb-2 border-b border-gray-100">
                  Shop by age
                </p>
                <ul className="space-y-3">
                  {ageLinks.map((age) => (
                    <li key={age.id}>
                      <Link
                        href={age.href}
                        onClick={() => trackShopNav("age", age.id)}
                        className="group/link flex items-baseline gap-2"
                      >
                        <span className="font-semibold text-navy group-hover/link:text-cs-orange transition-colors">
                          {age.label}
                        </span>
                        <span className="text-sm text-gray-500">{age.sub}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* By category */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 pb-2 border-b border-gray-100">
                  Shop by category
                </p>
                <ul className="space-y-3">
                  {CATEGORIES.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/shop?category=${category.id}`}
                        onClick={() => trackShopNav("category", category.id)}
                        className="flex items-center gap-2.5 text-gray-700 hover:text-cs-orange transition-colors"
                      >
                        <Image src={category.icon} alt="" width={18} height={18} />
                        <span className="text-sm">{category.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* By brand */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 pb-2 border-b border-gray-100">
                  Shop by brand
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {BRANDS.map((brand) => (
                    <li key={brand.key}>
                      <Link
                        href={`/shop?brand=${encodeURIComponent(brand.vendor)}`}
                        onClick={() => trackShopNav("brand", brand.key)}
                        className="group/brand flex items-center gap-2 text-sm text-gray-700 hover:text-cs-orange transition-colors"
                      >
                        <Image
                          src={brand.logo}
                          alt=""
                          width={72}
                          height={24}
                          className="h-4 w-auto max-w-[56px] flex-shrink-0 object-contain opacity-80 transition-opacity group-hover/brand:opacity-100"
                        />
                        <span className="truncate">{brand.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Browse all */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link
                href="/shop"
                onClick={() => trackShopNav("all", "all")}
                className="inline-flex items-center font-semibold text-navy hover:text-cs-orange transition-colors"
              >
                Browse all products
                <svg
                  className="w-4 h-4 ml-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
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

// Small white check badge shown before each top-bar promise.
function CheckBadge() {
  return (
    <span
      className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white flex-shrink-0"
      aria-hidden="true"
    >
      <svg
        width="9"
        height="9"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-cs-orange"
      >
        <path d="M2.5 6.5 5 9l4.5-5.5" />
      </svg>
    </span>
  );
}
