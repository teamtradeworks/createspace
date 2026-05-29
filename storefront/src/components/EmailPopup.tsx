"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { capture, identify } from "@/lib/analytics";

export default function EmailPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const lockScroll = useCallback(() => {
    document.documentElement.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    document.documentElement.style.overflow = "";
  }, []);

  const open = useCallback(() => {
    setEmail("");
    setStatus("idle");
    setErrorMessage("");
    setVisible(true);
    lockScroll();
    capture("email_popup_shown", { trigger: "manual" });
  }, [lockScroll]);

  const close = useCallback(() => {
    setVisible(false);
    unlockScroll();
    capture("email_popup_dismissed");
  }, [unlockScroll]);

  useEffect(() => {
    function handleOpen() {
      open();
    }
    window.addEventListener("open-email-popup", handleOpen);
    return () => window.removeEventListener("open-email-popup", handleOpen);
  }, [open]);

  useEffect(() => {
    if (!visible) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible, close]);

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
        setErrorMessage(data.error || "Something went wrong.");
        return;
      }

      identify(email.trim(), {
        email: email.trim(),
        newsletter_subscriber: true,
      });
      capture("newsletter_subscribed", { source: "email_popup" });
      setVisible(false);
      unlockScroll();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Subscribe to newsletter"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-2xl bg-navy p-8 pt-6 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M2 2l12 12M14 2L2 14" />
          </svg>
        </button>

        <div className="mb-4 flex justify-center">
          <Image
            src="/images/illustrations/robot-blue.png"
            alt=""
            width={96}
            height={96}
            aria-hidden="true"
          />
        </div>

        <h2 className="mb-2 text-center text-2xl font-semibold">Stay in the loop</h2>
        <p className="mb-6 text-center text-sm text-white/70">
          Join South African parents discovering STEM toys their kids actually love. Be the first
          to hear about new products and exclusive deals.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-white/50"
            disabled={status === "loading"}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-cs-orange py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {status === "error" && (
          <p className="mt-3 text-center text-sm text-cs-red">{errorMessage}</p>
        )}

        <p className="mt-4 text-center text-xs text-white/40">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
