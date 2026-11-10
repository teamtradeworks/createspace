import { describe, expect, it } from "vitest";
import { PHONE_NUMBER, phoneLink } from "../lib/phone";

describe("phoneLink", () => {
  it("strips spaces from an international number", () => {
    expect(phoneLink("+27 81 587 5357")).toBe("tel:+27815875357");
  });

  it("strips dashes and brackets", () => {
    expect(phoneLink("+27 (81) 587-5357")).toBe("tel:+27815875357");
  });

  it("rewrites a local South African number with the 27 country code", () => {
    expect(phoneLink("081 587 5357")).toBe("tel:+27815875357");
  });

  it("builds a link from the configured number", () => {
    expect(phoneLink(PHONE_NUMBER)).toBe("tel:+27815875357");
  });
});
