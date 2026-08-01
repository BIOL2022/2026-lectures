#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(git rev-parse --show-toplevel)"
OUTPUT_DIR="$PROJECT_ROOT/_site"

if [[ -z "$PROJECT_ROOT" || "$OUTPUT_DIR" != "$PROJECT_ROOT/_site" ]]; then
  echo "Refusing to clean an unexpected output directory." >&2
  exit 1
fi

rm -rf "$OUTPUT_DIR"
cd "$PROJECT_ROOT"
quarto render
