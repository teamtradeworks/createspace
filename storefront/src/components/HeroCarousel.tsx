import Image from "next/image";
import Link from "next/link";
import HeroCarouselClient from "./HeroCarouselClient";
import SubscribeButton from "./SubscribeButton";

type SlideType = "hero" | "product" | "lifestyle" | "brands-coming-soon";

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
  brandLogos?: BrandLogo[];
  bgColor: string;
  textColor?: "light" | "dark";
}

const slides: Slide[] = [
  {
    id: "main",
    type: "hero",
    headline: "Build. Play. Learn.",
    description: "Curated STEM kits for curious kids — from first circuits to advanced coding.",
    cta: { label: "Shop Now", href: "/shop" },
    ctaSecondary: { label: "For Educators", href: "/education" },
    heroImage: "/images/home/hero-stem-education.jpg",
    bgColor: "bg-navy",
    textColor: "light",
  },
  {
    id: "brands-coming-soon",
    type: "brands-coming-soon",
    tag: "Coming Soon",
    headline: "Exciting New Brands on the Way",
    description:
      "We're adding some amazing new STEM and educational brands to CREATESPACE. Watch this space!",
    cta: { label: "Notify Me", href: "#" },
    brandLogos: [
      { src: "/images/brands/national-geographic.png", name: "National Geographic" },
      { src: "/images/brands/nasa.png", name: "NASA" },
      { src: "/images/brands/blockaroo.png", name: "Blockaroo" },
    ],
    bgColor: "bg-navy",
    textColor: "light",
  },
  {
    id: "education",
    type: "lifestyle",
    tag: "CREATESPACE for Schools",
    headline: "STEM Education Solutions for Every School",
    description:
      "From trained tutors and classroom kits to teacher training and online courses — bring STEM to life at your school.",
    cta: { label: "Explore Education", href: "/education" },
    lifestyleImages: [
      "/images/home/stem-tutoring-workshop-1.png",
      "/images/home/stem-tutoring-workshop-2.png",
      "/images/home/stem-tutoring-workshop-3.png",
    ],
    bgColor: "bg-gradient-to-br from-orange-50 to-yellow-50",
    textColor: "dark",
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
      {/* Hero type - full width image on right */}
      {slide.type === "hero" && (
        <>
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

      {/* Brands Coming Soon type */}
      {slide.type === "brands-coming-soon" && slide.brandLogos && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px] py-12 lg:py-0">
            <div className="z-10">
              {slide.tag && (
                <span className="inline-flex items-center gap-2 text-cs-yellow font-semibold text-sm uppercase tracking-wider mb-3">
                  <span className="w-2 h-2 rounded-full bg-cs-yellow animate-pulse" />
                  {slide.tag}
                </span>
              )}
              <Heading className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight text-white">
                {slide.headline}
              </Heading>
              <p className="text-lg md:text-xl mb-8 max-w-lg text-white/80">
                {slide.description}
              </p>
              <SubscribeButton
                label="Notify Me"
                className="inline-flex items-center px-8 py-4 bg-cs-red hover:bg-cs-red/90 text-white rounded-lg font-semibold transition-colors"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-6">
              <p className="text-white/70 text-xs uppercase tracking-widest font-medium">
                Brands arriving soon
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {slide.brandLogos.map((brand) => (
                  <div
                    key={brand.name}
                    className="relative bg-white rounded-2xl p-5 flex flex-col items-center justify-center gap-3 w-36 h-36 shadow-lg"
                  >
                    <div className="relative w-20 h-16">
                      <Image
                        src={brand.src}
                        alt={brand.name}
                        fill
                        className="object-contain"
                        sizes="80px"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-navy/70 uppercase tracking-widest">
                      Coming Soon
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
            <div className="relative h-[350px] lg:h-[450px]">
              <div className="relative h-full">
                <div className="absolute top-0 right-20 w-24 h-24 bg-cs-orange rounded-full opacity-30" />
                <div className="absolute bottom-10 left-10 w-16 h-16 bg-cs-blue rounded-full opacity-30" />
                <div className="absolute top-0 right-0 w-48 h-36 rounded-2xl overflow-hidden shadow-lg transform rotate-3">
                  <Image
                    src={slide.lifestyleImages[0]}
                    alt="Kids learning robotics"
                    fill
                    className="object-cover"
                    sizes="200px"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-24 left-8 w-52 h-40 rounded-2xl overflow-hidden shadow-lg transform -rotate-2">
                  <Image
                    src={slide.lifestyleImages[1]}
                    alt="STEM education workshop"
                    fill
                    className="object-cover"
                    sizes="220px"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-8 right-12 w-44 h-32 rounded-2xl overflow-hidden shadow-lg transform rotate-1">
                  <Image
                    src={slide.lifestyleImages[2]}
                    alt="Robotics class"
                    fill
                    className="object-cover"
                    sizes="180px"
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
