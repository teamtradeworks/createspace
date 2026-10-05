"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { capture, identify } from "@/lib/analytics";
import { JOIN_PARAM, parseJoinEmail } from "@/lib/join-param";

type Toast = {
  kind: "subscribed" | "already-subscribed" | "error";
  email: string;
};

const TOAST_DURATION_MS = 8000;
// Longer than the exit animation in globals.css. Unmounts the toast even if
// animationend never fires (animations disabled by an extension, for example).
const EXIT_FALLBACK_MS = 400;

/**
 * Subscribes the address in `?join={email}` to the mailing list as soon as any
 * page loads with it, then confirms with a small toast. Mounted once in the
 * root layout so it works on every route. Must sit inside a Suspense boundary
 * because it reads the search params.
 */
export default function JoinFromLink() {
  const searchParams = useSearchParams();
  const rawJoin = searchParams.get(JOIN_PARAM);
  const [toast, setToast] = useState<Toast | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [retrying, setRetrying] = useState(false);
  // Guards against submitting the same address twice from one mount (React
  // Strict Mode re-runs effects in development, and the param can reappear on
  // a client-side navigation back to the same URL).
  const handledEmail = useRef<string | null>(null);

  const subscribe = useCallback(async (address: string) => {
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: address }),
      });
      const data = (await res.json()) as { alreadySubscribed?: boolean };

      if (!res.ok) {
        setToast({ kind: "error", email: address });
        return;
      }

      identify(address, { email: address, newsletter_subscriber: true });
      capture("newsletter_subscribed", {
        source: "join_link",
        already_subscribed: data.alreadySubscribed === true,
      });
      setToast({
        kind: data.alreadySubscribed ? "already-subscribed" : "subscribed",
        email: address,
      });
    } catch {
      setToast({ kind: "error", email: address });
    }
  }, []);

  useEffect(() => {
    const email = parseJoinEmail(rawJoin);
    if (!email || handledEmail.current === email) return;
    handledEmail.current = email;
    void subscribe(email);
  }, [rawJoin, subscribe]);

  // Welcome toasts dismiss themselves; an error stays until the visitor
  // dismisses it or retries, so the recovery isn't pulled away mid-read.
  const autoDismiss = toast !== null && toast.kind !== "error";

  useEffect(() => {
    if (!autoDismiss || leaving || retrying) return;
    const timer = setTimeout(() => setLeaving(true), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast, autoDismiss, leaving, retrying]);

  // Unmount once the exit animation has played, with a fallback in case it never does.
  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(() => {
      setToast(null);
      setLeaving(false);
    }, EXIT_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [leaving]);

  function handleAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
    // The robot's entrance also ends here; only the card's own exit counts.
    if (!leaving || e.target !== e.currentTarget) return;
    setToast(null);
    setLeaving(false);
  }

  async function retry(address: string) {
    setRetrying(true);
    await subscribe(address);
    setRetrying(false);
  }

  const isWelcome = toast?.kind === "subscribed" || toast?.kind === "already-subscribed";

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="join-toast"
      className="pointer-events-none fixed inset-x-4 bottom-5 z-50 flex justify-center sm:inset-x-6 sm:bottom-6"
    >
      {toast && (
        <div
          onAnimationEnd={handleAnimationEnd}
          className={`pointer-events-auto relative w-full max-w-md ${
            leaving ? "join-toast-out" : "join-toast-in"
          }`}
        >
          {isWelcome && (
            <Image
              src="/images/illustrations/robot-1.svg"
              alt=""
              aria-hidden="true"
              width={204}
              height={415}
              className="join-toast-robot absolute -top-9 left-4 z-10 h-[6.25rem] w-auto drop-shadow-[0_6px_10px_rgba(12,20,70,0.35)]"
            />
          )}

          <div className="relative overflow-hidden rounded-2xl bg-navy text-white shadow-[0_18px_40px_-14px_rgba(12,20,70,0.6)] ring-1 ring-white/10">
            {isWelcome && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-8 -top-14 h-36 w-36 rounded-full bg-cs-blue/20 blur-2xl"
              />
            )}

            <div
              className={`relative flex items-start gap-3 bg-white/[0.06] py-4 pr-3 ${
                isWelcome ? "pl-[5.25rem]" : "pl-4"
              }`}
            >
              {toast.kind === "error" && (
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-cs-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v4m0 4h.01M12 3l9 16H3L12 3z"
                  />
                </svg>
              )}

              <div className="min-w-0 flex-1">
                {toast.kind === "subscribed" && (
                  <>
                    <p className="text-base font-semibold leading-snug">You&apos;re on the list!</p>
                    <p className="mt-1 break-words text-sm leading-snug text-white/70">
                      New kits and the occasional deal, straight to{" "}
                      <span className="font-medium text-cs-blue">{toast.email}</span>. No spam,
                      ever.
                    </p>
                  </>
                )}
                {toast.kind === "already-subscribed" && (
                  <>
                    <p className="text-base font-semibold leading-snug">
                      You&apos;re already on the list
                    </p>
                    <p className="mt-1 break-words text-sm leading-snug text-white/70">
                      <span className="font-medium text-cs-blue">{toast.email}</span> is signed up.
                      Keep an eye on your inbox.
                    </p>
                  </>
                )}
                {toast.kind === "error" && (
                  <>
                    <p className="text-base font-semibold leading-snug">
                      We couldn&apos;t add you just now
                    </p>
                    <p className="mt-1 break-words text-sm leading-snug text-white/70">
                      Something went wrong signing up{" "}
                      <span className="font-medium text-white">{toast.email}</span>.
                    </p>
                    <button
                      type="button"
                      onClick={() => retry(toast.email)}
                      disabled={retrying}
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-cs-orange px-3.5 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cs-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy disabled:opacity-60"
                    >
                      {retrying ? "Trying again…" : "Try again"}
                    </button>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={() => setLeaving(true)}
                className="-mr-1 -mt-1.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cs-blue"
                aria-label="Dismiss"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M2 2l12 12M14 2L2 14" />
                </svg>
              </button>
            </div>

            {autoDismiss && !leaving && (
              <div
                aria-hidden="true"
                className="join-toast-timer absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cs-orange to-cs-yellow"
                style={{ "--join-toast-duration": `${TOAST_DURATION_MS}ms` } as React.CSSProperties}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
