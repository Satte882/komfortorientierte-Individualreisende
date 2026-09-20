# München Hero Media

## Verwendung

- Guide: `munich-altstadt-walk`
- Position: Walking-Hero
- Video: `/videos/munich-altstadt-hero.mp4`
- Poster/Fallback: `/images/munich-altstadt-hero-poster.webp`
- Status: **Spike – lokal integriert**

## Quelle und Lizenz

- Quelle: Pexels
- Asset: **Aerial View of Marienplatz in Munich** – sommerlicher Marienplatz bei Tageslicht
- Urheber/Creator: **Marlon Castor**
- Quellseite: https://www.pexels.com/video/aerial-view-of-marienplatz-in-munich-37585740/
- Lizenz: **Pexels License**
- Lizenzprüfung: 2026-09-20
- Kommerzielle Nutzung: laut Pexels-Lizenz zulässig
- Attribution: nach Pexels-Lizenz nicht verpflichtend; im Frontmatter trotzdem dokumentiert

Pexels weist zusätzlich darauf hin, dass Rechte an dargestellten Personen, Marken oder sonstigen geschützten Inhalten unabhängig von der Dateilizenz relevant bleiben können. Deshalb bleibt das Asset trotz lokaler Integration im Status **Spike**; die Verwendung erfolgt als redaktionelles München-Hero ohne Endorsement-Behauptung.

## Bearbeitung und lokale Auslieferung

Aus dem Pexels-Original wurde für die Website ein lokales Derivat erzeugt:

- 8-Sekunden-Fassung ab ca. Sekunde 1 des Quellclips;
- Ton vollständig entfernt;
- vertikales Original auf den site-weiten 16:9-Hero-Frame zugeschnitten und auf 1280 × 720 px ausgegeben;
- H.264/MP4, Web-Optimierung mit Faststart;
- Poster aus dem Quellclip bei ca. Sekunde 4 als WebP erzeugt;
- Pexels kennzeichnet das Motiv als `Summer`, `Daytime`, `Blue Sky`, `Travel` und `Marienplatz`;
- automatischer Farbcheck des Posters: mittlere HSV-Sättigung `0.1642` (Grenzwert `0.10`).

Das Frontend lädt das Video nur, wenn weder `prefers-reduced-motion: reduce` noch Data Saver aktiv ist. Andernfalls bleibt ausschließlich das lokale Poster sichtbar.

## Alt-Text

> Sommerlicher Blick auf den Marienplatz in München mit Neuem Rathaus und blauem Himmel
