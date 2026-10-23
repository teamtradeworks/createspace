# Little Luna farewell: VIP early access to Black Friday

## Summary

- **Campaign slug:** `2026-10-little-luna-vip` (also the `utm_campaign` value)
- **Type:** CREATESPACE awareness (list handover)
- **Audience:** Little Luna customers (parents)
- **Runs:** October 2026, one send, before the Black Friday early-access email
- **Status:** Draft

## The one thing

Little Luna is closing. Its customers should join the CREATESPACE list now, because subscribers get into the Black Friday sale before it opens to everyone.

## How it is sent

Little Luna sends `email.html` from its own email tool, to its own list. The "Get VIP access" button uses the storefront's one-click join link (`/?join={email}`), so a tap adds the reader to the CREATESPACE Resend audience. Replace `{{EMAIL}}` with the tool's merge tag (instructions at the top of `email.html`).

## What we can say

| Claim | Value | Source |
|---|---|---|
| Same team runs both stores | Yes | Owner, 2026-10-15 |
| Subscribers get early Black Friday access | Yes, no date or discount given yet | Owner, 2026-10-15 |
| Brands named | MatataStudio, Makerzoid, BBC micro:bit, Snap Circuits, National Geographic | `2026-10-join-us-email` brand strip |
| Delivery | Anywhere in South Africa | CLAUDE.md |

**Not claiming:** a discount percentage, the early-access date, how long Little Luna traded, or what happens to open Little Luna orders.

## Assets

| File | Canvas | Use | Links |
|---|---|---|---|
| `email-hero.html` | `meta-landscape` (1200 x 628) | Hero image, shown at 600px. Copied to `storefront/public/images/email/little-luna-vip-hero.png` | n/a |
| `email.html` | Email, 600px | Paste-in HTML for Little Luna's tool | `utm_source=little-luna&utm_medium=email&utm_content=hero / vip-button / footer-logo` |

## Open questions

- Is there a Little Luna logo to put in the sender line instead of the text?
- Should the email tell customers what happens to any open Little Luna orders or returns?
