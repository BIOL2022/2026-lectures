#!/usr/bin/env bash
# Regenerate lecture title-slide thumbnails for the landing grid.
# Run after editing any deck's title slide:  bash scripts/regen-thumbnails.sh
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p assets/thumbnails
PROJ="$PWD"

# Render the site first so thumbnails reflect current content.
quarto render >/dev/null

for slug in L00-welcome-to-beda L01-intro-exp-design-analysis L02a-representative-sampling \
            L02b-linear-model L02c-all-linear-model L03a-model-appropriate L03b-ttests \
            L04a-mlr L04b-anova L04c-model-transformations L05a-blocking-fixed-random L05b-revision; do
  DECK="$PROJ/_site/lectures/$slug/index.html"
  URL="file://${DECK// /%20}"
  "$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1280,720 --virtual-time-budget=4000 \
    --screenshot="assets/thumbnails/$slug.png" "$URL" >/dev/null 2>&1
  echo "  $slug.png"
done
echo "Done. Commit assets/thumbnails/ to update the site."
