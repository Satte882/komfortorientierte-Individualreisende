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
ICP-Modell
→ ICP-Signal-Scan
→ ICP-Problemahypothese
→ vertieftes Research
→ Hypothesen-Review / finales ICP-Problem
→ Kuration
→ Decision-Blöcke
→ Human Gate
→ Artikel
→ Review
→ Publish
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
Destination + Interesse

      ↓

brief.yml
→ bestehendes ICP-Modell aus docs/05-icp-und-zielgruppe.md anwenden

      ↓

ICP-Signal-Scan in research.md
→ Reibung
→ Social-Media-Hype vs. Realität
→ Tipps & Tricks
→ reale Kosten
→ Alternativen / Geheimtipps

      ↓

ICP-Problemahypothese
→ 1 primäre Hypothese
→ max. 2 Nebenfragen

      ↓

vertieftes Research
→ sources.md
→ research.md
→ Fakten und volatile Signale verifizieren

      ↓

Hypothesen-Review in research.md
→ bestätigt / präzisiert / verworfen
→ finales ICP-Problem festhalten

      ↓

KI-Kurationsvorschlag
→ curation.md
→ Priorität / optional / bewusst weglassen
→ Decision-Blöcke

      ↓

★ HUMAN GATE ★
Kuration bestätigen
Fakten geprüft
Quellen geprüft
finales ICP-Problem plausibel
keine Fremdformulierungen übernommen

      ↓

KI erstellt/finalisiert MDX

      ↓

Full Article Review + npm run check

Pflichtfelder
Bildrechte
Affiliate
Build
Gate v2

      ↓

Preview

      ↓

Publish / Merge

      ↓

ONLINE
```

Die technische Implementierung bleibt damit für die ersten 3–5 Artikel bewusst klein. Erst bei nachgewiesenem Bedarf wird die Pipeline weiter automatisiert.


---

## 4. Editorial Gate v2

Neue oder bewusst redaktionell migrierte Artikel verwenden:

```yaml
editorialGateVersion: 2
```

### Grandfathering

Bereits veröffentlichte Legacy-Artikel bleiben v1 und werden nicht rückwirkend gegen neue Pflichtbereiche geprüft.

Die erlaubten Legacy-v1-Slugs werden im gemeinsamen Gate-Helper explizit geführt. Dadurch kann ein neuer Artikel das v2-Gate nicht einfach durch Weglassen des Feldes umgehen.

Neue Artikel aus `article:new` erhalten immer Gate v2.

### Gate-v2-Inhalt

`research/<slug>/curation.md` muss enthalten:

- abgeschlossenen Hypothesen-Review: Ausgangshypothese bestätigt, präzisiert oder verworfen; finales ICP-Problem in `research.md` festgehalten;
- Decision-Blöcke für die wesentlichen Hauptabschnitte;
- Affiliate-Prüfung über die bestehende Commercial-Logik;
- Full Article Review;
- Redaktionsfreigabe;
- keine offenen Checkboxen.

### Full Article Review

Vor Veröffentlichung wird der Gesamtartikel geprüft:

- [ ] Titel/Intro-Versprechen wird tatsächlich erfüllt
- [ ] jeder Hauptabschnitt reduziert eine reale Reiseentscheidung
- [ ] Reihenfolge ergibt als echte Reise Sinn
- [ ] Zeit, Wege, Pausen und Energie sind realistisch
- [ ] unnötige Wiederholungen entfernt
- [ ] keine wesentlichen Informationslücken
- [ ] echte Insights statt Allgemeinplätze
- [ ] natürliche Affiliate-Chancen geprüft, aber nicht künstlich erzeugt
- [ ] Text, Bild, Karte und CTA sind semantisch konsistent
- [ ] Artikel besitzt einen klaren roten Faden
- [ ] ICP müsste für die Kernentscheidung nicht sofort wieder selbst recherchieren

### Technische Experience-Spikes

Ein technischer Spike kann Map, Scroll, Medien oder andere Experience-Mechaniken vollständig validieren, bleibt aber:

```yaml
status: review
editorialApproval: false
```

bis der separate Content-Gate bestanden ist.

### CI

`article:publish` und `validate-content.mjs` verwenden dieselbe Gate-v2-Prüfung.

Damit reicht bei v2 ein manuelles Setzen von `status: published` und `editorialApproval: true` nicht aus: unvollständige Curation blockiert CI.
