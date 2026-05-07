import { describe, expect, it } from "vitest";
import { isPopupExcludedPath, isPopupScrollTriggerPath } from "../lib/popup-targeting";

describe("isPopupExcludedPath", () => {
  it("excludes any product detail page", () => {
    expect(isPopupExcludedPath("/product/makerzoid-robot-master-premium")).toBe(true);
    expect(isPopupExcludedPath("/product/arduino-starter-kit")).toBe(true);
  });

  it("excludes the cart page exactly", () => {
    expect(isPopupExcludedPath("/cart")).toBe(true);
  });

  it("excludes checkout and any nested checkout path", () => {
    expect(isPopupExcludedPath("/checkout")).toBe(true);
    expect(isPopupExcludedPath("/checkout/confirmation")).toBe(true);
  });

  it("excludes account pages (existing customers)", () => {
    expect(isPopupExcludedPath("/account/orders")).toBe(true);
    expect(isPopupExcludedPath("/account/unsubscribe")).toBe(true);
  });

  it("excludes the downloads page (existing customers)", () => {
    expect(isPopupExcludedPath("/downloads")).toBe(true);
  });

  it("does not exclude the homepage or browse pages", () => {
    expect(isPopupExcludedPath("/")).toBe(false);
    expect(isPopupExcludedPath("/shop")).toBe(false);
    expect(isPopupExcludedPath("/shop?brand=Makerzoid")).toBe(false);
    expect(isPopupExcludedPath("/education")).toBe(false);
    expect(isPopupExcludedPath("/about")).toBe(false);
    expect(isPopupExcludedPath("/contact")).toBe(false);
    expect(isPopupExcludedPath("/search")).toBe(false);
  });

  it("does not match unrelated paths that share a prefix", () => {
    expect(isPopupExcludedPath("/products")).toBe(false);
    expect(isPopupExcludedPath("/cart-items")).toBe(false);
    expect(isPopupExcludedPath("/checkout-help")).toBe(false);
    expect(isPopupExcludedPath("/accountancy")).toBe(false);
  });

  it("treats null and empty pathnames as not excluded", () => {
    expect(isPopupExcludedPath(null)).toBe(false);
    expect(isPopupExcludedPath(undefined)).toBe(false);
    expect(isPopupExcludedPath("")).toBe(false);
  });
});

describe("isPopupScrollTriggerPath", () => {
  it("matches the homepage", () => {
    expect(isPopupScrollTriggerPath("/")).toBe(true);
  });

  it("matches the shop page", () => {
    expect(isPopupScrollTriggerPath("/shop")).toBe(true);
  });

  it("does not match other browse pages or PDPs", () => {
    expect(isPopupScrollTriggerPath("/education")).toBe(false);
    expect(isPopupScrollTriggerPath("/product/foo")).toBe(false);
    expect(isPopupScrollTriggerPath("/about")).toBe(false);
    expect(isPopupScrollTriggerPath("/downloads")).toBe(false);
  });

  it("does not match nullish input", () => {
    expect(isPopupScrollTriggerPath(null)).toBe(false);
    expect(isPopupScrollTriggerPath(undefined)).toBe(false);
  });
});
