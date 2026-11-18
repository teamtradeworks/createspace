import Link from "next/link";

// Black Friday Sale header band for /shop (promo section id
// "black-friday-shop-header"). Shown in place of the default <ShopHeader />
// only while the "Black Friday Sale" promo is live (see config/promo.ts).
// Deliberately simple: the shared PageHeader's frame (navy, blue glow,
// breadcrumb, one big headline with an orange accent, a subtitle, orbiting
// illustrations) plus a red sale badge, so it is about the same height and the
// products start where they always do. No discount figure in the headline.
// The copy lives here: keep "Ends 30 November." in step with the promo's
// `endsAt`. No button: the products and the "On sale" filter are right below.
export default function BlackFridayShopHeader() {
  return (
    <header className="relative isolate overflow-hidden bg-navy text-white">
      {/* Soft colour glow, as in PageHeader */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 -z-10 h-[130%] w-[55%] -translate-y-1/2 rounded-full bg-cs-blue/20 blur-3xl"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <nav className="mb-5 flex text-sm text-white/60">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-white">Shop</span>
        </nav>
        {/* Red means saving (DESIGN.md), as on the promo strip's sale badge. */}
        <span className="mb-3 inline-block rounded-md bg-cs-red px-3 py-1 text-sm font-semibold uppercase tracking-wide text-white">
          Black Friday Sale
        </span>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-5xl lg:text-6xl">
          Black Friday: <span className="text-cs-orange">STEM kits for less</span>
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-white/80 md:text-xl">
          Robots, science kits and coding sets for every age.
          <span className="block">Ends 30 November.</span>
        </p>
      </div>
      {/* Orbiting brand illustrations, as in PageHeader */}
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative inline SVG */}
      <img
        src="/images/illustrations/planet-1.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-6 w-14 sm:w-16 lg:right-16 lg:top-8 lg:w-20"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative inline SVG */}
      <img
        src="/images/illustrations/atom-1.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 right-40 hidden w-10 opacity-50 sm:block lg:right-52 lg:w-12"
      />
    </header>
  );
}
