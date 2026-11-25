#!/usr/bin/env bash
# Make one customer's 10% off voucher image.
#
#   marketing/campaigns/2026-11-customer-voucher/make-voucher.sh ABC123
#   marketing/campaigns/2026-11-customer-voucher/make-voucher.sh ABC123 2026-12-01
#
# The date is the day the customer receives the voucher (defaults to today).
# The image shows the use-by date 30 days later. Output:
#   exports/voucher-<CODE>.png  (1200 x 800, for email or WhatsApp)
set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 CODE [YYYY-MM-DD]" >&2
  exit 1
fi

here="$(cd "$(dirname "$0")" && pwd)"
code="$(printf '%s' "$1" | tr '[:lower:]' '[:upper:]')"
issued="${2:-$(date +%Y-%m-%d)}"

case "$code" in *[!A-Z0-9_-]*) echo "Code may only use letters, numbers, - and _" >&2; exit 1 ;; esac
case "$issued" in [0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]) ;; *) echo "Date must be YYYY-MM-DD" >&2; exit 1 ;; esac

tmp="$here/voucher-$code.html"
trap 'rm -f "$tmp"' EXIT
sed -e "s/data-code=\"YOURCODE\"/data-code=\"$code\"/" \
    -e "s/data-issued=\"\"/data-issued=\"$issued\"/" \
    "$here/voucher.html" > "$tmp"

"$here/../../scripts/render.sh" "$tmp" >/dev/null
echo "exports/voucher-$code.png (code $code, received $issued)"
