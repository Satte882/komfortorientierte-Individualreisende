# Content-Automatisierung

## Ziel

Ein neues Thema soll nicht jedes Mal einen neuen Prozess erfinden. Das Repository gibt einen festen Pfad vor:

```text
Thema
→ article:new
→ Brief
→ Quellen
→ Research
→ Kuration
→ Human Gate
→ MDX
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

Die KI soll:
- aktuelle Primärquellen recherchieren;
- Fakten paraphrasieren;
- Quellen dokumentieren;
- Trade-offs sichtbar machen;
- keine persönliche Erfahrung erfinden;
- die Kuration vorbereiten;
- **vor jeder öffentlichen Textgenerierung** `docs/07-redaktionelle-methodik.md` und `docs/23-icp-schreibstandard.md` lesen;
- den MDX-Text aus Sicht des komfortorientierten Individualreisenden schreiben, nicht aus Sicht von Produktteam, Entwicklung oder QA.

Der Schreibstandard ist kein optionaler Stilhinweis, sondern Teil des Generierungsinputs. `article:new` schreibt die Referenz automatisch in `brief.yml` und `agent-task.md`.

## 3. Human Gate

In `curation.md` werden zwei Ebenen geprüft:

1. Fakten / Quellen / Kuration;
2. ICP-Nutzen / Schreibstandard.

Dazu gehören ausdrücklich:
- jeder Hauptabschnitt reduziert eine reale Reiseentscheidung;
- generische Ortsbeschreibung ist auf das Nötige gekürzt;
- Zeit, Aufwand, Komfort und Trade-offs werden konkret, wo sie relevant sind;
- interne Projekt-/Techniksprache steht nicht im öffentlichen Artikel;
- die UI wird nicht erklärt, wenn das keinen Reisezweck erfüllt.

Erst wenn **alle** Checkboxen gesetzt sind, kann der Publish-Befehl ausgeführt werden.

## 4. Veröffentlichen

```bash
npm run article:publish -- <slug>
npm run check
```

`article:publish` setzt nur dann:
- `status: published`
- `editorialApproval: true`
- aktuelles `dateReviewed`

wenn im Human Gate keine Checkbox offen ist.

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

Der Generator legt außerdem in `curation.md` an:

- Decision-Blöcke;
- Affiliate-Prüfung;
- Full Article Review;
- Redaktionsfreigabe.

`article:publish` und `validate-content.mjs` verwenden dieselbe Gate-Prüfung. Ein v2-Artikel kann deshalb nicht durch direktes Ändern des Frontmatters an einer unvollständigen Curation vorbei veröffentlicht werden.

Bestehende freigegebene Legacy-v1-Artikel sind explizit grandfathered und werden erst bei bewusster redaktioneller Überarbeitung auf v2 migriert.
