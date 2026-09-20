# DESIGN – Reiseauswahl

Dieses Dokument ist die verbindliche visuelle und responsive Grundlage des MVP. Neue Seiten und Komponenten müssen sich daran orientieren; Breakpoints oder Layoutregeln werden nicht pro Template neu erfunden.

## 1. Responsive-System

Die fachlichen Breakpoints sind:

| Bereich | Viewport | Inhaltsbreite | Außenabstand | Grundverhalten |
|---|---:|---:|---:|---|
| Mobile | unter 640 px; technisch bis 640 px ohne 1-px-Lücke | 100 % minus 32 px | 16 px je Seite | eine Spalte, Navigation als Menü, Touch-Ziele mindestens 48 px |
| Tablet | 641–1024 px | 100 % minus 40 px, maximal 1280 px | mindestens 20 px je Seite | zweispaltige Standard-Heroes stapeln; Cinematic Heroes bleiben Overlay-Kompositionen; Karten dürfen zweispaltig bleiben |
| Desktop | 1025–1440 px | maximal 1280 px | mindestens 20 px je Seite | zweispaltige Hero- und Artikel-Layouts, lesbare Textspalte bleibt begrenzt |
| Wide | über 1440 px | Inhaltscontainer maximal 1280 px in einer 1440-px-Editorial-Canvas | mindestens 48 px innerhalb der Canvas | zusätzlicher Raum wird bewusst über größere Bildflächen und eine sichtbare Editorial-Canvas genutzt |

Die Fließtextspalte bleibt unabhängig vom Viewport auf etwa 780 px begrenzt. Das verhindert überlange Zeilen auf großen Monitoren.

### Typografie

- Fließtext: mindestens 16 px.
- Lead-Texte: responsive etwa 17–22 px.
- H1: Mobile deutlich kompakter; Desktop/Wide großzügig, aber ohne Text aus der Spalte zu drücken.
- Überschriften bleiben in Georgia/Serif, UI- und Metatexte in der Sans-Serif-Systemschrift.
- Sehr lange Links und Quellen dürfen umbrechen und niemals den Viewport verbreitern.

### Navigation

- Desktop/Tablet: horizontale Hauptnavigation.
- Mobile: zugänglicher Menü-Button mit mindestens 48 × 48 px Touch-Fläche.
- Ohne JavaScript bleibt die Navigation sichtbar und nutzbar; JavaScript verbessert sie zum auf- und zuklappbaren Menü.
- Escape, Link-Klick und erneuter Menü-Klick schließen das mobile Menü.

### Bilder

- Bilder füllen ihre Fläche mit object-fit cover.
- **Normale zweispaltige Heroes** stapeln spätestens auf Tablet. **Cinematic Experience Heroes sind die Ausnahme:** Medium und Einstiegstext bleiben eine gemeinsame Overlay-Komposition; auf kleineren Viewports werden Höhe, Crop, Typografie und Scrim angepasst statt Bild und Text automatisch zu trennen.
- Ein Cinematic Hero soll immersiv wirken und nicht wie ein flaches Banner vor dem eigentlichen Seitenkopf.
- Hero-Medien behalten standardmäßig natürliche Farbe; kein globaler Grayscale-/Entsättigungs-Look ohne explizite redaktionelle Begründung.
- Artikelbilder nutzen auf Desktop ein redaktionelles 4:3-Format, auf schmaleren Viewports eine breitere Darstellung.
- Demo-Assets werden über assets/placeholder-tracking.md verfolgt und in den Templates als PLACEHOLDER markiert.

### Tabellen, Editorial- und Commercial-Boxen

- Tabellen bleiben innerhalb des Viewports; auf Mobile dürfen sie innerhalb ihrer eigenen Fläche horizontal scrollen.
- EditorialChoice wird auf Mobile einspaltig.
- Affiliate-, Trust- und Methodik-Boxen verlieren auf kleinen Viewports keine Informationen.
- Consent-Aktionen werden auf Mobile vollbreit und mindestens 48 px hoch.

## 2. Wide-Screen-Prinzip

Auf Viewports über 1440 px wird die Seite als ruhige Editorial-Canvas mit maximal 1440 px Gesamtbreite dargestellt. Außerhalb dieser Canvas liegt ein bewusst abgesetzter Hintergrund. Innerhalb der Canvas nutzt der Inhaltscontainer bis zu 1280 px; Hero-Bilder wachsen entsprechend mit.

Damit ist der freie Raum Teil des Layouts und kein zufälliger Rest einer zu schmalen Desktop-Spalte.

## 3. Bildsprache

Zielzustand ist echte, lizenzierte Reisefotografie:

- warm, ruhig und glaubwürdig;
- komfortorientiert statt Backpacker-/Abenteuerästhetik;
- Architektur, Kultur, Stadtmomente und reale Reisesituationen passen besonders gut zum ICP;
- Menschen dürfen vorkommen, aber nicht als gestellte Stock-Lifestyle-Szene;
- keine generische Influencer-Ästhetik und keine kitschigen Sonnenuntergänge als Standard;
- Motive sollen eine konkrete redaktionelle Entscheidung unterstützen, nicht nur dekorieren.

Die aktuellen SVGs sind ausschließlich Demo-Assets für den lokalen MVP. Vor einem echten Launch müssen sie gemäß assets/placeholder-tracking.md ersetzt und Quelle/Lizenz dokumentiert werden.

## 4. Ton und Hero-Copy

Die Website vermittelt Selbstbestimmung plus Entlastung. Sie soll weder bevormunden noch künstlich emotionalisieren.

Verbindliche Leitidee:

- Nutzer planen selbst.
- Redaktion reduziert unnötige Auswahl.
- Quellen, Trade-offs und Freigabe sind sichtbar.
- Keine Behauptung, Inhalte seien grundsätzlich nicht KI-unterstützt erstellt; entscheidend sind redaktionelle Auswahl, Quellenprüfung und Human Gate.

## 5. Interaktion und Accessibility

- Touch-Ziele: mindestens 48 px, soweit die Komponente interaktiv und auf Mobile relevant ist.
- Fokuszustände müssen sichtbar sein.
- Menü-Button nutzt aria-expanded und aria-controls.
- Consent bleibt per Tastatur und auf 390 px vollständig bedienbar.
- Dekorative Kartenbilder dürfen leeren Alt-Text verwenden, wenn Titel und Beschreibung direkt daneben stehen; Artikel-Hero-Bilder brauchen beschreibenden Alt-Text.

## 6. Responsive-Abnahme

Vor Abschluss eines visuellen MVP werden Startseite, ein Guide und eine Decision bei folgenden Viewports geprüft:

- 390 px: Mobile / Touch / kein horizontales Überlaufen; Cinematic Hero bleibt eine lesbare Medium-plus-Overlay-Komposition.
- 768 px: Tablet / sauberes Stapeln und Kartenraster.
- 1440 px: Desktop / ausgewogene Spalten und Bildflächen; bei Cinematic Hero Textlesbarkeit, Overlay-Hierarchie und ausreichende Bildwirkung prüfen.

Zusätzlich wird Wide über 1440 px auf bewusste Nutzung des Raums geprüft. Neue UI-Framework-Abhängigkeiten sind für dieses Verhalten nicht vorgesehen.
