#!/usr/bin/env bash
# Re-compress GLBs with gltf-transform (meshopt + webp textures + light simplify).
# Backups are written to public/models/originals/ before overwriting.

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MODELS="$ROOT/public/models"
OPTIMIZE=(npx --yes @gltf-transform/cli optimize)
FLAGS=(--compress meshopt --texture-compress webp --simplify --simplify-ratio 0.75 --simplify-error 0.0005)

mkdir -p "$MODELS/originals"

compress() {
  local file="$1"
  local ratio="${2:-0.75}"
  local src="$MODELS/$file"
  local backup="$MODELS/originals/$file"
  local tmp="$MODELS/${file%.glb}.opt.glb"

  cp "$src" "$backup"
  "${OPTIMIZE[@]}" "$src" "$tmp" "${FLAGS[@]}" --simplify-ratio "$ratio"
  mv "$tmp" "$src"
  echo "✓ $file"
}

compress house_palm_plant.glb 0.75
compress anatomical_eye_ball.glb 0.75
compress magnifying_glass.glb 0.8
compress mario_question_block.glb 0.8
compress retro_computer_setup.compressed.glb 0.85

echo "Done. Sizes:"
ls -lh "$MODELS"/*.glb
