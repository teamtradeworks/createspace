import { describe, it, expect } from "vitest";
import { getFitFacts, type FitProduct } from "@/lib/product-fit";

const base: FitProduct = {
  minAge: null,
  maxAge: null,
  batteriesRequired: null,
  batteriesIncluded: null,
  batteriesList: null,
  projects: null,
  guide: null,
  soldering: null,
  codingPlatform: null,
};

const battery = (label: string) => ({
  reference: { type: "battery", fields: [{ key: "label", value: label }] },
});

describe("getFitFacts", () => {
  it("returns nothing when no metafields are set", () => {
    expect(getFitFacts(base)).toEqual([]);
  });

  it("writes an age range in words", () => {
    expect(getFitFacts({ ...base, minAge: { value: "8" }, maxAge: { value: "12" } })).toEqual([
      { key: "age", label: "Age", value: "8 to 12" },
    ]);
  });

  it("writes an open-ended age as 'and up'", () => {
    expect(getFitFacts({ ...base, minAge: { value: "10" } })[0].value).toBe("10 and up");
    expect(
      getFitFacts({ ...base, minAge: { value: "10" }, maxAge: { value: "" } })[0].value,
    ).toBe("10 and up");
  });

  it("skips age when the minimum is not a number", () => {
    expect(getFitFacts({ ...base, minAge: { value: "abc" } })).toEqual([]);
  });

  it("says none needed when batteries are not required", () => {
    expect(getFitFacts({ ...base, batteriesRequired: { value: "false" } })).toEqual([
      { key: "batteries", label: "Batteries", value: "None needed" },
    ]);
  });

  it("names the battery and whether it is in the box", () => {
    expect(
      getFitFacts({
        ...base,
        batteriesRequired: { value: "true" },
        batteriesIncluded: { value: "false" },
        batteriesList: battery("1 x 9V"),
      })[0].value,
    ).toBe("1 x 9V, not in the box");
    expect(
      getFitFacts({
        ...base,
        batteriesRequired: { value: "true" },
        batteriesIncluded: { value: "true" },
        batteriesList: battery("3 x AA"),
      })[0].value,
    ).toBe("3 x AA, in the box");
  });

  it("falls back when the battery type is unknown", () => {
    expect(
      getFitFacts({ ...base, batteriesRequired: { value: "true" }, batteriesIncluded: null })[0]
        .value,
    ).toBe("Needed, not in the box");
    expect(
      getFitFacts({
        ...base,
        batteriesRequired: { value: "true" },
        batteriesIncluded: { value: "true" },
      })[0].value,
    ).toBe("In the box");
  });

  it("counts projects without repeating the word", () => {
    expect(getFitFacts({ ...base, projects: { value: "15" } })[0].value).toBe("15 projects");
    expect(getFitFacts({ ...base, projects: { value: "200+" } })[0].value).toBe("200+ projects");
    expect(getFitFacts({ ...base, projects: { value: "1" } })[0].value).toBe("1 project");
    expect(getFitFacts({ ...base, projects: { value: "26 projects" } })[0].value).toBe(
      "26 projects",
    );
    expect(getFitFacts({ ...base, projects: { value: "26+ models" } })[0].value).toBe(
      "26+ models",
    );
    expect(getFitFacts({ ...base, projects: { value: "12 experiments" } })[0].value).toBe(
      "12 experiments",
    );
  });

  it("passes guide and coding platform through and reads soldering as a yes or no", () => {
    const facts = getFitFacts({
      ...base,
      guide: { value: "170-page book" },
      codingPlatform: { value: "Scratch" },
      soldering: { value: "false" },
    });
    expect(facts).toEqual([
      { key: "guide", label: "Instructions", value: "170-page book" },
      { key: "coding", label: "Coding", value: "Scratch" },
      { key: "soldering", label: "Soldering", value: "None needed" },
    ]);
    expect(getFitFacts({ ...base, soldering: { value: "true" } })[0].value).toBe("Needed");
  });

  it("keeps the parent's reading order: age, batteries, projects, then the rest", () => {
    const keys = getFitFacts({
      ...base,
      codingPlatform: { value: "Block & Text" },
      projects: { value: "30" },
      minAge: { value: "6" },
      batteriesRequired: { value: "false" },
    }).map((f) => f.key);
    expect(keys).toEqual(["age", "batteries", "projects", "coding"]);
  });
});
