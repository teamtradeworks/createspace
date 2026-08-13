import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsubscribed | CREATESPACE",
  description: "You have been successfully unsubscribed from CREATESPACE emails.",
};

export default function UnsubscribePage() {
  return (
    <section className="bg-navy text-white py-24 md:py-32 relative overflow-hidden min-h-[60vh] flex items-center">
      <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 w-64 h-64 opacity-15">
        <Image
          src="/images/illustrations/robot-blue.png"
          alt=""
          width={256}
          height={256}
          className="object-contain"
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <span className="text-cs-blue font-medium text-sm uppercase tracking-wider">
          Unsubscribed
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 leading-tight">
          You&apos;ve been unsubscribed
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mb-10">
          You&apos;ve been successfully removed from our mailing list. We&apos;re sad to see you go,
          but you won&apos;t hear from us again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 text-white rounded-lg font-semibold transition-colors"
          >
            Browse Shop
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}
