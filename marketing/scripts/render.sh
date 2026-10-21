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
      w="${size%x*}"; h="${size#*x}"
      # Newer headless Chrome makes the viewport shorter than the window, which
      # leaves a blank strip at the bottom of the screenshot. Measure the gap,
      # grow the window by it, then crop back to the canvas from the top.
      seen="$(chrome --window-size="$w,$h" --dump-dom \
        'data:text/html,<script>document.write("vh="+innerHeight)</script>' | grep -o 'vh=[0-9]*' | cut -d= -f2)"
      extra=$(( h - ${seen:-$h} ))
      chrome --window-size="$w,$(( h + extra ))" --screenshot="$out/$base.png" "$url"
      if [ "$extra" -gt 0 ]; then
        # sips treats --cropOffset 0 0 as "centre", which shifts the canvas up
        # by half the gap. Keep the top $h rows instead: PNG row filters only
        # look at earlier rows, so cutting off the bottom is exact.
        python3 -I - "$out/$base.png" "$h" <<'PY'
import struct, sys, zlib
path, keep = sys.argv[1], int(sys.argv[2])
data = open(path, "rb").read()
chunks, i = [], 8
while i < len(data):
    n = struct.unpack(">I", data[i:i + 4])[0]
    chunks.append((data[i + 4:i + 8], data[i + 8:i + 8 + n]))
    i += 12 + n
ihdr = chunks[0][1]
w, _, depth, ctype, _, _, interlace = struct.unpack(">IIBBBBB", ihdr)
assert depth == 8 and interlace == 0, "unexpected PNG format"
channels = {0: 1, 2: 3, 4: 2, 6: 4}[ctype]
raw = zlib.decompress(b"".join(c for t, c in chunks if t == b"IDAT"))
raw = raw[:keep * (1 + w * channels)]
def chunk(t, c):
    return struct.pack(">I", len(c)) + t + c + struct.pack(">I", zlib.crc32(t + c) & 0xFFFFFFFF)
out = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">II", w, keep) + ihdr[8:])
out += b"".join(chunk(t, c) for t, c in chunks if t not in (b"IHDR", b"IDAT", b"IEND"))
out += chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b"")
open(path, "wb").write(out)
PY
      fi
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
