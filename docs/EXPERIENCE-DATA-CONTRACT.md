# Experience Data Contract

## Ziel

Destination-spezifische Unterschiede gehören in Daten, nicht in Komponenten-Code.

Der Vertrag beschreibt die minimalen Inputs für eine Experience. Er ist noch kein verpflichtendes CMS- oder Astro-Schema.

## `hero`

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `heroTitle` | nein | kürzere sichtbare H1-Fassung, wenn der vollständige Artikeltitel nicht in das feste Hero-Budget passt |
| `image` | ja | lokales Fallback-/Poster-Bild |
| `alt` | ja | Alt-Text des Bildes |
| `video` | nein | lokales, freigegebenes Hero-Video |
| `poster` | ja bei Video | statischer Fallback im selben Desktop-Hero-Crop |
| `attribution` | ja | Quelle, Urheber, Lizenz |

Der Hero-Vertrag ist **layoutübergreifend**. Paris-, Walking- und spätere Experience-Layouts müssen denselben Vertrag rendern; eine Experience darf den Hero nicht durch eine reine Text-/Infobox ersetzen. Desktop-Hero-Medien werden als abgenommenes `7:3`-Derivat ausgeliefert. Nach dem Hero folgt immer eine eigene Post-Hero-Intro-Zone für Description/Meta/Einordnung, bevor der Main Content beginnt.

Für die aktuelle Astro-Implementierung liegen Poster-/Video-Provenienz im Content-Frontmatter (`heroImage` / `heroVideo`), während Walking-Routen- und POI-Daten getrennt bleiben. Das verhindert doppelte Medienmetadaten im Experience-State.

## `chapters[]`

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `id` | ja | stabiler Schlüssel |
| `title` | ja | redaktioneller Kapitelname |
| `contentRef` | ja | Referenz auf Heading/Content-Abschnitt |
| `media` | nein | Bild/Video für Media Swap |
| `poiId` | nein | zugehöriger POI |
| `decisionId` | nein | zugehörige redaktionelle Entscheidung |
| `experienceStateId` | ja bei Experience | stabiler Key des zu aktivierenden Stage-States |

## `experienceStates[]`

Ein Experience-State ist die **atomare visuelle Reaktion** auf ein Content-Kapitel.

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `id` | ja | stabiler State-Key, z. B. `orsay`, `plan`, `flex` |
| `media` | ja | Medium oder definierter Medienverbund, z. B. Bild oder Collage |
| `decision.role` | ja | redaktionelle Rolle / Status |
| `decision.title` | ja | sichtbare Kernaussage |
| `decision.copy` | ja | kurze Begründung |
| `map.view` | ja bei Karte | z. B. `core`, `all`, `neutral` |
| `map.focusPoiId` | nein | aktiver POI; leer bei Überblick/Flex |
| `map.routeProgress` | ja bei Route | `none`, `full` oder Fortschritt bis POI/Index |
| `map.cameraPreset` | nein | standardisierte Schwerpunktverschiebung, kein freier JS-Code |

Beispiel:

```yaml
chapters:
  - id: orsay
    experienceStateId: orsay
  - id: four-day-plan
    experienceStateId: plan
  - id: plan-b
    experienceStateId: flex

experienceStates:
  - id: orsay
    media: orsay
    decision:
      role: priority
      title: Musée d'Orsay
      copy: Höchste Profilpassung für diesen Guide.
    map:
      view: core
      focusPoiId: orsay
      routeProgress: 1
      cameraPreset: focus-left

  - id: plan
    media: core-museums-collage
    decision:
      role: overview
      title: Orsay → Louvre → Orangerie → Flex
      copy: Drei Kunstanker, ein geschützter Flex-Tag.
    map:
      view: core
      focusPoiId: null
      routeProgress: full
      cameraPreset: overview

  - id: flex
    media: paris-context
    decision:
      role: flex
      title: Tag D hält die Reise beweglich
      copy: Wetter, Müdigkeit und verpasste Slots werden abgefangen.
    map:
      view: neutral
      focusPoiId: null
      routeProgress: full
      cameraPreset: overview
```

Regel:

> **Kapitel referenzieren States über stabile IDs. Gerenderte Überschriftentexte sind kein Datenvertrag.**

Damit dürfen Nummerierung, Zeichensetzung und redaktionelle Formulierung geändert werden, ohne die Experience-Kopplung zu zerstören.

## `pois[]`

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `id` | ja | stabiler Schlüssel |
| `name` | ja | sichtbarer Ortsname |
| `coordinates` | ja | Längengrad/Breitengrad |
| `image` | nein | freigegebenes POI-Medium |
| `shortContext` | ja | kurze redaktionelle Einordnung |
| `role` | ja | `priority | optional | skip | neutral` |

## `route`

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `orderedPoiIds` | ja | fachlich sinnvolle Reihenfolge |
| `geometry` | nein | GeoJSON/Route, falls eine echte Geometrie benötigt wird |
| `routeLabel` | nein | Hinweis wie „redaktionelle Abfolge“ |

Die Standarddarstellung hält die Gesamtverbindung dezent sichtbar und hebt den bereits aktiven Teil hervor.

## `decisions[]`

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `id` | ja | stabiler Schlüssel |
| `role` | ja | `priority | optional | skip` |
| `title` | ja | Gegenstand der Entscheidung |
| `reason` | ja | redaktionelle Begründung / Trade-off |
| `alternative` | nein | für welches Profil anders entschieden würde |

## `visualConfig`

Nur standardisierte Flags, zum Beispiel:

- `heroVideo: boolean`
- `stickyStage: boolean`
- `map: boolean`
- `progressiveRoute: boolean`
- `poiCards: boolean`
- `decisionLayer: boolean`

Keine freien JavaScript-/CSS-Snippets und keine individuelle Animationsprogrammierung pro Artikel.

Die Rendering-Engine liest `experienceStateId` und setzt Medium, Decision, Karte, Route, Marker und Kamera gemeinsam. Destination-spezifische Zuordnung gehört in den Datenvertrag – nicht in Heading-RegExen im Frontend.

## Akzeptanzregel für Destination 2

Die Engine gilt erst dann als destinationsübergreifend belastbar, wenn ein strukturell anderes Ziel mit diesem Vertrag umgesetzt werden kann, ohne destinationsspezifische Komponentenlogik einzubauen.


## Walking Experience Contract

Walking-Guides ergänzen den bestehenden State-Vertrag um eine kleine Kartenkonfiguration.

```yaml
map:
  provider: openfreemap
  style: positron
  routeMode: walking
  routeUrl: /data/routes/example.geojson

pois:
  - id: stop-1
    name: Erster Stopp
    coordinates: [11.0, 48.0]
    shortContext: Kurze Einordnung
  - id: stop-2
    name: Zweiter Stopp
    coordinates: [11.1, 48.1]
    shortContext: Kurze Einordnung

route:
  orderedPoiIds:
    - stop-1
    - stop-2

chapters:
  - id: stop-1
    experienceStateId: stop-1
  - id: stop-2
    experienceStateId: stop-2
```

Verbindlich:

- POI-Reihenfolge ist Dateninput, keine Komponentenlogik.
- Story-Step-ID und POI-ID sind stabil und identisch referenzierbar.
- Walking-Geometrie liegt lokal; kein Runtime-Routing.
- Provider/Style kommen aus zentraler Konfiguration.
- Routenfortschritt wird aus der lokalen Route bis zum nächstgelegenen Routenindex des aktiven POI berechnet.
- Kamera-Padding wird generisch aus Route-Bounds und Lage des aktiven POI berechnet.
