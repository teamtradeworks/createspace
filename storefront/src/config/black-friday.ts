// Black Friday 2026 sale page (/black-friday).
//
// The dates live on the BLACK_FRIDAY promo in config/promo.ts, which also puts
// the "Black Friday Sale" pill in the header nav and the promo strip on the
// homepage. Outside those dates the page returns a 404 and drops out of the
// sitemap, so nothing needs changing when the sale starts or ends.
//
// BLACK_FRIDAY_PRODUCTS picks which products appear. They show in the shop
// collection's order (the "Most loved" sort), and the page uses the shop's filter sidebar, so age, category
// and brand filtering come from the products' Shopify data and tags.
//
// The prices on the page come straight from Shopify (price + compare-at
// price), the same prices the checkout charges. Shopify's sale prices are
// scheduled in the RockitSales app (compare-at = `wasPrice`, price =
// `salePrice`, Rand incl. VAT); they're listed here for reference only.
//
// Was prices match Shopify's prices on 16 November 2026. For VinciBot,
// Tale-Bot Pro, the Creator and Inventor kits and the two Rock & Mineral
// products, Shopify was lower than the pricing sheet, so their sale prices
// apply the sheet's discount to the Shopify price, rounded to the nearest R10.

export type SaleProduct = { handle: string; wasPrice: number; salePrice: number };

export const BLACK_FRIDAY_PRODUCTS: SaleProduct[] = [
  { handle: "makerzoid-robot-master-tournament", wasPrice: 5580, salePrice: 4460 },
  { handle: "makerzoid-superbot-master-premium", wasPrice: 4480, salePrice: 3810 },
  { handle: "makerzoid-robot-master-premium", wasPrice: 2380, salePrice: 1900 },
  { handle: "makerzoid-superbot", wasPrice: 1480, salePrice: 1180 },
  { handle: "makerzoid-smart-robot-premium", wasPrice: 1380, salePrice: 1100 },
  { handle: "makerzoid-smart-robot", wasPrice: 980, salePrice: 830 },
  { handle: "makerzoid-diverse-building-blocks", wasPrice: 590, salePrice: 470 },
  { handle: "matatastudio-digital-microscope-mx2-as", wasPrice: 2980, salePrice: 2680 },
  { handle: "matatastudio-vincibot-coding-robot-set", wasPrice: 2550, salePrice: 2040 },
  { handle: "matatastudio-tale-bot-pro", wasPrice: 2250, salePrice: 1910 },
  { handle: "matatastudio-creator-kit-for-vincibot", wasPrice: 1270, salePrice: 1080 },
  { handle: "matatastudio-inventor-kit-for-vincibot", wasPrice: 1270, salePrice: 1080 },
  { handle: "matatastudio-activity-box", wasPrice: 780, salePrice: 660 },
  { handle: "snap-circuits-classic-300", wasPrice: 2500, salePrice: 2080 },
  { handle: "snap-circuits-arcade", wasPrice: 2500, salePrice: 2080 },
  { handle: "snap-circuits-my-home", wasPrice: 2000, salePrice: 1660 },
  { handle: "snap-circuits-explorer-junior", wasPrice: 1350, salePrice: 1220 },
  { handle: "snap-circuits-beginner", wasPrice: 850, salePrice: 770 },
  // Not on the pricing sheet: already marked down in Shopify.
  { handle: "arduino-sensor-kit-base", wasPrice: 1300, salePrice: 880 },
  { handle: "ultimate-mega-2560-starter-kit", wasPrice: 1500, salePrice: 1280 },
  { handle: "ultimate-uno-r3-starter-kit", wasPrice: 1300, salePrice: 1110 },
  { handle: "blockaroo-magnetic-foam-builders-trunk-set", wasPrice: 1950, salePrice: 1660 },
  { handle: "blockaroo-magnetic-foam-builders-castle", wasPrice: 1500, salePrice: 1200 },
  { handle: "blockaroo-magnetic-foam-builders-roadster", wasPrice: 750, salePrice: 600 },
  { handle: "blockaroo-magnetic-foam-builders-robot", wasPrice: 500, salePrice: 400 },
  { handle: "blockaroo-magnetic-foam-builders-airplane", wasPrice: 500, salePrice: 400 },
  { handle: "blockaroo-magnetic-foam-builders-tug-boat", wasPrice: 500, salePrice: 400 },
  { handle: "nasa-lunar-telescope", wasPrice: 1150, salePrice: 920 },
  { handle: "nasa-moon-sand-activity-kit", wasPrice: 320, salePrice: 260 },
  { handle: "national-geographic-mega-bug-habitat", wasPrice: 720, salePrice: 580 },
  { handle: "national-geographic-completely-gross-chemistry-set", wasPrice: 720, salePrice: 610 },
  { handle: "national-geographic-spy-science-activity-kit", wasPrice: 650, salePrice: 550 },
  { handle: "national-geographic-mega-space-activity-kit", wasPrice: 620, salePrice: 500 },
  { handle: "national-geographic-rock-mineral-starter-kit", wasPrice: 300, salePrice: 260 },
  { handle: "national-geographic-dino-fossil-dig-kit", wasPrice: 300, salePrice: 250 },
  { handle: "national-geographic-rock-mineral-starter-collection", wasPrice: 200, salePrice: 170 },
];

export const BLACK_FRIDAY_HANDLES: string[] = BLACK_FRIDAY_PRODUCTS.map((p) => p.handle);

