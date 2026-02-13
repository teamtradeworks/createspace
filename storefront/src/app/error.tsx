"use client";

import * as Sentry from "@sentry/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden min-h-[60vh] flex items-center">
      <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 w-64 h-64 opacity-15">
        <Image
          src="/images/illustrations/robot-orange.png"
          alt=""
          width={256}
          height={256}
          className="object-contain"
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <span className="text-cs-orange font-medium text-sm uppercase tracking-wider">
          Something went wrong
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold text-navy mt-4 mb-6 leading-tight">
          Oops! We hit a snag
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-10">
          Something unexpected happened while loading this page. Give it another
          try — if the problem persists, please{" "}
          <Link href="/contact" className="text-cs-orange hover:underline">
            let us know
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-8 py-4 bg-cs-orange hover:bg-cs-orange/90 text-white rounded-lg font-semibold transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-navy hover:bg-navy/90 text-white rounded-lg font-semibold transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}
