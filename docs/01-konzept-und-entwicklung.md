# Konzept und Entwicklung

Stand: 19.09.2026

## 1. Ausgangsidee

Die ursprüngliche Idee war einfach:

- Für eine Destination, z. B. Island, werden 5–10 Reiseblogs recherchiert.
- Deren Inhalte werden in eigenen Worten zusammengefasst.
- Die ursprünglichen Reiseblogs werden transparent verlinkt und als Quellen genannt.
- Monetarisierung erfolgt über Affiliate-Links und später eventuell Werbung.

Die erste Leitfrage war damit nicht „Wie bauen wir eine Reiseplattform?“, sondern:

> Kann man aus mehreren bestehenden Reiseblogs einen nützlichen, rechtlich vertretbaren Reiseartikel erstellen und damit ein Affiliate-Content-Modell aufbauen?

## 2. Entwicklung des Konzepts

### Stufe A – reine Zusammenfassung mehrerer Blogs

Beispiel:

- Blog A empfiehlt X.
- Blog B empfiehlt Y.
- Blog C beschreibt Z.
- Daraus entsteht ein zusammenfassender Island-Artikel.

Vorteile:

- sehr einfacher Produktionsprozess;
- wenig technische Komplexität;
- viele Quellen können genutzt werden;
- transparentes Verlinken kann den Leser zu den Originalen führen.

Probleme:

- rechtliches Risiko bei zu enger Paraphrase;
- wenig eigener Mehrwert;
- schwache Differenzierung gegenüber Suchmaschinen und generativer KI;
- Gefahr, wie ein Content-Aggregator zu wirken;
- keine belastbare Annahme, dass eine reine Zusammenfassung gut konvertiert.

Diese Variante wurde daher verworfen.

### Stufe B – Synthese statt Zusammenfassung

Nächste Idee:

- mehrere Reiseberichte auswerten;
- Gemeinsamkeiten und Widersprüche herausarbeiten;
- eigene Tabellen und Entscheidungskriterien entwickeln;
- nicht Blog für Blog nacherzählen.

Beispiel:

> „Island in 10 Tagen: Was mehrere Reiseberichte gemeinsam empfehlen und wo sich die Einschätzungen unterscheiden.“

Mögliche Logik:

- Ringstraße in zehn Tagen;
- Mietwagen oder Camper;
- Golden Circle;
- Westfjorde;
- sinnvolle Übernachtungsorte;
- typische Fehler.

Vorteil:

Die Website nutzt eher die Fakten- und Erkenntnisebene als die konkrete sprachliche Gestaltung einzelner Quellen.

Kritik:

- Aussagen wie „7 von 9 Blogs empfehlen X“ erzeugen hohen Verifikations- und Pflegeaufwand;
- ohne eigene Erfahrung bleibt offen, wie stark die eigene Bewertung glaubwürdig ist;
- auch diese Synthese kann von ChatGPT, Google AI Search oder ähnlichen Systemen teilweise repliziert werden;
- eine reine Meta-Auswertung ist noch kein starker wirtschaftlicher Burggraben.

Diese Variante bleibt als Recherchetechnik relevant, aber nicht als Kernpositionierung.

### Stufe C – datenbasierter Reise-Entscheidungshelfer

Zwischenzeitlich wurde vorgeschlagen, Reiseentscheidungen stärker mit Primär- und Live-Daten zu unterstützen:

- Wetter;
- Straßenzustände;
- aktuelle Preise;
- Flug- und Hotelinformationen;
- Mietwagenangebote;
- laufend aktualisierte Datenquellen.

Die Idee war:

> Quellen + aktuelle Daten + Reiseberichte → konkrete Entscheidung → Affiliate-Angebot.

Diese Variante wurde bewusst verworfen.

Grund:

Das wäre ein Produkt-Pivot von einer Content-Website zu einem Datenprodukt mit:

- APIs;
- Datenpipelines;
- Rate Limits;
- Fehlerbehandlung;
- laufender Preisaktualisierung;
- zusätzlichem Betriebs- und Entwicklungsaufwand.

Für die eigentliche Nutzerintention ist das meist unnötig. Wer einen Urlaub Monate im Voraus plant, braucht nicht das Wetter oder den Straßenzustand von heute.

### Stufe D – redaktionelle Entscheidungshilfe mit Kuration

Aktueller Kern:

> Eine normale Content-Website kuratiert Reisen nach Interessen, Reisestil und verfügbaren Tagen und hilft dem Nutzer bewusst bei Auswahl und Trade-offs.

Die Website soll nicht möglichst viele Dinge auflisten, sondern entscheiden helfen:

- Was passt zu meinem Interesse?
- Was lohnt sich bei meiner Reisedauer?
- Was kann ich weglassen?
- Welche Orte sollte ich kombinieren?
- Wo sollte ich übernachten?
- Wann lohnt sich Mietwagen, Tour oder Ticket?
- Welche Alternativen gibt es?

Der eigene Mehrwert liegt damit in:

1. Auswahl,
2. Gewichtung,
3. Priorisierung,
4. Trade-offs,
5. transparenter Begründung,
6. bewusster Nicht-Auswahl.

## 3. Kuration als zentraler Hebel

Der stärkste neue Gedanke ist die Kuration nach Interesse.

Beispiele:

- Kunst und Gemälde;
- Architektur;
- Geschichte;
- Natur und Wandern;
- Radfahren;
- Wintersport;
- Essen und Genuss.

Wichtig:

Kuration bedeutet nicht, einfach eine weitere Liste zu bauen.

Schwach:

> „Die 25 besten Museen in Paris.“

Stärker:

> „Vier Tage Paris mit Schwerpunkt impressionistische Malerei: Diese fünf Orte priorisieren wir; diese bekannten Sehenswürdigkeiten würden wir bei diesem Profil bewusst nach hinten stellen.“

Die eigentliche Leistung ist also nicht das Sammeln, sondern das Weglassen und Begründen.

## 4. Destination-first und Interest-first

Die Seite kann zwei Einstiege unterstützen, ohne eine komplexe Software zu werden.

### Destination-first

Beispiel:

**Paris**

- Kunst;
- Architektur;
- Geschichte;
- Essen;
- 2 Tage, 4 Tage und 7 Tage innerhalb der jeweiligen Inhalte.

### Interest-first

Beispiel:

**Kunst**

- Florenz;
- Paris;
- Madrid;
- Wien;
- Amsterdam.

Oder:

**Wandern**

- Madeira;
- Dolomiten;
- Island;
- Mallorca.

Die Website bleibt dabei eine redaktionelle Content-Seite. Kategorien und Tags reichen zunächst aus.

## 5. Kein UI- oder Softwareprodukt

Aktueller Grundsatz:

> Content zuerst. Kuration als redaktionelle Methode. Einfache Taxonomie. Software nur später, wenn echte Nutzerdaten einen Bedarf zeigen.

Nicht erforderlich:

- Login;
- Nutzerprofile;
- Recommendation Engine;
- dynamische Reiseplanung;
- Live-APIs;
- Filter-App;
- Chatbot als Kernprodukt;
- eigene Buchungsengine.

Später könnte aus vorhandenen Metadaten eine bessere Navigation entstehen. Das ist aber kein Startbedarf.

## 6. Evergreen statt Live-Daten

Für die Mehrheit der redaktionellen Reiseplanung sind stabile Informationen wichtiger als Echtzeitdaten.

### Sehr stabil

- Welche Region eignet sich wofür?
- Sinnvolle Reisedauer;
- typische 7-/10-/14-Tage-Routen;
- Mietwagen oder Camper;
- welche Orte kombinierbar sind;
- wo Übernachtungen logisch liegen;
- welche Interessen an welchem Ort besonders gut bedient werden.

### Mittlere Aktualität

- Eintrittspreise;
- Parkregeln;
- Anbieter;
- Öffnungszeiten;
- Verkehrsregeln;
- Einreisebestimmungen.

Diese Inhalte müssen regelmäßig geprüft werden.

### Nicht als eigenes Produkt nötig

- heutiges Wetter;
- heutige Straßensperrung;
- tagesaktueller Hotelpreis;
- tagesaktueller Flugpreis.

Solche Informationen liefern offizielle Quellen oder Affiliate-Partner besser.

## 7. Beispiel Island

Nicht:

> „Das sagen zehn Island-Blogs.“

Sondern z. B.:

### Island in 10 Tagen – welche Route passt?

| Route | Geeignet für | Fahranteil | Stärke | Nachteil |
|---|---|---:|---|---|
| Ringstraße | Erstbesucher, die viel sehen wollen | hoch | große Vielfalt | viele Kilometer |
| Süd + West | entspannter | mittel | hohe Dichte an Highlights | Norden fehlt |
| Südküste | 7–10 Tage, weniger Stress | niedriger | kompakt | geringere Vielfalt |

Mögliche interessenbasierte Varianten innerhalb der redaktionellen Struktur:

- Island für Wanderer;
- Island für Natur- und Landschaftsfans;
- Island für komfortorientierte Rundreisende.

## 8. Beispiel Paris

### Paris für Kunstinteressierte

Nicht alle Museen gleich behandeln.

Mögliche kuratorische Entscheidungen:

- Louvre: relevant, aber bei vier Tagen nicht zwingend ganzer Tag;
- Musée d’Orsay: hohe Priorität bei Impressionismus;
- Centre Pompidou: stärker bei moderner Kunst;
- Musée de l’Orangerie: besonders relevant bei Monet;
- Versailles: bei vier Tagen eher Architektur/Geschichte als Kern einer reinen Kunstreise;
- Montmartre: Kunstgeschichte und Stadterlebnis, kein klassischer Museumsbaustein.

Wichtig:

Diese Aussagen müssen als redaktionelle Bewertung begründet werden und dürfen keine vorgetäuschte persönliche Erfahrung darstellen.

## 9. Beispiel Barcelona

Möglicher Artikel:

> „Wo in Barcelona übernachten? Viertel im Vergleich.“

| Viertel | Gut für | Weniger gut für | Strand | Nachtleben |
|---|---|---|---|---|
| Eixample | Erstbesucher, Architektur | Strandfokus | niedrig | mittel |
| Gothic Quarter | Atmosphäre, Geschichte | Ruhe | mittel | hoch |
| Gràcia | lokaleres Gefühl | sehr knappe Erstbesuchsplanung | niedrig | mittel |
| Barceloneta | Strand | Ruhe/Preis-Leistung | hoch | hoch |

Der Wert entsteht durch Auswahlkriterien und Zielgruppeneinordnung, nicht durch das bloße Auflisten der Viertel.

## 10. Beispiel Andalusien

Ein idealtypisches Szenario für den später definierten ICP:

- ca. 9 Tage;
- zwei Personen;
- gute 3–4-Sterne-Hotels;
- teilweise Mietwagen;
- Sevilla, Córdoba, Granada;
- Alhambra;
- Architektur und Geschichte;
- gute Restaurants;
- eventuell leichte Wanderung;
- keine Jugendherberge;
- kein Camper;
- keine organisierte Busreise.

Dazu passen konkrete Entscheidungsfragen:

- Granada zwei oder drei Nächte?
- Córdoba als Übernachtung oder Tagesausflug?
- Mietwagen die ganze Reise oder erst nach Sevilla?
- Welche Sehenswürdigkeiten sind bei Interesse an maurischer Architektur Priorität?
- Welche Tickets sollten vorab gebucht werden?

## 11. Strategische Positionierung

Nicht:

> „Reiseführer für alle.“

Nicht:

> „Wir fassen Reiseblogs zusammen.“

Nicht:

> „KI plant deine Reise.“

Sondern eher:

> **Reisen nach deinen Interessen – mit klarer Auswahl statt endlosen Listen.**

Oder funktional:

> **Redaktionelle Entscheidungshilfe für komfortorientierte Individualreisen.**

## 12. Wichtigste Entwicklung aus der Diskussion

Die Diskussion hat vier Fehler nacheinander korrigiert:

1. Aggregation war zu schwach.
2. Synthese war besser, aber noch leicht replizierbar und redaktionell teuer.
3. Live-Daten hätten unnötig ein Softwareprodukt erzeugt.
4. Kuration nach Interesse bringt den Mehrwert zurück in die Redaktion, ohne technische Überkomplexität.

Der aktuelle offene Punkt ist daher nicht mehr die technische Umsetzung, sondern:

> Kann eine klar fokussierte Zielgruppe mit hoher Reiseausgabe und mehreren Affiliate-relevanten Buchungsentscheidungen wirtschaftlich genug erreicht und konvertiert werden?
