import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { WALL_PHOTOS } from "@/config/wall-photos";
import { BRANDS } from "@/config/brands";

// The customer photo wall is a hand-maintained list of local images keyed to
// Shopify handles. A renamed file, a typo'd path, a dupe, or a zero dimension
// degrades silently at runtime (broken image, doubled photo, or NaN aspect in
// the masonry) with no build or type error. These guard that class of drift.

const BRAND_KEYS = new Set(BRANDS.map((b) => b.key));

describe("WALL_PHOTOS", () => {
  it("has at least one photo", () => {
    expect(WALL_PHOTOS.length).toBeGreaterThan(0);
  });

  it("uses a unique src for every entry (no image shown twice)", () => {
    const srcs = WALL_PHOTOS.map((p) => p.src);
    expect(new Set(srcs).size).toBe(srcs.length);
  });

  it("points every src at a file that exists in public/", () => {
    const missing = WALL_PHOTOS.filter(
      (p) => !existsSync(join(process.cwd(), "public", p.src.replace(/^\//, ""))),
    ).map((p) => p.src);
    expect(missing).toEqual([]);
  });

  it("gives every entry a non-empty handle", () => {
    expect(WALL_PHOTOS.filter((p) => !p.handle?.trim()).map((p) => p.src)).toEqual([]);
  });

  it("uses a known brand key for every entry", () => {
    const unknown = WALL_PHOTOS.filter((p) => !BRAND_KEYS.has(p.brand)).map((p) => ({
      src: p.src,
      brand: p.brand,
    }));
    expect(unknown).toEqual([]);
  });

  it("has positive numeric dimensions (needed for the masonry aspect ratio)", () => {
    const bad = WALL_PHOTOS.filter(
      (p) => !Number.isFinite(p.width) || !Number.isFinite(p.height) || p.width <= 0 || p.height <= 0,
    ).map((p) => p.src);
    expect(bad).toEqual([]);
  });

  it("gives every entry non-empty alt text (decorative-free, for a11y)", () => {
    expect(WALL_PHOTOS.filter((p) => !p.alt?.trim()).map((p) => p.src)).toEqual([]);
  });
});
