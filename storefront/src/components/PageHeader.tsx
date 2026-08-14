import Link from "next/link";
import { Fragment, type ReactNode } from "react";

export type Breadcrumb = {
  label: string;
  /** Omit href for the current (last) page — it renders as plain text. */
  href?: string;
};

type PageHeaderProps = {
  /** Ordered trail, e.g. [{ label: "Home", href: "/" }, { label: "Shop" }]. */
  breadcrumbs: Breadcrumb[];
  /**
   * The page title. Pass JSX to highlight a word with an accent colour, e.g.
   * <>STEM kits for <span className="text-cs-orange">curious kids</span></>
   */
  title: ReactNode;
  subtitle?: ReactNode;
};

/**
 * Shared page header band — a minimal take on the home hero: navy background,
 * a soft colour glow, breadcrumb, a big accent-word headline, and a couple of
 * orbiting brand illustrations. Used across the shop and the core content pages
 * so their headers stay consistent. (The home page keeps its own richer Hero.)
 */
export default function PageHeader({ breadcrumbs, title, subtitle }: PageHeaderProps) {
  return (
    <header className="relative isolate bg-navy text-white overflow-hidden">
      {/* Soft colour glow, echoing the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 -z-10 h-[130%] w-[55%] -translate-y-1/2 rounded-full bg-cs-blue/20 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-10">
        <nav className="flex text-sm text-white/60 mb-5">
          {breadcrumbs.map((crumb, i) => (
            <Fragment key={`${crumb.label}-${i}`}>
              {i > 0 && <span className="mx-2">/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white font-medium">{crumb.label}</span>
              )}
            </Fragment>
          ))}
        </nav>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl text-lg md:text-xl text-white/80 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {/* Orbiting brand illustrations, echoing the hero */}
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
        className="hidden sm:block pointer-events-none absolute bottom-6 right-40 w-10 opacity-50 lg:right-52 lg:w-12"
      />
    </header>
  );
}
