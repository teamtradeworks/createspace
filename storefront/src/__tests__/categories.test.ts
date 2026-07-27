import { describe, it, expect } from "vitest";
import { CATEGORIES, categoryMatchTags } from "@/config/categories";

describe("categoryMatchTags", () => {
  it("expands a merged category to all of its match tags", () => {
    expect(categoryMatchTags("robotics-coding")).toEqual(["robotics", "coding"]);
  });

  it("falls back to the id itself for a single-tag category", () => {
    expect(categoryMatchTags("chemistry")).toEqual(["chemistry"]);
  });

  it("falls back to the id for an unknown/legacy id so old links still resolve", () => {
    expect(categoryMatchTags("robotics")).toEqual(["robotics"]);
    expect(categoryMatchTags("coding")).toEqual(["coding"]);
  });
});

describe("CATEGORIES", () => {
  it("has unique ids", () => {
    const ids = CATEGORIES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("merges robotics and coding into a single category", () => {
    const ids = CATEGORIES.map((c) => c.id);
    expect(ids).toContain("robotics-coding");
    expect(ids).not.toContain("robotics");
    expect(ids).not.toContain("coding");
  });
});
