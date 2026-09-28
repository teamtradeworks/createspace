#!/usr/bin/env bash
# Render marketing assets to their export formats.
#
#   marketing/scripts/render.sh marketing/campaigns/2026-10-holiday-sale/*.html
#
# Each asset declares its canvas with <html data-canvas="..."> and loads
# creative/kit/canvas.js, which works out the size. Outputs go to an exports/
# folder next to the asset:
#
#   screen canvases  <name>.png            exact pixel size, ready to upload to Meta
#   print canvases   <name>.pdf            with 3mm bleed, for a print shop
#                    <name>-trim.pdf       trimmed to size, for an office printer
#                    <name>-preview.png    2x screen preview of the trimmed page
#
# Needs Google Chrome. Set CHROME to override the path.
set -euo pipefail

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
if [ ! -x "$CHROME" ]; then
  echo "Google Chrome not found at $CHROME (set CHROME=/path/to/chrome)" >&2
  exit 1
fi
if [ "$#" -eq 0 ]; then
  echo "Usage: $0 <asset.html> [more.html ...]" >&2
  exit 1
fi

chrome() {
  "$CHROME" --headless --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --no-first-run --no-default-browser-check --virtual-time-budget=8000 "$@" 2>/dev/null
}

for file in "$@"; do
  case "$file" in *.html) ;; *) echo "skip $file (not .html)"; continue ;; esac
  [ -f "$file" ] || { echo "missing $file" >&2; exit 1; }

  dir="$(cd "$(dirname "$file")" && pwd)"
  base="$(basename "$file" .html)"
  url="file://$dir/$base.html"
  out="$dir/exports"
  mkdir -p "$out"

  # canvas.js writes e.g. data-render="png 1080x1350" or "pdf 154x216mm 582x816"
  render="$(chrome --dump-dom "$url" | grep -o 'data-render="[^"]*"' | head -1 | cut -d'"' -f2 || true)"
  if [ -z "$render" ]; then
    echo "$file: no data-render found. Does it set data-canvas and load creative/kit/canvas.js?" >&2
    exit 1
  fi

  kind="${render%% *}"
  case "$kind" in
    png)
      size="${render#png }"
      chrome --window-size="${size/x/,}" --screenshot="$out/$base.png" "$url"
      echo "$file -> exports/$base.png ($size)"
      ;;
    pdf)
      chrome --no-pdf-header-footer --print-to-pdf="$out/$base.pdf" "$url"
      chrome --no-pdf-header-footer --print-to-pdf="$out/$base-trim.pdf" "$url?trim"
      trim_render="$(chrome --dump-dom "$url?trim" | grep -o 'data-render="[^"]*"' | head -1 | cut -d'"' -f2)"
      px="${trim_render##* }"
      chrome --force-device-scale-factor=2 --window-size="${px/x/,}" \
        --screenshot="$out/$base-preview.png" "$url?trim"
      echo "$file -> exports/$base.pdf (bleed), $base-trim.pdf, $base-preview.png"
      ;;
    *)
      echo "$file: unrecognised data-render \"$render\"" >&2
      exit 1
      ;;
  esac
done
