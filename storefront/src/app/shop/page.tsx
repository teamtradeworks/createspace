import { getProducts } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | CREATESPACE",
  description:
    "Browse our curated collection of STEM educational products. Shop by age or discipline - Robotics, Electronics, Nature, and Building.",
};

const ageCategories = [
  {
    id: "3-5",
    title: "Ages 3-5",
    subtitle: "Early Explorers",
    description: "First steps into STEM with safe, engaging toys",
    color: "from-pink-500 to-rose-500",
    icon: "🧒",
  },
  {
    id: "6-8",
    title: "Ages 6-8",
    subtitle: "Young Builders",
    description: "Hands-on kits for curious minds",
    color: "from-orange-500 to-amber-500",
    icon: "👦",
  },
  {
    id: "9-12",
    title: "Ages 9-12",
    subtitle: "Junior Engineers",
    description: "More complex projects with coding",
    color: "from-cyan-500 to-blue-500",
    icon: "🧑",
  },
  {
    id: "13-plus",
    title: "Ages 13+",
    subtitle: "Teen Innovators",
    description: "Advanced robotics and electronics",
    color: "from-purple-500 to-indigo-500",
    icon: "🎓",
  },
];

const disciplines = [
  {
    id: "robotics",
    title: "Robotics",
    description: "Build and program robots that move, sense, and interact",
    image: "/images/categories/robotics.jpg",
    color: "bg-cs-orange",
    icon: (
      <Image
        src="/images/icons/robotics.png"
        alt="Robotics"
        width={48}
        height={48}
        className="brightness-0 invert"
        style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 0.5px white) drop-shadow(0 0 0.5px white)' }}
      />
    ),
  },
  {
    id: "electronics",
    title: "Electronics",
    description: "Discover circuits, sensors, and how electronics work",
    image: "/images/categories/electronics.jpg",
    color: "bg-cs-blue",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    id: "nature",
    title: "Nature",
    description: "Explore biology, ecology, and the natural world",
    image: "/images/categories/nature.jpg",
    color: "bg-cs-green",
    icon: (
      <Image
        src="/images/icons/nature.png"
        alt="Nature"
        width={48}
        height={48}
        className="brightness-0 invert"
        style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 0.5px white) drop-shadow(0 0 0.5px white)' }}
      />
    ),
  },
  {
    id: "building",
    title: "Building",
    description: "Construction kits that teach engineering principles",
    image: "/images/categories/building.jpg",
    color: "bg-amber-500",
    icon: (
      <Image
        src="/images/icons/building.png"
        alt="Building"
        width={48}
        height={48}
        className="brightness-0 invert"
        style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 0.5px white) drop-shadow(0 0 0.5px white)' }}
      />
    ),
  },
];

export default async function ShopPage() {
  const products = await getProducts(8);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 right-20 w-48 h-48 border-2 border-white rounded-full" />
          <div className="absolute top-1/2 right-1/3 w-24 h-24 border-2 border-white rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Explore Our STEM Collection
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Carefully curated educational kits to inspire curiosity and build
              future-ready skills. Browse by age or find products by discipline.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#by-age"
                className="px-6 py-3 bg-cs-orange hover:bg-cs-orange/90 rounded-lg font-semibold transition-colors"
              >
                Shop by Age
              </a>
              <a
                href="#by-discipline"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg font-semibold transition-colors"
              >
                Shop by Discipline
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Age */}
      <section id="by-age" className="py-16 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              Find the Perfect Fit
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-4">
              Shop by Age
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every child learns differently. We&apos;ve organised our products by age
              to help you find kits that match their developmental stage and interests.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {ageCategories.map((category) => (
              <Link
                key={category.id}
                href={`/shop/age/${category.id}`}
                className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                style={{ backgroundColor: '#f9fafb' }}
              >
                <div className="p-6">
                  <div className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${category.color} mb-4`} />
                  <h3 className="text-xl font-bold text-navy mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-cs-orange font-medium mb-2">{category.subtitle}</p>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  <span className="inline-flex items-center text-cs-orange font-medium text-sm">
                    View Products
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Discipline */}
      <section id="by-discipline" className="py-16 bg-gray-50 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
              Explore Subjects
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-4">
              Shop by Discipline
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From robotics to nature exploration, find products that align with
              your child&apos;s interests and spark new passions.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {disciplines.map((discipline) => (
              <Link
                key={discipline.id}
                href={`/shop/discipline/${discipline.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="p-6">
                  <div
                    className={`w-16 h-16 ${discipline.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {discipline.icon}
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">
                    {discipline.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{discipline.description}</p>
                  <span className="inline-flex items-center text-cs-orange font-medium text-sm">
                    View Products
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
                Popular Picks
              </span>
              <h2 className="text-3xl font-bold text-navy mt-2">
                Featured Products
              </h2>
            </div>
            <Link
              href="/shop/all"
              className="hidden sm:flex items-center text-navy hover:text-cs-orange font-medium transition-colors"
            >
              View All Products
              <svg
                className="w-5 h-5 ml-1"
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
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/shop/all"
              className="inline-flex items-center px-6 py-3 bg-navy text-white rounded-lg font-semibold hover:bg-navy/90 transition-colors"
            >
              View All Products
              <svg
                className="w-5 h-5 ml-2"
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
          </div>
        </div>
      </section>

    </>
  );
}
