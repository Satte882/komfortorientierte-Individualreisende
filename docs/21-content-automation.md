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
- die Kuration vorbereiten.

## 3. Human Gate

In `curation.md` werden sieben Checkboxen abgearbeitet. Erst wenn alle gesetzt sind, kann der Publish-Befehl ausgeführt werden.

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
