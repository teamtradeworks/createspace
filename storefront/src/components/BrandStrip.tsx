import Image from "next/image";
import BrandLink from "@/components/BrandLink";
import { BRANDS } from "@/config/brands";

export default function BrandStrip() {
  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:gap-16">
          <div className="mb-8 lg:mb-0 lg:max-w-xs flex-shrink-0">
            <h2 className="text-2xl font-semibold text-navy mb-2">
              Official suppliers, genuine products
            </h2>
            <p className="text-sm text-gray-600">
              We are registered South African suppliers of these brands. Every product is authentic
              and covered by full manufacturer support.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            {BRANDS.map((brand) => {
              const logo = (
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={48}
                  className="h-8 md:h-10 w-auto max-w-[110px] md:max-w-[130px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              );
              return brand.vendor ? (
                <BrandLink key={brand.name} brand={brand.name} vendor={brand.vendor}>
                  {logo}
                </BrandLink>
              ) : (
                <div key={brand.name}>{logo}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
