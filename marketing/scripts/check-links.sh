#!/usr/bin/env bash
# Check that every landing URL in a campaign brief responds with 200.
#
#   marketing/scripts/check-links.sh marketing/campaigns/2026-10-holiday-sale
#
# Run it when the brief is written and again just before assets ship: brand
# filters, sale pages and product handles change under live ads. A 200 only
# proves the page loads; a filtered /shop URL can still show zero products, so
# open filtered links in a browser too.
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <campaign-folder>" >&2
  exit 1
fi

brief="$1/brief.md"
[ -f "$brief" ] || { echo "No brief.md in $1" >&2; exit 1; }

urls="$(grep -o 'https://[^ `|)<>"]*' "$brief" | grep -v '\.\.\.' | sort -u || true)"
if [ -z "$urls" ]; then
  echo "No complete URLs found in $brief"
  exit 0
fi

fail=0
while IFS= read -r url; do
  case "$url" in
    https://www.thecreatespace.co.za/*|https://www.thecreatespace.co.za) ;;
    https://thecreatespace.co.za*)
      echo "APEX  $url  (use the www. host; the apex redirects)"
      fail=1
      continue
      ;;
    *)
      echo "SKIP  $url  (not our site)"
      continue
      ;;
  esac
  body="$(mktemp)"
  code="$(curl -s -o "$body" -w '%{http_code}' --max-redirs 0 --max-time 20 "$url")" || true
  # Missing products stream a 200 with a "Not Found" title, so check the title too
  title="$(grep -o '<title>[^<]*</title>' "$body" | head -1 | sed 's/<[^>]*>//g' || true)"
  rm -f "$body"
  if [ "$code" = "200" ] && [[ "$title" == *"Not Found"* ]]; then
    echo "404   $url  (page says \"$title\")"
    fail=1
  elif [ "$code" = "200" ]; then
    echo "OK    $url"
  else
    echo "$code   $url"
    fail=1
  fi
  case "$url" in
    *utm_campaign=*) ;;
    *) echo "      ^ no utm_campaign: clicks from this link won't be attributed" ;;
  esac
done <<< "$urls"

exit "$fail"
