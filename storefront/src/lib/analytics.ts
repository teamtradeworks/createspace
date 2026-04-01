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

export function capture(event: string, properties?: Properties) {
  void ph().then((p) => p.capture(event, properties));
}

export function identify(distinctId: string, properties?: Properties) {
  void ph().then((p) => p.identify(distinctId, properties));
}

export function group(type: string, key: string, properties?: Properties) {
  void ph().then((p) => p.group(type, key, properties));
}
