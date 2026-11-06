import type { BatteryMetaobject, Metafield } from "./shopify";

/**
 * The parent's fit questions, answered from Shopify metafields in plain words.
 * Rendered in the product hero above the price so the "is this right for my
 * child?" facts come before the ask.
 */

type FitFactKey = "age" | "batteries" | "projects" | "guide" | "coding" | "soldering";

type FitFact = {
  key: FitFactKey;
  label: string;
  value: string;
};

export type FitProduct = {
  minAge: Metafield;
  maxAge: Metafield;
  batteriesRequired: Metafield;
  batteriesIncluded: Metafield;
  batteriesList: { reference: BatteryMetaobject } | null;
  projects: Metafield;
  guide: Metafield;
  soldering: Metafield;
  codingPlatform: Metafield;
};

function ageValue(product: FitProduct): string | null {
  if (!product.minAge?.value) return null;
  const min = parseInt(product.minAge.value, 10);
  if (isNaN(min)) return null;
  const max = product.maxAge?.value ? parseInt(product.maxAge.value, 10) : NaN;
  if (isNaN(max)) return `${min} and up`;
  return `${min} to ${max}`;
}

function batteryValue(product: FitProduct): string | null {
  // Metafield absent entirely: say nothing rather than guess.
  if (product.batteriesRequired === null) return null;

  const required = product.batteriesRequired?.value === "true";
  if (!required) return "None needed";

  const included = product.batteriesIncluded?.value === "true";
  const fields = product.batteriesList?.reference?.fields ?? [];
  const type =
    fields.find((f) => f.key === "label" || f.key === "name" || f.key === "title" || f.key === "type")
      ?.value ?? "";

  const where = included ? "in the box" : "not in the box";
  return type ? `${type}, ${where}` : included ? "In the box" : "Needed, not in the box";
}

function projectsValue(product: FitProduct): string | null {
  const raw = product.projects?.value?.trim();
  if (!raw) return null;
  // Only a bare count gets the word added; "26+ models" or "12 experiments" stand as written.
  if (!/^\d+\+?$/.test(raw)) return raw;
  return raw === "1" ? "1 project" : `${raw} projects`;
}

export function getFitFacts(product: FitProduct): FitFact[] {
  const facts: FitFact[] = [];

  const age = ageValue(product);
  if (age) facts.push({ key: "age", label: "Age", value: age });

  const batteries = batteryValue(product);
  if (batteries) facts.push({ key: "batteries", label: "Batteries", value: batteries });

  const projects = projectsValue(product);
  if (projects) facts.push({ key: "projects", label: "Projects", value: projects });

  const guide = product.guide?.value?.trim();
  if (guide) facts.push({ key: "guide", label: "Instructions", value: guide });

  const coding = product.codingPlatform?.value?.trim();
  if (coding) facts.push({ key: "coding", label: "Coding", value: coding });

  const soldering = product.soldering?.value;
  if (soldering !== undefined && soldering !== null) {
    facts.push({
      key: "soldering",
      label: "Soldering",
      value: soldering === "true" ? "Needed" : "None needed",
    });
  }

  return facts;
}
