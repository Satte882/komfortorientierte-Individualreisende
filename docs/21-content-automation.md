# Content-Automatisierung

## Ziel

Ein neues Thema soll nicht jedes Mal einen neuen Prozess erfinden. Das Repository gibt einen festen Pfad vor:

```text
Thema
→ article:new
→ ICP-Modell anwenden
→ ICP-Signal-Scan
→ ICP-Problemahypothese
→ vertieftes Research
→ Hypothesen-Review / finales ICP-Problem
→ Kuration
→ Decision-Blöcke
→ Human Gate
→ MDX
→ Full Article Review
→ check
→ article:publish
→ Build
```

## 1. Thema anlegen

Beispiel:

```bash
npm run article:new -- "Toskana Kunst Genuss 7 Tage"
```

Optional explizit:

```bash
npm run article:new -- "Florenz oder Siena" --destination=toskana --interests=kunst,architektur --type=decision --days=3
```

Das Script erzeugt automatisch:

```text
research/<slug>/brief.yml
research/<slug>/sources.md
research/<slug>/research.md
research/<slug>/curation.md
research/<slug>/agent-task.md
assets/articles/<slug>/manifest.yml
src/content/<guides|decisions>/<slug>.mdx
```

## 2. Agent-Auftrag

`research/<slug>/agent-task.md` ist der standardisierte Arbeitsauftrag für ChatGPT/Codex.

Die KI arbeitet den festen Content-Pfad ab:

- bestehendes ICP-Modell aus `docs/05-icp-und-zielgruppe.md` auf den Beitrag anwenden;
- ICP-Signal-Scan durchführen und daraus 1 primäre Problemahypothese + maximal 2 Nebenfragen ableiten;
- vertieft recherchieren und Fakten/volatile Signale verifizieren;
- die Problemahypothese danach bestätigen, präzisieren oder verwerfen und das finale ICP-Problem festhalten;
- erst daraus Kuration und Decision-Blöcke ableiten;
- am Human Gate stoppen;
- erst nach ausdrücklicher Owner-Freigabe den MDX-Text finalisieren;
- anschließend den Full Article Review durchführen.

Zusätzlich: Fakten paraphrasieren, Quellen dokumentieren, Trade-offs sichtbar machen und keine persönliche Erfahrung erfinden. Vor öffentlicher Textgenerierung sind `docs/07-redaktionelle-methodik.md` und `docs/23-icp-schreibstandard.md` verbindlich.

Der Schreibstandard ist kein optionaler Stilhinweis, sondern Teil des Generierungsinputs. `article:new` schreibt die Referenz automatisch in `brief.yml` und `agent-task.md`.

## 3. Human Gate

Der Human Gate liegt **nach Kuration und Decision-Blöcken, aber vor der finalen Artikelgenerierung**.

Geprüft wird:
- ist das finale ICP-Problem plausibel?
- sind Priorität, optional und bewusstes Weglassen sinnvoll?
- existiert für jeden wesentlichen öffentlichen Hauptabschnitt ein vollständiger Decision-Block?
- sind Quellenlage und zentrale Fakten für die Kuration ausreichend?

Der Agent darf den Human Gate nicht selbst freigeben. Checkbox, Freigabename und Datum werden nur nach ausdrücklicher Owner-Freigabe gesetzt.

Nach dem Human Gate wird der Artikel finalisiert. **Erst danach** folgt der separate Full Article Review des fertigen Textes.

## 4. Veröffentlichen

```bash
npm run article:publish -- <slug>
npm run check
```

`article:publish` setzt nur dann:
- `status: published`
- `editorialApproval: true`
- aktuelles `dateReviewed`

wenn Quellen, Research/Hypothesen-Review vollständig sind, der Human Gate ausdrücklich freigegeben wurde, der Full Article Review abgeschlossen ist und weder `sources.md`, `research.md`, `curation.md` noch der öffentliche MDX-Text verbliebene `TODO`-Platzhalter enthalten.

## 5. Was bewusst nicht automatisiert wird

- blindes Auto-Publishing aus einem Thema;
- unkontrollierte Massenproduktion;
- Kopieren fremder Texte;
- automatische Auswahl von Affiliate-Produkten;
- erfundene Eigenerfahrung.

Damit ist der repetitive Teil automatisiert, während die eigentliche redaktionelle Auswahl als kontrollierter Gate erhalten bleibt.


## 6. Öffentlicher Text vs. interne Projektdokumentation

Faustregel:

> **Research und Technik erklären uns, wie etwas funktioniert. Der Artikel erklärt dem ICP, was er daraus für seine Reise entscheiden soll.**

Beispiele für interne Informationen, die nicht in den öffentlichen Artikel gehören:
- Experience-Spike;
- Framework-Validierung;
- State-/Scroll-Logik;
- GeoJSON-/Routing-Implementierung;
- Browser-QA;
- Gründe, warum ein POI technisch für einen Test gewählt wurde.

Solche Informationen bleiben in `research/`, `docs/` oder GitHub Issues.


## 7. Editorial Gate v2

Neue Artikel aus `article:new` erhalten automatisch:

```yaml
editorialGateVersion: 2
```

Der Generator legt den vollständigen Prozess in den Arbeitsartefakten an:

- `research.md`: Signal-Scan, Problemahypothese, vertieftes Research, Hypothesen-Review und finales ICP-Problem;
- `curation.md`: Kuration, Decision-Blöcke, Human Gate, Affiliate-Prüfung, Full Article Review und Redaktionsfreigabe;
- MDX: öffentlicher Artikelentwurf.

`article:publish` und `validate-content.mjs` verwenden dieselbe Gate-Prüfung. Für neue v2-Artikel werden Sources, Research, Human Gate, offene Checkboxen und verbliebene `TODO`-Platzhalter geprüft. Ein Artikel kann deshalb nicht durch direktes Ändern des Frontmatters an einem unvollständigen Prozess vorbei veröffentlicht werden.

Bestehende freigegebene Legacy-Inhalte sind explizit grandfathered und werden erst bei bewusster redaktioneller Überarbeitung auf den strengeren Prozess migriert.
