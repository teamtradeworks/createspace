---
name: CREATESPACE
description: South Africa's specialist STEM store. Bright, playful kits on a deep navy night sky.
colors:
  deep-space-navy: "#0C1446"
  clean-white: "#FFFFFF"
  launch-orange: "#FF8B00"
  rocket-red: "#F70B28"
  sky-circuit-blue: "#3CC7F7"
  nebula-purple: "#AC4DFF"
  sprout-green: "#93DB21"
  spark-yellow: "#FFD500"
  chassis-grey: "#B3B3B3"
  workbench-mist: "#F9FAFB"
  card-edge: "#F3F4F6"
  hairline-grey: "#E5E7EB"
  quiet-grey: "#9CA3AF"
  caption-grey: "#6B7280"
  slate-body: "#4B5563"
  ink-grey: "#374151"
typography:
  display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "72px"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Outfit, sans-serif"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "Outfit, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "normal"
  lead:
    fontFamily: "Outfit, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body:
    fontFamily: "Outfit, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  button:
    fontFamily: "Outfit, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "normal"
  nav:
    fontFamily: "Outfit, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: "normal"
  label:
    fontFamily: "Outfit, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.43
    letterSpacing: "0.1em"
  price:
    fontFamily: "Outfit, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  badge:
    fontFamily: "Outfit, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  section: "64px"
  section-lg: "80px"
  section-xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.launch-orange}"
    textColor: "{colors.clean-white}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "rgba(255, 139, 0, 0.9)"
    textColor: "{colors.clean-white}"
  button-ghost-on-navy:
    backgroundColor: "transparent"
    textColor: "{colors.clean-white}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "16px 32px"
  button-ghost-on-white:
    backgroundColor: "transparent"
    textColor: "{colors.deep-space-navy}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "16px 32px"
  button-form-submit:
    backgroundColor: "{colors.launch-orange}"
    textColor: "{colors.deep-space-navy}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "16px 24px"
  button-form-submit-hover:
    backgroundColor: "{colors.deep-space-navy}"
    textColor: "{colors.clean-white}"
  button-add-to-cart:
    backgroundColor: "transparent"
    textColor: "{colors.deep-space-navy}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "16px 24px"
  button-add-to-cart-hover:
    backgroundColor: "{colors.deep-space-navy}"
    textColor: "{colors.clean-white}"
  button-quick-add:
    backgroundColor: "{colors.deep-space-navy}"
    textColor: "{colors.clean-white}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
  button-quick-add-hover:
    backgroundColor: "{colors.launch-orange}"
    textColor: "{colors.clean-white}"
  chip-category:
    backgroundColor: "{colors.clean-white}"
    textColor: "{colors.deep-space-navy}"
    typography: "{typography.nav}"
    rounded: "{rounded.full}"
    padding: "6px 10px 6px 6px"
  tag-skill:
    backgroundColor: "rgba(12, 20, 70, 0.1)"
    textColor: "{colors.deep-space-navy}"
    typography: "{typography.badge}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  pill-sale-nav:
    backgroundColor: "{colors.spark-yellow}"
    textColor: "{colors.deep-space-navy}"
    typography: "{typography.price}"
    rounded: "{rounded.full}"
    padding: "6px 14px"
  badge-discount:
    backgroundColor: "{colors.rocket-red}"
    textColor: "{colors.clean-white}"
    typography: "{typography.badge}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-age:
    backgroundColor: "rgba(12, 20, 70, 0.85)"
    textColor: "{colors.clean-white}"
    typography: "{typography.badge}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-promo:
    backgroundColor: "{colors.rocket-red}"
    textColor: "{colors.clean-white}"
    typography: "{typography.badge}"
    rounded: "{rounded.md}"
    padding: "4px 10px"
  card-product:
    backgroundColor: "{colors.clean-white}"
    textColor: "{colors.deep-space-navy}"
    rounded: "{rounded.2xl}"
    padding: "20px"
  card-testimonial:
    backgroundColor: "{colors.clean-white}"
    textColor: "{colors.ink-grey}"
    rounded: "{rounded.2xl}"
    padding: "32px"
  tile-info:
    backgroundColor: "{colors.clean-white}"
    textColor: "{colors.deep-space-navy}"
    rounded: "{rounded.xl}"
    padding: "16px 20px"
  input-search:
    backgroundColor: "{colors.clean-white}"
    textColor: "{colors.deep-space-navy}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "12px 48px 12px 16px"
  input-newsletter:
    backgroundColor: "rgba(255, 255, 255, 0.1)"
    textColor: "{colors.clean-white}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: "12px 20px"
---

# Design System: CREATESPACE

## Overview

**Creative North Star: "The Night-Sky Workshop"**

CREATESPACE looks like a workbench set up under a clear night sky. Deep Space Navy is the sky: a calm, trustworthy ground that fills the hero, the header and footer, the education and newsletter bands and the page headers. Against it, the brand's toy-bright accents (orange, blue, purple, green, yellow, red) behave like kit pieces scattered on the bench: they light up single words, prices, badges and the outlined illustrations of robots, planets and atoms that drift at the edges of a section. White pages are the bench itself, where product photography and plain-language copy do the selling.

The feel is friendly and confident rather than loud. One typeface, Outfit, does everything: SemiBold for headings and buttons, Regular for reading, heavier weights only for prices and badges. Shapes are soft (8px buttons, 16px cards, full pills for anything that reads as a label) and surfaces are flat; depth comes from blurred blue and purple glows on navy and from faint navy-tinted lift on hover, never from heavy drop shadows. Motion is quick and opt-in: content fades up as it arrives, cards stagger in, controls nudge down a pixel when pressed, and all of it switches off under reduced motion.

The storefront is designed for a parent on a phone deciding whether a kit fits their child, so every surface leads with the thing the child will make, states the age and the price plainly, and keeps the single orange action in reach. Three looks are confirmed rejections: the discount toy shop (wall-to-wall sale red, starbursts, cluttered grids of boxes), corporate edtech (stock classrooms, grey SaaS cards, jargon-led heroes), and the childish cartoon (bubble lettering, confetti, mascot-driven layouts). The site talks to the parent, not the child.

**Key Characteristics:**
- Navy or white ground, always; accents are highlights, never backgrounds.
- Launch Orange is the action colour: every call to action is orange, with the navy add-to-cart as the one deliberate exception.
- Rocket Red marks money and urgency: discount badges, sale prices, the promo badge, errors.
- One family, Outfit: SemiBold headlines, Regular body, Bold only for prices, stats and badges.
- Soft, friendly corners and pill-shaped labels.
- Flat surfaces lifted by blurred blue and purple glows on navy, and a faint navy shadow on hover.
- Outlined, colourful STEM illustrations used sparingly: faint in section corners, or a few full-colour pieces orbiting the hero subject.
- Motion is brief, eased with a soft overshoot, and entirely opt-in.

## Colors

A deep navy and white pairing carries the brand, with seven toy-bright accents from the CI used as highlights and signals, and a short grey scale for supporting text and edges.

### Primary
- **Deep Space Navy** (#0C1446): The brand ground and the brand ink. Full-bleed background for the hero, the site header and footer, page headers, the education band and the newsletter band. On white it is the colour of every heading, product title, nav label and price label. On the purchase surface it is the colour of commitment: the add-to-cart button's 2px outline and label (filling navy on hover) and the quick-add button's fill on product cards. Translucent navy carries the age badge on product photos (85%), the skill tag fill (10%), ghost-button borders on white (20% to 30%), the hover lift on cards (5%), and the scrim that rises under text on photos.
- **Clean White** (#FFFFFF): The second ground, used interchangeably with navy. Product cards, testimonial cards, info tiles, the "Why CREATESPACE" section, the brand strip and the final call to action. On navy it is the text colour, stepped down to 80%, 70%, 60% or 40% for supporting lines, and used at 10% for ghost fills and dividers.

### Secondary
- **Launch Orange** (#FF8B00): The action colour. Every primary button, the quick-add button's hover fill, the trust strip above the header, the cart count dot, hover states on nav links, product titles and chip borders, the icons beside delivery facts, the star rating on product cards and reviews, regular (non-sale) prices, and the most common single-word highlight in a headline ("Play." in the hero).
- **Rocket Red** (#F70B28): The logomark "A" and the colour of savings and warnings. Discount badges on product cards, sale prices, the promo band badge, the discount pill on a product hero, error text and "Out of Stock".

### Tertiary
- **Sky Circuit Blue** (#3CC7F7): The cool counterweight to orange. The second headline highlight ("Learn." in the hero), the big blurred glow behind the hero figure (25%) and page-header art (20%), icon discs on info tiles (10% fill), the 9 to 12 age tile, and half of the promo band gradient.
- **Nebula Purple** (#AC4DFF): The secondary hero glow (20%), the 13+ age tile, education kickers, and the other half of the promo band gradient.
- **Sprout Green** (#93DB21): The "In Stock" dot and label, checklist ticks on a product hero, the "Added" state of the add-to-cart and quick-add buttons, the saving label beside an add-on, the 6 to 8 age tile and the success state of the contact form (10% fill, 40% ring). Pair with navy text when used as a fill.
- **Spark Yellow** (#FFD500): Rare and celebratory. The Sale pill in the navigation and the stars on home-page testimonials. Always carries navy text.
- **Chassis Grey** (#B3B3B3): The CI grey. It appears only inside illustrations (robot bodies, wheels); it is never used for text or borders.

### Neutral
- **Workbench Mist** (#F9FAFB): Alternate section background on white pages (age groups, testimonials, info badges, photo wall), the breadcrumb strip on product pages, the fill behind product photos on cards and the icon disc inside category chips.
- **Card Edge** (#F3F4F6): The 2px border of product cards and the fill of disabled quick-add buttons.
- **Hairline Grey** (#E5E7EB): 1px borders on chips, the 2px border on the search field, dividers and section rules.
- **Quiet Grey** (#9CA3AF): Placeholders, struck-through compare-at prices, mega-menu column kickers and inactive icons.
- **Caption Grey** (#6B7280): Captions, breadcrumbs, review counts, author roles, product card metadata.
- **Slate Body** (#4B5563): Supporting paragraphs on white: section subheadings, card descriptions, form help text.
- **Ink Grey** (#374151): Testimonial quotes and mega-menu links; the darkest grey before navy takes over.

### Named Rules
**The Navy-or-White Ground Rule.** Every section grounds on Deep Space Navy, Clean White or Workbench Mist. Accent colours fill small shapes (buttons, badges, tiles, glows, icon discs), never a whole section. The one sanctioned exception is the promo band's thin blue-to-purple gradient strip.

**The Orange Means Go Rule.** Launch Orange is the fill for every call to action that moves the visitor on (browse, for schools, contact, subscribe), on navy and on white alike. Secondary actions are outlined ghosts in white or navy, never a second accent colour. The two purchase buttons are the deliberate exception: the add-to-cart is an outlined navy button and the card quick-add is navy-filled; both turn orange or navy on hover and Sprout Green once the item is in the cart.

**The Red Means Saving Rule.** In type and badges, Rocket Red signals a saving, a sale or a problem (discount badges, sale prices, out of stock, errors). It is never decorative emphasis in a headline; that job belongs to orange and blue.

**The One-Word Highlight Rule.** Headlines are white on navy or navy on white, with at most one or two words picked out in an accent ("Build. **Play.** **Learn.**"). Highlight a word, never a whole line.

## Typography

**Display Font:** Outfit (with sans-serif)
**Body Font:** Outfit (with sans-serif)

**Character:** A single geometric sans with round, open letterforms that reads friendly and modern without looking childish. The site loads the Outfit variable font locally (weights 100 to 900) and uses it everywhere; the CI's "SemiBold for headlines, Regular for body" is the rule, with heavier weights reserved for numbers and badges.

### Hierarchy
- **Display** (600, 72px desktop stepping to 60px and 48px on smaller screens, line-height 1.05, tracking -0.025em): The single h1 in the hero and page headers. Short and punchy, often three words with full stops ("Build. Play. Learn."), with balanced wrapping.
- **Headline** (600, 36px desktop, 30px mobile, line-height 1.2): Section headings ("Find the right kit", "See the Arduino Starter Kit in Action"). Sentence case. Product titles on a product hero sit at the same size.
- **Title** (600, 18px, line-height 1.5): Feature point titles, info tile values, footer column heads, mega-menu links. Product card titles step down to 16px (14px on small screens), clamped to two lines.
- **Lead** (400, 20px, line-height 1.625): Hero and page-header standfirst, the product hero's description. On navy the second sentence often drops to 60% white.
- **Body** (400, 16px, line-height 1.625): Paragraphs, capped at 32rem to 42rem wide (roughly 60 to 70 characters).
- **Button** (600, 16px): Every button label, sentence case.
- **Nav** (500, 14px): Header links, chip labels, the trust strip, breadcrumbs and most metadata; the workhorse small size.
- **Label** (600, 12px to 14px, uppercase, tracking 0.05em to 0.1em): Kickers above section headings in orange, blue or purple, and the grey column heads in the mega menu.
- **Price** (700, 18px on cards, 30px on a product hero): Orange by default, red on sale with the compare-at price struck through in Quiet Grey beside it.
- **Badge** (700, 12px; 800 and uppercase on the promo badge): Discount, age and promo badges, the Sale pill (14px), the cart count.

### Named Rules
**The SemiBold Ceiling Rule.** Words top out at SemiBold (600). Bold (700) and ExtraBold (800) are reserved for numbers and tiny labels: prices, discount percentages, stats, badges and the Sale pill.

**The Sentence Case Rule.** Headlines, section headings, buttons and nav links are sentence case. Uppercase is reserved for small tracked labels: kickers, the promo badge and mega-menu column heads.

## Layout

Content sits in a centred container capped at 1280px with side gutters of 16px, 24px and 32px as the viewport passes 640px and 1024px. Pages stack as full-bleed bands that alternate navy, white and Workbench Mist, each with 64px of vertical padding (80px on larger screens, 96px for the final call to action, 40px for the compact info-badge band). Two-column splits (copy beside photo, product gallery beside purchase panel) collapse to a single column below 1024px, with 32px to 48px between columns on desktop and 24px stacked.

Grids of cards use 24px gaps on desktop and 12px to 16px on phones; the shop grid runs two columns on phones and up to four on desktop, and feature or info cards become a horizontal snap-scrolling row on phones. Section openers are left-aligned (a headline, then a short grey subheading capped at 32rem to 42rem) except the closing call to action, which is centred. The hero puts copy in the left half and the photographic subject in the right half, grounded on the bottom edge, with the subject centred below the copy on phones.

The header is sticky: a 14px orange trust strip of three promises above a 64px navy bar with the logo (24px tall) left, links and search and cart right, and a yellow Sale pill when anything is discounted. Desktop dropdowns open as a white mega menu with three kicker-headed columns; on phones the menu becomes a stacked list under the bar and filters slide in as a right-hand sheet.

Breakpoints are Tailwind's defaults: 640px, 768px, 1024px, 1280px and 1536px.

## Elevation & Depth

The system is flat by default. Cards sit on white or mist with a thin grey border and no shadow at rest; on hover a product card gains a large, very faint navy shadow and chips gain a small one. Depth on navy comes from light, not shadow: big, heavily blurred discs of Sky Circuit Blue (25%) and Nebula Purple (20%) glow behind the hero figure and page-header art, and the newsletter box is a 6% white panel with a 10% white ring. Text over photos sits on a navy scrim rising from the bottom. Only floating chrome (the mega menu, modals, the join toast) carries a visible shadow.

### Shadow Vocabulary
- **Resting lift** (`box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05)`): Badges on photos, info tiles, the promo badge.
- **Hover lift** (`box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)`): Chips and small cards on hover.
- **Card hover** (`box-shadow: 0 10px 15px -3px rgba(12,20,70,0.05), 0 4px 6px -4px rgba(12,20,70,0.05)`): Product card hover; the shadow is navy-tinted, not black.
- **Floating chrome** (`box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)`): The mega menu, modals and the cart toast.
- **Sale pill pop** (`box-shadow: 0 2px 6px rgba(0,0,0,0.3)`): The yellow Sale pill only.

### Named Rules
**The Glow Not Shadow Rule.** On navy, lift the subject with a soft blurred blue and purple glow behind it. Drop shadows are for chrome that floats above the page, never for content at rest.

## Shapes

Corners are consistently soft and friendly. Buttons, inputs and small tiles use 8px; info tiles and the photo wall use 12px; product cards, testimonial cards, age tiles and photo frames use 16px (12px on small screens); large panels such as the newsletter box use 24px. Anything that reads as a label (Sale pill, discount and age badges, category chips, skill tags, the newsletter field and its button) is a full pill. The promo badge is the one squarer label at 6px.

Borders are hairlines: 1px to 2px in Hairline Grey or Card Edge on white, or white at 10% to 30% on navy. Photos are clipped to their radius with a 1px ring (white at 15% on navy). Circles appear as icon discs (blue or mist at 10%), the cart count dot, the stock dot, and the hero glows. Illustrations are the only free-form shapes.

## Components

Warm, confident and chunky. Controls look pressable, cards look like cards, and labels look like labels.

### Buttons
- **Shape:** gently rounded (8px).
- **Primary:** Launch Orange fill, white SemiBold 16px label, 16px by 32px padding, sentence case ("Browse the range"), often with a 20px right-arrow icon 8px after the text.
- **Hover / Focus / Active:** fill eases to 90% orange over 150ms; pressing nudges the button down 1px (`active:translate-y-px`); keyboard focus shows a 2px navy outline offset 2px (a 2px blue ring on navy).
- **Ghost on navy:** transparent with a 1px white-at-30% border and white label; hover adds a 10% white wash or brightens the border to white.
- **Ghost on white:** transparent with a 1px navy-at-20% to 30% border and navy label; hover adds a 5% navy wash.
- **Form submit:** full-width Launch Orange with a navy label (white on orange fails AA), inverting to navy with a white label on hover.
- **Add to cart (product hero):** full width, 2px navy border, navy SemiBold label with a cart icon, 16px by 24px padding, 8px corners; hover fills navy with a white label, and for 1.5s after adding it turns Sprout Green with a white label; disabled at 50% opacity.
- **Quick add (cards):** a compact navy 8px-radius button with a white 12px label (an icon on phones, "Add" on larger screens); hover turns it orange and adding turns it green; disabled it turns Card Edge with Quiet Grey text.
- **Quantity stepper:** a 1px bordered 8px box with 44px square minus and plus targets.

### Chips
- **Category chip:** white pill with a 1px Hairline Grey border, navy 500 14px label, and a round Workbench Mist disc (32px, 44px on larger screens) holding a small product icon on the left. Hover switches the border to orange and adds the hover lift.
- **Skill tag (product hero):** navy-at-10% pill with a navy SemiBold 12px label; hover fills navy with white text when it links to a filtered shop.
- **Checkbox (add-ons, consent):** 16px to 20px, 4px radius, orange or navy accent.

### Price and Sale Badges
- **Discount badge (cards):** Rocket Red full pill, white 700 "-20%", top left of the product photo, with the resting lift.
- **Age badge (cards):** navy at 85% full pill, white 600 "Ages 8-12", top right of the product photo.
- **Discount pill (product hero):** red-at-10% pill with a red 700 label beside the price.
- **Stock line:** a small coloured dot and 12px label: Sprout Green "In Stock", Launch Orange "Delivery in 7 - 14 days", Rocket Red "Out of Stock".
- **Promo badge:** Rocket Red, 6px radius, white 800 uppercase tracked label, sitting on the blue-to-purple promo band beside a navy eyebrow pill and a navy SemiBold message.
- **Nav Sale pill:** Spark Yellow full pill, navy 700 14px label, the sale pill pop shadow; lifts 1px on hover and squashes to 95% when pressed.
- **Cart count:** a 16px orange disc with white 12px text pinned to the cart icon's corner.

### Cards / Containers
- **Product card:** white, 16px corners (12px on phones), 2px Card Edge border, square photo on Workbench Mist with the discount and age badges, then 20px (12px on phones) of padding holding the SemiBold navy title (two lines max, orange on hover), the stock line, an orange star rating with a grey count, and a bottom row with the price (orange 700, or red beside a struck-through compare-at price) and the navy quick-add button. Flat at rest, navy card-hover shadow on hover, nudges down 1px when pressed, fades up in a 45ms stagger on mount.
- **Testimonial card:** borderless white on Workbench Mist, 16px corners, 24px to 32px padding, five Spark Yellow stars, the quote in Ink Grey at a relaxed line height, then the name in navy SemiBold and the role in Caption Grey.
- **Info tile (product page):** white, 12px corners, 1px Card Edge border, resting lift, a 40px Sky Circuit Blue 10% disc with a blue icon, a Caption Grey 12px label over a navy SemiBold value. Tiles scroll horizontally on phones and wrap centred on desktop.
- **Age tile:** a square photo with 16px corners and a solid accent-coloured caption bar across the bottom (bold age range over a small label); lifts 4px and zooms the photo 5% on hover.
- **Newsletter panel:** on navy, a 24px-radius panel of 6% white with a 10% white ring, 32px to 48px padding, copy left and a pill form right.

### Inputs / Fields
- **Search:** white, 8px corners, 2px Hairline Grey border that turns orange on focus (no outline ring), navy text, Quiet Grey placeholder, 12px by 16px padding with a 48px right inset for the search icon.
- **Newsletter field:** full pill of 10% white with a 20% white border, white text, 40% white placeholder; focus brightens the border to 50%. Its submit is an orange full-pill button.
- **Form fields (contact):** 8px corners with navy focus rings; validation errors sit in a red-at-10% panel with a 40% red ring and navy text; success shows a green-at-10% panel with a Sprout Green disc and tick.

### Navigation
- **Trust strip:** Launch Orange, white 500 14px, three icon-led promises ("Free delivery over R1,500", "Fast delivery in 1-3 days", "30-day easy returns") on desktop, one at a time on phones.
- **Header:** sticky navy bar, 64px tall, white logo 24px tall, white 500 14px links that turn orange on hover with 24px to 32px between them, dropdown chevrons that rotate 180 degrees when open, search and cart icons right, and the yellow Sale pill. Faint illustrations sit inside the bar at 7% opacity on desktop.
- **Mega menu:** white panel with the floating-chrome shadow, three columns headed by uppercase Quiet Grey 12px kickers over a hairline, with navy SemiBold links that turn orange on hover and 40px mist discs for brand logos.
- **Mobile menu:** the links stack under the bar inside a 10% white top border, 8px of vertical padding each, sub-items indented 16px at 80% white.
- **Footer:** navy with five faint illustrations (5% to 6%) tucked into corners, the logo 28px tall, 70% white 14px links that turn orange on hover in four kicker-less columns, social icons, payment method chips as 10% white 4px-radius tags, and a 10% white hairline above the copyright row.
- **Breadcrumb strip (product pages):** Workbench Mist band with a hairline below, Caption Grey 14px links and the current page in navy 500.

### Promo Band
A thin strip between the hero and the first section: a slowly panning blue-to-purple gradient (12s, 300% background size) with a periodic 40% white light sweep, carrying the red promo badge, a navy eyebrow pill, and a navy SemiBold message with an underlined link. The gradient renders statically for everyone; the pan and sweep are opt-in motion.

### Product Hero
The purchase surface. A two-column grid (gallery left with a 16px-radius frame and thumbnail strip, purchase panel right): brand link in Caption Grey with the brand name in orange, the title at headline size, a short lead, the price at 30px 700 (orange, or red with the compare-at price and a red discount pill), a stock line, a checklist of four benefits with Sprout Green ticks, skill-tag pills, then a bordered block of delivery facts with orange icons, the quantity stepper, the add-on upsell box on mist, and the outlined navy add-to-cart button.

### Illustrations
The brand illustrations are outlined, flat-coloured STEM objects (robots, planets, atoms, beakers, microscopes, nuts, chips, code brackets) in the accent palette with black strokes, served as SVG from `public/images/illustrations/`.
- **Background decor (default):** one or two per section, 5% to 8% opacity, rotated 3 to 12 degrees, tucked into corners and partly cropped by the edge, hidden on small screens where they would crowd the copy.
- **Hero orbit:** up to three full-colour pieces (planet, atom, moon) orbiting the photographic subject, some partly behind it, one at 60% opacity.
- **Toast mascot:** the join-link toast pops a small robot over its top edge.

### Photo Treatment
Real photographs of children and hands building kits, and real product photography on white or mist. Frames use 16px corners with a 1px ring; text over photos sits on a navy scrim rising from the bottom. The customer photo wall is a masonry of 12px-radius tiles that flip to reveal the kit on hover or tap. Partner logos sit on white at 80% opacity, rising to 100% on hover.

### Motion
- **Arrival:** above-the-fold content fades up 16px over 0.7s with a soft overshoot (`cubic-bezier(0.16, 1, 0.3, 1)`); sections below reveal the same way as they scroll into view, 24px up over 0.7s; shop cards stagger in at 45ms steps (capped at eight).
- **Interaction:** colour and shadow transitions run 150ms to 300ms; pressed controls nudge down 1px; hovered cards lift or zoom their photo 5%.
- **Flourish:** the promo band pans and sweeps; the join toast rises, pops its robot and shows a draining timer line.
- **Opt-in only:** every animation sits inside `prefers-reduced-motion: no-preference`; reduced-motion users get instant states and a short opacity fade on the toast.

## Do's and Don'ts

### Do:
- **Do** ground every section on Deep Space Navy, Clean White or Workbench Mist, and let the accents appear as small, bright shapes.
- **Do** make every call to action Launch Orange with a white SemiBold label, 16px by 32px padding and 8px corners; use a navy label only on full-width form submits, and keep the add-to-cart as an outlined navy button.
- **Do** reserve Rocket Red for discount badges, sale prices, the promo badge, out-of-stock and errors.
- **Do** highlight one or two words of a headline in orange or blue, keeping the rest navy or white.
- **Do** keep headlines at Outfit SemiBold (600) in sentence case; save 700 and 800 for prices, stats and badges.
- **Do** lead with the thing the child makes: real photos of builds and children mid-build, with navy scrims for any text on top.
- **Do** lift subjects on navy with a soft blurred blue and purple glow, and lift cards on hover with the navy-tinted shadow.
- **Do** use rounded corners throughout: 8px buttons and inputs, 16px cards and photos, full pills for labels.
- **Do** keep the container at 1280px with 16px, 24px and 32px gutters, and 64px to 80px of section padding.
- **Do** wrap every animation in `prefers-reduced-motion: no-preference` and keep hit targets at 44px on phones.
- **Do** tuck illustrations into section corners at 5% to 8% opacity, or orbit a few full-colour pieces around a hero subject.

### Don't:
- **Don't** flood a section with an accent colour; the only sanctioned accent ground is the thin promo band.
- **Don't** use a second accent colour for a primary button, or make secondary actions filled.
- **Don't** use red for decorative headline emphasis, or stack sale red across a page like a discount toy shop.
- **Don't** set headlines in Bold or ExtraBold, or in all caps.
- **Don't** use grey SaaS-style cards, stock classroom photography or jargon-led hero copy; the site is a specialist store, not corporate edtech.
- **Don't** reach for bubble lettering, confetti, mascots or primary-colour clutter; the reader is the parent, not the child.
- **Don't** let illustrations compete with the product photo or the message: faint in the background, or a few full-colour pieces orbiting the subject, never both at full strength behind text.
- **Don't** use Chassis Grey or accent colours for body text; body text is navy, Slate Body or Ink Grey on white, or white at reduced opacity on navy.
- **Don't** add dark drop shadows to content at rest; shadows belong to floating chrome and hover only.
- **Don't** put white text on orange; it is about 2.3:1 and fails AA.
