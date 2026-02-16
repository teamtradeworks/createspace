"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased font-[Outfit,sans-serif]">
        {/* Static header bar — can't use full Header (needs CartProvider) */}
        <header className="bg-navy">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/logo-dark.png"
                alt="CREATESPACE"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </a>
          </div>
        </header>

        <main>
          <section className="py-24 md:py-32 min-h-[60vh] flex items-center">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <span className="text-[#FF8B00] font-medium text-sm uppercase tracking-wider">
                Something went wrong
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold text-[#0C1446] mt-4 mb-6 leading-tight">
                Oops! We hit a snag
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mb-10">
                Something unexpected happened. Please try refreshing the page —
                if the problem persists, contact us at{" "}
                <a
                  href="mailto:hello@thecreatespace.co.za"
                  className="text-[#FF8B00] hover:underline"
                >
                  hello@thecreatespace.co.za
                </a>
                .
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#FF8B00] hover:bg-[#FF8B00]/90 text-white rounded-lg font-semibold transition-colors"
                >
                  Go Home
                </a>
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
