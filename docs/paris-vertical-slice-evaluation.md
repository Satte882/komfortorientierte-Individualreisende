# Paris Vertical Slice – Spike-Auswertung

Bezug: GitHub Issue #16.

## Ergebnis

Der Spike zeigt, dass die gewünschte Richtung mit Standard-Web-Mechaniken grundsätzlich erreichbar ist:

- echte Fotografie erzeugt bereits im Hero einen deutlich hochwertigeren Einstieg;
- eine sticky Visual Stage kann Bild, Karte und redaktionelle Entscheidung dauerhaft zusammenführen;
- Scroll-linked Map Focus funktioniert mit einer Standard-Map-Library;
- die redaktionelle Route kann progressiv visualisiert werden;
- die bestehende Decision-Logik bleibt der fachliche Kern und wird nur visuell verstärkt;
- der komplette Guide bleibt statisches Astro-HTML und damit unabhängig von der interaktiven Schicht lesbar.

Der Spike entscheidet bewusst noch **nicht** über einen finalen Map-Provider oder eine generische Destination-Pipeline.

## Vorher / Nachher

| Aspekt | Vorher: aktueller Paris-Guide auf main | Nachher: Vertical Slice |
| --- | --- | --- |
| Einstieg | klassischer zweispaltiger Artikel-Hero | großformatiger Cinematic Hero mit realem Paris-Foto |
| Medien | Demo-SVG | lokal ausgelieferte, lizenzierte Fotografie für Paris, Orsay, Louvre und Orangerie |
| räumlicher Kontext | keiner | interaktive Paris-Karte mit POIs und redaktioneller Abfolge |
| Scroll-Verhalten | normaler Artikel | Desktop: Sticky Visual Stage; Mobile: linearer Flow |
| Decisions | statische EditorialChoice-/Skip-Boxen | bestehende Boxen bleiben + aktiver Decision Layer in der Visual Stage |
| Route | keine | progressive redaktionelle Verbindung Orsay → Louvre → Orangerie |
| Produktlogik | redaktionelle Priorisierung | unverändert; nur visuell verstärkt |

Screenshots des neuen Spikes wurden automatisiert für Desktop und Mobile erzeugt und im QA-Run als Artifact gespeichert.

## Mechaniken: Nutzen im Spike

| Mechanik | Beobachtung | Nutzen/Aufwand |
| --- | --- | --- |
| Cinematic Hero | größter unmittelbarer Qualitätsunterschied gegenüber dem bisherigen SVG-Platzhalter | sehr hoch |
| Kapitel-System | vorhandene H2-Struktur kann als Trigger genutzt werden; kein neues Content-Modell nötig | hoch |
| Sticky Visual Stage | hält Kontext sichtbar, während der Artikel lesbar bleibt | sehr hoch |
| Media Swap | starke Wirkung mit wenig zusätzlicher Technik; Qualität hängt an den Assets | sehr hoch |
| Scroll-linked Map Focus | macht die redaktionelle Abfolge räumlich verständlich | hoch |
| animierte Route | unterstützt Orientierung, ist aber weniger wichtig als Map Focus + Decision | mittel |
| POI / Story Cards | gute direkte Navigation zwischen Karte und Artikel | hoch |
| Decision Layer | verhindert, dass die Experience zu einem reinen visuellen Reiseblog wird | sehr hoch |

## Templatisierbar

Diese Teile wurden im Spike ohne Paris-spezifische Spezialtechnik umgesetzt und sind grundsätzlich als Template denkbar:

- Hero-Struktur;
- Sticky Stage;
- Media-Swap-Mechanik;
- IntersectionObserver-basierte Kapiteltrigger;
- Kartenfokus / Fly-to;
- POI-Marker;
- progressive Route;
- Story Cards;
- Decision Overlay;
- Desktop-/Mobile-/Reduced-Motion-Verhalten.

## Pro Reiseziel individuell

Diese Inputs bleiben redaktionell bzw. medienspezifisch:

- Auswahl und Rechteprüfung der Bilder/Videos;
- Kapitel ↔ POI-Zuordnung;
- POI-Koordinaten;
- sinnvolle Karten-Zoomstufen;
- Route bzw. Reihenfolge;
- Decision-Rolle und Begründung;
- Auswahl, welche Kapitel überhaupt eine visuelle Reaktion benötigen.

Das ist die gewünschte Grenze: **individuelle Inhalte und Art Direction, aber keine individuelle Engine.**

## Technische Spike-Entscheidung

Für den Spike:

- MapLibre GL JS 6.10.0 als Standard-Web-Renderer;
- OpenFreeMap Liberty als temporärer Tile-/Style-Provider;
- keine API-Keys;
- kein Custom-WebGL;
- Map und Tiles werden lazy geladen;
- Hauptinhalt liegt statisch im HTML.

Diese Kombination ist **keine Produktionsentscheidung**. Vor einer Pipeline ist ein eigener ADR zu MapLibre/Mapbox, Tile-Provider, Kosten, SLA, Datenschutz und Lock-in erforderlich.

## SEO / Performance

Erfüllt bzw. im Spike berücksichtigt:

- Haupttext wird statisch von Astro gebaut;
- Decisions und POI-Kontext existieren außerhalb der Map;
- Karte wird erst nahe der Stage geladen;
- echte Bilder liegen lokal;
- kein Hero-Video im Spike, damit kein unnötiger LCP-Risikofaktor eingeführt wird;
- Mobile nutzt keinen erzwungenen Sticky-Scroll;
- prefers-reduced-motion wird berücksichtigt;
- visuelle QA prüft horizontalen Overflow und tatsächliche Map-Initialisierung.

Offene Produktionsmessung:

- reale Core Web Vitals erst nach dauerhaftem Hosting / finalem Map-Stack;
- externe Map-Ressourcen und CDN-Abhängigkeit müssen vor Produktion bewertet werden.

## Visuelle QA

Automatisiert geprüft bei:

- Desktop 1440 × 1200;
- Mobile 390 × 844;
- Reduced Motion 390 × 844.

Geprüft:

- Hero;
- Story-/Karten-Stage;
- MapLibre-Canvas tatsächlich initialisiert;
- kein horizontaler Overflow;
- Reduced-Motion-Media-Query aktiv.

QA-Run: https://github.com/Satte882/komfortorientierte-Individualreisende/actions/runs/35500722917

## Human Gate

Der Spike ist technisch und visuell bereit für die Nutzerbewertung.

Noch **nicht** tun:

- keine zweite Destination migrieren;
- keine generische Experience-Pipeline bauen;
- keinen finalen Map-Stack festschreiben;
- keine zusätzlichen Cinematic-Mechaniken hinzufügen.

Nächste Entscheidung: Qualität überzeugt / teilweise behalten / verwerfen.
