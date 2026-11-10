// Office phone contact. The number is configured in site.json; edit it there
// and every link on the site (contact page, footer, structured data) picks it up.

import siteConfig from "@/config/site.json";

/** The number as people read it, e.g. "+27 81 587 5357". */
export const PHONE_NUMBER = siteConfig.phone.number;

/**
 * Builds a click-to-call link (tel:+27...). Spaces, dashes and brackets are
 * stripped, and a local South African number (starting with 0) is rewritten
 * with the +27 country code so it dials correctly from any phone.
 */
export function phoneLink(number: string): string {
  let digits = number.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `27${digits.slice(1)}`;
  return `tel:+${digits}`;
}
