# Spatial Experience Default

## Produktregel

Für **neue oder bewusst migrierte redaktionelle Beiträge** ist die räumliche Experience kein optionaler Zusatz mehr.

> Jeder neue veröffentlichte Beitrag braucht einen Cinematic Video Hero, eine Karte und eine zur Empfehlung passende räumliche Abfolge/Route.

`Content entscheidet. Experience visualisiert.` bleibt unverändert: Karte und Route dürfen keine neue Empfehlung erfinden.

## Gemeinsame Experience Grammar

Alle neuen Beiträge folgen demselben Unterbau:

1. Cinematic Video Hero mit lokalem Video und Poster/Fallback.
2. Redaktionelle Priorisierung im Content; keine zusätzliche Decision-Summary-Pflicht.
3. Kapitel/Stops mit stabilen IDs.
4. Karte mit den für die Empfehlung relevanten POIs.
5. Räumliche Sequence/Route in derselben redaktionellen Reihenfolge.
6. Option/Alternative/Plan B dort, wo der Content sie begründet.
7. Bestehende Gate-v3-Bausteine wie Tipps, Kosten und optionales Besonderes Extra.

Die Grammar ist verpflichtend, die konkrete Interaktion nicht. Sticky Stage, Media Swap und progressive Animation werden nur eingesetzt, wenn sie den Beitrag verbessern.

## Route ist nicht gleich Walking

- Stadt-/Tagesguide: Walking- oder redaktionelle Stop-Abfolge.
- Mehrtägige Region: Reiseetappen zwischen Orten.
- Themenroute: redaktionelle POI-Abfolge.
- Entscheidungsartikel: räumliche Einordnung/Verbindung der verglichenen Orte.

Turn-by-turn-Navigation ist nicht erforderlich. `editorial` darf eine direkte redaktionelle Verbindung zeigen; `walking` nutzt lokale, vorab erzeugte Geometrie.

## Architekturregel

Destination-spezifische Unterschiede gehören in Daten, nicht in neue Layouts. Kein `HeidelbergExperienceLayout`, `CordobaExperienceLayout` usw. Neue Mechaniken werden erst dann in die gemeinsame Engine aufgenommen, wenn sie sich nicht durch den Datenvertrag ausdrücken lassen.

Der bestehende Walking-Unterbau ist eine zulässige Ausprägung dieser Grammar, nicht ein eigener Produktpfad. Paris und ältere Spezialpfade gelten als Legacy/Referenz und werden nicht als Vorlage für neue destinationsspezifische Layouts kopiert.

## Publishing Contract

Neue Scaffolds tragen `spatialExperienceVersion: 1`. Dieses Feld ist die technische Grenze zwischen Legacy und neuem Standard.

Für `status: published` + `spatialExperienceVersion: 1` sind Pflicht:

- `heroVideo` mit `status: approved` und lokalem `src`;
- `heroImage` als semantischer Poster/Fallback;
- lokales Poster des Videos;
- ein Experience-Datensatz für denselben Slug;
- mindestens zwei POIs;
- `routeMode: editorial | walking`;
- bei `walking` eine lokale `routeUrl`; bei `editorial` ist die POI-Reihenfolge selbst die Route.

CI blockiert die Veröffentlichung, wenn einer dieser Bestandteile fehlt.

## Legacy / Migration

Bestehende veröffentlichte Beiträge ohne `spatialExperienceVersion` sind **grandfathered** und werden durch diese Änderung nicht rückwirkend blockiert. Sobald ein Beitrag bewusst auf `spatialExperienceVersion: 1` migriert wird, gilt der vollständige Publishing Contract.

Neue Artikel werden vom Generator immer mit Version 1 angelegt. Damit kann kein neuer Artikel versehentlich über den alten reinen `ArticleLayout`-Pfad veröffentlicht werden.

## Hero

Für Version 1 ist Video Pflicht. Die bestehenden Qualitätsregeln bleiben vollständig erhalten: freigegebener 7:3-Desktop-Crop, Poster/Fallback, Provenienz, natürliche Farbwirkung, lesbares Overlay, eigener Mobile-Crop/Breakpoint, Reduced Motion und Data Saver. Die Pflicht zum Video ist **keine Vereinfachung des Heroes**.

## Referenz

Heidelberg ist die jüngste E2E-Referenz für Video-Hero + Karte + redaktionelle Route. München zeigt das Walking-Muster. Beide nutzen gemeinsame Prinzipien; neue Beiträge dürfen daraus keine destinationsspezifischen Layoutkopien erzeugen.
