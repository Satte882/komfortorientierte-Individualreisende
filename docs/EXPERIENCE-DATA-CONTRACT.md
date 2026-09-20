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

## Akzeptanzregel für Destination 2

Die Engine gilt erst dann als destinationsübergreifend belastbar, wenn ein strukturell anderes Ziel mit diesem Vertrag umgesetzt werden kann, ohne destinationsspezifische Komponentenlogik einzubauen.
