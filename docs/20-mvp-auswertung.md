# MVP-Auswertung nach drei Pilotartikeln

Stand: 19.09.2026

## Entscheidung

**Weiterbauen bis zum öffentlichen Pilot, aber noch nicht skalieren.**

Die technische Architektur und das Content-Modell tragen drei unterschiedliche Piloten. Nicht validiert sind dagegen noch die menschliche Redaktionsfreigabe, reale Produktionszeit eines menschlichen Owners sowie Search-/Affiliate-Signale nach öffentlichem Launch.

Daraus folgt:

- keine weitere Infrastruktur-Automatisierung;
- keine Produktion von 40+ Artikeln;
- zuerst Human Gate, reale Legal-Daten, Hosting/Domain und ein kleiner öffentlicher Pilot.

---

## 1. Was umgesetzt wurde

### Technische Basis

- Astro + TypeScript
- statische Ausgabe
- MDX-Content
- Collections für:
  - `destinations`
  - `guides`
  - `decisions`
- kontrollierte Destination-/Interessen-Taxonomie
- `review`-Content nur bei explizitem Preview-Modus
- nicht veröffentlichte Inhalte erhalten `noindex`
- redaktionelle Komponenten:
  - Mögliche Priorisierungen
  - Was wir bewusst weglassen
  - Methodik
  - Quellen
- Affiliate-Komponente mit:
  - sichtbarer Kennzeichnung
  - `rel="sponsored noopener"`
  - anbieterneutralem Event `affiliate_click`
- Consent-Grundgerüst
- Impressum-/Datenschutz-Dummyseiten
- Public-Launch-Guard gegen offensichtliche Dummy-Rechtstexte
- ein einzelner Content-Validator
- GitHub-Actions-CI

### Pilotartikel

1. `paris-kunst-4-tage` – Guide / Interessen-Kuration
2. `cordoba-tagesausflug-oder-uebernachten` – konkrete Decision Page
3. `andalusien-kultur-9-tage` – breitere Rundreise-Kuration

Alle drei Artikel stehen bewusst auf:

```yaml
status: review
editorialApproval: false
```

Damit wird keine menschliche Freigabe simuliert.

---

## 2. Produzierbarkeit

### Was funktioniert

Der gleiche Prozess konnte für drei deutlich unterschiedliche Artikeltypen verwendet werden:

```text
Brief
→ Quellen
→ Research
→ Curation
→ MDX-Artikel
→ CI
```

Wiederverwendbar waren insbesondere:

- Frontmatter-Schema;
- Research-Struktur;
- Quellenstruktur;
- Curation-Gate;
- Article Layout;
- EditorialChoice;
- SkipRecommendation;
- Methodik- und Quellenblock;
- Validator.

Es war keine artikelspezifische Sonderarchitektur notwendig.

### Was noch nicht gemessen werden kann

Die vorab gewünschte Kennzahl **menschliche Netto-Arbeitszeit pro Artikel** ist in diesem Durchlauf nicht belastbar messbar, weil Recherche, Entwurf und Implementierung weitgehend agentisch durchgeführt wurden.

Erst der reale Human-Gate-Durchlauf liefert:
- menschliche Prüfzeit;
- Anzahl notwendiger inhaltlicher Korrekturen;
- Umfang eventueller Neufassungen.

Dieser Punkt bleibt Teil der Markt-/Betriebsvalidierung.

---

## 3. Content-Qualität

### Beobachtung

Die drei Piloten erzeugen jeweils eine eigenständige Entscheidung statt nur einer aggregierten Liste:

**Paris**
- Orsay priorisieren;
- Louvre gezielt statt vollständig;
- Orangerie ergänzen;
- Versailles bei engem Malerei-Fokus niedriger priorisieren;
- veraltete Standardempfehlung Centre Pompidou für 2026 korrigiert.

**Córdoba**
- Tagesausflug ist kein pauschales Ja/Nein;
- Entscheidung hängt insbesondere von Medina Azahara, Tempo und Routenlogik ab;
- Standardpräferenz für das definierte Profil: eine Nacht, wenn Córdoba mehr als Mezquita + Altstadt sein soll.

**Andalusien**
- drei Basen statt maximale Ortszahl;
- Sevilla / Córdoba / Granada gewichtet;
- Málaga, Cádiz, Ronda und weiße Dörfer bei neun Tagen bewusst nicht hineingepresst.

### Positiv

- Fakten und redaktionelle Schlussfolgerungen sind getrennt;
- keine Eigenerfahrung wird vorgetäuscht;
- keine „7 von 9 Quellen“-Pseudoquantifizierung;
- keine längeren Fremdpassagen im Research;
- zentrale Fakten wurden gegen geeignete Primär-/offizielle Quellen geprüft.

### Noch offen

Die **menschliche Bewertung**, ob genau diese Kuration glaubwürdig und publizierbar ist, fehlt absichtlich.

Deshalb bleibt `editorialApproval: false`.

---

## 4. Technische Tragfähigkeit

### Ergebnis

**Trägt.**

Getestet wurden:
- zwei Guide-Artikel;
- eine Decision Page;
- eine Draft-Destination als Collection-Smoke-Test.

Das Modell benötigte dafür keine neuen Content Collections und keine tiefen Länder-/Interessen-Verzeichnisstrukturen.

### CI-Learnings

Beim ersten Setup traten zwei echte Infrastrukturfehler auf:

1. npm-Cache war aktiviert, obwohl noch kein Lockfile vorhanden war.
2. TypeScript 7 kollidierte mit dem Peer-Range von `@astrojs/check`.

Beide Fehler wurden korrigiert. Danach liefen die Validierungsruns erfolgreich.

Das bestätigt auch den MVP-Ansatz: ein einzelner Validator reicht derzeit aus.

---

## 5. Affiliate-/Monetarisierungsvalidierung

Noch **nicht möglich**.

Vorhanden:
- standardisierte Affiliate-Komponente;
- sichtbare Kennzeichnung;
- `rel="sponsored"`;
- Event-Schnittstelle für `affiliate_click`;
- consent-gesteuerte Aktivierung.

Noch nicht vorhanden:
- reale Affiliate-Partner-IDs/Links;
- externer Analytics-Anbieter;
- reale Besucher;
- Klick-/Conversion-Daten.

Deshalb wird keine Affiliate-CTR interpretiert.

---

## 6. Search-/Marktvalidierung

Noch **nicht möglich**.

Vor Veröffentlichung fehlen naturgemäß:
- Indexierung;
- Search-Impressions;
- reale Suchanfragen;
- organische Klicks.

Die Pilotthemen wurden vorab anhand Suchintention, aktueller Konkurrenzstruktur, ICP-Passung und Affiliate-naher Folgeentscheidungen ausgewählt. Das ersetzt aber keine späteren Search-Console-Daten.

---

## 7. Legal-/Launch-Status

Technische Basis:
- Impressum-Seite vorhanden;
- Datenschutzerklärung vorhanden;
- Cookie-Einstellungen vorhanden;
- Consent-Grundgerüst vorhanden;
- Footer-Verlinkung vorhanden.

Noch nicht launchfähig:
- persönliche/firmenbezogene Dummy-Felder sind nicht ersetzt;
- tatsächlicher Hosting-/Analytics-/Affiliate-Stack ist noch nicht vollständig in der Datenschutzerklärung abgebildet.

Der Validator blockiert deshalb einen expliziten öffentlichen Check mit:

```bash
PUBLIC_LAUNCH=true npm run check
```

solange offensichtliche Dummy-Werte vorhanden sind.

---

## 8. Bewertung gegen die vorab definierten Stop-Signale

### Dauerhaft unverhältnismäßiger manueller Produktionsaufwand

**Noch nicht bewertbar.**

Human-Gate-Zeit fehlt.

### Kuration ohne persönliche Erfahrung nicht glaubwürdig herstellbar

**Bisher kein Stop-Signal.**

Die drei Pilotentscheidungen lassen sich anhand transparenter Kriterien und Primärquellen begründen. Ob der menschliche Owner diese Urteile publizieren möchte, muss noch entschieden werden.

### Suchintention passt nicht zum Format

**Noch kein Stop-Signal aus der Themenprüfung, aber reale Search-Daten fehlen.**

### Relevante Folgeentscheidungen fehlen

**Kein offensichtliches Stop-Signal.**

Alle drei Piloten besitzen plausible Folgeentscheidungen:
- Tickets;
- Hotelnächte;
- Touren;
- bei Andalusien später ggf. Transportentscheidung.

Ob Nutzer darauf reagieren, ist noch ungemessen.

---

## 9. Was jetzt ausdrücklich nicht automatisiert wird

Weiterhin nicht bauen:

- Broken-Link-Crawler;
- wöchentliche Review-Jobs;
- automatische Review-Issues;
- AI-Similarity-Audit;
- automatische Taxonomie-Landingpages;
- Recommendation Engine;
- komplexe Multi-Agent-Orchestrierung.

Für diese Dinge gibt es nach drei Review-Artikeln noch keinen nachgewiesenen ROI.

---

## 10. Nächster Gate

Vor einer Skalierung sind genau drei externe/humane Schritte notwendig:

1. **Human Gate für die drei Piloten**
   - Kuration lesen;
   - akzeptieren oder korrigieren;
   - erst danach `editorialApproval: true`.

2. **Launch-Daten vervollständigen**
   - reale Impressumsdaten;
   - reale Datenschutzangaben;
   - tatsächlich verwendete Affiliate-/Analytics-Anbieter.

3. **Hosting/Domain verbinden und kleinen öffentlichen Pilot starten**
   - danach Search Console / Analytics beobachten;
   - erst aus realen Daten über weitere Automatisierung und Content-Skalierung entscheiden.

## Schlussfolgerung

Der MVP hat seinen ersten technischen Zweck erfüllt:

> **Die Content-Architektur kann mehrere redaktionelle Entscheidungstypen ohne Sonderbau abbilden.**

Nicht bewiesen ist dagegen:

> **dass diese Artikel mit vertretbarem menschlichem Prüfaufwand langfristig Suchtraffic und Affiliate-Umsatz erzeugen.**

Deshalb lautet die Entscheidung nicht „skalieren“, sondern:

> **Weiterbauen bis zum öffentlichen 3-Artikel-Pilot; anschließend anhand realer Human-, Search- und Affiliate-Daten neu entscheiden.**
