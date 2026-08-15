// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV === "production" && !process.env.GITHUB_ACTIONS) {
  Sentry.init({
    dsn: "https://2968145764c6800df2684d1935e479c3@o4509821219700736.ingest.de.sentry.io/4510876520087632",

    // Sample traces at 10%. Tracing every request exhausted the Sentry ingest
    // quota (429s from the ingest API drop data silently).
    tracesSampleRate: 0.1,

    // Enable sending user PII (Personally Identifiable Information)
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
    sendDefaultPii: true,
  });
}
