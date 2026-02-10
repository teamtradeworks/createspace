import { getProducts, formatPrice } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | CREATESPACE",
  description:
    "Browse our curated collection of STEM educational products. Shop by age or discipline - Robotics, Electronics, Nature, Building, and Mathematics.",
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
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
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
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    id: "building",
    title: "Building",
    description: "Construction kits that teach engineering principles",
    image: "/images/categories/building.jpg",
    color: "bg-amber-500",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    id: "mathematics",
    title: "Mathematics",
    description: "Make maths fun with puzzles and logic games",
    image: "/images/categories/mathematics.jpg",
    color: "bg-rose-500",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
      </svg>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ageCategories.map((category) => (
              <Link
                key={category.id}
                href={`/shop/age/${category.id}`}
                className="group relative overflow-hidden rounded-2xl p-6 text-white transition-transform hover:scale-[1.02]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="relative z-10">
                  <span className="text-5xl mb-4 block">{category.icon}</span>
                  <h3 className="text-2xl font-bold mb-1">{category.title}</h3>
                  <p className="text-white/90 font-medium mb-2">{category.subtitle}</p>
                  <p className="text-white/70 text-sm">{category.description}</p>
                  <div className="mt-4 flex items-center text-sm font-medium">
                    Browse Products
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
                  </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <Link
                key={product.id}
                href={`/product/${product.handle}`}
                className="group"
              >
                <div className="bg-gray-50 rounded-xl overflow-hidden mb-3 aspect-square relative">
                  {product.images.edges[0] ? (
                    <Image
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-navy group-hover:text-cs-orange transition-colors line-clamp-2 mb-1">
                  {product.title}
                </h3>
                <p className="text-cs-orange font-semibold">
                  {formatPrice(
                    product.priceRange.minVariantPrice.amount,
                    product.priceRange.minVariantPrice.currencyCode
                  )}
                </p>
              </Link>
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

      {/* Why Shop With Us */}
      <section className="py-16 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Shop With CREATESPACE?</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              We&apos;re not just another toy store. We&apos;re STEM specialists committed
              to quality education.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                ),
                title: "Curated Quality",
                description: "Every product is tested and selected for educational value",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                ),
                title: "Expert Support",
                description: "Advice from educators who understand STEM learning",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                ),
                title: "Fast Delivery",
                description: "1-3 day delivery across South Africa",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                ),
                title: "Easy Returns",
                description: "Not satisfied? Return within 14 days for a full refund",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-cs-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
