# München Hero Media

## Verwendung

- Guide: `munich-altstadt-walk`
- Position: Walking-Hero
- Video: `/videos/munich-altstadt-hero.mp4`
- Poster/Fallback: `/images/munich-altstadt-hero-poster.webp`
- Status: **Spike – lokal integriert**

## Quelle und Lizenz

- Quelle: Pexels
- Asset: **Time Lapse of a City** – München-Cityscape mit Himmel und Verkehr
- Urheber/Creator: **Fluxx Films**
- Quellseite: https://www.pexels.com/video/time-lapse-of-a-city-3863114/
- Lizenz: **Pexels License**
- Lizenzprüfung: 2026-09-20
- Kommerzielle Nutzung: laut Pexels-Lizenz zulässig
- Attribution: nach Pexels-Lizenz nicht verpflichtend; im Frontmatter trotzdem dokumentiert

Pexels weist zusätzlich darauf hin, dass Rechte an dargestellten Personen, Marken oder sonstigen geschützten Inhalten unabhängig von der Dateilizenz relevant bleiben können. Deshalb bleibt das Asset trotz lokaler Integration im Status **Spike**; die Verwendung erfolgt als redaktionelles München-Hero ohne Endorsement-Behauptung.

## Bearbeitung und lokale Auslieferung

Aus dem Pexels-Original wurde für die Website ein lokales Derivat erzeugt:

- 8-Sekunden-Fassung ab ca. Sekunde 2 des Quellclips;
- Ton vollständig entfernt;
- auf 1280 × 720 px skaliert/zugeschnitten;
- H.264/MP4, Web-Optimierung mit Faststart;
- Poster aus dem Quellclip bei ca. Sekunde 4 als WebP erzeugt;
- automatischer Farbcheck des Posters: mittlere HSV-Sättigung `0.1397` (Grenzwert `0.10`), damit nicht erneut ein praktisch monochromes Hero-Asset durchgewinkt wird.

Das Frontend lädt das Video nur, wenn weder `prefers-reduced-motion: reduce` noch Data Saver aktiv ist. Andernfalls bleibt ausschließlich das lokale Poster sichtbar.

## Alt-Text

> Münchner Stadtansicht mit Gebäuden, Himmel und Verkehr als Einstieg in den Altstadt-Walk
