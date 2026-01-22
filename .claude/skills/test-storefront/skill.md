---
name: test-storefront
description: Comprehensive browser testing for the CREATESPACE storefront. Tests visual elements, user flows, console errors, API calls, and Lighthouse performance against localhost:3000.
allowed-tools: Read, Glob, Bash, mcp__claude-in-chrome__tabs_context_mcp, mcp__claude-in-chrome__tabs_create_mcp, mcp__claude-in-chrome__navigate, mcp__claude-in-chrome__computer, mcp__claude-in-chrome__read_page, mcp__claude-in-chrome__find, mcp__claude-in-chrome__read_console_messages, mcp__claude-in-chrome__read_network_requests, mcp__claude-in-chrome__resize_window, mcp__claude-in-chrome__javascript_tool
command: test
---

# Test Storefront Skill

Comprehensive browser testing for the CREATESPACE storefront using Claude in Chrome.

## Prerequisites

- Local dev server must be running at `localhost:3000`
- Claude in Chrome extension must be connected (except for `--lighthouse-only`)

## Arguments

Parse any arguments provided after `/test` to determine which tests to run:

| Argument | Description |
|----------|-------------|
| (none) | Run all tests (navigation, visual, flow, console, network, Lighthouse) |
| `--lighthouse` | Run only Lighthouse performance analysis (no browser automation needed) |
| `--lighthouse=/path` | Run Lighthouse on a specific page (e.g., `--lighthouse=/shop`) |
| `--visual` | Run only visual testing (navigation + visual checks) |
| `--flow` | Run only user flow testing (navigation + add-to-cart flow) |
| `--quick` | Run navigation + console + network checks only (skip Lighthouse) |
| `--mobile` | Run tests in mobile viewport (375x667) |
| `--page=/path` | Test only a specific page path |

**Multiple arguments can be combined**, e.g., `/test --visual --mobile`

### Argument Handling

Before starting tests, check which arguments were provided and set flags:

```
runNavigation = true (always run unless --lighthouse)
runVisual = no args OR --visual
runFlow = no args OR --flow
runConsole = no args OR --quick
runNetwork = no args OR --quick
runLighthouse = no args OR --lighthouse
mobileOnly = --mobile flag present
specificPage = value from --page if present
```

**Special case: `--lighthouse`**
- Skip browser automation entirely
- Only run Lighthouse CLI against localhost:3000
- Does not require Claude in Chrome extension

## Test Procedure

### 1. Setup

**Skip if:** `--lighthouse` flag (jump directly to Lighthouse section)

First, get the browser context and create a new tab:

```
1. Call tabs_context_mcp to check connection
2. Create a new tab with tabs_create_mcp
3. Navigate to http://localhost:3000
4. If --mobile flag: resize_window to 375x667
5. Take an initial screenshot
```

### 2. Navigation Link Check

**Skip if:** `--lighthouse` flag

**CRITICAL: Test all navigation links before proceeding with other tests.**

Extract all links from the header navigation and verify each one resolves (not 404):

```
1. Use read_page with filter: "interactive" to get all links
2. Identify header navigation links (typically: Home, Shop, Education, About Us, Contact)
3. Navigate to EACH link and verify:
   - Page loads (not 404)
   - Page title is appropriate
   - No server errors
4. Report any broken links immediately
```

**Expected navigation links to test:**
- `/` (Home)
- `/shop` (Shop)
- `/education` (Education)
- `/about` (About Us)
- `/contact` (Contact)
- `/cart` (Cart)

If any link returns 404 or error, flag it as a **high severity** issue.

### 3. Visual Testing

**Skip if:** `--lighthouse`, `--flow`, or `--quick` flags

Check each key page for visual correctness:

**Pages to test:**
- Homepage (`/`)
- A collection page (e.g., `/collections/all`)
- A product page (click any product)
- Cart page (`/cart`)

**For each page, verify:**
- Page loads without visual errors
- Brand colours are correct (Navy #0C1446, White #FFFFFF)
- Typography uses Outfit font family
- Images load correctly
- Layout works on desktop viewport
- No broken/missing elements

**Responsive check:**
- Resize window to mobile (375x667)
- Verify mobile layout and navigation
- Resize back to desktop (1280x800)

### 4. User Flow Testing

**Skip if:** `--lighthouse`, `--visual`, or `--quick` flags

Test the core e-commerce flow:

```
1. Homepage
   - Verify hero/banner loads
   - Check navigation menu works
   - Click on a product or collection

2. Product Page
   - Verify product title, price (in ZAR format: R1,234)
   - Verify product images load
   - Click "Add to Cart" button
   - Verify cart updates (count indicator)

3. Cart Page
   - Navigate to /cart
   - Verify product appears in cart
   - Check quantity controls work
   - Verify subtotal calculation
   - Check delivery information displays:
     - "Free delivery on orders R1,500+"
     - Or "R135 delivery" for orders under R1,500
   - Click checkout button (stop before actual checkout)

4. Checkout
   - Verify checkout page loads (Shopify checkout or custom)
   - DO NOT complete purchase - just verify it loads
```

### 5. Console Error Check

**Skip if:** `--lighthouse` flag

After each major page load:

```
1. Call read_console_messages with pattern: "error|Error|ERROR|warn|Warning"
2. Report any JavaScript errors or warnings
3. Ignore expected warnings (e.g., React dev mode, minor deprecations)
```

### 6. Network Request Verification

**Skip if:** `--lighthouse` flag

Check Storefront API calls:

```
1. Call read_network_requests with urlPattern: "shopify"
2. Verify API calls return 200 status
3. Report any failed requests (4xx, 5xx)
```

### 7. Lighthouse Performance Analysis

**Skip if:** `--visual`, `--flow`, or `--quick` flags

**Run if:** No flags OR `--lighthouse` flag

Run Lighthouse to analyse page performance, accessibility, best practices, and SEO.

**Pages to test with Lighthouse:**
- If `--lighthouse=/path` specified: Test only that path
- If `--lighthouse` (no path): Test homepage only
- If full test (no flags): Test homepage and optionally a product page

**Run Lighthouse via CLI:**

```bash
# For homepage
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-home.json --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo

# For specific page (e.g., /shop)
npx lighthouse http://localhost:3000/shop --output=json --output-path=./lighthouse-shop.json --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo
```

**Extract key metrics from the JSON output:**
- Performance score (target: 90+)
- Accessibility score (target: 90+)
- Best Practices score (target: 90+)
- SEO score (target: 90+)

**Key performance metrics to report:**
- First Contentful Paint (FCP) - target: < 1.8s
- Largest Contentful Paint (LCP) - target: < 2.5s
- Total Blocking Time (TBT) - target: < 200ms
- Cumulative Layout Shift (CLS) - target: < 0.1
- Speed Index - target: < 3.4s

**If scores are below targets, note specific issues from Lighthouse audit:**
- List failed audits
- Note opportunities for improvement (e.g., image optimisation, unused JS)

**Clean up after testing:**
```bash
rm -f lighthouse-*.json
```

### 8. Report Findings

**Always run** (adjust report sections based on which tests were executed)

After testing, provide a summary:

```markdown
## Test Results

**Target:** localhost:3000
**Date:** [current date/time]

### Navigation Links
- [ ] / (Home)
- [ ] /shop
- [ ] /education
- [ ] /about
- [ ] /contact
- [ ] /cart

### Visual Testing
- [ ] Homepage renders correctly
- [ ] Collection page renders correctly
- [ ] Product page renders correctly
- [ ] Cart page renders correctly
- [ ] Mobile responsive: Pass/Fail

### User Flows
- [ ] Navigation works
- [ ] Add to cart works
- [ ] Cart updates correctly
- [ ] Checkout accessible

### Errors Found
- List any broken links (404s)
- List any console errors
- List any network failures
- List any visual issues

### Lighthouse Scores

**Homepage (localhost:3000)**
| Category | Score | Target |
|----------|-------|--------|
| Performance | XX | 90+ |
| Accessibility | XX | 90+ |
| Best Practices | XX | 90+ |
| SEO | XX | 90+ |

**Core Web Vitals:**
- FCP: X.Xs (target < 1.8s)
- LCP: X.Xs (target < 2.5s)
- TBT: XXXms (target < 200ms)
- CLS: X.XX (target < 0.1)

**Issues Found:**
- [List any failed Lighthouse audits]
- [List optimisation opportunities]

### Screenshots
[Attach key screenshots if issues found]

### Recommendations
[List any fixes needed]
```

## Quick Reference: Test Combinations

| Command | What runs |
|---------|-----------|
| `/test` | All tests (full suite) |
| `/test --lighthouse` | Lighthouse on homepage only (fastest, no browser needed) |
| `/test --lighthouse=/shop` | Lighthouse on /shop page only |
| `/test --visual` | Navigation + visual checks |
| `/test --flow` | Navigation + e-commerce flow |
| `/test --quick` | Navigation + console + network (no Lighthouse) |
| `/test --visual --mobile` | Visual tests in mobile viewport |
| `/test --page=/shop` | Test only the /shop page |

## Important Notes

- Never complete actual purchases
- Never enter real payment information
- Take screenshots when issues are found
- Report all console errors except known benign warnings
- If dev server is not running, inform user and stop
