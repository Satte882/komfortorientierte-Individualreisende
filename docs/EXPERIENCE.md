# Experience Framework

## Grundsatz

> **Content entscheidet. Experience visualisiert.**

Die Experience macht redaktionelle Entscheidungen räumlich, visuell und im Reiseverlauf verständlicher. Sie ersetzt weder das fachliche Urteil noch den statischen Artikel.

Nicht gemeint sind:

- Reiseplanner;
- Social-/Influencer-Produkt;
- automatische Recommendation Engine;
- Scrollytelling als Selbstzweck.

## Visual Grammar

Die aktuelle Experience besteht aus acht wiederverwendbaren Mechaniken:

1. **Cinematic Hero** – großes Bild oder optional Video als Einstieg.
2. **Kapitel-System** – redaktionelle Abschnitte steuern die Experience.
3. **Sticky Visual Stage** – visueller Kontext bleibt auf Desktop sichtbar.
4. **Media Swap** – Bild/Video wechselt passend zum aktiven Kapitel.
5. **Scroll-linked Map** – Karte reagiert auf den redaktionellen Verlauf.
6. **Progressive Route** – Gesamtweg bleibt sichtbar, aktive Teilroute wächst.
7. **POI Story Cards** – direkte Verbindung zwischen Ort, Bild und Artikel.
8. **Decision Layer** – Priorität, optional oder bewusst weglassen mit Begründung.

Nicht jede Destination braucht alle acht Mechaniken. Die Auswahl folgt dem Inhalt.

## Verbindliche Regeln

### Hero

- Video ist optional, nie Pflicht.
- Ein Poster/Fallback-Bild ist immer Pflicht.
- Hero-Videos laufen ohne Ton.
- Bei `prefers-reduced-motion: reduce` wird kein Video geladen.
- Bei aktivem Data Saver wird kein Video geladen.
- Textlesbarkeit hat Vorrang vor dem Medium.

### Sticky Stage

- Desktop: Sticky Stage ist erlaubt, wenn sie Orientierung schafft.
- Mobile: linearer Flow; kein erzwungenes Sticky- oder Scroll-Hijacking.
- Die Stage ergänzt den Artikel, sie darf ihn nicht ersetzen.

### Karte und Route

- Räumlichen Zusammenhang vor Einzelpunkt-Detail priorisieren.
- Kernroute nicht durch aggressiven Einzelpunkt-Zoom verlieren.
- Geplante Gesamtverbindung dezent sichtbar halten.
- Bereits aktive Teilroute deutlich hervorheben.
- Aktiven POI klar markieren; vorherige und kommende Stops unterscheidbar machen.
- Karte darf nie die einzige Quelle für Orts- oder Entscheidungsinformation sein.

### Decision Layer

- Jede sichtbare Entscheidung braucht eine redaktionelle Begründung.
- Labels wie `Priorität`, `optional` oder `weglassen` sind keine Dekoration.
- Decision, Kapitel, POI und Karte müssen semantisch zusammenpassen.
- Visualisierung darf das Urteil verstärken, aber nicht neu erfinden.

## Wann eine Experience sinnvoll ist

Hohe Eignung:

- mehrere räumlich zusammenhängende Stops;
- klare Prioritäten oder Trade-offs;
- Route oder Reihenfolge ist für die Entscheidung relevant;
- ausreichend starkes, rechtlich nutzbares Bild-/Videomaterial.

Niedrige Eignung:

- reine Regel-/Visa-/Infoartikel;
- Entscheidungen ohne räumlichen Bezug;
- Artikel, bei denen die Visualisierung keinen zusätzlichen Entscheidungswert schafft.

## Vorgehen

1. Guide fachlich fertigstellen.
2. Experience-Eignung prüfen.
3. Kapitel und Decisions markieren.
4. Medien auswählen und freigeben.
5. POIs und Route definieren.
6. Experience-Daten erfassen.
7. Standardmechaniken rendern.
8. Desktop, Mobile, Reduced Motion, Data Saver, SEO und Performance prüfen.
9. Human Gate.

## Stop-Regel

Destination-spezifische Sonderlogik ist ein Warnsignal. Wenn eine neue Destination nur durch neue Komponenten oder neue Interaktionslogik funktioniert, zuerst prüfen, ob das Datenmodell unvollständig ist – nicht sofort die Engine erweitern.
