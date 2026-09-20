#!/usr/bin/env bash
set -euo pipefail

mkdir -p public/data/routes
tmp="$(mktemp --suffix=.json)"
trap 'rm -f "$tmp"' EXIT

url='https://routing.openstreetmap.de/routed-foot/route/v1/driving/11.5775,48.142222;11.578061,48.13985;11.5755,48.1374;11.57618,48.1355;11.57603,48.1317;11.583031,48.130025?overview=full&geometries=geojson&steps=false'

curl --fail --location --retry 3 --retry-delay 2 \
  --user-agent 'komfortorientierte-individualreisende-route-spike/1.0' \
  "$url" \
  --output "$tmp"

python3 - "$tmp" <<'PY'
import json
from pathlib import Path
import sys

source = Path(sys.argv[1])
payload = json.loads(source.read_text())

if payload.get("code") != "Ok" or not payload.get("routes"):
    raise SystemExit(f"routing failed: {payload.get('code')} {payload.get('message', '')}")

route = payload["routes"][0]
geometry = route.get("geometry")
if not geometry or geometry.get("type") != "LineString" or len(geometry.get("coordinates", [])) < 2:
    raise SystemExit("routing response contains no usable LineString")

feature = {
    "type": "Feature",
    "properties": {
        "source": "routing.openstreetmap.de / FOSSGIS",
        "profile": "foot",
        "generated": "2026-09-20",
        "distanceMeters": round(route.get("distance", 0)),
        "durationSeconds": round(route.get("duration", 0)),
        "runtimeRouting": False
    },
    "geometry": geometry
}

target = Path("public/data/routes/munich-old-town-walk.geojson")
target.write_text(json.dumps(feature, ensure_ascii=False, separators=(",", ":")) + "\n")
print(target, len(geometry["coordinates"]), feature["properties"])
PY
