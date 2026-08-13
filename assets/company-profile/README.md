# CREATESPACE company profile (A4, 2 pages)

A two-page A4 company profile, built as HTML so the copy can be edited and re-exported without design software.

- **Page 1** is the company overview: positioning, vision and mission, what we offer families and schools,
  the warehouse photo and team, the brand wall, and registered company details.
- **Page 2** is leadership and references: short bios for the two directors, and five named testimonials.

## Where this lives, and why

This folder is a self-contained deliverable under `assets/`, sitting as a peer to `ad-creative`, `brand`,
`courses`, `design`, `existing-website`, `inspiration` and `product`. Two conventions put it here:

- `assets/` is working and source material that the website does not serve. The root `CLAUDE.md` states that
  images in `assets/` must be copied into `storefront/public/images/` before any page can use them, so a
  print deliverable belongs on the `assets/` side of that line.
- `assets/ad-creative/makerzoid-sale/` set the precedent for bundling a deliverable's own font and logo
  copies rather than reaching across the repo. This folder follows that pattern, which is why
  `assets/fonts/` and `assets/img/` duplicate files that also exist in `assets/design/`. The duplication is
  deliberate: it keeps the build reproducible if the shared asset folders are ever reorganised.

### What is committed

The HTML, `build.sh`, this README, and the bundled fonts and images are all tracked, as is the PDF, so that
someone without Chrome can still get the deliverable. The PNG is **gitignored** (see the root `.gitignore`)
because it is a 1.2MB review artefact that `build.sh` regenerates from the same source.

The PDF is about 2.2MB and `build.sh` rewrites it on every run. Rebuild and commit it at deliberate points
rather than on every wording tweak, or the history fills up with near-identical binaries.

### Putting it on the website

Nothing here is reachable from the storefront. To offer the profile as a download, copy the PDF to
`storefront/public/` and link it from there:

```bash
cp CREATESPACE-Company-Profile.pdf ../../storefront/public/company-profile.pdf
```

That copy is a separate, deliberate step, per the `assets/` rule above. If you do it, remember it becomes a
second file to refresh whenever the profile changes.

## Files

| File | Purpose |
|------|---------|
| `company-profile.html` | Source. Edit this. |
| `CREATESPACE-Company-Profile.pdf` | Print and email ready, A4 |
| `CREATESPACE-Company-Profile.png` | Screen preview of both pages stacked (1588 x 4492, 2x A4) |
| `build.sh` | Regenerates both exports from the HTML |
| `assets/fonts/` | Outfit (Regular, Medium, SemiBold, Bold), embedded via `@font-face` |
| `assets/img/` | Logo, team photo, and the four illustrations the page actually uses (`ROBOT-1`, `ATOM-1`, `CHIP-1`, `NUT-1`). `team-source.jpg` serves both the page 1 photo and the page 2 portrait crops |
| `assets/img/brands/` | The ten brand logos, copied from the redesign branch |

## Regenerating the exports

```bash
./build.sh
```

Needs Google Chrome at `/Applications/Google Chrome.app`. The script prints to PDF at A4 with no browser
header or footer, then screenshots a 2x PNG.

## Editing notes

- Each page is a fixed `210mm x 297mm` box with `overflow: hidden`, so **anything that doesn't fit is silently
  clipped**. Re-run `build.sh` and look at the PNG after every copy change.
- Page breaks are driven by `break-after: page` on `.page`, cancelled on `.page:last-of-type`. Do not add
  margins between pages: any vertical space beyond `2 x 297mm` makes Chrome emit a third, blank page.
- Vertical space is distributed by the `gap` on `.body`. If a section grows, shrink that gap or cut copy
  elsewhere rather than letting the page overflow.
- Colours are the brand palette, declared as CSS custom properties in `:root`.
- Brand logos live in `assets/img/brands/`. They must sit on a **white** background: several have their own
  white boxes baked in (micro:bit, ELECFREAKS, matata studio) and Makerzoid is dark artwork that disappears
  on navy. Do not move the grid onto the navy footer.
- Illustrations come from `assets/design/ILLUSTRATIONS/ELEMENTS/SVG/`. The team photo is the unlabelled
  version of `storefront/public/images/about/team-createspace.jpg`, with names set as text in the roster
  rather than baked into the image.
- Copy follows `assets/brand/voice-and-tone.md`, which bans em and en dashes outright. There are none in the
  page, so please don't reintroduce them when editing.

## Page 2: portraits, bios and references

**Portraits are crops of the group photo, not headshots.** There are no individual headshots in the repo, so
each 24mm circle is an absolutely-positioned `<img>` of `team-source.jpg` (the full 1400 x 1050 original),
laid out 168mm wide so the circle frames a roughly 200px region. The `left`/`top` offsets in
`.portrait-dave img` and `.portrait-dylan img` aim the crop; recompute them if the source photo changes.
At 200 source pixels for a 24mm circle this is about 70% of ideal print resolution, so it is slightly soft.
**Replacing these with real headshots is the single biggest quality win available on page 2.**

A CSS `background-image` at `background-size: 560%` was tried first and rendered blank in the print output.
The `<img>` sprite approach is the reliable one. Do not switch back.

**The leader bios are assembled from public web sources and have not been verified by Dave or Dylan.**
LinkedIn blocks automated access (it returns HTTP 999), so nothing was read from their profiles directly.
Details came from search results, aggregator sites and Dylan's own site, `dylanbrent.com`. Aggregator data
is often stale, so both bios need the person's own sign-off before this document goes to anyone.

Dave's bio is the exception: the wording was supplied by Dave directly, so treat it as authoritative over
anything the public sources say. Note in particular that he **co-founded** WhereIsMyTransport, which the
aggregator data did not show at all. Dylan's bio drops the claim that he consults independently, because LinkedIn
and ZoomInfo list him as Founder and Managing Director of Lost Collective while his own site presents him as
an independent consultant; the page now states only the Lost Collective founding, which both sources agree on.

Dave's bio carries an inline link on the word "Keel", pointing at `https://keel.so`. It inherits the body
weight so it does not read as emphasis, which means **the link is invisible on paper**. Print the domain in
the sentence if the profile is handed out as hard copy more often than emailed.

The PDF carries five link annotations in total: both LinkedIn profiles, `keel.so`, and
`www.thecreatespace.co.za` in each of the two footers. Use the `www.` host, not the apex: the site
canonicalises to `www.` and the apex returns a redirect.

Each bio ends with a LinkedIn link. These are real PDF link annotations, not just styled text, so they are
clickable in the exported PDF. The glyph is inline SVG, so there is no image dependency.

**The five references are copied verbatim from `storefront/src/components/HomeTestimonials.tsx`.** That file
is the source of truth. If a quote is edited or removed there, update it here too. The page states the quotes
are "published with their agreement". Make sure that is actually true for print and PDF use, not just for
the website.

## Facts to keep current

These appear on the page and will go stale:

- **120+ schools supplied** and **R 8m+ annual recurring revenue.** Supplied by Dave, not derived from
  anything in this repo, so nothing here can validate them. Both are the kind of figure a school's
  procurement officer or a supplier assessing credit may ask you to substantiate, so keep a defensible
  source for each and refresh them at least annually. Note also that "annual recurring revenue" is SaaS
  terminology; a finance reader looking at a product business would normally expect "annual revenue" or
  "annual turnover". Swap the label if that reads better to the audience.
- **Founded 2021.** Derived from the CIPC registration number `2021/432299/07`. Check the incorporation
  certificate if an exact date is ever needed, and note whether the business traded before it was registered.
- **65+ STEM products.** A deliberately conservative count. Verify against the live Shopify catalogue.
- **10 brands, shown as logos.** MatataStudio, Makerzoid, BBC micro:bit, ELECFREAKS, Snap Circuits,
  Arduino, National Geographic, Blockaroo, NASA, Robotico. This list and its order come from
  `storefront/src/config/brands.ts` on the `claude/website-redesign-strategy-b6c5a1` branch, which is the
  canonical brand list. Logo files were copied from that branch's `storefront/public/images/brands/`.
  If a brand is added or dropped there, update the grid here to match.
- **The distributor claim.** The page states that CREATESPACE is an official, registered distributor for
  every brand shown. Keep the logo grid and that sentence in sync: if a brand is stocked without a
  distribution agreement, it cannot sit under that line.
- **Team roster,** in page order: Dave New (Founder), Dylan Brent (Marketing director), Larize de Wet
  (Operations and procurement), Hayley New (Brand and marketing). Dave's dot is red and Dylan's is blue to
  match their portrait rings on page 2; keep that pairing if the order changes again.
- **Trading address.** Unit 12, Platinum Park, 65 Oak Street, Somerset West, 7130. Supplied by Dave and
  reflowed from five lines onto three to fit the footer rhythm. It replaced the old "Partners and social"
  column, so the Robotixkids and Inspire Africa credit and the `@thecreatespace.za` handle are no longer
  anywhere on the profile. The province line was dropped from Company details to avoid stating the location
  twice.
- **Delivery rates.** No longer shown anywhere on the profile, but if delivery copy is ever added back it
  must mirror `storefront/src/config/site.json`.
