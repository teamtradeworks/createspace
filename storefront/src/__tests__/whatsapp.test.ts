import { describe, expect, it } from "vitest";
import { WHATSAPP_NUMBER, whatsappLink, whatsappMessageFor } from "../lib/whatsapp";

describe("whatsappLink", () => {
  it("strips spaces and the plus sign from an international number", () => {
    expect(whatsappLink("+27 82 123 4567", "Hi")).toBe("https://wa.me/27821234567?text=Hi");
  });

  it("strips dashes and brackets", () => {
    expect(whatsappLink("+27 (82) 123-4567", "Hi")).toBe("https://wa.me/27821234567?text=Hi");
  });

  it("rewrites a local South African number with the 27 country code", () => {
    expect(whatsappLink("082 123 4567", "Hi")).toBe("https://wa.me/27821234567?text=Hi");
  });

  it("encodes the message", () => {
    expect(whatsappLink("+27821234567", "Hi there & thanks?")).toBe(
      "https://wa.me/27821234567?text=Hi%20there%20%26%20thanks%3F",
    );
  });

  it("uses a default greeting when no message is given", () => {
    expect(whatsappLink("+27821234567")).toBe(
      "https://wa.me/27821234567?text=Hi%20CREATESPACE%2C%20I%20have%20a%20question.",
    );
  });

  it("builds a link from the configured number", () => {
    expect(whatsappLink(WHATSAPP_NUMBER)).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
  });
});

describe("whatsappMessageFor", () => {
  it("links the product on a product page", () => {
    expect(whatsappMessageFor("/product/snap-circuits-classic-300")).toBe(
      "Hi CREATESPACE, I have a question about https://thecreatespace.co.za/product/snap-circuits-classic-300",
    );
  });

  it("uses the default greeting elsewhere", () => {
    expect(whatsappMessageFor("/shop")).toBe("Hi CREATESPACE, I have a question.");
    expect(whatsappMessageFor("/")).toBe("Hi CREATESPACE, I have a question.");
  });
});
