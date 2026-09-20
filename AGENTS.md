# AGENTS.md

## Öffentlicher Content

Wenn du Inhalte für `src/content/` erzeugst oder überarbeitest, arbeite in dieser Reihenfolge:

1. `docs/05-icp-und-zielgruppe.md` – für wen und welche Entscheidung?
2. `docs/06-monetarisierung-und-unit-economics.md` – entsteht eine natürliche buchbare nächste Handlung?
3. `docs/07-redaktionelle-methodik.md` – Research, Kuration und Decision-Blöcke.
4. `docs/23-icp-schreibstandard.md` – daraus Nutzertext formulieren.
5. `docs/17-mvp-content-pipeline-und-human-gate.md` – Full Article Review und Freigabe.

Alle fünf Dokumente sind verbindlicher Input.

### Wichtigste Regel

> Öffentlicher Text wird für den komfortorientierten Individualreisenden geschrieben – nicht für Entwickler, Produktteam, Agenten oder QA.

Interne Begriffe wie Spike, Framework, State, GeoJSON, Routing-Implementierung, Browser-QA oder technische Begründungen gehören nicht in den Nutzertext, außer der Nutzer braucht sie tatsächlich für seine Reiseentscheidung.

Jeder Hauptabschnitt soll Entscheidungen reduzieren: Was lohnt sich, wie lange, reingehen oder außen, Pause oder weiter, was weglassen, welcher Trade-off?

Research-/Technikdetails bleiben in `research/`, `docs/` oder Issues.

### Editorial Gate v2

Neue oder bewusst migrierte öffentliche Inhalte verwenden `editorialGateVersion: 2`.

Vor `published` müssen:
- ICP-Signal-Scan und Hypothesen-Review in `research.md` vollständig abgeschlossen sein;
- Decision-Blöcke in `curation.md` vorhanden sein;
- Human Gate ausdrücklich durch den Owner freigegeben sein;
- natürliche Affiliate-Chancen geprüft sein;
- Full Article Review abgeschlossen sein;
- alle Gate-Checkboxen geschlossen sein.

Ein technischer Experience-Spike bleibt `review/noindex`, solange dieser Content-Gate nicht bestanden ist.

Wenn du ein Content-Issue anlegst, enthält dessen DoD mindestens:
- bestehendes ICP-Modell auf den konkreten Beitrag angewendet;
- ICP-Signal-Scan durchgeführt;
- primäre ICP-Problemahypothese + max. 2 Nebenfragen dokumentiert;
- sources.md vollständig dokumentiert und ohne TODO-Platzhalter;
- vertieftes Research dokumentiert;
- Problemahypothese nach Research bestätigt, präzisiert oder verworfen und finales ICP-Problem festgehalten;
- stärkste Research-Signale vor der Priorisierung in curation.md übernommen oder bewusst verworfen;
- Decision-Blöcke vorhanden;
- Insights geprüft;
- Affiliate-Potenziale über bestehende Logik geprüft;
- MDX nach ICP-Schreibstandard erstellt;
- Full Article Review abgeschlossen;
- Experience/Content konsistent;
- Gate bestanden;
- erst danach `published`.

Bei einer neuen Destination darf ein GitHub Research-Issue die Arbeit steuern. Dauerhafte Erkenntnisse gehören aber ausschließlich nach `research/`.

Verbindlicher Content-Pfad:

> ICP-Modell → ICP-Signal-Scan → ICP-Problemahypothese → vertieftes Research → Hypothesen-Review/finales ICP-Problem → Kuration → Decision-Blöcke → Human Gate → Artikel → Review → Publish.

Keinen Schritt überspringen. Insbesondere entsteht die öffentliche Prosa erst nach Kuration, Decision-Blöcken und Human Gate. Der Agent darf die Human-Gate-Freigabe niemals selbst setzen; Checkbox, Freigabename und Datum werden ausschließlich nach einer ausdrücklichen menschlichen Freigabe eingetragen.

## Experience / UI

Für Experience-Arbeit zusätzlich lesen:

- `docs/EXPERIENCE.md`
- `docs/EXPERIENCE-DATA-CONTRACT.md`
- `docs/MEDIA-GOVERNANCE.md`

Experience visualisiert die redaktionelle Entscheidung. Sie darf keine neue inhaltliche Empfehlung erfinden.
