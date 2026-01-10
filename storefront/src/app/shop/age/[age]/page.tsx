import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProducts, Product } from "@/lib/shopify";

const ageCategories: Record<
  string,
  {
    title: string;
    subtitle: string;
    description: string;
    range: [number, number];
    color: string;
    bgGradient: string;
  }
> = {
  "3-5": {
    title: "Early Explorers",
    subtitle: "Ages 3-5",
    description:
      "Simple, safe, and engaging STEM toys that spark curiosity and develop fine motor skills through hands-on play.",
    range: [3, 5],
    color: "cs-green",
    bgGradient: "from-cs-green to-cs-green/80",
  },
  "6-8": {
    title: "Young Builders",
    subtitle: "Ages 6-8",
    description:
      "Building sets and beginner robotics that introduce foundational engineering concepts while encouraging creativity.",
    range: [6, 8],
    color: "cs-blue",
    bgGradient: "from-cs-blue to-cs-blue/80",
  },
  "9-12": {
    title: "Junior Engineers",
    subtitle: "Ages 9-12",
    description:
      "Intermediate kits that challenge young minds with coding, electronics, and more complex building projects.",
    range: [9, 12],
    color: "cs-orange",
    bgGradient: "from-cs-orange to-cs-orange/80",
  },
  "13+": {
    title: "Teen Innovators",
    subtitle: "Ages 13+",
    description:
      "Advanced robotics and STEM kits for teens ready to take on sophisticated engineering challenges.",
    range: [13, 99],
    color: "cs-purple",
    bgGradient: "from-cs-purple to-cs-purple/80",
  },
};

type Props = {
  params: Promise<{ age: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { age } = await params;
  const category = ageCategories[age];

  if (!category) {
    return { title: "Not Found | CREATESPACE" };
  }

  return {
    title: `${category.title} (${category.subtitle}) | CREATESPACE`,
    description: category.description,
  };
}

export function generateStaticParams() {
  return Object.keys(ageCategories).map((age) => ({ age }));
}

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export default async function AgeCategoryPage({ params }: Props) {
  const { age } = await params;
  const category = ageCategories[age];

  if (!category) {
    notFound();
  }

  const allProducts = await getProducts(100);

  // For now, show all products since we don't have age tags set up in Shopify
  // In production, filter by age-related tags
  const products = allProducts;

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/shop" className="text-gray-500 hover:text-gray-700">
              Shop
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-navy font-medium">{category.subtitle}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className={`bg-gradient-to-r ${category.bgGradient} text-white`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">
                {category.subtitle}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                {category.title}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Age Groups */}
      <div className="bg-gray-50 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-sm text-gray-500 whitespace-nowrap">
              Browse by age:
            </span>
            {Object.entries(ageCategories).map(([key, cat]) => (
              <Link
                key={key}
                href={`/shop/age/${key}`}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  key === age
                    ? "bg-navy text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border"
                }`}
              >
                {cat.subtitle}
              </Link>
            ))}
            <Link
              href="/shop/all"
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-white text-gray-700 hover:bg-gray-100 border"
            >
              All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <p className="text-sm text-gray-500 mb-6">
            Showing {products.length} product{products.length !== 1 ? "s" : ""}
          </p>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.handle}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-xl overflow-hidden mb-3 aspect-square relative">
                    {product.images.edges[0] ? (
                      <Image
                        src={product.images.edges[0].node.url}
                        alt={
                          product.images.edges[0].node.altText || product.title
                        }
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
                  {product.vendor && (
                    <p className="text-xs text-gray-500 mb-1">
                      {product.vendor}
                    </p>
                  )}
                  <p className="text-cs-orange font-semibold">
                    {formatPrice(
                      product.priceRange.minVariantPrice.amount,
                      product.priceRange.minVariantPrice.currencyCode
                    )}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                No products found
              </h2>
              <p className="text-gray-600 mb-6">
                We&apos;re adding new products for this age group soon.
              </p>
              <Link
                href="/shop/all"
                className="inline-flex items-center px-6 py-3 bg-navy hover:bg-navy/90 text-white rounded-lg font-semibold transition-colors"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Explore Other Categories */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-6">
            Explore by Discipline
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Robotics", slug: "robotics", icon: "🤖" },
              { name: "Electronics", slug: "electronics", icon: "⚡" },
              { name: "Nature", slug: "nature", icon: "🌿" },
              { name: "Building", slug: "building", icon: "🏗️" },
              { name: "Mathematics", slug: "mathematics", icon: "🔢" },
            ].map((discipline) => (
              <Link
                key={discipline.slug}
                href={`/shop/discipline/${discipline.slug}`}
                className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-shadow border hover:border-cs-orange"
              >
                <span className="text-3xl mb-2 block">{discipline.icon}</span>
                <span className="font-medium text-navy">{discipline.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
