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

### Stage-State-Modell

> **Ein Content-Kapitel aktiviert genau einen Experience-State. Dieser State steuert atomar Medium, Decision, Karte, Route, Marker und Kamera.**

Damit gibt es keine getrennte Logik für Bildwechsel, Decision Layer und Kartenreaktion. Der Scroll-Trigger wählt nur den State; der State setzt alle sichtbaren Elemente gemeinsam.

Verbindliche Regeln:

- Ein Hauptkapitel erbt niemals unbemerkt den vorherigen visuellen Zustand.
- POI-Kapitel nutzen das passende POI-Medium, die passende Decision und denselben POI als Kartenfokus.
- Überblickskapitel nutzen einen echten Überblickszustand, z. B. eine Collage plus Gesamtkarte – kein beliebiges POI- oder Paris-Fallback.
- Flex-/Plan-B-Kapitel dürfen einen neutralen Ortskontext zeigen, aber keinen scheinbar aktiven POI.
- Bei Kern-POIs darf die Kamera den Schwerpunkt sichtbar verschieben, muss aber den relevanten räumlichen Zusammenhang erhalten.
- Route, aktiver Marker und Decision müssen dieselbe redaktionelle Reihenfolge ausdrücken.
- Klicks auf POI-Karten aktivieren denselben State wie Scrollen zum zugehörigen Kapitel.

#### Kapitel-Zuordnung

Die Zielarchitektur nutzt **stabile Kapitel-IDs bzw. State-Keys**, nicht fragile Freitext-RegExen auf gerenderten Überschriften.

Grund:

- Nummerierungen können sich ändern (`Louvre:` → `2. Louvre:`).
- typografische Zeichen können sich ändern (`'` → `’`).
- redaktionelle Umformulierungen dürfen die Experience nicht unbemerkt entkoppeln.

Freitext-Matcher sind höchstens Übergangslösung für einen Spike.

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
9. State-Sequenz prüfen: Kapitel → Medium → Decision → Marker → Route → Kamera.
10. Human Gate.

## Stop-Regel

Destination-spezifische Sonderlogik ist ein Warnsignal. Wenn eine neue Destination nur durch neue Komponenten oder neue Interaktionslogik funktioniert, zuerst prüfen, ob das Datenmodell unvollständig ist – nicht sofort die Engine erweitern.

## QA für Experience-States

Vor Freigabe eines Guides mindestens folgende Sequenz prüfen:

- jedes relevante Hauptkapitel aktiviert den erwarteten State;
- Medium und Decision wechseln synchron;
- POI-Kapitel aktivieren den richtigen Marker;
- progressive Route entspricht der redaktionellen Reihenfolge;
- Kamera bewegt sich sichtbar, ohne den benötigten Kontext zu verlieren;
- Überblicks-/Flex-Zustände zeigen keinen falschen aktiven POI;
- Klick auf POI-Karte und Scrollen führen zum selben State;
- Desktop und Mobile haben keinen horizontalen Overflow;
- Reduced Motion verändert Animationen, nicht die inhaltliche Zuordnung.

Paris #25 ist der Referenzfall für dieses Verhalten.
