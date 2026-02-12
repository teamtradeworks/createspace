import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, formatPrice, formatAgeRange, getProductRating } from "@/lib/shopify";
import QuickAddButton from "@/components/QuickAddButton";
import ProductCardImage from "@/components/ProductCardImage";
import { StarRating } from "@/components/StarRating";

const disciplines: Record<
  string,
  {
    title: string;
    description: string;
    icon: string;
    color: string;
    bgGradient: string;
    skills: string[];
  }
> = {
  robotics: {
    title: "Robotics",
    description:
      "Build, program, and bring robots to life. Our robotics kits teach coding, mechanical engineering, and problem-solving through hands-on robot creation.",
    icon: "🤖",
    color: "cs-blue",
    bgGradient: "from-cs-blue to-cs-blue/80",
    skills: ["Coding", "Engineering", "Problem Solving", "Electronics"],
  },
  electronics: {
    title: "Electronics",
    description:
      "Discover the world of circuits, sensors, and electronic components. Learn how everyday devices work and create your own electronic projects.",
    icon: "⚡",
    color: "cs-orange",
    bgGradient: "from-cs-orange to-cs-orange/80",
    skills: ["Circuit Design", "Soldering", "Logic", "Physics"],
  },
  nature: {
    title: "Nature & Science",
    description:
      "Explore biology, ecology, and environmental science through hands-on experiments and outdoor discovery kits that connect kids with the natural world.",
    icon: "🌿",
    color: "cs-green",
    bgGradient: "from-cs-green to-cs-green/80",
    skills: ["Biology", "Ecology", "Observation", "Scientific Method"],
  },
  building: {
    title: "Building & Construction",
    description:
      "From basic blocks to complex structures, develop spatial reasoning and engineering skills through creative building challenges.",
    icon: "🏗️",
    color: "cs-purple",
    bgGradient: "from-cs-purple to-cs-purple/80",
    skills: [
      "Spatial Reasoning",
      "Architecture",
      "Fine Motor Skills",
      "Creativity",
    ],
  },
  mathematics: {
    title: "Mathematics",
    description:
      "Make math tangible and fun with manipulatives, puzzles, and games that build number sense, geometry understanding, and logical thinking.",
    icon: "🔢",
    color: "cs-red",
    bgGradient: "from-cs-red to-cs-red/80",
    skills: ["Number Sense", "Geometry", "Logic", "Pattern Recognition"],
  },
};

type Props = {
  params: Promise<{ discipline: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { discipline } = await params;
  const category = disciplines[discipline];

  if (!category) {
    return { title: "Not Found | CREATESPACE" };
  }

  return {
    title: `${category.title} | CREATESPACE`,
    description: category.description,
  };
}

export function generateStaticParams() {
  return Object.keys(disciplines).map((discipline) => ({ discipline }));
}

export default async function DisciplineCategoryPage({ params }: Props) {
  const { discipline } = await params;
  const category = disciplines[discipline];

  if (!category) {
    notFound();
  }

  const allProducts = await getProducts(100);

  // For now, show all products since we don't have discipline tags set up in Shopify
  // In production, filter by discipline-related tags or product types
  const products = allProducts;

  return (
    <main className="min-h-screen bg-gray-50">
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
            <span className="text-navy font-medium">{category.title}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className={`bg-gradient-to-r ${category.bgGradient} text-white`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{category.icon}</span>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {category.title}
                </h1>
              </div>
              <p className="text-white/90 text-lg max-w-2xl mb-6">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white/20 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Disciplines */}
      <div className="bg-gray-50 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-sm text-gray-500 whitespace-nowrap">
              Browse by discipline:
            </span>
            {Object.entries(disciplines).map(([key, cat]) => (
              <Link
                key={key}
                href={`/shop/discipline/${key}`}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                  key === discipline
                    ? "bg-navy text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.title}
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.handle}`}
                  className="group bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="bg-gray-50 aspect-square relative overflow-hidden">
                    {product.images.edges[0] ? (
                      <ProductCardImage
                        primarySrc={product.images.edges[0].node.url}
                        primaryAlt={product.images.edges[0].node.altText || product.title}
                        secondarySrc={product.images.edges[1]?.node.url}
                        secondaryAlt={product.images.edges[1]?.node.altText || product.title}
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
                    {formatAgeRange(product.minAge, product.maxAge) && (
                      <span className="absolute top-3 right-3 bg-navy/80 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        {formatAgeRange(product.minAge, product.maxAge)}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-navy group-hover:text-cs-orange transition-colors line-clamp-2 leading-snug mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                      {product.description || "Hands-on STEM learning kit"}
                    </p>
                    {(() => {
                      const rd = getProductRating(product.rating, product.ratingCount);
                      return rd ? (
                        <div className="flex items-center gap-1.5 mb-3">
                          <StarRating rating={rd.average} size="sm" />
                          <span className="text-xs text-gray-500">({rd.count})</span>
                        </div>
                      ) : null;
                    })()}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-cs-orange font-bold">
                        {formatPrice(
                          product.priceRange.minVariantPrice.amount,
                          product.priceRange.minVariantPrice.currencyCode
                        )}
                      </span>
                      <QuickAddButton
                        variantId={product.variants.edges[0]?.node.id}
                        productId={product.id}
                        title={product.title}
                        price={parseFloat(product.priceRange.minVariantPrice.amount)}
                        currencyCode={product.priceRange.minVariantPrice.currencyCode}
                        handle={product.handle}
                        image={product.images.edges[0]?.node.url}
                      />
                    </div>
                  </div>
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
                We&apos;re adding new {category.title.toLowerCase()} products
                soon.
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

      {/* Explore by Age */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-6">Browse by Age</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                age: "3-5",
                title: "Early Explorers",
                subtitle: "Ages 3-5",
                color: "bg-cs-green",
              },
              {
                age: "6-8",
                title: "Young Builders",
                subtitle: "Ages 6-8",
                color: "bg-cs-blue",
              },
              {
                age: "9-12",
                title: "Junior Engineers",
                subtitle: "Ages 9-12",
                color: "bg-cs-orange",
              },
              {
                age: "13-plus",
                title: "Teen Innovators",
                subtitle: "Ages 13+",
                color: "bg-cs-purple",
              },
            ].map((ageGroup) => (
              <Link
                key={ageGroup.age}
                href={`/shop/age/${ageGroup.age}`}
                className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border hover:border-cs-orange"
              >
                <div
                  className={`w-10 h-10 ${ageGroup.color} rounded-lg mb-3`}
                ></div>
                <h3 className="font-semibold text-navy">{ageGroup.title}</h3>
                <p className="text-sm text-gray-500">{ageGroup.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
