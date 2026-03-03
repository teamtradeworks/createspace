import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "Ages 3-5", href: "/shop?age=3-5" },
    { name: "Ages 6-8", href: "/shop?age=6-8" },
    { name: "Ages 9-12", href: "/shop?age=9-12" },
    { name: "Ages 13+", href: "/shop?age=13%2B" },
  ],
  education: [
    { name: "Overview", href: "/education" },
    { name: "STEM Tutors", href: "/education/stem-tutors" },
    { name: "Curriculum", href: "/education/curriculum" },
    { name: "Classroom Kits", href: "/education/classroom-kits" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ],
  policies: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refund" },
    { name: "Delivery Policy", href: "/delivery-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-2">
              Subscribe for Deals & New Releases
            </h3>
            <p className="text-white/70 mb-6">
              Be the first to know about new products and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cs-orange"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-cs-orange hover:bg-cs-orange/90 rounded-lg font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Image
          src="/images/illustrations/robot-orange.png"
          alt=""
          width={96}
          height={96}
          className="absolute right-8 top-[28px] hidden md:block pointer-events-none"
          aria-hidden="true"
        />
        <div className="grid grid-cols-2 md:grid-cols-[auto_0.36fr_1fr_1fr_1fr_1fr] gap-8 md:gap-x-6 md:pr-28">
          {/* Logo and description */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/images/brand/logo-dark.png"
              alt="CREATESPACE"
              width={150}
              height={27}
              className="h-7 w-auto mb-4"
            />
            <p className="text-white/70 text-sm mb-4 md:w-0 md:min-w-full">
              Curated STEM products to inspire and educate young minds.
            </p>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://instagram.com/createspace_sa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-cs-orange transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/createspacesa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-cs-orange transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
            <div className="text-white/30 text-xs leading-relaxed">
              <p>Tradeworks Online (Pty) Ltd</p>
              <p>Reg No.: 2021/432299/07</p>
              <p>VAT No.: 4450302973</p>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block" />

          {/* Shop links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-cs-orange transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Education links */}
          <div>
            <h4 className="font-semibold mb-4">Education</h4>
            <ul className="space-y-2">
              {footerLinks.education.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-cs-orange transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-cs-orange transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies links */}
          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              {footerLinks.policies.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-cs-orange transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} CREATESPACE. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-sm flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              Secure payments:
            </span>
            <div className="flex flex-wrap gap-2 text-white/70">
              <span className="text-xs bg-white/10 px-2 py-1 rounded">Mastercard</span>
              <span className="text-xs bg-white/10 px-2 py-1 rounded">Visa</span>
              <span className="text-xs bg-white/10 px-2 py-1 rounded">Apple Pay</span>
              <span className="text-xs bg-white/10 px-2 py-1 rounded">Capitec Pay</span>
              <span className="text-xs bg-white/10 px-2 py-1 rounded">Buy Now Pay Later</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
