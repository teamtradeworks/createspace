"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const STORAGE_KEY = "createspace_email_popup";
const DELAY_MS = 15_000; // 15 seconds
const SUPPRESS_DAYS = 7;

function getSuppressionExpiry(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const { expiry } = JSON.parse(stored);
    return typeof expiry === "number" ? expiry : null;
  } catch {
    return null;
  }
}

function suppress() {
  const expiry = Date.now() + SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ expiry }));
}

function suppressForever() {
  // Set expiry far in the future for subscribed users
  const expiry = Date.now() + 365 * 10 * 24 * 60 * 60 * 1000;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ expiry }));
}

export default function EmailPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const hasTriggered = useRef(false);

  const lockScroll = useCallback(() => {
    document.documentElement.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    document.documentElement.style.overflow = "";
  }, []);

  const show = useCallback(() => {
    if (hasTriggered.current) return;
    const expiry = getSuppressionExpiry();
    if (expiry && Date.now() < expiry) return;
    hasTriggered.current = true;
    setVisible(true);
    lockScroll();
  }, [lockScroll]);

  // Force-show bypasses suppression (for manual triggers like footer link)
  const forceShow = useCallback(() => {
    setEmail("");
    setStatus("idle");
    setErrorMessage("");
    setVisible(true);
    lockScroll();
  }, [lockScroll]);

  const close = useCallback(() => {
    setVisible(false);
    unlockScroll();
    if (status !== "success") {
      const existingExpiry = getSuppressionExpiry();
      if (!existingExpiry || Date.now() >= existingExpiry) {
        suppress();
      }
    }
  }, [unlockScroll, status]);

  // Listen for manual open event (e.g. footer "Subscribe" link)
  useEffect(() => {
    function handleOpen() {
      forceShow();
    }
    window.addEventListener("open-email-popup", handleOpen);
    return () => window.removeEventListener("open-email-popup", handleOpen);
  }, [forceShow]);

  // Delay trigger
  useEffect(() => {
    const expiry = getSuppressionExpiry();
    if (expiry && Date.now() < expiry) return;

    const timer = setTimeout(show, DELAY_MS);
    return () => clearTimeout(timer);
  }, [show]);

  // Exit-intent on desktop
  useEffect(() => {
    const expiry = getSuppressionExpiry();
    if (expiry && Date.now() < expiry) return;

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) show();
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [show]);

  // Escape key
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

      setStatus("success");
      suppressForever();
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
        {/* Close button */}
        <button
          onClick={close}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 2l12 12M14 2L2 14" />
          </svg>
        </button>

        {/* Illustration */}
        <div className="mb-4 flex justify-center">
          <Image
            src="/images/illustrations/robot-blue.png"
            alt=""
            width={96}
            height={96}
            aria-hidden="true"
          />
        </div>

        {status === "success" ? (
          <div className="py-4 text-center">
            <h2 className="mb-2 text-2xl font-semibold">You&apos;re in!</h2>
            <p className="text-white/70">
              Keep an eye on your inbox for STEM deals and new arrivals.
            </p>
            <button
              onClick={close}
              className="mt-6 rounded-full bg-white px-6 py-2 font-semibold text-navy transition-opacity hover:opacity-90"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <h2 className="mb-2 text-center text-2xl font-semibold">
              Get 10% off your first order
            </h2>
            <p className="mb-6 text-center text-sm text-white/70">
              Join South African parents discovering STEM toys their kids actually love. Be the first to hear about new products and exclusive deals.
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
                {status === "loading" ? "Subscribing..." : "Get my discount"}
              </button>
            </form>

            {status === "error" && (
              <p className="mt-3 text-center text-sm text-cs-red">{errorMessage}</p>
            )}

            <p className="mt-4 text-center text-xs text-white/40">
              No spam, ever. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
