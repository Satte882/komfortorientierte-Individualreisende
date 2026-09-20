# Experience Data Contract

## Ziel

Destination-spezifische Unterschiede gehören in Daten, nicht in Komponenten-Code.

Der Vertrag beschreibt die minimalen Inputs für eine Experience. Er ist noch kein verpflichtendes CMS- oder Astro-Schema.

## `hero`

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `image` | ja | lokales Fallback-/Poster-Bild |
| `alt` | ja | Alt-Text des Bildes |
| `video` | nein | lokales, freigegebenes Hero-Video |
| `poster` | ja bei Video | statischer Fallback |
| `attribution` | ja | Quelle, Urheber, Lizenz |

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
