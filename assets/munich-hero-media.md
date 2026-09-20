# München Hero Media

## Verwendung

- Guide: `munich-altstadt-walk`
- Position: Walking-Hero
- Video: `/videos/munich-altstadt-hero.mp4`
- Poster/Fallback: `/images/munich-altstadt-hero-poster.webp`
- Status: **Spike – lokal integriert**

## Quelle und Lizenz

- Quelle: Pexels
- Asset: **Dynamic Urban City Traffic in Tilt-Shift** – sommerliche München-Stadtansicht mit sichtbarer Bewegung
- Urheber/Creator: **SHOX ART**
- Quellseite: https://www.pexels.com/video/dynamic-urban-city-traffic-in-tilt-shift-37252002/
- Lizenz: **Pexels License**
- Lizenzprüfung: 2026-09-20
- Kommerzielle Nutzung: laut Pexels-Lizenz zulässig
- Attribution: nach Pexels-Lizenz nicht verpflichtend; im Frontmatter trotzdem dokumentiert

Pexels weist zusätzlich darauf hin, dass Rechte an dargestellten Personen, Marken oder sonstigen geschützten Inhalten unabhängig von der Dateilizenz relevant bleiben können. Deshalb bleibt das Asset trotz lokaler Integration im Status **Spike**; die Verwendung erfolgt als redaktionelles München-Hero ohne Endorsement-Behauptung.

## Bearbeitung und lokale Auslieferung

Aus dem Pexels-Original wurde für die Website ein lokales Derivat erzeugt:

- 8-Sekunden-Fassung ab ca. Sekunde 1 des Quellclips;
- Ton vollständig entfernt;
- Querformat-Original (1920 × 1080, 16:9) auf 1280 × 720 px als lokales Web-Derivat ausgegeben;
- H.264/MP4, Web-Optimierung mit Faststart;
- Poster aus dem Quellclip bei ca. Sekunde 4 als WebP erzeugt;
- Pexels kennzeichnet das Motiv u. a. mit `Munich`, `Summer`, `Daylight`, `Cityscape` und `Motion`;
- automatischer Farbcheck des Posters: mittlere HSV-Sättigung `0.2502` (Grenzwert `0.10`).

Das Frontend lädt das Video nur, wenn weder `prefers-reduced-motion: reduce` noch Data Saver aktiv ist. Andernfalls bleibt ausschließlich das lokale Poster sichtbar.

## Alt-Text

> Sommerliche Luftaufnahme von München mit Stadtverkehr und urbaner Kulisse
