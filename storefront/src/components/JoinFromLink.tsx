"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { capture, identify } from "@/lib/analytics";
import { JOIN_PARAM, parseJoinEmail } from "@/lib/join-param";

type Toast = {
  kind: "subscribed" | "already-subscribed" | "error";
  email: string;
};

const TOAST_DURATION_MS = 8000;

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
  // Guards against submitting the same address twice from one mount (React
  // Strict Mode re-runs effects in development, and the param can reappear on
  // a client-side navigation back to the same URL).
  const handledEmail = useRef<string | null>(null);

  useEffect(() => {
    const email = parseJoinEmail(rawJoin);
    if (!email || handledEmail.current === email) return;
    handledEmail.current = email;

    async function subscribe(address: string) {
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
    }

    void subscribe(email);
  }, [rawJoin]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="join-toast"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md transition-all duration-300 ${
        toast
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      {toast && (
        <div className="flex items-start gap-3 bg-navy text-white text-sm px-4 py-3 rounded-xl shadow-lg">
          {toast.kind === "error" ? (
            <svg
              className="w-5 h-5 text-cs-red flex-shrink-0"
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
          ) : (
            <svg
              className="w-5 h-5 text-cs-green flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}

          <div className="min-w-0 flex-1">
            {toast.kind === "subscribed" && (
              <>
                <p className="font-semibold">You&apos;re on the list!</p>
                <p className="mt-0.5 text-white/70 break-words">
                  New kits and the occasional deal will land in {toast.email}. No spam, ever.
                </p>
              </>
            )}
            {toast.kind === "already-subscribed" && (
              <>
                <p className="font-semibold">You&apos;re already on the list</p>
                <p className="mt-0.5 text-white/70 break-words">
                  {toast.email} is signed up. Keep an eye on your inbox.
                </p>
              </>
            )}
            {toast.kind === "error" && (
              <>
                <p className="font-semibold">We couldn&apos;t add you just now</p>
                <p className="mt-0.5 text-white/70 break-words">
                  Something went wrong signing up {toast.email}. Please try again a little later.
                </p>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setToast(null)}
            className="-mr-1 -mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
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
      )}
    </div>
  );
}
