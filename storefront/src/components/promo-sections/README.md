# Promo sections

Custom page sections that take over from a default section while a promo is live. A promo in `src/config/promo.ts` names them by id in its `sections` field:

```ts
{
  badge: "Black Friday Sale",
  // ...
  startsAt: "2026-11-19",
  endsAt: "2026-11-30",
  sections: { homeHero: "black-friday-home-hero" },
}
```

Between `startsAt` and `endsAt` (SAST) the page renders the promo's section in that slot. Before and after, and for any slot the promo leaves out, it renders the default section. The default sections are not changed by any of this.

## Slots

| Slot         | Where                  | Default section             |
| ------------ | ---------------------- | --------------------------- |
| `homeHero`   | Homepage hero          | `components/Hero.tsx`       |
| `shopHeader` | Header band on `/shop` | `components/ShopHeader.tsx` |

## Sections

| Id                         | Slot         | Component                   | Promo             |
| -------------------------- | ------------ | --------------------------- | ----------------- |
| `black-friday-home-hero`   | `homeHero`   | `BlackFridayHomeHero.tsx`   | Black Friday Sale |
| `black-friday-shop-header` | `shopHeader` | `BlackFridayShopHeader.tsx` | Black Friday Sale |

## Adding a section

1. Build the component in this folder, named after the promo and slot (e.g. `WinterSaleShopHeader.tsx`). It receives `{ promo }` (the live promo); use `promo.cta` for its button so it matches the promo strip and the nav pill.
2. Keep its copy and images in the component, not in the promo register. Put its images in `public/images/promos/<promo-slug>/`.
3. Add its id (kebab-case, `<promo>-<slot>`, e.g. `winter-sale-shop-header`) to `PROMO_SECTION_IDS` in `src/config/promo.ts`, and map the id to the component in `registry.ts`. The build fails if either side is missing.
4. Set `sections: { <slot>: "<id>" }` on the promo, and add a row to the table above.
5. Preview it by setting the promo's `startsAt` to today temporarily, then put the date back.

## Design guidelines

A promo section stands in for an everyday one for a week or two, so it should feel like the same site having a sale, not a different site.

- **Same size.** Match the default section's height and layout at phone, tablet and desktop widths (within a line or so). A hero that grows pushes the products down; a header that shrinks looks broken.
- **Same style.** Keep the default's background, spacing, type scale and brand illustrations, and change the message. Follow `storefront/DESIGN.md`: orange buttons, red for savings, yellow sparingly with navy text, Outfit SemiBold at most.
- **One `<h1>`.** The section replaces the page's heading, so it must contain exactly one `<h1>`, as the default does.
- **Keep the tracking.** Reuse the default's analytics events (for the hero, `home_page_hero_cta_clicked`) so reports compare like with like.
- **Copy matches the promo.** Any date or discount in the section must agree with the promo's dates and the strip copy. Follow the voice and tone guide, and no em dashes.
- **Works on mobile.** Check 320px, 390px, 768px, 1024px and 1440px.
- **Respect reduced motion.** Animate only under `prefers-reduced-motion: no-preference`.
