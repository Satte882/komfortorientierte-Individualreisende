Ja. Ich würde meine bisherige Ausarbeitung an **vier Stellen konkret ändern**. Die Grundstruktur bleibt.

## 1. Similarity-/Faktencheck: relevant, aber anders lösen

Sonnets Ziel ist richtig, der vorgeschlagene **n-Gram-Check als harte CI-Prüfung** wäre mir im MVP zu technisch und zu wenig belastbar.

Warum: Er kann sowohl harmlose Überschneidungen markieren als auch eine strukturell zu enge Übernahme übersehen. Er wäre kein verlässlicher Urheberrechtscheck.

Ich würde stattdessen `curation.md` um einen verbindlichen Publish-Gate ergänzen:

```md
## Redaktionsfreigabe

- [ ] zentrale Fakten gegen geeignete Primärquellen geprüft
- [ ] volatile Angaben aktuell geprüft
- [ ] keine unbelegten Mengenbehauptungen wie „7 von 9 Quellen“
- [ ] keine längeren Formulierungen aus Quellen übernommen
- [ ] Artikel folgt eigener Struktur, nicht der Struktur einer Einzelquelle
- [ ] Quellen für wesentliche Aussagen dokumentiert
- [ ] Kuration / Priorisierung redaktionell freigegeben

Freigabe:
[Name / Datum]
```

Später, wenn wirklich 40+ Artikel produziert werden, kann zusätzlich ein **AI-gestützter Similarity-Audit** vor Veröffentlichung dazukommen. Aber nicht als vermeintlich rechtssicherer CI-Test.

---

# 2. CI/Pipeline deutlich vereinfachen

Hier hat Sonnet klar recht. Meine vorherige Version war für **Artikel Nr. 1** schon auf **Artikel Nr. 100** optimiert.

Für die ersten 3–5 Artikel würde ich nur Folgendes bauen:

```text
npm run check
    │
    ├── Astro Content Schema
    ├── astro check
    ├── astro build
    └── ein kleiner Content-Validator
```

Dieser eine Validator prüft zunächst nur:

```text
✓ Pflicht-Metadaten vorhanden
✓ dateReviewed vorhanden
✓ Bild + Lizenzangaben vorhanden
✓ Quellen vorhanden
✓ Redaktionsfreigabe vorhanden
✓ Affiliate-Link korrekt gekennzeichnet
✓ rel=sponsored vorhanden
```

**Noch nicht bauen:**

- wöchentlicher Review-Workflow
- automatischer Broken-Link-Crawler
- fünf einzelne Validation-Scripts
- automatische Review-Issues
- komplexe Agenten-Orchestrierung

Die Ordnerstruktur darf diese spätere Automatisierung **ermöglichen**, ohne dass wir sie jetzt schon implementieren.

Das ist der wichtige Unterschied.

### MVP

```text
Brief
→ Research
→ Curation
→ Human Gate
→ Article
→ einfacher Check
→ Preview
→ Merge
```

### Erst später

```text
automatische Reviews
Broken-Link-Watch
Similarity-Audit
Review-Date-Issues
Content-Agent-Pipeline
```

---

# 3. Taxonomie-Seiten: zunächst nicht indexieren

Das würde ich ebenfalls ändern.

Astro darf intern bereits wissen:

```yaml
destination: paris

interests:
  - kunst
  - kultur
```

Aber daraus sollte bei drei Artikeln **nicht automatisch eine indexierbare SEO-Landschaft** entstehen:

```text
/interessen/kunst/
/interessen/kultur/
/reiseziele/frankreich/
/reiseziele/paris/
```

Google empfiehlt ausdrücklich, Seiten mit geringem eigenem Nutzwert nicht unnötig indexieren zu lassen; `noindex` ist dafür vorgesehen. Google warnt außerdem vor vielen unoriginellen Seiten mit geringem Zusatznutzen. ([developers.google.com](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share?utm_source=chatgpt.com))

Ich würde es noch einfacher machen:

### Anfang

Taxonomie existiert **nur als Metadaten**.

Einzelne Artikel werden indexiert:

```text
/guides/paris-kunstinteressierte/
/guides/andalusien-kultur/
/decisions/cordoba-uebernachten/
```

### Später

Eine Seite wie:

```text
/interessen/kunst/
```

wird erst freigeschaltet, wenn wir dafür eine **wirklich eigenständige Landingpage** bauen:

> Kunstreisen: Welche Städte eignen sich für welche Kunstepoche? Florenz vs. Paris vs. Madrid etc.

Also nicht:

> „Hier sind unsere zwei Kunst-Artikel.“

Kein fixes „ab fünf Artikeln“. Das wäre wieder eine künstliche Zahl.

Stattdessen im Datenmodell:

```yaml
kunst:
  name: Kunst
  indexable: false
```

Später:

```yaml
kunst:
  name: Kunst
  indexable: true
```

**bewusste redaktionelle Entscheidung statt automatischer Schwelle.**

---

# 4. `research/` im Repo: ja, aber privat und ohne Copy-Paste

Das ist relevant.

Ich habe dein Repository geprüft: **Es ist bereits `private`.** Das passt. Cloudflare Pages unterstützt aktuell ausdrücklich auch private GitHub-Repositories. ([developers.cloudflare.com](https://developers.cloudflare.com/pages/get-started/git-integration/?utm_source=chatgpt.com))

Deshalb kann unsere Struktur bleiben:

```text
research/
src/content/
assets/
```

Aber für `research/` würde ich eine harte Regel festlegen:

> **Research enthält Erkenntnisse und Quellenverweise, nicht kopierte Blogartikel.**

Also nicht:

```md
## Reiseblog X

"Wir sind morgens um sieben losgefahren und hatten ..."

[weitere 500 Wörter kopiert]
```

sondern:

```md
## Quelle: Blog X

URL: ...
Abruf: 20.09.2026

Relevante Erkenntnisse:
- Autor empfand Ringstraße in 10 Tagen als fahrintensiv
- längste beschriebene Etappe ca. X
- empfiehlt zusätzliche Nacht im Norden

Verwendbar für:
- Argument Fahranteil
- Routengeschwindigkeit
```

Das ist ohnehin besser für unsere Agentenpipeline.

Der Agent soll **Information extrahieren**, nicht ein privates Textarchiv fremder Blogs aufbauen.

---

# Damit ändert sich meine finale Ordner-/Prozessarchitektur leicht

```text
komfortorientierte-Individualreisende/
│
├── src/
│   ├── content/
│   │   ├── destinations/
│   │   ├── guides/
│   │   └── decisions/
│   │
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── data/
│   └── styles/
│
├── research/
│   └── <article-slug>/
│       ├── brief.yml
│       ├── sources.md
│       ├── research.md
│       └── curation.md      ← inklusive Human-Gate
│
├── assets/
│   └── articles/
│       └── <article-slug>/
│           ├── hero.webp
│           └── manifest.yml
│
├── scripts/
│   └── validate-content.ts  ← zunächst nur EIN Script
│
├── .github/
│   └── workflows/
│       └── validate.yml     ← zunächst nur EIN Workflow
│
└── docs/
```

Und der MVP-Prozess wird:

```text
INPUT
Destination + Interesse + Entscheidung

      ↓

brief.yml

      ↓

KI-Recherche
→ sources.md
→ research.md
nur extrahierte/paraphrasierte Erkenntnisse

      ↓

KI-Kurationsvorschlag

      ↓

curation.md

      ↓

★ HUMAN GATE ★
Kuration bestätigen
Fakten geprüft
Quellen geprüft
keine Fremdformulierungen übernommen

      ↓

KI erstellt MDX

      ↓

npm run check

Pflichtfelder
Bildrechte
Affiliate
Build

      ↓

Preview

      ↓

★ MERGE ★

      ↓

ONLINE
```

## Mein Fazit zu Sonnets vier Punkten

**Drei Punkte verbessern unsere Architektur unmittelbar:**

- Pipeline zunächst deutlich kleiner,
- Taxonomie nicht voreilig indexieren,
- Research konsequent privat und paraphrasiert.

Der vierte Punkt verbessert ebenfalls den Prozess, aber **nicht als n-Gram-CI**. Ich würde stattdessen einen expliziten **Source-/Fact-/Originality-Gate in `curation.md`** etablieren.

Damit bekommen wir etwas Wichtiges hin:

> **Die Struktur ist schon für 40+ Artikel sauber, aber die technische Implementierung bleibt für die ersten 3–5 Artikel bewusst klein.**

Genau so würde ich es jetzt bauen.