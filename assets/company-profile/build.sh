#!/usr/bin/env bash
# Regenerate the A4 company profile exports from company-profile.html.
set -euo pipefail

cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SRC="file://$(pwd)/company-profile.html"

if [ ! -x "$CHROME" ]; then
  echo "Google Chrome not found at $CHROME" >&2
  exit 1
fi

"$CHROME" --headless --disable-gpu --allow-file-access-from-files \
  --no-pdf-header-footer --virtual-time-budget=5000 \
  --print-to-pdf="CREATESPACE-Company-Profile.pdf" "$SRC"

# 2x A4 at 96dpi = 1588 x 2246 per page; 2 pages tall so the PNG shows the whole document
"$CHROME" --headless --disable-gpu --allow-file-access-from-files \
  --hide-scrollbars --virtual-time-budget=5000 \
  --force-device-scale-factor=2 --window-size=794,2246 \
  --screenshot="CREATESPACE-Company-Profile.png" "$SRC"

echo "Done. Check CREATESPACE-Company-Profile.png for clipped content before sharing the PDF."
