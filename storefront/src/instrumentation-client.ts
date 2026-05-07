// This file configures the initialization of Sentry and PostHog on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_IS_CI) {
  Sentry.init({
    dsn: "https://2968145764c6800df2684d1935e479c3@o4509821219700736.ingest.de.sentry.io/4510876520087632",

    // Add optional integrations for additional features
    integrations: [Sentry.replayIntegration()],

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,
    // Enable logs to be sent to Sentry
    enableLogs: true,

    // Define how likely Replay events are sampled.
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // Define how likely Replay events are sampled when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    // Enable sending user PII (Personally Identifiable Information)
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
    sendDefaultPii: true,

    // Filter out errors from third-party scripts we don't control
    ignoreErrors: [
      /Object\.keys\(this\.buckets\)/, // Fera reviews widget
      /Jsloader error/, // Google API script timeouts
      /Cannot read properties of null \(reading 'click'\)/, // Bot / browser extension noise
      /Java object is gone/, // Facebook in-app browser (Android) keyboard-logging hook
      /Java bridge method invocation error/, // Android WebView bridge from in-app browsers
      /window\.webkit\.messageHandlers/, // iOS WKWebView injected bridge
      /Failed to read the 'sessionStorage' property/, // Privacy mode / restricted in-app browsers
    ],
    denyUrls: [
      /fera\.js/,
      /apis\.google\.com/,
      // Browser extension assets — Next.js bundles live under /_next/static/.
      // app:///assets/<hash>.js is an injected extension (e.g. fm-ext-bridge).
      /^app:\/\/\/assets\//,
    ],
  });
}

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  api_host: "/ingest",
  ui_host: "https://eu.posthog.com",
  defaults: "2026-01-30",
  person_profiles: "always",
  capture_pageview: false, // We handle pageviews manually via PostHogPageview for SPA navigation
  capture_exceptions: true,
  session_recording: {},
  debug: process.env.NODE_ENV === "development",
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
