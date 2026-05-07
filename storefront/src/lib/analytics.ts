// Lazy PostHog wrapper — avoids direct `import posthog from "posthog-js"` in
// component files, which would pull the full library into each component chunk.
//
// PostHog is initialized in instrumentation-client.ts.  The dynamic import()
// here resolves to the same cached module, so there is no extra network request,
// but webpack can code-split posthog-js out of the component bundles.

type Properties = Record<string, unknown>;

let mod: typeof import("posthog-js") | null = null;

async function ph() {
  if (!mod) mod = await import("posthog-js");
  return mod.default;
}

// Events that signal a visitor is shopping or has product intent. Listened to
// by EmailPopup (and potentially other components) to suppress interruptions.
const PURCHASE_INTENT_EVENTS = new Set([
  "product_viewed",
  "product_added_to_cart",
  "product_quick_added_to_cart",
]);

export function capture(event: string, properties?: Properties) {
  void ph().then((p) => p.capture(event, properties));
  if (typeof window !== "undefined" && PURCHASE_INTENT_EVENTS.has(event)) {
    window.dispatchEvent(new CustomEvent("cs:purchase-intent"));
  }
}

export function identify(distinctId: string, properties?: Properties) {
  void ph().then((p) => p.identify(distinctId, properties));
}

export function group(type: string, key: string, properties?: Properties) {
  void ph().then((p) => p.group(type, key, properties));
}
