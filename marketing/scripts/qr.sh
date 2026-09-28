#!/usr/bin/env bash
# Make a navy-on-white SVG QR code for a print asset.
#
#   marketing/scripts/qr.sh marketing/campaigns/2026-10-holiday-sale/images/qr-shop.svg \
#     "https://www.thecreatespace.co.za/shop?utm_source=flyer&utm_medium=print&utm_campaign=2026-10-holiday-sale"
#
# Always use the www. host (the apex redirects) and include UTM parameters so
# scans show up in PostHog and GA4. Uses the qrcode npm package via npx.
set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <out.svg> <url>" >&2
  exit 1
fi

out="$1"
url="$2"

case "$url" in
  https://www.thecreatespace.co.za/*) ;;
  *) echo "warning: URL is not on https://www.thecreatespace.co.za/" >&2 ;;
esac
case "$url" in
  *utm_campaign=*) ;;
  *) echo "warning: URL has no utm_campaign, scans won't be attributed" >&2 ;;
esac

mkdir -p "$(dirname "$out")"
npx --yes qrcode@1.5.4 -t svg -e M -q 2 -d "#0C1446" -l "#FFFFFF" -o "$out" "$url" >/dev/null
echo "$out"
