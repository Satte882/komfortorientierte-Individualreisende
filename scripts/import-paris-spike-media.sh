#!/usr/bin/env bash
set -euo pipefail

mkdir -p public/images/paris-spike

download() {
  local url="$1"
  local target="$2"
  echo "Downloading $target"
  curl --fail --location --retry 3 --retry-delay 2 "$url" --output "$target"
  test -s "$target"
  file "$target"
}

download "https://upload.wikimedia.org/wikipedia/commons/9/90/Sunset_in_Paris_Seine_river_%2813104965964%29.jpg" "public/images/paris-spike/paris-seine-sunset.jpg"
download "https://upload.wikimedia.org/wikipedia/commons/9/94/Front_view_of_the_Mus%C3%A9e_d%27Orsay.jpg" "public/images/paris-spike/orsay.jpg"
download "https://upload.wikimedia.org/wikipedia/commons/9/95/Mus%C3%A9e_du_Louvre_at_Sunset.jpg" "public/images/paris-spike/louvre.jpg"
download "https://upload.wikimedia.org/wikipedia/commons/3/3b/Mus%C3%A9e_de_l%27Orangerie.jpg" "public/images/paris-spike/orangerie.jpg"

python3 - <<'PY'
from PIL import Image
from pathlib import Path

for path in Path("public/images/paris-spike").glob("*.jpg"):
    with Image.open(path) as image:
        image = image.convert("RGB")
        image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
        target = path.with_suffix(".webp")
        image.save(target, "WEBP", quality=82, method=6)
        print(target, image.size, target.stat().st_size)

for path in Path("public/images/paris-spike").glob("*.jpg"):
    path.unlink()
PY
