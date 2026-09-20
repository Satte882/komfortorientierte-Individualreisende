#!/usr/bin/env bash
set -euo pipefail

mkdir -p public/images/paris-spike
tmp="$(mktemp --suffix=.jpg)"
trap 'rm -f "$tmp"' EXIT

curl --fail --location --retry 3 --retry-delay 2   "https://commons.wikimedia.org/wiki/Special:Redirect/file/Paris.-_Mus%C3%A9e_Marmottan_Monet.jpg"   --output "$tmp"

python3 - "$tmp" <<'PY'
from PIL import Image
from pathlib import Path
import sys

src = Path(sys.argv[1])
target = Path("public/images/paris-spike/marmottan.webp")
with Image.open(src) as image:
    image = image.convert("RGB")
    image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
    image.save(target, "WEBP", quality=82, method=6)
print(target, target.stat().st_size)
PY
