#!/usr/bin/env bash
set -euo pipefail

mkdir -p public/videos/paris-spike
tmp="$(mktemp --suffix=.webm)"
trap 'rm -f "$tmp"' EXIT

curl --fail --location --retry 3 --retry-delay 2   "https://commons.wikimedia.org/wiki/Special:Redirect/file/Timelapse_Tour_Eiffel_%C3%A0_Paris.webm"   --output "$tmp"

ffmpeg -hide_banner -loglevel error -y   -ss 4 -i "$tmp" -t 11   -vf "scale=-2:720:flags=lanczos,fps=24"   -an   -c:v libx264 -profile:v high -pix_fmt yuv420p   -preset slow -crf 27 -movflags +faststart   public/videos/paris-spike/paris-hero.mp4

test -s public/videos/paris-spike/paris-hero.mp4
ls -lh public/videos/paris-spike/paris-hero.mp4
