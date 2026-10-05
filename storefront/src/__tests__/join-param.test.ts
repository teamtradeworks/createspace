import { describe, expect, it } from "vitest";
import { JOIN_PARAM, parseJoinEmail } from "../lib/join-param";

describe("parseJoinEmail", () => {
  it("returns a plain email address unchanged", () => {
    expect(parseJoinEmail("dave@example.com")).toBe("dave@example.com");
  });

  it("trims surrounding whitespace", () => {
    expect(parseJoinEmail("  dave@example.com\n")).toBe("dave@example.com");
  });

  it("restores a plus sign that the query string decoded to a space", () => {
    // `?join=dave+kits@example.com` reaches URLSearchParams as "dave kits@example.com"
    expect(parseJoinEmail("dave kits@example.com")).toBe("dave+kits@example.com");
    expect(new URLSearchParams("join=dave+kits@example.com").get(JOIN_PARAM)).toBe(
      "dave kits@example.com",
    );
  });

  it("keeps a percent-encoded plus sign as is", () => {
    const value = new URLSearchParams("join=dave%2Bkits%40example.com").get(JOIN_PARAM);
    expect(parseJoinEmail(value)).toBe("dave+kits@example.com");
  });

  it("returns null when the parameter is missing or empty", () => {
    expect(parseJoinEmail(null)).toBeNull();
    expect(parseJoinEmail(undefined)).toBeNull();
    expect(parseJoinEmail("")).toBeNull();
    expect(parseJoinEmail("   ")).toBeNull();
  });

  it("returns null for values that are not an email address", () => {
    expect(parseJoinEmail("hello")).toBeNull();
    expect(parseJoinEmail("dave@")).toBeNull();
    expect(parseJoinEmail("@example.com")).toBeNull();
    expect(parseJoinEmail("dave@example")).toBeNull();
    expect(parseJoinEmail("dave@@example.com")).toBeNull();
    expect(parseJoinEmail("true")).toBeNull();
  });
});
