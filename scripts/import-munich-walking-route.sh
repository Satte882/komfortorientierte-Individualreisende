#!/usr/bin/env bash
set -euo pipefail

mkdir -p public/data/routes
tmp="$(mktemp --suffix=.json)"
trap 'rm -f "$tmp"' EXIT

url='https://routing.openstreetmap.de/routed-foot/route/v1/driving/11.57803,48.14358;11.58046,48.14274;11.57810,48.13984;11.57557,48.13712;11.57618,48.13550;11.57647,48.13228;11.58339,48.12988?overview=full&geometries=geojson&steps=false'

curl --fail --location --retry 3 --retry-delay 2 "$url" --output "$tmp"

python3 - "$tmp" <<'PY'
import json
from pathlib import Path
import sys

source = Path(sys.argv[1])
data = json.loads(source.read_text())

if data.get("code") != "Ok" or not data.get("routes"):
    raise SystemExit(f"Routing failed: {data}")

route = data["routes"][0]
geometry = route.get("geometry")
if not geometry or geometry.get("type") != "LineString" or len(geometry.get("coordinates", [])) < 2:
    raise SystemExit("Routing response has no usable LineString")

feature = {
    "type": "Feature",
    "properties": {
        "mode": "walking",
        "provider": "routing.openstreetmap.de",
        "sourceData": "OpenStreetMap",
        "distance_m": round(route.get("distance", 0)),
        "duration_s": round(route.get("duration", 0))
    },
    "geometry": geometry
}

target = Path("public/data/routes/munich-altstadt-walk.geojson")
target.write_text(json.dumps(feature, ensure_ascii=False, separators=(",", ":")) + "\n")
print(f"Wrote {target} with {len(geometry['coordinates'])} route coordinates")
print(f"Distance: {feature['properties']['distance_m']} m")
PY
