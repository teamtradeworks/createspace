"use client";

import { useState } from "react";
import { capture, identify } from "@/lib/analytics";

export default function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      identify(email.trim(), { email: email.trim(), newsletter_subscriber: true });
      capture("newsletter_subscribed", { source: "homepage_band" });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="rounded-3xl bg-white/[0.06] ring-1 ring-white/10 p-8 md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-balance">Stay in the loop</h2>
              <p className="mt-3 max-w-md text-white/70 leading-relaxed">
                New kits, project ideas, and the occasional deal, straight to your inbox. No spam,
                and you can unsubscribe anytime.
              </p>
            </div>

            <div>
              {status === "success" ? (
                <div
                  className="rounded-2xl bg-white/10 p-6 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <p className="font-semibold">You&apos;re on the list.</p>
                  <p className="mt-1 text-sm text-white/70">
                    Thanks for subscribing. Keep an eye on your inbox.
                  </p>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      aria-label="Email address"
                      required
                      disabled={status === "loading"}
                      className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-white/50"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="whitespace-nowrap rounded-full bg-cs-orange px-7 py-3 font-semibold text-white transition-opacity hover:opacity-90 active:translate-y-px disabled:opacity-60"
                    >
                      {status === "loading" ? "Subscribing..." : "Subscribe"}
                    </button>
                  </form>
                  {status === "error" && (
                    <p className="mt-3 text-sm text-cs-red" role="alert">
                      {errorMessage}
                    </p>
                  )}
                  <p className="mt-3 text-xs text-white/40">No spam, ever. Unsubscribe anytime.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
