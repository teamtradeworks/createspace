import Image from "next/image";
import Link from "next/link";
import HeroCarouselClient from "./HeroCarouselClient";
import SubscribeButton from "./SubscribeButton";

type SlideType = "hero" | "product" | "lifestyle" | "brands-coming-soon" | "brands-launched" | "sale" | "partner-promo";

interface BrandLogo {
  src: string;
  name: string;
}

interface Slide {
  id: string;
  type: SlideType;
  tag?: string;
  headline: string;
  description: string;
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  productImage?: string;
  heroImage?: string;
  lifestyleImages?: string[];
  largeImages?: boolean;
  brandLogos?: BrandLogo[];
  brandCardLabel?: string;
  salePercent?: string;
  brandLogoSrc?: string;
  descriptionSub?: string;
  note?: string;
  partnerLogo?: string;
  bgColor: string;
  textColor?: "light" | "dark";
}

const slides: Slide[] = [
  {
    id: "makerzoid-sale",
    type: "sale",
    tag: "Limited Time",
    headline: "Makerzoid Kits",
    salePercent: "20%",
    description: "Build, code, and bring robots to life — now at 20% off. Sale ends 6 August.",
    cta: { label: "Shop the Sale", href: "/shop?brand=Makerzoid" },
    lifestyleImages: [
      "/images/products/makerzoid-robot-master-premium/helicopter-being-built-with-manual.jpg",
      "/images/products/makerzoid-smart-robot-premium/lifestyle/child-building-while-coding-on-tablet.png",
      "/images/products/makerzoid-robot-master-premium/lifestyle/kids-playing-with-pieces-with-tablet-instructions.png",
    ],
    bgColor: "bg-navy",
    textColor: "light",
  },
  {
    id: "brands-launched",
    type: "brands-launched",
    tag: "New Arrivals",
    headline: "New Brands Have Just Landed",
    description:
      "National Geographic, NASA, and Blockaroo are now at CREATESPACE. Explore science kits, space sets, and magnetic building toys.",
    cta: { label: "Shop Now", href: "/shop?brand=Blockaroo%2CNASA%2CNational+Geographic" },
    brandLogos: [
      { src: "/images/brands/national-geographic.png", name: "National Geographic" },
      { src: "/images/brands/nasa.png", name: "NASA" },
      { src: "/images/brands/blockaroo.png", name: "Blockaroo" },
    ],
    brandCardLabel: "Now In-Store",
    bgColor: "bg-navy",
    textColor: "light",
  },
  {
    id: "inspire-africa",
    type: "partner-promo",
    tag: "For Teachers & Educators",
    headline: "Get a FREE Teaching Course",
    description:
      "Spend over R1,500 at CREATESPACE, and receive a free Inspire Africa online teaching course.",
    cta: { label: "Shop Now", href: "/shop" },
    ctaSecondary: { label: "About the Course", href: "/product/how-to-get-started-with-coding-and-robotics" },
    brandLogos: [
      { src: "/images/products/matatastudio-vincibot-classroom-set/kids-with-teacher-looking-at-tablet.jpg", name: "Kids with teacher" },
      { src: "/images/products/arduino-student-kit/student-kit-connecting-up-with-laptop-infront.jpg", name: "Arduino Student Kit" },
      { src: "/images/products/matatastudio-ai-vision-kit-for-vincibot/boy-with-vibcibot-with-coding-on-laptop.png", name: "VinciBot" },
    ],
    partnerLogo: "/images/education/inspire-africa/inspire-africa-logo.png",
    bgColor: "bg-navy",
    textColor: "light",
  },
  {
    id: "main",
    type: "hero",
    headline: "Build. Play. Learn.",
    description: "Curated STEM kits for curious kids, from first circuits to advanced coding.",
    cta: { label: "Shop Now", href: "/shop" },
    ctaSecondary: { label: "For Educators", href: "/education" },
    heroImage: "/images/home/hero-stem-education.jpg",
    bgColor: "bg-navy",
    textColor: "light",
  },
];

function HeroSlide({ slide, index }: { slide: Slide; index: number }) {
  const isLight = slide.textColor === "light";
  const Heading = index === 0 ? "h1" : "h2";

  return (
    <div
      className={`hero-slide absolute inset-0 ${slide.bgColor} transition-opacity duration-500`}
      data-index={index}
      data-type={slide.type}
    >
      {/* Hero type - full width image on right (desktop), background image on mobile */}
      {slide.type === "hero" && (
        <>
          {/* Mobile background image with overlay */}
          {slide.heroImage && (
            <div className="lg:hidden absolute inset-0">
              <Image
                src={slide.heroImage}
                alt=""
                fill
                className="object-cover object-[30%_center]"
                sizes="100vw"
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <div className="absolute inset-0 bg-navy/70" />
            </div>
          )}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 h-full">
            <div className="py-12 lg:py-20">
              <div className={`max-w-xl ${isLight ? "text-white" : "text-navy"}`}>
                <Heading className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
                  {slide.headline}
                </Heading>
                <p
                  className={`text-lg md:text-xl mb-8 max-w-lg ${isLight ? "text-white/80" : "text-gray-600"}`}
                >
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={slide.cta.href}
                    className="inline-flex items-center px-8 py-4 bg-cs-red hover:bg-cs-red/90 text-white rounded-lg font-semibold transition-colors"
                  >
                    {slide.cta.label}
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                  {slide.ctaSecondary && (
                    <Link
                      href={slide.ctaSecondary.href}
                      className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold transition-colors ${
                        isLight
                          ? "bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                          : "bg-navy/10 hover:bg-navy/20 border border-navy/20 text-navy"
                      }`}
                    >
                      {slide.ctaSecondary.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute top-0 right-0 h-full w-1/2">
            <Image
              src={slide.heroImage!}
              alt="STEM Education"
              fill
              className="object-cover object-right"
              sizes="50vw"
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          </div>
        </>
      )}

      {/* Product type */}
      {slide.type === "product" && slide.productImage && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px] py-12 lg:py-0">
            <div className="z-10">
              {slide.tag && (
                <span className="inline-block text-cs-orange font-medium text-sm uppercase tracking-wider mb-3">
                  {slide.tag}
                </span>
              )}
              <Heading
                className={`text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight ${isLight ? "text-white" : "text-navy"}`}
              >
                {slide.headline}
              </Heading>
              <p
                className={`text-lg md:text-xl mb-8 max-w-lg ${isLight ? "text-white/80" : "text-gray-600"}`}
              >
                {slide.description}
              </p>
              <Link
                href={slide.cta.href}
                className="inline-flex items-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 text-white rounded-full font-semibold transition-colors"
              >
                {slide.cta.label}
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
            <div className="relative h-[350px] lg:h-[450px]">
              <div className="relative h-full">
                <div className="absolute top-10 right-10 w-32 h-32 bg-cs-yellow rounded-full opacity-60" />
                <div className="absolute bottom-20 right-32 w-20 h-20 bg-cs-green rounded-full opacity-50" />
                <div className="absolute top-1/2 right-0 w-16 h-16 bg-cs-blue rounded-full opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full max-w-md">
                    <Image
                      src={slide.productImage}
                      alt="Makerzoid STEM Kit"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 450px"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brands Coming Soon / Launched type */}
      {(slide.type === "brands-coming-soon" || slide.type === "brands-launched") && slide.brandLogos && (
        <>
        {slide.type === "brands-launched" && (
          <>
          <Link
            href={slide.cta.href}
            className="absolute inset-0 z-[11] cursor-pointer"
            aria-label={`${slide.headline} — ${slide.cta.label}`}
            tabIndex={-1}
          />
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
            {/* Left side */}
            <img src="/images/illustrations/planet-1.svg" className="absolute w-20 h-20 opacity-10 top-[5%] left-[2%] -rotate-12" alt="" />
            <img src="/images/illustrations/atom-1.svg" className="absolute w-14 h-14 opacity-10 top-[55%] left-[4%] rotate-6" alt="" />
            <img src="/images/illustrations/robot-2.svg" className="absolute w-16 h-16 opacity-10 bottom-[8%] left-[14%] -rotate-6" alt="" />
            {/* Centre */}
            <img src="/images/illustrations/chip-1.svg" className="absolute w-12 h-12 opacity-10 top-[10%] left-[40%] rotate-12" alt="" />
            <img src="/images/illustrations/planet-2.svg" className="absolute w-16 h-16 opacity-10 bottom-[5%] left-[35%] rotate-3" alt="" />
            {/* Right side */}
            <img src="/images/illustrations/atom-1.svg" className="absolute w-16 h-16 opacity-10 top-[8%] right-[5%] rotate-12" alt="" />
            <img src="/images/illustrations/planet-1.svg" className="absolute w-12 h-12 opacity-10 top-[50%] right-[2%] -rotate-6" alt="" />
            <img src="/images/illustrations/chip-1.svg" className="absolute w-14 h-14 opacity-10 bottom-[10%] right-[12%] rotate-6" alt="" />
          </div>
          </>
        )}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px] py-12 lg:py-0">
            <div className="z-10">
              {slide.tag && (
                <span className={`inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-wider mb-3 ${slide.type === "brands-launched" ? "text-cs-green" : "text-cs-yellow"}`}>
                  <span className={`w-2 h-2 rounded-full ${slide.type === "brands-launched" ? "bg-cs-green" : "bg-cs-yellow animate-pulse"}`} />
                  {slide.tag}
                </span>
              )}
              <Heading className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight text-white">
                {slide.headline}
              </Heading>
              <p className="text-lg md:text-xl max-w-lg text-white/80">{slide.description}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 lg:gap-6">
              <p className="hidden lg:block text-white/70 text-xs uppercase tracking-widest font-medium">
                {slide.type === "brands-launched" ? "Now available at CREATESPACE" : "Brands arriving soon"}
              </p>
              <div className="flex flex-row flex-wrap gap-3 lg:gap-4 justify-center">
                {slide.brandLogos.map((brand) => (
                  <div
                    key={brand.name}
                    className="relative bg-white rounded-2xl p-3 lg:p-5 flex flex-col items-center justify-center gap-2 w-32 h-32 lg:w-44 lg:h-44 shadow-lg"
                  >
                    <div className="relative w-24 h-16 lg:w-32 lg:h-24">
                      <Image
                        src={brand.src}
                        alt={brand.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 96px, 128px"
                        priority={index === 0}
                      />
                    </div>
                    {slide.type !== "brands-launched" && (
                      <span className="text-[9px] lg:text-[10px] font-semibold uppercase tracking-widest text-navy/70">
                        {slide.brandCardLabel ?? "Coming Soon"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {slide.type === "brands-launched" ? (
                <Link
                  href={slide.cta.href}
                  className="relative z-[12] inline-flex items-center px-8 py-4 bg-cs-red hover:bg-cs-red/90 text-white rounded-lg font-semibold transition-colors"
                >
                  {slide.cta.label}
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              ) : (
                <SubscribeButton
                  label="Notify Me"
                  className="inline-flex items-center px-8 py-4 bg-cs-red hover:bg-cs-red/90 text-white rounded-lg font-semibold transition-colors"
                />
              )}
            </div>
          </div>
        </div>
        </>
      )}

      {/* Sale type */}
      {slide.type === "sale" && slide.lifestyleImages && (
        <div className="relative h-full overflow-hidden">
          {/* Background colour blobs */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-cs-purple opacity-20 rounded-full" />
          <div className="absolute bottom-0 right-1/2 w-48 h-48 bg-cs-blue opacity-10 rounded-full" />
          {/* Bold red top strip */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-cs-red z-20" />

          {/* ── Mobile layout ── */}
          <div className="lg:hidden relative z-10 flex flex-col px-4 pt-8 pb-6 gap-5 min-h-[500px]">
            {slide.tag && (
              <span className="inline-flex items-center gap-2 text-white/50 font-semibold text-[10px] uppercase tracking-[0.25em]">
                <span className="w-1.5 h-1.5 rounded-full bg-cs-red animate-pulse" />
                {slide.tag}
              </span>
            )}

            {/* SALE card + badge */}
            <div className="flex items-end">
              <div className="bg-cs-yellow rounded-2xl px-5 py-3">
                <Heading className="text-[5.5rem] font-semibold text-navy tracking-tight leading-none">
                  SALE
                </Heading>
              </div>
              {slide.salePercent && (
                <div className="flex-shrink-0 flex flex-col items-center justify-center rounded-full bg-cs-red border-4 border-navy shadow-[0_0_0_3px_rgba(255,255,255,0.2)] transform rotate-12 ml-2 mb-[-2.5rem] w-28 h-28">
                  <span className="text-white font-semibold text-[2rem] leading-none">{slide.salePercent}</span>
                  <span className="text-white/85 font-semibold text-[0.7rem] uppercase tracking-widest leading-none mt-0.5">OFF</span>
                </div>
              )}
            </div>

            <p className="text-[2rem] font-semibold text-cs-orange uppercase tracking-wide leading-none mt-3">
              {slide.headline}
            </p>

            {/* Single bold image */}
            <div className="relative h-36 rounded-2xl overflow-hidden ring-4 ring-cs-yellow/30 shadow-2xl">
              <Image src={slide.lifestyleImages[2]} alt="Makerzoid robot kit" fill className="object-cover object-center" sizes="100vw" loading="lazy" />
            </div>

            {slide.description && (
              <p className="text-sm text-white/50 leading-relaxed -mt-1">
                {slide.description}
              </p>
            )}

            <Link
              href={slide.cta.href}
              className="inline-flex items-center justify-center w-full px-7 py-4 bg-cs-red hover:bg-cs-red/90 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-black/30 text-base"
            >
              {slide.cta.label}
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* ── Desktop layout ── */}
          <div className="hidden lg:block mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px] lg:py-0">
              <div className="z-10">
                {slide.tag && (
                  <span className="inline-flex items-center gap-2 text-white/50 font-semibold text-[10px] uppercase tracking-[0.25em] mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-cs-red animate-pulse" />
                    {slide.tag}
                  </span>
                )}

                {/* Yellow SALE card + badge */}
                <div className="flex items-end mb-6">
                  <div className="bg-cs-yellow rounded-2xl px-5 py-3">
                    <Heading
                      className="font-semibold text-navy tracking-tight leading-none"
                      style={{ fontSize: "clamp(4rem, 12vw, 7.5rem)", lineHeight: 1 }}
                    >
                      SALE
                    </Heading>
                  </div>
                  {slide.salePercent && (
                    <div
                      className="flex-shrink-0 flex flex-col items-center justify-center rounded-full bg-cs-red border-4 border-navy shadow-[0_0_0_3px_rgba(255,255,255,0.2)] transform rotate-12 -ml-5 mb-[-3.5rem]"
                      style={{ width: "clamp(90px,12vw,140px)", height: "clamp(90px,12vw,140px)" }}
                    >
                      <span className="text-white font-semibold leading-none" style={{ fontSize: "clamp(1.8rem,5vw,3rem)" }}>
                        {slide.salePercent}
                      </span>
                      <span className="text-white/85 font-semibold uppercase tracking-widest leading-none mt-0.5" style={{ fontSize: "clamp(0.6rem,1.2vw,0.8rem)" }}>
                        OFF
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <p className="font-semibold text-cs-orange uppercase leading-none" style={{ fontSize: "clamp(1.25rem, 3.5vw, 2rem)", letterSpacing: "0.08em" }}>
                    {slide.headline}
                  </p>
                </div>

                <p className="text-sm text-white/50 mb-7 max-w-xs leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={slide.cta.href}
                    className="inline-flex items-center px-7 py-3.5 bg-cs-red hover:bg-cs-red/90 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-black/30"
                  >
                    {slide.cta.label}
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Desktop: scattered collage */}
              <div className="relative h-[500px]">
                <div className="absolute top-6 right-4 w-40 h-40 bg-cs-orange opacity-20 rounded-3xl transform rotate-12" />
                <div className="absolute bottom-12 left-2 w-24 h-24 bg-cs-blue opacity-25 rounded-full" />
                <div className="absolute top-0 right-0 w-72 h-56 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 ring-4 ring-cs-yellow/30">
                  <Image src={slide.lifestyleImages[0]} alt="Kids building Makerzoid together" fill className="object-cover" sizes="290px" loading="lazy" />
                </div>
                <div className="absolute top-28 left-4 w-80 h-60 rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 ring-4 ring-white/10">
                  <Image src={slide.lifestyleImages[1]} alt="Child building robot" fill className="object-cover" sizes="320px" loading="lazy" />
                </div>
                <div className="absolute bottom-4 right-8 w-64 h-48 rounded-2xl overflow-hidden shadow-2xl transform rotate-1 ring-4 ring-cs-orange/30">
                  <Image src={slide.lifestyleImages[2]} alt="Kids with robotics kit" fill className="object-cover" sizes="260px" loading="lazy" />
                </div>
                <div className="absolute bottom-0 left-16 w-16 h-16 opacity-40">
                  <Image src="/images/illustrations/robot-orange.png" alt="" fill className="object-contain" sizes="64px" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Partner promo type */}
      {slide.type === "partner-promo" && slide.brandLogos && (
        <>
          <Link
            href={slide.cta.href}
            className="absolute inset-0 z-[11] cursor-pointer"
            aria-label={`${slide.headline} — ${slide.cta.label}`}
            tabIndex={-1}
          />
          {/* Decorative background circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-cs-blue rounded-full opacity-[0.07]" />
            <div className="absolute top-1/3 -left-4 w-28 h-28 bg-cs-purple rounded-full opacity-[0.08]" />
            <div className="absolute -bottom-8 left-1/4 w-40 h-40 bg-cs-orange rounded-full opacity-[0.06]" />
            <div className="absolute top-8 left-1/2 w-16 h-16 bg-cs-green rounded-full opacity-[0.07]" />
            <div className="absolute -top-6 right-1/3 w-32 h-32 bg-cs-blue rounded-full opacity-[0.06]" />
            <div className="absolute bottom-4 right-8 w-44 h-44 bg-cs-purple rounded-full opacity-[0.06]" />
            <div className="absolute top-1/2 right-1/4 w-14 h-14 bg-cs-orange rounded-full opacity-[0.08]" />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
            <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px] pt-6 pb-4 lg:py-8">

              {/* Left: text */}
              <div className="z-[12]">
                {slide.tag && (
                  <span className="inline-flex items-center gap-2 text-cs-blue font-semibold text-sm uppercase tracking-wider mb-3">
                    <span className="w-2 h-2 rounded-full bg-cs-blue" />
                    {slide.tag}
                  </span>
                )}
                <Heading className="mb-3 leading-none">
                  <span className="block text-4xl md:text-4xl lg:text-5xl leading-tight">
                    <span className="text-white font-semibold">Get a </span>
                    <span className="text-cs-orange font-extrabold tracking-tight">FREE</span>
                  </span>
                  <span className="block text-white text-4xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                    Teaching Course
                  </span>
                </Heading>
                <p className="text-white/70 text-base mb-4 max-w-md leading-relaxed">
                  {slide.description}
                </p>

                {/* Course callout */}
                <div className="mb-5 rounded-xl border border-white/10 bg-white/5 px-5 py-4 inline-block">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
                    Free course included
                  </p>
                  <p className="text-cs-blue font-semibold text-xl leading-tight">How to get started:</p>
                  <p className="text-white font-bold text-xl leading-tight">Coding &amp; Robotics</p>
                  <p className="text-white/40 text-sm mt-2">Inspire Africa · Online · Worth R490</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={slide.cta.href}
                    className="relative z-[13] inline-flex items-center px-6 py-3 bg-cs-red hover:bg-cs-red/90 text-white rounded-lg font-semibold transition-colors"
                  >
                    {slide.cta.label}
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  {slide.ctaSecondary && (
                    <Link
                      href={slide.ctaSecondary.href}
                      className="relative z-[13] inline-flex items-center px-6 py-3 border border-white/25 hover:bg-white/10 text-white rounded-lg font-semibold transition-colors"
                    >
                      {slide.ctaSecondary.label}
                    </Link>
                  )}
                </div>
              </div>

              {/* Right: product image cards */}
              <div className="flex flex-col items-start lg:items-center justify-center gap-3 lg:gap-4">
                <div className="grid grid-cols-3 gap-3 w-full lg:flex lg:flex-row lg:gap-4 lg:w-auto">
                  {slide.brandLogos.map((product) => (
                    <div
                      key={product.name}
                      className="relative bg-white rounded-2xl overflow-hidden aspect-square lg:w-44 lg:h-44 lg:aspect-auto shadow-lg"
                    >
                      <Image
                        src={product.src}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) calc((100vw - 3rem) / 3), 176px"
                        priority
                      />
                    </div>
                  ))}
                </div>
                {slide.partnerLogo && (
                  <div className="hidden lg:flex items-center gap-4">
                    <span className="text-white/60 text-base font-medium">In partnership with</span>
                    <a href="https://inspire.africa/" target="_blank" rel="noopener noreferrer" className="relative z-[13] bg-white/20 hover:bg-white/30 rounded-xl px-5 py-3 transition-colors">
                      <Image
                        src={slide.partnerLogo}
                        alt="Inspire Africa"
                        width={200}
                        height={44}
                        className="object-contain h-11 w-auto"
                        loading="lazy"
                      />
                    </a>
                  </div>
                )}
              </div>

            </div>
          </div>
        </>
      )}

      {/* Lifestyle type */}
      {slide.type === "lifestyle" && slide.lifestyleImages && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px] py-12 lg:py-0">
            <div className="z-10">
              {slide.tag && (
                <span className="inline-block text-cs-orange font-medium text-sm uppercase tracking-wider mb-3">
                  {slide.tag}
                </span>
              )}
              <Heading
                className={`text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight ${isLight ? "text-white" : "text-navy"}`}
              >
                {slide.headline}
              </Heading>
              <p
                className={`text-lg md:text-xl mb-8 max-w-lg ${isLight ? "text-white/80" : "text-gray-600"}`}
              >
                {slide.description}
              </p>
              <Link
                href={slide.cta.href}
                className="inline-flex items-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 text-white rounded-full font-semibold transition-colors"
              >
                {slide.cta.label}
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
            {/* Mobile: simple two-image row */}
            <div className={`lg:hidden flex gap-2 ${slide.largeImages ? "h-48" : "h-32"}`}>
              <div className="relative flex-1 rounded-xl overflow-hidden">
                <Image
                  src={slide.lifestyleImages[0]}
                  alt="Kids learning robotics"
                  fill
                  className="object-cover"
                  sizes="50vw"
                  loading="lazy"
                />
              </div>
              <div className="relative flex-1 rounded-xl overflow-hidden">
                <Image
                  src={slide.lifestyleImages[1]}
                  alt="STEM education workshop"
                  fill
                  className="object-cover"
                  sizes="50vw"
                  loading="lazy"
                />
              </div>
            </div>
            {/* Desktop: scattered collage */}
            <div
              className={`hidden lg:block relative ${slide.largeImages ? "h-[500px]" : "h-[450px]"}`}
            >
              <div className="relative h-full">
                <div className="absolute top-0 right-20 w-24 h-24 bg-cs-orange rounded-full opacity-30" />
                <div className="absolute bottom-10 left-10 w-16 h-16 bg-cs-blue rounded-full opacity-30" />
                <div
                  className={`absolute top-0 right-0 rounded-2xl overflow-hidden shadow-lg transform rotate-3 ${slide.largeImages ? "w-72 h-56" : "w-48 h-36"}`}
                >
                  <Image
                    src={slide.lifestyleImages[0]}
                    alt="Kids learning robotics"
                    fill
                    className="object-cover"
                    sizes={slide.largeImages ? "290px" : "200px"}
                    loading="lazy"
                  />
                </div>
                <div
                  className={`absolute top-28 left-4 rounded-2xl overflow-hidden shadow-lg transform -rotate-2 ${slide.largeImages ? "w-80 h-60" : "w-52 h-40"}`}
                >
                  <Image
                    src={slide.lifestyleImages[1]}
                    alt="STEM education workshop"
                    fill
                    className="object-cover"
                    sizes={slide.largeImages ? "320px" : "220px"}
                    loading="lazy"
                  />
                </div>
                <div
                  className={`absolute bottom-4 right-8 rounded-2xl overflow-hidden shadow-lg transform rotate-1 ${slide.largeImages ? "w-64 h-48" : "w-44 h-32"}`}
                >
                  <Image
                    src={slide.lifestyleImages[2]}
                    alt="Robotics class"
                    fill
                    className="object-cover"
                    sizes={slide.largeImages ? "260px" : "180px"}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HeroCarousel() {
  return (
    <section className="relative overflow-hidden min-h-[500px]">
      <HeroCarouselClient
        slideCount={slides.length}
        slideTextColors={slides.map((s) => s.textColor ?? "dark")}
      >
        {slides.map((slide, index) => (
          <HeroSlide key={slide.id} slide={slide} index={index} />
        ))}
      </HeroCarouselClient>
    </section>
  );
}
