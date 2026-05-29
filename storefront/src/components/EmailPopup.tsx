"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { capture, identify } from "@/lib/analytics";
import { safeGetItem, safeSetItem } from "@/lib/safe-storage";
import { isPopupExcludedPath, isPopupScrollTriggerPath } from "@/lib/popup-targeting";

const STORAGE_KEY = "createspace_email_popup";
const FALLBACK_DELAY_MS = 60_000; // 60 seconds — only fires if nothing more meaningful happens first
const SCROLL_TRIGGER_THRESHOLD = 0.5; // 50% scroll on / or /shop counts as engagement
const PAGEVIEW_TRIGGER_THRESHOLD = 2; // 2nd non-excluded pageview = clicked through = engaged
const SUPPRESS_DAYS = 7;

function getSuppressionExpiry(): number | null {
  const stored = safeGetItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    const { expiry } = JSON.parse(stored);
    return typeof expiry === "number" ? expiry : null;
  } catch {
    return null;
  }
}

function suppress() {
  const expiry = Date.now() + SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
  safeSetItem(STORAGE_KEY, JSON.stringify({ expiry }));
}

function suppressForever() {
  // Far-future expiry for subscribed users
  const expiry = Date.now() + 365 * 10 * 24 * 60 * 60 * 1000;
  safeSetItem(STORAGE_KEY, JSON.stringify({ expiry }));
}

type PopupTrigger =
  | "engagement_pageview"
  | "engagement_scroll"
  | "delay_fallback"
  | "exit_intent"
  | "manual";

export default function EmailPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const hasTriggered = useRef(false);
  // Set when the visitor has shown product/purchase intent during this session
  // (visited a PDP, used quick-add, or added to cart). Suppresses the popup
  // for the rest of the session — we don't pull active shoppers out of flow.
  const sessionIntentRef = useRef(false);
  // Counts non-excluded pageviews seen since mount; the popup mounts once in
  // layout.tsx, so this persists across client-side navigations.
  const pageviewCountRef = useRef(0);

  const pathname = usePathname();

  const lockScroll = useCallback(() => {
    document.documentElement.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    document.documentElement.style.overflow = "";
  }, []);

  const tryShow = useCallback(
    (trigger: PopupTrigger) => {
      if (hasTriggered.current) return;
      if (sessionIntentRef.current) return;
      if (typeof window !== "undefined" && isPopupExcludedPath(window.location.pathname)) return;
      const expiry = getSuppressionExpiry();
      if (expiry && Date.now() < expiry) return;
      hasTriggered.current = true;
      setVisible(true);
      lockScroll();
      capture("email_popup_shown", { trigger });
    },
    [lockScroll],
  );

  // Force-show bypasses every suppression rule (for manual triggers like footer link)
  const forceShow = useCallback(() => {
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
    const existingExpiry = getSuppressionExpiry();
    if (!existingExpiry || Date.now() >= existingExpiry) {
      suppress();
    }
  }, [unlockScroll]);

  // Listen for manual open event (e.g. footer "Subscribe" link)
  useEffect(() => {
    function handleOpen() {
      forceShow();
    }
    window.addEventListener("open-email-popup", handleOpen);
    return () => window.removeEventListener("open-email-popup", handleOpen);
  }, [forceShow]);

  // Listen for purchase-intent events dispatched by the analytics wrapper.
  // Marks the session as "shopping in progress" so future triggers no-op.
  useEffect(() => {
    function handleIntent() {
      sessionIntentRef.current = true;
    }
    window.addEventListener("cs:purchase-intent", handleIntent);
    return () => window.removeEventListener("cs:purchase-intent", handleIntent);
  }, []);

  // Engagement trigger: 2nd non-excluded pageview in the session.
  useEffect(() => {
    if (!pathname) return;
    if (isPopupExcludedPath(pathname)) return;
    pageviewCountRef.current += 1;
    if (pageviewCountRef.current < PAGEVIEW_TRIGGER_THRESHOLD) return;
    // Defer past the current render to avoid triggering a second render
    // while React is still committing this one.
    const handle = setTimeout(() => tryShow("engagement_pageview"), 0);
    return () => clearTimeout(handle);
  }, [pathname, tryShow]);

  // Engagement trigger: 50% scroll on / or /shop.
  useEffect(() => {
    if (!isPopupScrollTriggerPath(pathname)) return;

    function handleScroll() {
      const total = document.documentElement.scrollHeight;
      const scrolled = window.scrollY + window.innerHeight;
      if (total > 0 && scrolled / total >= SCROLL_TRIGGER_THRESHOLD) {
        tryShow("engagement_scroll");
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, tryShow]);

  // Fallback delay — only fires if no engagement signal arrived first.
  useEffect(() => {
    const timer = setTimeout(() => tryShow("delay_fallback"), FALLBACK_DELAY_MS);
    return () => clearTimeout(timer);
  }, [tryShow]);

  // Exit-intent on desktop — last-chance capture before window closes.
  useEffect(() => {
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) tryShow("exit_intent");
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [tryShow]);

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

      suppressForever();
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
        {/* Close button */}
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

        <h2 className="mb-2 text-center text-2xl font-semibold">Stay in the loop</h2>
        <p className="mb-6 text-center text-sm text-white/70">
          Join South African parents discovering STEM toys their kids actually love. Be the first to
          hear about new products and exclusive deals.
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
