# MVP-Content-Pipeline, CI und Human Gate

## 1. Similarity-/Faktencheck: nicht als harte CI-Regel

Der vorgeschlagene **n-Gram-Check als harte CI-Prüfung** wäre im MVP zu technisch und zu wenig belastbar.

Warum: Er kann sowohl harmlose Überschneidungen markieren als auch eine strukturell zu enge Übernahme übersehen. Er wäre kein verlässlicher Urheberrechtscheck.

Stattdessen wird `curation.md` um einen verbindlichen Publish-Gate ergänzt:

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

## 2. CI/Pipeline für den MVP deutlich vereinfachen

Für die ersten 3–5 Artikel wird nur Folgendes gebaut:

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

Die Ordnerstruktur darf diese spätere Automatisierung ermöglichen, ohne dass wir sie jetzt schon implementieren.

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

## 3. MVP-Prozess

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

Die technische Implementierung bleibt damit für die ersten 3–5 Artikel bewusst klein. Erst bei nachgewiesenem Bedarf wird die Pipeline weiter automatisiert.
