#!/usr/bin/env bash
# Regenerate title-slide thumbnails for lectures included in the public build.
# Run after editing a released deck's title slide: bash scripts/regen-thumbnails.sh
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p assets/thumbnails
PROJ="$PWD"

# Render a clean public site first so only released lectures are included.
bash scripts/render-public.sh >/dev/null

shopt -s nullglob
for DECK in "$PROJ"/_site/lectures/*/index.html; do
  slug="$(basename "$(dirname "$DECK")")"
  URL="file://${DECK// /%20}"
  "$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1280,720 --virtual-time-budget=4000 \
    --screenshot="assets/thumbnails/$slug.png" "$URL" >/dev/null 2>&1
  echo "  $slug.png"
done
echo "Done. Commit assets/thumbnails/ to update the site."
