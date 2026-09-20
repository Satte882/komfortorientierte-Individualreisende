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
- Diese Hero-Regel gilt für **jede** Experience-Variante, ausdrücklich auch Walking Experiences; ein reiner Text-Hero ist dort kein zulässiger Fallback.
- `published` Experience-Content muss durch die Content-Validierung blockiert werden, wenn das Poster/Fallback fehlt.
- Ein **Cinematic Hero ist eine gemeinsame Komposition aus Medium und Einstiegstext**: Bild/Video liegt vollflächig im Hero, darüber liegen Scrim/Contrast-Layer sowie Breadcrumb, Eyebrow, H1, Lead und Metadaten. Ein flaches Medienbanner oberhalb eines separaten Text-Headers ist **kein** Cinematic Hero.
- Referenzaufbau: **Poster/Fallback → Video → Scrim → Content → Credit**. Paris ist dafür das Referenzmuster; destinationsspezifischer Code wird daraus nicht kopiert.
- Desktop/Wide: standardmäßig immersiv statt bannerartig; als Richtwert etwa 70–86 svh, gedeckelt um ca. 900 px. Ein flaches 16:7-Banner ist für einen Cinematic Hero nicht der Default.
- Mobile/Tablet: dieselbe visuelle Hierarchie bleibt erhalten. Höhe, Crop, Typografie und Scrim dürfen angepasst werden; der Hero wird nicht automatisch in „Medium oben, Text unten“ zerlegt.
- Text muss auch über bewegtem Bild jederzeit klar lesbar bleiben; dafür Scrim/Gradient und ruhige Textfläche nutzen, nicht das Medium pauschal entsättigen.
- Hero-Medien zeigen standardmäßig natürliche Farbe und eine zum Markenbild passende warme, ruhige Anmutung. Schwarz/Weiß oder starke Farblooks sind nur bei bewusster redaktioneller Entscheidung zulässig.
- Hero-Videos laufen ohne Ton.
- Bei `prefers-reduced-motion: reduce` wird kein Video geladen.
- Bei aktivem Data Saver wird kein Video geladen.
- Textlesbarkeit hat Vorrang vor dem Medium.

#### Lesson Learned – München Walking Hero

München #46 hat den technischen Vertrag erfüllt – lokales Video, Poster, Provenienz und Fallback –, aber den **Experience-Vertrag visuell verfehlt**: Das Medium wurde als separates, flaches Banner oberhalb des Headers gerendert und der ausgewählte Clip ist monochrom. Dadurch war der Hero technisch korrekt, aber deutlich schwächer als das Paris-Referenzmuster.

**Konsequenz:** Ein Hero-Gate prüft nicht nur „Asset vorhanden / Lizenz dokumentiert / Fallback funktioniert“, sondern immer auch **Komposition, Farbwirkung, Textfläche und tatsächliche Darstellung bei 390 px und 1440 px**.

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


## Walking-Map-Pattern

Für Stadt-/Walking-Guides mit typischerweise 3–8 Stopps gilt ein eigenes, aber vollständig kompatibles Experience-Muster.

### Desktop

- Karte bleibt links sticky.
- Story läuft rechts.
- Jeder Stop ist ein eigener stabiler Story-Step mit State-ID.
- Kein Scroll-Hijacking.
- Die Karte dient der räumlichen Orientierung, nicht als Turn-by-turn-Navigation.

### Mobile

- Karte bleibt oben sticky.
- Höhe: `clamp(240px, 38vh, 340px)`.
- Text läuft einspaltig darunter.
- Keine Desktop-Side-by-Side-Logik.
- Karteninteraktion auf Mobile wird minimiert, damit Touch-Scrollen nicht gestört wird.

### Deterministischer Scroll-State-Resolver

Die State-Auflösung darf nicht von einer lückenlosen Reihenfolge von IntersectionObserver-Events abhängen.

Standard:

1. Story-Steps tragen stabile `data-walking-step`-/State-IDs.
2. Bei Scroll und Resize wird per `requestAnimationFrame` die aktuelle DOM-Position ausgewertet.
3. Aktiv ist der Step, dessen Oberkante die definierte Leselinie zuletzt passiert hat.
4. Schnelles Scrollen oder übersprungene Sections führen deshalb direkt zum tatsächlich aktuellen State.
5. IntersectionObserver darf für Lazy-Loading eingesetzt werden, aber nicht als einzige Quelle der State-Historie.

### Kamera

Keine POI-spezifischen Handwerte.

- Gesamt-Bounds werden aus der vollständigen Walking-Route berechnet.
- `fitBounds()` bleibt die Basis für jeden State.
- Der aktive POI verschiebt den Schwerpunkt nur über automatisch berechnetes asymmetrisches Padding.
- Desktop: stärkerer Fokus, Mobile: kleinere Verschiebung.
- `maxZoom` verhindert aggressives Hineinzoomen.
- Der vollständige räumliche Zusammenhang bleibt sichtbar.

### Route

Zwei Ebenen werden gleichzeitig dargestellt:

- vollständige geplante Route dezent;
- bereits erreichte Route deutlich.

Markerzustände:

- `completed`
- `active`
- `future`

Die aktive Route wächst bis zum aktuellen POI. Beim Rückwärts-Scrollen wird sie entsprechend gekürzt.

### Route-Modi

`editorial`

- direkte Verbindung der POIs;
- zeigt nur redaktionelle Reihenfolge;
- nicht als exakter Fußweg bezeichnen.

`walking`

- echte, einmalig erzeugte Weggeometrie;
- lokal als GeoJSON gespeichert;
- keine Routing-API zur Laufzeit.

### Walking-Geometrie-Workflow

1. POIs redaktionell festlegen.
2. Route einmalig mit einem OSM-basierten Routing-Tool erzeugen.
3. GeoJSON exportieren.
4. Route lokal im Repo speichern.
5. kurz visuell prüfen.
6. Frontend verwendet ausschließlich die lokale Datei.

### Basemap und Betrieb

- Renderer: MapLibre GL JS.
- Standardprovider: OpenFreeMap Public Instance.
- Standardstyle: Positron.
- Provider-/Style-URL steht zentral in `src/config/maps.ts`.
- Keine individuellen Kartenstyles pro Destination.
- Keine zweite Kartenbibliothek.
- Kein Self-Hosting in V1.

OpenFreeMap hat kein SLA. Der Provider muss deshalb austauschbar bleiben, ohne Walking-State-/Route-Logik zu ändern.

### Attribution

Die MapLibre-Attribution bleibt sichtbar. OSM-/OpenMapTiles-Attribution darf nicht entfernt oder überdeckt werden.

### Walking-QA

Vor Human Gate mindestens prüfen:

- langsames Scrollen;
- schnelles Scrollen über mehrere Stops;
- Rückwärts-Scrollen;
- Resize;
- Mobile;
- Orientation Change;
- Marker `completed / active / future`;
- progressive Route;
- Kamera ohne POI-spezifisches Handtuning;
- sichtbare Attribution;
- kein horizontaler Overflow.
